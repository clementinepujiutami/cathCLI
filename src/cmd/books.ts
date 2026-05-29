import { Command } from 'commander';
import { booksByCategory } from '../data/books';
import { C, sectionHeader } from '../ui/art';
import { soundNotify } from '../ui/sound';

export function registerBooks(program: Command) {
  program
    .command('books')
    .description('List all 73 books of the Catholic Bible')
    .action(() => {
      soundNotify();
      console.log(sectionHeader('Holy Bible — Catholic Canon (73 Books)'));

      const categories = booksByCategory();

      for (const [category, list] of categories.entries()) {
        console.log(C.gold(`\n  ■ ${category}`));
        const bookStrings = list.map(b => `${C.cream(b.name)} (${C.sky(b.id)})`);

        // Wrap lines to fit nicely in the terminal (max 80 chars wide)
        let line = '    ';
        for (const bStr of bookStrings) {
          const strippedLen = bStr.replace(/\x1B\[\d+m/g, '').length; // length without chalk ansi escape codes
          const lineStrippedLen = line.replace(/\x1B\[\d+m/g, '').length;
          
          if (lineStrippedLen + strippedLen + 5 > 80) {
            console.log(line);
            line = '    ' + bStr;
          } else {
            line = line === '    ' ? line + bStr : line + C.dim('  ·  ') + bStr;
          }
        }
        if (line.trim()) console.log(line);
      }
      console.log();
    });
}
