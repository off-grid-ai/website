---
layout: content
title: "How to Run a Local AI Server for Your Whole Team on Windows in 2026 (Ollama Alternative, No Cloud)"
description: "Turn one Windows PC with an NVIDIA GPU into a shared AI server: several people use its local models at once, each with their own API key."
date: "2026-10-27"
permalink: /articles/how-to-run-a-local-ai-server-for-your-whole-team-on-windows-in-2026-ollama-alternative-no-cloud/
published_at: "2026-10-27T03:50:11Z"
article_topic: "Automation & tools"
article_platform: "Windows"
devto_article: true
---
You have one Windows PC with a good NVIDIA card and a team that wants local AI, without sending your code and documents to a cloud API. Off Grid AI Desktop can turn that one PC into a shared AI server. Its gateway has a **Team** mode that answers several people at once, gives each person their own API key, and keeps the PC awake while it works. Every request stays on your network.

## What you need

- A Windows 10 or 11 PC with an x64 processor. The Windows download is an x64 installer; there is no Windows on ARM build.
- Off Grid AI Desktop 0.0.55 or later. Team mode is in the current stable release, 0.0.55. [Download Off Grid AI Desktop for Windows](/desktop/).
- A chat model downloaded in the app, for example Qwen 3.5 9B.
- The other computers on the same network as the PC, such as your office Wi-Fi or LAN.
- No account and no payment. The gateway and Team mode are part of the free app.

An NVIDIA GPU is what lets one PC serve many people. When the model runs on CUDA, **Auto** opens up to 4 requests at once on a card with less than 24 GB of VRAM, 8 from 24 GB (an RTX 3090 or 4090, for example), 16 from 48 GB and 32 from 96 GB. On a PC without CUDA, where the model runs on Vulkan or the CPU, the cap is 4. Inside that cap, the real number comes from the memory left after the model loads, with room for about 8,000 tokens per request. To check your card is in use, see [how to use your NVIDIA GPU for local AI on Windows](/articles/how-to-use-your-nvidia-gpu-for-local-ai-on-windows-in-2026/).

## Step 1: Open the Gateway

1. Open Off Grid AI Desktop and click **Gateway** in the sidebar.
2. Under **Base URL** you see `http://127.0.0.1:7878/v1`. That address works only on the PC itself.
3. For other computers, use the PC's network address with the same port. Open PowerShell and run `ipconfig`, then read the **IPv4 Address** line under your Wi-Fi or Ethernet adapter. If it reads `192.168.1.20`, your team uses `http://192.168.1.20:7878/v1`.

The gateway listens on port 7878 on every network interface. The first time the app opens it, Windows Defender Firewall may ask whether to allow Off Grid AI Desktop on your networks. Allow it on **Private networks**. Leave **Public networks** off, so the server is not open on a cafe or hotel Wi-Fi.

## Step 2: Switch from Just me to Team

1. On the right side of the Gateway screen, find **Clients**.
2. The switch reads **Just me** and **Team**. **Just me** is the default: one request at a time, at full speed.
3. Click **Team**. Its tooltip reads "Several clients at once; extras wait their turn."
4. A **Requests at once** menu appears. Leave it on **Auto**, which shows your PC's maximum, for example **Auto (8)**, or pick a lower number such as **2 at once** for faster single answers.

If someone is mid-answer when you change a setting, the app lets that answer finish before it restarts the engine.

When every slot is busy, new requests wait in line in the order they arrived. When the line is full, the gateway answers with HTTP 429 and a `Retry-After` header, so a client backs off and tries again instead of hanging.

## Step 3: Give each person an API key

By default the gateway does not ask for a key. On a shared network, turn keys on.

1. Under **API keys**, turn on the switch. Its label changes to **API key required**.
2. In the field that reads "New key name: phone, laptop, or service", type a name for one person or tool, for example `priya-laptop`.
3. Pick an **Expiry**: **7 days**, **30 days**, **90 days**, **Custom date and time** or **No expiry**.
4. Click **Create key**.
5. Copy the key with the copy icon. The app says "Copy this key now. It will not be shown again."
6. Repeat for each person or tool. The app's own hint is "Use one key per client."

Each key shows whether it is **Active**, **Expired** or **Revoked**, and when it was last used. If a laptop is lost, click the revoke icon next to its key; nobody else needs a new one. The keys sit in the app's encrypted secret store, protected by Windows for your user account, not in a plain-text settings file.

