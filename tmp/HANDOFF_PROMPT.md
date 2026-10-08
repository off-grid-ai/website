# Handoff: Off Grid AI home page (getoffgridai.co)

You are taking over the redesign of the Off Grid AI home page. Read this whole brief before touching anything.

## The goal (from the founder, verbatim intent)
The home page must feel like a **living being the visitor interacts with**: it responds to every load, scroll, hover, click, touch and drag. One **cohesive** story, **tight** layout (no wasted space, no tiny product shots), **premium design engineering**, modern/futuristic/AI-first. Dark and light mode must feel equally good. Fully responsive (phone is a first-class composition, not a squeezed desktop). The founder reviews in a real browser at ~1000px wide and short heights, and on phones. He is blunt and detail-oriented: alignment, sizing and "looks broken" issues matter as much as concept.

## Non-negotiable rules
1. **Only upstream design-engineering components**, imported intact and pinned (no custom-built UI, including text and buttons): Magic UI, SmoothUI, Motion Primitives, Aceternity (registry, hash-locked), Radix. Composition code and CSS are fine; hand-rolled components are not. The founder's catalogue: https://github.com/wednesday-solutions/component-library-animations (use its breadth: text effects, backgrounds, device mockups, data display, navigation, loaders, scroll effects).
2. **Design philosophy:** `../brand/DESIGN_PHILOSOPHY.md` (also `../desktop/docs/DESIGN_PHILOSOPHY.md`). Menlo everywhere; emerald only accent (#34D399 dark / #059669 light); black/white + neutral grays with tiered surfaces; 8px radius (no pills); no 3D, no heavy glow/gradients/shadows, no decorative-only animation; animate transform/opacity only; honor reduced motion. Tokens come from `assets/preview/tokens.css` (`--og-*`).
3. **Copy: stop explaining, less is more.** "250,000+ downloads", not "downloads across the App Store…". Outcome-first. No em dashes, no exclamation marks.
4. **Approved claims (2026-10-07):** 250,000+ downloads · 3,400+ GitHub stars · 600+ community · five platforms (Android, iOS, macOS, Windows, Linux) + browser extension for Chrome and Firefox. Video generation "coming soon".
5. **Never mention Ollama or LM Studio.** "More compute" = the phone (OGAM) using the desktop app (OGAD) over your own network.
6. **Routes must match the live site** (getoffgridai.co): /desktop/, /mobile/, /pro/, /pro/#buy, /download/, /quick-start/, /guides/, /guides/which-model/, /articles/, /writing/, /ethos/, /mission/, /vision/, /design-partners/, /ogap/, /mobile/recorder/, /desktop/releases/, /mobile/releases/, /privacy/, /terms/.
7. **Real assets only**, no test fixtures or personal data on screen. Demo persona everywhere: Sam Okafor / Helio Labs (plus Priya Nair, Tom Reyes, Maya Chen, Daniel Cole, Northwind Capital).
8. Icons: `@phosphor-icons/react`.
9. Don't commit or deploy unless asked. Stay inside the website home-page pipeline.

## How the page is built (Jekyll + React SSR)
- Source: `preview-ui/page.jsx` (composition), `preview-ui/page.css` (Tailwind v4 + Radix CSS + our styles; it has grown by appended override blocks, consolidate carefully), `preview-ui/build.mjs` (fetches pinned upstream components into `node_modules/.cache/offgrid-preview`, bundles with esbuild, SSR-renders to `_includes/home-content.html`, writes `_includes/home-hints.html` and a content-hash `_includes/home-version.html` used for cache-busting).
- Build: `npm run build:preview`. Debug build with readable React errors: `PREVIEW_DEV=1 npm run build:preview`.
- Served by Jekyll at http://127.0.0.1:4000/ (`jekyll serve --host 127.0.0.1 --port 4000` in `website/`; it can die, restart it). Layout `_layouts/home.html` includes `home-content.html` directly (not through Markdown, which mangled hydration). `index.md` only carries front matter.
- Assets: `assets/img/home/app/*-{dark,light}.webp` (real app screens captured from the seeded desktop build in both themes; the `Shot` component swaps by theme), `assets/img/home/agent-*.webp` (Agentic Studio web-use screens), `assets/img/home/ext/*` (browser extension, currently low-res 400x700), `assets/img/home/gen-*.webp` (on-device image generation), `assets/img/home/logo-{dark,light}.png` (tiled logo with depth, from the mobile app). Raw captures in `tmp/shots3/`.

## Current page structure
1. **Walkthrough (the core):** one pinned section. Hero = headline ("Your AI." + Word Rotate "Your memory/meetings/devices/browser/secrets"), Aceternity PlaceholdersAndVanishInput command bar, SmoothUI AISuggestions chips, NumberTicker proof. Below it the real app window. On scroll the window docks right and becomes the stage for 12 chapters (Today, Capture, Remember, Ask, Act, Web use, Meetings, Phone, Browser, Vault, Models, Local API). Each chapter types its command into the window (Magic UI TypingAnimation). Navigation: Magic UI Dock, arrow keys, drag/swipe the window, chips/command bar jump to chapters. URL hash tracks the chapter (`/#ask` …) and deep links land on it. Live scenes render in a fixed design canvas scaled to fit (`.wt-canvas`, `--fit`); screenshot chapters fill the window (`View.fill = true`).
2. Model names band (Magic UI ScrollVelocity).
3. Privacy demo ("Type something private. Watch where it goes."): cloud vs Off Grid lanes with AnimatedBeam + AnimatedList logs + copy counters.
4. TextReveal statement ("Cloud AI keeps your data on their computer. Off Grid AI keeps it on yours.").
5. Pricing (MagicCard, InteractiveHoverButton, Highlighter), Explore cards, final download CTA, footer.

## Known problems to fix first (founder flagged these)
- **Browser chapter is broken:** shows e2e fixtures ("Synthetic page for end-to-end tests", "GitHub (demo)"), mismatches the "fill my Helio login" command, and the side-panel image is pasted over the Safari frame. Rebuild: Magic UI Safari frame (screen area: x=1,y=52,w=1200,h=700 of 1203x753) with a composed Helio Labs partner-portal sign-in page and a docked Off Grid side panel showing the matching vault login; animate the fill; loop.
- **AnimatedBeam inside the scaled canvas drew at the wrong scale.** Just added a `Beam` wrapper that portals beams into an unscaled `.beam-layer` over the window (Capture and Continue scenes). Built but **not yet verified**; check the Capture chapter.
- Canvas was just resized to 640x460 (max scale 1.2) so Remember stops clipping; verify every chapter at 1440x900, 1000x490, 390x844.
- The Dock was crowding the window; verify spacing.
- The founder wants **more ambition ("alpha")**: chapter handoffs (the cited meeting lights up in the timeline in Ask; Act grows out of Ask's draft; Phone pulls the approved reply out of the window), and the post-walkthrough sections as alive as the walkthrough.
- Pending (founder said later): re-run the desktop e2e captures because the desktop UI changed and gods (Ares/Athena) are now available. Harness pattern: a temporary Playwright spec in `../desktop/e2e/` using `launchOffGrid` with `OFFGRID_SEED=force`, `OFFGRID_SEED_PRO=force`, `OFFGRID_PRO=1`; switch the app's own `Theme:` button for dark/light (emulateMedia alone does not work); delete the spec afterwards. Screenshot shot list for an image agent: `tmp/screenshot-requests.md`.

## Quality gate (do this before every handoff to the founder)
- Headless sweep with Brave (Playwright's bundled Chromium is not installed): `node` script at 1440x900, 1000x600 (and 1000x490), 390x844, dark + light; screenshot hero, chapters, privacy, pricing, download; assert zero page errors and no horizontal overflow; build contact sheets with ImageMagick `montage` and actually look at them.
- Trust real-browser measurements over the in-app preview pane (its emulated viewport skews `svh`/heights and throttles animation when hidden).
- Gotchas already hit: `--col` must not use `%` (it resolved against height); use `vh` on desktop, `svh` only on mobile; Magic UI AnimatedBackground's `.z-10` wrapper needs `position:relative`; pass stable arrays to WordRotate; long `scrollTo` smooth jumps stall (use instant for far jumps); React 19 hoists `<link rel=preload>` out of SSR markup (handled via `home-hints.html`).

## Working style
The founder runs parallel sessions; verify the tree before editing. Act without asking per step once scope is clear; report outcomes plainly; never claim something works without checking it in a real browser at his sizes.
