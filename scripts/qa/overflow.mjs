// QA helper: list elements that stick out of the viewport horizontally.
import { chromium } from 'playwright-core';
const [width, ...paths] = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const page = await browser.newPage({ viewport: { width: +width, height: 800 }, reducedMotion: 'reduce' });
for (const p of paths) {
  await page.goto('http://localhost:4321' + p, { waitUntil: 'networkidle' });
  const out = await page.evaluate(() => {
    const W = document.documentElement.clientWidth;
    const res = [];
    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect();
      if (r.right > W + 1 && r.width > 0) {
        // skip children of overflow-hidden/clip ancestors
        let a = el.parentElement, clipped = false;
        while (a && a !== document.body) {
          const cs = getComputedStyle(a);
          if (/(hidden|clip)/.test(cs.overflowX) && a.getBoundingClientRect().right <= W + 1) { clipped = true; break; }
          a = a.parentElement;
        }
        if (!clipped) res.push(`${el.tagName.toLowerCase()}.${[...el.classList].join('.')} right=${Math.round(r.right)}`);
      }
    }
    return { sw: document.documentElement.scrollWidth, W, res: res.slice(0, 15) };
  });
  console.log(p, out.sw, out.W, '\n  ' + out.res.join('\n  '));
}
await browser.close();
