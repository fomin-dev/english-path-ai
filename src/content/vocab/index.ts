import { vocabWords, type VocabWordSeed } from './words.js';

export { vocabWords };
export type { VocabWordSeed };
export type SeedVocabWord = VocabWordSeed;

export function vocabWordKey(word: string, partOfSpeech: string): string {
  return `${word}::${partOfSpeech}`;
}

export const vocabWordByKey: ReadonlyMap<string, SeedVocabWord> = new Map(
  vocabWords.map((w) => [vocabWordKey(w.word, w.partOfSpeech), w]),
);

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j]!, arr[i]!];
  }
  return arr;
}

function availablePool(level: string, excludeKeys: ReadonlySet<string>): SeedVocabWord[] {
  return vocabWords.filter((w) => w.level === level && !excludeKeys.has(vocabWordKey(w.word, w.partOfSpeech)));
}

/** Picks up to `count` words at `level` the learner doesn't already have a card for. */
export function pickNewWords(level: string, count: number, excludeKeys: ReadonlySet<string>): SeedVocabWord[] {
  return shuffle(availablePool(level, excludeKeys)).slice(0, count);
}

export function countNewWords(level: string, excludeKeys: ReadonlySet<string>): number {
  return availablePool(level, excludeKeys).length;
}
