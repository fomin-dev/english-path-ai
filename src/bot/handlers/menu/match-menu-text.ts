import { SUPPORTED_LOCALES, t } from '../../../i18n/index.js';

/** Reply-keyboard buttons send back plain text in whatever locale they were rendered in,
 * so route on this (all 3 locale variants) instead of a single hard-coded string. */
export function menuLabels(key: string): string[] {
  return SUPPORTED_LOCALES.map((locale) => t(locale, key));
}

const MENU_KEYS = [
  'menu.lesson',
  'menu.vocabulary',
  'menu.grammar',
  'menu.reading',
  'menu.listening',
  'menu.writing',
  'menu.tutor',
  'menu.ielts',
  'menu.sat',
  'menu.stats',
  'menu.settings',
  'menu.admin',
];

const ALL_MENU_LABELS = new Set(MENU_KEYS.flatMap((key) => menuLabels(key)));

/** True if `text` is exactly one of the main-menu button labels (in any supported locale) —
 * used by "waiting for free text" handlers (Writing, AI Tutor, admin broadcast...) to bail
 * out and let the learner navigate away instead of swallowing the menu tap as their answer. */
export function isMenuLabel(text: string): boolean {
  return ALL_MENU_LABELS.has(text);
}
