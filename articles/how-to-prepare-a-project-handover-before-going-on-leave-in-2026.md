---
layout: content
title: "How to Prepare a Project Handover Before Going on Leave in 2026"
description: "Prepare a practical leave handover from current project notes with local AI, including owners, next actions, source links, and unresolved decisions."
date: "2026-09-29"
permalink: /articles/how-to-prepare-a-project-handover-before-going-on-leave-in-2026/
published_at: "2026-09-29T14:06:33.547Z"
article_topic: "Work & organization"
article_platform: "Any device"
devto_article: true
devto_id: 4771992
devto_url: "https://dev.to/alichherawalla/how-to-prepare-a-project-handover-before-going-on-leave-in-2026-k5g"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2Fyomvhmmldsunsssmf240.png"
---
Before going on leave, you need to make it easy for someone else to keep the work moving. OGAD (Off Grid AI Desktop) can help turn your current project notes into a handover draft with status, next steps, and questions to resolve. With a local model, you can prepare it on your computer without uploading the source documents to a cloud AI service.

[Download OGAD](https://getoffgridai.co/desktop/) | [Desktop releases](https://github.com/off-grid-ai/OGAD/releases)

![Off Grid AI Projects: an Acme pilot answer with citations to project documents.](/assets/img/home/app/projects-light-1760.webp)

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@offgridmobileai.co](mailto:support@offgridmobileai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).


## Write for the person covering your work

A handover should answer the questions your colleague will face while you are away: what is happening, what needs action, where the evidence is, and who can make a decision.

Suppose you are managing two client projects and taking a week off. One project is waiting for copy approval. The other has a delivery scheduled while you are away. A useful handover separates those situations. It does not give both projects the same vague status of “in progress.”

The result should let a colleague make the next sensible move without reading your entire archive. Start with a defined leave period and the work that may need attention during it.

## Gather current facts in a small source pack

Use the latest status note, delivery plan, relevant client decisions, and open-task list. Add a short note of facts that are known to you but not yet written down. Mark the date of that note.

For each project, check these items:

| Item | Why it matters during leave |
|---|---|
| Current status | Shows the starting point |
| Next commitment | Identifies what may need action |
| Deadline and dependency | Explains when action becomes necessary |
| Covering person | Shows who has agreed to handle it |
| Decision owner | Identifies who can approve a change |
| Source location | Lets the reader check the detail |

Do not assume an old assignment remains valid. Confirm who will cover the work before listing them as the owner.

## Set up a local handover project

Install OGAD and download a local text model that fits your computer. Complete initial search setup and a small import while connected. This file-based workflow uses core Projects and chat. It does not require recording your screen or meetings.

1. Choose your downloaded model in **Models > Text**.
2. Open **Projects > New project**, enter a handover name, and press Enter.
3. Open **Knowledge & settings > Knowledge base > Add files**.
4. Import current PDF, DOCX, TXT, or Markdown sources and wait for indexing.
5. If **Include captured memory** is available, turn it off for a document-only handover and save.
6. Open **Chats > New chat** in the project.

Use a separate project for each client if the source material must stay distinct in the working context. Projects organise sources and instructions; they are not a replacement for company permissions.

## Ask for a handover table before prose

Start with this request:

> Prepare a draft handover for the leave period I specify. For each project, list current status, next action, stated date, dependency, covering person if confirmed, decision owner if stated, and source file. Mark missing or conflicting information. Do not invent an owner or assume that a suggested date is confirmed.

Read each row against the source. In the two-project example, the copy approval may be a dependency rather than a task your colleague can finish alone. The delivery may need a final check before it is sent.

If the model cannot find a date, do not let it fill the cell with a plausible one. Put the question on your pre-leave list.

## Make the trigger for action clear

A good handover explains when to act. “Follow up with client” can mean several things. A clearer note says, “If approval has not arrived by the agreed review date, ask the client contact for an updated decision date.”

Only use a trigger that you have agreed with the team. Ask the model to make your checked instructions easier to follow:

> Rewrite these reviewed handover items so each has a trigger, an action, and a completion check. Preserve the agreed dates and people. If a trigger is missing, leave a question instead of choosing one.

This can make the handover more useful without pretending that the AI monitors the project or follows up automatically.

## Include the decisions your colleague should not guess

List issues that need an approval owner, such as extra scope, a changed delivery date, or a request to publish an unapproved asset. Keep the escalation path short and specific.

Do not place passwords or recovery codes in the handover. State how access is obtained through your existing process. Confirm before leave that the covering person can open the necessary files and tools.

A local AI answer may reference an imported filename. That reference does not give your colleague access to the original source. Put usable locations in the final handover yourself and test them from the intended access context.

## Turn the checked table into a readable note

After you resolve the gaps, ask:

> Write a concise handover using only this reviewed table. Open with the leave dates and the two most important commitments. Group details by project. End with unresolved questions and the agreed decision contacts. Do not add new work or imply that unconfirmed assignments are accepted.

The final note can be short because the preparation is specific. Keep routine background detail in linked source material rather than making the reader scan a long narrative for the next action.

Review the text for changes in meaning. “Waiting for approval” must not become “approved,” and “suggested delivery” must not become a promise.

## Do a dry run before you leave

Ask the covering person to use the handover to answer three questions: what needs attention first, where is the latest source, and who can decide if circumstances change?

If they cannot answer, fix the note or the access problem. A polished summary cannot compensate for an inaccessible document or an owner who has not agreed to cover.

For long source packs, inspect the latest update directly. Project search selects relevant excerpts, so one question may miss an important change in a late note. The [Projects workflow](https://github.com/off-grid-ai/OGAD/blob/v0.0.51/src/renderer/src/components/ProjectsScreen.tsx) helps organise the review, but you still check the current facts.

## Leave a clear return point

Add a place for the covering person to record decisions and completed actions during your absence. On return, compare that update with the original handover rather than reconstructing the week from memory.

[Download OGAD](https://getoffgridai.co/desktop/) and start with one project. Build a checked table of the next action, owner, dependency, and source. That is the core of a handover someone else can use.
