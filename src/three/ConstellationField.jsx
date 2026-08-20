import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollStore } from './scrollStore';
import { storyState } from './storyState';
import { fibonacciSphere, computeEdges, makeDust } from './geometry';
import { getPoseTargets, samplePose } from './poses';
import { POSES } from './poses';
import { NODE_VERT, NODE_FRAG, EDGE_VERT, EDGE_FRAG } from './shaders';

/**
 * ConstellationField — the one ethereal node system, and the site's whole thesis
 * rendered as a mechanism rather than stated as a claim:
 *
 *   1. FORMATION  nodes arrive from scatter and stagger into a settled sphere.
 *                 Chaos → identity holds. Plays once, on load.
 *   2. PRESSURE   the cursor is a pressure well. Nodes inside it are displaced,
 *                 swell, and shift from brand blue into shadow violet — then
 *                 return the moment pressure lifts. That IS "who shows up under
 *                 pressure", demonstrated instead of asserted.
 *   3. STRAIN     scroll velocity loads the whole system: the sphere expands and
 *                 every connection brightens.
 *
 * Node physics run on the CPU (102 nodes — trivial); everything expensive
 * (glow, twinkle, colour blending, travelling signal pulses) runs on the GPU.
 */
const ConstellationField = ({
  count = 102,
  radius = 2.4,
  accent = '#3b6fe8',
  accent2 = '#00AEEF',
  shadow = '#7c3bed',
  nodeSize = 1.05,
  pressure = 0.7,
  reduced = false,
}) => {
  const groupRef = useRef();
  const nodeGeoRef = useRef();
  const edgeGeoRef = useRef();
  const dustRef = useRef();
  const dust2Ref = useRef();
  const nodeMatRef = useRef();
  const edgeMatRef = useRef();
  const start = useRef(performance.now());

  const dust = useMemo(() => makeDust(520, 3.2, 6.5), []);
  // The near dust already exists and does nothing but drift. Recruiting it into
  // the figure takes the silhouette from 102 points to ~620 — which is the
  // difference between a scatter and a readable human shape, at zero new cost.
  const DUST_N = 520;
  const dustPoses = useMemo(() => POSES.map((p) => samplePose(p, DUST_N)), []);
  const dustFar = useMemo(() => makeDust(340, 6.5, 11), []);

  // ── static geometry + buffers, rebuilt only if the config actually changes ──
  const sim = useMemo(() => {
    const base = fibonacciSphere(count, radius);
    const edges = computeEdges(base, count);
    // one sampled figure per pose, same node count as the sphere so every node
    // has a 1:1 destination and the morph is a straight lerp
    const poses = getPoseTargets(count);

    const nodePos = new Float32Array(count * 3);
    const aSeed = new Float32Array(count);
    const aMix = new Float32Array(count);
    const aStress = new Float32Array(count);
    // start scattered — this is the "chaos" the formation resolves
    const cur = base.map((v) => {
      const dir = new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1).normalize();
      return v.clone().addScaledVector(dir, 2.2 + Math.random() * 2.6);
    });
    for (let i = 0; i < count; i++) {
      aSeed[i] = Math.random();
      aMix[i] = i / Math.max(1, count - 1);
      nodePos[i * 3] = cur[i].x; nodePos[i * 3 + 1] = cur[i].y; nodePos[i * 3 + 2] = cur[i].z;
    }

    const edgePos = new Float32Array(edges.length * 6);
    const edgeT = new Float32Array(edges.length * 2);
    const edgePhase = new Float32Array(edges.length * 2);
    const edgeStress = new Float32Array(edges.length * 2);
    for (let e = 0; e < edges.length; e++) {
      edgeT[e * 2] = 0; edgeT[e * 2 + 1] = 1;
      const ph = Math.random();
      edgePhase[e * 2] = ph; edgePhase[e * 2 + 1] = ph;
    }

    return {
      base, edges, cur, nodePos, aSeed, aMix, aStress, poses,
      edgePos, edgeT, edgePhase, edgeStress,
      pointerWorld: new THREE.Vector3(),
      strain: 0, press: 0,
    };
  }, [count, radius]);

  // Uniform objects are created ONCE and mutated in the frame loop — recreating
  // them would force three to recompile the shader program every render.
  const nodeUniforms = useMemo(() => ({
    uTime: { value: 0 },
    uSize: { value: nodeSize },
    uPixelRatio: { value: Math.min(2, typeof window !== 'undefined' ? window.devicePixelRatio : 1) },
    uCoreA: { value: new THREE.Color(accent) },
    uCoreB: { value: new THREE.Color(accent2) },
    uShadow: { value: new THREE.Color(shadow) },
    uOpacity: { value: 1 },
    uReduced: { value: reduced ? 1 : 0 },
  }), [accent, accent2, shadow, nodeSize, reduced]);

  const edgeUniforms = useMemo(() => ({
    uTime: { value: 0 },
    uCore: { value: new THREE.Color(accent) },
    uShadow: { value: new THREE.Color(shadow) },
    uBase: { value: 0.1 },
    uOpacity: { value: 1 },
    uReduced: { value: reduced ? 1 : 0 },
  }), [accent, shadow, reduced]);


  useFrame(() => {
    const s = sim;
    const { base, cur, edges, pointerWorld, nodePos, aSeed, aStress, edgePos, edgeStress } = s;
    const t = (performance.now() - start.current) / 1000;

    // ── Write through the MATERIAL's own uniforms, never the memo ─────────
    // THREE.ShaderMaterial CLONES the uniforms object it is constructed with.
    // Mutating the memoised object we passed as a prop therefore updates a
    // detached copy the renderer never reads — which silently pinned every
    // uniform at its mount value. The memo is now only the initial state; all
    // per-frame writes go here.
    const nu = nodeMatRef.current?.uniforms;
    const eu = edgeMatRef.current?.uniforms;
    if (!nu || !eu) return;   // materials not mounted yet

    nu.uTime.value = t;
    eu.uTime.value = t;

    // ── STORY STATE ───────────────────────────────────────────────────────
    const st = storyState;
    const frac = reduced ? 0 : st.fracture;
    const shell = reduced ? 0 : st.shellOpen;
    const reform = reduced ? 0 : st.reform;

    // ── hero montage ──────────────────────────────────────────────────────
    // The figure is a straight lerp of the spring TARGET, so it composes with
    // everything else rather than replacing it: formation still staggers, the
    // cursor still dents it, scroll strain still loads it.
    const poseAmt = reduced ? 0 : st.poseAmount;
    const poseTarget = poseAmt > 0.001 ? s.poses[st.poseIndex % s.poses.length] : null;

    // The shell has to actually GET OUT OF THE WAY for the camera to pass
    // through it — pushing it outward is not enough on its own, because from
    // the inside you would still be staring at the backs of the nodes.
    const shellFade = 1 - shell * 0.9;
    const bright = 1 + reform * 0.5;          // reassembly ends brighter than Act 1
    // Presence is AUTHORED per act (see ACTS in storyTimeline), not derived.
    // Deriving it from sceneAmount made the lattice look identical in every act
    // that happened to carry an image — which is exactly what flattened the page
    // into one repeated particle treatment. Now each beat gets its own weight:
    // the lattice leads in surface/core/reassembly and thins to a trace where a
    // photograph is doing the talking.
    const fade = (reduced ? 1 : st.fieldFade) * (reduced ? 1 : (st.field ?? 1));

    nu.uOpacity.value = fade * shellFade * bright;
    // edges dim faster than nodes: stretched connections are the visible cost
    // of the fault, and a starburst of long lines during the cutaway is noise
    // squared falloff: edges are long lines that span the whole viewport once
    // the camera is inside, so they have to clear out well before the nodes do
    // Edges are nearest-neighbour pairs of the SPHERE. In a pose those pairs are
    // meaningless, so the figure is drawn in points alone — like a star chart.
    const edgeClear = (1 - shell) * (1 - shell) * (1 - poseAmt);
    eu.uOpacity.value = fade * edgeClear * (1 - frac * 0.35) * bright;
    eu.uBase.value = 0.1 + reform * 0.06;

    if (import.meta.env?.DEV && typeof window !== 'undefined') {
window.__pfDebug = { poseAmt, shell, frac, reform, fade, bright,
        nodeOpacity: nu.uOpacity.value, edgeOpacity: eu.uOpacity.value };
    }
    if (dustRef.current) dustRef.current.material.opacity = 0.5 * fade * (1 - shell * 0.6);
    if (dust2Ref.current) dust2Ref.current.material.opacity = 0.28 * fade * (1 - shell * 0.6);

    // ── formation: 0 → 1 over ~2s, staggered per node by its seed ──
    const formT = reduced ? 1 : Math.min(1, Math.max(0, (t - 0.15) / 2.0));

    // ── scroll velocity → strain (expands the sphere, lights the lattice) ──
    const targetStrain = reduced ? 0 : Math.min(1.1, Math.abs(scrollStore.velocity) / 26);
    s.strain += (targetStrain - s.strain) * 0.1;
    s.press += (scrollStore.pressBoost - s.press) * 0.12;
    // radius: scroll strain expands slightly, the cutaway blows the shell
    // outward past the camera, reassembly pulls it in tighter than it started
    const expand = (1 + s.strain * 0.32) * (1 + shell * 1.75) * (1 - reform * 0.1);

    // The fault is a plane whose normal rotates slowly. Ported from the old
    // standalone LatticeFracture scene so the deformation is the same maths.
    const fnx = Math.cos(t * 0.17), fnz = Math.sin(t * 0.17);

    // under the fault, personas shift toward the shadow colour — the same
    // channel the cursor pressure well already drives
    const ambientStress = Math.min(0.55, s.strain * 0.38 + frac * 0.45);

    // global cursor (canvas is click-through, so we read our own pointer store)
    const pointerOn = reduced ? 0 : scrollStore.pointerActive;
    if (pointerOn > 0.001 && groupRef.current) {
      pointerWorld.set(scrollStore.pointerX * radius * 1.7, scrollStore.pointerY * radius * 1.7, 0);
      groupRef.current.worldToLocal(pointerWorld);
    }

    const wellR2 = 3.2 + s.press * 2.4;   // holding the mouse down widens the well
    const force = pressure * (1 + s.press * 0.9);

    for (let i = 0; i < count; i++) {
      const b = base[i];
      const c = cur[i];

      // per-node formation curve — low-seed nodes lock in first
      const raw = Math.min(1, Math.max(0, (formT - aSeed[i] * 0.35) / 0.65));
      const ease = raw * raw * (3 - 2 * raw);

      let px = 0, py = 0, pz = 0, stress = 0;
      if (pointerOn > 0.001 && formT > 0.75) {
        const dx = c.x - pointerWorld.x, dy = c.y - pointerWorld.y, dz = c.z - pointerWorld.z;
        const influence = Math.max(0, 1 - (dx * dx + dy * dy + dz * dz) / wellR2);
        const f = influence * force * pointerOn;
        px = dx * f; py = dy * f; pz = dz * f;
        stress = influence * pointerOn;
      }

      // fault shear: which side of the plane this node falls on decides which
      // way it is dragged. Shear as well as separation — pure separation reads
      // as an explosion, shear reads as a structure failing.
      const side = b.x * fnx + b.z * fnz >= 0 ? 1 : -1;
      const fx = fnx * side * frac * 0.62;
      const fy = side * frac * 0.14;
      const fz = fnz * side * frac * 0.62;

      // spring toward target; stiffness ramps in with formation so nodes glide
      // into place instead of snapping. Reassembly stiffens it — the system
      // holds its shape better at the end than it did at the start.
      const k = reduced ? 1 : (0.02 + ease * 0.09) * (1 + reform * 0.6);
      let tx = b.x * expand + fx + px;
      let ty = b.y * expand + fy + py;
      let tz = b.z * expand + fz + pz;

      if (poseTarget) {
        const q = poseTarget[i];
        tx += (q.x - tx) * poseAmt;
        ty += (q.y - ty) * poseAmt;
        tz += (q.z - tz) * poseAmt;
      }

      c.x += (tx - c.x) * k;
      c.y += (ty - c.y) * k;
      c.z += (tz - c.z) * k;

      const o = i * 3;
      nodePos[o] = c.x; nodePos[o + 1] = c.y; nodePos[o + 2] = c.z;

      // stress eases in/out rather than snapping — pressure has inertia
      const target = Math.min(1, stress + ambientStress);
      aStress[i] += (target - aStress[i]) * 0.14;
    }

    // In a pose the sphere's nearest-neighbour pairs are meaningless — they draw
    // a web from the clubhead to the feet. Collapse each segment to zero length
    // so it rasterises to nothing. Done geometrically rather than via opacity so
    // it cannot be defeated by anything in the material/uniform path.
    const collapseEdges = poseAmt > 0.02;

    for (let e = 0; e < edges.length; e++) {
      const [i, j] = edges[e];
      const a = cur[i], b2 = cur[j];
      const o = e * 6;
      if (collapseEdges) {
        edgePos[o] = a.x; edgePos[o + 1] = a.y; edgePos[o + 2] = a.z;
        edgePos[o + 3] = a.x; edgePos[o + 4] = a.y; edgePos[o + 5] = a.z;
        edgeStress[e * 2] = 0; edgeStress[e * 2 + 1] = 0;
        continue;
      }
      edgePos[o] = a.x; edgePos[o + 1] = a.y; edgePos[o + 2] = a.z;
      edgePos[o + 3] = b2.x; edgePos[o + 4] = b2.y; edgePos[o + 5] = b2.z;
      const st = Math.max(aStress[i], aStress[j]);
      edgeStress[e * 2] = st; edgeStress[e * 2 + 1] = st;
    }

    // ── recruit the dust into the figure ──────────────────────────────────
    if (dustRef.current) {
      const arr = dustRef.current.geometry.attributes.position.array;
      if (poseAmt > 0.002) {
        const dp = dustPoses[st.poseIndex % dustPoses.length];
        for (let i = 0; i < DUST_N; i++) {
          const o = i * 3;
          const q = dp[i];
          arr[o]     += (dust[o]     + (q.x - dust[o])     * poseAmt - arr[o])     * 0.12;
          arr[o + 1] += (dust[o + 1] + (q.y - dust[o + 1]) * poseAmt - arr[o + 1]) * 0.12;
          arr[o + 2] += (dust[o + 2] + (q.z - dust[o + 2]) * poseAmt - arr[o + 2]) * 0.12;
        }
        dustRef.current.geometry.attributes.position.needsUpdate = true;
        // the drift rotation has to unwind or the figure turns on its side
        dustRef.current.rotation.y *= 1 - poseAmt * 0.25;
        dustRef.current.rotation.z *= 1 - poseAmt * 0.25;
        dustRef.current.material.size = 0.028 + poseAmt * 0.028;
      } else if (arr[0] !== dust[0]) {
        for (let i = 0; i < DUST_N * 3; i++) arr[i] += (dust[i] - arr[i]) * 0.08;
        dustRef.current.geometry.attributes.position.needsUpdate = true;
        dustRef.current.material.size = 0.028;
      }
    }

    if (nodeGeoRef.current) {
      nodeGeoRef.current.attributes.position.needsUpdate = true;
      nodeGeoRef.current.attributes.aStress.needsUpdate = true;
    }
    if (edgeGeoRef.current) {
      edgeGeoRef.current.attributes.position.needsUpdate = true;
      edgeGeoRef.current.attributes.aStress.needsUpdate = true;
    }

    if (!reduced) {
      const pp = scrollStore.pageProgress;
      if (groupRef.current) {
        // the system turns faster the deeper you journey through the page
        groupRef.current.rotation.y += 0.0008 + pp * 0.0016;
        groupRef.current.rotation.x = Math.sin(t * 0.13) * 0.07 + pp * 0.4;
      }
      // counter-parallax: near dust and far dust drift opposite ways, which is
      // what actually sells depth on a flat screen
      if (dustRef.current) {
        dustRef.current.rotation.y -= 0.0004 + pp * 0.0008;
        dustRef.current.rotation.z += 0.0002;
      }
      if (dust2Ref.current) {
        dust2Ref.current.rotation.y += 0.00022;
        dust2Ref.current.rotation.x = Math.sin(t * 0.05) * 0.12;
      }
    }
  });

  return (
    <group>
      <group ref={groupRef}>
        {/* positions are rewritten every frame, so the bounding sphere three computed
            once at init is meaningless — skip culling rather than let it lie */}
        <points frustumCulled={false}>
          <bufferGeometry ref={nodeGeoRef}>
            <bufferAttribute attach="attributes-position" args={[sim.nodePos, 3]} />
            <bufferAttribute attach="attributes-aSeed" args={[sim.aSeed, 1]} />
            <bufferAttribute attach="attributes-aMix" args={[sim.aMix, 1]} />
            <bufferAttribute attach="attributes-aStress" args={[sim.aStress, 1]} />
          </bufferGeometry>
          <shaderMaterial
            ref={nodeMatRef}
            vertexShader={NODE_VERT}
            fragmentShader={NODE_FRAG}
            uniforms={nodeUniforms}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>

        <lineSegments frustumCulled={false}>
          <bufferGeometry ref={edgeGeoRef}>
            <bufferAttribute attach="attributes-position" args={[sim.edgePos, 3]} />
            <bufferAttribute attach="attributes-aEdgeT" args={[sim.edgeT, 1]} />
            <bufferAttribute attach="attributes-aPhase" args={[sim.edgePhase, 1]} />
            <bufferAttribute attach="attributes-aStress" args={[sim.edgeStress, 1]} />
          </bufferGeometry>
          <shaderMaterial
            ref={edgeMatRef}
            vertexShader={EDGE_VERT}
            fragmentShader={EDGE_FRAG}
            uniforms={edgeUniforms}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>

      </group>

      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dust, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.028} color={accent} transparent opacity={0.5}
          sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false}
        />
      </points>

      <points ref={dust2Ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dustFar, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.02} color={accent2} transparent opacity={0.28}
          sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false}
        />
      </points>
    </group>
  );
};

export default ConstellationField;
