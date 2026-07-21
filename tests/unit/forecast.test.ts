import { describe, expect, it } from 'vitest';
import { buildActivityStrip, forecastCompletionDate } from '../../src/core/stats/forecast.js';

describe('forecastCompletionDate', () => {
  const start = new Date('2026-01-01T00:00:00.000Z');

  it('projects the unadjusted date when on track', () => {
    const result = forecastCompletionDate({ roadmapStartDate: start, totalWeeks: 10, paceSignal: 'on_track' });
    const expected = new Date(start);
    expected.setDate(expected.getDate() + 70);
    expect(result.toISOString()).toBe(expected.toISOString());
  });

  it('pulls the date earlier when ahead of pace', () => {
    const onTrack = forecastCompletionDate({ roadmapStartDate: start, totalWeeks: 10, paceSignal: 'on_track' });
    const ahead = forecastCompletionDate({ roadmapStartDate: start, totalWeeks: 10, paceSignal: 'ahead' });
    expect(ahead.getTime()).toBeLessThan(onTrack.getTime());
  });

  it('pushes the date later when behind pace', () => {
    const onTrack = forecastCompletionDate({ roadmapStartDate: start, totalWeeks: 10, paceSignal: 'on_track' });
    const behind = forecastCompletionDate({ roadmapStartDate: start, totalWeeks: 10, paceSignal: 'behind' });
    expect(behind.getTime()).toBeGreaterThan(onTrack.getTime());
  });

  it('never moves the date before the roadmap start date', () => {
    const result = forecastCompletionDate({ roadmapStartDate: start, totalWeeks: 0, paceSignal: 'ahead' });
    expect(result.getTime()).toBeGreaterThanOrEqual(start.getTime());
  });
});

describe('buildActivityStrip', () => {
  it('returns exactly `days` entries ending on today', () => {
    const strip = buildActivityStrip([], 'UTC', 7);
    expect(strip).toHaveLength(7);
    const todayKey = new Intl.DateTimeFormat('en-CA', { timeZone: 'UTC' }).format(new Date());
    expect(strip.at(-1)!.date).toBe(todayKey);
  });

  it('fills gaps with zero-activity days', () => {
    const strip = buildActivityStrip([], 'UTC', 7);
    for (const day of strip) {
      expect(day.tasksCompleted).toBe(0);
      expect(day.goalMet).toBe(false);
    }
  });

  it('surfaces a matching log entry on its correct day', () => {
    const today = new Date();
    const strip = buildActivityStrip([{ date: today, tasksCompleted: 4, goalMet: true }], 'UTC', 7);
    expect(strip.at(-1)!.tasksCompleted).toBe(4);
    expect(strip.at(-1)!.goalMet).toBe(true);
  });

  it('respects a custom day count', () => {
    const strip = buildActivityStrip([], 'UTC', 3);
    expect(strip).toHaveLength(3);
  });
});
