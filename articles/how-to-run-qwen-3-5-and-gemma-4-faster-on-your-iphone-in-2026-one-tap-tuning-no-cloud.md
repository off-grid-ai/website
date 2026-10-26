---
layout: content
title: "How to Run Qwen 3.5 and Gemma 4 Faster on Your iPhone in 2026 (One-Tap Tuning, No Cloud)"
description: "One tap sets Metal, thread count, batch size and cache type on your iPhone to the values measured fastest for local models like Qwen 3.5 and Gemma 4."
date: "2026-10-26"
permalink: /articles/how-to-run-qwen-3-5-and-gemma-4-faster-on-your-iphone-in-2026-one-tap-tuning-no-cloud/
published_at: "2026-10-26T17:06:48.000Z"
article_topic: "Models & performance"
article_platform: "iPhone"
devto_article: true
---
You run Qwen 3.5 or Gemma 4 on your iPhone and you want replies to come faster. You do not want to learn what Metal offload, batch size or a KV cache is before you get there. Off Grid AI Mobile (OGAM) has one button for this. Tap **Use fastest settings**, and the app puts the model on the iPhone GPU with Metal and sets the thread count, batch size and cache to the values the Off Grid team measured fastest on iPhone. It takes one tap, and the model keeps running on your phone with no account and no network.

## What you need

- An iPhone that already runs a local model in OGAM. The app sorts iPhones into two groups, 8 GB of RAM or more (iPhone 15 Pro and later) and less than 8 GB. Both groups get the same tuning; RAM decides which models fit, not which settings win.
- OGAM 0.0.116 or later. The button arrived in 0.0.116 and is in the current release, 0.0.118. [Download OGAM for iPhone](/mobile/).
- A GGUF chat model downloaded and selected, such as **Qwen 3.5 2B**, **Qwen 3.5 4B** or **Gemma 4 E2B**. If you have not picked one yet, the [model picker article](/articles/how-to-pick-the-best-local-ai-model-on-your-iphone-in-2026-fast-balanced-or-best-no-cloud/) covers which size fits your phone.
- No payment. This is part of the free app.

## What the button sets on an iPhone

On phones with several accelerators, the same button races them against each other, because the winner changes from chip to chip. On an iPhone there is one accelerated backend worth running, Metal on the Apple GPU, so OGAM skips the race and writes the settings directly. You do not wait through a test.

These are the values it writes, taken from the shared settings table in the app's code:

- **Inference Backend** goes to **Metal**. If you had switched to **CPU**, this moves you back. Metal offloads every layer of the model to the GPU by default.
- **CPU Threads** goes back to Auto, which is 4 on an iPhone. The code records the measurement behind that number: on an A19 Pro (2 performance cores and 4 efficiency cores), Qwen 3.5 0.8B wrote 34 tok/s on 2 threads, 41 to 44 tok/s on 4 threads and 35 tok/s on 6 threads. The two performance cores alone left speed unused, and all six cores got in each other's way.
- **Batch Size** goes back to Auto, which is 512 on Metal.
- **Flash Attention** turns on and the **KV Cache Type** goes to q8_0. Metal runs both safely, and a q8_0 cache uses about half the memory of f16.
- **Speculative Decoding (MTP)** turns off. With MTP on, the engine reprocesses the whole prompt each turn, so the first word arrives later from your second message on.

Two more speed rules apply on every load, without the button. The app always maps the model file into memory on iPhone instead of copying it, and, when at least 1 GB of RAM is free, it keeps a small cache of earlier turns, between 64 MB and 512 MB, so a follow-up question does not reread the whole chat.

## Step 1: Select the model you chat with

1. Open OGAM and tap **Models** in the bottom bar.
2. Download or select the model you use, for example **Qwen 3.5 4B** or **Gemma 4 E2B**.

The settings apply to every GGUF model, so you only need to tap the button once. Tap it again after you change settings by hand and want the tuned values back.

## Step 2: Open Model Settings

