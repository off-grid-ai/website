---
layout: content
title: "How to Keep Several Local AI Models Loaded at Once on Linux in 2026 (No Reload Wait)"
description: "Keep two or more local chat models loaded on your Linux machine, sized to your GPU's VRAM and your RAM, so every tool gets an answer with no load wait."
date: "2026-10-30"
permalink: /articles/how-to-keep-several-local-ai-models-loaded-at-once-on-linux-in-2026-no-reload-wait/
published_at: "2026-10-30T09:30:00Z"
article_topic: "Models & performance"
article_platform: "Linux"
devto_article: true
devto_id: 4946540
devto_url: "https://dev.to/alichherawalla/how-to-keep-several-local-ai-models-loaded-at-once-on-linux-in-2026-no-reload-wait-27lc"
---
Your editor plugin talks to a small coding model. Your chat client talks to a bigger one. A script on the same box wants a third. Every switch means one model unloads, the next loads from disk, and you wait. Off Grid AI Desktop on Linux keeps several chat models in memory at the same time. A request that names one of them goes straight to it, already loaded. Before anything loads, the app sizes the set against your GPU's VRAM, your RAM and your CPU quota, and tells you if it will not fit.

## What you need

- A 64-bit x86 Linux machine on Ubuntu 24.04 or newer. The Linux downloads are an x64 AppImage and an amd64 `.deb`.
- Off Grid AI Desktop 0.0.55 or later. **Keep loaded** is in the current stable release, 0.0.55. [Download Off Grid AI Desktop for Linux](/desktop/).
- Two or more chat models downloaded in the app's **Models** screen. Text models and vision models both count.
- For GPU speed on an NVIDIA card: a loaded NVIDIA driver, version 525.60.13 or newer for the CUDA 12 engines, and the optional NVIDIA download. Open **Settings** > **Setup & health** and find **Use your NVIDIA GPU**. Restart the app when the download finishes. Our [NVIDIA on Linux article](/articles/how-to-use-your-nvidia-gpu-for-local-ai-on-linux-in-2026/) walks through it.
- On an AMD or Intel GPU, nothing extra. The Linux app ships a Vulkan build of llama.cpp and uses it when CUDA is not there.
- No account and no payment. **Keep loaded** is part of the gateway in the free app.

## How the app decides what fits on your machine

Kept models run under one llama.cpp model router, on the fastest engine the app has: CUDA, then Vulkan, then CPU. The app reads your card's memory from the engine itself. On NVIDIA it can also read it from `nvidia-smi`, which it runs only from the driver's fixed install paths (`/usr/bin`, `/usr/local/bin`, or `/usr/local/nvidia/bin` inside GPU containers), never from your `PATH`.

A discrete card has its own memory, separate from system RAM, so the planner works with two budgets:

- **GPU**: your card's VRAM, less 1 GB of safety margin, less the app's own chat model if it is already loaded on the card.
- **RAM**: 80% of system memory, less 2 GB left for the desktop and the app.

Before the chat model, that gives roughly:

| GPU VRAM | GPU budget | System RAM | RAM budget |
|---|---|---|---|
| 8 GB | about 7 GB | 16 GB | about 10.8 GB |
| 12 GB | about 11 GB | 32 GB | about 23.6 GB |
| 16 GB | about 15 GB | 64 GB | about 49.2 GB |
| 24 GB | about 23 GB | 128 GB | about 100 GB |

Each kept model needs its model file, its vision file if it has one, a context cache, and a 1.5 GB working buffer. Every kept model runs with a 16,384-token context. If the set does not fit with the cache at full precision, the planner tries the cache at q8_0, then q4_0, and uses the first one that fits.

When the set is bigger than your VRAM, the planner moves part of it into system RAM. It moves the expert layers of mixture-of-experts models first, because only a few experts are read for each token, then whole layers of dense models. A model with moved experts shows **experts on CPU** next to its size.

If the app finds no usable GPU, it plans everything in RAM. The **GPU** bar does not appear and the chat model's size comes off the RAM budget instead.

### CPU threads and containers

Each kept model gets an even share of the cores the app may use, at most 8 threads each, so several models do not fight over the CPU. On Linux that core count respects cgroup CPU limits. The app reads `/sys/fs/cgroup/cpu.max` (or the cgroup v1 quota files), so inside a Docker container, a systemd slice or a rented GPU pod, it plans against the cores you were given, not the cores the host has.

## Step 1: Open Keep loaded

