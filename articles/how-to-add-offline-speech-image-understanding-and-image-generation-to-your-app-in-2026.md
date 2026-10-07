---
layout: content
title: "How to Add Offline Speech, Image Understanding, and Image Generation to Your App in 2026"
description: "Add local image understanding, speech and image generation to an app through the OGAD gateway. Use the right local model for each task."
date: "2026-09-29"
permalink: /articles/how-to-add-offline-speech-image-understanding-and-image-generation-to-your-app-in-2026/
published_at: "2026-09-29T10:41:39.918Z"
article_topic: "Voice & audio"
article_platform: "Any device"
devto_article: true
devto_id: 4770739
devto_url: "https://dev.to/alichherawalla/how-to-add-offline-speech-image-understanding-and-image-generation-to-your-app-in-2026-109f"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2Fdy0o2dt50lb1r9ep5ajd.png"
---
A small app can do more than send text to a chatbot. It can explain a screenshot, turn a recording into text or create an illustration while the required models run on the user's computer.

OGAD (Off Grid AI Desktop) exposes those local capabilities through one gateway. Your app uses a separate model route for each job, with a shared HTTP address. Download the models and required assets first; then a configured local workflow can run without an online AI provider.

[Download OGAD for Mac or Windows](https://getoffgridai.co/desktop/)

![Off Grid AI](https://getoffgridai.co/assets/cover.png)

---

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@offgridmobileai.co](mailto:support@offgridmobileai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

## Choose the capability your app needs

| Reader or user task | API route | Local model needed |
| --- | --- | --- |
| Explain an image | `POST /v1/chat/completions` with image content | Vision-capable chat model |
| Transcribe a recording | `POST /v1/audio/transcriptions` | Transcription model |
| Create an illustration | `POST /v1/images/generations` | Image-generation model |
| Read text aloud | `POST /v1/audio/speech` | Supported speech-output runtime and voice |

These are separate capabilities. A text-only model does not become a vision model because the request contains an image.

Use a supported local model for each route. [OGAD beta108](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.54-beta.108) adds a packaged Windows speech runtime for English (US and UK) voices, so Windows can also use the speech endpoint after voice setup. Do not assume the Mac's full multilingual voice set works on Windows. The older stable 0.0.51 package has a different speech-runtime configuration.

Core inference and the gateway do not require Pro capture. Start with one capability before building a UI around several at once.

## Give your app its first image question

In OGAD, download and select a supported local vision model in **Models**. Open **Gateway** and check the local address. The example below uses the normal `7878` port; replace it if your app shows another one.

Save a small PNG image as `example.png`. This Python 3 script sends the local image as a data URL, so it does not need a remotely hosted image:

```python
import base64
import json
from pathlib import Path
from urllib.request import Request, urlopen

BASE = "http://127.0.0.1:7878"

def request_json(path, payload=None):
    data = None if payload is None else json.dumps(payload).encode("utf-8")
    request = Request(BASE + path, data=data,
                      headers={"Content-Type": "application/json"})
    with urlopen(request, timeout=240) as response:
        return json.load(response)

models = request_json("/v1/models")["data"]
model = next((item for item in models
              if item.get("kind") == "vision" and not item.get("remote")), None)
if model is None:
    raise SystemExit("Select a downloaded local vision model in OGAD first.")

encoded = base64.b64encode(Path("example.png").read_bytes()).decode("ascii")
result = request_json("/v1/chat/completions", {
    "model": model["id"],
    "messages": [{"role": "user", "content": [
        {"type": "text", "text": "Describe the visible image. Mark unclear details."},
        {"type": "image_url", "image_url": {"url": "data:image/png;base64," + encoded}},
    ]}],
    "max_tokens": 160,
    "stream": False,
})
print(result["choices"][0]["message"]["content"])
```

Compare the description with the source image. Image understanding can make mistakes, especially with small text or ambiguous details. Your app should let the user check the image beside the answer.

## Add one output at a time

For image generation, select a downloaded image model and send a request such as:

```json
{
  "prompt": "A simple watercolor illustration of a quiet reading desk, no text",
  "size": "512x512",
  "response_format": "b64_json"
}
```

Send it to `/v1/images/generations`. A successful JSON result contains an image in `data[0].b64_json`; decode it before displaying or saving it. Use a size supported by the chosen model. Do not assume a cloud image API's entire parameter set is supported here.

For spoken output, prepare a supported local voice in OGAD first. On Windows beta108, choose an English (US or UK) voice. The speech endpoint accepts JSON with `input` text and returns WAV audio by default. Your app must read those bytes as audio rather than trying to parse them as JSON.

Transcription uses a multipart `file` field, not a JSON string containing the recording's path. The running `/docs` reference gives each route's format.

## Build around local resources

Show useful loading and error states. The first request can include a model load, and a model that does not fit the available memory cannot be fixed by a longer HTTP timeout alone. Keep the first interaction small and avoid firing every model route at once.

Use local selections for every capability in an offline workflow. One configured remote provider can make an otherwise local app depend on internet. Complete first-use asset downloads before the offline check.

The gateway listens on network interfaces and its inference endpoints do not require an API key. These examples use `127.0.0.1` on the same computer. Keep the host on a trusted network and do not expose this port to the public internet.

These API routes are present in [OGAD 0.0.51](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.51). The running gateway also serves its API reference at `/docs`.


## Build a small interaction from start to finish

A useful first app could help a user describe a photo for a personal journal. Let them choose one image, show its preview and send the focused image question. Display the returned description beside the original so they can correct a mistaken object or unreadable word.

Only after the user checks that description should you offer spoken playback. Send the approved text to the speech endpoint with a prepared local voice and handle the result as WAV bytes. Use an English voice and English text on Windows beta108. Keep the text visible while the audio plays so a pronunciation problem is easy to identify.

Image generation is another action with a different purpose. Ask the user for the illustration they want and show a clear generating state. Decode the returned image bytes and present the image for review. Do not treat an image-understanding request and an image-generation request as interchangeable because both involve a picture.

## Test the offline path deliberately

Complete the required model and voice downloads while connected. Run one small request for each capability you intend to offer. Then disable internet access and repeat using a local image data URL and the same local model selections.

If text still works but speech fails, investigate the speech files and runtime separately. If an image request depends on an online URL, the gateway may need to fetch that URL even while the model itself runs locally. The data-URL example avoids that dependency for the input image.

Record which capability passed on the actual platform. A successful English speech request does not establish support for other languages, and a working image model does not establish vision-chat support. Give the user an unavailable state for missing capabilities instead of accepting work that your app cannot complete.

## Start with one useful local interaction

[Download OGAD](https://getoffgridai.co/desktop/) and connect your app to one image question, one recording or one generated illustration. Add the next capability after the first gives a result the user can inspect.
