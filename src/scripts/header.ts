let onScroll: (() => void) | null = null;

export function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  const menu = document.querySelector<HTMLDialogElement>('[data-menu]');
  const openBtn = document.querySelector<HTMLButtonElement>('[data-menu-open]');
  const closeBtn = document.querySelector<HTMLButtonElement>('[data-menu-close]');
  if (!header) return;

  // ── scroll state: solid background once scrolled, hide on scroll down ──
  if (onScroll) window.removeEventListener('scroll', onScroll);
  let lastY = 0;
  let ticking = false;
  onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      header.classList.toggle('is-scrolled', y > 24);
      header.classList.toggle('is-hidden', y > 480 && y > lastY + 4 && !header.contains(document.activeElement));
      if (y < lastY - 4 || y < 480) header.classList.remove('is-hidden');
      lastY = y;
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // first read happens inside requestAnimationFrame (no forced layout)
  header.addEventListener('focusin', () => header.classList.remove('is-hidden'));

  // ── full-screen menu (native <dialog>: focus trap + Esc for free) ──
  if (!menu || !openBtn) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const open = () => {
    menu.showModal();
    document.documentElement.style.overflow = 'hidden';
    openBtn.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(() => menu.classList.add('is-open'));
  };
  const close = () => {
    menu.classList.remove('is-open');
    openBtn.setAttribute('aria-expanded', 'false');
    document.documentElement.style.overflow = '';
    if (reduce) return menu.close();
    setTimeout(() => menu.open && menu.close(), 420);
  };

  openBtn.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  menu.addEventListener('cancel', (e) => {
    e.preventDefault();
    close();
  });
  menu.addEventListener('close', () => {
    document.documentElement.style.overflow = '';
    openBtn.setAttribute('aria-expanded', 'false');
  });
  // Links inside the menu navigate (client-side); close it right away.
  menu.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      document.documentElement.style.overflow = '';
      menu.classList.remove('is-open');
      menu.close();
    }),
  );
}
