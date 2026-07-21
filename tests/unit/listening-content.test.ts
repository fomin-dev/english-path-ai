import { describe, expect, it } from 'vitest';
import { listeningExercises } from '../../src/content/listening/exercises.js';

describe('listening content bank integrity', () => {
  it('has at least one exercise per CEFR level', () => {
    const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    for (const level of levels) {
      const count = listeningExercises.filter((e) => e.level === level).length;
      expect(count, `level ${level} has no listening exercises`).toBeGreaterThan(0);
    }
  });

  it('has no duplicate titles', () => {
    const titles = listeningExercises.map((e) => e.title);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it('gives every question exactly 4 options with a correctIndex in range', () => {
    for (const exercise of listeningExercises) {
      for (const question of exercise.questions) {
        expect(question.options, `"${exercise.title}" → "${question.question}"`).toHaveLength(4);
        expect(question.correctIndex).toBeGreaterThanOrEqual(0);
        expect(question.correctIndex).toBeLessThan(4);
      }
    }
  });

  it('has no empty script, title, or newWords entries', () => {
    for (const exercise of listeningExercises) {
      expect(exercise.title.trim().length, exercise.title).toBeGreaterThan(0);
      expect(exercise.script.trim().length, exercise.title).toBeGreaterThan(0);
      expect(exercise.newWords.length, exercise.title).toBeGreaterThan(0);
      expect(exercise.newWords.every((w) => w.trim().length > 0), exercise.title).toBe(true);
    }
  });

  it('gives every exercise at least 3 comprehension questions', () => {
    for (const exercise of listeningExercises) {
      expect(exercise.questions.length, exercise.title).toBeGreaterThanOrEqual(3);
    }
  });
});
