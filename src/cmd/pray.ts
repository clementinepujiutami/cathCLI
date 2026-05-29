import { Command } from 'commander';
import inquirer from 'inquirer';
import { BUILTIN_PRAYERS, findPrayer, prayersByCategory } from '../data/prayers';
import { getScrapedPrayer } from '../services/prayers';
import { C, prayerBox, sectionHeader } from '../ui/art';
import { soundPrayer } from '../ui/sound';

export function registerPray(program: Command) {
  program
    .command('pray [name]')
    .description('Browse or display a Catholic prayer')
    .action(async (name?: string) => {
      soundPrayer();

      if (name) {
        const builtin = findPrayer(name);
        if (builtin) {
          console.log(prayerBox(builtin.title, builtin.text));
          return;
        }

        // Try scraping from mycatholic.life
        const ora = (await import('ora')).default;
        const { spinnerStyle } = await import('../ui/art');
        const spinner = ora(spinnerStyle).start();
        try {
          const scraped = await getScrapedPrayer(name);
          spinner.stop();
          console.log(prayerBox(scraped.title, scraped.text));
        } catch (err: any) {
          spinner.stop();
          console.error(C.red(`\n  ✗ Prayer not found: ${err.message}`));
          console.log(C.dim('\n  Try: cath pray  (browse all prayers)'));
          process.exit(1);
        }
        return;
      }

      // Interactive browser
      console.log(sectionHeader('Catholic Prayers'));
      const cats = prayersByCategory();

      const categoryChoices = [
        { name: `${C.gold('Daily Prayers')}       (${cats.daily.length})`, value: 'daily' },
        { name: `${C.gold('Marian Prayers')}      (${cats.marian.length})`, value: 'marian' },
        { name: `${C.gold('Devotional Prayers')}  (${cats.devotion.length})`, value: 'devotion' },
        { name: `${C.gold('Litanies')}            (${cats.litany.length})`, value: 'litany' },
        { name: `${C.gold('The Rosary')}          (${cats.rosary.length})`, value: 'rosary' },
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

      const prayer = findPrayer(prayerId)!;
      console.log(prayerBox(prayer.title, prayer.text));
    });
}
