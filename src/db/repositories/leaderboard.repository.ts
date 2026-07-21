import { prisma } from '../client.js';

export interface LeaderboardEntry {
  userId: string;
  displayName: string;
  xp: number;
  rankLevel: number;
}

/** Top N opted-in learners by XP. Users who never opted in never appear here. */
export async function getTopLeaderboard(limit = 10): Promise<LeaderboardEntry[]> {
  const users = await prisma.user.findMany({
    where: { leaderboardOptIn: true, isBanned: false },
    orderBy: { xp: 'desc' },
    take: limit,
    select: { id: true, username: true, firstName: true, xp: true, rankLevel: true },
  });
  return users.map((u) => ({
    userId: u.id,
    displayName: u.username ? `@${u.username}` : (u.firstName ?? 'Learner'),
    xp: u.xp,
    rankLevel: u.rankLevel,
  }));
}

/** 1-indexed rank among opted-in, non-banned learners, or null if the user isn't opted in. */
export async function getUserLeaderboardRank(userId: string): Promise<number | null> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { xp: true, leaderboardOptIn: true, isBanned: true },
  });
  if (!user || !user.leaderboardOptIn || user.isBanned) return null;

  const ahead = await prisma.user.count({
    where: { leaderboardOptIn: true, isBanned: false, xp: { gt: user.xp } },
  });
  return ahead + 1;
}
