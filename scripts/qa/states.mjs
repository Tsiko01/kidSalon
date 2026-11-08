// QA: screenshots of interactive states (loader frames, menu, lightbox, booking success/errors).
// Usage: node scripts/qa/states.mjs <outDir>
import { chromium } from 'playwright-core';

const out = process.argv[2];
const BASE = 'http://localhost:4321';
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });

// loader frames (desktop)
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto(BASE + '/', { waitUntil: 'commit' });
  for (const t of [350, 900, 1500]) {
    await page.waitForTimeout(t === 350 ? 350 : t - (t === 900 ? 350 : 900));
    await page.screenshot({ path: `${out}/loader-${t}.png` });
  }
  await page.close();
}
// mobile menu
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  await ctx.addInitScript(() => sessionStorage.setItem('ks-intro', '1'));
  const page = await ctx.newPage();
  await page.goto(BASE + '/');
  await page.click('[data-menu-open]');
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${out}/menu-mobile.png` });
  await ctx.close();
}
// lightbox + booking states
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce' });
  await ctx.addInitScript(() => {
    sessionStorage.setItem('ks-intro', '1');
    window.open = () => null;
  });
  const page = await ctx.newPage();
  await page.goto(BASE + '/en/portfolio/');
  await page.click('a[data-lightbox] >> nth=2');
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${out}/lightbox.png` });
  await page.goto(BASE + '/booking/');
  await page.click('.bk-form__btn');
  await page.waitForTimeout(200);
  await page.locator('.bk-form').screenshot({ path: `${out}/booking-errors.png` });
  await page.fill('#bk-parent', 'ნინო');
  await page.fill('#bk-phone', '595123456');
  await page.fill('#bk-child', 'ლუკა');
  await page.selectOption('#bk-service', 'kids-haircut');
  await page.fill('#bk-date', new Date(Date.now() + 2 * 864e5).toISOString().slice(0, 10));
  await page.fill('#bk-time', '11:00');
  await page.click('.bk-form__btn');
  await page.waitForTimeout(300);
  await page.locator('[data-booking-success]').screenshot({ path: `${out}/booking-success.png` });
  await ctx.close();
}
await browser.close();
console.log('done');
