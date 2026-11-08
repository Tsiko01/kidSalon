/** Click-to-load Google Map (no third-party requests or cookies until the visitor asks). */
export function initMap() {
  document.querySelectorAll<HTMLButtonElement>('[data-map-load]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const box = btn.closest<HTMLElement>('[data-map]');
      if (!box) return;
      const iframe = document.createElement('iframe');
      iframe.src = box.dataset.src!;
      iframe.title = box.dataset.title ?? '';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      iframe.allowFullscreen = true;
      box.classList.add('is-loaded');
      box.appendChild(iframe);
      iframe.focus();
    });
  });
}
