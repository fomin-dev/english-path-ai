import { env } from '../config/env.js';
import { GeminiProvider } from './gemini.provider.js';
import { NoopAIProvider } from './noop.provider.js';
import type { AIProvider } from './types.js';

function createProvider(): AIProvider {
  switch (env.AI_PROVIDER) {
    case 'gemini': {
      if (!env.GEMINI_API_KEY) return new NoopAIProvider();
      return new GeminiProvider({ apiKey: env.GEMINI_API_KEY, model: env.GEMINI_MODEL });
    }
    // OpenAI/Anthropic providers can be dropped in here later behind the same
    // AIProvider interface without touching any bot handler code.
    case 'openai':
    case 'anthropic':
    case 'none':
    default:
      return new NoopAIProvider();
  }
}

export const aiProvider: AIProvider = createProvider();
export type { AIProvider, AiLocale, WritingCheckResult, GeneratedReadingText } from './types.js';
