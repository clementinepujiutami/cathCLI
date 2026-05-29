"use strict";
// Terminal bell sound effects
// Uses \x07 (ASCII BEL) — works on all terminals without audio files
// Patterns vary by timing to feel distinct
Object.defineProperty(exports, "__esModule", { value: true });
exports.soundStartup = soundStartup;
exports.soundVerse = soundVerse;
exports.soundPrayer = soundPrayer;
exports.soundNotify = soundNotify;
function bell(times = 1, delayMs = 150) {
    for (let i = 0; i < times; i++) {
        setTimeout(() => {
            process.stdout.write('\x07');
        }, i * delayMs);
    }
}
// 🔔 Startup chime — two gentle bells
function soundStartup() {
    bell(2, 200);
}
// ✨ Verse found — single soft ding
function soundVerse() {
    bell(1);
}
// 🙏 Prayer mode — three ascending bells
function soundPrayer() {
    bell(3, 250);
}
// ✝️ General notification — one bell
function soundNotify() {
    bell(1);
}
//# sourceMappingURL=sound.js.map