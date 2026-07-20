import { prisma } from '../client.js';

export function recordGrammarAttempt(
  userId: string,
  topicSlug: string,
  correctAnswers: number,
  totalQuestions: number,
) {
  return prisma.grammarAttempt.create({
    data: { userId, topicSlug, correctAnswers, totalQuestions, score: totalQuestions === 0 ? 0 : correctAnswers / totalQuestions },
  });
}

export function getBestScoreByTopic(userId: string): Promise<Array<{ topicSlug: string; score: number }>> {
  return prisma.grammarAttempt
    .groupBy({ by: ['topicSlug'], where: { userId }, _max: { score: true } })
    .then((rows) => rows.map((r) => ({ topicSlug: r.topicSlug, score: r._max.score ?? 0 })));
}
