#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Suppress Node.js internal deprecation warnings (punycode from cheerio)
process.removeAllListeners('warning');
const commander_1 = require("commander");
const art_1 = require("./ui/art");
const sound_1 = require("./ui/sound");
const books_1 = require("./cmd/books");
const read_1 = require("./cmd/read");
const verse_1 = require("./cmd/verse");
const pray_1 = require("./cmd/pray");
const random_1 = require("./cmd/random");
const search_1 = require("./cmd/search");
const program = new commander_1.Command();
program
    .name('cath')
    .description('Holy Bible (Catholic Canon — NABRE) & Catholic Prayers')
    .version('1.0.0');
(0, books_1.registerBooks)(program);
(0, read_1.registerRead)(program);
(0, verse_1.registerVerse)(program);
(0, pray_1.registerPray)(program);
(0, random_1.registerRandom)(program);
(0, search_1.registerSearch)(program);
if (process.argv.length <= 2) {
    (0, sound_1.soundStartup)();
    console.log((0, art_1.banner)());
    program.outputHelp();
}
else {
    program.parseAsync(process.argv).catch((err) => {
        console.error(err.message);
        process.exit(1);
    });
}
//# sourceMappingURL=index.js.map