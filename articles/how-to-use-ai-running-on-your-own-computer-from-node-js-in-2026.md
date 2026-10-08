---
layout: content
title: "How to Use AI Running on Your Own Computer From Node.js in 2026"
description: "Use JavaScript fetch to call AI running on your computer. Build a small Node.js script with a local model and no cloud provider key."
date: "2026-09-29"
permalink: /articles/how-to-use-ai-running-on-your-own-computer-from-node-js-in-2026/
published_at: "2026-09-29T10:39:18.341Z"
article_topic: "Automation & tools"
article_platform: "Computer"
devto_article: true
devto_id: 4770720
devto_url: "https://dev.to/alichherawalla/how-to-use-ai-running-on-your-own-computer-from-nodejs-in-2026-2pi2"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2Fcs9ufst8k7lud0g3ufyl.png"
---
Your Node.js tool can use AI without making every prompt an external API request.

OGAD (Off Grid AI Desktop) serves downloaded local models through an HTTP gateway. A Node.js script can use `fetch` to send a request, read the generated answer and add it to a workflow you already control. The model runs on your computer when you select the local route.

[Download OGAD for Mac or Windows](https://getoffgridai.co/desktop/)

![The Gateway in Off Grid AI Desktop: a local OpenAI-compatible API at 127.0.0.1 with endpoints for chat, images, speech, transcription and embeddings.](https://getoffgridai.co/assets/img/home/app/gateway-light-1760.webp)

---

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@getoffgridai.co](mailto:support@getoffgridai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

## Start with a small useful task

A good first integration turns a few source notes into a draft you can inspect. For example, your build tool could prepare a short human-readable update from completed checks and known failures.

Install OGAD, download and select a local text model in **Models**, then try it in **Chat**. Open **Gateway** and check its local address. The normal port is `7878`, but use the displayed port if it differs.

Use a Node.js installation with built-in `fetch`. The example needs no external package. Local chat and the gateway are core features and do not require Pro.

## Call the gateway from JavaScript

Save this as `local-update.mjs`:

```javascript
const base = "http://127.0.0.1:7878";

async function request(path, payload) {
  const response = await fetch(base + path, {
    method: payload === undefined ? "GET" : "POST",
    headers: { "Content-Type": "application/json" },
    body: payload === undefined ? undefined : JSON.stringify(payload),
    signal: AbortSignal.timeout(180_000),
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${await response.text()}`);
  }
  return response.json();
}

const { data: models } = await request("/v1/models");
const model = models.find((item) =>
  ["chat", "vision"].includes(item.kind) && !item.remote
);
if (!model) throw new Error("Select a downloaded local text model in OGAD.");

const result = await request("/v1/chat/completions", {
  model: model.id,
  messages: [{
    role: "user",
    content: "Write a short build update from these facts: unit checks passed; " +
      "deployment has not run; one accessibility check is still pending. " +
      "Keep completed work separate from pending work.",
  }],
  max_tokens: 160,
  stream: false,
});
console.log(result.choices[0].message.content);
```

Run it with:

```bash
node local-update.mjs
```

The model should return a draft update. Review whether it keeps deployment and the accessibility check pending. A useful test checks the facts in the answer, not whether it matches one exact sentence.

## Keep the integration simple

The script first reads `/v1/models`, then chooses a local chat-capable entry. That avoids hard-coding the display name of a model you might replace later.

`stream: false` asks for one complete response. This suits a small command-line step. A UI can use streaming later, but it must parse streamed events rather than treating them as one JSON document.

Give the model the input it needs, with a clear output request. Do not pass an entire repository into a prompt just because your script can read it. Context capacity and working memory still apply.

## Make failures visible

The example checks the HTTP status before reading the generated response. A failed model load should become an error, not an empty update that looks successful.

If the request times out, inspect the running app and selected model. A first load can take longer than a later request. Reduce an oversized input before adding repeated retries.

For machine-readable output, validate the generated content against your expected structure. Prompting for JSON alone does not replace validation.

The gateway listens on network interfaces and its inference endpoints do not require an API key. These examples use `127.0.0.1` on the same computer. Keep the host on a trusted network and do not expose this port to the public internet.

Download the required local model files before offline use. A remote provider selected in the app changes where inference runs.

These API routes are present in [OGAD 0.0.51](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.51). The running gateway also serves its API reference at `/docs`.


## Save a draft without hiding a failed response

Once the sample works, add `import { writeFile } from "node:fs/promises";` at the top of the file. Replace the final `console.log` with a small output check:

```javascript
const answer = result.choices?.[0]?.message?.content;
if (typeof answer !== "string" || !answer.trim()) {
  throw new Error("No final answer text was returned.");
}
await writeFile("build-update-draft.txt", answer.trim() + "\n", {
  encoding: "utf8",
  flag: "wx",
});
```

The `wx` flag refuses to replace an existing output file. Choose a new filename for another run, or review the existing draft before removing it. An empty final answer now stops the script instead of producing a plausible-looking empty deliverable.

Replace the sample facts with data your tool already knows. Keep completed checks, pending checks and failures in separate input fields or clearly labeled text. Ask the model to preserve that separation. It should explain the state supplied by your tool, not decide whether an unrun deployment succeeded.

## Review a result before attaching it to automation

Read the draft for the two pending facts in the example. Deployment must still be unrun and the accessibility check must still be pending. If either becomes a success claim, correct the prompt or select a model that handles the task more reliably.

For a file batch, save the input filename beside the output and process one item at a time first. Decide what your calling tool should do after a timeout: report an incomplete draft, inspect the server state, or allow a deliberate retry. Do not treat a client abort as evidence that the server never received the request.

This keeps the local model useful as a drafting step while your program remains responsible for factual state and error handling.

## Give your Node.js tool a local assistant

[Download OGAD](https://getoffgridai.co/desktop/), run one request and connect it to a small draft-producing step. Keep the result visible and easy to review before automating more of the workflow.
