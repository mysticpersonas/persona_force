// Exports every Trader's Journey page as a self-contained snippet for a
// GoHighLevel "Custom HTML/Javascript" element.
//
//   node ghl-export/tools/build.mjs
//
// Output: ghl-export/pages/<nn>-<slug>.html  (paste one per GHL page)
//         ghl-export/README.md               (page list + setup)
//
// How it stays faithful to the live pages:
//  - The markup is rendered from the REAL React pages (src/pages/*), so copy,
//    layout and responsive classes are identical. Nothing in src/ is changed.
//  - CSS is compiled by the same Tailwind version, only for the classes each
//    page uses, then scoped under #tj-root so GHL's styles and ours can't clash.
//  - rem units are converted to px, so GHL's base font size can't rescale it.
//  - Cascade layers are removed, so GHL's unlayered CSS can't silently win.
//  - runtime.js replaces the React-only behaviour (reveals, menu, sticky CTA,
//    particles, scroll-to-form).

import { build } from 'vite';
import react from '@vitejs/plugin-react';
import { compile, optimize } from '@tailwindcss/node';
import { Scanner } from '@tailwindcss/oxide';
import postcss from 'postcss';
import sharp from 'sharp';
import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { PAGES, MAIN_SITE } from './pages.config.mjs';

const ROOT = resolve(import.meta.dirname, '../..');
const TOOLS = resolve(ROOT, 'ghl-export/tools');
const OUT = resolve(ROOT, 'ghl-export/pages');
const CACHE = resolve(ROOT, 'node_modules/.cache/ghl-export');

// ---------------------------------------------------------------- render ---

await build({
  root: ROOT,
  configFile: false,
  plugins: [react()],
  logLevel: 'warn',
  build: { ssr: resolve(TOOLS, 'ssr-entry.jsx'), outDir: CACHE, emptyOutDir: true },
});
const { render, CHALLENGE_DAYS } = await import(pathToFileURL(resolve(CACHE, 'ssr-entry.js')).href);

// Fill in day titles from the challenge data (same format the pages set).
CHALLENGE_DAYS.forEach((d, i) => {
  const page = PAGES.find((p) => p.key === `day${i + 1}`);
  if (page && !page.title) page.title = `${d.marker}, ${d.headline} · The Trader's Journey`;
});

// ---------------------------------------------------------------- assets ---

// Logos are inlined as small WebP data URIs so the snippets need no hosting.
async function dataUri(file, height) {
  const buf = await sharp(resolve(ROOT, 'public', file)).resize({ height, withoutEnlargement: true }).webp({ quality: 82 }).toBuffer();
  return `data:image/webp;base64,${buf.toString('base64')}`;
}
const IMAGES = {
  '/tj_logo.jpeg': await dataUri('tj_logo.jpeg', 96),
  '/pf_logo.png': await dataUri('pf_logo.png', 120),
};

// ----------------------------------------------------------------- links ---

