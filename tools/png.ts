import zlib from 'zlib';
import { PixelArt, artWidth } from '../src/ui/render';

// ── Minimal PNG encoder ─────────────────────────────────────────────────────
// The pipeline has to emit the same art twice: escape codes for the terminal
// and a PNG for the landing page. Hand-rolling the encoder keeps this a
// devDependency-free build step, and PNG's uncompressed-RGBA path is small
// enough to not be worth a library.

const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf: Buffer): number {
  let crc = -1;
  for (let i = 0; i < buf.length; i++) {
    crc = CRC_TABLE[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ -1) >>> 0;
}

function chunk(type: string, data: Buffer): Buffer {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function rgba(hex: string | null): [number, number, number, number] {
  if (hex === null) return [0, 0, 0, 0];
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
    255,
  ];
}

/** Encode pixel art to a PNG buffer. `scale` nearest-neighbours each pixel. */
export function encodePng(art: PixelArt, scale = 1): Buffer {
  const w = artWidth(art);
  const h = art.rows.length;
  const sw = w * scale;
  const sh = h * scale;

  const raw = Buffer.alloc(sh * (sw * 4 + 1));
  let p = 0;
  for (let y = 0; y < sh; y++) {
    raw[p++] = 0; // filter: none
    const row = art.rows[Math.floor(y / scale)];
    for (let x = 0; x < sw; x++) {
      const ch = row?.[Math.floor(x / scale)];
      const [r, g, b, a] = rgba(ch === undefined ? null : art.palette[ch] ?? null);
      raw[p++] = r;
      raw[p++] = g;
      raw[p++] = b;
      raw[p++] = a;
    }
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(sw, 0);
  ihdr.writeUInt32BE(sh, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type: RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}
