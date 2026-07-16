"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paintColors = paintColors;
exports.formatEvent = formatEvent;
exports.registerSaints = registerSaints;
const ora_1 = __importDefault(require("ora"));
const litcal_1 = require("../services/litcal");
const art_1 = require("../ui/art");
// Liturgical colors, as the calendar reports them.
const COLOR = {
    white: art_1.C.cream, red: art_1.C.red, green: (s) => art_1.C.dim(s), purple: art_1.C.sky, rose: art_1.C.red,
};
function paintColors(colors = []) {
    return colors.map(c => (COLOR[c] ?? art_1.C.white)(c)).join(art_1.C.dim(' / '));
}
// `new Date(2026, 98, 99)` doesn't throw, it rolls over into 2034. So build the
// date, then check it kept the fields it was given.
function build(y, m, d, input) {
    const date = new Date(y, m - 1, d);
    if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) {
        throw new Error(`"${input}" isn't a real date.`);
    }
    return date;
}
function parseDate(input) {
    if (!input)
        return new Date();
    // Accept YYYY-MM-DD or MM-DD; anything else is a user error worth naming.
    const iso = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(input);
    if (iso)
        return build(+iso[1], +iso[2], +iso[3], input);
    const md = /^(\d{1,2})-(\d{1,2})$/.exec(input);
    if (md)
        return build(new Date().getFullYear(), +md[1], +md[2], input);
    throw new Error(`Unrecognized date "${input}". Use YYYY-MM-DD or MM-DD.`);
}
function formatEvent(e) {
    const out = [art_1.C.gold(`  ${e.name}`)];
    const bits = [art_1.C.dim(e.grade_lcl)];
    if (e.color?.length)
        bits.push(paintColors(e.color));
    out.push('    ' + bits.join(art_1.C.dim('  ·  ')));
    return out;
}
function registerSaints(program) {
    program
        .command('saints [date]')
        .description('Saints and memorials for today, or a given date (YYYY-MM-DD or MM-DD)')
        .action(async (date) => {
        let when;
        try {
            when = parseDate(date);
        }
        catch (err) {
            console.error(art_1.C.red(`\n  ✗ ${err.message}`));
            process.exit(1);
        }
        const spinner = (0, ora_1.default)({ ...art_1.spinnerStyle, text: art_1.C.dim(' Consulting the calendar...') }).start();
        try {
            const saints = await (0, litcal_1.saintsOn)(when);
            const day = await (0, litcal_1.celebrationOn)(when);
            spinner.stop();
            const label = when.toDateString();
            console.log((0, art_1.sectionHeader)(label, '✝'));
            if (day?.liturgical_season) {
                console.log(art_1.C.dim(`  ${day.liturgical_season.replace(/_/g, ' ').toLowerCase()}\n`));
            }
            if (!saints.length) {
                console.log(art_1.C.dim('  No saint is commemorated on this day.'));
                if (day)
                    console.log(art_1.C.dim(`  The day is kept as: ${day.name}\n`));
                return;
            }
            for (const s of saints)
                console.log(formatEvent(s).join('\n') + '\n');
        }
        catch (err) {
            spinner.stop();
            console.error(art_1.C.red(`\n  ✗ ${err.message}`));
            process.exit(1);
        }
    });
}
//# sourceMappingURL=saints.js.map