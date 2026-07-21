import { prisma } from '../client.js';
import { DEFAULT_SRS_STATE, reviewCard, type ReviewGrade } from '../../core/srs/sm2.js';

export function vocabKey(word: string, partOfSpeech: string): string {
  return `${word}::${partOfSpeech}`;
}

export function getDueCards(userId: string, limit = 20) {
  return prisma.userVocabCard.findMany({
    where: { userId, dueDate: { lte: new Date() } },
    orderBy: { dueDate: 'asc' },
    take: limit,
  });
}

export function countDueCards(userId: string): Promise<number> {
  return prisma.userVocabCard.count({ where: { userId, dueDate: { lte: new Date() } } });
}

export function countLearnedWords(userId: string): Promise<number> {
  return prisma.userVocabCard.count({
    where: { userId, status: { in: ['REVIEW', 'MASTERED'] } },
  });
}

/** Adds a word to the learner's deck if it isn't already there (idempotent). */
export async function ensureCard(userId: string, wordKey: string) {
  return prisma.userVocabCard.upsert({
    where: { userId_wordKey: { userId, wordKey } },
    create: { userId, wordKey, ...DEFAULT_SRS_STATE, dueDate: new Date() },
    update: {},
  });
}

export async function reviewVocabCard(userId: string, wordKey: string, grade: ReviewGrade) {
  const card = await prisma.userVocabCard.upsert({
    where: { userId_wordKey: { userId, wordKey } },
    create: { userId, wordKey, ...DEFAULT_SRS_STATE, dueDate: new Date() },
    update: {},
  });

  const result = reviewCard(
    {
      easeFactor: card.easeFactor,
      intervalDays: card.intervalDays,
      repetitions: card.repetitions,
      lapses: card.lapses,
    },
    grade,
  );

  return prisma.userVocabCard.update({
    where: { id: card.id },
    data: {
      easeFactor: result.easeFactor,
      intervalDays: result.intervalDays,
      repetitions: result.repetitions,
      lapses: result.lapses,
      dueDate: result.dueDate,
      status: result.status,
      lastReviewedAt: new Date(),
    },
  });
}

export function toggleFavorite(userId: string, wordKey: string, isFavorite: boolean) {
  return prisma.userVocabCard.update({
    where: { userId_wordKey: { userId, wordKey } },
    data: { isFavorite },
  });
}

export function getFavorites(userId: string) {
  return prisma.userVocabCard.findMany({ where: { userId, isFavorite: true } });
}

export async function getAllUserWordKeys(userId: string): Promise<Set<string>> {
  const cards = await prisma.userVocabCard.findMany({ where: { userId }, select: { wordKey: true } });
  return new Set(cards.map((c) => c.wordKey));
}

export function getAllUserCards(userId: string) {
  return prisma.userVocabCard.findMany({ where: { userId }, orderBy: { wordKey: 'asc' } });
}

export function getCardByKey(userId: string, wordKey: string) {
  return prisma.userVocabCard.findUnique({ where: { userId_wordKey: { userId, wordKey } } });
}
