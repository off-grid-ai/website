---
layout: content
title: "How to Keep Your Mac Screen History Out of AI Document Answers in Off Grid AI in 2026"
description: "Keep captured screen history out of project document retrieval. Use the project source control and check the context behind an answer."
date: "2026-09-29"
permalink: /articles/how-to-keep-your-mac-screen-history-out-of-ai-document-answers-in-off-grid-ai-in-2026/
published_at: "2026-09-29T11:32:06.649Z"
article_topic: "Documents & research"
article_platform: "Mac"
devto_article: true
devto_id: 4771103
devto_url: "https://dev.to/alichherawalla/how-to-keep-your-mac-screen-history-out-of-ai-document-answers-in-off-grid-ai-in-2026-1fan"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2Flfcewwhfz1dm3lcukwoo.png"
---
You may want an assistant to use a project brief without bringing your wider workday into the answer. Screen history can be useful for recall, but it is not always relevant to a document question.

OGAD (Off Grid AI Desktop) Pro lets you switch off **Include captured memory** for a project. That removes captured memories from that project's retrieval sources while keeping its enabled uploaded documents available.

[Download OGAD](https://getoffgridai.co/desktop/)


![Off Grid AI brand artwork](https://getoffgridai.co/assets/cover.png)

---

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@offgridmobileai.co](mailto:support@offgridmobileai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

This guide uses the Mac Pro captured-memory workflow. The control is scoped to project retrieval; it does not delete the screen history or prevent all other conversation context from contributing.

## Give the project a clear source boundary

A project can retrieve passages from its enabled documents. With captured memory included, it can also retrieve recorded work context. Turning that option off helps keep a document task focused on the files you selected.

For example, you can ask about a current project brief without adding unrelated captured notes from another work session. It is a useful choice for a document review with a defined evidence set.

The control is available in [OGAD 0.0.51](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.51). Uploaded-document search is also available without Pro; this guide covers the Pro captured-memory control.

## Change the project setting

1. Open **Projects**, select the project you will use, and open **Knowledge & settings**.
2. Find **Knowledge sources**.
3. Switch **Include captured memory** off.
4. Save the project change with **Save**.
5. Review the document list and leave only the intended files enabled for retrieval.
6. Ask a specific document question in that project's chat and inspect the source references.

A useful first request is: “Summarize the requirements in the uploaded brief and cite the relevant passages.” Compare the result with the file, especially for dates, names, and numbers.

The setting applies to future retrieval. It does not revise an answer that was already generated.

## What the switch does not change

Earlier messages can still contain facts drawn from work history. Project conversations and uploaded files are different context sources from captured memory. The switch is not a promise that the model sees only the bytes of one document.

If a previous answer brought in unwanted context, state the source boundary in the next question and review the resulting citations. Remove or exclude an uploaded document separately if it contains the same unwanted material.

Turning off memory inclusion also does not pause capture. Use the capture control when you want to stop saving new screen activity. Use the data-deletion controls when you want to remove retained records. Those actions solve different tasks.

## Keep model processing local too

Source selection and processing location are separate choices. A project can use the right documents but still send context to a remote model if that is the selected route.

Download a local chat model and complete the built-in embedding-model download. Keep the request on your Mac when you want local processing. Initial model downloads need a connection. Online tools can still use the network if you enable and invoke them.

## When to include work history again

For a broader recall question, the captured record may be useful: “What else did I work on around this project?” You can turn memory inclusion back on for that project when you want the wider evidence.

Keep a narrowly focused document project separate from a broad work-recall project if you use both often. Check their source settings before relying on the distinction.

## Use the source set your question needs

[Get OGAD for Mac](https://getoffgridai.co/desktop/), open one project, and review **Include captured memory** before asking your next document question. You choose whether captured work history belongs in that retrieval step.
