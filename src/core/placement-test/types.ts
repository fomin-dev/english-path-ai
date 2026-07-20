export type TestableCefrLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export type PlacementCategory = 'grammar' | 'vocabulary' | 'reading' | 'usage';

export interface PlacementQuestion {
  id: string;
  level: TestableCefrLevel;
  category: PlacementCategory;
  prompt: string;
  passage?: string; // present for `reading` category
  options: string[];
  correctIndex: number;
}

export interface PlacementAnswer {
  questionId: string;
  level: TestableCefrLevel;
  category: PlacementCategory;
  correct: boolean;
}

export interface PlacementTestState {
  askedIds: string[];
  answers: PlacementAnswer[];
  currentLevel: TestableCefrLevel;
}

export interface PlacementResult {
  level: TestableCefrLevel;
  scoreGrammar: number;
  scoreVocabulary: number;
  scoreReading: number;
  scoreUsage: number;
  vocabEstimate: number;
  strongAreas: PlacementCategory[];
  weakAreas: PlacementCategory[];
}
