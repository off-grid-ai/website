---
layout: content
title: "How to Compare Local AI Models Side by Side on Windows in 2026 (One Question, Up to Six Models)"
description: "Ask one question and watch up to six local models answer it side by side in one window on your Windows PC, then keep the one that suits your work."
date: "2026-10-27"
permalink: /articles/how-to-compare-local-ai-models-side-by-side-on-windows-in-2026-one-question-up-to-six-models/
published_at: "2026-10-26T18:50:43Z"
article_topic: "Models & performance"
article_platform: "Windows"
devto_article: true
---
You have Ollama or LM Studio on your Windows PC, a few models pulled, and one question: which of them writes the best answer for your work? Pasting the same prompt into one chat after another is slow, and by the third model you have forgotten the first answer. Off Grid AI Desktop splits its chat into two to six panes. Each pane can run on its own model, and one question goes to all of them at once, so the answers arrive next to each other in one window.

## What you need

- A Windows 10 or 11 PC with an x64 processor. The Windows download is an x64 installer; there is no Windows on ARM build.
- Off Grid AI Desktop 0.0.55 or later. Split view is in the current stable release, 0.0.55. [Download Off Grid AI Desktop for Windows](/desktop/).
- At least one chat model downloaded in the app, such as Qwen 3.5 9B. With an NVIDIA GPU and the app's optional NVIDIA download, it runs on CUDA; without one, on Vulkan or the CPU.
- For more than one model: a model server the app can reach. That can be Ollama or LM Studio on the same PC, a llama.cpp server, or another computer on your network running Off Grid AI Desktop.
- No account and no payment. Split view is part of the free app.

## How the panes choose a model

Every pane has a **Model for this pane** picker at the top. It offers two kinds of choice:

- **Active model**: the model loaded in Off Grid AI Desktop itself, the one you picked under **Active models**. Every pane set to this uses the same model.
- A model from a saved server. Each entry shows the model name, a dot, and the server name, so you can tell two copies of the same model apart.

So to compare different models, put one pane on **Active model** and point the others at models served by Ollama, LM Studio or another PC.

## Step 1: Add a model server

1. Start your server. Ollama for Windows serves from its tray icon once it is running. In LM Studio, start its local server.
2. In Off Grid AI Desktop, open **Chat** from the sidebar.
3. Click the gear icon at the top right (**Settings**) and choose the **Remote** tab.
4. Click **Add server**.
5. Type a **Server name**, for example "Ollama on this PC".
6. Type the **Address**. Ollama on the same PC answers at `http://127.0.0.1:11434`, and LM Studio at `http://127.0.0.1:1234`. The app adds `/v1` when needed, and the hint under the field shows the exact address it will call.
7. If the server needs one, type its key in **API key (optional)**. The key is encrypted with Windows' own data protection for your user account, not written to a plain settings file.
8. Click **Test connection**. On success the status line reads "Connected in" followed by the time in milliseconds and the number of models found.
9. Under **Text + Vision**, search for and select a model.
10. Leave **Use this server** on and click **Save**.

Saving a new server with a chat model also moves the app's chat to that server. If you want **Active model** to stay on your downloaded model, click the chip icon at the top right (**Active models**) and pick your local model again.

Repeat for each server. Every chat model a saved server offers appears in the pane pickers.

## Step 2: Split the chat

1. In **Chat**, click the split icon at the top right. Its tooltip reads **Open tabs side by side**.
2. The chat opens as panes, one for each chat tab you had open, up to six. With fewer than two tabs open, you still get two panes, and the extra pane starts on a new chat.
3. Use the minus and plus buttons next to the pane count to change the number of panes. Their tooltips read **Remove the last pane** and **Add a pane**. The count runs from 2 to 6.

Two or three panes sit in one row, four make a two by two grid, and five or six make three columns and two rows. Maximise the window first so six panes stay readable. **Active models** and **Settings** show once, in the top right pane, because they apply to the whole app.

