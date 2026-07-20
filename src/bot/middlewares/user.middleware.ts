import type { NextFunction } from 'grammy';
import { findOrCreateUser } from '../../db/repositories/user.repository.js';
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

  return next();
}
