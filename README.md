<div align="center">

```
██            ██
██████      ██████
██████████████████
██████████████████
██  ████████  ████
██████  ██  ██████
██████████████████
  ██████████████
██████████████████
████████████████████
████████████████  ██
████        ████  ██
████        ██████
██            ██
```

# cathCLI

**cat-holic** · Holy Bible & Catholic Prayers in your terminal

[![version](https://img.shields.io/badge/version-1.0.0-gold)](https://www.npmjs.com/package/cathcli)
[![license](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](package.json)

</div>

---

## Install

```bash
npm install -g cathcli
```

Then just run:

```bash
cath
```

---

## Commands

```
cath                           show banner + help
cath read <book> <chapter>     read a Bible chapter
cath verse <book> <ch:v>       look up a single verse
cath books                     list all 73 Catholic books
cath pray                      browse prayers interactively
cath pray "<name>"             show a specific prayer
cath random                    random verse from a curated pool
cath search <keyword>          search cached verses by keyword
```

### Examples

```bash
cath read jn 3               # John chapter 3 (NABRE)
cath verse ps 23:1           # Psalms 23:1
cath verse 1mac 2:1          # 1 Maccabees 2:1 (deuterocanonical)
cath pray "hail mary"        # Hail Mary
cath pray "st michael"       # Prayer to Saint Michael
cath pray                    # pick from categories interactively
cath search mercy            # search all cached verses for "mercy"
cath random                  # surprise yourself
```

---

## Features

- **Full Catholic canon** — all 73 books including the 7 deuterocanonical books (Tobit, Judith, Wisdom, Sirach, Baruch, 1 & 2 Maccabees)
- **NABRE translation** — New American Bible Revised Edition (© USCCB)
- **Built-in prayers** — Our Father, Hail Mary, Rosary, Divine Mercy Chaplet, Litany of Humility, and more
- **Offline cache** — verses are saved locally in `~/.cathcli/` after first fetch; no repeated API calls
- **No API key** — powered by [BibleGet I/O](https://query.bibleget.io), a free Catholic Bible API built by a Catholic priest

---

## Book IDs

Use the short ID when reading:

| ID | Book | ID | Book |
|---|---|---|---|
| `gen` | Genesis | `mt` | Matthew |
| `ex` | Exodus | `mk` | Mark |
| `ps` | Psalms | `lk` | Luke |
| `prov` | Proverbs | `jn` | John |
| `isa` | Isaiah | `rom` | Romans |
| `wis` | Wisdom | `1cor` | 1 Corinthians |
| `sir` | Sirach | `rev` | Revelation |
| `1mac` | 1 Maccabees | `tob` | Tobit |

Run `cath books` to see all 73.

---

## Data Sources

| Content | Source | License |
|---|---|---|
| Scripture | [BibleGet I/O](https://query.bibleget.io) · NABRE | Apache-2.0 · © USCCB |
| Prayers | [mycatholic.life](https://mycatholic.life/catholic-prayers) | scraped on first access, cached locally |

---

## Development

```bash
git clone https://github.com/clementinepujiutami/cathCLI.git
cd cathCLI
pnpm install
pnpm dev         # run without building
pnpm build       # compile TypeScript → dist/
```

---

## License

MIT © [Clementine Puji Utami](https://github.com/clementinepujiutami)
