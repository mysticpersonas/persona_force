// The scene's live pose, scrubbed by GSAP and read by useFrame every frame.
//
// Same contract as scrollStore.js: a plain mutable singleton, never React state.
// GSAP tweens these numbers as you scroll; the R3F loop reads them at 60fps.
// Nothing here triggers a React render, which is the only way a scroll-linked
// 3D journey stays smooth.
//
// Defaults are ACT 1 (surface), so the scene is correct on first paint and
// stays correct if the timeline never initialises (reduced motion, JS error).
export const storyState = {
  // ── camera, in world units ───────────────────────────────────────────
  camDist: 8.6,     // distance from origin. Sphere radius is 2.4, so
                    // anything under ~2.4 means the camera is INSIDE it.
  camOrbit: 0,      // radians around Y
  camRise: -0.2,    // Y offset

  // ── lattice deformation, 0..1 each ───────────────────────────────────
  fracture: 0,      // fault plane opening — the system shearing under load
  shellOpen: 0,     // outer shell pushed outward + dissolved, so the camera
                    // can pass through it. This is the cutaway.
  coreReveal: 0,    // nested inner shells fading in at the centre
  reform: 0,        // reassembly: tighter, brighter than the start

  fieldFade: 1,     // global opacity of the whole field
  field: 1,         // per-act constellation presence — see ACTS in storyTimeline

  // ── hero montage (inert — superseded by imagery) ─────────────────────
  poseIndex: 0,     // which of POSES the field is morphing toward
  poseAmount: 0,    // 0 = sphere, 1 = fully formed figure

  // ── imagery ──────────────────────────────────────────────────────────
  sceneIndex: 0,    // index into SCENES in config/imagery.js
  sceneAmount: 0,   // 0 = no image, 1 = fully present
  sceneProgress: 0, // 0..1 through the owning act — drives the image's push/drift
};

// Dev-only handle so the poses can be driven straight from the console or a
// CDP probe while tuning them. Never shipped to production.
if (import.meta.env?.DEV && typeof window !== 'undefined') {
  window.__storyState = storyState;
}

export default storyState;
