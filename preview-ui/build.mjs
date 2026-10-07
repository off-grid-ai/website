import { createHash } from 'node:crypto';
import { build, transform } from 'esbuild';
import postcss from 'postcss';
import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile, rename } from 'node:fs/promises';
import { existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { parse } from 'yaml';

// The upstream components are imported intact. They are build dependencies,
// not forked product components. The immutable commit is the source lock.
const smoothCommit = 'b6312bce2b6f2ed95d8a6e98a592857884f5ea9e';
const cache = resolve('node_modules/.cache/offgrid-preview');
const output = resolve('assets/preview');
await mkdir(cache, { recursive: true });
await mkdir(output, { recursive: true });

async function upstream(repo, commit, path, filename) {
  const target = resolve(cache, `${commit.slice(0, 12)}-${filename}`);
  if (!existsSync(target)) {
    const response = await fetch(`https://raw.githubusercontent.com/${repo}/${commit}/${path}`);
    if (!response.ok) throw new Error(`Cannot load ${repo}/${path}: ${response.status}`);
    await writeFile(target, await response.text());
  }
  return target;
}

const aliases = {};
for (const component of ['theme-toggle', 'ai-approval', 'ai-message', 'ai-response', 'ai-reasoning', 'ai-suggestions', 'smooth-button', 'magnetic-button', 'tilt-card', 'coverflow-carousel', 'orbital-image-wheel']) {
  aliases[`@smoothui/${component}`] = await upstream(
    'educlopez/smoothui', smoothCommit,
    `packages/smoothui/components/${component}/index.tsx`, `${component}.tsx`
  );
}
aliases['@repo/smoothui/components/smooth-button'] = aliases['@smoothui/smooth-button'];
aliases['@repo/shadcn-ui/lib/utils'] = await upstream(
  'educlopez/smoothui', smoothCommit, 'packages/shadcn-ui/lib/utils.ts', 'utils.ts'
);
// Motion Primitives supplies text reveals and shared hover backgrounds intact.
const motionCommit = '120f64f6ca60348e251f929e9c81f11ccbe45eda';
for (const component of ['text-effect', 'animated-background', 'text-scramble', 'carousel']) {
  aliases[`@motion-primitives/${component}`] = await upstream(
    'ibelick/motion-primitives', motionCommit,
    `components/core/${component}.tsx`, `${component}.tsx`
  );
}
aliases['@/lib/utils'] = aliases['@repo/shadcn-ui/lib/utils'];
aliases['@/components/ui/button'] = await upstream('educlopez/smoothui', smoothCommit, 'packages/shadcn-ui/components/ui/button.tsx', 'shadcn-button.tsx');
const magicCommit = 'cdb348cb4c72a9b54b554d8617801e479fbc8714';
for (const component of ['flickering-grid', 'border-beam', 'bento-grid', 'animated-beam', 'number-ticker', 'marquee', 'magic-card', 'iphone', 'animated-shiny-text', 'ripple', 'animated-list', 'scroll-progress', 'scroll-based-velocity', 'blur-fade', 'text-animate', 'hyper-text', 'text-reveal', 'shine-border', 'typing-animation', 'interactive-grid-pattern', 'word-rotate', 'dock', 'safari', 'animated-circular-progress-bar', 'confetti', 'terminal', 'interactive-hover-button', 'highlighter', 'dot-pattern', 'orbiting-circles', 'shimmer-button', 'dotted-map']) {
  aliases[`@magicui/${component}`] = await upstream('magicuidesign/magicui', magicCommit,
    `apps/www/registry/magicui/${component}.tsx`, `${component}.tsx`);
}
// Aceternity publishes through its shadcn registry, not a public repository.
// The content hash is the source lock: a changed upstream file stops the build.
const aceternityLocks = {
  'placeholders-and-vanish-input': '0decb6b2f53e2896b784c0e3fedeaf8fdec60aa5cd3d4bcdea72a6d6d6d27e3d',
};
for (const [component, lock] of Object.entries(aceternityLocks)) {
  const target = resolve(cache, `aceternity-${component}.tsx`);
  if (!existsSync(target)) {
    const response = await fetch(`https://ui.aceternity.com/registry/${component}.json`);
    if (!response.ok) throw new Error(`Cannot load Aceternity ${component}: ${response.status}`);
    const { files } = await response.json();
    await writeFile(target, files[0].content);
  }
  const hash = createHash('sha256').update(await readFile(target)).digest('hex');
  if (hash !== lock) throw new Error(`Aceternity ${component} changed upstream (${hash}). Review it, then update the lock.`);
  aliases[`@aceternity/${component}`] = target;
}
// Shared library package, pinned to commit 6afb3ae. Bundled for builds without private-repo credentials.
const presetInputArchive = resolve('preview-ui/vendor/component-library-6afb3ae.tgz');
if (createHash('sha256').update(await readFile(presetInputArchive)).digest('hex') !== 'c27dcf8cf6527ecfa64f1635ac6264ff99e3eefbe258df545584b6616db2106e') throw new Error('Shared preset input package changed');
const presetInputPackage = resolve(cache, 'component-library-6afb3ae');
await mkdir(presetInputPackage, { recursive: true });
execFileSync('tar', ['-xzf', presetInputArchive, '-C', presetInputPackage, '--strip-components=1']);
aliases['@offgrid-ui/placeholders-and-vanish-input'] = resolve(presetInputPackage, 'src/components/placeholders-and-vanish-input.tsx');
await writeFile(resolve(output, 'magicui-license.txt'), await readFile(await upstream(
  'magicuidesign/magicui', magicCommit, 'LICENSE.md', 'magicui-license.txt'
)));

await writeFile(resolve(output, 'motion-primitives-license.txt'), await readFile(await upstream(
  'ibelick/motion-primitives', motionCommit, 'LICENCE.md', 'motion-primitives-license.txt'
)));
const designTokens = resolve('../shared/packages/design/src/tokens.css');
await writeFile(resolve(output, 'tokens.css'), await readFile(designTokens));
await writeFile(resolve(output, 'smoothui-license.txt'), await readFile(await upstream(
  'educlopez/smoothui', smoothCommit, 'LICENSE', 'smoothui-license.txt'
)));

const common = {
  bundle: true,
  alias: aliases,
  jsx: 'automatic',
  logLevel: 'info',
};
const buildHome = !process.env.PAGE || process.env.PAGE === 'home';
const pricing = parse(await readFile('_data/pricing.yml', 'utf8'));
const { renderToString } = await import('react-dom/server');
const { createElement } = await import('react');
if (buildHome) {
await build({ ...common, entryPoints: ['preview-ui/client.jsx'], outfile: 'assets/preview/page.js', minify: !process.env.PREVIEW_DEV, ...(process.env.PREVIEW_DEV ? { define: { 'process.env.NODE_ENV': '"development"' } } : {}), target: ['es2020'], legalComments: 'eof' });
await build({ ...common, entryPoints: ['preview-ui/page.jsx'], outfile: resolve(cache, 'page-server.mjs'), platform: 'node', format: 'esm', packages: 'external' });

const { default: PreviewPage, WALK_ICONS } = await import(pathToFileURL(resolve(cache, 'page-server.mjs')));
// Chapter tiles for the orbital wheel: each chapter's icon on a theme surface.
{
  const { renderToStaticMarkup } = await import('react-dom/server');
  const { createElement: h } = await import('react');
  await mkdir('assets/img/home/wheel', { recursive: true });
  for (const [id, Icon] of Object.entries(WALK_ICONS)) {
    for (const [theme, bg, fg, ring] of [['dark', '#141414', '#34D399', '#262626'], ['light', '#f5f5f5', '#059669', '#e5e5e5']]) {
      const icon = renderToStaticMarkup(h(Icon, { size: 64, color: fg, weight: 'regular' })).replace('<svg ', '<svg x="48" y="48" ');
      await writeFile(`assets/img/home/wheel/${id}-${theme}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"><rect width="160" height="160" fill="${bg}"/><circle cx="80" cy="80" r="76" fill="none" stroke="${ring}" stroke-width="2"/>${icon}</svg>`);
    }
  }
}
// React 19 emits resource hints ahead of the markup in a string render, then
// hoists them into <head> on the client. Ship them in <head> from the start so
// the hydrated tree matches the server markup exactly.
const rendered = renderToString(createElement(PreviewPage, { pricing }));
const hints = rendered.match(/^(?:<link [^>]*\/>)*/)[0];
await writeFile('_includes/home-hints.html', hints.replace(/\/>/g, '>\n'));
await writeFile('_includes/home-content.html', rendered.slice(hints.length));
execFileSync(resolve('node_modules/.bin/tailwindcss'), ['-i', 'preview-ui/page.css', '-o', 'assets/preview/page.css'], { stdio: 'inherit' });
// Compile the original Radix breakpoint syntax with its own build plugin.
const require = createRequire(import.meta.url);
const websiteRoot = process.cwd();
let radixBreakpoints;
try {
  process.chdir(resolve('node_modules/@radix-ui/themes'));
  radixBreakpoints = require(resolve('postcss-breakpoints.cjs'));
} finally {
  process.chdir(websiteRoot);
}
const compiledCss = await postcss([radixBreakpoints()]).process(await readFile(resolve(output, 'page.css'), 'utf8'), { from: undefined });
const compactCss = await transform(compiledCss.css, { loader: 'css', minify: true, target: 'es2020' });
await writeFile(resolve(output, 'page.css'), compactCss.code);
// Cache-bust by content, not build time: the page changes whenever the bundle does.
const assetHash = createHash('sha256').update(await readFile('assets/preview/page.js')).update(await readFile(resolve(output, 'page.css'))).digest('hex').slice(0, 12);
await writeFile('_includes/home-version.html', assetHash);
console.log('Home page assets and Jekyll content are ready.');
}


// ── Every other page: preview-ui/pages/<slug>.jsx (+ optional <slug>.css, <slug>.data.mjs) ──
// PAGE=<slug> builds one page and writes only that page's files, so pages can be built in parallel.
const pagesDir = resolve('preview-ui/pages');
const radixPlugin = () => {
  const require = createRequire(import.meta.url); const root = process.cwd();
  try { process.chdir(resolve('node_modules/@radix-ui/themes')); return require(resolve('postcss-breakpoints.cjs')); } finally { process.chdir(root); }
};
// Write next to the target, then rename: Jekyll never serves a half-written file.
const writeAtomic = async (file, content) => { const tmp = `${file}.tmp-${process.pid}`; await writeFile(tmp, content); await rename(tmp, file); };
if (existsSync(pagesDir)) {
  const slugs = readdirSync(pagesDir).filter(f => f.endsWith('.jsx') && !f.startsWith('_')).map(f => f.slice(0, -4))
    .filter(slug => !process.env.PAGE || process.env.PAGE === slug);
  await mkdir('assets/preview/pages', { recursive: true }); await mkdir('_includes/pages', { recursive: true });
  for (const slug of slugs) {
    const src = resolve(pagesDir, `${slug}.jsx`);
    const entry = resolve(cache, `page-${slug}-client.jsx`);
    await writeFile(entry, `import React from 'react';\nimport { hydrateRoot } from 'react-dom/client';\nimport Page from ${JSON.stringify(src)};\nconst data = JSON.parse(document.getElementById('og-page-data').textContent);\nhydrateRoot(document.getElementById('og-page-root'), <Page data={data} />);\n`);
    await build({ ...common, logLevel: 'warning', entryPoints: [entry], outfile: resolve(cache, `out-${slug}.js`), minify: !process.env.PREVIEW_DEV, ...(process.env.PREVIEW_DEV ? { define: { 'process.env.NODE_ENV': '"development"' } } : {}), target: ['es2020'], legalComments: 'eof' });
    await build({ ...common, logLevel: 'warning', entryPoints: [src], outfile: resolve(cache, `page-${slug}-server.mjs`), platform: 'node', format: 'esm', packages: 'external' });
    const { default: Page } = await import(`${pathToFileURL(resolve(cache, `page-${slug}-server.mjs`))}?t=${Date.now()}`);
    const dataFile = resolve(pagesDir, `${slug}.data.mjs`);
    const extra = existsSync(dataFile) ? await (await import(`${pathToFileURL(dataFile)}?t=${Date.now()}`)).default() : {};
    const data = { pricing, ...extra };
    const html = renderToString(createElement(Page, { data }));
    const hintsHtml = html.match(/^(?:<link [^>]*\/>)*/)[0];
    const cssIn = resolve(cache, `page-${slug}.css`);
    const own = existsSync(resolve(pagesDir, `${slug}.css`)) ? await readFile(resolve(pagesDir, `${slug}.css`), 'utf8') : '';
    await writeFile(cssIn, `@import ${JSON.stringify(resolve('preview-ui/page.css'))};\n@source ${JSON.stringify(src)};\n${own}`);
    execFileSync(resolve('node_modules/.bin/tailwindcss'), ['-i', cssIn, '-o', resolve(cache, `out-${slug}.css`)], { stdio: 'pipe' });
    const css = await postcss([radixPlugin()()]).process(await readFile(resolve(cache, `out-${slug}.css`), 'utf8'), { from: undefined });
    const cssMin = (await transform(css.css, { loader: 'css', minify: true, target: 'es2020' })).code;
    const js = await readFile(resolve(cache, `out-${slug}.js`));
    await writeAtomic(`assets/preview/pages/${slug}.js`, js);
    await writeAtomic(`assets/preview/pages/${slug}.css`, cssMin);
    await writeAtomic(`_includes/pages/${slug}-hints.html`, hintsHtml.replace(/\/>/g, '>\n'));
    await writeAtomic(`_includes/pages/${slug}.html`, html.slice(hintsHtml.length));
    await writeAtomic(`_includes/pages/${slug}-data.html`, JSON.stringify(data).replace(/</g, '\\u003c'));
    await writeAtomic(`_includes/pages/${slug}-version.html`, createHash('sha256').update(js).update(cssMin).digest('hex').slice(0, 12));
    console.log(`Page ${slug} is ready.`);
  }
}

// ── Content layout chrome (agent E) ─────────────────────────────────────────────────────────
// `PAGE=chrome npm run build:preview` builds the header, footer and theme that _layouts/content.html
// wraps around every Markdown page (guides, articles, writing, privacy, terms, release notes).
// Source: preview-ui/content/chrome.jsx (+ content.css). The chrome is page-agnostic: it is
// server-rendered once and split at its two slot markers into _includes/content/chrome-{0,1,2}.html;
// Jekyll puts the page's Markdown between them, and the client hydrates the one root around it.
if (!process.env.PAGE || process.env.PAGE === 'chrome') {
  const src = resolve('preview-ui/content/chrome.jsx');
  const entry = resolve(cache, 'content-chrome-client.jsx');
  await writeFile(entry, `import React from 'react';\nimport { hydrateRoot } from 'react-dom/client';\nimport Chrome from ${JSON.stringify(src)};\nconst read = (id) => document.getElementById(id).innerHTML;\nhydrateRoot(document.getElementById('og-content-root'), <Chrome a={read('og-doc-a')} b={read('og-doc-b')} />);\n`);
  const dev = process.env.PREVIEW_DEV ? { define: { 'process.env.NODE_ENV': '"development"' } } : {};
  await build({ ...common, logLevel: 'warning', entryPoints: [entry], outfile: resolve(cache, 'out-content-chrome.js'), minify: !process.env.PREVIEW_DEV, ...dev, target: ['es2020'], legalComments: 'eof' });
  await build({ ...common, logLevel: 'warning', entryPoints: [src], outfile: resolve(cache, 'content-chrome-server.mjs'), platform: 'node', format: 'esm', packages: 'external' });
  const { default: Chrome, SLOT_MARKS } = await import(`${pathToFileURL(resolve(cache, 'content-chrome-server.mjs'))}?t=${Date.now()}`);
  const html = renderToString(createElement(Chrome, {}));
  const hintsHtml = html.match(/^(?:<link [^>]*\/>)*/)[0];
  const parts = html.slice(hintsHtml.length).split(new RegExp(SLOT_MARKS.join('|')));
  if (parts.length !== 3) throw new Error(`Content chrome: expected 2 slot markers, found ${parts.length - 1}`);
  const cssIn = resolve(cache, 'content-chrome.css');
  await writeFile(cssIn, `@import ${JSON.stringify(resolve('preview-ui/page.css'))};\n@source ${JSON.stringify(src)};\n${await readFile(resolve('preview-ui/content/content.css'), 'utf8')}`);
  execFileSync(resolve('node_modules/.bin/tailwindcss'), ['-i', cssIn, '-o', resolve(cache, 'out-content-chrome.css')], { stdio: 'pipe' });
  const css = await postcss([radixPlugin()()]).process(await readFile(resolve(cache, 'out-content-chrome.css'), 'utf8'), { from: undefined });
  const cssMin = (await transform(css.css, { loader: 'css', minify: true, target: 'es2020' })).code;
  const js = await readFile(resolve(cache, 'out-content-chrome.js'));
  await mkdir('assets/preview/content', { recursive: true }); await mkdir('_includes/content', { recursive: true });
  await writeAtomic('assets/preview/content/chrome.js', js);
  await writeAtomic('assets/preview/content/chrome.css', cssMin);
  await writeAtomic('_includes/content/chrome-hints.html', hintsHtml.replace(/\/>/g, '>\n'));
  for (const [i, part] of parts.entries()) await writeAtomic(`_includes/content/chrome-${i}.html`, part);
  await writeAtomic('_includes/content/chrome-version.html', createHash('sha256').update(js).update(cssMin).digest('hex').slice(0, 12));
  console.log('Content layout chrome is ready.');
}
