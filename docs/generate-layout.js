// Renders the Corne layout reference sheet from the bindings in
// config/corne.keymap, sized to a single A4 page.
//
//   node docs/generate-layout.js
//
// Writes docs/layout.svg and docs/layout.html. The HTML exists so a headless
// browser can print a true A4 PDF:
//
//   chrome --headless --no-pdf-header-footer --print-to-pdf=docs/layout.pdf \
//          file:///abs/path/to/docs/layout.html
const fs = require('fs');

// A4 at 96 CSS px per inch: 210mm x 297mm.
const PAGE_W = 793.7, PAGE_H = 1122.5;
const MARGIN = 40;

const KW = 52, KH = 37, GAP = 4.5, HALFGAP = 30;
const STAG_L = [13, 13, 6, 0, 6, 10];
const STAG_R = [10, 6, 0, 6, 13, 13];
const THUMB_DROP_L = [0, 7, 13];
const THUMB_DROP_R = [13, 7, 0];
const THUMBOFF = 6;

const TITLE_H = 70;
const LYR_HEAD = 34;
const LYR_GAP = 12;

// Read the firmware bindings directly; fail rather than silently omit a key.
const path = require('path');
const source = fs.readFileSync(path.join(__dirname, '../config/corne.keymap'), 'utf8');
const clean = source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');
const aliases = {
 GRAVE:'\x60', SEMI:';', COMMA:',', DOT:'.', FSLH:'/', LGUI:'GUI',
 RALT:'ALT\nOPT', LSHFT:'SHIFT', BSPC:'BKSP', RET:'ENTER', SPACE:'SPACE', SQT:"'",
 EXCL:'!', AT:'@', HASH:'#', DLLR:'$', PRCNT:'%', CARET:'^', AMPS:'&',
 STAR:'*', LPAR:'(', RPAR:')', TILDE:'~', UNDER:'_', BSLH:'\\', PIPE:'|',
 LBRC:'{', RBRC:'}', LBKT:'[', RBKT:']', MINUS:'-', PLUS:'+', EQUAL:'=',
 C_VOL_UP:'VOL+', C_VOL_DN:'VOL-', C_PREV:'PREV', C_PP:'PLAY',
 C_NEXT:'NEXT', C_MUTE:'MUTE', PSCRN:'PRT\nSCR', PG_UP:'PG\nUP', PG_DN:'PG\nDN'
};
function decode(binding) {
 const [behavior, ...args] = binding.trim().split(/\s+/);
 if(behavior === '&trans') return {label:''};
 if(behavior === '&kp') {
   const code=args[0];
   if(aliases[code] !== undefined) return {label:aliases[code]};
   if(/^N[0-9]$/.test(code)) return {label:code.slice(1)};
   if(/^[A-Z]$|^F(?:[1-9]|1[0-2])$|^(ESC|TAB|DEL|UP|DOWN|LEFT|RIGHT|CAPS|INS|HOME|END)$/.test(code)) return {label:code};
 }
 if(behavior === '&tab_ctrl' && args.join(' ') === 'LCTRL TAB') return {label:'TAB',hold:'CTRL'};
 if(behavior === '&alt_caps' && args.join(' ') === 'RALT 0') return {label:'CAPS WORD',hold:'ALT / OPT'};
 if(behavior === '&caps_word') return {label:'CAPS\nWORD'};
 if(behavior === '&mo') return {label:args[0] === '1' ? 'LOWER' : 'RAISE'};
 if(behavior === '&bootloader') return {label:'BOOT'};
 if(behavior === '&sys_reset') return {label:'RESET'};
 if(behavior === '&out') return {label:args[0] === 'OUT_USB' ? 'USB' : 'BLE'};
 if(behavior === '&bt') return {label:args[0] === 'BT_CLR' ? 'BT\nCLR' : 'BT '+(Number(args[1])+1)};
 throw new Error('Unknown diagram binding: '+binding);
}
const subtitles=['no key held','hold left outer thumb','hold bottom right outer key','hold Lower and Raise together'];
const layers = [...clean.matchAll(/label\s*=\s*"([^"]+)"\s*;\s*bindings\s*=\s*<([\s\S]*?)>;/g)].map((match,index)=>{
 const keys=(match[2].match(/&[^&]+/g)||[]).map(decode);
 if(keys.length !== 42) throw new Error(match[1]+': expected 42 keys, got '+keys.length);
 const holds={}; const accents=[];
 keys.slice(0,36).forEach((key,i)=>{
   const id=Math.floor(i/12)+','+(i%12);
   if(key.hold) holds[id]=key.hold;
   if(key.hold || ['ALT\nOPT','CAPS\nWORD','RAISE'].includes(key.label)) accents.push(id);
 });
 return {name:match[1],sub:subtitles[index],rows:[keys.slice(0,12),keys.slice(12,24),keys.slice(24,36)].map(row=>row.map(k=>k.label)),
 thumbs:keys.slice(36).map(k=>k.label),holds,accents,thumbAccents:index === 0 ? [0] : []};
});
if(layers.length !== 4) throw new Error('Expected four layers');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const boardW = 12 * KW + 10 * GAP + HALFGAP;
const boardH =
  3 * KH + 2 * GAP + Math.max(...STAG_L) + THUMBOFF + KH + Math.max(...THUMB_DROP_L);
