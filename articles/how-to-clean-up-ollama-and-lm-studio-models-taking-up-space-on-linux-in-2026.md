---
layout: content
title: "How to Clean Up Ollama and LM Studio Models Taking Up Space on Linux in 2026"
description: "See every Ollama and LM Studio model on your Linux machine with its size, send LM Studio files to the Trash, and remove Ollama models safely."
date: "2026-10-31"
permalink: /articles/how-to-clean-up-ollama-and-lm-studio-models-taking-up-space-on-linux-in-2026/
published_at: "2026-10-31T03:37:45Z"
article_topic: "Models & performance"
article_platform: "Linux"
devto_article: true
---
`df -h` says your home partition is almost full, and `du` points at two hidden folders: `~/.lmstudio` and `~/.ollama`. Every model you tried in LM Studio or pulled with Ollama is still there, several gigabytes each, and neither app shows the other's models. Off Grid AI Desktop lists them all in one place with their sizes and lets you remove the ones you no longer use. LM Studio files go to your desktop's Trash, so you can still restore one. Ollama models stay under Ollama's control, and the app tells you the command that removes them without breaking Ollama.

## What you need

- A 64-bit x86 Linux machine. Off Grid AI Desktop ships as an AppImage and as a `.deb` package for amd64.
- Off Grid AI Desktop 0.0.55 or later. This is in the current stable release. [Download Off Grid AI Desktop for Linux](/desktop/).
- No account and no payment. The Models screen is part of the free app.
- For Ollama models, the `ollama` command in your terminal, which Ollama's install script adds.

To install the `.deb` on Ubuntu or Debian, run `sudo apt install ./off-grid-ai_0.0.55_amd64.deb` in the folder you downloaded it to. For the AppImage, run `chmod +x off-grid-ai-0.0.55.AppImage` once, then start it.

## Where Off Grid AI looks on Linux

When you open the Models screen, the app reads these folders:

- **LM Studio:** `~/.lmstudio/models`, up to four folder levels deep. Folders whose names start with a dot are skipped.
- **Ollama, per user:** `~/.ollama/models`, which is where models go when you run `ollama serve` as yourself.
- **Ollama, system service:** `/usr/share/ollama/.ollama/models`. Ollama's Linux install script runs Ollama as a systemd service under its own `ollama` user, and its models land here, outside your home folder. Off Grid AI checks this folder on Linux too.
- **Ollama, moved:** the folder in the `OLLAMA_MODELS` environment variable, if it is set when you start Off Grid AI.

The app reads Ollama's manifests to find which blob file holds each model. It lists chat and vision models in GGUF format. Image, video, speech and embedding weights are left out. Nothing is copied or moved.

To see the size of each folder yourself:

```bash
du -sh ~/.lmstudio/models ~/.ollama/models
sudo du -sh /usr/share/ollama/.ollama/models
```

## Step 1: Find the models from other apps

1. Open Off Grid AI Desktop.
2. In the sidebar, under **System**, click **Models**. You can also press **Ctrl+K** and type "models".
3. Stay on the **Text** tab. Your models are at the top under **On this device**.
4. A model from another app has the **External** tag. The line under its name starts with **LM Studio** or **Ollama**, then its parameter count when known and its file size.

## Step 2: Decide what to keep

Every external card has a **Use** button. Off Grid AI runs the model straight from LM Studio's or Ollama's folder, so a model you keep does not need a second copy on disk. If you still use LM Studio for one model and Off Grid AI for the rest, both apps share that one file.

The models worth removing are usually the old ones: the first 7B you tried, three quantizations of the same model, or a model that a newer release replaced.

## Step 3: Send an LM Studio model to the Trash

1. Find the trash icon at the bottom right of the model's card. It brightens when you hover, and its tooltip reads **Move to the Trash**.
2. Click it. The app asks first, with your model's name in the quotes:

   > Move "Qwen 3.5 9B" to the Trash? Its files are in another app's folder; you can restore them from the Trash.

3. Click **OK**.

The app uses your desktop's standard Trash, the same one GNOME Files, Dolphin and other file managers show. For a file in your home folder, that is `~/.local/share/Trash`. If it is a vision model, its projector file goes with it. The card leaves the **On this device** list.

You cannot remove the model you are using right now. Its trash icon is greyed out and the tooltip reads **Switch to another model before deleting**. Click **Use** on another model first.

