import { ka } from './ka';
import { en } from './en';
import type { Lang } from './routes';
import type { Localized } from '../config/site';

/** Same shape as the Georgian dictionary, with literal strings widened to `string`. */
type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? Widen<U>[]
    : { [K in keyof T]: Widen<T[K]> };

export type Dict = Widen<typeof ka>;

const dictionaries: Record<Lang, Dict> = { ka, en };

export const useT = (lang: Lang): Dict => dictionaries[lang];

/** Replace {placeholders} in a string. */
export const fmt = (str: string, vars: Record<string, string | number>) =>
  str.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));

/** Pick the right language from a { ka, en } object. */
export const loc = (value: Localized, lang: Lang) => value[lang];

export * from './routes';
