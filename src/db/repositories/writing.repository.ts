import { prisma } from '../client.js';
import type { CefrLevel } from '@prisma/client';
import type { WritingCheckResult } from '../../ai/types.js';

export function saveWritingSubmission(
  userId: string,
  originalText: string,
  prompt: string | undefined,
  result: WritingCheckResult,
) {
  return prisma.writingSubmission.create({
    data: {
      userId,
      originalText,
      prompt,
      correctedText: result.correctedText,
      feedback: result as unknown as object,
      estimatedLevel: result.estimatedLevel as CefrLevel,
    },
  });
}
