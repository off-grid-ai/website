---
layout: content
title: "How to Prepare Discovery Call Questions From Client Documents in 2026"
description: "Use local AI to review a client's brief and notes, find important gaps, and prepare discovery questions that move the conversation forward."
date: "2026-09-29"
permalink: /articles/how-to-prepare-discovery-call-questions-from-client-documents-in-2026/
published_at: "2026-09-29T15:27:53.075Z"
article_topic: "Documents & research"
article_platform: "Any device"
devto_article: true
devto_id: 4772467
devto_url: "https://dev.to/alichherawalla/how-to-prepare-discovery-call-questions-from-client-documents-in-2026-53pa"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2Fijuwq9coo3fztl3n9bny.png"
---
A discovery call is more useful when you do not spend it asking for information the client already supplied. The preparation task is to find what the documents establish and what still needs a conversation.

OGAD (Off Grid AI Desktop) can help you review saved client material with a local model and draft focused questions. Check the source behind each gap, remove questions already answered, and arrange the remaining ones around the decisions you need to make. The work can stay on your computer after setup.

[Download OGAD](https://getoffgridai.co/desktop/) | [Desktop releases](https://github.com/off-grid-ai/OGAD/releases)

![A project chat in Off Grid AI Desktop answering from the project files and citing the PDF, the DOCX and the meeting it used.](https://getoffgridai.co/assets/img/home/app/projects-light-1760.webp)

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@getoffgridai.co](mailto:support@getoffgridai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

For a small consultancy, the useful result is a question guide that shows you have read the brief and helps the client explain the parts a document cannot settle.

## Which documents should you review?

Start with the current brief and the material directly relevant to the engagement. Include process notes, existing requirements, or a previous discussion summary when they help explain the work. Label old proposals and drafts clearly.

Suppose a client wants to improve how new enquiries become booked appointments. The brief names slow responses as a problem but does not explain who handles an enquiry, which cases need approval, or how success would be judged.

A useful preparation table is:

| Area | What the documents may establish |
|---|---|
| Goal | The result the client wants |
| Current process | What happens today |
| People | Roles involved in the work |
| Constraints | Conditions that affect the approach |
| Open decisions | Choices that need a conversation |

Keep an unknown separate from an assumption. If the brief does not name the approval owner, do not infer one from a job title mentioned elsewhere.

## What do you need in OGAD?

Install the app, download a local text model, and complete indexing setup if you plan to use a project. This uses free core features on supported Mac and Windows computers. [0.0.54-beta.108](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.54-beta.108) also provides Linux beta packages.

Save readable TXT, Markdown, DOCX, or text PDFs. Scanned documents need checked text first. Keep the originals for visual details that extraction may not preserve.

Use only the client material needed for this preparation. Keep other clients' documents out of the collection. A reusable question template should be clearly labelled as your own framework, not evidence about this client.

## How do you find the gaps locally?

For a short brief, attach it to a new chat. For several related documents, create a project and ask within that source collection. In both cases, inspect the source text before relying on the answer.

The project route is:

1. Select a downloaded model in **Models > Text**.
2. Open **Projects > New project**, name the engagement, and press Enter.
3. Open **Knowledge & settings > Knowledge base > Add files**.
4. Add the documents and wait for indexing.
5. Open **Chats > New chat** inside the project.

The [project controls](https://github.com/off-grid-ai/OGAD/blob/v0.0.54-beta.108/src/renderer/src/components/ProjectsScreen.tsx) keep the selected sources available for relevant-passage retrieval.

Ask:

> Review these client documents for discovery preparation. Separate facts already established, unclear statements, and missing information needed to understand the current process. Give a supporting passage for each point. Do not propose a solution yet.

## How do you turn gaps into good questions?

Ask questions that help the client explain a real situation. A question about the last time a problem occurred can reveal more than a request to rate the process in general terms.

For the enquiry example, useful questions could include:

- “What happens after a new enquiry arrives?”
- “Can you walk me through a recent enquiry that took longer than expected?”
- “Which cases need someone else to approve the next step?”
- “What would tell you the new process is working better?”

These are proposed questions for the scenario. Choose the ones the documents leave open and adapt them to the actual work.

Ask the model:

> Draft discovery questions from these checked gaps. Use open wording and one topic per question. Link each question to the missing information it would clarify. Avoid suggesting the answer or assuming a preferred solution.

## How do you avoid leading the client?

Review whether a question assumes the cause or solution. “Would automated reminders fix the delay?” already suggests an explanation. “What happens while the request is waiting?” gives the client more room to describe the process.

Ask for a wording check:

> Flag questions that assume a problem cause, suggest a solution, combine several topics, or ask for information already established in the documents. Suggest a neutral revision and explain the change.

Review those suggestions yourself. A model may make the language sound neutral while preserving the same assumption.

Keep follow-up prompts short. “What happened next?” or “Who needed that information?” can be more useful than a complicated question with several clauses.

## How should you order the call?

Begin with shared context, then explore the process, exceptions, consequences, and decisions. Put questions that depend on an earlier answer later in the guide.

For the enquiry example, first confirm the current route. Then discuss exceptions and delays. Only after understanding the work should you explore possible improvements and constraints.

Ask the model to propose an order, but do not force a script:

> Arrange these reviewed questions into a discovery guide. Group them by purpose and mark useful follow-ups. Keep the guide flexible and do not invent a duration or claim every question must be asked.

Leave room to follow an important answer. The guide should support listening, not turn the meeting into a form you rush to finish.

## How do you check questions that appear unanswered?

Return to the documents and search related wording. A relevant answer may use a different term. Project retrieval returns selected passages and may not include every source that could answer the question.

The [project chat path](https://github.com/off-grid-ai/OGAD/blob/v0.0.54-beta.108/src/main/ipc.ts) uses bounded retrieval, so do not label a fact absent from the entire client archive based on one response.

When you find an answer, turn the question into a confirmation only if that is useful: “The brief says the operations lead approves exceptions. Is that still the current process?”

Keep the source beside the confirmation so you can show why you are asking.

## What should you take into the call?

Use a short guide containing the purpose, confirmed context, priority questions, and a place for notes. Keep supporting sources available without putting every excerpt into the agenda.

| Check | What to confirm |
|---|---|
| Relevance | Each question helps understand the engagement |
| Evidence | The gap is real in the reviewed material |
| Neutrality | The wording does not push a preferred answer |
| Order | Later questions have the context they need |
| Flexibility | You can follow important answers |

This workflow drafts questions. It does not contact the client, schedule the call, or establish that your proposed approach is approved.

## Prepare for the next discovery conversation

[Download OGAD](https://getoffgridai.co/desktop/) and review the current brief. Find the facts already supplied, check the largest gaps, and create a short guide you can use while listening.

Keep the model local for analysis after setup. Sharing the agenda and joining the call have separate network requirements. The useful result is a conversation that starts from what the client has already told you.