## Step 3: Pick a model for each pane

1. Click **Model for this pane** in the first pane and choose **Active model**.
2. In each other pane, choose a model from a server. The list is searchable, which helps when Ollama holds a dozen tags.
3. The picker rereads the servers' model lists each time you open it, so a newly added model appears without closing the split.

The app remembers each pane's choice, so the next time you split, every pane starts on the model you gave it last time.

## Step 4: Ask one question

With split view on, the panes share one input at the bottom of the window. This is the default, shown as **One input for every pane** in the top right controls.

1. Type your question in the shared input and send it.
2. Every pane sends the same question to its own model, and the answers stream in side by side.
3. Files you attach to the shared input go to every pane too, so you can compare how each model reads the same PDF or screenshot.
4. To stop, click Stop in the shared input. It stops every pane that is still answering.

For a follow-up to one model only, switch to **An input in each pane**. Each pane then gets its own input.

Each pane keeps its own chat tabs, its own gallery and its own tasks. Press Ctrl+T to start a new chat in the pane you are typing in; the other panes keep their chats.

## Step 5: Go back to one chat

Click the same split icon again. Its tooltip now reads **One chat**. Your pane chats are saved like any other chat. The window can narrow to 450 pixels wide, so it fits beside your editor when you snap windows with Windows+Left and Windows+Right.

## What this does not do

- It does not load several models inside Off Grid AI Desktop from the split view. Every pane on **Active model** uses the same in-app model. Different models come from servers.
- Models on one PC share its graphics memory. If the app's model and Ollama's models together are larger than your GPU's VRAM, the overflow moves to system RAM and that model answers much more slowly, or fails to load. Use smaller models, fewer panes, or a second PC for the bigger ones.
- If a pane's server is turned off or removed, that pane does not quietly answer with another model. It tells you the server is off or gone and asks you to pick another model for that pane.
- Split view is not kept across restarts. When you close and reopen the app, Chat opens as one chat; the pane model choices are kept for the next split.

## FAQ

**How do I compare two local LLMs on Windows?**
Add Ollama or LM Studio as a server under **Settings** > **Remote** in Off Grid AI Desktop, then click **Open tabs side by side** in Chat. Set one pane to **Active model**, the other to a server model, and send one question.

**How many models can I compare at once?**
Up to six. Each pane can use a different model, as long as your PC or servers can hold them in memory.

**Can I compare Ollama models with each other?**
Yes. Add Ollama once as a server, then give each pane a different Ollama model from **Model for this pane**. Ollama may unload one model to load the next if they do not all fit in VRAM, which adds a pause before that pane answers.

**Can a pane use a model on another PC?**
Yes. Add that PC's address under **Remote**, for example `http://192.168.1.20:11434`. Ollama listens only on its own PC by default, so on the other machine set `OLLAMA_HOST` to `0.0.0.0` and allow the port through Windows Defender Firewall.

**Does comparing models send my prompt to the cloud?**
No. Each pane sends the question only to its own model: the one inside the app, or the server address you typed. If every server is on your PC or home network, the prompt stays there.

**Is split view free?**
Yes. It is part of the free Off Grid AI Desktop app on Windows, with no account.

## Related

- [Download Off Grid AI Desktop](/desktop/)
- [How to Run LLMs Locally on Your Windows PC in 2026 (Completely Offline, No Subscription)](/articles/how-to-run-llms-locally-on-your-windows-pc-in-2026-completely-offline-no-subscription/)
- [How to Use Your NVIDIA GPU for Local AI on Windows in 2026](/articles/how-to-use-your-nvidia-gpu-for-local-ai-on-windows-in-2026/)
- [How to Always Run the Newest llama.cpp on Windows in 2026 (Engines Update Without Reinstalling)](/articles/how-to-always-run-the-newest-llama-cpp-on-windows-in-2026-engines-update-without-reinstalling/)
