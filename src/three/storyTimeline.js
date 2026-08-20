import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { storyState } from './storyState';
import { SCENES } from '../config/imagery';

gsap.registerPlugin(ScrollTrigger);

/**
 * The scroll story.
 *
 * Seven beats, one continuous camera move. Each beat is anchored to a real
 * section via [data-act], NOT to a fraction of total page height — so the
 * journey stays in sync if the copy reflows, a breakpoint changes, or the
 * pinned act adds scroll distance.
 *
 * Consecutive beats share a boundary ("top 72%" of this act → "top 72%" of the
 * next), which makes the ranges contiguous and non-overlapping. Overlapping
 * scrubs would fight over the same properties and jitter.
 */
/**
 * ONE DOMINANT SYSTEM PER ACT.
 *
 * The constellation used to render at full strength over every image in every
 * act, so two visual systems competed in the same frame with no relationship
 * between them — which is why the page read as one repeated particle treatment
 * rather than a sequence of distinct beats.
 *
 *   field  = how present the constellation is (0..1)
 *   scene  = which image owns the act, or null for none
 *
 * Where `field` is high the lattice leads and the image recedes to a backdrop.
 * Where a `scene` leads the lattice thins to a trace. The core act is the one
 * place the system speaks alone, so it carries no image at all.
 */
const ACTS = [
  // ── SURFACE — identity architecture. Lattice leads, the man is the backdrop.
  { name: 'surface',    camDist: 8.6, camOrbit: 0.00, camRise: -0.20, fracture: 0,    shellOpen: 0,   coreReveal: 0,    reform: 0,    fieldFade: 1, field: 1.00, scene: '1pf' },

  // ── LOAD — the VSL. Everything steps back so the video is the subject.
  { name: 'load',       camDist: 7.0, camOrbit: 0.40, camRise:  0.10, fracture: 0.18, shellOpen: 0,   coreReveal: 0,    reform: 0,    fieldFade: 1, field: 0.55, scene: '1pf' },

  // ── FRACTURE — pressure. The image leads; the lattice is a fault line only.
  { name: 'fracture',   camDist: 5.2, camOrbit: 0.95, camRise:  0.35, fracture: 1,    shellOpen: 0,   coreReveal: 0,    reform: 0,    fieldFade: 1, field: 0.30, scene: '6pf' },

  // ── CUTAWAY — beneath the surface. The reflection IS the argument.
  { name: 'cutaway',    camDist: 1.5, camOrbit: 1.60, camRise:  0.15, fracture: 0.45, shellOpen: 1,   coreReveal: 0.55, reform: 0,    fieldFade: 1, field: 0.22, scene: '4pf' },

  // ── CORE — the system alone. No photograph; this beat is the architecture.
  { name: 'core',       camDist: 1.5, camOrbit: 2.30, camRise:  0.00, fracture: 0,    shellOpen: 1,   coreReveal: 1,    reform: 0,    fieldFade: 1, field: 1.00, scene: null  },

  // ── EMERGENCE — humanity and authority. Earned calm leads.
  { name: 'emergence',  camDist: 6.6, camOrbit: 3.05, camRise:  0.55, fracture: 0,    shellOpen: 0.3, coreReveal: 0.45, reform: 0.45, fieldFade: 1, field: 0.28, scene: '8pf' },

  // ── REASSEMBLY — decision and movement. Lattice re-knit, figure walking in.
  { name: 'reassembly', camDist: 8.0, camOrbit: 3.60, camRise:  0.10, fracture: 0,    shellOpen: 0,   coreReveal: 0.15, reform: 1,    fieldFade: 1, field: 0.85, scene: '9pf' },
];

const FIELDS = ['camDist', 'camOrbit', 'camRise', 'fracture', 'shellOpen', 'coreReveal', 'reform', 'fieldFade', 'field'];

const pose = (act) => Object.fromEntries(FIELDS.map((k) => [k, act[k]]));
const el = (name) => document.querySelector(`[data-act="${name}"]`);

