// Subsets the self-hosted variable fonts to the characters the site uses
// (modern Georgian + basic Latin/punctuation), keeping the variable axes.
// Run: node scripts/subset-fonts.mjs
import subsetFont from 'subset-font';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => String.fromCodePoint(a + i)).join('');
const latin = range(0x20, 0x7e) + range(0xa0, 0xff) + '‐–—‘’‚“”„•…′″€™−✓';
const georgian = range(0x10d0, 0x10ff) + '„“–—…«»·';

const jobs = [
  ['@fontsource-variable/fraunces/files/fraunces-latin-soft-normal.woff2', 'fraunces-latin.woff2', latin],
  ['@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2', 'dm-sans-latin.woff2', latin],
  ['@fontsource-variable/noto-serif-georgian/files/noto-serif-georgian-georgian-wght-normal.woff2', 'noto-serif-georgian.woff2', georgian],
  ['@fontsource-variable/noto-sans-georgian/files/noto-sans-georgian-georgian-wght-normal.woff2', 'noto-sans-georgian.woff2', georgian],
];
for (const [src, out, text] of jobs) {
  const input = readFileSync(`${root}node_modules/${src}`);
  const result = await subsetFont(input, text, { targetFormat: 'woff2' });
  writeFileSync(`${root}src/assets/fonts/${out}`, result);
  console.log(out, `${(input.length / 1024).toFixed(1)}KB → ${(result.length / 1024).toFixed(1)}KB`);
}
