import type { Bot } from 'grammy';
import { InlineKeyboard, InputFile } from 'grammy';
import { t } from '../../../i18n/index.js';
import type { BotContext } from '../../types.js';
import { listeningExerciseList, listeningExerciseById } from '../../../content/listening/index.js';
import { recordListeningAttempt } from '../../../db/repositories/reading.repository.js';
import { synthesizeSpeech } from '../../../core/tts/google-tts.js';
import { awardXpAndNotify } from '../gamification/notify.js';
import { XP_REWARDS } from '../../../core/gamification/xp.js';
import { logger } from '../../../config/logger.js';

export async function showListeningMenu(ctx: BotContext): Promise<void> {
  const locale = ctx.session.locale;
  const level = ctx.dbUser.currentLevel ?? 'A1';
  const exercises = listeningExerciseList.filter((e) => e.level === level);

  const kb = new InlineKeyboard();
  for (const exercise of exercises) {
    kb.text(exercise.title, `listening:play:${exercise.id}`).row();
  }

  await ctx.reply(`${t(locale, 'listening.title')}\n${t(locale, 'listening.exercise_list_title', { level })}`, {
    parse_mode: 'HTML',
    reply_markup: kb,
  });
}

async function renderQuestion(ctx: BotContext, exerciseId: string, questionIndex: number): Promise<void> {
  const locale = ctx.session.locale;
  const exercise = listeningExerciseById.get(exerciseId);
  const question = exercise?.questions[questionIndex];
  if (!exercise || !question) return;

  const progress = t(locale, 'listening.question_progress', {
    current: questionIndex + 1,
    total: exercise.questions.length,
  });
  const kb = new InlineKeyboard();
  question.options.forEach((opt, idx) => kb.text(opt, `listening:answer:${exerciseId}:${questionIndex}:${idx}`).row());

  await ctx.reply(`${progress}\n\n<b>${question.question}</b>`, { parse_mode: 'HTML', reply_markup: kb });
}

export function registerListeningHandlers(bot: Bot<BotContext>): void {
  bot.callbackQuery(/^listening:play:(.+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const exerciseId = ctx.match[1]!;
    const locale = ctx.session.locale;
    const exercise = listeningExerciseById.get(exerciseId);
    if (!exercise) return;

    await ctx.reply(`<b>${exercise.title}</b>\n${t(locale, 'listening.play_hint')}`, { parse_mode: 'HTML' });

    try {
      const audio = await synthesizeSpeech(exercise.script, 'en');
      await ctx.replyWithVoice(new InputFile(audio, `${exercise.id}.mp3`));
    } catch (err) {
      logger.warn({ err, exerciseId }, 'TTS synthesis failed, falling back to text transcript');
      await ctx.reply(exercise.script);
    }

    await ctx.reply(
      t(locale, 'listening.question_progress', { current: 1, total: exercise.questions.length }),
      { reply_markup: new InlineKeyboard().text('▶️', `listening:start:${exerciseId}`) },
    );
  });

  bot.callbackQuery(/^listening:start:(.+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const exerciseId = ctx.match[1]!;
    ctx.session.listening = { exerciseId, questionIndex: 0, correct: 0 };
    await renderQuestion(ctx, exerciseId, 0);
  });

  bot.callbackQuery(/^listening:answer:(.+):(\d+):(\d+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const [, exerciseId, qIdxStr, aIdxStr] = ctx.match;
    const questionIndex = Number(qIdxStr);
    const answerIndex = Number(aIdxStr);
    const locale = ctx.session.locale;

    const exercise = listeningExerciseById.get(exerciseId!);
    const question = exercise?.questions[questionIndex];
    if (!exercise || !question) return;

    const isCorrect = answerIndex === question.correctIndex;
    const state = ctx.session.listening;
    if (state && state.exerciseId === exerciseId) state.correct += isCorrect ? 1 : 0;

    await ctx.reply(isCorrect ? '✅' : '❌');

    const nextIndex = questionIndex + 1;
    if (nextIndex < exercise.questions.length) {
      if (state) state.questionIndex = nextIndex;
      await renderQuestion(ctx, exerciseId!, nextIndex);
      return;
    }

    const correct = state?.correct ?? 0;
    const total = exercise.questions.length;
    ctx.session.listening = undefined;

    await recordListeningAttempt(ctx.dbUser.id, exerciseId!, correct, total);
    await ctx.reply(t(locale, 'listening.result_title', { correct, total }), { parse_mode: 'HTML' });

    if (correct / total >= 0.5) {
      await awardXpAndNotify(ctx, XP_REWARDS.LISTENING, 'listening_completed', 'LISTENING');
    }
  });
}
