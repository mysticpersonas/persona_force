import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { makeDust } from './geometry';
import { scrollStore } from './scrollStore';

/**
 * IdentityCore — STATE THREE of the page's one system.
 *
 * Hero: the lattice intact. Problem section: the lattice fracturing. Here: the
 * CORE that holds it — the operating system underneath. So this reads as
 * structure rather than as a cloud: nested wireframe shells locked in
 * counter-rotation around a solid nucleus, orbited by the same dust the hero
 * uses. Ordered where the others are organic.
 *
 * Dark surface, so additive blending and a real glow are back on.
 */
function CoreBody({ accent, accent2, reduced }) {
  const outer = useRef();
  const mid = useRef();
  const nucleus = useRef();
  const halo = useRef();
  const t0 = useRef(performance.now());

  const dust = useMemo(() => makeDust(180, 2.3, 3.6), []);

  useFrame(() => {
    const t = (performance.now() - t0.current) / 1000;
    // scroll velocity loads the core exactly as it strains the hero lattice —
    // same input, same meaning, different body
    const strain = reduced ? 0 : Math.min(1, Math.abs(scrollStore.velocity) / 30);

    if (outer.current) {
      outer.current.rotation.y += 0.0022 + strain * 0.004;
      outer.current.rotation.x = Math.sin(t * 0.19) * 0.22;
      const s = 1 + strain * 0.12;
      outer.current.scale.setScalar(s);
    }
    // counter-rotation is what makes nested shells read as a MECHANISM
    if (mid.current) {
      mid.current.rotation.y -= 0.0035 + strain * 0.005;
      mid.current.rotation.z = Math.cos(t * 0.23) * 0.3;
    }
    if (nucleus.current) {
      const pulse = 1 + Math.sin(t * 1.5) * 0.045 + strain * 0.1;
      nucleus.current.scale.setScalar(pulse);
    }
    if (halo.current) halo.current.rotation.y += 0.0009;
  });

  return (
    <group>
      <mesh ref={outer}>
        <icosahedronGeometry args={[1.62, 1]} />
        <meshBasicMaterial color={accent} wireframe transparent opacity={0.34} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      <mesh ref={mid}>
        <icosahedronGeometry args={[1.08, 0]} />
        <meshBasicMaterial color={accent2} wireframe transparent opacity={0.5} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* Kept dim and small on purpose: the section's numeral sits directly on
          this, and a bright solid nucleus washed it out. The wireframe shells
          carry the read; the nucleus is only a centre of gravity. */}
      <mesh ref={nucleus}>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshBasicMaterial color={accent2} transparent opacity={0.22} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      <points ref={halo}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dust, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.032} color={accent} transparent opacity={0.55} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
      </points>
    </group>
  );
}

const IdentityCore = ({ reduced = false, profile, accent = '#3b6fe8', accent2 = '#00AEEF' }) => (
  <Canvas
    camera={{ position: [0, 0, 5.4], fov: 45 }}
    dpr={[1, profile?.maxDpr ?? 2]}
    gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
    frameloop={reduced ? 'demand' : 'always'}
  >
    <CoreBody accent={accent} accent2={accent2} reduced={reduced} />
  </Canvas>
);

export default IdentityCore;
