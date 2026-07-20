import type { Bot } from 'grammy';
import { t } from '../../../i18n/index.js';
import type { BotContext } from '../../types.js';
import { getStatsSummary } from '../../../db/repositories/stats.repository.js';
import { getActiveGoal, getRoadmap } from '../../../db/repositories/roadmap.repository.js';
import { evaluatePace, type RoadmapPhase } from '../../../core/roadmap/generator.js';
import { forecastCompletionDate } from '../../../core/stats/forecast.js';

export async function showStatsMenu(ctx: BotContext): Promise<void> {
  const locale = ctx.session.locale;
  const [summary, goal, roadmap] = await Promise.all([
    getStatsSummary(ctx.dbUser.id),
    getActiveGoal(ctx.dbUser.id),
    getRoadmap(ctx.dbUser.id),
  ]);

  const lines = [
    t(locale, 'stats.title'),
    t(locale, 'stats.days_learning', { count: summary.daysLearning }),
    t(locale, 'stats.current_streak', { count: summary.user.streakCount }),
    t(locale, 'stats.longest_streak', { count: summary.user.longestStreak }),
    t(locale, 'stats.words_learned', { count: summary.wordsLearned }),
    t(locale, 'stats.words_mastered', { count: summary.wordsMastered }),
    t(locale, 'stats.tasks_completed', { count: summary.tasksCompleted }),
    t(locale, 'stats.current_level', { level: summary.user.rankLevel, xp: summary.user.xp }),
  ];

  if (goal && roadmap) {
    const phases = roadmap.phases as unknown as RoadmapPhase[];
    const totalWeeks = phases.reduce((sum, p) => sum + p.weeks, 0);
    const weeksElapsed = Math.max(0, (Date.now() - roadmap.generatedAt.getTime()) / (7 * 86_400_000));
    const tasksCompletedRatio = summary.tasksPlanned === 0 ? 0 : summary.tasksCompleted / summary.tasksPlanned;
    const pace = evaluatePace({ phases, weeksElapsed, tasksCompletedRatio });
    const forecast = forecastCompletionDate({ roadmapStartDate: roadmap.generatedAt, totalWeeks, paceSignal: pace });

    lines.push(
      t(locale, 'stats.goal_progress', {
        currentLevel: ctx.dbUser.currentLevel ?? '—',
        targetLevel: goal.targetLevel,
        date: forecast.toLocaleDateString(locale === 'en' ? 'en-GB' : locale),
      }),
      t(locale, `stats.goal_forecast_${pace}`),
    );
  }

  await ctx.reply(lines.join('\n'), { parse_mode: 'HTML' });
}

export function registerStatsHandlers(_bot: Bot<BotContext>): void {
  // Statistics is a read-only view — no callback/message handlers needed beyond the menu entry point.
}
