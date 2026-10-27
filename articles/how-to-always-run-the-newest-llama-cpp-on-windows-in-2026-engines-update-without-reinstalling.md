---
layout: content
title: "How to Always Run the Newest llama.cpp on Windows in 2026 (Engines Update Without Reinstalling)"
description: "Off Grid AI Desktop on Windows keeps llama.cpp, stable-diffusion.cpp and whisper.cpp current in the background, CUDA builds included, with no reinstall."
date: "2026-10-26"
permalink: /articles/how-to-always-run-the-newest-llama-cpp-on-windows-in-2026-engines-update-without-reinstalling/
published_at: "2026-10-26T06:51:25Z"
article_topic: "Models & performance"
article_platform: "Windows"
devto_article: true
devto_id: 4919665
devto_url: "https://dev.to/alichherawalla/how-to-always-run-the-newest-llamacpp-on-windows-in-2026-engines-update-without-reinstalling-1nmm"
---
A new model lands on Hugging Face, you download the GGUF, and your Windows PC refuses to load it because the llama.cpp build inside your app is two weeks old. On Windows that usually means waiting for an app release, or downloading a fresh `llama-b####-bin-win-cuda` zip and wiring it up yourself. Off Grid AI Desktop removes that step. It downloads newer llama.cpp, stable-diffusion.cpp and whisper.cpp builds in the background, checks that each one starts, and uses it the next time a model loads. On a PC with an NVIDIA GPU, the CUDA builds and the CUDA libraries update the same way.

To show how far this moves: the 0.0.55 installer ships with llama.cpp **b11819**. On 26 October 2026 the Windows engine index already offered **b11870**, so a PC on 0.0.55 picks that up without a new installer.

## What you need

- A Windows PC with an x64 processor. The Windows download is an x64 installer (`off-grid-ai-0.0.55-setup.exe`); there is no Windows on ARM build.
- Off Grid AI Desktop 0.0.55 or later, the current stable release. [Download Off Grid AI Desktop for Windows](/desktop/).
- An internet connection when an update downloads. Chat, images and transcription still run offline once the engines and models are on disk.
- For CUDA: an NVIDIA GPU with its driver installed, plus the app's optional NVIDIA download. Without one, the app updates its Vulkan and CPU builds instead.
- No account and no payment. Engine updates are part of the free app.

## Which engines update on Windows

Each engine comes in more than one build, and the app only installs the builds your PC can use:

| Engine | What it runs | Windows builds |
|---|---|---|
| llama.cpp | Chat and vision models | Vulkan, CPU, CUDA |
| Prism (a llama.cpp fork) | Bonsai models | Vulkan, CPU, CUDA |
| stable-diffusion.cpp | Image generation | Vulkan, CPU, CUDA |
| whisper.cpp | Transcription | CPU, CUDA |

The Vulkan build runs on AMD, Intel and NVIDIA graphics. The CUDA builds install only when the app finds an NVIDIA driver and you have installed its NVIDIA download. Every engine is built by a nightly job that moves to the newest upstream release, builds and checks it, then publishes it, so a new llama.cpp tag reaches the index without anyone shipping a new version of the app.

## Step 1: Find the engine settings

1. Open Off Grid AI Desktop and click **Settings** in the sidebar.
2. Open the **Engines** card. Its summary reads "Keep chat, image and transcription engines current, and manage GPU components."
3. At the top is the NVIDIA panel, **Use your NVIDIA GPU**. Below it is the **Keep engines up to date** switch.

## Step 2: Leave Keep engines up to date on

The switch is on by default. With it on, the app checks the engine index 1 minute after launch and then every 6 hours. For each engine it is missing a newer build of, it:

1. Downloads only the files it does not already have.
2. Checks each file's size and SHA-256 hash, and checks that the index itself carries a valid signature.
3. Starts the new engine once, with a 30-second limit, to prove it runs on your PC.
4. Makes it the first engine the app looks for.

The line under the switch tells you where it is: "Checking for newer engines...", a download count such as "Downloading 120 MB of 1.2 GB", "Checking the new engine starts...", and then "Engines are up to date. A new engine is used the next time a model loads."

Under that line, the app lists the version of each engine it installed, for example `Chat: b11870 · Images: master-1006-0886f11 · Transcription: v1.9.5`. When the CPU and CUDA builds of one engine are on different versions, each gets its own entry, such as `Chat (cuda): b11870`. This is how you answer "which llama.cpp am I running" without opening a terminal.

