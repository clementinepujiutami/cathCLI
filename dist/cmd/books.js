"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerBooks = registerBooks;
const books_1 = require("../data/books");
const art_1 = require("../ui/art");
const sound_1 = require("../ui/sound");
function registerBooks(program) {
    program
        .command('books')
        .description('List all 73 books of the Catholic Bible')
        .action(() => {
        (0, sound_1.soundNotify)();
        console.log((0, art_1.sectionHeader)('Holy Bible — Catholic Canon (73 Books)'));
        const categories = (0, books_1.booksByCategory)();
        for (const [category, list] of categories.entries()) {
            console.log(art_1.C.gold(`\n  ■ ${category}`));
            const bookStrings = list.map(b => `${art_1.C.cream(b.name)} (${art_1.C.sky(b.id)})`);
            // Wrap lines to fit nicely in the terminal (max 80 chars wide)
            let line = '    ';
            for (const bStr of bookStrings) {
                const strippedLen = bStr.replace(/\x1B\[\d+m/g, '').length; // length without chalk ansi escape codes
                const lineStrippedLen = line.replace(/\x1B\[\d+m/g, '').length;
                if (lineStrippedLen + strippedLen + 5 > 80) {
                    console.log(line);
                    line = '    ' + bStr;
                }
                else {
                    line = line === '    ' ? line + bStr : line + art_1.C.dim('  ·  ') + bStr;
                }
            }
            if (line.trim())
                console.log(line);
        }
        console.log();
    });
}
//# sourceMappingURL=books.js.map