import type { Bot } from 'grammy';
import type { BotContext } from '../../types.js';
import { registerGoalsHandlers } from './goals.js';
import { registerPlacementHandlers } from './placement.js';
import { sendWelcome } from './placement.js';
import { showMainMenu } from '../menu/show-main-menu.js';

export function registerOnboardingHandlers(bot: Bot<BotContext>): void {
  bot.command('start', async (ctx) => {
    if (ctx.dbUser.onboardingCompleted) {
      await showMainMenu(ctx);
      return;
    }
    ctx.session.onboarding = {};
    await sendWelcome(ctx);
  });

  registerPlacementHandlers(bot);
  registerGoalsHandlers(bot);
}
