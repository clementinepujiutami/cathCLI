"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRead = registerRead;
const ora_1 = __importDefault(require("ora"));
const books_1 = require("../data/books");
const bible_1 = require("../services/bible");
const art_1 = require("../ui/art");
const sound_1 = require("../ui/sound");
function registerRead(program) {
    program
        .command('read <book> <chapter>')
        .description('Read a Bible chapter (e.g. cath read jn 3)')
        .action(async (bookQuery, chapterStr) => {
        const book = (0, books_1.findBook)(bookQuery);
        if (!book) {
            console.error(art_1.C.red(`\n  ✗ Error: Book "${bookQuery}" not found. Type "cath books" to see all 73 Catholic books.`));
            process.exit(1);
        }
        const chapter = parseInt(chapterStr, 10);
        if (isNaN(chapter) || chapter <= 0) {
            console.error(art_1.C.red(`\n  ✗ Error: Invalid chapter number "${chapterStr}".`));
            process.exit(1);
        }
        const spinner = (0, ora_1.default)(art_1.spinnerStyle).start();
        try {
            const verses = await (0, bible_1.getChapter)(book.id, chapter);
            spinner.stop();
            (0, sound_1.soundVerse)();
            console.log((0, art_1.sectionHeader)(`${book.name} — Chapter ${chapter} (${verses[0]?.version || 'NABRE'})`));
            for (const v of verses) {
                const prefix = art_1.C.gold(`[${v.verse}] `);
                console.log(`\n${prefix}${art_1.C.cream(v.text)}`);
            }
            console.log();
        }
        catch (err) {
            spinner.stop();
            console.error(art_1.C.red(`\n  ✗ Error fetching chapter: ${err.message}`));
            process.exit(1);
        }
    });
}
//# sourceMappingURL=read.js.map