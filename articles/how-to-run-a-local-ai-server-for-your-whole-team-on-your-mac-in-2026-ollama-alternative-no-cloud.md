---
layout: content
title: "How to Run a Local AI Server for Your Whole Team on Your Mac in 2026 (Ollama Alternative, No Cloud)"
description: "Turn one Mac into a shared AI server for your team: several people use its local models at once, each with their own API key."
date: "2026-10-24"
permalink: /articles/how-to-run-a-local-ai-server-for-your-whole-team-on-your-mac-in-2026-ollama-alternative-no-cloud/
published_at: "2026-10-24T02:54:02Z"
article_topic: "Automation & tools"
article_platform: "Mac"
devto_article: true
---
You have one Mac with plenty of memory and a team that wants to use local AI. Buying everyone a big machine is expensive, and sending your code and documents to a cloud API is the thing you were trying to avoid. Off Grid AI Desktop can turn that one Mac into a shared AI server. Its gateway has a **Team** mode that answers several people at once, gives each person their own API key, and keeps the Mac awake while it works. Every request stays on your network.

## What you need

- A Mac with Apple silicon (M1 or later) and macOS 13 or later. The Mac download is built for Apple silicon only.
- Off Grid AI Desktop 0.0.55 or later. Team mode is in the current stable release, 0.0.55. [Download Off Grid AI Desktop for Mac](/desktop/).
- A chat model downloaded in the app, for example Qwen 3.5 9B.
- The other computers on the same network as the Mac, such as your office Wi-Fi.
- No account and no payment. The gateway and Team mode are part of the free app.

More unified memory means more people at once. With **Auto**, the app opens up to 4 requests at once on a Mac with 32 GB or less, up to 8 on a Mac with up to 96 GB, and up to 16 above that, such as a Mac Studio with 128 GB. Inside that cap, the real number comes from the memory left over after the model loads, so each request still has room for a long conversation.

## Step 1: Open the Gateway

1. Open Off Grid AI Desktop and click **Gateway** in the sidebar.
2. The screen reads "One OpenAI-compatible API for every model on this Mac." Under **Base URL** you see `http://127.0.0.1:7878/v1`. That address is for the Mac itself.
3. For other computers, use your Mac's network address with the same port. Find it in **System Settings** > **Wi-Fi** > **Details** next to your network, under **IP address**. If it reads `192.168.1.20`, your team uses `http://192.168.1.20:7878/v1`.

The gateway listens on port 7878 on every network interface, so other devices on the network can reach it as soon as the app runs. If the macOS firewall is on and asks whether to allow incoming connections for Off Grid AI Desktop, click **Allow**.

## Step 2: Switch from Just me to Team

1. On the right side of the Gateway screen, find **Clients**.
2. The switch reads **Just me** and **Team**. **Just me** is the default: one request at a time, at full speed.
3. Click **Team**. Its tooltip reads "Several clients at once; extras wait their turn."
4. A **Requests at once** menu appears. Leave it on **Auto**, which shows the maximum your Mac allows in brackets, for example **Auto (8)**. Or pick a lower number, such as **2 at once**, if you want each answer to come back faster.

The change applies to the next request. If someone is mid-answer when you change a setting, the app waits for that answer to finish before it restarts the engine, for up to a minute, so nobody gets a reply cut in half.

When every slot is busy, new requests wait in line in the order they arrived. When the line is full, the gateway answers with HTTP 429 and tells the client to retry in 2 seconds, so a client backs off instead of hanging.

## Step 3: Give each person an API key

By default the gateway does not ask for a key. On a shared network, turn keys on.

1. Under **API keys**, turn on the switch. Its label changes to **API key required**.
2. In the field that reads "New key name: phone, laptop, or service", type a name for one person or tool, for example `priya-laptop`.
3. Pick an **Expiry**: **7 days**, **30 days**, **90 days**, **Custom date and time** or **No expiry**.
4. Click **Create key**.
5. Copy the key with the copy icon. The app says "Copy this key now. It will not be shown again."
6. Repeat for each person or tool. The app's own hint is "Use one key per client."

Each key in the list shows whether it is **Active**, **Expired** or **Revoked**, and when it was last used. If a laptop is lost, click the revoke icon next to that key. Requests with that key are refused from then on, and nobody else needs a new one. The keys are stored in the macOS keychain, not in a settings file.

