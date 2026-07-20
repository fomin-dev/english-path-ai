import { describe, expect, it } from 'vitest';
import { levelFromXp, rankTitleKey, totalXpForLevel } from '../../src/core/gamification/xp.js';

describe('XP level curve', () => {
  it('level 1 requires 0 XP', () => {
    expect(totalXpForLevel(1)).toBe(0);
    expect(levelFromXp(0).level).toBe(1);
  });

  it('is monotonically increasing', () => {
    for (let lvl = 1; lvl < 30; lvl++) {
      expect(totalXpForLevel(lvl + 1)).toBeGreaterThan(totalXpForLevel(lvl));
    }
  });

  it('levelFromXp round-trips against totalXpForLevel boundaries', () => {
    const boundary = totalXpForLevel(5);
    expect(levelFromXp(boundary).level).toBe(5);
    expect(levelFromXp(boundary - 1).level).toBe(4);
  });

  it('reports progress ratio within the current level', () => {
    const progress = levelFromXp(totalXpForLevel(3) + 10);
    expect(progress.level).toBe(3);
    expect(progress.xpIntoLevel).toBe(10);
    expect(progress.progressRatio).toBeGreaterThan(0);
    expect(progress.progressRatio).toBeLessThan(1);
  });

  it('assigns higher rank titles at higher levels', () => {
    expect(rankTitleKey(1)).toBe('rank.newcomer');
    expect(rankTitleKey(45)).toBe('rank.virtuoso');
    expect(rankTitleKey(100)).toBe('rank.virtuoso');
  });
});
