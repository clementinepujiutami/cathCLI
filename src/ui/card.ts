import chalk from 'chalk';
import { PixelArt, renderHalftone, toLuminance, mix } from './render';

// ── Prayer card ─────────────────────────────────────────────────────────────
// The poster treatment: a hot halftone panel with the subject burned into it as
// type, then the prayer set beneath in mono on a dark card.

const CARD = {
  bg: '#12100e',
  panelFrom: '#f04d21',
  panelTo: '#b81d13',
  inkLo: '#7a1a0d',
  inkHi: '#ffd24a',
  head: '#f5eedb',
  sub: '#8a8078',
  body: '#d9cfc0',
  tagBg: '#f5eedb',
  tagFg: '#12100e',
};

const ANSI_RE = /\x1B\[[0-9;]*[mGKHF]/g;
const visLen = (s: string) => s.replace(ANSI_RE, '').length;

// Box-average downscale. Nearest-neighbour drops too much detail at the sizes
// a terminal panel runs at, and the halftone ramp needs the averaged tone.
function scaleLum(src: number[][], w: number, h: number): number[][] {
  const sh = src.length;
  const sw = src[0]?.length ?? 0;
  if (!sh || !sw) return [];
  const out: number[][] = [];
  for (let y = 0; y < h; y++) {
    const y0 = Math.floor((y * sh) / h);
    const y1 = Math.max(y0 + 1, Math.floor(((y + 1) * sh) / h));
    const row: number[] = [];
    for (let x = 0; x < w; x++) {
      const x0 = Math.floor((x * sw) / w);
      const x1 = Math.max(x0 + 1, Math.floor(((x + 1) * sw) / w));
      let sum = 0, n = 0;
      for (let yy = y0; yy < y1 && yy < sh; yy++) {
        for (let xx = x0; xx < x1 && xx < sw; xx++) { sum += src[yy][xx]; n++; }
      }
      row.push(n ? sum / n : 0);
    }
    out.push(row);
  }
  return out;
}

// Some prayer bodies carry their own horizontal rules, hardcoded at the width
// of the old fixed-size box. Redraw them to fit rather than letting them saw
// through the card edge.
const RULE_RE = /^[─—_-]{4,}$/;

function wordWrap(text: string, maxW: number): string[] {
  const out: string[] = [];
  for (const para of text.split('\n')) {
    const t = para.trim();
    if (!t) { out.push(''); continue; }
    if (RULE_RE.test(t)) { out.push('─'.repeat(maxW)); continue; }

    let line = '';
    for (let w of t.split(' ')) {
      // A token longer than the card has to be cut; nothing else can save it.
      while (w.length > maxW) {
        if (line) { out.push(line); line = ''; }
        out.push(w.slice(0, maxW));
        w = w.slice(maxW);
      }
      if (!w) continue;
      if (!line) line = w;
      else if (line.length + 1 + w.length <= maxW) line += ' ' + w;
      else { out.push(line); line = w; }
    }
    if (line) out.push(line);
  }
  return out;
}

/** Render art into a full-bleed halftone panel `w` columns wide, `h` rows tall. */
export function halftonePanel(art: PixelArt, w: number, h = 14): string[] {
  const srcLum = toLuminance(art);
  const srcH = srcLum.length;
  const srcW = srcLum[0]?.length ?? 1;

  // Fit the art inside the panel rather than filling it. A cell is about twice
  // as tall as it is wide, so a row counts double against the aspect ratio.
  // Without the cap, a small source upscales into a panel taller than the
  // terminal and the prayer never gets on screen.
  let fitH = h;
  let fitW = Math.round((srcW / srcH) * fitH * 2);
  if (fitW > w) { fitW = w; fitH = Math.max(1, Math.round(((srcH / srcW) * fitW) / 2)); }

  const scaled = scaleLum(srcLum, fitW, fitH);
  const x0 = Math.floor((w - fitW) / 2);
  const y0 = Math.floor((h - fitH) / 2);

  // Letterbox into the panel; the gradient fills whatever the art doesn't.
  const lum: number[][] = [];
  for (let y = 0; y < h; y++) {
    const row: number[] = [];
    for (let x = 0; x < w; x++) row.push(scaled[y - y0]?.[x - x0] ?? 0);
    lum.push(row);
  }
  return renderHalftone(lum, {
    bg: t => mix(CARD.panelFrom, CARD.panelTo, t),
    fg: t => mix(CARD.inkLo, CARD.inkHi, t),
  });
}

export interface CardOptions {
  category?: string;
  art?: PixelArt;
  width?: number;
  tags?: string[];
}

export function prayerCard(title: string, text: string, opts: CardOptions = {}): string {
  const term = process.stdout.columns ?? 80;
  const w = opts.width ?? Math.min(term - 6, 64);
  const pad = 2;
  const inner = w - pad * 2;

  // Without a 256-color terminal the painted card and halftone collapse into
  // mud, so fall back to the plain typographic card.
  const flat = chalk.level <= 1;
  // Foreground codes reset only the foreground, so one background span can wrap
  // a whole line without the inner colors punching holes in it.
  const line = (content = '') => {
    if (flat) return (' '.repeat(pad) + content).replace(/\s+$/, '');
    const gap = Math.max(0, inner - visLen(content));
    return chalk.bgHex(CARD.bg)(' '.repeat(pad) + content + ' '.repeat(gap + pad));
  };

  const out: string[] = [];
  out.push('');

  if (opts.art && !flat) {
    for (const row of halftonePanel(opts.art, w)) out.push(row);
  }

  out.push(line());
  // Titles wrap like body text; several prayer names are long enough to punch
  // through the card edge on a narrow terminal otherwise.
  for (const l of wordWrap(title.toUpperCase(), inner)) {
    out.push(line(chalk.hex(CARD.head).bold(l)));
  }
  if (opts.category) {
    for (const l of wordWrap(opts.category.toUpperCase(), inner)) {
      out.push(line(chalk.hex(CARD.sub)(l)));
    }
  }
  out.push(line());
  for (const l of wordWrap(text, inner)) out.push(line(chalk.hex(CARD.body)(l)));
  out.push(line());

  if (opts.tags?.length) {
    // Tags flow onto as many rows as they need, and a tag too wide for the card
    // is truncated rather than allowed to overhang the edge.
    const cells = opts.tags.map(t => {
      const max = Math.max(1, inner - 4);
      const label = t.length > max ? t.slice(0, Math.max(1, max - 1)) + '…' : t;
      const s =
        chalk.hex(CARD.sub)('> ') +
        (flat ? label : chalk.bgHex(CARD.tagBg).hex(CARD.tagFg)(` ${label} `));
      return { s, w: visLen(s) };
    });

    let cur: string[] = [];
    let curW = 0;
    for (const c of cells) {
      const add = cur.length ? 2 + c.w : c.w;
      if (cur.length && curW + add > inner) {
        out.push(line(cur.join('  ')));
        cur = [c.s];
        curW = c.w;
      } else {
        cur.push(c.s);
        curW += add;
      }
    }
    if (cur.length) out.push(line(cur.join('  ')));
    out.push(line());
  }

  const m = '  ';
  const lines = out.map(l => m + l);
  // Painted cards need their blank rows to keep the background; flat ones would
  // just be emitting trailing whitespace.
  return (flat ? lines.map(l => l.replace(/\s+$/, '')) : lines).join('\n') + '\n';
}
