/**
 * Accessible gallery lightbox on a native <dialog>.
 * Markup: [data-gallery] containing a[data-lightbox] (href = large image,
 * data-caption, inner <img alt>), plus one dialog[data-lightbox-dialog]
 * with [data-lb-stage], [data-lb-caption], [data-lb-counter] and the buttons.
 */
export function initLightbox() {
  const gallery = document.querySelector<HTMLElement>('[data-gallery]');
  const dialog = document.querySelector<HTMLDialogElement>('[data-lightbox-dialog]');
  if (!gallery || !dialog) return;

  const links = [...gallery.querySelectorAll<HTMLAnchorElement>('a[data-lightbox]')];
  const stage = dialog.querySelector<HTMLElement>('[data-lb-stage]')!;
  // created on demand so the markup never contains an <img> without src
  const img = stage.querySelector('img') ?? stage.appendChild(document.createElement('img'));
  img.decoding = 'async';
  const caption = dialog.querySelector<HTMLElement>('[data-lb-caption]')!;
  const counter = dialog.querySelector<HTMLElement>('[data-lb-counter]')!;
  const counterTpl = counter.dataset.template ?? '{n} / {total}';
  let index = 0;

  const show = (i: number, dir = 0) => {
    index = (i + links.length) % links.length;
    const link = links[index];
    const thumb = link.querySelector('img');
    stage.dataset.dir = String(dir);
    stage.classList.remove('is-ready');
    img.onload = () => requestAnimationFrame(() => stage.classList.add('is-ready'));
    img.src = link.href;
    img.alt = thumb?.alt ?? '';
    caption.textContent = link.dataset.caption ?? '';
    counter.textContent = counterTpl.replace('{n}', String(index + 1)).replace('{total}', String(links.length));
    if (img.complete) requestAnimationFrame(() => stage.classList.add('is-ready'));
    // warm the neighbours
    [index + 1, index - 1].forEach((n) => {
      const l = links[(n + links.length) % links.length];
      const pre = new Image();
      pre.src = l.href;
    });
  };

  links.forEach((link, i) =>
    link.addEventListener('click', (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      show(i);
      dialog.showModal();
      document.documentElement.style.overflow = 'hidden';
    }),
  );

  const close = () => dialog.close();
  dialog.addEventListener('close', () => {
    document.documentElement.style.overflow = '';
    links[index]?.focus();
  });
  dialog.querySelector('[data-lb-close]')?.addEventListener('click', close);
  dialog.querySelector('[data-lb-prev]')?.addEventListener('click', () => show(index - 1, -1));
  dialog.querySelector('[data-lb-next]')?.addEventListener('click', () => show(index + 1, 1));
  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') show(index + 1, 1);
    if (e.key === 'ArrowLeft') show(index - 1, -1);
  });
  // click on the dark backdrop area closes
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog || e.target === stage) close();
  });

  // swipe
  let x0: number | null = null;
  dialog.addEventListener('touchstart', (e) => (x0 = e.touches[0].clientX), { passive: true });
  dialog.addEventListener(
    'touchend',
    (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
      x0 = null;
    },
    { passive: true },
  );
}
