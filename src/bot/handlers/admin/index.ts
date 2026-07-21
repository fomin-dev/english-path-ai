import type { Bot } from 'grammy';
import { InlineKeyboard } from 'grammy';
import { t } from '../../../i18n/index.js';
import type { BotContext } from '../../types.js';
import {
  getGlobalStats,
  getAllActiveUserTelegramIds,
  findUserByUsernameOrId,
  setUserBanned,
} from '../../../db/repositories/admin.repository.js';
import { isMenuLabel } from '../menu/match-menu-text.js';
import { logger } from '../../../config/logger.js';

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function showAdminMenu(ctx: BotContext): Promise<void> {
  if (!ctx.dbUser.isAdmin) return;
  const locale = ctx.session.locale;
  const kb = new InlineKeyboard()
    .text(t(locale, 'admin.stats'), 'admin:stats')
    .row()
    .text(t(locale, 'admin.broadcast'), 'admin:broadcast')
    .row()
    .text(t(locale, 'admin.user_lookup'), 'admin:user_lookup');
  await ctx.reply(t(locale, 'admin.title'), { parse_mode: 'HTML', reply_markup: kb });
}

export function registerAdminHandlers(bot: Bot<BotContext>): void {
  bot.callbackQuery('admin:stats', async (ctx) => {
    if (!ctx.dbUser.isAdmin) return ctx.answerCallbackQuery();
    await ctx.answerCallbackQuery();
    const stats = await getGlobalStats();
    await ctx.reply(t(ctx.session.locale, 'admin.global_stats', stats), { parse_mode: 'HTML' });
  });

  bot.callbackQuery('admin:broadcast', async (ctx) => {
    if (!ctx.dbUser.isAdmin) return ctx.answerCallbackQuery();
    await ctx.answerCallbackQuery();
    ctx.session.admin = { awaitingBroadcastText: true };
    await ctx.reply(t(ctx.session.locale, 'admin.ask_broadcast_text'));
  });

  bot.callbackQuery('admin:user_lookup', async (ctx) => {
    if (!ctx.dbUser.isAdmin) return ctx.answerCallbackQuery();
    await ctx.answerCallbackQuery();
    ctx.session.admin = { awaitingUserLookup: true };
    await ctx.reply('Send a Telegram ID or @username to look up:');
  });

  bot.callbackQuery('admin:broadcast:send', async (ctx) => {
    if (!ctx.dbUser.isAdmin) return ctx.answerCallbackQuery();
    await ctx.answerCallbackQuery();
    const text = ctx.session.admin?.broadcastText;
    ctx.session.admin = undefined;
    if (!text) return;

    const users = await getAllActiveUserTelegramIds();
    let failed = 0;
    for (const user of users) {
      try {
        await ctx.api.sendMessage(Number(user.telegramId), text, { parse_mode: 'HTML' });
      } catch (err) {
        failed += 1;
        logger.warn({ err, telegramId: user.telegramId.toString() }, 'Broadcast delivery failed for one user');
      }
      await sleep(40);
    }
    await ctx.reply(t(ctx.session.locale, 'admin.broadcast_sent', { count: users.length, failed }));
  });

  bot.callbackQuery(/^admin:(ban|unban):(.+)$/, async (ctx) => {
    if (!ctx.dbUser.isAdmin) return ctx.answerCallbackQuery();
    const [, action, targetUserId] = ctx.match;
    const banned = action === 'ban';
    await setUserBanned(targetUserId!, banned);
    await ctx.answerCallbackQuery({ text: banned ? 'User banned.' : 'User unbanned.' });
    await ctx.editMessageReplyMarkup({
      reply_markup: new InlineKeyboard().text(
        banned ? '✅ Unban' : '🚫 Ban',
        banned ? `admin:unban:${targetUserId}` : `admin:ban:${targetUserId}`,
      ),
    });
  });

  bot.callbackQuery('admin:broadcast:cancel', async (ctx) => {
    await ctx.answerCallbackQuery();
    ctx.session.admin = undefined;
  });

  bot.on('message:text', async (ctx, next) => {
    const admin = ctx.session.admin;
    if (!admin?.awaitingBroadcastText && !admin?.awaitingUserLookup) return next();
    if (isMenuLabel(ctx.msg.text)) {
      ctx.session.admin = undefined;
      return next();
    }
    if (!ctx.dbUser.isAdmin) {
      ctx.session.admin = undefined;
      return next();
    }

    const locale = ctx.session.locale;

    if (admin.awaitingUserLookup) {
      ctx.session.admin = undefined;
      const found = await findUserByUsernameOrId(ctx.msg.text.trim());
      if (!found) {
        await ctx.reply('No user found.');
        return;
      }
      const banAction = found.isBanned ? `admin:unban:${found.id}` : `admin:ban:${found.id}`;
      const banLabel = found.isBanned ? '✅ Unban' : '🚫 Ban';
      await ctx.reply(
        `ID: ${found.telegramId}\nUsername: @${found.username ?? '—'}\nLevel: ${found.currentLevel ?? '—'} → ${found.targetLevel ?? '—'}\nXP: ${found.xp} (rank ${found.rankLevel})\nStreak: ${found.streakCount} (best ${found.longestStreak})\nOnboarded: ${found.onboardingCompleted}\nBanned: ${found.isBanned}`,
        { reply_markup: new InlineKeyboard().text(banLabel, banAction) },
      );
      return;
    }

    const text = ctx.msg.text;
    const users = await getAllActiveUserTelegramIds();
    ctx.session.admin = { broadcastText: text };
    await ctx.reply(t(locale, 'admin.broadcast_confirm', { count: users.length, preview: text }), {
      parse_mode: 'HTML',
      reply_markup: new InlineKeyboard()
        .text(t(locale, 'common.yes'), 'admin:broadcast:send')
        .text(t(locale, 'common.no'), 'admin:broadcast:cancel'),
    });
  });
}
