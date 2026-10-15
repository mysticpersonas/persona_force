// Prerenders /trader/event into dist/trader-event.html after `vite build`.
//
// Why: the page is otherwise client-rendered, so on a slow phone no text can
// paint until React has downloaded and run. Shipping the real markup in the
// HTML lets the hero paint immediately; React then hydrates it in place.
//
// Runs automatically as part of `npm run build`.

import { build } from 'vite';
import react from '@vitejs/plugin-react';
import { readFile, writeFile, rm } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const outDir = resolve(root, 'node_modules/.cache/trader-event-ssr');

await build({
  root,
  configFile: false,
  plugins: [react()],
  logLevel: 'warn',
  build: {
    ssr: resolve(root, 'src/pages/trader-event/TraderEvent.jsx'),
    outDir,
    emptyOutDir: true,
  },
});

const { default: TraderEvent } = await import(pathToFileURL(resolve(outDir, 'TraderEvent.js')).href);
const { createElement } = await import('react');
const { renderToString } = await import('react-dom/server');

const markup = renderToString(createElement(TraderEvent, { standalone: true }));
const htmlPath = resolve(root, 'dist/trader-event.html');
const html = await readFile(htmlPath, 'utf8');
if (!html.includes('<div id="root"></div>')) throw new Error('prerender: root div not found in dist/trader-event.html');

// Guard against a class-name mismatch between the SSR and client builds,
// which would make hydration restyle the page.
const css = (await readFile(htmlPath, 'utf8')).match(/href="(\/assets\/[^"]+\.css)"/g) || [];
const cssText = (await Promise.all(css.map((m) => readFile(resolve(root, 'dist', m.slice(7, -1)), 'utf8')))).join('');
const sample = markup.match(/class="(_heroInner_[^" ]+)/)?.[1];
if (!sample || !cssText.includes(`.${sample}`)) throw new Error(`prerender: CSS module class ${sample} not found in client CSS`);

await writeFile(htmlPath, html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`));
await rm(outDir, { recursive: true, force: true });
console.log(`prerendered /trader/event (${(markup.length / 1024).toFixed(1)} KB of HTML)`);
