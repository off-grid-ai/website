---
layout: content
title: "How to Find AI Models Your Android Phone Can Actually Run in 2026 (No Failed Downloads)"
description: "Search Hugging Face from your Android phone and see only models that fit its RAM and load in the app, one result per model."
date: "2026-10-23"
permalink: /articles/how-to-find-ai-models-your-android-phone-can-actually-run-in-2026-no-failed-downloads/
published_at: "2026-10-23T15:50:27.000Z"
article_topic: "Models & performance"
article_platform: "Android"
devto_article: true
---
You search Hugging Face for a model, wait for a 5 GB download on your Android phone, and then it will not load: too big for your RAM, or a format the app cannot run yet. Off Grid AI Mobile (OGAM) now filters that out before you tap download. Its model search lists only models your phone can load, shows one result per model instead of dozens of copies, and marks the files that only just fit.

## What you need

- An Android phone. What search shows depends on your phone's RAM, so an 8 GB phone and a 16 GB phone get different results.
- OGAM 0.0.117, the current stable release. The search changes arrived in 0.0.116 and 0.0.117. [Download OGAM for Android](/mobile/).
- An internet connection while you search and download. After the download, the model runs on the phone with no connection.
- No account and no payment. Search is part of the free app.

## How search decides what your phone can run

The rule is the same one the app uses everywhere it offers a model, and it lives in the app's shared model code.

An Android phone gives one app well under its total RAM, and a model needs more memory than its file size while it runs: the weights, plus the cache that holds your conversation. The app's phone budget comes from a measurement in the code: a model with a 4.64 GB file needed 6.4 GB to load at a 4K context, about 1.4 times its size. From that:

- A file under 36% of your RAM runs well.
- A file between 36% and 50% of your RAM is marked **Tight**.
- A file over 50% of your RAM is not offered.

| Phone RAM | Runs well | Tight | Hidden |
|---|---|---|---|
| 8 GB | under 2.9 GB | 2.9 to 4 GB | over 4 GB |
| 12 GB | under 4.3 GB | 4.3 to 6 GB | over 6 GB |
| 16 GB | under 5.8 GB | 5.8 to 8 GB | over 8 GB |

Search results from Hugging Face do not carry file sizes, so the list judges them by parameter count at 4-bit (about 0.6 GB per billion parameters). A 13B model on an 8 GB phone works out at about 7.8 GB and does not appear.

Size is not the only check. Some new models need a newer llama.cpp engine than the one inside your version of the app. Every upload of those models is left out of search, so you do not download something that fails to load. Files that only speed up another model (draft and MTP files) are not offered as models, and image generators stay on the **Image** tab instead of showing in chat search.

## Step 1: Search

1. Open OGAM and tap **Models** in the bottom bar.
2. Stay on the **Text** tab and tap the **Search models** field.
3. Type a model or maker, for example `qwen`, `gemma` or `lfm`. Results appear half a second after you stop typing, or when you tap search on the keyboard.

Curated models that match come first. These are the models in the app's catalog, with the same fit rules as the picks at the top of the screen. Hugging Face results follow, up to 30 per search, and a model already in the curated list is not repeated.

## Step 2: Read the cards

Each search result is one model, not one upload. When several people uploaded the same model, you see it once, led by the most trusted upload, with a **+N uploads** chip that counts the others.

Cards are short. Beyond the name, maker and parameter count, a card can show:

- **MoE** with an active size, such as **3B active**: a mixture-of-experts model. The active size sets its speed, so a large MoE model can reply like a much smaller one. It still needs RAM for its full size.
- **Newer: [model name]**: a newer model replaces this one. Older models are listed last.
- **Research licence**: the model's licence does not allow commercial use.

Uploads with safety training removed, such as "abliterated" or "uncensored" copies, are not shown.

## Step 3: Narrow the list with filters

Next to the search field are two icons.

