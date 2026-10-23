import { chromium } from '/Users/user/wednesday/off-grid-ai/desktop/node_modules/playwright/index.mjs'
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })
for (const n of process.argv.slice(2)) {
  await p.goto('file://' + process.cwd() + '/' + n + '.html'); await p.waitForTimeout(300)
  await p.screenshot({ path: n + '.png' })
}
await b.close()
