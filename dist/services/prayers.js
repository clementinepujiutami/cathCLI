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
async function getScrapedPrayer(slug) {
    const name = slug.toLowerCase().trim().replace(/[-\s]+/g, '-');
    // 1. Check local SQLite Cache first
    const hit = db_1.cache.getPrayer(name);
    if (hit)
        return hit;
    // 2. Try catholicdoors.com map first
    const entry = doors_map_json_1.default[name];
    if (entry) {
        const res = await (0, node_fetch_1.default)(entry.url);
        if (!res.ok) {
            throw new Error(`Failed to fetch from catholicdoors.com (HTTP ${res.status}).`);
        }
        const html = await res.text();
        const $ = cheerio.load(html);
        let title = $('title').text().trim();
        title = title.replace(/\s+/g, ' ');
        if (!title.toLowerCase().startsWith('chaplet') && !title.toLowerCase().startsWith('litany') && !title.toLowerCase().startsWith('novena') && !title.toLowerCase().startsWith('consecration')) {
            const greenFont = $('font[color="green"]').first().text().replace(/\s+/g, ' ').trim();
            if (greenFont)
                title = greenFont;
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
        db_1.cache.setPrayer(name, title, text);
        return { title, text };
    }
    // 3. Fetch from mycatholic.life
    const url = `https://mycatholic.life/catholic-prayers/${name}/`;
    const res = await (0, node_fetch_1.default)(url);
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
    const paragraphs = [];
    $('.entry-content div, .entry-content p, .entry-content li').each((_, el) => {
        // Only capture leaf elements to prevent duplicate text from parent divs
        if ($(el).find('div, p, li').length > 0)
            return;
        const text = $(el).text().trim();
        const lowerText = text.toLowerCase();
        // Exclude social sharing widgets, copyright footnotes, navigation, or advertisements
        if (text &&
            !lowerText.startsWith('share this') &&
            !lowerText.includes('copyright ©') &&
            !lowerText.includes('all rights reserved') &&
            !lowerText.startsWith('more prayers') &&
            !lowerText.startsWith('daily reflections') &&
            !lowerText.startsWith('featured image') &&
            !lowerText.startsWith('more on ') &&
            !lowerText.includes('more sharing options')) {
            paragraphs.push(text);
        }
    });
    if (!paragraphs.length) {
        // Fallback: try reading the raw text of .entry-content or main article
        const fallbackText = $('.entry-content').text().trim() || $('article').text().trim();
        if (fallbackText) {
            paragraphs.push(fallbackText);
        }
        else {
            throw new Error('Could not parse prayer content from the page.');
        }
    }
    const text = paragraphs.join('\n\n');
    // 3. Save to SQLite cache
    db_1.cache.setPrayer(name, title, text);
    return { title, text };
}
//# sourceMappingURL=prayers.js.map