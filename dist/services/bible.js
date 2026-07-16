"use strict";
// BibleGet I/O — Catholic Bible API (Apache-2.0, built by a Catholic priest)
// https://query.bibleget.io  |  No API key — appid is just your app name
// Supports NABRE, Douay-Rheims, Nova Vulgata, and all deuterocanonical books
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChapter = getChapter;
exports.getVerse = getVerse;
exports.getVerseOfDay = getVerseOfDay;
exports.getRandomVerse = getRandomVerse;
exports.searchVerses = searchVerses;
const node_fetch_1 = __importDefault(require("node-fetch"));
const db_1 = require("../db");
const BASE = 'https://query.bibleget.io/v3/';
const APP_ID = 'cathCLI';
const VERSION = 'NABRE';
const TIMEOUT_MS = 8000;
const MAX_RETRIES = 1;
async function fetchWithTimeout(url) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    try {
        return await (0, node_fetch_1.default)(url, { signal: ctrl.signal });
    }
    catch (err) {
        if (err.name === 'AbortError')
            throw new Error('Request timed out after 8s. Check your connection.');
        throw err;
    }
    finally {
        clearTimeout(timer);
    }
}
async function bibleget(query, attempt = 0) {
    const url = `${BASE}?query=${encodeURIComponent(query)}&version=${VERSION}&appid=${APP_ID}&return=json`;
    let res;
    try {
        res = await fetchWithTimeout(url);
    }
    catch (err) {
        if (attempt < MAX_RETRIES)
            return bibleget(query, attempt + 1);
        throw err;
    }
    if (!res.ok) {
        if (attempt < MAX_RETRIES && res.status >= 500)
            return bibleget(query, attempt + 1);
        throw new Error(`BibleGet error: HTTP ${res.status}`);
    }
    const data = await res.json();
    if (data.errors?.length) {
        const errs = data.errors;
        throw new Error(`BibleGet: ${errs.join(', ')}`);
    }
    return data.results;
}
function toVerse(r) {
    // Strip XML/HTML tags (like <pof> or <poi>) returned by the BibleGet API
    const cleanText = r.text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    return {
        book: r.book,
        bookabbrev: r.bookabbrev,
        chapter: r.chapter,
        verse: parseInt(r.verse, 10),
        text: cleanText,
        version: r.version,
    };
}
// ── Public API ────────────────────────────────────────────────────────────────
async function getChapter(bookAbbr, chapter) {
    const ref = `${bookAbbr}${chapter}`;
    const hit = db_1.cache.getChapter(ref);
    if (hit)
        return hit;
    try {
        const results = await bibleget(`${bookAbbr}${chapter}`);
        if (!results.length)
            throw new Error(`No results for ${bookAbbr} ${chapter}`);
        const verses = results.map(toVerse);
        db_1.cache.setChapter(ref, verses);
        return verses;
    }
    catch (err) {
        const stale = db_1.cache.getStaleChapter(ref);
        if (stale)
            return stale;
        throw err;
    }
}
async function getVerse(bookAbbr, chapter, verse) {
    const ref = `${bookAbbr}${chapter}:${verse}`;
    const hit = db_1.cache.getVerse(ref);
    if (hit)
        return hit;
    try {
        const results = await bibleget(ref);
        if (!results.length)
            throw new Error(`Verse not found: ${ref}`);
        const v = toVerse(results[0]);
        db_1.cache.setVerse(ref, v);
        return v;
    }
    catch (err) {
        const stale = db_1.cache.getStaleVerse(ref);
        if (stale)
            return stale;
        throw err;
    }
}
// Random from a curated pool of beloved Catholic verses
const POOL = [
    'Jn3:16', 'Jn14:6', 'Rom8:28', 'Ps23:1', 'Phil4:13',
    'Jer29:11', 'Isa40:31', 'Mt5:3', 'Mt11:28', 'Rom5:8',
    'Gal2:20', 'Eph2:8', 'Prv3:5', 'Ps46:1', 'Rev21:4',
    'Jn15:13', 'Lk1:37', '1Cor13:4', 'Deut31:6', 'Ps118:24',
    'Sir2:6', 'Wis3:1', 'Tob4:16', 'Ps91:11', 'Isa41:10',
    '1Pe5:7', 'Mt28:20', 'Col3:23', 'Heb11:1', 'Jn11:25',
];
/**
 * The same verse all day, a different one tomorrow. Seeded off the date rather
 * than random so a blessing can be shared and compared: everyone gets the same
 * one on the same day, offline included.
 */
async function getVerseOfDay(date = new Date()) {
    const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
    const query = POOL[seed % POOL.length];
    try {
        const results = await bibleget(query);
        if (!results.length)
            throw new Error('Could not fetch the verse of the day');
        return toVerse(results[0]);
    }
    catch {
        const cached = db_1.cache.getAnyVerse();
        if (cached)
            return cached;
        throw new Error('Unable to fetch a verse. Please check your internet connection.');
    }
}
async function getRandomVerse() {
    const query = POOL[Math.floor(Math.random() * POOL.length)];
    try {
        const results = await bibleget(query);
        if (!results.length)
            throw new Error('Could not fetch random verse');
        return toVerse(results[0]);
    }
    catch {
        const cached = db_1.cache.getAnyVerse();
        if (cached)
            return cached;
        throw new Error('Unable to fetch a verse. Please check your internet connection.');
    }
}
async function searchVerses(keyword) {
    const db = (await Promise.resolve().then(() => __importStar(require('../db')))).default;
    if (!db)
        return [];
    const kw = keyword.toLowerCase();
    const pat = `%${keyword}%`;
    const seen = new Set();
    const results = [];
    const add = (v) => {
        const key = `${v.book}${v.chapter}:${v.verse}`;
        if (!seen.has(key) && v.text.toLowerCase().includes(kw)) {
            seen.add(key);
            results.push(v);
        }
    };
    // Search cached individual verses
    const verseRows = db.prepare('SELECT data FROM verses WHERE data LIKE ?')
        .all(pat);
    for (const r of verseRows)
        add(JSON.parse(r.data));
    // Search cached chapters (each row holds all verses of a chapter as a JSON array)
    const chapRows = db.prepare('SELECT data FROM chapters WHERE data LIKE ?')
        .all(pat);
    for (const r of chapRows) {
        const verses = JSON.parse(r.data);
        for (const v of verses)
            add(v);
    }
    return results.slice(0, 30);
}
//# sourceMappingURL=bible.js.map