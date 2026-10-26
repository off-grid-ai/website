---
layout: content
title: "How to Clean Up Ollama and LM Studio Models Taking Up Space on Your Mac in 2026"
description: "See every Ollama and LM Studio model on your Mac with its size, move LM Studio files to the Trash, and remove Ollama models safely."
date: "2026-10-26"
permalink: /articles/how-to-clean-up-ollama-and-lm-studio-models-taking-up-space-on-your-mac-in-2026/
published_at: "2026-10-26T09:56:31Z"
article_topic: "Models & performance"
article_platform: "Mac"
devto_article: true
---
Your Mac's disk is filling up, and part of the reason is the models you downloaded in LM Studio and Ollama last year. They sit in hidden folders, they are several gigabytes each, and neither app makes it easy to see them all in one place. Off Grid AI Desktop finds them for you, shows each one with its size, and lets you remove the ones you no longer use. LM Studio files go to the Trash, so you can still get one back. Ollama models stay under Ollama's control, and the app tells you how to remove them without breaking Ollama.

## What you need

- A Mac with Apple silicon (M1 or later) and macOS 13 or later. The Mac download is built for Apple silicon only.
- Off Grid AI Desktop 0.0.55 or later. This is in the current stable release. [Download Off Grid AI Desktop for Mac](/desktop/).
- No account and no payment. The Models screen is part of the free app.
- For Ollama models, the `ollama` command in Terminal, which the Ollama app installs.

## Where Off Grid AI looks on your Mac

When you open the Models screen, the app reads two places in your home folder:

- **LM Studio:** `~/.lmstudio/models`, up to four folder levels deep. Hidden folders inside it are skipped.
- **Ollama:** `~/.ollama/models`, or the folder in `OLLAMA_MODELS` if you set one. The app reads Ollama's manifests to find which file holds each model and which model it belongs to.

It lists chat and vision models in GGUF format. Image, video, speech and embedding weights are left out, because they need a different engine. Nothing is copied or moved when the app reads these folders. The files stay where they are until you choose to remove one.

To look at these folders yourself in Finder, press **Cmd+Shift+G** and paste `~/.lmstudio/models` or `~/.ollama/models`. Both start with a dot, so press **Cmd+Shift+.** in Finder if you want hidden folders to show while browsing.

## Step 1: Find the models from other apps

1. Open Off Grid AI Desktop.
2. In the sidebar, under **System**, click **Models**. You can also press **Cmd+K** and type "models".
3. Stay on the **Text** tab. Your models are at the top under **On this device**.
4. A model from another app has the **External** tag. The line under its name starts with **LM Studio** or **Ollama**, followed by its parameter count when known and its file size, such as 7.4 GB.

<figure>
  <img src="/assets/img/home/app/models-text-light-960.webp" alt="The Models screen in Off Grid AI Desktop on a Mac, Text tab, with models on this device at the top and a trash icon on each card." width="960" loading="lazy" />
  <figcaption>The Models screen on a Mac. Models on this device sit at the top. Each card that is not the active model has a trash icon.</figcaption>
</figure>

If a file in LM Studio's folder has the same name as a model in the app's catalog, its card uses the catalog name. Otherwise the card uses a cleaned-up version of the file name.

## Step 2: Decide what to keep

Before you delete anything, check whether you want to keep a model and use it here. Every external card has a **Use** button. Off Grid AI runs the model straight from LM Studio's or Ollama's folder, so you do not need a second copy on disk. If you keep LM Studio for one model and Off Grid AI for the rest, both apps can share that one file.

The models worth removing are usually the old ones: the first 7B you tried, three quantizations of the same model, or a model a newer release replaced.

## Step 3: Move an LM Studio model to the Trash

1. Find the trash icon at the bottom right of the model's card. It brightens when you hover, and its tooltip reads **Move to the Trash**.
2. Click it. The app asks first, with your model's name in the quotes:

   > Move "Qwen 3.5 9B" to the Trash? Its files are in another app's folder; you can restore them from the Trash.

3. Click **OK**.

The model file goes to the macOS Trash. If it is a vision model, its projector file goes with it. The card leaves the **On this device** list.

