import { describe, expect, it } from 'vitest';
import { evaluatePace, generateRoadmap } from '../../src/core/roadmap/generator.js';

describe('roadmap generator', () => {
  it('produces one phase per CEFR transition', () => {
    const phases = generateRoadmap({
      currentLevel: 'A2',
      targetLevel: 'C1',
      totalWeeks: 52,
      focusSkills: ['GRAMMAR', 'VOCABULARY'],
    });
    // A2->B1, B1->B2, B2->C1
    expect(phases).toHaveLength(3);
    expect(phases[0]!.fromLevel).toBe('A2');
    expect(phases[0]!.toLevel).toBe('B1');
    expect(phases.at(-1)!.toLevel).toBe('C1');
  });

  it('allocates the full requested duration across phases', () => {
    const totalWeeks = 40;
    const phases = generateRoadmap({
      currentLevel: 'A1',
      targetLevel: 'B2',
      totalWeeks,
      focusSkills: [],
    });
    const sum = phases.reduce((acc, p) => acc + p.weeks, 0);
    expect(sum).toBe(totalWeeks);
  });

  it('gives later (harder) transitions proportionally more weeks than earlier ones', () => {
    const phases = generateRoadmap({
      currentLevel: 'A0',
      targetLevel: 'C2',
      totalWeeks: 120,
      focusSkills: [],
    });
    const first = phases[0]!.weeks; // A0->A1
    const last = phases.at(-1)!.weeks; // C1->C2
    expect(last).toBeGreaterThan(first);
  });

  it('rejects a target level that is not above the current level', () => {
    expect(() => generateRoadmap({ currentLevel: 'B1', targetLevel: 'A2', totalWeeks: 10, focusSkills: [] })).toThrow();
    expect(() => generateRoadmap({ currentLevel: 'B1', targetLevel: 'B1', totalWeeks: 10, focusSkills: [] })).toThrow();
  });

  it('phase start weeks are contiguous', () => {
    const phases = generateRoadmap({ currentLevel: 'A1', targetLevel: 'B1', totalWeeks: 20, focusSkills: [] });
    let expectedStart = 1;
    for (const phase of phases) {
      expect(phase.startWeek).toBe(expectedStart);
      expectedStart += phase.weeks;
    }
  });
});

describe('pace evaluation', () => {
  const phases = generateRoadmap({ currentLevel: 'A2', targetLevel: 'B2', totalWeeks: 20, focusSkills: [] });

  it('flags "ahead" when completion outruns elapsed time', () => {
    expect(evaluatePace({ phases, weeksElapsed: 5, tasksCompletedRatio: 0.5 })).toBe('ahead');
  });

  it('flags "behind" when completion lags elapsed time', () => {
    expect(evaluatePace({ phases, weeksElapsed: 10, tasksCompletedRatio: 0.2 })).toBe('behind');
  });

  it('flags "on_track" when completion roughly matches elapsed time', () => {
    expect(evaluatePace({ phases, weeksElapsed: 10, tasksCompletedRatio: 0.5 })).toBe('on_track');
  });
});
