import type { Bot } from 'grammy';
import { t, type SupportedLocale } from '../../../i18n/index.js';
import type { BotContext } from '../../types.js';
import { updateUser } from '../../../db/repositories/user.repository.js';
import { settingsMenuKeyboard, settingsLanguageKeyboard, settingsMinutesKeyboard } from '../../keyboards/settings.js';
import { isMenuLabel } from '../menu/match-menu-text.js';

const PRISMA_LOCALE = { en: 'EN', ru: 'RU', uk: 'UK' } as const;
const TIME_RE = /^([01]\d|2[0-3]):([0-5]\d)$/;

export async function showSettingsMenu(ctx: BotContext): Promise<void> {
  const locale = ctx.session.locale;
  const languageName = { en: 'English', ru: 'Русский', uk: 'Українська' }[locale];
  const lines = [
    t(locale, 'settings.title'),
    t(locale, 'settings.language', { language: languageName }),
    t(locale, 'settings.timezone', { timezone: ctx.dbUser.timezone }),
    t(locale, 'settings.daily_goal', { minutes: ctx.dbUser.dailyGoalMinutes }),
    t(locale, 'settings.notifications', {
      state: t(locale, ctx.dbUser.notificationsEnabled ? 'settings.notifications_on' : 'settings.notifications_off'),
    }),
  ];
  await ctx.reply(lines.join('\n'), { parse_mode: 'HTML', reply_markup: settingsMenuKeyboard(locale) });
}

export function registerSettingsHandlers(bot: Bot<BotContext>): void {
  bot.callbackQuery('settings:change_language', async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply(t(ctx.session.locale, 'settings.change_language'), { reply_markup: settingsLanguageKeyboard() });
  });

  bot.callbackQuery(/^settings:lang:(en|ru|uk)$/, async (ctx) => {
    const locale = ctx.match[1] as SupportedLocale;
    await ctx.answerCallbackQuery();
    ctx.session.locale = locale;
    await updateUser(ctx.dbUser.id, { interfaceLocale: PRISMA_LOCALE[locale] });
    await ctx.reply(t(locale, 'settings.saved'));
    await showSettingsMenu(ctx);
  });

  bot.callbackQuery('settings:change_goal', async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply(t(ctx.session.locale, 'settings.change_goal'), {
      reply_markup: settingsMinutesKeyboard(ctx.session.locale),
    });
  });

  bot.callbackQuery(/^settings:minutes:(10|15|30|60)$/, async (ctx) => {
    const minutes = Number(ctx.match[1]);
    await ctx.answerCallbackQuery();
    await updateUser(ctx.dbUser.id, { dailyGoalMinutes: minutes });
    await ctx.reply(t(ctx.session.locale, 'settings.saved'));
    await showSettingsMenu(ctx);
  });

  bot.callbackQuery('settings:toggle_notifications', async (ctx) => {
    await ctx.answerCallbackQuery();
    await updateUser(ctx.dbUser.id, { notificationsEnabled: !ctx.dbUser.notificationsEnabled });
    await ctx.reply(t(ctx.session.locale, 'settings.saved'));
    await showSettingsMenu(ctx);
  });

  bot.callbackQuery('settings:change_reminder_times', async (ctx) => {
    await ctx.answerCallbackQuery();
    ctx.session.settings = { awaitingReminderTime: 'morning' };
    await ctx.reply(t(ctx.session.locale, 'settings.ask_morning_reminder'));
  });

  bot.on('message:text', async (ctx, next) => {
    const awaiting = ctx.session.settings?.awaitingReminderTime;
    if (!awaiting) return next();
    if (isMenuLabel(ctx.msg.text)) {
      ctx.session.settings = undefined;
      return next();
    }

    const text = ctx.msg.text.trim();
    if (!TIME_RE.test(text)) {
      await ctx.reply(t(ctx.session.locale, 'settings.invalid_time'));
      return;
    }

    if (awaiting === 'morning') {
      await updateUser(ctx.dbUser.id, { morningReminderTime: text });
      ctx.session.settings = { awaitingReminderTime: 'evening' };
      await ctx.reply(t(ctx.session.locale, 'settings.ask_evening_reminder'));
      return;
    }

    await updateUser(ctx.dbUser.id, { eveningReminderTime: text });
    ctx.session.settings = undefined;
    await ctx.reply(t(ctx.session.locale, 'settings.saved'));
    await showSettingsMenu(ctx);
  });
}
