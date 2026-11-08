// Functional QA: language switch, menu, booking → WhatsApp, lightbox, FAQ, map, loader, links.
// Usage: node scripts/qa/functional.mjs   (preview server on :4321)
import { chromium } from 'playwright-core';

const BASE = process.env.BASE ?? 'http://localhost:4321';
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const results = [];
const ok = (name, cond, extra = '') => {
  results.push(`${cond ? 'PASS' : 'FAIL'}  ${name}${extra ? ` — ${extra}` : ''}`);
};
const errors = [];
const newPage = async (opts = {}) => {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 860 }, ...opts });
  // stub WhatsApp so tests never contact the real service
  await ctx.route(/^https:\/\/(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)\//, (r) =>
    r.fulfill({ status: 200, contentType: 'text/html', body: '<title>WhatsApp stub</title>' }),
  );
  const page = await ctx.newPage();
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  return page;
};

// ── 1. loader plays once per session ──
{
  const page = await newPage();
  await page.goto(BASE + '/');
  ok('loader shown on first visit', await page.evaluate(() => document.documentElement.classList.contains('has-loader')));
  await page.waitForTimeout(2300);
  ok('loader removed after intro', !(await page.evaluate(() => document.documentElement.classList.contains('has-loader'))));
  await page.goto(BASE + '/services/');
  ok('loader skipped on next page', !(await page.evaluate(() => document.documentElement.classList.contains('has-loader'))));
  await page.context().close();
}
{
  const page = await newPage({ reducedMotion: 'reduce' });
  await page.goto(BASE + '/');
  ok('loader skipped with reduced motion', !(await page.evaluate(() => document.documentElement.classList.contains('has-loader'))));
  await page.context().close();
}

// ── 2. language switch keeps the page and swaps without a full reload ──
{
  const page = await newPage({ reducedMotion: 'reduce' });
  await page.goto(BASE + '/services/');
  await page.evaluate(() => ((window).__marker = 42));
  await page.click('.site-header [data-lang-link][hreflang="en"]');
  await page.waitForURL('**/en/services/');
  await page.waitForTimeout(400);
  const lang = await page.evaluate(() => document.documentElement.lang);
  const marker = await page.evaluate(() => (window).__marker);
  ok('GEO→ENG goes to /en/services/', page.url().endsWith('/en/services/'));
  ok('html lang = en after switch', lang === 'en', lang);
  ok('switch is a soft navigation (no reload)', marker === 42);
  ok('English title', (await page.title()).startsWith('Services & Prices'), await page.title());
  await page.click('.site-header [data-lang-link][hreflang="ka"]');
  await page.waitForURL((u) => new URL(u).pathname === '/services/');
  ok('ENG→GEO back to /services/', new URL(page.url()).pathname === '/services/');
  // navigation keeps language
  await page.goto(BASE + '/en/');
  await page.click('.site-nav a[href="/en/contact/"]');
  await page.waitForURL('**/en/contact/');
  ok('nav in English stays in /en/', page.url().endsWith('/en/contact/'));
  await page.context().close();
}

// ── 3. full-screen menu ──
{
  const page = await newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  await page.goto(BASE + '/');
  await page.click('[data-menu-open]');
  ok('menu opens', await page.evaluate(() => document.querySelector('[data-menu]').open));
  ok('menu toggle aria-expanded=true', (await page.getAttribute('[data-menu-open]', 'aria-expanded')) === 'true');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);
  ok('Escape closes menu', !(await page.evaluate(() => document.querySelector('[data-menu]').open)));
  await page.click('[data-menu-open]');
  await page.click('.menu__list a[href="/faq/"]');
  await page.waitForURL('**/faq/');
  ok('menu link navigates', page.url().endsWith('/faq/'));
  await page.context().close();
}

