/**
 * IELTS band estimation. Our practice sets are much shorter than a real 40-
 * question IELTS Reading/Listening section, so rather than reusing the
 * official raw-score conversion table (which assumes exactly 40 items) we
 * scale the learner's accuracy ratio onto the 1-9 band scale directly. This
 * is clearly surfaced to the learner as an *estimate*, not an official score.
 */

export function estimateBandFromAccuracy(correct: number, total: number): number {
  if (total === 0) return 0;
  const ratio = correct / total;
  const raw = 1 + ratio * 8; // 0% -> band 1, 100% -> band 9
  return Math.round(raw * 2) / 2; // nearest 0.5
}

const CEFR_TO_BAND: Record<string, number> = {
  A1: 3,
  A2: 3.5,
  B1: 4.5,
  B2: 6,
  C1: 7.5,
  C2: 8.5,
};

/** Rough CEFR→IELTS band alignment (based on published Cambridge/IELTS comparison tables). */
export function estimateBandFromCefr(level: string): number {
  return CEFR_TO_BAND[level] ?? 5;
}

export function overallBand(sectionBands: number[]): number {
  if (sectionBands.length === 0) return 0;
  const avg = sectionBands.reduce((a, b) => a + b, 0) / sectionBands.length;
  return Math.round(avg * 2) / 2;
}
