import type { AchievementCriteriaType, SeedAchievement } from '../core/gamification/achievements.js';

export type { AchievementCriteriaType, SeedAchievement };

export const achievements: SeedAchievement[] = [
  {
    slug: 'first-steps',
    icon: '👣',
    content: {
      en: { title: 'First Steps', description: 'Complete your first daily lesson' },
      ru: { title: 'Первые шаги', description: 'Завершите свой первый урок дня' },
      uk: { title: 'Перші кроки', description: 'Завершіть свій перший урок дня' },
    },
    criteriaType: 'lessons_completed',
    criteriaValue: 1,
  },
  {
    slug: 'streak-3',
    icon: '🔥',
    content: {
      en: { title: 'Warming Up', description: 'Reach a 3-day streak' },
      ru: { title: 'Разогрев', description: 'Серия из 3 дней подряд' },
      uk: { title: 'Розігрів', description: 'Серія з 3 днів поспіль' },
    },
    criteriaType: 'streak',
    criteriaValue: 3,
  },
  {
    slug: 'streak-7',
    icon: '🔥',
    content: {
      en: { title: 'One Week Strong', description: 'Reach a 7-day streak' },
      ru: { title: 'Целая неделя', description: 'Серия из 7 дней подряд' },
      uk: { title: 'Цілий тиждень', description: 'Серія з 7 днів поспіль' },
    },
    criteriaType: 'streak',
    criteriaValue: 7,
  },
  {
    slug: 'streak-14',
    icon: '🔥',
    content: {
      en: { title: 'Two Weeks In', description: 'Reach a 14-day streak' },
      ru: { title: 'Две недели', description: 'Серия из 14 дней подряд' },
      uk: { title: 'Два тижні', description: 'Серія з 14 днів поспіль' },
    },
    criteriaType: 'streak',
    criteriaValue: 14,
  },
  {
    slug: 'streak-30',
    icon: '🏅',
    content: {
      en: { title: 'Unstoppable', description: 'Reach a 30-day streak' },
      ru: { title: 'Неудержимый', description: 'Серия из 30 дней подряд' },
      uk: { title: 'Нестримний', description: 'Серія з 30 днів поспіль' },
    },
    criteriaType: 'streak',
    criteriaValue: 30,
  },
  {
    slug: 'streak-100',
    icon: '💎',
    content: {
      en: { title: 'Centurion', description: 'Reach a 100-day streak' },
      ru: { title: 'Центурион', description: 'Серия из 100 дней подряд' },
      uk: { title: 'Центуріон', description: 'Серія зі 100 днів поспіль' },
    },
    criteriaType: 'streak',
    criteriaValue: 100,
  },
  {
    slug: 'words-50',
    icon: '🗂',
    content: {
      en: { title: 'Word Collector', description: 'Learn 50 words' },
      ru: { title: 'Коллекционер слов', description: 'Выучите 50 слов' },
      uk: { title: 'Колекціонер слів', description: 'Вивчіть 50 слів' },
    },
    criteriaType: 'words_learned',
    criteriaValue: 50,
  },
  {
    slug: 'words-150',
    icon: '📚',
    content: {
      en: { title: 'Vocabulary Builder', description: 'Learn 150 words' },
      ru: { title: 'Строитель словаря', description: 'Выучите 150 слов' },
      uk: { title: 'Будівельник словника', description: 'Вивчіть 150 слів' },
    },
    criteriaType: 'words_learned',
    criteriaValue: 150,
  },
  {
    slug: 'words-500',
    icon: '🧠',
    content: {
      en: { title: 'Lexicon Master', description: 'Learn 500 words' },
      ru: { title: 'Мастер лексики', description: 'Выучите 500 слов' },
      uk: { title: 'Майстер лексики', description: 'Вивчіть 500 слів' },
    },
    criteriaType: 'words_learned',
    criteriaValue: 500,
  },
  {
    slug: 'xp-1000',
    icon: '⭐',
    content: {
      en: { title: 'Rising Star', description: 'Earn 1,000 XP' },
      ru: { title: 'Восходящая звезда', description: 'Наберите 1000 XP' },
      uk: { title: 'Зірка, що сходить', description: 'Наберіть 1000 XP' },
    },
    criteriaType: 'xp',
    criteriaValue: 1000,
  },
  {
    slug: 'xp-10000',
    icon: '🌟',
    content: {
      en: { title: 'XP Machine', description: 'Earn 10,000 XP' },
      ru: { title: 'Машина по набору XP', description: 'Наберите 10 000 XP' },
      uk: { title: 'Машина з набору XP', description: 'Наберіть 10 000 XP' },
    },
    criteriaType: 'xp',
    criteriaValue: 10_000,
  },
  {
    slug: 'level-10',
    icon: '🎮',
    content: {
      en: { title: 'Double Digits', description: 'Reach level 10' },
      ru: { title: 'Две цифры', description: 'Достигните 10 уровня' },
      uk: { title: 'Дві цифри', description: 'Досягніть 10 рівня' },
    },
    criteriaType: 'level',
    criteriaValue: 10,
  },
  {
    slug: 'lessons-7',
    icon: '📆',
    content: {
      en: { title: 'Getting Into Rhythm', description: 'Complete 7 daily lessons' },
      ru: { title: 'Входим в ритм', description: 'Завершите 7 уроков дня' },
      uk: { title: 'Входимо в ритм', description: 'Завершіть 7 уроків дня' },
    },
    criteriaType: 'lessons_completed',
    criteriaValue: 7,
  },
  {
    slug: 'lessons-30',
    icon: '🗓',
    content: {
      en: { title: 'A Month of Progress', description: 'Complete 30 daily lessons' },
      ru: { title: 'Месяц прогресса', description: 'Завершите 30 уроков дня' },
      uk: { title: 'Місяць прогресу', description: 'Завершіть 30 уроків дня' },
    },
    criteriaType: 'lessons_completed',
    criteriaValue: 30,
  },
  {
    slug: 'lessons-100',
    icon: '🏆',
    content: {
      en: { title: 'Habit Formed', description: 'Complete 100 daily lessons' },
      ru: { title: 'Привычка сформирована', description: 'Завершите 100 уроков дня' },
      uk: { title: 'Звичку сформовано', description: 'Завершіть 100 уроків дня' },
    },
    criteriaType: 'lessons_completed',
    criteriaValue: 100,
  },
  {
    slug: 'grammar-10',
    icon: '📘',
    content: {
      en: { title: 'Grammar Apprentice', description: 'Complete 10 grammar topics' },
      ru: { title: 'Ученик грамматики', description: 'Пройдите 10 тем по грамматике' },
      uk: { title: 'Учень граматики', description: 'Пройдіть 10 тем з граматики' },
    },
    criteriaType: 'grammar_topics_completed',
    criteriaValue: 10,
  },
  {
    slug: 'grammar-all',
    icon: '🎓',
    content: {
      en: { title: 'Grammar Guru', description: 'Complete every grammar topic' },
      ru: { title: 'Гуру грамматики', description: 'Пройдите все темы по грамматике' },
      uk: { title: 'Гуру граматики', description: 'Пройдіть усі теми з граматики' },
    },
    criteriaType: 'grammar_topics_completed',
    criteriaValue: 24,
  },
  {
    slug: 'writing-1',
    icon: '✍️',
    content: {
      en: { title: 'First Draft', description: 'Submit your first text to the Writing Checker' },
      ru: { title: 'Первый черновик', description: 'Отправьте первый текст в проверку Writing' },
      uk: { title: 'Перша чернетка', description: 'Надішліть перший текст у перевірку Writing' },
    },
    criteriaType: 'writing_submissions',
    criteriaValue: 1,
  },
  {
    slug: 'writing-25',
    icon: '📝',
    content: {
      en: { title: 'Seasoned Writer', description: 'Submit 25 texts to the Writing Checker' },
      ru: { title: 'Опытный автор', description: 'Отправьте 25 текстов в проверку Writing' },
      uk: { title: 'Досвідчений автор', description: 'Надішліть 25 текстів у перевірку Writing' },
    },
    criteriaType: 'writing_submissions',
    criteriaValue: 25,
  },
  {
    slug: 'ielts-first-mock',
    icon: '🎓',
    content: {
      en: { title: 'IELTS Ready', description: 'Complete your first IELTS practice section' },
      ru: { title: 'Готов к IELTS', description: 'Завершите первый пробный раздел IELTS' },
      uk: { title: 'Готовий до IELTS', description: 'Завершіть перший пробний розділ IELTS' },
    },
    criteriaType: 'ielts_attempts',
    criteriaValue: 1,
  },
  {
    slug: 'sat-first-mock',
    icon: '🎯',
    content: {
      en: { title: 'SAT Ready', description: 'Complete your first SAT practice section' },
      ru: { title: 'Готов к SAT', description: 'Завершите первый пробный раздел SAT' },
      uk: { title: 'Готовий до SAT', description: 'Завершіть перший пробний розділ SAT' },
    },
    criteriaType: 'sat_attempts',
    criteriaValue: 1,
  },
];
