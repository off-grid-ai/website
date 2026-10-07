---
layout: content
title: "How to Keep Client Requirements Separate Across Consulting Projects in 2026"
description: "Organise client requirements in separate local AI projects, check sources before drafting, and reduce confusion when you move between consulting engagements."
date: "2026-09-29"
permalink: /articles/how-to-keep-client-requirements-separate-across-consulting-projects-in-2026/
published_at: "2026-09-29T14:27:38.592Z"
article_topic: "Work & organization"
article_platform: "Any device"
devto_article: true
devto_id: 4772123
devto_url: "https://dev.to/alichherawalla/how-to-keep-client-requirements-separate-across-consulting-projects-in-2026-5i7"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2Fng5bvwdcmf8no1sk1yw7.png"
---
Two clients use the same word for different processes. You switch projects, ask AI for a requirements summary, and need to know which context the answer came from.

OGAD (Off Grid AI Desktop) lets you keep separate projects with their own documents, instructions, and conversations. Build one source collection for each engagement, use a local model, and check the active project before asking about requirements. The free core app supplies this document workflow.

[Download OGAD](https://getoffgridai.co/desktop/) | [Desktop releases](https://github.com/off-grid-ai/OGAD/releases)

![Off Grid AI brand artwork](https://getoffgridai.co/assets/cover.png)

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@offgridmobileai.co](mailto:support@offgridmobileai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

For an independent consultant or small implementation firm, the benefit is clearer context when moving between clients. A project is a way to scope the material used for an answer. It is not a substitute for device security or a team access-control system.

## What should belong to one consulting project?

Keep together the sources that define one engagement: the current brief, checked discovery notes, approved decisions, and client-specific terms. Put a different client's requirements in a different project, even when the two engagements use similar systems.

Suppose you are helping two service businesses configure their enquiry process. One uses “qualified” to mean a lead has a budget. The other uses it to mean a technical specialist has confirmed the work is possible.

A generic instruction to summarise “qualified leads” can miss that difference. Separate projects let you keep the relevant definition next to the client's actual requirements.

| Source | What it contributes |
|---|---|
| Current brief | The scope you are working against |
| Checked discovery notes | The client's process and exceptions |
| Approved decisions | Changes that can guide delivery |
| Project glossary | The meaning of client-specific terms |
| Open-question list | What you still need to confirm |

Leave unrelated sample proposals and other clients' documents out of the collection. If you need a reusable template, make a neutral copy with no client details.

## How do you create the first client project?

Use a downloaded local text model and prepare readable documents. Complete app and local indexing setup while connected. The procedure works with free core Projects on supported Mac and Windows computers; [0.0.54-beta.108](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.54-beta.108) also provides Linux beta packages.

1. Open **Projects > New project**.
2. Enter a name that identifies the engagement and press Enter.
3. Open **Knowledge & settings** and add a short description of the work.
4. Under **Knowledge base**, choose **Add files** and select the client's sources.
5. Wait for indexing, then open **Chats > New chat** inside that project.

Use names such as `Client-A — Enquiry setup` rather than a vague label such as `Work`. Inside the files, keep dates and approval status visible.

TXT, Markdown, DOCX, and text PDFs are useful formats. Scanned PDFs need a readable text version or text layer. A file appearing in the list does not guarantee every page image became searchable text.

## What instructions help keep the work clear?

Use the project's **System prompt** field to explain the task and evidence rules. Save the instructions with **Save**. These instructions help guide responses, but you must still inspect the result.

For example:

> This project concerns Client A's enquiry process. Use this project's sources for client requirements. Separate approved decisions from proposals and open questions. Cite the source for project facts. If the sources do not establish a requirement, say what needs confirmation. Do not treat example templates as client decisions.

The [project settings implementation](https://github.com/off-grid-ai/OGAD/blob/v0.0.54-beta.108/src/renderer/src/components/ProjectsScreen.tsx) includes the description, system prompt, and document controls. The model may still make mistakes, so instructions are not a guarantee against an incorrect answer.

If you use Pro and see **Include captured memory**, leave it off for a collection intended to use selected client documents. Save that choice. Captured memory can broaden the material available for retrieval beyond the files you deliberately added.

## How do you check which context an answer used?

Ask a question with a source requirement and inspect the returned evidence. Start with something you already know, such as the definition of a process stage. That gives you a simple check before you draft a client-facing document.

> What does “qualified” mean in this project's enquiry process? Quote the supporting passage and name the source file. Separate the definition from any unresolved exceptions.

Check whether the answer uses the right client's definition. If it does not, inspect the project name, document list, and prior conversations in that project.

Project chat can use relevant document passages and recent discussion from other chats in the same project. A fresh chat is useful for a new question, but it does not mean all project conversation context disappears. The [project chat code](https://github.com/off-grid-ai/OGAD/blob/v0.0.54-beta.108/src/main/ipc.ts) makes that scope explicit.

## How should you move between engagements?

Before attaching a source or sending a request, check the project you opened. Start the conversation from that project's **Chats** view when you want a clear route into the correct context.

Use a short handover note for yourself when switching tasks:

- The engagement and current phase.
- The approved requirement you are working on.
- The open question blocking progress.
- The next source or decision to check.

You can ask the local model to draft that note from verified material. Review it before relying on it later. A short checked summary is more useful than carrying an entire unreviewed conversation into the next task.

## What should you do with changing requirements?

Add a dated approved note when a decision changes. Identify what it replaces. Disable older files for retrieval when they should no longer guide current answers, while keeping originals in your normal project records.

Do not assume disabling a document removes text from past conversations. If old discussion contains an outdated requirement, make the current approved source explicit in the next request and check the answer.

For the enquiry example, ask:

> Use the approved September requirements. What is the current rule for qualifying a lead? If earlier project discussion differs, show the difference rather than combining the rules.

This keeps the uncertainty visible. The model does not decide which client statement is contractually binding.

## What boundaries should you understand?

| Boundary | What to check |
|---|---|
| Project source scope | Only the intended files and project conversations belong here |
| Local processing | The selected text model is local |
| Optional memory | Pro captured memory stays off for a selected-file collection |
| Sharing | Exported or copied content follows the destination's data handling |
| Device access | Projects do not create separate staff permissions |

Local processing keeps the AI work on your computer after setup. It does not prevent someone with access to your device from opening your files, and it does not turn a project into a client portal.

## Set up the next engagement you will work on

[Download OGAD](https://getoffgridai.co/desktop/), create one project, and add its current brief plus checked notes. Ask for one client-specific requirement and verify the source.

Once that works, repeat the structure for the next client. The useful result is a clear, repeatable way to begin each task with the right requirements in view.
