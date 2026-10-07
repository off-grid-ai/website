---
layout: content
title: "How to Switch Between Local and Remote LLMs on Your Phone (Without Two Apps or Two Workflows)"
description: "There are two ways to run AI on your phone in 2026. Both are good. But until now, you had to pick..."
date: "2026-03-18"
permalink: /articles/how-to-switch-between-local-and-remote-llms-on-your-phone-without-two-apps-or-two-workflows/
published_at: "2026-03-18T17:59:31.631Z"
article_topic: "Work & organization"
article_platform: "Phone"
devto_article: true
devto_id: 3368606
devto_url: "https://dev.to/alichherawalla/how-to-switch-between-local-and-remote-llms-on-your-phone-without-two-apps-or-two-workflows-1o9l"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fjuwnry3xuktegsex68xp.png"
---
There are two ways to run AI on your phone in 2026. Both are good. But until now, you had to pick one.

Option one: run a small model directly on your phone. Completely offline, completely private, works on airplane mode. The tradeoff is that a 3B model running on mobile hardware cannot match a 9B or 70B model running on a desktop GPU. You get privacy and portability, but you give up depth.

Option two: connect to a model running on your PC. Something like Ollama or LM Studio serving Qwen 3.5 9B on your Mac. The quality is dramatically better. But you need to be on the same network as your computer. Step outside, lose WiFi, and you lose your AI.

