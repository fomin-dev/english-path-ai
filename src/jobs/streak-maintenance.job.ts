import cron from 'node-cron';
import { prisma } from '../db/client.js';
import { logger } from '../config/logger.js';
import { dateKeyInTimezone } from '../core/gamification/streaks.js';

/**
 * A learner's streak only *advances* reactively (when they complete a task),
 * but it must still visibly *reset to 0* once they've missed a full day,
 * even if they never open the bot again — otherwise Stats/Settings would
 * keep showing a stale streak forever. Runs hourly rather than daily since
 * "midnight" is different in every user's timezone.
 */
async function tick(): Promise<void> {
  const now = new Date();
  const candidates = await prisma.user.findMany({
    where: { streakCount: { gt: 0 }, lastActiveDate: { not: null } },
    select: { id: true, timezone: true, lastActiveDate: true, streakCount: true },
  });

  const toReset: string[] = [];
  for (const user of candidates) {
    const todayKey = dateKeyInTimezone(now, user.timezone);
    const lastActiveKey = dateKeyInTimezone(user.lastActiveDate!, user.timezone);
    const gapDays = daysBetween(lastActiveKey, todayKey);
    if (gapDays > 1) toReset.push(user.id);
  }

  if (toReset.length > 0) {
    await prisma.user.updateMany({ where: { id: { in: toReset } }, data: { streakCount: 0 } });
    logger.info({ count: toReset.length }, 'Reset lapsed streaks');
  }
}

function daysBetween(earlierKey: string, laterKey: string): number {
  const a = new Date(`${earlierKey}T00:00:00Z`);
  const b = new Date(`${laterKey}T00:00:00Z`);
  return Math.round((b.getTime() - a.getTime()) / 86_400_000);
}

export function registerStreakMaintenanceJob(): void {
  cron.schedule('7 * * * *', () => {
    tick().catch((err) => logger.error({ err }, 'Streak maintenance job failed'));
  });
  logger.info('Streak maintenance job scheduled (hourly)');
}
