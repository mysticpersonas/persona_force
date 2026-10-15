// Recreated background art for the hero: teal grid, candlestick motifs on the
// edges, three mountain ridgelines with warm rim light, a sunburst behind
// Michelle and a glowing gold trail climbing toward it.
//
// Everything is generated from a seeded random, so it looks organic but is
// identical on every render (no layout jitter, nothing to download).

import styles from './TraderEvent.module.css';

function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// A ridgeline: jagged peaks between baseY and baseY - height, closed to the
// bottom so it can be filled.
function ridge({ seed, baseY, height, step, peaks = [] }) {
  const rand = seeded(seed);
  const pts = [];
  for (let x = -40; x <= 1480; x += step) {
    let y = baseY - rand() * height * 0.55;
    for (const p of peaks) {
      const d = Math.abs(x - p.x) / p.w;
      if (d < 1) y = Math.min(y, baseY - p.h * (1 - d) - rand() * 18);
    }
    pts.push([x, Math.round(y)]);
  }
  const line = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ');
  return { line, fill: `${line} L1480 1000 L-40 1000 Z` };
}

function candles({ seed, x0, x1, top, bottom, rising }) {
  const rand = seeded(seed);
  const out = [];
  const n = Math.floor((x1 - x0) / 22);
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const trend = rising ? 1 - t : t;
    const mid = top + (bottom - top) * (0.25 + trend * 0.55) + (rand() - 0.5) * 50;
    const body = 16 + rand() * 46;
    const wick = body + 10 + rand() * 30;
    out.push({ x: x0 + i * 22, y: mid - body / 2, h: body, wy: mid - wick / 2, wh: wick, up: rand() > 0.4 });
  }
  return out;
}

const BACK = ridge({ seed: 7, baseY: 560, height: 120, step: 26, peaks: [{ x: 150, w: 220, h: 230 }, { x: 1210, w: 240, h: 260 }, { x: 980, w: 160, h: 150 }] });
const MID = ridge({ seed: 19, baseY: 680, height: 90, step: 22, peaks: [{ x: 70, w: 200, h: 200 }, { x: 1360, w: 220, h: 240 }, { x: 1120, w: 140, h: 120 }] });
const FRONT = ridge({ seed: 43, baseY: 800, height: 70, step: 18, peaks: [{ x: 1300, w: 260, h: 170 }, { x: 160, w: 260, h: 140 }] });
const LEFT_CANDLES = candles({ seed: 3, x0: 8, x1: 250, top: 170, bottom: 470, rising: true });
const RIGHT_CANDLES = candles({ seed: 11, x0: 1190, x1: 1436, top: 150, bottom: 430, rising: false });

// The trail: switchbacks climbing from the lower right up to the sun.
const TRAIL = 'M1460 760 C1390 745 1290 740 1330 692 C1368 648 1425 640 1385 602 C1348 568 1268 576 1288 532 C1304 496 1346 490 1332 456 C1322 430 1296 420 1300 392';

