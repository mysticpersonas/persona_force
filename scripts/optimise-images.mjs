#!/usr/bin/env node
/**
 * Convert the source imagery to web-ready WebP.
 *
 * The nine source PNGs total ~13.4MB. Everything inside public/ is copied
 * verbatim into the build, so leaving them there would ship 13.4MB whether or
 * not a single one is referenced. Sources therefore live OUTSIDE public/ in
 * assets-src/, and only the encoded output lands in public/imagery/.
 *
 * These frames are dark and low-detail, which compresses hard — but dark
 * gradients are exactly where WebP bands, so quality is kept high and
 * -sharp_yuv is on. Cheap insurance against posterised shadows.
 *
 *   node scripts/optimise-images.mjs
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'assets-src');
const OUT = path.join(ROOT, 'public', 'imagery');

// full-bleed scenes render up to the viewport width; cards are ~520px on
// desktop. Two widths covers both without shipping a size nobody uses.
const WIDTHS = [1600, 900];
const QUALITY = 80;

function haveCwebp() {
  try { execFileSync('cwebp', ['-version'], { stdio: 'ignore' }); return true; }
  catch { return false; }
}

if (!haveCwebp()) {
  console.error('cwebp not found. Install with:  brew install webp');
  process.exit(1);
}
if (!existsSync(SRC)) {
  console.error(`No source directory at ${SRC}`);
  process.exit(1);
}
mkdirSync(OUT, { recursive: true });

const sources = readdirSync(SRC).filter((f) => /\.(png|jpe?g)$/i.test(f)).sort();
if (!sources.length) {
  console.error(`No images in ${SRC}`);
  process.exit(1);
}

const kb = (p) => Math.round(statSync(p).size / 1024);
let srcTotal = 0;
let outTotal = 0;

for (const file of sources) {
  const id = path.parse(file).name;
  const inPath = path.join(SRC, file);
  srcTotal += kb(inPath);
  const parts = [];

  for (const w of WIDTHS) {
    const outPath = path.join(OUT, `${id}-${w}.webp`);
    execFileSync('cwebp', [
      '-q', String(QUALITY),
      '-sharp_yuv',           // better chroma on gradients
      '-m', '6',              // slowest/best compression search
      '-resize', String(w), '0',
      inPath, '-o', outPath,
    ], { stdio: 'ignore' });
    outTotal += kb(outPath);
    parts.push(`${w}px ${String(kb(outPath)).padStart(4)}KB`);
  }

  console.log(`  ${id.padEnd(6)} ${String(kb(inPath)).padStart(5)}KB png  →  ${parts.join('   ')}`);
}

console.log('\n  ─────────────────────────────────────────────');
console.log(`  source  ${(srcTotal / 1024).toFixed(1)}MB  (stays out of the build)`);
console.log(`  shipped ${(outTotal / 1024).toFixed(2)}MB  across ${sources.length * WIDTHS.length} files`);
