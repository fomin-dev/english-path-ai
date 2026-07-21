import type { VocabWordSeed } from '../../content/vocab/words.js';

export type ExportLocale = 'en' | 'ru' | 'uk';

/**
 * Anki's plain-text import reads a leading `#directive:value` block, then
 * one card per line as tab-separated fields. `#html:true` lets us use
 * <br>/<i> in fields instead of literal newlines, which the format can't
 * carry. See Anki's "Importing text files" docs.
 */
const ANKI_HEADER = ['#separator:tab', '#html:true', '#columns:Front\tBack', ''].join('\n');

function translationFor(word: VocabWordSeed, locale: ExportLocale): string {
  if (locale === 'en') return word.definitionEn;
  return locale === 'uk' ? word.translationUk : word.translationRu;
}

/** Tabs/newlines break the plain-text row format, so fold them into the HTML the deck already opts into. */
function escapeField(value: string): string {
  return value.replace(/\t/g, ' ').replace(/\r?\n/g, '<br>');
}

/**
 * Renders a learner's word list as an Anki-importable plain-text deck
 * (tab-separated Front/Back, one card per line). Purely formats data the
 * caller already has — no I/O, so it's unit-testable without a DB.
 */
export function buildAnkiDeck(words: VocabWordSeed[], locale: ExportLocale): string {
  const rows = words.map((word) => {
    const phonetic = word.phonetic ? ` ${word.phonetic}` : '';
    const front = `${word.word}${phonetic} <i>(${word.partOfSpeech})</i>`;

    const backParts = [translationFor(word, locale), `<i>${word.exampleSentence}</i>`];
    if (word.synonyms.length > 0) backParts.push(`Syn: ${word.synonyms.join(', ')}`);
    if (word.antonyms.length > 0) backParts.push(`Ant: ${word.antonyms.join(', ')}`);

    return `${escapeField(front)}\t${escapeField(backParts.join('<br>'))}`;
  });

  return `${ANKI_HEADER}${rows.join('\n')}\n`;
}
