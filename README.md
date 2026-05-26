# ✝️ cathCLI

> A personal CLI for the Holy Bible (Catholic Canon — NABRE) and Catholic Prayers

## Features

- 📖 **Holy Bible** — New American Bible Revised Edition (NABRE), full 73-book Catholic canon
- ✝️ **Deuterocanonical books** — Tobit, Judith, Wisdom, Sirach, Baruch, 1 & 2 Maccabees
- 🙏 **Catholic Prayers** — Rosary, Divine Mercy, Litanies, Novenas & more
- 🔍 **Search** — keyword search across all verses
- 🎲 **Random verse** — daily inspiration
- 💾 **Offline cache** — fetched verses saved locally in ~/.cathcli/

## Bible Source

**BibleGet I/O** (https://query.bibleget.io) — Catholic Bible API built by a Catholic priest
License: Apache-2.0 | Translation: NABRE (© USCCB, used with permission)
No API key required — free for personal use.

## Prayers Source

mycatholic.life/catholic-prayers

## Installation

```bash
pnpm install
pnpm build
node dist/index.js
```

## Commands

```
cath                          # show banner + help
cath read <book> <chapter>    # e.g. cath read jn 3
cath verse <book> <ch:v>      # e.g. cath verse jn 3:16
cath books                    # list all 73 books
cath pray                     # browse Catholic prayers
cath pray "hail mary"         # show a specific prayer
cath search <keyword>         # search verses
cath random                   # random verse
```

## License

MIT © Clementine Puji Utami