const ROUTE_TO_SLUG = new Map(PAGES.map((p) => [p.route, p.slug]));
function mapHref(href) {
  const m = href.match(/^([^?#]*)(.*)$/);
  const path = m[1].replace(/\/$/, '') || '/';
  if (ROUTE_TO_SLUG.has(path)) return `/${ROUTE_TO_SLUG.get(path)}${m[2]}`;
  return `${MAIN_SITE}${href}`;
}

// ------------------------------------------------------------ transforms ---

// Hidden state -> shown state for every scroll reveal used on these pages.
const REVEALS = [
  { hidden: ['opacity-0', 'blur-[8px]', 'translate-y-3'], shown: ['opacity-100', 'blur-0', 'translate-y-0'] },
  { hidden: ['opacity-0', 'translate-y-8'], shown: ['opacity-100', 'translate-y-0'] },
  { hidden: ['-translate-x-6', 'opacity-0'], shown: ['translate-x-0', 'opacity-100'] },
  { hidden: ['translate-x-6', 'opacity-0'], shown: ['translate-x-0', 'opacity-100'] },
  { hidden: ['opacity-0', 'scale-[0.98]'], shown: ['opacity-100', 'scale-100'], extra: ' data-tj-form-card' },
];
// Classes only ever added by runtime.js; they must exist in the CSS.
const RUNTIME_CLASSES = [
  ...REVEALS.flatMap((r) => [...r.hidden, ...r.shown]),
  'opacity-100', 'pointer-events-auto', 'opacity-0', 'pointer-events-none', 'translate-x-0', 'translate-x-full',
  'translate-y-0', 'translate-y-full',
].join(' ');

function transformMarkup(html) {
  const warnings = [];
  let out = html.replace(/<!-- -->/g, '');
  // React adds <link rel="preload"> tags for images during SSR. The logos are
  // inlined below, so those preloads would only re-download them from the old site.
  out = out.replace(/<link rel="preload"[^>]*>/g, '');

  out = out.replace(/class="([^"]*)"/g, (all, cls) => {
    const tokens = cls.split(/\s+/);
    const has = (list) => list.every((t) => tokens.includes(t));
    let attrs = '';
    if (tokens.includes('transition-all')) {
      const r = REVEALS.find((rv) => has(rv.hidden));
      if (r) {
        const next = tokens.filter((t) => !r.hidden.includes(t)).concat(r.shown);
        return `class="${next.join(' ')}" data-tj-reveal="${r.hidden.join(' ')}" data-tj-show="${r.shown.join(' ')}"${r.extra || ''}`;
      }
    }
    if (has(['fixed', 'bottom-0', 'translate-y-full'])) attrs += ' data-tj-sticky';
    if (has(['fixed', 'inset-0', 'z-50', 'pointer-events-none'])) attrs += ' data-tj-overlay';
    if (has(['fixed', 'top-0', 'right-0', 'z-[60]'])) attrs += ' data-tj-drawer';
    return `class="${cls}"${attrs}`;
  });

  // Gradient lines drawn by inline transform.
  out = out.replace(/style="([^"]*)transform:(scale[XY])\(0\)([^"]*)"/g,
    (all, a, axis, b) => `style="${a}transform:${axis}(1)${b}" data-tj-line="${axis}"`);

  out = out.replace(/<canvas /g, '<canvas data-tj-particles ');

  // "Join the Private Pilot" buttons scroll to the form.
  out = out.replace(/<button(?![^>]*aria-label)([^>]*)>((?:(?!<\/button>)[\s\S])*?Join the Private Pilot)/g,
    '<button data-tj-scroll="#register"$1>$2');

  out = out.replace(/© (\d{4})/g, '© <span data-tj-year>$1</span>');

  out = out.replace(/href="(\/[^"]*)"/g, (all, href) => `href="${mapHref(href)}"`);
  out = out.replace(/src="(\/[^"]*)"/g, (all, src) => {
    if (IMAGES[src]) return `src="${IMAGES[src]}"`;
    warnings.push(`asset ${src} served from the main site`);
    return `src="${MAIN_SITE}${src}"`;
  });

  return { html: out, warnings };
}

// ------------------------------------------------------------------- css ---

const INPUT_CSS = `
@import "tailwindcss";
@theme {
  --font-display: "Instrument Serif", ui-serif, Georgia, "Times New Roman", serif;
  --font-ui: "Inter Tight", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-sans: "Inter Tight", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
}
@keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
@keyframes wordUp { from { opacity: 0; transform: translateY(14px); filter: blur(5px); } to { opacity: 1; transform: translateY(0); filter: blur(0); } }
@keyframes pftGlow { 0%, 100% { box-shadow: 0 0 20px rgba(0, 174, 239, 0.32); } 50% { box-shadow: 0 0 40px rgba(0, 174, 239, 0.6); } }
.tj-form__frame { display: block; width: 100%; border: 0; height: var(--tj-form-h, 1200px); }
@media (max-width: 767px) { .tj-form__frame { height: calc(var(--tj-form-h, 1200px) * 1.55); } }
`;
const compiler = await compile(INPUT_CSS, { base: ROOT, onDependency() {} });
const scanner = new Scanner({});

