import type { Bot } from 'grammy';
import { InlineKeyboard } from 'grammy';
import { t } from '../../../i18n/index.js';
import type { BotContext } from '../../types.js';
import { getTopLeaderboard, getUserLeaderboardRank } from '../../../db/repositories/leaderboard.repository.js';
import { updateUser } from '../../../db/repositories/user.repository.js';
import { rankMedal } from '../../../core/leaderboard/rank-medal.js';

export async function showLeaderboard(ctx: BotContext): Promise<void> {
  const locale = ctx.session.locale;
  const [entries, ownRank] = await Promise.all([
    getTopLeaderboard(10),
    getUserLeaderboardRank(ctx.dbUser.id),
  ]);

  const lines = [t(locale, 'leaderboard.title')];

  if (entries.length === 0) {
    lines.push(t(locale, 'leaderboard.empty'));
  } else {
    entries.forEach((entry, index) => {
      const isSelf = entry.userId === ctx.dbUser.id;
      const name = isSelf ? `${entry.displayName} ${t(locale, 'leaderboard.you_marker')}` : entry.displayName;
      lines.push(`${rankMedal(index + 1)} ${name} — ${entry.xp} XP`);
    });
  }

  if (ownRank !== null && ownRank > entries.length) {
    lines.push('', t(locale, 'leaderboard.your_rank', { rank: ownRank, xp: ctx.dbUser.xp }));
  }

  const kb = new InlineKeyboard().text(
    t(locale, ctx.dbUser.leaderboardOptIn ? 'leaderboard.opt_out' : 'leaderboard.opt_in'),
    'leaderboard:toggle_opt_in',
  );

  await ctx.reply(lines.join('\n'), { parse_mode: 'HTML', reply_markup: kb });
}

export function registerLeaderboardHandlers(bot: Bot<BotContext>): void {
  bot.callbackQuery('leaderboard:toggle_opt_in', async (ctx) => {
    await ctx.answerCallbackQuery();
    const optIn = !ctx.dbUser.leaderboardOptIn;
    await updateUser(ctx.dbUser.id, { leaderboardOptIn: optIn });
    ctx.dbUser.leaderboardOptIn = optIn;
    await ctx.reply(t(ctx.session.locale, optIn ? 'leaderboard.opted_in' : 'leaderboard.opted_out'));
    await showLeaderboard(ctx);
  });
}
