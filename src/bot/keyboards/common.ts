import { InlineKeyboard } from 'grammy';
import { t, type SupportedLocale } from '../../i18n/index.js';

export function yesNoKeyboard(locale: SupportedLocale, yesData: string, noData: string): InlineKeyboard {
  return new InlineKeyboard()
    .text(t(locale, 'common.yes'), yesData)
    .text(t(locale, 'common.no'), noData);
}

export function backButton(locale: SupportedLocale, data: string): InlineKeyboard {
  return new InlineKeyboard().text(t(locale, 'common.back'), data);
}
