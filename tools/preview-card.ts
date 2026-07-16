import fs from 'fs';
import { decodePng, toPixelArt } from './import-png';
import { prayerCard } from '../src/ui/card';
import { findPrayer, BUILTIN_PRAYERS } from '../src/data/prayers';

// Preview the card treatment before real figure art exists.
//   pnpm exec ts-node tools/preview-card.ts ["prayer name"]
// Uses the mascot as stand-in art. Swap for dithered figures once the pipeline
// lands; nothing here depends on the placeholder.

const name = process.argv[2] ?? 'hail mary';
const p = findPrayer(name);
if (!p) {
  console.error(`no prayer matching "${name}". try one of:`);
  console.error(BUILTIN_PRAYERS.slice(0, 12).map(x => '  ' + x.title).join('\n'));
  process.exit(1);
}

const art = toPixelArt(decodePng(fs.readFileSync('landing/assets/pawpe.png')));
process.stdout.write(
  prayerCard(p.title, p.text, {
    category: `${p.category} prayer`,
    art,
    tags: ['BUILT-IN', p.category.toUpperCase()],
  })
);
