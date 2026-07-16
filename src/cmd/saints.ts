import { Command } from 'commander';
import ora from 'ora';
import { saintsOn, celebrationOn, LitEvent } from '../services/litcal';
import { C, sectionHeader, spinnerStyle } from '../ui/art';

// Liturgical colors, as the calendar reports them.
const COLOR: Record<string, (s: string) => string> = {
  white: C.cream, red: C.red, green: (s) => C.dim(s), purple: C.sky, rose: C.red,
};

export function paintColors(colors: string[] = []): string {
  return colors.map(c => (COLOR[c] ?? C.white)(c)).join(C.dim(' / '));
}

// `new Date(2026, 98, 99)` doesn't throw, it rolls over into 2034. So build the
// date, then check it kept the fields it was given.
function build(y: number, m: number, d: number, input: string): Date {
  const date = new Date(y, m - 1, d);
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) {
    throw new Error(`"${input}" isn't a real date.`);
  }
  return date;
}

function parseDate(input?: string): Date {
  if (!input) return new Date();
  // Accept YYYY-MM-DD or MM-DD; anything else is a user error worth naming.
  const iso = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(input);
  if (iso) return build(+iso[1], +iso[2], +iso[3], input);
  const md = /^(\d{1,2})-(\d{1,2})$/.exec(input);
  if (md) return build(new Date().getFullYear(), +md[1], +md[2], input);
  throw new Error(`Unrecognized date "${input}". Use YYYY-MM-DD or MM-DD.`);
}

export function formatEvent(e: LitEvent): string[] {
  const out = [C.gold(`  ${e.name}`)];
  const bits = [C.dim(e.grade_lcl)];
  if (e.color?.length) bits.push(paintColors(e.color));
  out.push('    ' + bits.join(C.dim('  ·  ')));
  return out;
}

export function registerSaints(program: Command) {
  program
    .command('saints [date]')
    .description('Saints and memorials for today, or a given date (YYYY-MM-DD or MM-DD)')
    .action(async (date?: string) => {
      let when: Date;
      try {
        when = parseDate(date);
      } catch (err: any) {
        console.error(C.red(`\n  ✗ ${err.message}`));
        process.exit(1);
      }

      const spinner = ora({ ...spinnerStyle, text: C.dim(' Consulting the calendar...') }).start();
      try {
        const saints = await saintsOn(when);
        const day = await celebrationOn(when);
        spinner.stop();

        const label = when.toDateString();
        console.log(sectionHeader(label, '✝'));

        if (day?.liturgical_season) {
          console.log(C.dim(`  ${day.liturgical_season.replace(/_/g, ' ').toLowerCase()}\n`));
        }

        if (!saints.length) {
          console.log(C.dim('  No saint is commemorated on this day.'));
          if (day) console.log(C.dim(`  The day is kept as: ${day.name}\n`));
          return;
        }

        for (const s of saints) console.log(formatEvent(s).join('\n') + '\n');
      } catch (err: any) {
        spinner.stop();
        console.error(C.red(`\n  ✗ ${err.message}`));
        process.exit(1);
      }
    });
}
