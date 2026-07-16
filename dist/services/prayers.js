"use strict";
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
exports.getScrapedPrayer = getScrapedPrayer;
const node_fetch_1 = __importDefault(require("node-fetch"));
const cheerio = __importStar(require("cheerio"));
const db_1 = require("../db");
const doors_map_json_1 = __importDefault(require("../data/doors_map.json"));
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
async function fetchRetry(url, attempt = 0) {
    try {
        const res = await fetchWithTimeout(url);
        if (!res.ok && res.status >= 500 && attempt < MAX_RETRIES)
            return fetchRetry(url, attempt + 1);
        return res;
    }
    catch (err) {
        if (attempt < MAX_RETRIES)
            return fetchRetry(url, attempt + 1);
        throw err;
    }
}
async function parseDoorsPage(html, fallbackTitle) {
    const $ = cheerio.load(html);
    let title = $('title').text().replace(/\s+/g, ' ').trim();
    const lower = title.toLowerCase();
    if (!lower.startsWith('chaplet') && !lower.startsWith('litany') && !lower.startsWith('novena') && !lower.startsWith('consecration')) {
        const greenFont = $('font[color="green"]').first().text().replace(/\s+/g, ' ').trim();
        if (greenFont)
            title = greenFont;
    }
    if (!title)
        title = fallbackTitle;
    const blockquote = $('blockquote');
    if (!blockquote.length)
        return null;
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
async function parseMycatholicPage(html, fallbackTitle) {
    const $ = cheerio.load(html);
    $('noscript, script, style, .addtoany_share_save_container, [class^="ai-"], hr').remove();
    const title = $('h1').text().trim() || fallbackTitle;
    const paragraphs = [];
    $('.entry-content div, .entry-content p, .entry-content li').each((_, el) => {
        if ($(el).find('div, p, li').length > 0)
            return;
        const text = $(el).text().trim();
        const low = text.toLowerCase();
        if (text &&
            !low.startsWith('share this') &&
            !low.includes('copyright ©') &&
            !low.includes('all rights reserved') &&
            !low.startsWith('more prayers') &&
            !low.startsWith('daily reflections') &&
            !low.startsWith('featured image') &&
            !low.startsWith('more on ') &&
            !low.includes('more sharing options'))
            paragraphs.push(text);
    });
    if (!paragraphs.length) {
        const fallback = $('.entry-content').text().trim() || $('article').text().trim();
        if (fallback)
            paragraphs.push(fallback);
        else
            throw new Error('Could not parse prayer content from the page.');
    }
    return { title, text: paragraphs.join('\n\n') };
}
async function getScrapedPrayer(slug) {
    const name = slug.toLowerCase().trim().replace(/[-\s]+/g, '-');
    // 1. Fresh cache
    const hit = db_1.cache.getPrayer(name);
    if (hit)
        return hit;
    // 2. catholicdoors.com (if mapped) — fall through on any failure
    const entry = doors_map_json_1.default[name];
    if (entry) {
        try {
            const res = await fetchRetry(entry.url);
            if (res.ok) {
                const parsed = await parseDoorsPage(await res.text(), entry.title);
                if (parsed) {
                    db_1.cache.setPrayer(name, parsed.title, parsed.text);
                    return parsed;
                }
            }
        }
        catch {
            // catholicdoors unreachable or unparseable — fall through to mycatholic.life
        }
    }
    // 3. mycatholic.life
    const url = `https://mycatholic.life/catholic-prayers/${name}/`;
    let res;
    try {
        res = await fetchRetry(url);
    }
    catch (err) {
        const stale = db_1.cache.getStalePrayer(name);
        if (stale)
            return stale;
        throw err;
    }
    if (!res.ok) {
        const stale = db_1.cache.getStalePrayer(name);
        if (stale)
            return stale;
        throw new Error(`Prayer "${name}" not found (HTTP ${res.status}). Try a different spelling.`);
    }
    const parsed = await parseMycatholicPage(await res.text(), name.replace(/-/g, ' '));
    db_1.cache.setPrayer(name, parsed.title, parsed.text);
    return parsed;
}
//# sourceMappingURL=prayers.js.map