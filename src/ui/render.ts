import chalk from 'chalk';

// ── Pixel art model ─────────────────────────────────────────────────────────
// Art is one character per pixel indexing into a palette. Build-time dithering
// targets a small fixed palette (4-8 tones), which is what keeps the look
// intact when chalk downgrades hex for 256- and 16-color terminals.

export interface PixelArt {
  palette: Record<string, string | null>; // char -> hex, null = transparent
  rows: string[];
}

// ── Color helpers ───────────────────────────────────────────────────────────
function rgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

// Rec. 709 luma, normalized 0..1
export function luminance(hex: string): number {
  const [r, g, b] = rgb(hex);
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

export function mix(a: string, b: string, t: number): string {
  const [ar, ag, ab] = rgb(a);
  const [br, bg, bb] = rgb(b);
  const c = (x: number, y: number) =>
    Math.round(x + (y - x) * t).toString(16).padStart(2, '0');
  return `#${c(ar, br)}${c(ag, bg)}${c(ab, bb)}`;
}

// ── Density ramp ────────────────────────────────────────────────────────────
// Sparse -> dense. Used for halftone cards, and for the no-color fallback.
export const RAMP = ' .:-=+*#%@';

function rampChar(t: number, ramp = RAMP): string {
  const i = Math.round(Math.max(0, Math.min(1, t)) * (ramp.length - 1));
  return ramp[i];
}

// ── Art access ──────────────────────────────────────────────────────────────
export function artWidth(art: PixelArt): number {
  return art.rows.reduce((w, r) => Math.max(w, r.length), 0);
}

function colorAt(art: PixelArt, x: number, y: number): string | null {
  const row = art.rows[y];
  if (row === undefined) return null;
  const ch = row[x];
  if (ch === undefined) return null;
  return art.palette[ch] ?? null;
}

// ── Half-block renderer ─────────────────────────────────────────────────────
// A terminal cell is roughly twice as tall as it is wide, so painting the top
// half and bottom half as separate colors yields square pixels at one column
// each. That doubles vertical resolution over the old two-char-per-pixel art.
const UPPER = '▀'; // ▀
const LOWER = '▄'; // ▄

function cell(top: string | null, bottom: string | null): string {
  if (!top && !bottom) return ' ';
  if (top && !bottom) return chalk.hex(top)(UPPER);
  if (!top && bottom) return chalk.hex(bottom)(LOWER);
  return chalk.hex(top as string).bgHex(bottom as string)(UPPER);
}

export function renderHalfBlocks(art: PixelArt): string[] {
  // 256-color quantization preserves a small palette faithfully, but 16-color
  // does not: a dark-weighted 5-tone ramp collapses to ~2 tones there, flattening
  // figures into silhouettes. Below level 2 the luminance ramp carries the
  // tonal structure better than the color does.
  if (chalk.level <= 1) return renderAscii(art);

  const width = artWidth(art);
  const out: string[] = [];
  for (let y = 0; y < art.rows.length; y += 2) {
    let line = '';
    for (let x = 0; x < width; x++) {
      line += cell(colorAt(art, x, y), colorAt(art, x, y + 1));
    }
    out.push(line);
  }
  return out;
}

// ── ASCII fallback ──────────────────────────────────────────────────────────
// Assumes a dark terminal: brighter pixels get denser glyphs. Two chars per
// pixel keeps the aspect ratio square, matching the old art's proportions.
export function renderAscii(art: PixelArt, ramp = RAMP): string[] {
  const width = artWidth(art);
  return art.rows.map(() => '').map((_, y) => {
    let line = '';
    for (let x = 0; x < width; x++) {
      const c = colorAt(art, x, y);
      const ch = c === null ? ' ' : rampChar(luminance(c), ramp);
      line += ch + ch;
    }
    return line;
  });
}

// ── Halftone renderer ───────────────────────────────────────────────────────
// Subject luminance drives glyph density; position drives the background
// gradient. This is the poster look: a hot field with the subject burned into
// it as type.

export interface HalftoneOptions {
  ramp?: string;
  /** Background gradient sampled by vertical position, 0..1. */
  bg?: (t: number) => string;
  /** Glyph color sampled by subject luminance, 0..1. */
  fg: (t: number) => string;
}

export function renderHalftone(lum: number[][], opts: HalftoneOptions): string[] {
  const ramp = opts.ramp ?? RAMP;
  const rows = lum.length;
  return lum.map((row, y) => {
    const t = rows > 1 ? y / (rows - 1) : 0;
    const bg = opts.bg?.(t);
    return row
      .map(v => {
        const ch = rampChar(v, ramp);
        const fg = opts.fg(v);
        return bg ? chalk.hex(fg).bgHex(bg)(ch) : chalk.hex(fg)(ch);
      })
      .join('');
  });
}

// ── Luminance extraction ────────────────────────────────────────────────────
// Bridges the two renderers: lets pixel art be fed to the halftone pass.
export function toLuminance(art: PixelArt): number[][] {
  const width = artWidth(art);
  return art.rows.map((_, y) => {
    const row: number[] = [];
    for (let x = 0; x < width; x++) {
      const c = colorAt(art, x, y);
      row.push(c === null ? 0 : luminance(c));
    }
    return row;
  });
}
