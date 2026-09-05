import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const offGridRoot = path.resolve(currentDir, '../../../..');
const playwrightPath = path.join(offGridRoot, 'console/node_modules/playwright/index.js');
const require = createRequire(import.meta.url);
const { chromium } = require(playwrightPath);

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1800, height: 1500 }, deviceScaleFactor: 1 });

await page.goto(pathToFileURL(path.join(currentDir, 'index.html')).href, { waitUntil: 'load' });
await page.evaluate(async () => document.fonts.ready);

for (const deck of ['linkedin', 'x']) {
  const slides = page.locator(`[data-deck="${deck}"]`);
  const count = await slides.count();
  const outputDir = path.join(currentDir, deck);
  await fs.rm(outputDir, { recursive: true, force: true });
  await fs.mkdir(outputDir, { recursive: true });

  for (let index = 0; index < count; index += 1) {
    const slide = slides.nth(index);
    const number = await slide.getAttribute('data-slide');
    const overflow = await slide.evaluate((element) => ({
      horizontal: element.scrollWidth > element.clientWidth,
      vertical: element.scrollHeight > element.clientHeight,
    }));
    if (overflow.horizontal || overflow.vertical) {
      throw new Error(`${deck} slide ${number} overflows its canvas: ${JSON.stringify(overflow)}`);
    }
    await slide.screenshot({
      path: path.join(outputDir, `${number}.png`),
      animations: 'disabled',
      type: 'png',
    });
  }
}

await browser.close();
