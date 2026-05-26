// Terminal bell sound effects
// Uses \x07 (ASCII BEL) — works on all terminals without audio files
// Patterns vary by timing to feel distinct

function bell(times = 1, delayMs = 150): void {
  for (let i = 0; i < times; i++) {
    setTimeout(() => {
      process.stdout.write('\x07');
    }, i * delayMs);
  }
}

// 🔔 Startup chime — two gentle bells
export function soundStartup(): void {
  bell(2, 200);
}

// ✨ Verse found — single soft ding
export function soundVerse(): void {
  bell(1);
}

// 🙏 Prayer mode — three ascending bells
export function soundPrayer(): void {
  bell(3, 250);
}

// ✝️ General notification — one bell
export function soundNotify(): void {
  bell(1);
}
