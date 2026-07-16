"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RAMP = void 0;
exports.luminance = luminance;
exports.mix = mix;
exports.artWidth = artWidth;
exports.renderHalfBlocks = renderHalfBlocks;
exports.renderAscii = renderAscii;
exports.renderHalftone = renderHalftone;
exports.toLuminance = toLuminance;
const chalk_1 = __importDefault(require("chalk"));
// ── Color helpers ───────────────────────────────────────────────────────────
function rgb(hex) {
    const h = hex.replace('#', '');
    return [
        parseInt(h.slice(0, 2), 16),
        parseInt(h.slice(2, 4), 16),
        parseInt(h.slice(4, 6), 16),
    ];
}
// Rec. 709 luma, normalized 0..1
function luminance(hex) {
    const [r, g, b] = rgb(hex);
    return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}
function mix(a, b, t) {
    const [ar, ag, ab] = rgb(a);
    const [br, bg, bb] = rgb(b);
    const c = (x, y) => Math.round(x + (y - x) * t).toString(16).padStart(2, '0');
    return `#${c(ar, br)}${c(ag, bg)}${c(ab, bb)}`;
}
// ── Density ramp ────────────────────────────────────────────────────────────
// Sparse -> dense. Used for halftone cards, and for the no-color fallback.
exports.RAMP = ' .:-=+*#%@';
function rampChar(t, ramp = exports.RAMP) {
    const i = Math.round(Math.max(0, Math.min(1, t)) * (ramp.length - 1));
    return ramp[i];
}
// ── Art access ──────────────────────────────────────────────────────────────
function artWidth(art) {
    return art.rows.reduce((w, r) => Math.max(w, r.length), 0);
}
function colorAt(art, x, y) {
    const row = art.rows[y];
    if (row === undefined)
        return null;
    const ch = row[x];
    if (ch === undefined)
        return null;
    return art.palette[ch] ?? null;
}
// ── Half-block renderer ─────────────────────────────────────────────────────
// A terminal cell is roughly twice as tall as it is wide, so painting the top
// half and bottom half as separate colors yields square pixels at one column
// each. That doubles vertical resolution over the old two-char-per-pixel art.
const UPPER = '▀'; // ▀
const LOWER = '▄'; // ▄
function cell(top, bottom) {
    if (!top && !bottom)
        return ' ';
    if (top && !bottom)
        return chalk_1.default.hex(top)(UPPER);
    if (!top && bottom)
        return chalk_1.default.hex(bottom)(LOWER);
    return chalk_1.default.hex(top).bgHex(bottom)(UPPER);
}
function renderHalfBlocks(art) {
    // 256-color quantization preserves a small palette faithfully, but 16-color
    // does not: a dark-weighted 5-tone ramp collapses to ~2 tones there, flattening
    // figures into silhouettes. Below level 2 the luminance ramp carries the
    // tonal structure better than the color does.
    if (chalk_1.default.level <= 1)
        return renderAscii(art);
    const width = artWidth(art);
    const out = [];
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
function renderAscii(art, ramp = exports.RAMP) {
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
function renderHalftone(lum, opts) {
    const ramp = opts.ramp ?? exports.RAMP;
    const rows = lum.length;
    return lum.map((row, y) => {
        const t = rows > 1 ? y / (rows - 1) : 0;
        const bg = opts.bg?.(t);
        return row
            .map(v => {
            const ch = rampChar(v, ramp);
            const fg = opts.fg(v);
            return bg ? chalk_1.default.hex(fg).bgHex(bg)(ch) : chalk_1.default.hex(fg)(ch);
        })
            .join('');
    });
}
// ── Luminance extraction ────────────────────────────────────────────────────
// Bridges the two renderers: lets pixel art be fed to the halftone pass.
function toLuminance(art) {
    const width = artWidth(art);
    return art.rows.map((_, y) => {
        const row = [];
        for (let x = 0; x < width; x++) {
            const c = colorAt(art, x, y);
            row.push(c === null ? 0 : luminance(c));
        }
        return row;
    });
}
//# sourceMappingURL=render.js.map