If you already deleted the file in LM Studio, the app says "This model is no longer in that folder." instead of guessing.

## Step 4: Empty the Trash to get the space back

A file in the Trash still takes up space on its drive. To free it:

1. Open your file manager and click **Trash** in the sidebar.
2. Click **Empty** (in GNOME Files) or **Empty Trash** (in Dolphin) and confirm.

From a terminal, `gio trash --empty` does the same on GNOME-based desktops.

Changed your mind before emptying it? In the Trash, right-click the file and choose **Restore From Trash** (GNOME Files) or **Restore** (Dolphin). It returns to LM Studio's folder, and Off Grid AI lists it again the next time you open the Models screen.

## Step 5: Remove an Ollama model the safe way

Ollama stores models as shared blobs named by hash. One blob can belong to several tags, and a manifest tracks which tag uses which blob. Running `rm` on a blob can break other models in Ollama. So Off Grid AI does not delete Ollama's files. When you click the trash icon on an Ollama model, the app answers with a message that starts "Ollama manages this model. Remove it with: ollama rm".

To remove it:

1. Open a terminal (**Ctrl+Alt+T** on Ubuntu).
2. Run `ollama list` to see the exact name and size of each model, for example `qwen3:8b`.
3. Run `ollama rm qwen3:8b` with the name from that list.

Use the name from `ollama list`, not the name on the card. The card shows a cleaned-up name such as "Qwen3 8B", and Ollama expects its own name with the colon. The `ollama` command talks to the running Ollama server, so you do not need `sudo`, even for the system service. Ollama deletes the blobs that no other model uses, and the space comes back at once. There is no Trash step.

## Models in other folders

Many Linux setups keep models on a second disk, such as `/mnt/data/models`, or point Ollama at one through `OLLAMA_MODELS` in its systemd unit. Off Grid AI does not read a variable set only inside a systemd unit, so add that folder by hand:

1. Open **Models** and click the **Storage** tab.
2. Find **Other model folders** and click the **Add folder** button (the folder icon with a plus).
3. Pick the folder.

GGUF files in that folder show on the **Text** tab the same way, and the trash icon sends them to the Trash. If you add an Ollama models folder, the app reads its manifests and lists those models as **Ollama**, with the same `ollama rm` advice.

## FAQ

**Where does LM Studio store models on Linux?**
In `~/.lmstudio/models`, which is `/home/<your name>/.lmstudio/models`. The folder is hidden, so press **Ctrl+H** in your file manager to see it. If you picked another folder in LM Studio's settings, the models are there instead.

**Where does Ollama store models on Linux?**
If you installed Ollama with its install script and it runs as a systemd service, in `/usr/share/ollama/.ollama/models`. If you run `ollama serve` as your own user, in `~/.ollama/models`. Either way, `OLLAMA_MODELS` overrides the location when it is set.

**Can I delete files in the Ollama blobs folder by hand?**
No. One blob can be shared by several tags, and the manifests point to blobs by hash, so deleting the wrong one breaks those models. Use `ollama rm` with the name from `ollama list`.

**Why did my free space not go up after I removed an LM Studio model?**
The file is in the Trash, and the disk still counts it. Empty the Trash in your file manager, or run `gio trash --empty`, and `df -h` shows the space back.

**Can I use my LM Studio and Ollama models in Off Grid AI without downloading them again?**
Yes. They appear on the Models screen with a **Use** button, and the app runs them from their current folder. This applies to GGUF chat and vision models.

**Does removing a model in Off Grid AI also remove it from LM Studio?**
Yes. The file leaves LM Studio's models folder, so LM Studio no longer has it. If you restore it from the Trash, both apps see it again.

## Related

- [How to Run Local AI on Linux in 2026](/articles/how-to-run-local-ai-on-linux-in-2026-no-cloud-no-account/)
- [How to Use a Remote Ollama or llama.cpp Server From a Desktop AI App on Linux in 2026](/articles/how-to-use-a-remote-ollama-or-llamacpp-server-from-a-desktop-ai-app-on-linux-in-2026/)
- [How to Keep Several Local AI Models Loaded at Once on Linux in 2026](/articles/how-to-keep-several-local-ai-models-loaded-at-once-on-linux-in-2026-no-reload-wait/)

[Download Off Grid AI Desktop for Linux](/desktop/).
