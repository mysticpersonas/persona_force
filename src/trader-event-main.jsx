// Standalone entry for /trader/event (served from trader-event.html).
// Loads only this page: no router, no Wistia, no other pages' bundles, so the
// first paint is fast and the static <head> carries the SEO/social tags.
// In production the HTML is prerendered (scripts/prerender-trader-event.mjs),
// so React hydrates the existing markup instead of building it from scratch.
import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import TraderEvent from './pages/trader-event/TraderEvent';

const container = document.getElementById('root');
const app = (
  <StrictMode>
    <TraderEvent standalone />
  </StrictMode>
);

if (container.hasChildNodes()) hydrateRoot(container, app);
else createRoot(container).render(app);