## Step 3: Check for an update now

You do not have to wait 6 hours. Under the version list, click the round-arrow button, **Check for engine updates**. It spins while the check runs and is disabled until it finishes.

When the check is done, reload your chat model so it starts on the new engine: switch to another model and back, or restart the app. A model that is already running keeps the engine it started with until then, so nothing changes in the middle of an answer.

## Step 4: Let the CUDA pack update itself

On a PC with an NVIDIA GPU, the large part is the CUDA pack: the CUDA builds of each engine plus the NVIDIA runtime libraries they need. On 26 October 2026 the current Windows pack, `2026-10-25-auto-r5`, was about 7.5 GB.

1. If you have never installed it, the **Use your NVIDIA GPU** panel offers it with a **Download** button. You choose whether to download it.
2. If you already have an older pack, the app downloads the new one in the background. Your current pack keeps CUDA running until the new one is fully in, so you never lose GPU support halfway through.
3. While a download runs, the panel shows its progress. The button there becomes **Pause**, then **Resume**. Pausing also stops the check, unpack and install steps, so a paused pack does not keep using the disk.
4. If the download or unpack fails, the button reads **Try again**. A retry after a failed unpack skips the part already downloaded.
5. When the panel reads "Installed. Restart the app to use it.", click **Restart app**. The old pack is removed on the next start, once nothing is using its files.

## If you use kept models in the Gateway

If you keep several models loaded through the **Gateway**, a new llama.cpp does not restart them while they answer a request. A card appears instead, "Engine update ready for kept models", with a **Restart models** button. They keep serving on the old build until you click it.

## When an update fails

If a download breaks off or a new engine does not start, the status line turns red and says why, for example "The new llama engine did not start" followed by the error. The app keeps using the engine it had and tries again at the next check. The previous release stays on disk, and the engines that shipped inside the app stay behind both, so a bad build cannot leave you without a working engine.

## What this does not do

- It does not update the app itself. New screens and settings still come with app releases; this covers the engines that run the models.
- It does not let you pick a specific llama.cpp build. You get the newest build the index publishes for Windows. Turning the switch off keeps the engines on the version this app release shipped with, and the status line says so.
- It does not add CUDA to a PC without an NVIDIA GPU. AMD and Intel graphics run the Vulkan build.
- It does not make a model that is already running faster. A new engine is used from the next model load.
- It needs internet for the download. Offline, the app keeps the engines it has.

## FAQ

**How do I update llama.cpp in Off Grid AI Desktop on Windows?**
You do not need to do anything. With **Keep engines up to date** on, the app installs newer builds in the background. To check at once, open **Settings** > **Engines** and click **Check for engine updates**.

**How do I know which llama.cpp version I am running?**
Open **Settings** > **Engines**. The line under the status lists each installed engine and its version, such as `Chat: b11870`.

**Do I need to reinstall the app to run a brand-new model?**
Usually not. If the model needs a newer llama.cpp than your app shipped with, the engine update brings it. Reload the model once the status reads "Engines are up to date."

**Does the update include the CUDA build for my NVIDIA GPU?**
Yes, once the NVIDIA download is installed. The CUDA builds and the NVIDIA libraries update in the background, and the old pack keeps working until the new one is in. Click **Restart app** when the panel asks.

**Is it safe to let the app install new engine builds?**
Each update comes from a signed index, and every file is checked against its SHA-256 hash before use. A new engine must start in a 30-second test before the app uses it, and the previous build stays on disk as a fallback.

**Can I stop engines from updating?**
Yes. Turn off **Keep engines up to date** in **Settings** > **Engines**. The engines stay on the version this app release shipped with.

## Related

- [Download Off Grid AI Desktop](/desktop/)
- [How to Use Your NVIDIA GPU for Local AI on Windows in 2026](/articles/how-to-use-your-nvidia-gpu-for-local-ai-on-windows-in-2026/)
- [How to Run LLMs Locally on Your Windows PC in 2026 (Completely Offline, No Subscription)](/articles/how-to-run-llms-locally-on-your-windows-pc-in-2026-completely-offline-no-subscription/)
- [How to Run Qwen-Image 2.1 on Windows in 2026 (No Cloud AI)](/articles/how-to-run-qwen-image-2-1-on-windows-in-2026-no-cloud-ai/)