/**
 * Build the story. Returns a teardown function.
 *
 * gsap.matchMedia gives desktop / mobile / reduced-motion their own timelines
 * AND reverts them automatically when the query stops matching — which is what
 * stops a resize from leaving orphaned pins and stale triggers behind.
 */
export function createStoryTimeline() {
  const mm = gsap.matchMedia();

  // ── Reduced motion: no scrub, no pin. Park the scene in a calm, fully
  //    legible mid-journey pose and leave it there. ──
  mm.add('(prefers-reduced-motion: reduce)', () => {
    Object.assign(storyState, pose(ACTS[0]), { camDist: 7.4, camOrbit: 0.5, coreReveal: 0.25 });
  });

  mm.add(
    {
      isDesktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
      isMobile: '(max-width: 767px) and (prefers-reduced-motion: no-preference)',
    },
    (ctx) => {
      const { isDesktop } = ctx.conditions;

      // Scrub lag gives the camera mass — it arrives just after you stop.
      const scrub = isDesktop ? 1 : 0.6;

      for (let i = 0; i < ACTS.length - 1; i++) {
        const from = ACTS[i];
        const to = ACTS[i + 1];
        const fromEl = el(from.name);
        const toEl = el(to.name);
        if (!fromEl || !toEl) continue;

        gsap.fromTo(storyState, pose(from), {
          ...pose(to),
          ease: 'none',
          immediateRender: false,
          scrollTrigger: {
            trigger: fromEl,
            start: 'top 72%',
            endTrigger: toEl,
            end: 'top 72%',
            scrub,
          },
        });
      }

      // ── Imagery ───────────────────────────────────────────────────────
      // Driven from the act table above, so an act can legitimately own NO
      // image (core) and the lattice gets that beat to itself. Ranges are
      // contiguous — each act runs to the start of the next — so exactly one
      // is ever active and a change cross-fades instead of dropping out.
      ACTS.forEach((act, i) => {
        const startEl = el(act.name);
        if (!startEl) return;
        const nextEl = ACTS[i + 1] ? el(ACTS[i + 1].name) : null;
        const sceneIdx = act.scene ? SCENES.findIndex((s) => s.id === act.scene) : -1;

        ScrollTrigger.create({
          trigger: startEl,
          start: 'top 60%',
          endTrigger: nextEl ?? startEl,
          end: nextEl ? 'top 60%' : 'bottom top',
          onToggle: ({ isActive }) => {
            if (!isActive) return;
            if (sceneIdx >= 0) storyState.sceneIndex = sceneIdx;
            gsap.to(storyState, {
              sceneAmount: sceneIdx >= 0 ? 1 : 0,
              duration: 0.7, ease: 'power2.out', overwrite: true,
            });
          },
          onUpdate: (self) => {
            if (sceneIdx >= 0 && storyState.sceneIndex === sceneIdx) {
              storyState.sceneProgress = self.progress;
            }
          },
        });
      });

      // ── THE PIN — desktop only, and only the cutaway. ────────────────
      // Pinning an inner wrapper rather than the section keeps ScrollTrigger's
      // pin-spacer out of the .pf-stack negative-margin geometry.
      // Mobile never pins: pinned scroll-jacking on touch is the fastest way
      // to make a page feel broken.
      if (isDesktop) {
        const cutaway = el('cutaway');
        const inner = cutaway?.querySelector('[data-pin-inner]');
        if (cutaway && inner) {
          ScrollTrigger.create({
            trigger: cutaway,
            start: 'center center',
            // Was +=110%, which parked ~1050px of frozen scroll under the act
            // and read as a dead gap. Short enough now that the camera move
            // stays the reason you are held, not the wait.
            end: '+=55%',
            pin: inner,
            pinSpacing: true,
            anticipatePin: 1,
          });
        }
      }

      return () => {
        // matchMedia reverts the tweens; kill the triggers we made explicitly.
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    }
  );

  return () => mm.revert();
}

export default createStoryTimeline;
