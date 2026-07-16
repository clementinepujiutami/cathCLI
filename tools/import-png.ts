import zlib from 'zlib';
import fs from 'fs';
import path from 'path';
import { PixelArt } from '../src/ui/render';

// ── PNG decoder ─────────────────────────────────────────────────────────────
// Turns hand-drawn pixel art (Aseprite, Piskel, Photoshop) into the PixelArt
// literal the renderer eats. Decoding is hand-rolled because pixel art is
// always 8-bit non-interlaced, which is the easy corner of the spec. Photographic
// sources for the figure pipeline are a different problem and will want a real
// image library.

interface Decoded {
  width: number;
  height: number;
  rgba: Uint8Array; // 4 bytes per pixel
}

function paeth(a: number, b: number, c: number): number {
  const p = a + b - c;
  const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

const CHANNELS: Record<number, number> = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 };

export function decodePng(buf: Buffer): Decoded {
  const sig = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  if (!sig.every((b, i) => buf[i] === b)) throw new Error('not a PNG');

  let pos = 8;
  let width = 0, height = 0, depth = 0, colorType = 0, interlace = 0;
  let plte: Buffer | null = null;
  let trns: Buffer | null = null;
  const idat: Buffer[] = [];

  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    const data = buf.subarray(pos + 8, pos + 8 + len);
    pos += 12 + len; // len + type + data + crc

    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      depth = data[8];
      colorType = data[9];
      interlace = data[12];
    } else if (type === 'PLTE') plte = Buffer.from(data);
    else if (type === 'tRNS') trns = Buffer.from(data);
    else if (type === 'IDAT') idat.push(Buffer.from(data));
    else if (type === 'IEND') break;
  }

  if (depth !== 8) throw new Error(`unsupported bit depth ${depth}; export 8-bit`);
  if (interlace !== 0) throw new Error('interlaced PNG unsupported; export non-interlaced');
  const chans = CHANNELS[colorType];
  if (!chans) throw new Error(`unsupported color type ${colorType}`);

  const raw = zlib.inflateSync(Buffer.concat(idat));
  const bpp = chans;
  const lineBytes = width * bpp;
  const out = new Uint8Array(width * height * 4);
  let prev = new Uint8Array(lineBytes);
  let p = 0;

  for (let y = 0; y < height; y++) {
    const filter = raw[p++];
    const line = new Uint8Array(lineBytes);
    for (let i = 0; i < lineBytes; i++) {
      const x = raw[p + i];
      const a = i >= bpp ? line[i - bpp] : 0;
      const b = prev[i];
      const c = i >= bpp ? prev[i - bpp] : 0;
      let v: number;
      switch (filter) {
        case 0: v = x; break;
        case 1: v = x + a; break;
        case 2: v = x + b; break;
        case 3: v = x + ((a + b) >> 1); break;
        case 4: v = x + paeth(a, b, c); break;
        default: throw new Error(`bad filter ${filter} on row ${y}`);
      }
      line[i] = v & 0xff;
    }
    p += lineBytes;

    for (let x = 0; x < width; x++) {
      const s = x * bpp;
      const d = (y * width + x) * 4;
      let r: number, g: number, bl: number, al = 255;
      if (colorType === 0) { r = g = bl = line[s]; }
      else if (colorType === 4) { r = g = bl = line[s]; al = line[s + 1]; }
      else if (colorType === 2) { r = line[s]; g = line[s + 1]; bl = line[s + 2]; }
      else if (colorType === 6) { r = line[s]; g = line[s + 1]; bl = line[s + 2]; al = line[s + 3]; }
      else { // palette
        const i = line[s];
        if (!plte) throw new Error('palette PNG without PLTE');
        r = plte[i * 3]; g = plte[i * 3 + 1]; bl = plte[i * 3 + 2];
        al = trns && i < trns.length ? trns[i] : 255;
      }
      out[d] = r; out[d + 1] = g; out[d + 2] = bl; out[d + 3] = al;
    }
    prev = line;
  }

  return { width, height, rgba: out };
}

// ── Quantize to a PixelArt ──────────────────────────────────────────────────
// Pixel art has few distinct colors by definition, so every unique color gets
// its own palette char. Blowing the char budget means the input is photographic
// and needs dithering down first, which is a different pipeline.
const CHARS = 'KMGRWEPDacdefghijklmnopqstuvwxyz0123456789ABCFHIJLNOQSTUVXYZ';

export function toPixelArt(d: Decoded, alphaCutoff = 128): PixelArt {
  const map = new Map<string, string>();
  const palette: Record<string, string | null> = { '.': null };
  const rows: string[] = [];

  for (let y = 0; y < d.height; y++) {
    let row = '';
    for (let x = 0; x < d.width; x++) {
      const i = (y * d.width + x) * 4;
      if (d.rgba[i + 3] < alphaCutoff) { row += '.'; continue; }
      const hex =
        '#' + [d.rgba[i], d.rgba[i + 1], d.rgba[i + 2]]
          .map(v => v.toString(16).padStart(2, '0')).join('');
      let ch = map.get(hex);
      if (!ch) {
        if (map.size >= CHARS.length) {
          throw new Error(
            `more than ${CHARS.length} distinct colors; this looks photographic ` +
            `rather than pixel art. Dither it down to a small palette first.`
          );
        }
        ch = CHARS[map.size];
        map.set(hex, ch);
        palette[ch] = hex;
      }
      row += ch;
    }
    rows.push(row.replace(/\.+$/, ''));
  }
  return { palette, rows };
}

// ── Emit ────────────────────────────────────────────────────────────────────
export function emitTs(art: PixelArt, name: string): string {
  const pal = Object.entries(art.palette)
    .map(([k, v]) => `  '${k}': ${v === null ? 'null' : `'${v}'`},`)
    .join('\n');
  const rows = art.rows.map(r => `  '${r}',`).join('\n');
  return `import { PixelArt } from '../render';

// Generated by tools/import-png.ts. Edit the source PNG, not this file.
export const ${name}: PixelArt = {
  palette: {
${pal}
  },
  rows: [
${rows}
  ],
};
`;
}

// ── CLI ─────────────────────────────────────────────────────────────────────
if (require.main === module) {
  const [input, outArg] = process.argv.slice(2);
  if (!input) {
    console.error('usage: ts-node tools/import-png.ts <in.png> [out.ts]');
    process.exit(1);
  }
  const art = toPixelArt(decodePng(fs.readFileSync(input)));
  const name = path.basename(input, '.png').replace(/[^a-z0-9]/gi, '');
  const w = art.rows.reduce((m, r) => Math.max(m, r.length), 0);
  const colors = Object.keys(art.palette).length - 1;
  console.error(`${input}: ${w}x${art.rows.length}, ${colors} colors -> ${w} cols x ${Math.ceil(art.rows.length / 2)} rows`);
  const ts = emitTs(art, name);
  if (outArg) { fs.writeFileSync(outArg, ts); console.error(`wrote ${outArg}`); }
  else process.stdout.write(ts);
}
