import { Command } from 'commander';
import ora from 'ora';
import { searchVerses } from '../services/bible';
import { C, sectionHeader, spinnerStyle } from '../ui/art';

export function registerSearch(program: Command) {
  program
    .command('search <keyword>')
    .description('Search cached verses by keyword')
    .action(async (keyword: string) => {
      const spinner = ora({ ...spinnerStyle, text: C.dim(` Searching for "${keyword}"...`) }).start();
      try {
        const results = await searchVerses(keyword);
        spinner.stop();

        if (!results.length) {
          console.log(C.dim(`\n  No cached results for "${keyword}".`));
          console.log(C.dim('  Read some chapters first so they get cached — then search will work offline.\n'));
          return;
        }

        console.log(sectionHeader(`Search results for "${keyword}" (${results.length} found)`));
        for (const v of results) {
          const ref = C.gold(`[${v.book} ${v.chapter}:${v.verse}] `);
          console.log(`\n${ref}${C.cream(v.text)}`);
        }
        console.log();
      } catch (err: any) {
        spinner.stop();
        console.error(C.red(`\n  ✗ Search error: ${err.message}`));
        process.exit(1);
      }
    });
}
