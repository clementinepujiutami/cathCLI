"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerBooks = registerBooks;
const books_1 = require("../data/books");
const art_1 = require("../ui/art");
const sound_1 = require("../ui/sound");
const TESTAMENT_ORDER = ['old', 'new', 'deuterocanonical'];
const TESTAMENT_LABELS = {
    old: 'Old Testament',
    new: 'New Testament',
    deuterocanonical: 'Deuterocanonical',
};
const ID_W = 6; // "1thes " — longest id is 5 chars
const NAME_W = 15; // "1 Thessalonians" — longest name is 15 chars
const CH_W = 4; // " 150" — up to 3 digits + 1 space
const CELL_W = ID_W + NAME_W + CH_W; // 25 visible chars per cell
function categoryGrid(books, cols) {
    const GAP = '  ';
    const INDENT = '    ';
    const cells = books.map(b => {
        const chStr = String(b.chapters).padStart(3) + art_1.C.dim('ch');
        return art_1.C.sky(b.id.padEnd(ID_W)) + art_1.C.cream(b.name.padEnd(NAME_W)) + art_1.C.dim(chStr);
    });
    const rows = [];
    for (let i = 0; i < cells.length; i += cols) {
        rows.push(INDENT + cells.slice(i, i + cols).join(GAP));
    }
    return rows.join('\n');
}
function registerBooks(program) {
    program
        .command('books')
        .description('List all 73 books of the Catholic Bible')
        .action(() => {
        (0, sound_1.soundNotify)();
        const termW = process.stdout.columns ?? 80;
        const cols = Math.max(1, Math.min(3, Math.floor((termW - 4) / (CELL_W + 2))));
        // Group by testament → category (preserve BIBLE_BOOKS insertion order)
        const byTestament = {
            old: new Map(), new: new Map(), deuterocanonical: new Map(),
        };
        for (const b of books_1.BIBLE_BOOKS) {
            const catMap = byTestament[b.testament];
            if (!catMap.has(b.category))
                catMap.set(b.category, []);
            catMap.get(b.category).push(b);
        }
        const totalByTestament = Object.fromEntries(TESTAMENT_ORDER.map(t => [t, [...byTestament[t].values()].flat().length]));
        console.log();
        console.log(art_1.C.gold('  ✝  Holy Bible — Catholic Canon  ✝'));
        console.log(art_1.C.dim('  73 books · New American Bible (NABRE)'));
        console.log();
        for (const testament of TESTAMENT_ORDER) {
            const catMap = byTestament[testament];
            const label = TESTAMENT_LABELS[testament];
            const count = totalByTestament[testament];
            // Testament banner
            const banner = `  ${label.toUpperCase()}  `;
            const rule = art_1.C.dim('─'.repeat(Math.max(0, 52 - banner.length)));
            console.log(art_1.C.gold(banner) + rule + art_1.C.dim(` ${count} books`));
            console.log();
            for (const [category, books] of catMap.entries()) {
                console.log(`  ${art_1.C.skin('■')} ${art_1.C.white(category)} ${art_1.C.dim(`(${books.length})`)}`);
                console.log(categoryGrid(books, cols));
                console.log();
            }
        }
        console.log(art_1.C.dim('  ─────────────────────────────────────────────────────'));
        console.log(art_1.C.dim('  Read:  ') + art_1.C.sky('cath read <id> <chapter>') + art_1.C.dim('  e.g. ') + art_1.C.gold('cath read jn 1'));
        console.log(art_1.C.dim('  Verse: ') + art_1.C.sky('cath verse <id> <ch:v>') + art_1.C.dim('    e.g. ') + art_1.C.gold('cath verse ps 23:1'));
        console.log();
    });
}
//# sourceMappingURL=books.js.map