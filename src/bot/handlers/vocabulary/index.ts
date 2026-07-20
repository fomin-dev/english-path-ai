import type { Bot } from 'grammy';
import { t } from '../../../i18n/index.js';
import type { BotContext, VocabReviewState } from '../../types.js';
import {
  countDueCards,
  getDueCards,
  ensureCard,
  reviewVocabCard,
  toggleFavorite,
  getFavorites,
  getAllUserWordKeys,
  getCardByKey,
} from '../../../db/repositories/vocab.repository.js';
import { vocabWordByKey, pickNewWords, countNewWords } from '../../../content/vocab/index.js';
import { vocabMenuKeyboard, showAnswerKeyboard, gradeKeyboard } from '../../keyboards/vocab.js';
import { awardXpAndNotify } from '../gamification/notify.js';
import { XP_REWARDS } from '../../../core/gamification/xp.js';
import type { ReviewGrade } from '../../../core/srs/sm2.js';

const NEW_WORDS_BATCH_SIZE = 5;

export async function showVocabMenu(ctx: BotContext): Promise<void> {
  const locale = ctx.session.locale;
  const [dueCount, ownedKeys] = await Promise.all([
    countDueCards(ctx.dbUser.id),
    getAllUserWordKeys(ctx.dbUser.id),
  ]);
  const newCount = countNewWords(ctx.dbUser.currentLevel ?? 'A1', ownedKeys);

  const lines = [
    t(locale, 'vocab.title'),
    t(locale, 'vocab.due_today', { count: dueCount }),
    t(locale, 'vocab.new_available', { count: newCount }),
  ];
  await ctx.reply(lines.join('\n'), {
    parse_mode: 'HTML',
    reply_markup: vocabMenuKeyboard(locale, dueCount, newCount),
  });
}

export async function startDueReview(ctx: BotContext): Promise<void> {
  const cards = await getDueCards(ctx.dbUser.id, 20);
  if (cards.length === 0) {
    await ctx.reply(t(ctx.session.locale, 'vocab.no_cards_due'));
    return;
  }
  ctx.session.vocabReview = { wordKeys: cards.map((c) => c.wordKey), index: 0, cardsReviewed: 0, mode: 'due' };
  await renderCardFront(ctx);
}

export async function startNewWords(ctx: BotContext): Promise<void> {
  const ownedKeys = await getAllUserWordKeys(ctx.dbUser.id);
  const words = pickNewWords(ctx.dbUser.currentLevel ?? 'A1', NEW_WORDS_BATCH_SIZE, ownedKeys);
  if (words.length === 0) {
    await ctx.reply(t(ctx.session.locale, 'vocab.no_cards_due'));
    return;
  }
  const keys = words.map((w) => `${w.word}::${w.partOfSpeech}`);
  await Promise.all(keys.map((key) => ensureCard(ctx.dbUser.id, key)));
  ctx.session.vocabReview = { wordKeys: keys, index: 0, cardsReviewed: 0, mode: 'new' };
  await renderCardFront(ctx);
}

async function renderCardFront(ctx: BotContext): Promise<void> {
  const locale = ctx.session.locale;
  const state = ctx.session.vocabReview;
  if (!state) return;

  const wordKey = state.wordKeys[state.index];
  if (!wordKey) {
    await finishSession(ctx);
    return;
  }

  const word = vocabWordByKey.get(wordKey);
  if (!word) {
    state.index += 1;
    await renderCardFront(ctx);
    return;
  }

  const card = await getCardByKey(ctx.dbUser.id, wordKey);
  const progress = t(locale, 'vocab.card_progress', { current: state.index + 1, total: state.wordKeys.length });
  const phonetic = word.phonetic ? ` ${word.phonetic}` : '';
  await ctx.reply(`${progress}\n\n<b>${word.word}</b>${phonetic} <i>(${word.partOfSpeech})</i>`, {
    parse_mode: 'HTML',
    reply_markup: showAnswerKeyboard(locale, card?.isFavorite ?? false),
  });
}

