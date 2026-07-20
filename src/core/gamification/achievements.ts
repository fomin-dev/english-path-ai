export interface AchievementLocaleContent {
  title: string;
  description: string;
}

export type AchievementCriteriaType =
  | 'streak'
  | 'words_learned'
  | 'xp'
  | 'level'
  | 'ielts_attempts'
  | 'sat_attempts'
  | 'writing_submissions'
  | 'grammar_topics_completed'
  | 'lessons_completed';

export interface SeedAchievement {
  slug: string;
  icon: string;
  content: { en: AchievementLocaleContent; ru: AchievementLocaleContent; uk: AchievementLocaleContent };
  criteriaType: AchievementCriteriaType;
  criteriaValue: number;
}

export interface UserStatsSnapshot {
  streak: number;
  wordsLearned: number;
  xp: number;
  level: number;
  ieltsAttempts: number;
  satAttempts: number;
  writingSubmissions: number;
  grammarTopicsCompleted: number;
  lessonsCompleted: number;
}

const STAT_BY_CRITERIA: Record<AchievementCriteriaType, keyof UserStatsSnapshot> = {
  streak: 'streak',
  words_learned: 'wordsLearned',
  xp: 'xp',
  level: 'level',
  ielts_attempts: 'ieltsAttempts',
  sat_attempts: 'satAttempts',
  writing_submissions: 'writingSubmissions',
  grammar_topics_completed: 'grammarTopicsCompleted',
  lessons_completed: 'lessonsCompleted',
};

/** Returns achievements the learner has just qualified for but doesn't already hold. */
export function findNewlyUnlockedAchievements(
  stats: UserStatsSnapshot,
  catalog: SeedAchievement[],
  alreadyUnlockedSlugs: ReadonlySet<string>,
): SeedAchievement[] {
  return catalog.filter((achievement) => {
    if (alreadyUnlockedSlugs.has(achievement.slug)) return false;
    const statKey = STAT_BY_CRITERIA[achievement.criteriaType];
    return stats[statKey] >= achievement.criteriaValue;
  });
}
