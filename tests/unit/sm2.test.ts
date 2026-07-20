import { describe, expect, it } from 'vitest';
import { DEFAULT_SRS_STATE, isDue, reviewCard } from '../../src/core/srs/sm2.js';

describe('SM-2 spaced repetition', () => {
  it('schedules a brand-new card for tomorrow after a "good" review', () => {
    const result = reviewCard(DEFAULT_SRS_STATE, 'good', new Date('2026-01-01T00:00:00Z'));
    expect(result.intervalDays).toBe(1);
    expect(result.repetitions).toBe(1);
    expect(result.status).toBe('REVIEW');
    expect(result.dueDate.toISOString()).toBe('2026-01-02T00:00:00.000Z');
  });

  it('resets repetitions and shortens the interval on "again"', () => {
    const learned = { easeFactor: 2.6, intervalDays: 30, repetitions: 4, lapses: 0 };
    const result = reviewCard(learned, 'again', new Date('2026-01-01T00:00:00Z'));
    expect(result.repetitions).toBe(0);
    expect(result.intervalDays).toBe(1);
    expect(result.lapses).toBe(1);
    expect(result.status).toBe('LEARNING');
  });

  it('grows the interval geometrically on repeated "good" reviews', () => {
    let state = DEFAULT_SRS_STATE;
    const now = new Date('2026-01-01T00:00:00Z');
    state = reviewCard(state, 'good', now); // interval 1
    state = reviewCard(state, 'good', now); // interval 6
    expect(state.intervalDays).toBe(6);
    state = reviewCard(state, 'good', now); // interval ~6 * ease
    expect(state.intervalDays).toBeGreaterThan(6);
  });

  it('never drops ease factor below the 1.3 floor', () => {
    let state = { easeFactor: 1.3, intervalDays: 5, repetitions: 3, lapses: 0 };
    for (let i = 0; i < 5; i++) {
      state = reviewCard(state, 'again', new Date());
    }
    expect(state.easeFactor).toBeGreaterThanOrEqual(1.3);
  });

  it('marks a card mastered once the interval clears the threshold', () => {
    const nearMastery = { easeFactor: 2.8, intervalDays: 15, repetitions: 5, lapses: 0 };
    const result = reviewCard(nearMastery, 'easy', new Date());
    expect(result.intervalDays).toBeGreaterThanOrEqual(21);
    expect(result.status).toBe('MASTERED');
  });

  it('isDue is true for past/now dates and false for future dates', () => {
    const now = new Date('2026-01-01T00:00:00Z');
    expect(isDue(new Date('2025-12-31T00:00:00Z'), now)).toBe(true);
    expect(isDue(now, now)).toBe(true);
    expect(isDue(new Date('2026-01-02T00:00:00Z'), now)).toBe(false);
  });
});