// ── 4. booking form: validation + WhatsApp message ──
for (const lng of ['ka', 'en']) {
  const page = await newPage({ reducedMotion: 'reduce' });
  await page.addInitScript(() => {
    window.__opened = [];
    window.open = (url) => {
      window.__opened.push(url);
      return { opener: window }; // pretend the new tab opened
    };
  });
  const path = lng === 'ka' ? '/booking/?service=festive-hairstyle' : '/en/booking/?service=boys-style';
  await page.goto(BASE + path);
  ok(`[${lng}] ?service= preselects`, (await page.inputValue('#bk-service')) === (lng === 'ka' ? 'festive-hairstyle' : 'boys-style'));
  await page.click('.bk-form__btn');
  const invalid = await page.$$eval('[aria-invalid="true"]', (els) => els.map((e) => e.id));
  ok(`[${lng}] empty submit flags required fields`, invalid.length === 5, invalid.join(','));
  ok(`[${lng}] error summary shown`, await page.isVisible('[data-form-summary]'));
  const focused = await page.evaluate(() => document.activeElement?.id);
  ok(`[${lng}] focus moves to first invalid field`, focused === 'bk-parent', focused);
  ok(`[${lng}] nothing opened while invalid`, (await page.evaluate(() => window.__opened.length)) === 0);
  const errText = await page.textContent('#bk-parent-error');
  ok(`[${lng}] error message translated`, lng === 'ka' ? /[\u10D0-\u10FF]/.test(errText) : /Please/.test(errText), errText);

  await page.fill('#bk-parent', 'Nino');
  await page.fill('#bk-phone', '12');
  await page.fill('#bk-child', 'Luka');
  await page.fill('#bk-age', '4');
  await page.fill('#bk-date', '2020-01-01');
  await page.fill('#bk-time', '15:30');
  await page.fill('#bk-message', 'First haircut 🙂');
  await page.click('.bk-form__btn');
  const bad = await page.$$eval('[aria-invalid="true"]', (els) => els.map((e) => e.id));
  ok(`[${lng}] bad phone + past date rejected`, bad.includes('bk-phone') && bad.includes('bk-date'), bad.join(','));

  await page.fill('#bk-phone', '+995 595 12 34 56');
  const future = new Date(Date.now() + 3 * 864e5).toISOString().slice(0, 10);
  await page.fill('#bk-date', future);
  await page.click('.bk-form__btn');
  const opened = await page.evaluate(() => window.__opened);
  ok(`[${lng}] WhatsApp opened once`, opened.length === 1);
  const url = new URL(opened[0]);
  const text = url.searchParams.get('text') ?? '';
  ok(`[${lng}] wa.me/995595970704`, url.origin + url.pathname === 'https://wa.me/995595970704', url.origin + url.pathname);
  const expected =
    lng === 'ka'
      ? ['გამარჯობა! მინდა ვიზიტის დაჯავშნა.', '', 'მშობლის სახელი: Nino', 'ბავშვის სახელი: Luka', 'ბავშვის ასაკი: 4', 'ტელეფონი: +995 595 12 34 56', 'სერვისი: სადღესასწაულო ვარცხნილობა', 'სასურველი თარიღი: *', 'სასურველი დრო: 15:30', 'დამატებითი ინფორმაცია: First haircut 🙂']
      : ['Hello! I would like to book a visit.', '', "Parent's name: Nino", "Child's name: Luka", "Child's age: 4", 'Phone: +995 595 12 34 56', "Service: Boys' Style Cut", 'Preferred date: *', 'Preferred time: 15:30', 'Additional information: First haircut 🙂'];
  const got = text.split('\n');
  const day = String(+future.slice(8, 10));
  const lineOk = (g, e) => (e.endsWith('*') ? g.startsWith(e.slice(0, -1)) && g.includes(day) && g.includes(future.slice(0, 4)) : g === e);
  ok(`[${lng}] message matches template line by line`, got.length === expected.length && expected.every((e, i) => lineOk(got[i], e)), got.join(' | '));
  ok(`[${lng}] date written out in ${lng === 'ka' ? 'Georgian' : 'English'}`, lng === 'ka' ? /[\u10D0-\u10FF]/.test(got[7].split(': ')[1]) : /[A-Za-z]/.test(got[7].split(': ')[1]), got[7]);
  ok(`[${lng}] success panel shown, form hidden`, (await page.isVisible('[data-booking-success]')) && !(await page.isVisible('form[data-booking]')));
  ok(`[${lng}] fallback link carries message`, (await page.getAttribute('[data-wa-link]', 'href')) === opened[0]);
  if (lng === 'en') console.log('\nWhatsApp message (en):\n' + text + '\n');
  if (lng === 'ka') console.log('\nWhatsApp message (ka):\n' + text + '\n');
  await page.click('[data-booking-again]');
  ok(`[${lng}] "new request" resets form`, (await page.isVisible('form[data-booking]')) && (await page.inputValue('#bk-parent')) === '');

  // optional fields left empty → their lines are omitted
  await page.fill('#bk-parent', 'Nino');
  await page.fill('#bk-phone', '595123456');
  await page.fill('#bk-child', 'Luka');
  await page.selectOption('#bk-service', 'kids-haircut');
  await page.fill('#bk-date', future);
  await page.fill('#bk-time', '10:00');
  await page.click('.bk-form__btn');
  const second = new URL((await page.evaluate(() => window.__opened)).at(-1)).searchParams.get('text');
  ok(`[${lng}] empty optional fields are left out`, second.split('\n').length === 8, second.split('\n').length + ' lines');
  await page.context().close();
}

