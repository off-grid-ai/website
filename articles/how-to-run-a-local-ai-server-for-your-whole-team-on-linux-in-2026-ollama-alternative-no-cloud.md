---
layout: content
title: "How to Run a Local AI Server for Your Whole Team on Linux in 2026 (Ollama Alternative, No Cloud)"
description: "Turn one Ubuntu machine into a shared AI server: several people use its local models at once, each with their own API key."
date: "2026-10-29"
permalink: /articles/how-to-run-a-local-ai-server-for-your-whole-team-on-linux-in-2026-ollama-alternative-no-cloud/
published_at: "2026-10-29T12:50:16Z"
article_topic: "Automation & tools"
article_platform: "Linux"
devto_article: true
devto_id: 4941183
devto_url: "https://dev.to/alichherawalla/how-to-run-a-local-ai-server-for-your-whole-team-on-linux-in-2026-ollama-alternative-no-cloud-4g68"
---
You have one Linux box with an NVIDIA card, and a team that wants local AI without sending code and documents to a cloud API. Off Grid AI Desktop turns that one machine into a shared, OpenAI-compatible AI server. Its gateway has a **Team** mode that answers several people at once, gives each person their own API key, and keeps the machine awake while it works. Every request stays on your network.

## What you need

- An x64 computer on Ubuntu 24.04 or newer. The Linux downloads are an x64 AppImage and an amd64 `.deb`; there is no Linux ARM package.
- Off Grid AI Desktop 0.0.55 or later. Team mode is in the current stable release, 0.0.55. [Download Off Grid AI Desktop for Linux](/desktop/).
- A chat model downloaded in the app, for example Qwen 3.5 9B.
- A desktop keyring, such as GNOME Keyring on Ubuntu. The app encrypts its API keys with it.
- The other computers on the same network, such as your office LAN or Wi-Fi.
- No account and no payment. The gateway and Team mode are part of the free app.

An NVIDIA GPU is what lets one Linux machine serve many people. Install the app's optional NVIDIA pack first: [how to use your NVIDIA GPU for local AI on Linux](/articles/how-to-use-your-nvidia-gpu-for-local-ai-on-linux-in-2026/). When the model runs on CUDA, **Auto** opens up to 4 requests at once on a card with less than 24 GB of VRAM, 8 from 24 GB (an RTX 3090 or 4090, for example), 16 from 48 GB and 32 from 96 GB. When the model runs on Vulkan or the CPU, the cap is 4. Inside that cap, the real number comes from the memory left after the model loads, with room for about 8,000 tokens per request.

## Step 1: Open the Gateway

1. Open Off Grid AI Desktop and click **Gateway** in the sidebar.
2. Under **Base URL** you see `http://127.0.0.1:7878/v1`. That address works only on the machine itself.
3. For other computers, use the machine's network address with the same port. In a terminal, run `hostname -I` or `ip -4 addr`. If it shows `192.168.1.20`, your team uses `http://192.168.1.20:7878/v1`.

The gateway listens on port 7878 on every network interface. Ubuntu ships with `ufw` turned off. If you turned it on, open the port to your local network only:

```bash
sudo ufw allow from 192.168.1.0/24 to any port 7878 proto tcp
```

Change `192.168.1.0/24` to your own subnet.

## Step 2: Switch from Just me to Team

1. On the Gateway screen, find **Clients**.
2. The switch reads **Just me** and **Team**. **Just me** is the default: one request at a time, at full speed.
3. Click **Team**. Its tooltip reads "Several clients at once; extras wait their turn."
4. A **Requests at once** menu appears. Leave it on **Auto**, which shows your machine's maximum, for example **Auto (8)**, or pick a lower number such as **2 at once** for faster single answers.

If someone is mid-answer when you change a setting, the app lets that answer finish before it restarts the engine.

When every slot is busy, new requests wait in line in the order they arrived. When the line is full, the gateway answers with HTTP 429 and a `Retry-After` header, so a client backs off and tries again instead of hanging.

## Step 3: Give each person an API key

By default the gateway does not ask for a key. On a shared network, turn keys on before you share the address.

1. Under **API keys**, turn on the switch. Its label changes to **API key required**.
2. In the field that reads "New key name: phone, laptop, or service", type a name for one person or tool, for example `priya-laptop`.
3. Pick an **Expiry**: **7 days**, **30 days**, **90 days**, **Custom date and time** or **No expiry**.
4. Click **Create key**.
5. Copy the key with the copy icon. The app says "Copy this key now. It will not be shown again."
6. Repeat for each person or tool. The app's own hint is "Use one key per client."

Each key shows whether it is **Active**, **Expired** or **Revoked**, and when it was last used. If a laptop is lost, click the revoke icon next to its key; nobody else needs a new one. The app keeps only a hash of each key, encrypted with your desktop keyring, not the key itself in a plain-text settings file.

## Step 4: Connect your team's tools

