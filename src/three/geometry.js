import * as THREE from 'three';

// Shared lattice maths. Extracted so every scene on the page is provably the
// SAME system in a different state — hero (intact), problem section
// (fracturing), HIOS section (its core). If these ever diverged, the visual
// argument the page is making would quietly stop being true.

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

// Canonical phyllotaxis (fibonacci) sphere — even, organic distribution.
export function fibonacciSphere(n, radius) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / Math.max(1, n - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = i * GOLDEN_ANGLE;
    pts.push(new THREE.Vector3(Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius));
  }
  return pts;
}

// Each node links to its k nearest neighbours — enough to read as a lattice,
// cheap enough to re-upload every frame.
export function computeEdges(base, count, k = 2) {
  const pairs = [];
  const seen = new Set();
  for (let i = 0; i < count; i++) {
    const dists = [];
    for (let j = 0; j < count; j++) if (j !== i) dists.push([j, base[i].distanceToSquared(base[j])]);
    dists.sort((a, b) => a[1] - b[1]);
    for (let n = 0; n < k && n < dists.length; n++) {
      const j = dists[n][0];
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (!seen.has(key)) { seen.add(key); pairs.push([i, j]); }
    }
  }
  return pairs;
}

// ambient stardust — a soft luminous shell around a core
export function makeDust(n, rMin, rMax) {
  const arr = new Float32Array(n * 3);
  const v = new THREE.Vector3();
  for (let i = 0; i < n; i++) {
    v.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1).normalize()
      .multiplyScalar(rMin + Math.random() * (rMax - rMin));
    arr[i * 3] = v.x; arr[i * 3 + 1] = v.y; arr[i * 3 + 2] = v.z;
  }
  return arr;
}
