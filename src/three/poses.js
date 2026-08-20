import * as THREE from 'three';

/**
 * Human poses, built out of the same nodes as the constellation.
 *
 * WHY SKELETONS AND NOT SILHOUETTES: a traced outline carries hundreds of
 * contour points worth of detail. Rendered as ~100 glowing dots that detail
 * turns to mush — you get a blob, not a golfer. A bold joint gesture is what
 * survives at this density, so each pose is authored as bones (limbs, given
 * thickness) plus blobs (head, mass). It also means a pose is tuned by nudging
 * one coordinate, and needs no asset, no parser and no rasterisation.
 *
 * Coordinate space is roughly x ∈ [-1, 1], y ∈ [-1.3, 1.3], y-up, figure
 * standing on y ≈ -1.2. `poseToWorld` scales that into the field's units.
 */

// [x1, y1, x2, y2, thickness, weight]
// weight biases how many points a bone gets beyond its raw length — used to
// make identifying features (a club, a raised arm) denser than a shin.
const bone = (x1, y1, x2, y2, t = 0.05, w = 1) => ({ x1, y1, x2, y2, t, w });
// { x, y, r, w } — filled disc
const blob = (x, y, r, w = 1) => ({ x, y, r, w });

// ── GOLFER — top of the backswing ────────────────────────────────────────────
// The CLUB is the identifier. Without a long straight shaft this is just a
// person standing, so the shaft gets extra weight and runs the full diagonal.
const golfer = {
  name: 'golfer',
  blobs: [blob(0.04, 0.92, 0.14, 1.2)],
  bones: [
    bone(0.02, 0.78, -0.02, 0.12, 0.07, 1.1),   // spine
    bone(-0.20, 0.72, 0.22, 0.75, 0.05),        // shoulders
    bone(-0.20, 0.72, -0.34, 0.54, 0.045),      // L upper arm
    bone(-0.34, 0.54, -0.30, 0.34, 0.045),      // L forearm
    bone(0.22, 0.75, 0.04, 0.56, 0.045),        // R upper arm
    bone(0.04, 0.56, -0.30, 0.34, 0.045),       // R forearm → hands meet
    bone(-0.30, 0.34, 0.62, 1.16, 0.035, 2.2),  // THE CLUB
    bone(-0.16, 0.12, 0.18, 0.12, 0.055),       // hips
    bone(-0.16, 0.12, -0.24, -0.48, 0.055),     // L thigh
    bone(-0.24, -0.48, -0.30, -1.14, 0.045),    // L shin
    bone(0.18, 0.12, 0.28, -0.46, 0.055),       // R thigh
    bone(0.28, -0.46, 0.34, -1.14, 0.045),      // R shin
    bone(-0.30, -1.14, -0.44, -1.20, 0.035),    // L foot
    bone(0.34, -1.14, 0.48, -1.20, 0.035),      // R foot
  ],
};

// ── QUARTERBACK — cocked to throw ────────────────────────────────────────────
// Identifier is the asymmetry: ball hand high behind the ear, lead arm pointing
// downfield, front leg striding open.
const quarterback = {
  name: 'quarterback',
  blobs: [blob(0.0, 0.92, 0.14, 1.2), blob(0.42, 1.06, 0.09, 1.4)],  // head + ball
  bones: [
    bone(-0.02, 0.78, 0.0, 0.12, 0.07, 1.1),    // spine
    bone(-0.22, 0.74, 0.20, 0.76, 0.05),        // shoulders
    bone(0.20, 0.76, 0.36, 0.92, 0.05),         // throwing upper arm
    bone(0.36, 0.92, 0.42, 1.04, 0.045, 1.3),   // throwing forearm → ball
    bone(-0.22, 0.74, -0.48, 0.80, 0.045, 1.2), // lead arm out
    bone(-0.48, 0.80, -0.72, 0.74, 0.04, 1.2),  // lead forearm, pointing
    bone(-0.16, 0.12, 0.18, 0.12, 0.055),       // hips
    bone(-0.16, 0.12, -0.44, -0.42, 0.055, 1.1),// front thigh, striding
    bone(-0.44, -0.42, -0.56, -1.10, 0.045),    // front shin
    bone(0.18, 0.12, 0.30, -0.46, 0.055),       // back thigh
    bone(0.30, -0.46, 0.30, -1.12, 0.045),      // back shin
    bone(-0.56, -1.10, -0.70, -1.18, 0.035),    // front foot
    bone(0.30, -1.12, 0.44, -1.18, 0.035),      // back foot
  ],
};

// ── SPEAKER — a CEO mid-address ──────────────────────────────────────────────
// Identifier is the lectern plus one raised, open gesturing hand.
const speaker = {
  name: 'speaker',
  blobs: [blob(0.0, 0.98, 0.14, 1.2)],
  bones: [
    bone(0.0, 0.84, 0.0, 0.10, 0.07, 1.1),      // spine
    bone(-0.20, 0.78, 0.20, 0.78, 0.05),        // shoulders
    bone(0.20, 0.78, 0.38, 0.62, 0.045),        // R upper arm
    bone(0.38, 0.62, 0.52, 0.78, 0.045, 1.3),   // R forearm raised, gesturing
    bone(-0.20, 0.78, -0.32, 0.56, 0.045),      // L upper arm
    bone(-0.32, 0.56, -0.26, 0.34, 0.045),      // L forearm down to lectern
    bone(-0.52, 0.30, 0.20, 0.30, 0.05, 1.6),   // LECTERN top
    bone(-0.42, 0.30, -0.42, -0.72, 0.05, 1.2), // lectern front edge
    bone(0.10, 0.30, 0.10, -0.72, 0.05, 1.2),   // lectern back edge
    bone(-0.42, -0.72, 0.10, -0.72, 0.05, 1.2), // lectern base
    bone(-0.14, 0.10, 0.14, 0.10, 0.055),       // hips
    bone(-0.14, 0.10, -0.18, -0.50, 0.055),     // L thigh
    bone(0.14, 0.10, 0.18, -0.50, 0.055),       // R thigh
  ],
};

