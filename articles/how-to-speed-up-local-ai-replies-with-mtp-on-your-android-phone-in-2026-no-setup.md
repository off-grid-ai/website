---
layout: content
title: "How to Speed Up Local AI Replies With MTP on Your Android Phone in 2026 (No Setup)"
description: "Turn on MTP in Off Grid AI Mobile and models like Gemma 4 draft ahead and check their own words, so the same answer arrives with less waiting."
date: "2026-10-25"
permalink: /articles/how-to-speed-up-local-ai-replies-with-mtp-on-your-android-phone-in-2026-no-setup/
published_at: "2026-10-25T12:52:03Z"
article_topic: "Models & performance"
article_platform: "Android"
devto_article: true
devto_id: 4915348
devto_url: "https://dev.to/alichherawalla/how-to-speed-up-local-ai-replies-with-mtp-on-your-android-phone-in-2026-no-setup-486b"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto/https%3A%2F%2Fgetoffgridai.co%2Fassets%2Fimg%2Fhome%2Fmobile%2Fsettings-1-light-640.webp"
---
You run a local model on your Android phone and the reply crawls out word by word. You would like the same answer sooner, without swapping to a smaller model and without reading about draft models. Off Grid AI Mobile (OGAM) now supports MTP, multi-token prediction. A model built for it guesses several words ahead, checks them in one pass, and keeps the ones it would have written anyway. You turn it on with one switch. If the model needs an extra file for it, the app downloads that file for you.

## What you need

- An Android phone with enough RAM for the model you use. **Gemma 4 E4B**, the smallest catalog model with a published MTP head, lists 6 GB of RAM as its minimum. **Gemma 4 12B** lists 12 GB.
- OGAM 0.0.116 or later. 0.0.116 added the automatic MTP head download behind the switch. The current release, 0.0.118, also downloads the head together with the model on one progress bar. [Download OGAM for Android](/mobile/).
- A GGUF chat model that runs on llama.cpp. MTP does not apply to the **Gemma 4 LiteRT** models, which use Google's LiteRT engine.
- No account and no payment. MTP is part of the free app.

## How MTP makes replies faster

A normal model writes one token per pass through its weights. A model with MTP layers drafts a few tokens at once, then verifies all of them in a single pass. Every token that passes the check is exactly the token the model would have produced on its own, so the answer does not change. You only wait through fewer passes.

Some models carry these draft layers inside their own GGUF file. Others have them published as a separate small file called an MTP head. OGAM's catalog knows the published heads for **Gemma 4 E4B** (about 99 MB), **Gemma 4 12B** (about 465 MB) and **Qwen 3.8 27B** (about 1.37 GB), and matches each head to its model whatever quantization you download. On an Android phone, Gemma 4 E4B is the one most people can run. Gemma 4 12B needs a 12 GB phone, and Qwen 3.8 27B lists 32 GB.

## Step 1: Find a model with the MTP badge

1. Open OGAM and tap **Models** in the bottom bar.
2. Look for the **MTP** badge, with a fast-forward icon, at the start of the badge row on a model card. It means the model has a published MTP head and replies faster with MTP on. A screen reader reads it as "MTP: replies faster".
3. Tap the model to download it. In 0.0.118 one tap downloads the model, its vision file and its MTP head on one progress bar. For Gemma 4 E4B that is the 4.98 GB model, the 0.99 GB vision file and the 99 MB head.

The same badge shows in the model sheet inside a chat, so you can check the model you are on without leaving the conversation.

If you downloaded the model before 0.0.118, or the head download failed, you do not need to download the model again. The next time the model loads, the app fetches the missing head in the background. That load runs without MTP, and the load after it uses the head.

## Step 2: Turn on Speculative Decoding (MTP)

<figure>
  <img src="/assets/img/home/mobile/settings-1-light-640.webp" alt="Off Grid AI Mobile Settings tab on Android, with Model Settings as the first item." width="280" loading="lazy" />
  <figcaption>The Settings tab on Android. Model Settings is the first item.</figcaption>
</figure>

1. Tap **Settings** in the bottom bar.
2. Tap **Model Settings** (System prompt, generation, and performance).
3. Open the **Text Generation** section.
4. Tap **Advanced**.
5. Find **Speculative Decoding (MTP)** and tap **On**.

You can do the same from inside a chat. Tap the sliders icon at the top right, open **TEXT GENERATION**, tap **Advanced** and set **Speculative Decoding (MTP)** to **On**. Both places change the same setting.

