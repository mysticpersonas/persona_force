import { useEffect, useState } from 'react';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// True while the element is on screen. Drives the mobile sticky CTA.
export function useInView(ref, options) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), options);
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
  return inView;
}

// Gentle fade-up for below-the-fold blocks. Elements start visible in CSS
// unless JS is running, and reduced-motion users never get the transform.
export function useReveal(revealClass, revealedClass) {
  useEffect(() => {
    const nodes = document.querySelectorAll(`.${revealClass}`);
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      nodes.forEach((n) => n.classList.add(revealedClass));
      return;
    }
    // Arm the hidden state only for blocks still below the fold, so nothing
    // already on screen blinks out after hydration.
    nodes.forEach((n) => {
      if (n.getBoundingClientRect().top < window.innerHeight) n.classList.add(revealedClass);
    });
    document.querySelector('[data-page="trader-event"]')?.setAttribute('data-reveal', 'on');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add(revealedClass);
          io.unobserve(e.target);
        }
      }),
      { rootMargin: '0px 0px -8% 0px' },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [revealClass, revealedClass]);
}
