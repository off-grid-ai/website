---
layout: default
title: Releases
parent: Mobile
nav_order: 1
permalink: /mobile/releases/
description: Off Grid AI Mobile release notes - what shipped, and when, for iPhone and Android. Two tracks, stable and beta, both on-device and free.
---

# Off Grid AI Mobile - releases

Everything that ships to your phone, in the order it shipped. Two tracks:

- **Stable** - the tested build on the [App Store](https://apps.apple.com/us/app/off-grid-local-ai/id6759299882) and [Google Play](https://play.google.com/store/apps/details?id=ai.offgridmobile). What you get if you just install the app.
- **Beta** - new features first, weekly, from [GitHub releases](https://github.com/off-grid-ai/off-grid-ai-mobile/releases). Expect the occasional rough edge.

<p class="ea-pricing-note">Current stable: <strong>0.0.102</strong> · Current beta: <strong>0.0.103-beta.3</strong>. Full per-build history lives on <a href="https://github.com/off-grid-ai/off-grid-ai-mobile/releases" target="_blank" rel="noopener">GitHub releases</a>.</p>

---

## 0.0.103 · beta · July 15, 2026

Control over what runs, and voice that just works.

- **Choose how hard your phone works.** New loading modes - Lean, Balanced, Aggressive - let you decide how many models stay in memory at once.
- **See what's using your RAM.** The model selector shows what's loaded and how much memory it's holding, with a per-model eject and an Eject All that frees everything.
- **Voice you can trust.** Voice notes and dictation transcribe reliably and drop the text into the input box instead of failing silently. The mic turns into a Stop button while the model is speaking.
- **Downloads that recover.** Failed downloads show up instead of vanishing, retry works on iOS again, and queued downloads survive an app restart.
- **Vision that pairs correctly.** Vision models pick the right projector file and refuse a mismatched one, with a Repair action when a file is missing.
- **Stopping keeps your reply.** Stop generation and you keep the partial answer you already saw, reasoning included - no more mislabeling a stopped turn as an error.

## 0.0.102 · stable · July 7, 2026

Your phone's real hardware, put to work.

- **GPU and NPU acceleration**, on by default when your device supports it, so models run faster without you touching a setting.
- **Smart model residency** decides what fits in memory - and a "Load Anyway" override lets you push past the limit when you know better, for the rest of the session.
- **Clearer guidance** when a model quietly falls back to CPU, with a one-tap path to a faster build.

## 0.0.101 · stable · July 3, 2026

Downloads that behave, memory you can see.

- **A download queue that won't freeze the app** - concurrent downloads are capped, queued items show a clear "Queued" state, and everything survives an app kill.
- **Per-process memory in Device Info** - Available, Footprint, and Process Limit, so you can see exactly what your phone has to spare.
- **Voice-note transcription rendered right in the sent message.**
- **A top-level error boundary** so a render error recovers instead of leaving you on a white screen.

## 0.0.97 - 0.0.100 · stable · late June 2026

Tools, membership, and routing that thinks.

- **MCP tools**, routed on-device through an embedding model, so the right tool is picked without a cloud round trip.
- **Off Grid AI Pro** membership with license-key activation and a device cap.
- **Smart routing** that tells text from image requests and warms the right models at boot.
- **Voice mode** that speaks image-generation results back to you.

---

<p class="ea-pricing-note">Looking for an older build or the exact commit list? Every version, with full notes and downloads, is on <a href="https://github.com/off-grid-ai/off-grid-ai-mobile/releases" target="_blank" rel="noopener">GitHub releases</a>.</p>