const layerH = LYR_HEAD + boardH + LYR_GAP;
const X0 = Math.round((PAGE_W - boardW) / 2);

let s = `<svg xmlns="http://www.w3.org/2000/svg" width="${PAGE_W}" height="${PAGE_H}" viewBox="0 0 ${PAGE_W} ${PAGE_H}">
<rect width="${PAGE_W}" height="${PAGE_H}" fill="#ffffff"/>
<style>
  .ttl{font:600 26px Segoe UI,Arial,sans-serif;fill:#111}
  .sub{font:400 13px Segoe UI,Arial,sans-serif;fill:#666}
  .lyr{font:600 18px Segoe UI,Arial,sans-serif;fill:#111}
  .lyrsub{font:400 12px Segoe UI,Arial,sans-serif;fill:#777}
  .k{font:500 15px Segoe UI,Arial,sans-serif;fill:#111;text-anchor:middle}
  .ks{font:500 11px Segoe UI,Arial,sans-serif;fill:#111;text-anchor:middle}
  .hold{font:600 9px Segoe UI,Arial,sans-serif;fill:#8a5a00;text-anchor:middle}
  .leg{font:400 11px Segoe UI,Arial,sans-serif;fill:#555}
</style>
<text class="ttl" x="${MARGIN}" y="${MARGIN + 18}">Corne layout reference</text>
<text class="sub" x="${MARGIN}" y="${MARGIN + 38}">JonnyLeeHJ/zmk-config, main. Grey keys fall through to the layer below.</text>
`;

