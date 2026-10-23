import { chromium } from '/Users/user/wednesday/off-grid-ai/desktop/node_modules/playwright/index.mjs'
import fs from 'node:fs'
import { TODAY, YESTERDAY, TITLES } from '../seed.mjs'
const dir = new URL('.', import.meta.url).pathname
fs.mkdirSync(dir + 'blocks', { recursive: true })
const FIXED = { '0-1': 'mail', '0-2': 'meet', '0-3': 'preview', '0-4': 'mail', '0-5': 'issue', '-1-2': 'mail', '-1-8': 'meet' }
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })
for (const [d, blocks] of [[0, TODAY], [-1, YESTERDAY]]) {
  for (let i = 0; i < blocks.length; i++) {
    const key = `${d}-${i}`, out = `${dir}blocks/${key}.png`
    if (FIXED[key]) { fs.copyFileSync(`${dir}${FIXED[key]}.png`, out); continue }
    const [s, , app, sums, names] = blocks[i]
    const people = names.filter((n) => ['Sam Okafor', 'Priya Nair', 'Tom Reyes', 'Maya Chen', 'Daniel Cole'].includes(n))
    const who = sums.map((_, j) => (j % 2 && people.length ? people[(j >> 1) % people.length] : 'Alex'))
    const qs = new URLSearchParams({ app, title: TITLES[d][i], sub: names.join(' · '), lines: sums.join('|'), who: who.join('|'), time: s })
    await p.goto(`file://${dir}app.html?${qs}`); await p.waitForTimeout(150)
    await p.screenshot({ path: out })
  }
}
await b.close()
process.exit(0)
