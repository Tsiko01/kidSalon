/**
 * ─────────────────────────────────────────────────────────────
 *  CUSTOMER REVIEWS (edit this file)
 * ─────────────────────────────────────────────────────────────
 * Add REAL reviews only — copied (with permission) from Facebook, Google
 * or messages parents sent you. Never invent names or ratings.
 *
 * While this list is empty, the website shows an invitation for parents to
 * leave a review instead of testimonial cards. The average rating and the
 * Schema.org AggregateRating are calculated from this list automatically —
 * and are only published when at least one review exists.
 *
 * Example:
 * {
 *   author: 'Nino K.',
 *   rating: 5,
 *   date: '2026-10-14',
 *   source: 'facebook',
 *   text: { ka: 'ჩემი შვილი პირველად არ ტიროდა...', en: 'For the first time my son did not cry...' },
 *   // optional: original language of the review if you have only one version
 * },
 */
import type { Localized } from './site';

export interface Review {
  author: string;
  /** 1–5 */
  rating: number;
  /** ISO date, e.g. '2026-10-14' */
  date: string;
  source: 'facebook' | 'google' | 'instagram' | 'direct';
  /** Provide both languages, or the same text in both if only one exists. */
  text: Localized;
  /** Optional link to the original review */
  link?: string;
}

export const reviews: Review[] = [];

/** Where parents can leave or read reviews. */
export const reviewLinks = {
  facebook: 'https://www.facebook.com/kidssalon.ge/reviews',
  /** EDIT: Google Business "write a review" link — hidden while null */
  google: null as string | null,
};
