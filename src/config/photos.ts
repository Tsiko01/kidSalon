/**
 * ─────────────────────────────────────────────────────────────
 *  PHOTOS
 * ─────────────────────────────────────────────────────────────
 * Page photos live in  src/assets/photos/<slot>.jpg  (any of .jpg .jpeg .png
 * .webp .avif). To replace one, drop a new file with the same name. The
 * build converts everything automatically to AVIF + WebP in several sizes.
 *
 * Portfolio photos live in  src/assets/photos/portfolio/  — add as many as you
 * like with descriptive filenames (e.g. girls-bob-haircut.jpg). Alt text /
 * captions for them are in  src/config/portfolio.ts.
 *
 * The current photos were cropped from the salon's Facebook posts by
 * scripts/crop-photos.mjs (originals in photos-source/facebook/).
 */
import type { Localized } from './site';

export interface PhotoSlot {
  alt: Localized;
  /** What the photo should show — guidance for future replacements */
  brief: string;
}

export const photoSlots = {
  hero: {
    alt: { ka: 'ბიჭი ახალი ტექსტურირებული ვარცხნილობით Kids Salon-ში', en: 'A boy with a fresh textured haircut at Kids Salon' },
    brief: 'Best portrait you have: a happy child with a fresh cut. Portrait, ideally 1200×1800 or larger.',
  },
  'hero-detail': {
    alt: { ka: 'ლურჯი სათამაშო მანქანა-სავარძელი და Kids Salon-ის ლოგო კედელზე', en: 'A blue toy race-car chair below the Kids Salon logo on the wall' },
    brief: 'Detail shot of the salon (car chair, logo, toys). Square.',
  },
  'intro-1': {
    alt: { ka: 'Kids Salon-ის ინტერიერი: მანქანა-სავარძლები და სათამაშოების თაროები', en: 'Kids Salon interior with toy car chairs and shelves of toys' },
    brief: 'Wide view of the salon interior. Portrait.',
  },
  'intro-2': {
    alt: { ka: 'სტილისტი პატარა ბიჭს თმას მაკრატლით და სავარცხლით ჭრის', en: 'A stylist cutting a little boy’s hair with comb and scissors' },
    brief: 'Stylist working with a child, close-up. Portrait.',
  },
  'about-hero': {
    alt: { ka: 'Kids Salon-ის ნათელი სალონი ფერადი მანქანა-სავარძლებით', en: 'The bright Kids Salon space with colourful car-shaped chairs' },
    brief: 'Wide interior or team photo. Landscape, min 2000px wide.',
  },
  'about-1': {
    alt: { ka: 'მომღიმარი ბიჭი მანქანა-სავარძელში ცერებს მაღლა სწევს', en: 'A smiling boy giving two thumbs up from a car-shaped chair' },
    brief: 'A happy child after the haircut. Portrait.',
  },
  'about-2': {
    alt: { ka: 'გოგონას სადღესასწაულო კონა მარგალიტის სამაგრებით', en: 'A girl’s festive bun decorated with pearl hair pins' },
    brief: 'Close-up detail of a finished style. Square.',
  },
  'about-3': {
    alt: { ka: 'გოგონა სალონის სავარძელში, უკან Kids Salon-ის ლოგო', en: 'A little girl in the salon chair with the Kids Salon logo behind her' },
    brief: 'A child in the salon with the logo visible. Portrait.',
  },
  'services-hero': {
    alt: { ka: 'სტილისტი შეჭრის შემდეგ ბიჭს თმას ფენით უვარცხნის', en: 'A stylist blow-drying a boy’s hair after the cut' },
    brief: 'A stylist at work. Portrait or square.',
  },
  'booking-side': {
    alt: { ka: 'სტილისტი გოგონას სადღესასწაულო კონას ამშვენებს', en: 'A stylist finishing a girl’s festive bun' },
    brief: 'A finished style / happy child. Portrait.',
  },
  'contact-hero': {
    alt: { ka: 'Kids Salon-ის ლოგო და ლურჯი მანქანა-სავარძელი სალონში', en: 'The Kids Salon logo and a blue race-car chair inside the salon' },
    brief: 'Salon entrance, sign or interior. Portrait.',
  },
  'guide-hero': {
    alt: { ka: 'პატარა ბიჭის თმის შეჭრა Kids Salon-ში', en: 'A toddler getting a haircut at Kids Salon' },
    brief: 'A toddler / first haircut moment. Portrait.',
  },
} satisfies Record<string, PhotoSlot>;

export type PhotoSlotName = keyof typeof photoSlots;
