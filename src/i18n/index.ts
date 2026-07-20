import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

export type SupportedLocale = 'en' | 'ru' | 'uk';
export const SUPPORTED_LOCALES: SupportedLocale[] = ['en', 'ru', 'uk'];
export const DEFAULT_LOCALE: SupportedLocale = 'ru';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Dict = Record<string, any>;

// Loaded via fs (rather than a native JSON import) so this works identically
// under ts-node/tsx in dev and plain Node in the compiled `dist/` build,
// without depending on Node version-specific import-attribute syntax.
const localesDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'locales');
function loadCatalog(locale: SupportedLocale): Dict {
  const raw = readFileSync(path.join(localesDir, `${locale}.json`), 'utf-8');
  return JSON.parse(raw) as Dict;
}

const catalogs: Record<SupportedLocale, Dict> = {
  en: loadCatalog('en'),
  ru: loadCatalog('ru'),
  uk: loadCatalog('uk'),
};

function lookup(dict: Dict, path: string): unknown {
  return path.split('.').reduce<unknown>((node, key) => {
    if (node && typeof node === 'object' && key in (node as Dict)) {
      return (node as Dict)[key];
    }
    return undefined;
  }, dict);
}

function interpolate(template: string, params?: Record<string, string | number>): string {
  if (!params) return template;
  return template.replace(/\{\{(\w+)\}\}/g, (match, key: string) =>
    key in params ? String(params[key]) : match,
  );
}

/**
 * Dot-path translation lookup with English fallback, e.g.
 * `t('ru', 'onboarding.welcome.title')` or `t('uk', 'lesson.streak', { days: 5 })`.
 */
export function t(locale: SupportedLocale, key: string, params?: Record<string, string | number>): string {
  const primary = lookup(catalogs[locale], key);
  if (typeof primary === 'string') return interpolate(primary, params);

  const fallback = lookup(catalogs[DEFAULT_LOCALE === locale ? 'en' : DEFAULT_LOCALE], key);
  if (typeof fallback === 'string') return interpolate(fallback, params);

  const english = lookup(catalogs.en, key);
  if (typeof english === 'string') return interpolate(english, params);

  return key; // last resort: surface the missing key so it's obvious in testing
}

/** Maps a raw Telegram `language_code` (e.g. "uk", "ru-RU", "en-US") onto a supported locale. */
export function detectLocale(telegramLanguageCode?: string): SupportedLocale {
  if (!telegramLanguageCode) return DEFAULT_LOCALE;
  const code = telegramLanguageCode.toLowerCase().slice(0, 2);
  if (code === 'uk') return 'uk';
  if (code === 'ru') return 'ru';
  if (code === 'en') return 'en';
  return DEFAULT_LOCALE;
}
