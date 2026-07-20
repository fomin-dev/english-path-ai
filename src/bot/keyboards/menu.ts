import { Keyboard } from 'grammy';
import { t, type SupportedLocale } from '../../i18n/index.js';

export function mainMenuKeyboard(locale: SupportedLocale, isAdmin: boolean): Keyboard {
  const kb = new Keyboard()
    .text(t(locale, 'menu.lesson'))
    .row()
    .text(t(locale, 'menu.vocabulary'))
    .text(t(locale, 'menu.grammar'))
    .row()
    .text(t(locale, 'menu.reading'))
    .text(t(locale, 'menu.listening'))
    .row()
    .text(t(locale, 'menu.writing'))
    .text(t(locale, 'menu.tutor'))
    .row()
    .text(t(locale, 'menu.ielts'))
    .text(t(locale, 'menu.sat'))
    .row()
    .text(t(locale, 'menu.stats'))
    .text(t(locale, 'menu.settings'));

  if (isAdmin) {
    kb.row().text(t(locale, 'menu.admin'));
  }

  return kb.resized();
}
