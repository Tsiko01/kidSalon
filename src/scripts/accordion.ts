/** FAQ uses native <details>; this only opens the item targeted by the URL hash (e.g. /faq/#hours). */
export function initAccordion() {
  if (!location.hash) return;
  const el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (el instanceof HTMLDetailsElement) {
    el.open = true;
    el.scrollIntoView({ block: 'center' });
  }
}
