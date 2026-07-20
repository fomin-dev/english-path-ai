import { prisma } from '../client.js';
import { levelFromXp } from '../../core/gamification/xp.js';
import {
  findNewlyUnlockedAchievements,
  type SeedAchievement,
  type UserStatsSnapshot,
} from '../../core/gamification/achievements.js';
import type { DailyTaskItem } from '../../core/lesson-generator/generate.js';

export interface AddXpResult {
  totalXp: number;
  leveledUp: boolean;
  newLevel: number;
}

export async function addXp(userId: string, amount: number, reason: string): Promise<AddXpResult> {
  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });
  const before = levelFromXp(user.xp);
  const totalXp = user.xp + amount;
  const after = levelFromXp(totalXp);

  await prisma.$transaction([
    prisma.xpTransaction.create({ data: { userId, amount, reason } }),
    prisma.user.update({ where: { id: userId }, data: { xp: totalXp, rankLevel: after.level } }),
  ]);

  return { totalXp, leveledUp: after.level > before.level, newLevel: after.level };
}

export async function getOrCreateTodayLessonPlan(userId: string, tasks: DailyTaskItem[]) {
  const todayUtc = new Date();
  const dateOnly = new Date(Date.UTC(todayUtc.getUTCFullYear(), todayUtc.getUTCMonth(), todayUtc.getUTCDate()));

  const existing = await prisma.lessonPlan.findUnique({ where: { userId_date: { userId, date: dateOnly } } });
  if (existing) return existing;

  return prisma.lessonPlan.create({
    data: {
      userId,
      date: dateOnly,
      tasks: tasks.map((t) => ({ type: t.type, xp: t.xp, status: 'pending' as const })),
      totalCount: tasks.length,
    },
  });
}

export async function markLessonTaskDone(lessonPlanId: string, taskIndex: number) {
  const plan = await prisma.lessonPlan.findUniqueOrThrow({ where: { id: lessonPlanId } });
  const tasks = plan.tasks as Array<{ type: string; xp: number; status: string }>;
  const task = tasks[taskIndex];
  if (!task || task.status === 'done') return plan;

  task.status = 'done';
  return prisma.lessonPlan.update({
    where: { id: lessonPlanId },
    data: {
      tasks,
      completedCount: { increment: 1 },
      xpEarned: { increment: task.xp },
    },
  });
}

export function getTodayLessonPlan(userId: string) {
  const now = new Date();
  const dateOnly = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  return prisma.lessonPlan.findUnique({ where: { userId_date: { userId, date: dateOnly } } });
}

/** Marks the first still-pending task of the given type in today's lesson plan as done,
 * if one exists — called opportunistically whenever a feature (vocab, grammar, ...) awards
 * XP, so completing an exercise "for its own sake" still counts toward today's lesson. */
export async function markLessonTaskDoneByType(userId: string, taskType: string): Promise<void> {
  const plan = await getTodayLessonPlan(userId);
  if (!plan) return;
  const tasks = plan.tasks as Array<{ type: string; xp: number; status: string }>;
  const index = tasks.findIndex((t) => t.type === taskType && t.status === 'pending');
  if (index === -1) return;
  await markLessonTaskDone(plan.id, index);
}

export async function buildUserStatsSnapshot(userId: string): Promise<UserStatsSnapshot> {
  const [user, wordsLearned, ieltsAttempts, satAttempts, writingSubmissions, grammarTopicsCompleted, lessonsCompleted] =
    await Promise.all([
      prisma.user.findUniqueOrThrow({ where: { id: userId } }),
      prisma.userVocabCard.count({ where: { userId, status: { in: ['REVIEW', 'MASTERED'] } } }),
      prisma.ieltsAttempt.count({ where: { userId } }),
      prisma.satAttempt.count({ where: { userId } }),
      prisma.writingSubmission.count({ where: { userId } }),
      prisma.grammarAttempt
        .findMany({ where: { userId, score: { gte: 0.7 } }, distinct: ['topicSlug'] })
        .then((rows) => rows.length),
      prisma.lessonPlan.count({ where: { userId, completedCount: { gt: 0 } } }),
    ]);

  return {
    streak: user.streakCount,
    wordsLearned,
    xp: user.xp,
    level: user.rankLevel,
    ieltsAttempts,
    satAttempts,
    writingSubmissions,
    grammarTopicsCompleted,
    lessonsCompleted,
  };
}

export async function syncAchievements(userId: string, catalog: SeedAchievement[]): Promise<SeedAchievement[]> {
  const [stats, unlocked] = await Promise.all([
    buildUserStatsSnapshot(userId),
    prisma.userAchievement.findMany({ where: { userId }, select: { achievementSlug: true } }),
  ]);

  const unlockedSlugs = new Set(unlocked.map((u) => u.achievementSlug));
  const newlyUnlocked = findNewlyUnlockedAchievements(stats, catalog, unlockedSlugs);

  if (newlyUnlocked.length > 0) {
    await prisma.userAchievement.createMany({
      data: newlyUnlocked.map((a) => ({ userId, achievementSlug: a.slug })),
      skipDuplicates: true,
    });
  }

  return newlyUnlocked;
}
