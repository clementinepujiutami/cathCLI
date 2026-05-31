// Bolls.life NABRE Book Number Mapping
// Source: https://bolls.life — free, no API key, Catholic canon (NABRE)
// Numbering: Protestant OT (1-39) → NT (40-66) → Deuterocanonical (68-75)

export interface BibleBook {
  id:        string;  // CLI alias  e.g. 'jn', 'gen', '1mac'
  name:      string;
  num:       number;  // Bolls.life book number
  abbr:      string;  // short display abbreviation
  testament: 'old' | 'new' | 'deuterocanonical';
  category:  string;
  chapters:  number;  // NABRE chapter count (Catholic canon)
}

export const BIBLE_BOOKS: BibleBook[] = [
  // ── OLD TESTAMENT ────────────────────────────────────────────────────────
  { id: 'gen',   name: 'Genesis',          num: 1,  abbr: 'Gen',   testament: 'old', category: 'Pentateuch',      chapters: 50  },
  { id: 'ex',    name: 'Exodus',           num: 2,  abbr: 'Ex',    testament: 'old', category: 'Pentateuch',      chapters: 40  },
  { id: 'lev',   name: 'Leviticus',        num: 3,  abbr: 'Lev',   testament: 'old', category: 'Pentateuch',      chapters: 27  },
  { id: 'num',   name: 'Numbers',          num: 4,  abbr: 'Num',   testament: 'old', category: 'Pentateuch',      chapters: 36  },
  { id: 'deut',  name: 'Deuteronomy',      num: 5,  abbr: 'Deut',  testament: 'old', category: 'Pentateuch',      chapters: 34  },
  { id: 'josh',  name: 'Joshua',           num: 6,  abbr: 'Josh',  testament: 'old', category: 'Historical',      chapters: 24  },
  { id: 'judg',  name: 'Judges',           num: 7,  abbr: 'Judg',  testament: 'old', category: 'Historical',      chapters: 21  },
  { id: 'ruth',  name: 'Ruth',             num: 8,  abbr: 'Ruth',  testament: 'old', category: 'Historical',      chapters: 4   },
  { id: '1sam',  name: '1 Samuel',         num: 9,  abbr: '1Sam',  testament: 'old', category: 'Historical',      chapters: 31  },
  { id: '2sam',  name: '2 Samuel',         num: 10, abbr: '2Sam',  testament: 'old', category: 'Historical',      chapters: 24  },
  { id: '1kgs',  name: '1 Kings',          num: 11, abbr: '1Kgs',  testament: 'old', category: 'Historical',      chapters: 22  },
  { id: '2kgs',  name: '2 Kings',          num: 12, abbr: '2Kgs',  testament: 'old', category: 'Historical',      chapters: 25  },
  { id: '1chr',  name: '1 Chronicles',     num: 13, abbr: '1Chr',  testament: 'old', category: 'Historical',      chapters: 29  },
  { id: '2chr',  name: '2 Chronicles',     num: 14, abbr: '2Chr',  testament: 'old', category: 'Historical',      chapters: 36  },
  { id: 'ezra',  name: 'Ezra',             num: 15, abbr: 'Ezra',  testament: 'old', category: 'Historical',      chapters: 10  },
  { id: 'neh',   name: 'Nehemiah',         num: 16, abbr: 'Neh',   testament: 'old', category: 'Historical',      chapters: 13  },
  { id: 'esth',  name: 'Esther',           num: 17, abbr: 'Esth',  testament: 'old', category: 'Historical',      chapters: 10  },
  { id: 'job',   name: 'Job',              num: 18, abbr: 'Job',   testament: 'old', category: 'Wisdom',          chapters: 42  },
  { id: 'ps',    name: 'Psalms',           num: 19, abbr: 'Ps',    testament: 'old', category: 'Wisdom',          chapters: 150 },
  { id: 'prov',  name: 'Proverbs',         num: 20, abbr: 'Prov',  testament: 'old', category: 'Wisdom',          chapters: 31  },
  { id: 'eccl',  name: 'Ecclesiastes',     num: 21, abbr: 'Eccl',  testament: 'old', category: 'Wisdom',          chapters: 12  },
  { id: 'song',  name: 'Song of Songs',    num: 22, abbr: 'Song',  testament: 'old', category: 'Wisdom',          chapters: 8   },
  { id: 'isa',   name: 'Isaiah',           num: 23, abbr: 'Isa',   testament: 'old', category: 'Prophetic',       chapters: 66  },
  { id: 'jer',   name: 'Jeremiah',         num: 24, abbr: 'Jer',   testament: 'old', category: 'Prophetic',       chapters: 52  },
  { id: 'lam',   name: 'Lamentations',     num: 25, abbr: 'Lam',   testament: 'old', category: 'Prophetic',       chapters: 5   },
  { id: 'ezek',  name: 'Ezekiel',          num: 26, abbr: 'Ezek',  testament: 'old', category: 'Prophetic',       chapters: 48  },
  { id: 'dan',   name: 'Daniel',           num: 27, abbr: 'Dan',   testament: 'old', category: 'Prophetic',       chapters: 14  },
  { id: 'hos',   name: 'Hosea',            num: 28, abbr: 'Hos',   testament: 'old', category: 'Prophetic',       chapters: 14  },
  { id: 'joel',  name: 'Joel',             num: 29, abbr: 'Joel',  testament: 'old', category: 'Prophetic',       chapters: 4   },
  { id: 'amos',  name: 'Amos',             num: 30, abbr: 'Amos',  testament: 'old', category: 'Prophetic',       chapters: 9   },
  { id: 'obad',  name: 'Obadiah',          num: 31, abbr: 'Obad',  testament: 'old', category: 'Prophetic',       chapters: 1   },
  { id: 'jon',   name: 'Jonah',            num: 32, abbr: 'Jon',   testament: 'old', category: 'Prophetic',       chapters: 4   },
  { id: 'mic',   name: 'Micah',            num: 33, abbr: 'Mic',   testament: 'old', category: 'Prophetic',       chapters: 7   },
  { id: 'nah',   name: 'Nahum',            num: 34, abbr: 'Nah',   testament: 'old', category: 'Prophetic',       chapters: 3   },
  { id: 'hab',   name: 'Habakkuk',         num: 35, abbr: 'Hab',   testament: 'old', category: 'Prophetic',       chapters: 3   },
  { id: 'zeph',  name: 'Zephaniah',        num: 36, abbr: 'Zeph',  testament: 'old', category: 'Prophetic',       chapters: 3   },
  { id: 'hag',   name: 'Haggai',           num: 37, abbr: 'Hag',   testament: 'old', category: 'Prophetic',       chapters: 2   },
  { id: 'zech',  name: 'Zechariah',        num: 38, abbr: 'Zech',  testament: 'old', category: 'Prophetic',       chapters: 14  },
  { id: 'mal',   name: 'Malachi',          num: 39, abbr: 'Mal',   testament: 'old', category: 'Prophetic',       chapters: 3   },

  // ── NEW TESTAMENT ────────────────────────────────────────────────────────
  { id: 'mt',    name: 'Matthew',          num: 40, abbr: 'Mt',    testament: 'new', category: 'Gospels',         chapters: 28  },
  { id: 'mk',    name: 'Mark',             num: 41, abbr: 'Mk',    testament: 'new', category: 'Gospels',         chapters: 16  },
  { id: 'lk',    name: 'Luke',             num: 42, abbr: 'Lk',    testament: 'new', category: 'Gospels',         chapters: 24  },
  { id: 'jn',    name: 'John',             num: 43, abbr: 'Jn',    testament: 'new', category: 'Gospels',         chapters: 21  },
  { id: 'acts',  name: 'Acts',             num: 44, abbr: 'Acts',  testament: 'new', category: 'Gospels',         chapters: 28  },
  { id: 'rom',   name: 'Romans',           num: 45, abbr: 'Rom',   testament: 'new', category: 'Pauline Letters', chapters: 16  },
  { id: '1cor',  name: '1 Corinthians',    num: 46, abbr: '1Cor',  testament: 'new', category: 'Pauline Letters', chapters: 16  },
  { id: '2cor',  name: '2 Corinthians',    num: 47, abbr: '2Cor',  testament: 'new', category: 'Pauline Letters', chapters: 13  },
  { id: 'gal',   name: 'Galatians',        num: 48, abbr: 'Gal',   testament: 'new', category: 'Pauline Letters', chapters: 6   },
  { id: 'eph',   name: 'Ephesians',        num: 49, abbr: 'Eph',   testament: 'new', category: 'Pauline Letters', chapters: 6   },
  { id: 'phil',  name: 'Philippians',      num: 50, abbr: 'Phil',  testament: 'new', category: 'Pauline Letters', chapters: 4   },
  { id: 'col',   name: 'Colossians',       num: 51, abbr: 'Col',   testament: 'new', category: 'Pauline Letters', chapters: 4   },
  { id: '1thes', name: '1 Thessalonians',  num: 52, abbr: '1Thes', testament: 'new', category: 'Pauline Letters', chapters: 5   },
  { id: '2thes', name: '2 Thessalonians',  num: 53, abbr: '2Thes', testament: 'new', category: 'Pauline Letters', chapters: 3   },
  { id: '1tim',  name: '1 Timothy',        num: 54, abbr: '1Tim',  testament: 'new', category: 'Pauline Letters', chapters: 6   },
  { id: '2tim',  name: '2 Timothy',        num: 55, abbr: '2Tim',  testament: 'new', category: 'Pauline Letters', chapters: 4   },
  { id: 'tit',   name: 'Titus',            num: 56, abbr: 'Tit',   testament: 'new', category: 'Pauline Letters', chapters: 3   },
  { id: 'phlm',  name: 'Philemon',         num: 57, abbr: 'Phlm',  testament: 'new', category: 'Pauline Letters', chapters: 1   },
  { id: 'heb',   name: 'Hebrews',          num: 58, abbr: 'Heb',   testament: 'new', category: 'Pauline Letters', chapters: 13  },
  { id: 'jas',   name: 'James',            num: 59, abbr: 'Jas',   testament: 'new', category: 'Catholic Letters', chapters: 5  },
  { id: '1pet',  name: '1 Peter',          num: 60, abbr: '1Pet',  testament: 'new', category: 'Catholic Letters', chapters: 5  },
  { id: '2pet',  name: '2 Peter',          num: 61, abbr: '2Pet',  testament: 'new', category: 'Catholic Letters', chapters: 3  },
  { id: '1jn',   name: '1 John',           num: 62, abbr: '1Jn',   testament: 'new', category: 'Catholic Letters', chapters: 5  },
  { id: '2jn',   name: '2 John',           num: 63, abbr: '2Jn',   testament: 'new', category: 'Catholic Letters', chapters: 1  },
  { id: '3jn',   name: '3 John',           num: 64, abbr: '3Jn',   testament: 'new', category: 'Catholic Letters', chapters: 1  },
  { id: 'jude',  name: 'Jude',             num: 65, abbr: 'Jude',  testament: 'new', category: 'Catholic Letters', chapters: 1  },
  { id: 'rev',   name: 'Revelation',       num: 66, abbr: 'Rev',   testament: 'new', category: 'Catholic Letters', chapters: 22 },

  // ── DEUTEROCANONICAL — Catholic only ─────────────────────────────────────
  { id: 'tob',   name: 'Tobit',            num: 68, abbr: 'Tob',   testament: 'deuterocanonical', category: 'Deuterocanonical', chapters: 14 },
  { id: 'jdt',   name: 'Judith',           num: 69, abbr: 'Jdt',   testament: 'deuterocanonical', category: 'Deuterocanonical', chapters: 16 },
  { id: 'wis',   name: 'Wisdom',           num: 70, abbr: 'Wis',   testament: 'deuterocanonical', category: 'Deuterocanonical', chapters: 19 },
  { id: 'sir',   name: 'Sirach',           num: 71, abbr: 'Sir',   testament: 'deuterocanonical', category: 'Deuterocanonical', chapters: 51 },
  { id: 'bar',   name: 'Baruch',           num: 73, abbr: 'Bar',   testament: 'deuterocanonical', category: 'Deuterocanonical', chapters: 6  },
  { id: '1mac',  name: '1 Maccabees',      num: 74, abbr: '1Mac',  testament: 'deuterocanonical', category: 'Deuterocanonical', chapters: 16 },
  { id: '2mac',  name: '2 Maccabees',      num: 75, abbr: '2Mac',  testament: 'deuterocanonical', category: 'Deuterocanonical', chapters: 15 },
];

export function findBook(query: string): BibleBook | undefined {
  const q = query.toLowerCase().trim();
  return BIBLE_BOOKS.find(
    b => b.id === q || b.abbr.toLowerCase() === q ||
         b.name.toLowerCase() === q || b.name.toLowerCase().startsWith(q)
  );
}

export function booksByTestament() {
  return {
    old:     BIBLE_BOOKS.filter(b => b.testament === 'old'),
    new:     BIBLE_BOOKS.filter(b => b.testament === 'new'),
    deutero: BIBLE_BOOKS.filter(b => b.testament === 'deuterocanonical'),
  };
}

export function booksByCategory(): Map<string, BibleBook[]> {
  const map = new Map<string, BibleBook[]>();
  for (const b of BIBLE_BOOKS) {
    if (!map.has(b.category)) map.set(b.category, []);
    map.get(b.category)!.push(b);
  }
  return map;
}
