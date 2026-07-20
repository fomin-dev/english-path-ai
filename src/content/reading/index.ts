import { readingTexts, type ReadingTextSeed } from './texts.js';

export interface ReadingTextWithId extends ReadingTextSeed {
  id: string;
}

export const readingTextList: ReadingTextWithId[] = readingTexts.map((text, index) => ({
  ...text,
  id: `reading-${text.level}-${index}`,
}));

export const readingTextById: ReadonlyMap<string, ReadingTextWithId> = new Map(
  readingTextList.map((t) => [t.id, t]),
);
