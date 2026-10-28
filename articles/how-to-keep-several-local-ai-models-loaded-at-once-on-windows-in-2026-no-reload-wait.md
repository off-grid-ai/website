---
layout: content
title: "How to Keep Several Local AI Models Loaded at Once on Windows in 2026 (No Reload Wait)"
description: "Keep two or more local chat models loaded on your Windows PC, sized to your NVIDIA card's VRAM, so every tool gets an answer without a load wait."
date: "2026-10-28"
permalink: /articles/how-to-keep-several-local-ai-models-loaded-at-once-on-windows-in-2026-no-reload-wait/
published_at: "2026-10-28T07:15:00Z"
article_topic: "Models & performance"
article_platform: "Windows"
devto_article: true
---
You run a small model for code completion and a bigger one for chat. Every time a tool asks for the other one, your PC unloads a model, loads the next, and you wait. Off Grid AI Desktop on Windows can keep several chat models in memory at the same time. A request that names one of them goes straight to it, already loaded. Before you save, the app sizes the set against your graphics card's VRAM and your RAM, and tells you if it will not fit.

## What you need

- A Windows PC with an x64 processor. The Windows download is an x64 installer.
- Off Grid AI Desktop 0.0.55 or later. **Keep loaded** is in the current stable release, 0.0.55. [Download Off Grid AI Desktop for Windows](/desktop/).
- Two or more chat models downloaded in the app's **Models** screen. Text models and vision models both count.
- For GPU speed on an NVIDIA card: the optional NVIDIA download. Open **Settings** > **Setup & health** and find **Use your NVIDIA GPU**. One download adds the CUDA engines; restart the app when it says **Installed. Restart the app to use it.** Without an NVIDIA card, the app uses its Vulkan or CPU engine instead.
- No account and no payment. **Keep loaded** is part of the gateway in the free app.

## How the app decides what fits on your PC

Kept models run under one llama.cpp model router, on the fastest engine the app has: CUDA, then Vulkan, then CPU. A graphics card has its own memory, separate from system RAM, so the app plans against two budgets:

- **GPU**: your card's VRAM, less 1 GB of safety margin, less the app's own chat model if it is already loaded on the card.
- **RAM**: 80% of system memory, less 2 GB left for Windows and the app.

Before the chat model, that gives roughly:

| NVIDIA card VRAM | GPU budget | System RAM | RAM budget |
|---|---|---|---|
| 8 GB | about 7 GB | 16 GB | about 10.8 GB |
| 12 GB | about 11 GB | 32 GB | about 23.6 GB |
| 16 GB | about 15 GB | 64 GB | about 49.2 GB |
| 24 GB | about 23 GB | 128 GB | about 100 GB |

Each kept model needs its model file, its vision file if it has one, a context cache, and a 1.5 GB working buffer. Every kept model runs with a 16,384-token context. If the set does not fit with the cache at full precision, the planner tries the cache at q8_0, then q4_0, and uses the first one that fits.

When the set is bigger than your VRAM, the planner moves part of it into system RAM. It moves the expert layers of mixture-of-experts models first, because only a few experts are read for each token, then whole layers of dense models. A model with moved experts shows **experts on CPU** next to its size.

If the app finds no usable GPU, or cannot read how much memory the card has, it plans everything in RAM. The **GPU** bar does not appear and the chat model's size comes off the RAM budget instead.

## Step 1: Open Keep loaded

1. Open Off Grid AI Desktop and click **Gateway** in the sidebar.
2. Scroll to the **Keep loaded** section, below **Clients** and above **API keys**.
3. You see every chat model downloaded on this PC, each with a checkbox. Models on a remote server are not listed.

## Step 2: Pick your models and read the memory bars

1. Tick the models you want loaded together, for example a 4B model for your editor and a 9B model for chat.
2. Each ticked model shows the memory it will take, in GB, next to its name.
3. Under the list, a **GPU** bar shows VRAM used against the budget, for example `9.6 / 11.0 GB`. A **RAM** bar shows the part placed in system memory. Either bar turns red when the set is too big.
4. Next to the bars you see how many CPU threads the set uses. Each model gets an even share of your logical cores, at most 8 each, so several models do not fight over the CPU.

