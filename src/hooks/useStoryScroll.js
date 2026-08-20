import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { createStoryTimeline } from '../three/storyTimeline';

gsap.registerPlugin(ScrollTrigger);

/**
 * useStoryScroll — mounts the scroll story and the section reveals.
 *
 * Runs in a layout-safe effect AFTER the DOM exists, because every trigger is
 * anchored to a real [data-act] section. Everything is created inside a
 * gsap.context so a single revert() cleans up tweens, triggers and pins on
 * unmount — which matters on a SPA where the user can route away mid-journey.
 */
export default function useStoryScroll(enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    let killTimeline = () => {};

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Gate the CSS hidden state on JS being alive AND willing to animate.
    // Reduced motion never gets the class, so those users just see the page.
    if (!reduced) document.documentElement.classList.add('pf-story');

    const ctx = gsap.context(() => {
      killTimeline = createStoryTimeline();

      // ── Section reveals ────────────────────────────────────────────────
      // These are the beats "popping up" as the camera arrives. Batched so one
      // observer handles every element instead of one ScrollTrigger each, and
      // stagger makes a group of cards land as a group rather than in lockstep.
      if (!reduced) {
        gsap.set('[data-reveal]', { opacity: 0, y: 26, filter: 'blur(6px)' });
        ScrollTrigger.batch('[data-reveal]', {
          start: 'top 88%',
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.9,
              ease: 'power3.out',
              stagger: 0.09,
              overwrite: true,
            }),
        });
      } else {
        // resting state: everything simply present
        gsap.set('[data-reveal]', { opacity: 1, y: 0, filter: 'blur(0px)' });
      }
    });

    // Fonts and the Wistia embed change layout after first paint, which would
    // otherwise leave every trigger measured against a stale page height.
    const refresh = () => ScrollTrigger.refresh();
    const t = setTimeout(refresh, 400);
    window.addEventListener('load', refresh);
    if (document.fonts?.ready) document.fonts.ready.then(refresh).catch(() => {});

    return () => {
      clearTimeout(t);
      window.removeEventListener('load', refresh);
      killTimeline();
      ctx.revert();
      document.documentElement.classList.remove('pf-story');
    };
  }, [enabled]);
}
