import { Command } from 'commander';
import ora from 'ora';
import { getVerseOfDay } from '../services/bible';
import { celebrationOn } from '../services/litcal';
import { C, verseBox, spinnerStyle } from '../ui/art';
import { soundVerse } from '../ui/sound';

export function registerBless(program: Command) {
  program
    .command('bless')
    .description("Today's blessing: the day's celebration and a verse to carry")
    .action(async () => {
      const spinner = ora(spinnerStyle).start();
      try {
        // The calendar is a nicety; a failed lookup shouldn't cost the verse.
        const [verse, day] = await Promise.all([
          getVerseOfDay(),
          celebrationOn().catch(() => null),
        ]);
        spinner.stop();
        soundVerse();

        if (day) {
          console.log('\n' + C.dim('  today is') + '  ' + C.gold(day.name));
          console.log('  ' + C.dim(day.grade_lcl));
        }
        console.log(verseBox(`${verse.book} ${verse.chapter}:${verse.verse} (${verse.version})`, verse.text));
        console.log(C.dim('  The same blessing for everyone, today. A new one tomorrow.\n'));
      } catch (err: any) {
        spinner.stop();
        console.error(C.red(`\n  ✗ ${err.message}`));
        process.exit(1);
      }
    });
}