You cannot remove the model you are using right now. Its trash icon is greyed out and the tooltip reads **Switch to another model before deleting**. Click **Use** on another model first.

If you already deleted the file in LM Studio, the app says "This model is no longer in that folder." instead of guessing.

## Step 4: Empty the Trash to get the space back

A file in the Trash still takes up disk space. To free it:

1. Click the Trash in the Dock, or press **Cmd+Shift+Delete** in Finder.
2. Confirm **Empty Trash**.

Changed your mind before emptying it? Open the Trash, right-click the file and choose **Put Back**. It returns to LM Studio's folder, and Off Grid AI lists it again the next time you open the Models screen.

## Step 5: Remove an Ollama model the safe way

Ollama stores models as shared blobs. One file can belong to several tags, and a manifest tracks which tag uses which file. Deleting a blob by hand can break other models in Ollama. So Off Grid AI does not delete Ollama's files. When you click the trash icon on an Ollama model, the app answers with a message that starts "Ollama manages this model. Remove it with: ollama rm".

To remove it:

1. Open **Terminal**.
2. Run `ollama list` to see the exact name and size of each model, for example `qwen3:8b`.
3. Run `ollama rm qwen3:8b` with the name from that list.

Use the name from `ollama list`, not the name on the card. The card shows a cleaned-up name such as "Qwen3 8B", and Ollama expects its own name with the colon. Ollama deletes the files that no other model uses, and the space comes back at once. There is no Trash step.

## Models in other folders

If you keep GGUF files somewhere else, such as an external drive, open **Models** > **Storage**, find **Other model folders** and click **Add folder**. Models in that folder show on the **Text** tab the same way, and the trash icon moves them to the Trash too. On some external drives macOS has no Trash; for a file there, delete it in Finder instead.

## What this does not do

- It does not empty the Trash for you. You decide when the files are gone for good.
- It does not delete Ollama files. Ollama removes its own models.
- It does not list LM Studio or Ollama models that are not GGUF chat or vision models, such as image or embedding models. Remove those in the app that downloaded them.
- The **used by models** total on the **Storage** tab counts Off Grid AI's own model folder. It does not include the space LM Studio and Ollama use.
- It does not uninstall LM Studio or Ollama.

## FAQ

**Where does LM Studio store models on a Mac?**
In `~/.lmstudio/models` in your home folder. The folder is hidden because its parent starts with a dot. In Finder, press Cmd+Shift+G and paste the path to open it.

**Where does Ollama store models on a Mac?**
In `~/.ollama/models`, unless you set the `OLLAMA_MODELS` environment variable to another folder. The files there are named by hash, so `ollama list` is the easiest way to see what each one is.

**Is it safe to delete files in the Ollama models folder by hand?**
No. One blob can be shared by several tags, and the manifests point to blobs by hash, so deleting the wrong one breaks those models. Use `ollama rm` with the model name from `ollama list`.

**Why did my disk space not go up after I removed an LM Studio model?**
The file is in the Trash, and macOS still counts it. Empty the Trash with Cmd+Shift+Delete in Finder and the space comes back.

**Can I use my LM Studio and Ollama models in Off Grid AI without downloading them again?**
Yes. They appear on the Models screen with a Use button, and the app runs them from their current folder. This only applies to GGUF chat and vision models.

**Does removing a model in Off Grid AI also remove it from LM Studio?**
Yes. The file leaves LM Studio's models folder, so LM Studio no longer has it. If you choose Put Back in the Trash, both apps see it again.

## Related

- [How to Free Disk Space Used by AI Models in Off Grid AI on Your Computer in 2026](/articles/how-to-free-disk-space-used-by-ai-models-in-off-grid-ai-on-your-computer-in-2026/)
- [How to Use a Remote Ollama or llama.cpp Server From a Desktop AI App on Your Mac in 2026](/articles/how-to-use-a-remote-ollama-or-llamacpp-server-from-a-desktop-ai-app-on-your-mac-in-2026/)
- [How to Run a Local AI Server for Your Whole Team on Your Mac in 2026](/articles/how-to-run-a-local-ai-server-for-your-whole-team-on-your-mac-in-2026-ollama-alternative-no-cloud/)

[Download Off Grid AI Desktop for Mac](/desktop/).
