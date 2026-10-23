import { chromium } from '/Users/user/wednesday/off-grid-ai/desktop/node_modules/playwright/index.mjs'
const b = await chromium.launch({ executablePath: process.env.CHROME })
const p = await b.newPage({ viewport: { width: 800, height: 480 }, deviceScaleFactor: 1 })
await p.goto('file://' + process.cwd() + '/logo.html'); await p.screenshot({ path: 'acme-logo.png' })
const d = await b.newPage({ viewport: { width: 900, height: 1200 } })
await d.goto('file://' + process.cwd() + '/preview.html')
await d.evaluate(() => { document.body.innerHTML = document.querySelector('.page').outerHTML; document.body.style.background = '#fff' })
await d.pdf({ path: 'Acme_rollout_v3.pdf', width: '900px', height: '1200px', printBackground: true })
await b.close()
