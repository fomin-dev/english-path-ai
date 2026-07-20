import type { Bot } from 'grammy';
import type { SkillFocus as PrismaSkillFocus } from '@prisma/client';
import { t } from '../../../i18n/index.js';
import { updateUser } from '../../../db/repositories/user.repository.js';
import { saveLearningGoal, saveRoadmap } from '../../../db/repositories/roadmap.repository.js';
import { addXp, getOrCreateTodayLessonPlan } from '../../../db/repositories/progress.repository.js';
import { generateRoadmap, type FullCefrLevel, type SkillFocus } from '../../../core/roadmap/generator.js';
import { generateDailyTasks } from '../../../core/lesson-generator/generate.js';
import { XP_REWARDS } from '../../../core/gamification/xp.js';
import {
  dailyMinutesKeyboard,
  focusSelectKeyboard,
  pickTargetLevelKeyboard,
  timeframeKeyboard,
} from '../../keyboards/onboarding.js';
import type { BotContext } from '../../types.js';
import { showMainMenu } from '../menu/show-main-menu.js';

export async function beginGoalsFlow(ctx: BotContext): Promise<void> {
  const locale = ctx.session.locale;
  const current = ctx.session.onboarding?.resolvedLevel ?? 'A0';

  await ctx.reply(
    `${t(locale, 'goals.ask_target_title')}\n\n${t(locale, 'goals.ask_target_body', { current })}`,
    { parse_mode: 'HTML', reply_markup: pickTargetLevelKeyboard(locale, current as FullCefrLevel) },
  );
}

async function finalizeOnboarding(ctx: BotContext): Promise<void> {
  const locale = ctx.session.locale;
  const ob = ctx.session.onboarding ?? {};
  const currentLevel = (ob.resolvedLevel ?? 'A0') as FullCefrLevel;
  const targetLevel = ob.targetLevel!;
  const weeks = ob.timeframeWeeks!;
  const focusSkills = (ob.focusSkills ?? []) as SkillFocus[];
  const dailyMinutes = ob.dailyMinutes ?? 15;

  const phases = generateRoadmap({ currentLevel, targetLevel, totalWeeks: weeks, focusSkills });
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + weeks * 7);

  await Promise.all([
    updateUser(ctx.dbUser.id, {
      targetLevel,
      targetDate,
      dailyGoalMinutes: dailyMinutes,
      onboardingCompleted: true,
      onboardingStep: null,
    }),
    saveLearningGoal(ctx.dbUser.id, {
      targetLevel,
      targetDate,
      focusSkills: focusSkills as PrismaSkillFocus[],
      weeklyMinutes: dailyMinutes * 7,
    }),
    saveRoadmap(ctx.dbUser.id, phases),
  ]);

  if (ob.test) {
    await addXp(ctx.dbUser.id, XP_REWARDS.PLACEMENT_TEST_COMPLETED, 'placement_test_completed');
  }

  const tasks = generateDailyTasks({
    level: currentLevel,
    focusSkills,
    dailyGoalMinutes: dailyMinutes,
    dueVocabCount: 0,
  });
  await getOrCreateTodayLessonPlan(ctx.dbUser.id, tasks);

  const lines = [
    t(locale, 'roadmap.ready_title'),
    '',
    ...phases.map((p, i) =>
      t(locale, 'roadmap.phase_line', { index: i + 1, from: p.fromLevel, to: p.toLevel, weeks: p.weeks }),
    ),
    '',
    t(locale, 'roadmap.ready_footer'),
  ];
  await ctx.reply(lines.join('\n'), { parse_mode: 'HTML' });

  ctx.session.onboarding = undefined;
  await showMainMenu(ctx);
}

export function registerGoalsHandlers(bot: Bot<BotContext>): void {
  bot.callbackQuery(/^target:(A1|A2|B1|B2|C1|C2)$/, async (ctx) => {
    const target = ctx.match[1] as FullCefrLevel;
    const locale = ctx.session.locale;
    await ctx.answerCallbackQuery();
    ctx.session.onboarding = { ...(ctx.session.onboarding ?? {}), targetLevel: target };
    await ctx.reply(t(locale, 'goals.ask_timeframe_title'), {
      parse_mode: 'HTML',
      reply_markup: timeframeKeyboard(locale),
    });
  });

  bot.callbackQuery(/^timeframe:(3|6|12)$/, async (ctx) => {
    const months = Number(ctx.match[1]);
    await ctx.answerCallbackQuery();
    await proceedToFocus(ctx, Math.round(months * 4.345));
  });

  bot.callbackQuery('timeframe:custom', async (ctx) => {
    const locale = ctx.session.locale;
    await ctx.answerCallbackQuery();
    ctx.session.onboarding = { ...(ctx.session.onboarding ?? {}), awaitingCustomTimeframe: true };
    await ctx.reply(t(locale, 'goals.ask_timeframe_custom'));
  });

  bot.on('message:text', async (ctx, next) => {
    if (!ctx.session.onboarding?.awaitingCustomTimeframe) return next();
    const locale = ctx.session.locale;
    const months = Number(ctx.msg.text.trim());
    if (!Number.isFinite(months) || months < 1 || months > 60) {
      await ctx.reply(t(locale, 'goals.timeframe_custom_invalid'));
      return;
    }
    ctx.session.onboarding = { ...ctx.session.onboarding, awaitingCustomTimeframe: false };
    await proceedToFocus(ctx, Math.round(months * 4.345));
  });

  bot.callbackQuery(/^focus:(.+)$/, async (ctx) => {
    const value = ctx.match[1]!;
    const locale = ctx.session.locale;
    await ctx.answerCallbackQuery();

    if (value === 'done') {
      await ctx.reply(t(locale, 'goals.ask_daily_minutes_title'), {
        parse_mode: 'HTML',
        reply_markup: dailyMinutesKeyboard(locale),
      });
      return;
    }

    const ob = ctx.session.onboarding ?? {};
    const current = ob.focusSkills ?? [];
    const skill = value as SkillFocus;
    const next = current.includes(skill) ? current.filter((s) => s !== skill) : [...current, skill];
    ctx.session.onboarding = { ...ob, focusSkills: next };

    await ctx.editMessageReplyMarkup({ reply_markup: focusSelectKeyboard(locale, next) }).catch(() => undefined);
  });

  bot.callbackQuery(/^minutes:(10|15|30|60)$/, async (ctx) => {
    const minutes = Number(ctx.match[1]);
    await ctx.answerCallbackQuery();
    ctx.session.onboarding = { ...(ctx.session.onboarding ?? {}), dailyMinutes: minutes };
    await finalizeOnboarding(ctx);
  });

  bot.callbackQuery('start_learning:go', async (ctx) => {
    await ctx.answerCallbackQuery();
    await showMainMenu(ctx);
  });
}

async function proceedToFocus(ctx: BotContext, weeks: number): Promise<void> {
  const locale = ctx.session.locale;
  ctx.session.onboarding = { ...(ctx.session.onboarding ?? {}), timeframeWeeks: weeks };
  await ctx.reply(`${t(locale, 'goals.ask_focus_title')}\n\n${t(locale, 'goals.ask_focus_body')}`, {
    parse_mode: 'HTML',
    reply_markup: focusSelectKeyboard(locale, []),
  });
}
