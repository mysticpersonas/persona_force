import { useRef, useEffect } from 'react';

/**
 * ParticleField — a subtle "market data lattice" for the PFT hero.
 * Canvas-based (cheap), low-opacity nodes drifting with faint connecting lines.
 * - Pauses its render loop the moment it scrolls off-screen (no wasted CPU).
 * - Respects prefers-reduced-motion by painting a single static frame.
 */
const ParticleField = ({ className = '' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let nodes = [];
    let raf;
    let running = true;

    // Keep the count low — this should feel like the data "breathing", not a screensaver.
    const NODE_COUNT = 46;
    const LINK_DIST = 132;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        // half electric-blue, half neon-purple
        c: Math.random() > 0.5 ? '0,174,239' : '122,45,255',
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      // connecting lines
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.16;
            ctx.strokeStyle = `rgba(0,174,239,${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      // nodes
      for (const n of nodes) {
        ctx.fillStyle = `rgba(${n.c},0.5)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }
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

    // Stop the loop while the hero is out of view; resume when it returns.
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
      io.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
};

export default ParticleField;
