# Handoff: cathCLI Landing Page ("Pawpe Miau / Gatólico" title screen)

## Overview
A single-page marketing/landing site for **cathCLI** — a terminal app that serves the
Holy Bible and Catholic prayers ("cat-holic"). The page introduces the mascot
**Pawpe Miau** (an 8-bit Pope cat), explains what the tool does, lets visitors
"receive a blessing" (a working random-verse widget), and drives **Ko-fi support**.

Aesthetic: **retro 8-bit / NES title screen** on **aged parchment** with a single
**liturgical gold** accent and a touch of **vestment red**. Tone is **cute & punny but
reverent** ("Let us puuur-ray", "cat-holic", "buy Pawpe a tin of tuna").

Real product facts (use verbatim — do not invent):
- Repo: `https://github.com/clementinepujiutami/cathCLI`
- Ko-fi: `https://ko-fi.com/clemnomadlife`
- Releases: `https://github.com/clementinepujiutami/cathCLI/releases/latest`
- Install (recommended): `npm install -g clementinepujiutami/cathCLI`
- Version badge: `v1.0.2`
- Author: Clementine Puji Utami · License: source-available
- Data credits: Scripture = NABRE © USCCB via BibleGet I/O · Prayers via mycatholic.life

## About the Design Files
The files in this bundle are **design references created in HTML/CSS/vanilla-JS** — a
high-fidelity prototype showing the intended look, copy, and behavior. They are **not
meant to be shipped as-is**. The task is to **recreate this design in your target
environment** (e.g. Next.js/React, Astro, plain static site, etc.) using that project's
established conventions. If there is no existing codebase, a **static site** (plain
HTML/CSS or Astro) is the most appropriate choice — this is a brochure page with one
small interactive widget; it does not need a heavy SPA framework.

`cathCLI.html` is self-contained except for two Google Fonts and the PNG sprites in
`assets/`. You can open it directly in a browser to see the target.

## Fidelity
**High-fidelity (hifi).** Colors, typography, spacing, the pixel mascot, and the
random-verse interaction are final. Recreate pixel-perfectly. The only thing that may
need adjusting is responsive breakpoints if your grid system differs.

---

## Design Tokens

### Colors (exact hex)
| Token | Hex | Use |
|---|---|---|
| `--ink` | `#1c1712` | Primary text, borders, hard pixel shadows |
| `--ink2` | `#2a2017` | Secondary/body text |
| `--parch` | `#efe7d3` | Page background (base of radial) |
| `--parch2` | `#e6d9bd` | Mid parchment / terminal window dots |
| `--parch3` | `#f5eedb` | Card surfaces, light text on dark |
| `--gold` | `#c8a24a` | Primary accent: titles, borders-inner, buttons |
| `--goldhi` | `#e7c66b` | Gold highlight / verse refs |
| `--golddeep` | `#9c7c2e` | Title drop-shadow, small-caps labels |
| `--red` | `#b8392b` | Vestment red — Ko-fi button |
| `--reddeep` | `#8a2f24` | Red shadow tone |
| `--screen` | `#231d16` | Terminal/command "screen" background |

Page background is a fixed radial gradient:
`radial-gradient(120% 80% at 50% -10%, #f6efdb 0%, #efe7d3 45%, #e7dbc0 100%)`.
Over it, a subtle **paper-grain** overlay: a `radial-gradient(rgba(28,23,18,.05) 1px, transparent 1px)` at `background-size:4px 4px`, `mix-blend-mode:multiply`, `opacity:.55`, `position:fixed`, `pointer-events:none`.

### Typography
- **Display / labels / buttons:** `'Press Start 2P'` (Google Fonts) — the chunky 8-bit
  pixel font. Used for: hero title, section `<h2>`, card `<h3>`, chips, buttons,
  small-caps labels, footer links. Use **sparingly** and never for long body copy.
- **Body / terminal:** `'JetBrains Mono'` (Google Fonts), weights 400/500/700.
- Import: `https://fonts.googleapis.com/css2?family=Press+Start+2P&family=JetBrains+Mono:wght@400;500;700&display=swap`

Type scale (final):
- Hero `<h1>` "cathCLI": `clamp(40px, 8vw, 66px)`, Press Start 2P, color `--gold`,
  `letter-spacing:1px`, `line-height:1.15`.
  Drop shadow: `text-shadow:0 4px 0 #9c7c2e, 5px 8px 0 rgba(28,23,18,.85)`.
