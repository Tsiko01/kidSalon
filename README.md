# Kids Salon — website

Bilingual (Georgian default / English) website for Kids Salon, a children's hair salon in Tbilisi.
Static site built with [Astro 7](https://astro.build): no runtime server, no database, no tracking.

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # → dist/  (static files, deploy anywhere)
npm run preview   # serve dist/ locally
npm run check     # type-check (also verifies every English string exists)
```

## Pages

| Page | Georgian | English |
| --- | --- | --- |
| Home | `/` | `/en/` |
| Portfolio | `/portfolio/` | `/en/portfolio/` |
| Services & prices | `/services/` | `/en/services/` |
| Booking (→ WhatsApp) | `/booking/` | `/en/booking/` |
| About | `/about/` | `/en/about/` |
| Parents' guide | `/parents-guide/` | `/en/parents-guide/` |
| Reviews | `/reviews/` | `/en/reviews/` |
| FAQ | `/faq/` | `/en/faq/` |
| Contact | `/contact/` | `/en/contact/` |

Plus `404.html`, `robots.txt`, `sitemap-index.xml` (with hreflang), web manifest and icons.

## Editing content — everything lives in `src/config/` and `src/i18n/`

| What | File |
| --- | --- |
| Phone, WhatsApp, address, map, **opening hours**, **Instagram**, payment methods, domain | `src/config/site.ts` |
| Services and **prices** | `src/config/services.ts` |
| **Customer reviews** (real ones only) | `src/config/reviews.ts` |
| Portfolio captions / alt text | `src/config/portfolio.ts` |
| Page photo slots (alt text + what each photo should show) | `src/config/photos.ts` |
| All interface text, Georgian | `src/i18n/ka.ts` |
| All interface text, English | `src/i18n/en.ts` |

Anything set to `null` in `site.ts` is hidden from the page **and** from the Schema.org data, so nothing
unconfirmed is ever published. Currently still `null` / to confirm:

- `instagram` — Instagram link (cards/buttons appear automatically once set)
- `hours` — opening hours (example format is in the file)
- `paymentMethods`
- `geo` — optional coordinates
- `pricesIndicative: true` — prices in `services.ts` are **editable samples**, shown as "from …" with a note.
  Replace them with real prices and set this to `false` (prices then also go into structured data).
- `url` — production domain (`https://kidssalon.ge` is assumed). Change it here **and** in `astro.config.mjs`.
- `reviewLinks.google` in `reviews.ts` — Google review link.

The address **ცინცაძის ქ. 46** was taken from the salon's own Facebook post — please double-check it.

## Photos

Real photos come from the salon's Facebook posts (originals in `photos-source/facebook/`).
`npm run photos:crop` cuts the clean photographs out of the collages into `src/assets/photos/`.
The build converts every photo to responsive WebP automatically.

- **Replace a page photo:** drop a file with the same name into `src/assets/photos/`
  (e.g. `hero.jpg`). Slot names and what each should show are listed in `src/config/photos.ts`.
- **Add portfolio photos:** drop them into `src/assets/photos/portfolio/` with descriptive filenames
  (e.g. `girls-bob-haircut.jpg`) and add a caption in `src/config/portfolio.ts`.

The Facebook images are low resolution (≈500–1000 px). Original camera files, especially for `hero`
(portrait ≥1200×1800), `about-hero` (landscape ≥2000 px) and the portfolio, will look much sharper.

## WhatsApp

**Booking form:** validates the input, then opens `https://wa.me/995595970704` with a pre-filled message in the
visitor's language (Georgian or English), in the salon's template:

```
გამარჯობა! მინდა ვიზიტის დაჯავშნა.

მშობლის სახელი: …
ბავშვის სახელი: …
ტელეფონი: …
სერვისი: …
სასურველი თარიღი: …
სასურველი დრო: …
დამატებითი ინფორმაცია: …
```

Optional fields (child's age, additional information) are only included when filled in. If the browser
blocks the new tab, WhatsApp opens in the same tab. Nothing is stored or sent to a server; the page states
that a visit is confirmed only when the salon replies.

**Floating button:** a WhatsApp button (`src/components/WhatsAppFab.astro`) sits bottom-right on every page and
opens `https://wa.me/995595970704`: the app on phones, WhatsApp Web / Desktop on computers.

## Light / dark theme

The site follows the visitor's system setting and remembers a manual choice (theme toggle in the header and in
the mobile menu). Theme colours live in `src/styles/global.css` (`:root[data-theme='dark']`); `--ink` (navy) and
`--cream` are fixed brand colours, `--bg` / `--text` / `--paper` etc. change with the theme.

## Brand assets

- `npm run brand:logo` — rebuilds the KIDS/SALON wordmark paths (`scripts/build-wordmark.mjs`)
- `npm run brand:assets` — favicon, app icons, manifest, Open Graph image → `public/`
- `npm run fonts:subset` — subsets the self-hosted fonts to the characters in use

## Deploying

Any static host works (Vercel, Netlify, Cloudflare Pages, GitHub Pages…). Build command `npm run build`,
output folder `dist`. `vercel.json` and `public/_headers` set long-term caching for hashed assets.

## QA scripts (`scripts/qa/`)

Need the preview server (`npm run preview`) and a local Chrome.

- `functional.mjs`: 80 checks (language switch, menu, booking validation + exact WhatsApp message, popup fallback, floating WhatsApp button on every page (desktop + mobile), light/dark theme, lightbox, FAQ, map consent, loader, link crawl). Set `BASE=http://localhost:4322` to target another port.
- `menu.mjs <dir>`: mobile header + menu at 360×640, 375×667, 390×844, 414×896 in both themes (fit, font size, controls)
- `dark.mjs`, `viewport-shots.mjs`: dark-mode screenshots (full page / section by section)
- `shoot.mjs <dir> <width> <paths…>`: full-page screenshots, console errors, horizontal-overflow detection
- `serve.mjs` + `lighthouse.mjs <dir> <mobile|desktop> <paths…>`: Lighthouse against a gzip/brotli server like production
