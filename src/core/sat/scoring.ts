/**
 * Digital SAT Reading & Writing section is officially scored 200-800 via an
 * adaptive multi-stage-test model we don't reproduce here. Instead we scale
 * the learner's raw accuracy linearly onto that same 200-800 range, rounded
 * to the nearest 10 (matching the real score granularity), and label it
 * clearly as an estimate everywhere it's shown.
 */
export function estimateScaledScore(correct: number, total: number): number {
  if (total === 0) return 200;
  const ratio = correct / total;
  const raw = 200 + ratio * 600;
  return Math.round(raw / 10) * 10;
}
