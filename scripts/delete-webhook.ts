/**
 * One-off script: removes the Telegram webhook and falls back to no
 * receiver — useful when switching back to local long-polling development.
 *   npm run bot:webhook:delete
 */
import { env } from '../src/config/env.js';

async function main() {
  const res = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/deleteWebhook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ drop_pending_updates: false }),
  });

  const json = (await res.json()) as { ok: boolean; description?: string };
  if (!json.ok) {
    console.error('❌ Failed to delete webhook:', json);
    process.exit(1);
  }
  console.log('✅ Webhook removed. The bot will need to run in long-polling mode now.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
