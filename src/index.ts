import { serve } from '@hono/node-server';
import { run } from '@grammyjs/runner';
import { bot } from './bot/index.js';
import { createServer } from './server/http.js';
import { env, isWebhookMode } from './config/env.js';
import { logger } from './config/logger.js';
import { prisma } from './db/client.js';
import { registerReminderJobs } from './jobs/reminders.job.js';
import { registerStreakMaintenanceJob } from './jobs/streak-maintenance.job.js';

async function main(): Promise<void> {
  await bot.api.setMyCommands([
    { command: 'start', description: 'Restart / begin onboarding' },
    { command: 'menu', description: 'Open the main menu' },
  ]);

  registerReminderJobs(bot);
  registerStreakMaintenanceJob();

  const app = createServer(bot);
  const server = serve({ fetch: app.fetch, port: env.PORT }, (info) => {
    logger.info({ port: info.port, mode: isWebhookMode ? 'webhook' : 'long-polling' }, 'HTTP server listening');
  });

  let stopPolling: (() => Promise<void>) | undefined;

  if (isWebhookMode) {
    logger.info('Bot running in webhook mode — updates arrive via the HTTP server.');
  } else {
    await bot.api.deleteWebhook().catch(() => undefined);
    const runner = run(bot);
    stopPolling = () => runner.stop();
    logger.info('Bot running in long-polling mode (local development).');
  }

  const shutdown = async (signal: string): Promise<void> => {
    logger.info({ signal }, 'Shutting down…');
    await stopPolling?.();
    server.close();
    await prisma.$disconnect();
    process.exit(0);
  };

  process.on('SIGINT', () => void shutdown('SIGINT'));
  process.on('SIGTERM', () => void shutdown('SIGTERM'));
}

main().catch((err) => {
  logger.error({ err }, 'Fatal error during startup');
  process.exit(1);
});