const MOBILE = {
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
  userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Mobile Safari/537.36',
};

// ── 4b. popup blocked → WhatsApp opens in the same tab ──
for (const [label, ctxOpts] of [['desktop', {}], ['mobile', MOBILE]]) {
  const page = await newPage({ reducedMotion: 'reduce', ...ctxOpts });
  await page.addInitScript(() => (window.open = () => null));
  await page.goto(BASE + '/booking/');
  await page.fill('#bk-parent', 'Nino');
  await page.fill('#bk-phone', '595123456');
  await page.fill('#bk-child', 'Luka');
  await page.selectOption('#bk-service', 'first-haircut');
  await page.fill('#bk-date', new Date(Date.now() + 2 * 864e5).toISOString().slice(0, 10));
  await page.fill('#bk-time', '12:00');
  await Promise.all([page.waitForURL(/wa\.me/), page.click('.bk-form__btn')]);
  const u = new URL(page.url());
  ok(`[${label}] popup blocked → same-tab WhatsApp`, u.origin + u.pathname === 'https://wa.me/995595970704' && (u.searchParams.get('text') ?? '').includes('Nino'));
  await page.context().close();
}

// ── 4c. floating WhatsApp button on every page (desktop + mobile) ──
{
  const all = ['/', '/portfolio/', '/services/', '/booking/', '/about/', '/parents-guide/', '/reviews/', '/faq/', '/contact/', '/en/', '/en/portfolio/', '/en/services/', '/en/booking/', '/en/about/', '/en/parents-guide/', '/en/reviews/', '/en/faq/', '/en/contact/', '/does-not-exist/'];
  for (const [name, opts] of [['desktop', { viewport: { width: 1440, height: 900 } }], ['mobile', MOBILE]]) {
    const page = await newPage({ reducedMotion: 'reduce', ...opts });
    await page.addInitScript(() => sessionStorage.setItem('ks-intro', '1'));
    const problems = [];
    let opened = 0;
    for (const p of all) {
      await page.goto(BASE + p);
      const fab = page.locator('[data-wa-fab]');
      if ((await fab.count()) !== 1) {
        problems.push(`${p}: missing`);
        continue;
      }
      const href = await fab.getAttribute('href');
      const rel = await fab.getAttribute('rel');
      if (href !== 'https://wa.me/995595970704') problems.push(`${p}: href ${href}`);
      if ((await fab.getAttribute('target')) !== '_blank' || !/noopener/.test(rel ?? '')) problems.push(`${p}: target/rel`);
      const vp = page.viewportSize();
      const check = async (where) => {
        const b = await fab.boundingBox();
        if (!(await fab.isVisible()) || !b || vp.width - (b.x + b.width) > 30 || vp.height - (b.y + b.height) > 30 || b.x < vp.width / 2)
          problems.push(`${p}: not bottom-right ${where}`);
      };
      await check('at top');
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      await page.waitForTimeout(150);
      await check('mid-page');
      const tip = (await page.locator('.wa-fab__tip').textContent())?.trim();
      const wantTip = p.startsWith('/en/') ? 'Chat with us' : 'მოგვწერეთ WhatsApp-ზე';
      if (tip !== wantTip) problems.push(`${p}: tooltip "${tip}"`);
      const [popup] = await Promise.all([page.context().waitForEvent('page'), fab.click()]);
      await popup.waitForLoadState('domcontentloaded').catch(() => {});
      const u = new URL(popup.url());
      if (u.origin + u.pathname !== 'https://wa.me/995595970704') problems.push(`${p}: opened ${popup.url()}`);
      else opened++;
      await popup.close();
    }
    ok(`[${name}] floating WhatsApp on all ${all.length} pages: bottom-right, stays while scrolling, opens wa.me/995595970704`, problems.length === 0 && opened === all.length, problems.join('; ') || `${opened} clicks verified`);

    // does not cover key controls
    const overlaps = [];
    const hits = async (sel) => {
      const a = await page.locator('[data-wa-fab]').boundingBox();
      const els = page.locator(sel);
      for (let i = 0; i < (await els.count()); i++) {
        const b = await els.nth(i).boundingBox();
        if (b && a && a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y) return true;
      }
      return false;
    };
    await page.goto(BASE + '/');
    if (await hits('.hero .btn')) overlaps.push('hero buttons');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(250);
    if (await hits('.footer__top-link, .footer__bottom p')) overlaps.push('footer bottom row');
    await page.goto(BASE + '/booking/');
    await page.evaluate(() => document.querySelector('.bk-form__btn').scrollIntoView({ block: 'center' }));
    await page.waitForTimeout(150);
    if (await hits('.bk-form__btn')) overlaps.push('booking submit');
    ok(`[${name}] floating button does not cover hero buttons, booking submit or footer`, overlaps.length === 0, overlaps.join(', '));
    await page.context().close();
  }
}

