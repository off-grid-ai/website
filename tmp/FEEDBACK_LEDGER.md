# Founder feedback ledger (every item must be accounted for)

Status: DONE = fixed and verified in a browser. AGENT = assigned, pending agent report + my review. RULE = applies to every page; checked in the final sweep.

## Global rules (RULE: every page, checked in the final sweep)
1. Only upstream components (Magic UI, SmoothUI, Motion Primitives, Aceternity, Radix); nothing hand-built. When something looks off, first check our CSS didn't break the component.
2. Too flat / too basic is a failure: depth (MagicCard/SceneCard, elevation), hierarchy, real app screens large.
3. Too cluttered / not breathing is a failure: one idea per section, ~3 elements per screen, generous spacing.
4. Minimal and abstract beats literal (world map + two device icons with a live beam).
5. Use real screenshots (seeded app captures, both themes), never fixtures, test data, dev paths, personal data or "Models not downloaded".
6. Screenshots are never cropped or cut off; fully visible at every size (phones pan or fit).
7. Multi-screen transitions: smooth left-to-right wipe with a scan line; never a blink or a fade-out-then-in; preload images.
8. All animations loop, including screenshot sequences.
9. Autoplay stops when the user interacts; there's a visible pause/resume control and an interaction hint.
10. Clicks must work (no overlay or pointer capture swallowing them); hover states exist.
11. Mobile is first-class: side-by-side cards become horizontal swipe rows (Motion Primitives Carousel), dots below cards never overlapping, minimal vertical scroll, nothing overlapping or cropped, text never runs into frames.
12. No grid background behind text-heavy sections (FAQs, long copy, hairline lists).
13. No indented second lines in wrapped headings/quotes (TextAnimate space spans; global fix in page.css).
14. No numbers/labels touching ("01The shift"); comfortable padding.
15. No awkward heading breaks ("pre-" / "order").
16. Copy: "Your ___" voice; outcome-first; less is more; no em dashes; no exclamation marks; better, realistic examples (no "resignation letter").
17. Demo company is Acme Corp (Helio Labs is a real company); persona Sam Okafor.
18. Never talk about software licenses (MIT/AGPL/open-core). "Open source" as a phrase is OK. Legal terms page keeps its legal text.
19. Ollama / LM Studio guides and articles stay (they're guides). An Off Grid AI Desktop guide exists (DONE).
20. All old links keep working (444 live URLs; tools/linkcheck.sh = 0 broken); existing anchors keep working.
21. Loading state must not look broken (theme consistent before hydration, nothing mispositioned).
22. Dark and light both look good.
23. Header carries the important destinations: Desktop, Mobile, Pro, Pricing, Guides + Get Pro + Download (DONE). Releases in footer and phone menu.
24. Buy pages are conversion-optimised with best practices, with no invented scarcity/testimonials (AGENT B for /pro/, AGENT F for /download/).
25. Small meaningful commits on feat/migration, pushed; PR #24 (draft) (ongoing).

## Home page (DONE unless noted)
- Dock overflowing its border; then replaced by the orbital wheel (DONE)
- 17 chapters too many scrolls; orbital wheel (SmoothUI) with autoplay, one chapter always active, clicking a circle selects it, wraps 17 -> 1 (DONE)
- Wheel looked weird (scale bug), circles not selectable (stacking + pointer capture), radius bigger, hint, autoplay toggle clickable (DONE)
- Browser chapter broken fixtures; rebuilt Acme sign-in + vault side panel (DONE)
- Act card cramped/cropped; TypingAnimation sizing (DONE)
- Meetings needs a real meeting screenshot; realistic call frames (DONE); Vault lock -> typing -> open sequence (DONE)
- Models repeated Qwen download; every kind of model with real tabs (DONE)
- Show God, clipboard and the killer features (DONE: chapters added)
- Chapter titles "Your God knows your day" pattern (DONE)
- Command bar click animation faster (DONE)
- Ask rail bigger (DONE); scene cards not flat (MagicCard + BorderBeam) (DONE)
- Capture beams drew over cards; Phone lens beams (DONE)
- Screenshots cut off (DONE); corrupt light screenshots / empty chapters (DONE)
- Privacy section: better examples (DONE), not flat, minimal: world map vs phone + desktop with a strong animated beam (DONE)
- After the first sections there was no background (DONE: living backgrounds); pricing too flat (DONE)
- Remove download orbit (DONE)
- Mobile: dial wheel, window below copy, swipe rows for privacy/pricing/explore, shorter page (DONE)
- Loading state mixed themes / mispositioned window (DONE)

## Other pages (AGENT; each verified by me before commit)
- /pro/: too cluttered, must breathe; CRO best practices; buy flow and #buy unchanged (B)
- /desktop/: Artifacts scene broken (small in big stage, tab highlight over text, cramped/faded table) and all 8 scenes checked (A); license mention removed (A)
- /mobile/ (A)
- /download/, /quick-start/ not migrated (F, reassigned)
- /ethos/, /mission/, /vision/: numbers kissing labels; quote second-line indent; search/filters kept (C)
- /design-partners/: contact block broken (button over email, email clipped, squeezed column) (C)
- /ogap/: FAQ lines vs grid lines; "pre-order" break (D); /mobile/recorder/ (D)
- Guides/articles/writing hubs too flat; sticky search overlapping cards (E); long-form layout; releases; privacy; terms (E)
- Article license sentences removed (DONE, 53 files; commits with E's layout work)
- Footer links tight; Wednesday Solutions linked (DONE)
- 26. Screenshots must be perfect: no fixtures, test pages, localhost URLs, internal model ids, FAILED/empty states, personal data. assets/img/home/agent-*.webp and assets/img/home/ext/*.webp are BANNED (fixtures); clean web-use shots are being recaptured (web-plan/web-takeover/web-done). (RULE)
- 27. Audit (7 Oct): small-phone header, phone/tablet tour controls, honest hero input, privacy as labelled illustration, 44px touch targets, readable product crops, hold user results, scoped keyboard, input names, exact prices, spacing/contrast, scoped claims. (Home: DONE and verified at 1440, 1024, 768, 390 and 320)
- 28. No fake or placeholder app content inside screenshots (e.g. the Replay 'Notion' frame). Replay pulled from home, desktop and articles until a real capture lands. (RULE)
