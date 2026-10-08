# Page migration brief (read fully before touching anything)

You are migrating pages of getoffgridai.co (Jekyll site in `/Users/user/wednesday/off-grid-ai/website`) onto the new design system the home page now uses. Several agents work in parallel, each on its own pages. The founder is blunt and detail-oriented: alignment, sizing, mobile and "looks broken" issues matter as much as concept.

## Read first
- `tmp/HANDOFF_PROMPT.md` (rules, design philosophy, approved claims). Its rules are non-negotiable.
- `preview-ui/page.jsx` (the home page; study how sections, SceneCard, ShotSeq, MobileRail, SectionBg, Kicker/Title/Lede are used) and `preview-ui/page.css`.
- `preview-ui/shared.jsx` (the kit you import from) and `preview-ui/pages/_example.jsx` (template).

## Non-negotiables (summary)
1. Only upstream components (Magic UI, SmoothUI, Motion Primitives, Aceternity, Radix), imported intact. Composition and CSS are fine; hand-rolled UI is not. If you need an upstream component that isn't in `preview-ui/build.mjs` yet, say so in your report and use what's available meanwhile. Do NOT edit build.mjs, page.jsx, page.css or shared.jsx (shared files; other agents depend on them). Exception: agent E may add one clearly separated block to build.mjs for the content-layout chrome (see its task).
2. Design: Menlo everywhere, emerald the only accent, black/white + neutral greys, 8px radius, no 3D, no heavy glow, animate transform/opacity only, honour reduced motion. Dark and light must both look good. Phones are a first-class composition: fewer vertical scrolls, side-by-side cards become MobileRail swipe rows.
3. Copy: less is more, outcome-first, no em dashes, no exclamation marks. Approved claims only: 250,000+ downloads, 3,400+ GitHub stars, 600+ community, five platforms (Android, iOS, macOS, Windows, Linux) + Chrome/Firefox extension; video generation "coming soon". Demo persona: Sam Okafor / Acme Corp (never "Helio Labs"; it's a real company).
4. Keep every real fact, link, download URL, price reference, FAQ, analytics `data-analytics-*` attribute, script behaviour and SEO front matter (title, description, permalink, redirect_from, faq, nav keys) from the page you migrate. Read the current page and its includes completely before redesigning. If a page has working JS (checkout, RevenueCat, release lists, filters), it must still work.
5. Routes must not change.
6. Real assets only. App screenshots live in `assets/img/home/app/<name>-{dark,light}.webp` (+ `-1760` variants); use the `Shot` / `ShotSeq` components (they handle themes, srcset, cache-busting). Available names: day, god, actions, entities, meetings, voice, reflect, replay, clipboard, vault-locked, vault-typing, vault-open, models-text, models-vision, models-image, models-voice, models-transcription, models-computer-use, chat, integrations. Other images already in `assets/img/` may be used if they show no personal data or test fixtures.

## How a page is built
- Create `preview-ui/pages/<slug>.jsx` (default export receives `{ data }`; wrap content in `<PageShell>`), optional `preview-ui/pages/<slug>.css` (plain CSS, scoped under a page class you choose), optional `preview-ui/pages/<slug>.data.mjs` (default export: async function returning extra data, e.g. read `_data/*.yml` or a collection's front matter; merged into `data` alongside `data.pricing`).
- In the page's markdown file set `layout: react` and `react: <slug>` in front matter; keep all other front matter. Remove the old body only after its content lives in the JSX.
- Build only your page: `PAGE=<slug> npm run build:preview` (never a bare `npm run build:preview`; that rebuilds the home page and races other agents).
- Jekyll (already running at http://127.0.0.1:4000, do not restart it) regenerates in ~60s. Wait until `_includes/pages/<slug>-version.html`'s hash appears in the served HTML (`curl -s http://127.0.0.1:4000/<route>/ | grep <hash>`) before checking.
- Gotchas: `Lede`/`TextAnimate`/`Title` text props must be single strings (template literal, not mixed JSX). Magic UI TypingAnimation ships display-size type; inherit font sizes when used inline. AnimatedBeam inside a CSS-scaled container draws wrong. SSR + hydration: no `window` at module level; read browser state in effects.

## Verify before you report (mandatory)
- `node tools/pagecheck.mjs /<route>/ /private/tmp/<your-scratch>/<slug>` screenshots full pages at 1440x900, 1000x490, 390x844 in dark and light and reports page errors and horizontal overflow. It must print `OK`. Then actually look at the screenshots (crop/montage with ImageMagick `magick`) and fix what looks broken, cramped, empty or misaligned. Check interactions you added with a short Playwright script (Playwright lives in `../desktop/node_modules`, Brave at `/Applications/Brave Browser.app/Contents/MacOS/Brave Browser`; see tools/pagecheck.mjs for the pattern).
- Don't commit. Don't touch other agents' pages. Report: files changed, what each page now contains, what you verified (with the screenshot paths), and anything you could not do (e.g. upstream components you'd want added).

## Added by the founder (mandatory)
- **All old links keep working.** `tmp/live-urls.txt` holds all 444 live URLs (from getoffgridai.co/sitemap.xml). `sh tools/linkcheck.sh [filter]` must report 0 broken. Keep existing in-page anchors (e.g. /pro/#buy) and heading ids that other pages link to.
- **Phones get the home page's bar:** side-by-side cards become MobileRail swipe rows (dots below, never overlapping), minimal vertical scrolling (report page height in screens at 390x844), nothing overlaps or gets cropped, text never runs into frames, usable tap targets. Look at every phone screenshot top to bottom before reporting.
