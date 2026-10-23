---
layout: content
title: "How to Compare Local AI Models Side by Side on Your Mac in 2026 (One Question, Up to Six Models)"
description: "Ask one question and watch up to six local models answer it side by side in one Mac window, so you can pick the model that suits your work."
date: "2026-10-23"
permalink: /articles/how-to-compare-local-ai-models-side-by-side-on-your-mac-in-2026-one-question-up-to-six-models/
published_at: "2026-10-23T12:51:06.000Z"
article_topic: "Models & performance"
article_platform: "Mac"
devto_article: true
---
You have a few local models on your Mac and you want to know which one writes the better answer for your work. Copying the same prompt into one chat after another is slow, and by the third model you have lost track of what the first one said. Off Grid AI Desktop now splits its chat into two to six panes. Each pane can run on its own model, and one question goes to all of them at once, so the answers arrive next to each other in one window.

## What you need

- A Mac with Apple silicon (M1 or later) and macOS 13 or later. The Mac download is built for Apple silicon only.
- Off Grid AI Desktop 0.0.55 or later. Split view is in the current stable release, 0.0.55. [Download Off Grid AI Desktop for Mac](/desktop/).
- At least one chat model downloaded in the app, such as Qwen 3.5 9B.
- For more than one model: a model server the app can reach. That can be Ollama or LM Studio running on the same Mac, a llama.cpp server, or another computer running Off Grid AI Desktop on your home network.
- No account and no payment. Split view is part of the free app.

## How the panes choose a model

Every pane has a **Model for this pane** picker at the top. It offers two kinds of choice:

- **Active model**: the model loaded in Off Grid AI Desktop itself, the one you picked under **Active models**. Every pane set to this uses the same model.
- A model from a saved server: each entry shows the model name and the server it comes from, so you can tell two copies of the same model apart.

So to compare different models, put one pane on the **Active model** and point the others at models served by Ollama, LM Studio or another machine. A pane that uses a server does not start the app's own engine on your Mac.

## Step 1: Add a model server

1. Open **Chat** from the sidebar.
2. Click the gear icon at the top right (**Settings**) and choose the **Remote** tab.
3. Click **Add server**.
4. Type a **Server name**, for example "Ollama on this Mac".
5. Type the **Address**. Ollama on the same Mac answers at `http://127.0.0.1:11434`, and LM Studio at `http://127.0.0.1:1234`. The app adds `/v1` when needed, and the hint under the field shows the exact address it will call.
6. If the server needs one, type its **API key**. The key is stored in the system credential store, not in a settings file.
7. Click **Test connection**. On success the status line reads "Connected in" followed by the time in milliseconds and the number of models found.
8. Under **Text + Vision**, search for and select a model.
9. Leave **Use this server** on and click **Save**.

Saving a new server with a chat model also moves the app's chat to that server. If you want the **Active model** to stay on your downloaded model, click the chip icon at the top right (**Active models**) and pick your local model again.

Repeat for each server. Every chat model a saved server offers shows up in the pane pickers.

## Step 2: Split the chat

1. In **Chat**, click the split icon at the top right. Its tooltip reads **Open tabs side by side**.
2. The chat opens as panes, one for each chat tab you had open, up to six. With fewer than two tabs open, you still get two panes, and the extra pane starts on a new chat.
3. Use the minus and plus buttons next to the pane count to change the number of panes. Their tooltips read **Remove the last pane** and **Add a pane**. The count runs from 2 to 6.

The layout follows the count: two or three panes sit in one row, four make a two by two grid, and five or six make a grid of three columns and two rows. The split controls stay in the top right pane, so they do not move as you add or remove panes. **Active models** and **Settings** also show once, in that pane, because they apply to the whole app.

## Step 3: Pick a model for each pane

1. Click **Model for this pane** in the first pane and choose **Active model**.
2. In each other pane, choose a model from a server.
3. The picker reads the servers' model lists each time you open it, so a model you add to a server in **Settings** shows up without closing the split.

The app remembers each pane's choice, so the next time you split, every pane starts on the model you gave it last time.

## Step 4: Ask one question

With split view on, the panes share one input at the bottom of the window. This is the default, shown as **One input for every pane** in the top right controls.

1. Type your question in the shared input and send it.
2. Every pane sends the same question to its own model, and the answers stream in side by side.
3. Files you attach to the shared input go to every pane too, so you can compare how each model reads the same PDF or screenshot.
4. To stop, click Stop in the shared input. It stops every pane that is still answering.

For follow-ups that should go to one model only, switch to **An input in each pane**. Each pane then gets its own input, and what you type there goes to that pane alone. Switch back to send to all of them again.

Each pane keeps its own chat tabs, its own gallery and its own tasks. Press Command-T to start a new chat in the pane you are typing in; the other panes keep their chats.

## Step 5: Go back to one chat

Click the same split icon again. Its tooltip now reads **One chat**. Your pane chats are saved like any other chat.

The window now narrows to 450 pixels wide, so a two pane comparison fits next to your editor or browser.

## What this does not do

- It does not score or rank the answers. You read them and decide.
- It does not load several models inside Off Grid AI Desktop at once from the split view. Every pane on **Active model** uses the same in-app model. Different models come from servers.
- Running several models on one Mac takes memory for each of them, and they share the same unified memory. If the models together are larger than your RAM, the Mac slows down or a model fails to load. Use smaller models, fewer panes, or a second computer for the bigger ones.
- If a pane's server is turned off or removed, that pane does not quietly answer with another model. It tells you the server is off or gone and asks you to pick another model for that pane.
- Split view is not saved across restarts. When you quit and reopen the app, Chat opens as one chat; the pane model choices are kept for the next split.

## FAQ

**How do I compare two local LLMs on my Mac?**
Install Off Grid AI Desktop, add Ollama or LM Studio as a server under **Settings** > **Remote**, then click **Open tabs side by side** in Chat. Set one pane to **Active model** and the other to a model from the server, and send one question.

**How many models can I compare at once?**
Up to six panes. Each pane can use a different model, as long as your Mac or your servers can hold them in memory.

**Does comparing models send my prompt to the cloud?**
No. Each pane sends the question only to its own model: the one inside the app, or the server address you typed. If every server is on your Mac or your home network, the prompt never leaves them.

**Is the split view free?**
Yes. It is part of the free Off Grid AI Desktop app on Mac, with no account.

**Can I ask a follow-up to just one model?**
Yes. Switch the top right control to **An input in each pane**, and each pane gets its own input for its own follow-ups.

## Related

- [Download Off Grid AI Desktop](/desktop/)
- [How to Run LLMs Locally on Your Mac in 2026 (Completely Offline, No Subscription)](/articles/how-to-run-llms-locally-on-your-mac-in-2026-completely-offline-no-subscription/)
- [How to Run Local AI on Your Mac in 2026 (No Cloud, No Account)](/articles/how-to-run-local-ai-on-your-mac-in-2026-no-cloud-no-account/)
- [How to Use AI Models on Your Mac From Your Android Phone in 2026 (No Internet Required)](/articles/how-to-use-ai-models-on-your-mac-from-your-android-phone-in-2026-no-internet-required/)
