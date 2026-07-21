import type { Bot } from 'grammy';
import { t } from '../../../i18n/index.js';
import type { BotContext } from '../../types.js';
import { aiProvider } from '../../../ai/index.js';
import { saveWritingSubmission } from '../../../db/repositories/writing.repository.js';
import { awardXpAndNotify } from '../gamification/notify.js';
import { XP_REWARDS } from '../../../core/gamification/xp.js';
import { isMenuLabel } from '../menu/match-menu-text.js';
import { logger } from '../../../config/logger.js';

const WORDS_TO_TREAT_AS_ESSAY = 12;

export async function showWritingMenu(ctx: BotContext): Promise<void> {
  ctx.session.writing = { awaitingText: true };
  await ctx.reply(`${t(ctx.session.locale, 'writing.title')}\n${t(ctx.session.locale, 'writing.ask_prompt_or_free')}`, {
    parse_mode: 'HTML',
  });
}

function formatErrorCategory(locale: BotContext['session']['locale'], category: string): string {
  return t(locale, `writing.error_category.${category}`);
}

export function registerWritingHandlers(bot: Bot<BotContext>): void {
  bot.on('message:text', async (ctx, next) => {
    const state = ctx.session.writing;
    if (!state?.awaitingText) return next();
    if (isMenuLabel(ctx.msg.text)) {
      ctx.session.writing = undefined;
      return next();
    }

    const locale = ctx.session.locale;
    const text = ctx.msg.text.trim();
    const wordCount = text.split(/\s+/).filter(Boolean).length;

    if (!state.prompt && wordCount < WORDS_TO_TREAT_AS_ESSAY) {
      state.prompt = text;
      await ctx.reply(t(locale, 'writing.waiting_for_text'));
      return;
    }

    if (!aiProvider.isConfigured()) {
      await ctx.reply(t(locale, 'common.not_configured_ai'));
      ctx.session.writing = undefined;
      return;
    }

    await ctx.reply(t(locale, 'writing.checking'));
    ctx.session.writing = undefined;

    let result;
    try {
      result = await aiProvider.checkWriting({
        text,
        prompt: state.prompt,
        learnerLevel: ctx.dbUser.currentLevel ?? 'B1',
        locale,
      });
    } catch (err) {
      logger.error({ err, provider: aiProvider.name }, 'Writing checker request failed');
      await ctx.reply(t(locale, 'common.ai_error'));
      return;
    }

    await saveWritingSubmission(ctx.dbUser.id, text, state.prompt, result);

    const errorLines = result.errors
      .map((e) => `• <s>${e.original}</s> → <b>${e.corrected}</b> — ${formatErrorCategory(locale, e.category)}: ${e.explanation}`)
      .join('\n');
    const strengthLines = result.strengths.map((s) => `• ${s}`).join('\n');

    const parts = [
      t(locale, 'writing.result_title'),
      '',
      result.summaryFeedback,
      '',
      errorLines ? `<b>${t(locale, 'writing.corrected_label')}:</b>\n${result.correctedText}\n\n${errorLines}` : '',
      '',
      `<b>${t(locale, 'writing.better_label')}:</b>\n${result.betterVersion}`,
      '',
      strengthLines ? `<b>${t(locale, 'writing.strengths_label')}:</b>\n${strengthLines}` : '',
      '',
      `<b>${t(locale, 'writing.estimated_level_label')}:</b> ${result.estimatedLevel}`,
    ].filter(Boolean);

    await ctx.reply(parts.join('\n'), { parse_mode: 'HTML' });
    await awardXpAndNotify(ctx, XP_REWARDS.WRITING, 'writing_checked', 'WRITING');
  });
}