// ── 4d. light / dark theme ──
{
  // follows the system preference when nothing is saved
  const sys = await newPage({ reducedMotion: 'reduce', colorScheme: 'dark' });
  await sys.addInitScript(() => sessionStorage.setItem('ks-intro', '1'));
  await sys.goto(BASE + '/');
  ok('theme follows system dark preference', (await sys.evaluate(() => document.documentElement.dataset.theme)) === 'dark');
  await sys.context().close();

  const page = await newPage({ reducedMotion: 'reduce', colorScheme: 'light' });
  await page.addInitScript(() => {
    sessionStorage.setItem('ks-intro', '1');
    // record the theme as early as possible (before first paint)
    document.addEventListener('readystatechange', () => {
      if (!window.__firstTheme) window.__firstTheme = document.documentElement.dataset.theme || 'none';
    });
  });
  await page.goto(BASE + '/services/');
  ok('light by default with light system preference', (await page.evaluate(() => document.documentElement.dataset.theme)) === 'light');
  const toggle = page.locator('.site-header [data-theme-toggle]');
  ok('theme toggle starts aria-pressed=false', (await toggle.getAttribute('aria-pressed')) === 'false');
  await toggle.click();
  await page.waitForTimeout(700);
  ok('toggle switches to dark', (await page.evaluate(() => document.documentElement.dataset.theme)) === 'dark');
  ok('toggle aria-pressed=true', (await toggle.getAttribute('aria-pressed')) === 'true');
  const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  ok('dark background applied', bg === 'rgb(13, 18, 38)', bg);
  ok('choice saved', (await page.evaluate(() => localStorage.getItem('ks-theme'))) === 'dark');
  await page.click('.site-nav a[href="/contact/"]');
  await page.waitForURL('**/contact/');
  await page.waitForTimeout(300);
  ok('dark kept after client-side navigation', (await page.evaluate(() => document.documentElement.dataset.theme)) === 'dark');
  await page.click('.site-header [data-lang-link][hreflang="en"]');
  await page.waitForURL('**/en/contact/');
  await page.waitForTimeout(300);
  ok('dark kept after language switch', (await page.evaluate(() => document.documentElement.dataset.theme)) === 'dark');
  ok('toggle state synced on new page', (await page.locator('.site-header [data-theme-toggle]').getAttribute('aria-pressed')) === 'true');
  await page.reload();
  ok('dark applied before first paint on reload', (await page.evaluate(() => window.__firstTheme)) === 'dark', await page.evaluate(() => window.__firstTheme));
  await page.locator('.site-header [data-theme-toggle]').click();
  await page.waitForTimeout(700);
  ok('toggle back to light', (await page.evaluate(() => document.documentElement.dataset.theme)) === 'light');
  await page.context().close();
}

