---
layout: content
title: "How to Use a Remote Ollama or llama.cpp Server From a Desktop AI App on Your Mac in 2026"
description: "Chat on your Mac with models running on another computer's Ollama or llama.cpp server, with thinking, context and status shown right."
date: "2026-10-25"
permalink: /articles/how-to-use-a-remote-ollama-or-llamacpp-server-from-a-desktop-ai-app-on-your-mac-in-2026/
published_at: "2026-10-25T02:15:57Z"
article_topic: "Models & performance"
article_platform: "Mac"
devto_article: true
devto_id: 4913173
devto_url: "https://dev.to/alichherawalla/how-to-use-a-remote-ollama-or-llamacpp-server-from-a-desktop-ai-app-on-your-mac-in-2026-n6l"
---
Your MacBook Air has 16 GB of memory. The PC under your desk, or the Mac Studio in the office, has a big GPU and already runs Ollama or `llama-server` with a 30B model loaded. You want to chat with that model from your Mac, in a proper app with chat history, documents and thinking controls, without copying a 20 GB file to a laptop that cannot run it. Off Grid AI Desktop connects your Mac to that server. Its models show up next to your local ones, and the chat tells you which server answers and what it is waiting for.

## What you need

- A Mac with Apple silicon (M1 or later) and macOS 13 or later. The Mac download is built for Apple silicon only.
- Off Grid AI Desktop 0.0.55 or later, the current stable release. [Download Off Grid AI Desktop for Mac](/desktop/).
- Another computer on your network running Ollama or llama.cpp's `llama-server`, or any server with an OpenAI-compatible `/v1` API.
- The server's network address, for example `192.168.1.30`.
- No account and no payment. Remote servers are part of the free app.

Your Mac does not need to download the model. The model runs in the other computer's memory, and your Mac sends text over your network.

## Step 1: Let the server accept calls from your network

Both servers listen only on the computer they run on by default. Open them to your network first.

**Ollama** listens on port 11434. On the server, set `OLLAMA_HOST` to `0.0.0.0` and restart Ollama. If the server is a Mac running the Ollama app, run this in Terminal on that Mac, then quit and reopen Ollama:

```bash
launchctl setenv OLLAMA_HOST "0.0.0.0"
```

**llama.cpp** listens on port 8080. Start `llama-server` with `--host`:

```bash
llama-server -m qwen3.5-27b-q4_k_m.gguf --host 0.0.0.0 --port 8080
```

If the server's firewall asks whether to allow incoming connections, allow them. Only do this on a network you trust, or add an API key to the server.

## Step 2: Add the server in Off Grid AI Desktop

1. Open Off Grid AI Desktop and click **Settings** in the sidebar.
2. Find the card **Remote model server**. It reads "Connect to a model server on your network or another trusted host."
3. Under **Saved servers**, click the **Add server** icon.
4. In **Server name**, type a name you will recognise in chat, for example `Office PC`.
5. In **Address**, type the server's address with its port: `http://192.168.1.30:11434` for Ollama, or `http://192.168.1.30:8080` for llama.cpp. You do not need to add `/v1`. The hint under the field shows the exact address the app will call, for example "Will connect to: http://192.168.1.30:11434/v1/models".
6. If the server needs a key, paste it into **API key (optional)**. The key is stored in the macOS keychain, not in a settings file.
7. Click **Test connection**. The status line reads, for example, "Connected in 14 ms. 6 models found." If it reads "Connection failed.", go back to Step 1.

## Step 3: Pick the models and save

1. Under **Text + Vision**, search the server's models and select the one you want to chat with. The line under it changes to "Selected: " and the model's name.
2. Optional: open **Other models**. If the server also offers image, voice or transcription models, pick them under **Image**, **Voice** and **Transcription**.
3. Leave **Use this server** on. Its hint reads "Off keeps it saved; other servers are unaffected."
4. Click **Save**. The status reads "Server saved and active."

The app saves a server only after you pick at least one model. If you skip that, it says "Test the connection and select at least one model first."

For a llama.cpp server, you also see **Allow screen images**. It stays off until you turn it on, and it controls whether Web Use and Computer Use may send screenshots of your Mac to that server. Normal chat does not need it.

## Step 4: Chat on the remote model

Open a new chat with **Cmd+T**. Open the model picker in the chat: the server's models carry a **Remote** tag, next to the models on your Mac. Pick one and type.