The gateway speaks the OpenAI API, so any tool that lets you set a base URL and an API key can use it. The **Quick start** section has copyable code for curl, Python, JavaScript and image generation. From another computer:

```bash
curl http://192.168.1.20:7878/v1/chat/completions \
  -H "Authorization: Bearer THE_KEY_YOU_COPIED" \
  -H "Content-Type: application/json" \
  -d '{"model": "local", "messages": [{"role": "user", "content": "Summarise this changelog in two lines."}]}'
```

Or in Python with the OpenAI library:

```python
from openai import OpenAI

client = OpenAI(base_url="http://192.168.1.20:7878/v1", api_key="THE_KEY_YOU_COPIED")
resp = client.chat.completions.create(
    model="local",
    messages=[{"role": "user", "content": "Summarise this changelog in two lines."}],
)
print(resp.choices[0].message.content)
```

A request that names `local` or no model runs on the chat model loaded on the server. The **Endpoints** list on the Gateway screen shows what else it offers: chat with images, text to image, speech to text, text to speech, embeddings and the model list.

To use the server's models from the Off Grid AI phone app, follow the guide to [use Off Grid AI Desktop from your phone](/guides/off-grid-ai-desktop-from-your-phone/) and give the phone its own key.

## Step 5: See who is using it

Open **Settings** > **AI activity**. Every request is listed with its model and timing, and a request sent with a key shows that key's name.

For monitoring, `GET /v1/gateway/status` returns the mode, the requests-at-once setting, and how many requests are running, waiting and refused. It needs a key like every other route, so a script or a dashboard can poll it:

```bash
curl -s http://192.168.1.20:7878/v1/gateway/status -H "Authorization: Bearer THE_KEY_YOU_COPIED"
```

## Keep it serving

In Team mode the app asks the system not to suspend while it is answering, and lets go a minute after the last request ends. In **Just me** mode it does not hold the machine awake. For a machine that only serves the team, also turn off automatic suspend in **Settings** > **Power**, or mask the sleep targets:

```bash
sudo systemctl mask sleep.target suspend.target hibernate.target hybrid-sleep.target
```

To serve without the desktop window, start the app in server-only mode, with Team mode for that run only. If you installed the `.deb`:

```bash
off-grid-ai --server-only --gateway-mode team --gateway-clients auto
```

With the AppImage, run the file you downloaded with the same flags:

```bash
./off-grid-ai-0.0.55.AppImage --server-only --gateway-mode team --gateway-clients auto
```

`--gateway-clients` takes `auto` or a number. These flags apply to that launch and do not change the settings you chose in the app. The environment variables `OFFGRID_GATEWAY_MODE` and `OFFGRID_GATEWAY_CLIENTS` do the same, which is handy in a systemd user service.

Everyone shares one GPU, so with four people at once each answer streams slower than it would for one person. Image generation runs one picture at a time, so a second image request waits for the first. For staff outside the office, connect them to your network over a VPN; the gateway has no cloud relay.

## FAQ

**Is Off Grid AI Desktop an alternative to Ollama for a team server on Linux?**
Yes, for teams whose tools speak the OpenAI API. It serves chat, vision, image generation, speech and embeddings from one address, with per-person API keys and a request log built in.

**How many people can use one Linux machine at once?**
With **Auto** on an NVIDIA GPU, up to 4 requests at once below 24 GB of VRAM, 8 from 24 GB, 16 from 48 GB and 32 from 96 GB, limited further by the memory your model leaves free. On Vulkan or the CPU the cap is 4. More people can send requests; the extra ones wait in line.

**Does my team's data leave the office?**
No. Requests go from each computer to the server on your network, and the models run on that machine. Your prompts and files are not sent to a cloud service.

**Why can't other computers reach the server?**
Check that they use the machine's LAN address from `hostname -I`, not `127.0.0.1`, and port 7878. If `ufw` is on, check that it allows port 7878 from your subnet.

**Can I run it as a headless server?**
Start it with `--server-only` to run the gateway without the desktop window, and add `--gateway-mode team` to serve several people. Your saved settings stay as they are.

**Can I revoke one person's access?**
Yes. Click the revoke icon next to their key under **API keys**. Their requests are refused and every other key keeps working.

## Related

- [Download Off Grid AI Desktop](/desktop/)
- [How to Run Local AI on Linux in 2026 (No Cloud, No Account)](/articles/how-to-run-local-ai-on-linux-in-2026-no-cloud-no-account/)
- [How to Use Your NVIDIA GPU for Local AI on Linux in 2026](/articles/how-to-use-your-nvidia-gpu-for-local-ai-on-linux-in-2026/)
- [How to Compare Local AI Models Side by Side on Linux in 2026 (One Question, Up to Six Models)](/articles/how-to-compare-local-ai-models-side-by-side-on-linux-in-2026-one-question-up-to-six-models/)