1. Open Off Grid AI Desktop and click **Gateway** in the sidebar.
2. Scroll to the **Keep loaded** section, below **Clients** and above **API keys**.
3. You see every chat model downloaded on this machine, each with a checkbox. Models on a remote server are not listed. With no chat model downloaded, the section reads "Download a chat model to keep it loaded."

## Step 2: Pick your models and read the memory bars

1. Tick the models you want loaded together, for example a 4B model for your editor and a 9B model for chat.
2. Each ticked model shows the memory it will take, in GB, next to its name.
3. Under the list, a **GPU** bar shows VRAM used against the budget, for example `9.6 / 11.0 GB`. A **RAM** bar shows the part placed in system memory. Either bar turns red when the set is too big.
4. Next to the bars you see the total CPU threads the set uses.

If the set does not fit, a red line reads "These models do not fit in memory together. Remove one or pick smaller ones." If you tick more models than your quota has cores, the line names the count instead, for example "6 models need at least 6 CPU cores; this machine allows 4." Untick one and the bars update at once.

## Step 3: Save with Keep loaded

1. Click **Keep loaded**. The button appears only after you change the ticks, and it stays disabled while the set does not fit.
2. The app starts the router and loads each model. Each one shows a badge: **loading**, then **loaded**. If one cannot load, its badge reads **failed** and a red line under the list gives the reason.
3. The set is saved, and the app loads it again each time it starts.

To stop keeping a model loaded, untick it and click **Keep loaded** again. Untick them all and save to free the VRAM and RAM.

## Step 4: Call a kept model by name

The gateway speaks the OpenAI API at `http://127.0.0.1:7878/v1`.

1. List the model ids:

```bash
curl -s http://127.0.0.1:7878/v1/models | jq '.data[] | {id, context_length}'
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

Each kept model answers one request at a time, and a second request to the same model waits its turn. Different kept models answer in parallel, so your editor and your chat client never queue behind each other.

## When llama.cpp updates

Off Grid AI Desktop updates its engines, including the Linux CUDA and Vulkan builds, without an app release. When a newer llama.cpp arrives, your kept models do not restart in the middle of an answer. A card appears instead: "Engine update ready for kept models", with a **Restart models** button. Click it when you are not waiting on a reply.

## FAQ

**Can I run two LLMs at the same time on one GPU on Linux?**
Yes. Tick both under **Gateway** > **Keep loaded** and click **Keep loaded**. While the **GPU** and **RAM** bars stay under budget, both stay in memory and answer requests by name.

**Does Keep loaded work on an AMD GPU?**
Yes. Without CUDA, the app runs the set on its bundled Vulkan build of llama.cpp. If it cannot read the card's memory, it plans the whole set against system RAM so it never overcommits the card.

**How many local models can my Linux machine keep loaded?**
It depends on model size, VRAM, RAM and your CPU quota. The app plans against VRAM less 1 GB and the chat model, plus 80% of RAM less 2 GB for anything that spills off the card. The bars show the result before you save.

**Does it work inside Docker or on a rented GPU server?**
The planner reads cgroup CPU limits and finds `nvidia-smi` where GPU containers mount it, so it sizes the set to the slice you were given. The gateway listens on `127.0.0.1:7878`. To reach it from other machines, see our [team server article](/articles/how-to-run-a-local-ai-server-for-your-whole-team-on-linux-in-2026-ollama-alternative-no-cloud/).

**Is this like Ollama keeping models in memory?**
The effect is the same: the models stay resident, so there is no load wait. Off Grid AI Desktop also sizes the set for your GPU, RAM and cores before it loads anything, and moves expert layers to the CPU when VRAM runs short.

**Is Keep loaded free?**
Yes. The gateway and **Keep loaded** are part of the free Off Grid AI Desktop app on Linux, with no account.

## Related

- [Download Off Grid AI Desktop](/desktop/)
- [How to Use Your NVIDIA GPU for Local AI on Linux in 2026](/articles/how-to-use-your-nvidia-gpu-for-local-ai-on-linux-in-2026/)
- [How to Run a Local AI Server for Your Whole Team on Linux in 2026 (Ollama Alternative, No Cloud)](/articles/how-to-run-a-local-ai-server-for-your-whole-team-on-linux-in-2026-ollama-alternative-no-cloud/)
- [How to Compare Local AI Models Side by Side on Linux in 2026 (One Question, Up to Six Models)](/articles/how-to-compare-local-ai-models-side-by-side-on-linux-in-2026-one-question-up-to-six-models/)
