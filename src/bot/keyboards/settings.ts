import { InlineKeyboard } from 'grammy';
import { t, type SupportedLocale } from '../../i18n/index.js';

export function settingsMenuKeyboard(locale: SupportedLocale): InlineKeyboard {
  return new InlineKeyboard()
    .text(t(locale, 'settings.change_language'), 'settings:change_language')
    .row()
    .text(t(locale, 'settings.change_goal'), 'settings:change_goal')
    .row()
    .text(t(locale, 'settings.toggle_notifications'), 'settings:toggle_notifications')
    .row()
    .text(t(locale, 'settings.change_reminder_times'), 'settings:change_reminder_times');
}

export function settingsLanguageKeyboard(): InlineKeyboard {
  return new InlineKeyboard()
    .text('🇺🇦 Українська', 'settings:lang:uk')
    .row()
    .text('🇷🇺 Русский', 'settings:lang:ru')
    .row()
    .text('🇺🇸 English', 'settings:lang:en');
}

export function settingsMinutesKeyboard(locale: SupportedLocale): InlineKeyboard {
  return new InlineKeyboard()
    .text(t(locale, 'goals.minutes_10'), 'settings:minutes:10')
    .text(t(locale, 'goals.minutes_15'), 'settings:minutes:15')
    .row()
    .text(t(locale, 'goals.minutes_30'), 'settings:minutes:30')
    .text(t(locale, 'goals.minutes_60'), 'settings:minutes:60');
}
