---
layout: content
title: "How to Run Qwen 3.5 and Gemma 4 Faster on Your Android Phone in 2026 (One-Tap Tuning, No Cloud)"
description: "One tap tests your Android phone's CPU, GPU and NPU on the model you use and keeps the fastest. The test takes 30 seconds or less."
date: "2026-10-23"
permalink: /articles/how-to-run-qwen-3-5-and-gemma-4-faster-on-your-android-phone-in-2026-one-tap-tuning-no-cloud/
published_at: "2026-10-23T09:52:29.000Z"
article_topic: "Models & performance"
article_platform: "Android"
devto_article: true
---
You have Qwen 3.5 or Gemma 4 running on your Android phone and you want replies to come faster. You do not want to guess whether the CPU, the GPU or the NPU is quicker on your chip, or how many threads to set. Off Grid AI Mobile (OGAM) now does that for you. Tap **Use fastest settings**, and the app runs the model you use on each part of your phone that can run it, measures how fast each one writes, and keeps the winner. The test takes 30 seconds or less, and everything runs on the phone.

## What you need

- An Android phone with 6 GB of RAM or more for the full test. Below 6 GB the app stays on the CPU, because the GPU and NPU buffers do not fit, and the button only resets the CPU settings.
- A Snapdragon chip to compare backends. On a Snapdragon phone the app tests the **CPU**, the **NPU** (Hexagon) and the **GPU** (Adreno). On Google Tensor, Exynos and MediaTek Dimensity phones, the GPU backend is not available (it runs on Adreno only), so the app keeps the CPU and sets its threads and batch size for you.
- OGAM 0.0.116 or later. The button arrived in 0.0.116 and is in the current stable release, 0.0.117. [Download OGAM for Android](/mobile/).
- A GGUF chat model already downloaded and selected, such as **Qwen 3.5 2B**, **Qwen 3.5 4B** or **Gemma 4 E2B**.
- No account and no payment. This is part of the free app.

## What the test does

When you tap the button, OGAM unloads your chat model, then loads it on each backend your phone can run, one at a time. On each one it reads a 64-token prompt and writes 16 tokens, then records the writing speed in tokens per second. The whole run has a 30-second budget. A backend that fails to load, runs out of time, or quietly falls back to the CPU counts as failed and cannot win.

The fastest backend that ran becomes your **Inference Backend**. If none of the accelerated backends ran, you stay on the CPU, which works on every Android phone. The app also sets the rest of the speed settings to match the winner:

- **CPU Threads** and **Batch Size** go back to **Auto**. Auto threads skip your phone's efficiency cores. The code notes a measurement on a OnePlus CPH2707 where five threads ran slower than four, so a lone prime core next to a larger performance cluster is left out too.
- On the CPU, **Flash Attention** is on and the **KV Cache Type** is q8_0.
- On the NPU, batch size is 128, the value from llama.cpp's own Snapdragon guide. On the NPU and the GPU, flash attention is off and the cache is f16, because those are the settings proven safe on those backends today.
- **Speculative Decoding (MTP)** is turned off.

One more speed rule runs without any tap. On Android, when you run on the CPU or the NPU, the app downloads the Q4_0 version of a model when its repository has one, because llama.cpp repacks Q4_0 best for ARM CPUs and the NPU runs it natively.

## Step 1: Load the model you want to tune

1. Open OGAM and tap **Models** in the bottom bar.
2. Download or select the GGUF model you chat with, for example **Qwen 3.5 4B** or **Gemma 4 E2B**.
The test runs on the model that is selected now. If no model is selected, there is nothing to measure.

## Step 2: Open the speed settings

<figure>
  <img src="/assets/img/home/mobile/settings-1-light-640.webp" alt="Off Grid AI Mobile Settings tab on Android, with Model Settings as the first item." width="280" loading="lazy" />
  <figcaption>The Settings tab on Android. Model Settings is the first item.</figcaption>
</figure>

1. Tap **Settings** in the bottom bar.
2. Tap **Model Settings** (System prompt, generation, and performance).
3. Open the **Text Generation** section.
4. Tap **Advanced** to show the speed controls.

You can also do this from inside a chat. Tap the sliders icon at the top right to open **Chat Settings**, open **TEXT GENERATION**, and tap **Advanced**. Both places change the same settings.

