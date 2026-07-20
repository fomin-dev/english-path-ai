import { prisma } from '../client.js';
import type { IeltsSection, SatSection } from '@prisma/client';

export function recordIeltsAttempt(userId: string, section: IeltsSection, bandScore: number, details: unknown) {
  return prisma.ieltsAttempt.create({ data: { userId, section, bandScore, details: details as object } });
}

export function recordSatAttempt(userId: string, section: SatSection, score: number, details: unknown) {
  return prisma.satAttempt.create({ data: { userId, section, score, details: details as object } });
}
