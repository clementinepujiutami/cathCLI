#!/usr/bin/env node
import { Command } from 'commander';
import { banner } from './ui/art';
import { soundStartup } from './ui/sound';
import { registerBooks } from './cmd/books';
import { registerRead } from './cmd/read';
import { registerVerse } from './cmd/verse';
import { registerPray } from './cmd/pray';
import { registerRandom } from './cmd/random';
import { registerSearch } from './cmd/search';

const program = new Command();

program
  .name('cath')
  .description('Holy Bible (Catholic Canon — NABRE) & Catholic Prayers')
  .version('1.0.0');

registerBooks(program);
registerRead(program);
registerVerse(program);
registerPray(program);
registerRandom(program);
registerSearch(program);

if (process.argv.length <= 2) {
  soundStartup();
  console.log(banner());
  program.outputHelp();
} else {
  program.parseAsync(process.argv).catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
}
