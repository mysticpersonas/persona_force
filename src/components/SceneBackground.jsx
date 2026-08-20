import { Suspense, lazy, useState, useEffect } from 'react';
import getPerfProfile from '../three/perfProfiles';

// The one WebGL scene, lazy so 2D paints first.
const ConstellationScene = lazy(() => import('../three/ConstellationHero'));

/**
 * SceneBackground — the constellation lives FIXED behind the entire page
 * (spec v2: "one element, many states"). All 2D content scrolls over it, so
 * the whole page reads as one continuous 3D space. Click-through
 * (pointer-events-none); the field reacts to the global pointer + scroll store.
 */
const SceneBackground = ({ config }) => {
  const [profile] = useState(getPerfProfile);
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 160);
    return () => clearTimeout(id);
  }, []);

  const accent = config.accent || '#3b6fe8';

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      {/* nebula poster — always behind the canvas, no flash */}
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(ellipse at 50% 32%, ${accent}16, transparent 66%)` }}
      />
      {mounted && (
        <Suspense fallback={null}>
          <ConstellationScene config={config} reduced={reduced} profile={profile} />
        </Suspense>
      )}
    </div>
  );
};

export default SceneBackground;
