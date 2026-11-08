// QA helper: full-page screenshots + console error capture using the local Chrome.
// Usage: node scripts/qa/shoot.mjs <outDir> <width> <path...>
import { chromium } from 'playwright-core';

const [outDir, width, ...paths] = process.argv.slice(2);
const BASE = process.env.BASE ?? 'http://localhost:4321';
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const ctx = await browser.newContext({
  viewport: { width: +width, height: +width < 700 ? 844 : 900 },
  deviceScaleFactor: 1,
  reducedMotion: 'reduce',
});
await ctx.addInitScript(() => sessionStorage.setItem('ks-intro', '1'));
let errors = 0;
for (const p of paths) {
  const page = await ctx.newPage();
  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning') {
      errors++;
      console.log(`[${m.type()}] ${p}: ${m.text()}`);
    }
  });
  page.on('pageerror', (e) => {
    errors++;
    console.log(`[pageerror] ${p}: ${e.message}`);
  });
  page.on('requestfailed', (r) => console.log(`[requestfailed] ${p}: ${r.url()}`));
  const res = await page.goto(BASE + p, { waitUntil: 'networkidle' });
  if (!res.ok()) console.log(`[http ${res.status()}] ${p}`);
  // trigger lazy images
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(400);
  const name = `${outDir}/${width}${p.replace(/\//g, '_') || '_'}.png`;
  await page.screenshot({ path: name, fullPage: true });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  if (overflow > 0) console.log(`[overflow] ${p}: ${overflow}px horizontal scroll`);
  console.log('shot', name);
  await page.close();
}
await browser.close();
console.log('console errors/warnings:', errors);
