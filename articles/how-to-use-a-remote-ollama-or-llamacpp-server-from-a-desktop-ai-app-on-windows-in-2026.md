---
layout: content
title: "How to Use a Remote Ollama or llama.cpp Server From a Desktop AI App on Windows in 2026"
description: "Chat on your Windows laptop with models running on another PC's Ollama or llama.cpp server, with thinking, context and server status shown."
date: "2026-10-27"
permalink: /articles/how-to-use-a-remote-ollama-or-llamacpp-server-from-a-desktop-ai-app-on-windows-in-2026/
published_at: "2026-10-27T09:49:17Z"
article_topic: "Models & performance"
article_platform: "Windows"
devto_article: true
devto_id: 4927314
devto_url: "https://dev.to/alichherawalla/how-to-use-a-remote-ollama-or-llamacpp-server-from-a-desktop-ai-app-on-windows-in-2026-40pa"
---
Your Windows laptop has 16 GB of memory and integrated graphics. The tower in the next room has an NVIDIA RTX card and already runs Ollama or `llama-server` with a 30B model loaded. You want to chat with that model from the laptop, with chat history and a thinking switch, without copying a 20 GB file to a machine that cannot run it. Off Grid AI Desktop connects your laptop to that server. Its models show up next to your local ones, and the chat tells you which server answers and what it is waiting for.

## What you need

- A Windows 10 or 11 PC with an x64 processor. The Windows download is an x64 installer; there is no Windows on ARM build.
- Off Grid AI Desktop 0.0.55 or later, the current stable release. [Download Off Grid AI Desktop for Windows](/desktop/).
- Another computer on your network running Ollama or llama.cpp's `llama-server`, or any server with an OpenAI-compatible `/v1` API.
- The server's IP address, for example `192.168.1.30`. On a Windows server, run `ipconfig` and read the **IPv4 Address** line.
- No account and no payment. Remote servers are part of the free app.

Your laptop needs no GPU and no model file. The model runs on the server; your laptop sends text over your network.

## Step 1: Let the server accept calls from your network

By default both servers accept calls only from their own computer.

**Ollama on a Windows PC** listens on port 11434. Quit Ollama from its icon in the taskbar notification area. Open the Start menu, search for "environment variables", choose **Edit environment variables for your account**, and add a variable named `OLLAMA_HOST` with the value `0.0.0.0`. Or run this in a terminal:

```powershell
setx OLLAMA_HOST 0.0.0.0
```

Then start Ollama again from the Start menu so it reads the new value.

**llama.cpp** listens on port 8080. Start `llama-server` with `--host`:

```powershell
llama-server.exe -m qwen3.5-27b-q4_k_m.gguf --host 0.0.0.0 --port 8080 -ngl 99
```

The `-ngl 99` flag puts every layer on the NVIDIA GPU when you use a CUDA build of llama.cpp.

The first time a server listens on the network, Windows Defender Firewall asks whether to allow it. Allow it on **Private networks** only. If you missed the prompt, add a rule in an administrator PowerShell window, with the port of your server:

```powershell
New-NetFirewallRule -DisplayName "Ollama" -Direction Inbound -Protocol TCP -LocalPort 11434 -Action Allow -Profile Private
```

Do this only on a network you trust.

## Step 2: Add the server in Off Grid AI Desktop

1. Open Off Grid AI Desktop on your laptop and click **Settings** in the sidebar.
2. Find the card **Remote model server**. It reads "Connect to a model server on your network or another trusted host."
3. Under **Saved servers**, click the **Add server** icon.
4. In **Server name**, type a name you will recognise in chat, for example `Gaming PC`.
5. In **Address**, type the server's address with its port: `http://192.168.1.30:11434` for Ollama, or `http://192.168.1.30:8080` for llama.cpp. You do not need to add `/v1`. The hint under the field shows the exact address the app will call, for example "Will connect to: http://192.168.1.30:11434/v1/models".
6. If the server needs a key, paste it into **API key (optional)**. The app encrypts the key with Windows' own data protection, tied to your Windows user account, and never writes it to a settings file in plain text.
7. Click **Test connection**. The status line reports how long the server took and how many models it found. If it reads "Connection failed.", go back to Step 1 and check the firewall rule.

## Step 3: Pick the models and save

1. Under **Text + Vision**, search the server's models and select the one you want to chat with. The line under it changes to "Selected: " and the model's name.
2. Optional: open **Other models**. If the server also offers image, voice or transcription models, pick them under **Image**, **Voice** and **Transcription**.
3. Leave **Use this server** on. Its hint reads "Off keeps it saved; other servers are unaffected."
4. Click **Save**. The status reads "Server saved and active."

