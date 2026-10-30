---
layout: content
title: "How to Use a Remote Ollama or llama.cpp Server From a Desktop AI App on Linux in 2026"
description: "Chat on your Linux laptop with models running on another machine's Ollama or llama.cpp server, with thinking, context and server status shown."
date: "2026-10-29"
permalink: /articles/how-to-use-a-remote-ollama-or-llamacpp-server-from-a-desktop-ai-app-on-linux-in-2026/
published_at: "2026-10-29T18:50:00Z"
article_topic: "Models & performance"
article_platform: "Linux"
devto_article: true
devto_id: 4943018
devto_url: "https://dev.to/alichherawalla/how-to-use-a-remote-ollama-or-llamacpp-server-from-a-desktop-ai-app-on-linux-in-2026-9dc"
---
Your Linux laptop has 16 GB of memory and no dedicated GPU. The box under your desk has an NVIDIA card and already runs Ollama or `llama-server` with a 30B model loaded. You want to chat with that model from the laptop, with chat history and a thinking switch, instead of a `curl` command or a browser tab. Off Grid AI Desktop connects your laptop to that server. Its models show up next to your local ones, and the chat tells you which server answers and what it is waiting for.

## What you need

- A Linux PC with an x86-64 (amd64) processor. The Linux downloads are an AppImage and a `.deb` package, both for amd64. There is no ARM Linux build.
- Off Grid AI Desktop 0.0.55 or later, the current stable release. [Download Off Grid AI Desktop for Linux](/desktop/). On Debian or Ubuntu, install the package with `sudo apt install ./off-grid-ai_0.0.55_amd64.deb`. On any other distribution, run `chmod +x off-grid-ai-0.0.55.AppImage` and start the AppImage.
- Another computer on your network running Ollama or llama.cpp's `llama-server`, or any server with an OpenAI-compatible `/v1` API.
- The server's IP address, for example `192.168.1.30`. On a Linux server, run `hostname -I` and take the first address.
- No account and no payment. Remote servers are part of the free app.

Your laptop needs no GPU and no model file. The model runs on the server; your laptop sends text over your network.

## Step 1: Let the server accept calls from your network

By default both servers accept calls only from their own computer.

**Ollama on a Linux server** runs as a systemd service on port 11434. Open an override file for it:

```bash
sudo systemctl edit ollama.service
```

Add these lines, save, and close the editor:

```ini
[Service]
Environment="OLLAMA_HOST=0.0.0.0"
```

Then reload and restart the service:

```bash
sudo systemctl daemon-reload && sudo systemctl restart ollama
```

**llama.cpp** listens on port 8080. Start `llama-server` with `--host`:

```bash
llama-server -m qwen3.5-27b-q4_k_m.gguf --host 0.0.0.0 --port 8080 -ngl 99
```

The `-ngl 99` flag puts every layer on the GPU when you use a CUDA build of llama.cpp.

If the server runs a firewall, open the port to your local network only. With `ufw` on Ubuntu:

```bash
sudo ufw allow from 192.168.1.0/24 to any port 11434 proto tcp
```

With `firewalld` on Fedora, use `sudo firewall-cmd --permanent --add-port=11434/tcp` and then `sudo firewall-cmd --reload`. Use port 8080 for `llama-server`. Do this only on a network you trust.

From the laptop, check the server answers before you open the app:

```bash
curl http://192.168.1.30:11434/v1/models
```

A list of models means the network side is done.

## Step 2: Add the server in Off Grid AI Desktop

1. Open Off Grid AI Desktop on your laptop and click **Settings** in the sidebar.
2. Find the card **Remote model server**. It reads "Connect to a model server on your network or another trusted host."
3. Under **Saved servers**, click the **Add server** icon.
4. In **Server name**, type a name you will recognise in chat, for example `GPU box`.
5. In **Address**, type the server's address with its port: `http://192.168.1.30:11434` for Ollama, or `http://192.168.1.30:8080` for llama.cpp. You do not need to add `/v1`. The hint under the field shows the exact address the app will call, for example "Will connect to: http://192.168.1.30:11434/v1/models".
6. If the server needs a key, paste it into **API key (optional)**. The app keeps the key in the system credential store, which on Linux is your desktop keyring, such as GNOME Keyring or KWallet. It does not write the key to a settings file in plain text.
7. Click **Test connection**. The status line reports how long the server took and how many models it found. If it reads "Connection failed.", run the `curl` check from Step 1 again.

## Step 3: Pick the models and save

1. Under **Text + Vision**, search the server's models and select the one you want to chat with. The line under it changes to "Selected: " and the model's name.
2. Optional: open **Other models**. If the server also offers image, voice or transcription models, pick them under **Image**, **Voice** and **Transcription**.
3. Leave **Use this server** on. Its hint reads "Off keeps it saved; other servers are unaffected."
4. Click **Save**. The status reads "Server saved and active."

