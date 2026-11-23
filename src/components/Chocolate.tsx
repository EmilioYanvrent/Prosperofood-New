import type { CSSProperties } from 'react';

export type PieceKind = 'chunk' | 'shard' | 'bean' | 'curl';

/** Shared gradient + shapes. Render once near the top of the page. */
export function ChocolateDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="choc-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5E3726" />
          <stop offset="1" stopColor="#26140D" />
        </linearGradient>
        <symbol id="choc-chunk" viewBox="0 0 100 100">
          <path d="M6 9 L93 5 L96 58 L82 70 L90 95 L9 93 Z" fill="url(#choc-grad)" />
          <rect x="15" y="15" width="31" height="31" rx="4" fill="#4A2A1C" stroke="#714634" strokeWidth="1.5" />
          <rect x="54" y="13" width="31" height="31" rx="4" fill="#4A2A1C" stroke="#714634" strokeWidth="1.5" />
          <rect x="15" y="54" width="31" height="31" rx="4" fill="#4A2A1C" stroke="#714634" strokeWidth="1.5" />
          <path d="M54 54 L80 54 L74 66 L80 84 L54 84 Z" fill="#4A2A1C" stroke="#714634" strokeWidth="1.5" />
        </symbol>
        <symbol id="choc-shard" viewBox="0 0 100 100">
          <path d="M8 32 L58 6 L95 42 L72 93 L20 82 Z" fill="url(#choc-grad)" />
          <path d="M8 32 L58 6 L56 19 L19 38 Z" fill="#8A5438" opacity="0.55" />
        </symbol>
        <symbol id="choc-bean" viewBox="0 0 100 60">
          <ellipse cx="50" cy="30" rx="46" ry="25" fill="#6E3B27" />
          <path d="M7 31 Q50 17 93 31" stroke="#3A1E12" strokeWidth="3" fill="none" />
          <ellipse cx="38" cy="19" rx="20" ry="5" fill="#9A5B40" opacity="0.5" />
        </symbol>
        <symbol id="choc-curl" viewBox="0 0 100 100">
          <path
            d="M18 72 C 8 30, 62 8, 76 36 C 86 54, 60 72, 47 57 C 39 47, 54 36, 62 45"
            stroke="#45271A" strokeWidth="11" fill="none" strokeLinecap="round"
          />
          <path d="M20 66 C 14 34, 58 16, 70 36" stroke="#8A5438" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </symbol>
      </defs>
    </svg>
  );
}

interface FloatProps {
  kind: PieceKind;
  /** 0.2 = far back (small, blurred, slow) … 0.9 = front (sharp, fast) */
  depth: number;
  size: number;
  rotate?: number;
  /** Position classes, e.g. "left-[4%] top-16" */
  className?: string;
  /** Plays in the hero entrance */
  intro?: boolean;
}

/**
 * A floating chocolate piece. Three nested layers so scroll, bob and
 * mouse-tilt animations never fight over the same transform.
 */
export function FloatingPiece({ kind, depth, size, rotate = 0, className = '', intro }: FloatProps) {
  const blur = depth < 0.35 ? 2.5 : depth < 0.6 ? 1 : 0;
  const shadow = depth >= 0.6 ? `drop-shadow(0 ${Math.round(size / 6)}px ${Math.round(size / 5)}px rgba(0,0,0,0.55))` : '';
  const style: CSSProperties = {
    width: size,
    height: kind === 'bean' ? size * 0.62 : size,
    transform: `rotate(${rotate}deg)`,
    filter: [blur ? `blur(${blur}px)` : '', shadow].filter(Boolean).join(' ') || undefined,
    opacity: depth < 0.35 ? 0.7 : 1,
  };
  return (
    <div
      aria-hidden="true"
      data-float={depth}
      data-intro={intro ? '' : undefined}
      className={`pointer-events-none absolute z-20 ${className}`}
    >
      <div data-bob>
        <div data-tilt>
          <svg style={style} className="block">
            <use href={`#choc-${kind}`} />
          </svg>
        </div>
      </div>
    </div>
  );
}

/** Small static piece used in card hover. */
export function Piece({ kind, size, className = '' }: { kind: PieceKind; size: number; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      style={{ width: size, height: kind === 'bean' ? size * 0.62 : size }}
    >
      <use href={`#choc-${kind}`} />
    </svg>
  );
}