- Section `<h2>`: `clamp(17px, 3.4vw, 26px)`, Press Start 2P, color `--ink`, `letter-spacing:1px`.
- Card `<h3>`: `12px` Press Start 2P, color `--golddeep`, `line-height:1.5`.
- Hero sub-label ("PAWPE MIAU · CAT-HOLIC"): `12px` Press Start 2P, `--ink2`.
- Hero tagline: `clamp(15px,2.4vw,18px)` JetBrains Mono, `--ink2`, `max-width:30ch`, `text-wrap:balance`.
- Body paragraphs: `14–15px` JetBrains Mono, `line-height:1.6–1.65`, `--ink2`.
- Terminal body: `13.5px` JetBrains Mono, `line-height:1.75`.
- Chips / mini-cmd / buttons: `8–11px` Press Start 2P.

### The "pixel frame" / hard-shadow system (the signature look)
There is **no border-radius anywhere** — everything is hard-cornered to read as 8-bit.
Recurring treatments:
- **Outer pixel frame (hero):** `border:6px solid --ink` with
  `box-shadow: inset 0 0 0 4px --parch, inset 0 0 0 9px --gold` (ink edge → parchment gap → gold inner line). Four 14×14px `--ink` squares absolutely positioned at the inner corners.
- **Hard offset shadow (cards/buttons/terminals):** solid (no blur) e.g.
  `box-shadow: 6px 6px 0 --ink` (buttons), `8px 8px 0 rgba(28,23,18,.9)` (cards),
  `9px–10px` for terminals/support panel.
- **Double-stroke cards:** `border:5px solid --ink` + an inset `::after` of
  `border:2px solid --gold` at `inset:5px`.

### Spacing
8px-ish rhythm. Section vertical padding ~`18px 0`; dividers `46px 0`; card gap `24px`;
card padding `22px`; content max-width container `1040px` with `0 24px` side padding.

### Iconography (pixel PNGs in `assets/`, all `image-rendering:pixelated`)
| File | What | Notes |
|---|---|---|
| `pawpe.png` | The mascot — 8-bit Pope cat, **46×37 px native** | Upscale via CSS only; never resample smoothly. ~228px wide in hero, ~120px in support panel. |
| `cross.png` | Gold Latin cross, 6×8 native | Dividers + card icons |
| `heart.png` | **Red** pixel heart, 8×7 | Used on light/gold surfaces (cards, gold button) |
| `heart-cream.png` | **Cream** pixel heart, 8×7 | Used ONLY on the red Ko-fi buttons (red-on-red would vanish) |
| `spark.png` | Gold sparkle/asterisk, 7×6 | Card icon |

> The mascot and icons are **pixel art**. Keep the provided PNGs and scale them with
> `image-rendering: pixelated` (and `-ms-interpolation-mode: nearest-neighbor`). Do not
> re-export them blurry or replace with smooth SVGs. If you ever need to regenerate, the
> source is a hand-authored sprite grid (Pope cat = white+gold mitre with gold cross,
> orange tabby face with round amber eyes, white collar, red vestment with gold orphrey
> band, one paw raised in blessing with pink pads).

---

## Screens / Views
Single scrolling page. Sections top-to-bottom. Container is centered, `max-width:1040px`.
Gold-cross dividers (`✝` flanked by dashed gold lines) sit between major sections.

### 1. Hero ("Title Screen")
- **Purpose:** Brand moment + install + support, styled like an NES boot screen.
- **Layout:** Full-width section, `padding:70px 18px 64px`. An absolutely-positioned
  pixel frame (`inset:24px`) with the 4 corner squares. Inside, a centered
  flex-column (`max-width:760px`, `gap:20px`, `text-align:center`).
- **Top chips:** absolutely positioned row at `top:48px`, `space-between`, side padding `56px`:
  - Left: `v1.0.2` — solid gold chip (`--gold` bg, `3px --ink` border, `3px 3px 0 --ink` shadow, 9px Press Start 2P).
  - Right: `73 BOOKS` — same but **ghost** (transparent bg, faint shadow).
