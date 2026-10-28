---
layout: content
title: "How to Speed Up Local AI Replies With MTP on Your iPhone in 2026 (No Setup)"
description: "Turn on MTP in Off Grid AI on your iPhone and Gemma 4 drafts ahead and checks its own words, so the same answer arrives with less waiting."
date: "2026-10-28"
permalink: /articles/how-to-speed-up-local-ai-replies-with-mtp-on-your-iphone-in-2026-no-setup/
published_at: "2026-10-28T05:40:00Z"
article_topic: "Models & performance"
article_platform: "iPhone"
devto_article: true
---
You run a model like Gemma 4 on your iPhone and the reply comes out one word at a time. You want the same answer sooner, without dropping to a smaller model and without learning what a draft model is. Off Grid AI Mobile (OGAM) supports MTP, multi-token prediction. A model built for it guesses a few words ahead, checks them in one pass, and keeps the ones it would have written anyway. You turn it on with one switch, and the app fetches the extra file the model needs.

## What you need

- An iPhone with enough memory for the model. **Gemma 4 E4B**, the smallest catalog model with a published MTP head, lists 6 GB of RAM as its minimum. **Gemma 4 12B** lists 12 GB.
- Off Grid AI 0.0.116 or later from the App Store. 0.0.116 added the automatic MTP head download behind the switch. The App Store build on October 28, 2026 is 0.0.117. [Download Off Grid AI for iPhone](/mobile/).
- A GGUF chat model. MTP is a llama.cpp feature, and on iPhone the app runs GGUF chat models through llama.cpp.
- No account and no payment. MTP is part of the free app.

## How MTP makes replies faster

A normal model writes one token per pass through its weights. A model with MTP layers drafts a few tokens at once, then verifies all of them in a single pass. A token that passes the check is exactly the token the model would have written alone, so the answer does not change. You wait through fewer passes.

Some models carry these draft layers inside their own GGUF file. Others have them published as a separate small file, an MTP head. The app knows the published heads for **Gemma 4 E4B** (about 99 MB) and **Gemma 4 12B** (about 465 MB), and matches each head to its model whatever quantization you downloaded. It checks the head's SHA-256 after the download, so a damaged file is not loaded. On most iPhones, Gemma 4 E4B is the one to use. Gemma 4 12B needs a 12 GB iPhone.

## Step 1: Download and load Gemma 4 E4B

1. Open Off Grid AI and tap **Models** in the tab bar.
2. On the **Text** tab, find **Gemma 4 E4B** and download it. The Q4_K_M weights are 4.98 GB.
3. Open a chat and pick **Gemma 4 E4B** as the model, so it is the one loaded.

The model must be the selected one before you turn MTP on. The app looks up the head for the model that is loaded, not for every model on the phone.

## Step 2: Turn on Speculative Decoding (MTP)

1. Tap **Settings** in the tab bar.
2. Tap **Model Settings** (System prompt, generation, and performance).
3. Open **Text Generation**.
4. Tap **Advanced**.
5. Find **Speculative Decoding (MTP)** and tap **On**.

You can do the same from inside the chat. Tap the sliders icon at the top right to open **Chat Settings**, open **TEXT GENERATION**, tap **Advanced** and set **Speculative Decoding (MTP)** to **On**. Both places change one setting.

If the loaded model has a published head that is not on the iPhone yet, the download starts as soon as you tap **On**. The progress shows under the switch as **Getting MTP head...** with a percentage. If the download fails, a retry icon appears in its place. Tap it once to try again. You do not download the model again.

## Step 3: Reload the model and chat

MTP is set when llama.cpp builds the model in memory, so it takes effect on the next load. The setting says **Requires model reload**. Go back to the chat. A banner says the settings changed and asks you to tap to reload the model. Tap it, wait for the load, and send a message. Changing **Draft Tokens** later shows the same banner.

