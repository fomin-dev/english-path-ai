/** XP economy: how much XP tasks award, and the level curve XP maps onto. */

export const XP_REWARDS = {
  GRAMMAR: 10,
  VOCABULARY: 5,
  READING: 15,
  LISTENING: 15,
  WRITING: 20,
  TRANSLATION: 8,
  SENTENCE_BUILDING: 8,
  SPEAKING: 12,
  SHADOWING: 10,
  FLASHCARDS: 3,
  MINI_TEST: 15,
  REVIEW: 3,
  DAILY_GOAL_BONUS: 25,
  STREAK_MILESTONE_BONUS: 50,
  PLACEMENT_TEST_COMPLETED: 30,
  IELTS_MOCK_COMPLETED: 40,
  SAT_MOCK_COMPLETED: 40,
} as const;

export type XpReason = keyof typeof XP_REWARDS;

/** Cumulative XP required to *reach* the given level (level 1 = 0 XP). */
export function totalXpForLevel(level: number): number {
  if (level <= 1) return 0;
  return 100 * (level - 1) * (level - 1);
}

export interface LevelProgress {
  level: number;
  xpIntoLevel: number;
  xpForNextLevel: number;
  progressRatio: number; // 0..1
}

export function levelFromXp(totalXp: number): LevelProgress {
  let level = 1;
  while (totalXpForLevel(level + 1) <= totalXp) {
    level += 1;
  }
  const floor = totalXpForLevel(level);
  const ceil = totalXpForLevel(level + 1);
  const xpForNextLevel = ceil - floor;
  const xpIntoLevel = totalXp - floor;
  return {
    level,
    xpIntoLevel,
    xpForNextLevel,
    progressRatio: xpForNextLevel === 0 ? 1 : xpIntoLevel / xpForNextLevel,
  };
}

const RANK_TITLES: Array<{ minLevel: number; key: string }> = [
  { minLevel: 1, key: 'rank.newcomer' },
  { minLevel: 5, key: 'rank.learner' },
  { minLevel: 10, key: 'rank.achiever' },
  { minLevel: 15, key: 'rank.scholar' },
  { minLevel: 20, key: 'rank.expert' },
  { minLevel: 30, key: 'rank.master' },
  { minLevel: 45, key: 'rank.virtuoso' },
];

/** Returns an i18n key for the learner's rank title; render it via the i18n layer. */
export function rankTitleKey(level: number): string {
  let current = RANK_TITLES[0]!;
  for (const rank of RANK_TITLES) {
    if (level >= rank.minLevel) current = rank;
  }
  return current.key;
}
