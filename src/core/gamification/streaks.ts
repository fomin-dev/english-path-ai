/** Duolingo-style daily streak tracking, timezone-aware. */

/** Returns the user's local calendar date as "YYYY-MM-DD" for a given IANA timezone. */
export function dateKeyInTimezone(date: Date, timezone: string): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

function daysBetweenDateKeys(earlier: string, later: string): number {
  const a = new Date(`${earlier}T00:00:00Z`);
  const b = new Date(`${later}T00:00:00Z`);
  return Math.round((b.getTime() - a.getTime()) / 86_400_000);
}

export interface StreakUpdateResult {
  streakCount: number;
  longestStreak: number;
  /** Streak grew or started today (first activity of the day). */
  streakContinued: boolean;
  /** A previous streak was lost because of a >1 day gap. */
  streakBroken: boolean;
  /** This call represents the first completed task of the local day. */
  isNewDay: boolean;
}

export function updateStreakOnActivity(params: {
  lastActiveDateKey: string | null;
  currentStreak: number;
  longestStreak: number;
  todayKey: string;
}): StreakUpdateResult {
  const { lastActiveDateKey, currentStreak, longestStreak, todayKey } = params;

  if (lastActiveDateKey === todayKey) {
    return {
      streakCount: currentStreak,
      longestStreak,
      streakContinued: false,
      streakBroken: false,
      isNewDay: false,
    };
  }

  if (lastActiveDateKey === null) {
    return {
      streakCount: 1,
      longestStreak: Math.max(longestStreak, 1),
      streakContinued: true,
      streakBroken: false,
      isNewDay: true,
    };
  }

  const gapDays = daysBetweenDateKeys(lastActiveDateKey, todayKey);

  if (gapDays === 1) {
    const streakCount = currentStreak + 1;
    return {
      streakCount,
      longestStreak: Math.max(longestStreak, streakCount),
      streakContinued: true,
      streakBroken: false,
      isNewDay: true,
    };
  }

  // gapDays <= 0 shouldn't happen once lastActiveDateKey !== todayKey, but
  // guard defensively; gapDays > 1 means the streak lapsed.
  return {
    streakCount: 1,
    longestStreak,
    streakContinued: false,
    streakBroken: gapDays > 1,
    isNewDay: true,
  };
}

/** True when the user has not completed anything yet today (used by the evening reminder job). */
export function hasNotActedToday(lastActiveDateKey: string | null, todayKey: string): boolean {
  return lastActiveDateKey !== todayKey;
}
