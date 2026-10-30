---
layout: content
title: "How to Watch AI Images Form Step by Step on Linux in 2026 (Qwen-Image 2.1 Turbo, Offline)"
description: "See each step of a Qwen-Image 2.1 Turbo image appear in chat on your Linux PC, on NVIDIA CUDA or Vulkan, and stop a bad image early. Runs offline."
date: "2026-10-30"
permalink: /articles/how-to-watch-ai-images-form-step-by-step-on-linux-in-2026-qwen-image-2-1-turbo-offline/
published_at: "2026-10-30T15:49:49.000Z"
article_topic: "Images & vision"
article_platform: "Linux"
devto_article: true
---
You type a prompt, wait, and only at the end find out the subject is in the wrong corner. In Off Grid AI Desktop (OGAD) on Linux, the image now forms in the chat while it runs. Every sampling step draws a new rough frame, so you see the layout settle and can stop a bad image before it finishes. With Qwen-Image 2.1 Turbo that is 8 steps from prompt to picture, on your own machine.

## What you need

- A Linux PC with an x64 processor. OGAD ships an AppImage and an amd64 `.deb`, built for Ubuntu 24.04 or newer. There is no Linux ARM package.
- System RAM for the model you pick. Qwen-Image 2.1 Turbo comes in two sizes. **Full quality** (Q8_0) is listed for 32 GB of RAM or more, and **Light** (Q4_K) for 24 GB or more.
- Free disk space. Full quality is about 14.5 GB and Light about 10.9 GB, because both include the Qwen3-VL 8B text encoder, its vision projector and the Qwen-Image 2.1 VAE.
- A GPU helps a lot. With an NVIDIA card and its driver loaded, the app's optional NVIDIA download runs images on CUDA. Without it, images run on the bundled Vulkan build, which works with the Mesa drivers most AMD and Intel setups already have, or on the CPU.
- OGAD 0.0.55 or later. Step previews and the Turbo defaults are in the current stable release, 0.0.55. [Download OGAD for Linux](/desktop/).
- No account and no payment. Image generation is part of the free app. You need internet only for the downloads.

## Step 1: Put the image engine on your NVIDIA GPU

Skip this step if your PC has no NVIDIA card.

1. Check that the NVIDIA driver is running. OGAD looks for the driver's device node, such as `/dev/nvidia0`. If `nvidia-smi` lists your card, you are set. The download brings its own CUDA runtime libraries, so you do not need the CUDA toolkit.
2. On first launch, OGAD offers **Use your NVIDIA GPU** as an optional setup step. Click **Download**. If you chose **Skip for now**, open **Settings**, then **Setup & health**, and find the same panel there.
3. The download covers four NVIDIA engines, including **Image generation** (NVIDIA image engine). You can **Pause** and **Resume** it.
4. When the panel reads **Installed. Restart the app to use it.**, quit and start OGAD again.

If the panel says **No NVIDIA driver was found**, the driver is not loaded. Install the proprietary driver for your card (on Ubuntu, `sudo ubuntu-drivers install`), reboot, and open the panel again.

## Step 2: Download Qwen-Image 2.1 Turbo

1. Choose **Models** under **System** in the sidebar.
2. Open the **Image** tab.
3. On a PC with enough RAM for Qwen-Image, the picks at the top include **Balanced**, which is Qwen-Image 2.1 Turbo. Select that card. If your PC is below that, the picks show SDXL models instead, and you can still find Turbo by searching the Image tab.
4. In the side panel, choose a size under **Quantization**: **Full quality** or **Light**. The panel can mark the size that suits your PC **Recommended for you**.
5. Click **Download**. The app fetches the generator and its companion files together.

## Step 3: Check the backend and keep the model loaded

Both parts are optional. Previews work either way.

1. In **Chat**, click the gear icon at the top right (**Settings**) and choose the **Image** tab.
2. Expand **Processing**. The **Images backend** list offers **Auto**, **CUDA**, **Vulkan** and **CPU**. **Auto** tries the best one available, and once an image model has loaded, the hint under it names the backend in use, such as "Now: CUDA". A change applies when the model next loads. Without the NVIDIA download, CUDA shows as **CUDA (download required)**.
3. Now open the main **Settings** and expand **Capture & processing**. Under **Model memory**, turn on **Image generation**. The label beside it changes from **on-demand** to **in-memory**.

The app's own hint for that switch says in-memory cuts a typical cold start from about 45 seconds to about 7 seconds. That was measured on a small 512-pixel image; Qwen-Image loads a larger stack, but the next image still skips the reload.

