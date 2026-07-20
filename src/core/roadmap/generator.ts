export type FullCefrLevel = 'A0' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export type SkillFocus =
  | 'SPEAKING'
  | 'LISTENING'
  | 'READING'
  | 'WRITING'
  | 'GRAMMAR'
  | 'VOCABULARY'
  | 'PRONUNCIATION'
  | 'IELTS'
  | 'SAT'
  | 'ACADEMIC'
  | 'EVERYDAY'
  | 'BUSINESS'
  | 'OTHER';

export interface RoadmapPhase {
  index: number;
  fromLevel: FullCefrLevel;
  toLevel: FullCefrLevel;
  startWeek: number;
  weeks: number;
  focusSkills: SkillFocus[];
  /** i18n keys describing concrete, checkable milestones for this phase. */
  milestoneKeys: string[];
}

export interface GenerateRoadmapInput {
  currentLevel: FullCefrLevel;
  targetLevel: FullCefrLevel;
  totalWeeks: number;
  focusSkills: SkillFocus[];
}

const LEVEL_ORDER: FullCefrLevel[] = ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

// Higher CEFR transitions take proportionally longer to master, even though
// each still counts as "one level" — this mirrors typical guided-hours
// estimates (e.g. Cambridge English / CEFR-linked exam guidance).
const TRANSITION_WEIGHT: Record<string, number> = {
  'A0-A1': 1,
  'A1-A2': 1,
  'A2-B1': 1.3,
  'B1-B2': 1.6,
  'B2-C1': 2,
  'C1-C2': 2.4,
};

export function generateRoadmap(input: GenerateRoadmapInput): RoadmapPhase[] {
  const { currentLevel, targetLevel, totalWeeks, focusSkills } = input;
  const fromIdx = LEVEL_ORDER.indexOf(currentLevel);
  const toIdx = LEVEL_ORDER.indexOf(targetLevel);

  if (fromIdx === -1 || toIdx === -1 || toIdx <= fromIdx) {
    throw new Error('targetLevel must be a higher CEFR level than currentLevel');
  }

  const transitions: Array<{ from: FullCefrLevel; to: FullCefrLevel; weight: number }> = [];
  for (let i = fromIdx; i < toIdx; i++) {
    const from = LEVEL_ORDER[i]!;
    const to = LEVEL_ORDER[i + 1]!;
    transitions.push({ from, to, weight: TRANSITION_WEIGHT[`${from}-${to}`] ?? 1.5 });
  }

  const totalWeight = transitions.reduce((sum, t) => sum + t.weight, 0);
  const minWeeksPerPhase = 1;

  // First pass: proportional allocation, floored at the minimum.
  const rawWeeks = transitions.map((t) =>
    Math.max(minWeeksPerPhase, Math.round((t.weight / totalWeight) * totalWeeks)),
  );
  // Reconcile rounding drift against the requested total.
  let drift = totalWeeks - rawWeeks.reduce((a, b) => a + b, 0);
  let i = 0;
  while (drift !== 0 && rawWeeks.length > 0) {
    const idx = i % rawWeeks.length;
    if (drift > 0) {
      rawWeeks[idx]! += 1;
      drift -= 1;
    } else if (rawWeeks[idx]! > minWeeksPerPhase) {
      rawWeeks[idx]! -= 1;
      drift += 1;
    }
    i += 1;
    if (i > 10_000) break; // safety valve, should never trigger
  }

  let startWeek = 1;
  return transitions.map((t, idx) => {
    const weeks = rawWeeks[idx]!;
    const phase: RoadmapPhase = {
      index: idx,
      fromLevel: t.from,
      toLevel: t.to,
      startWeek,
      weeks,
      focusSkills: focusSkills.length > 0 ? focusSkills : (['GRAMMAR', 'VOCABULARY', 'READING'] as SkillFocus[]),
      milestoneKeys: buildMilestoneKeys(t.to, focusSkills),
    };
    startWeek += weeks;
    return phase;
  });
}

function buildMilestoneKeys(toLevel: FullCefrLevel, focusSkills: SkillFocus[]): string[] {
  const keys = [`roadmap.milestone.grammar_topics_${toLevel}`, `roadmap.milestone.vocab_${toLevel}`];
  if (focusSkills.includes('WRITING')) keys.push(`roadmap.milestone.writing_${toLevel}`);
  if (focusSkills.includes('SPEAKING')) keys.push(`roadmap.milestone.speaking_${toLevel}`);
  if (focusSkills.includes('IELTS')) keys.push('roadmap.milestone.ielts_mock');
  if (focusSkills.includes('SAT')) keys.push('roadmap.milestone.sat_mock');
  return keys;
}

export type PaceSignal = 'ahead' | 'on_track' | 'behind';

/**
 * Compares how far into the roadmap timeline the learner is against how
 * much of the planned work they have actually completed, so the daily
 * lesson generator can ramp difficulty up or add catch-up review sessions.
 */
export function evaluatePace(params: {
  phases: RoadmapPhase[];
  weeksElapsed: number;
  tasksCompletedRatio: number; // 0..1, completed / planned tasks so far
}): PaceSignal {
  const totalWeeks = params.phases.reduce((sum, p) => sum + p.weeks, 0);
  const expectedRatio = totalWeeks === 0 ? 0 : Math.min(1, params.weeksElapsed / totalWeeks);
  const delta = params.tasksCompletedRatio - expectedRatio;

  if (delta > 0.1) return 'ahead';
  if (delta < -0.1) return 'behind';
  return 'on_track';
}
