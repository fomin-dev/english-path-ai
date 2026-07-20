import type {
  PlacementAnswer,
  PlacementCategory,
  PlacementQuestion,
  PlacementResult,
  PlacementTestState,
  TestableCefrLevel,
} from './types.js';

/**
 * A staircase adaptive test: every correct answer nudges difficulty up one
 * CEFR band, every wrong answer nudges it down one band. Categories are
 * cycled round-robin so the final result covers grammar, vocabulary,
 * reading and general usage evenly. This converges to a learner's true
 * level far faster than a fixed-difficulty quiz, without needing a full
 * IRT/psychometric model.
 */

export const LEVEL_ORDER: TestableCefrLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const CATEGORY_ORDER: PlacementCategory[] = ['grammar', 'vocabulary', 'reading', 'usage'];
export const TEST_LENGTH = 16;

const APPROX_VOCAB_SIZE: Record<TestableCefrLevel, number> = {
  A1: 500,
  A2: 1000,
  B1: 2000,
  B2: 4000,
  C1: 8000,
  C2: 16000,
};

export function createInitialState(startLevel: TestableCefrLevel = 'B1'): PlacementTestState {
  return { askedIds: [], answers: [], currentLevel: startLevel };
}

function stepLevel(current: TestableCefrLevel, correct: boolean): TestableCefrLevel {
  const idx = LEVEL_ORDER.indexOf(current);
  const nextIdx = correct ? Math.min(idx + 1, LEVEL_ORDER.length - 1) : Math.max(idx - 1, 0);
  return LEVEL_ORDER[nextIdx]!;
}

export function isTestComplete(state: PlacementTestState): boolean {
  return state.answers.length >= TEST_LENGTH;
}

/** Picks the next question: matches the current difficulty and the next category in rotation. */
export function selectNextQuestion(
  state: PlacementTestState,
  pool: PlacementQuestion[],
): PlacementQuestion | null {
  if (isTestComplete(state)) return null;

  const wantedCategory = CATEGORY_ORDER[state.answers.length % CATEGORY_ORDER.length]!;
  const unasked = pool.filter((q) => !state.askedIds.includes(q.id));

  const exact = unasked.filter((q) => q.level === state.currentLevel && q.category === wantedCategory);
  if (exact.length > 0) return pickRandom(exact);

  const sameLevel = unasked.filter((q) => q.level === state.currentLevel);
  if (sameLevel.length > 0) return pickRandom(sameLevel);

  // Widen the search outward from the current level if the bank is sparse.
  const currentIdx = LEVEL_ORDER.indexOf(state.currentLevel);
  const byDistance = [...unasked].sort(
    (a, b) =>
      Math.abs(LEVEL_ORDER.indexOf(a.level) - currentIdx) -
      Math.abs(LEVEL_ORDER.indexOf(b.level) - currentIdx),
  );
  return byDistance[0] ?? null;
}

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)]!;
}

export function recordAnswer(
  state: PlacementTestState,
  question: PlacementQuestion,
  selectedIndex: number,
): PlacementTestState {
  const correct = selectedIndex === question.correctIndex;
  const answer: PlacementAnswer = {
    questionId: question.id,
    level: question.level,
    category: question.category,
    correct,
  };
  return {
    askedIds: [...state.askedIds, question.id],
    answers: [...state.answers, answer],
    currentLevel: stepLevel(state.currentLevel, correct),
  };
}

function categoryScore(answers: PlacementAnswer[], category: PlacementCategory): number {
  const relevant = answers.filter((a) => a.category === category);
  if (relevant.length === 0) return 0.5; // neutral if the category was never sampled
  return relevant.filter((a) => a.correct).length / relevant.length;
}

/** Final level = the average CEFR band reached over the back half of the test, which is
 * far more stable than the very last step (which can bounce on a single lucky/unlucky answer). */
function estimateFinalLevel(state: PlacementTestState): TestableCefrLevel {
  const settledWindow = Math.max(1, Math.floor(state.answers.length / 2));
  const recent = state.answers.slice(-settledWindow);
  const avgIdx =
    recent.reduce((sum, a) => sum + LEVEL_ORDER.indexOf(a.level), 0) / recent.length;
  return LEVEL_ORDER[Math.round(avgIdx)] ?? state.currentLevel;
}

export function computeResult(state: PlacementTestState): PlacementResult {
  const level = estimateFinalLevel(state);

  const scoreGrammar = categoryScore(state.answers, 'grammar');
  const scoreVocabulary = categoryScore(state.answers, 'vocabulary');
  const scoreReading = categoryScore(state.answers, 'reading');
  const scoreUsage = categoryScore(state.answers, 'usage');

  const scores: Record<PlacementCategory, number> = {
    grammar: scoreGrammar,
    vocabulary: scoreVocabulary,
    reading: scoreReading,
    usage: scoreUsage,
  };
  const strongAreas = CATEGORY_ORDER.filter((c) => scores[c] >= 0.7);
  const weakAreas = CATEGORY_ORDER.filter((c) => scores[c] <= 0.4);

  const baseVocab = APPROX_VOCAB_SIZE[level];
  const vocabEstimate = Math.round(baseVocab * (0.7 + 0.6 * scoreVocabulary));

  return {
    level,
    scoreGrammar,
    scoreVocabulary,
    scoreReading,
    scoreUsage,
    vocabEstimate,
    strongAreas,
    weakAreas,
  };
}
