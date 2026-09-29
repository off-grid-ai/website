---
layout: default
title: "How to Build a Private Knowledge Base for Each Agency Client in 2026"
description: "Build a local source collection for each agency client, organise approved material, and ask questions with evidence before drafting client work."
date: "2026-09-29"
permalink: /articles/how-to-build-a-private-knowledge-base-for-each-agency-client-in-2026/
published_at: "2026-09-29T14:32:41.814Z"
article_topic: "Privacy & control"
article_platform: "Any device"
devto_article: true
devto_id: 4772159
devto_url: "https://dev.to/alichherawalla/how-to-build-a-private-knowledge-base-for-each-agency-client-in-2026-3k1b"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2F4x6c9wxd5ye2vtocvbas.png"
---
Before starting a client task, you often need the same context: the approved offer, the audience, the tone, and the decisions that changed the brief. Finding that material again is work of its own.

OGAD (Off Grid AI Desktop) lets you build a separate project knowledge base for each client and query it with a local model. Add the approved sources, keep versions clear, and inspect the evidence behind each answer. After setup, this free core workflow can run on your computer without uploading the collection to a cloud AI provider.

[Download OGAD](https://getoffgridai.co/desktop/) | [Desktop releases](https://github.com/off-grid-ai/OGAD/releases)

![Off Grid AI brand artwork](https://getoffgridai.co/assets/cover.png)

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@offgridmobileai.co](mailto:support@offgridmobileai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

For a small agency, the first useful result is a reliable starting point for a brief, content draft, or review. The knowledge base organises your working context. It is not a hosted client portal or a staff permission system.

## What should the first client source pack contain?

Start with a small set of approved material that answers common questions. More files do not automatically make the collection better. Unlabelled drafts and outdated offers can make an answer harder to trust.

Suppose your agency supports a specialist training company. You regularly need to confirm course audiences, delivery formats, approved descriptions, and tone. A useful source pack could include:

| Source | What it helps answer |
|---|---|
| Client overview | Who the organisation serves and what it offers |
| Current service or course descriptions | What can be stated about the offer |
| Voice guide | How client-facing copy should sound |
| Approved claims and examples | Which statements have support |
| Dated decision notes | What changed after the original brief |
| Open-question list | What still needs client input |

Keep examples labelled. A proposed headline or draft case study should not become an approved factual source simply because it appears in the same folder.

## What do you need before you build it?

Use OGAD with a downloaded local text model and local indexing resources. Complete installation and initial model setup while connected. The project-document workflow is part of the free core app on supported Mac and Windows computers.

Linux packages are available in [0.0.54-beta.108](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.54-beta.108) as a beta. You do not need Pro screen capture to build a selected-file knowledge base.

Prepare readable TXT, Markdown, DOCX, or text PDF files. Scanned PDFs may need a checked text version. Keep original sources in your normal records so you can inspect formatting, images, or context that text extraction may not preserve.

Name the files with a topic, date, and status where useful. `course-offers-approved-2026-09.md` is easier to judge than `client-information-latest.docx`.

## How do you create the client project?

Make one project for the client's working collection. Add the approved files and wait for indexing before asking questions. The project chat can then retrieve relevant passages from the sources you enabled.

1. Select a downloaded local model in **Models > Text**.
2. Open **Projects > New project**, enter a clear client label, and press Enter.
3. Open **Knowledge & settings** and write a short description of the collection.
4. Under **Knowledge base**, choose **Add files** and select the source pack.
5. Wait for indexing and leave the intended sources enabled.
6. Open **Chats > New chat** inside the project.

The [project interface](https://github.com/off-grid-ai/OGAD/blob/v0.0.54-beta.108/src/renderer/src/components/ProjectsScreen.tsx) contains the source list, settings, and retrieval switches. Repeat the structure for another client rather than adding both clients to one general agency project.

If you use Pro and see **Include captured memory**, leave it off when you want the project to use the selected source pack rather than broader captured activity. Save the change.

## What instructions should you save with the project?

Use **System prompt** for evidence and writing rules that apply to this client. Click **Save** after editing it. Keep the instructions short enough that you can review them when the engagement changes.

For the training-company example:

> Use this project's approved sources for client facts. Keep draft ideas separate from current offers. Cite sources for course details and factual claims. Follow the saved voice guide when drafting. If a claim is unsupported or the sources disagree, identify the question we need the client to answer.

This makes the intended behaviour clear, but it does not guarantee accurate output. The local model still needs review, especially before client work is published.

Project chat can also include recent discussions from other conversations in that project. Keep speculative brainstorming labelled so it is not confused with the approved source pack.

## How do you test whether the collection is useful?

Ask a few questions whose answers you already know. Include a normal fact, an exception, and a question the sources cannot answer. Check both the response and the named source.

For example:

- “Which audience is the introductory course intended for?”
- “Which delivery formats are approved for the advanced workshop?”
- “Do the sources establish a guaranteed completion outcome?”

The third question is useful because the right answer may be that the claim is unsupported. A knowledge base should make gaps visible, not fill them with persuasive-sounding copy.

The [project chat path](https://github.com/off-grid-ai/OGAD/blob/v0.0.54-beta.108/src/main/ipc.ts) retrieves a bounded set of passages. A successful test does not prove that every fact in every document will be found. Use focused questions and inspect the evidence when the answer matters.

## How can you use it for a real agency task?

Begin with a factual brief, then draft from the facts you checked. This creates a review point before the model produces client-facing copy.

Try:

> Build a source-backed brief for an article introducing the client's facilitator course. Include intended reader, approved offer details, useful examples already in the sources, and claims that need confirmation. Do not draft the article yet.

Check the brief and remove unsupported statements. Then ask for the draft using only the approved brief and relevant style instructions.

This separation is useful when an agency writer needs a clear starting point but does not own every detail of the client's business. The output should still go through your normal editorial and client review.

## How do you keep the knowledge base current?

Choose a simple update point, such as the start of a new campaign or after a client approves an offer change. Add the new approved file, record what it replaces, and disable outdated versions when they should no longer guide retrieval.

Disabling a file does not erase earlier conversations. If an old chat contains retired details, make the current source explicit and check later answers carefully.

Keep a short maintenance note with:

- The date of the last source review.
- Files added or replaced.
- Open factual questions.
- Material awaiting client approval.

Do not assume that changing an original document outside the app automatically refreshes every indexed copy. Add or update the collection deliberately and check a known question afterward.

## What does private mean in this workflow?

With local models, the AI processing described here runs on your computer after setup. Your document-sharing tools, remote model connections, and device sync are separate choices.

Projects organise source scope; they do not create separate staff accounts or client access permissions. Keep your device access and file-sharing process appropriate for the material. If a colleague needs a source pack, decide how to provide the approved files through your existing workflow.

## Build one client collection you will use tomorrow

[Download OGAD](https://getoffgridai.co/desktop/) and add a current overview, an approved offer document, and a voice guide. Ask three questions, check their sources, and use the verified facts to prepare one working brief.

Once that collection is useful, repeat the structure for the next client. The result is a clearer starting point each time your agency returns to the work.
