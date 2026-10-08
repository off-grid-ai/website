---
layout: content
title: "How to Run a Local AI Server Without a Desktop Window in 2026"
description: "Run the OGAD gateway without the desktop window. Serve downloaded local models to your scripts and manage models through HTTP."
date: "2026-09-29"
permalink: /articles/how-to-run-a-local-ai-server-without-a-desktop-window-in-2026/
published_at: "2026-09-29T10:37:44.027Z"
article_topic: "Models & performance"
article_platform: "Computer"
devto_article: true
devto_id: 4770711
devto_url: "https://dev.to/alichherawalla/how-to-run-a-local-ai-server-without-a-desktop-window-in-2026-59g1"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2Fupxfzgpwre87msu4auog.png"
---
Your script needs an AI endpoint. It does not need an open chat window beside it.

OGAD (Off Grid AI Desktop) includes a **server-only** mode that starts the local model gateway without the desktop window, tray or capture services. You can use the same computer as a local inference host for scripts and small apps, with model management over HTTP.

[Download OGAD for Mac or Windows](https://getoffgridai.co/desktop/)

![The Gateway in Off Grid AI Desktop: a local OpenAI-compatible API at 127.0.0.1 with endpoints for chat, images, speech, transcription and embeddings.](https://getoffgridai.co/assets/img/home/app/gateway-light-1760.webp)

---

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@getoffgridai.co](mailto:support@getoffgridai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

## What runs without the window?

Server-only mode starts the gateway and language-model runtime. It skips the normal desktop interface and capture startup. It still uses the installed app and its packaged runtimes; it is not a separate tiny command-line model engine.

This is useful for a personal coding tool, a document-processing script or a machine you keep available for local requests. Core model serving is free. The computer must remain awake and the process must remain running while clients use it.

## Start the installed app in server-only mode

The following command uses the standard Mac application location. Quit an already running normal app first, then run this in Terminal:

```bash
"/Applications/Off Grid AI Desktop.app/Contents/MacOS/Off Grid AI Desktop" --server-only
```

If you installed the application elsewhere, use its actual path. The flag is handled by the desktop executable; the shown path is specifically for macOS.

The usual gateway address is `http://127.0.0.1:7878`. The gateway can choose another free port if that one is occupied, so check its startup output and use the reported port in every request.

```bash
curl --fail http://127.0.0.1:7878/v1/models/installed
curl --fail http://127.0.0.1:7878/v1/models/active
```

The first command lists installed models. The second shows the current selections. Download and select a suitable local chat model in the desktop app before switching modes if you want the simplest first setup.

## Manage a fresh host through HTTP

You can also set up models without the window:

| Task | Request |
| --- | --- |
| Browse available models | `GET /v1/models/catalog` |
| Start a download | `POST /v1/models/pull` with JSON `{"id":"CATALOG_ID"}` |
| Check download progress | `GET /v1/models/pull/status?id=URL_ENCODED_ID` |
| Select an installed model | `POST /v1/models/activate` with JSON `{"id":"CATALOG_ID"}` |

Replace the placeholder with an actual compatible model ID from the catalog. Wait for a successful download before activation. A response saying the download started does not mean the model is ready.

For an already selected local text model, try a short request:

```bash
curl --fail http://127.0.0.1:7878/v1/chat/completions \
  -H 'Content-Type: application/json' \
  -d '{"model":"local","messages":[{"role":"user","content":"Write one sentence welcoming a new teammate."}],"max_tokens":80,"stream":false}'
```

Use the downloaded local selection for this example. A remote provider selection changes the processing route.

## Keep the host useful and bounded

Initial model downloads need connectivity. Once the required files are present, local requests can run without an online AI provider. Add one model type at a time and check that it fits the host's memory.

The gateway listens on network interfaces and its inference endpoints do not require an API key. These examples use `127.0.0.1` on the same computer. Keep the host on a trusted network and do not expose this port to the public internet.

This command starts a process; it does not install a service that automatically restarts after reboot. First confirm the foreground process works before adding your own process-management setup.

These API routes are present in [OGAD 0.0.51](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.51). The running gateway also serves its API reference at `/docs`.


## Confirm the host is ready before connecting another app

Keep the terminal visible during the first run. A process that starts successfully can still lack a usable active model. Read the installed-model list, then the active selection, and finally send the short chat request above. Those checks answer three different questions: are the files present, is a model selected, and can it produce a result?

For a useful test, change the welcome sentence to a small transformation you need. For example, ask for two bullet points from a short status note and check that no deadline was invented. An HTTP response is not enough if the generated content is unusable.

When your first client works, record the executable path, gateway port and selected model ID. Use the same port in the model-management and inference requests. If the gateway moves to a free port on a later run, an old client address will fail even though the server process is healthy.

## Plan the host's working hours

A foreground server process is useful for a session of local work. Stop it when that session ends, and expect clients to lose access while it is stopped or the computer is asleep. This launch command does not configure boot-time startup, restart after a crash or remote administration.

If you later add process management, first decide which account owns the model files and how clients will detect an unavailable host. Keep a copy of the launch command and test a normal stop and restart before relying on it during a longer job.

Do not diagnose a remote client's failure until the same-computer request works. Local success separates model setup from network access and keeps the first investigation small.

## Give your next script a local endpoint

[Download OGAD](https://getoffgridai.co/desktop/), select one local model and start server-only mode. Send a short request, then connect the script that needs it.
