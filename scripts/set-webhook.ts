/**
 * One-off script: registers the production webhook URL with Telegram.
 * Run after deploying to Render (or whenever BOT_WEBHOOK_URL/secret change):
 *   npm run bot:webhook:set
 */
import { env } from '../src/config/env.js';

async function main() {
  if (!env.BOT_WEBHOOK_URL) {
    console.error('BOT_WEBHOOK_URL is not set in .env — nothing to register. (Local dev uses long-polling.)');
    process.exit(1);
  }

  const secret = env.BOT_WEBHOOK_SECRET || 'hook';
  const webhookUrl = `${env.BOT_WEBHOOK_URL.replace(/\/$/, '')}/webhook/${secret}`;

  const res = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/setWebhook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      url: webhookUrl,
      secret_token: env.BOT_WEBHOOK_SECRET || undefined,
      allowed_updates: ['message', 'callback_query'],
      drop_pending_updates: false,
    }),
  });

  const json = (await res.json()) as { ok: boolean; description?: string };
  if (!json.ok) {
    console.error('❌ Failed to set webhook:', json);
    process.exit(1);
  }
  console.log('✅ Webhook registered:', webhookUrl);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
