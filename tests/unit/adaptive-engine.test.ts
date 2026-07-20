import { describe, expect, it } from 'vitest';
import {
  computeResult,
  createInitialState,
  isTestComplete,
  recordAnswer,
  selectNextQuestion,
  TEST_LENGTH,
} from '../../src/core/placement-test/adaptive-engine.js';
import type { PlacementQuestion } from '../../src/core/placement-test/types.js';

function makePool(): PlacementQuestion[] {
  const pool: PlacementQuestion[] = [];
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;
  const categories = ['grammar', 'vocabulary', 'reading', 'usage'] as const;
  for (const level of levels) {
    for (const category of categories) {
      for (let i = 0; i < 3; i++) {
        pool.push({
          id: `${level}-${category}-${i}`,
          level,
          category,
          prompt: `Q ${level} ${category} ${i}`,
          options: ['a', 'b', 'c', 'd'],
          correctIndex: 0,
        });
      }
    }
  }
  return pool;
}

describe('adaptive placement test engine', () => {
  it('runs to exactly TEST_LENGTH questions and then reports complete', () => {
    const pool = makePool();
    let state = createInitialState();
    let iterations = 0;
    while (!isTestComplete(state)) {
      const q = selectNextQuestion(state, pool);
      expect(q).not.toBeNull();
      state = recordAnswer(state, q!, q!.correctIndex); // always correct
      iterations += 1;
      expect(iterations).toBeLessThanOrEqual(TEST_LENGTH);
    }
    expect(state.answers.length).toBe(TEST_LENGTH);
    expect(selectNextQuestion(state, pool)).toBeNull();
  });

  it('climbs toward C2 when every answer is correct', () => {
    const pool = makePool();
    let state = createInitialState('B1');
    while (!isTestComplete(state)) {
      const q = selectNextQuestion(state, pool)!;
      state = recordAnswer(state, q, q.correctIndex);
    }
    const result = computeResult(state);
    expect(['B2', 'C1', 'C2']).toContain(result.level);
  });

  it('drops toward A1 when every answer is wrong', () => {
    const pool = makePool();
    let state = createInitialState('B1');
    while (!isTestComplete(state)) {
      const q = selectNextQuestion(state, pool)!;
      state = recordAnswer(state, q, (q.correctIndex + 1) % q.options.length);
    }
    const result = computeResult(state);
    expect(['A1', 'A2', 'B1']).toContain(result.level);
  });

  it('never asks the same question twice', () => {
    const pool = makePool();
    let state = createInitialState();
    while (!isTestComplete(state)) {
      const q = selectNextQuestion(state, pool)!;
      expect(state.askedIds).not.toContain(q.id);
      state = recordAnswer(state, q, 0);
    }
    expect(new Set(state.askedIds).size).toBe(state.askedIds.length);
  });

  it('computes per-category scores that reflect correctness', () => {
    const pool = makePool();
    let state = createInitialState();
    while (!isTestComplete(state)) {
      const q = selectNextQuestion(state, pool)!;
      state = recordAnswer(state, q, q.correctIndex);
    }
    const result = computeResult(state);
    expect(result.scoreGrammar).toBeGreaterThan(0.5);
    expect(result.vocabEstimate).toBeGreaterThan(0);
  });
});