async function renderCardBack(ctx: BotContext): Promise<void> {
  const locale = ctx.session.locale;
  const state = ctx.session.vocabReview;
  const wordKey = state?.wordKeys[state.index];
  if (!state || !wordKey) return;

  const word = vocabWordByKey.get(wordKey);
  if (!word) return;

  const translation = locale === 'uk' ? word.translationUk : word.translationRu;
  const lines = [
    `<b>${word.word}</b> — ${locale === 'en' ? word.definitionEn : translation}`,
    '',
    `<i>${t(locale, 'vocab.example_label')}:</i> ${word.exampleSentence}`,
  ];
  if (word.synonyms.length > 0) lines.push(`<i>${t(locale, 'vocab.synonyms_label')}:</i> ${word.synonyms.join(', ')}`);
  if (word.antonyms.length > 0) lines.push(`<i>${t(locale, 'vocab.antonyms_label')}:</i> ${word.antonyms.join(', ')}`);

  await ctx.reply(lines.join('\n'), { parse_mode: 'HTML', reply_markup: gradeKeyboard(locale) });
}

async function finishSession(ctx: BotContext): Promise<void> {
  const locale = ctx.session.locale;
  const state = ctx.session.vocabReview;
  if (!state) return;
  const count = state.cardsReviewed;
  ctx.session.vocabReview = undefined;

  if (count === 0) return;

  const xp = count * XP_REWARDS.FLASHCARDS;
  await ctx.reply(
    `${t(locale, 'vocab.session_summary_title')}\n${t(locale, 'vocab.session_summary_body', { count, xp })}`,
    { parse_mode: 'HTML' },
  );
  await awardXpAndNotify(ctx, xp, 'vocab_review_session', 'FLASHCARDS');
}

export function registerVocabHandlers(bot: Bot<BotContext>): void {
  bot.callbackQuery('vocab:review_due', async (ctx) => {
    await ctx.answerCallbackQuery();
    await startDueReview(ctx);
  });

  bot.callbackQuery('vocab:learn_new', async (ctx) => {
    await ctx.answerCallbackQuery();
    await startNewWords(ctx);
  });

  bot.callbackQuery('vocab:show_answer', async (ctx) => {
    await ctx.answerCallbackQuery();
    await renderCardBack(ctx);
  });

  bot.callbackQuery('vocab:toggle_fav', async (ctx) => {
    await ctx.answerCallbackQuery();
    const state = ctx.session.vocabReview;
    const wordKey = state?.wordKeys[state.index];
    if (!wordKey) return;
    const card = await getCardByKey(ctx.dbUser.id, wordKey);
    await toggleFavorite(ctx.dbUser.id, wordKey, !(card?.isFavorite ?? false));
  });

  bot.callbackQuery(/^vocab:grade:(again|hard|good|easy)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const grade = ctx.match[1] as ReviewGrade;
    const state = ctx.session.vocabReview as VocabReviewState | undefined;
    const wordKey = state?.wordKeys[state.index];
    if (!state || !wordKey) return;

    await reviewVocabCard(ctx.dbUser.id, wordKey, grade);
    state.index += 1;
    state.cardsReviewed += 1;
    ctx.session.vocabReview = state;

    if (state.index >= state.wordKeys.length) {
      await finishSession(ctx);
    } else {
      await renderCardFront(ctx);
    }
  });

  bot.callbackQuery('vocab:favorites', async (ctx) => {
    await ctx.answerCallbackQuery();
    const locale = ctx.session.locale;
    const favorites = await getFavorites(ctx.dbUser.id);
    if (favorites.length === 0) {
      await ctx.reply(t(locale, 'vocab.no_cards_due'));
      return;
    }
    const lines = favorites
      .map((card) => vocabWordByKey.get(card.wordKey))
      .filter((w): w is NonNullable<typeof w> => Boolean(w))
      .map((w) => `⭐ <b>${w.word}</b> — ${locale === 'uk' ? w.translationUk : w.translationRu}`);
    await ctx.reply(lines.join('\n'), { parse_mode: 'HTML' });
  });
}
