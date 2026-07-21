import type { Bot } from 'grammy';
import { InlineKeyboard } from 'grammy';
import { t } from '../../../i18n/index.js';
import type { BotContext } from '../../types.js';
import { readingTextList, readingTextById } from '../../../content/reading/index.js';
import { vocabWords } from '../../../content/vocab/index.js';
import { recordReadingAttempt } from '../../../db/repositories/reading.repository.js';
import { ensureCard } from '../../../db/repositories/vocab.repository.js';
import { awardXpAndNotify } from '../gamification/notify.js';
import { XP_REWARDS } from '../../../core/gamification/xp.js';

export async function showReadingMenu(ctx: BotContext): Promise<void> {
  const locale = ctx.session.locale;
  const level = ctx.dbUser.currentLevel ?? 'A1';
  const texts = readingTextList.filter((r) => r.level === level);

  const kb = new InlineKeyboard();
  for (const text of texts) {
    kb.text(text.title, `reading:text:${text.id}`).row();
  }

  await ctx.reply(`${t(locale, 'reading.title')}\n${t(locale, 'reading.text_list_title', { level })}`, {
    parse_mode: 'HTML',
    reply_markup: kb,
  });
}

async function renderQuestion(ctx: BotContext, textId: string, questionIndex: number): Promise<void> {
  const locale = ctx.session.locale;
  const text = readingTextById.get(textId);
  const question = text?.questions[questionIndex];
  if (!text || !question) return;

  const progress = t(locale, 'reading.question_progress', { current: questionIndex + 1, total: text.questions.length });
  const kb = new InlineKeyboard();
  question.options.forEach((opt, idx) => kb.text(opt, `reading:answer:${textId}:${questionIndex}:${idx}`).row());

  await ctx.reply(`${progress}\n\n<b>${question.question}</b>`, { parse_mode: 'HTML', reply_markup: kb });
}

export function registerReadingHandlers(bot: Bot<BotContext>): void {
  bot.callbackQuery(/^reading:text:(.+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const textId = ctx.match[1]!;
    const locale = ctx.session.locale;
    const text = readingTextById.get(textId);
    if (!text) return;

    await ctx.reply(`<b>${text.title}</b>\n\n${text.body}`, {
      parse_mode: 'HTML',
      reply_markup: new InlineKeyboard().text(t(locale, 'reading.start_questions'), `reading:start:${textId}`),
    });
  });

  bot.callbackQuery(/^reading:start:(.+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const textId = ctx.match[1]!;
    ctx.session.reading = { textId, questionIndex: 0, correct: 0 };
    await renderQuestion(ctx, textId, 0);
  });

  bot.callbackQuery(/^reading:answer:(.+):(\d+):(\d+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const [, textId, qIdxStr, aIdxStr] = ctx.match;
    const questionIndex = Number(qIdxStr);
    const answerIndex = Number(aIdxStr);
    const locale = ctx.session.locale;

    const text = readingTextById.get(textId!);
    const question = text?.questions[questionIndex];
    if (!text || !question) return;

    const isCorrect = answerIndex === question.correctIndex;
    const state = ctx.session.reading;
    if (state && state.textId === textId) state.correct += isCorrect ? 1 : 0;

    await ctx.reply(isCorrect ? '✅' : '❌');

    const nextIndex = questionIndex + 1;
    if (nextIndex < text.questions.length) {
      if (state) state.questionIndex = nextIndex;
      await renderQuestion(ctx, textId!, nextIndex);
      return;
    }

    const correct = state?.correct ?? 0;
    const total = text.questions.length;
    ctx.session.reading = undefined;

    await recordReadingAttempt(ctx.dbUser.id, textId!, correct, total);

    const newWordsLine =
      text.newWords.length > 0 ? `\n\n${t(locale, 'reading.new_words_title')}\n${text.newWords.join(', ')}` : '';
    await ctx.reply(`${t(locale, 'reading.result_title', { correct, total })}${newWordsLine}`, {
      parse_mode: 'HTML',
      reply_markup:
        text.newWords.length > 0
          ? new InlineKeyboard().text(t(locale, 'reading.add_words'), `reading:add_words:${text.id}`)
          : undefined,
    });

    if (correct / total >= 0.5) {
      await awardXpAndNotify(ctx, XP_REWARDS.READING, 'reading_completed', 'READING');
    }
  });

  bot.callbackQuery(/^reading:add_words:(.+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const textId = ctx.match[1]!;
    const text = readingTextById.get(textId);
    if (!text) return;

    const matches = text.newWords
      .map((w) => vocabWords.find((v) => v.word.toLowerCase() === w.toLowerCase()))
      .filter((w): w is NonNullable<typeof w> => Boolean(w));

    await Promise.all(matches.map((w) => ensureCard(ctx.dbUser.id, `${w.word}::${w.partOfSpeech}`)));
    await ctx.reply(t(ctx.session.locale, 'common.done'));
  });
}
