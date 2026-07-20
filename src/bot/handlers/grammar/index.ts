import type { Bot } from 'grammy';
import { InlineKeyboard } from 'grammy';
import { t } from '../../../i18n/index.js';
import type { BotContext } from '../../types.js';
import { grammarTopics } from '../../../content/grammar/topics.js';
import { recordGrammarAttempt } from '../../../db/repositories/grammar.repository.js';
import { awardXpAndNotify } from '../gamification/notify.js';
import { XP_REWARDS } from '../../../core/gamification/xp.js';

function topicsForLevel(level: string) {
  return grammarTopics.filter((topic) => topic.level === level).sort((a, b) => a.order - b.order);
}

export async function showGrammarMenu(ctx: BotContext): Promise<void> {
  const locale = ctx.session.locale;
  const level = ctx.dbUser.currentLevel ?? 'A1';
  const topics = topicsForLevel(level);

  const kb = new InlineKeyboard();
  for (const topic of topics) {
    kb.text(topic.content[locale].title, `grammar:topic:${topic.slug}`).row();
  }

  await ctx.reply(`${t(locale, 'grammar.title')}\n${t(locale, 'grammar.topic_list_title', { level })}`, {
    parse_mode: 'HTML',
    reply_markup: kb,
  });
}

function renderQuestion(ctx: BotContext, slug: string, questionIndex: number): Promise<void> {
  const locale = ctx.session.locale;
  const topic = grammarTopics.find((t2) => t2.slug === slug);
  const question = topic?.questions[questionIndex];
  if (!topic || !question) return Promise.resolve();

  const progress = t(locale, 'grammar.question_progress', { current: questionIndex + 1, total: topic.questions.length });
  const kb = new InlineKeyboard();
  question.options.forEach((opt, idx) => {
    kb.text(opt, `grammar:answer:${slug}:${questionIndex}:${idx}`).row();
  });

  return ctx
    .reply(`${progress}\n\n<b>${question.question}</b>`, { parse_mode: 'HTML', reply_markup: kb })
    .then(() => undefined);
}

export function registerGrammarHandlers(bot: Bot<BotContext>): void {
  bot.callbackQuery(/^grammar:topic:(.+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const slug = ctx.match[1]!;
    const locale = ctx.session.locale;
    const topic = grammarTopics.find((t2) => t2.slug === slug);
    if (!topic) return;

    const content = topic.content[locale];
    const examples = content.examples.map((ex) => `• ${ex}`).join('\n');
    await ctx.reply(`${t(locale, 'grammar.topic_title', { title: content.title })}\n\n${content.explanation}\n\n${examples}`, {
      parse_mode: 'HTML',
      reply_markup: new InlineKeyboard().text(t(locale, 'grammar.practice'), `grammar:practice:${slug}`),
    });
  });

  bot.callbackQuery(/^grammar:practice:(.+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const slug = ctx.match[1]!;
    ctx.session.grammarPractice = { topicSlug: slug, questionIndex: 0, correct: 0 };
    await renderQuestion(ctx, slug, 0);
  });

  bot.callbackQuery(/^grammar:answer:(.+):(\d+):(\d+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const [, slug, qIdxStr, answerIdxStr] = ctx.match;
    if (!slug) return;
    const questionIndex = Number(qIdxStr);
    const answerIndex = Number(answerIdxStr);
    const locale = ctx.session.locale;

    const topic = grammarTopics.find((t2) => t2.slug === slug);
    const question = topic?.questions[questionIndex];
    if (!topic || !question) return;

    const state = ctx.session.grammarPractice;
    const isCorrect = answerIndex === question.correctIndex;
    if (state && state.topicSlug === slug) {
      state.correct += isCorrect ? 1 : 0;
    }

    const feedback = isCorrect ? '✅' : `❌ ${question.explanation}`;
    await ctx.reply(feedback);

    const nextIndex = questionIndex + 1;
    if (nextIndex < topic.questions.length) {
      if (state) state.questionIndex = nextIndex;
      await renderQuestion(ctx, slug, nextIndex);
      return;
    }

    const correct = state?.correct ?? 0;
    const total = topic.questions.length;
    ctx.session.grammarPractice = undefined;

    await recordGrammarAttempt(ctx.dbUser.id, slug, correct, total);
    await ctx.reply(t(locale, 'grammar.result_title', { correct, total }), {
      parse_mode: 'HTML',
      reply_markup: new InlineKeyboard().text(t(locale, 'grammar.next_topic'), 'grammar:menu'),
    });

    if (correct / total >= 0.5) {
      await awardXpAndNotify(ctx, XP_REWARDS.GRAMMAR, 'grammar_topic_completed', 'GRAMMAR');
    }
  });

  bot.callbackQuery('grammar:menu', async (ctx) => {
    await ctx.answerCallbackQuery();
    await showGrammarMenu(ctx);
  });
}
