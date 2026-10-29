---
layout: content
title: "How to Clean Up Ollama and LM Studio Models Taking Up Space on Windows in 2026"
description: "See every Ollama and LM Studio model on your Windows PC with its size, send LM Studio files to the Recycle Bin, and remove Ollama models safely."
date: "2026-10-29"
permalink: /articles/how-to-clean-up-ollama-and-lm-studio-models-taking-up-space-on-windows-in-2026/
published_at: "2026-10-29T06:49:39Z"
article_topic: "Models & performance"
article_platform: "Windows"
devto_article: true
devto_id: 4939065
devto_url: "https://dev.to/alichherawalla/how-to-clean-up-ollama-and-lm-studio-models-taking-up-space-on-windows-in-2026-3211"
---
Your C: drive is red in File Explorer, and a good part of it is AI models you pulled into LM Studio and Ollama months ago. Each one is several gigabytes, they live in folders you never open, and neither app shows you everything in one list. Off Grid AI Desktop finds them for you, shows each one with its size, and lets you remove the ones you no longer use. LM Studio files go to the Recycle Bin, so you can still restore one. Ollama models stay under Ollama's control, and the app gives you the command that removes them without breaking Ollama.

## What you need

- A Windows 10 or 11 PC with an x64 processor. The Windows download is an x64 installer.
- Off Grid AI Desktop 0.0.55 or later. This is in the current stable release. [Download Off Grid AI Desktop for Windows](/desktop/).
- No account and no payment. The Models screen is part of the free app.
- For Ollama models, the `ollama` command in PowerShell or Command Prompt, which the Ollama installer adds.

## Where Off Grid AI looks on your PC

When you open the Models screen, the app reads two folders in your user profile:

- **LM Studio:** `%USERPROFILE%\.lmstudio\models`, up to four folder levels deep. Folders whose names start with a dot are skipped.
- **Ollama:** `%USERPROFILE%\.ollama\models`, or the folder in the `OLLAMA_MODELS` environment variable if you moved Ollama's models to another drive. The app reads Ollama's manifests to find which file holds each model.

It lists chat and vision models in GGUF format. Image, video, speech and embedding weights are left out. Reading these folders copies and moves nothing. The files stay where they are until you choose to remove one.

To look at a folder yourself, open File Explorer, click the address bar (or press **Alt+D**), paste `%USERPROFILE%\.lmstudio\models` or `%USERPROFILE%\.ollama\models` and press **Enter**.

## Step 1: Find the models from other apps

1. Open Off Grid AI Desktop.
2. In the sidebar, under **System**, click **Models**. You can also press **Ctrl+K** and type "models".
3. Stay on the **Text** tab. Your models are at the top under **On this device**.
4. A model from another app has the **External** tag. The line under its name starts with **LM Studio** or **Ollama**, then its parameter count when known and its file size.

If a file in LM Studio's folder has the same name as a model in the app's catalog, its card uses the catalog name. Otherwise the card uses a cleaned-up version of the file name.

## Step 2: Decide what to keep

Before you remove anything, check whether you want to keep a model and use it here. Every external card has a **Use** button. Off Grid AI runs the model straight from LM Studio's or Ollama's folder, so you do not need a second copy on disk. If you keep LM Studio for one model and Off Grid AI for the rest, both apps share that one file.

The models worth removing are usually the old ones: the first 7B you tried, three quantizations of the same model, or a model that a newer release replaced.

## Step 3: Send an LM Studio model to the Recycle Bin

1. Find the trash icon at the bottom right of the model's card. It brightens when you hover, and its tooltip reads **Move to the Trash**.
2. Click it. The app asks first, with your model's name in the quotes:

   > Move "Qwen 3.5 9B" to the Trash? Its files are in another app's folder; you can restore them from the Trash.

3. Click **OK**.

On Windows, "the Trash" is the Recycle Bin. The model file goes there. If it is a vision model, its projector file goes with it. The card leaves the **On this device** list.