If the set does not fit, a red line reads "These models do not fit in memory together. Remove one or pick smaller ones." If you tick more models than your PC has cores, the line names the count instead, for example "6 models need at least 6 CPU cores; this machine allows 4." Untick one and the bars update at once.

## Step 3: Save with Keep loaded

1. Click **Keep loaded**. The button appears only after you change the ticks, and it stays disabled while the set does not fit.
2. The app starts the router and loads each model. Each one shows a badge: **loading**, then **loaded**. If one cannot load, its badge reads **failed** and a red line under the list gives the reason.
3. The set is saved, and the app loads it again each time it starts.

To stop keeping a model loaded, untick it and click **Keep loaded** again. Untick them all and save to free the VRAM and RAM.

## Step 4: Call a kept model by name

The gateway speaks the OpenAI API at `http://127.0.0.1:7878/v1`.

1. Get the model ids. In PowerShell, type `curl.exe` so Windows runs the real curl and not its `Invoke-WebRequest` alias:

```powershell
curl.exe http://127.0.0.1:7878/v1/models
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

If you turned on **API key required** under **API keys**, send the key as usual. A request that names `local`, or no model, still runs on the app's own chat model. `GET /v1/gateway/status` lists the kept set under `kept_models`.

## When llama.cpp updates

Off Grid AI Desktop updates its engines, including the CUDA engines, without an app release. When a newer llama.cpp arrives, your kept models do not restart in the middle of an answer. A card appears instead: "Engine update ready for kept models", with a **Restart models** button. Click it when you are not waiting on a reply.

## What this does not do

- It does not make one model faster. Kept models share one card. Two models answering at the same moment each run slower than one alone, and any part placed in system RAM runs slower than the part on the card.
- Each kept model answers one request at a time. A second request to the same model waits for the first. Different kept models answer in parallel.
- It does not raise the context window. Kept models run at 16,384 tokens, even if your chat settings use more.
- It does not let you overcommit memory. If the set does not fit, the app will not start it, and there is no option to force it.
- It serves requests that come in through the gateway. The chat window inside the app keeps using its own chat model.

## FAQ

**Can I run two LLMs at the same time on one NVIDIA GPU?**
Yes. Tick both under **Gateway** > **Keep loaded** and click **Keep loaded**. While the **GPU** and **RAM** bars stay under budget, both stay in memory and answer requests by name.

**How many local models can my Windows PC keep loaded?**
It depends on model size, VRAM and RAM. The app plans against your VRAM less 1 GB and the chat model, plus 80% of RAM less 2 GB for anything that spills off the card. The bars show the result before you save.

**Do I need an NVIDIA card?**
No. Without one, the app runs the set on its Vulkan or CPU engine and plans it against system RAM. An NVIDIA card with the optional CUDA download is the fastest path on Windows.

**Is this like Ollama keeping models in memory?**
The effect is the same: the models stay resident, so there is no load wait. Off Grid AI Desktop also sizes the set for your card and RAM before it loads anything, and moves expert layers to the CPU when VRAM runs short.

**Is Keep loaded free?**
Yes. The gateway and **Keep loaded** are part of the free Off Grid AI Desktop app on Windows, with no account.

## Related

- [Download Off Grid AI Desktop](/desktop/)
- [How to Use Your NVIDIA GPU for Local AI on Windows in 2026](/articles/how-to-use-your-nvidia-gpu-for-local-ai-on-windows-in-2026/)
- [How to Run a Local AI Server for Your Whole Team on Windows in 2026 (Ollama Alternative, No Cloud)](/articles/how-to-run-a-local-ai-server-for-your-whole-team-on-windows-in-2026-ollama-alternative-no-cloud/)
- [How to Compare Local AI Models Side by Side on Windows in 2026 (One Question, Up to Six Models)](/articles/how-to-compare-local-ai-models-side-by-side-on-windows-in-2026-one-question-up-to-six-models/)
