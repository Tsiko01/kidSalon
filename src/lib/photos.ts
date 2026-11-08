import type { ImageMetadata } from 'astro';
import { portfolioCaptions } from '../config/portfolio';

const files = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/photos/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}',
  { eager: true },
);

/** "hero" → image, "portfolio/girls-bob" → image */
const byName = new Map<string, ImageMetadata>();
for (const [path, mod] of Object.entries(files)) {
  const rel = path.replace(/^.*\/assets\/photos\//, '').replace(/\.[^.]+$/, '');
  byName.set(rel, mod.default);
}

export const getPhoto = (name: string) => byName.get(name);

export interface PortfolioItem {
  id: string;
  image: ImageMetadata;
}

/** Portfolio photos: captioned ones in caption order, then the rest alphabetically. */
export function getPortfolio(): PortfolioItem[] {
  const ids = [...byName.keys()]
    .filter((k) => k.startsWith('portfolio/'))
    .map((k) => k.slice('portfolio/'.length));
  const order = Object.keys(portfolioCaptions);
  ids.sort((a, b) => {
    const ia = order.indexOf(a);
    const ib = order.indexOf(b);
    if (ia !== -1 || ib !== -1) return (ia === -1 ? 1e9 : ia) - (ib === -1 ? 1e9 : ib);
    return a.localeCompare(b);
  });
  return ids.map((id) => ({ id, image: byName.get(`portfolio/${id}`)! }));
}

/** Responsive widths capped at the source width. */
export function widthsFor(img: ImageMetadata, max = 1600): number[] {
  const steps = [360, 480, 640, 800, 1080, 1320, 1600];
  const cap = Math.min(img.width, max);
  const ws = steps.filter((w) => w < cap);
  ws.push(cap);
  return ws;
}