function key(x, y, label, kind, hold) {
  const fill = kind === 't' ? '#fafafa' : kind === 'a' ? '#fff4e0' : '#ffffff';
  const stroke = kind === 't' ? '#e2e2e2' : kind === 'a' ? '#e0a94f' : '#3a3a3a';
  const sw = kind === 't' ? 0.8 : kind === 'a' ? 1.5 : 1.1;
  let o = `<rect x="${x}" y="${y}" width="${KW}" height="${KH}" rx="5" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
  if (kind === 't') {
    o += `<circle cx="${x + KW / 2}" cy="${y + KH / 2}" r="1.8" fill="#d5d5d5"/>`;
    return o;
  }
  const cx = x + KW / 2;
  const lines = String(label).split('\n');
  const cls = lines.some((l) => l.length > 4) || lines.length > 1 ? 'ks' : 'k';
  if (hold) {
    o += `<text class="hold" x="${cx}" y="${y + 12}">${esc(hold)}</text>`;
    o += `<text class="${cls}" x="${cx}" y="${y + 28}">${esc(lines[0].replace("CAPS WORD", "CAPS WD"))}</text>`;
    return o;
  }
  if (lines.length === 1) {
    // Punctuation that sits off the visual centre is easy to confuse on a
    // sheet used to place physical keycaps, so nudge each to where it reads.
    const nudge = { ',': 3, '.': 3, _: 5, "'": -3, '`': -3, '~': -1 };
    const dy = nudge[lines[0]] || 0;
    o += `<text class="${cls}" x="${cx}" y="${y + KH / 2 + 5 + dy}">${esc(lines[0].replace("CAPS WORD", "CAPS WD"))}</text>`;
  } else {
    o += `<text class="${cls}" x="${cx}" y="${y + KH / 2 - 1}">${esc(lines[0].replace("CAPS WORD", "CAPS WD"))}</text>`;
    o += `<text class="${cls}" x="${cx}" y="${y + KH / 2 + 11}">${esc(lines[1])}</text>`;
  }
  return o;
}

let cy = MARGIN + TITLE_H;
for (const L of layers) {
  s += `<text class="lyr" x="${MARGIN}" y="${cy + 16}">${esc(L.name)}</text>`;
  s += `<text class="lyrsub" x="${MARGIN + 12 + L.name.length * 10}" y="${cy + 16}">${esc(L.sub)}</text>`;
  s += `<line x1="${MARGIN}" y1="${cy + 25}" x2="${PAGE_W - MARGIN}" y2="${cy + 25}" stroke="#e5e5e5" stroke-width="1"/>`;
  const top = cy + LYR_HEAD;
  for (let c = 0; c < 12; c++) {
    const half = c < 6 ? 0 : 1;
    const ci = c % 6;
    const stag = half ? STAG_R[ci] : STAG_L[ci];
    const x = X0 + c * (KW + GAP) + (half ? HALFGAP : 0);
    for (let r = 0; r < 3; r++) {
      const id = `${r},${c}`;
      const lab = L.rows[r][c];
      const kind = lab === '' ? 't' : L.accents.includes(id) ? 'a' : 'n';
      s += key(x, top + stag + r * (KH + GAP), lab, kind, L.holds && L.holds[id]);
    }
  }
  const ty = top + 3 * (KH + GAP) + THUMBOFF;
  for (let i = 0; i < 6; i++) {
    const half = i < 3 ? 0 : 1;
    const idx = i % 3;
    const col = half ? 6 + idx : 3 + idx;
    const x = X0 + col * (KW + GAP) + (half ? HALFGAP : 0);
    const drop = half ? THUMB_DROP_R[idx] : THUMB_DROP_L[idx];
    const lab = L.thumbs[i];
    const kind = lab === '' ? 't' : L.thumbAccents.includes(i) ? 'a' : 'n';
    s += key(x, ty + drop, lab, kind);
  }
  cy += layerH;
}

s += `<text class="leg" x="${MARGIN}" y="${PAGE_H - MARGIN - 16}">Tap Tab / hold for Ctrl. Tap Caps Word / hold for Alt (Option on Mac). Both holds: 200 ms. J and K: plain letters.</text>`;
s += `<text class="leg" x="${MARGIN}" y="${PAGE_H - MARGIN}">Only the Base layer is printed on the keycaps. Caps word capitalises until a space, and underscores do not break it.</text>`;
s += '</svg>';

fs.writeFileSync(__dirname + '/layout.svg', s);
fs.writeFileSync(
  __dirname + '/layout.html',
  `<!doctype html><meta charset="utf-8"><style>
@page{size:A4;margin:0}
html,body{margin:0;padding:0}
svg{display:block;width:210mm;height:297mm}
</style>${s}`
);
console.log(`wrote layout.svg and layout.html (A4, content height ${Math.round(cy)} of ${PAGE_H})`);
