---
layout: default
title: "Have you ever hesitated before typing something into ChatGPT or Claude? I did, and so I built Off Grid"
description: "The full story of building Off Grid — a FOSS app that runs AI entirely on your phone, offline, with..."
date: "2026-02-20"
permalink: /articles/have-you-ever-hesitated-before-typing-something-into-chatgpt-or-claude-i-did-and-so-i-built-off-grid/
published_at: "2026-02-20T08:00:40.022Z"
article_topic: "Getting started"
article_platform: "Any device"
devto_article: true
devto_id: 3270154
devto_url: "https://dev.to/alichherawalla/from-personal-frustration-to-1-on-hacker-news-how-i-built-off-grid-and-hit-425-stars-4989"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Feymc8deyq4u042n49dup.png"
---
The full story of building Off Grid — a FOSS app that runs AI entirely on your phone, offline, with zero data leaving your device. Privacy isn't a feature. It's the whole point.

I want to start with a confession.

I use AI every single day. For writing, for code, for thinking through problems I'm stuck on. I'm genuinely dependent on it — and for a while, that dependence was quietly eating at me.

Every conversation I had with an AI was a conversation I was having *on someone else's server*. My thoughts, my drafts, my questions, my half-baked ideas — all of it flowing out of my device and into infrastructure I don't control, owned by companies whose terms of service I've definitely never read in full.

