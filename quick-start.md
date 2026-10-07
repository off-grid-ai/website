---
layout: default
title: Quick Start
nav_order: 8
nav_group: Learn
description: Run your personal AI assistant on hardware you already own. Start with Off Grid AI on Android, iOS, macOS, Windows, or Linux. No account or API key.
---

# Quick Start

Run your personal AI assistant on hardware you already own. No account or API key.

---

## Step 1 - Choose your platform

**macOS, Windows, and Linux:** [Download Off Grid AI Desktop]({{ '/download/' | relative_url }}). macOS requires Apple Silicon; Windows and Linux builds are x64. See [desktop details]({{ '/desktop/' | relative_url }}).

**iOS:** [Download on the App Store](https://apps.apple.com/us/app/off-grid-local-ai/id6759299882?utm_source=offgrid-docs&utm_medium=website&utm_campaign=download) - requires iPhone 12 or newer (4GB RAM+)

**Android:** [Get it on Google Play](https://play.google.com/store/apps/details?id=ai.offgridmobile&utm_source=offgrid-docs&utm_medium=website&utm_campaign=download) - requires Android 10+, 4GB RAM+

Or download the [OGAM 0.0.111 APK from GitHub](https://github.com/off-grid-ai/OGAM/releases/download/v0.0.111/OffgridMobile-0.0.111-beta.1.apk).

---

## Step 2 - Pick a model

Choose a model that fits your memory. These options are a starting point for phones:

| You want | Start with | Size |
|---|---|---|
| Fast chat, 3–4GB RAM | Qwen 3.5 0.8B | ~0.8GB |
| Best for most phones | Qwen 3.5 2B | ~1.7GB |
| Best quality (8GB RAM) | Qwen 3.5 9B | ~5.5GB |
| Vision + reasoning | Gemma 4 E2B | ~1.5GB |
| Image generation | SD 1.5 Palettized (iOS) / Absolute Reality (Android) | ~1GB |

> **Not sure?** Pick Qwen 3.5 2B. It fits comfortably in 4GB RAM, supports 262K context, and is the best starting point for most phones.

---

## Step 3 - Download and run

Select a model, then **Download**. Keep internet connected until the download finishes.

Select **Load**, then type a message. The model runs on your device.

---

## Step 4 - Go offline (optional)

Disconnect from the internet. Your downloaded local model still works. Online tools and remote models need a connection.

---

## What's next

- [Which model should I use?]({{ '/guides/which-model' | relative_url }}) - full comparison table by device and use case
- [Connect your home Ollama server]({{ '/guides/ollama-android' | relative_url }}) - use bigger models from your desktop via LAN
- [Run Stable Diffusion on Android]({{ '/guides/stable-diffusion-android' | relative_url }}) - generate images completely on-device

---

## Community

Stuck, or want to share what you're building? [Join the Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ).

The app is open source - [view it on GitHub](https://github.com/off-grid-ai/off-grid-ai-mobile?utm_source=offgrid-docs&utm_medium=website&utm_campaign=github).
