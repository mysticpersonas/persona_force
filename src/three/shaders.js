// GLSL for the constellation. Kept in one place so the field component stays
// readable and the shaders are easy to tune without hunting through JSX.
//
// The whole visual thesis lives in these three programs:
//   NODE  — a persona. Calm = brand blue. Under pressure = shadow violet, and bigger.
//   EDGE  — a connection with a packet of signal travelling along it (the system is LIVE,
//           not a static decoration). Strained edges brighten.
//
// A fresnel containment shell was tried here and cut: bloom smeared its rim into
// a filled dome that swallowed the hero copy, and the lattice already carries the
// volume on its own.

export const NODE_VERT = /* glsl */ `
  attribute float aSeed;    // per-node random 0..1 — twinkle + formation stagger
  attribute float aMix;     // 0..1 place in the blue→electric base gradient
  attribute float aStress;  // 0..1 live pressure on THIS node (written every frame)

  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform vec3  uCoreA;     // brand blue  — identity at rest
  uniform vec3  uCoreB;     // electric    — identity at rest, far end of gradient
  uniform vec3  uShadow;    // violet      — who shows up under pressure
  uniform float uReduced;

  varying vec3  vColor;
  varying float vGlow;

  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);

    // each node breathes on its own clock so the field never looks frozen
    float tw = uReduced > 0.5 ? 1.0 : 0.72 + 0.28 * sin(uTime * 1.1 + aSeed * 6.2831);

    // pressure makes a persona LOUDER, not quieter — stressed nodes swell
    float swell = 1.0 + aStress * 1.45;

    // perspective-correct point size (gl_PointSize is in physical px, hence uPixelRatio)
    gl_PointSize = uSize * uPixelRatio * tw * swell * (100.0 / max(0.001, -mv.z));
    gl_Position  = projectionMatrix * mv;

    vec3 base = mix(uCoreA, uCoreB, aMix);
    vColor = mix(base, uShadow, aStress);
    vGlow  = tw * (0.55 + aStress * 0.9);
  }
`;

export const NODE_FRAG = /* glsl */ `
  uniform float uOpacity;
  varying vec3  vColor;
  varying float vGlow;

  void main() {
    // soft glowing disc: wide halo + hot pinpoint core
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float halo = smoothstep(0.5, 0.0, d);
    float core = pow(smoothstep(0.42, 0.0, d), 2.2);
    float a = (halo * 0.5 + core * 1.15) * vGlow * uOpacity;
    gl_FragColor = vec4(vColor * (0.9 + core * 2.0), a);
  }
`;

export const EDGE_VERT = /* glsl */ `
  attribute float aEdgeT;   // 0.0 at one endpoint, 1.0 at the other → interpolates to
                            // give us the parametric position along the segment for free
  attribute float aPhase;   // per-edge offset so pulses don't march in lockstep
  attribute float aStress;  // per-edge stress (max of its two endpoints)

  varying float vT;
  varying float vPhase;
  varying float vStress;

  void main() {
    vT = aEdgeT;
    vPhase = aPhase;
    vStress = aStress;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const EDGE_FRAG = /* glsl */ `
  uniform float uTime;
  uniform vec3  uCore;
  uniform vec3  uShadow;
  uniform float uBase;     // resting line opacity
  uniform float uOpacity;  // global fade
  uniform float uReduced;

  varying float vT;
  varying float vPhase;
  varying float vStress;

  void main() {
    vec3 col = mix(uCore, uShadow, vStress);
    float a = uBase;

    if (uReduced < 0.5) {
      // a packet of signal running the length of the edge, wrapping seamlessly
      float head = fract(uTime * 0.22 + vPhase);
      float d = abs(vT - head);
      d = min(d, 1.0 - d);
      a += exp(-d * 34.0) * 0.9;
    }

    a += vStress * 0.5; // strained connections light up — you can SEE the load
    gl_FragColor = vec4(col, a * uOpacity);
  }
`;

