import { describe, expect, it } from 'vitest';
import { readingTexts } from '../../src/content/reading/texts.js';

describe('reading content bank integrity', () => {
  it('has at least one text per CEFR level', () => {
    const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    for (const level of levels) {
      const count = readingTexts.filter((t) => t.level === level).length;
      expect(count, `level ${level} has no reading texts`).toBeGreaterThan(0);
    }
  });

  it('has no duplicate titles', () => {
    const titles = readingTexts.map((t) => t.title);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it('gives every question exactly 4 options with a correctIndex in range', () => {
    for (const text of readingTexts) {
      for (const question of text.questions) {
        expect(question.options, `"${text.title}" → "${question.question}"`).toHaveLength(4);
        expect(question.correctIndex).toBeGreaterThanOrEqual(0);
        expect(question.correctIndex).toBeLessThan(4);
      }
    }
  });

  it('has no empty body, title, or newWords entries', () => {
    for (const text of readingTexts) {
      expect(text.title.trim().length, text.title).toBeGreaterThan(0);
      expect(text.body.trim().length, text.title).toBeGreaterThan(0);
      expect(text.newWords.length, text.title).toBeGreaterThan(0);
      expect(text.newWords.every((w) => w.trim().length > 0), text.title).toBe(true);
    }
  });

  it('reports a wordCount that is at least roughly consistent with the body length', () => {
    for (const text of readingTexts) {
      const actual = text.body.split(/\s+/).filter(Boolean).length;
      // Descriptive metadata, not exact — but should be in the right ballpark.
      expect(Math.abs(actual - text.wordCount), text.title).toBeLessThan(5);
    }
  });
});