// Scope every rule under #tj-root, drop cascade layers, rem -> px.
const scopePlugin = {
  postcssPlugin: 'tj-scope',
  Once(root) {
    root.walkAtRules('layer', (at) => { if (at.nodes && at.nodes.length) at.replaceWith(at.nodes); else at.remove(); });
    root.walkRules((rule) => {
      const parent = rule.parent;
      if (parent && parent.type === 'atrule' && /keyframes$/i.test(parent.name)) return;
      rule.selectors = rule.selectors.flatMap((sel) => {
        const s = sel.trim();
        if (/^(:root|:host|html|body)$/.test(s)) return ['#tj-root'];
        if (/^(:root|:host|html|body)[\s:[.>]/.test(s)) return [s.replace(/^(:root|:host|html|body)/, '#tj-root')];
        if (s === '*') return ['#tj-root', '#tj-root *'];
        if (s.startsWith('#tj-root')) return [s];
        return [`#tj-root ${s}`];
      });
    });
    const toPx = (v) => v.replace(/(-?\d*\.?\d+)rem\b/g, (m, n) => `${+(parseFloat(n) * 16).toFixed(4)}px`);
    root.walkDecls((d) => { if (d.value.includes('rem')) d.value = toPx(d.value); });
    root.walkAtRules((at) => { if (at.params && at.params.includes('rem')) at.params = toPx(at.params); });
  },
};

// Neutralises GHL's section/row/column padding around the snippet so the page
// runs edge to edge, and paints the page background behind it.
const GHL_FRAME_CSS = `
html,body{background:#0b0f14!important;margin:0}
div:has(#tj-root):not(#tj-root){padding:0!important;margin:0!important;max-width:none!important;width:100%!important;background:transparent!important}
#tj-root{display:block;width:100%;overflow-x:clip;font-family:"Inter Tight",ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;line-height:1.5;-webkit-text-size-adjust:100%}
`;

async function cssFor(markup) {
  // Only class attributes are scanned: page copy ("block", "hidden"...) must not
  // generate utilities, and neither must the base64 logo data.
  const classText = [...markup.matchAll(/class="([^"]*)"/g)].map((m) => m[1]).join(' ');
  const candidates = scanner.scanFiles([{ content: `<div class="${classText} ${RUNTIME_CLASSES}"></div>`, extension: 'html' }]);
  const raw = compiler.build(candidates);
  const lowered = optimize(raw, { minify: false });
  const scoped = await postcss([scopePlugin]).process(lowered.code ?? lowered, { from: undefined });
  const min = optimize(scoped.css, { minify: true });
  return (min.code ?? min) + GHL_FRAME_CSS.replace(/\n/g, '');
}

// --------------------------------------------------------------- snippet ---

const RUNTIME = (await readFile(resolve(TOOLS, 'runtime.js'), 'utf8'));
const FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap">';

function header(page, n) {
  return `<!--
  The Trader's Journey · ${page.title}
  GHL page ${n} of ${PAGES.length} · path: /${page.slug}
  Paste this whole file into ONE "Custom HTML/Javascript" element, alone in a
  full-width section. SEO title: ${page.title}${page.index ? '' : '\n  Page settings: tick "noindex" (private funnel step).'}
  Generated by ghl-export/tools/build.mjs from the live PersonaForce page ${page.route}.
-->
`;
}

function snippet(page, n, markup, css) {
  const scripts = [];
  if (markup.includes('leadconnectorhq.com/widget/form')) scripts.push('<script src="https://link.msgsndr.com/js/form_embed.js"></script>');
  const media = [...markup.matchAll(/media-id="([^"]+)"/g)].map((m) => m[1]);
  if (media.length) {
    scripts.push('<script src="https://fast.wistia.com/player.js" async></script>');
    media.forEach((id) => scripts.push(`<script src="https://fast.wistia.com/embed/${id}.js" async type="module"></script>`));
  }
  return `${header(page, n)}${FONTS}
<style>${css}</style>
<div id="tj-root">${markup}</div>
<script>${RUNTIME}</script>
${scripts.join('\n')}
`;
}

// /trader/trader-challenge#dayN links are already in sent emails: this page just
// forwards to the right day page, keeping the hash-based links working.
function challengeRedirect(page, n) {
  const days = PAGES.filter((p) => /^day\d$/.test(p.key));
  const map = Object.fromEntries(days.map((p) => [p.key, `/${p.slug}`]));
  return `${header(page, n)}<style>html,body{background:#0b0f14!important}</style>
<script>
(function () {
  var days = ${JSON.stringify(map)};
  var id = (window.location.hash || '').replace('#', '');
  window.location.replace((days[id] || days.day1) + window.location.search);
})();
</script>
<noscript><p style="color:#fff;font-family:sans-serif;text-align:center;padding:40px">Continue to <a style="color:#00e676" href="${map.day1}">Day 1</a>.</p></noscript>
`;
}

// ------------------------------------------------------------------- run ---

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

const report = [];
for (const [i, page] of PAGES.entries()) {
  const n = i + 1;
  const file = `${String(n).padStart(2, '0')}-${page.slug}.html`;
  let content;
  let warnings = [];
  if (page.key === 'traderChallenge') {
    content = challengeRedirect(page, n);
  } else {
    const raw = render(page.key, page.route);
    if (!raw) throw new Error(`No component for ${page.key}`);
    const t = transformMarkup(raw);
    warnings = t.warnings;
    content = snippet(page, n, t.html, await cssFor(t.html));
  }
  await writeFile(resolve(OUT, file), content);
  report.push({ n, file, page, kb: (Buffer.byteLength(content) / 1024).toFixed(1), warnings });
  console.log(`${file.padEnd(40)} ${report.at(-1).kb} KB${warnings.length ? '  ! ' + [...new Set(warnings)].join('; ') : ''}`);
}

await writeFile(resolve(ROOT, 'ghl-export/pages/manifest.json'), JSON.stringify(report.map(({ n, file, page, kb }) => ({ n, file, slug: page.slug, route: page.route, title: page.title, noindex: !page.index, kb: +kb })), null, 2));
await rm(CACHE, { recursive: true, force: true });
