import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { cache } from '../db';

export interface ScrapedPrayer {
  title: string;
  text: string;
}

export async function getScrapedPrayer(slug: string): Promise<ScrapedPrayer> {
  const name = slug.toLowerCase().trim().replace(/[-\s]+/g, '-');

  // 1. Check local SQLite Cache first
  const hit = cache.getPrayer(name);
  if (hit) return hit;

  // 2. Fetch from mycatholic.life
  const url = `https://mycatholic.life/catholic-prayers/${name}/`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Prayer not found on mycatholic.life (HTTP ${res.status}).`);
  }

  const html = await res.text();
  const $ = cheerio.load(html);

  // Extract the title (usually h1)
  const title = $('h1').text().trim() || name.replace(/-/g, ' ');

  // Extract content from entry-content or main article container
  const paragraphs: string[] = [];
  $('.entry-content p, .entry-content li').each((_, el) => {
    const text = $(el).text().trim();
    // Exclude social sharing widgets, copyright footnotes or advertisements
    if (
      text &&
      !text.toLowerCase().startsWith('share this') &&
      !text.toLowerCase().includes('copyright ©') &&
      !text.toLowerCase().includes('all rights reserved')
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
