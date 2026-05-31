"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerPray = registerPray;
const inquirer_1 = __importDefault(require("inquirer"));
const prayers_1 = require("../data/prayers");
const prayers_2 = require("../services/prayers");
const art_1 = require("../ui/art");
const sound_1 = require("../ui/sound");
function registerPray(program) {
    program
        .command('pray [name]')
        .description('Browse or display a Catholic prayer')
        .action(async (name) => {
        (0, sound_1.soundPrayer)();
        if (name) {
            const builtin = (0, prayers_1.findPrayer)(name);
            if (builtin) {
                console.log((0, art_1.prayerBox)(builtin.title, builtin.text));
                return;
            }
            // Try scraping from mycatholic.life
            const ora = (await Promise.resolve().then(() => __importStar(require('ora')))).default;
            const { spinnerStyle } = await Promise.resolve().then(() => __importStar(require('../ui/art')));
            const spinner = ora(spinnerStyle).start();
            try {
                const scraped = await (0, prayers_2.getScrapedPrayer)(name);
                spinner.stop();
                console.log((0, art_1.prayerBox)(scraped.title, scraped.text));
            }
            catch (err) {
                spinner.stop();
                console.error(art_1.C.red(`\n  ✗ Prayer not found: ${err.message}`));
                console.log(art_1.C.dim('\n  Try: cath pray  (browse all prayers)'));
                process.exit(1);
            }
            return;
        }
        // Interactive browser
        console.log((0, art_1.sectionHeader)('Catholic Prayers'));
        const cats = (0, prayers_1.prayersByCategory)();
        const categoryChoices = [
            { name: `${art_1.C.gold('Daily Prayers')}       (${cats.daily.length})`, value: 'daily' },
            { name: `${art_1.C.gold('Marian Prayers')}      (${cats.marian.length})`, value: 'marian' },
            { name: `${art_1.C.gold('Devotional Prayers')}  (${cats.devotion.length})`, value: 'devotion' },
            { name: `${art_1.C.gold('Litanies')}            (${cats.litany.length})`, value: 'litany' },
            { name: `${art_1.C.gold('The Rosary')}          (${cats.rosary.length})`, value: 'rosary' },
            { name: `${art_1.C.gold('Chaplets')}            (${cats.chaplet.length})`, value: 'chaplet' },
        ];
        const { category } = await inquirer_1.default.prompt([{
                type: 'list',
                name: 'category',
                message: art_1.C.cream('Select a category:'),
                choices: categoryChoices,
            }]);
        const prayersInCat = prayers_1.BUILTIN_PRAYERS.filter(p => p.category === category);
        const prayerChoices = prayersInCat.map(p => ({ name: p.title, value: p.id }));
        const { prayerId } = await inquirer_1.default.prompt([{
                type: 'list',
                name: 'prayerId',
                message: art_1.C.cream('Select a prayer:'),
                choices: prayerChoices,
            }]);
        const prayer = (0, prayers_1.findPrayer)(prayerId);
        console.log((0, art_1.prayerBox)(prayer.title, prayer.text));
    });
}
//# sourceMappingURL=pray.js.map