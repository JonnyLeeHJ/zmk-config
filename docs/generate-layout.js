// Renders the Corne layout reference sheet from the bindings on main.
const fs = require('fs');

const KW = 58, KH = 46, GAP = 7, HALFGAP = 46;
const STAG_L = [16, 16, 7, 0, 7, 12];
const STAG_R = [12, 7, 0, 7, 16, 16];
const MARGIN = 44;
const HEADER = 62;
const THUMBOFF = 10;

// t = transparent (falls through), a = accent (special/held), n = normal
const L = (t) => ({ l: t, k: 'n' });
const A = (t) => ({ l: t, k: 'a' });
const T = () => ({ l: '', k: 't' });

const layers = [
  {
    name: 'Base',
    sub: 'no key held',
    rows: [
      ['ESC', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'GUI'],
      ['`', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', 'CAPS\nWORD'],
      ['TAB', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'RAISE'],
    ],
    thumbs: ['LOWER', 'SHIFT', 'BKSP', 'ENTER', 'SPACE', "'"],
    // sub-labels shown small above the key legend (mod-tap hold behaviour)
    holds: { '1,7': 'CTRL', '1,8': 'ALT' },
    accents: ['1,7', '1,8', '1,11', '2,11'],
    thumbAccents: [0],
  },
  {
    name: 'Lower',
    sub: 'hold left outer thumb',
    rows: [
      ['', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', ''],
      ['', '`', '~', '_', '\\', '|', '', '(', ')', '{', '}', ''],
      ['', '', '', '', '', '', '', '[', ']', '', '', ''],
    ],
    thumbs: ['', '', 'DEL', '', '', ''],
    accents: [],
    thumbAccents: [],
  },
  {
    name: 'Raise',
    sub: 'hold bottom right outer key',
    rows: [
      ['', '7', '8', '9', '/', '*', '', '', 'UP', '', 'VOL+', ''],
      ['', '4', '5', '6', '-', '+', '', 'LEFT', 'DOWN', 'RIGHT', 'VOL-', ''],
      ['', '1', '2', '3', '0', '=', '', 'PREV', 'PLAY', 'NEXT', 'MUTE', ''],
    ],
    thumbs: ['', '', '', '', '', ''],
    accents: [],
    thumbAccents: [],
  },
  {
    name: 'Adjust',
    sub: 'hold Lower and Raise together',
    rows: [
      ['', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', ''],
      ['', 'F11', 'F12', 'CAPS', 'INS', 'PRT\nSCR', 'HOME', 'PG\nUP', 'PG\nDN', 'END', 'BOOT', ''],
      ['', 'USB', 'BLE', 'BT\nCLR', 'BOOT', 'RESET', 'BT 1', 'BT 2', 'BT 3', 'BT 4', 'BT 5', ''],
    ],
    thumbs: ['', '', '', '', '', ''],
    accents: [],
    thumbAccents: [],
  },
];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const boardW = 12 * KW + 10 * GAP + HALFGAP;
const boardH = 3 * KH + 2 * GAP + 16 + KH + THUMBOFF + 20;
const layerH = HEADER + boardH + 26;
const W = boardW + MARGIN * 2;
const H = MARGIN + 96 + layers.length * layerH + 60;

let s = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<rect width="${W}" height="${H}" fill="#ffffff"/>
<style>
  .ttl{font:600 30px Segoe UI,Arial,sans-serif;fill:#111}
  .sub{font:400 15px Segoe UI,Arial,sans-serif;fill:#666}
  .lyr{font:600 21px Segoe UI,Arial,sans-serif;fill:#111}
  .lyrsub{font:400 14px Segoe UI,Arial,sans-serif;fill:#777}
  .k{font:500 15px Segoe UI,Arial,sans-serif;fill:#111;text-anchor:middle}
  .ks{font:500 12px Segoe UI,Arial,sans-serif;fill:#111;text-anchor:middle}
  .hold{font:600 10px Segoe UI,Arial,sans-serif;fill:#8a5a00;text-anchor:middle}
  .leg{font:400 13px Segoe UI,Arial,sans-serif;fill:#555}
</style>
<text class="ttl" x="${MARGIN}" y="${MARGIN + 22}">Corne layout reference</text>
<text class="sub" x="${MARGIN}" y="${MARGIN + 46}">JonnyLeeHJ/zmk-config, main. Grey keys fall through to the layer below.</text>
`;

function key(x, y, label, kind, hold) {
  const fill = kind === 't' ? '#fafafa' : kind === 'a' ? '#fff4e0' : '#ffffff';
  const stroke = kind === 't' ? '#e2e2e2' : kind === 'a' ? '#e0a94f' : '#3a3a3a';
  const sw = kind === 't' ? 1 : kind === 'a' ? 1.8 : 1.4;
  let o = `<rect x="${x}" y="${y}" width="${KW}" height="${KH}" rx="6" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
  if (kind === 't') {
    o += `<circle cx="${x + KW / 2}" cy="${y + KH / 2}" r="2.2" fill="#d5d5d5"/>`;
    return o;
  }
  const cx = x + KW / 2;
  const lines = String(label).split('\n');
  const cls = lines.some((l) => l.length > 4) || lines.length > 1 ? 'ks' : 'k';
  if (hold) {
    o += `<text class="hold" x="${cx}" y="${y + 15}">${esc(hold)}</text>`;
    o += `<text class="${cls}" x="${cx}" y="${y + 34}">${esc(lines[0])}</text>`;
    return o;
  }
  if (lines.length === 1) {
    // Punctuation that sits off the visual centre is easy to confuse on a
    // sheet used to place physical keycaps, so nudge each to where it reads.
    const nudge = { ',': 4, '.': 4, '_': 7, "'": -4, '`': -4, '~': -1 };
    const dy = nudge[lines[0]] || 0;
    o += `<text class="${cls}" x="${cx}" y="${y + KH / 2 + 6 + dy}">${esc(lines[0])}</text>`;
  } else {
    o += `<text class="${cls}" x="${cx}" y="${y + KH / 2 - 2}">${esc(lines[0])}</text>`;
    o += `<text class="${cls}" x="${cx}" y="${y + KH / 2 + 14}">${esc(lines[1])}</text>`;
  }
  return o;
}

let cy = MARGIN + 96;
for (const L2 of layers) {
  s += `<text class="lyr" x="${MARGIN}" y="${cy + 20}">${esc(L2.name)}</text>`;
  s += `<text class="lyrsub" x="${MARGIN + 14 + L2.name.length * 12}" y="${cy + 20}">${esc(L2.sub)}</text>`;
  s += `<line x1="${MARGIN}" y1="${cy + 32}" x2="${W - MARGIN}" y2="${cy + 32}" stroke="#e5e5e5" stroke-width="1"/>`;
  const top = cy + HEADER;
  for (let c = 0; c < 12; c++) {
    const half = c < 6 ? 0 : 1;
    const ci = c % 6;
    const stag = half ? STAG_R[ci] : STAG_L[ci];
    const x = MARGIN + c * (KW + GAP) + (half ? HALFGAP : 0);
    for (let r = 0; r < 3; r++) {
      const id = `${r},${c}`;
      const lab = L2.rows[r][c];
      const kind = lab === '' ? 't' : L2.accents.includes(id) ? 'a' : 'n';
      const hold = L2.holds && L2.holds[id];
      s += key(x, top + stag + r * (KH + GAP), lab, kind, hold);
    }
  }
  // thumbs: left cluster under cols 3..5, right cluster under cols 6..8
  const ty = top + 3 * (KH + GAP) + THUMBOFF;
  for (let i = 0; i < 6; i++) {
    const half = i < 3 ? 0 : 1;
    const idx = i % 3;
    const col = half ? 6 + idx : 3 + idx;
    const x = MARGIN + col * (KW + GAP) + (half ? HALFGAP : 0);
    const drop = half ? [16, 8, 0][idx] : [0, 8, 16][idx];
    const lab = L2.thumbs[i];
    const kind = lab === '' ? 't' : L2.thumbAccents.includes(i) ? 'a' : 'n';
    s += key(x, ty + drop, lab, kind);
  }
  cy += layerH;
}

s += `<text class="leg" x="${MARGIN}" y="${H - 38}">Orange keys change what the other keys do. J and K type normally when tapped and act as Ctrl and Alt when held.</text>`;
s += `<text class="leg" x="${MARGIN}" y="${H - 18}">Only the Base layer is printed on the keycaps. Caps word capitalises until a space, and underscores do not break it.</text>`;
s += '</svg>';

fs.writeFileSync(__dirname + '/layout.svg', s);
console.log('wrote layout.svg', W + 'x' + H);
