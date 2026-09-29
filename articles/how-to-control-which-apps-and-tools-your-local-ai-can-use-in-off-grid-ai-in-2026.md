---
layout: default
title: "How to Control Which Apps and Tools Your Local AI Can Use in Off Grid AI in 2026"
description: "Choose which chat tools OGAD offers to the model, and separate tool access from app permissions."
date: "2026-09-29"
permalink: /articles/how-to-control-which-apps-and-tools-your-local-ai-can-use-in-off-grid-ai-in-2026/
published_at: "2026-09-29T11:50:59.949Z"
article_topic: "Getting started"
article_platform: "Any device"
devto_article: true
devto_id: 4771188
devto_url: "https://dev.to/alichherawalla/how-to-control-which-apps-and-tools-your-local-ai-can-use-in-off-grid-ai-in-2026-2hmh"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2Fdkpsyzy5iendc8qoriel.png"
---
You may want AI to answer a question without searching, opening a connected service, or taking an action. Other times, you want it to use one specific tool and leave the rest alone.

**OGAD (Off Grid AI Desktop)** gives you a master chat tool switch and controls for tool groups and individual tools. You can use those controls to keep a writing session simple or enable the tools a particular task needs.

[Download OGAD](https://getoffgridai.co/desktop/)

![OGAD desktop chat interface](https://getoffgridai.co/assets/img/desktop-chat.png)

---

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@offgridmobileai.co](mailto:support@offgridmobileai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

## Start with the task you actually want

For a rewrite of text you supply, the model may not need tools at all. For a request that depends on an app or connected data source, it needs the relevant tool and any required connection.

Turning on tools is not the same as granting access to every app on your computer. The tools available in OGAD depend on your platform, feature tier, setup, and connected services. An unavailable or unconfigured integration does not become usable because you switch tools on.

The core chat tool controls described here are available in [OGAD 0.0.51](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.51) on Mac and Windows. Some app integrations and computer-use features have separate Pro requirements.

## Set up a simple writing session

1. Open chat settings, then **Tools**.
2. Turn **Enable tools** off.
3. Start a regular chat with a downloaded local text model.
4. Paste a short draft and ask: “Rewrite this in clearer language. Keep the facts and use only the text I supplied.”
5. Review the reply against your original draft.

The master switch controls whether ordinary chat tools are sent to the model. Your selected model can still generate an answer from the conversation and its existing knowledge. Switching tools off does not make those answers factual or erase context already in the chat.

This is a useful way to work on private text with local processing after the initial downloads. Do not select a remote model if you want the text to remain on your computer.

## Enable only the tools the next task needs

Return to **Tools**, turn **Enable tools** on, and inspect the groups. Each group shows how many of its tools are on. You can switch a group or expand it and change individual tools.

Read each tool's description. Enable the one that matches your request, then ask for a small result you can check. For a connected app, also confirm that the connection is configured and active before you expect the model to use it.

For example, a request to rewrite pasted text and a request to retrieve information from a connected service have different access needs. Keep the first one simple. Enable a connection only when the second task needs it.

An enabled tool is available for selection; it does not guarantee the model will call it or that the service will succeed. Missing setup, an expired connection, or an unsupported task can still stop the action.

## Keep chat tools separate from computer-control permissions

These switches control the tools offered through the chat workflow. They are not operating-system permission controls or a security boundary around every action the app can perform.

In particular, a dedicated Assistant computer or web task has its own execution path and controls. Do not use the regular chat switch as a substitute for stopping an active task or revoking an operating-system permission. Finish or stop an existing run before changing the setup for your next task.

A connected service can also require internet access even when the model choosing the tool runs locally. “Local AI” describes where the model runs; it does not make every external tool offline.

[Try OGAD](https://getoffgridai.co/desktop/) with tools off for one writing task. Then enable one tool only when you have a clear job for it.