1. Tap **Settings** in the bottom bar.
2. Tap **Model Settings** (System prompt, generation, and performance).
3. Open the **Text Generation** section.

You can also get there from a chat. Tap the sliders icon at the top right to open **Chat Settings** and open **TEXT GENERATION**. Both places change the same settings.

## Step 3: Tap Use fastest settings

1. Tap **Use fastest settings**. It is the first control in the **Text Generation** section, above **Temperature**.
2. Tap **Advanced** to see what changed. **Inference Backend** now shows **Metal**, and **CPU Threads** and **Batch Size** show Auto with the value the engine uses.

Every setting stays editable. If you change **CPU Threads** or **Batch Size** later, a reset icon appears next to it that returns it to Auto.

## Step 4: Reload the model and check the speed

1. Go back to your chat. Thread count, batch size, backend and cache type only apply when the model loads, so a bar above the message box asks you to tap to reload the model. Tap it.
2. To see the speed, turn on **Show Generation Details** in the **Text Generation** section. Each reply then shows the model, the context used and the speed in tok/s under it.

## If Metal does not start

A large model on a phone with little free memory can fail to start on the GPU. OGAM gives the Metal load 45 seconds. If it fails or hangs past that, the app loads the same model on the CPU so the chat still works. If that happens often, pick a smaller model or lower **GPU Layers (Metal)** under **Inference Backend**, which keeps part of the model on the CPU.

## What this does not do

- It does not test your phone. On iPhone the values come from the measurements in the code, not from a run on your device. Your own speed depends on the chip, the model size and how warm the phone is.
- It does not check answer quality. The settings change speed and memory use, not the model's output.
- It does not reset **GPU Layers (Metal)**. If you lowered it before, raise it yourself.
- It turns off **Speculative Decoding (MTP)**. Turn it back on if your model has an MTP head and you prefer it.
- It does not tune image generation, voice or remote models. Chats that run on a computer over Wi-Fi use that computer's settings.

## FAQ

**Is Metal or CPU faster for local AI on iPhone?**
Metal, for models that fit in memory. OGAM runs on Metal by default and the button puts you back on it. The CPU is the fallback when the GPU cannot load the model.

**How many threads should llama.cpp use on an iPhone?**
Four. On an A19 Pro, 4 threads wrote 41 to 44 tok/s with Qwen 3.5 0.8B, against 34 tok/s on 2 threads and 35 tok/s on 6. OGAM sets 4 when **CPU Threads** is on Auto.

**Does Gemma 4 work with Use fastest settings on iPhone?**
Yes. On iPhone, Gemma 4 runs as a GGUF model on the same engine as Qwen 3.5, so the same settings apply to both.

**Why did my speed not change after tapping the button?**
The new settings apply when the model loads again. Tap the reload bar above the message box in your chat, then send a message.

**Does tuning need internet?**
No. The button only changes settings on the phone. Nothing is sent anywhere.

**Is q8_0 KV cache worse than f16?**
It stores the conversation memory at 8 bits instead of 16, which halves its memory use. The app pairs it with flash attention on Metal, the combination the settings table marks as safe and fast.

## Related

- [iOS setup guide](/guides/ios-setup/)
- [Run LLMs locally on iPhone](/guides/run-llms-locally-iphone/)
- [How to Run Qwen 3.5 on Your iPhone in 2026 (Completely Offline, No Subscription)](/articles/how-to-run-qwen-3-5-on-your-iphone-in-2026-completely-offline-no-subscription/)
- [How to Run Gemma 4 on Your iPhone in 2026 (Completely Offline, No Subscription)](/articles/how-to-run-gemma-4-on-your-iphone-in-2026-completely-offline-no-subscription/)
- [How to Pick the Best Local AI Model on Your iPhone in 2026 (Fast, Balanced or Best, No Cloud)](/articles/how-to-pick-the-best-local-ai-model-on-your-iphone-in-2026-fast-balanced-or-best-no-cloud/)
