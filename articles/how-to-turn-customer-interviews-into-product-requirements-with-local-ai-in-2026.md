---
layout: content
title: "How to Turn Customer Interviews Into Product Requirements With Local AI in 2026"
description: "Use local AI to organise interview evidence into candidate product requirements, preserve uncertainty, and review the link between the customer problem and proposed change."
date: "2026-09-29"
permalink: /articles/how-to-turn-customer-interviews-into-product-requirements-with-local-ai-in-2026/
published_at: "2026-09-29T15:27:00.645Z"
article_topic: "Work & organization"
article_platform: "Any device"
devto_article: true
devto_id: 4772460
devto_url: "https://dev.to/alichherawalla/how-to-turn-customer-interviews-into-product-requirements-with-local-ai-in-2026-3oh6"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2Fp3f5sto9v310rs16auzw.png"
---
Customer interviews contain needs, workarounds, preferences, and suggestions. A product requirement should explain which problem you intend to solve and what evidence supports the choice.

OGAD (Off Grid AI Desktop) can help you organise checked interview transcripts with a local model. Find relevant passages, separate observations from proposed solutions, and draft candidate requirements for review. After setup, the source analysis can run on your computer without cloud AI.

[Download OGAD](https://getoffgridai.co/desktop/) | [Desktop releases](https://github.com/off-grid-ai/OGAD/releases)

![A project chat in Off Grid AI Desktop answering from the project files and citing the PDF, the DOCX and the meeting it used.](https://getoffgridai.co/assets/img/home/app/projects-light-1760.webp)

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@getoffgridai.co](mailto:support@getoffgridai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

For a small product team, the useful result is a requirement you can trace back to a real problem. The model can help organise evidence; it does not decide demand, priority, or what the team should build.

## What should you preserve from the interviews?

Keep the situation, task, difficulty, and workaround with the participant's wording. A feature suggestion can be useful, but it is not automatically the best response to the underlying problem.

Suppose customers describe losing context when a service request moves between teams. One asks for more email notifications. Another keeps a separate spreadsheet because they cannot see who owns the next step.

The shared problem may concern visibility and responsibility, while the proposed solutions differ. Your review should preserve both the evidence and the distinction.

| Evidence type | How to use it |
|---|---|
| Observed or reported difficulty | Describe the problem and situation |
| Workaround | Understand what the customer does today |
| Suggested feature | Treat it as a candidate response |
| Desired outcome | Define what should become easier |
| Your interpretation | Label it as analysis, not a participant statement |

## What do you need before starting?

Use checked transcripts or interview notes with source labels. Keep reliable participant codes and speaker labels, and retain the recording for quote checks where available.

Install OGAD and download a local text model. Complete local indexing setup if you will use a project. The free core workflow supports Mac and Windows, with Linux beta packages in [0.0.54-beta.108](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.54-beta.108).

Use readable TXT, Markdown, DOCX, or text PDFs. Scanned documents need checked text first. Remove unnecessary personal details from working copies according to your research process.

Start with one study and a focused product question. A large mixed archive makes it easier to combine unrelated needs into a false pattern.

## How do you find relevant evidence?

Create a project for the study, add the checked sources, and ask about a specific task. Keep the first result as an evidence table rather than a finished requirements document.

1. Select a local model in **Models > Text**.
2. Open **Projects > New project**, name the study, and press Enter.
3. Open **Knowledge & settings > Knowledge base > Add files**.
4. Add the sources, wait for indexing, and leave them enabled.
5. Open **Chats > New chat** inside the project.

The [project controls](https://github.com/off-grid-ai/OGAD/blob/v0.0.54-beta.108/src/renderer/src/components/ProjectsScreen.tsx) manage the source collection.

Ask:

> Find passages about losing context during a service-request handover. For each, give the source, situation, difficulty, workaround, and exact supporting wording. Keep interviewer suggestions separate from customer statements. Do not claim the list is exhaustive.

Check the sources before combining observations.

## How do you turn evidence into a problem statement?

Describe who is trying to do what, under which conditions, and what gets in the way. Avoid embedding a preferred feature in the problem statement before you have considered alternatives.

For the handover example, a candidate statement might concern staff not knowing which information the receiving team needs. That differs from “Users need another notification button.”

Ask the model:

> Draft problem statements from these checked observations. For each, name the supporting sources and the conditions where it applies. Separate shared evidence from a single person's account. Do not assume how common the problem is beyond the reviewed material.

Review whether the statement is narrow enough to guide a decision. If several different difficulties have been grouped together, split them before proposing requirements.

## How do you draft candidate requirements?

Start with a desired behaviour or capability and explain the evidence behind it. Keep the requirement provisional until the team reviews feasibility, value, and scope.

A useful candidate record includes:

| Field | Purpose |
|---|---|
| Problem | The difficulty to address |
| Evidence | Checked sources supporting the problem |
| Candidate requirement | The proposed capability or behaviour |
| Expected benefit | What you intend to make easier |
| Open questions | What still needs validation |

Use:

> Propose candidate requirements for these approved problem statements. Link each to its evidence. Keep the expected benefit separate from measured results. List assumptions and alternative approaches. Do not assign priority, effort, or acceptance thresholds without information I supply.

The model may suggest useful wording, but your team must decide whether the requirement represents the right product choice.

## How do you avoid overstating the research?

Do not treat retrieved examples as a count of all participants. Project search returns a limited set of relevant passages. Several passages can come from one interview, and some relevant wording may not be returned.

The [project chat implementation](https://github.com/off-grid-ai/OGAD/blob/v0.0.54-beta.108/src/main/ipc.ts) uses bounded retrieval. For frequency claims, review each interview against a consistent coding rule and maintain your own participant-level record.

Look for contrary examples too. Ask where the current process worked and what differed in those situations. This helps you avoid designing for an issue that only appears under a condition your proposal does not address.

## How do you prepare the requirement for discussion?

Keep the evidence short enough to inspect but complete enough to preserve the situation. Include the open question the next research or design step should answer.

For the handover example, you might need to learn whether a shared status view or better required fields would solve the problem. Those are alternatives to investigate, not conclusions from the transcript alone.

Ask the model to draft a review note:

> Summarise this candidate requirement for the team. Include the problem, evidence, proposed approach, alternatives, and the next uncertainty to test. Do not present it as approved scope.

Then review it with the people responsible for product and delivery decisions.

## What should you check before adding it to the backlog?

| Check | What to verify |
|---|---|
| Traceability | The requirement links to real source evidence |
| Interpretation | Analysis is separate from participant wording |
| Scope | The affected user and condition are clear |
| Uncertainty | Assumptions and missing evidence remain visible |
| Decision | The team has actually accepted the next step |

This workflow drafts and organises requirements. It does not automatically create tickets, validate demand, or prove that a feature will improve a metric.

## Trace one requirement back to a real problem

[Download OGAD](https://getoffgridai.co/desktop/) and add a small set of checked interviews. Find one recurring task difficulty, review the evidence, and draft a candidate requirement with its uncertainty intact.

Keep the model local for processing after setup. Sharing research and managing the backlog use their own tools and data paths. The useful result is a product discussion grounded in what customers actually described.
