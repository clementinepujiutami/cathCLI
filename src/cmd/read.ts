import { Command } from 'commander';
import ora from 'ora';
import { findBook } from '../data/books';
import { getChapter } from '../services/bible';
import { C, sectionHeader, spinnerStyle } from '../ui/art';
import { soundVerse } from '../ui/sound';

export function registerRead(program: Command) {
  program
    .command('read <book> <chapter>')
    .description('Read a Bible chapter (e.g. cath read jn 3)')
    .action(async (bookQuery: string, chapterStr: string) => {
      const book = findBook(bookQuery);
      if (!book) {
        console.error(C.red(`\n  ✗ Error: Book "${bookQuery}" not found. Type "cath books" to see all 73 Catholic books.`));
        process.exit(1);
      }

      const chapter = parseInt(chapterStr, 10);
      if (isNaN(chapter) || chapter <= 0) {
        console.error(C.red(`\n  ✗ Error: Invalid chapter number "${chapterStr}".`));
        process.exit(1);
      }

      const spinner = ora(spinnerStyle).start();
      try {
        const verses = await getChapter(book.id, chapter);
        spinner.stop();

        soundVerse();
        console.log(sectionHeader(`${book.name} — Chapter ${chapter} (${verses[0]?.version || 'NABRE'})`));

        for (const v of verses) {
          const prefix = C.gold(`[${v.verse}] `);
          console.log(`\n${prefix}${C.cream(v.text)}`);
        }
        console.log();
      } catch (err: any) {
        spinner.stop();
        console.error(C.red(`\n  ✗ Error fetching chapter: ${err.message}`));
        process.exit(1);
      }
    });
}
