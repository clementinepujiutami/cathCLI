"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSearch = registerSearch;
const ora_1 = __importDefault(require("ora"));
const bible_1 = require("../services/bible");
const books_1 = require("../data/books");
const art_1 = require("../ui/art");
// Strip common English prefixes before trying to match a book name
const STRIP_RE = [
    /^(?:the\s+)?books?\s+of\s+/i,
    /^(?:the\s+)?gospel\s+(?:of|according\s+to)\s+(?:st\.?\s+)?/i,
    /^(?:the\s+)?(?:letter|epistle|revelation)\s+(?:of|to)\s+/i,
    /^(?:st\.?|saint)\s+/i,
];
const ORDINAL_MAP = {
    first: '1', second: '2', third: '3',
    '1st': '1', '2nd': '2', '3rd': '3',
};
function resolveBook(query) {
    let q = query.toLowerCase().trim();
    // "first corinthians" → "1 corinthians"
    for (const [word, num] of Object.entries(ORDINAL_MAP)) {
        if (q.startsWith(word + ' ')) {
            q = num + ' ' + q.slice(word.length + 1);
            break;
        }
    }
    for (const re of STRIP_RE)
        q = q.replace(re, '');
    return (0, books_1.findBook)(q.trim());
}
// All unique categories in the book list
const ALL_CATEGORIES = [...new Set(books_1.BIBLE_BOOKS.map(b => b.category))];
function resolveCategory(query) {
    const q = query.toLowerCase();
    return ALL_CATEGORIES.find(cat => q.includes(cat.toLowerCase()));
}
function registerSearch(program) {
    program
        .command('search <keywords...>')
        .description('Search cached verses by keyword (or look up a book / category)')
        .action(async (keywords) => {
        const query = keywords.join(' ');
        const spinner = (0, ora_1.default)({ ...art_1.spinnerStyle, text: art_1.C.dim(` Searching for "${query}"...`) }).start();
        // Plural "books of X" → prefer category over single-book match
        const isPlural = /^books?\s+of\b/i.test(query) && /^books\s/i.test(query);
        // ── 1. Smart book-name detection (singular) ──────────────────────────────
        const book = !isPlural ? resolveBook(query) : undefined;
        if (book) {
            spinner.stop();
            console.log((0, art_1.sectionHeader)(`Book: ${book.name}`));
            console.log(`\n  ${art_1.C.cream(book.name)} ${art_1.C.dim(`(${book.abbr})`)}  —  ${art_1.C.gold(book.category)}  ${art_1.C.dim(`· ${book.chapters} chapters`)}`);
            console.log(`\n  ${art_1.C.dim('Read it with:')}  ${art_1.C.sky(`cath read ${book.id} 1`)}`);
            console.log();
            return;
        }
        // ── 2. Smart category detection ──────────────────────────────────────────
        const category = resolveCategory(query);
        if (category) {
            spinner.stop();
            const books = books_1.BIBLE_BOOKS.filter(b => b.category === category);
            console.log((0, art_1.sectionHeader)(`Category: ${category}`));
            for (const b of books) {
                console.log(`  ${art_1.C.gold(b.abbr.padEnd(6))} ${art_1.C.cream(b.name)}`);
            }
            console.log(`\n  ${art_1.C.dim('Read one with e.g.')}  ${art_1.C.sky(`cath read ${books[0]?.id ?? '...'} 1`)}`);
            console.log();
            return;
        }
        // ── 3. Full-text cache search ────────────────────────────────────────────
        try {
            const results = await (0, bible_1.searchVerses)(query);
            spinner.stop();
            if (results.length) {
                console.log((0, art_1.sectionHeader)(`Search results for "${query}" (${results.length} found)`));
                for (const v of results) {
                    const ref = art_1.C.gold(`[${v.book} ${v.chapter}:${v.verse}] `);
                    console.log(`\n${ref}${art_1.C.cream(v.text)}`);
                }
                console.log();
                return;
            }
            // No results — try individual words if query was multi-word
            if (keywords.length > 1) {
                for (const word of keywords) {
                    if (word.length < 4)
                        continue;
                    const partial = await (0, bible_1.searchVerses)(word);
                    if (partial.length) {
                        console.log(art_1.C.dim(`\n  No results for "${query}" — showing matches for "${word}":\n`));
                        for (const v of partial) {
                            const ref = art_1.C.gold(`[${v.book} ${v.chapter}:${v.verse}] `);
                            console.log(`${ref}${art_1.C.cream(v.text)}`);
                        }
                        console.log();
                        return;
                    }
                }
            }
            console.log(art_1.C.dim(`\n  No cached results for "${query}".`));
            console.log(art_1.C.dim('  Read some chapters first — try:') + '  ' + art_1.C.sky('cath read jn 1'));
            console.log();
        }
        catch (err) {
            spinner.stop();
            console.error(art_1.C.red(`\n  ✗ Search error: ${err.message}`));
            process.exit(1);
        }
    });
}
//# sourceMappingURL=search.js.map