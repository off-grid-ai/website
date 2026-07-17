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

<p class="ea-pricing-note">Current App Store release: <strong>iOS 0.0.103</strong>. For Android, <a href="https://play.google.com/store/apps/details?id=ai.offgridmobile" target="_blank" rel="noopener">see the current Google Play release</a>. New beta builds and the full per-build history live on <a href="https://github.com/off-grid-ai/off-grid-ai-mobile/releases" target="_blank" rel="noopener">GitHub releases</a>.</p>

---

## 0.0.103 - iOS stable - July 17, 2026

Now live on the App Store. Real control over memory, and a hard pass over the things that were breaking.

- **Choose how hard your phone works.** New loading modes - Lean, Balanced, Aggressive - let you decide how much memory models are allowed to use.
- **See and free your RAM.** The model manager shows what's loaded and how much each model is holding, with a per-model eject and an Eject All that frees everything, voice and transcription included.
- **Bigger models, no crashes.** 9B models load and run fast on iOS and Android, and switching models is memory-aware, so a new one loads without running out of RAM. Over budget? Load Anyway measures your real free memory first.
- **Voice you can trust.** Voice notes and dictation transcribe reliably and send as text the model can read, spoken replies no longer read tool-call text aloud, and stopping speech stops cleanly.
- **Downloads that recover.** Failed and app-killed downloads come back as retryable cards instead of vanishing, and queued downloads survive a restart.
- **Stopping keeps your reply.** Stop mid-stream and you keep what was written, reasoning included - no more mislabeling a stopped turn as a token-limit cutoff, and remote LM Studio and Ollama reasoning now shows in the Thinking block.

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
