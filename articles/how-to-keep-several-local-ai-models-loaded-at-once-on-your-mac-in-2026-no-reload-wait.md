---
layout: content
title: "How to Keep Several Local AI Models Loaded at Once on Your Mac in 2026 (No Reload Wait)"
description: "Keep two or more local chat models loaded on your Mac so every tool that calls them gets an answer without waiting for a model to load."
date: "2026-10-26"
permalink: /articles/how-to-keep-several-local-ai-models-loaded-at-once-on-your-mac-in-2026-no-reload-wait/
published_at: "2026-10-26T00:26:34Z"
article_topic: "Models & performance"
article_platform: "Mac"
devto_article: true
---
You use a small model for quick completions in your editor and a bigger one for chat, and every time a tool asks for the other model your Mac unloads one, loads the next, and you wait. Off Grid AI Desktop can keep several chat models in memory at the same time on your Mac. A request that names one of them goes straight to it, already loaded, and nothing gets swapped out. Before you save, a memory bar shows whether your set fits.

## What you need

- A Mac with Apple silicon (M1 or later). The Mac download is built for Apple silicon only.
- Off Grid AI Desktop 0.0.55 or later. **Keep loaded** is in the current stable release, 0.0.55. [Download Off Grid AI Desktop for Mac](/desktop/).
- Two or more chat models downloaded in the app's **Models** screen. Text models and vision models both count.
- Enough unified memory for the set you pick. The app does the math for you; the rule is below.
- No account and no payment. **Keep loaded** is part of the gateway, which is in the free app.

## How much fits on your Mac

On Apple silicon, the GPU and the CPU share one pool of memory. macOS lets the GPU use about three quarters of it, so the app plans against 75% of your Mac's memory. From that it takes off 1 GB of safety margin and whatever the app's own chat model already holds.

That gives roughly these budgets before your chat model:

| Mac memory | Budget for kept models |
|---|---|
| 16 GB | about 11 GB |
| 32 GB | about 23 GB |
| 64 GB | about 47 GB |
| 128 GB | about 95 GB |

Each kept model needs its model file, its vision file if it has one, a context cache and a small working buffer. Every kept model runs with a 16,384-token context. If the set does not fit with the cache at full precision, the planner tries the cache at q8_0, then q4_0, and uses the first one that fits. You do not set any of this by hand.

## Step 1: Open Keep loaded

1. Open Off Grid AI Desktop and click **Gateway** in the sidebar.
2. Scroll to the **Keep loaded** section, below **Clients** and above **API keys**.
3. You see a list of every chat model you have downloaded, each with a checkbox. If you have none, the section reads "Download a chat model to keep it loaded." Models that live on a remote server you added are not in this list; only models on this Mac are.

## Step 2: Pick your models and read the memory bar

1. Tick the models you want loaded together. For example, a 4B model for your editor and a 9B model for chat.
2. As you tick, each model shows the memory it will take, in GB, next to its name.
3. Under the list, a **GPU** bar shows the total against your budget, for example `18.4 / 23.0 GB`. It turns red when the set is too big. On a Mac this is the bar that matters. A **RAM** bar also appears; it stays near zero on Apple silicon because the models already sit in shared memory.
4. Next to the bars you see how many CPU threads the set uses. Each model gets an even share of your cores, at most 8 each, so several models do not fight over the CPU.

If the set is too big, a red line reads "These models do not fit in memory together. Remove one or pick smaller ones." Untick one, or swap a large model for a smaller one, and the bar updates at once.

## Step 3: Save with Keep loaded

1. Click **Keep loaded**. The button only appears after you change the ticks, and it stays disabled while the set does not fit.
2. The app starts a llama.cpp model router for the set and loads each model. Each one shows a badge: **loading**, then **loaded**. If one cannot load, its badge reads **failed** and a red line under the list gives the reason.
3. That is all. The set is saved. The next time the app starts, it loads the same models again on its own.

