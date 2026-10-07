// usage: node pagecheck.mjs /path/ [outprefix]  -> screenshots at 1440x900, 1000x490, 390x844 in dark+light, errors, overflow
import { createRequire } from 'node:module';
const require = createRequire('/Users/user/wednesday/off-grid-ai/desktop/package.json');
const { chromium } = require('playwright');
const path = process.argv[2] || '/'; const out = process.argv[3] || 'pc';
const b = await chromium.launch({ executablePath: '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser', headless: true });
const probs = [];
for (const t of ['dark', 'light']) for (const [w, h] of [[1440, 900], [1000, 490], [390, 844]]) {
  const c = await b.newContext({ viewport: { width: w, height: h }, colorScheme: t, isMobile: w < 700, hasTouch: w < 700 });
  await c.addInitScript(t => localStorage.setItem('theme', t), t);
  const p = await c.newPage(); const errs = []; p.on('pageerror', e => errs.push(String(e).slice(0, 160))); p.on('console', m => { if (m.type() === 'error') errs.push(m.text().slice(0, 160)); });
  await p.goto('http://127.0.0.1:4000' + path, { waitUntil: 'networkidle' }); await p.waitForTimeout(2000);
  await p.screenshot({ path: `${out}-${t}-${w}x${h}.png`, fullPage: true });
  const ov = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  if (ov > 0) probs.push(`${t} ${w}: overflow ${ov}px`); if (errs.length) probs.push(`${t} ${w}: ${[...new Set(errs)].join(' | ')}`);
  await c.close();
}
await b.close(); console.log(probs.length ? probs.join('\n') : 'OK: no errors, no overflow');
