import { Command } from 'commander';
import ora from 'ora';
import { searchVerses } from '../services/bible';
import { findBook, BIBLE_BOOKS } from '../data/books';
import { BUILTIN_PRAYERS } from '../data/prayers';
import { C, sectionHeader, spinnerStyle } from '../ui/art';

// Strip common English prefixes before trying to match a book name
const STRIP_RE = [
  /^(?:the\s+)?books?\s+of\s+/i,
  /^(?:the\s+)?gospel\s+(?:of|according\s+to)\s+(?:st\.?\s+)?/i,
  /^(?:the\s+)?(?:letter|epistle|revelation)\s+(?:of|to)\s+/i,
  /^(?:st\.?|saint)\s+/i,
];

const ORDINAL_MAP: Record<string, string> = {
  first: '1', second: '2', third: '3',
  '1st': '1', '2nd': '2', '3rd': '3',
};

function resolveBook(query: string) {
  let q = query.toLowerCase().trim();

  // "first corinthians" → "1 corinthians"
  for (const [word, num] of Object.entries(ORDINAL_MAP)) {
    if (q.startsWith(word + ' ')) {
      q = num + ' ' + q.slice(word.length + 1);
      break;
    }
  }

  for (const re of STRIP_RE) q = q.replace(re, '');

  return findBook(q.trim());
}

// All unique categories in the book list
const ALL_CATEGORIES = [...new Set(BIBLE_BOOKS.map(b => b.category))];

function resolveCategory(query: string): string | undefined {
  const q = query.toLowerCase();
  return ALL_CATEGORIES.find(cat => q.includes(cat.toLowerCase()));
}

export function registerSearch(program: Command) {
  program
    .command('search <keywords...>')
    .description('Search cached verses by keyword (or look up a book / category)')
    .action(async (keywords: string[]) => {
      const query   = keywords.join(' ');
      const spinner = ora({ ...spinnerStyle, text: C.dim(` Searching for "${query}"...`) }).start();

      // Plural "books of X" → prefer category over single-book match
      const isPlural = /^books?\s+of\b/i.test(query) && /^books\s/i.test(query);

      // ── 1. Smart book-name detection (singular) ──────────────────────────────
      const book = !isPlural ? resolveBook(query) : undefined;
      if (book) {
        spinner.stop();
        console.log(sectionHeader(`Book: ${book.name}`));
        console.log(`\n  ${C.cream(book.name)} ${C.dim(`(${book.abbr})`)}  —  ${C.gold(book.category)}  ${C.dim(`· ${book.chapters} chapters`)}`);
        console.log(`\n  ${C.dim('Read it with:')}  ${C.sky(`cath read ${book.id} 1`)}`);
        console.log();
        return;
      }

      // ── 2. Smart category detection ──────────────────────────────────────────
      const category = resolveCategory(query);
      if (category) {
        spinner.stop();
        const books = BIBLE_BOOKS.filter(b => b.category === category);
        console.log(sectionHeader(`Category: ${category}`));
        for (const b of books) {
          console.log(`  ${C.gold(b.abbr.padEnd(6))} ${C.cream(b.name)}`);
        }
        console.log(`\n  ${C.dim('Read one with e.g.')}  ${C.sky(`cath read ${books[0]?.id ?? '...'} 1`)}`);
        console.log();
        return;
      }

      // ── 3. Full-text cache search ────────────────────────────────────────────
      try {
        const results = await searchVerses(query);
        spinner.stop();

        if (results.length) {
          console.log(sectionHeader(`Search results for "${query}" (${results.length} found)`));
          for (const v of results) {
            const ref = C.gold(`[${v.book} ${v.chapter}:${v.verse}] `);
            console.log(`\n${ref}${C.cream(v.text)}`);
          }
          console.log();
          return;
        }

        // No results — try individual words if query was multi-word
        if (keywords.length > 1) {
          for (const word of keywords) {
            if (word.length < 4) continue;
            const partial = await searchVerses(word);
            if (partial.length) {
              console.log(C.dim(`\n  No results for "${query}" — showing matches for "${word}":\n`));
              for (const v of partial) {
                const ref = C.gold(`[${v.book} ${v.chapter}:${v.verse}] `);
                console.log(`${ref}${C.cream(v.text)}`);
              }
              console.log();
              return;
            }
          }
        }

        // ── 4. Fall back to built-in prayer search ───────────────────────────
        // Split into meaningful words so "st michael" matches "Saint Michael"
        const qWords = query.toLowerCase().split(/\s+/).filter(w => w.length >= 3);
        const prayerMatches = qWords.length
          ? BUILTIN_PRAYERS.filter(p => {
              const body = (p.title + ' ' + p.text).toLowerCase();
              return qWords.every(w => body.includes(w));
            })
          : [];
        if (prayerMatches.length) {
          console.log(C.dim(`\n  No Bible verse cache results for "${query}" — found in prayers:\n`));
          for (const p of prayerMatches) {
            console.log(`  ${C.gold('✦')} ${C.cream(p.title)}  ${C.dim(`→ cath pray ${p.id}`)}`);
          }
          console.log();
          return;
        }

        console.log(C.dim(`\n  No cached results for "${query}".`));
        console.log(C.dim('  Read some chapters first — try:') + '  ' + C.sky('cath read jn 1'));
        console.log();
      } catch (err: any) {
        spinner.stop();
        console.error(C.red(`\n  ✗ Search error: ${err.message}`));
        process.exit(1);
      }
    });
}