To stop keeping a model loaded, untick it and click **Keep loaded** again. Untick them all and save to free the memory completely.

## Step 4: Call a kept model by name

The gateway speaks the OpenAI API at `http://127.0.0.1:7878/v1`. To reach a kept model, put its id in the `model` field.

1. Get the ids from the model list:

```bash
curl http://127.0.0.1:7878/v1/models
```

2. Each kept model is in that list with `"context_length": 16384`, the window it runs with.
3. Use that id in any OpenAI-compatible client:

```python
from openai import OpenAI

client = OpenAI(base_url="http://127.0.0.1:7878/v1", api_key="YOUR_API_KEY")
resp = client.chat.completions.create(
    model="THE_MODEL_ID_FROM_V1_MODELS",
    messages=[{"role": "user", "content": "Rename this variable to something clearer."}],
)
print(resp.choices[0].message.content)
```

If you turned on **API key required** under **API keys**, send the key as you would for any gateway request. A request that names `local`, or no model at all, still runs on the app's own chat model, as before. A request that names a downloaded model you did not keep works the same way it did before.

`GET /v1/gateway/status` lists the kept set under `kept_models`, which is handy if a script needs to check what is loaded.

## When llama.cpp updates

Off Grid AI Desktop updates its engines without an app release. When a newer llama.cpp arrives, your kept models do not restart in the middle of an answer. A card appears instead: "Engine update ready for kept models", with a **Restart models** button. Click it when you are not waiting on a reply.

If the router stops on its own, the app restarts it up to 3 times, 5 seconds apart. After that it stays down and shows the reason under the list until you change the set.

## What this does not do

- It does not make one model faster. On a Mac, every kept model shares the same GPU and memory bandwidth, so two models answering at the same moment each run slower than one alone.
- Each kept model answers one request at a time. A second request to the same model waits for the first. Different kept models answer in parallel.
- It does not raise the context window. Kept models run at 16,384 tokens, even if your chat settings use more.
- It does not let you overcommit memory. If the set does not fit 75% of your Mac's memory, the app will not start it. There is no option to force it.
- It serves requests that come in through the gateway. The chat window inside the app keeps using its own chat model.

## FAQ

**Can I run two LLMs at the same time on a Mac?**
Yes. Tick both under **Gateway** > **Keep loaded** and click **Keep loaded**. As long as the **GPU** bar stays under your budget, both stay in memory and answer requests by name.

**How many local models can my Mac keep loaded?**
It depends on their size and your memory. The app plans against about 75% of unified memory, less 1 GB and less the chat model already loaded, so a 32 GB Mac has about 23 GB for kept models. The memory bar tells you before you save.

**Is this like Ollama keeping models in memory?**
The effect is the same: the models stay resident, so there is no load wait. Off Grid AI Desktop also sizes the set for your Mac before it loads anything, and will not start a set that does not fit.

**Does keeping models loaded slow down my Mac?**
The memory they hold is not available to other apps. With a set close to the budget, heavy apps such as video editors have less room. Untick models and save to give the memory back.

**Is Keep loaded free?**
Yes. The gateway and **Keep loaded** are part of the free Off Grid AI Desktop app on Mac, with no account.

## Related

- [Download Off Grid AI Desktop](/desktop/)
- [How to Run a Local AI Server for Your Whole Team on Your Mac in 2026 (Ollama Alternative, No Cloud)](/articles/how-to-run-a-local-ai-server-for-your-whole-team-on-your-mac-in-2026-ollama-alternative-no-cloud/)
- [How to Compare Local AI Models Side by Side on Your Mac in 2026 (One Question, Up to Six Models)](/articles/how-to-compare-local-ai-models-side-by-side-on-your-mac-in-2026-one-question-up-to-six-models/)
- [How to Run LLMs Locally on Your Mac in 2026 (Completely Offline, No Subscription)](/articles/how-to-run-llms-locally-on-your-mac-in-2026-completely-offline-no-subscription/)
