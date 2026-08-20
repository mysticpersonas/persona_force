import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollStore } from './scrollStore';
import { storyState } from './storyState';
import { SCENES } from '../config/imagery';

/**
 * DepthScene — the imagery layer, inside the SAME canvas as the constellation.
 *
 * SCREEN-LOCKED, NOT WORLD-PLACED. The story camera orbits hard (camOrbit runs
 * 0 → 3.6 rad, camDist 8.6 → 1.5), so a plane sitting in world space would swing
 * out of frame. The quad is re-anchored in front of the camera every frame and
 * scaled to fill the frustum, so it behaves like a backdrop wherever the camera
 * has travelled. depthTest off at renderOrder -1 keeps it behind everything,
 * including when the camera is INSIDE the lattice during the cutaway.
 *
 * THREE THINGS MAKE IT FEEL SEAMLESS:
 *
 *  1. Everything is preloaded. The whole set is ~110KB, so waiting to fetch on
 *     demand bought nothing and cost a visible blank whenever you scrolled
 *     faster than the network.
 *  2. Two texture slots and a blend. Act changes CROSS-fade rather than fading
 *     out to nothing and back in, which is what made transitions read as gaps.
 *  3. The image moves. A slow scroll-linked push and drift, so a still frame
 *     reads as a camera move even before any depth map exists.
 */

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAG = /* glsl */ `
  uniform sampler2D uMapA;
  uniform sampler2D uMapA2;   // right half when slot A is a split
  uniform sampler2D uMapB;
  uniform sampler2D uMapB2;   // right half when slot B is a split
  uniform float uSplitA;
  uniform float uSplitB;
  uniform vec2  uScaleA2;
  uniform vec2  uOffsetA2;
  uniform vec2  uScaleB2;
  uniform vec2  uOffsetB2;
  uniform sampler2D uDepthB;
  uniform float uHasDepthB;
  uniform float uBlend;      // 0 = A, 1 = B
  uniform vec2  uScaleA;
  uniform vec2  uOffsetA;
  uniform vec2  uScaleB;
  uniform vec2  uOffsetB;
  uniform vec2  uParallax;
  uniform float uStrength;
  uniform float uZoom;       // scroll-linked push
  uniform vec2  uDrift;      // scroll-linked drift
  uniform float uOpacity;
  uniform float uDim;
  uniform vec3  uTint;
  uniform float uDuotone;
  varying vec2 vUv;

  vec2 framed(vec2 uv, vec2 s, vec2 o) {
    // apply the scroll zoom about the centre, then cover-fit
    vec2 z = (uv - 0.5) / uZoom + 0.5 + uDrift;
    return z * s + o;
  }

  // A slot is either one full-bleed image, or two images sharing the frame down
  // a centre seam. Each half is cover-fitted to a HALF-width aspect on the CPU,
  // so neither picture is squashed by the division.
  vec3 slot(sampler2D m1, sampler2D m2, vec2 s1, vec2 o1, vec2 s2, vec2 o2, float isSplit) {
    if (isSplit > 0.5) {
      vec2 half_uv = vec2(fract(vUv.x * 2.0), vUv.y);
      vec2 z = (half_uv - 0.5) / uZoom + 0.5 + uDrift;
      vec3 cl = texture2D(m1, z * s1 + o1).rgb;
      vec3 cr = texture2D(m2, z * s2 + o2).rgb;
      // soft seam rather than a hard cut — a 2px hard edge reads as a mistake
      float seam = smoothstep(0.497, 0.503, vUv.x);
      vec3 c = mix(cl, cr, seam);
      // a faint divider so the split reads as deliberate
      float line = 1.0 - smoothstep(0.0, 0.0016, abs(vUv.x - 0.5));
      return mix(c, vec3(1.0), line * 0.10);
    }
    return texture2D(m1, framed(vUv, s1, o1)).rgb;
  }

  void main() {
    vec3 ca = slot(uMapA, uMapA2, uScaleA, uOffsetA, uScaleA2, uOffsetA2, uSplitA);
    vec3 cb;

    // Depth displacement: near pixels (white) shift more than far ones — this is
    // what turns one still into parallax. Only a non-split slot carries depth.
    if (uHasDepthB > 0.5 && uSplitB < 0.5) {
      vec2 uvB = framed(vUv, uScaleB, uOffsetB);
      float d = texture2D(uDepthB, uvB).r;
      uvB += uParallax * (d - 0.5) * uStrength;
      cb = texture2D(uMapB, uvB).rgb;
    } else {
      cb = slot(uMapB, uMapB2, uScaleB, uOffsetB, uScaleB2, uOffsetB2, uSplitB);
    }

    vec3 c = mix(ca, cb, uBlend);

    // Duotone toward brand navy — what stops generic imagery reading as stock.
    float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
    vec3 duo = mix(uTint * (l * 1.25), vec3(l), 0.30);
    c = mix(c, duo, uDuotone);

    // Corner falloff only. NOT a centre-bright vignette: the copy sits dead
    // centre, so boosting the middle brightened exactly what had to stay quiet.
    vec2 p = vUv - 0.5;
    float edge = smoothstep(0.92, 0.42, length(p));
    c *= mix(0.62, 1.0, edge);
    c *= uDim;

    gl_FragColor = vec4(c, uOpacity);
  }
`;

