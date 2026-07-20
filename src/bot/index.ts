import { Bot, session } from 'grammy';
import { env } from '../config/env.js';
import { logger } from '../config/logger.js';
import { createPrismaSessionStorage } from '../db/repositories/session.repository.js';
import { userMiddleware } from './middlewares/user.middleware.js';
import { registerOnboardingHandlers } from './handlers/onboarding/index.js';
import { registerMenuHandlers } from './handlers/menu/index.js';
import { registerVocabHandlers } from './handlers/vocabulary/index.js';
import { registerGrammarHandlers } from './handlers/grammar/index.js';
import { registerReadingHandlers } from './handlers/reading/index.js';
import { registerListeningHandlers } from './handlers/listening/index.js';
import { registerWritingHandlers } from './handlers/writing/index.js';
import { registerTutorHandlers } from './handlers/tutor/index.js';
import { registerLessonHandlers } from './handlers/lessons/index.js';
import { registerIeltsHandlers } from './handlers/ielts/index.js';
import { registerSatHandlers } from './handlers/sat/index.js';
import { registerStatsHandlers } from './handlers/stats/index.js';
import { registerSettingsHandlers } from './handlers/settings/index.js';
import { registerAdminHandlers } from './handlers/admin/index.js';
import type { BotContext, SessionData } from './types.js';
import { t } from '../i18n/index.js';

export const bot = new Bot<BotContext>(env.TELEGRAM_BOT_TOKEN);

bot.use(
  session<SessionData, BotContext>({
    initial: (): SessionData => ({ locale: 'ru' }),
    storage: createPrismaSessionStorage<SessionData>(),
    getSessionKey: (ctx) => ctx.chat?.id.toString() ?? ctx.from?.id.toString(),
  }),
);
bot.use(userMiddleware);

registerOnboardingHandlers(bot);
registerMenuHandlers(bot);
registerLessonHandlers(bot);
registerVocabHandlers(bot);
registerGrammarHandlers(bot);
registerReadingHandlers(bot);
registerListeningHandlers(bot);
registerWritingHandlers(bot);
registerTutorHandlers(bot);
registerIeltsHandlers(bot);
registerSatHandlers(bot);
registerStatsHandlers(bot);
registerSettingsHandlers(bot);
registerAdminHandlers(bot);

// Fallback for anything not matched by a more specific handler above.
bot.on('message:text', async (ctx) => {
  if (!ctx.dbUser.onboardingCompleted) return;
  await ctx.reply(t(ctx.session.locale, 'errors.unknown_command'));
});

bot.catch((err) => {
  logger.error({ err: err.error, updateId: err.ctx.update.update_id }, 'Unhandled bot error');
});
