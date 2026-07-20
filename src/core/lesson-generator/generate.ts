import { XP_REWARDS } from '../gamification/xp.js';
import type { FullCefrLevel, SkillFocus } from '../roadmap/generator.js';

export type TaskType =
  | 'GRAMMAR'
  | 'VOCABULARY'
  | 'READING'
  | 'LISTENING'
  | 'WRITING'
  | 'TRANSLATION'
  | 'SENTENCE_BUILDING'
  | 'SPEAKING'
  | 'SHADOWING'
  | 'FLASHCARDS'
  | 'MINI_TEST'
  | 'REVIEW';

export interface DailyTaskItem {
  type: TaskType;
  xp: number;
}

export interface GenerateDailyTasksInput {
  level: FullCefrLevel;
  focusSkills: SkillFocus[];
  dailyGoalMinutes: number;
  /** Vocabulary cards due for SRS review today. */
  dueVocabCount: number;
  /** Categories the learner is currently weak in (from placement test / recent attempts). */
  weakAreas?: string[];
}

const FOCUS_TASK_MAP: Partial<Record<SkillFocus, TaskType[]>> = {
  SPEAKING: ['SPEAKING', 'SHADOWING'],
  LISTENING: ['LISTENING', 'SHADOWING'],
  READING: ['READING'],
  WRITING: ['WRITING', 'SENTENCE_BUILDING'],
  GRAMMAR: ['GRAMMAR', 'MINI_TEST'],
  VOCABULARY: ['VOCABULARY', 'FLASHCARDS'],
  PRONUNCIATION: ['SHADOWING'],
  ACADEMIC: ['READING', 'WRITING'],
  EVERYDAY: ['SPEAKING', 'LISTENING'],
  BUSINESS: ['WRITING', 'READING'],
};

const DEFAULT_TASK_POOL: TaskType[] = ['GRAMMAR', 'VOCABULARY', 'READING'];
const MIN_TASKS = 3;
const MAX_TASKS = 10;
const MINUTES_PER_TASK = 4;

/**
 * Builds a varied daily task list. Vocabulary review is prioritised first
 * (SRS due cards must not pile up), then tasks are drawn from a pool built
 * out of the learner's chosen focus skills so IELTS/SAT/business learners
 * get a noticeably different day than a general-English beginner.
 */
export function generateDailyTasks(input: GenerateDailyTasksInput): DailyTaskItem[] {
  const tasks: DailyTaskItem[] = [];

  if (input.dueVocabCount > 0) {
    tasks.push({ type: 'FLASHCARDS', xp: XP_REWARDS.FLASHCARDS });
  }

  const budget = Math.max(MIN_TASKS, Math.min(MAX_TASKS, Math.round(input.dailyGoalMinutes / MINUTES_PER_TASK)));

  const pool = buildWeightedPool(input.focusSkills);
  let poolIdx = 0;
  while (tasks.length < budget) {
    const type = pool[poolIdx % pool.length]!;
    tasks.push({ type, xp: xpFor(type) });
    poolIdx += 1;
  }

  if ((input.weakAreas?.length ?? 0) > 0 && tasks.length < MAX_TASKS) {
    tasks.push({ type: 'REVIEW', xp: XP_REWARDS.REVIEW });
  }

  return dedupeAdjacent(tasks);
}

function buildWeightedPool(focusSkills: SkillFocus[]): TaskType[] {
  if (focusSkills.length === 0) return DEFAULT_TASK_POOL;

  const pool: TaskType[] = [];
  for (const skill of focusSkills) {
    const types = FOCUS_TASK_MAP[skill];
    if (types) pool.push(...types);
  }
  return pool.length > 0 ? pool : DEFAULT_TASK_POOL;
}

function xpFor(type: TaskType): number {
  return XP_REWARDS[type];
}

/** Avoids two identical task types back-to-back when the pool is short, for a less repetitive feel. */
function dedupeAdjacent(tasks: DailyTaskItem[]): DailyTaskItem[] {
  const arr = [...tasks];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i]!.type === arr[i - 1]!.type) {
      const swapIdx = arr.findIndex((t, j) => j > i && t.type !== arr[i]!.type);
      if (swapIdx !== -1) {
        [arr[i], arr[swapIdx]] = [arr[swapIdx]!, arr[i]!];
      }
    }
  }
  return arr;
}
