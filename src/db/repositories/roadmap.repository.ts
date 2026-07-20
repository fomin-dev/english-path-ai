import type { CefrLevel, SkillFocus } from '@prisma/client';
import { prisma } from '../client.js';
import type { RoadmapPhase } from '../../core/roadmap/generator.js';
import type { PlacementResult } from '../../core/placement-test/types.js';

export async function saveLearningGoal(
  userId: string,
  data: { targetLevel: CefrLevel; targetDate: Date; focusSkills: SkillFocus[]; weeklyMinutes: number },
) {
  await prisma.learningGoal.updateMany({ where: { userId, isActive: true }, data: { isActive: false } });
  return prisma.learningGoal.create({ data: { userId, ...data } });
}

export function saveRoadmap(userId: string, phases: RoadmapPhase[]) {
  return prisma.roadmap.upsert({
    where: { userId },
    create: { userId, phases: phases as unknown as object },
    update: {
      phases: phases as unknown as object,
      currentPhaseIndex: 0,
      version: { increment: 1 },
      lastAdaptedAt: new Date(),
    },
  });
}

export function getRoadmap(userId: string) {
  return prisma.roadmap.findUnique({ where: { userId } });
}

export function savePlacementResult(userId: string, result: PlacementResult, rawAnswers: unknown) {
  return prisma.placementTestResult.create({
    data: {
      userId,
      level: result.level,
      scoreGrammar: result.scoreGrammar,
      scoreVocabulary: result.scoreVocabulary,
      scoreReading: result.scoreReading,
      scoreUsage: result.scoreUsage,
      vocabEstimate: result.vocabEstimate,
      strongAreas: result.strongAreas,
      weakAreas: result.weakAreas,
      rawAnswers: rawAnswers as object,
    },
  });
}

export function getActiveGoal(userId: string) {
  return prisma.learningGoal.findFirst({ where: { userId, isActive: true }, orderBy: { createdAt: 'desc' } });
}
