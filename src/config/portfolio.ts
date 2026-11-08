/**
 * Captions / alt text for photos in src/assets/photos/portfolio/.
 * Key = filename without extension. Photos without an entry still appear,
 * with a generic alt text. Order here = order in the gallery; photos not
 * listed are appended alphabetically.
 */
import type { Localized } from './site';

export const portfolioCaptions: Record<string, Localized> = {
  'boy-textured-quiff-haircut': {
    ka: 'ტექსტურირებული ბიჭური ვარცხნილობა მოკლე გვერდებით',
    en: 'A textured boys’ cut with short, faded sides',
  },
  'festive-bun-with-pearl-pins': {
    ka: 'სადღესასწაულო კონა მარგალიტის სამაგრებით',
    en: 'A festive bun with pearl hair pins',
  },
  'salon-interior-car-chairs': {
    ka: 'სალონის ინტერიერი ფერადი მანქანა-სავარძლებით',
    en: 'The salon interior with colourful car-shaped chairs',
  },
  'happy-boy-thumbs-up-car-chair': {
    ka: 'კმაყოფილი პატარა კლიენტი მანქანა-სავარძელში',
    en: 'A very happy little client in a car-shaped chair',
  },
  'barber-cutting-boys-hair-black-white': {
    ka: 'სტილისტი ბიჭის ვარცხნილობაზე მუშაობს',
    en: 'A stylist shaping a boy’s haircut',
  },
  'stylist-cutting-toddler-hair': {
    ka: 'პატარა ბიჭის თმის შეჭრა სავარცხლით და მაკრატლით',
    en: 'A toddler’s haircut with comb and scissors',
  },
  'red-haired-boy-haircut': {
    ka: 'ხვეული, ჟღალი თმის შეჭრა',
    en: 'Shaping curly red hair',
  },
  'girl-in-salon-chair-updo': {
    ka: 'გოგონა სადღესასწაულო ვარცხნილობით',
    en: 'A little girl with a festive updo',
  },
  'race-car-chair-kids-salon-logo': {
    ka: 'ლურჯი მანქანა-სავარძელი და Kids Salon-ის ლოგო',
    en: 'A blue race-car chair and the Kids Salon logo',
  },
  'blow-dry-styling-boy': {
    ka: 'ფენით დავარცხნა შეჭრის შემდეგ',
    en: 'Blow-dry styling after the cut',
  },
  'stylist-styling-girls-bun': {
    ka: 'სტილისტი კონას ამშვენებს',
    en: 'A stylist finishing a bun',
  },
  'little-girl-curls-salon': {
    ka: 'პატარა გოგონა ხვეული თმით სალონში',
    en: 'A little girl with soft curls at the salon',
  },
};
