import { chromium } from '/Users/user/wednesday/off-grid-ai/desktop/node_modules/playwright/index.mjs'
import fs from 'node:fs'
const dir = new URL('./wu/', import.meta.url).pathname
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 2 })
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.html'))) { await p.goto(`file://${dir}${f}`); await p.waitForTimeout(200); await p.screenshot({ path: dir + f.replace('.html', '.png') }) }
await b.close(); process.exit(0)