To see the effect, turn on **Show Generation Details** in the same **Text Generation** section. Each reply then shows its speed in tokens per second. Ask the same question with MTP off and on, and compare.

## The in-chat suggestion

When the model file itself carries MTP layers, the chat tells you. A card reads **This model can reply faster**, says the model drafts several tokens at once and checks them in one pass, and offers **Turn on speculative decoding and reload the model**. One tap turns MTP on and reloads. The close icon dismisses it. The card reads the model's own file, so it does not appear for Gemma 4, whose draft layers come in the separate head. For Gemma 4, use the switch in Step 2.

## Draft Tokens

With MTP on, a **Draft Tokens** slider appears below the switch. It sets how many tokens the model drafts per step, from 1 to 8. The default is 3, which is llama.cpp's own default. Longer drafts help when the model guesses well and waste work when it guesses badly. Start at 3, and change it only when your measured speed says so.

## What this does not do

- It does not speed up every model. Only models with MTP layers in their file, or a published head, can draft. On any other model the app does not enable MTP, even with the switch on. Passing speculative decoding to a model without draft layers left the engine stuck on a test iPhone, with every reply failing, so the app checks first.
- It can make the first word slower in long chats. With MTP on, the engine reprocesses the whole prompt each turn, so the wait before the first token grows with the conversation. This is why MTP is off by default, and why **Use fastest settings** turns it off. Turn it back on after the speed test if you prefer it.
- It does not apply to remote servers or image models.
- The model cards on iPhone do not mark MTP yet. An **MTP** badge on the card, and one download for the model and its head together, are in 0.0.118, which is out on Android and not yet in the App Store.
- An MTP head is not a model. Since 0.0.117, files that only speed up another model are not offered as models. If you import one, the app refuses it with "This file only speeds up another model. It cannot run on its own."

## FAQ

**What is MTP in local AI?**
MTP stands for multi-token prediction. A model trained with it has extra layers that guess the next few tokens, and the main model checks those guesses in one pass. Correct guesses are kept, so you get the same reply in fewer passes.

**Is MTP the same as speculative decoding?**
MTP is one form of speculative decoding. Classic speculative decoding uses a separate small draft model. MTP uses draft layers trained with the model itself, inside its GGUF or in a published MTP head.

**Which iPhones can use MTP?**
Any iPhone that can load a model with MTP layers in Off Grid AI. The limit is the model's memory need: Gemma 4 E4B lists 6 GB of RAM, and its head adds about 99 MB of storage.

**Does Gemma 4 support MTP on iPhone?**
Yes, the GGUF versions. MTP heads for Gemma 4 E4B and Gemma 4 12B are published beside Unsloth's GGUF builds, and the app downloads the matching head when you turn MTP on with that model loaded.

**Why is my first reply slower after turning on MTP?**
The model reloads when you change the setting, and with MTP on, the engine reprocesses the full prompt each turn. In a long chat that can slow the first token while the rest of the reply comes faster.

**Does MTP need internet?**
Only once, to download the MTP head. After that, MTP runs on the iPhone with no connection.

## Related

- [iOS setup guide](/guides/ios-setup/)
- [Run LLMs locally on iPhone](/guides/run-llms-locally-iphone/)
- [How to Run Qwen 3.5 and Gemma 4 Faster on Your iPhone in 2026 (One-Tap Tuning, No Cloud)](/articles/how-to-run-qwen-3-5-and-gemma-4-faster-on-your-iphone-in-2026-one-tap-tuning-no-cloud/)
- [How to Run Gemma 4 on Your iPhone in 2026 (Completely Offline, No Subscription)](/articles/how-to-run-gemma-4-on-your-iphone-in-2026-completely-offline-no-subscription/)
- [How to Find AI Models Your iPhone Can Actually Run in 2026 (No Failed Downloads)](/articles/how-to-find-ai-models-your-iphone-can-actually-run-in-2026-no-failed-downloads/)
