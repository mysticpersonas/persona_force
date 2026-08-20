// Performance profiles (spec §7). The 3D hero degrades DOWN:
// desktop showcase → mobile light → static fallback.
export function getPerfProfile() {
  const w = typeof window !== 'undefined' ? window.innerWidth : 1280;
  const mobile = w < 768;
  // crude low-end signal: few logical cores
  const lowEnd = typeof navigator !== 'undefined' && (navigator.hardwareConcurrency || 8) <= 4;

  return {
    mobile,
    maxDpr: mobile ? 1.5 : 2,
    // hard cap on node count for small screens (config may request fewer)
    nodeCap: mobile ? 54 : 102,
    // bloom is the expensive pass — drop it on low-end mobile
    bloom: !(mobile && lowEnd),
    frameloop: 'always',
  };
}

export default getPerfProfile;
