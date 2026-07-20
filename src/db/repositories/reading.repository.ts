import { prisma } from '../client.js';

export function recordReadingAttempt(userId: string, textId: string, correctAnswers: number, totalQuestions: number) {
  return prisma.readingAttempt.create({
    data: { userId, textId, correctAnswers, totalQuestions, score: totalQuestions === 0 ? 0 : correctAnswers / totalQuestions },
  });
}

export function recordListeningAttempt(userId: string, exerciseId: string, correctAnswers: number, totalQuestions: number) {
  return prisma.listeningAttempt.create({
    data: { userId, exerciseId, correctAnswers, totalQuestions, score: totalQuestions === 0 ? 0 : correctAnswers / totalQuestions },
  });
}
