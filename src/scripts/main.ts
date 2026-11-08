import { initHeader } from './header';
import { initReveal } from './reveal';
import { initLightbox } from './lightbox';
import { initAccordion } from './accordion';
import { initBooking } from './booking';
import { initMap } from './map';
import { initFab } from './fab';
import { initTheme } from './theme';

// Runs on first load and after every client-side navigation (view transitions).
document.addEventListener('astro:page-load', () => {
  initHeader();
  initReveal();
  initLightbox();
  initAccordion();
  initBooking();
  initMap();
  initFab();
  initTheme();
});
