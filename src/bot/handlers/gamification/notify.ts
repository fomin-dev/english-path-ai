import { t } from '../../../i18n/index.js';
import {
  syncAchievements,
  addXp,
  markLessonTaskDoneByType,
  type AddXpResult,
} from '../../../db/repositories/progress.repository.js';
import { recordActivity } from '../../../db/repositories/user.repository.js';
import { achievements } from '../../../content/achievements.js';
import { rankTitleKey } from '../../../core/gamification/xp.js';
import type { BotContext } from '../../types.js';

/**
 * Single entry point for "the learner just completed something XP-worthy".
 * Awards XP, advances the daily streak, and surfaces level-up / achievement
 * toasts — every feature handler (vocab, grammar, reading, ...) should call
 * this instead of hand-rolling its own gamification messages, so the UX
 * (and the underlying bookkeeping) stays consistent across the whole bot.
 *
 * `taskType` (a lesson-generator TaskType, e.g. "GRAMMAR"/"VOCABULARY") is
 * optional: when given, it opportunistically marks the matching pending
 * task in today's lesson plan as done, so exercises done outside the
 * "Today's Lesson" flow still count toward it.
 */
export async function awardXpAndNotify(
  ctx: BotContext,
  amount: number,
  reason: string,
  taskType?: string,
): Promise<AddXpResult> {
  const locale = ctx.session.locale;
  const xpResult = await addXp(ctx.dbUser.id, amount, reason);
  await ctx.reply(t(locale, 'gamification.xp_gained', { xp: amount }));

  if (taskType) {
    await markLessonTaskDoneByType(ctx.dbUser.id, taskType);
  }

  if (xpResult.leveledUp) {
    await ctx.reply(
      t(locale, 'gamification.level_up', {
        level: xpResult.newLevel,
        rank: t(locale, rankTitleKey(xpResult.newLevel)),
      }),
      { parse_mode: 'HTML' },
    );
  }

  const streak = await recordActivity(ctx.dbUser, 1);
  if (streak.isNewDay) {
    if (streak.streakCount === 1) {
      await ctx.reply(t(locale, 'gamification.streak_started'));
    } else {
      await ctx.reply(t(locale, 'gamification.streak_extended', { days: streak.streakCount }));
    }
  }

  const newlyUnlocked = await syncAchievements(ctx.dbUser.id, achievements);
  for (const achievement of newlyUnlocked) {
    const content = achievement.content[locale];
    await ctx.reply(
      t(locale, 'gamification.achievement_unlocked', { title: `${achievement.icon} ${content.title}` }),
      { parse_mode: 'HTML' },
    );
  }

  return xpResult;
}