If the selected model has a published head that is not on the phone yet, the download starts as soon as you tap **On**. The progress shows under the switch as **Getting MTP head...** with a percentage. If it fails, a retry icon appears in its place. Tap it once to try again.

## Step 3: Reload the model and chat

MTP is set when llama.cpp builds the model in memory, so it takes effect on the next load. The setting says **Requires model reload**. Go back to your chat. A banner with a warning icon says the settings changed and offers to reload the model. Tap it, wait for the model to load, and send a message. Changing **Draft Tokens** later shows the same banner.

To see the speed, turn on **Show Generation Details** in the same **Text Generation** section. Each reply then shows its speed in tokens per second, so you can compare it with MTP off.

## The in-chat suggestion

When the model file you use carries its own MTP layers, OGAM tells you in the chat instead of waiting for you to find the setting. A card reads **This model can reply faster**, says the model drafts several tokens at once and checks them in one pass, and offers **Turn on speculative decoding and reload the model**. Tap it and the app turns MTP on and reloads the model in one step. Tap the close icon to dismiss the card. The card does not appear for models without draft layers, and it does not appear once MTP is on.

## Draft Tokens

With MTP on, a **Draft Tokens** slider appears below the switch. It sets how many tokens the model drafts per step, from 1 to 8. The default is 3, which is llama.cpp's own default. Longer drafts help when the model guesses well and waste work when it guesses badly. Start at 3, and change it only if your measured speed says so.

## What this does not do

- It does not speed up every model. Only models with MTP layers in their file, or a published MTP head, can draft. On any other model the app does not enable MTP, even with the switch on, because passing it to a model without draft layers can leave the engine stuck.
- It can make the first word slower in long chats. With MTP on, llama.rn reprocesses the whole prompt each turn, so from the second message on, the wait before the first token grows with the conversation. This is why MTP is off by default, and why **Use fastest settings** turns it off. Turn it back on yourself after the speed test if you prefer it.
- It does not apply to LiteRT models, remote servers or image models.
- An MTP head is not a model. Since 0.0.117, files that only speed up another model are no longer offered as models you can load. If you import one, the app refuses it with "This file only speeds up another model. It cannot run on its own."

## FAQ

**What is MTP in local AI?**
MTP stands for multi-token prediction. A model trained with it has extra layers that guess the next few tokens, and the main model checks those guesses in one pass. Correct guesses are kept, so you get the same reply in fewer passes.

**Is MTP the same as speculative decoding?**
MTP is one form of speculative decoding. Classic speculative decoding uses a separate small draft model. MTP uses draft layers trained with the model itself, either inside its GGUF or in a published MTP head.

**Which Android phones can use MTP?**
Any Android phone that runs a model with MTP layers in OGAM can use it. The limit is the model's RAM need: Gemma 4 E4B lists 6 GB as its minimum, and the head adds about 99 MB of storage.

**Does Gemma 4 support MTP on Android?**
Yes, the GGUF versions. MTP heads for Gemma 4 E4B and Gemma 4 12B are published beside Unsloth's GGUF builds, and OGAM downloads the matching head with the model. The Gemma 4 LiteRT versions do not use MTP.

**Why is my first reply slower after turning on MTP?**
The model reloads when you change the setting, and with MTP on, llama.rn reprocesses the full prompt each turn. In a long chat that can slow the first token even while the rest of the reply comes faster.

**Does MTP need internet?**
Only once, to download the MTP head if the model uses one. After that, MTP runs on the phone with no connection.

## Related

- [Android setup guide](/guides/android-setup/)
- [Run LLMs locally on Android](/guides/run-llms-locally-android/)
- [How to Run Qwen 3.5 and Gemma 4 Faster on Your Android Phone in 2026 (One-Tap Tuning, No Cloud)](/articles/how-to-run-qwen-3-5-and-gemma-4-faster-on-your-android-phone-in-2026-one-tap-tuning-no-cloud/)
- [How to Run Gemma 4 on Your Android Phone in 2026 (Locally, No Cloud)](/articles/how-to-run-gemma-4-on-your-android-phone-in-2026-locally-no-cloud/)
- [How to Find AI Models Your Android Phone Can Actually Run in 2026 (No Failed Downloads)](/articles/how-to-find-ai-models-your-android-phone-can-actually-run-in-2026-no-failed-downloads/)
