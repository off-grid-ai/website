---
layout: default
title: "How to Prepare Questions About a Client Contract Without Uploading It in 2026"
description: "Prepare a clear list of questions about a client contract with local AI, while checking every clause in the original document."
date: "2026-09-29"
permalink: /articles/how-to-prepare-questions-about-a-client-contract-without-uploading-it-in-2026/
published_at: "2026-09-29T14:04:49.211Z"
article_topic: "Work & organization"
article_platform: "Any device"
devto_article: true
devto_id: 4771982
devto_url: "https://dev.to/alichherawalla/how-to-prepare-questions-about-a-client-contract-without-uploading-it-in-2026-1eod"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2F10qudd3jayyx35qq6ot7.png"
---
A client contract can leave you unsure what to ask before signing. OGAD (Off Grid AI Desktop) can help you organise clauses, spot wording that needs clarification, and draft questions on your own computer. Select a local model to avoid uploading the contract to a cloud AI service. Use the result to prepare for a conversation with the client or an appropriate legal professional.

[Download OGAD](https://getoffgridai.co/desktop/) | [Desktop releases](https://github.com/off-grid-ai/OGAD/releases)

![OGAD chat interface](https://getoffgridai.co/assets/img/desktop-chat.png)

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@offgridmobileai.co](mailto:support@offgridmobileai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).


## What can this workflow help you produce?

The useful output is a question list linked to the contract text. It is not a legal opinion, a prediction about enforceability, or a recommendation to sign.

Suppose you run a small consultancy. A draft agreement mentions a fixed fee, changes requested by the client, and payment after acceptance. You want to understand how acceptance is recorded and what happens if the scope changes. The model can help gather the relevant passages and phrase clear questions. Your next step is to obtain answers from the people responsible for the agreement.

This keeps the task narrow enough to check. Instead of asking whether the whole contract is “safe,” ask what the document explicitly states about one practical issue.

## Prepare the contract and its attachments

Use the current draft and any documents it incorporates, such as a statement of work or fee schedule. Check the filenames and dates before import. A reference to an attachment does not mean you have that attachment.

Create a short source list:

| Source | What to record |
|---|---|
| Main agreement | Draft date and version |
| Statement of work | Scope version and approval status |
| Fee schedule | Currency and payment milestones |
| Other referenced document | Whether you have the current copy |

Do not add old negotiated versions without marking them clearly. If you need to compare versions, make that a separate review task.

Use text-based PDF, DOCX, TXT, or Markdown files. Scanned signatures, image-only pages, and document layout require manual inspection. The [desktop extractor](https://github.com/off-grid-ai/OGAD/blob/v0.0.51/src/main/rag/extractors.ts) reads document text; it does not establish that every visual element has been reviewed.

## Set up local document chat

Download OGAD and a suitable local text model. Complete the first import and local search setup while connected. The document workflow uses core Projects and chat, so background activity capture is unnecessary.

1. Select a downloaded local model in **Models > Text**.
2. Create a project through **Projects > New project**.
3. Open **Knowledge & settings > Knowledge base > Add files** and add the source documents.
4. Wait for indexing and keep the relevant files enabled.
5. If **Include captured memory** is available, switch it off and save for this source-only task.
6. Start a **New chat** inside the project.

Keep remote models and external tools out of this local-only review. App and model downloads need initial connectivity, while the prepared local workflow can run offline.

## Begin with practical questions, not legal conclusions

Ask for a map of the text:

> Find passages in the agreement that address deliverables, client inputs, changes to scope, acceptance, payment, and ending the work. For each topic, give the source filename and a short exact passage. If you do not find a passage in the retrieved material, say so. Do not give a legal conclusion.

Check the passages in the original contract. If the model paraphrases instead of quoting, do not rely on quotation marks it adds. Copy the actual sentence yourself for your working notes.

A clause can depend on a definition elsewhere. If “Acceptance” is a defined term, find that definition before forming your question. Read nearby exceptions and conditions too.

## Turn unclear points into answerable questions

Use the checked passages to ask for plain questions:

> Based only on these verified passages, draft questions I can ask about the working arrangements. Separate a request to explain current wording from a proposed change. Do not present my preferred interpretation as an agreed term.

For the consultancy example, useful questions could include:

- How will the client confirm acceptance of each deliverable?
- Who can approve a scope change and the related fee?
- Which client inputs must arrive before the delivery period begins?
- Which document should we follow if the scope schedule and agreement differ?

These are examples of questions, not findings about your contract. Only retain the ones supported by a genuine uncertainty in your documents.

## Use a question register

A small table helps you keep the discussion organised:

| Topic | Verified passage | Question | Who should answer? |
|---|---|---|---|
| Acceptance | Copy the relevant text | How is acceptance recorded? | Client contact or adviser |
| Scope changes | Copy the relevant text | What is the approval process? | Commercial owner |
| Client inputs | Copy the relevant text | What happens when inputs are late? | Project owner |
| Specialist issue | Copy the relevant text | What review is required? | Appropriate professional |

Add the answer and date after the conversation. A verbal explanation may need to be reflected in revised wording. Do not mark an issue resolved merely because the AI generated a plausible answer.

## Keep facts and proposed changes separate

One common failure is that a model rewrites a clause and then discusses that rewrite as though it were in the contract. Label your notes clearly as original wording, explanation received, or proposed revision.

If you want help wording a request, ask for a question rather than a replacement clause:

> Draft a short email asking the client to clarify the acceptance process. Mention the section I identified. Do not state that the agreement has been changed or that I accept its terms.

Review the email and send it through your normal process. This workflow neither sends it nor changes the agreement.

## What requires extra care?

Long documents can exceed what retrieval provides in one response. Work through the table of contents and referenced schedules. A passage reference helps locate text but does not prove that every exception has been considered.

Dates, fees, percentages, notice periods, and definitions deserve direct checks. If the issue concerns legal rights, obligations, or a material business risk, use the question register to obtain professional advice. Do not treat a local model as a substitute for that advice.

## Start with one unresolved term

[Download OGAD](https://getoffgridai.co/desktop/), import the current agreement, and choose one working arrangement you do not understand. Find the passage, check it, and prepare a clear question. You will arrive at the next conversation with a more useful starting point than an unverified AI verdict on the whole contract.