The thing nobody has built until now is a single app that does both and switches between them intelligently. That is what we built into [Off Grid](https://github.com/alichherawalla/off-grid-mobile-ai).

<div style="width: 100%;">
  <img width="320" alt="Off Grid on a phone using a model served from a desktop on the same network" src="/assets/img/home/mobile/remote-1-light-640.webp" />
</div>

## The problem with picking one

If you only run on-device models, you hit a ceiling. Qwen 3.5 2B on your phone is useful for quick answers, summarization, and simple tasks. But ask it to analyze a long document, write a nuanced email, or debug a complex function, and you feel the gap. The model is doing its best with 2 billion parameters and 6GB of RAM. It is impressive that it works at all. But "impressive for the hardware" and "actually good enough" are different things.

If you only connect to a remote server, you are tethered. You have AI at your desk but not on the train, not at the coffee shop, not on a walk. And if your remote setup goes down - your Mac sleeps, your WiFi drops, your power goes out - you have nothing.

Most people who care about local AI end up with two apps. One for on-device, one for remote. Two chat histories. Two interfaces. Two sets of settings. It is clunky, and nobody sticks with it.

## How Off Grid handles it

Off Grid runs both local and remote models in the same app. Your conversation history is unified. Your interface is the same. The only thing that changes is where the computation happens.

Here is how the pieces fit together:

**On-device models** load directly into your phone's memory. Text generation runs through llama.cpp with GPU acceleration - Metal on iPhone, OpenCL on Android. These models work with zero network connectivity. Airplane mode, underground, middle of nowhere - does not matter.

**Remote models** connect to any OpenAI-compatible server on your local network. Ollama, LM Studio, LocalAI. Off Grid auto-discovers servers and pulls their model lists. Responses stream over your WiFi.

**You pick which model to use, and you can switch mid-conversation.** Starting a conversation about something sensitive? Use the on-device model. Nothing leaves your phone. Need to analyze a 50-page PDF? Switch to the 9B model on your Mac - in the same chat. The context carries over. You are not starting from scratch every time you change models.

Off Grid also supports projects with a built-in knowledge base and RAG. Attach your documents and any model - local or remote - can search through them. Tool calling works too: models that support function calling can chain together web search, calculator, date/time, and device info. All private, all on your own hardware.

You paid for this hardware. It is on your network. You should be able to use all of it.

## Setting it up

### On-device (works everywhere, no server needed)

1. Open Off Grid
2. Go to the Models tab
3. Pick a model that fits your phone's RAM (the app filters by your hardware)
4. Download it
5. Start chatting

For phones with 6GB RAM: Qwen 3.5 0.8B or SmolLM3 360M. Fast, lightweight, good for quick tasks.

For phones with 8GB+ RAM: Qwen 3.5 2B or Phi-4 Mini. Noticeably better quality. This is where on-device AI starts feeling genuinely useful.

### Remote (needs a server on your network)

1. Start Ollama or LM Studio on your PC/Mac
2. For Ollama: `OLLAMA_HOST=0.0.0.0 ollama serve`
3. For LM Studio: Developer tab, start server, check "Serve on Local Network"
4. Open Off Grid, go to Remote Models, tap "Scan Network"
5. Your server's models appear automatically

I recommend Qwen 3.5 9B as the remote model if your machine has 16GB+ RAM. It was released in March 2026 and the benchmarks are staggering - it outperforms OpenAI's GPT-OSS-120B on reasoning, language understanding, and visual tasks while being 13 times smaller. On a Mac with Apple Silicon, it runs at 30-50 tokens per second. That is fast enough that the network latency is the bottleneck, not the model.

### Using both

Once you have models set up on both sides, you switch between them the same way you switch conversations. Tap the model selector, pick local or remote, keep going. There is no separate mode, no different screen, no restart required.

The practical workflow looks like this:

**Morning commute (no WiFi):** On-device Qwen 3.5 2B handles your quick questions, drafts, and brainstorming. Everything runs on the phone. Nothing touches the network.

**At home:** You open the same app, switch to Qwen 3.5 9B running on your Mac, and tackle the heavy stuff. Long document review. Complex writing. Code analysis. The quality jump is immediate and obvious.

**At a coffee shop (WiFi but not your network):** Back to on-device. Or, if you have set up a VPN to your home network, the remote models are still available. Off Grid does not care how you get on the network - it just looks for servers.

**Late night, phone in bed:** Your Mac in the office is still running Qwen 3.5 9B. You are using it from your phone with the same ease as if you were sitting at the keyboard. No cloud. No subscription. Just your own hardware, talking to itself.

## Why this matters more than convenience

The standard pitch for local AI is privacy. And yes, that matters. But the deeper thing is independence.

Cloud AI is a subscription you pay forever for access to someone else's computer. When they change their pricing, you pay more. When they change their model, your workflows break. When they change their terms of service, your data is governed by rules you did not write.

Local AI is yours. The model is a file on your hard drive. The compute is your hardware. The data never leaves your house. And with Qwen 3.5 9B running on hardware that most people already own, the quality gap between "your AI" and "their AI" is closing fast.

Off Grid's hybrid approach means you do not have to make a philosophical commitment to get practical value. Use cloud AI when you need it. Use local AI when it is good enough. Use remote AI on your network when you want the best of both worlds. The point is having the choice, and making the switching cost zero.

## What is coming next

We are building toward a personal AI operating system. Something that uses every piece of compute available to you - your phone, your laptop, your desktop, a server in your closet - and orchestrates them into a single, private, intelligent system.

Network discovery was the first step. On-device inference was the foundation. The next pieces are seamless handoff between local and remote models mid-conversation, automatic routing based on task complexity, and shared context across devices.

If you want to shape what this looks like, we are building it in the open. The code is open and the community is active.

[Join the Off Grid Slack](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3q7kj5gr6-rVzx5gl5LKPQh4mUE2CCvA) - feature requests, model recommendations, and conversations about what a personal AI OS should actually do. Or just star the [GitHub repo](https://github.com/alichherawalla/off-grid-mobile-ai) and follow along.

## Try it

- [GitHub (1,000+ stars, 10,000+ downloads in 4 weeks)](https://github.com/alichherawalla/off-grid-mobile-ai)
- Android: [GitHub Releases](https://github.com/alichherawalla/off-grid-mobile/releases)
- iOS: App Store (search "Off Grid AI")

Download Off Grid, set up a model on your phone, set up a model on your Mac, and you have a private AI system that works everywhere you go and scales up when you are home.

No new hardware to buy. No subscriptions to maintain. No data leaving your house. Just the devices you already own, working together.

---

*Off Grid is built by the team at [Wednesday Solutions](https://www.wednesday.is/servicing/launch?utm_source=dev.to), a product engineering company with a [4.8/5.0 rating on Clutch across 23 reviews](https://clutch.co/profile/wednesday-solutions?sort_by=date_desc&utm_source=dev.to#reviews). We build products for founders and enterprises - Off Grid is what we build for ourselves.*