That bothered me more and more. So I built [Off Grid](https://github.com/alichherawalla/off-grid-mobile).

This is the story of how it went from a personal itch to #1 trending on Hacker News, 150k+ Reddit views, and 425 GitHub stars — and what the journey of actually shipping it looked like, commit by commit.

![Trending on HN](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/25no14mpusf894f2j4bm.png)

![Github Stars have been pouring in](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/keb62gfrbovcve7n8k3o.png)



---

## why this? why now?

Most people don't think about this, but **your phone is insanely powerful**.

The GPU in a flagship Android or iPhone today is more capable than most laptops from 2018. It sits there mostly idle while you pay $20/month subscriptions to run computations on a server farm in Virginia — computations your device could handle itself.

So the "why" wasn't really technical. It was emotional.

**Why give away your data to run AI?**
Because there's no alternative that works offline, right?

**Why does there have to be no alternative?**
Because nobody's built one that's actually usable.

**Why hasn't anyone built one?**
Because it's genuinely hard — hardware acceleration, model compatibility, native modules across two platforms, image generation pipelines. Lots of moving parts.

**Why does that mean I shouldn't try?**
...It doesn't.

That's the whole origin of [Off Grid](https://github.com/alichherawalla/off-grid-mobile). A few "why nots" stacked on top of each other.

---

## v0.0.1. ugly. honest.

The early commits tell the real story. The repo started life as `offline-mobile-llm-manager` — a name that tells you everything about where my head was at. Functional. Descriptive. Zero soul.

The first working version did one thing: let you download a GGUF model from HuggingFace and chat with it locally. That's it. No vision. No image generation. No voice. The UI was rough. The logo didn't exist yet. The brand name was still being figured out.

But it ran inference on-device. No network call. Airplane mode, working AI.

That felt *genuinely* magical the first time it worked.

---

## the name changed. so did everything else.

Somewhere along the way the name shifted from `offline-mobile-llm-manager` to **Off Grid**. That wasn't just a branding choice — it reframed the entire product.

"Offline LLM manager" describes what the app does mechanically. "Off Grid" describes how it makes you *feel* and why you'd want it.

Off grid means independent. Self-sufficient. Not reliant on infrastructure you don't own. It speaks to the survivalist in the developer who's tired of API rate limits. The privacy-conscious person who journals in AI but doesn't love the idea of that journal living on a server. The person traveling internationally who still wants to think alongside an AI when the plane hits 35,000 feet.

The name change came with a logo change too. The initial icon was utilitarian. The final logo — a clean, minimal mark — communicated something different: this is a product with a point of view, not just a utility.

---

## what's actually inside this thing.

Let me walk you through what "fully offline AI on mobile" actually requires, because it's not trivial.

**Text generation** runs through llama.cpp via llama.rn native bindings. Any GGUF model, streaming inference, 15-30 tokens per second on a flagship device. On Android, OpenCL GPU offloading on Qualcomm Adreno. On iOS, Metal. The first time I saw a response streaming at that speed on a phone with airplane mode on, I had to double-check that the network was actually off.

**Image generation** was a different beast entirely. Android and iOS have completely different acceleration architectures for this. On Android, there's the MNN backend (CPU, works everywhere) and the QNN backend (NPU acceleration, Snapdragon 8 Gen 1+). On iOS, it's Apple's Core ML pipeline with Neural Engine support. Getting both to work, with proper fallback logic, and a shared React Native interface on top — that took a lot of iteration. The commits in the image generation area reflect that: you can watch the approach shift from one architecture to another as I figured out what actually worked.

Early versions used one approach to image generation. Then a better option emerged. Then the iOS parity work required revisiting the whole pipeline. The commit history is honest about this — it's not a clean linear progression. It's a series of real-world discoveries.

**Voice transcription** uses Whisper.cpp via whisper.rn. Multiple model sizes, real-time partial results, hold-to-record. All on-device.

**Vision AI** — the ability to send an image and ask questions about it — required handling multimodal projector files (mmproj) alongside the base model. Vision models are actually two files: the main GGUF and a companion mmproj. Getting download tracking, size estimation, and runtime loading right for both took a dedicated effort.

The design system evolved significantly too. The final UI is a terminal-inspired brutalist aesthetic — full light/dark theming, Menlo monospace throughout, emerald accent, staggered animations, spring-based press feedback. The early commits show something much more generic. The design got progressively more opinionated as the app found its identity.

---

## 6am. posted. went to sleep.

I posted "Show HN: Off Grid – Run AI text, image gen, vision offline on your phone" at 6am.

I'd been up all night. Not in a romantic, inspired way — in a "one more thing to fix, one more edge case, one more README pass" way. The kind of night where you keep telling yourself you'll sleep after this commit, and then there's another commit, and then it's 5:45am and you figure you might as well just ship it.

So I posted it. Half-delirious. Went to bed thinking almost nothing would happen — HN is a lottery, most Show HNs get 3 upvotes and a polite comment, and I hadn't told anyone it was going up. No coordinated push, no audience warming, no launch playbook. Just a post at 6am from someone who'd been up all night putting in the reps.

I woke up at 8:30.

150+ GitHub stars. The thread was alive. Comments pouring in — technical questions, encouragement, people digging through the repo. And the most beautiful thing: **the community was helping each other find installation details I hadn't made clear enough.**

Someone couldn't find the GitHub Releases link — it was broken because of a missing dash in `off-grid`. Before I even saw it, another user in the thread had already found the correct URL and posted it. Someone else had questions about iOS sideloading. A different commenter linked them directly to the architecture docs. People were filling in my gaps *for* me, in real time, because they wanted the thing to work.

That moment — waking up to a community that had already started taking care of each other around something I built — is one I won't forget.

One comment that captured the whole spirit of it:

> "The privacy angle is the real killer feature here. There are so many use cases — journaling, health tracking, sensitive work notes — where people self-censor because they know it's going to a server somewhere. Removing that barrier entirely changes what people are willing to use AI for."

That's exactly it. That's the "so what."

It's not just that your data stays private. It's that **knowing** your data stays private changes how you use the tool. You stop self-censoring. You actually use AI for the things you most need to think through — the sensitive ones, the personal ones, the professionally confidential ones. The barrier between "things I'll ask an AI" and "things I'll only ask myself" collapses.

The Reddit communities lit up in the same way. r/LocalLLaMA and r/Chatbots — the same pattern: people who'd been frustrated by the same thing I was frustrated by, finding something that addressed it.

The most common sentiment wasn't "cool tech demo." It was "I've been waiting for this."

---

## bugs found. bugs killed.

The HN launch also revealed bugs I hadn't caught. Within the same day I was pushing fixes.

Samsung Galaxy users couldn't see what they were typing — the keyboard was covering the chat input. That was a real usability failure. Fixed same day, new release pushed.

The GitHub releases link had a missing dash in `off-grid`. A user caught it in the comments. Fixed immediately.

Build documentation didn't match the actual gradle file. Someone spotted the version mismatch between what the README said and what `build.gradle` contained. Fixed.

This is what real open-source looks like. You post it, people use it, they find the edges you didn't reach, and you fix them fast. The version numbers in the release history (v0.0.26 to v0.0.51 in a matter of weeks) tell that story.

Recent commits add markdown rendering during streaming, edge-to-edge display support for Android API 35+, improved image model filters, a Google Play Store listing, and a comprehensive test suite. The app being built in public means every improvement is visible and verifiable.

---

## why it actually matters.

Here's the thing about AI tools and privacy that doesn't get said enough.

You probably use AI to help you think. And the things you most need help thinking about are often the things you're least willing to share with a corporation. Medical questions you're embarrassed to Google. Business ideas you don't want scraped into training data. Personal writing you need to work through.

The current state of AI assistants asks you to trade privacy for capability. Every time you get a useful answer, you've contributed to a dataset. Every conversation is potentially training data, potentially reviewed, potentially used in ways you didn't consent to because the privacy policy is 47 pages long.

Off Grid removes that tradeoff. You get the capability without surrendering the privacy.

And for certain use cases — healthcare, legal, finance, journalism, personal journaling, code containing proprietary business logic — that's not a nice-to-have. It's the whole point.

The phrase that captures it best came from the HN submission itself: *"just because you'd rather not have your journal entries sitting in someone's training data."*

That's for you. Not for a threat model. Not for a paranoid edge case. Just for the ordinary human desire to have thoughts that are yours.

---

## what's next.

Off Grid is on the [Google Play Store](https://play.google.com/store/apps/details?id=ai.offgridmobile). The iOS App Store release is on its way. There's a growing list of models in the recommended section — curated by device RAM so you're not accidentally trying to load a 7B model on a 6GB phone.

The issues tracker has a community actively filing bugs and suggesting features. The F-Droid question came up in the HN thread — that's still open. The build-from-source requirements F-Droid mandates are non-trivial, but the demand is clearly there.

The 425 stars aren't the point. The people who said "I've been waiting for this" are the point.

If you've been paying monthly to think in AI — and quietly wishing your thoughts could stay yours — [Off Grid is free, open-source, and on your device](https://github.com/alichherawalla/off-grid-mobile).

Your AI. Your device. Your data.

---

*Built with React Native, llama.cpp, whisper.cpp, Stable Diffusion, and a genuine frustration with the status quo. Contributions welcome.*
