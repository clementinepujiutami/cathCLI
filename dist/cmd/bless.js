"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerBless = registerBless;
const ora_1 = __importDefault(require("ora"));
const bible_1 = require("../services/bible");
const litcal_1 = require("../services/litcal");
const art_1 = require("../ui/art");
const sound_1 = require("../ui/sound");
function registerBless(program) {
    program
        .command('bless')
        .description("Today's blessing: the day's celebration and a verse to carry")
        .action(async () => {
        const spinner = (0, ora_1.default)(art_1.spinnerStyle).start();
        try {
            // The calendar is a nicety; a failed lookup shouldn't cost the verse.
            const [verse, day] = await Promise.all([
                (0, bible_1.getVerseOfDay)(),
                (0, litcal_1.celebrationOn)().catch(() => null),
            ]);
            spinner.stop();
            (0, sound_1.soundVerse)();
            if (day) {
                console.log('\n' + art_1.C.dim('  today is') + '  ' + art_1.C.gold(day.name));
                console.log('  ' + art_1.C.dim(day.grade_lcl));
            }
            console.log((0, art_1.verseBox)(`${verse.book} ${verse.chapter}:${verse.verse} (${verse.version})`, verse.text));
            console.log(art_1.C.dim('  The same blessing for everyone, today. A new one tomorrow.\n'));
        }
        catch (err) {
            spinner.stop();
            console.error(art_1.C.red(`\n  ✗ ${err.message}`));
            process.exit(1);
        }
    });
}
//# sourceMappingURL=bless.js.map