## Step 3: Tap Use fastest settings

1. Tap **Use fastest settings**. It is the first control under the advanced sliders, above **CPU Threads**.
2. The button changes to **Measuring... Cancel** while the test runs. Keep the app open.
3. When the button reads **Use fastest settings** again, the test is done.
4. Look at **Inference Backend** below it. The selected option, **CPU**, **GPU** or **NPU (Beta)**, is the one that measured fastest on your phone.

If you tap **Measuring... Cancel**, nothing is written and your settings stay as they were.

## Step 4: Check the speed on a real reply

1. Go back to your chat and send a message. The model loads again on the new backend.
2. To see the speed, turn on **Show Generation Details** in the same **Text Generation** section. Each reply then shows the model, the context used and the speed under it.

Run the test again after you switch to a different model. A backend that wins for Qwen 3.5 may not win for Gemma 4 on the same phone.

## Gemma 4 on LiteRT

OGAM also offers Gemma 4 E2B and E4B in Google's LiteRT format, listed as **Gemma 4 LiteRT** on the Models screen. These models use a different engine, so the **Use fastest settings** button does not appear for them. Under **Advanced** you get an **Acceleration** switch with **GPU** and **CPU** instead. Since 0.0.117, a LiteRT model on the GPU loads faster after the first time, and if a GPU model fails to load, the app moves it to the CPU after one try instead of retrying in a loop.

## What this does not do

- It does not check answer quality, only speed. The **NPU (Beta)** option itself warns that some models, Gemma among them, can fall back to the CPU or produce invalid output there. If replies look wrong after the test picks the NPU, set **Inference Backend** to **GPU** or **CPU**. If the NPU does not start at all, the app runs the model on the CPU.
- It does not run on its own. The test runs only when you tap the button, and every setting stays editable afterwards. Tap the reset icon next to **CPU Threads** or **Batch Size** to return either one to Auto later.
- It turns off **Speculative Decoding (MTP)**. With MTP on, llama.rn reprocesses the whole prompt each turn, so the first word gets slower from the second message on. Turn it back on yourself if your model has an MTP head and you prefer it.
- It does not test image generation or speech models. Those have their own settings.
- It does not apply to remote servers. Chats that run on a computer over Wi-Fi use that computer's settings.

## FAQ

**Is the GPU or the NPU faster for local AI on Android?**
It depends on the chip and the model, which is why OGAM measures it instead of guessing. On a Snapdragon phone with 6 GB or more, the app tests the CPU, the Hexagon NPU and the Adreno GPU on your model and keeps the one that writes fastest.

**Why does my Pixel or Samsung Exynos phone stay on the CPU?**
The GPU backend in llama.rn runs on Qualcomm Adreno GPUs only, not Mali, and the NPU backend needs a Snapdragon Hexagon NPU. On those phones the app tunes CPU threads and batch size instead.

**How long does Use fastest settings take?**
30 seconds or less. A backend that has not finished when the budget runs out counts as failed, and you can cancel at any time.

**How many CPU threads should I use for llama.cpp on Android?**
Leave **CPU Threads** on Auto. OGAM counts your performance cores and skips efficiency cores, and on phones with one prime core beside a larger performance cluster it leaves the prime core out, because more threads measured slower there.

**Does tuning need internet?**
No. The test loads and runs the model you already downloaded, on the phone. Nothing is sent anywhere.

**Do I need to run it again after an app update?**
Run it again when you change models or update the app. Each run replaces the last result.

## Related

- [Android setup guide](/guides/android-setup/)
- [Run LLMs locally on Android](/guides/run-llms-locally-android/)
- [How to Run Qwen 3.5 on Your Android Phone in 2026 (Locally, No Cloud)](/articles/how-to-run-qwen-3-5-on-your-android-phone-in-2026-locally-no-cloud/)
- [How to Run Gemma 4 on Your Android Phone in 2026 (Locally, No Cloud)](/articles/how-to-run-gemma-4-on-your-android-phone-in-2026-locally-no-cloud/)
- [How to Run Local AI on Your Android Phone's NPU in 2026 (Supported Devices)](/articles/how-to-run-local-ai-on-your-android-phones-npu-in-2026-supported-devices/)
