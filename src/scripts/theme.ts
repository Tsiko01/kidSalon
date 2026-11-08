/**
 * Light / dark theme. The initial theme is applied by the inline script in
 * Base.astro (saved choice, otherwise the system preference) before first paint.
 */
const KEY = 'ks-theme';
const THEME_COLOR = { light: '#4aaef2', dark: '#0d1226' } as const;

const current = () => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');

function sync() {
  const dark = current() === 'dark';
  document.querySelectorAll('[data-theme-toggle]').forEach((b) => b.setAttribute('aria-pressed', String(dark)));
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[current()]);
}

export function initTheme() {
  sync();
  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((btn) =>
    btn.addEventListener('click', () => {
      const root = document.documentElement;
      const next = current() === 'dark' ? 'light' : 'dark';
      const apply = () => {
        root.dataset.theme = next;
        try {
          localStorage.setItem(KEY, next);
        } catch {}
        sync();
      };
      const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!document.startViewTransition || reduce) return apply();
      // circular reveal from the button
      const r = btn.getBoundingClientRect();
      root.style.setProperty('--tx', `${r.left + r.width / 2}px`);
      root.style.setProperty('--ty', `${r.top + r.height / 2}px`);
      root.dataset.themeSwitching = '';
      document.startViewTransition(apply).finished.finally(() => delete root.dataset.themeSwitching);
    }),
  );
}