- **Components (in order):**
  1. **Mascot** `pawpe.png`, 228px wide, with a radial gold glow behind
     (`::before` `inset:-26px -50px`, `radial-gradient(closest-side, rgba(200,162,74,.40), transparent 72%)`).
  2. **`<h1>` "cathCLI"** (see type scale).
  3. **Sub-label:** `PAWPE MIAU · CAT-HOLIC`.
  4. **Tagline:** "The Holy Bible & Catholic prayers, blessed straight into your terminal."
  5. **Install command bar** (see Command-bar component) showing the curl one-liner with a `COPY` button.
  6. **Button row** (`gap:14px`, wrap, centered):
     - `SUPPORT ON KO-FI` — red button (`.btn.ko`) with `heart-cream.png` icon → Ko-fi URL (new tab).
     - `★ GITHUB` — ghost button (`.btn.ghost`) → repo URL (new tab).
  7. **Start line:** `▸ INSERT BLESSING TO BEGIN` (11px Press Start 2P, `--golddeep`);
     the `▸` blinks (1.05s steps(1) infinite, 50% opacity 0).

### 2. "Habemus Papa-cat" (What it does)
- **Purpose:** Feature overview + a sample terminal session.
- **Section head:** `<h2>HABEMUS PAPA-CAT</h2>` + intro paragraph (centered, `max-width:54ch`).
- **Cards:** 2×2 grid (`grid-template-columns:1fr 1fr`, `gap:24px`; collapses to 1 column ≤720px).
  Each card: parchment surface, double-stroke (ink + inset gold), `8px 8px 0` shadow,
  a pixel icon, a Press Start 2P `<h3>`, a body paragraph, and a dark **mini command** pinned to the bottom (`margin-top:auto`).
  1. **READ THE WORD** (icon `cross.png`) — "All **73 books**… incl. 7 deuterocanonical (Tobit, Judith, Wisdom, Sirach, Baruch, 1 & 2 Maccabees). Full **NABRE**." mini: `$ cath read jn 3`
  2. **LET US PUUR-RAY** (icon `heart.png`) — "Our Father, Hail Mary, Rosary, Divine Mercy Chaplet, Litany of Humility, prayer to St Michael & more — browse the purr-ayers or summon one by name." mini: `$ cath pray "st michael"`
  3. **OFFLINE & NO KEYS** (icon `spark.png`) — "No API key… cached in `~/.cathcli`… Blessed be thy paws." mini: `$ cath verse ps 23:1`
  4. **SEARCH & SURPRISE** (icon `cross.png`) — "keyword search… random blessing from a curated pool." mini: `$ cath search mercy`
- **Session terminal** (full-width below cards): a `.term` window titled
  `pawpe@miau ~ a typical session` showing `cath read jn 3` → John 3:16, `cath pray "hail mary"` → opening line, then `cath random` with a blinking block cursor. Static content.

### 3. "Receive a Blessing" (interactive random verse) — see Interactions
- **Section head:** `<h2>RECEIVE A BLESSING</h2>` + "let Pawpe paw you a verse. (This is exactly what `cath random` does…)".
- A `.term` titled `pawpe@miau ~ cath random` (`min-height:148px`, left-aligned) showing:
  `$ cath random`, then a **verse ref** (`--goldhi`, bold), a **canon tag**
  (e.g. `[ Deuterocanonical ]`, muted), and the **verse text** (`--parch3`).
- Below: a gold button **`PAW ME A VERSE`** (with `heart.png` icon).

### 4. Support (Ko-fi) — prominent but warm
- **`.support-panel`:** gold-tinted panel (`linear-gradient(180deg,#efe3c4,#ecdcb6)`),
  `6px --ink` border, inset gold `::after`, `10px 10px 0` shadow, centered column.
- Mascot `pawpe.png` at 120px, `<h2>BUY PAWPE A TIN OF TUNA</h2>`, paragraph:
  "If Pawpe Miau has blessed your terminal, you can help keep his bowl full. cathCLI is a one-cat labour of love — every coin is a paw-tron's prayer. 🐾"
- Button row: red **SUPPORT ON KO-FI** (`heart-cream.png`) + ghost **★ STAR ON GITHUB**.

### 5. Footer
- Centered. Press Start 2P links (10px, gold underline): `GITHUB`, `KO-FI`, `RELEASES`.
- Credits line (12px, muted): "Made with love & catnip by Clementine Puji Utami · source-available." + the NABRE/USCCB/BibleGet/mycatholic.life credits.
- Sign-off (10px Press Start 2P, `--golddeep`): `MEOW & AT THE HOUR OF OUR DEATH. AMEN. 🐾`

