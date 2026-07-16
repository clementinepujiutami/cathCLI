import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { cache } from '../db';
import doorsMap from '../data/doors_map.json';

const TIMEOUT_MS  = 8000;
const MAX_RETRIES = 1;

export interface ScrapedPrayer {
  title: string;
  text: string;
}

async function fetchWithTimeout(url: string) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, { signal: ctrl.signal as any });
  } catch (err: any) {
    if (err.name === 'AbortError') throw new Error('Request timed out after 8s. Check your connection.');
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

async function fetchRetry(url: string, attempt = 0): ReturnType<typeof fetchWithTimeout> {
  try {
    const res = await fetchWithTimeout(url);
    if (!res.ok && res.status >= 500 && attempt < MAX_RETRIES) return fetchRetry(url, attempt + 1);
    return res;
  } catch (err) {
    if (attempt < MAX_RETRIES) return fetchRetry(url, attempt + 1);
    throw err;
  }
}

async function parseDoorsPage(html: string, fallbackTitle: string): Promise<ScrapedPrayer | null> {
  const $ = cheerio.load(html);

  let title = $('title').text().replace(/\s+/g, ' ').trim();
  const lower = title.toLowerCase();
  if (!lower.startsWith('chaplet') && !lower.startsWith('litany') && !lower.startsWith('novena') && !lower.startsWith('consecration')) {
    const greenFont = $('font[color="green"]').first().text().replace(/\s+/g, ' ').trim();
    if (greenFont) title = greenFont;
  }
  if (!title) title = fallbackTitle;

  const blockquote = $('blockquote');
  if (!blockquote.length) return null;

  blockquote.find('script, table, p[align="center"]').remove();
  blockquote.find('a').each((_, el) => { $(el).replaceWith($(el).text()); });
  blockquote.find('br').replaceWith('\n');
  blockquote.find('p').each((_, el) => { $(el).prepend('\n\n'); });

  let text = blockquote.text().trim()
    .replace(/\r/g, '')
    .replace(/\n{3,}/g, '\n\n');
  text = text.split('\n').map(l => l.trim().replace(/[ \t]+/g, ' ')).join('\n');
  text = text.replace(/\n{3,}/g, '\n\n').trim();

  return { title, text };
}

async function parseMycatholicPage(html: string, fallbackTitle: string): Promise<ScrapedPrayer> {
  const $ = cheerio.load(html);
  $('noscript, script, style, .addtoany_share_save_container, [class^="ai-"], hr').remove();

  const title = $('h1').text().trim() || fallbackTitle;
  const paragraphs: string[] = [];

  $('.entry-content div, .entry-content p, .entry-content li').each((_, el) => {
    if ($(el).find('div, p, li').length > 0) return;
    const text = $(el).text().trim();
    const low  = text.toLowerCase();
    if (
      text &&
      !low.startsWith('share this') &&
      !low.includes('copyright ©') &&
      !low.includes('all rights reserved') &&
      !low.startsWith('more prayers') &&
      !low.startsWith('daily reflections') &&
      !low.startsWith('featured image') &&
      !low.startsWith('more on ') &&
      !low.includes('more sharing options')
    ) paragraphs.push(text);
  });

  if (!paragraphs.length) {
    const fallback = $('.entry-content').text().trim() || $('article').text().trim();
    if (fallback) paragraphs.push(fallback);
    else throw new Error('Could not parse prayer content from the page.');
  }

  return { title, text: paragraphs.join('\n\n') };
}

export async function getScrapedPrayer(slug: string): Promise<ScrapedPrayer> {
  const name = slug.toLowerCase().trim().replace(/[-\s]+/g, '-');

  // 1. Fresh cache
  const hit = cache.getPrayer(name);
  if (hit) return hit;

  // 2. catholicdoors.com (if mapped) — fall through on any failure
  const entry = (doorsMap as Record<string, { title: string; url: string; category: string }>)[name];
  if (entry) {
    try {
      const res = await fetchRetry(entry.url);
      if (res.ok) {
        const parsed = await parseDoorsPage(await res.text(), entry.title);
        if (parsed) {
          cache.setPrayer(name, parsed.title, parsed.text);
          return parsed;
        }
      }
    } catch {
      // catholicdoors unreachable or unparseable — fall through to mycatholic.life
    }
  }

  // 3. mycatholic.life
  const url = `https://mycatholic.life/catholic-prayers/${name}/`;
  let res: Awaited<ReturnType<typeof fetchWithTimeout>>;
  try {
    res = await fetchRetry(url);
  } catch (err: any) {
    const stale = cache.getStalePrayer(name);
    if (stale) return stale;
    throw err;
  }

  if (!res.ok) {
    const stale = cache.getStalePrayer(name);
    if (stale) return stale;
    throw new Error(`Prayer "${name}" not found (HTTP ${res.status}). Try a different spelling.`);
  }

  const parsed = await parseMycatholicPage(await res.text(), name.replace(/-/g, ' '));
  cache.setPrayer(name, parsed.title, parsed.text);
  return parsed;
}