const DepthScene = ({ accent = '#3b6fe8', reduced = false }) => {
  const mesh = useRef();
  const matRef = useRef();
  const { camera, size, gl } = useThree();

  const tex = useRef({});                                   // id -> { map, depth }
  const slot = useRef({ a: null, b: null, blend: 1, amount: 0, shown: null, phase: 0 });

  const uniforms = useMemo(() => ({
    uMapA: { value: null }, uMapB: { value: null },
    uMapA2: { value: null }, uMapB2: { value: null },
    uSplitA: { value: 0 }, uSplitB: { value: 0 },
    uScaleA2: { value: new THREE.Vector2(1, 1) }, uOffsetA2: { value: new THREE.Vector2() },
    uScaleB2: { value: new THREE.Vector2(1, 1) }, uOffsetB2: { value: new THREE.Vector2() },
    uDepthB: { value: null }, uHasDepthB: { value: 0 },
    uBlend: { value: 1 },
    uScaleA: { value: new THREE.Vector2(1, 1) }, uOffsetA: { value: new THREE.Vector2() },
    uScaleB: { value: new THREE.Vector2(1, 1) }, uOffsetB: { value: new THREE.Vector2() },
    uParallax: { value: new THREE.Vector2() },
    uStrength: { value: 0.06 },
    uZoom: { value: 1 },
    uDrift: { value: new THREE.Vector2() },
    uOpacity: { value: 0 },
    uDim: { value: 0.6 },
    uTint: { value: new THREE.Color(accent) },
    uDuotone: { value: 0.85 },
  }), [accent]);

  // ── Preload the whole set once ─────────────────────────────────────────
  // ~110KB total. Loading on demand saved nothing and produced the blank
  // frames you get when scrolling outruns the network.
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    const small = size.width < 768;
    const maxAniso = gl.capabilities.getMaxAnisotropy();

    // A scene is either one image or a list of phases; flatten both into the
    // same keyed store so the frame loop never has to care which it is.
    const variants = [];
    SCENES.forEach((sc) => {
      if (sc.phases) sc.phases.forEach((ph) => variants.push({ key: ph.key, ...ph }));
      else variants.push({ key: sc.id, ...sc });
    });

    variants.forEach((v) => {
      const put = (patch) => { tex.current[v.key] = { ...(tex.current[v.key] || {}), ...patch }; };
      loader.load(small ? (v.srcSmall || v.src) : v.src, (t) => {
        t.colorSpace = THREE.SRGBColorSpace;
        t.anisotropy = Math.min(4, maxAniso);
        put({ map: t });
      });
      if (v.splitSrc) {
        loader.load(small ? (v.splitSrcSmall || v.splitSrc) : v.splitSrc, (t) => {
          t.colorSpace = THREE.SRGBColorSpace;
          t.anisotropy = Math.min(4, maxAniso);
          put({ map2: t });
        });
      }
      if (v.depth) {
        loader.load(v.depth, (d) => { d.colorSpace = THREE.NoColorSpace; put({ depth: d }); });
      }
    });

    const store = tex.current;
    return () => Object.values(store).forEach((e) => { e?.map?.dispose?.(); e?.depth?.dispose?.(); });
  }, [size.width, gl]);

  // cover-fit a source into the current plane aspect
  const fit = (img, planeA, s, o) => {
    if (!img) return;
    const imgA = img.width / img.height;
    if (imgA > planeA) { s.set(planeA / imgA, 1); o.set((1 - s.x) / 2, 0); }
    else { s.set(1, imgA / planeA); o.set(0, (1 - s.y) / 2); }
  };

  useFrame((_, delta) => {
    // clamp: a backgrounded tab returns one enormous delta, which would snap
    // every eased value instead of easing it
    const dt = Math.min(delta, 0.05);
    const st = storyState;
    const m = matRef.current;
    if (!m || !mesh.current) return;
    const S0 = slot.current;

    const idx = st.sceneIndex ?? 0;
    const scene = SCENES[idx];
    const progress = Math.max(0, Math.min(1, st.sceneProgress ?? 0));

    // Which phase of the act is on screen. Hysteresis (±0.04) around the switch
    // point stops scroll jitter from flickering between the two.
    let phase = scene;
    if (scene?.phases) {
      const at = scene.switchAt ?? 0.5;
      const wasLate = S0.phase === 1;
      const late = wasLate ? progress > at - 0.04 : progress > at + 0.04;
      S0.phase = late ? 1 : 0;
      phase = scene.phases[late ? 1 : 0];
    }
    const key = phase?.key ?? scene?.id;
    const ready = tex.current[key]?.map;

    // Only chase the target once the texture actually exists, so a fade never
    // ramps up over nothing.
    const target = ready ? Math.max(0, Math.min(1, st.sceneAmount ?? 0)) : 0;
    const S = S0;
    S.amount = THREE.MathUtils.damp(S.amount, target, 5, dt);

    if (S.amount < 0.003) { mesh.current.visible = false; return; }
    mesh.current.visible = true;

    // ── change of KEY → cross-fade. Keyed on the phase, not the act, so the
    //    CEO → sport handover inside a single act cross-fades too. ──
    if (ready && S.shown !== key) {
      S.a = S.b ?? { id: key, entry: tex.current[key] };
      S.b = { id: key, entry: tex.current[key] };
      S.blend = S.a.id === S.b.id ? 1 : 0;
      S.shown = key;
      m.uniforms.uScaleA.value.copy(m.uniforms.uScaleB.value);
      m.uniforms.uOffsetA.value.copy(m.uniforms.uOffsetB.value);
      m.uniforms.uScaleA2.value.copy(m.uniforms.uScaleB2.value);
      m.uniforms.uOffsetA2.value.copy(m.uniforms.uOffsetB2.value);
      m.uniforms.uMapA2.value = m.uniforms.uMapB2.value;
      m.uniforms.uSplitA.value = m.uniforms.uSplitB.value;
    }
    if (!S.b) return;
    S.blend = THREE.MathUtils.damp(S.blend, 1, 3.2, dt);

    m.uniforms.uMapA.value = S.a?.entry?.map ?? S.b.entry.map;
    m.uniforms.uMapB.value = S.b.entry.map;
    m.uniforms.uDepthB.value = S.b.entry.depth ?? null;
    m.uniforms.uHasDepthB.value = S.b.entry.depth ? 1 : 0;
    m.uniforms.uBlend.value = S.blend;
    m.uniforms.uMapB2.value = S.b.entry.map2 ?? S.b.entry.map;
    m.uniforms.uSplitB.value = S.b.entry.map2 ? 1 : 0;
    m.uniforms.uStrength.value = scene.strength ?? 0.06;
    m.uniforms.uDim.value = phase?.dim ?? scene.dim ?? 0.6;
    m.uniforms.uOpacity.value = S.amount;

    // ── motion ────────────────────────────────────────────────────────────
    // A slow push and drift across the act. This is what makes a flat still
    // read as a camera move; depth maps add true parallax on top later.
    const prog = Math.max(0, Math.min(1, st.sceneProgress ?? 0.5));
    const zTarget = reduced ? 1 : 1.10 - prog * 0.12;
    m.uniforms.uZoom.value = THREE.MathUtils.damp(m.uniforms.uZoom.value, zTarget, 2.4, dt);

    const d = m.uniforms.uDrift.value;
    const dTarget = reduced ? 0 : (prog - 0.5) * 0.022;
    d.y = THREE.MathUtils.damp(d.y, dTarget, 2.4, dt);

    if (!reduced) {
      const p = m.uniforms.uParallax.value;
      p.x = THREE.MathUtils.damp(p.x, scrollStore.pointerX * 0.6, 3, dt);
      p.y = THREE.MathUtils.damp(p.y, scrollStore.pointerY * 0.6, 3, dt);
    }

    // ── anchor to the camera, fill the frustum ──
    const dist = 12;
    camera.getWorldDirection(mesh.current.position).multiplyScalar(dist).add(camera.position);
    mesh.current.quaternion.copy(camera.quaternion);

    const h = 2 * dist * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
    const w = h * (size.width / size.height);
    mesh.current.scale.set(w, h, 1);
    const full = w / h;
    const halfA = (w / 2) / h;   // each half of a split is half the width

    const bSplit = !!S.b.entry.map2;
    fit(S.b.entry.map.image, bSplit ? halfA : full, m.uniforms.uScaleB.value, m.uniforms.uOffsetB.value);
    if (bSplit) fit(S.b.entry.map2.image, halfA, m.uniforms.uScaleB2.value, m.uniforms.uOffsetB2.value);

    if (S.a?.entry?.map) {
      const aSplit = !!S.a.entry.map2;
      fit(S.a.entry.map.image, aSplit ? halfA : full, m.uniforms.uScaleA.value, m.uniforms.uOffsetA.value);
      if (aSplit) fit(S.a.entry.map2.image, halfA, m.uniforms.uScaleA2.value, m.uniforms.uOffsetA2.value);
    }
  });

  return (
    <mesh ref={mesh} visible={false} renderOrder={-1} frustumCulled={false}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
        transparent
        depthTest={false}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
};

export default DepthScene;