1. Tap the lightning icon to sort. **Smart** is the default. **For You** puts the best fit for your RAM first. **Size**, **Downloads** and **Newest** do what they say.
2. Tap the sliders icon to open the filters:
   - **Org**: the maker. The list is OpenBMB, Qwen, Llama, Google, Microsoft, Mistral, DeepSeek, HuggingFace, NVIDIA and **Liquid AI**. Pick a maker without typing anything and the app lists that maker's curated models, then its Hugging Face models.
   - **Type**: **Text**, **Vision** or **Code**. **Vision** searches models that read images.
   - **Source**: **LM Studio**, **Official**, **Verified** or **Community**, by who uploaded the files.
   - **Size**: **< 1B**, **1-3B**, **3-8B** or **8B+** parameters.
   - **Quant**: a quantization, such as **Q4_K_M** or **Q8_0**.
3. Tap **Clear** to remove all filters.

A dot on an icon means a sort or filter is on.

## Step 4: Pick a size and download

1. Tap a result. The detail screen shows the description, downloads and likes, then **Sizes**.
2. **Sizes** shows up to three files in plain words: **Recommended** (the best file for your phone, listed first), **Smaller** and **Best**.
3. Tap **All files** to see every file your phone can run, and **Fewer sizes** to go back. Files over your phone's limit are not in either list.
4. A file marked **Tight** loads, but leaves little room for other apps and a long chat. Pick the next size down if you switch apps often.
5. Tap download. When it finishes, the app makes it your active model and offers **Chat now**.

If you already have a GGUF file on the phone, tap the upload icon (**Import local file**) next to the filters instead.

## What this does not do

- It does not test speed. A model that fits can still be slow on an older chip. To tune speed after the download, use **Use fastest settings** on the **Model Settings** screen.
- It does not check free storage while you search. The app checks space when the download starts and tells you how much it needs.
- The fit check uses total RAM, not what is free right now. If other apps hold a lot of memory, a **Tight** model can still fail to load, and the app keeps your current model loaded when that happens.
- Hugging Face results show at most 30 per search. Make the search more specific or add a filter to see others.
- Search needs a connection. Downloaded models do not.

## FAQ

**Why can't I find a model I saw on Hugging Face?**
It is too big for your phone's RAM, it needs a newer engine than your app version has, or it is an image generator, which lives on the **Image** tab. Uncensored and abliterated uploads are also hidden.

**What does Tight mean on Android?**
The file is between 36% and 50% of your phone's RAM. It can load, but there is little memory left, so a long chat or switching apps can cause trouble. A smaller size is steadier.

**What is the biggest model an 8 GB Android phone can run?**
Search offers files up to about 4 GB on an 8 GB phone, and files under about 2.9 GB run well. In practice that means models up to about 4B parameters at 4-bit run comfortably.

**What does "3B active" mean on an MoE model?**
The model is a mixture of experts and uses 3 billion parameters per word it writes, so it runs at about the speed of a 3B model. It still needs RAM for all of its parameters.

**Why do some models show "+3 uploads"?**
Three other people uploaded the same model. The app shows the most trusted upload and counts the rest, so the list does not fill with copies.

**Can I search for Liquid AI models?**
Yes. Open the filters, tap **Org** and pick **Liquid AI**, or type `lfm` in the search field.

## Related

- [Android setup guide](/guides/android-setup/)
- [Which model should I use?](/guides/which-model/)
- [How to Pick the Best Local AI Model on Your Android Phone in 2026 (Fast, Balanced or Best, No Cloud)](/articles/how-to-pick-the-best-local-ai-model-on-your-android-phone-in-2026-fast-balanced-or-best-no-cloud/)
- [How to Run Qwen 3.5 on Your Android Phone in 2026 (Locally, No Cloud)](/articles/how-to-run-qwen-3-5-on-your-android-phone-in-2026-locally-no-cloud/)
- [How to Run Qwen 3.5 and Gemma 4 Faster on Your Android Phone in 2026 (One-Tap Tuning, No Cloud)](/articles/how-to-run-qwen-3-5-and-gemma-4-faster-on-your-android-phone-in-2026-one-tap-tuning-no-cloud/)
