import { describe, expect, it } from 'vitest';
import { dateKeyInTimezone, hasNotActedToday, updateStreakOnActivity } from '../../src/core/gamification/streaks.js';

describe('streak tracking', () => {
  it('starts a streak at 1 for a brand-new learner', () => {
    const result = updateStreakOnActivity({
      lastActiveDateKey: null,
      currentStreak: 0,
      longestStreak: 0,
      todayKey: '2026-01-01',
    });
    expect(result).toMatchObject({ streakCount: 1, longestStreak: 1, streakContinued: true, isNewDay: true });
  });

  it('does not double-count activity on the same day', () => {
    const result = updateStreakOnActivity({
      lastActiveDateKey: '2026-01-01',
      currentStreak: 5,
      longestStreak: 10,
      todayKey: '2026-01-01',
    });
    expect(result).toMatchObject({ streakCount: 5, isNewDay: false, streakContinued: false });
  });

  it('increments the streak on a consecutive day', () => {
    const result = updateStreakOnActivity({
      lastActiveDateKey: '2026-01-01',
      currentStreak: 5,
      longestStreak: 5,
      todayKey: '2026-01-02',
    });
    expect(result).toMatchObject({ streakCount: 6, longestStreak: 6, streakContinued: true });
  });

  it('resets the streak to 1 after a gap of more than one day', () => {
    const result = updateStreakOnActivity({
      lastActiveDateKey: '2026-01-01',
      currentStreak: 20,
      longestStreak: 20,
      todayKey: '2026-01-05',
    });
    expect(result).toMatchObject({ streakCount: 1, longestStreak: 20, streakBroken: true });
  });

  it('hasNotActedToday reflects whether the learner has done anything today', () => {
    expect(hasNotActedToday(null, '2026-01-01')).toBe(true);
    expect(hasNotActedToday('2025-12-31', '2026-01-01')).toBe(true);
    expect(hasNotActedToday('2026-01-01', '2026-01-01')).toBe(false);
  });

  it('dateKeyInTimezone produces a stable YYYY-MM-DD for a given zone', () => {
    const key = dateKeyInTimezone(new Date('2026-01-01T23:30:00Z'), 'Europe/Kyiv');
    expect(key).toBe('2026-01-02'); // UTC+2, so 23:30 UTC rolls into the next local day
  });
});
