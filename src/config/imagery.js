/**
 * The imagery manifest.
 *
 * The pictures run the product's own argument:
 *   mask → crack → beneath → walking in
 *
 * Swapping, reordering or removing a scene is an edit to this file alone.
 * `depth` is optional on purpose — without it a scene renders flat (Phase 1),
 * with it the shader displaces by depth and the scene gains real parallax
 * (Phase 2). Nothing else changes, so a poor depth map can be dropped per
 * image without losing the scene.
 */
export const SCENES = [
  {
    id: '1pf',
    act: 'surface',
    beat: 'The mask, and it is convincing.',
    src: '/imagery/1pf-1600.webp',
    srcSmall: '/imagery/1pf-900.webp',
    // depth: '/imagery/1pf-depth.webp',
    strength: 0.06,   // parallax displacement once a depth map exists
    dim: 0.58,        // how far to pull it down so hero copy always wins
  },
  {
    // TWO-PHASE ACT. The section's first card is "Leaders — Why is my team still
    // not executing?", so opening on a golfer put sport in front of a beat the
    // copy leads with leadership. The CEO now holds the opening and hands to
    // sport partway through, matching the card order.
    //
    // The sport phase is a SPLIT — golf on the left, football on the right — so
    // the athletic audience does not read as golf-only.
    id: '4pf',
    act: 'cutaway',
    beat: 'The room that will not move → the bodies under load.',
    switchAt: 0.42,          // fraction of the act where CEO hands to sport
    phases: [
      {
        key: 'fracture-ceo',
        src: '/imagery/1pf-1600.webp',
        srcSmall: '/imagery/1pf-900.webp',
        dim: 0.6,
      },
      {
        key: 'fracture-sport',
        src: '/imagery/4pf-1600.webp',        // left half — golfer
        srcSmall: '/imagery/4pf-900.webp',
        splitSrc: '/imagery/5pf-1600.webp',   // right half — quarterback
        splitSrcSmall: '/imagery/5pf-900.webp',
        dim: 0.72,
      },
    ],
    strength: 0.07,
    dim: 0.72,
  },
  {
    id: '6pf',
    act: 'fracture',
    beat: 'Two versions of the same man, not quite aligned.',
    src: '/imagery/6pf-1600.webp',
    srcSmall: '/imagery/6pf-900.webp',
    strength: 0.05,   // conservative: reflections confuse depth estimators
    dim: 0.8,
  },
  {
    id: '8pf',
    act: 'emergence',
    beat: 'Earned calm. Composure that has been through something.',
    src: '/imagery/8pf-1600.webp',
    srcSmall: '/imagery/8pf-900.webp',
    strength: 0.05,
    dim: 0.55,
  },
  {
    id: '9pf',
    act: 'reassembly',
    beat: 'Walking in, by choice.',
    src: '/imagery/9pf-1600.webp',
    srcSmall: '/imagery/9pf-900.webp',
    strength: 0.06,
    dim: 0.72,
  },
];

/** Flat stills for the four role cards in the `fracture` act. */
export const CARD_IMAGES = {
  Leaders: '/imagery/2pf-900.webp',
  Sales: '/imagery/3pf-900.webp',
  Athletes: '/imagery/5pf-900.webp',
  Organizations: '/imagery/7pf-900.webp',
};

export const sceneForAct = (act) => SCENES.findIndex((s) => s.act === act);

export default SCENES;
