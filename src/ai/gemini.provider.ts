import { logger } from '../config/logger.js';
import type { AIProvider, AiLocale, GeneratedReadingText, WritingCheckResult } from './types.js';

const LOCALE_NAME: Record<AiLocale, string> = {
  en: 'English',
  ru: 'Russian',
  uk: 'Ukrainian',
};

interface GeminiConfig {
  apiKey: string;
  model: string;
}

/**
 * Thin REST client for the Gemini API's free tier (generativelanguage.googleapis.com).
 * A hand-rolled fetch call is used instead of the official SDK to keep the
 * dependency surface small and the request/response shape fully explicit.
 */
export class GeminiProvider implements AIProvider {
  readonly name = 'gemini';
  private readonly apiKey: string;
  private readonly model: string;
  private readonly baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models';

  constructor(config: GeminiConfig) {
    this.apiKey = config.apiKey;
    this.model = config.model;
  }

  isConfigured(): boolean {
    return this.apiKey.length > 0;
  }

  private async request(
    contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }>,
    opts?: { temperature?: number; maxOutputTokens?: number; jsonMode?: boolean },
  ): Promise<string> {
    const url = `${this.baseUrl}/${this.model}:generateContent?key=${this.apiKey}`;
    const body = {
      contents,
      generationConfig: {
        temperature: opts?.temperature ?? 0.6,
        maxOutputTokens: opts?.maxOutputTokens ?? 1024,
        ...(opts?.jsonMode ? { responseMimeType: 'application/json' } : {}),
      },
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      logger.error({ status: res.status, errText }, 'Gemini API request failed');
      throw new Error(`Gemini API error ${res.status}`);
    }

    const json = (await res.json()) as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    };
    const text = json.candidates?.[0]?.content?.parts?.map((p) => p.text ?? '').join('') ?? '';
    if (!text) throw new Error('Gemini API returned an empty response');
    return text;
  }

  async generateText(
    prompt: string,
    opts?: { temperature?: number; maxOutputTokens?: number },
  ): Promise<string> {
    return this.request([{ role: 'user', parts: [{ text: prompt }] }], opts);
  }

  async explainGrammar(question: string, locale: AiLocale, learnerLevel: string): Promise<string> {
    const prompt = `You are a friendly, encouraging English tutor for a CEFR ${learnerLevel} learner.
Answer the learner's question in ${LOCALE_NAME[locale]}, but keep any English example sentences in English.
Keep it concise (max ~120 words) and give one short example.
Reply in plain text only — no markdown (no **, *, _, #, or bullet dashes), since the reply is sent as-is with no formatting.

Learner's question: "${question}"`;
    return this.request([{ role: 'user', parts: [{ text: prompt }] }], { temperature: 0.5 });
  }

  async checkWriting(input: {
    text: string;
    prompt?: string;
    learnerLevel: string;
    locale: AiLocale;
  }): Promise<WritingCheckResult> {
    const prompt = `You are an expert English writing examiner (CEFR-calibrated). Analyze the learner's text below.
Learner's current level: ${input.learnerLevel}. Explain errors in ${LOCALE_NAME[input.locale]}, but keep all English text (original/corrected sentences) in English.
${input.prompt ? `The writing prompt they responded to: "${input.prompt}"` : ''}

Learner's text:
"""
${input.text}
"""

Respond with ONLY valid JSON matching exactly this shape:
{
  "correctedText": string,
  "errors": [{ "original": string, "corrected": string, "explanation": string, "category": "grammar"|"vocabulary"|"spelling"|"punctuation"|"style"|"word_order" }],
  "betterVersion": string,
  "strengths": string[],
  "estimatedLevel": "A1"|"A2"|"B1"|"B2"|"C1"|"C2",
  "summaryFeedback": string
}`;

    const raw = await this.request([{ role: 'user', parts: [{ text: prompt }] }], {
      temperature: 0.3,
      maxOutputTokens: 2048,
      jsonMode: true,
    });
    return parseJsonResponse<WritingCheckResult>(raw);
  }

  async generateReadingText(params: {
    level: string;
    topic?: string;
    locale: AiLocale;
  }): Promise<GeneratedReadingText> {
    const prompt = `Write a short English reading passage for a CEFR ${params.level} learner${
      params.topic ? ` about "${params.topic}"` : ''
    }. Target 120-220 words depending on level (shorter for A1/A2, longer for C1/C2).
Then write 4 multiple-choice comprehension questions (4 options each, one correct) and list 5-8 useful new vocabulary words from the text.
Question and answer text should be in English; keep them appropriate for the level.

Respond with ONLY valid JSON matching exactly this shape:
{
  "title": string,
  "body": string,
  "questions": [{ "question": string, "options": string[4], "correctIndex": number }],
  "newWords": string[]
}`;

    const raw = await this.request([{ role: 'user', parts: [{ text: prompt }] }], {
      temperature: 0.7,
      maxOutputTokens: 1536,
      jsonMode: true,
    });
    return parseJsonResponse<GeneratedReadingText>(raw);
  }
}

function parseJsonResponse<T>(raw: string): T {
  // Gemini sometimes wraps JSON in ```json fences even in JSON mode; strip defensively.
  const cleaned = raw.trim().replace(/^```json\s*/i, '').replace(/^```\s*/, '').replace(/```\s*$/, '');
  try {
    return JSON.parse(cleaned) as T;
  } catch (err) {
    logger.error({ raw, err }, 'Failed to parse Gemini JSON response');
    throw new Error('AI response was not valid JSON');
  }
}
