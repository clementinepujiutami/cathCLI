"use strict";
// Catholic Liturgical Calendar API (Apache-2.0) — by Fr. John Romano D'Orazio,
// a priest of the Diocese of Rome, and the same author as BibleGet, which this
// project already uses for scripture.
// https://litcal.johnromanodorazio.com  |  No API key
//
// It computes the moveable feasts (the Easter computus) and the precedence
// between solemnities, feasts and memorials. That's roughly 40% of the calendar
// and the genuinely hard part, so we ask rather than hand-roll it.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getYear = getYear;
exports.eventsOn = eventsOn;
exports.celebrationOn = celebrationOn;
exports.isSanctoral = isSanctoral;
exports.saintsOn = saintsOn;
exports.upcoming = upcoming;
const node_fetch_1 = __importDefault(require("node-fetch"));
const db_1 = require("../db");
const BASE = 'https://litcal.johnromanodorazio.com/api/dev/calendar';
const TIMEOUT_MS = 10000;
async function fetchWithTimeout(url) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    try {
        return await (0, node_fetch_1.default)(url, { signal: ctrl.signal });
    }
    catch (err) {
        if (err.name === 'AbortError')
            throw new Error('Request timed out after 10s. Check your connection.');
        throw err;
    }
    finally {
        clearTimeout(timer);
    }
}
/**
 * All liturgical events for a civil year. Cached indefinitely: a published
 * liturgical year does not change, unlike scripture text behind a 30-day TTL.
 */
async function getYear(year) {
    const cached = db_1.cache.getLitCal(year);
    if (cached)
        return cached;
    // locale defaults to Latin and year_type to LITURGICAL (which starts at the
    // previous Advent). Both need to be set explicitly or the output is Latin
    // names on a calendar that doesn't line up with the civil year.
    const url = `${BASE}?year=${year}&return_type=JSON&locale=en&year_type=CIVIL`;
    try {
        const res = await fetchWithTimeout(url);
        if (!res.ok)
            throw new Error(`Liturgical calendar returned ${res.status}`);
        const body = await res.json();
        const raw = body.litcal ?? body.LitCal;
        if (!raw)
            throw new Error('Unexpected response from the liturgical calendar');
        const events = Array.isArray(raw) ? raw : Object.values(raw);
        db_1.cache.setLitCal(year, events);
        return events;
    }
    catch (err) {
        const stale = db_1.cache.getLitCal(year);
        if (stale)
            return stale;
        throw err;
    }
}
const ymd = (d) => ({ y: d.getFullYear(), m: d.getMonth() + 1, d: d.getDate() });
/** Everything falling on a given day, ranked highest first. Vigils excluded. */
async function eventsOn(date = new Date()) {
    const { y, m, d } = ymd(date);
    const all = await getYear(y);
    return all
        .filter(e => e.year === y && e.month === m && e.day === d && !e.is_vigil_mass)
        .sort((a, b) => b.grade - a.grade);
}
/** The day's principal celebration: the highest-ranked event. */
async function celebrationOn(date = new Date()) {
    return (await eventsOn(date))[0] ?? null;
}
/**
 * Is this event from the sanctoral cycle (a saint or a Marian feast) rather
 * than the temporal one (Christmas, Easter, Sundays)?
 *
 * There's no explicit flag, but `common` splits them cleanly: sanctoral entries
 * carry one — either "Proper" or a category like "Martyrs:For One Martyr" —
 * while the temporal cycle has none. Verified against 2026: 200 of 549 events
 * are sanctoral, and no Sunday, Easter, Pentecost or Christmas is among them.
 * Grade alone doesn't work; it would call Christmas a saint.
 */
function isSanctoral(e) {
    const c = Array.isArray(e.common) ? e.common : e.common ? [e.common] : [];
    return c.length > 0;
}
/** Saints and Marian feasts commemorated on a day. */
async function saintsOn(date = new Date()) {
    return (await eventsOn(date)).filter(isSanctoral);
}
/** Upcoming celebrations at or above `minGrade`, from `from` onward. */
async function upcoming(from = new Date(), days = 30, minGrade = 3) {
    const start = new Date(from.getFullYear(), from.getMonth(), from.getDate());
    const end = new Date(start);
    end.setDate(end.getDate() + days);
    // A window can straddle New Year, which is two separate calendar fetches.
    const years = [...new Set([start.getFullYear(), end.getFullYear()])];
    const all = (await Promise.all(years.map(getYear))).flat();
    return all
        .filter(e => {
        if (e.is_vigil_mass || e.grade < minGrade)
            return false;
        const d = new Date(e.year, e.month - 1, e.day);
        return d >= start && d <= end;
    })
        .sort((a, b) => new Date(a.year, a.month - 1, a.day).getTime() -
        new Date(b.year, b.month - 1, b.day).getTime() || b.grade - a.grade);
}
//# sourceMappingURL=litcal.js.map