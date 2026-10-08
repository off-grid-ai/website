---
layout: content
title: "How to Create a Technical Glossary for Multilingual Project Work in 2026"
description: "Build a reviewed technical glossary for multilingual projects with local AI, source context, approved terms, and clear rules for names and codes."
date: "2026-09-29"
permalink: /articles/how-to-create-a-technical-glossary-for-multilingual-project-work-in-2026/
published_at: "2026-09-29T14:25:07.428Z"
article_topic: "Work & organization"
article_platform: "Any device"
devto_article: true
devto_id: 4772109
devto_url: "https://dev.to/alichherawalla/how-to-create-a-technical-glossary-for-multilingual-project-work-in-2026-2n7o"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2Frjn84r1fe2qxp2pkyz5v.png"
---
A multilingual project can become confusing when the same technical term gets translated differently in every document. OGAD (Off Grid AI Desktop) can help collect terms from your project material and prepare a glossary for review. Use a local model to work on your computer without uploading internal documentation to a cloud AI service. The useful result is a small, agreed vocabulary your team can reuse.

[Download OGAD](https://getoffgridai.co/desktop/) | [Desktop releases](https://github.com/off-grid-ai/OGAD/releases)

![Off Grid AI Projects: an Acme pilot answer with citations to project documents.](/assets/img/home/app/projects-light-1760.webp)

---

> **What would you like to do with Off Grid AI?**
>
> Want help with this workflow, or a feature you would like us to add? Email [support@offgridmobileai.co](mailto:support@offgridmobileai.co) with your devices and the task you want to improve.
>
> [Join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ) · [Talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/)

## Start with a real terminology problem

A glossary should resolve ambiguity in the work. It does not need to contain every common word in a document.

Suppose an English and French project uses “release,” “deployment,” and “approval.” Different writers have used them inconsistently. You need to establish what each term means in this project before deciding how to translate it.

A model can suggest terms and candidate translations. It cannot decide your team's meaning or make a standard official. Assign a person who understands the work to review the entries.

## Gather representative sources

Choose a few current documents that use the language in context: a specification, a process note, a user guide, and an approved bilingual example if one exists.

Avoid starting with the entire archive. Old documents may contain terms that the team has replaced. Record the source version and intended audience.

| Source | What it contributes |
|---|---|
| Specification | Precise technical meaning |
| Process note | How the term is used in work |
| User guide | Wording intended for readers |
| Approved translation | Existing terminology decisions |
| Team clarification | Meaning not defined in documents |

Keep product names, model numbers, field names, and code identifiers visible. Many should remain unchanged across languages.

## Set up a local glossary project

Install OGAD and download a local text model that handles the languages you need. Test a short sample with someone who can review both the language and the technical meaning. Fluency alone does not establish domain accuracy.

Open **Projects > New project**. In **Knowledge & settings > Knowledge base**, choose **Add files** and import readable PDF, DOCX, TXT, or Markdown sources. Wait for indexing and open **Chats > New chat** inside the project.

Complete app, model, and local search setup before working offline. These are core Projects and chat features. If **Include captured memory** is available, turn it off for this source-only task and save.

The [Projects controls](https://github.com/off-grid-ai/OGAD/blob/v0.0.51/src/renderer/src/components/ProjectsScreen.tsx) let you organise the material. They do not automatically enforce a glossary across every future answer.

## Extract terms with their context

Ask for candidate entries:

> Identify technical terms and abbreviations in these documents that could be misunderstood or translated inconsistently. For each, give the exact term, a source sentence, the filename, and the meaning established by the source. If the meaning is not defined, mark it for review. Do not invent definitions.

Check the source sentence for each candidate. A word such as “release” may mean a software version in one document and permission to publish in another. Keep those meanings separate.

For long documents, review one section at a time. Project retrieval selects relevant passages, so a broad request will not guarantee a complete term inventory.

## Use a glossary format that records decisions

A practical entry needs more than two words in different languages:

| Field | Purpose |
|---|---|
| Source term | Exact term used in the project |
| Meaning | Short definition in this context |
| Target-language term | Approved equivalent or candidate |
| Keep unchanged? | Rule for names and identifiers |
| Example | A checked sentence showing use |
| Status | Proposed, approved, or retired |
| Reviewer and date | Who confirmed the decision |

The reviewer and date are information you add after review. Do not ask the model to invent an approval history.

A short glossary with clear decisions is easier to use than a long list of unreviewed synonyms.

## Ask for candidate translations, not automatic approval

Once you have checked the meanings, ask:

> Suggest a French equivalent for each reviewed English term. Use the project context and any approved examples. Show alternatives where the meaning changes. Keep product names, codes, and identifiers unchanged unless the glossary explicitly permits translation. Mark every new equivalent as proposed.

Have a qualified reader review the suggestions. If two terms are both valid, choose the one that fits your audience and document it. Do not let the model alternate between them for variety in technical instructions.

Where the original term is widely used by the team, a first-use explanation may be clearer than replacing it everywhere. Record that decision explicitly.

## Resolve conflicts before applying the glossary

If an approved document already uses a different equivalent, ask why. It may serve a different audience, reflect an older decision, or be an error.

Use a small conflict table with the term, two usages, source versions, and question to resolve. Ask the technical owner or language reviewer to decide. The model should not select the most frequent term as though frequency proves correctness.

For the fictional project example, distinguish software deployment from business approval before choosing the translated wording. Otherwise, every later translation can repeat the same conceptual mistake.

## Use the approved glossary in a draft

Paste the reviewed entries with a translation request:

> Translate the following section using the approved glossary. Preserve identifiers exactly. If the source uses a term in a meaning not covered by the glossary, flag it instead of forcing an existing equivalent.

Check the output for term use, meaning, and consistency. A prompt helps guide generation but does not guarantee compliance. Use your editor's search to verify important terms directly.

Keep a stable copy of the glossary in your normal document system. When you update it, note what changed and which existing documents may need review.

## Keep the glossary useful over time

Add terms when they cause a real question or a repeated inconsistency. Retire obsolete entries without erasing the reason for the change. Give examples enough context that a new team member can use them correctly.

Do not treat the glossary as a substitute for subject knowledge. A consistent translation can still be wrong if the definition was wrong at the start.

[Download OGAD](https://getoffgridai.co/desktop/) and begin with ten terms from one project document. Check their meanings, review the proposed equivalents, and use the approved list in one translation. That creates a vocabulary your next draft can actually follow.
