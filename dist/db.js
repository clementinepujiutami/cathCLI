"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cache = exports.DB_PATH = exports.DATA_DIR = void 0;
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const fs_1 = __importDefault(require("fs"));
exports.DATA_DIR = path_1.default.join(os_1.default.homedir(), '.cathcli');
exports.DB_PATH = path_1.default.join(exports.DATA_DIR, 'cathcli.db');
const TTL = 30 * 24 * 60 * 60 * 1000; // 30 days
// Try to load better-sqlite3 — gracefully degrade to no-cache if unavailable
let db = null;
try {
    if (!fs_1.default.existsSync(exports.DATA_DIR))
        fs_1.default.mkdirSync(exports.DATA_DIR, { recursive: true });
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Database = require('better-sqlite3');
    db = new Database(exports.DB_PATH);
    db.pragma('journal_mode = WAL');
    db.exec(`
    CREATE TABLE IF NOT EXISTS chapters (
      ref  TEXT PRIMARY KEY,
      data TEXT NOT NULL,
      at   INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS verses (
      ref  TEXT PRIMARY KEY,
      data TEXT NOT NULL,
      at   INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS prayers (
      name TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      text TEXT NOT NULL,
      at   INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS litcal (
      year INTEGER PRIMARY KEY,
      data TEXT NOT NULL,
      at   INTEGER NOT NULL
    );
  `);
}
catch {
    // Native module not compiled — caching disabled, API fetched every time
    db = null;
}
exports.cache = {
    getChapter: (ref) => {
        if (!db)
            return null;
        const row = db.prepare('SELECT data,at FROM chapters WHERE ref=?').get(ref);
        if (!row || Date.now() - row.at > TTL)
            return null;
        return JSON.parse(row.data);
    },
    getStaleChapter: (ref) => {
        if (!db)
            return null;
        const row = db.prepare('SELECT data FROM chapters WHERE ref=?').get(ref);
        return row ? JSON.parse(row.data) : null;
    },
    setChapter: (ref, data) => {
        if (!db)
            return;
        db.prepare('INSERT OR REPLACE INTO chapters(ref,data,at) VALUES(?,?,?)')
            .run(ref, JSON.stringify(data), Date.now());
    },
    getVerse: (ref) => {
        if (!db)
            return null;
        const row = db.prepare('SELECT data,at FROM verses WHERE ref=?').get(ref);
        if (!row || Date.now() - row.at > TTL)
            return null;
        return JSON.parse(row.data);
    },
    getStaleVerse: (ref) => {
        if (!db)
            return null;
        const row = db.prepare('SELECT data FROM verses WHERE ref=?').get(ref);
        return row ? JSON.parse(row.data) : null;
    },
    setVerse: (ref, data) => {
        if (!db)
            return;
        db.prepare('INSERT OR REPLACE INTO verses(ref,data,at) VALUES(?,?,?)')
            .run(ref, JSON.stringify(data), Date.now());
    },
    getPrayer: (name) => {
        if (!db)
            return null;
        const row = db.prepare('SELECT title,text,at FROM prayers WHERE name=?').get(name);
        if (!row || Date.now() - row.at > TTL)
            return null;
        return { title: row.title, text: row.text };
    },
    getStalePrayer: (name) => {
        if (!db)
            return null;
        const row = db.prepare('SELECT title,text FROM prayers WHERE name=?').get(name);
        return row ? { title: row.title, text: row.text } : null;
    },
    setPrayer: (name, title, text) => {
        if (!db)
            return;
        db.prepare('INSERT OR REPLACE INTO prayers(name,title,text,at) VALUES(?,?,?,?)')
            .run(name, title, text, Date.now());
    },
    getAnyVerse: () => {
        if (!db)
            return null;
        const row = db.prepare('SELECT data FROM verses ORDER BY RANDOM() LIMIT 1').get();
        return row ? JSON.parse(row.data) : null;
    },
    // A liturgical year is fixed once published, so it outlives the 30-day TTL
    // that suits scripture text. Only the current year is worth re-checking.
    getLitCal: (year) => {
        if (!db)
            return null;
        const row = db.prepare('SELECT data FROM litcal WHERE year=?').get(year);
        return row ? JSON.parse(row.data) : null;
    },
    setLitCal: (year, data) => {
        if (!db)
            return;
        db.prepare('INSERT OR REPLACE INTO litcal(year,data,at) VALUES(?,?,?)')
            .run(year, JSON.stringify(data), Date.now());
    },
};
exports.default = db;
//# sourceMappingURL=db.js.map