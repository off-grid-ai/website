---
layout: content
title: "How to Stop Desktop AI From Sending Screen Images to a Remote Model in Off Grid AI in 2026"
description: "Keep the screen-image permission off for a remote model server, or use local models for screen tasks."
date: "2026-09-29"
permalink: /articles/how-to-stop-desktop-ai-from-sending-screen-images-to-a-remote-model-in-off-grid-ai-in-2026/
published_at: "2026-09-29T11:55:20.095Z"
article_topic: "Images & vision"
article_platform: "Computer"
devto_article: true
devto_id: 4771210
devto_url: "https://dev.to/alichherawalla/how-to-stop-desktop-ai-from-sending-screen-images-to-a-remote-model-in-off-grid-ai-in-2026-2kpi"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2Fe3ruk6qq4rtucji1nna4.png"
---
A remote AI model can be useful, but a screen task may expose more than the words you type. A screenshot can include open apps, visible documents, and text you did not intend to share.

**OGAD (Off Grid AI Desktop)** has a separate **Allow screen images** setting for servers classified as OpenRouter or Custom. Leave it off to block screen-image use by the covered Web Use and Computer Use workflows. Save the setting for each server you use.

[Download OGAD](https://getoffgridai.co/desktop/)

---

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@offgridmobileai.co](mailto:support@offgridmobileai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

## Choose where your screen is processed

If your goal is to keep screen content on your own computer, use a suitable downloaded local model for the task. Selecting a remote chat model is a different choice from selecting a local model, even when both appear in the same app.

OGAD's remote screen-image control gives you a more specific decision: whether a saved remote destination can receive screen frames through these screen-task workflows. It is not a general network blocker or a promise that no other information can leave the app.

The remote-server control is present in [OGAD 0.0.51](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.51). Computer Use and Web Use availability still depends on the platform and Pro setup; the steps below focus on a Mac configured for those tasks.

## Check the permission before starting a task

1. Open **Settings → Remote**.
2. Select the saved server you want to review.
3. Find **Allow screen images** when the disclosure applies to that server.
4. Leave the switch off, or turn it off if you previously allowed it.
5. Select **Save**.
6. Repeat for another saved remote server if you use more than one.

The setting is stored per server. In this release, the app classifies the server from its address. Some recognized server types, including another OGAD server on its usual port, do not use this permission gate. A missing switch is not proof that a destination is local. Review the destination shown in the disclosure, especially if you change an endpoint.

When a covered screen task tries to use a remote destination without permission, OGAD blocks it and explains which server needs the screen-image decision. If you do not want to send frames there, keep the permission off and use a local task configuration instead.

## Why a remote task may stop here

A screen task may need visual information to decide what to do next. Blocking that information can prevent the selected remote workflow from proceeding. That is an expected result of the permission, not a reason to enable it automatically.

Choose based on the job:

- For a local screen task, configure the required local models and permissions.
- For remote text chat, keep the request to the text you intend to send.
- For a remote screen task, review the visible content and destination before you choose to allow frames.

A server on your own hardware is still another computer. Its location and network route matter separately from this permission. Accessing it away from home generally needs a working network connection.

## What this switch does not cover

It does not retract images already sent. It does not prevent you from attaching an image to an ordinary message. It also does not replace your checks on text, tool results, or other data sent through a remote workflow.

Do not treat a disabled screen-image switch as proof that an entire conversation is offline. The selected model, task strategy, and tools determine the rest of the route.

If your simple rule is “keep this work on this Mac,” use local models, avoid remote tools for that work, and check the active configuration before starting. Initial model downloads still need internet access.

[Download OGAD](https://getoffgridai.co/desktop/) and review one saved server's screen-image permission before your next computer task.
