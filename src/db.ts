import path from 'path';
import os from 'os';
import fs from 'fs';

export const DATA_DIR = path.join(os.homedir(), '.cathcli');
export const DB_PATH  = path.join(DATA_DIR, 'cathcli.db');

const TTL = 30 * 24 * 60 * 60 * 1000; // 30 days

// Try to load better-sqlite3 — gracefully degrade to no-cache if unavailable
let db: import('better-sqlite3').Database | null = null;

try {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Database = require('better-sqlite3');
  db = new Database(DB_PATH);
  db!.pragma('journal_mode = WAL');
  db!.exec(`
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
  `);
} catch {
  // Native module not compiled — caching disabled, API fetched every time
  db = null;
}

export const cache = {
  getChapter: (ref: string) => {
    if (!db) return null;
    const row = db.prepare('SELECT data,at FROM chapters WHERE ref=?').get(ref) as any;
    if (!row || Date.now() - row.at > TTL) return null;
    return JSON.parse(row.data);
  },
  setChapter: (ref: string, data: unknown) => {
    if (!db) return;
    db.prepare('INSERT OR REPLACE INTO chapters(ref,data,at) VALUES(?,?,?)')
      .run(ref, JSON.stringify(data), Date.now());
  },

  getVerse: (ref: string) => {
    if (!db) return null;
    const row = db.prepare('SELECT data,at FROM verses WHERE ref=?').get(ref) as any;
    if (!row || Date.now() - row.at > TTL) return null;
    return JSON.parse(row.data);
  },
  setVerse: (ref: string, data: unknown) => {
    if (!db) return;
    db.prepare('INSERT OR REPLACE INTO verses(ref,data,at) VALUES(?,?,?)')
      .run(ref, JSON.stringify(data), Date.now());
  },

  getPrayer: (name: string) => {
    if (!db) return null;
    const row = db.prepare('SELECT title,text,at FROM prayers WHERE name=?').get(name) as any;
    if (!row || Date.now() - row.at > TTL) return null;
    return { title: row.title, text: row.text };
  },
  setPrayer: (name: string, title: string, text: string) => {
    if (!db) return;
    db.prepare('INSERT OR REPLACE INTO prayers(name,title,text,at) VALUES(?,?,?,?)')
      .run(name, title, text, Date.now());
  },
};

export default db;
