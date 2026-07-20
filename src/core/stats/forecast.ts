import type { PaceSignal } from '../roadmap/generator.js';

/** Projects a target-completion date, nudged earlier/later by the learner's current pace. */
export function forecastCompletionDate(params: {
  roadmapStartDate: Date;
  totalWeeks: number;
  paceSignal: PaceSignal;
}): Date {
  const paceMultiplier = params.paceSignal === 'ahead' ? 0.85 : params.paceSignal === 'behind' ? 1.2 : 1;
  const adjustedWeeks = params.totalWeeks * paceMultiplier;

  const date = new Date(params.roadmapStartDate);
  date.setDate(date.getDate() + Math.round(adjustedWeeks * 7));
  return date;
}

export interface WeeklyActivityDay {
  date: string; // YYYY-MM-DD
  tasksCompleted: number;
  goalMet: boolean;
}

/** Builds a Duolingo-style 7-cell activity strip ending today, filling in gaps as zero-activity days. */
export function buildActivityStrip(
  logs: Array<{ date: Date; tasksCompleted: number; goalMet: boolean }>,
  timezone: string,
  days = 7,
): WeeklyActivityDay[] {
  const byDateKey = new Map(
    logs.map((log) => [
      new Intl.DateTimeFormat('en-CA', { timeZone: timezone }).format(log.date),
      log,
    ]),
  );

  const strip: WeeklyActivityDay[] = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = new Intl.DateTimeFormat('en-CA', { timeZone: timezone }).format(d);
    const log = byDateKey.get(key);
    strip.push({ date: key, tasksCompleted: log?.tasksCompleted ?? 0, goalMet: log?.goalMet ?? false });
  }
  return strip;
}
