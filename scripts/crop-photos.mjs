// Extracts clean photographs from the salon's Facebook posts (collages with
// frames, logos and stickers) into src/assets/photos/.
// Source files live in photos-source/facebook/. Run: node scripts/crop-photos.mjs
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const src = (n) => `${root}photos-source/facebook/${n}`;
const out = (n) => `${root}src/assets/photos/${n}`;
mkdirSync(out('portfolio'), { recursive: true });

const COLLAGE = '648880993_1337350798421412_259502102276943667_n.jpg';
const CAR = '740836264_1442342274588930_4622343491098436889_n.jpg';
const INTERIOR = '754677908_1455499519939872_8665760631627212077_n.jpg';
const STYLIST = '778957682_1477679791055178_2645928285596130273_n.jpg';
const BUN_COLLAGE = '808478824_18092165987327066_6501447391465868626_n.jpg';
const PRINCESS = '811236192_18092165978327066_7517350991231898417_n.jpg';
const KIDDO = '811472371_18092165975327066_7241574325459340636_n.jpg';

// [source, crop {left, top, width, height}, output file]
const jobs = [
  // collage (2000×1600)
  [COLLAGE, { left: 722, top: 70, width: 520, height: 1030 }, 'portfolio/boy-textured-quiff-haircut.jpg'],
  [COLLAGE, { left: 66, top: 70, width: 568, height: 568 }, 'portfolio/barber-cutting-boys-hair-black-white.jpg'],
  [COLLAGE, { left: 72, top: 838, width: 556, height: 566 }, 'portfolio/red-haired-boy-haircut.jpg'],
  [COLLAGE, { left: 1352, top: 846, width: 552, height: 560 }, 'portfolio/blow-dry-styling-boy.jpg'],
  [COLLAGE, { left: 702, top: 1196, width: 574, height: 404 }, 'portfolio/little-girl-curls-salon.jpg'],
  // blue race-car chair with logo (940×788)
  [CAR, { left: 0, top: 0, width: 940, height: 788 }, 'portfolio/race-car-chair-kids-salon-logo.jpg'],
  // interior (1200×800) — avoid logo overlay (top-left) and blue frame
  [INTERIOR, { left: 22, top: 250, width: 1156, height: 528 }, 'portfolio/salon-interior-car-chairs.jpg'],
  // stylist + toddler (1200×800) — avoid address banner (top-right)
  [STYLIST, { left: 0, top: 0, width: 745, height: 800 }, 'portfolio/stylist-cutting-toddler-hair.jpg'],
  // bun collage (1080×1440)
  [BUN_COLLAGE, { left: 170, top: 215, width: 362, height: 552 }, 'portfolio/girl-in-salon-chair-updo.jpg'],
  [BUN_COLLAGE, { left: 540, top: 780, width: 404, height: 397 }, 'portfolio/stylist-styling-girls-bun.jpg'],
  // little princess (1080×1440)
  [PRINCESS, { left: 134, top: 326, width: 812, height: 976 }, 'portfolio/festive-bun-with-pearl-pins.jpg'],
  // happy kiddo (1080×1440) — stop above the sticker
  [KIDDO, { left: 130, top: 212, width: 822, height: 908 }, 'portfolio/happy-boy-thumbs-up-car-chair.jpg'],
];

// Page slots reuse the best portfolio images with slot-specific framing.
const slots = [
  [COLLAGE, { left: 722, top: 70, width: 520, height: 1030 }, 'hero.jpg'],
  [CAR, { left: 120, top: 0, width: 788, height: 788 }, 'hero-detail.jpg'],
  [INTERIOR, { left: 540, top: 30, width: 638, height: 748 }, 'intro-1.jpg'],
  [STYLIST, { left: 40, top: 0, width: 640, height: 800 }, 'intro-2.jpg'],
  [INTERIOR, { left: 22, top: 250, width: 1156, height: 528 }, 'about-hero.jpg'],
  [KIDDO, { left: 130, top: 212, width: 822, height: 908 }, 'about-1.jpg'],
  [PRINCESS, { left: 134, top: 330, width: 812, height: 812 }, 'about-2.jpg'],
  [BUN_COLLAGE, { left: 170, top: 215, width: 362, height: 552 }, 'about-3.jpg'],
  [COLLAGE, { left: 1352, top: 846, width: 552, height: 560 }, 'services-hero.jpg'],
  [PRINCESS, { left: 134, top: 326, width: 812, height: 976 }, 'booking-side.jpg'],
  [CAR, { left: 110, top: 0, width: 630, height: 788 }, 'contact-hero.jpg'],
  [STYLIST, { left: 0, top: 0, width: 745, height: 800 }, 'guide-hero.jpg'],
];

for (const [file, crop, name] of [...jobs, ...slots]) {
  await sharp(src(file)).extract(crop).jpeg({ quality: 92, mozjpeg: true }).toFile(out(name));
  console.log('✓', name, `${crop.width}×${crop.height}`);
}
