---
layout: content
title: "How to Turn a Client Brief Into a Project Proposal With Local AI in 2026"
description: "Use local AI to organise a client brief into a proposal draft, separate confirmed scope from assumptions, and add only terms your team has approved."
date: "2026-09-29"
permalink: /articles/how-to-turn-a-client-brief-into-a-project-proposal-with-local-ai-in-2026/
published_at: "2026-09-29T15:26:09.345Z"
article_topic: "Work & organization"
article_platform: "Any device"
devto_article: true
devto_id: 4772457
devto_url: "https://dev.to/alichherawalla/how-to-turn-a-client-brief-into-a-project-proposal-with-local-ai-in-2026-4lm3"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2Fy0n8z6avt73h7tk66dqq.png"
---
A client brief describes a need. A proposal has to explain the work you can do, what it includes, and which decisions are still missing.

OGAD (Off Grid AI Desktop) can help you turn a saved brief into a proposal draft with a local model. Extract the requirements, review the gaps, and build an approach from facts you approve. The writing can stay on your computer after setup, without uploading the brief to a cloud AI provider.

[Download OGAD](https://getoffgridai.co/desktop/) | [Desktop releases](https://github.com/off-grid-ai/OGAD/releases)

![A project chat in Off Grid AI Desktop answering from the project files and citing the PDF, the DOCX and the meeting it used.](https://getoffgridai.co/assets/img/home/app/projects-light-1760.webp)

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@offgridmobileai.co](mailto:support@offgridmobileai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

For a small consultancy or agency, the useful result is a clearer proposal to review. The model does not know your capacity, costs, or delivery commitments unless you supply them, so those decisions remain with your team.

## What should you extract from the brief first?

Separate the client's objective, stated requirements, constraints, and unanswered questions. A proposal written before that review can sound complete while quietly assuming important details.

Suppose a client wants to improve its customer onboarding process. The brief describes repeated questions and inconsistent handovers but does not specify whether the work includes software changes, training, or documentation.

A useful first table is:

| Category | What to establish |
|---|---|
| Objective | The result the client wants |
| Requirements | Work or outputs explicitly requested |
| Constraints | Conditions the brief states |
| Unknowns | Information needed to define the work |
| Proposed response | Your idea, clearly separate from the client's request |

Keep the difference between a business goal and a deliverable visible. “Make onboarding smoother” does not by itself define which files, sessions, or system changes you will supply.

## What do you need before starting?

Install OGAD and download a local text model that fits your computer. Save the current brief and your approved service information as readable local files. Complete app and model downloads while connected.

The saved-document workflow is part of the free core app on supported Mac and Windows computers. [Release 0.0.54-beta.108](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.54-beta.108) also provides Linux beta packages.

Use TXT, Markdown, DOCX, or text PDFs. Scanned briefs need checked text. Keep the original available for tables and visual details that extraction may not preserve.

Do not include unrelated client proposals as unlabelled evidence. If you use a template, remove other clients' details and make clear that its examples are not facts about this engagement.

## How do you analyse the brief locally?

Attach the brief to a new chat, inspect the text, and ask for requirements with evidence. Review the result before requesting polished proposal language.

1. Select a downloaded local model in **Models > Text**.
2. Open a new chat and choose **+ > Attach files**.
3. Attach the brief and relevant approved notes.
4. Wait for processing and inspect the extracted text.
5. Ask for confirmed needs and missing decisions.

The [file-processing implementation](https://github.com/off-grid-ai/OGAD/blob/v0.0.54-beta.108/src/main/files.ts) supplies document text to the model. It does not verify the client's needs or your ability to deliver a proposed service.

Use:

> Analyse this client brief. List stated objectives, requested outputs, constraints, and unresolved questions with supporting passages. Keep your suggested approach separate. Do not invent scope, budget, deadline, or client approval.

## How do you create a sensible proposal structure?

Use the checked requirements and your own approved approach. Ask for a structure that makes the work, boundaries, and decisions easy to review.

A practical outline includes:

- Your understanding of the problem.
- The proposed work and deliverables.
- What is outside the proposed scope.
- Inputs needed from the client.
- Review and acceptance points you intend to agree.
- Open questions and assumptions.
- Commercial terms supplied by you.

For the onboarding example, you might propose a discovery session, a process map, and reviewed guidance. That is your proposed service, not something the brief automatically authorises.

Ask the model to draft from the approved structure without expanding it into extra commitments.

## How should you handle assumptions?

Make assumptions visible and explain which part of the proposal depends on them. An assumption should be something to confirm, not an invisible basis for a confident estimate.

Try:

> Review this proposed scope for assumptions about access, available information, client participation, and approval. For each assumption, state what would change if it were false. Do not invent technical requirements or commercial terms.

For example, a process review may depend on access to current documentation and a knowledgeable client contact. If those inputs are absent, your team needs to decide how the approach changes.

Convert important assumptions into questions before finalising the proposal. The model can help phrase them, but it cannot supply the client's answer.

## How do you avoid unsupported promises?

Supply prices, timing, staffing, and outcome claims only after your team has approved them. Ask the model to leave placeholders when the facts are missing.

> Draft the proposal using only the checked brief and approved service notes. Preserve placeholders for price, schedule, and named roles. Do not add guarantees, testimonials, performance figures, or a stronger outcome than our approach supports.

Review every sentence that promises a result. A deliverable such as an approved process map is different from a guarantee that the client's operational performance will improve by a particular amount.

Keep the language clear. Specific work and a transparent review process can explain value without inflated claims.

## What if the brief and service notes conflict?

Show the difference and decide how to handle it. The client may request something outside your normal service, or your standard template may assume a process that does not fit this engagement.

Ask for a gap table:

> Compare the client requirements with our proposed service. Identify unmet requirements, extra proposed work, and points that need a decision. Cite the supporting source for each. Do not silently change either document.

For long sources, work by topic. The model's context is limited, and a complete attachment preview does not establish that every section was used in the answer.

## How do you review the final draft?

Read the proposal against the brief and your actual delivery plan. Check whether each deliverable is clear enough for both parties to discuss.

| Check | What to confirm |
|---|---|
| Scope | The work is specific and matches the intended offer |
| Boundaries | Exclusions and assumptions are visible |
| Inputs | Client dependencies are stated accurately |
| Commitments | Price, timing, and roles come from approved information |
| Evidence | Claims and examples are supportable |

Copy the approved text into your proposal editor and review the final document. The workflow does not send, sign, price, or approve the proposal for you.

## Draft from the next real brief

[Download OGAD](https://getoffgridai.co/desktop/) and start with the requirements table. Resolve the largest gaps, add your approved approach, and use the local model to produce a proposal your team can review.

Keep the model local for processing after setup. Sharing the proposal and obtaining agreement are separate actions. The useful result is a clearer offer, with fewer assumptions hidden in the wording.
