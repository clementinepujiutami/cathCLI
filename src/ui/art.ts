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

// ── Pixel-art Jesus the Good Shepherd ───────────────────────────────────────
// Each "pixel" = 2 terminal chars wide for square proportions
function px(color: (s: string) => string): string {
  return color('██');
}

const _ = '  ';           // empty pixel
const G = px(C.gold);     // gold (halo / cross)
const W = px(C.white);    // white (halo outline / cloud)
const B = px(C.brown);    // brown (hair, beard, staff)
const S = px(C.skin);     // skin
const R = px(C.red);      // red (cross on robe)
const K = px(C.cream);    // cream (robe / lamb)
const D = px(C.dim);      // shadow

export function jesusArt(): string[] {
  return [
    `           ${G}           `,
    `        ${W}${G}${W}        `,
    `      ${W}${B}${B}${B}${B}${W}      `,
    `     ${W}${B}${B}${B}${B}${B}${B}${W}     `,
    `     ${W}${B}${S}${S}${S}${S}${B}${W}     `,
    `     ${W}${B}${S}${B}${_}${B}${S}${B}${W}  `,
    `     ${W}${B}${S}${S}${S}${S}${B}${W}     `,
    `     ${W}${B}${B}${S}${S}${B}${B}${W}     `,
    `      ${W}${B}${B}${B}${B}${B}${W}      `,
    `     ${K}${K}${K}${K}${K}${K}${K}   ${B}  `,
    `    ${K}${K}${R}${K}${K}${K}${K}${K}  ${B}  `,
    `  ${K}${K}${K}${K}${K}${K}${K}${K}${K}  ${B}  `,
    `  ${K}${K}${K}${K}${K}${K}${K}${K}${K}     `,
  ];
}

// ── Lamb (Good Shepherd's lamb) ──────────────────────────────────────────────
export function lambArt(): string[] {
  return [
    `  ${W}${W}${W}  `,
    ` ${W}${S}${W}${W} `,
    `  ${W}${W}${W}  `,
    `  ${D}${_}${D}  `,
  ];
}

// ── Full banner (character + title) ─────────────────────────────────────────
export function banner(): string {
  const art = jesusArt();
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

// ── Verse box ────────────────────────────────────────────────────────────────
export function verseBox(ref: string, text: string): string {
  const boxen = require('boxen');
  return boxen(
    C.gold(`✝  ${ref}\n\n`) + C.cream(text),
    {
      padding: 1,
      margin: { top: 1, bottom: 1, left: 2, right: 2 },
      borderStyle: 'round',
      borderColor: '#F5C542',
    }
  );
}

// ── Prayer box ───────────────────────────────────────────────────────────────
export function prayerBox(title: string, text: string): string {
  const boxen = require('boxen');
  return boxen(
    C.gold(`🙏  ${title}\n\n`) + C.cream(text),
    {
      padding: 1,
      margin: { top: 1, bottom: 1, left: 2, right: 2 },
      borderStyle: 'double',
      borderColor: '#87BEEA',
    }
  );
}

// ── Spinner helper text ──────────────────────────────────────────────────────
export const spinnerStyle = {
  color: 'yellow' as const,
  text:  C.dim(' Fetching from Vatican...'),
};
