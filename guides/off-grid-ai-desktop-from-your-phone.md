---
layout: default
title: How to Use Off Grid AI Desktop From Your Phone in 2026
parent: Guides
article_topic: "Models & performance"
article_platform: "Phone"
nav_order: 17
description: Use the models on your Mac, Windows, or Linux computer from your Android phone or iPhone. Off Grid AI finds Off Grid AI Desktop on your Wi-Fi, and your chats stay between your own devices.
faq:
  - q: Can I use Off Grid AI Desktop from my phone?
    a: Yes. Off Grid AI Desktop serves its models on port 7878. Off Grid AI on Android or iPhone finds it on your Wi-Fi, or you add its address by hand, and then you pick a desktop model from the model picker.
  - q: Does it need internet?
    a: No. The phone talks to your computer over your own Wi-Fi. Nothing goes to a cloud service.
  - q: Do I need Pro for this?
    a: No. The desktop gateway starts with the app, and Remote Servers is part of the free mobile app.
  - q: Why can't my phone find my computer?
    a: Check that Off Grid AI Desktop is open, both devices are on the same Wi-Fi, and your computer's firewall allows Off Grid AI to accept connections. If the scan still finds nothing, add the address by hand, for example http://192.168.1.50:7878.
---

# How to Use Off Grid AI Desktop From Your Phone in 2026

Your phone gets your computer's models. Off Grid AI Desktop runs the model on your Mac or PC. Off Grid AI on your phone sends the prompt over your Wi-Fi and shows the answer. Models too big for your phone work from your pocket, and nothing leaves your network.

---

## What you need

- A Mac, Windows PC, or Linux computer running [Off Grid AI Desktop]({{ '/desktop/' | relative_url }}) with at least one model downloaded
- An Android phone with [Off Grid AI](https://play.google.com/store/apps/details?id=ai.offgridmobile&utm_source=offgrid-docs&utm_medium=website&utm_campaign=download), or an iPhone with [Off Grid AI](https://apps.apple.com/us/app/off-grid-local-ai/id6759299882?utm_source=offgrid-docs&utm_medium=website&utm_campaign=download)
- Both devices on the same Wi-Fi network

Both apps are free for this. You do not need Pro.

---

## Step 1 - Open Off Grid AI Desktop

Open the app and leave it running. There is nothing to switch on.

Off Grid AI Desktop starts its **Gateway** when it opens. The Gateway is an OpenAI-compatible API on port **7878**, and it listens on your local network as well as on the computer itself. You can see it in the sidebar under **Gateway**.

If your computer's firewall asks whether Off Grid AI may accept incoming connections, allow it. Your phone cannot reach the Gateway otherwise.

---

## Step 2 - Find your desktop from your phone

On your phone, open Off Grid AI → **Settings** → **Remote Servers**.

1. Under **Scan for**, leave **Off Grid AI Desktop (7878)** on
2. Tap **Scan network**
3. Wait while the app checks your Wi-Fi. It shows how many addresses it has checked and how many servers it found
4. Your computer appears under **Servers** as **Off Grid AI Gateway**, with the status **Connected**

On iPhone, the first scan asks for permission to use your local network. Allow it. If you said no earlier, turn it back on in iPhone **Settings** → **Privacy & Security** → **Local Network** → **Off Grid AI**.

Want your phone to look on its own? Turn on **Auto-discover on Wi-Fi**. The app then looks for servers each time you open Remote Servers. It is off until you turn it on.

---

## Step 3 - Or add the address by hand

Use this if the scan finds nothing, or if your phone and computer sit on different parts of the network.

First, find your computer's local IP address:

**macOS:** System Settings → Network → Wi-Fi → Details → IP address (for example `192.168.1.50`)

**Windows:** Open PowerShell → `ipconfig` → IPv4 Address under your Wi-Fi adapter

**Linux:** `ip addr show` → look for your Wi-Fi interface

Then, on your phone:

1. In **Remote Servers**, tap **Add manually**
2. **Server name:** anything you like, for example `Sam's MacBook`
3. **Address:** `http://192.168.1.50:7878` (use your computer's IP, keep `:7878`)
4. Tap **Test connection**
5. When the test passes, tap **Add server**

The **Add server** button stays greyed out until the test passes.

---

## Step 4 - Pick a desktop model and chat

Open the model picker in a chat. Your desktop models appear in their own section, under the server's name, with a **Remote** badge. Tap one to use it.

Your phone lists the models installed on your desktop. When you pick one, the desktop switches to that model. Want a model your phone doesn't list yet? Download it in Off Grid AI Desktop first.

You can also tap the server in **Remote Servers** to use it. The row then shows **In use**. Tap it again to stop.

To set more than chat, tap **Edit** on the server. Under **Remote media**, choose which desktop model handles each job: **Text model**, **Image model**, **Transcription model**, and **Voice model**. Leave a field empty to keep that work on your phone.

Switching back to a model on your phone takes one tap in the same picker.

---

## Troubleshooting

**The scan finds nothing.**
Check that Off Grid AI Desktop is open on your computer. Check that both devices are on the same Wi-Fi, not a guest network. The scan only looks at port 7878 for the desktop, so make sure **Off Grid AI Desktop (7878)** is on under **Scan for**. Then try **Add manually**.

**The server says Not answering.**
Your computer may be asleep, or the desktop app may be closed. Wake the computer, open the app, and tap **Test** on the server row.

**Test connection fails on an address you typed.**
Check the IP address again. Home routers can give your computer a new one. Make sure the address starts with `http://` and ends with `:7878`. Check that your computer's firewall allows Off Grid AI.

**Another app on your computer already uses port 7878.**
Off Grid AI Desktop then starts its Gateway on a different port, and your phone will not find it on 7878. Quit the other app and restart Off Grid AI Desktop.

**Your phone warns that the server is on the public internet.**
You typed a public address. Use your computer's private address instead, one that starts with `192.168.`, `10.`, or `172.16` to `172.31`. A private address keeps your prompts between your own devices.

---

## A note on privacy

The Gateway has no password. Any device that can reach your computer on your network can use its models. Use this on networks you trust, like your home or office Wi-Fi.

---

## FAQ

**Can I use Off Grid AI Desktop from my phone without internet?**
Yes. The phone and computer talk over your local Wi-Fi. No internet connection is needed once the models are downloaded.

**Does this work on iPhone and Android?**
Yes. Remote Servers works the same way on both. iPhone asks for local network permission the first time.

**Which desktop models can my phone use?**
Any model installed in Off Grid AI Desktop. Pick it from the model picker on your phone and the desktop loads it.

**Can I still use Ollama or LM Studio?**
Yes. Remote Servers scans for Ollama (11434) and LM Studio (1234) too, and you can keep all of them saved.

---

## Related guides

- [Remote Servers - Connect Ollama, LM Studio, and LocalAI]({{ '/guides/remote-servers' | relative_url }})
- [How to Use Ollama From Your Android Phone in 2026]({{ '/guides/ollama-android' | relative_url }})
- [How to Use LM Studio From Your Android Phone in 2026]({{ '/guides/lm-studio-android' | relative_url }})
- [Which Model Should I Use?]({{ '/guides/which-model' | relative_url }})
