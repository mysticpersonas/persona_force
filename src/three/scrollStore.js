// Tiny singleton the R3F render loop reads each frame (spec v2 §4).
// Lenis + a global pointer listener write here; useFrame lerps toward these.
// Nothing here triggers React renders — the 3D reads it imperatively at 60fps.
export const scrollStore = {
  velocity: 0,       // signed scroll velocity — drives "strain"
  progress: 0,       // 0..1 across the FIRST viewport (hero beats)
  pageProgress: 0,   // 0..1 across the WHOLE page (the journey)
  pointerX: 0,       // -1..1 global cursor (works even under a click-through canvas)
  pointerY: 0,
  pointerActive: 0,  // 0..1 — is the cursor actually applying pressure right now?
  pressBoost: 0,     // 0..1 — mouse held down = deliberate pressure spike
};

export default scrollStore;
