import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { makeDust } from './geometry';
import { scrollStore } from './scrollStore';
import { storyState } from './storyState';

/**
 * IdentityCoreGroup — the core at the centre of the SAME sphere the hero looks
 * at from outside.
 *
 * This used to be its own <Canvas>, which made the "fly through the shell into
 * the core" beat impossible: you cannot move one camera between two canvases.
 * It is now a plain <group> living inside the main scene, so the journey is
 * genuinely continuous.
 *
 * Visibility is driven by storyState.coreReveal, which the cutaway act ramps up
 * as the camera crosses the shell.
 */
const IdentityCoreGroup = ({ accent = '#3b6fe8', accent2 = '#00AEEF', reduced = false }) => {
  const group = useRef();
  const outer = useRef();
  const mid = useRef();
  const halo = useRef();
  const t0 = useRef(performance.now());

  const dust = useMemo(() => makeDust(180, 0.9, 1.5), []);

  useFrame(() => {
    const t = (performance.now() - t0.current) / 1000;
    const reveal = storyState.coreReveal;

    // Skip all per-frame work while the core is invisible — for most of the
    // page this group costs nothing.
    if (group.current) {
      group.current.visible = reveal > 0.005;
      if (!group.current.visible) return;
    }

    // scroll velocity loads the core exactly as it strains the outer lattice —
    // same input, same meaning, different body
    const strain = reduced ? 0 : Math.min(1, Math.abs(scrollStore.velocity) / 30);

    const setOpacity = (ref, base) => {
      if (ref.current) ref.current.material.opacity = base * reveal;
    };
    setOpacity(outer, 0.34);
    setOpacity(mid, 0.5);
    setOpacity(halo, 0.55);

    if (outer.current) {
      outer.current.rotation.y += 0.0022 + strain * 0.004;
      outer.current.rotation.x = Math.sin(t * 0.19) * 0.22;
      outer.current.scale.setScalar(1 + strain * 0.12);
    }
    // counter-rotation is what makes nested shells read as a MECHANISM
    if (mid.current) {
      mid.current.rotation.y -= 0.0035 + strain * 0.005;
      mid.current.rotation.z = Math.cos(t * 0.23) * 0.3;
    }
    // the whole core breathes instead, so the pulse survives the nucleus removal
    if (group.current) {
      group.current.scale.setScalar(1 + Math.sin(t * 1.5) * 0.03 + strain * 0.08);
    }
    if (halo.current) halo.current.rotation.y += 0.0009;
  });

  return (
    <group ref={group} visible={false}>
      <mesh ref={outer}>
        <icosahedronGeometry args={[0.86, 1]} />
        <meshBasicMaterial color={accent} wireframe transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      <mesh ref={mid}>
        <icosahedronGeometry args={[0.56, 0]} />
        <meshBasicMaterial color={accent2} wireframe transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* NO solid nucleus. A mesh with additive blending and a flat colour can
          only ever render as a hard-edged polygon disc — at this camera range it
          read as a teal blob parked behind the copy, not as a glow. The two
          counter-rotating shells plus the halo already define the core, and the
          section's own numeral supplies the focal point. */}

      <points ref={halo}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dust, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.02} color={accent} transparent opacity={0} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
      </points>
    </group>
  );
};

export default IdentityCoreGroup;
