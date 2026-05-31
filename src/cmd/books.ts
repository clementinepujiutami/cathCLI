import { Command } from 'commander';
import { BIBLE_BOOKS, BibleBook } from '../data/books';
import { C } from '../ui/art';
import { soundNotify } from '../ui/sound';

const TESTAMENT_ORDER = ['old', 'new', 'deuterocanonical'] as const;
const TESTAMENT_LABELS: Record<string, string> = {
  old:              'Old Testament',
  new:              'New Testament',
  deuterocanonical: 'Deuterocanonical',
};

const ID_W   = 6;   // "1thes " — longest id is 5 chars
const NAME_W = 15;  // "1 Thessalonians" — longest name is 15 chars
const CH_W   = 4;   // " 150" — up to 3 digits + 1 space
const CELL_W = ID_W + NAME_W + CH_W; // 25 visible chars per cell

function categoryGrid(books: BibleBook[], cols: number): string {
  const GAP    = '  ';
  const INDENT = '    ';

  const cells = books.map(b => {
    const chStr = String(b.chapters).padStart(3) + C.dim('ch');
    return C.sky(b.id.padEnd(ID_W)) + C.cream(b.name.padEnd(NAME_W)) + C.dim(chStr);
  });

  const rows: string[] = [];
  for (let i = 0; i < cells.length; i += cols) {
    rows.push(INDENT + cells.slice(i, i + cols).join(GAP));
  }
  return rows.join('\n');
}

export function registerBooks(program: Command) {
  program
    .command('books')
    .description('List all 73 books of the Catholic Bible')
    .action(() => {
      soundNotify();

      const termW = process.stdout.columns ?? 80;
      const cols  = Math.max(1, Math.min(3, Math.floor((termW - 4) / (CELL_W + 2))));

      // Group by testament → category (preserve BIBLE_BOOKS insertion order)
      const byTestament: Record<string, Map<string, BibleBook[]>> = {
        old: new Map(), new: new Map(), deuterocanonical: new Map(),
      };
      for (const b of BIBLE_BOOKS) {
        const catMap = byTestament[b.testament];
        if (!catMap.has(b.category)) catMap.set(b.category, []);
        catMap.get(b.category)!.push(b);
      }

      const totalByTestament = Object.fromEntries(
        TESTAMENT_ORDER.map(t => [t, [...byTestament[t].values()].flat().length])
      );

      console.log();
      console.log(C.gold('  ✝  Holy Bible — Catholic Canon  ✝'));
      console.log(C.dim('  73 books · New American Bible (NABRE)'));
      console.log();

      for (const testament of TESTAMENT_ORDER) {
        const catMap = byTestament[testament];
        const label  = TESTAMENT_LABELS[testament];
        const count  = totalByTestament[testament];

        // Testament banner
        const banner = `  ${label.toUpperCase()}  `;
        const rule   = C.dim('─'.repeat(Math.max(0, 52 - banner.length)));
        console.log(C.gold(banner) + rule + C.dim(` ${count} books`));
        console.log();

        for (const [category, books] of catMap.entries()) {
          console.log(`  ${C.skin('■')} ${C.white(category)} ${C.dim(`(${books.length})`)}`);
          console.log(categoryGrid(books, cols));
          console.log();
        }
      }

      console.log(C.dim('  ─────────────────────────────────────────────────────'));
      console.log(C.dim('  Read:  ') + C.sky('cath read <id> <chapter>') + C.dim('  e.g. ') + C.gold('cath read jn 1'));
      console.log(C.dim('  Verse: ') + C.sky('cath verse <id> <ch:v>') + C.dim('    e.g. ') + C.gold('cath verse ps 23:1'));
      console.log();
    });
}
