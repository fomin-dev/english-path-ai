import { describe, expect, it } from 'vitest';
import { generateDailyTasks } from '../../src/core/lesson-generator/generate.js';

describe('daily lesson generator', () => {
  it('prioritises a flashcards task when vocabulary is due', () => {
    const tasks = generateDailyTasks({
      level: 'B1',
      focusSkills: ['GRAMMAR'],
      dailyGoalMinutes: 15,
      dueVocabCount: 5,
    });
    expect(tasks[0]!.type).toBe('FLASHCARDS');
  });

  it('omits the flashcards task when nothing is due', () => {
    const tasks = generateDailyTasks({
      level: 'B1',
      focusSkills: ['GRAMMAR'],
      dailyGoalMinutes: 15,
      dueVocabCount: 0,
    });
    expect(tasks.find((t) => t.type === 'FLASHCARDS')).toBeUndefined();
  });

  it('scales task count with the daily time budget', () => {
    const short = generateDailyTasks({ level: 'B1', focusSkills: [], dailyGoalMinutes: 8, dueVocabCount: 0 });
    const long = generateDailyTasks({ level: 'B1', focusSkills: [], dailyGoalMinutes: 40, dueVocabCount: 0 });
    expect(long.length).toBeGreaterThan(short.length);
  });

  it('draws task types from the learner focus skills', () => {
    const tasks = generateDailyTasks({
      level: 'B2',
      focusSkills: ['WRITING'],
      dailyGoalMinutes: 20,
      dueVocabCount: 0,
    });
    const types = new Set(tasks.map((t) => t.type));
    expect([...types].some((t) => t === 'WRITING' || t === 'SENTENCE_BUILDING')).toBe(true);
  });

  it('every task carries a positive XP reward', () => {
    const tasks = generateDailyTasks({ level: 'A2', focusSkills: [], dailyGoalMinutes: 20, dueVocabCount: 3 });
    for (const task of tasks) {
      expect(task.xp).toBeGreaterThan(0);
    }
  });

  it('respects the task-count ceiling even with a very large time budget', () => {
    const tasks = generateDailyTasks({ level: 'C1', focusSkills: [], dailyGoalMinutes: 180, dueVocabCount: 0 });
    expect(tasks.length).toBeLessThanOrEqual(11); // MAX_TASKS + optional REVIEW
  });
});
