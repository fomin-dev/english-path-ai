import type { Bot } from 'grammy';
import { t } from '../../../i18n/index.js';
import type { BotContext } from '../../types.js';
import { aiProvider } from '../../../ai/index.js';
import { isMenuLabel } from '../menu/match-menu-text.js';
import { logger } from '../../../config/logger.js';

export async function showTutorMenu(ctx: BotContext): Promise<void> {
  ctx.session.tutorMode = true;
  const locale = ctx.session.locale;
  await ctx.reply(`${t(locale, 'tutor.title')}\n${t(locale, 'tutor.intro')}`, { parse_mode: 'HTML' });
}

export function registerTutorHandlers(bot: Bot<BotContext>): void {
  bot.on('message:text', async (ctx, next) => {
    if (!ctx.session.tutorMode) return next();
    if (isMenuLabel(ctx.msg.text)) {
      ctx.session.tutorMode = false;
      return next();
    }

    const locale = ctx.session.locale;
    if (!aiProvider.isConfigured()) {
      await ctx.reply(t(locale, 'common.not_configured_ai'));
      return;
    }

    await ctx.reply(t(locale, 'tutor.thinking'));
    try {
      const answer = await aiProvider.explainGrammar(ctx.msg.text, locale, ctx.dbUser.currentLevel ?? 'B1');
      await ctx.reply(answer);
    } catch (err) {
      logger.error({ err, provider: aiProvider.name }, 'AI tutor request failed');
      await ctx.reply(t(locale, 'common.ai_error'));
    }
  });
}
