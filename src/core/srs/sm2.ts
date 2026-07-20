/**
 * Spaced repetition scheduler based on the SM-2 algorithm (SuperMemo-2),
 * exposed through a 4-button grading scheme (Again / Hard / Good / Easy)
 * since that maps naturally onto a Telegram inline keyboard.
 */

export type ReviewGrade = 'again' | 'hard' | 'good' | 'easy';

export type CardStatus = 'NEW' | 'LEARNING' | 'REVIEW' | 'MASTERED';

export interface SrsState {
  easeFactor: number;
  intervalDays: number;
  repetitions: number;
  lapses: number;
}

export interface SrsResult extends SrsState {
  dueDate: Date;
  status: CardStatus;
}

export const DEFAULT_SRS_STATE: SrsState = {
  easeFactor: 2.5,
  intervalDays: 0,
  repetitions: 0,
  lapses: 0,
};

const MIN_EASE_FACTOR = 1.3;
const MASTERED_INTERVAL_DAYS = 21;

/** Maps the 4-button UI grade onto the classic SM-2 0-5 quality scale. */
function gradeToQuality(grade: ReviewGrade): number {
  switch (grade) {
    case 'again':
      return 1;
    case 'hard':
      return 3;
    case 'good':
      return 4;
    case 'easy':
      return 5;
  }
}

export function reviewCard(state: SrsState, grade: ReviewGrade, now: Date = new Date()): SrsResult {
  const quality = gradeToQuality(grade);
  const isFailure = quality < 3;

  let { easeFactor, repetitions } = state;
  let intervalDays: number;
  let lapses = state.lapses;

  easeFactor = Math.max(
    MIN_EASE_FACTOR,
    easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)),
  );

  if (isFailure) {
    repetitions = 0;
    lapses += 1;
    intervalDays = 1;
  } else {
    if (repetitions === 0) {
      intervalDays = 1;
    } else if (repetitions === 1) {
      intervalDays = 6;
    } else {
      intervalDays = Math.round(state.intervalDays * easeFactor);
    }
    repetitions += 1;
  }

  const dueDate = new Date(now);
  dueDate.setDate(dueDate.getDate() + intervalDays);

  const status: CardStatus =
    repetitions === 0 ? 'LEARNING' : intervalDays >= MASTERED_INTERVAL_DAYS ? 'MASTERED' : 'REVIEW';

  return { easeFactor, intervalDays, repetitions, lapses, dueDate, status };
}

/** True when a card is due for review at the given moment. */
export function isDue(dueDate: Date, now: Date = new Date()): boolean {
  return dueDate.getTime() <= now.getTime();
}
