export type AiLocale = 'en' | 'ru' | 'uk';

export interface WritingErrorItem {
  original: string;
  corrected: string;
  explanation: string;
  category: 'grammar' | 'vocabulary' | 'spelling' | 'punctuation' | 'style' | 'word_order';
}

export interface WritingCheckResult {
  correctedText: string;
  errors: WritingErrorItem[];
  betterVersion: string;
  strengths: string[];
  estimatedLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  summaryFeedback: string;
}

export interface GeneratedReadingText {
  title: string;
  body: string;
  questions: Array<{ question: string; options: string[]; correctIndex: number }>;
  newWords: string[];
}

export interface AIProvider {
  readonly name: string;
  isConfigured(): boolean;

  /** Free-form generation, used by the AI tutor chat. */
  generateText(prompt: string, opts?: { temperature?: number; maxOutputTokens?: number }): Promise<string>;

  /** Grammar/vocabulary Q&A, explained at the learner's level and in their interface language. */
  explainGrammar(question: string, locale: AiLocale, learnerLevel: string): Promise<string>;

  /** Corrects and scores a piece of learner writing. */
  checkWriting(input: {
    text: string;
    prompt?: string;
    learnerLevel: string;
    locale: AiLocale;
  }): Promise<WritingCheckResult>;

  /** Generates a fresh reading passage + comprehension questions at a given level. */
  generateReadingText(params: {
    level: string;
    topic?: string;
    locale: AiLocale;
  }): Promise<GeneratedReadingText>;
}
