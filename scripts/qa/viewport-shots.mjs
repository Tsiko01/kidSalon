// QA: viewport screenshots of each homepage section after scrolling it into view (real-user rendering).
// Usage: node scripts/qa/viewport-shots.mjs <outDir> <light|dark>
import { chromium } from 'playwright-core';
const [out, scheme] = process.argv.slice(2);
const BASE = process.env.BASE ?? 'http://localhost:4321';
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
await ctx.addInitScript(() => sessionStorage.setItem('ks-intro', '1'));
const page = await ctx.newPage();
await page.goto(BASE + '/', { waitUntil: 'networkidle' });
const n = await page.$$eval('main > section', (s) => s.length);
for (let i = 1; i < n; i++) {
  await page.evaluate((i) => document.querySelectorAll('main > section')[i].scrollIntoView({ block: 'start' }), i);
  await page.waitForTimeout(1300); // let scroll-reveal finish
  await page.screenshot({ path: `${out}/vp-${scheme}-${i}.png` });
}
console.log('sections', n);
await browser.close();
