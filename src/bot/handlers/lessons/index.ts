import type { Bot } from 'grammy';
import { InlineKeyboard } from 'grammy';
import { t } from '../../../i18n/index.js';
import type { BotContext } from '../../types.js';
import { getOrCreateTodayLessonPlan, getTodayLessonPlan } from '../../../db/repositories/progress.repository.js';
import { countDueCards } from '../../../db/repositories/vocab.repository.js';
import { getActiveGoal } from '../../../db/repositories/roadmap.repository.js';
import { generateDailyTasks, type TaskType } from '../../../core/lesson-generator/generate.js';
import type { FullCefrLevel, SkillFocus } from '../../../core/roadmap/generator.js';
import { showGrammarMenu } from '../grammar/index.js';
import { showReadingMenu } from '../reading/index.js';
import { showListeningMenu } from '../listening/index.js';
import { showWritingMenu } from '../writing/index.js';
import { startDueReview, startNewWords } from '../vocabulary/index.js';
import { awardXpAndNotify } from '../gamification/notify.js';
import { XP_REWARDS } from '../../../core/gamification/xp.js';

type PlanTask = { type: TaskType; xp: number; status: 'pending' | 'done' };

const SPEAKING_PROMPTS = [
  'Describe your typical morning routine in a few sentences.',
  'Talk about a book, film, or show you enjoyed recently and why.',
  'Explain how to cook your favorite dish, step by step.',
  'Describe your hometown to someone who has never been there.',
  'Talk about a skill you would like to learn and why.',
];

async function ensureTodayPlan(ctx: BotContext): Promise<{ id: string; tasks: PlanTask[] }> {
  const [activeGoal, dueVocabCount] = await Promise.all([
    getActiveGoal(ctx.dbUser.id),
    countDueCards(ctx.dbUser.id),
  ]);

  const tasks = generateDailyTasks({
    level: (ctx.dbUser.currentLevel ?? 'A1') as FullCefrLevel,
    focusSkills: (activeGoal?.focusSkills ?? []) as SkillFocus[],
    dailyGoalMinutes: ctx.dbUser.dailyGoalMinutes,
    dueVocabCount,
  });

  const plan = await getOrCreateTodayLessonPlan(ctx.dbUser.id, tasks);
  return { id: plan.id, tasks: plan.tasks as PlanTask[] };
}

function taskTypeLabelKey(type: TaskType): string {
  return `lesson.task_type.${type.toLowerCase()}`;
}

export async function showLessonMenu(ctx: BotContext): Promise<void> {
  const locale = ctx.session.locale;
  const today = new Date().toLocaleDateString(locale === 'en' ? 'en-GB' : locale);
  const { tasks } = await ensureTodayPlan(ctx);

  const allDone = tasks.every((task) => task.status === 'done');
  if (allDone) {
    const xpEarned = tasks.reduce((sum, task) => sum + task.xp, 0);
    await ctx.reply(`${t(locale, 'lesson.all_done_title')}\n${t(locale, 'lesson.all_done_body', { xp: xpEarned })}`, {
      parse_mode: 'HTML',
    });
    return;
  }

  const lines = [t(locale, 'lesson.title', { date: today }), ''];
  const kb = new InlineKeyboard();
  tasks.forEach((task, index) => {
    const statusIcon = task.status === 'done' ? t(locale, 'lesson.status_done') : t(locale, 'lesson.status_pending');
    const label = t(locale, taskTypeLabelKey(task.type));
    lines.push(t(locale, 'lesson.task_line', { status: statusIcon, icon: '', label, xp: task.xp }));
    if (task.status === 'pending') {
      kb.text(`${t(locale, 'lesson.start_task')} ${label}`, `lesson:start:${index}`).row();
    }
  });

  await ctx.reply(lines.join('\n'), { parse_mode: 'HTML', reply_markup: kb });
}

export function registerLessonHandlers(bot: Bot<BotContext>): void {
  bot.callbackQuery(/^lesson:start:(\d+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const index = Number(ctx.match[1]);
    const plan = await getTodayLessonPlan(ctx.dbUser.id);
    const tasks = (plan?.tasks ?? []) as PlanTask[];
    const task = tasks[index];
    if (!task || task.status === 'done') return;

    switch (task.type) {
      case 'GRAMMAR':
      case 'MINI_TEST':
        await showGrammarMenu(ctx);
        return;
      case 'VOCABULARY':
      case 'FLASHCARDS':
      case 'REVIEW': {
        const due = await countDueCards(ctx.dbUser.id);
        if (due > 0) await startDueReview(ctx);
        else await startNewWords(ctx);
        return;
      }
      case 'READING':
        await showReadingMenu(ctx);
        return;
      case 'LISTENING':
        await showListeningMenu(ctx);
        return;
      case 'WRITING':
      case 'SENTENCE_BUILDING':
      case 'TRANSLATION':
        await showWritingMenu(ctx);
        return;
      case 'SPEAKING':
      case 'SHADOWING': {
        const prompt = SPEAKING_PROMPTS[Math.floor(Math.random() * SPEAKING_PROMPTS.length)]!;
        const locale = ctx.session.locale;
        await ctx.reply(`🗣 <b>${prompt}</b>\n\n${t(locale, 'lesson.start_task')}?`, {
          parse_mode: 'HTML',
          reply_markup: new InlineKeyboard().text(t(locale, 'common.done'), `lesson:speaking-done:${task.type}`),
        });
        return;
      }
    }
  });

  bot.callbackQuery(/^lesson:speaking-done:(SPEAKING|SHADOWING)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const type = ctx.match[1] as 'SPEAKING' | 'SHADOWING';
    await awardXpAndNotify(ctx, XP_REWARDS[type], `${type.toLowerCase()}_practice`, type);
  });
}
