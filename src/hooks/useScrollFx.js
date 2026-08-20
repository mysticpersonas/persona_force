import { useEffect } from 'react';

/**
 * useScrollFx — scroll-linked transforms that never re-render React.
 *
 * The callback receives a 0..1 progress and writes styles straight to the DOM
 * node. Putting this through useState would re-render the whole page on every
 * frame of every scroll; here the tree is untouched and only the element's
 * style object changes.
 *
 * All subscribers share ONE rAF loop — N hooks would otherwise mean N loops
 * each calling getBoundingClientRect.
 */

const subs = new Set();
let raf = null;

function tick() {
  const vh = window.innerHeight || 1;
  for (const fn of subs) fn(vh);
  raf = subs.size ? requestAnimationFrame(tick) : null;
}

function subscribe(fn) {
  subs.add(fn);
  if (!raf) raf = requestAnimationFrame(tick);
  return () => {
    subs.delete(fn);
    if (!subs.size && raf) { cancelAnimationFrame(raf); raf = null; }
  };
}

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

/**
 * @param ref     element to drive
 * @param apply   (progress, el) => void
 * @param mode    'exit'  → 0 while the element fills the viewport, 1 once it has
 *                          scrolled a full viewport upward. For things that LEAVE.
 *                'enter' → 0 as the top crosses the viewport bottom, 1 once it has
 *                          risen ~65% of the viewport. For things that ARRIVE.
 */
export default function useScrollFx(ref, apply, mode = 'enter') {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced motion jumps straight to the RESTING state, which is a different
    // end of the range for each mode: an 'exit' element rests at 0 (still fully
    // present, it has not left yet), an 'enter' element rests at 1 (it has
    // arrived). Applying 1 to both would leave the hero copy at opacity 0 —
    // invisible for exactly the users who opted out of motion.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      apply(mode === 'exit' ? 0 : 1, el);
      return;
    }

    const measure = (vh) => {
      const r = el.getBoundingClientRect();
      // skip work when the element is nowhere near the viewport
      if (r.bottom < -vh || r.top > vh * 2) return;
      const p = mode === 'exit'
        ? clamp01(-r.top / vh)
        : clamp01((vh - r.top) / (vh * 0.65));
      apply(p, el);
    };

    measure(window.innerHeight || 1);   // paint the correct state immediately
    return subscribe(measure);
    // apply/mode are stable for the lifetime of these call sites
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, mode]);
}
