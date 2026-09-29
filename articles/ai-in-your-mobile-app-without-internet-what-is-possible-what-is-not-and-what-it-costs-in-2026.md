---
layout: default
title: "AI in Your Mobile App Without Internet: What Is Possible, What Is Not, and What It Costs in 2026"
description: "A plain-language guide to what on-device AI can do today, what it cannot, and what each capability costs to add."
date: "2026-04-26"
permalink: /articles/ai-in-your-mobile-app-without-internet-what-is-possible-what-is-not-and-what-it-costs-in-2026/
published_at: "2026-04-26T07:44:47.790Z"
article_topic: "Getting started"
article_platform: "Phone"
devto_article: true
devto_id: 3552250
devto_url: "https://dev.to/alichherawalla/ai-in-your-mobile-app-without-internet-what-is-possible-what-is-not-and-what-it-costs-in-2026-1i8p"
---
A 7B parameter AI model fits on any device with 6GB of RAM shipped in the last three years. That covers the iPhone 15 Pro, the Samsung S24+, and the Pixel 8 Pro — all of which are in your users' pockets right now. What that model can do without touching the internet is the question most enterprise buyers have never gotten a straight answer to.

This guide answers it in plain language: what is working on-device today, what is not, what hardware it requires, and what it costs to add each capability to your app.

> **Key findings**
> A 7B parameter model fits on any flagship device with 6GB+ RAM — iPhone 15 Pro, Samsung S24+, Pixel 8 Pro. A 3B model fits on 4GB devices, covering most 2022+ flagships.
>   Voice transcription (Whisper) works on any device from 2020 onward. Image generation requires NPU acceleration: Apple A15+ or Snapdragon 8 Gen 1+.
>   What does not work on-device: real-time knowledge, models above 7B parameters, reliable support for rare languages.
>   Wednesday's Off Grid ships text AI, voice transcription, image generation, and vision analysis simultaneously on iOS and Android — the reference for what is achievable today.

## What on-device AI actually means

On-device AI means the model runs on the phone or tablet. No internet connection is needed during inference. The user types a query, the device processes it using its own chip, and the response appears — all without any data leaving the device.

The model is installed on the device, either bundled with the app or downloaded to local storage on first launch. Once installed, it works offline indefinitely. Updates to the model come through app updates or background downloads, but day-to-day use requires no connectivity.

This is different from a cloud AI feature that "feels" fast because it has a low-latency API. Even a 100ms cloud AI response requires an internet connection and transmits user data to a remote server. On-device AI needs neither.

The practical implication for enterprise apps: on-device AI works in hospitals where phones are in airplane mode, on job sites with no cellular coverage, in areas with unreliable connectivity, and in any situation where sending data to a server is prohibited by policy.

## What works on-device today

Six categories of AI capability run reliably on-device on current enterprise hardware.

**Text generation and summarisation (up to 7B parameters).** A 7B parameter language model handles text summarisation, question answering, document analysis, writing assistance, and conversational interfaces. The output quality matches cloud AI for most enterprise use cases. Wednesday's Off Grid ships 3B and 7B models; the 7B model produces output that users frequently cannot distinguish from a cloud API.

**Voice transcription.** OpenAI's Whisper model transcribes speech to text entirely on-device with accuracy equivalent to cloud transcription services. It runs on any device from 2020 onward. Battery impact during active transcription is under 3% per hour. Supported languages: English, Spanish, French, German, and 35 other commonly spoken languages.

**Image classification.** Identifying what is in a photo — object category, scene type, product identification — runs on-device with classification accuracy above 90% on standard categories. Inference time is under 200ms on NPU-equipped devices. Useful for field inspection apps, inventory apps, and any workflow where users photograph physical objects.

**Object detection.** Locating and labelling multiple objects within a single image, including their position. Runs on-device at 15-30 frames per second on NPU-equipped devices. Useful for assembly line inspection, safety compliance documentation, and augmented reality overlays.

**Document Q&A.** Asking questions about a PDF or document and receiving a specific answer. A 3B parameter model with retrieval-augmented generation handles documents up to approximately 50 pages without cloud processing. Useful for policy lookup, contract review, and field procedure reference.

**Image generation.** Generating images from text descriptions runs on-device on NPU-equipped devices (Apple A15+, Snapdragon 8 Gen 1+). Inference time for a 512x512 image is 15-45 seconds on current hardware. Off Grid ships image generation on-device for both iOS and Android.

## What does not work on-device today

Three categories of capability have real limitations on current hardware that make on-device AI the wrong architecture.

**Real-time knowledge.** An on-device model knows nothing beyond its training data cutoff. It cannot look up current prices, recent news, live inventory, or any information that changes after the model was trained. Cloud AI features that use retrieval-augmented generation against live data sources cannot be replicated on-device without an internet connection. For apps that require current information, cloud AI is the correct architecture.

