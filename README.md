<div align="center">

<img src="https://raw.githubusercontent.com/clementinepujiutami/cathCLI/main/landing/assets/pawpe.png" width="120" alt="Pawpe Miau, the cat-holic pope cat" style="image-rendering: pixelated;" />

# cathCLI

**Pawpe Miau** · *cat-holic* · The Holy Bible & Catholic Prayers, in your terminal

[![version](https://img.shields.io/badge/version-1.1.0-f5c542?style=flat-square)](https://github.com/clementinepujiutami/cathCLI/releases/latest)
[![node](https://img.shields.io/badge/node-%E2%89%A518-5aa02c?style=flat-square)](package.json)
[![books](https://img.shields.io/badge/books-73-c8a24a?style=flat-square)](#-book-ids)
[![prayers](https://img.shields.io/badge/prayers-50-cc2222?style=flat-square)](#-prayers)
[![license](https://img.shields.io/badge/license-source--available-4a7fc8?style=flat-square)](LICENSE)

[![Support me on Ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/clemnomadlife)

<img src="https://raw.githubusercontent.com/clementinepujiutami/cathCLI/main/.github/assets/banner.png" width="720" alt="cathCLI banner" />

</div>

---

## Install

### Quick script

Handles everything for you:

```bash
curl -fsSL https://raw.githubusercontent.com/clementinepujiutami/cathCLI/main/install.sh | bash
```

### With Node.js

Any package manager works — requires **Node 18 or newer**:

```bash
npm  install -g clementinepujiutami/cathCLI
pnpm add     -g github:clementinepujiutami/cathCLI
yarn global add clementinepujiutami/cathCLI
```

### Standalone binary

No Node.js required:

```bash
curl -LO https://github.com/clementinepujiutami/cathCLI/releases/latest/download/cath-linux
chmod +x cath-linux
sudo mv cath-linux /usr/local/bin/cath
```

Then just run:

```bash
cath
```

---

## Commands

| Command | What it does |
|---|---|
| `cath` | Banner, and a quick tutorial |
| `cath read <book> <chapter>` | Read a whole chapter |
| `cath verse <book> <ch:v>` | Look up a single verse |
| `cath books` | List all 73 books of the Catholic canon |
| `cath pray` | Browse prayers by category, interactively |
| `cath pray "<name>"` | Open one prayer by name |
| `cath random` | A random verse from a curated pool |
| `cath search <keyword>` | Search your cached verses |

```bash
cath read jn 3               # John 3 (NABRE)
cath verse ps 23:1           # Psalms 23:1
cath verse 1mac 2:1          # 1 Maccabees 2:1 (deuterocanonical)
cath pray "hail mary"        # one prayer
cath pray "st michael"       # another
cath search mercy            # everything cached matching "mercy"
cath random                  # surprise yourself
```

---

## Prayers

Fifty prayers ship built in, across seven kinds. Anything not built in is fetched
from [mycatholic.life](https://mycatholic.life/catholic-prayers) and cached.

<img src="https://raw.githubusercontent.com/clementinepujiutami/cathCLI/main/.github/assets/pray-card.png" width="640" alt="cath pray hail mary" />

| Category | Count | Examples |
|---|---|---|
| Daily | 11 | Our Father, Hail Mary, Glory Be, the Apostles' Creed |
| Devotional | 12 | St Michael, Anima Christi, the Peace Prayer of St Francis |
| Chaplets | 10 | St Michael, the Holy Face, the Seven Dolors of Our Lady |
| Marian | 6 | the Memorare, Hail Holy Queen, the Magnificat, the Angelus |
| Litanies | 5 | Litany of Humility, Litany of Saints |
| Novenas | 5 | the Holy Spirit, St Jude, Our Lady of Perpetual Help |
| The Rosary | 1 | all twenty mysteries — joyful, luminous, sorrowful, glorious |

---

## Features

- **The whole Catholic canon** — all 73 books, including the 7 deuterocanonical
  ones (Tobit, Judith, Wisdom, Sirach, Baruch, 1 & 2 Maccabees).
- **NABRE** — the New American Bible, Revised Edition (© USCCB).
- **Works offline** — everything you've read is cached in `~/.cathcli/`. Lose the
  wifi and Pawpe serves what he already has instead of throwing an error at you.
- **No API key** — powered by [BibleGet I/O](https://query.bibleget.io), a free
  Catholic Bible API built by a Catholic priest.
- **Adapts to your terminal** — true-color terminals get the full art, 256-color
  terminals get it slightly flatter, and anything less falls back to clean text.

---

## Book IDs

Use the short ID when reading. Run `cath books` for all 73.

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

---

## Data sources

| Content | Source | Licence |
|---|---|---|
| Scripture | [BibleGet I/O](https://query.bibleget.io) · NABRE | Apache-2.0 · © USCCB |
| Prayers | [mycatholic.life](https://mycatholic.life/catholic-prayers) | fetched on first access, cached locally |

---

## Development

```bash
git clone https://github.com/clementinepujiutami/cathCLI.git
cd cathCLI
pnpm install
pnpm dev         # run without building
pnpm build       # compile TypeScript -> dist/
```

<details>
<summary><strong>Working on the art</strong></summary>

Art is one character per pixel indexing a small palette, rendered to the terminal
with half-blocks (`▀`), which gives square pixels at one column each.

Draw a sprite in Aseprite or Piskel, export a PNG, and import it:

```bash
pnpm exec ts-node tools/import-png.ts sprite.png src/ui/figures/pawpe.ts
pnpm build
```

If the source is painterly or photographic, dither it down first — the importer
refuses anything over 60 distinct colours, which is a good sign it needs this:

```bash
# have a look before committing to it
pnpm exec ts-node tools/dither.ts art.png --width 40 --colors 8 --preview /tmp/look.png

# then emit it
pnpm exec ts-node tools/dither.ts art.png --width 40 --colors 8 --out src/ui/figures/pawpe.ts
```

Add `--cath` to pin the palette to cathCLI's own colours instead of deriving one
from the image. It stays on-brand, at the cost of some dithering noise.

Around **40×40** is the sweet spot: wide enough for detail, narrow enough to sit
beside the banner text on an 80-column terminal.

</details>

---

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

---

## Licence

Source-available. You may read this repository and install and run cathCLI for
personal use. Copying, modifying, distributing, sublicensing, selling, publishing,
packaging, hosting, or creating derivative works requires prior written permission
from [Clementine Puji Utami](https://github.com/clementinepujiutami).

See [LICENSE](LICENSE) · Contact: [clemnomad@proton.me](mailto:clemnomad@proton.me)

<div align="center">

<sub>Made with love and catnip. Meow & at the hour of our death. Amen.</sub>

</div>
