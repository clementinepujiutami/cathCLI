import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { cache } from '../db';
import doorsMap from '../data/doors_map.json';

export interface ScrapedPrayer {
  title: string;
  text: string;
}

export async function getScrapedPrayer(slug: string): Promise<ScrapedPrayer> {
  const name = slug.toLowerCase().trim().replace(/[-\s]+/g, '-');

  // 1. Check local SQLite Cache first
  const hit = cache.getPrayer(name);
  if (hit) return hit;

  // 2. Try catholicdoors.com map first
  const entry = (doorsMap as Record<string, { title: string; url: string; category: string }>)[name];
  if (entry) {
    const res = await fetch(entry.url);
    if (!res.ok) {
      throw new Error(`Failed to fetch from catholicdoors.com (HTTP ${res.status}).`);
    }
    const html = await res.text();
    const $ = cheerio.load(html);

    let title = $('title').text().trim();
    title = title.replace(/\s+/g, ' ');
    if (!title.toLowerCase().startsWith('chaplet') && !title.toLowerCase().startsWith('litany') && !title.toLowerCase().startsWith('novena') && !title.toLowerCase().startsWith('consecration')) {
      const greenFont = $('font[color="green"]').first().text().replace(/\s+/g, ' ').trim();
      if (greenFont) title = greenFont;
    }
    if (!title) {
      title = entry.title;
    }

    const blockquote = $('blockquote');
    if (!blockquote.length) {
      throw new Error('Could not parse content from the page.');
    }

    blockquote.find('script').remove();
    blockquote.find('table').remove();
    blockquote.find('p[align="center"]').remove();

    blockquote.find('a').each((_, el) => {
      $(el).replaceWith($(el).text());
    });

    blockquote.find('br').replaceWith('\n');
    blockquote.find('p').each((_, el) => {
      $(el).prepend('\n\n');
    });

    let text = blockquote.text().trim();
    text = text.replace(/\r/g, '');
    text = text.replace(/\n{3,}/g, '\n\n');
    text = text.split('\n').map(line => line.trim().replace(/[ \t]+/g, ' ')).join('\n');
    text = text.replace(/\n{3,}/g, '\n\n').trim();

    cache.setPrayer(name, title, text);
    return { title, text };
  }

  // 3. Fetch from mycatholic.life
  const url = `https://mycatholic.life/catholic-prayers/${name}/`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Prayer not found on mycatholic.life (HTTP ${res.status}) or catholicdoors.com mapping.`);
  }

  const html = await res.text();
  const $ = cheerio.load(html);

  // Remove elements that are navigation/ads/widgets
  $('noscript, script, style, .addtoany_share_save_container, [class^="ai-"], hr').remove();

  // Extract the title (usually h1)
  const title = $('h1').text().trim() || name.replace(/-/g, ' ');

  // Extract content from entry-content or main article container
  const paragraphs: string[] = [];
  $('.entry-content div, .entry-content p, .entry-content li').each((_, el) => {
    // Only capture leaf elements to prevent duplicate text from parent divs
    if ($(el).find('div, p, li').length > 0) return;

    const text = $(el).text().trim();
    const lowerText = text.toLowerCase();
    
    // Exclude social sharing widgets, copyright footnotes, navigation, or advertisements
    if (
      text &&
      !lowerText.startsWith('share this') &&
      !lowerText.includes('copyright ©') &&
      !lowerText.includes('all rights reserved') &&
      !lowerText.startsWith('more prayers') &&
      !lowerText.startsWith('daily reflections') &&
      !lowerText.startsWith('featured image') &&
      !lowerText.startsWith('more on ') &&
      !lowerText.includes('more sharing options')
    ) {
      paragraphs.push(text);
    }
  });

  if (!paragraphs.length) {
    // Fallback: try reading the raw text of .entry-content or main article
    const fallbackText = $('.entry-content').text().trim() || $('article').text().trim();
    if (fallbackText) {
      paragraphs.push(fallbackText);
    } else {
      throw new Error('Could not parse prayer content from the page.');
    }
  }

  const text = paragraphs.join('\n\n');

  // 3. Save to SQLite cache
  cache.setPrayer(name, title, text);

  return { title, text };
}
