import { prisma } from '../client.js';
import { countLearnedWords } from './vocab.repository.js';

export async function getStatsSummary(userId: string) {
  const [user, daysLearning, wordsLearned, wordsMastered, taskAgg] = await Promise.all([
    prisma.user.findUniqueOrThrow({ where: { id: userId } }),
    prisma.streakLog.count({ where: { userId } }),
    countLearnedWords(userId),
    prisma.userVocabCard.count({ where: { userId, status: 'MASTERED' } }),
    prisma.lessonPlan.aggregate({
      where: { userId },
      _sum: { completedCount: true, totalCount: true },
    }),
  ]);

  return {
    user,
    daysLearning,
    wordsLearned,
    wordsMastered,
    tasksCompleted: taskAgg._sum.completedCount ?? 0,
    tasksPlanned: taskAgg._sum.totalCount ?? 0,
  };
}
