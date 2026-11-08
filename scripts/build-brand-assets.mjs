// Generates favicon, app icons, web manifest and the Open Graph image into public/.
// Run: node scripts/build-brand-assets.mjs  (after build-wordmark.mjs / crop-photos.mjs)
import sharp from 'sharp';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const pub = `${root}public/`;
mkdirSync(pub, { recursive: true });

const INK = '#172042';
const SKY = '#4aaef2';
const SUN = '#ffc83d';
const CREAM = '#fff8ec';

const src = readFileSync(`${root}src/components/brand/paths.ts`, 'utf8');
const vb = src.match(/viewBox: '([^']+)'/)[1].split(' ').map(Number);
const glyphs = JSON.parse(src.match(/glyphs: (\[.*\]) as/)[1]);
const tf = (g, off = 0) => `translate(${g.dx + off} ${g.dy + off}) rotate(${g.rot} ${g.cx - g.dx} ${g.cy})`;
const logoGroup = (list = glyphs) =>
  list.map((g) => `<g transform="${tf(g, 6)}"><path d="${g.d}" fill="${INK}" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/></g>`).join('') +
  list.map((g) => `<g transform="${tf(g)}"><path d="${g.d}" fill="#fff" stroke="${INK}" stroke-width="10" stroke-linejoin="round" paint-order="stroke"/></g>`).join('');

// ── favicon / icons: the "K" glyph on a sky tile ──
const k = glyphs[0];
const kTile = (size, pad = 0.18, radius = 0.22) => {
  // K glyph bbox ≈ 0..80 wide, 10..80 tall in font units → centre it
  const scale = (size * (1 - pad * 2)) / 82;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" rx="${size * radius}" fill="${SKY}"/>
  <g transform="translate(${size * pad + scale * 2} ${size * pad - scale * 6}) scale(${scale})">
    <g transform="rotate(-6 ${k.cx} ${k.cy})">
      <path d="${k.d}" transform="translate(5 5)" fill="${INK}" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/>
      <path d="${k.d}" fill="#fff" stroke="${INK}" stroke-width="10" stroke-linejoin="round" paint-order="stroke"/>
    </g>
  </g>
</svg>`;
};
writeFileSync(`${pub}favicon.svg`, kTile(64));
await sharp(Buffer.from(kTile(512))).resize(32, 32).png().toFile(`${pub}favicon-32.png`);
await sharp(Buffer.from(kTile(512, 0.18, 0))).resize(180, 180).png().toFile(`${pub}apple-touch-icon.png`);
await sharp(Buffer.from(kTile(512))).resize(192, 192).png().toFile(`${pub}icon-192.png`);
await sharp(Buffer.from(kTile(512))).png().toFile(`${pub}icon-512.png`);
await sharp(Buffer.from(kTile(512, 0.26, 0))).png().toFile(`${pub}icon-maskable-512.png`);

writeFileSync(
  `${pub}site.webmanifest`,
  JSON.stringify(
    {
      name: 'Kids Salon — ბავშვთა სალონი',
      short_name: 'Kids Salon',
      start_url: '/',
      display: 'standalone',
      background_color: CREAM,
      theme_color: SKY,
      lang: 'ka',
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
    },
    null,
    2,
  ),
);

// ── Open Graph image 1200×630: sky panel, sticker logo, two real photos ──
const W = 1200;
const H = 630;
const photo = async (name, w, h) =>
  sharp(`${root}src/assets/photos/${name}`).resize(w, h, { fit: 'cover', position: 'attention' }).toBuffer();
const rounded = async (buf, w, h, r, border = 10) => {
  const mask = Buffer.from(`<svg width="${w}" height="${h}"><rect width="${w}" height="${h}" rx="${r}" fill="#fff"/></svg>`);
  const img = await sharp(buf).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();
  const frame = Buffer.from(
    `<svg width="${w + border * 2}" height="${h + border * 2}"><rect width="${w + border * 2}" height="${h + border * 2}" rx="${r + border}" fill="${CREAM}"/></svg>`,
  );
  return sharp(frame).composite([{ input: img, left: border, top: border }]).png().toBuffer();
};
const archMask = (w, h) =>
  Buffer.from(`<svg width="${w}" height="${h}"><path d="M0 ${w / 2} A${w / 2} ${w / 2} 0 0 1 ${w} ${w / 2} V${h - 24} Q${w} ${h} ${w - 24} ${h} H24 Q0 ${h} 0 ${h - 24} Z" fill="#fff"/></svg>`);

const heroW = 360;
const heroH = 520;
const hero = await sharp(await photo('hero.jpg', heroW, heroH)).composite([{ input: archMask(heroW, heroH), blend: 'dest-in' }]).png().toBuffer();
const detail = await rounded(await photo('about-2.jpg', 220, 220), 220, 220, 28);

const logoW = 470;
const logoH = (logoW / vb[2]) * vb[3];
const bg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${SKY}"/>
  <circle cx="1040" cy="40" r="300" fill="#ffffff" opacity="0.18"/>
  <path d="M${720} ${H} V${300} A${200} ${200} 0 0 1 ${1120} ${300} V${H} Z" fill="${SUN}" transform="rotate(4 920 400)"/>
  <svg x="70" y="150" width="${logoW}" height="${logoH}" viewBox="${vb.join(' ')}">${logoGroup()}</svg>
  <rect x="78" y="${150 + logoH + 40}" width="500" height="56" rx="28" fill="${INK}"/>
  <text x="328" y="${150 + logoH + 76}" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="21" font-weight="700" fill="${CREAM}" letter-spacing="1.5">CHILDREN’S HAIR SALON · TBILISI</text>
</svg>`;

await sharp(Buffer.from(bg))
  .composite([
    { input: hero, left: 760, top: 70 },
    { input: detail, left: 640, top: 380 },
  ])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(`${pub}og-image.jpg`);

console.log('brand assets written to public/');
