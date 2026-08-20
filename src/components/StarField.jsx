import { useRef, useEffect } from 'react';

/**
 * StarField — the dreamlike night sky behind the PersonaForce hero.
 *
 * Three parallax depth planes of drifting, twinkling stars, plus shooting stars
 * that streak through on their own rhythm. Depth is what sells the 3D: nearer
 * planes are larger, brighter, drift faster and slide further under the cursor
 * than the far ones, so the sky gains volume instead of reading as flat noise.
 *
 * - Pauses its render loop the moment it scrolls off-screen (no wasted CPU).
 * - Respects prefers-reduced-motion by painting a single static frame.
 */
const StarField = ({ className = '' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

    let width = 0;
    let height = 0;
    let stars = [];
    let shots = [];
    let raf;
    let running = true;
    let frame = 0;
    let nextShot = 90;

    // Pointer parallax, eased toward the target so the sky drifts rather than snaps.
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    // count is per ~1.3M px of canvas, so a phone doesn't render a desktop's worth of stars.
    const LAYERS = [
      { count: 120, r: [0.35, 0.9], drift: 0.010, alpha: 0.40, shift: 5 },
      { count: 58, r: [0.75, 1.45], drift: 0.032, alpha: 0.70, shift: 15 },
      { count: 22, r: [1.3, 2.2], drift: 0.065, alpha: 1.0, shift: 32 },
    ];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      const density = Math.min(1, (width * height) / 1300000);
      stars = [];
      LAYERS.forEach((layer, depth) => {
        const count = Math.max(12, Math.round(layer.count * Math.max(0.35, density)));
        for (let i = 0; i < count; i++) {
          stars.push({
            depth,
            x: Math.random() * width,
            y: Math.random() * height,
            r: layer.r[0] + Math.random() * (layer.r[1] - layer.r[0]),
            // Drift up-and-right, very slowly — reads as the sky breathing.
            vx: layer.drift * (0.4 + Math.random() * 0.8),
            vy: -layer.drift * (0.5 + Math.random() * 0.7),
            alpha: layer.alpha,
            phase: Math.random() * Math.PI * 2,
            twinkle: 0.006 + Math.random() * 0.014,
            // A minority read as brand-blue so the field ties back to the palette.
            c: Math.random() > 0.72 ? '124,158,250' : '223,231,255',
          });
        }
      });
    };

    const spawnShot = () => {
      // Enters from the upper-left band and falls down-right across the sky.
      const angle = (Math.PI / 180) * (16 + Math.random() * 22);
      const speed = 7 + Math.random() * 6;
      shots.push({
        x: -120 + Math.random() * width * 0.7,
        y: -60 + Math.random() * height * 0.5,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        len: 110 + Math.random() * 170,
        life: 0,
        ttl: 55 + Math.random() * 35,
      });
    };

    const drawStars = () => {
      for (const s of stars) {
        const { shift } = LAYERS[s.depth];
        const px = s.x + pointer.x * shift;
        const py = s.y + pointer.y * shift;
        // Twinkle never fully extinguishes a star — it breathes between 55% and 100%.
        const t = 0.775 + Math.sin(s.phase) * 0.225;
        ctx.fillStyle = `rgba(${s.c},${(s.alpha * t).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawShots = () => {
      for (const s of shots) {
        const fade = Math.min(1, s.life / 8) * Math.min(1, (s.ttl - s.life) / 18);
        if (fade <= 0) continue;
        const tailX = s.x - s.vx * (s.len / Math.hypot(s.vx, s.vy));
        const tailY = s.y - s.vy * (s.len / Math.hypot(s.vx, s.vy));

        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        grad.addColorStop(0, 'rgba(124,158,250,0)');
        grad.addColorStop(0.65, `rgba(124,158,250,${(0.5 * fade).toFixed(3)})`);
        grad.addColorStop(1, `rgba(255,255,255,${(0.95 * fade).toFixed(3)})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();

        ctx.fillStyle = `rgba(255,255,255,${(0.9 * fade).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      drawStars();
      drawShots();
    };

    const step = () => {
      frame++;
      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;

      for (const s of stars) {
        s.x += s.vx;
        s.y += s.vy;
        s.phase += s.twinkle;
        // Wrap with a margin so a star never pops in at the exact edge.
        if (s.x > width + 40) s.x = -40;
        if (s.x < -40) s.x = width + 40;
        if (s.y < -40) s.y = height + 40;
        if (s.y > height + 40) s.y = -40;
      }

      if (frame >= nextShot) {
        spawnShot();
        nextShot = frame + 150 + Math.random() * 260;
      }

      for (const s of shots) {
        s.x += s.vx;
        s.y += s.vy;
        s.life++;
      }
      shots = shots.filter((s) => s.life < s.ttl);

      draw();
      if (running) raf = requestAnimationFrame(step);
    };

    resize();
    init();
    if (prefersReduced) {
      draw();
    } else {
      step();
    }

    const onResize = () => {
      resize();
      init();
      if (prefersReduced) draw();
    };
    window.addEventListener('resize', onResize);

    const onPointerMove = (e) => {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    if (!prefersReduced && !coarsePointer) {
      window.addEventListener('pointermove', onPointerMove);
    }

    // Stop the loop while the sky is out of view; resume when it returns.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (prefersReduced) return;
        if (entry.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(step);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
      io.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
};

export default StarField;
