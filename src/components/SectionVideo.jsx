import { useEffect, useRef, useState } from 'react';

/**
 * SectionVideo — a 3D backdrop plate for a content section.
 *
 * Plays only the first `duration` seconds of each clip, then crossfades to the
 * next and loops. A 9-second source therefore reads as a tight 3-second motif
 * instead of a rambling background video.
 *
 * The plate enters in 3D: it sits tilted back on the Z axis and rotates flat as
 * the section arrives, driven by the page's scroll loop (see .pf-plate in
 * index.css). Blend-screen means only the bright parts of the footage register,
 * so it reads as depth inside the page rather than a video pasted behind text.
 *
 * MOBILE ("lite" mode below) — three things were making these stick on phones:
 *   1. every clip of every plate mounted a <video> at once. Safari on iOS allows
 *      only a handful of simultaneous hardware decoders; past that, extra videos
 *      simply freeze on a black frame. Lite mode mounts one element per plate.
 *   2. the clips were 5–13 Mbps. A phone on cellular cannot stream that in real
 *      time, so playback started and immediately ran dry. The sources are now
 *      re-encoded, and lite mode loads the half-size `-m.mp4` variants.
 *   3. the 4s window was timed from render, not from playback. If the clip was
 *      still buffering, the plate crossfaded to the next one before the current
 *      one had shown a single frame. The timer now starts on `playing`.
 *
 * NOTE: pass `clips` as a module-level constant. A fresh array literal on every
 * render would restart the playback effect on every render.
 */

// A phone's decoder budget and bandwidth, not its screen width, is what matters
// here — but width is the honest proxy for "this is a phone-shaped viewport".
const isLiteViewport = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia('(max-width: 900px)').matches ||
    window.matchMedia('(pointer: coarse)').matches);

// `/3d/golf.mp4` → `/3d/golf-m.mp4` (640px-wide, ~550kbps) and `/3d/golf.jpg`.
const mobileSrc = (src) => src.replace(/\.mp4$/, '-m.mp4');
const posterSrc = (src) => src.replace(/\.mp4$/, '.jpg');

const SectionVideo = ({ clips, className = '', opacity = 0.22 }) => {
  const hostRef = useRef(null);
  const videoRefs = useRef([]);
  // A monotonic tick rather than an index, so a single-clip plate still
  // re-triggers its effect and restarts the loop.
  const [tick, setTick] = useState(0);
  const [inView, setInView] = useState(false);
  const [lite, setLite] = useState(isLiteViewport);
  const active = tick % clips.length;

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px), (pointer: coarse)');
    const onChange = () => setLite(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Decoding several background videos at once is the fastest way to make a long
  // page stutter, so nothing plays until its own section is actually on screen.
  // rootMargin gives the clip a head start on its buffer before it's visible.
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.01,
      rootMargin: '200px 0px',
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) {
      videoRefs.current.forEach((v) => v?.pause());
      return;
    }
    const v = videoRefs.current[active];
    if (!v) return;

    let timer = 0;
    // Start the window when the clip is genuinely rolling. Timing it from render
    // is what made a buffering plate look frozen: it advanced past a clip that
    // had never painted a frame.
    const startWindow = () => {
      if (timer) return;
      timer = setTimeout(() => setTick((n) => n + 1), clips[active].duration * 1000);
    };
    // Safety net: if the clip never fires `playing` (autoplay blocked, decoder
    // exhausted, network dead), move on rather than parking the plate forever.
    const bail = setTimeout(() => setTick((n) => n + 1), clips[active].duration * 1000 + 4000);

    v.addEventListener('playing', startWindow);
    // Seeking a clip that hasn't buffered is itself a stall on mobile, so only
    // rewind when there is actually something to rewind from.
    if (v.currentTime > 0.1) v.currentTime = 0;
    v.play?.()?.catch(() => {});

    return () => {
      v.removeEventListener('playing', startWindow);
      clearTimeout(timer);
      clearTimeout(bail);
    };
  }, [tick, active, inView, clips]);

  // On mobile only the active clip exists in the DOM: one decoder per plate.
  const rendered = lite ? [clips[active]] : clips;

  return (
    <div ref={hostRef} data-pf-plate className={`pf-plate ${className}`} aria-hidden="true">
      <div className="pf-plate-inner absolute inset-0">
        {rendered.map((c, i) => {
          const idx = lite ? active : i;
          return (
            /* Desktop crossfades between two stacked elements. Lite mode has
               only one element, which remounts per clip, so it fades in on mount
               instead — a hard cut between two 3D scenes reads as a glitch. */
            <video
              key={c.src}
              ref={(el) => {
                videoRefs.current[idx] = el;
              }}
              className={`pf-sectionvid absolute inset-0 h-full w-full object-cover ${
                lite ? 'pf-sectionvid--lite' : 'transition-opacity duration-700 ease-out'
              }`}
              style={{ '--pf-vid-o': opacity, opacity: idx === active ? opacity : 0 }}
              src={lite ? mobileSrc(c.src) : c.src}
              poster={posterSrc(c.src)}
              muted
              playsInline
              preload={lite ? 'auto' : 'metadata'}
            />
          );
        })}
        {/* Dissolve the footage into the page colour at every edge */}
        <div className="absolute inset-0 bg-[radial-gradient(88%_78%_at_50%_50%,transparent_0%,rgba(6,8,26,0.3)_72%,#06081a_100%)]" />
      </div>
    </div>
  );
};

export default SectionVideo;
