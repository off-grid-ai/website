---
layout: content
title: "How to Use an OpenAI-Compatible App With a Local AI Model in 2026"
description: "Connect an app that supports a custom OpenAI-compatible endpoint to the model running on your own computer."
date: "2026-09-29"
permalink: /articles/how-to-use-an-openai-compatible-app-with-a-local-ai-model-in-2026/
published_at: "2026-09-29T11:59:18.222Z"
article_topic: "Models & performance"
article_platform: "Any device"
devto_article: true
devto_id: 4771236
devto_url: "https://dev.to/alichherawalla/how-to-use-an-openai-compatible-app-with-a-local-ai-model-in-2026-2mh4"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2Flfxs1rgqqp363sqbtzha.png"
---
You have a chat client or writing tool you like, but you want its model to run on your computer. If the client supports a custom OpenAI-compatible chat endpoint, OGAD (Off Grid AI Desktop) can supply the local model behind it.

[Download OGAD](https://getoffgridai.co/desktop/)

![Off Grid AI Gateway: local API endpoints for chat, images, and audio.](/assets/img/home/app/gateway-light-1760.webp)

---

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@offgridmobileai.co](mailto:support@offgridmobileai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

This guide is for a client running on the same computer as OGAD. The core local API is free. Download the app and model first; the local chat request can then work without internet. The client may still use online features of its own.

## Check what your client supports

The client must let you change the API base URL and model identifier. It must support chat requests through `/v1/chat/completions`. A client limited to one provider's account or to a different API cannot be made compatible just by entering a local address.

In OGAD, download and load a local text model from **Models**. Keep OGAD running. Check the gateway's address in the app; the usual port is 7878, but use the actual port if it differs.

## Fill in the connection

Open your client's custom-provider or OpenAI-compatible connection settings. The labels vary, but the values have these roles:

| Client field | Value for the same computer |
|---|---|
| API base URL | `http://127.0.0.1:7878/v1` |
| Full chat endpoint, if requested instead | `http://127.0.0.1:7878/v1/chat/completions` |
| Model | Exact local model ID returned by `http://127.0.0.1:7878/v1/models` |
| API key | Leave blank if allowed; use a harmless placeholder if the client requires a nonempty field |

The gateway does not use that placeholder as authentication. Do not enter an unrelated provider's real key. Do not append `/v1` twice when a client adds it itself.

Open the models URL in a browser and choose the `id` of a local chat model, not a remote entry or an image-generation model. Some clients discover this list automatically. Others need the ID pasted into their settings.

## Get one useful result

Save the connection and use the client's test action if it has one. Then send a short request: “Rewrite this sentence in plain English: We will undertake a review of the proposed changes.”

Check that the selected provider is your local connection. If it succeeds, repeat with internet disconnected after the model is ready. That checks this route; it does not establish that every feature of the client is offline.

A 404 error often means the base path is wrong. Connection refused usually means OGAD is stopped, the port differs, or the gateway cannot be reached. A model error calls for a check of the returned model ID and its load state.


## Check one real writing task before moving your workflow

Start with a short text you can inspect. Ask the client to rewrite an email while keeping a date and an unresolved question unchanged. Compare the response with the original and check that the selected connection is the local provider you just created.

Then try one ordinary follow-up, such as “Make it shorter without changing the date.” This checks more than the client's connection-test button: it exercises the actual chat path you want to use.

Do not move a large document into the client until that small exchange works. The client may add its own system instructions or conversation history, which also use the model's context. If a small prompt works and a large one fails, investigate input size and memory rather than assuming the base URL is wrong.

## Separate address errors from compatibility limits

| Result | What it tells you |
|---|---|
| Models URL opens, but chat is 404 | The client may construct the wrong chat path or use an unsupported API |
| Client requires a provider login | It may not support a truly custom endpoint |
| Chat works but an extra feature fails | Check that feature's endpoint and required parameters separately |
| Same-computer request works, another device fails | Check reachable host address and network access |

“OpenAI-compatible” describes a supported interface, not every feature of every app that uses that name. A client may rely on a provider-specific file service, response API or account feature. Test only the chat capability described here before assuming that those other workflows will transfer too.

For offline use, disconnect internet after setup and try a new message rather than rereading a cached answer. If the local request succeeds but another client feature stops, keep that distinction clear when deciding whether the client fits your needs.

## Keep the network boundary clear

The bundled gateway does not add an API-key login. Keep it on a trusted network; do not expose it to the public internet. If you later use a client on another device, `127.0.0.1` points to that other device, not your computer. That requires a separate reachable-address setup.

The endpoint is documented in the [OGAD API reference](https://github.com/off-grid-ai/OGAD/blob/main/docs/API.md). Open your compatible client's settings, point it at OGAD, and get one answer from the model you chose.
