---
layout: content
title: "How to Compare Themes Across Research Interviews Without Cloud Uploads in 2026"
description: "Use local AI to compare checked interview excerpts, preserve participant differences, and build a theme table you can trace back to the source."
date: "2026-09-29"
permalink: /articles/how-to-compare-themes-across-research-interviews-without-cloud-uploads-in-2026/
published_at: "2026-09-29T15:00:54.597Z"
article_topic: "Documents & research"
article_platform: "Any device"
devto_article: true
devto_id: 4772312
devto_url: "https://dev.to/alichherawalla/how-to-compare-themes-across-research-interviews-without-cloud-uploads-in-2026-5agd"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2F49alvfmsf2rdlgbh1olx.png"
---
Five interviews can describe the same problem in very different words.

OGAD (Off Grid AI Desktop) can help you compare those accounts with a local model. Give it checked interview text, ask for candidate themes, and inspect the passages behind each grouping. After the app and models are ready, you can do this work on your computer without uploading transcripts to a cloud AI service.

[Download OGAD](https://getoffgridai.co/desktop/) | [Desktop releases](https://github.com/off-grid-ai/OGAD/releases)

![Voice in Off Grid AI Desktop: dictated notes and a transcribed audio file, each turned into text with its to-dos pulled out on your computer.](https://getoffgridai.co/assets/img/home/app/voice-light-1760.webp)

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@offgridmobileai.co](mailto:support@offgridmobileai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

The result should be a reviewable comparison: which accounts support a theme, which challenge it, and which questions still need investigation. You remain responsible for the interpretation. A fluent summary is not a finding until you have checked its evidence.

## What can AI add to your interview review?

A local model can help organise excerpts, suggest labels, and find possible relationships. That is useful when you have already read the interviews but need a clearer way to compare them. Keep the model's proposed grouping separate from your final analysis.

Suppose you interviewed people about handing work to another team. One person describes missing documents. Another describes uncertainty about who should respond. A third says the documents were available but outdated.

Putting all three under "poor communication" loses the useful differences. A better comparison keeps the particular problem and its context visible:

| Candidate theme | Evidence to collect |
|---|---|
| Missing information | The specific information a participant could not find |
| Unclear responsibility | The decision or response with no agreed owner |
| Version uncertainty | The conflict between available documents |
| Successful handover | An account showing when the process worked |

These are possible labels for the example. Use labels that fit your own material.

## What should you prepare first?

Use checked transcripts with stable participant labels. Remove unnecessary identifying details from working copies. Follow the consent and handling rules for your research; processing locally does not decide whether a particular use is permitted.

Save one interview per file, or divide long interviews into clearly labelled sections. Include the question when an answer depends on it. Keep a private mapping of participant labels separately if your workflow needs one.

Install OGAD and download a suitable local text model. The document workflow uses free core features on supported Mac and Windows computers. Linux packages are available in [0.0.54-beta.108](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.54-beta.108) as a beta. Complete model and local search setup while connected.

Use TXT, Markdown, DOCX, or a text-based PDF. Scanned pages need usable text first. Check speaker labels and important wording against the original recording where available.

## How do you build a source set in OGAD?

Create a separate project for the study so that its files and related discussions stay together. Start with a small set of interviews you can review yourself.

1. Choose a downloaded local model in **Models > Text**.
2. Open **Projects > New project**, enter a name, and press Enter.
3. Open **Knowledge & settings > Knowledge base > Add files**.
4. Add the checked files and wait for indexing.
5. Keep the intended files enabled for retrieval.
6. If **Include captured memory** is available, turn it off and save for this source-only task.
7. Open **Chats > New chat** inside the project.

The [project controls](https://github.com/off-grid-ai/OGAD/blob/v0.0.54-beta.108/src/renderer/src/components/ProjectsScreen.tsx) manage the source set. Related chats in the same project can also contribute context. Use a new project if you need a clean test with only a particular set of sources.

## How do you create candidate themes?

Start with a narrow research question. Ask the model to show evidence before naming a broad conclusion. This makes it easier to reject a grouping that sounds reasonable but does not fit the interviews.

Try:

> From these interview sources, find accounts of difficulty handing work to another team. Give the participant label, a short exact passage, and the specific problem described. Suggest a candidate theme for each passage. Keep different causes separate and mark uncertain interpretations.

Read each passage in context. Check whether the participant described their own experience, another person's experience, or a hypothetical situation. Those are different kinds of evidence.

If the response uses a broad label, ask what that label includes and excludes. Save your reviewed definitions in a small coding note. That makes later decisions easier to explain.

## How do you avoid missing interviews?

Project retrieval returns selected passages. A question such as "What did everyone say?" does not guarantee that the answer considered every transcript. Use an interview checklist and review each source deliberately.

For a small study, extract relevant passages interview by interview. Verify them, then supply the checked excerpt set for comparison. You can attach a manageable excerpt file in a fresh chat through **+ > Attach files**.

Keep participant labels and source locations with the excerpts. When combining them, ask:

> Group these checked excerpts by the problem described. Preserve every excerpt ID. List items that do not fit a group. Do not count an omitted participant as agreeing or disagreeing.

Check the output against your input list. This catches dropped excerpts and prevents retrieval gaps from becoming research conclusions.

## How do you find exceptions and disagreements?

Ask for evidence that challenges each candidate theme. An unusual account may explain the conditions under which a problem occurs, rather than being something to remove from the summary.

For the handover example, the successful account might include a named owner and a single current brief. That suggests a question to investigate. It does not establish that those two factors caused the success.

Add columns for supporting accounts, contrasting accounts, and open questions. Keep frequency claims limited to a manually checked count in your actual source set. Repeated mentions within one interview are not automatically evidence from several participants.

## What should you save for your final analysis?

Keep a table that lets you return to the source:

| Field | Purpose |
|---|---|
| Theme and definition | State what belongs in the group |
| Excerpt IDs | Link the interpretation to checked text |
| Participant labels | Show whose accounts are represented |
| Contrasting evidence | Preserve differences and exceptions |
| Researcher note | Record your interpretation and uncertainty |

Copy the approved table into your research document or analysis tool. OGAD helps with text review; this procedure does not replace a complete research method or create verified qualitative findings automatically.

## Compare one question across a few interviews

[Download OGAD](https://getoffgridai.co/desktop/) and begin with a small checked excerpt set. Find candidate themes, inspect the exceptions, and save a comparison you can explain from the source.

Keep the model local for processing. Sharing results, obtaining missing files, and publishing findings remain separate actions. The useful first result is a clearer view of the differences between participants, with their actual words still attached.
