import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { scrollStore } from '../three/scrollStore';

gsap.registerPlugin(ScrollTrigger);

// Dev-only handles. The story timeline scrubs storyState every frame, so without
// a way to pause it you cannot hold a pose still long enough to art-direct it.
if (import.meta.env?.DEV && typeof window !== 'undefined') {
  window.__gsap = gsap;
  window.__ScrollTrigger = ScrollTrigger;
}

/**
 * useSmoothScroll — app-wide Lenis smooth/inertial scroll (spec v2 §1, §3).
 * The "expensive feel" substrate. Exposes velocity + progress + pointer into
 * scrollStore so the WebGL field can react to scroll speed, depth, and cursor.
 *
 * Respects prefers-reduced-motion: falls back to native scroll, leaves the
 * store at rest (still field).
 */
export default function useSmoothScroll() {
  // global pointer → scrollStore (works even under a click-through fixed canvas)
  useEffect(() => {
    let idle;

    const onMove = (e) => {
      scrollStore.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      scrollStore.pointerY = -((e.clientY / window.innerHeight) * 2 - 1);
      scrollStore.pointerActive = 1;
      // pressure is something you APPLY — let it lift when the cursor rests,
      // otherwise a parked mouse leaves a permanent dent in the field
      clearTimeout(idle);
      idle = setTimeout(() => { scrollStore.pointerActive = 0; }, 2200);
    };
    const onLeave = () => { scrollStore.pointerActive = 0; };
    const onDown = () => { scrollStore.pressBoost = 1; };
    const onUp = () => { scrollStore.pressBoost = 0; };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    window.addEventListener('pointercancel', onUp, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    return () => {
      clearTimeout(idle);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  // Native scroll → store. This ALWAYS runs, and is what keeps the 3D journey
  // alive where Lenis doesn't drive it: touch scrolling (Lenis leaves touch
  // native by default) and reduced-motion, where Lenis never starts at all.
  // Lenis writes the same values when it is running, so the two agree.
  useEffect(() => {
    let ticking = false;
    let lastY = window.scrollY;
    let lastT = performance.now();

    const read = () => {
      ticking = false;
      const vh = window.innerHeight || 1;
      const y = window.scrollY;
      const now = performance.now();
      const dt = Math.max(1, now - lastT);

      // px/frame at 60fps, so it matches the units Lenis reports as `velocity`
      scrollStore.velocity = ((y - lastY) / dt) * 16.67;
      scrollStore.progress = Math.min(1, Math.max(0, y / vh));
      const max = document.documentElement.scrollHeight - vh;
      scrollStore.pageProgress = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;

      lastY = y; lastT = now;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(read);
    };

    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Lenis smooth scroll (skipped under reduced-motion — native scroll instead)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1 });

    // ── Lenis ↔ ScrollTrigger ────────────────────────────────────────────
    // These two MUST share a clock. Left alone, Lenis runs its own rAF and
    // ScrollTrigger reads scroll position on a different tick, so every
    // trigger fires at a slightly wrong place and pinned sections visibly
    // stutter. Driving Lenis from gsap.ticker and updating ScrollTrigger on
    // Lenis's own scroll event keeps them frame-locked.
    // lagSmoothing(0) stops GSAP from "helpfully" skipping time after a long
    // frame, which would otherwise desync a scrubbed timeline.
    const raf = (time) => lenis.raf(time * 1000);   // gsap gives seconds, Lenis wants ms
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const onScroll = ({ velocity, scroll }) => {
      scrollStore.velocity = velocity || 0;
      const vh = window.innerHeight || 1;
      const y = scroll ?? window.scrollY;
      scrollStore.progress = Math.min(1, Math.max(0, y / vh));
      // NOTE: pinning inflates scrollHeight, so this is a "how far down the
      // document" reading, not story progress. The story is driven entirely by
      // per-act ScrollTriggers in storyTimeline.js — never by this number.
      const max = document.documentElement.scrollHeight - vh;
      scrollStore.pageProgress = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
    };
    lenis.on('scroll', onScroll);

    return () => {
      gsap.ticker.remove(raf);
      lenis.off('scroll', ScrollTrigger.update);
      lenis.off('scroll', onScroll);
      lenis.destroy();
      scrollStore.velocity = 0;
    };
  }, []);
}
