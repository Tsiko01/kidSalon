import type { Lang } from '../i18n/routes';
import { useT } from '../i18n';
import { site, type OpeningHours } from '../config/site';

/** "25 ₾-დან" (ka) / "from 25 ₾" (en); exact price when confirmed. */
export function formatPrice(price: number | null, lang: Lang, indicative: boolean) {
  const t = useT(lang).common;
  if (price === null) return t.priceOnRequest;
  const value = `${price} ${t.currency}`;
  return indicative ? `${t.from}${value}${t.fromSuffix}` : value;
}

export const formatHours = (hours: OpeningHours[], lang: Lang) =>
  hours.map((h) => `${h.label[lang]} ${h.opens}–${h.closes}`).join('; ');

export const fullAddress = (lang: Lang) =>
  site.streetAddress ? `${site.streetAddress[lang]}, ${site.city[lang]}` : null;
