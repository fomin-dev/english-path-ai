import { t } from '../../../i18n/index.js';
import { mainMenuKeyboard } from '../../keyboards/menu.js';
import type { BotContext } from '../../types.js';

export async function showMainMenu(ctx: BotContext): Promise<void> {
  const locale = ctx.session.locale;
  const name = ctx.dbUser.firstName ?? ctx.from?.first_name ?? '';
  await ctx.reply(`${t(locale, 'menu.title')}${name ? `, ${name}` : ''}!`, {
    parse_mode: 'HTML',
    reply_markup: mainMenuKeyboard(locale, ctx.dbUser.isAdmin),
  });
}
