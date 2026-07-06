"use client";

import { useMemo } from "react";

/**
 * qr-tag — a purely DECORATIVE, deterministic "QR-like" tag.
 *
 * This is NOT a scannable QR code. It renders a stylised module grid derived
 * deterministically from the token string (char codes only, never Math.random),
 * so the same token always yields the same pattern. It is labelled with the
 * token text and a "Demo-Code" caption so nobody mistakes it for a real code.
 */

const GRID = 15;

/** Deterministic 0..1 pseudo-value from a seed (no Math.random). */
function hash(seed: number): number {
  // xorshift-style scramble on a 32-bit int, mapped to [0,1)
  let x = seed | 0;
  x ^= x << 13;
  x ^= x >>> 17;
  x ^= x << 5;
  return ((x >>> 0) % 1000) / 1000;
}

/** Is (row,col) inside one of the three decorative finder squares? */
function isFinder(row: number, col: number): boolean {
  const inBox = (r0: number, c0: number) =>
    row >= r0 && row < r0 + 3 && col >= c0 && col < c0 + 3;
  return inBox(0, 0) || inBox(0, GRID - 3) || inBox(GRID - 3, 0);
}

type QrTagProps = {
  token: string;
  caption: string;
  className?: string;
};

export function QrTag({ token, caption, className }: QrTagProps) {
  const modules = useMemo(() => {
    // Base seed from all char codes, so the whole token influences the pattern.
    let base = 0;
    for (let i = 0; i < token.length; i++) {
      base = (base * 31 + token.charCodeAt(i)) | 0;
    }
    const cells: boolean[] = [];
    for (let row = 0; row < GRID; row++) {
      for (let col = 0; col < GRID; col++) {
        if (isFinder(row, col)) {
          cells.push(true);
          continue;
        }
        const seed = base + (row * 73_856_093) ^ (col * 19_349_663);
        cells.push(hash(seed) > 0.52);
      }
    }
    return cells;
  }, [token]);

  return (
    <figure className={className}>
      <div className="inline-flex flex-col items-center gap-3 rounded-2xl border border-[color:var(--obsidian-line)] bg-[color:var(--obsidian)] p-4">
        <svg
          viewBox={`0 0 ${GRID} ${GRID}`}
          role="img"
          aria-label={caption}
          className="h-32 w-32"
          shapeRendering="crispEdges"
        >
          <rect x={0} y={0} width={GRID} height={GRID} fill="transparent" />
          {modules.map((on, index) =>
            on ? (
              <rect
                key={index}
                x={index % GRID}
                y={Math.floor(index / GRID)}
                width={1}
                height={1}
                fill="url(#goldFoil)"
              />
            ) : null
          )}
        </svg>
        <figcaption className="flex flex-col items-center gap-0.5 text-center">
          <span className="font-mono text-[0.7rem] tracking-[0.2em] text-white">{token}</span>
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-white/45">
            {caption}
          </span>
        </figcaption>
      </div>
    </figure>
  );
}