How the image model shares memory with chat depends on your backend:

- **On CUDA**, an in-memory image model and the chat model stay loaded together on the GPU. The **Active image model** row says so: they share GPU memory, and generation may fail on smaller cards. If it does, switch to **Light** or pick a smaller chat model.
- **On Vulkan or the CPU**, a model stays loaded while it fits the memory Linux reports as available (`MemAvailable` in `/proc/meminfo`, which counts the page cache the kernel can free), less a reserve of 3 GB or 10% of your RAM, whichever is larger. On a 32 GB machine that is usually enough to keep the image model loaded while you chat. When they do not fit, chat and image take turns.

## Step 4: Generate an image from chat

1. Open **Chat** and start a new conversation.
2. Click the **+** button in the message box and choose **Generate image**.
3. Click the sliders button beside the message box (**Image options**). If you have more than one image model, pick **Qwen-Image 2.1 Turbo** in **Model**.
4. Check the values. For Turbo the app fills in **Size** 1024, **Steps** 8 and **Guidance** 1.0, the distilled model's own defaults. The full Qwen-Image 2.1 uses 40 steps and Guidance 6.
5. Type your prompt and press Enter.

## Step 5: Watch the image form

While the model runs, a frame appears in the chat above a status line such as **Generating image · Step 3 of 8**, with a bar that fills as steps finish. The frame updates at every step.

The frames are a quick projection of the unfinished image that needs no extra model. They show shape and layout, not fine detail, so judge the composition and framing early.

After the last step the status reads **Finalizing image** and the finished image replaces the frame. It is saved in the conversation with its size, steps, CFG and seed.

If the layout is wrong at step 2 or 3, click the red **Stop** button in the message box, change the prompt and send it again.

## Tips for better Turbo images on Linux

- Start with **Steps** 8 and **Guidance** 1.0. Turbo is distilled for those values. The sliders allow 4 to 50 steps and 0 to 20 guidance, and a change applies to that model only.
- When you like a layout, copy the seed shown under the image into **Seed**. Same seed and prompt give the same start, so you can change one word and compare.
- For text in an image, put the exact words in quotes. Qwen-Image 2.1 is known for text rendering. Check the spelling before you use the result.
- On CUDA, watch `nvidia-smi` during a run. If a game, a browser with hardware video, or another model server holds GPU memory, close it before you generate.

## FAQ

### Can I run Qwen-Image 2.1 Turbo on Linux?

Yes. OGAD 0.0.55 runs it on x64 Linux, packaged for Ubuntu 24.04 or newer as an AppImage or `.deb`. Download it from **Models**, **Image** tab, then generate from chat with **Generate image**.

### How much RAM does Qwen-Image 2.1 Turbo need on Linux?

The app lists 32 GB of RAM for Full quality (Q8_0) and 24 GB for Light (Q4_K). The model's published benchmarks put peak memory near 13.1 GB for the 8-bit build and 9.8 GB for the 4-bit build, and your chat model needs memory too.

### Does it use my NVIDIA GPU on Linux?

Yes, after the optional NVIDIA download in **Setup & health**, as long as the proprietary NVIDIA driver is loaded. Once an image has run, the hint under **Images backend** names CUDA. You do not need to install the CUDA toolkit yourself.

### Does it work on AMD or Intel graphics on Linux?

Yes, through the bundled Vulkan build. It uses your system's Vulkan driver, which on most distributions is Mesa (RADV for AMD, ANV for Intel). You can also pick **CPU** under **Images backend**.

### Can I stop an image halfway through?

Yes. Click the red **Stop** button in the message box at any step. Then change the prompt and send it again.

### Does it work without internet?

Yes, once the model files are on your PC. Generation runs on your machine, and the prompt and image stay on it.

## Related

- [Download Off Grid AI Desktop for Linux](/desktop/)
- [How to Use Your NVIDIA GPU for Local AI on Linux in 2026](/articles/how-to-use-your-nvidia-gpu-for-local-ai-on-linux-in-2026/)
- [How to Keep Several Local AI Models Loaded at Once on Linux in 2026 (No Reload Wait)](/articles/how-to-keep-several-local-ai-models-loaded-at-once-on-linux-in-2026-no-reload-wait/)
- [How to Run Local AI on Linux in 2026 (No Cloud, No Account)](/articles/how-to-run-local-ai-on-linux-in-2026-no-cloud-no-account/)
