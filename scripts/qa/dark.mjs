// QA: full-page screenshots in dark mode. Usage: node scripts/qa/dark.mjs <outDir> <width> <paths...>
import { chromium } from 'playwright-core';
const [out, width, ...paths] = process.argv.slice(2);
const BASE = process.env.BASE ?? 'http://localhost:4321';
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const ctx = await browser.newContext({ viewport: { width: +width, height: 900 }, reducedMotion: 'reduce', colorScheme: 'dark' });
await ctx.addInitScript(() => sessionStorage.setItem('ks-intro', '1'));
for (const p of paths) {
  const page = await ctx.newPage();
  const errs = [];
  page.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await page.goto(BASE + p, { waitUntil: 'networkidle' });
  const theme = await page.evaluate(() => document.documentElement.dataset.theme);
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 50)); }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${out}/dark-${width}${p.replace(/\//g, '_')}.png`, fullPage: true });
  console.log(p, 'theme:', theme, errs.length ? errs : '');
  await page.close();
}
await browser.close();