## Step 4: Connect your team's tools

The gateway speaks the OpenAI API, so most tools that let you set a base URL and an API key can use it. The **Quick start** section on the Gateway screen has copyable code for curl, Python, JavaScript and image generation. From another computer, the Python version looks like this:

```python
from openai import OpenAI

client = OpenAI(base_url="http://192.168.1.20:7878/v1", api_key="THE_KEY_YOU_COPIED")
resp = client.chat.completions.create(
    model="local",
    messages=[{"role": "user", "content": "Summarise this changelog in two lines."}],
)
print(resp.choices[0].message.content)
```

A request that names `local` or no model runs on the chat model loaded on the Mac. The **Endpoints** list on the Gateway screen shows what else the server offers: chat with images, text to image, speech to text, text to speech, embeddings and the model list.

To use the Mac's models from the Off Grid AI phone app, follow the guide to [use Off Grid AI Desktop from your phone](/guides/off-grid-ai-desktop-from-your-phone/) and give the phone its own key.

## Step 5: See who is using it

Open **Settings** and find **AI activity**. Every request is listed with its model and timing, and a request sent with a key shows that key's name beside its source. A request sent without a key shows no name.

For scripts and monitoring, `GET /v1/gateway/status` returns the mode, the requests-at-once setting, and for each part of the server how many requests are running, waiting and refused. It needs the same key as every other route.

## Keep it serving

In Team mode the Mac stays awake while it is answering, and is allowed to sleep a minute after the last request ends. In **Just me** mode it does not hold the Mac awake.

To serve without the desktop window, start the app from Terminal in server-only mode, with Team mode for that run only:

```bash
"/Applications/Off Grid AI Desktop.app/Contents/MacOS/Off Grid AI Desktop" --server-only --gateway-mode team --gateway-clients auto
```

`--gateway-clients` takes `auto` or a number. These flags apply to that launch and do not change the settings you chose in the app. The environment variables `OFFGRID_GATEWAY_MODE` and `OFFGRID_GATEWAY_CLIENTS` do the same.

## What this does not do

- It does not make one answer faster. Each extra person shares the same GPU and memory bandwidth, so with four people typing at once, each answer streams slower than it would for one person.
- Image generation runs one picture at a time even in Team mode. A second image request waits for the first.
- It does not reach people outside your network. There is no relay or cloud tunnel. Remote staff need a VPN into your office network.
- It does not stop a MacBook sleeping when you close the lid. For a shared server, leave the lid open or use a Mac mini or Mac Studio.
- Without the API key switch on, anyone on the same network can use the models. Turn keys on before you share the address.

## FAQ

**Is Off Grid AI Desktop an alternative to Ollama for a team server?**
Yes, for teams whose tools speak the OpenAI API. It serves chat, vision, image generation, speech and embeddings from one address, with per-person API keys and a request log built in.

**How many people can use one Mac at once?**
With **Auto**, up to 4 requests at once on a Mac with 32 GB or less, up to 8 up to 96 GB, and up to 16 above that, limited further by the memory your model leaves free. More people can send requests; the extra ones wait in line.

**Does my team's data leave the office?**
No. Requests go from each computer to the Mac on your network and the models run on the Mac. Nothing is sent to a cloud service.

**Can I revoke one person's access?**
Yes. Click the revoke icon next to their key under **API keys**. Their requests are refused and every other key keeps working.

**Is Team mode free?**
Yes. The gateway, Team mode and API keys are part of the free Off Grid AI Desktop app on Mac, with no account.

## Related

- [Download Off Grid AI Desktop](/desktop/)
- [How to Run LLMs Locally on Your Mac in 2026 (Completely Offline, No Subscription)](/articles/how-to-run-llms-locally-on-your-mac-in-2026-completely-offline-no-subscription/)
- [How to Compare Local AI Models Side by Side on Your Mac in 2026 (One Question, Up to Six Models)](/articles/how-to-compare-local-ai-models-side-by-side-on-your-mac-in-2026-one-question-up-to-six-models/)
- [How to Use AI Models on Your Mac From Your Android Phone in 2026 (No Internet Required)](/articles/how-to-use-ai-models-on-your-mac-from-your-android-phone-in-2026-no-internet-required/)
