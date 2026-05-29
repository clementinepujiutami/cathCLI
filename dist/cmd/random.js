"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRandom = registerRandom;
const ora_1 = __importDefault(require("ora"));
const bible_1 = require("../services/bible");
const art_1 = require("../ui/art");
const sound_1 = require("../ui/sound");
function registerRandom(program) {
    program
        .command('random')
        .description('Show a random verse from a curated pool of beloved Catholic verses')
        .action(async () => {
        const spinner = (0, ora_1.default)(art_1.spinnerStyle).start();
        try {
            const v = await (0, bible_1.getRandomVerse)();
            spinner.stop();
            (0, sound_1.soundVerse)();
            console.log((0, art_1.verseBox)(`${v.book} ${v.chapter}:${v.verse} (${v.version})`, v.text));
        }
        catch (err) {
            spinner.stop();
            console.error(art_1.C.red(`\n  ✗ Error fetching random verse: ${err.message}`));
            process.exit(1);
        }
    });
}
//# sourceMappingURL=random.js.map