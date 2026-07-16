"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.spinnerStyle = exports.C = void 0;
exports.banner = banner;
exports.sectionHeader = sectionHeader;
exports.verseBox = verseBox;
exports.prayerBox = prayerBox;
const chalk_1 = __importDefault(require("chalk"));
const render_1 = require("./render");
const pawpe_1 = require("./figures/pawpe");
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
// ── Full banner (character + title) ─────────────────────────────────────────
function banner() {
    // The banner used to draw its own 16x19 cat, a cruder variant of the mascot on
    // the site and the prayer cards. Same art everywhere now: half-blocks render
    // pawpe in 35 columns against the old grid's 32, for a lot more detail.
    const art = (0, render_1.renderHalfBlocks)(pawpe_1.pawpe);
    const artW = (0, render_1.artWidth)(pawpe_1.pawpe);
    const title = [
        '',
        exports.C.gold(chalk_1.default.bold('  ✝  Pawpe Miau  ✝')),
        exports.C.cream("  Let's Puurray!"),
        exports.C.dim('  Holy Bible & Catholic Prayers'),
        '',
        exports.C.cream('  New American Bible  ·  Catholic Canon'),
        exports.C.dim('  Source: Vatican Archive & mycatholic.life'),
        '',
        exports.C.sky('  Quick tutorial:'),
        exports.C.white('  ') + exports.C.gold('cath read jn 3') + exports.C.white('          — read John chapter 3'),
        exports.C.white('  ') + exports.C.gold('cath verse ps 23:1') + exports.C.white('      — show one verse'),
        exports.C.white('  ') + exports.C.gold('cath books') + exports.C.white('              — list all 73 books'),
        exports.C.white('  ') + exports.C.gold('cath pray') + exports.C.white('               — browse prayers'),
        exports.C.white('  ') + exports.C.gold('cath pray "hail mary"') + exports.C.white('  — open a prayer'),
        exports.C.white('  ') + exports.C.gold('cath random') + exports.C.white('             — receive a random verse'),
        exports.C.white('  ') + exports.C.gold('cath search mercy') + exports.C.white('       — search cached verses'),
        '',
        exports.C.dim('  Type  cath <command> --help  for command details'),
    ];
    const titleW = title.reduce((w, l) => Math.max(w, visLen(l)), 0);
    const cols = process.stdout.columns ?? 80;
    // Side by side needs the art and the widest tutorial line to both fit. They
    // never did: this banner has been running 82 columns against an 80-column
    // terminal and wrapping into a mess. Stack when there isn't room.
    if (cols < artW + titleW) {
        return [...art, ...title].join('\n');
    }
    const lines = [];
    const max = Math.max(art.length, title.length);
    for (let i = 0; i < max; i++) {
        // padEnd(0) was a no-op here: any title line past the end of the art would
        // have slid back to column zero instead of clearing it.
        const left = art[i] ?? ' '.repeat(artW);
        const right = title[i] ?? '';
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