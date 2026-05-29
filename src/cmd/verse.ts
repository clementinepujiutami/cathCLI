import { Command } from 'commander';
import ora from 'ora';
import { findBook } from '../data/books';
import { getVerse } from '../services/bible';
import { C, verseBox, spinnerStyle } from '../ui/art';
import { soundVerse } from '../ui/sound';

export function registerVerse(program: Command) {
  program
    .command('verse <book> <reference>')
    .description('Read a single verse (e.g. cath verse jn 3:16)')
    .action(async (bookQuery: string, reference: string) => {
      const book = findBook(bookQuery);
      if (!book) {
        console.error(C.red(`\n  ✗ Error: Book "${bookQuery}" not found. Type "cath books" to see all 73 Catholic books.`));
        process.exit(1);
      }

      const parts = reference.split(':');
      if (parts.length !== 2) {
        console.error(C.red(`\n  ✗ Error: Reference format must be chapter:verse, e.g. "3:16". Received "${reference}".`));
        process.exit(1);
      }

      const chapter = parseInt(parts[0], 10);
      const verseNum = parseInt(parts[1], 10);
      if (isNaN(chapter) || chapter <= 0 || isNaN(verseNum) || verseNum <= 0) {
        console.error(C.red(`\n  ✗ Error: Invalid chapter or verse numbers in reference "${reference}".`));
        process.exit(1);
      }

      const spinner = ora(spinnerStyle).start();
      try {
        const v = await getVerse(book.id, chapter, verseNum);
        spinner.stop();

        soundVerse();
        console.log(verseBox(`${book.name} ${v.chapter}:${v.verse} (${v.version})`, v.text));
      } catch (err: any) {
        spinner.stop();
        console.error(C.red(`\n  ✗ Error fetching verse: ${err.message}`));
        process.exit(1);
      }
    });
}
