import type { NextFunction } from 'grammy';
import { findOrCreateUser } from '../../db/repositories/user.repository.js';
import { t } from '../../i18n/index.js';
import type { BotContext } from '../types.js';

const PRISMA_TO_APP_LOCALE = { EN: 'en', RU: 'ru', UK: 'uk' } as const;

/** Loads (or lazily creates) the learner's DB row and attaches it as `ctx.dbUser`
 * before any command/conversation handler runs. */
export async function userMiddleware(ctx: BotContext, next: NextFunction): Promise<void> {
  if (!ctx.from || ctx.from.is_bot) {
    return next();
  }

  const user = await findOrCreateUser({
    id: ctx.from.id,
    username: ctx.from.username,
    first_name: ctx.from.first_name,
    language_code: ctx.from.language_code,
  });

  ctx.dbUser = user;
  if (!ctx.session.locale) {
    ctx.session.locale = PRISMA_TO_APP_LOCALE[user.interfaceLocale];
  }

  // Banned users are cut off here so no handler below (including admin lookups
  // by the banned user themselves, if they were ever an admin) ever runs for them.
  if (user.isBanned && !user.isAdmin) {
    await ctx.reply(t(ctx.session.locale, 'errors.banned'));
    return;
  }

  return next();
}