// ── 4e. mobile header & menu controls ──
{
  const page = await newPage({ reducedMotion: 'reduce', ...MOBILE });
  await page.addInitScript(() => sessionStorage.setItem('ks-intro', '1'));
  await page.goto(BASE + '/faq/');
  ok('mobile header: globe language switch visible', await page.isVisible('.site-header .lang-globe'));
  ok('mobile header: theme toggle visible', await page.isVisible('.site-header [data-theme-toggle]'));
  ok('mobile header: segmented switch hidden', !(await page.isVisible('.site-header .lang')));
  await page.click('[data-menu-open]');
  await page.waitForTimeout(400);
  for (const [sel, name] of [['.menu__top .lang-globe', 'globe'], ['.menu__top [data-theme-toggle]', 'theme toggle'], ['[data-menu-close]', 'close']]) {
    ok(`open menu: ${name} visible in menu header`, await page.isVisible(sel));
  }
  await page.locator('.menu__top [data-theme-toggle]').click();
  await page.waitForTimeout(700);
  ok('theme toggle works from inside the open menu', (await page.evaluate(() => document.documentElement.dataset.theme)) === 'dark');
  ok('menu stays open after theme toggle', await page.evaluate(() => document.querySelector('[data-menu]').open));
  await page.click('.menu__top .lang-globe');
  await page.waitForURL('**/en/faq/');
  ok('globe in menu switches to /en/faq/', page.url().endsWith('/en/faq/'));
  await page.context().close();
}

// ── 5. lightbox ──
{
  const page = await newPage({ reducedMotion: 'reduce' });
  await page.goto(BASE + '/portfolio/');
  const count = await page.$$eval('a[data-lightbox]', (a) => a.length);
  await page.click('a[data-lightbox] >> nth=0');
  await page.waitForTimeout(400);
  ok('lightbox opens', await page.evaluate(() => document.querySelector('[data-lightbox-dialog]').open));
  const c1 = await page.textContent('[data-lb-counter]');
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(300);
  const c2 = await page.textContent('[data-lb-counter]');
  ok('arrow key → next photo', c1 === `1 / ${count}` && c2 === `2 / ${count}`, `${c1} → ${c2}`);
  const loaded = await page.evaluate(() => {
    const img = document.querySelector('[data-lb-stage] img');
    return img && img.naturalWidth > 0 && img.alt.length > 0;
  });
  ok('lightbox image loads with alt', loaded);
  await page.keyboard.press('Escape');
  ok('Escape closes lightbox', !(await page.evaluate(() => document.querySelector('[data-lightbox-dialog]').open)));
  await page.context().close();
}

// ── 6. FAQ accordion + hash ──
{
  const page = await newPage({ reducedMotion: 'reduce' });
  await page.goto(BASE + '/en/faq/#hours');
  await page.waitForTimeout(300);
  ok('#hours opens that FAQ item', await page.evaluate(() => document.getElementById('hours').open));
  await page.click('#payment summary');
  ok('click toggles FAQ item', await page.evaluate(() => document.getElementById('payment').open));
  await page.context().close();
}

// ── 7. map loads only on demand ──
{
  const page = await newPage({ reducedMotion: 'reduce' });
  const google = [];
  page.on('request', (r) => r.url().includes('google.') && google.push(r.url()));
  await page.goto(BASE + '/contact/', { waitUntil: 'networkidle' });
  ok('no Google requests before consent', google.length === 0);
  await page.click('[data-map-load]');
  await page.waitForTimeout(500);
  ok('map iframe inserted', (await page.$$('[data-map] iframe')).length === 1);
  await page.context().close();
}

// ── 8. every internal link resolves ──
{
  const page = await newPage();
  const seen = new Set();
  const queue = ['/', '/en/'];
  const broken = [];
  while (queue.length) {
    const p = queue.shift();
    if (seen.has(p)) continue;
    seen.add(p);
    const res = await page.goto(BASE + p);
    if (!res || res.status() >= 400) {
      broken.push(`${p} (${res?.status()})`);
      continue;
    }
    const links = await page.$$eval('a[href]', (as) => as.map((a) => a.getAttribute('href')));
    for (const h of links) {
      if (!h || h.startsWith('#') || /^(https?:|tel:|mailto:)/.test(h)) continue;
      const path = new URL(h, BASE + p).pathname;
      if (!seen.has(path) && !/\.(webp|jpg|png)$/.test(path)) queue.push(path);
    }
  }
  ok(`internal links crawl (${seen.size} URLs)`, broken.length === 0, broken.join(', '));
  await page.context().close();
}

await browser.close();
console.log(results.join('\n'));
console.log(`\n${results.filter((r) => r.startsWith('FAIL')).length} failed / ${results.length} checks`);
console.log('JS errors:', errors.length ? errors : 'none');
