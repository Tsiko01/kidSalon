/** Shows the floating WhatsApp tooltip once per session, so touch users see the label too. */
let timers: number[] = [];

export function initFab() {
  timers.forEach(clearTimeout);
  timers = [];
  const fab = document.querySelector<HTMLElement>('[data-wa-fab]');
  if (!fab) return;
  try {
    if (sessionStorage.getItem('ks-fab-hint')) return;
    sessionStorage.setItem('ks-fab-hint', '1');
  } catch {
    return;
  }
  const start = document.documentElement.classList.contains('has-loader') ? 3600 : 2500;
  timers.push(
    window.setTimeout(() => fab.classList.add('is-hinting'), start),
    window.setTimeout(() => fab.classList.remove('is-hinting'), start + 4000),
  );
}
