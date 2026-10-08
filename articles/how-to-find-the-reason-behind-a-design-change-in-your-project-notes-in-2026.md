---
layout: content
title: "How to Find the Reason Behind a Design Change in Your Project Notes in 2026"
description: "Use local AI to trace a design change to its source notes, separate stated reasons from later guesses, and prepare a clear rationale for the team."
date: "2026-09-29"
permalink: /articles/how-to-find-the-reason-behind-a-design-change-in-your-project-notes-in-2026/
published_at: "2026-09-29T14:31:53.220Z"
article_topic: "Work & organization"
article_platform: "Any device"
devto_article: true
devto_id: 4772148
devto_url: "https://dev.to/alichherawalla/how-to-find-the-reason-behind-a-design-change-in-your-project-notes-in-2026-4iog"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2F3e650vc1b3yndqx2sbea.png"
---
You can see that the design changed. The question is why. Without the original reasoning, a new review can reopen a decision the team already worked through.

OGAD (Off Grid AI Desktop) can help you search saved project notes for the discussion behind a design change. Use a local model to find candidate passages, then check the source before writing a rationale. The useful result is a short explanation of the decision, its conditions, and the questions that remain.

[Download OGAD](https://getoffgridai.co/desktop/) | [Desktop releases](https://github.com/off-grid-ai/OGAD/releases)

![A project chat in Off Grid AI Desktop answering from the project files and citing the PDF, the DOCX and the meeting it used.](https://getoffgridai.co/assets/img/home/app/projects-light-1760.webp)

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@getoffgridai.co](mailto:support@getoffgridai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

For a small design studio, this helps when a new designer joins, a client revisits an earlier option, or a handover needs more than a screenshot. You can explain the decision using the team's records rather than a plausible story invented afterward.

## What evidence explains a design change?

Look for the problem, the options considered, the reason for choosing one, and the conditions attached to it. A visual difference shows what changed. Notes may establish why the team made that change.

Suppose a service website moved pricing information from a separate page into the enquiry flow. Later, someone suggests putting it back. You want to know whether the change addressed a user problem, a business requirement, or a temporary content constraint.

| Source | What it may establish |
|---|---|
| Original brief | The intended goal and constraints |
| Research notes | The observed problem that informed the work |
| Design review | Options and objections discussed |
| Decision note | The selected approach and stated reason |
| Later review | Whether the original condition still applies |

If the archive contains only “Move pricing into the form,” it establishes the action but not the reason. Keep that gap visible instead of asking the model to infer what a designer would probably have intended.

## How should you prepare the sources?

Collect the notes around the change and label their dates. Include the asset or screen version when you know it. Keep research observations separate from the team's interpretation and from the final decision.

Use readable text, Markdown, DOCX, or text PDFs. Screenshots can help you compare the before and after, but a picture alone may not explain the decision. Add a checked note describing the relevant change if that helps you search the collection.

This procedure uses free core Projects with a local text model on supported Mac and Windows computers. [Release 0.0.54-beta.108](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.54-beta.108) also has Linux beta packages. Complete app, model, and local indexing setup before working offline.

For scanned notes, prepare a checked text version. Importing a PDF does not mean every handwritten or image-based comment becomes searchable text.

## How do you find the original discussion?

Build a project for the design work and ask about a specific change. The question should identify the screen, element, or behaviour and the period you are investigating.

1. Select a downloaded local model in **Models > Text**.
2. Open **Projects > New project**, name the work, and press Enter.
3. Open **Knowledge & settings > Knowledge base > Add files**.
4. Add the selected notes and wait for indexing.
5. Open **Chats > New chat** inside the project.

The [project source controls](https://github.com/off-grid-ai/OGAD/blob/v0.0.54-beta.108/src/renderer/src/components/ProjectsScreen.tsx) let you manage enabled documents. Keep the collection focused on this engagement.

Ask:

> Find notes about moving pricing information into the enquiry flow. Show the source filename and date where present. Separate the stated reason for the change, alternatives discussed, and conditions attached to the decision. If the notes only state the change, say that the reason is not established.

Open the cited passages and read their surrounding context. A note may record an option that the team later rejected.

## How do you distinguish a reason from a guess?

A reason has support in the record. A guess may sound sensible but has no supporting passage. Ask the model to show the wording behind each explanation and identify where it is interpreting.

For the pricing example, “Customers need price context before enquiring” is different from “This will increase conversion.” The first could be a stated design need. The second is a prediction unless the source includes relevant results.

Use a review table:

- The change.
- The stated reason.
- The supporting source.
- Conditions or assumptions.
- Evidence that is still missing.

Do not turn a team's hypothesis into a measured result. If the design was intended to reduce confusion, say that was the intent unless you have separate evidence showing the outcome.

## How do you compare later decisions?

Check whether later notes preserve, change, or replace the original rationale. A new business constraint can justify a new decision without making the earlier decision unreasonable.

Ask:

> Compare the original decision note with the later review. Which conditions changed? Show source passages for each difference. Keep a change in circumstances separate from evidence that the original assumption was wrong.

Project search retrieves a limited set of relevant passages. It is useful for locating the discussion but does not prove that every decision in the archive was examined. If the answer affects a major change, inspect the relevant files directly and use a date-based checklist.

For the pricing example, the original change may have depended on a limited product range. If the range expanded, that changed condition belongs in the next review.

## What should a short design rationale contain?

Write enough context that a new team member can understand the decision without replaying the entire project. Keep the rationale separate from the final implementation instructions.

A practical format is:

| Section | What to include |
|---|---|
| Decision | What changed and which version it affected |
| Problem | The issue the team intended to address |
| Reason | Why this option was selected, with a source |
| Tradeoff | What the team accepted or deferred |
| Revisit condition | What change would justify another review |

Ask the model to draft this format from your checked findings. Mark missing information as an open question. Then review the wording and save the approved note with the project sources.

A revisit condition should come from the record or be clearly labelled as your proposed review rule. Do not present a new idea as part of the original decision.

## What if you cannot find the reason?

Record what you do know and ask the relevant person a focused question. “Why did we change this?” is broad. “Was pricing moved because of the enquiry research or because the separate page was incomplete?” is easier to answer when those are the actual options in the notes.

| Problem | Next action |
|---|---|
| The answer is a general design principle | Ask for the project-specific source |
| A rejected option becomes the rationale | Check later passages and decision status |
| A claimed result has no measurement | Describe it as intent or remove it |
| Two notes conflict | Keep both and identify what needs confirmation |
| No rationale survives | Save the gap instead of inventing history |

## Recover the reason behind one change

[Download OGAD](https://getoffgridai.co/desktop/) and add the notes around a design decision you expect to revisit. Find the source, check the conditions, and save a short rationale the next person can use.

Keep the selected model local for processing on your computer after setup. Remote inference and sharing the rationale have separate network and data requirements.
