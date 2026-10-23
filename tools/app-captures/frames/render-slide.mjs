import { chromium } from '/Users/user/wednesday/off-grid-ai/desktop/node_modules/playwright/index.mjs'
const dir = new URL('.', import.meta.url).pathname
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 760, height: 330 }, deviceScaleFactor: 2 })
await p.goto(`file://${dir}slide.html`); await p.screenshot({ path: `${dir}slide.png` }); await b.close(); process.exit(0)