**Models above 7B parameters.** Current flagship devices support models up to approximately 7B parameters at practical inference speeds. Larger models (13B, 70B, and above) produce higher-quality outputs for complex reasoning tasks but do not fit in device RAM or run at usable inference speeds on current hardware. If your use case requires complex multi-step reasoning, nuanced writing, or advanced code generation, a 7B model may not meet the quality bar. Cloud AI may be necessary.

**Reliable rare language support.** Current small on-device models are trained primarily on English and major European languages. Support for Arabic, Hindi, Japanese, Korean, and other languages has improved significantly but is not yet equivalent to cloud models in output quality. For enterprise apps serving multilingual user bases, language-specific evaluation is required before committing to on-device AI for text generation.

## Device requirements by capability

Not all on-device AI works on all devices. The table below shows the minimum device specifications for each capability category, based on Wednesday's production testing data across Off Grid deployments.

| Capability | Minimum device | RAM requirement | NPU required? |
|---|---|---|---|
| Text generation (3B model) | iPhone 12 / Samsung S21 | 4GB | Recommended, not required |
| Text generation (7B model) | iPhone 15 Pro / Samsung S24+ | 6GB | Required for acceptable speed |
| Voice transcription (Whisper) | iPhone X / any 2020+ Android | 2GB | No — CPU sufficient |
| Image classification | iPhone X / any 2019+ Android | 2GB | Recommended |
| Object detection | iPhone X / any 2019+ Android | 2GB | Recommended |
| Document Q&A (3B model) | iPhone 12 / Samsung S21 | 4GB | Recommended |
| Image generation | iPhone 13 Pro / Samsung S22+ | 6GB | Required |

The practical implication for enterprise deployment: before committing to an on-device AI feature, profile your actual user base's device mix. If 40% of your users are on three-year-old devices with 4GB RAM, a 7B model will not serve them. A 3B model or voice transcription will.

## Cost to add each capability

The following cost ranges are based on Wednesday's delivery data across enterprise mobile engagements. They assume an existing production app on iOS and Android and include model integration, device compatibility testing, RAM management, background state architecture, and App Store submission preparation.

| Capability | Estimated engagement time | Complexity notes |
|---|---|---|
| Voice transcription (both platforms) | 4-6 weeks | Low complexity; Whisper is well-documented |
| Image classification (both platforms) | 3-5 weeks | Low complexity; mature model ecosystem |
| Object detection (both platforms) | 5-7 weeks | Moderate; requires bounding box UI |
| Text generation — 3B model (both platforms) | 8-12 weeks | High; RAM management, chipset variants |
| Text generation — 7B model (both platforms) | 10-14 weeks | High; device compatibility matrix is narrower |
| Document Q&A (both platforms) | 8-12 weeks | High; retrieval system plus model |
| Image generation (both platforms) | 12-16 weeks | Very high; NPU requirement and long inference time |
| Full multi-capability suite | 16-24 weeks | Very high; Off Grid is the reference |

These ranges assume a vendor who has shipped on-device AI in production. A vendor shipping on-device AI for the first time should add 4-8 weeks to each range for problem discovery time.

## The Off Grid reference point

Wednesday's Off Grid app ships all six capability categories simultaneously on iOS and Android. Text generation (3B and 7B), voice transcription, image classification, object detection, document Q&A, and image generation — all running on-device, offline, with no telemetry.

50,000+ users have downloaded Off Grid. The GitHub page is public and has 1,700+ stars. The implementation handles Metal abort() on 4GB iPhones, chipset-specific QNN variants on Android, and background generation state across all capabilities.

Off Grid is not a demonstration. It is a production application that Wednesday built to validate what on-device AI requires at production quality. Every enterprise on-device AI engagement Wednesday takes on starts from the architecture Off Grid validated.

> *Read more case studies at [mobile.wednesday.is/work](https://mobile.wednesday.is/work)*

## How to decide what to build

The decision framework for on-device AI is three questions.

**Does your use case require features that only work with internet connectivity?** Real-time data, rare languages, or complex reasoning above a 7B parameter quality bar all require cloud AI. If your answer is yes for the primary use case, on-device AI may be a supplement but not the core architecture.

**Does your compliance or privacy context make cloud AI complicated?** If your users' inputs contain sensitive data — patient information, financial records, privileged communications — cloud AI creates compliance overhead that on-device AI avoids entirely. If the answer is yes, on-device AI is worth the implementation complexity.

**What is your users' device mix?** If your user base has significant numbers on 4GB RAM devices and the use case requires a 7B parameter model, the feature will not be available to those users. Profiling your actual user base before scoping determines whether on-device AI can serve enough of your users to justify the build.

Wednesday's pre-scope process covers all three questions for your specific app, compliance context, and user base before a line of code is written.

---

*Originally published at [https://mobile.wednesday.is/writing/ai-mobile-app-without-internet-possible-cost-2026](https://mobile.wednesday.is/writing/ai-mobile-app-without-internet-possible-cost-2026)*
