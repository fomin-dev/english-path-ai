import { describe, expect, it } from 'vitest';
import { ieltsReadingSets, ieltsListeningSets, ieltsWritingTasks, ieltsSpeakingCues } from '../../src/content/ielts/bank.js';
import { satReadingSets, satGrammarQuestions, satVocabQuestions } from '../../src/content/sat/bank.js';

function expectValidQuestions(sets: Array<{ title: string; questions: Array<{ options: string[]; correctIndex: number }> }>) {
  for (const set of sets) {
    expect(set.questions.length, set.title).toBeGreaterThanOrEqual(3);
    for (const question of set.questions) {
      expect(question.options, set.title).toHaveLength(4);
      expect(question.correctIndex, set.title).toBeGreaterThanOrEqual(0);
      expect(question.correctIndex, set.title).toBeLessThan(4);
    }
  }
}

describe('IELTS content bank integrity', () => {
  it('has at least 3 reading sets and 3 listening sets, avoiding fast repetition in mock mode', () => {
    expect(ieltsReadingSets.length).toBeGreaterThanOrEqual(3);
    expect(ieltsListeningSets.length).toBeGreaterThanOrEqual(3);
  });

  it('has no duplicate reading or listening titles', () => {
    expect(new Set(ieltsReadingSets.map((s) => s.title)).size).toBe(ieltsReadingSets.length);
    expect(new Set(ieltsListeningSets.map((s) => s.title)).size).toBe(ieltsListeningSets.length);
  });

  it('gives every reading and listening question 4 options with a correctIndex in range', () => {
    expectValidQuestions(ieltsReadingSets);
    expectValidQuestions(ieltsListeningSets);
  });

  it('has non-empty writing prompts and speaking cue cards', () => {
    expect(ieltsWritingTasks.length).toBeGreaterThan(0);
    for (const task of ieltsWritingTasks) {
      expect(task.prompt.trim().length).toBeGreaterThan(0);
    }
    expect(ieltsSpeakingCues.length).toBeGreaterThan(0);
    for (const cue of ieltsSpeakingCues) {
      expect(cue.cueCard.trim().length).toBeGreaterThan(0);
    }
  });
});

describe('SAT content bank integrity', () => {
  it('has at least 3 reading sets', () => {
    expect(satReadingSets.length).toBeGreaterThanOrEqual(3);
  });

  it('has no duplicate reading titles', () => {
    expect(new Set(satReadingSets.map((s) => s.title)).size).toBe(satReadingSets.length);
  });

  it('gives every reading question 4 options with a correctIndex in range', () => {
    expectValidQuestions(satReadingSets);
  });

  it('gives every grammar and vocab question 4 options, a correctIndex in range, and a non-empty explanation', () => {
    for (const question of [...satGrammarQuestions, ...satVocabQuestions]) {
      expect(question.options).toHaveLength(4);
      expect(question.correctIndex).toBeGreaterThanOrEqual(0);
      expect(question.correctIndex).toBeLessThan(4);
      expect(question.explanation.trim().length).toBeGreaterThan(0);
    }
  });
});
