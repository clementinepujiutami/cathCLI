#!/usr/bin/env node
// Suppress Node.js internal deprecation warnings (punycode from cheerio)
process.removeAllListeners('warning');
import { Command } from 'commander';
import { banner } from './ui/art';
import { soundStartup } from './ui/sound';
import { registerBooks } from './cmd/books';
import { registerRead } from './cmd/read';
import { registerVerse } from './cmd/verse';
import { registerPray } from './cmd/pray';
import { registerRandom } from './cmd/random';
import { registerSearch } from './cmd/search';
import { registerSaints } from './cmd/saints';
import { registerFeasts } from './cmd/feasts';
import { registerBless } from './cmd/bless';
import { registerSleep } from './cmd/sleep';

const program = new Command();

// Read the real version rather than a literal: the hardcoded one sat at 1.0.0
// for two releases and made `cath --version` useless for telling builds apart.
function version(): string {
  try {
    return require('../package.json').version as string;
  } catch {
    return '0.0.0-dev';
  }
}

program
  .name('cath')
  .description('Holy Bible (Catholic Canon — NABRE) & Catholic Prayers')
  .version(version());

registerBooks(program);
registerRead(program);
registerVerse(program);
registerPray(program);
registerRandom(program);
registerSearch(program);
registerSaints(program);
registerFeasts(program);
registerBless(program);
registerSleep(program);

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