Without a selected model, Save says "Test the connection and select at least one model first."

For a llama.cpp server, you also see **Allow screen images**. It stays off until you turn it on, and it controls whether Web Use and Computer Use may send screenshots of your desktop to that server. Normal chat does not need it.

## Step 4: Chat on the remote model

Open a new chat with **Ctrl+T**. Open the model picker in the chat: the server's models carry a **Remote** tag, next to the models on your laptop. Pick one and type. Your prompts go to that server, so they stay on your network when the server is on your network. While you chat, the app reports the remote model as it is:

- **Which server answers.** The chat status shows the remote model and the server name, for example `Qwen 3.5 27B · GPU box`.
- **Thinking.** If the model can think, the thinking switch works on the remote server too. The app asks Ollama for the model's capabilities and asks `llama-server` for its chat template, so the switch sends the control that server reads.
- **Context window.** A chat on a remote model uses the server's context window, not your laptop's local setting. In the model settings, the **Context window** row reads "Set by the remote model server." A llama.cpp server reports its window, so you see the real number. Ollama does not report one, so the row reads **Not reported** and the server decides how long a reply can be.
- **Several chats at once.** Two chats on a remote model run side by side. Neither waits for the other to finish.

## Run several servers

You can save more than one server, for example Ollama on the GPU box and `llama-server` on a workstation in the office. Each one has its own **Use this server** switch, so you can turn one off without touching the others. Turning one off moves chat, image, voice or transcription only to a server that offers a model for it. Picking an image model on one server does not move your chat to that server.

If a server is off or removed while a chat uses it, the chat says so instead of quietly answering with a different model. **Change model** and **Remove** sit next to each saved server.

New models appear after you pull them on the server with `ollama pull`, or restart `llama-server` with another file, and click **Test connection** again.

## When the server is another Off Grid AI Desktop

If the GPU box runs Off Grid AI Desktop, add its gateway at port 7878. It tells your laptop what a request waits for, so the chat shows "Waiting for GPU box · 2 ahead" or that the model is loading. With Ollama and llama.cpp the chat shows "Waiting for the model server..." until the first words arrive. See [how to run a local AI server for your whole team on Linux](/articles/how-to-run-a-local-ai-server-for-your-whole-team-on-linux-in-2026-ollama-alternative-no-cloud/).

To reach the server from outside your home or office, put both machines on a private network such as Tailscale and use the server's Tailscale address. See [how to use your home AI models from your laptop anywhere](/articles/how-to-use-your-home-ai-models-from-your-laptop-anywhere-in-2026-with-tailscale/).

## FAQ

**How do I make Ollama on Linux listen on the network?**
Run `sudo systemctl edit ollama.service`, add `Environment="OLLAMA_HOST=0.0.0.0"` under `[Service]`, then run `sudo systemctl daemon-reload` and `sudo systemctl restart ollama`. Open port 11434 in `ufw` or `firewalld` for your local network.

**Can I use Ollama running on another machine from my Linux laptop?**
Yes. Add `http://<server-ip>:11434` under **Settings** > **Remote model server** in Off Grid AI Desktop and click **Test connection**. The server's models appear in the model picker with a **Remote** tag.

**Does Off Grid AI Desktop work with llama.cpp's llama-server?**
Yes. Start `llama-server` with `--host 0.0.0.0` and add `http://<server-ip>:8080` as a server. The app reads the server's context window and thinking support from `llama-server` itself.

**Why does Test connection fail when Ollama is running?**
Usually Ollama still listens only on `127.0.0.1`, or the firewall blocks port 11434. Run `curl http://<server-ip>:11434/v1/models` from the laptop; if it does not answer, check the systemd override and the firewall rule.

**Do I need an NVIDIA GPU in my laptop?**
No. The GPU work happens on the server. Your laptop only sends the conversation and shows the reply.

**Is it free?**
Yes. Remote servers are part of the free Off Grid AI Desktop app on Linux, with no account.

## Related

- [Download Off Grid AI Desktop](/desktop/)
- [How to Run Local AI on Linux in 2026 (No Cloud, No Account)](/articles/how-to-run-local-ai-on-linux-in-2026-no-cloud-no-account/)
- [How to Use Your NVIDIA GPU for Local AI on Linux in 2026](/articles/how-to-use-your-nvidia-gpu-for-local-ai-on-linux-in-2026/)
- [How to Compare Local AI Models Side by Side on Linux in 2026 (One Question, Up to Six Models)](/articles/how-to-compare-local-ai-models-side-by-side-on-linux-in-2026-one-question-up-to-six-models/)
