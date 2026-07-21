import { InlineKeyboard } from 'grammy';
import { t, type SupportedLocale } from '../../i18n/index.js';

export function vocabMenuKeyboard(locale: SupportedLocale, dueCount: number, newCount: number): InlineKeyboard {
  const kb = new InlineKeyboard();
  if (dueCount > 0) kb.text(t(locale, 'vocab.review_due'), 'vocab:review_due').row();
  if (newCount > 0) kb.text(t(locale, 'vocab.learn_new'), 'vocab:learn_new').row();
  kb.text(t(locale, 'vocab.favorites'), 'vocab:favorites').row();
  kb.text(t(locale, 'vocab.export_anki'), 'vocab:export');
  return kb;
}

export function showAnswerKeyboard(locale: SupportedLocale, isFavorite: boolean): InlineKeyboard {
  return new InlineKeyboard()
    .text(t(locale, 'vocab.show_answer'), 'vocab:show_answer')
    .row()
    .text(t(locale, isFavorite ? 'vocab.favorite_remove' : 'vocab.favorite_add'), 'vocab:toggle_fav');
}

export function gradeKeyboard(locale: SupportedLocale): InlineKeyboard {
  return new InlineKeyboard()
    .text(t(locale, 'vocab.grade_again'), 'vocab:grade:again')
    .text(t(locale, 'vocab.grade_hard'), 'vocab:grade:hard')
    .row()
    .text(t(locale, 'vocab.grade_good'), 'vocab:grade:good')
    .text(t(locale, 'vocab.grade_easy'), 'vocab:grade:easy');
}