export function HeroArt() {
  return (
    <svg className={styles.heroArt} viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMin slice" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="te-sun" cx="1300" cy="380" r="340" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFF4D6" stopOpacity="0.95" />
          <stop offset="0.08" stopColor="#F5D28B" stopOpacity="0.75" />
          <stop offset="0.35" stopColor="#AD7528" stopOpacity="0.28" />
          <stop offset="1" stopColor="#AD7528" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="te-streak" x1="0" x2="1">
          <stop offset="0" stopColor="#F5D28B" stopOpacity="0" />
          <stop offset="0.5" stopColor="#FFF4D6" stopOpacity="0.9" />
          <stop offset="1" stopColor="#F5D28B" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="te-rim" x1="0" x2="1">
          <stop offset="0" stopColor="#AD7528" stopOpacity="0.15" />
          <stop offset="0.6" stopColor="#F5D28B" stopOpacity="0.35" />
          <stop offset="0.9" stopColor="#FFE3A3" stopOpacity="0.95" />
          <stop offset="1" stopColor="#F5D28B" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="te-trail" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#AD7528" stopOpacity="0.2" />
          <stop offset="0.5" stopColor="#F5D28B" />
          <stop offset="1" stopColor="#FFF4D6" />
        </linearGradient>
        <linearGradient id="te-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#24313d" />
          <stop offset="1" stopColor="#0c141b" />
        </linearGradient>
        <linearGradient id="te-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#16212b" />
          <stop offset="1" stopColor="#081017" />
        </linearGradient>
        <linearGradient id="te-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b131a" />
          <stop offset="0.5" stopColor="#050B0F" />
        </linearGradient>
        <pattern id="te-grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M48 0H0V48" fill="none" stroke="#00CDDF" strokeOpacity="0.07" strokeWidth="1" />
        </pattern>
        <filter id="te-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <filter id="te-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
      </defs>

      <rect width="1440" height="1000" fill="url(#te-grid)" />

      {/* Candlestick motifs on the far edges */}
      {[LEFT_CANDLES, RIGHT_CANDLES].map((set, s) => (
        <g key={s} className={styles.candles}>
          {set.map((c, i) => {
            const color = c.up ? '#00CDDF' : '#F5D28B';
            return (
              <g key={i}>
                <rect x={c.x + 6} y={c.wy} width="1.5" height={c.wh} fill={color} />
                <rect x={c.x} y={c.y} width="13" height={c.h} rx="1.5" fill={color} />
              </g>
            );
          })}
        </g>
      ))}

      {/* Sun flare behind Michelle */}
      <g className={styles.sun}>
        <circle cx="1300" cy="380" r="340" fill="url(#te-sun)" />
        <rect x="980" y="377" width="640" height="5" fill="url(#te-streak)" filter="url(#te-soft)" />
        <circle cx="1300" cy="380" r="16" fill="#FFF8E6" filter="url(#te-soft)" />
      </g>

      {/* Ridgelines: back to front, with gold rim light on the back peaks */}
      <path d={BACK.fill} fill="url(#te-back)" />
      <path d={BACK.line} fill="none" stroke="url(#te-rim)" strokeWidth="1.6" />
      <path d={MID.fill} fill="url(#te-mid)" />
      <path d={MID.line} fill="none" stroke="url(#te-rim)" strokeWidth="1.1" strokeOpacity="0.55" />
      <path d={FRONT.fill} fill="url(#te-front)" />

      {/* Glowing trail climbing to the sun */}
      <path d={TRAIL} fill="none" stroke="#F5D28B" strokeOpacity="0.5" strokeWidth="14" strokeLinecap="round" filter="url(#te-glow)" />
      <path d={TRAIL} fill="none" stroke="url(#te-trail)" strokeWidth="3.5" strokeLinecap="round" />
      <path className={styles.trailShimmer} d={TRAIL} fill="none" stroke="#FFF8E6" strokeWidth="2" strokeLinecap="round" pathLength="100" />
    </svg>
  );
}

// Mountain-at-dusk art for the urgency card. Fades in from the right.
const CARD_BACK = ridge({ seed: 5, baseY: 150, height: 40, step: 14, peaks: [{ x: 1180, w: 180, h: 110 }, { x: 1000, w: 120, h: 60 }] });
const CARD_FRONT = ridge({ seed: 29, baseY: 190, height: 30, step: 12, peaks: [{ x: 1320, w: 200, h: 90 }, { x: 900, w: 160, h: 40 }] });

export function CardMountains() {
  return (
    <svg className={styles.cardArt} viewBox="700 0 740 230" preserveAspectRatio="xMaxYMax slice" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="te-dusk" cx="1180" cy="60" r="300" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F5D28B" stopOpacity="0.55" />
          <stop offset="0.4" stopColor="#AD7528" stopOpacity="0.22" />
          <stop offset="1" stopColor="#AD7528" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="te-card-rim" x1="0" x2="1">
          <stop offset="0" stopColor="#AD7528" stopOpacity="0.2" />
          <stop offset="0.7" stopColor="#F5D28B" stopOpacity="0.8" />
          <stop offset="1" stopColor="#FFE3A3" />
        </linearGradient>
      </defs>
      <rect x="700" width="740" height="230" fill="url(#te-dusk)" />
      <path d={CARD_BACK.fill} fill="#1b2630" />
      <path d={CARD_BACK.line} fill="none" stroke="url(#te-card-rim)" strokeWidth="1.4" />
      <path d={CARD_FRONT.fill} fill="#0a1218" />
      <path d={CARD_FRONT.line} fill="none" stroke="#F5D28B" strokeOpacity="0.35" strokeWidth="1" />
    </svg>
  );
}
