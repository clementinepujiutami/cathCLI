import { Command } from 'commander';
import ora from 'ora';
import { getRandomVerse } from '../services/bible';
import { C, verseBox, spinnerStyle } from '../ui/art';
import { soundVerse } from '../ui/sound';

export function registerRandom(program: Command) {
  program
    .command('random')
    .description('Show a random verse from a curated pool of beloved Catholic verses')
    .action(async () => {
      const spinner = ora(spinnerStyle).start();
      try {
        const v = await getRandomVerse();
        spinner.stop();
        soundVerse();
        console.log(verseBox(`${v.book} ${v.chapter}:${v.verse} (${v.version})`, v.text));
      } catch (err: any) {
        spinner.stop();
        console.error(C.red(`\n  ✗ Error fetching random verse: ${err.message}`));
        process.exit(1);
      }
    });
}