While you chat, the app reports the remote model truthfully:

- **Which server answers.** The chat status shows the remote model and the server name, for example `Qwen 3.5 27B · Office PC`, instead of a stopped local engine.
- **Thinking.** If the model can think, the thinking switch works on the remote server too. The app asks Ollama for the model's capabilities and asks `llama-server` for its chat template, so the switch sends the control that server reads. The switch stays available while the server is still loading the model.
- **Context window.** A chat on a remote model uses the remote server's context window, not your Mac's local setting. In the model settings, the **Context window** row reads "Set by the remote model server." A llama.cpp server reports its window, so you see the real number. Ollama does not report one, so the row reads **Not reported** and the server decides how long a reply can be.
- **Several chats at once.** Two chats on a remote model run side by side. One no longer waits for the other to finish, as it would on a single local engine.

## Run several servers

You can save more than one server, for example Ollama on a gaming PC and `llama-server` on a Mac Studio. Each one has its own **Use this server** switch, so you can turn one off without touching the others. Turning one off moves chat, image, voice or transcription only to a server that offers a model for it. Picking an image model on one server does not move your chat to that server.

If a server is off or removed while a chat uses it, the chat says so. It does not quietly answer with a different model.

Use **Change model** next to a saved server to pick a different model from its list, and **Remove** to delete it.

## When the server is another Off Grid AI Desktop

If the other computer runs Off Grid AI Desktop, use its gateway at port 7878 instead of Ollama. That server tells your Mac what a request is waiting for, and the chat shows it: "Waiting for Office PC · 2 ahead" when other people are in line, or "Office PC is loading" and the model name while it loads. Ollama and llama.cpp do not send this, so with them the chat shows "Waiting for the model server..." until the first words arrive. See [how to run a local AI server for your whole team on your Mac](/articles/how-to-run-a-local-ai-server-for-your-whole-team-on-your-mac-in-2026-ollama-alternative-no-cloud/).

## What this does not do

- It does not work outside your network by itself. To reach a server at home from a cafe, use a private network such as Tailscale. See [how to use your home AI models from your laptop anywhere](/articles/how-to-use-your-home-ai-models-from-your-laptop-anywhere-in-2026-with-tailscale/).
- It does not make the server faster. Reply speed is the server's speed, plus a few milliseconds of network time.
- It does not download or manage models on the server. Pull models with `ollama pull`, or start `llama-server` with the model you want, then click **Test connection** again to refresh the list.
- With Ollama, the app cannot show a context window, because Ollama does not report one.
- Your prompts leave your Mac and go to that server. They stay on your network only if the server is on your network.

## FAQ

**Can I use Ollama running on another computer from my Mac?**
Yes. Set `OLLAMA_HOST=0.0.0.0` on the server, then add `http://<server-ip>:11434` under **Settings** > **Remote model server** in Off Grid AI Desktop. The server's models appear in the model picker with a **Remote** tag.

**Does Off Grid AI Desktop work with llama.cpp's llama-server?**
Yes. Start `llama-server` with `--host 0.0.0.0` and add `http://<server-ip>:8080` as a server. The app reads the server's context window and thinking support from `llama-server` itself.

**Do I need to download the model to my Mac?**
No. The model stays on the server. Your Mac sends the conversation over the network and shows the reply.

**Can I switch between local and remote models?**
Yes. Local and remote models sit in the same model picker. Pick a local model for offline work and a remote one when you are on the same network as the server.

**Is it free?**
Yes. Remote servers are part of the free Off Grid AI Desktop app on Mac, with no account.

## Related

- [Download Off Grid AI Desktop](/desktop/)
- [How to Run LLMs Locally on Your Mac in 2026 (Completely Offline, No Subscription)](/articles/how-to-run-llms-locally-on-your-mac-in-2026-completely-offline-no-subscription/)
- [How to Compare Local AI Models Side by Side on Your Mac in 2026 (One Question, Up to Six Models)](/articles/how-to-compare-local-ai-models-side-by-side-on-your-mac-in-2026-one-question-up-to-six-models/)
- [How to Run a Local AI Server for Your Whole Team on Your Mac in 2026 (Ollama Alternative, No Cloud)](/articles/how-to-run-a-local-ai-server-for-your-whole-team-on-your-mac-in-2026-ollama-alternative-no-cloud/)
