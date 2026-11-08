// QA: mobile header + menu at several phone sizes, both themes; checks fit, font size and controls.
// Usage: node scripts/qa/menu.mjs <outDir>
import { chromium } from 'playwright-core';
const out = process.argv[2];
const BASE = process.env.BASE ?? 'http://localhost:4321';
const sizes = [[360, 640], [375, 667], [390, 844], [414, 896]];
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const rows = [];
for (const theme of ['light', 'dark']) {
  for (const [w, h] of sizes) {
    for (const path of ['/', '/en/']) {
      const ctx = await browser.newContext({ viewport: { width: w, height: h }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
      await ctx.addInitScript((t) => {
        sessionStorage.setItem('ks-intro', '1');
        localStorage.setItem('ks-theme', t);
      }, theme);
      const page = await ctx.newPage();
      await page.goto(BASE + path);
      const header = await page.evaluate(() => {
        const vis = (sel) => {
          const el = document.querySelector(sel);
          if (!el) return false;
          const r = el.getBoundingClientRect();
          return r.width > 0 && r.height > 0 && r.right <= innerWidth + 0.5 && getComputedStyle(el).display !== 'none';
        };
        return { globe: vis('.site-header .lang-globe'), theme: vis('.site-header [data-theme-toggle]'), menu: vis('.site-header [data-menu-open]') };
      });
      if (path === '/') await page.screenshot({ path: `${out}/hdr-${theme}-${w}x${h}.png`, clip: { x: 0, y: 0, width: w, height: 90 } });
      await page.click('[data-menu-open]');
      await page.waitForTimeout(400);
      const m = await page.evaluate(() => {
        const d = document.querySelector('[data-menu]');
        const vis = (sel) => {
          const el = d.querySelector(sel);
          if (!el) return false;
          const r = el.getBoundingClientRect();
          return r.width > 0 && r.top >= 0 && r.bottom <= innerHeight && r.right <= innerWidth + 0.5 && getComputedStyle(el).display !== 'none';
        };
        const label = d.querySelector('.menu__label');
        const book = d.querySelector('.menu__book').getBoundingClientRect();
        return {
          scroll: d.scrollHeight - d.clientHeight,
          font: parseFloat(getComputedStyle(label).fontSize),
          logo: vis('.menu__top .brand'),
          globe: vis('.menu__top .lang-globe'),
          theme: vis('.menu__top [data-theme-toggle]'),
          close: vis('[data-menu-close]'),
          bookFull: Math.round(book.width) >= innerWidth - 2 * 18,
          bookVisible: book.bottom <= innerHeight,
        };
      });
      const okAll = header.globe && header.theme && header.menu && m.scroll <= 0 && m.font >= 16 && m.font <= 18 && m.logo && m.globe && m.theme && m.close && m.bookFull && m.bookVisible;
      rows.push(`${okAll ? 'PASS' : 'FAIL'} ${theme.padEnd(5)} ${w}x${h} ${path.padEnd(4)} header[globe ${header.globe} theme ${header.theme} menu ${header.menu}] menu[font ${m.font}px scroll ${m.scroll} logo ${m.logo} globe ${m.globe} theme ${m.theme} close ${m.close} book full-width ${m.bookFull} visible ${m.bookVisible}]`);
      if (path === '/') await page.screenshot({ path: `${out}/menu-${theme}-${w}x${h}.png` });
      await ctx.close();
    }
  }
}
await browser.close();
console.log(rows.join('\n'));
