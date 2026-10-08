---
layout: content
title: "How to Review a Client Proposal With AI Without Uploading It in 2026"
description: "Review a private client proposal with local AI, check its scope against the brief, and build a source-backed list of questions before you respond."
date: "2026-09-29"
permalink: /articles/how-to-review-a-client-proposal-with-ai-without-uploading-it-in-2026/
published_at: "2026-09-29T13:49:49.503Z"
article_topic: "Work & organization"
article_platform: "Any device"
devto_article: true
devto_id: 4771898
devto_url: "https://dev.to/alichherawalla/how-to-review-a-client-proposal-with-ai-without-uploading-it-in-2026-1db5"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2Fh04ro0lih0nc12e0f9qk.png"
---
A client proposal can look complete while leaving the most important question unanswered: what exactly will each side deliver? OGAD (Off Grid AI Desktop) can help you compare the proposal with the brief, find unclear commitments, and prepare questions. Select a local model, and this review can run on your computer without uploading either document to a cloud AI service.

[Download OGAD](https://getoffgridai.co/desktop/) | [Desktop releases](https://github.com/off-grid-ai/OGAD/releases)

![Off Grid AI Projects: an Acme pilot answer with citations to project documents.](/assets/img/home/app/projects-light-1760.webp)

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@getoffgridai.co](mailto:support@getoffgridai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).


## What should you get from a proposal review?

Aim for a short decision aid: what is included, what is missing, and what you need to ask before agreeing. A useful review points back to the proposal. It does not turn the model's confidence into a decision on your behalf.

Suppose you run a small design studio. A client sends a proposal for a six-week website project. The brief requests a mobile layout, content migration, and training. The proposal lists design and development but says little about migration. Your first useful result is a question about that gap, supported by the relevant text.

You can do this with one proposal and one brief. There is no need to assemble your entire client archive first.

## What do you need before you start?

Install OGAD and download a local text model that fits your computer. This document workflow uses the core Projects and chat features. You do not need background screen capture or a paid meeting recorder to review files you already have.

Complete the model and local search setup while connected. Test a small import before you work offline. Use text-based PDF, DOCX, TXT, or Markdown sources. If the PDF is a scan, obtain a checked text copy first; the [document extractor](https://github.com/off-grid-ai/OGAD/blob/v0.0.51/src/main/rag/extractors.ts) reads a PDF text layer rather than automatically reading every scanned page.

Give the files clear names, such as `Website-brief-approved.txt` and `Studio-proposal-2026-09-29.pdf`. Keep the original documents unchanged.

## How do you set up the review?

1. Open **Models > Text** and select a downloaded local text model.
2. Open **Projects > New project**. Name the project for this review and press Enter.
3. Open **Knowledge & settings > Knowledge base > Add files**.
4. Add the brief and proposal. Wait for indexing, and keep both retrieval switches enabled.
5. If you have Pro, turn off **Include captured memory** for this document-only review and save the settings.
6. Open the project's **Chats > New chat**.

Project files and instructions provide a useful boundary for the discussion. This is context organization, not a separate account or team permission system. Avoid adding unrelated client material to the same project.

## Ask for scope before asking whether it is good

A broad “review this proposal” request often gives broad advice. Start with the commitments that affect delivery:

> Review the website proposal against the approved brief. Make a table with requirement, proposal commitment, supporting source text, and question to resolve. Start with mobile layouts, content migration, training, and acceptance. If the retrieved text does not establish an answer, write “not established.” Do not assume a missing commitment is included.

Check the source for each row. If the answer says migration is included, locate that commitment in the proposal yourself. A mention of “content” may refer only to page design.

Then ask about one unclear area:

> What does the proposal explicitly say about moving existing content? Separate included work, excluded work, and items it does not establish. Quote the shortest useful passage and name the file.

This gives you something you can use in a conversation with the client.

## Build a review table that leads to a decision

Use a structure like this for your checked notes:

| Topic | What to establish | Useful question |
|---|---|---|
| Scope | Exact pages, assets, or services | Which items are outside the fixed scope? |
| Inputs | Material each side supplies | Who provides the final copy, and when? |
| Acceptance | How work is reviewed | What makes a deliverable accepted? |
| Changes | Treatment of additional requests | How will extra work be agreed? |
| Timing | Dependencies behind dates | What happens if an input arrives late? |

These are review prompts, not findings about every proposal. Remove rows that do not apply. Add the issues that matter to your actual work.

For the website example, your final notes might identify migration as unresolved and training as explicitly included. Keep those different statuses visible. “Unresolved” should not quietly become “excluded” in the final summary.

## How do you check prices and dates?

Check them directly against the source. Ask the model to extract figures, but use a calculator or spreadsheet for arithmetic and totals. Verify currency, tax treatment, payment milestones, and whether a figure is an estimate.

For dates, distinguish a calendar date from a duration. “Six weeks after receipt of assets” is not the same as “six weeks after signature.” Ask for the dependency, then read the original sentence.

If two documents disagree, record both versions and ask which is current. Do not tell the model to choose the most convenient interpretation.

## Turn checked findings into a useful reply

Paste your reviewed table into a fresh message and ask:

> Draft a concise reply with these three unresolved questions. Use a cooperative tone. Do not add terms, accept the proposal, or imply that any disputed point has been agreed. Keep each question specific enough for a direct answer.

Read the reply before sending it through your usual email app. This workflow prepares a draft; it does not send an acceptance or negotiate for you.

Save the checked findings with the proposal version. If a revised proposal arrives, compare the unresolved items against that revision instead of starting from memory.

## What can make the review unreliable?

Project search retrieves relevant passages within a limited context. It may miss an appendix, a qualification, or an exception. For a long proposal, work through the table of contents and ask separate questions about the schedule, exclusions, and attachments.

If a section is repeatedly missed, add a checked text extract of that section. Ask for evidence, but do not treat a citation as proof that the interpretation is correct. Have an appropriate professional review terms that require legal or specialist judgment.

## Try it with one proposal

[Download OGAD](https://getoffgridai.co/desktop/), add one proposal and its brief, and ask about one commitment that matters to delivery. The first useful result is a checked question you can ask the client. Build the rest of the review from there.
