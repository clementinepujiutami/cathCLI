import { Command } from 'commander';
import { C } from '../ui/art';

// Flavour, and the closing note of the landing page. Does nothing but say
// goodnight, which is the entire point.
const SLEEPING = [
  '        /\\___/\\',
  '       ( - . - )',
  '      /|_____|\\',
];

export function registerSleep(program: Command) {
  program
    .command('sleep')
    .description('Say goodnight')
    .action(() => {
      console.log();
      console.log(C.dim('        z  z  z'));
      for (const line of SLEEPING) console.log(C.gold(line));
      console.log();
      console.log(C.cream('  Brother Cath is sleeping. Come back tomorrow.'));
      console.log(C.dim('  Pax et Bonum.'));
      console.log();
    });
}
