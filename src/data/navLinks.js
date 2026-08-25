/* ------------------------------------------------------------------ *
 *  Primary navigation — the single source of truth for every page.    *
 *  Lives apart from SiteNav so that component stays fast-refreshable. *
 * ------------------------------------------------------------------ */

// An entry with `children` renders as a hover dropdown on desktop and an
// indented, always-open group in the mobile drawer.
export const NAV_LINKS = [
  {
    label: 'Organizations',
    children: [
      { to: '/for-ceos', label: 'For CEOs' },
      { to: '/sales-identity', label: 'Sales' },
      { to: '/sales-culture', label: 'Sales Culture' },
    ],
  },
  { to: '/lawyers', label: 'Lawyers' },
  { to: '/athletes', label: 'Athletes' },
  { to: '/trader', label: 'Traders' },
  // Free Blueprints now routes to booking; the source tag keeps it attributable.
  { to: '/book?source=free-blueprints', label: 'Free Blueprints' },
];

// Hidden, not deleted — the client asked to take AI Manager out of the nav "for
// now" but keep the data. The /ai-manager route and its page are untouched; move
// this entry back into NAV_LINKS to restore it.
export const HIDDEN_NAV_LINKS = [
  { to: '/ai-manager', label: 'AI Manager' },
];