You cannot remove the model you are using right now. Its trash icon is greyed out and the tooltip reads **Switch to another model before deleting**. Click **Use** on another model first.

If you already deleted the file in LM Studio, the app says "This model is no longer in that folder." instead of guessing.

## Step 4: Empty the Recycle Bin to get the space back

A file in the Recycle Bin still takes up space on your drive. To free it:

1. Right-click **Recycle Bin** on your desktop.
2. Choose **Empty Recycle Bin** and confirm.

Changed your mind before emptying it? Open the Recycle Bin, right-click the file and choose **Restore**. It returns to LM Studio's folder, and Off Grid AI lists it again the next time you open the Models screen.

## Step 5: Remove an Ollama model the safe way

Ollama stores models as shared blobs. One file can belong to several tags, and a manifest tracks which tag uses which file. Deleting a blob by hand in File Explorer can break other models in Ollama. So Off Grid AI does not delete Ollama's files. When you click the trash icon on an Ollama model, the app answers with a message that starts "Ollama manages this model. Remove it with: ollama rm".

To remove it:

1. Right-click the **Start** button and open **Terminal**, or search the Start menu for "PowerShell".
2. Run `ollama list` to see the exact name and size of each model, for example `qwen3:8b`.
3. Run `ollama rm qwen3:8b` with the name from that list.

Use the name from `ollama list`, not the name on the card. The card shows a cleaned-up name such as "Qwen3 8B", and Ollama expects its own name with the colon. Ollama deletes the files that no other model uses, and the space comes back at once. There is no Recycle Bin step.

## Models in other folders

If you keep models on a second drive, such as `D:\models`, open **Models** > **Storage**, find **Other model folders** and click **Add folder**. Models in that folder show on the **Text** tab the same way, and the trash icon sends them to the Recycle Bin.

The same works if you changed LM Studio's models folder in LM Studio. Add that folder here and its models appear with the rest.

## FAQ

**Where does LM Studio store models on Windows?**
In `%USERPROFILE%\.lmstudio\models`, which is `C:\Users\<your name>\.lmstudio\models` on most PCs. Paste the `%USERPROFILE%` form into the File Explorer address bar to open it. If you picked another folder in LM Studio, the models are there instead.

**Where does Ollama store models on Windows?**
In `%USERPROFILE%\.ollama\models`, unless you set the `OLLAMA_MODELS` environment variable to another folder. The files under `blobs` are named by hash, so `ollama list` is the easiest way to see what each one is.

**Can I delete files in the Ollama models folder by hand?**
No. One blob can be shared by several tags, and the manifests point to blobs by hash, so deleting the wrong one breaks those models. Use `ollama rm` with the model name from `ollama list`.

**Why did my free space not go up after I removed an LM Studio model?**
The file is in the Recycle Bin, and Windows still counts it. Right-click the Recycle Bin, choose Empty Recycle Bin, and the space comes back.

**Can I use my LM Studio and Ollama models in Off Grid AI without downloading them again?**
Yes. They appear on the Models screen with a Use button, and the app runs them from their current folder. This applies to GGUF chat and vision models.

**Does removing a model in Off Grid AI also remove it from LM Studio?**
Yes. The file leaves LM Studio's models folder, so LM Studio no longer has it. If you restore it from the Recycle Bin, both apps see it again.

## Related

- [How to Run LLMs Locally on Your Windows PC in 2026](/articles/how-to-run-llms-locally-on-your-windows-pc-in-2026-completely-offline-no-subscription/)
- [How to Use a Remote Ollama or llama.cpp Server From a Desktop AI App on Windows in 2026](/articles/how-to-use-a-remote-ollama-or-llamacpp-server-from-a-desktop-ai-app-on-windows-in-2026/)
- [How to Run a Local AI Server for Your Whole Team on Windows in 2026](/articles/how-to-run-a-local-ai-server-for-your-whole-team-on-windows-in-2026-ollama-alternative-no-cloud/)

[Download Off Grid AI Desktop for Windows](/desktop/).
