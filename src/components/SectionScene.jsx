import { Suspense, useState, useEffect, useRef } from 'react';
import getPerfProfile from '../three/perfProfiles';

/**
 * SectionScene — mounts a section's WebGL scene ONLY while it is on screen.
 *
 * Three live canvases rendering at 60fps whether or not you can see them is how
 * a page like this ends up draining a laptop battery. The IntersectionObserver
 * mounts on approach (rootMargin gives it a head start so it is never caught
 * fading in) and unmounts once well past, releasing the WebGL context — which
 * also keeps us clear of the browser's per-page context limit.
 *
 * Reduced motion still renders, but the scene itself switches to frameloop
 * 'demand' so it paints one static frame and then stops.
 */
const SectionScene = ({ Scene, className = '', ...sceneProps }) => {
  const hostRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [profile] = useState(getPerfProfile);
  const [reduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '25% 0px 25% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={hostRef} className={className} aria-hidden="true">
      {visible && (
        <Suspense fallback={null}>
          <Scene reduced={reduced} profile={profile} {...sceneProps} />
        </Suspense>
      )}
    </div>
  );
};

export default SectionScene;
