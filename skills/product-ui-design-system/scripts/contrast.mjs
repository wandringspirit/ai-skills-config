#!/usr/bin/env node
// WCAG 2.x contrast checker for design tokens.
//
// Usage:
//   node contrast.mjs tokens.json          # {"light": {"--bg": "#fbf8f3", ...}, "dark": {...}}
//   node contrast.mjs "#5b534c" "#fbf8f3"  # one pair
//
// With a tokens file it checks the standard pairs from SKILL.md (missing tokens are skipped)
// and exits with code 1 if any required pair fails.
import { readFileSync } from 'node:fs';

const lin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
function luminance(hex) {
  const h = hex.replace('#', '');
  const v = h.length === 3 ? h.split('').map((x) => x + x).join('') : h;
  const [r, g, b] = [0, 2, 4].map((i) => lin(parseInt(v.slice(i, i + 2), 16) / 255));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
export function ratio(a, b) {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

// [foreground, background, minimum, what it is]
const PAIRS = [
  ['--ink', '--bg', 7, 'body text'],
  ['--ink', '--surface', 7, 'body text on cards'],
  ['--ink-muted', '--bg', 4.5, 'secondary text'],
  ['--ink-muted', '--surface', 4.5, 'secondary text on cards'],
  ['--accent', '--bg', 4.5, 'links / accent text'],
  ['--accent', '--surface', 4.5, 'links on cards'],
  ['--accent-ink', '--accent', 4.5, 'text on accent buttons'],
  ['--accent', '--surface', 3, 'focus ring'],
  ['--success', '--surface', 4.5, 'success text'],
  ['--sage', '--surface', 4.5, 'success text'],
  ['--warning', '--surface', 4.5, 'warning text'],
  ['--amber', '--surface', 4.5, 'warning text'],
];

const args = process.argv.slice(2);
if (args.length === 2 && args[0].startsWith('#')) {
  const r = ratio(args[0], args[1]);
  console.log(`${args[0]} on ${args[1]}: ${r.toFixed(2)}:1  AA text ${r >= 4.5 ? 'pass' : 'FAIL'}  AA large/UI ${r >= 3 ? 'pass' : 'FAIL'}`);
  process.exit(0);
}
if (args.length !== 1) {
  console.error('Usage: node contrast.mjs tokens.json | node contrast.mjs "#fg" "#bg"');
  process.exit(2);
}

const tokens = JSON.parse(readFileSync(args[0], 'utf8'));
let failed = 0;
for (const [scheme, t] of Object.entries(tokens)) {
  console.log(`\n${scheme}`);
  for (const [fg, bg, min, what] of PAIRS) {
    if (!t[fg] || !t[bg]) continue;
    const r = ratio(t[fg], t[bg]);
    const ok = r >= min;
    if (!ok) failed++;
    console.log(`  ${ok ? 'pass' : 'FAIL'}  ${r.toFixed(2).padStart(5)}:1 (need ${min})  ${fg} on ${bg}  ${what}`);
  }
}
console.log(failed ? `\n${failed} pair(s) fail.` : '\nAll pairs pass.');
process.exit(failed ? 1 : 0);
