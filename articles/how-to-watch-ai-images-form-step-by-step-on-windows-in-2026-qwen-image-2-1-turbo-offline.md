---
layout: content
title: "How to Watch AI Images Form Step by Step on Windows in 2026 (Qwen-Image 2.1 Turbo, Offline)"
description: "See each step of a Qwen-Image 2.1 Turbo image appear in chat on your Windows PC, on your NVIDIA GPU, and stop a bad image early. Runs offline."
date: "2026-10-29"
permalink: /articles/how-to-watch-ai-images-form-step-by-step-on-windows-in-2026-qwen-image-2-1-turbo-offline/
published_at: "2026-10-29T02:30:00.000Z"
article_topic: "Images & vision"
article_platform: "Windows"
devto_article: true
devto_id: 4937773
devto_url: "https://dev.to/alichherawalla/how-to-watch-ai-images-form-step-by-step-on-windows-in-2026-qwen-image-21-turbo-offline-462"
---
You type a prompt, wait, and only at the end find out the subject is in the wrong corner. In Off Grid AI Desktop (OGAD) on Windows, the image now forms in the chat while it runs. Every sampling step draws a new rough frame, so you see the layout settle and can stop a bad image before it finishes. With Qwen-Image 2.1 Turbo that is 8 steps from prompt to picture, on your own PC.

## What you need

- A Windows 10 or 11 PC with an x64 processor. The Windows download is an x64 installer; there is no Windows on ARM build.
- System RAM for the model you pick. Qwen-Image 2.1 Turbo comes in two sizes. **Full quality** (Q8_0) is listed for 32 GB of RAM or more, and **Light** (Q4_K) for 24 GB or more.
- Free disk space. Full quality is about 14.5 GB and Light about 10.9 GB, because both include the Qwen3-VL 8B text encoder, its vision projector and the Qwen-Image 2.1 VAE.
- A GPU helps a lot. With an NVIDIA card, the app's optional NVIDIA download runs images on CUDA. Without it, images run on Vulkan when Windows has the Vulkan loader, and on the CPU otherwise.
- OGAD 0.0.55 or later. Step previews from the in-memory image engine and the Turbo defaults are in the current stable release, 0.0.55. [Download OGAD for Windows](/desktop/).
- No account and no payment. Image generation is part of the free app. You need internet only for the downloads.

## Step 1: Put the image engine on your NVIDIA GPU

Skip this step if your PC has no NVIDIA card.

1. On first launch, OGAD offers **Use your NVIDIA GPU** as an optional setup step. Click **Download**. If you chose **Skip for now**, open **Settings**, then **Setup & health**, and find the same panel there.
2. The download covers four NVIDIA engines, including **Image generation** (NVIDIA image engine). You can **Pause** and **Resume** it.
3. When the panel reads **Installed. Restart the app to use it.**, restart OGAD.

If the panel says **No NVIDIA driver was found**, install the current NVIDIA driver for your card first. On AMD and Intel GPUs the app uses Vulkan, so there is nothing to download.

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
- **On Vulkan or the CPU**, a model stays loaded while it fits the RAM Windows reports as available, less a reserve of 3 GB or 10% of your RAM, whichever is larger. When it does not fit, chat and image take turns.

## Step 4: Generate an image from chat

1. Open **Chat** and start a new conversation.
2. Click the **+** button in the message box and choose **Generate image**.
3. Click the sliders button beside the message box (**Image options**). If you have more than one image model, pick **Qwen-Image 2.1 Turbo** in **Model**.
4. Check the values. For Turbo the app fills in **Size** 1024, **Steps** 8 and **Guidance** 1.0, the distilled model's own defaults. The full Qwen-Image 2.1 uses 40 steps and Guidance 6.
5. Type your prompt and press Enter.

## Step 5: Watch the image form

While the model runs, a frame appears in the chat above a status line such as **Generating image · Step 3 of 8**, with a bar that fills as steps finish. The frame updates at every step.

For Qwen-Image 2.1 the frames are greyscale. They are a quick projection of the unfinished image that needs no extra model, so they show shape and layout, not colour or fine detail. Judge the layout and framing early.

After the last step the status reads **Finalizing image** and the full-colour image replaces the frame. It is saved in the conversation with its size, steps, CFG and seed.

If the layout is wrong at step 2 or 3, click the red **Stop** button in the message box, change the prompt and send it again.

## Tips for better Turbo images

- Start with **Steps** 8 and **Guidance** 1.0. Turbo is distilled for those values. The sliders allow 4 to 50 steps and 0 to 20 guidance, and a change applies to that model only.
- When you like a layout, copy the seed shown under the image into **Seed**. Same seed and prompt give the same start, so you can change one word and compare.
- For text in an image, put the exact words in quotes. Qwen-Image 2.1 is known for text rendering, but check the spelling before you use the result.
- Close GPU-heavy apps, such as games, before a run on CUDA. They hold GPU memory the image model needs.

## What this does not do

- The frames are rough. Greyscale previews show composition, not the final picture.
- We publish no Windows speed figures. Time per step depends on your GPU, its memory and the backend, and the step count tells you only how much work there is.
- Turbo and the full model can both edit a reference image, but Turbo's published tests cover text-to-image only.
- Qwen-Image 2.1 and its Turbo version use Qwen's research licence. The model card in the app says so. Check those terms before commercial use.

## FAQ

### Can I run Qwen-Image 2.1 Turbo on Windows?

Yes. OGAD 0.0.55 runs it on Windows 10 and 11 x64 PCs. Download it from **Models**, **Image** tab, then generate from chat with **Generate image**.

### How much RAM does Qwen-Image 2.1 Turbo need on Windows?

The app lists 32 GB of RAM for Full quality (Q8_0) and 24 GB for Light (Q4_K). The model's published benchmarks put peak memory near 13.1 GB for the 8-bit build and 9.8 GB for the 4-bit build, and your chat model needs memory too.

### Does it use my NVIDIA GPU?

Yes, after the optional NVIDIA download in **Setup & health**. Once an image has run, the hint under **Images backend** names CUDA. Without it, the app uses Vulkan or the CPU.

### Does it work on AMD or Intel graphics?

Yes, through Vulkan, which the app picks when Windows has the Vulkan loader. If the loader is missing, image generation falls back to the CPU.

### Why is the preview black and white?

For Qwen-Image 2.1 the app shows step frames in greyscale, because they are a fast projection of the unfinished image. The final image is in full colour.

### Does it work without internet?

Yes, once the model files are on your PC. Generation runs on your PC, and the prompt and image stay on it.

## Related

- [Download Off Grid AI Desktop for Windows](/desktop/)
- [How to Run Qwen-Image 2.1 on Windows in 2026 (No Cloud AI)](/articles/how-to-run-qwen-image-2-1-on-windows-in-2026-no-cloud-ai/)
- [How to Generate AI Images Locally on Your Windows PC in 2026 (No Cloud, No Subscription)](/articles/how-to-generate-ai-images-locally-on-your-windows-pc-in-2026-no-cloud-no-subscription/)
- [How to Edit Images With AI on Windows in 2026 (Completely Offline)](/articles/how-to-edit-images-with-ai-on-windows-in-2026-completely-offline/)
