import { prisma } from '../client.js';

export async function getGlobalStats() {
  const sevenDaysAgo = new Date(Date.now() - 7 * 86_400_000);
  const [totalUsers, activeUsers, streakAgg, xpAgg] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { lastActiveDate: { gte: sevenDaysAgo } } }),
    prisma.user.aggregate({ _avg: { streakCount: true } }),
    prisma.user.aggregate({ _sum: { xp: true } }),
  ]);

  return {
    totalUsers,
    activeUsers,
    avgStreak: Math.round((streakAgg._avg.streakCount ?? 0) * 10) / 10,
    totalXp: xpAgg._sum.xp ?? 0,
  };
}

export function getAllActiveUserTelegramIds(): Promise<Array<{ telegramId: bigint }>> {
  return prisma.user.findMany({ where: { isBanned: false }, select: { telegramId: true } });
}

export function findUserByUsernameOrId(query: string) {
  const numeric = /^\d+$/.test(query) ? BigInt(query) : undefined;
  return prisma.user.findFirst({
    where: numeric !== undefined ? { telegramId: numeric } : { username: query.replace(/^@/, '') },
  });
}
