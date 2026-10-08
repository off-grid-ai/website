---
layout: content
title: "How to Run Qwen-Image 2.1 on Windows in 2026 (No Cloud AI)"
description: "Run Qwen-Image 2.1 on your Windows PC with OGAD beta. Install the complete local model stack, generate images and edit a reference without cloud uploads."
date: "2026-09-29"
permalink: /articles/how-to-run-qwen-image-2-1-on-windows-in-2026-no-cloud-ai/
published_at: "2026-09-29T10:53:43.415Z"
article_topic: "Images & vision"
article_platform: "Windows"
devto_article: true
devto_id: 4770814
devto_url: "https://dev.to/alichherawalla/how-to-run-qwen-image-21-on-windows-in-2026-no-cloud-ai-2a7l"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2Fwwh6cyveprji7pgbfu0h.png"
---
You want to try Qwen-Image 2.1 on your own PC, with your prompts and reference images processed locally. You also want a normal image interface once the model files are in place.

OGAD (Off Grid AI Desktop) can run Qwen-Image 2.1 locally for image generation and reference-image editing. This guide uses **released beta 0.0.52-beta.103 with manual model setup**. Download the app and four model files first. Generation can then run without internet when you use the local image model.

[Download OGAD beta 0.0.52-beta.103](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.52-beta.103)

![The Image models list in Off Grid AI Desktop, with Qwen-Image 2.1 (11.1 GB, tagged for image editing) ready to download.](https://getoffgridai.co/assets/img/home/app/models-image-light-1760.webp)

---

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@getoffgridai.co](mailto:support@getoffgridai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

## What do you need?

- A 64-bit Windows PC. Plan for **24 GB of RAM or more** for this model stack. The beta103 setup below uses its packaged CPU image runner.
- About **11.06 GB** of storage for the four model files, plus space for OGAD and your generated images.
- Internet for the initial downloads.

Download size is not working memory. The 24 GB figure is setup guidance based on the app's memory check, not a speed or reliability guarantee. Close other large apps before generation.

**Using a newer beta?** [OGAD beta108](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.54-beta.108) adds an optional NVIDIA performance pack on supported Windows PCs. Open **Settings → GPU performance → Use your NVIDIA GPU** to download it when a compatible NVIDIA driver is detected. The pack includes an image-generation engine. The manual model setup below is still scoped to beta103; CPU-only packaging in that release is not a limit on newer OGAD versions.

Image generation is part of OGAD's core features. The [Qwen-Image 2.1 model has its own research license](https://huggingface.co/leejet/Qwen-Image-2.1-GGUF); check its terms for your intended use.

## How do you install the complete model?

Install the **Windows `setup.exe`** from the linked beta release. Open OGAD once, then quit it.

This beta can run Qwen-Image 2.1, but its model catalog does not offer the complete download. Download these exact four files yourself. Keep their names unchanged.

| File role | Download | Approximate size |
|---|---|---|
| Image model | [`qwen_image_2.1-Q4_K.gguf`](https://huggingface.co/leejet/Qwen-Image-2.1-GGUF/resolve/cc11433936a06e9765f7c0c0b1f0436cfd2b9856/qwen_image_2.1-Q4_K.gguf) | 4.20 GB |
| Text encoder | [`Qwen3VL-8B-Instruct-Q4_K_M.gguf`](https://huggingface.co/Qwen/Qwen3-VL-8B-Instruct-GGUF/resolve/f982a07559d4a2f6c8744d840bf6fccab30eea96/Qwen3VL-8B-Instruct-Q4_K_M.gguf) | 5.03 GB |
| Vision projector for editing | [`mmproj-Qwen3VL-8B-Instruct-F16.gguf`](https://huggingface.co/Qwen/Qwen3-VL-8B-Instruct-GGUF/resolve/f982a07559d4a2f6c8744d840bf6fccab30eea96/mmproj-Qwen3VL-8B-Instruct-F16.gguf) | 1.16 GB |
| Qwen-Image 2.1 VAE | [`qwen_image_2.1_vae_bf16.safetensors`](https://huggingface.co/Comfy-Org/Qwen-Image-2.1/resolve/ace0edeb3791a594ddfa36ed5f41a178a394e921/vae/qwen_image_2.1_vae_bf16.safetensors) | 676 MB |

Paste this path into the File Explorer address bar:

```text
%APPDATA%\Off Grid AI Desktop\models
```

Create the `models` folder if it does not exist. Put all four files **directly inside that folder**. Do not leave the VAE in a separate `vae` folder. These are the default paths; a custom OGAD data-directory override uses its own `models` folder.

The image model needs its text encoder and VAE. Reference-image editing also needs the vision projector. The older Qwen-Image VAE is not a substitute for the 2.1 VAE. The [image runner's Qwen-Image 2.1 guide](https://github.com/leejet/stable-diffusion.cpp/blob/2f88688/docs/qwen_image_2.1.md) documents that model combination.

## How do you generate your first image?

Restart OGAD after the files finish downloading. Use a local image configuration for this guide; a selected remote image server processes images elsewhere.

1. Open **Chat** and use **+ → Generate image**.
2. Open **Image options**. If you have multiple local image models, choose **qwen_image_2.1** in **Model**. With only one local image model, OGAD selects it without showing that dropdown.
3. Set **Size** to **1024**, **Steps** to **40** and **Guidance** to **6**. Leave optional prompt enhancement off for this first image.
4. Enter a prompt and send it.

Try a concrete visual brief:

> A square editorial illustration of a small reading room, warm afternoon light, green armchair, wooden shelves, simple shapes, no text.

When the result appears, use **Download** to save it. Change one part of the prompt for the next version, such as the lighting or the color palette. That makes the comparison more useful.

## How do you edit an existing image?

Keep Qwen-Image 2.1 selected. In **Image options**, choose **+ Init image** and select your source image. Describe the change you want:

> Replace the background with a quiet garden at sunset. Keep the main chair as the subject.

Send the request and compare the result with the original. This is generative editing: it can change details you wanted to keep. Check faces, lettering and product shapes before you use the result.

Use the prompt to direct the edit. The generic **Strength** control does not change Qwen-Image 2.1's edit request in this beta.

## What if the model does not run?

| Problem | What to check |
|---|---|
| Qwen-Image 2.1 does not appear | All files finished downloading, their names are unchanged, and the primary GGUF file is directly in `models`. Restart OGAD. |
| Missing encoder or VAE error | Check the exact companion filenames and the folder above. |
| Generation works but editing fails | Check that `mmproj-Qwen3VL-8B-Instruct-F16.gguf` is present. |
| Not enough memory | The four files load as a stack. Use a machine with more memory or a smaller image model. |

The manual setup takes some preparation. After that, you can keep a prompt, its reference image and the generated result in one local chat.

[Install the OGAD beta](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.52-beta.103), add the four files and make one image from a brief you already want to explore.
