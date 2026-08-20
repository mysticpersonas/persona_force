import { useFrame, useThree, Canvas } from '@react-three/fiber';
import { AdaptiveDpr, Preload } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import ConstellationField from './ConstellationField';
import IdentityCoreGroup from './IdentityCoreGroup';
import DepthScene from './DepthScene';
import { scrollStore } from './scrollStore';
import { storyState } from './storyState';

// ── The scroll journey ────────────────────────────────────────────────────────
// The camera no longer derives its own path from raw scroll. It reads a pose
// that GSAP scrubs (storyTimeline.js), so the journey is authored beat-by-beat
// against real sections rather than being a formula of scroll percentage.
//
// The one number that matters: camDist crosses BELOW the lattice radius (2.4)
// during the cutaway act. That is the moment the camera stops looking at the
// system and is inside it.
function CameraRig() {
  const { camera } = useThree();
  useFrame(() => {
    const s = storyState;

    const targetX = Math.sin(s.camOrbit) * s.camDist * 0.55 + scrollStore.pointerX * 0.42;
    const targetZ = Math.cos(s.camOrbit) * s.camDist;
    const targetY = s.camRise + scrollStore.pointerY * 0.28;

    // slow lerp = the camera has mass; it arrives after you stop, not with you
    camera.position.x += (targetX - camera.position.x) * 0.045;
    camera.position.y += (targetY - camera.position.y) * 0.045;
    camera.position.z += (targetZ - camera.position.z) * 0.045;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/**
 * ConstellationHero — the config-driven ethereal WebGL scene (spec §6 / v2 §2).
 * Transparent canvas; page copy sits on top in 2D. Lazy-loaded by SceneBackground.
 */
const ConstellationHero = ({ config, reduced = false, profile }) => {
  const accent = config.accent || '#3b6fe8';
  const accent2 = config.accent2 || '#00AEEF';
  const shadow = config.shadow || '#7c3bed';
  const count = Math.min(config.nodeCount ?? 102, profile.nodeCap);
  const bloomIntensity = config.bloomIntensity ?? 0.7;

  return (
    <Canvas
      camera={{ position: [0, 0, 8.6], fov: 45, near: 0.08, far: 60 }}
      dpr={[1, profile.maxDpr]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop={reduced ? 'demand' : 'always'}
    >
      <ConstellationField
        count={count}
        accent={accent}
        accent2={accent2}
        shadow={shadow}
        nodeSize={profile.mobile ? 0.85 : 1.05}
        reduced={reduced}
      />

      {/* Imagery rides in the SAME canvas, screen-locked and behind everything. */}
      <DepthScene accent={accent} reduced={reduced} />

      {/* The core lives INSIDE this scene now, not in its own canvas — that is
          what lets the camera fly from outside the shell to the centre in one
          continuous move. */}
      <IdentityCoreGroup accent={accent} accent2={accent2} reduced={reduced} />

      {!reduced && <CameraRig />}

      {profile.bloom && (
        <EffectComposer disableNormalPass>
          <Bloom
            intensity={bloomIntensity}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            radius={0.85}
            mipmapBlur
          />
          {/* pulls the corners down so page copy always wins the contrast fight */}
          <Vignette offset={0.32} darkness={0.55} />
        </EffectComposer>
      )}

      <AdaptiveDpr pixelated={false} />
      <Preload all />
    </Canvas>
  );
};

export default ConstellationHero;
