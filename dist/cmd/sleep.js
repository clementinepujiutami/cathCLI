"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSleep = registerSleep;
const art_1 = require("../ui/art");
// Flavour, and the closing note of the landing page. Does nothing but say
// goodnight, which is the entire point.
const SLEEPING = [
    '        /\\___/\\',
    '       ( - . - )',
    '      /|_____|\\',
];
function registerSleep(program) {
    program
        .command('sleep')
        .description('Say goodnight')
        .action(() => {
        console.log();
        console.log(art_1.C.dim('        z  z  z'));
        for (const line of SLEEPING)
            console.log(art_1.C.gold(line));
        console.log();
        console.log(art_1.C.cream('  Brother Cath is sleeping. Come back tomorrow.'));
        console.log(art_1.C.dim('  Pax et Bonum.'));
        console.log();
    });
}
//# sourceMappingURL=sleep.js.map