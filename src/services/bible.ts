// BibleGet I/O — Catholic Bible API (Apache-2.0, built by a Catholic priest)
// https://query.bibleget.io  |  No API key — appid is just your app name
// Supports NABRE, Douay-Rheims, Nova Vulgata, and all deuterocanonical books

import fetch from 'node-fetch';
import { cache } from '../db';

const BASE    = 'https://query.bibleget.io/v3/';
const APP_ID  = 'cathCLI';
const VERSION = 'NABRE';

export interface BibleVerse {
  book:      string;
  bookabbrev:string;
  chapter:   number;
  verse:     number;
  text:      string;
  version:   string;
}

interface BibleGetResult {
  testament:     number;
  book:          string;
  bookabbrev:    string;
  chapter:       number;
  verse:         string;
  text:          string;
  version:       string;
  booknum:       number;
  univbooknum:   string;
}

interface BibleGetResponse {
  results: BibleGetResult[];
  errors:  unknown[];
  info:    Record<string, unknown>;
}

async function bibleget(query: string): Promise<BibleGetResult[]> {
  const url = `${BASE}?query=${encodeURIComponent(query)}&version=${VERSION}&appid=${APP_ID}&return=json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`BibleGet error: HTTP ${res.status}`);
  const data = await res.json() as BibleGetResponse;
  if (data.errors?.length) {
    const errs = data.errors as string[];
    throw new Error(`BibleGet: ${errs.join(', ')}`);
  }
  return data.results;
}

function toVerse(r: BibleGetResult): BibleVerse {
  // Strip XML/HTML tags (like <pof> or <poi>) returned by the BibleGet API
  const cleanText = r.text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  return {
    book:       r.book,
    bookabbrev: r.bookabbrev,
    chapter:    r.chapter,
    verse:      parseInt(r.verse, 10),
    text:       cleanText,
    version:    r.version,
  };
}

// ── Public API ────────────────────────────────────────────────────────────────

export async function getChapter(bookAbbr: string, chapter: number): Promise<BibleVerse[]> {
  const ref = `${bookAbbr}${chapter}`;
  const hit = cache.getChapter(ref);
  if (hit) return hit as BibleVerse[];

  const results = await bibleget(`${bookAbbr}${chapter}`);
  if (!results.length) throw new Error(`No results for ${bookAbbr} ${chapter}`);

  const verses = results.map(toVerse);
  cache.setChapter(ref, verses);
  return verses;
}

export async function getVerse(bookAbbr: string, chapter: number, verse: number): Promise<BibleVerse> {
  const ref = `${bookAbbr}${chapter}:${verse}`;
  const hit = cache.getVerse(ref);
  if (hit) return hit as BibleVerse;

  const results = await bibleget(ref);
  if (!results.length) throw new Error(`Verse not found: ${ref}`);

  const v = toVerse(results[0]);
  cache.setVerse(ref, v);
  return v;
}

// Random from a curated pool of beloved Catholic verses
const POOL = [
  'Jn3:16',   'Jn14:6',   'Rom8:28',  'Ps23:1',   'Phil4:13',
  'Jer29:11', 'Isa40:31', 'Mt5:3',    'Mt11:28',  'Rom5:8',
  'Gal2:20',  'Eph2:8',   'Prv3:5',   'Ps46:1',   'Rev21:4',
  'Jn15:13',  'Lk1:37',   '1Cor13:4', 'Deut31:6', 'Ps118:24',
  'Sir2:6',   'Wis3:1',   'Tob4:16',  'Ps91:11',  'Isa41:10',
  '1Pe5:7',   'Mt28:20',  'Col3:23',  'Heb11:1',  'Jn11:25',
];

export async function getRandomVerse(): Promise<BibleVerse> {
  const query = POOL[Math.floor(Math.random() * POOL.length)];
  const results = await bibleget(query);
  if (!results.length) throw new Error('Could not fetch random verse');
  return toVerse(results[0]);
}

export async function searchVerses(keyword: string): Promise<BibleVerse[]> {
  const db = (await import('../db')).default;
  if (!db) return [];

  const kw  = keyword.toLowerCase();
  const pat = `%${keyword}%`;
  const seen = new Set<string>();
  const results: BibleVerse[] = [];

  const add = (v: BibleVerse) => {
    const key = `${v.book}${v.chapter}:${v.verse}`;
    if (!seen.has(key) && v.text.toLowerCase().includes(kw)) {
      seen.add(key);
      results.push(v);
    }
  };

  // Search cached individual verses
  const verseRows = db.prepare('SELECT data FROM verses WHERE data LIKE ?')
    .all(pat) as { data: string }[];
  for (const r of verseRows) add(JSON.parse(r.data) as BibleVerse);

  // Search cached chapters (each row holds all verses of a chapter as a JSON array)
  const chapRows = db.prepare('SELECT data FROM chapters WHERE data LIKE ?')
    .all(pat) as { data: string }[];
  for (const r of chapRows) {
    const verses = JSON.parse(r.data) as BibleVerse[];
    for (const v of verses) add(v);
  }

  return results.slice(0, 30);
}
