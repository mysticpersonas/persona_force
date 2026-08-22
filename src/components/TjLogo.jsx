/**
 * TjLogo — The Trader's Journey mark, rebuilt as SVG.
 *
 * The brand sheet shipped as a flat poster with no exportable asset, so the mark
 * is reconstructed here: the two crossing arrows that carry the whole idea
 * (red cutting down, green stacking up) plus the TJ monogram between them.
 * SVG rather than a PNG so it stays crisp at every size and the arrow colours
 * stay tied to the palette tokens.
 */
const TjLogo = ({ className = '', badge = true }) => (
  <svg viewBox="0 0 48 48" className={className} role="img" aria-label="The Trader's Journey">
    <defs>
      <linearGradient id="tj-up" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#00e676" stopOpacity="0.55" />
        <stop offset="100%" stopColor="#00e676" />
      </linearGradient>
      <linearGradient id="tj-down" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ff3b30" stopOpacity="0.55" />
        <stop offset="100%" stopColor="#ff3b30" />
      </linearGradient>
    </defs>

    {badge && <rect x="0.75" y="0.75" width="46.5" height="46.5" rx="11" fill="#0b0f14" stroke="#ffffff" strokeOpacity="0.12" />}

    {/* Red — cut losses */}
    <g stroke="url(#tj-down)" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M17 9 L17 35" />
      <path d="M11.5 29 L17 36 L22.5 29" />
    </g>

    {/* Green — stack wins */}
    <g stroke="url(#tj-up)" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M31 39 L31 13" />
      <path d="M25.5 19 L31 12 L36.5 19" />
    </g>

    {/* TJ monogram, sitting between the two arrows */}
    <text
      x="24"
      y="30"
      textAnchor="middle"
      fill="#ffffff"
      fontFamily="Orbitron, ui-sans-serif, system-ui, sans-serif"
      fontWeight="900"
      fontSize="15"
      letterSpacing="-0.5"
      stroke="#0b0f14"
      strokeWidth="3"
      paintOrder="stroke"
    >
      TJ
    </text>
  </svg>
);

export default TjLogo;
