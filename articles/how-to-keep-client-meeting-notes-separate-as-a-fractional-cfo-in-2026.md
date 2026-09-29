---
layout: default
title: "How to Keep Client Meeting Notes Separate as a Fractional CFO in 2026"
description: "Organise each client’s meeting notes in a separate local project. Retrieve decisions with sources and reduce mix-ups when you switch between clients."
date: "2026-09-29"
permalink: /articles/how-to-keep-client-meeting-notes-separate-as-a-fractional-cfo-in-2026/
published_at: "2026-09-29T15:32:15.280Z"
article_topic: "Work & organization"
article_platform: "Any device"
devto_article: true
devto_id: 4772489
devto_url: "https://dev.to/alichherawalla/how-to-keep-client-meeting-notes-separate-as-a-fractional-cfo-in-2026-1mnl"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2Fw4f20iap2qkpu6mstvpl.png"
---
One client's decision should not appear in another client's review.

**OGAD (Off Grid AI Desktop) lets you organise supplied notes and documents in separate Projects, then ask questions within the selected project.** For a fractional CFO, that gives each client's meeting context a clear home. Use a local model, select the correct project scope and inspect the sources. Project organisation is not a substitute for access controls on a shared computer.

[Download OGAD](https://getoffgridai.co/desktop/) | [Desktop releases](https://github.com/off-grid-ai/OGAD/releases)

![OGAD desktop chat interface](https://getoffgridai.co/assets/img/desktop-chat.png)

---

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@offgridmobileai.co](mailto:support@offgridmobileai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

## What problem does a separate project solve?

When you work with several clients, the confusing details are often ordinary ones: who promised a file, which meeting agreed the next step, or whether a note describes a draft or a final decision. Similar vocabulary makes the problem worse. Two clients can both have an open “forecast review” without sharing any other context.

A separate project gives you a defined set of notes and related conversations to query. Instead of asking a general assistant what happened, you can ask about the named client using that client's retained material.

This guide uses documents and notes you supply. Projects is a core desktop workflow. Automatic screen capture and meeting recording are separate Pro capabilities on supported platforms; neither is required to start this organisation method.

## What should go into each client project?

Start with a small source set rather than every document you have. Include the notes that establish decisions, open questions and responsibilities for the current review period.

| Source | Useful details to preserve |
|---|---|
| Meeting note | Client, date, attendees and the meeting's purpose |
| Decision record | Exact decision, who stated it and any condition |
| Follow-up note | Requested item, responsible person and stated due date |
| Supporting document | Title, version and period covered |
| Correction | What changed and which earlier note it replaces |

Keep the source names distinct. “Harbour Studio — review notes — September 12” is easier to verify than “meeting final.” Use a naming pattern your own practice can maintain.

Only add material you are authorised to handle. If a document is irrelevant to the question, leave it out of the first test. Smaller, well-chosen source sets are easier to inspect when the output is wrong.

## How do you set up the first client?

Use this setup for one client:

1. Open **Models > Text**. Download and load a compatible local text model.
2. Open **Projects > New project**, enter a clear name and press **Enter**.
3. Open **Knowledge & settings > Knowledge base > Add files**. Select the supported notes and documents for this project.
4. Wait for indexing to finish. Check the Knowledge base list and keep the intended files enabled for retrieval.
5. If **Include captured memory** is available, turn it **OFF** and select **Save**. This keeps broader captured work out of this supplied-document workflow.
6. Open **Chats > New chat** within the project and ask the first question.

The captured-memory control appears with Pro. In the core project workflow, that additional source option is not offered.

Use a synthetic note first:

> Harbour Studio review, September 12. The owner will send the revised supplier list. The next meeting will review the draft reporting pack. No reporting deadline was agreed. The draft cash-flow file still needs checking against the source workbook.

Open a chat within that project and ask:

> From the Harbour Studio review note, list the requested items and open questions. Include the source for each. Do not add a deadline where the note gives none.

Check that the answer keeps the missing deadline explicit. It should not turn a draft into an approved report or treat an unchecked file as confirmed.

## How do you keep the next client's context separate?

Create another project for the second client and add only that client's material. Use a different sample so you can detect a mix-up. For example, the second client might already have supplied its supplier list but still need to confirm the next meeting date.

Before asking a question, check the active project and memory scope. Project retrieval is different from the broader **All memory** scope. In the desktop implementation, project knowledge search is limited by the active project, while broader memory search is a separate tool choice. [Memory-scope source](https://github.com/off-grid-ai/OGAD/blob/v0.0.54-beta.108/src/main/tools/memory-scope.ts).

A practical test is to ask both projects the same question: “What is still needed?” Compare each answer with its own source. The first client should still need the supplier list; the second should not inherit that task.

## What should you check before using an answer?

Check the client, source, date and status. Those four details catch many of the mistakes that matter in an administrative summary.

| Output detail | Review question |
|---|---|
| Client name | Is this the project I intended to open? |
| Source link | Does it lead to the relevant note? |
| Date or period | Does it match the review I am preparing? |
| Status wording | Was this proposed, agreed, supplied or still open? |
| Owner | Is the person named in the source? |
| Deadline | Is it stated, or did the model infer it? |

If a source is missing, ask for the gap to remain visible. A blank deadline is more useful than a plausible invented one. If the answer cites the wrong note, narrow the question to the exact meeting title and date.

## Does a project create a security boundary between clients?

Treat it as an organisation and retrieval boundary, not a promise of separate user accounts, role permissions or a locked client workspace. Someone with access to the same app profile may be able to open another project.

Use the computer's appropriate account and access controls for your practice. Keep local processing selected when that is the intended data path. Remote models, online tools and exported files require separate decisions about where information goes.

The narrow benefit here is practical: your question can use a defined client source set, and you can inspect which sources support the answer. Do not turn that into a compliance or confidentiality guarantee that the project feature alone cannot establish.

## How do you handle corrections and later meetings?

Add the newer note with a clear date. If it changes an earlier decision, state the change in the source rather than relying on the model to guess that the newest file supersedes everything.

For example:

> September 19 update: the owner supplied the revised supplier list. The reporting pack remains a draft. Review is now scheduled for September 24.

Ask for a current status summary that cites both the update and any still-relevant earlier note. Verify that the supplier-list request is no longer presented as open, while the reporting pack remains a draft.

This process organises evidence. It does not check financial calculations, approve reporting treatment or replace your professional review of the underlying figures.

## Make the next client switch easier

End each review with a clear note of decisions, requested material and unresolved questions. Keep it in the correct project and use it as the source for the next preparation session.

[Try OGAD](https://getoffgridai.co/desktop/) with two harmless client examples first. Confirm that the same question returns the right sources in each project. Then apply the pattern to one real client whose notes you are authorised to use.
