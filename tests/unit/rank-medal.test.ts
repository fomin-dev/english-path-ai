import { describe, expect, it } from 'vitest';
import { rankMedal } from '../../src/core/leaderboard/rank-medal.js';

describe('rankMedal', () => {
  it('returns medal emoji for the top 3 ranks', () => {
    expect(rankMedal(1)).toBe('🥇');
    expect(rankMedal(2)).toBe('🥈');
    expect(rankMedal(3)).toBe('🥉');
  });

  it('falls back to a plain "#N" label outside the top 3', () => {
    expect(rankMedal(4)).toBe('#4');
    expect(rankMedal(100)).toBe('#100');
  });
});
