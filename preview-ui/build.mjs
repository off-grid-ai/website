import { createHash } from 'node:crypto';
import { build, transform } from 'esbuild';
import postcss from 'postcss';
import Beasties from 'beasties';
import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile, rename, rm } from 'node:fs/promises';
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
// The site's button joins SmoothUI's button to the alive layer (preview-ui/button.jsx). Pages and
// SmoothUI components import it under the usual names; the wrapper imports the upstream file.
aliases['@smoothui-upstream/smooth-button'] = aliases['@smoothui/smooth-button'];
aliases['@smoothui/smooth-button'] = resolve('preview-ui/button.jsx');
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
aliases['@shadcn/navigation-menu'] = await upstream('educlopez/smoothui', smoothCommit, 'packages/shadcn-ui/components/ui/navigation-menu.tsx', 'navigation-menu.tsx');
aliases['@/components/ui/button'] = await upstream('educlopez/smoothui', smoothCommit, 'packages/shadcn-ui/components/ui/button.tsx', 'shadcn-button.tsx');
const magicCommit = 'cdb348cb4c72a9b54b554d8617801e479fbc8714';
for (const component of ['flickering-grid', 'border-beam', 'bento-grid', 'animated-beam', 'number-ticker', 'marquee', 'magic-card', 'iphone', 'animated-shiny-text', 'ripple', 'animated-list', 'scroll-progress', 'scroll-based-velocity', 'blur-fade', 'text-animate', 'hyper-text', 'text-reveal', 'shine-border', 'typing-animation', 'interactive-grid-pattern', 'word-rotate', 'dock', 'safari', 'animated-circular-progress-bar', 'confetti', 'terminal', 'interactive-hover-button', 'highlighter', 'dot-pattern', 'orbiting-circles', 'shimmer-button', 'dotted-map', 'animated-grid-pattern', 'particles']) {
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
const eldoraCommit = '6bb8fd211ecbdfa983f5780bead27d9f3890f20a';
aliases['@eldoraui/macbook-pro'] = await upstream('karthikmudunuri/eldoraui', eldoraCommit,
  'apps/www/registry/eldoraui/macbook-pro.tsx', 'macbook-pro.tsx');
await writeFile(resolve(output, 'eldoraui-license.txt'), await readFile(await upstream(
  'karthikmudunuri/eldoraui', eldoraCommit, 'LICENSE.md', 'eldoraui-license.txt'
)));
// Shared library (wednesday-solutions/component-library-animations), vendored as trimmed tarballs
// for builds without private-repo credentials. The content hash is the source lock. Each commit is
// extracted once into its own directory: a temp directory renamed into place, so parallel PAGE=
// builds never see (or write) a half-extracted package.
async function vendoredLibrary(commit, sha256) {
  const archive = resolve(`preview-ui/vendor/component-library-${commit}.tgz`);
  if (createHash('sha256').update(await readFile(archive)).digest('hex') !== sha256) throw new Error(`Vendored component library ${commit} changed`);
  const target = resolve(cache, `component-library-${commit}`);
  if (existsSync(resolve(target, '.extracted'))) return target;
  const tmp = `${target}.tmp-${process.pid}`;
  await rm(tmp, { recursive: true, force: true });
  await mkdir(tmp, { recursive: true });
  execFileSync('tar', ['-xzf', archive, '-C', tmp, '--strip-components=1']);
  await writeFile(resolve(tmp, '.extracted'), sha256);
  try { await rename(tmp, target); }
  catch (error) {
    // Another build won the race (or an old, unmarked extraction is in the way).
    await rm(tmp, { recursive: true, force: true });
    if (!existsSync(resolve(target, '.extracted'))) {
      const stale = `${target}.stale-${process.pid}`;
      await rename(target, stale).catch(() => {}); await rm(stale, { recursive: true, force: true });
      return vendoredLibrary(commit, sha256);
    }
  }
  return target;
}
// dd1e6a3: the preset vanish input used by the home hero.
const presetInputPackage = await vendoredLibrary('dd1e6a3', '8c2df01288fca6ab9088bb3b4988e691b9fc7c793363a5a4c72611ff9e789bc2');
aliases['@offgrid-ui/placeholders-and-vanish-input'] = resolve(presetInputPackage, 'src/components/placeholders-and-vanish-input.tsx');
// 48e4937 (PR #3): the alive layer. The conductor (AliveProvider, orchestra) and the living
// field come from here; its stylesheets (alive.css, alive-semantic.css) are imported by page.css.
const aliveLibrary = await vendoredLibrary('48e4937', 'e30a75068e4f5d88e9cb3654c350140d079134a45e60f2423ec5aacfc7a7cecc');
aliases['@offgrid-ui/alive'] = resolve(aliveLibrary, 'src/sourced/alive/index.tsx');
aliases['@offgrid-ui/list-row'] = resolve(aliveLibrary, 'src/sourced/alive/list-row.tsx');
aliases['@offgrid-ui/badge'] = resolve(aliveLibrary, 'src/sourced/smoothui/packages/shadcn-ui/components/ui/badge.tsx');
// ElevenLabs UI waveform as the library vendors it (home explore: the Recorder card's live visual).
aliases['@offgrid-ui/waveform'] = resolve(aliveLibrary, 'src/sourced/elevenlabs/waveform.tsx');
// Geist and Geist Mono (pinned @fontsource-variable packages): the files are served from
// /assets/preview/fonts, and page.css imports the generated @font-face rules.
{
  const fontsOut = resolve(output, 'fonts');
  await mkdir(fontsOut, { recursive: true });
  let faces = '';
  for (const pkg of ['geist', 'geist-mono']) {
    const dir = resolve(`node_modules/@fontsource-variable/${pkg}`);
    // Upright faces only; the site sets no italic Geist.
    const css = await readFile(resolve(dir, 'index.css'), 'utf8');
    faces += css.replace(/url\(\.\/files\/([^)]+)\)/g, (_, file) => `url(/assets/preview/fonts/${file})`) + '\n';
    for (const file of readdirSync(resolve(dir, 'files')).filter(f => f.endsWith('-wght-normal.woff2'))) {
      const to = resolve(fontsOut, file);
      if (!existsSync(to)) { await writeFile(`${to}.tmp-${process.pid}`, await readFile(resolve(dir, 'files', file))); await rename(`${to}.tmp-${process.pid}`, to); }
    }
    await writeFile(resolve(fontsOut, `${pkg}-license.txt`), await readFile(resolve(dir, 'LICENSE')));
  }
  const facesFile = resolve(cache, 'fonts.css');
  if (!existsSync(facesFile) || (await readFile(facesFile, 'utf8')) !== faces) { await writeFile(`${facesFile}.tmp-${process.pid}`, faces); await rename(`${facesFile}.tmp-${process.pid}`, facesFile); }
}
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
// Write next to the target, then rename: Jekyll (and its livereload) never serves a half-written file.
const writeAtomic = async (file, content) => { const tmp = `${file}.tmp-${process.pid}`; await writeFile(tmp, content); await rename(tmp, file); };
const pricing = parse(await readFile('_data/pricing.yml', 'utf8'));
const { renderToString } = await import('react-dom/server');
const { createElement } = await import('react');
if (buildHome) {
await build({ ...common, entryPoints: ['preview-ui/client.jsx'], outfile: resolve(cache, 'out-home.js'), minify: !process.env.PREVIEW_DEV, ...(process.env.PREVIEW_DEV ? { define: { 'process.env.NODE_ENV': '"development"' } } : {}), target: ['es2020'], legalComments: 'eof' });
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
// Every home output is built in the cache and renamed into place once final (see writeAtomic).
execFileSync(resolve('node_modules/.bin/tailwindcss'), ['-i', 'preview-ui/page.css', '-o', resolve(cache, 'out-home.css')], { stdio: 'inherit' });
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
const compiledCss = await postcss([radixBreakpoints()]).process(await readFile(resolve(cache, 'out-home.css'), 'utf8'), { from: undefined });
const compactCss = await transform(compiledCss.css, { loader: 'css', minify: true, target: 'es2020' });
await writeFile(resolve(cache, 'out-home.min.css'), compactCss.code);
// Inline the first screen's styles. Keep the complete stylesheet for all later
// scenes, dialogs, and sections; extraction never removes source rules.
const critical = new Beasties({ path: websiteRoot, preload: false, pruneSource: false, logLevel: 'warn', inlineFonts: true,
  allowRules: [/^:root/, /^html/, /^body/, /^\.dark/, /^\.light/] });
const announcement = await readFile('_includes/announcement-bar.html', 'utf8');
const firstScreen = rendered.slice(hints.length).split('<section class="models-band"')[0];
const criticalHtml = await critical.process(`<html data-theme="dark" class="dark"><head><link rel="stylesheet" href="node_modules/.cache/offgrid-preview/out-home.min.css"></head><body>${announcement}${firstScreen}</body></html>`);
const criticalTokens = await transform(await readFile(resolve(output, 'tokens.css'), 'utf8'), { loader: 'css', minify: true });
// The hero paints in Geist from the first frame: the @font-face rules ship with the critical CSS
// (the families are reached through var(--og-font-sans), which the critical pass cannot follow).
const criticalFonts = await transform(await readFile(resolve(cache, 'fonts.css'), 'utf8'), { loader: 'css', minify: true });
const criticalOut = (`<style>${criticalTokens.code}${criticalFonts.code}</style>\n` + [...criticalHtml.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(m => `<style>${m[1]}</style>`).join('\n'));

// Cache-bust by content, not build time: the page changes whenever the bundle does.
const homeJs = await readFile(resolve(cache, 'out-home.js'));
const assetHash = createHash('sha256').update(homeJs).update(compactCss.code).digest('hex').slice(0, 12);
await writeAtomic('assets/preview/page.js', homeJs);
await writeAtomic(resolve(output, 'page.css'), compactCss.code);
await writeAtomic('_includes/home-hints.html', hints.replace(/\/>/g, '>\n'));
await writeAtomic('_includes/home-content.html', rendered.slice(hints.length));
await writeAtomic('_includes/home-critical.html', criticalOut);
await writeAtomic('_includes/home-version.html', assetHash);
console.log('Home page assets and Jekyll content are ready.');
}


// ── Every other page: preview-ui/pages/<slug>.jsx (+ optional <slug>.css, <slug>.data.mjs) ──
// PAGE=<slug> builds one page and writes only that page's files, so pages can be built in parallel.
const pagesDir = resolve('preview-ui/pages');
const radixPlugin = () => {
  const require = createRequire(import.meta.url); const root = process.cwd();
  try { process.chdir(resolve('node_modules/@radix-ui/themes')); return require(resolve('postcss-breakpoints.cjs')); } finally { process.chdir(root); }
};
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
