import fs from 'fs';
import { decodePng, toPixelArt, emitTs } from './import-png';
import { encodePng } from './png';
import { PixelArt } from '../src/ui/render';

// ── Dither-down pipeline ────────────────────────────────────────────────────
// Brings photographic or painterly sources (AI-generated art, scanned paintings)
// down to the handful of flat tones the terminal renders well. This is the step
// that makes the `mama mary` look reproducible: the aesthetic is the pipeline,
// not hand-placed pixels.
//
//   decode -> downscale -> quantize to a palette -> dither -> PixelArt
//
// Pin the palette to keep art on-brand; derive it to respect the source.

type RGB = [number, number, number];

interface Image { w: number; h: number; rgba: Uint8Array; }

// cathCLI's own colors. Dithering to these keeps generated art in the family.
export const CATH_PALETTE: string[] = [
  '#2a1a12', '#5c2a1c', '#8a5a2c', '#c68642',
  '#cc2222', '#8a2f24', '#f5c542', '#f5eedb', '#87beea',
];

const hexToRgb = (h: string): RGB => [
  parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16),
];
const rgbToHex = (c: RGB): string =>
  '#' + c.map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');

// ── Downscale ───────────────────────────────────────────────────────────────
// Box average, weighted by alpha so transparent pixels don't drag edges toward
// black. Sources are typically far larger than the 40-ish pixels a terminal wants.
function downscale(img: Image, tw: number, th: number): Image {
  const out = new Uint8Array(tw * th * 4);
  for (let y = 0; y < th; y++) {
    const y0 = Math.floor((y * img.h) / th);
    const y1 = Math.max(y0 + 1, Math.floor(((y + 1) * img.h) / th));
    for (let x = 0; x < tw; x++) {
      const x0 = Math.floor((x * img.w) / tw);
      const x1 = Math.max(x0 + 1, Math.floor(((x + 1) * img.w) / tw));
      let r = 0, g = 0, b = 0, a = 0, aw = 0, n = 0;
      for (let yy = y0; yy < y1; yy++) {
        for (let xx = x0; xx < x1; xx++) {
          const i = (yy * img.w + xx) * 4;
          const al = img.rgba[i + 3] / 255;
          r += img.rgba[i] * al; g += img.rgba[i + 1] * al; b += img.rgba[i + 2] * al;
          aw += al; a += img.rgba[i + 3]; n++;
        }
      }
      const d = (y * tw + x) * 4;
      out[d] = aw > 0 ? r / aw : 0;
      out[d + 1] = aw > 0 ? g / aw : 0;
      out[d + 2] = aw > 0 ? b / aw : 0;
      out[d + 3] = n ? a / n : 0;
    }
  }
  return { w: tw, h: th, rgba: out };
}

// ── Median cut ──────────────────────────────────────────────────────────────
// Repeatedly split the box with the widest channel spread at its median. Cheap,
// deterministic, and good enough at these palette sizes.
function medianCut(pixels: RGB[], n: number): string[] {
  if (!pixels.length) return ['#000000'];
  let boxes: RGB[][] = [pixels];
  while (boxes.length < n) {
    let bi = -1, bestRange = -1;
    boxes.forEach((box, i) => {
      if (box.length < 2) return;
      for (let c = 0; c < 3; c++) {
        let lo = 255, hi = 0;
        for (const p of box) { if (p[c] < lo) lo = p[c]; if (p[c] > hi) hi = p[c]; }
        if (hi - lo > bestRange) { bestRange = hi - lo; bi = i; }
      }
    });
    if (bi < 0) break;

    const box = boxes[bi];
    let ch = 0, best = -1;
    for (let c = 0; c < 3; c++) {
      let lo = 255, hi = 0;
      for (const p of box) { if (p[c] < lo) lo = p[c]; if (p[c] > hi) hi = p[c]; }
      if (hi - lo > best) { best = hi - lo; ch = c; }
    }
    box.sort((a, b) => a[ch] - b[ch]);
    const mid = box.length >> 1;
    boxes.splice(bi, 1, box.slice(0, mid), box.slice(mid));
  }
  return boxes.filter(b => b.length).map(box => {
    const s: RGB = [0, 0, 0];
    for (const p of box) { s[0] += p[0]; s[1] += p[1]; s[2] += p[2]; }
    return rgbToHex([s[0] / box.length, s[1] / box.length, s[2] / box.length]);
  });
}

function nearest(c: RGB, pal: RGB[]): number {
  let bi = 0, bd = Infinity;
  for (let i = 0; i < pal.length; i++) {
    const dr = c[0] - pal[i][0], dg = c[1] - pal[i][1], db = c[2] - pal[i][2];
    // Rec. 601 weighting: matches perceived brightness better than raw RGB.
    const d = 0.299 * dr * dr + 0.587 * dg * dg + 0.114 * db * db;
    if (d < bd) { bd = d; bi = i; }
  }
  return bi;
}

// ── Dither ──────────────────────────────────────────────────────────────────
const BAYER4 = [
  [0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5],
].map(r => r.map(v => v / 16 - 0.5));

export type DitherMode = 'fs' | 'bayer' | 'none';

