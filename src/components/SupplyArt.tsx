// Flat illustrations of classroom supplies, drawn for FSA (no stock photos).
// Each is a plain SVG sized by its parent.

type ArtProps = { className?: string };

export const Crayon = ({ className }: ArtProps) => (
  <svg viewBox="0 0 220 60" className={className} aria-hidden="true">
    <path d="M168 12 L214 30 L168 48 Z" fill="#1c9fd8" />
    <path d="M200 25 L214 30 L200 35 Z" fill="#157ab0" />
    <rect x="10" y="10" width="162" height="40" rx="8" fill="#29b6f0" />
    <rect x="34" y="10" width="92" height="40" fill="#1a8cc4" />
    <rect x="42" y="10" width="8" height="40" fill="#0f6a99" />
    <rect x="110" y="10" width="8" height="40" fill="#0f6a99" />
    <rect x="58" y="22" width="44" height="16" rx="3" fill="#bfe8fb" />
  </svg>
);

export const Pencil = ({ className }: ArtProps) => (
  <svg viewBox="0 0 240 44" className={className} aria-hidden="true">
    <rect x="4" y="8" width="30" height="28" rx="6" fill="#f28ca5" />
    <rect x="30" y="8" width="20" height="28" fill="#b8bec7" />
    <rect x="34" y="8" width="3" height="28" fill="#8d949e" />
    <rect x="42" y="8" width="3" height="28" fill="#8d949e" />
    <rect x="50" y="8" width="140" height="28" fill="#f7c325" />
    <rect x="50" y="17" width="140" height="10" fill="#f0b000" />
    <path d="M190 8 L230 22 L190 36 Z" fill="#f3d3a5" />
    <path d="M218 18 L230 22 L218 26 Z" fill="#3b3f46" />
  </svg>
);

export const GlueStick = ({ className }: ArtProps) => (
  <svg viewBox="0 0 70 200" className={className} aria-hidden="true">
    <rect x="10" y="6" width="50" height="58" rx="10" fill="#f47a20" />
    <rect x="10" y="50" width="50" height="10" fill="#d9621a" />
    <rect x="14" y="60" width="42" height="134" rx="6" fill="#f7f7f5" />
    <rect x="14" y="84" width="42" height="70" fill="#7f4bd6" />
    <rect x="20" y="96" width="30" height="8" rx="2" fill="#f7c325" />
    <rect x="20" y="112" width="30" height="5" rx="2" fill="#ffffff" />
    <rect x="20" y="122" width="22" height="5" rx="2" fill="#ffffff" />
  </svg>
);

export const Eraser = ({ className }: ArtProps) => (
  <svg viewBox="0 0 180 90" className={className} aria-hidden="true">
    <path d="M24 14 H160 L172 76 H12 Z" fill="#f4a0b4" />
    <path d="M12 76 H172 L168 84 H16 Z" fill="#dc7f97" />
    <rect x="52" y="36" width="80" height="8" rx="4" fill="#c85f7d" opacity="0.6" />
    <rect x="62" y="50" width="60" height="6" rx="3" fill="#c85f7d" opacity="0.4" />
  </svg>
);

export const Notebook = ({ className }: ArtProps) => (
  <svg viewBox="0 0 150 190" className={className} aria-hidden="true">
    <rect x="14" y="6" width="130" height="178" rx="8" fill="#e8eef7" />
    <rect x="8" y="10" width="130" height="178" rx="8" fill="#2f6fd6" />
    <rect x="38" y="44" width="80" height="34" rx="4" fill="#ffffff" />
    <rect x="46" y="54" width="54" height="5" rx="2" fill="#2f6fd6" />
    <rect x="46" y="64" width="38" height="5" rx="2" fill="#9db9ea" />
    {[28, 52, 76, 100, 124, 148, 170].map((y) => (
      <rect key={y} x="2" y={y} width="18" height="7" rx="3.5" fill="#b8bec7" />
    ))}
  </svg>
);

export const Marker = ({ className }: ArtProps) => (
  <svg viewBox="0 0 60 210" className={className} aria-hidden="true">
    <rect x="12" y="4" width="36" height="56" rx="8" fill="#23262b" />
    <rect x="44" y="12" width="8" height="40" rx="3" fill="#23262b" />
    <rect x="10" y="58" width="40" height="132" rx="6" fill="#f7f7f5" />
    <rect x="10" y="96" width="40" height="46" fill="#23262b" />
    <rect x="18" y="106" width="24" height="6" rx="2" fill="#ffffff" />
    <rect x="18" y="118" width="16" height="6" rx="2" fill="#ffffff" />
    <path d="M18 190 H42 L36 206 H24 Z" fill="#23262b" />
  </svg>
);

export const PaperFan = ({ className }: ArtProps) => (
  <svg viewBox="0 0 240 150" className={className} aria-hidden="true">
    {["#e2376a", "#f47a20", "#f7c325", "#35b36b", "#2f6fd6", "#7f4bd6"].map((color, i) => (
      <rect
        key={color}
        x="60"
        y="20"
        width="150"
        height="110"
        rx="3"
        fill={color}
        transform={`rotate(${-30 + i * 9} 70 140)`}
      />
    ))}
  </svg>
);

export const CrayonBox = ({ className }: ArtProps) => (
  <svg viewBox="0 0 150 190" className={className} aria-hidden="true">
    {["#e2376a", "#f47a20", "#35b36b", "#2f6fd6", "#7f4bd6"].map((color, i) => (
      <g key={color}>
        <rect x={22 + i * 22} y="18" width="16" height="70" rx="3" fill={color} />
        <path d={`M${22 + i * 22} 22 L${30 + i * 22} 4 L${38 + i * 22} 22 Z`} fill={color} />
      </g>
    ))}
    <path d="M10 60 H140 L132 184 H18 Z" fill="#f7c325" />
    <path d="M10 60 H140 L136 84 H14 Z" fill="#35b36b" />
    <rect x="42" y="104" width="66" height="44" rx="6" fill="#ffffff" />
    <rect x="52" y="116" width="46" height="7" rx="3" fill="#35b36b" />
    <rect x="58" y="129" width="34" height="6" rx="3" fill="#f47a20" />
  </svg>
);

export const DeliveryBox = ({ className }: ArtProps) => (
  <svg viewBox="0 0 170 150" className={className} aria-hidden="true">
    <path d="M20 44 L85 14 L150 44 L85 74 Z" fill="#e2b77a" />
    <path d="M20 44 V116 L85 146 V74 Z" fill="#c9965a" />
    <path d="M150 44 V116 L85 146 V74 Z" fill="#d8a767" />
    <path d="M50 30 L115 60 V82 L103 76 V56 L40 26 Z" fill="#f2d7ab" />
    <path d="M100 98 L132 84 V100 L100 114 Z" fill="#ffffff" opacity="0.85" />
  </svg>
);
