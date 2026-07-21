import { env } from '../config/env.js';
import { AnthropicProvider } from './anthropic.provider.js';
import { GeminiProvider } from './gemini.provider.js';
import { NoopAIProvider } from './noop.provider.js';
import { OpenAIProvider } from './openai.provider.js';
import type { AIProvider } from './types.js';

function createProvider(): AIProvider {
  switch (env.AI_PROVIDER) {
    case 'gemini': {
      if (!env.GEMINI_API_KEY) return new NoopAIProvider();
      return new GeminiProvider({ apiKey: env.GEMINI_API_KEY, model: env.GEMINI_MODEL });
    }
    case 'openai': {
      if (!env.OPENAI_API_KEY) return new NoopAIProvider();
      return new OpenAIProvider({ apiKey: env.OPENAI_API_KEY, model: env.OPENAI_MODEL });
    }
    case 'anthropic': {
      if (!env.ANTHROPIC_API_KEY) return new NoopAIProvider();
      return new AnthropicProvider({ apiKey: env.ANTHROPIC_API_KEY, model: env.ANTHROPIC_MODEL });
    }
    case 'none':
    default:
      return new NoopAIProvider();
  }
}

export const aiProvider: AIProvider = createProvider();
export type { AIProvider, AiLocale, WritingCheckResult, GeneratedReadingText } from './types.js';
