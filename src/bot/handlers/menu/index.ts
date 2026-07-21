import type { Bot } from 'grammy';
import type { BotContext } from '../../types.js';
import { menuLabels } from './match-menu-text.js';
import { showMainMenu } from './show-main-menu.js';
import { showLessonMenu } from '../lessons/index.js';
import { showVocabMenu } from '../vocabulary/index.js';
import { showGrammarMenu } from '../grammar/index.js';
import { showReadingMenu } from '../reading/index.js';
import { showListeningMenu } from '../listening/index.js';
import { showWritingMenu } from '../writing/index.js';
import { showTutorMenu } from '../tutor/index.js';
import { showIeltsMenu } from '../ielts/index.js';
import { showSatMenu } from '../sat/index.js';
import { showStatsMenu } from '../stats/index.js';
import { showSettingsMenu } from '../settings/index.js';
import { showAdminMenu } from '../admin/index.js';

/**
 * Every "awaiting free text" flow (Writing check, AI tutor, IELTS writing task,
 * admin broadcast/lookup, settings reminder-time entry) tries to self-clear its
 * session state when it sees a main-menu label via isMenuLabel(). That check is
 * unreachable in practice: these bot.hears() menu matchers are registered before
 * those handlers' bot.on('message:text') catch-alls, so an exact menu-label
 * message is always fully handled here first and never reaches them. Left
 * uncleared, a stale flag silently hijacks the next unrelated free-text message
 * the learner sends (e.g. into another feature) as if it were still essay text.
 * Clearing them here, on every menu navigation, is what those checks intended.
 */
function clearAwaitingTextState(ctx: BotContext): void {
  ctx.session.writing = undefined;
  ctx.session.tutorMode = false;
  ctx.session.ieltsWriting = undefined;
  ctx.session.admin = undefined;
  ctx.session.settings = undefined;
}

function requireOnboarded(handler: (ctx: BotContext) => Promise<void>) {
  return async (ctx: BotContext): Promise<void> => {
    if (!ctx.dbUser.onboardingCompleted) return;
    clearAwaitingTextState(ctx);
    await handler(ctx);
  };
}

export function registerMenuHandlers(bot: Bot<BotContext>): void {
  bot.command('menu', requireOnboarded(showMainMenu));

  bot.hears(menuLabels('menu.lesson'), requireOnboarded(showLessonMenu));
  bot.hears(menuLabels('menu.vocabulary'), requireOnboarded(showVocabMenu));
  bot.hears(menuLabels('menu.grammar'), requireOnboarded(showGrammarMenu));
  bot.hears(menuLabels('menu.reading'), requireOnboarded(showReadingMenu));
  bot.hears(menuLabels('menu.listening'), requireOnboarded(showListeningMenu));
  bot.hears(menuLabels('menu.writing'), requireOnboarded(showWritingMenu));
  bot.hears(menuLabels('menu.tutor'), requireOnboarded(showTutorMenu));
  bot.hears(menuLabels('menu.ielts'), requireOnboarded(showIeltsMenu));
  bot.hears(menuLabels('menu.sat'), requireOnboarded(showSatMenu));
  bot.hears(menuLabels('menu.stats'), requireOnboarded(showStatsMenu));
  bot.hears(menuLabels('menu.settings'), requireOnboarded(showSettingsMenu));
  bot.hears(menuLabels('menu.admin'), requireOnboarded(showAdminMenu));
}
