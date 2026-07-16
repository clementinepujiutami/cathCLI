import { Command } from 'commander';
import inquirer from 'inquirer';
import { BUILTIN_PRAYERS, findPrayer, prayersByCategory, Prayer } from '../data/prayers';
import { getScrapedPrayer } from '../services/prayers';
import { C, sectionHeader } from '../ui/art';
import { prayerCard } from '../ui/card';
import { pawpe } from '../ui/figures/pawpe';
import { soundPrayer } from '../ui/sound';

const CATEGORY_LABEL: Record<Prayer['category'], string> = {
  daily: 'Daily Prayer',
  marian: 'Marian Prayer',
  devotion: 'Devotional Prayer',
  litany: 'Litany',
  rosary: 'The Rosary',
  chaplet: 'Chaplet',
  novena: 'Novena',
};

// Every card currently shows the mascot. Once the figure pipeline lands this
// picks art per prayer, falling back to the prayer's category.
function showPrayer(p: Prayer) {
  console.log(
    prayerCard(p.title, p.text, {
      category: CATEGORY_LABEL[p.category],
      art: pawpe,
      tags: ['BUILT-IN'],
    })
  );
}

export function registerPray(program: Command) {
  program
    .command('pray [name]')
    .description('Browse or display a Catholic prayer')
    .action(async (name?: string) => {
      soundPrayer();

      if (name) {
        const builtin = findPrayer(name);
        if (builtin) {
          showPrayer(builtin);
          return;
        }

        // Try scraping from mycatholic.life
        const ora = (await import('ora')).default;
        const { spinnerStyle } = await import('../ui/art');
        const spinner = ora(spinnerStyle).start();
        try {
          const scraped = await getScrapedPrayer(name);
          spinner.stop();
          console.log(
            prayerCard(scraped.title, scraped.text, {
              category: 'Prayer',
              art: pawpe,
              tags: ['MYCATHOLIC.LIFE'],
            })
          );
        } catch (err: any) {
          spinner.stop();
          console.error(C.red(`\n  ✗ Prayer not found: ${err.message}`));
          console.log(C.dim('\n  Try: cath pray  (browse all prayers)'));
          process.exit(1);
        }
        return;
      }

      // Interactive browser
      console.log(sectionHeader("Let's Puurray!", '🐾'));
      const cats = prayersByCategory();

      const categoryChoices = [
        { name: `${C.gold('Daily Prayers')}       (${cats.daily.length})`, value: 'daily' },
        { name: `${C.gold('Marian Prayers')}      (${cats.marian.length})`, value: 'marian' },
        { name: `${C.gold('Devotional Prayers')}  (${cats.devotion.length})`, value: 'devotion' },
        { name: `${C.gold('Litanies')}            (${cats.litany.length})`, value: 'litany' },
        { name: `${C.gold('The Rosary')}          (${cats.rosary.length})`, value: 'rosary' },
        { name: `${C.gold('Chaplets')}            (${cats.chaplet.length})`, value: 'chaplet' },
        { name: `${C.gold('Novenas')}             (${cats.novena.length})`, value: 'novena' },
      ];

      const { category } = await inquirer.prompt([{
        type: 'list',
        name: 'category',
        message: C.cream('Select a category:'),
        choices: categoryChoices,
      }]);

      const prayersInCat = BUILTIN_PRAYERS.filter(p => p.category === category);
      const prayerChoices = prayersInCat.map(p => ({ name: p.title, value: p.id }));

      const { prayerId } = await inquirer.prompt([{
        type: 'list',
        name: 'prayerId',
        message: C.cream('Select a prayer:'),
        choices: prayerChoices,
      }]);

      showPrayer(findPrayer(prayerId)!);
    });
}
