import { Hono } from 'hono';
import { webhookCallback, type Bot } from 'grammy';
import { env, isWebhookMode } from '../config/env.js';
import { logger } from '../config/logger.js';

/**
 * Minimal HTTP surface for production (Render Web Service):
 *  - GET /health  → used by UptimeRobot to keep the free-tier instance awake
 *                    and to alert if the process actually goes down.
 *  - POST /webhook/:secret → Telegram webhook receiver (only mounted when
 *                    BOT_WEBHOOK_URL is set; local dev uses long-polling
 *                    instead and never starts this server for the bot).
 *
 * The secret lives in the URL path (in addition to Telegram's own
 * `X-Telegram-Bot-Api-Secret-Token` header check inside webhookCallback)
 * so an unauthenticated scan of the base URL can't discover the endpoint.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createServer(bot: Bot<any>) {
  const app = new Hono();

  app.get('/', (c) => c.text('English Path AI is running.'));
  app.get('/health', (c) => c.json({ status: 'ok', timestamp: new Date().toISOString() }));

  if (isWebhookMode) {
    const path = `/webhook/${env.BOT_WEBHOOK_SECRET || 'hook'}`;
    app.post(
      path,
      webhookCallback(bot, 'hono', {
        secretToken: env.BOT_WEBHOOK_SECRET || undefined,
      }),
    );
    logger.info({ path }, 'Webhook endpoint mounted');
  }

  return app;
}
