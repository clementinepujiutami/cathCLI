// ── ANSI -> HTML ────────────────────────────────────────────────────────────
// Renders real CLI output into a page a browser can screenshot, so the README
// shows what `cath` actually prints instead of an ASCII approximation.

const BASIC = [
  '#1c1712', '#cc2222', '#5aa02c', '#c8a24a', '#4a7fc8', '#9a5ac8', '#3aa8a8', '#d9cfc0',
  '#6b6259', '#e05a4a', '#7fce55', '#f5c542', '#77a9e8', '#c08ae8', '#5fd0d0', '#f5eedb',
];

function xterm256(n: number): string {
  if (n < 16) return BASIC[n];
  if (n < 232) {
    const i = n - 16;
    const s = [0, 95, 135, 175, 215, 255];
    return '#' + [s[Math.floor(i / 36) % 6], s[Math.floor(i / 6) % 6], s[i % 6]]
      .map(v => v.toString(16).padStart(2, '0')).join('');
  }
  const v = 8 + (n - 232) * 10;
  return '#' + [v, v, v].map(x => x.toString(16).padStart(2, '0')).join('');
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function ansiToHtml(raw: string): string {
  // Strip control characters other than newline and tab. The CLI rings the
  // terminal bell (\x07) for its sound effects, which is fine in a terminal but
  // renders as tofu in a browser.
  const input = raw.replace(/[\x00-\x08\x0B-\x1A\x1C-\x1F\x7F]/g, '');

  let fg: string | null = null, bg: string | null = null, bold = false;
  let out = '';
  let open = false;

  const close = () => { if (open) { out += '</span>'; open = false; } };
  const openSpan = () => {
    const s: string[] = [];
    if (fg) s.push(`color:${fg}`);
    if (bg) s.push(`background:${bg}`);
    if (bold) s.push('font-weight:700');
    if (s.length) { out += `<span style="${s.join(';')}">`; open = true; }
  };

  const re = /\x1B\[([0-9;]*)m/g;
  let last = 0, m: RegExpExecArray | null;
  const flush = (text: string) => {
    if (!text) return;
    close();
    openSpan();
    out += esc(text);
    close();
  };

  while ((m = re.exec(input))) {
    flush(input.slice(last, m.index));
    last = m.index + m[0].length;

    const parts = (m[1] || '0').split(';').map(Number);
    for (let i = 0; i < parts.length; i++) {
      const p = parts[i];
      if (p === 0) { fg = bg = null; bold = false; }
      else if (p === 1) bold = true;
      else if (p === 22) bold = false;
      else if (p === 39) fg = null;
      else if (p === 49) bg = null;
      else if (p >= 30 && p <= 37) fg = BASIC[p - 30];
      else if (p >= 90 && p <= 97) fg = BASIC[p - 90 + 8];
      else if (p >= 40 && p <= 47) bg = BASIC[p - 40];
      else if (p >= 100 && p <= 107) bg = BASIC[p - 100 + 8];
      else if (p === 38 || p === 48) {
        const target = p === 38;
        if (parts[i + 1] === 2) {
          const c = '#' + [parts[i + 2], parts[i + 3], parts[i + 4]]
            .map(v => (v || 0).toString(16).padStart(2, '0')).join('');
          if (target) fg = c; else bg = c;
          i += 4;
        } else if (parts[i + 1] === 5) {
          const c = xterm256(parts[i + 2]);
          if (target) fg = c; else bg = c;
          i += 2;
        }
      }
    }
  }
  flush(input.slice(last));
  return out;
}

export function page(blocks: { title: string; body: string }[]): string {
  const panes = blocks.map(b => `
  <div class="win">
    <div class="bar"><span class="d r"></span><span class="d y"></span><span class="d g"></span><span class="t">${esc(b.title)}</span></div>
    <pre>${ansiToHtml(b.body)}</pre>
  </div>`).join('\n');

  return `<!doctype html><html><head><meta charset="utf-8">
<style>
  body{margin:0;padding:28px;background:#0f0d0b;font-family:ui-monospace,'JetBrains Mono','SF Mono',Menlo,monospace;}
  .win{border-radius:10px;overflow:hidden;background:#181410;box-shadow:0 18px 40px rgba(0,0,0,.55);margin-bottom:24px;}
  .bar{background:#241d17;padding:9px 12px;display:flex;align-items:center;gap:7px;}
  .d{width:11px;height:11px;border-radius:50%;display:inline-block;}
  .r{background:#e05a4a}.y{background:#f5c542}.g{background:#5aa02c}
  .t{color:#8a8078;font-size:12px;margin-left:10px;}
  pre{margin:0;padding:16px 18px;color:#d9cfc0;font-size:13px;line-height:1.34;white-space:pre;overflow:visible;}
</style></head><body>${panes}</body></html>`;
}
