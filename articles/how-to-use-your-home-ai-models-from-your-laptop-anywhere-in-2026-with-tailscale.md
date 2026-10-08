---
layout: content
title: "How to Use Your Home AI Models From Your Laptop Anywhere in 2026 (With Tailscale)"
description: "Use a lightweight laptop to chat with AI running on your own home computer. Connect OGAD to a private Tailscale address and keep the model on your own hardware."
date: "2026-09-29"
permalink: /articles/how-to-use-your-home-ai-models-from-your-laptop-anywhere-in-2026-with-tailscale/
published_at: "2026-09-29T08:47:14.316Z"
article_topic: "Sync & sharing"
article_platform: "Computer"
devto_article: true
devto_id: 4769873
devto_url: "https://dev.to/alichherawalla/how-to-use-your-home-ai-models-from-your-laptop-anywhere-in-2026-with-tailscale-1k71"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2Fslkrmio0k0t2f5lgof60.png"
---
Your laptop does not need to fit the same AI model as your home computer. OGAD (Off Grid AI Desktop) can send a chat request to a model server on your own machine at home. Tailscale gives that machine a private address your laptop can reach while travelling. The model runs at home; you use the conversation on your laptop.

[Download OGAD](https://getoffgridai.co/desktop/) | [Install Tailscale](https://tailscale.com/docs/how-to/quickstart)

![Off Grid AI Gateway: local API endpoints for chat, images, and audio.](/assets/img/home/app/gateway-light-1760.webp)

---

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@getoffgridai.co](mailto:support@getoffgridai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

This is useful if you have a small travel laptop and a desktop with more memory or a better GPU. You can keep the larger model on the computer that can run it, then use OGAD as your familiar chat interface away from home.

You normally need internet on both ends when away from home. This guide keeps inference on your own hardware; it does not promise an offline connection across different locations.

## What does the setup look like?

Run OGAD and a downloaded local chat model on your home computer. Install Tailscale on that computer and on your laptop. On the laptop, add the home computer's Tailscale address under OGAD's **Remote model server** settings and select the model it serves.

| Device | Its job |
|---|---|
| Home computer | Stores and runs the model; serves its API |
| Travel laptop | Runs OGAD's chat interface and sends requests |
| Tailscale on both | Provides a private network route between them |

Tailscale assigns devices private addresses that stay separate from the address given by each Wi-Fi network. You use the home's Tailscale address rather than its home-router address. [Tailscale IP addresses](https://tailscale.com/docs/concepts/tailscale-ip-addresses) explains that distinction.

The first path below uses OGAD on both devices. An existing home-lab server can also work if it exposes the compatible model-list and chat API expected by OGAD. Tailscale supplies reachability; it does not turn an arbitrary service into a compatible AI server.

## What do you need before leaving home?

Prepare the model on a supported home computer, check that it answers locally, and keep that computer awake while you need it remotely. Install OGAD on the laptop and Tailscale on both devices. Sign both into your own tailnet, or another tailnet whose access policy permits this connection.

The basic gateway and remote-model chat path are core OGAD features. They do not require Pro device-sync pairing. Pro sync is a separate option if you also want conversations and projects replicated between devices.

The OGAD 0.0.51 gateway listens on port **7878**. It does not require an API key. Its network access therefore matters: allow only the trusted devices and networks that should be able to use it. Keep this service private; do not forward port 7878 from your home router to the public internet.

If you run a different compatible server that requires an API key, use that server's key in the client settings. Adding a key to the client does not add authentication to an unauthenticated server.

## How do you prepare the home computer?

Open OGAD, download a chat model that fits the home computer, and select it. Ask one short question on that computer before configuring remote access. Then check that the gateway can list the available model.

1. Open **Models** and prepare a local text model.
2. Start a chat and ask a simple question.
3. Open **Gateway** to see the local API address.
4. In a browser on the home computer, open `http://127.0.0.1:7878/v1/models`.

You should receive a model list rather than a connection error. This checks that the serving process is available before you introduce the remote network.

Keep the home host's selected model local. If that host is configured to forward requests to a cloud model, connecting to it through Tailscale does not make the final inference local.

The home computer must remain powered on, awake, and connected. Closing an app or allowing the machine to sleep can make its model service unavailable even though the Tailscale device remains in your saved list.

## How do you connect the laptop through Tailscale?

Install and connect Tailscale on both devices, then copy the home computer's Tailscale IPv4 address from its device entry. From the laptop, open that address with port 7878 and the model-list path. Use the actual address assigned to your computer.

For example, if your home host were assigned `100.101.102.103`, the check would be:

```text
http://100.101.102.103:7878/v1/models
```

This is an example, not a server you should use. Replace it with your host's address.

If the local model-list check worked but the laptop cannot reach this one, check that Tailscale is connected on both devices and that access policy and the home computer's firewall permit the laptop to reach TCP port 7878. Configure that access for trusted devices rather than opening the service broadly.

You do not need an exit node merely to reach one home computer's private address. Follow Tailscale's [setup guide](https://tailscale.com/docs/how-to/quickstart) for the device connection; this guide uses an ordinary connection between two enrolled devices.

## How do you select the home model in OGAD on the laptop?

Open **Settings → Remote model server** on the laptop. Choose **Add server**, enable **Use remote server**, and enter a name and the home host's Tailscale address. Test the connection, choose the discovered model, and save the settings.

Use these values for the OGAD-to-OGAD setup:

| Field | Value |
|---|---|
| Server name | A name you recognize, such as Home AI |
| Address | `http://YOUR-TAILSCALE-IP:7878` |
| API key | Leave empty for the OGAD gateway described here |
| Model | Select the model returned by Test connection |

The settings add `/v1` when needed. Do not paste the full `/v1/models` test URL into the base-address field.

Start with ordinary text chat. Leave remote screen-image access off unless you later choose a computer-use workflow that requires it. Sending a text question does not require granting a server access to screenshots of your laptop.

## How do you check it away from home?

Connect the laptop through a different network, such as your phone's hotspot, while keeping Tailscale connected. Open OGAD, select Home AI, and send a short question. Confirm that the home model returns an answer.

Try:

> Give me a short checklist for reviewing a first draft.

This is a check you can perform before a trip. It establishes that the route works outside your home Wi-Fi, rather than only on the same local network.

Do not judge the setup only by speed. The home model, its memory use, the network connection, and the route between devices all affect the delay. A larger model can solve a capacity problem while still taking longer to answer.

## Does Tailscale always send traffic directly between the two devices?

No. Tailscale tries to establish a direct connection, but it can use an encrypted relay when a direct route is unavailable. Tailscale encrypts traffic between your devices, including when it passes through a relay. A relay changes the network path; it does not mean an AI provider runs the model. See Tailscale's [connection types](https://tailscale.com/docs/reference/connection-types).

Your chosen home machine still runs the AI. Remote access needs a working network connection, and the route can include an encrypted relay.

## What should you check if it stops working?

| Symptom | First check |
|---|---|
| Local model list fails on the home host | OGAD is running and its model service is ready |
| Local check works, Tailscale address fails | Tailscale state, access policy, firewall, and correct private address |
| Server connects but no model can be selected | A compatible local model is installed and available on the host |
| It worked at home but fails while travelling | The client is using the Tailscale address, not a home-only `192.168…` address |
| Replies stop after the host is left alone | The home computer may have gone to sleep |
| The laptop shows the wrong model | Check the active remote server and saved model selection |

## Use the same home model from your phone after leaving Wi-Fi

OGAM (Off Grid AI Mobile) can use the same home model server. Install and connect Tailscale on your Android phone or iPhone using a tailnet that can reach the home computer. Keep Tailscale active on the computer too. This extends the private network route; it does not move the model onto the phone.

In OGAM, open **Settings > Remote Servers** and choose **Add manually**. Enter a name such as Home AI and the computer's Tailscale address with port 7878, for example `http://100.101.102.103:7878`. Replace that sample address with your own. Leave the API key empty for the OGAD gateway described above, select **Test connection**, choose the discovered **Text model**, and select **Add server**. In chat, choose that model under the saved server's name.

Check this on mobile data with home Wi-Fi off, while Tailscale remains connected. Send one short question and confirm that the home computer answers. Both ends need a working internet connection for this away-from-home route, and the computer must stay awake. If a saved server uses its home-only 192.168 address, add a separate entry using the Tailscale address; network scanning is not the way to discover a host across this route.

This section is remote text inference. Pro device-sync pairing is separate: pairing devices does not by itself provide an internet route between them. The earlier phone guides cover local-network text, image, and transcription setup; here the extra step is using a reachable private Tailscale address after leaving home.

[Get OGAD](https://getoffgridai.co/desktop/) on the laptop you carry. Start with one working home model and one remote question. You can use your existing home hardware without carrying its weight or fitting its model into the laptop's memory.
