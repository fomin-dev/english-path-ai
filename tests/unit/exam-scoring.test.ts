import { describe, expect, it } from 'vitest';
import { estimateBandFromAccuracy, estimateBandFromCefr, overallBand } from '../../src/core/ielts/scoring.js';
import { estimateScaledScore } from '../../src/core/sat/scoring.js';

describe('IELTS band estimation', () => {
  it('maps 0% accuracy to band 1 and 100% to band 9', () => {
    expect(estimateBandFromAccuracy(0, 10)).toBe(1);
    expect(estimateBandFromAccuracy(10, 10)).toBe(9);
  });

  it('rounds to the nearest half band', () => {
    const band = estimateBandFromAccuracy(5, 10);
    expect(band % 0.5).toBe(0);
  });

  it('handles a zero-question edge case without dividing by zero', () => {
    expect(estimateBandFromAccuracy(0, 0)).toBe(0);
  });

  it('aligns CEFR levels to a monotonically increasing band scale', () => {
    const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    const bands = levels.map(estimateBandFromCefr);
    for (let i = 1; i < bands.length; i++) {
      expect(bands[i]).toBeGreaterThan(bands[i - 1]!);
    }
  });

  it('overallBand averages section bands to the nearest half point', () => {
    expect(overallBand([6, 7])).toBe(6.5);
    expect(overallBand([])).toBe(0);
  });
});

describe('SAT scaled score estimation', () => {
  it('maps 0% to 200 and 100% to 800', () => {
    expect(estimateScaledScore(0, 10)).toBe(200);
    expect(estimateScaledScore(10, 10)).toBe(800);
  });

  it('rounds to the nearest 10 points', () => {
    const score = estimateScaledScore(7, 15);
    expect(score % 10).toBe(0);
  });

  it('defaults to the floor score when there are no questions', () => {
    expect(estimateScaledScore(0, 0)).toBe(200);
  });
});
