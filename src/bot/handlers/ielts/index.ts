import type { Bot } from 'grammy';
import { InlineKeyboard, InputFile } from 'grammy';
import { t } from '../../../i18n/index.js';
import type { BotContext } from '../../types.js';
import {
  ieltsReadingSets,
  ieltsListeningSets,
  ieltsWritingTasks,
  ieltsSpeakingCues,
} from '../../../content/ielts/bank.js';
import { estimateBandFromAccuracy, estimateBandFromCefr } from '../../../core/ielts/scoring.js';
import { recordIeltsAttempt } from '../../../db/repositories/exam.repository.js';
import { synthesizeSpeech } from '../../../core/tts/google-tts.js';
import { aiProvider } from '../../../ai/index.js';
import { awardXpAndNotify } from '../gamification/notify.js';
import { XP_REWARDS } from '../../../core/gamification/xp.js';
import { isMenuLabel } from '../menu/match-menu-text.js';
import { logger } from '../../../config/logger.js';

function randomIndex(length: number): number {
  return Math.floor(Math.random() * length);
}

export async function showIeltsMenu(ctx: BotContext): Promise<void> {
  const locale = ctx.session.locale;
  const kb = new InlineKeyboard()
    .text(t(locale, 'ielts.reading'), 'ielts:reading:start')
    .text(t(locale, 'ielts.listening'), 'ielts:listening:start')
    .row()
    .text(t(locale, 'ielts.writing'), 'ielts:writing:start')
    .text(t(locale, 'ielts.speaking'), 'ielts:speaking:start')
    .row()
    .text(t(locale, 'ielts.full_mock'), 'ielts:full_mock');

  await ctx.reply(`${t(locale, 'ielts.title')}\n${t(locale, 'ielts.body')}`, { parse_mode: 'HTML', reply_markup: kb });
}

async function renderIeltsQuestion(ctx: BotContext): Promise<void> {
  const state = ctx.session.ieltsPractice;
  if (!state) return;
  const set = state.kind === 'reading' ? ieltsReadingSets[state.setIndex] : ieltsListeningSets[state.setIndex];
  const question = set?.questions[state.questionIndex];
  if (!set || !question) return;

  const kb = new InlineKeyboard();
  question.options.forEach((opt, idx) =>
    kb.text(opt, `ielts:answer:${state.kind}:${state.setIndex}:${state.questionIndex}:${idx}`).row(),
  );
  await ctx.reply(`<b>${question.question}</b>`, { parse_mode: 'HTML', reply_markup: kb });
}

