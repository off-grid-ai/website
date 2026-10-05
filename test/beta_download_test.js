const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const script = fs.readFileSync('assets/js/beta-download.js', 'utf8');
const fallback = 'https://github.com/off-grid-ai/OGAD/releases/download/v0.0.55-beta.112/pinned';

function link(format) {
  return {
    href: fallback,
    getAttribute(name) { return name === 'data-beta-download' ? format : null; }
  };
}

async function check(fetchResult) {
  const links = [link('AppImage'), link('deb'), link('dmg'), link('exe')];
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
      'off-grid-ai_0.0.54-beta.110_amd64.deb',
      'OffGrid-0.0.54-beta.110.dmg',
      'OffGrid-0.0.54-beta.110.dmg.blockmap',
      'off-grid-ai-0.0.54-beta.110-setup.exe'
    ]),
    { ...release('v0.0.54', '2026-09-29T21:02:00Z', ['off-grid-ai-0.0.54.AppImage']), prerelease: false }
  ];
  const found = await check({ ok: true, json: () => Promise.resolve(releases) });
  assert.match(found[0].href, /v0\.0\.54-beta\.110\/.*\.AppImage$/);
  assert.match(found[1].href, /v0\.0\.54-beta\.110\/.*_amd64\.deb$/);
  assert.match(found[2].href, /v0\.0\.54-beta\.110\/OffGrid-0\.0\.54-beta\.110\.dmg$/);
  assert.match(found[3].href, /v0\.0\.54-beta\.110\/.*-setup\.exe$/);

  const unavailable = await check({ ok: false });
  assert.equal(unavailable[0].href, fallback);
  assert.equal(unavailable[1].href, fallback);
  assert.equal(unavailable[2].href, fallback);
  assert.equal(unavailable[3].href, fallback);
  console.log('Beta download link assertions passed');
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
