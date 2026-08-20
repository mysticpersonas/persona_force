import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { fibonacciSphere, computeEdges } from './geometry';

/**
 * LatticeFracture — STATE TWO of the page's one system.
 *
 * The hero shows the constellation intact. This is the same lattice under a
 * load it cannot hold: a fault plane sweeps through, nodes on either side pull
 * apart, and the connections spanning the fault stretch and go dim before the
 * system eases back. That is the section's argument — "what is costing you
 * results" is a structure coming apart — drawn instead of stated.
 *
 * Rendered for a LIGHT surface: normal blending, dark ink, no bloom. The hero's
 * additive glow would be literally invisible on white.
 */
function FractureBody({ count, radius, ink }) {
  const groupRef = useRef();
  const nodeGeoRef = useRef();
  const edgeGeoRef = useRef();
  const edgeMatRef = useRef();
  const t0 = useRef(performance.now());

  const sim = useMemo(() => {
    const base = fibonacciSphere(count, radius);
    const edges = computeEdges(base, count, 2);
    return {
      base,
      edges,
      nodePos: new Float32Array(count * 3),
      edgePos: new Float32Array(edges.length * 6),
      // rest length per edge, so we can measure how far each one is stretched
      rest: edges.map(([i, j]) => base[i].distanceTo(base[j])),
      cur: base.map((v) => v.clone()),
    };
  }, [count, radius]);

  useFrame(() => {
    const { base, cur, edges, nodePos, edgePos, rest } = sim;
    const t = (performance.now() - t0.current) / 1000;

    // The fault is a plane whose normal rotates slowly; `open` is how far the
    // two halves have separated. It breathes — apart, then back — because a
    // permanent break would read as broken rather than as strain.
    const open = (Math.sin(t * 0.42) * 0.5 + 0.5) ** 1.7;
    const nx = Math.cos(t * 0.17), nz = Math.sin(t * 0.17);

    for (let i = 0; i < count; i++) {
      const b = base[i];
      const side = b.x * nx + b.z * nz >= 0 ? 1 : -1;       // which half of the fault
      const push = side * open * 0.62;
      // shear along the fault as well as separation — pure separation looks
      // like an explosion; shear looks like a structure failing
      cur[i].set(b.x + nx * push, b.y + side * open * 0.14, b.z + nz * push);
      const o = i * 3;
      nodePos[o] = cur[i].x; nodePos[o + 1] = cur[i].y; nodePos[o + 2] = cur[i].z;
    }

    let strained = 0;
    for (let e = 0; e < edges.length; e++) {
      const [i, j] = edges[e];
      const a = cur[i], b2 = cur[j];
      const o = e * 6;
      edgePos[o] = a.x;     edgePos[o + 1] = a.y;     edgePos[o + 2] = a.z;
      edgePos[o + 3] = b2.x; edgePos[o + 4] = b2.y;   edgePos[o + 5] = b2.z;
      if (a.distanceTo(b2) > rest[e] * 1.35) strained++;
    }

    // connections spanning the fault fade the whole lattice's line weight —
    // the more of the system is under strain, the fainter it holds together
    if (edgeMatRef.current) {
      edgeMatRef.current.opacity = 0.4 - (strained / edges.length) * 0.22;
    }
    if (nodeGeoRef.current) nodeGeoRef.current.attributes.position.needsUpdate = true;
    if (edgeGeoRef.current) edgeGeoRef.current.attributes.position.needsUpdate = true;
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0016;
      groupRef.current.rotation.x = Math.sin(t * 0.11) * 0.16;
    }
  });

  return (
    <group ref={groupRef}>
      <points frustumCulled={false}>
        <bufferGeometry ref={nodeGeoRef}>
          <bufferAttribute attach="attributes-position" args={[sim.nodePos, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.06} color={ink} transparent opacity={0.8} sizeAttenuation depthWrite={false} />
      </points>

      <lineSegments frustumCulled={false}>
        <bufferGeometry ref={edgeGeoRef}>
          <bufferAttribute attach="attributes-position" args={[sim.edgePos, 3]} />
        </bufferGeometry>
        <lineBasicMaterial ref={edgeMatRef} color={ink} transparent opacity={0.4} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

const LatticeFracture = ({ reduced = false, profile }) => (
  <Canvas
    camera={{ position: [0, 0, 6.2], fov: 42 }}
    dpr={[1, profile?.maxDpr ?? 2]}
    gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
    frameloop={reduced ? 'demand' : 'always'}
  >
    <FractureBody count={profile?.mobile ? 46 : 78} radius={2.3} ink="#2450c4" />
  </Canvas>
);

export default LatticeFracture;
