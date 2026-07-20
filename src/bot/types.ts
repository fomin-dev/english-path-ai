import type { User as DbUser } from '@prisma/client';
import type { Context, SessionFlavor } from 'grammy';
import type { SupportedLocale } from '../i18n/index.js';
import type { PlacementQuestion, PlacementTestState, TestableCefrLevel } from '../core/placement-test/types.js';
import type { FullCefrLevel, SkillFocus } from '../core/roadmap/generator.js';

/** Transient step state for the onboarding + goal-setting flow. Plain session-backed
 * callback handlers are used here instead of @grammyjs/conversations because the
 * placement test's random question selection and per-step DB writes don't play
 * well with the plugin's replay model. */
export interface OnboardingState {
  knownLevel?: FullCefrLevel;
  test?: { state: PlacementTestState; currentQuestion?: PlacementQuestion };
  resolvedLevel?: TestableCefrLevel | 'A0';
  targetLevel?: FullCefrLevel;
  awaitingCustomTimeframe?: boolean;
  timeframeWeeks?: number;
  focusSkills?: SkillFocus[];
  dailyMinutes?: number;
}

export interface VocabReviewState {
  wordKeys: string[];
  index: number;
  cardsReviewed: number;
  mode: 'due' | 'new';
}

export interface GrammarPracticeState {
  topicSlug: string;
  questionIndex: number;
  correct: number;
}

export interface ReadingState {
  textId: string;
  questionIndex: number;
  correct: number;
}

export interface ListeningState {
  exerciseId: string;
  questionIndex: number;
  correct: number;
}

export interface WritingState {
  awaitingText: boolean;
  prompt?: string;
}

export interface IeltsWritingState {
  taskNumber: 1 | 2;
  prompt: string;
}

export interface IeltsPracticeState {
  kind: 'reading' | 'listening';
  setIndex: number;
  questionIndex: number;
  correct: number;
}

export interface SatPracticeState {
  kind: 'reading' | 'grammar' | 'vocabulary';
  setIndex?: number;
  index: number;
  correct: number;
  total: number;
}

export interface SettingsState {
  awaitingCustomMinutes?: boolean;
  awaitingReminderTime?: 'morning' | 'evening';
}

export interface AdminState {
  awaitingBroadcastText?: boolean;
  broadcastText?: string;
  awaitingUserLookup?: boolean;
}

export interface SessionData {
  locale: SupportedLocale;
  onboarding?: OnboardingState;
  vocabReview?: VocabReviewState;
  grammarPractice?: GrammarPracticeState;
  reading?: ReadingState;
  listening?: ListeningState;
  writing?: WritingState;
  tutorMode?: boolean;
  ieltsWriting?: IeltsWritingState;
  ieltsPractice?: IeltsPracticeState;
  satPractice?: SatPracticeState;
  settings?: SettingsState;
  admin?: AdminState;
}

interface ExtraContext {
  /** The learner's row, loaded/created by the user middleware before any handler runs. */
  dbUser: DbUser;
}

export type BotContext = Context & SessionFlavor<SessionData> & ExtraContext;
