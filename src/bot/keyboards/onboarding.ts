import { InlineKeyboard } from 'grammy';
import { t, type SupportedLocale } from '../../i18n/index.js';
import type { TestableCefrLevel } from '../../core/placement-test/types.js';
import type { FullCefrLevel, SkillFocus } from '../../core/roadmap/generator.js';

export function languageKeyboard(): InlineKeyboard {
  return new InlineKeyboard()
    .text('🇺🇦 Українська', 'lang:uk')
    .row()
    .text('🇷🇺 Русский', 'lang:ru')
    .row()
    .text('🇺🇸 English', 'lang:en');
}

export function knowLevelKeyboard(locale: SupportedLocale): InlineKeyboard {
  return new InlineKeyboard()
    .text(t(locale, 'common.yes'), 'know_level:yes')
    .text(t(locale, 'common.no'), 'know_level:no');
}

const LEVEL_KEYS: Record<FullCefrLevel, string> = {
  A0: 'onboarding.level_beginner',
  A1: 'onboarding.level_a1',
  A2: 'onboarding.level_a2',
  B1: 'onboarding.level_b1',
  B2: 'onboarding.level_b2',
  C1: 'onboarding.level_c1',
  C2: 'onboarding.level_c2',
};

export function pickLevelKeyboard(locale: SupportedLocale, prefix = 'level'): InlineKeyboard {
  const kb = new InlineKeyboard();
  (Object.keys(LEVEL_KEYS) as FullCefrLevel[]).forEach((level, idx) => {
    kb.text(t(locale, LEVEL_KEYS[level]), `${prefix}:${level}`);
    if (idx % 2 === 1) kb.row();
  });
  return kb;
}

/** Only levels strictly above `current` — used when picking a target level. */
export function pickTargetLevelKeyboard(locale: SupportedLocale, current: FullCefrLevel): InlineKeyboard {
  const order: FullCefrLevel[] = ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const above = order.slice(order.indexOf(current) + 1);
  const kb = new InlineKeyboard();
  above.forEach((level, idx) => {
    kb.text(t(locale, LEVEL_KEYS[level]), `target:${level}`);
    if (idx % 2 === 1) kb.row();
  });
  return kb;
}

export function testAnswerKeyboard(options: string[]): InlineKeyboard {
  const kb = new InlineKeyboard();
  options.forEach((opt, idx) => {
    const label = opt.length > 60 ? `${opt.slice(0, 57)}…` : opt;
    kb.text(label, `test_answer:${idx}`).row();
  });
  return kb;
}

export function startTestKeyboard(locale: SupportedLocale): InlineKeyboard {
  return new InlineKeyboard().text(t(locale, 'onboarding.test_start_button'), 'test:start');
}

export function timeframeKeyboard(locale: SupportedLocale): InlineKeyboard {
  return new InlineKeyboard()
    .text(t(locale, 'goals.timeframe_3m'), 'timeframe:3')
    .text(t(locale, 'goals.timeframe_6m'), 'timeframe:6')
    .row()
    .text(t(locale, 'goals.timeframe_1y'), 'timeframe:12')
    .text(t(locale, 'goals.timeframe_custom'), 'timeframe:custom');
}

const FOCUS_KEYS: Record<SkillFocus, string> = {
  SPEAKING: 'goals.focus_speaking',
  LISTENING: 'goals.focus_listening',
  READING: 'goals.focus_reading',
  WRITING: 'goals.focus_writing',
  GRAMMAR: 'goals.focus_grammar',
  VOCABULARY: 'goals.focus_vocabulary',
  PRONUNCIATION: 'goals.focus_pronunciation',
  IELTS: 'goals.focus_ielts',
  SAT: 'goals.focus_sat',
  ACADEMIC: 'goals.focus_academic',
  EVERYDAY: 'goals.focus_everyday',
  BUSINESS: 'goals.focus_business',
  OTHER: 'goals.focus_other',
};

const FOCUS_ORDER: SkillFocus[] = [
  'SPEAKING',
  'LISTENING',
  'READING',
  'WRITING',
  'GRAMMAR',
  'VOCABULARY',
  'PRONUNCIATION',
  'IELTS',
  'SAT',
  'ACADEMIC',
  'EVERYDAY',
  'BUSINESS',
  'OTHER',
];

export function focusSelectKeyboard(locale: SupportedLocale, selected: SkillFocus[]): InlineKeyboard {
  const kb = new InlineKeyboard();
  FOCUS_ORDER.forEach((skill, idx) => {
    const isSelected = selected.includes(skill);
    const label = `${isSelected ? '✅ ' : ''}${t(locale, FOCUS_KEYS[skill])}`;
    kb.text(label, `focus:${skill}`);
    if (idx % 2 === 1) kb.row();
  });
  kb.row().text(t(locale, 'common.done'), 'focus:done');
  return kb;
}

export function dailyMinutesKeyboard(locale: SupportedLocale): InlineKeyboard {
  return new InlineKeyboard()
    .text(t(locale, 'goals.minutes_10'), 'minutes:10')
    .text(t(locale, 'goals.minutes_15'), 'minutes:15')
    .row()
    .text(t(locale, 'goals.minutes_30'), 'minutes:30')
    .text(t(locale, 'goals.minutes_60'), 'minutes:60');
}

export type { TestableCefrLevel };
