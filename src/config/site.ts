/**
 * ─────────────────────────────────────────────────────────────
 *  KIDS SALON — BUSINESS INFORMATION (edit this file)
 * ─────────────────────────────────────────────────────────────
 * Only CONFIRMED facts belong here. Anything set to `null` is
 * hidden from the website and from structured data (Schema.org)
 * until you fill it in. Nothing in this file is invented.
 */

export type Localized = { ka: string; en: string };

export interface OpeningHours {
  /** Schema.org day names, e.g. ['Monday','Tuesday'] */
  days: ('Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday')[];
  /** Label shown on the website */
  label: Localized;
  /** 24h format "10:00" */
  opens: string;
  closes: string;
}

export const site = {
  name: 'Kids Salon',

  /** Production domain (no trailing slash). Used for canonical URLs, sitemap and Open Graph. */
  url: 'https://kidssalon.ge',

  // ── Contact (confirmed) ───────────────────────────────────
  phoneDisplay: '+995 595 970 704',
  phoneE164: '+995595970704',
  /** WhatsApp number in international format without "+" */
  whatsapp: '995595970704',

  // ── Social ────────────────────────────────────────────────
  facebook: 'https://www.facebook.com/kidssalon.ge',
  /** EDIT: e.g. 'https://www.instagram.com/your_handle/' — hidden while null */
  instagram: null as string | null,

  // ── Location ──────────────────────────────────────────────
  city: { ka: 'თბილისი', en: 'Tbilisi' } as Localized,
  country: { ka: 'საქართველო', en: 'Georgia' } as Localized,
  /**
   * Street address — taken from the salon's own Facebook post ("ცინცაძის ქ.46").
   * Set to null to hide it (the site then shows "Tbilisi, Georgia").
   */
  streetAddress: { ka: 'ცინცაძის ქ. 46', en: '46 Tsintsadze St.' } as Localized | null,
  /** Text Google Maps searches for. */
  mapQuery: 'Tsintsadze Street 46, Tbilisi, Georgia',
  /** EDIT (optional): latitude/longitude for structured data. */
  geo: null as { lat: number; lng: number } | null,

  // ── Opening hours ─────────────────────────────────────────
  /**
   * EDIT: opening hours. While null, the site says hours are confirmed via WhatsApp.
   * Example:
   * [
   *   { days: ['Monday','Tuesday','Wednesday','Thursday','Friday'], label: { ka: 'ორშაბათი – პარასკევი', en: 'Monday – Friday' }, opens: '10:00', closes: '19:00' },
   *   { days: ['Saturday','Sunday'], label: { ka: 'შაბათი – კვირა', en: 'Saturday – Sunday' }, opens: '11:00', closes: '18:00' },
   * ]
   */
  hours: null as OpeningHours[] | null,

  // ── Payments ──────────────────────────────────────────────
  /** EDIT: e.g. { ka: 'ნაღდი ფული და საბანკო ბარათი', en: 'Cash and bank card' } */
  paymentMethods: null as Localized | null,

  // ── Prices ────────────────────────────────────────────────
  /**
   * true  → prices in services.ts are shown as indicative ("from …")
   *         with a note that the salon confirms the final price.
   * false → set this once the prices in services.ts are confirmed.
   */
  pricesIndicative: true,
  currency: 'GEL',
} as const;

export const whatsappUrl = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const telUrl = `tel:${site.phoneE164}`;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`;