## Step 4: Connect your team's tools

The gateway speaks the OpenAI API, so any tool that lets you set a base URL and an API key can use it. The **Quick start** section has copyable code for curl, Python, JavaScript and image generation. From another computer, in Python:

```python
from openai import OpenAI

client = OpenAI(base_url="http://192.168.1.20:7878/v1", api_key="THE_KEY_YOU_COPIED")
resp = client.chat.completions.create(
    model="local",
    messages=[{"role": "user", "content": "Summarise this changelog in two lines."}],
)
print(resp.choices[0].message.content)
```

A request that names `local` or no model runs on the chat model loaded on the PC. The **Endpoints** list on the Gateway screen shows what else the server offers: chat with images, text to image, speech to text, text to speech, embeddings and the model list.

To use the PC's models from the Off Grid AI phone app, follow the guide to [use Off Grid AI Desktop from your phone](/guides/off-grid-ai-desktop-from-your-phone/) and give the phone its own key.

## Step 5: See who is using it

Open **Settings** > **AI activity**. Every request is listed with its model and timing, and a request sent with a key shows that key's name.

For monitoring, `GET /v1/gateway/status` returns the mode, the requests-at-once setting, and how many requests are running, waiting and refused. It needs a key like every other route.

## Keep it serving

In Team mode the PC stays awake while it is answering, and Windows is allowed to sleep a minute after the last request ends. In **Just me** mode the app does not hold the PC awake.

To serve without the desktop window, start the app from PowerShell in server-only mode, with Team mode for that run only. With the default install location, that is:

```powershell
& "$env:LOCALAPPDATA\Programs\off-grid-ai\off-grid-ai.exe" --server-only --gateway-mode team --gateway-clients auto
```

If you installed it elsewhere, right-click the desktop shortcut, choose **Open file location**, and use that path. `--gateway-clients` takes `auto` or a number. These flags apply to that launch and do not change the settings you chose in the app. The environment variables `OFFGRID_GATEWAY_MODE` and `OFFGRID_GATEWAY_CLIENTS` do the same.

## What this does not do

- It does not make one answer faster. Everyone shares one GPU, so with four people at once, each answer streams slower.
- Image generation runs one picture at a time even in Team mode. A second image request waits for the first.
- It does not reach people outside your network. There is no relay or cloud tunnel. Remote staff need a VPN into your office network.
- It does not override your Windows power plan for a closed laptop lid or the power button. For a shared server, use a desktop PC or set the lid action to **Do nothing** while plugged in.
- Without the API key switch on, anyone on the same network can use the models. Turn keys on before you share the address.

## FAQ

**Is Off Grid AI Desktop an alternative to Ollama for a team server on Windows?**
Yes, for teams whose tools speak the OpenAI API. It serves chat, vision, image generation, speech and embeddings from one address, with per-person API keys and a request log built in.

**How many people can use one Windows PC at once?**
With **Auto** on an NVIDIA GPU, up to 4 requests at once below 24 GB of VRAM, 8 from 24 GB, 16 from 48 GB and 32 from 96 GB, limited further by the memory your model leaves free. Without CUDA the cap is 4. More people can send requests; the extra ones wait in line.

**Does my team's data leave the office?**
No. Requests go from each computer to the PC on your network, and the models run on that PC. Nothing goes to a cloud service.

**Why can't other computers reach the server?**
Check that they use the PC's IPv4 address, not `127.0.0.1`, and port 7878. Then check that Windows Defender Firewall allows Off Grid AI Desktop on the network type you are on, which should be **Private**.

**Can I revoke one person's access?**
Yes. Click the revoke icon next to their key under **API keys**. Their requests are refused and every other key keeps working.

## Related

- [Download Off Grid AI Desktop](/desktop/)
- [How to Run LLMs Locally on Your Windows PC in 2026 (Completely Offline, No Subscription)](/articles/how-to-run-llms-locally-on-your-windows-pc-in-2026-completely-offline-no-subscription/)
- [How to Compare Local AI Models Side by Side on Windows in 2026 (One Question, Up to Six Models)](/articles/how-to-compare-local-ai-models-side-by-side-on-windows-in-2026-one-question-up-to-six-models/)
- [How to Use AI Models on Your Windows PC From Your iPhone in 2026 (No Internet Required)](/articles/how-to-use-ai-models-on-your-windows-pc-from-your-iphone-in-2026-no-internet-required/)
