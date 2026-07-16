import { Command } from 'commander';
import ora from 'ora';
import { upcoming } from '../services/litcal';
import { C, sectionHeader, spinnerStyle } from '../ui/art';
import { paintColors } from './saints';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

// Every Sunday in Ordinary Time is graded a feast of the Lord, so an unfiltered
// list is mostly Sundays. They're keyed OrdSunday1..34; the real feasts at the
// same grade are named (Transfiguration, ExaltationCross, HolyFamily...), so
// filter on the key rather than the localized name.
const ORDINARY_SUNDAY = /^OrdSunday\d+$/;

export function registerFeasts(program: Command) {
  program
    .command('feasts')
    .description('Upcoming feasts and solemnities')
    .option('-d, --days <n>', 'how far ahead to look', '60')
    .option('-a, --all', 'include memorials, not just feasts and solemnities')
    .option('-s, --sundays', 'include the Sundays of Ordinary Time')
    .action(async (opts: { days: string; all?: boolean; sundays?: boolean }) => {
      const days = Number(opts.days);
      if (!Number.isFinite(days) || days < 1) {
        console.error(C.red(`\n  ✗ --days must be a positive number, got "${opts.days}"`));
        process.exit(1);
      }

      const spinner = ora({ ...spinnerStyle, text: C.dim(' Consulting the calendar...') }).start();
      try {
        // Grade 5+ is feasts and above; 3+ reaches down into memorials.
        const all = await upcoming(new Date(), days, opts.all ? 3 : 5);
        const events = opts.sundays ? all : all.filter(e => !ORDINARY_SUNDAY.test(e.event_key));
        spinner.stop();

        console.log(sectionHeader(`Next ${days} days`, '✝'));
        if (!events.length) {
          console.log(C.dim('  Nothing on the calendar in that window.\n'));
          return;
        }

        for (const e of events) {
          const date = C.sky(`  ${String(e.day).padStart(2, ' ')} ${MONTHS[e.month - 1]}`);
          const name = C.gold(e.name);
          console.log(`${date}  ${name}`);
          console.log(`          ${C.dim(e.grade_lcl)}${e.color?.length ? C.dim('  ·  ') + paintColors(e.color) : ''}`);
        }
        console.log();
      } catch (err: any) {
        spinner.stop();
        console.error(C.red(`\n  ✗ ${err.message}`));
        process.exit(1);
      }
    });
}
