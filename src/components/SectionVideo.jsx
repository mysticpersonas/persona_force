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
 * NOTE: pass `clips` as a module-level constant. A fresh array literal on every
 * render would restart the playback effect on every render.
 */
const SectionVideo = ({ clips, className = '', opacity = 0.22 }) => {
  const hostRef = useRef(null);
  const videoRefs = useRef([]);
  // A monotonic tick rather than an index, so a single-clip plate still
  // re-triggers its effect and restarts the loop.
  const [tick, setTick] = useState(0);
  const [inView, setInView] = useState(false);
  const active = tick % clips.length;

  // Decoding several background videos at once is the fastest way to make a long
  // page stutter, so nothing plays until its own section is actually on screen.
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.01 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) {
      videoRefs.current.forEach((v) => v?.pause());
      return;
    }
    const v = videoRefs.current[active];
    if (v) {
      v.currentTime = 0;
      v.play?.()?.catch(() => {});
    }
    const t = setTimeout(() => setTick((n) => n + 1), clips[active].duration * 1000);
    return () => clearTimeout(t);
  }, [tick, active, inView, clips]);

  return (
    <div ref={hostRef} data-pf-plate className={`pf-plate ${className}`} aria-hidden="true">
      <div className="pf-plate-inner absolute inset-0">
        {clips.map((c, i) => (
          <video
            key={c.src}
            ref={(el) => {
              videoRefs.current[i] = el;
            }}
            className="pf-sectionvid absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out"
            style={{ opacity: i === active ? opacity : 0 }}
            src={c.src}
            muted
            playsInline
            preload="metadata"
          />
        ))}
        {/* Dissolve the footage into the page colour at every edge */}
        <div className="absolute inset-0 bg-[radial-gradient(88%_78%_at_50%_50%,transparent_0%,rgba(6,8,26,0.3)_72%,#06081a_100%)]" />
      </div>
    </div>
  );
};

export default SectionVideo;
