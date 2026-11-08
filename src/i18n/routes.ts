export const locales = ['ka', 'en'] as const;
export type Lang = (typeof locales)[number];
export const defaultLang: Lang = 'ka';

export const htmlLang: Record<Lang, string> = { ka: 'ka', en: 'en' };
export const ogLocale: Record<Lang, string> = { ka: 'ka_GE', en: 'en_US' };

/** Page keys → URL slug (same slug in both languages; English lives under /en/). */
export const pages = {
  home: '',
  portfolio: 'portfolio',
  services: 'services',
  booking: 'booking',
  about: 'about',
  guide: 'parents-guide',
  reviews: 'reviews',
  faq: 'faq',
  contact: 'contact',
} as const;
export type PageKey = keyof typeof pages;

export function href(lang: Lang, page: PageKey, extra = ''): string {
  const slug = pages[page];
  const base = lang === defaultLang ? '/' : `/${lang}/`;
  return `${base}${slug ? `${slug}/` : ''}${extra}`;
}

export function otherLang(lang: Lang): Lang {
  return lang === 'ka' ? 'en' : 'ka';
}

/** Order used by the full-screen menu and the footer. */
export const navOrder: PageKey[] = ['home', 'portfolio', 'services', 'booking', 'about', 'guide', 'reviews', 'faq', 'contact'];
/** Pages shown inline in the desktop header. */
export const headerNav: PageKey[] = ['portfolio', 'services', 'about', 'contact'];
