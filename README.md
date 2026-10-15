# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## /trader/event: The Wealth Blueprint (called off)

The Oct 18, 2026 event was called off, so its pages are **disabled**:
`/trader/event`, `/trader/event/thank-you` and `/trader-event.html` all redirect
(temporary 307) to `/trader` via `vercel.json`, and `src/App.jsx` does the same
for in-app navigation. Nothing on the site links to them.

The code is kept in case the event is rescheduled:
`src/pages/trader-event/`, `trader-event.html`, `src/trader-event-main.jsx`,
`scripts/prerender-trader-event.mjs`, `scripts/build-trader-event-images.mjs`
and the images in `public/trader/`.

**To restore:** remove the three redirects from `vercel.json` and add back the
`/trader/event` rewrite to `/trader-event.html`; put back the lazy routes in
`src/App.jsx`; add `trader-event.html` as a second `rollupOptions.input` in
`vite.config.js`; and set `"build": "vite build && node scripts/prerender-trader-event.mjs"`
in `package.json`. Update the date/times in `TraderEvent.jsx`, `TraderEventThankYou.jsx`
and `calendar.js`.
