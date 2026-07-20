import cron from 'node-cron';
import type { Bot } from 'grammy';
import type { Locale } from '@prisma/client';
import { prisma } from '../db/client.js';
import { logger } from '../config/logger.js';
import { t, type SupportedLocale } from '../i18n/index.js';
import { dateKeyInTimezone, hasNotActedToday } from '../core/gamification/streaks.js';

const PRISMA_TO_APP_LOCALE: Record<Locale, SupportedLocale> = { EN: 'en', RU: 'ru', UK: 'uk' };

function localTimeHHmm(date: Date, timezone: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function sendReminder(bot: Bot<any>, telegramId: bigint, text: string) {
  try {
    await bot.api.sendMessage(Number(telegramId), text, { parse_mode: 'HTML' });
  } catch (err) {
    logger.warn({ err, telegramId: telegramId.toString() }, 'Failed to deliver reminder (user may have blocked the bot)');
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function tick(bot: Bot<any>) {
  const now = new Date();
  const users = await prisma.user.findMany({
    where: { notificationsEnabled: true, isBanned: false, onboardingCompleted: true },
  });

  for (const user of users) {
    const locale = PRISMA_TO_APP_LOCALE[user.interfaceLocale];
    const localTime = localTimeHHmm(now, user.timezone);
    const name = user.firstName ?? '';

    if (user.morningReminderTime && localTime === user.morningReminderTime) {
      const text = t(locale, 'reminders.morning_text', { name, minutes: user.dailyGoalMinutes });
      await sendReminder(bot, user.telegramId, text);
    }

    if (user.eveningReminderTime && localTime === user.eveningReminderTime) {
      const todayKey = dateKeyInTimezone(now, user.timezone);
      const lastActiveKey = user.lastActiveDate ? dateKeyInTimezone(user.lastActiveDate, user.timezone) : null;

      if (hasNotActedToday(lastActiveKey, todayKey)) {
        const text =
          user.streakCount > 0
            ? t(locale, 'reminders.streak_risk_text', { name, streak: user.streakCount })
            : t(locale, 'reminders.evening_text', { name, streak: user.streakCount });
        await sendReminder(bot, user.telegramId, text);
      }
    }
  }
}

/** Checks every minute for users whose local reminder time just hit, across all timezones. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function registerReminderJobs(bot: Bot<any>): void {
  cron.schedule('* * * * *', () => {
    tick(bot).catch((err) => logger.error({ err }, 'Reminder job tick failed'));
  });
  logger.info('Reminder job scheduled (every minute)');
}
