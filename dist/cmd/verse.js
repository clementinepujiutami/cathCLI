"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerVerse = registerVerse;
const ora_1 = __importDefault(require("ora"));
const books_1 = require("../data/books");
const bible_1 = require("../services/bible");
const art_1 = require("../ui/art");
const sound_1 = require("../ui/sound");
function registerVerse(program) {
    program
        .command('verse <book> <reference>')
        .description('Read a single verse (e.g. cath verse jn 3:16)')
        .action(async (bookQuery, reference) => {
        const book = (0, books_1.findBook)(bookQuery);
        if (!book) {
            console.error(art_1.C.red(`\n  ✗ Error: Book "${bookQuery}" not found. Type "cath books" to see all 73 Catholic books.`));
            process.exit(1);
        }
        const parts = reference.split(':');
        if (parts.length !== 2) {
            console.error(art_1.C.red(`\n  ✗ Error: Reference format must be chapter:verse, e.g. "3:16". Received "${reference}".`));
            process.exit(1);
        }
        const chapter = parseInt(parts[0], 10);
        const verseNum = parseInt(parts[1], 10);
        if (isNaN(chapter) || chapter <= 0 || isNaN(verseNum) || verseNum <= 0) {
            console.error(art_1.C.red(`\n  ✗ Error: Invalid chapter or verse numbers in reference "${reference}".`));
            process.exit(1);
        }
        const spinner = (0, ora_1.default)(art_1.spinnerStyle).start();
        try {
            const v = await (0, bible_1.getVerse)(book.id, chapter, verseNum);
            spinner.stop();
            (0, sound_1.soundVerse)();
            console.log((0, art_1.verseBox)(`${book.name} ${v.chapter}:${v.verse} (${v.version})`, v.text));
        }
        catch (err) {
            spinner.stop();
            console.error(art_1.C.red(`\n  ✗ Error fetching verse: ${err.message}`));
            process.exit(1);
        }
    });
}
//# sourceMappingURL=verse.js.map