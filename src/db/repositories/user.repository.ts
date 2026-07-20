import type { Locale, User } from '@prisma/client';
import { prisma } from '../client.js';
import { env } from '../../config/env.js';
import { detectLocale } from '../../i18n/index.js';
import { dateKeyInTimezone, updateStreakOnActivity } from '../../core/gamification/streaks.js';

export interface TelegramUserPayload {
  id: number;
  username?: string;
  first_name?: string;
  language_code?: string;
}

const APP_TO_PRISMA_LOCALE: Record<string, Locale> = { en: 'EN', ru: 'RU', uk: 'UK' };

export async function findOrCreateUser(tgUser: TelegramUserPayload): Promise<User> {
  const telegramId = BigInt(tgUser.id);
  const existing = await prisma.user.findUnique({ where: { telegramId } });
  if (existing) return existing;

  const isAdmin = env.ADMIN_TELEGRAM_IDS.some((id) => id === telegramId);
  const interfaceLocale = APP_TO_PRISMA_LOCALE[detectLocale(tgUser.language_code)] ?? 'RU';

  return prisma.user.create({
    data: {
      telegramId,
      username: tgUser.username,
      firstName: tgUser.first_name,
      interfaceLocale,
      isAdmin,
      timezone: env.DEFAULT_TIMEZONE,
    },
  });
}

export function getUserByTelegramId(telegramId: bigint): Promise<User | null> {
  return prisma.user.findUnique({ where: { telegramId } });
}

export function updateUser(id: string, data: Partial<User>): Promise<User> {
  return prisma.user.update({ where: { id }, data });
}

export interface ActivityResult {
  streakCount: number;
  longestStreak: number;
  streakContinued: boolean;
  streakBroken: boolean;
  isNewDay: boolean;
}

/**
 * Call once per completed task. Advances the streak counter at most once per
 * local calendar day and appends today's StreakLog row.
 */
export async function recordActivity(user: User, tasksCompletedDelta = 1): Promise<ActivityResult> {
  const todayKey = dateKeyInTimezone(new Date(), user.timezone);
  const lastActiveDateKey = user.lastActiveDate ? dateKeyInTimezone(user.lastActiveDate, user.timezone) : null;

  const result = updateStreakOnActivity({
    lastActiveDateKey,
    currentStreak: user.streakCount,
    longestStreak: user.longestStreak,
    todayKey,
  });

  await prisma.$transaction([
    prisma.user.update({
      where: { id: user.id },
      data: {
        streakCount: result.streakCount,
        longestStreak: result.longestStreak,
        lastActiveDate: new Date(),
      },
    }),
    prisma.streakLog.upsert({
      where: { userId_date: { userId: user.id, date: new Date(`${todayKey}T00:00:00.000Z`) } },
      create: {
        userId: user.id,
        date: new Date(`${todayKey}T00:00:00.000Z`),
        tasksCompleted: tasksCompletedDelta,
        goalMet: false,
      },
      update: { tasksCompleted: { increment: tasksCompletedDelta } },
    }),
  ]);

  return result;
}
