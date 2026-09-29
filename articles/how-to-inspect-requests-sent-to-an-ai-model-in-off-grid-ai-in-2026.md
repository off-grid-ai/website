---
layout: default
title: "How to Inspect Requests Sent to an AI Model in Off Grid AI in 2026"
description: "Use AI activity in Off Grid AI to inspect a request, compare effective settings and find the error behind a failed or slow local task."
date: "2026-09-29"
permalink: /articles/how-to-inspect-requests-sent-to-an-ai-model-in-off-grid-ai-in-2026/
published_at: "2026-09-29T12:55:32.323Z"
article_topic: "Models & performance"
article_platform: "Any device"
devto_article: true
devto_id: 4771579
devto_url: "https://dev.to/alichherawalla/how-to-inspect-requests-sent-to-an-ai-model-in-off-grid-ai-in-2026-3boj"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2Fezu84mgtdv5esgm4dw1r.png"
---
An AI answer failed, took much longer than expected or ignored a setting. Repeating the prompt gives you another result, but it does not tell you what the app actually tried.

**OGAD (Off Grid AI Desktop) has an AI activity view where you can inspect recorded requests and responses.** Find the task, check its model and backend, then inspect the request, effective parameters and error. That gives you a specific next check instead of a list of settings to change at random.

This guide covers the view released in **v0.0.54-beta.108**, a prerelease. Records are bounded diagnostic history; they are not a permanent archive or proof that a request never used a remote service. [Release](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.54-beta.108).

[Download OGAD](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.54-beta.108) | [Off Grid AI](https://getoffgridai.co)

![Off Grid AI — private AI on your own devices](https://getoffgridai.co/assets/cover.png)

---

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@offgridmobileai.co](mailto:support@offgridmobileai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

## What can an AI request record tell you?

A record can show which model handled a task, the recorded backend, the task's status and its duration. Its detail view can include the request, effective request parameters, response, error and related attempts. Available fields depend on the operation.

| Your question | What to inspect |
|---|---|
| Did the request finish? | Status and error |
| Was the expected model used? | Model |
| Did a GPU engine handle it? | Recorded backend and runtime details |
| Did a setting reach the engine? | Effective request parameters, where present |
| What did the model receive? | Request payload |
| Did the engine retry or fall back? | Related attempts, where recorded |

This is useful for local chat, image, speech, transcription and embedding requests recorded by the app. It is different from replaying computer actions or reading a meeting transcript.

## How do you inspect one request?

### 1. Make the task easy to find

If the problem is safe to repeat, send one short request that shows it. Avoid changing the model, processing preference and prompt all at once.

For example, ask a local model:

> Write three bullets from these notes: the draft is ready; the export still needs testing; the review is Friday. Do not add a release date.

This gives you a recognizable phrase to search for and a result you can judge. You do not need to use sensitive work data to check whether a model loads or a backend works.

### 2. Open AI activity

Go to **Settings → AI activity**. Use the refresh control if the latest request is not visible. Search for part of the prompt, a response phrase or the model name.

Use the filters to narrow by status, hardware or time, and select the relevant kind of request. For example, focus on failed image requests when an image model does not load. Looking at every text request from the day adds noise to that problem.

### 3. Read the summary before the payload

Select the record. Check the status, model, backend and duration first. If the record is still running, it may not yet contain a final response. If it failed, start with the error.

Then inspect **Request**, **Response** and **Effective request / parameters** when those sections are present. The effective parameters help distinguish the settings you intended from those passed into that operation.

The display controls can show or hide requests, responses, models and details. If a section seems absent, check both the display selection and whether that operation recorded the field.

## How does this help when an answer is wrong?

Suppose the answer invented a release date. Read the request first. Did your instruction to avoid adding one reach the model? Were the notes you supplied actually present?

If the expected text is present, the next useful change may be to the prompt or model. For example, ask the model to quote the source line for every date it includes. Then compare the new response with the notes.

If the expected text is missing, investigate the input path instead. Perhaps you sent a different message or inspected a different request. A request record helps separate those cases. It does not prove that the model followed every instruction or that its answer is correct.

Keep the change small enough to understand. Switching the prompt, model and backend together can produce a better answer while leaving you unsure which change mattered.

## How do you investigate a slow or failed task?

Use the same method for processing problems. First identify the exact request; then choose one next action based on its record.

| What the record shows | A practical next action |
|---|---|
| A different model than you expected | Check the active model, then repeat the small task |
| CPU after you selected CUDA | Check pack installation and model reload; inspect related attempts for a fallback |
| A model-loading or memory error | Try a smaller model before changing unrelated settings |
| A successful response but no audible speech | Check audio output and the voice test separately |
| A failed download or missing resource | Finish the required download while online, then retry |

An error can narrow the problem without explaining every cause. A recorded GPU backend does not establish that all computation used the GPU. A longer duration does not by itself prove the model is slower; loading and retries can affect an operation.

Related attempts are especially useful when a preferred engine fails and another route succeeds. Read the sequence before assuming that a successful final result used your first-choice backend.

## Can you share the record to get help?

The detail view has **Copy visible data**, and individual payloads can be copied. Select only the information needed for the issue. Read it before you paste it into an issue, chat or support message.

OGAD removes known secret fields such as authorization headers, API keys, tokens, passwords and cookies from recorded structures. That does not remove every secret a person might put inside ordinary prompt text. A pasted customer email or private document can still be sensitive.

A useful report usually needs the app version, the task you tried, the model, the backend, the error and a small example that reproduces it. It rarely needs the whole day's request history. Replace private input with a harmless example when possible.

## How much history is kept?

This release bounds the log to **5,000 records**, **seven days** and a total storage limit of **256 MiB**. Payloads and attachments have their own limits, so large content can be truncated or omitted. These limits mean an older or large request may not be available in full. [Retention policy](https://github.com/off-grid-ai/OGAD/blob/v0.0.54-beta.108/src/shared/ai-request-log.ts).

Use the clear action when you want to remove the saved diagnostic history. Keep your own reviewed notes if you need to track a problem over a longer period; do not rely on this view as a permanent task archive.

## Find one cause before changing five settings

The next time a request fails, open its record before retrying repeatedly. Check the model, actual backend and error, make one relevant change, then compare the next attempt.

[Get the current beta](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.54-beta.108) and inspect one small local request in **AI activity**. It is a direct way to see what the app tried and decide what to do next.
