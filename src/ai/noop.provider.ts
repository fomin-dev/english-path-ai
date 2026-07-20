import type { AIProvider, AiLocale, GeneratedReadingText, WritingCheckResult } from './types.js';

const FALLBACK_MESSAGE: Record<AiLocale, string> = {
  en: 'AI features are not configured yet. Please add an API key to enable the AI tutor and writing checker.',
  ru: 'ИИ-функции пока не настроены. Добавьте API-ключ, чтобы включить AI-репетитора и проверку Writing.',
  uk: 'ШІ-функції ще не налаштовані. Додайте API-ключ, щоб увімкнути AI-репетитора та перевірку Writing.',
};

/** Used when AI_PROVIDER=none or no key is set, so the rest of the bot (SRS, grammar, reading
 * banks, gamification) keeps working fully without a hard dependency on an external AI service. */
export class NoopAIProvider implements AIProvider {
  readonly name = 'none';

  isConfigured(): boolean {
    return false;
  }

  async generateText(): Promise<string> {
    return FALLBACK_MESSAGE.en;
  }

  async explainGrammar(_question: string, locale: AiLocale): Promise<string> {
    return FALLBACK_MESSAGE[locale];
  }

  async checkWriting(input: { text: string; locale: AiLocale }): Promise<WritingCheckResult> {
    return {
      correctedText: input.text,
      errors: [],
      betterVersion: input.text,
      strengths: [],
      estimatedLevel: 'B1',
      summaryFeedback: FALLBACK_MESSAGE[input.locale],
    };
  }

  async generateReadingText(): Promise<GeneratedReadingText> {
    throw new Error('AI provider is not configured; use the static reading bank instead.');
  }
}
