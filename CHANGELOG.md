# Changelog

All notable changes to cathCLI are recorded here.
This project follows [Semantic Versioning](https://semver.org/).

---

## [1.1.0] — 2026-07-16

The prayers release. Fifty of them now, rendered as cards, and the whole thing
keeps working when the wifi doesn't.

### Added

- **Offline fallback.** Every network call now falls back to previously cached
  data instead of erroring out. Lose your connection mid-verse and Pawpe serves
  what he already has. Covers chapters, verses and prayers.
- **Novenas.** A seventh prayer category, wired into the interactive browser.
  Five novenas: the Holy Spirit, Our Lady of Perpetual Help, St Joseph, St Jude,
  and one for the deceased. Brings the built-in library to **50 prayers**.
- **Prayer cards.** `cath pray` now renders a card — a halftone panel with the
  art burned into it as type, and the prayer set beneath it in mono. Replaces the
  old box.
- **Pixel-art renderer.** Art is drawn with half-blocks (`▀`), painting the top
  and bottom of each cell separately. That's square pixels at one column each,
  and double the vertical resolution of what came before.
- **Art tooling** (`tools/`) — import a PNG straight from Aseprite or Piskel, or
  dither a painterly source down to a few flat tones. See the README.

### Changed

- **The banner uses the real mascot.** It used to draw its own cruder 16×19 cat,
  a third variant alongside the one on the site. One cat everywhere now, at far
  more detail.
- **`cath --version` tells the truth.** It was hardcoded to `1.0.0` and had been
  wrong since 1.0.1, which made it useless for telling builds apart.
- **The banner stops overflowing.** Side-by-side art plus the widest tutorial
  line came to 82 columns against a standard 80-column terminal, so it had always
  been wrapping into a mess. It now stacks when there isn't room.
- **Adapts to your terminal.** True-color gets the full art; 256-color quantizes
  cleanly; below that a dark palette would collapse into a silhouette, so it
  falls back to a luminance ramp instead. No color at all gets clean text.

### Fixed

- Prayer text with hardcoded horizontal rules sawed straight through the card
  edge — they were sized for the old fixed-width box and contained no spaces, so
  nothing could wrap them. Now redrawn to fit.
- Long prayer titles and tag rows had no width bound and could overhang the card.
- The landing page declared no favicon, so every visitor took a 404.
- The landing page advertised three prayer categories out of seven.

### Known issues

- Every prayer card currently shows the mascot. Per-prayer figure art is coming.
- The banner still overflows below roughly 50 columns, where the tutorial text
  rather than the art is the limit.
- Two prayers are duplicated across categories (`Novena to Saint Joseph` and
  `Novena to the Holy Spirit` each appear under both *devotion* and *novena*),
  and the St Joseph pair shares an ID, so one copy can't be looked up by name.

---

## [1.0.2] — unreleased

Never tagged. Landing page work and install-command fixes; superseded by 1.1.0.

---

## [1.0.1] — 2026-05-29

- Standalone Linux binary published on releases.
- Install script.

---

## [1.0.0] — 2026-05-26

First release. `read`, `verse`, `books`, `pray`, `random`, `search` across the
full 73-book Catholic canon (NABRE), with a local SQLite cache and no API key.

[1.1.0]: https://github.com/clementinepujiutami/cathCLI/releases/tag/v1.1.0
[1.0.1]: https://github.com/clementinepujiutami/cathCLI/releases/tag/v1.0.1
