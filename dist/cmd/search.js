"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSearch = registerSearch;
const ora_1 = __importDefault(require("ora"));
const bible_1 = require("../services/bible");
const art_1 = require("../ui/art");
function registerSearch(program) {
    program
        .command('search <keyword>')
        .description('Search cached verses by keyword')
        .action(async (keyword) => {
        const spinner = (0, ora_1.default)({ ...art_1.spinnerStyle, text: art_1.C.dim(` Searching for "${keyword}"...`) }).start();
        try {
            const results = await (0, bible_1.searchVerses)(keyword);
            spinner.stop();
            if (!results.length) {
                console.log(art_1.C.dim(`\n  No cached results for "${keyword}".`));
                console.log(art_1.C.dim('  Read some chapters first so they get cached — then search will work offline.\n'));
                return;
            }
            console.log((0, art_1.sectionHeader)(`Search results for "${keyword}" (${results.length} found)`));
            for (const v of results) {
                const ref = art_1.C.gold(`[${v.book} ${v.chapter}:${v.verse}] `);
                console.log(`\n${ref}${art_1.C.cream(v.text)}`);
            }
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