Without a selected model, Save says "Test the connection and select at least one model first."

For a llama.cpp server, you also see **Allow screen images**. It stays off until you turn it on, and it controls whether Web Use and Computer Use may send screenshots of your PC to that server. Normal chat does not need it.

## Step 4: Chat on the remote model

Open a new chat with **Ctrl+T**. Open the model picker in the chat: the server's models carry a **Remote** tag, next to the models on your laptop. Pick one and type. While you chat, the app reports the remote model truthfully:

- **Which server answers.** The chat status shows the remote model and the server name, for example `Qwen 3.5 27B · Gaming PC`.
- **Thinking.** If the model can think, the thinking switch works on the remote server too. The app asks Ollama for the model's capabilities and asks `llama-server` for its chat template, so the switch sends the control that server reads.
- **Context window.** A chat on a remote model uses the server's context window, not your laptop's local setting. In the model settings, the **Context window** row reads "Set by the remote model server." A llama.cpp server reports its window, so you see the real number. Ollama does not report one, so the row reads **Not reported** and the server decides how long a reply can be.
- **Several chats at once.** Two chats on a remote model run side by side. Neither waits for the other to finish.

## Run several servers

You can save more than one server, for example Ollama on a gaming PC and `llama-server` on a workstation. Each one has its own **Use this server** switch, so you can turn one off without touching the others. Turning one off moves chat, image, voice or transcription only to a server that offers a model for it. Picking an image model on one server does not move your chat to that server.

If a server is off or removed while a chat uses it, the chat says so instead of quietly answering with a different model. **Change model** and **Remove** sit next to each saved server.

## When the server is another Off Grid AI Desktop

If the tower runs Off Grid AI Desktop, add its gateway at port 7878. It tells your laptop what a request waits for, so the chat shows "Waiting for Gaming PC · 2 ahead" or that the model is loading. With Ollama and llama.cpp the chat shows "Waiting for the model server..." until the first words arrive. See [how to run a local AI server for your whole team on Windows](/articles/how-to-run-a-local-ai-server-for-your-whole-team-on-windows-in-2026-ollama-alternative-no-cloud/).

## What this does not do

- It does not work outside your network by itself. To reach the tower at home from a cafe, use a private network such as Tailscale. See [how to use your home AI models from your laptop anywhere](/articles/how-to-use-your-home-ai-models-from-your-laptop-anywhere-in-2026-with-tailscale/).
- Reply speed is the server's speed plus network time.
- It does not download or manage models on the server. Pull models with `ollama pull`, or start `llama-server` with the model you want, then click **Test connection** again to refresh the list.
- Your prompts leave your laptop and go to that server. They stay on your network only if the server is on your network.

## FAQ

**Can I use Ollama running on another PC from my Windows laptop?**
Yes. Set `OLLAMA_HOST` to `0.0.0.0` on the server, restart Ollama, and allow port 11434 through Windows Defender Firewall. Then add `http://<server-ip>:11434` under **Settings** > **Remote model server** in Off Grid AI Desktop. The server's models appear in the model picker with a **Remote** tag.

**Does Off Grid AI Desktop work with llama.cpp's llama-server on Windows?**
Yes. Start `llama-server.exe` with `--host 0.0.0.0` and add `http://<server-ip>:8080` as a server. The app reads the server's context window and thinking support from `llama-server` itself.

**Why does Test connection fail when Ollama is running?**
Usually Ollama still listens only on its own PC, or the firewall blocks port 11434. Restart Ollama after setting `OLLAMA_HOST`, then check the inbound firewall rule on the server.

**Do I need an NVIDIA GPU in my laptop?**
No. The GPU work happens on the server. Your laptop only sends the conversation and shows the reply.

**Is it free?**
Yes. Remote servers are part of the free Off Grid AI Desktop app on Windows, with no account.

## Related

- [Download Off Grid AI Desktop](/desktop/)
- [How to Run LLMs Locally on Your Windows PC in 2026 (Completely Offline, No Subscription)](/articles/how-to-run-llms-locally-on-your-windows-pc-in-2026-completely-offline-no-subscription/)
- [How to Use Your NVIDIA GPU for Local AI on Windows in 2026](/articles/how-to-use-your-nvidia-gpu-for-local-ai-on-windows-in-2026/)
- [How to Compare Local AI Models Side by Side on Windows in 2026 (One Question, Up to Six Models)](/articles/how-to-compare-local-ai-models-side-by-side-on-windows-in-2026-one-question-up-to-six-models/)
