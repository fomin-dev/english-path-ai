import { config as loadDotenv } from 'dotenv';
import { z } from 'zod';

// Render (and most other hosts) inject env vars directly into the process,
// so this is a no-op there; locally it loads `.env` for `npm run dev` /
// `node dist/index.js` alike. Never overrides variables already set in the
// real environment.
loadDotenv();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  TELEGRAM_BOT_TOKEN: z.string().min(1, 'TELEGRAM_BOT_TOKEN is required'),
  ADMIN_TELEGRAM_IDS: z
    .string()
    .default('')
    .transform((v) =>
      v
        .split(',')
        .map((id) => id.trim())
        .filter(Boolean)
        .map((id) => BigInt(id)),
    ),

  BOT_WEBHOOK_URL: z.string().url().optional().or(z.literal('')),
  BOT_WEBHOOK_SECRET: z.string().optional().or(z.literal('')),

  PORT: z.coerce.number().int().positive().default(3000),

  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),

  AI_PROVIDER: z.enum(['gemini', 'openai', 'anthropic', 'none']).default('gemini'),
  GEMINI_API_KEY: z.string().optional().or(z.literal('')),
  GEMINI_MODEL: z.string().default('gemini-2.0-flash'),
  OPENAI_API_KEY: z.string().optional().or(z.literal('')),
  ANTHROPIC_API_KEY: z.string().optional().or(z.literal('')),

  LOG_LEVEL: z.enum(['trace', 'debug', 'info', 'warn', 'error']).default('info'),
  DEFAULT_TIMEZONE: z.string().default('Europe/Kyiv'),
});

export type Env = z.infer<typeof envSchema>;

function loadEnv(): Env {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error('❌ Invalid environment variables:');
    console.error(parsed.error.flatten().fieldErrors);
    throw new Error('Invalid environment variables. Check .env against .env.example.');
  }
  return parsed.data;
}

export const env = loadEnv();

export const isProduction = env.NODE_ENV === 'production';
export const isWebhookMode = Boolean(env.BOT_WEBHOOK_URL);
