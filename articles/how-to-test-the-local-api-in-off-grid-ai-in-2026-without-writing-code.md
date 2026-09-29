---
layout: default
title: "How to Test the Local API in Off Grid AI in 2026 Without Writing Code"
description: "Open the local API reference and try a small chat request without writing a program."
date: "2026-09-29"
permalink: /articles/how-to-test-the-local-api-in-off-grid-ai-in-2026-without-writing-code/
published_at: "2026-09-29T12:00:07.435Z"
article_topic: "Writing & learning"
article_platform: "Any device"
devto_article: true
devto_id: 4771242
devto_url: "https://dev.to/alichherawalla/how-to-test-the-local-api-in-off-grid-ai-in-2026-without-writing-code-25po"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2Fd6efb73bye2fs9t12h6a.png"
---
Before you build an AI feature into a script or app, you need to know whether your model can answer a request. OGAD (Off Grid AI Desktop) gives you an interactive API reference in your browser. You can inspect the available endpoints, send a real request and read its response without creating a program.

That makes it useful for a first integration check: can this computer turn a short work note into the output your app needs? Start there, then copy a working request into code.

[Download OGAD for Mac or Windows](https://getoffgridai.co/desktop/)

![OGAD](https://getoffgridai.co/assets/img/desktop-chat.png)

---

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@offgridmobileai.co](mailto:support@offgridmobileai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

The core gateway is free. Download a local text model before you start. The reference page loads its browser component from a public CDN, so its first load needs internet. A request to a downloaded local model can run locally; the first visit to the interactive reference is not a fully offline workflow.

## What do you need for the first request?

Keep OGAD running and select a local text model in **Models**. Use the browser on that same computer for this first test. A phone or another computer has a different network address, which adds a second problem before you know whether the model works.

Open `http://127.0.0.1:7878/docs`. If OGAD uses another gateway port, replace `7878` with that port. This is the model gateway address, not the internal model-engine port.

The page lists the API supplied by your installed app. It includes a request editor and controls to send calls. Exact browser-component labels can change; select the endpoint by its HTTP method and path.

## How do you find the model ID?

Find **GET /v1/models** in the reference and send the request. Look in the returned `data` list for the selected chat or vision model. Copy its exact `id`, including any punctuation.

Here is a shortened example of the response shape. The ID is a placeholder, not a model you should type literally:

```json
{
  "object": "list",
  "data": [
    {
      "id": "YOUR_LOCAL_MODEL_ID",
      "object": "model",
      "kind": "chat"
    }
  ]
}
```

The live response can contain more fields and other model types. This endpoint describes active model choices; it is not a list of every model you could download. Also check that you selected a local model. A configured remote model can be exposed through the same gateway, and those entries can include `"remote": true`.

If you cannot find a local chat choice, return to Models, select the downloaded text model and wait for it to become ready. Then repeat the list request.

## Send a request with a result you can check

Find **POST /v1/chat/completions**. Use this body, replacing `YOUR_LOCAL_MODEL_ID` with the value you copied:

```json
{
  "model": "YOUR_LOCAL_MODEL_ID",
  "messages": [
    {
      "role": "user",
      "content": "Turn this note into exactly two short bullet points. Keep the owner and deadline. Note: Mia will send the revised mockups on Friday. Ben will check the mobile layout on Monday. Do not add facts."
    }
  ],
  "max_tokens": 160,
  "stream": false
}
```

Send the request once and wait for the response. A newly loaded model can take longer than an already running model. Avoid sending several copies while it is still preparing.

The fields have distinct jobs:

| Field | What it controls |
|---|---|
| `model` | The model ID for this request |
| `messages` | The conversation supplied to the model |
| `role` and `content` | Who supplies each message and its text |
| `max_tokens` | A cap on generated output, not a word count |
| `stream: false` | Returns one response body for an easier first inspection |

This is ordinary JSON. Keep the double quotes and do not add comments or a trailing comma after the last field.

## How do you read the answer?

Check the HTTP status first, then inspect `choices[0].message.content`. A successful non-streaming chat response normally contains an assistant message there. For example, a shortened response could look like this:

```json
{
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "- Mia: send revised mockups on Friday.\n- Ben: check the mobile layout on Monday."
      },
      "finish_reason": "stop"
    }
  ]
}
```

Compare the answer with the input: two bullets, two correct owners and two correct deadlines. A successful HTTP request does not prove that the model followed the instruction.

If `finish_reason` indicates a length limit and the answer is incomplete, increase the output cap modestly or ask for a shorter answer. A reasoning model may use some output budget before the final answer; an empty or incomplete final message needs investigation, not a success label.

Now change Friday to Thursday and send a new request. The answer should use Thursday. This small check confirms that you are testing your edited request rather than reading an example shown by the page.

## What should you check when something fails?

| Symptom | First check and action |
|---|---|
| Browser cannot connect | Confirm OGAD is running and the gateway port is correct |
| Reference page is blank | Check access to the CDN; open `/openapi.json` on the same gateway to see whether the schema responds |
| HTTP 400 with `Invalid JSON body.` | Check quotes, commas and that the body is a JSON object |
| Temporary HTTP 502 | Check whether the local model is reloading; wait for it to become ready before one retry |
| Reply uses the wrong model route | Recheck the selected local model and the ID from `/v1/models` |
| HTTP success but a poor answer | Check the actual generated text, prompt and output budget |

The reference loading, the gateway accepting a request and the model producing a useful answer are three separate checks. Reinstalling a model will not fix a blocked browser-script download.

## Use the working request as your starting point

Once the short example works, replace the note with a small sample of your real task. Keep the request shape unchanged until you know the new content works. The reference can then provide a code example for your integration.

Image and audio endpoints need their own supported models and runtimes. Their presence in the schema does not establish that those assets are installed on your platform.

The gateway has no API-key authentication and listens beyond loopback for device access. Keep its network access limited to trusted devices; do not expose this test server through router port forwarding.

The reference is supplied by [OGAD 0.0.51](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.51). [Get OGAD](https://getoffgridai.co/desktop/), open `/docs` and turn one short note into a result you can check. That working request is a useful first step toward your own local AI integration.
