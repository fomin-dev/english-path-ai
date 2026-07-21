import type { Bot } from 'grammy';
import { InlineKeyboard } from 'grammy';
import { t } from '../../../i18n/index.js';
import type { BotContext } from '../../types.js';
import { satReadingSets, satGrammarQuestions, satVocabQuestions } from '../../../content/sat/bank.js';
import { estimateScaledScore } from '../../../core/sat/scoring.js';
import { recordSatAttempt } from '../../../db/repositories/exam.repository.js';
import { awardXpAndNotify } from '../gamification/notify.js';
import { XP_REWARDS } from '../../../core/gamification/xp.js';

const PRACTICE_SET_SIZE = 8;

function randomIndex(length: number): number {
  return Math.floor(Math.random() * length);
}

/** A random sample of `count` distinct indices in [0, length), for drawing a
 * varied subset from a large question pool instead of always the same prefix. */
function sampleIndices(length: number, count: number): number[] {
  const all = Array.from({ length }, (_, i) => i);
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j]!, all[i]!];
  }
  return all.slice(0, count);
}

export async function showSatMenu(ctx: BotContext): Promise<void> {
  const locale = ctx.session.locale;
  const kb = new InlineKeyboard()
    .text(t(locale, 'sat.reading'), 'sat:reading:start')
    .text(t(locale, 'sat.grammar'), 'sat:grammar:start')
    .row()
    .text(t(locale, 'sat.vocabulary'), 'sat:vocabulary:start')
    .text(t(locale, 'sat.full_mock'), 'sat:full_mock');

  await ctx.reply(`${t(locale, 'sat.title')}\n${t(locale, 'sat.body')}`, { parse_mode: 'HTML', reply_markup: kb });
}

async function renderReadingQuestion(ctx: BotContext): Promise<void> {
  const state = ctx.session.satPractice;
  if (!state || state.kind !== 'reading' || state.setIndex === undefined) return;
  const set = satReadingSets[state.setIndex];
  const question = set?.questions[state.index];
  if (!set || !question) return;

  const kb = new InlineKeyboard();
  question.options.forEach((opt, idx) => kb.text(opt, `sat:answer:reading:${idx}`).row());
  await ctx.reply(`<b>${question.question}</b>`, { parse_mode: 'HTML', reply_markup: kb });
}

function renderGrammarQuestion(ctx: BotContext): Promise<unknown> {
  const state = ctx.session.satPractice;
  if (!state || state.kind !== 'grammar') return Promise.resolve();
  const item = satGrammarQuestions[state.order![state.index]!];
  if (!item) return Promise.resolve();

  const kb = new InlineKeyboard();
  item.options.forEach((opt, idx) => kb.text(opt, `sat:answer:grammar:${idx}`).row());
  return ctx.reply(`${item.sentence}`, { reply_markup: kb });
}

function renderVocabQuestion(ctx: BotContext): Promise<unknown> {
  const state = ctx.session.satPractice;
  if (!state || state.kind !== 'vocabulary') return Promise.resolve();
  const item = satVocabQuestions[state.order![state.index]!];
  if (!item) return Promise.resolve();

  const kb = new InlineKeyboard();
  item.options.forEach((opt, idx) => kb.text(opt, `sat:answer:vocabulary:${idx}`).row());
  return ctx.reply(`${item.sentenceWithBlank}`, { reply_markup: kb });
}

async function finishSatPractice(ctx: BotContext): Promise<void> {
  const state = ctx.session.satPractice;
  if (!state) return;
  const locale = ctx.session.locale;
  ctx.session.satPractice = undefined;

  const score = estimateScaledScore(state.correct, state.total);
  const sectionMap = { reading: 'READING', grammar: 'GRAMMAR', vocabulary: 'VOCABULARY' } as const;
  await recordSatAttempt(ctx.dbUser.id, sectionMap[state.kind], score, {
    correct: state.correct,
    total: state.total,
  });
  await ctx.reply(`${t(locale, 'sat.score_result', { score })}\n(${state.correct}/${state.total})`, {
    parse_mode: 'HTML',
  });
  if (state.correct / state.total >= 0.5) {
    await awardXpAndNotify(ctx, XP_REWARDS.SAT_MOCK_COMPLETED, `sat_${state.kind}_completed`);
  }
}

export function registerSatHandlers(bot: Bot<BotContext>): void {
  bot.callbackQuery('sat:reading:start', async (ctx) => {
    await ctx.answerCallbackQuery();
    const setIndex = randomIndex(satReadingSets.length);
    const set = satReadingSets[setIndex]!;
    ctx.session.satPractice = { kind: 'reading', setIndex, index: 0, correct: 0, total: set.questions.length };
    await ctx.reply(`<b>${set.title}</b>\n\n${set.passage}`, {
      parse_mode: 'HTML',
      reply_markup: new InlineKeyboard().text('▶️', 'sat:reading:questions'),
    });
  });

  bot.callbackQuery('sat:reading:questions', async (ctx) => {
    await ctx.answerCallbackQuery();
    await renderReadingQuestion(ctx);
  });

  bot.callbackQuery('sat:grammar:start', async (ctx) => {
    await ctx.answerCallbackQuery();
    const total = Math.min(PRACTICE_SET_SIZE, satGrammarQuestions.length);
    ctx.session.satPractice = { kind: 'grammar', index: 0, correct: 0, total, order: sampleIndices(satGrammarQuestions.length, total) };
    await renderGrammarQuestion(ctx);
  });

  bot.callbackQuery('sat:vocabulary:start', async (ctx) => {
    await ctx.answerCallbackQuery();
    const total = Math.min(PRACTICE_SET_SIZE, satVocabQuestions.length);
    ctx.session.satPractice = { kind: 'vocabulary', index: 0, correct: 0, total, order: sampleIndices(satVocabQuestions.length, total) };
    await renderVocabQuestion(ctx);
  });

  bot.callbackQuery(/^sat:answer:(reading|grammar|vocabulary):(\d+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const kind = ctx.match[1] as 'reading' | 'grammar' | 'vocabulary';
    const answerIndex = Number(ctx.match[2]);
    const state = ctx.session.satPractice;
    if (!state || state.kind !== kind) return;

    let correctIndex: number;
    if (kind === 'reading' && state.setIndex !== undefined) {
      correctIndex = satReadingSets[state.setIndex]!.questions[state.index]!.correctIndex;
    } else if (kind === 'grammar') {
      correctIndex = satGrammarQuestions[state.order![state.index]!]!.correctIndex;
    } else {
      correctIndex = satVocabQuestions[state.order![state.index]!]!.correctIndex;
    }

    const isCorrect = answerIndex === correctIndex;
    state.correct += isCorrect ? 1 : 0;
    await ctx.reply(isCorrect ? '✅' : '❌');

    state.index += 1;
    if (state.index >= state.total) {
      await finishSatPractice(ctx);
      return;
    }

    if (kind === 'reading') await renderReadingQuestion(ctx);
    else if (kind === 'grammar') await renderGrammarQuestion(ctx);
    else await renderVocabQuestion(ctx);
  });

  bot.callbackQuery('sat:full_mock', async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply(t(ctx.session.locale, 'sat.full_mock_intro'));
    await showSatMenu(ctx);
  });
}
