---
layout: default
title: "How to Turn Past Work Into a Portfolio Outline Without Cloud AI in 2026"
description: "Build a portfolio outline from past projects with local AI, accurate contributions, approved evidence, and a clear story for each case study."
date: "2026-09-29"
permalink: /articles/how-to-turn-past-work-into-a-portfolio-outline-without-cloud-ai-in-2026/
published_at: "2026-09-29T14:21:34.247Z"
article_topic: "Work & organization"
article_platform: "Any device"
devto_article: true
devto_id: 4772077
devto_url: "https://dev.to/alichherawalla/how-to-turn-past-work-into-a-portfolio-outline-without-cloud-ai-in-2026-2deo"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2Fr8dyunaq99gbbjcd6fe5.png"
---
Your past work may be spread across project notes, presentations, and finished files. OGAD (Off Grid AI Desktop) can help you turn that material into a portfolio outline with a clear story for each project. Select a local model to work on your computer without uploading private client notes to a cloud AI service. You choose what can be shown and which claims the evidence supports.

[Download OGAD](https://getoffgridai.co/desktop/) | [Desktop releases](https://github.com/off-grid-ai/OGAD/releases)

![OGAD chat interface](https://getoffgridai.co/assets/img/desktop-chat.png)

---

> **What would you like to do with Off Grid AI?**
>
> Want help with this workflow, or a feature you would like us to add? Email [support@offgridmobileai.co](mailto:support@offgridmobileai.co) with your devices and the task you want to improve.
>
> [Join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ) · [Talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/)

## Decide who the portfolio is for

A portfolio for a potential client needs to show relevant problems you can solve. A portfolio for a job application needs to show your contribution and how you work. The same project may support both, but the emphasis can differ.

Suppose you have three projects: a website refresh, an internal reporting tool, and a workshop that changed a service process. A generic list of deliverables will not explain why those projects matter. You need a reason to include each one and a clear account of your role.

Start with the audience and the kind of work you want next. This helps you select examples rather than filling pages with everything you have done.

## Make a project inventory

Create a short list before importing files. For each project, record the problem, your role, available evidence, outcome you can support, and permission status.

| Field | Example of the information needed |
|---|---|
| Problem | What the client or team needed to change |
| Your role | Decisions and work you were responsible for |
| Evidence | Approved screenshots, notes, or deliverables |
| Outcome | What happened, with a source where available |
| Permission | What you are allowed to disclose |

Do not treat access to a file as permission to publish it. A client project may be useful for a private discussion but unsuitable for a public case study.

If the outcome is unknown, say so in the inventory. You can still show a process or a deliverable without inventing a commercial result.

## Set up a local portfolio workspace

Install OGAD and download a local text model. Complete model and local search setup while connected. This workflow uses core Projects and document chat, with no need for background recording.

Use **Projects > New project**, then **Knowledge & settings > Knowledge base > Add files**. Add a small set of readable PDF, DOCX, TXT, or Markdown sources for one project. Wait for indexing and open **Chats > New chat** inside that project.

If **Include captured memory** is available, turn it off for a source-only review and save. Use separate projects when you want to keep different clients' working context distinct. That is source organisation, not a team access-control system.

OGAD's [document extraction](https://github.com/off-grid-ai/OGAD/blob/v0.0.51/src/main/rag/extractors.ts) reads text from documents. You should inspect visual work yourself; a text summary cannot establish the quality of a layout or interactive prototype.

## Find the story each project can support

Ask:

> Using these project notes, suggest a case-study outline for the stated audience. Identify the original problem, constraints, my documented contribution, important decisions, final output, and supported outcome. Name the source for each factual claim. Mark missing evidence. Do not invent results or attribute team work to me.

Check the response against your inventory. For the reporting tool, the strongest story may be how you clarified inconsistent definitions before designing the interface. For the workshop, it may be how the team selected a test rather than how much revenue the change generated.

The model can help organise the story. You decide which project demonstrates the kind of work you want to do again.

## Build a consistent outline without identical stories

A useful case-study structure is:

1. The reader's quick explanation of the project.
2. The problem and constraints.
3. Your role and collaborators.
4. One or two important decisions.
5. The output and evidence.
6. The result or learning that can be supported.

Keep the structure consistent enough to navigate, but give each project its own emphasis. A technical implementation may need an architecture explanation. A research project may need evidence for how findings changed a decision.

Ask for a short outline first. Full prose is easier to write once you know which claim each section must establish.

## Match evidence to the claim

For each proposed section, choose a supporting item:

| Claim | Possible support |
|---|---|
| You explored alternatives | Approved sketches or decision notes |
| You resolved a requirement gap | A checked requirements comparison |
| You produced a deliverable | A permitted sample or screenshot |
| The work changed an outcome | Verified result data with context |
| You learned from a limitation | A factual reflection on what you changed |

A screenshot of a finished page does not prove that conversion increased. A positive comment does not establish a measured business result. Keep the evidence and claim at the same level.

If you cannot show the original, consider whether you can describe the process or create a clearly labelled illustrative version with permission. Do not present a recreated sample as the original client deliverable.

## Prepare a public-safe fact sheet

Before drafting the portfolio, select the facts cleared for publication. Remove private identifiers, internal links, credentials, and unapproved client figures.

Ask the model to draft only from that approved fact sheet:

> Write the case-study outline using these approved facts. Keep my role explicit. Leave placeholders for missing approved visuals. Do not use confidential details from earlier discussion, invent testimonials, or add performance figures.

For a cleaner working context, start a new project containing only the approved material. Review the result for any detail that should not be public.

## Choose a small, purposeful portfolio

You may find that three well-supported projects tell a better story than ten thin summaries. The useful number depends on the audience and the work, not a fixed rule.

Ask what each project adds. If two case studies demonstrate the same skill in the same way, consider whether one should be shorter or whether a different project would show another part of your work.

This is an editorial choice, not a claim about what every recruiter or client prefers.

## Turn the outline into a build plan

List the text, visuals, permissions, and checks needed for each case study. Use your normal website or document tool to build the portfolio. This workflow supplies an outline; it does not publish a site or obtain client approval.

[Download OGAD](https://getoffgridai.co/desktop/) and start with one project. Build a source-backed outline, identify the evidence you can show, and write the first case study from facts you are comfortable standing behind.
