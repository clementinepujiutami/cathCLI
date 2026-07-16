"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerFeasts = registerFeasts;
const ora_1 = __importDefault(require("ora"));
const litcal_1 = require("../services/litcal");
const art_1 = require("../ui/art");
const saints_1 = require("./saints");
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// Every Sunday in Ordinary Time is graded a feast of the Lord, so an unfiltered
// list is mostly Sundays. They're keyed OrdSunday1..34; the real feasts at the
// same grade are named (Transfiguration, ExaltationCross, HolyFamily...), so
// filter on the key rather than the localized name.
const ORDINARY_SUNDAY = /^OrdSunday\d+$/;
function registerFeasts(program) {
    program
        .command('feasts')
        .description('Upcoming feasts and solemnities')
        .option('-d, --days <n>', 'how far ahead to look', '60')
        .option('-a, --all', 'include memorials, not just feasts and solemnities')
        .option('-s, --sundays', 'include the Sundays of Ordinary Time')
        .action(async (opts) => {
        const days = Number(opts.days);
        if (!Number.isFinite(days) || days < 1) {
            console.error(art_1.C.red(`\n  ✗ --days must be a positive number, got "${opts.days}"`));
            process.exit(1);
        }
        const spinner = (0, ora_1.default)({ ...art_1.spinnerStyle, text: art_1.C.dim(' Consulting the calendar...') }).start();
        try {
            // Grade 5+ is feasts and above; 3+ reaches down into memorials.
            const all = await (0, litcal_1.upcoming)(new Date(), days, opts.all ? 3 : 5);
            const events = opts.sundays ? all : all.filter(e => !ORDINARY_SUNDAY.test(e.event_key));
            spinner.stop();
            console.log((0, art_1.sectionHeader)(`Next ${days} days`, '✝'));
            if (!events.length) {
                console.log(art_1.C.dim('  Nothing on the calendar in that window.\n'));
                return;
            }
            for (const e of events) {
                const date = art_1.C.sky(`  ${String(e.day).padStart(2, ' ')} ${MONTHS[e.month - 1]}`);
                const name = art_1.C.gold(e.name);
                console.log(`${date}  ${name}`);
                console.log(`          ${art_1.C.dim(e.grade_lcl)}${e.color?.length ? art_1.C.dim('  ·  ') + (0, saints_1.paintColors)(e.color) : ''}`);
            }
            console.log();
        }
        catch (err) {
            spinner.stop();
            console.error(art_1.C.red(`\n  ✗ ${err.message}`));
            process.exit(1);
        }
    });
}
//# sourceMappingURL=feasts.js.map