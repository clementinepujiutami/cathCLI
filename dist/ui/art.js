"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.spinnerStyle = exports.C = void 0;
exports.catArt = catArt;
exports.banner = banner;
exports.sectionHeader = sectionHeader;
exports.verseBox = verseBox;
exports.prayerBox = prayerBox;
const chalk_1 = __importDefault(require("chalk"));
// ── Color palette (from pixel art reference) ────────────────────────────────
exports.C = {
    sky: (s) => chalk_1.default.hex('#87BEEA')(s),
    gold: (s) => chalk_1.default.hex('#F5C542')(s),
    brown: (s) => chalk_1.default.hex('#5C2A1C')(s),
    skin: (s) => chalk_1.default.hex('#C68642')(s),
    cream: (s) => chalk_1.default.hex('#F5EDD6')(s),
    red: (s) => chalk_1.default.hex('#CC2222')(s),
    white: (s) => chalk_1.default.white(s),
    dim: (s) => chalk_1.default.gray(s),
    bold: (s) => chalk_1.default.bold(s),
};
// ── Pixel-art cat mascot (cath = cat-holic) ─────────────────────────────────
// Each "pixel" = 2 terminal chars wide for square proportions
function px(color) {
    return color('██');
}
const _ = '  '; // empty pixel (1 unit)
const K = px(exports.C.cream); // cream body
const Ey = px(exports.C.sky); // sky-blue eyes
const Ns = px(exports.C.gold); // gold nose
const Ie = px(exports.C.skin); // warm inner ear
const Tl = px(exports.C.gold); // gold tail tip accent
function catArt() {
    return [
        `${K}${_}${_}${_}${_}${_}${_}${K}${_}${_}`, // ear tips
        `${K}${K}${Ie}${_}${_}${_}${Ie}${K}${K}${_}`, // inner ears
        `${K}${K}${K}${K}${K}${K}${K}${K}${K}${_}`, // head
        `${K}${K}${K}${K}${K}${K}${K}${K}${K}${_}`, // head
        `${K}${Ey}${K}${K}${K}${K}${Ey}${K}${K}${_}`, // eyes
        `${K}${K}${K}${_}${Ns}${_}${K}${K}${K}${_}`, // nose
        `${K}${K}${K}${K}${K}${K}${K}${K}${K}${_}`, // chin
        `${_}${K}${K}${K}${K}${K}${K}${K}${_}${_}`, // neck
        `${K}${K}${K}${K}${K}${K}${K}${K}${K}${_}`, // upper body
        `${K}${K}${K}${K}${K}${K}${K}${K}${K}${K}`, // body + tail starts
        `${K}${K}${K}${K}${K}${K}${K}${K}${_}${K}`, // body + tail curves
        `${K}${K}${_}${_}${_}${_}${K}${K}${_}${K}`, // upper legs + tail
        `${K}${K}${_}${_}${_}${_}${K}${K}${Tl}${_}`, // lower legs + tail tip
        `${K}${_}${_}${_}${_}${_}${_}${K}${_}${_}`, // paws
    ];
}
// ── Full banner (character + title) ─────────────────────────────────────────
function banner() {
    const art = catArt();
    const title = [
        '',
        exports.C.gold(chalk_1.default.bold('  ✝  Holy Bible & Catholic Prayers  ✝')),
        '',
        exports.C.cream('  New American Bible  ·  Catholic Canon'),
        exports.C.dim('  Source: Vatican Archive & mycatholic.life'),
        '',
        exports.C.sky('  Commands:'),
        exports.C.white('  ') + exports.C.gold('bible') + exports.C.dim(' <book> <chapter>') + exports.C.white('  — read a chapter'),
        exports.C.white('  ') + exports.C.gold('verse') + exports.C.dim(' <book> <ch>:<v>') + exports.C.white('   — single verse'),
        exports.C.white('  ') + exports.C.gold('books') + exports.C.white('                  — list all 73 books'),
        exports.C.white('  ') + exports.C.gold('pray') + exports.C.dim(' [name]') + exports.C.white('          — Catholic prayers'),
        exports.C.white('  ') + exports.C.gold('random') + exports.C.white('                — verse of the day'),
        exports.C.white('  ') + exports.C.gold('search') + exports.C.dim(' <keyword>') + exports.C.white('     — search the Bible'),
        '',
        exports.C.dim('  Type  bible --help  for full usage'),
    ];
    const lines = [];
    const maxArt = art.length;
    const maxTitle = title.length;
    const max = Math.max(maxArt, maxTitle);
    for (let i = 0; i < max; i++) {
        const left = (art[i] ?? '').padEnd(0);
        const right = (title[i] ?? '');
        lines.push(left + right);
    }
    return lines.join('\n');
}
// ── Section header ───────────────────────────────────────────────────────────
function sectionHeader(title, icon = '✝') {
    const line = exports.C.gold(`${icon} `) + exports.C.white(chalk_1.default.bold(title));
    const rule = exports.C.dim('─'.repeat(50));
    return `\n${rule}\n${line}\n${rule}\n`;
}
// ── Box drawing (no external dep — works in standalone binary) ───────────────
const ANSI_RE = /\x1B\[[0-9;]*[mGKHF]/g;
const visLen = (s) => s.replace(ANSI_RE, '').length;
function drawBox(lines, borderColor, double = false) {
    const tl = double ? '╔' : '╭';
    const tr = double ? '╗' : '╮';
    const bl = double ? '╚' : '╰';
    const br = double ? '╝' : '╯';
    const hz = double ? '═' : '─';
    const vt = double ? '║' : '│';
    const termCols = process.stdout.columns ?? 80;
    const maxContent = Math.min(Math.max(...lines.map(visLen)), termCols - 8);
    const innerW = maxContent + 4; // 2 spaces padding each side
    const bc = borderColor;
    const top = bc(tl + hz.repeat(innerW) + tr);
    const blank = bc(vt) + ' '.repeat(innerW) + bc(vt);
    const body = lines.map(l => bc(vt) + '  ' + l + ' '.repeat(Math.max(0, maxContent - visLen(l)) + 2) + bc(vt));
    const bot = bc(bl + hz.repeat(innerW) + br);
    const m = '  ';
    return ['\n', m + top, m + blank, ...body.map(l => m + l), m + blank, m + bot, ''].join('\n');
}
function wordWrap(text, maxW) {
    const out = [];
    for (const paragraph of text.split('\n')) {
        if (!paragraph.trim()) {
            out.push('');
            continue;
        }
        const words = paragraph.split(' ');
        let line = '';
        for (const w of words) {
            if (!line) {
                line = w;
            }
            else if (line.length + 1 + w.length <= maxW) {
                line += ' ' + w;
            }
            else {
                out.push(line);
                line = w;
            }
        }
        if (line)
            out.push(line);
    }
    return out;
}
// ── Verse box ────────────────────────────────────────────────────────────────
function verseBox(ref, text) {
    const maxW = Math.min((process.stdout.columns ?? 80) - 10, 70);
    const lines = [exports.C.gold(`✝  ${ref}`), '', ...wordWrap(text, maxW).map(l => exports.C.cream(l))];
    return drawBox(lines, exports.C.gold, false);
}
// ── Prayer box ───────────────────────────────────────────────────────────────
function prayerBox(title, text) {
    const maxW = Math.min((process.stdout.columns ?? 80) - 10, 70);
    const lines = [exports.C.gold(`🙏  ${title}`), '', ...wordWrap(text, maxW).map(l => exports.C.cream(l))];
    return drawBox(lines, exports.C.sky, true);
}
// ── Spinner helper text ──────────────────────────────────────────────────────
exports.spinnerStyle = {
    color: 'yellow',
    text: exports.C.dim(' Fetching from Vatican...'),
};
//# sourceMappingURL=art.js.map