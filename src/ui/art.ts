import chalk from 'chalk';

// ── Color palette (from pixel art reference) ────────────────────────────────
export const C = {
  sky:    (s: string) => chalk.hex('#87BEEA')(s),
  gold:   (s: string) => chalk.hex('#F5C542')(s),
  brown:  (s: string) => chalk.hex('#5C2A1C')(s),
  skin:   (s: string) => chalk.hex('#C68642')(s),
  cream:  (s: string) => chalk.hex('#F5EDD6')(s),
  red:    (s: string) => chalk.hex('#CC2222')(s),
  white:  (s: string) => chalk.white(s),
  dim:    (s: string) => chalk.gray(s),
  bold:   (s: string) => chalk.bold(s),
};

// ── Pixel-art cat mascot (cath = cat-holic) ─────────────────────────────────
// Each "pixel" = 2 terminal chars wide for square proportions
function px(color: (s: string) => string): string {
  return color('██');
}

const _  = '  ';          // empty pixel (1 unit)
const K  = px(C.cream);   // cream body
const Ey = px(C.sky);     // sky-blue eyes
const Ns = px(C.gold);    // gold nose
const Ie = px(C.skin);    // warm inner ear
const Tl = px(C.gold);    // gold tail tip accent

export function catArt(): string[] {
  return [
    `${K}${_}${_}${_}${_}${_}${_}${K}${_}${_}`,  // ear tips
    `${K}${K}${Ie}${_}${_}${_}${Ie}${K}${K}${_}`, // inner ears
    `${K}${K}${K}${K}${K}${K}${K}${K}${K}${_}`,   // head
    `${K}${K}${K}${K}${K}${K}${K}${K}${K}${_}`,   // head
    `${K}${Ey}${K}${K}${K}${K}${Ey}${K}${K}${_}`, // eyes
    `${K}${K}${K}${_}${Ns}${_}${K}${K}${K}${_}`,  // nose
    `${K}${K}${K}${K}${K}${K}${K}${K}${K}${_}`,   // chin
    `${_}${K}${K}${K}${K}${K}${K}${K}${_}${_}`,   // neck
    `${K}${K}${K}${K}${K}${K}${K}${K}${K}${_}`,   // upper body
    `${K}${K}${K}${K}${K}${K}${K}${K}${K}${K}`,   // body + tail starts
    `${K}${K}${K}${K}${K}${K}${K}${K}${_}${K}`,   // body + tail curves
    `${K}${K}${_}${_}${_}${_}${K}${K}${_}${K}`,   // upper legs + tail
    `${K}${K}${_}${_}${_}${_}${K}${K}${Tl}${_}`,  // lower legs + tail tip
    `${K}${_}${_}${_}${_}${_}${_}${K}${_}${_}`,   // paws
  ];
}

// ── Full banner (character + title) ─────────────────────────────────────────
export function banner(): string {
  const art = catArt();
  const title = [
    '',
    C.gold(chalk.bold('  ✝  Holy Bible & Catholic Prayers  ✝')),
    '',
    C.cream('  New American Bible  ·  Catholic Canon'),
    C.dim('  Source: Vatican Archive & mycatholic.life'),
    '',
    C.sky('  Commands:'),
    C.white('  ') + C.gold('bible') + C.dim(' <book> <chapter>') + C.white('  — read a chapter'),
    C.white('  ') + C.gold('verse') + C.dim(' <book> <ch>:<v>') + C.white('   — single verse'),
    C.white('  ') + C.gold('books') + C.white('                  — list all 73 books'),
    C.white('  ') + C.gold('pray')  + C.dim(' [name]') + C.white('          — Catholic prayers'),
    C.white('  ') + C.gold('random') + C.white('                — verse of the day'),
    C.white('  ') + C.gold('search') + C.dim(' <keyword>') + C.white('     — search the Bible'),
    '',
    C.dim('  Type  bible --help  for full usage'),
  ];

  const lines: string[] = [];
  const maxArt = art.length;
  const maxTitle = title.length;
  const max = Math.max(maxArt, maxTitle);

  for (let i = 0; i < max; i++) {
    const left  = (art[i]   ?? '').padEnd(0);
    const right = (title[i] ?? '');
    lines.push(left + right);
  }

  return lines.join('\n');
}

// ── Section header ───────────────────────────────────────────────────────────
export function sectionHeader(title: string, icon = '✝'): string {
  const line = C.gold(`${icon} `) + C.white(chalk.bold(title));
  const rule = C.dim('─'.repeat(50));
  return `\n${rule}\n${line}\n${rule}\n`;
}

// ── Box drawing (no external dep — works in standalone binary) ───────────────
const ANSI_RE = /\x1B\[[0-9;]*[mGKHF]/g;
const visLen  = (s: string) => s.replace(ANSI_RE, '').length;

function drawBox(
  lines: string[],
  borderColor: (s: string) => string,
  double = false
): string {
  const tl = double ? '╔' : '╭';
  const tr = double ? '╗' : '╮';
  const bl = double ? '╚' : '╰';
  const br = double ? '╝' : '╯';
  const hz = double ? '═' : '─';
  const vt = double ? '║' : '│';

  const termCols = process.stdout.columns ?? 80;
  const maxContent = Math.min(Math.max(...lines.map(visLen)), termCols - 8);
  const innerW = maxContent + 4; // 2 spaces padding each side

  const bc    = borderColor;
  const top   = bc(tl + hz.repeat(innerW) + tr);
  const blank = bc(vt) + ' '.repeat(innerW) + bc(vt);
  const body  = lines.map(l =>
    bc(vt) + '  ' + l + ' '.repeat(Math.max(0, maxContent - visLen(l)) + 2) + bc(vt)
  );
  const bot   = bc(bl + hz.repeat(innerW) + br);

  const m = '  ';
  return ['\n', m + top, m + blank, ...body.map(l => m + l), m + blank, m + bot, ''].join('\n');
}

function wordWrap(text: string, maxW: number): string[] {
  const out: string[] = [];
  for (const paragraph of text.split('\n')) {
    if (!paragraph.trim()) { out.push(''); continue; }
    const words = paragraph.split(' ');
    let line = '';
    for (const w of words) {
      if (!line) { line = w; }
      else if (line.length + 1 + w.length <= maxW) { line += ' ' + w; }
      else { out.push(line); line = w; }
    }
    if (line) out.push(line);
  }
  return out;
}

// ── Verse box ────────────────────────────────────────────────────────────────
export function verseBox(ref: string, text: string): string {
  const maxW = Math.min((process.stdout.columns ?? 80) - 10, 70);
  const lines = [C.gold(`✝  ${ref}`), '', ...wordWrap(text, maxW).map(l => C.cream(l))];
  return drawBox(lines, C.gold, false);
}

// ── Prayer box ───────────────────────────────────────────────────────────────
export function prayerBox(title: string, text: string): string {
  const maxW = Math.min((process.stdout.columns ?? 80) - 10, 70);
  const lines = [C.gold(`🙏  ${title}`), '', ...wordWrap(text, maxW).map(l => C.cream(l))];
  return drawBox(lines, C.sky, true);
}

// ── Spinner helper text ──────────────────────────────────────────────────────
export const spinnerStyle = {
  color: 'yellow' as const,
  text:  C.dim(' Fetching from Vatican...'),
};
