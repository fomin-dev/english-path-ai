import { describe, expect, it } from 'vitest';
import { buildAnkiDeck } from '../../src/core/vocab-export/anki-export.js';
import type { VocabWordSeed } from '../../src/content/vocab/words.js';

const word: VocabWordSeed = {
  word: 'ubiquitous',
  partOfSpeech: 'adjective',
  level: 'C1',
  translationRu: 'вездесущий',
  translationUk: 'всюдисущий',
  definitionEn: 'present, appearing, or found everywhere',
  exampleSentence: 'Smartphones have become ubiquitous.',
  synonyms: ['omnipresent', 'pervasive'],
  antonyms: ['rare'],
  phonetic: '/juːˈbɪkwɪtəs/',
};

describe('buildAnkiDeck', () => {
  it('emits the Anki plain-text header directives', () => {
    const deck = buildAnkiDeck([word], 'en');
    expect(deck.startsWith('#separator:tab\n#html:true\n#columns:Front\tBack\n')).toBe(true);
  });

  it('renders one tab-separated Front/Back row per word', () => {
    const deck = buildAnkiDeck([word], 'en');
    const rows = deck.trim().split('\n').slice(3); // skip the 3 header directive lines
    expect(rows).toHaveLength(1);
    const [front, back] = rows[0]!.split('\t');
    expect(front).toBe('ubiquitous /juːˈbɪkwɪtəs/ <i>(adjective)</i>');
    expect(back).toContain('present, appearing, or found everywhere');
    expect(back).toContain('Smartphones have become ubiquitous.');
    expect(back).toContain('Syn: omnipresent, pervasive');
    expect(back).toContain('Ant: rare');
  });

  it('picks the translation for the requested locale', () => {
    const dataRow = (deck: string) => deck.trim().split('\n')[3]!;
    const ru = dataRow(buildAnkiDeck([word], 'ru')).split('\t')[1]!;
    const uk = dataRow(buildAnkiDeck([word], 'uk')).split('\t')[1]!;
    expect(ru).toContain('вездесущий');
    expect(uk).toContain('всюдисущий');
  });

  it('folds tabs and newlines out of fields so rows stay well-formed', () => {
    const messy: VocabWordSeed = {
      ...word,
      exampleSentence: 'Line one\nLine two\twith a tab',
    };
    const deck = buildAnkiDeck([messy], 'en');
    const dataLine = deck.trim().split('\n').slice(3).join('\n');
    expect(dataLine.split('\t')).toHaveLength(2); // still exactly Front + Back
    expect(dataLine).toContain('Line one<br>Line two with a tab');
  });

  it('returns just the header when there are no words', () => {
    const deck = buildAnkiDeck([], 'en');
    expect(deck).toBe('#separator:tab\n#html:true\n#columns:Front\tBack\n\n');
  });
});
