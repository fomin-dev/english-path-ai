import type { Bot } from 'grammy';
import { t, type SupportedLocale } from '../../../i18n/index.js';
import { updateUser } from '../../../db/repositories/user.repository.js';
import { savePlacementResult } from '../../../db/repositories/roadmap.repository.js';
import {
  computeResult,
  createInitialState,
  isTestComplete,
  recordAnswer,
  selectNextQuestion,
  TEST_LENGTH,
} from '../../../core/placement-test/adaptive-engine.js';
import { placementQuestionBank } from '../../../content/placement-test/questions.js';
import type { PlacementQuestion } from '../../../core/placement-test/types.js';
import type { FullCefrLevel } from '../../../core/roadmap/generator.js';
import {
  knowLevelKeyboard,
  languageKeyboard,
  pickLevelKeyboard,
  startTestKeyboard,
  testAnswerKeyboard,
} from '../../keyboards/onboarding.js';
import type { BotContext } from '../../types.js';
import { beginGoalsFlow } from './goals.js';

const PRISMA_LOCALE = { en: 'EN', ru: 'RU', uk: 'UK' } as const;

export async function sendWelcome(ctx: BotContext): Promise<void> {
  await ctx.reply(t(ctx.session.locale, 'welcome.greeting'), {
    parse_mode: 'HTML',
    reply_markup: languageKeyboard(),
  });
}

async function sendOnboardingIntro(ctx: BotContext): Promise<void> {
  const locale = ctx.session.locale;
  await ctx.reply(`${t(locale, 'onboarding.intro_title')}\n\n${t(locale, 'onboarding.intro_body')}`, {
    parse_mode: 'HTML',
  });
  await ctx.reply(t(locale, 'onboarding.ask_know_level'), {
    reply_markup: knowLevelKeyboard(locale),
  });
}

function questionPromptText(locale: SupportedLocale, current: number, q: PlacementQuestion): string {
  const progress = t(locale, 'onboarding.test_question_progress', { current, total: TEST_LENGTH });
  const passage = q.passage ? `${q.passage}\n\n` : '';
  return `<b>${progress}</b>\n\n${passage}${escapeHtml(q.prompt)}`;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

async function renderNextQuestion(ctx: BotContext): Promise<void> {
  const locale = ctx.session.locale;
  const onboarding = ctx.session.onboarding ?? {};
  const test = onboarding.test;
  if (!test) return;

  if (isTestComplete(test.state)) {
    await finishTest(ctx);
    return;
  }

  const question = selectNextQuestion(test.state, placementQuestionBank);
  if (!question) {
    await finishTest(ctx);
    return;
  }

  test.currentQuestion = question;
  ctx.session.onboarding = { ...onboarding, test };

  await ctx.reply(questionPromptText(locale, test.state.answers.length + 1, question), {
    parse_mode: 'HTML',
    reply_markup: testAnswerKeyboard(question.options),
  });
}

async function finishTest(ctx: BotContext): Promise<void> {
  const locale = ctx.session.locale;
  const onboarding = ctx.session.onboarding ?? {};
  const test = onboarding.test;
  if (!test) return;

  await ctx.reply(t(locale, 'onboarding.test_finishing'));

  const result = computeResult(test.state);

  await savePlacementResult(ctx.dbUser.id, result, test.state.answers);
  await updateUser(ctx.dbUser.id, { currentLevel: result.level });

  const strong = result.strongAreas.length
    ? result.strongAreas.map((c) => t(locale, `category.${c}`)).join(', ')
    : t(locale, 'onboarding.result_none_notable');
  const weak = result.weakAreas.length
    ? result.weakAreas.map((c) => t(locale, `category.${c}`)).join(', ')
    : t(locale, 'onboarding.result_none_notable');

  const lines = [
    t(locale, 'onboarding.result_title'),
    '',
    t(locale, 'onboarding.result_level', { level: result.level }),
    t(locale, 'onboarding.result_vocab', { count: result.vocabEstimate }),
    t(locale, 'onboarding.result_strong', { areas: strong }),
    t(locale, 'onboarding.result_weak', { areas: weak }),
    '',
    t(locale, 'onboarding.result_next'),
  ];
  await ctx.reply(lines.join('\n'), { parse_mode: 'HTML' });

  ctx.session.onboarding = { ...onboarding, resolvedLevel: result.level, test: undefined };
  await beginGoalsFlow(ctx);
}

export function registerPlacementHandlers(bot: Bot<BotContext>): void {
  bot.callbackQuery(/^lang:(en|ru|uk)$/, async (ctx) => {
    const locale = ctx.match[1] as SupportedLocale;
    ctx.session.locale = locale;
    await updateUser(ctx.dbUser.id, { interfaceLocale: PRISMA_LOCALE[locale] });
    await ctx.answerCallbackQuery();
    await ctx.editMessageReplyMarkup(undefined).catch(() => undefined);
    await ctx.reply(t(locale, 'welcome.language_set', { language: languageLabel(locale) }));
    await sendOnboardingIntro(ctx);
  });

  bot.callbackQuery('know_level:yes', async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply(t(ctx.session.locale, 'onboarding.pick_level_title'), {
      reply_markup: pickLevelKeyboard(ctx.session.locale),
    });
  });

  bot.callbackQuery('know_level:no', async (ctx) => {
    const locale = ctx.session.locale;
    await ctx.answerCallbackQuery();
    await ctx.reply(
      `${t(locale, 'onboarding.test_intro_title')}\n\n${t(locale, 'onboarding.test_intro_body', { count: TEST_LENGTH })}`,
      { parse_mode: 'HTML', reply_markup: startTestKeyboard(locale) },
    );
  });

  bot.callbackQuery(/^level:(A0|A1|A2|B1|B2|C1|C2)$/, async (ctx) => {
    const level = ctx.match[1] as FullCefrLevel;
    const locale = ctx.session.locale;
    await ctx.answerCallbackQuery();
    await updateUser(ctx.dbUser.id, { currentLevel: level });
    await ctx.reply(t(locale, 'onboarding.level_confirmed', { level }), { parse_mode: 'HTML' });

    ctx.session.onboarding = { ...(ctx.session.onboarding ?? {}), resolvedLevel: level, knownLevel: level };
    await beginGoalsFlow(ctx);
  });

  bot.callbackQuery('test:start', async (ctx) => {
    await ctx.answerCallbackQuery();
    ctx.session.onboarding = { ...(ctx.session.onboarding ?? {}), test: { state: createInitialState() } };
    await renderNextQuestion(ctx);
  });

  bot.callbackQuery(/^test_answer:(\d+)$/, async (ctx) => {
    const selectedIndex = Number(ctx.match[1]);
    await ctx.answerCallbackQuery();

    const onboarding = ctx.session.onboarding ?? {};
    const test = onboarding.test;
    if (!test?.currentQuestion) return;

    const newState = recordAnswer(test.state, test.currentQuestion, selectedIndex);
    ctx.session.onboarding = { ...onboarding, test: { state: newState, currentQuestion: undefined } };

    await renderNextQuestion(ctx);
  });
}

function languageLabel(locale: SupportedLocale): string {
  return { en: 'English', ru: 'русском', uk: 'українською' }[locale];
}
