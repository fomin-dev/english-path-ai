import { describe, expect, it } from 'vitest';
import { findNewlyUnlockedAchievements, type SeedAchievement, type UserStatsSnapshot } from '../../src/core/gamification/achievements.js';

const baseStats: UserStatsSnapshot = {
  streak: 0,
  wordsLearned: 0,
  xp: 0,
  level: 1,
  ieltsAttempts: 0,
  satAttempts: 0,
  writingSubmissions: 0,
  grammarTopicsCompleted: 0,
  lessonsCompleted: 0,
};

const content = { en: { title: 't', description: 'd' }, ru: { title: 't', description: 'd' }, uk: { title: 't', description: 'd' } };

const catalog: SeedAchievement[] = [
  { slug: 'streak-3', icon: '🔥', content, criteriaType: 'streak', criteriaValue: 3 },
  { slug: 'words-50', icon: '📚', content, criteriaType: 'words_learned', criteriaValue: 50 },
];

describe('achievement unlocking', () => {
  it('unlocks nothing when stats are below every threshold', () => {
    expect(findNewlyUnlockedAchievements(baseStats, catalog, new Set())).toEqual([]);
  });

  it('unlocks an achievement once its threshold is met', () => {
    const stats = { ...baseStats, streak: 3 };
    const unlocked = findNewlyUnlockedAchievements(stats, catalog, new Set());
    expect(unlocked.map((a) => a.slug)).toEqual(['streak-3']);
  });

  it('does not re-unlock an achievement the learner already has', () => {
    const stats = { ...baseStats, streak: 10 };
    const unlocked = findNewlyUnlockedAchievements(stats, catalog, new Set(['streak-3']));
    expect(unlocked).toEqual([]);
  });

  it('can unlock multiple achievements in one pass', () => {
    const stats = { ...baseStats, streak: 5, wordsLearned: 60 };
    const unlocked = findNewlyUnlockedAchievements(stats, catalog, new Set());
    expect(unlocked.map((a) => a.slug).sort()).toEqual(['streak-3', 'words-50']);
  });
});
