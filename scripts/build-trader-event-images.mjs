// Builds the optimized portrait set for /trader/event.
//
// Run:  node scripts/build-trader-event-images.mjs
// Reads originals from assets/trader-event/ (kept OUT of public/ so the raw
// files and the *_REFERENCE_ONLY mockups never get deployed) and writes
// AVIF + WebP + PNG at several widths into public/trader/.
//
// Why normalize here instead of in CSS: the three source photos are shot at
// very different distances. Doing the math once, in pixels, means every output
// frame has the eyes on the same line and the same eye-to-chin height, so the
// page can render three identical frames and the faces match by construction.

import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'assets/trader-event';
const OUT = 'public/trader';
const WIDTHS = [240, 360, 480, 720];

// Output frame: 4:5. Eye line at 34% of the height, eye-to-chin = 25% of the
// height. These two numbers are the whole "same face scale" rule.
const FRAME_W = 720;
const FRAME_H = 900;
const EYE_Y = 0.34 * FRAME_H;
const EYE_TO_CHIN = 0.25 * FRAME_H;

// Landmarks measured on the originals (pixels): average eye height, face
// centre x, and chin y.
const PEOPLE = [
  {
    slug: 'nicole',
    file: 'nicole_quinones_original.png',
    eyeY: 335, centerX: 690, chinY: 625,
  },
  {
    slug: 'travis',
    // Swap this for a clean, signature-free file when one is supplied, then set
    // signatureSafeCrop to false.
    file: 'dr_travis_fox_original.jpg',
    eyeY: 515, centerX: 410, chinY: 912,
    signatureSafeCrop: true,
  },
  {
    slug: 'michelle',
    file: 'michelle_fox_transparent_original.png',
    eyeY: 335, centerX: 715, chinY: 615,
  },
];

// Travis's original has an orange signature across the lower right. This
// polygon traces the region that is provably clear of it (measured by scanning
// for the signature's orange, ~25px margin). We only ever ADD transparency
// outside this zone; no pixel of his photo is painted, warped or retouched.
const TRAVIS_CLEAN_ZONE = [
  [0, 0], [1125, 0], [1125, 740], [880, 760], [850, 830], [640, 850], [600, 900],
  [585, 990], [455, 1010], [420, 1100], [380, 1200], [330, 1300], [0, 1300],
];

function isSignatureOrange(r, g, b) {
  return r > 170 && g > 90 && g < 200 && b < 110 && r - b > 110;
}

async function signatureSafeAlpha(input) {
  const { data, info } = await sharp(input).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;

  const points = TRAVIS_CLEAN_ZONE.map(([x, y]) => `${x},${y}`).join(' ');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect width="100%" height="100%" fill="#000"/><polygon points="${points}" fill="#fff"/></svg>`;
  const hard = await sharp(Buffer.from(svg)).extractChannel(0).raw().toBuffer();

  // Also ramp the photo's own top/left/right edges so no box edge shows.
  const EDGE = 220;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const d = Math.min(x, y, W - 1 - x) / EDGE;
      if (d < 1) hard[y * W + x] = Math.round(hard[y * W + x] * d * d * (3 - 2 * d));
    }
  }

  // Feather INWARD: blur, then remap so the 50% contour becomes 0. The soft
  // edge therefore lives entirely inside the clean zone.
  const blurred = await sharp(hard, { raw: { width: W, height: H, channels: 1 } }).blur(30).extractChannel(0).raw().toBuffer();
  const alpha = Buffer.alloc(W * H);
  for (let i = 0; i < alpha.length; i++) {
    alpha[i] = hard[i] ? Math.max(0, Math.min(255, (blurred[i] - 128) * 2)) : 0;
  }

  // Guarantee: no signature pixel survives with any opacity.
  let leaks = 0;
  for (let i = 0; i < W * H; i++) {
    const p = i * 3;
    if (alpha[i] > 0 && isSignatureOrange(data[p], data[p + 1], data[p + 2])) leaks++;
  }
  if (leaks) throw new Error(`Travis crop leaks ${leaks} signature pixels. Stop and use a clean source.`);

  return sharp(data, { raw: { width: W, height: H, channels: 3 } })
    .joinChannel(alpha, { raw: { width: W, height: H, channels: 1 } })
    .png()
    .toBuffer();
}

async function normalize(person) {
  const input = path.join(SRC, person.file);
  const base = person.signatureSafeCrop ? await signatureSafeAlpha(input) : await sharp(input).ensureAlpha().png().toBuffer();
  const meta = await sharp(base).metadata();

  const scale = EYE_TO_CHIN / (person.chinY - person.eyeY);
  const cropW = Math.round(FRAME_W / scale);
  const cropH = Math.round(FRAME_H / scale);
  const left = Math.round(person.centerX - cropW / 2);
  const top = Math.round(person.eyeY - EYE_Y / scale);

  // Pad with transparency wherever the frame reaches past the photo edge.
  const pad = {
    left: Math.max(0, -left),
    top: Math.max(0, -top),
    right: Math.max(0, left + cropW - meta.width),
    bottom: Math.max(0, top + cropH - meta.height),
  };

  // Two passes: sharp runs extract before extend inside a single pipeline.
  const padded = await sharp(base)
    .extend({ ...pad, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  return sharp(padded)
    .extract({ left: left + pad.left, top: top + pad.top, width: cropW, height: cropH })
    .resize(FRAME_W, FRAME_H)
    .png()
    .toBuffer();
}

await mkdir(OUT, { recursive: true });

for (const person of PEOPLE) {
  const frame = await normalize(person);
  for (const w of WIDTHS) {
    const h = Math.round((w * FRAME_H) / FRAME_W);
    const sized = sharp(frame).resize(w, h);
    await sized.clone().avif({ quality: 55, effort: 6 }).toFile(`${OUT}/${person.slug}-${w}.avif`);
    await sized.clone().webp({ quality: 78, alphaQuality: 90 }).toFile(`${OUT}/${person.slug}-${w}.webp`);
    await sized.clone().png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(`${OUT}/${person.slug}-${w}.png`);
  }
  console.log(`built ${person.slug}`);
}
