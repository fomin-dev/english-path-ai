import { logger } from '../config/logger.js';
import type { AIProvider, AiLocale, GeneratedReadingText, WritingCheckResult } from './types.js';

const LOCALE_NAME: Record<AiLocale, string> = {
  en: 'English',
  ru: 'Russian',
  uk: 'Ukrainian',
};

interface OpenAIConfig {
  apiKey: string;
  model: string;
}

/**
 * Thin REST client for the OpenAI Chat Completions API. A hand-rolled fetch
 * call is used instead of the official SDK to match the other providers in
 * this module and keep the dependency surface small — see GeminiProvider for
 * the same rationale.
 */
export class OpenAIProvider implements AIProvider {
  readonly name = 'openai';
  private readonly apiKey: string;
  private readonly model: string;
  private readonly baseUrl = 'https://api.openai.com/v1/chat/completions';

  constructor(config: OpenAIConfig) {
    this.apiKey = config.apiKey;
    this.model = config.model;
  }

  isConfigured(): boolean {
    return this.apiKey.length > 0;
  }

  private async request(
    messages: Array<{ role: 'system' | 'user'; content: string }>,
    opts?: { temperature?: number; maxOutputTokens?: number; jsonMode?: boolean },
  ): Promise<string> {
    const body = {
      model: this.model,
      messages,
      temperature: opts?.temperature ?? 0.6,
      max_tokens: opts?.maxOutputTokens ?? 1024,
      ...(opts?.jsonMode ? { response_format: { type: 'json_object' } } : {}),
    };

    const res = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      logger.error({ status: res.status, errText }, 'OpenAI API request failed');
      throw new Error(`OpenAI API error ${res.status}`);
    }

    const json = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const text = json.choices?.[0]?.message?.content ?? '';
    if (!text) throw new Error('OpenAI API returned an empty response');
    return text;
  }

  async generateText(
    prompt: string,
    opts?: { temperature?: number; maxOutputTokens?: number },
  ): Promise<string> {
    return this.request([{ role: 'user', content: prompt }], opts);
  }

  async explainGrammar(question: string, locale: AiLocale, learnerLevel: string): Promise<string> {
    const system = `You are a friendly, encouraging English tutor for a CEFR ${learnerLevel} learner.
Answer the learner's question in ${LOCALE_NAME[locale]}, but keep any English example sentences in English.
Keep it concise (max ~120 words) and give one short example.
Reply in plain text only — no markdown (no **, *, _, #, or bullet dashes), since the reply is sent as-is with no formatting.`;
    return this.request(
      [
        { role: 'system', content: system },
        { role: 'user', content: `Learner's question: "${question}"` },
      ],
      { temperature: 0.5 },
    );
  }

  async checkWriting(input: {
    text: string;
    prompt?: string;
    learnerLevel: string;
    locale: AiLocale;
  }): Promise<WritingCheckResult> {
    const system = `You are an expert English writing examiner (CEFR-calibrated). Analyze the learner's text below.
Learner's current level: ${input.learnerLevel}. Explain errors in ${LOCALE_NAME[input.locale]}, but keep all English text (original/corrected sentences) in English.
${input.prompt ? `The writing prompt they responded to: "${input.prompt}"` : ''}

Respond with ONLY valid JSON matching exactly this shape:
{
  "correctedText": string,
  "errors": [{ "original": string, "corrected": string, "explanation": string, "category": "grammar"|"vocabulary"|"spelling"|"punctuation"|"style"|"word_order" }],
  "betterVersion": string,
  "strengths": string[],
  "estimatedLevel": "A1"|"A2"|"B1"|"B2"|"C1"|"C2",
  "summaryFeedback": string
}`;

    const raw = await this.request(
      [
        { role: 'system', content: system },
        { role: 'user', content: `Learner's text:\n"""\n${input.text}\n"""` },
      ],
      { temperature: 0.3, maxOutputTokens: 2048, jsonMode: true },
    );
    return parseJsonResponse<WritingCheckResult>(raw);
  }

  async generateReadingText(params: {
    level: string;
    topic?: string;
    locale: AiLocale;
  }): Promise<GeneratedReadingText> {
    const system = `Write a short English reading passage for a CEFR ${params.level} learner${
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

    const raw = await this.request(
      [
        { role: 'system', content: system },
        { role: 'user', content: 'Generate the reading passage now.' },
      ],
      { temperature: 0.7, maxOutputTokens: 1536, jsonMode: true },
    );
    return parseJsonResponse<GeneratedReadingText>(raw);
  }
}

function parseJsonResponse<T>(raw: string): T {
  const cleaned = raw.trim().replace(/^```json\s*/i, '').replace(/^```\s*/, '').replace(/```\s*$/, '');
  try {
    return JSON.parse(cleaned) as T;
  } catch (err) {
    logger.error({ raw, err }, 'Failed to parse OpenAI JSON response');
    throw new Error('AI response was not valid JSON');
  }
}