export function registerIeltsHandlers(bot: Bot<BotContext>): void {
  bot.callbackQuery('ielts:reading:start', async (ctx) => {
    await ctx.answerCallbackQuery();
    const setIndex = randomIndex(ieltsReadingSets.length);
    const set = ieltsReadingSets[setIndex]!;
    ctx.session.ieltsPractice = { kind: 'reading', setIndex, questionIndex: 0, correct: 0 };
    await ctx.reply(`<b>${set.title}</b>\n\n${set.passage}`, {
      parse_mode: 'HTML',
      reply_markup: new InlineKeyboard().text('▶️', 'ielts:reading:questions'),
    });
  });

  bot.callbackQuery('ielts:reading:questions', async (ctx) => {
    await ctx.answerCallbackQuery();
    await renderIeltsQuestion(ctx);
  });

  bot.callbackQuery('ielts:listening:start', async (ctx) => {
    await ctx.answerCallbackQuery();
    const setIndex = randomIndex(ieltsListeningSets.length);
    const set = ieltsListeningSets[setIndex]!;
    ctx.session.ieltsPractice = { kind: 'listening', setIndex, questionIndex: 0, correct: 0 };
    await ctx.reply(`<b>${set.title}</b>`, { parse_mode: 'HTML' });
    try {
      const audio = await synthesizeSpeech(set.script, 'en');
      await ctx.replyWithVoice(new InputFile(audio, 'ielts-listening.mp3'));
    } catch (err) {
      logger.warn({ err }, 'IELTS TTS failed, falling back to transcript');
      await ctx.reply(set.script);
    }
    await ctx.reply('▶️', { reply_markup: new InlineKeyboard().text('▶️', 'ielts:listening:questions') });
  });

  bot.callbackQuery('ielts:listening:questions', async (ctx) => {
    await ctx.answerCallbackQuery();
    await renderIeltsQuestion(ctx);
  });

  bot.callbackQuery(/^ielts:answer:(reading|listening):(\d+):(\d+):(\d+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const kind = ctx.match[1] as 'reading' | 'listening';
    const setIndex = Number(ctx.match[2]);
    const questionIndex = Number(ctx.match[3]);
    const answerIndex = Number(ctx.match[4]);
    const locale = ctx.session.locale;

    const set = kind === 'reading' ? ieltsReadingSets[setIndex] : ieltsListeningSets[setIndex];
    const question = set?.questions[questionIndex];
    if (!set || !question) return;

    const isCorrect = answerIndex === question.correctIndex;
    const state = ctx.session.ieltsPractice;
    if (state) state.correct += isCorrect ? 1 : 0;
    await ctx.reply(isCorrect ? '✅' : '❌');

    const nextIndex = questionIndex + 1;
    if (nextIndex < set.questions.length) {
      if (state) state.questionIndex = nextIndex;
      await renderIeltsQuestion(ctx);
      return;
    }

    const correct = state?.correct ?? 0;
    const total = set.questions.length;
    ctx.session.ieltsPractice = undefined;
    const band = estimateBandFromAccuracy(correct, total);

    await recordIeltsAttempt(ctx.dbUser.id, kind.toUpperCase() as 'READING' | 'LISTENING', band, { correct, total });
    await ctx.reply(`${t(locale, 'ielts.band_score_result', { band })}\n(${correct}/${total})`, { parse_mode: 'HTML' });
    await awardXpAndNotify(ctx, XP_REWARDS.IELTS_MOCK_COMPLETED, `ielts_${kind}_completed`);
  });

  bot.callbackQuery('ielts:writing:start', async (ctx) => {
    await ctx.answerCallbackQuery();
    const task = ieltsWritingTasks[randomIndex(ieltsWritingTasks.length)]!;
    ctx.session.ieltsWriting = { taskNumber: task.taskNumber, prompt: task.prompt };
    await ctx.reply(`<b>IELTS Writing Task ${task.taskNumber}</b>\n\n${task.prompt}`, { parse_mode: 'HTML' });
  });

  bot.on('message:text', async (ctx, next) => {
    const state = ctx.session.ieltsWriting;
    if (!state) return next();
    if (isMenuLabel(ctx.msg.text)) {
      ctx.session.ieltsWriting = undefined;
      return next();
    }

    const locale = ctx.session.locale;
    if (!aiProvider.isConfigured()) {
      await ctx.reply(t(locale, 'common.not_configured_ai'));
      ctx.session.ieltsWriting = undefined;
      return;
    }

    await ctx.reply(t(locale, 'writing.checking'));
    const result = await aiProvider.checkWriting({
      text: ctx.msg.text,
      prompt: state.prompt,
      learnerLevel: ctx.dbUser.currentLevel ?? 'B1',
      locale,
    });
    ctx.session.ieltsWriting = undefined;

    const band = estimateBandFromCefr(result.estimatedLevel);
    await recordIeltsAttempt(ctx.dbUser.id, 'WRITING', band, { taskNumber: state.taskNumber });
    await ctx.reply(
      `${t(locale, 'ielts.band_score_result', { band })}\n\n${result.summaryFeedback}\n\n<b>${t(locale, 'writing.better_label')}:</b>\n${result.betterVersion}`,
      { parse_mode: 'HTML' },
    );
    await awardXpAndNotify(ctx, XP_REWARDS.IELTS_MOCK_COMPLETED, 'ielts_writing_completed');
  });

  bot.callbackQuery('ielts:speaking:start', async (ctx) => {
    await ctx.answerCallbackQuery();
    const cue = ieltsSpeakingCues[randomIndex(ieltsSpeakingCues.length)]!;
    const followUps = cue.followUpQuestions.length > 0 ? `\n\n${cue.followUpQuestions.map((q) => `• ${q}`).join('\n')}` : '';
    await ctx.reply(`🗣 <b>IELTS Speaking — Part ${cue.part}</b>\n\n${cue.cueCard}${followUps}`, {
      parse_mode: 'HTML',
      reply_markup: new InlineKeyboard().text(t(ctx.session.locale, 'common.done'), 'ielts:speaking:done'),
    });
  });

  bot.callbackQuery('ielts:speaking:done', async (ctx) => {
    await ctx.answerCallbackQuery();
    await awardXpAndNotify(ctx, XP_REWARDS.SPEAKING, 'ielts_speaking_practice', 'SPEAKING');
  });

  bot.callbackQuery('ielts:full_mock', async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply(
      'A full mock covers Listening → Reading → Writing → Speaking. Work through each section from this menu one by one — your band estimate for each is saved, and your best overall estimate shows up in Statistics.',
    );
    await showIeltsMenu(ctx);
  });
}