function quantize(img: Image, palHex: string[], mode: DitherMode, alphaCutoff: number) {
  const pal = palHex.map(hexToRgb);
  const buf = new Float32Array(img.w * img.h * 3);
  for (let i = 0, p = 0; i < img.rgba.length; i += 4, p += 3) {
    buf[p] = img.rgba[i]; buf[p + 1] = img.rgba[i + 1]; buf[p + 2] = img.rgba[i + 2];
  }

  const idx = new Int16Array(img.w * img.h).fill(-1);
  for (let y = 0; y < img.h; y++) {
    for (let x = 0; x < img.w; x++) {
      const i = y * img.w + x;
      if (img.rgba[i * 4 + 3] < alphaCutoff) continue; // transparent

      const p = i * 3;
      let c: RGB = [buf[p], buf[p + 1], buf[p + 2]];
      if (mode === 'bayer') {
        const t = BAYER4[y % 4][x % 4] * 48; // spread ~ palette step
        c = [c[0] + t, c[1] + t, c[2] + t];
      }
      const k = nearest(c, pal);
      idx[i] = k;

      if (mode === 'fs') {
        const err: RGB = [c[0] - pal[k][0], c[1] - pal[k][1], c[2] - pal[k][2]];
        const spread = (dx: number, dy: number, f: number) => {
          const nx = x + dx, ny = y + dy;
          if (nx < 0 || nx >= img.w || ny < 0 || ny >= img.h) return;
          const q = (ny * img.w + nx) * 3;
          buf[q] += err[0] * f; buf[q + 1] += err[1] * f; buf[q + 2] += err[2] * f;
        };
        spread(1, 0, 7 / 16); spread(-1, 1, 3 / 16); spread(0, 1, 5 / 16); spread(1, 1, 1 / 16);
      }
    }
  }
  return idx;
}

const CHARS = 'KMGRWEPDacdefghijklmnopqstuvwxyz0123456789ABCFHIJLNOQSTUVXYZ';

export interface DitherOptions {
  width?: number;
  colors?: number;
  palette?: string[];
  mode?: DitherMode;
  alphaCutoff?: number;
}

export function ditherToPixelArt(png: Buffer, opts: DitherOptions = {}): PixelArt {
  const dec = decodePng(png);
  let img: Image = { w: dec.width, h: dec.height, rgba: dec.rgba };

  if (opts.width && opts.width < img.w) {
    img = downscale(img, opts.width, Math.max(1, Math.round((img.h / img.w) * opts.width)));
  }

  const cutoff = opts.alphaCutoff ?? 128;
  let palHex = opts.palette;
  if (!palHex) {
    const opaque: RGB[] = [];
    for (let i = 0; i < img.rgba.length; i += 4) {
      if (img.rgba[i + 3] >= cutoff) opaque.push([img.rgba[i], img.rgba[i + 1], img.rgba[i + 2]]);
    }
    palHex = medianCut(opaque, opts.colors ?? 6);
  }
  if (palHex.length > CHARS.length) throw new Error(`palette of ${palHex.length} exceeds the char budget`);

  const idx = quantize(img, palHex, opts.mode ?? 'fs', cutoff);
  const palette: Record<string, string | null> = { '.': null };
  palHex.forEach((h, i) => { palette[CHARS[i]] = h; });

  const rows: string[] = [];
  for (let y = 0; y < img.h; y++) {
    let row = '';
    for (let x = 0; x < img.w; x++) {
      const k = idx[y * img.w + x];
      row += k < 0 ? '.' : CHARS[k];
    }
    rows.push(row.replace(/\.+$/, ''));
  }
  return { palette, rows };
}

// ── CLI ─────────────────────────────────────────────────────────────────────
if (require.main === module) {
  const args = process.argv.slice(2);
  const flag = (n: string) => { const i = args.indexOf('--' + n); return i < 0 ? undefined : args[i + 1]; };
  const input = args[0];
  if (!input || input.startsWith('--')) {
    console.error(`usage: ts-node tools/dither.ts <in.png> [options]
  --width N        target width in pixels (default 40)
  --colors N       derive an N-color palette (default 6)
  --cath           pin to cathCLI's palette instead of deriving one
  --mode fs|bayer|none   dither style (default fs)
  --out FILE.ts    emit a PixelArt module
  --preview F.png  write a PNG to eyeball`);
    process.exit(1);
  }

  const art = ditherToPixelArt(fs.readFileSync(input), {
    width: Number(flag('width') ?? 40),
    colors: Number(flag('colors') ?? 6),
    palette: args.includes('--cath') ? CATH_PALETTE : undefined,
    mode: (flag('mode') as DitherMode) ?? 'fs',
  });

  const w = art.rows.reduce((m, r) => Math.max(m, r.length), 0);
  const colors = Object.keys(art.palette).length - 1;
  console.error(`${input}: -> ${w}x${art.rows.length}, ${colors} colors, ${w} cols x ${Math.ceil(art.rows.length / 2)} rows`);

  const preview = flag('preview');
  if (preview) { fs.writeFileSync(preview, encodePng(art, 8)); console.error(`wrote ${preview}`); }
  const out = flag('out');
  if (out) {
    const name = out.split('/').pop()!.replace('.ts', '').replace(/[^a-z0-9]/gi, '');
    fs.writeFileSync(out, emitTs(art, name));
    console.error(`wrote ${out}`);
  }
}