// ── ADVOCATE — a lawyer working a jury ───────────────────────────────────────
// Identifier is the jury: a rail with a row of heads being addressed. One
// figure alone reads as "person standing"; the audience is what tells the story.
const advocate = {
  name: 'advocate',
  blobs: [
    blob(-0.52, 0.90, 0.13, 1.1),                                  // advocate head
    blob(0.30, 0.30, 0.085, 0.9), blob(0.56, 0.34, 0.085, 0.9),    // jury heads
    blob(0.82, 0.30, 0.085, 0.9), blob(0.43, 0.06, 0.085, 0.9),
    blob(0.69, 0.06, 0.085, 0.9),
  ],
  bones: [
    bone(-0.52, 0.77, -0.54, 0.10, 0.07, 1.1),  // spine
    bone(-0.72, 0.72, -0.34, 0.72, 0.05),       // shoulders
    bone(-0.34, 0.72, -0.10, 0.62, 0.045, 1.4), // arm extended toward the jury
    bone(-0.10, 0.62, 0.10, 0.56, 0.04, 1.4),   // forearm, presenting
    bone(-0.72, 0.72, -0.80, 0.48, 0.045),      // other arm down
    bone(-0.66, 0.10, -0.42, 0.10, 0.055),      // hips
    bone(-0.66, 0.10, -0.70, -0.52, 0.055),     // L thigh
    bone(-0.70, -0.52, -0.72, -1.14, 0.045),    // L shin
    bone(-0.42, 0.10, -0.38, -0.52, 0.055),     // R thigh
    bone(-0.38, -0.52, -0.36, -1.14, 0.045),    // R shin
    bone(0.18, -0.12, 0.94, -0.12, 0.05, 1.5),  // JURY RAIL
  ],
};

export const POSES = [golfer, quarterback, speaker, advocate];

// deterministic PRNG — the figure must be identical every reload, or the
// morph target would shuffle under the springs on each mount
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Distribute exactly `count` points across a pose's bones and blobs, weighted
 * so identifying features (the club, the lectern, the jury rail) stay dense.
 *
 * Returns THREE.Vector3[] in the field's world space. A little z-spread is
 * applied on purpose: a perfectly flat figure disappears the instant the
 * camera moves off axis.
 */
export function samplePose(pose, count, scale = 2.0, depth = 0.32) {
  const rnd = mulberry32(0x9e3779b9);

  const items = [
    ...pose.bones.map((b) => {
      const len = Math.hypot(b.x2 - b.x1, b.y2 - b.y1);
      return { kind: 'bone', ref: b, mass: (len + 0.05) * (b.w ?? 1) };
    }),
    ...pose.blobs.map((s) => ({ kind: 'blob', ref: s, mass: Math.PI * s.r * s.r * 5 * (s.w ?? 1) })),
  ];

  const total = items.reduce((a, i) => a + i.mass, 0);

  // largest-remainder allocation, so the counts sum to exactly `count`
  const alloc = items.map((i) => (i.mass / total) * count);
  const base = alloc.map(Math.floor);
  let left = count - base.reduce((a, b) => a + b, 0);
  items
    .map((_, i) => i)
    .sort((a, b) => (alloc[b] - base[b]) - (alloc[a] - base[a]))
    .forEach((i) => { if (left > 0) { base[i]++; left--; } });

  const out = [];
  items.forEach((item, i) => {
    const n = base[i];
    for (let k = 0; k < n; k++) {
      let x, y;
      if (item.kind === 'bone') {
        const b = item.ref;
        const t = n === 1 ? 0.5 : k / (n - 1);
        // jitter perpendicular to the bone so limbs read as mass, not wire
        const dx = b.x2 - b.x1, dy = b.y2 - b.y1;
        const L = Math.hypot(dx, dy) || 1;
        const px = -dy / L, py = dx / L;
        const off = (rnd() * 2 - 1) * b.t;
        x = b.x1 + dx * t + px * off;
        y = b.y1 + dy * t + py * off;
      } else {
        const s = item.ref;
        const a = rnd() * Math.PI * 2;
        const r = Math.sqrt(rnd()) * s.r;      // sqrt = uniform over the disc
        x = s.x + Math.cos(a) * r;
        y = s.y + Math.sin(a) * r;
      }
      out.push(new THREE.Vector3(x * scale, y * scale, (rnd() * 2 - 1) * depth));
    }
  });

  return out;
}

/** All four poses sampled for a given node count. Cached per count. */
const cache = new Map();
export function getPoseTargets(count) {
  if (!cache.has(count)) {
    cache.set(count, POSES.map((p) => samplePose(p, count)));
  }
  return cache.get(count);
}

export default POSES;
