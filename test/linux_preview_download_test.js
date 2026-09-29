const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const script = fs.readFileSync('assets/js/linux-preview-download.js', 'utf8');
const fallback = 'https://github.com/off-grid-ai/OGAD/releases?q=beta';

function link(format) {
  return {
    href: fallback,
    getAttribute(name) { return name === 'data-linux-preview' ? format : null; }
  };
}

async function check(fetchResult) {
  const links = [link('AppImage'), link('deb')];
  vm.runInNewContext(script, {
    document: { querySelectorAll() { return links; } },
    fetch() { return Promise.resolve(fetchResult); },
    Date
  });
  await new Promise(resolve => setImmediate(resolve));
  return links;
}

const release = (tag, date, assets) => ({
  tag_name: tag,
  published_at: date,
  prerelease: true,
  draft: false,
  assets: assets.map(name => ({
    name,
    state: 'uploaded',
    browser_download_url: `https://github.com/off-grid-ai/OGAD/releases/download/${tag}/${name}`
  }))
});

(async () => {
  const releases = [
    release('v0.0.54-beta.109', '2026-09-29T14:04:50Z', [
      'off-grid-ai-0.0.54-beta.109.AppImage',
      'off-grid-ai_0.0.54-beta.109_amd64.deb'
    ]),
    release('v0.0.54-beta.110', '2026-09-29T19:30:07Z', [
      'off-grid-ai-0.0.54-beta.110.AppImage',
      'off-grid-ai_0.0.54-beta.110_amd64.deb'
    ]),
    { ...release('v0.0.54', '2026-09-29T21:02:00Z', ['off-grid-ai-0.0.54.AppImage']), prerelease: false }
  ];
  const found = await check({ ok: true, json: () => Promise.resolve(releases) });
  assert.match(found[0].href, /v0\.0\.54-beta\.110\/.*\.AppImage$/);
  assert.match(found[1].href, /v0\.0\.54-beta\.110\/.*_amd64\.deb$/);

  const unavailable = await check({ ok: false });
  assert.equal(unavailable[0].href, fallback);
  assert.equal(unavailable[1].href, fallback);
  console.log('Linux preview link assertions passed');
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
