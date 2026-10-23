import { chromium } from '/Users/user/wednesday/off-grid-ai/desktop/node_modules/playwright/index.mjs'
const dir = process.argv[2]
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })
for (const n of ['mail', 'meet', 'preview', 'issue']) { await p.goto(`file://${dir}/${n}.html`); await p.waitForTimeout(300); await p.screenshot({ path: `${dir}/${n}.png` }) }
const s = await b.newPage({ viewport: { width: 800, height: 480 }, deviceScaleFactor: 2 })
await s.goto(`file://${dir}/logo.html`); await s.screenshot({ path: `${dir}/acme-logo.png` })
for (const [n, h] of [['pricing', 300], ['chart', 360]]) { await s.setViewportSize({ width: 640, height: h }); await s.goto(`file://${dir}/${n}.html`); await s.screenshot({ path: `${dir}/${n}.png` }) }
await b.close()