---

## Reusable Components (CSS classes in the prototype)
- **`.cmd` (command bar):** dark `--screen` bg, `4px --ink` border, `5px 5px 0 --ink`
  shadow; gold `$` prompt; the command text truncates with ellipsis
  (`overflow:hidden;text-overflow:ellipsis;white-space:nowrap`); a Press-Start `COPY`
  button pinned right (`margin-left:auto`).
- **`.btn`:** Press Start 2P 11px, gold bg, `4px --ink` border, `6px 6px 0 --ink` shadow.
  Hover: nudge `-1px,-1px` and grow shadow to `7px`. Active: push to `3px,3px` (depress).
  Variants: `.btn.ko` (red bg, cream text), `.btn.ghost` (transparent bg).
- **`.term`:** title bar (`--ink`) with three 12×12 "dots" (third one gold) + an 8px
  Press Start title; body is `--screen` with mono text. Helper spans: `.g` gold, `.d` muted, `.ref` gold-hi.
- **`.chip`, `.card`, `.div` (cross divider), `.support-panel`** as described above.

## Interactions & Behavior
1. **Copy install command** — every `[data-copy]` button writes the install one-liner to
   the clipboard via `navigator.clipboard.writeText(...)`, swaps its label to
   `BLESSED ✓` for 1500ms, then restores. The full string lives in a JS constant
   (`INSTALL`); the on-screen text is ellipsis-truncated but the **full** command is copied.
2. **Random verse ("PAW ME A VERSE")** — on click, pick a random verse from the
   `VERSES` array (re-rolling so it's never the same as the last), then **type it out**
   character-by-character into the verse text (`setInterval`, ~14ms/char). Also updates
   the ref and canon-tag elements. Initial state shows Psalms 23:1.
   - `VERSES` is an array of `{ ref, canon, text }`. The bundle ships 14 verses spanning
     Old Testament, New Testament, and **Deuterocanonical** (Wisdom, Sirach, Tobit) to
     showcase the 73-book canon. Keep these accurate (NABRE-style phrasing). You can
     extend the pool; keep the canon tags correct.
3. **Buttons** have hover-lift / active-depress transforms (8-bit "press" feel),
   `transition: transform .08s, box-shadow .08s`.
4. **`▸` blink** in the hero start line (CSS keyframes).
5. **External links** (`Ko-fi`, `GitHub`, `Releases`) open in a new tab (`target="_blank" rel="noopener"`).

## State Management
Minimal — no framework state required. Only local widget state:
- `last` (index of last-shown verse) to avoid repeats.
- An active `setInterval` handle for the typewriter (clear before starting a new one).
If rebuilding in React: a `useState` for the current verse + a ref for the interval is plenty.

## Responsive behavior
- Container caps at 1040px; everything fluid below with `clamp()` type.
- ≤720px: feature grid → single column; hero frame inset shrinks to `14px`; top-chip side
  padding shrinks to `30px`. Buttons wrap. Verify the long curl command stays
  ellipsis-truncated (never breaks the layout) and the mascot scales down gracefully.

## Assets
All in `assets/` (see Iconography table). These are **original pixel art** generated for
this project (no third-party/brand assets). Fonts are Google Fonts (Press Start 2P,
JetBrains Mono). The 🐾 and ✝ in copy are plain emoji/Unicode — fine to keep, or swap the
✝ for the `cross.png` sprite for crispness.

## Files
- `cathCLI.html` — the complete hi-fi prototype (HTML + CSS + vanilla JS). Open in a
  browser to see the exact target. All tokens, components, copy, and the verse pool live here.
- `assets/*.png` — the pixel mascot and icons.

## Implementation suggestions
- A **static site** (plain HTML/CSS/JS, or Astro/11ty) is the right fit. No SPA needed.
- Lift the CSS custom properties verbatim. Keep **zero border-radius** and the
  **hard (blur-less) offset shadows** — they are the whole identity.
- Ensure `image-rendering: pixelated` is applied to every sprite `<img>`.
- Preload the two Google Fonts; the pixel font especially should be loaded before paint
  to avoid a serif flash on the big title.
