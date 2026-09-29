---
layout: default
title: "How to Build a Personal Glossary From Your Team's Documents in 2026"
description: "Find project terms in your own documents and turn them into a checked glossary with local AI on your computer."
date: "2026-09-29"
permalink: /articles/how-to-build-a-personal-glossary-from-your-team-s-documents-in-2026/
published_at: "2026-09-29T13:57:08.579Z"
article_topic: "Documents & research"
article_platform: "Any device"
devto_article: true
devto_id: 4771931
devto_url: "https://dev.to/alichherawalla/how-to-build-a-personal-glossary-from-your-teams-documents-in-2026-1i84"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2F6mqveqlx6le6pczub6wu.png"
---
You join a project and spend the first week decoding its language. The same abbreviation appears in a meeting note, a specification, and a support ticket. None of them explains whether it means the same thing.

OGAD (Off Grid AI Desktop) can help you build a glossary from the documents you already have. Add readable files to a project, ask a local model to find terms and supporting passages, and review the definitions before keeping them. The documents can stay on your computer when you use local models.

[Download OGAD](https://getoffgridai.co/desktop/) | [Desktop releases](https://github.com/off-grid-ai/OGAD/releases)

![OGAD project chat](https://getoffgridai.co/assets/img/desktop-chat.png)

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@offgridmobileai.co](mailto:support@offgridmobileai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).


This is useful when you start a consulting engagement, inherit an internal project, or work with a client whose team uses its own names for ordinary processes. The result is a reference you can use while reading, writing, or preparing questions. It is a draft that you check against the source material.

## What makes a project glossary useful?

A useful entry explains what a term means in this project and where that meaning came from. A dictionary definition alone may miss the team's usage. Keep the source, the scope, and any unresolved ambiguity beside the definition.

Suppose you are helping a service business improve its booking process. Its documents use “intake,” “case,” and “ready.” You want to learn the work before changing it.

| Term | What you need to establish |
|---|---|
| Intake | Does it mean the first enquiry, a completed form, or an accepted booking? |
| Case | Does one case belong to a customer, an issue, or a visit? |
| Ready | Which checks must be complete before work can start? |

These questions turn a list of words into a working reference. If two documents use “ready” differently, keep both meanings with their sources until someone confirms the intended use.

## What do you need before you start?

Use OGAD with a downloaded local text model and the resources needed for local document indexing. The workflow below uses free core Projects and document chat on Mac or Windows. Complete installation and model downloads while connected, then check that a small document indexes before relying on offline use.

Start with readable TXT, Markdown, DOCX, or text PDF files. A scanned PDF may have no extractable text. Prepare a checked text version before adding it; importing the file does not guarantee that the app can read every image inside it.

Choose a small collection: a project brief, a process description, and a recent set of notes. Keep the originals so you can verify a definition later. Project search returns selected passages, so it is better suited to focused questions than a demand to list every term in a large archive.

The [document extraction code](https://github.com/off-grid-ai/OGAD/blob/v0.0.51/src/main/rag/extractors.ts) and [project controls](https://github.com/off-grid-ai/OGAD/blob/v0.0.51/src/renderer/src/components/ProjectsScreen.tsx) describe the core route used here.

## How do you create the first glossary?

Create a project for the work, add the source documents, and start a chat within that project. Ask for a small set of terms rather than a complete dictionary. A narrow first pass makes mistakes easier to find.

1. Select a downloaded local text model in **Models > Text**.
2. Open **Projects > New project**, enter the engagement name, and press Enter.
3. Open **Knowledge & settings > Knowledge base > Add files**.
4. Add the source files and wait for indexing. Keep their retrieval switches enabled.
5. Open **Chats > New chat** inside the project.

If you use Pro captured memory, turn off **Include captured memory** and select **Save** when you want this exercise to use the project's supplied material. Earlier conversations in that project can also contribute context. A project helps organise work; it is not a separate user-permission boundary.

Try this prompt:

> Find terms in these project documents that a new team member may not understand. Start with the booking process. For each term, give the wording used, a plain-English definition supported by the source, the filename, and a short supporting passage. Mark a definition “Needs confirmation” when the source does not explain it. Keep different meanings separate. Do not expand an abbreviation from general knowledge alone.

Open the named sources. Check whether the passage defines the term or only happens to contain it. A model can produce a familiar expansion that is wrong for your client.

## How do you handle missing definitions?

Keep the uncertainty and turn it into a specific question. If the documents never define a term, asking the model repeatedly does not add evidence. Record what you found and ask a colleague who owns that process.

For example, your draft may say that “ready” appears in a handover checklist, but the checklist does not state who approves it. Your question becomes: “Who marks a case ready, and which checks must be complete?” That is more useful than asking someone to explain the whole process again.

After you receive an answer, save a dated note that records it. Add that note to the project if you want future searches to use it. Label it as a confirmed clarification so it does not become confused with the earlier AI suggestion.

## How can you use the glossary in real work?

Keep the checked glossary in a local Markdown or text document. Use columns for term, meaning, source, and unresolved question. Add it to the project so you can refer to it while preparing a draft or a meeting agenda.

For a client update, ask:

> Review this draft using the checked glossary. Point out terms that may confuse someone outside the project. Suggest a plain-language alternative without changing the meaning. Show each proposed change for me to review.

For onboarding, ask for a short practice exercise based on the confirmed definitions. Review the questions and answers before sharing them. Keep a glossary for each engagement instead of combining unrelated client vocabulary.

The local workflow also lets you work through internal wording without submitting the documents to a cloud model. Keep the active model local and avoid external tools for this task. Remote models and connected services have their own data routes.

## How do you keep the reference current?

Update the glossary when the process changes. Give source documents meaningful dates and disable superseded files from retrieval when they should no longer influence new answers. Disabling a source does not remove statements already written in a chat.

Do not assume a new file updates an older glossary automatically. Run another focused pass for the changed process, compare the suggestions, and revise the checked reference yourself. The useful deliverable is a small document that the team can trust, rather than a long list that no one has reviewed.

[Start with OGAD](https://getoffgridai.co/desktop/), add one project brief, and choose five terms you keep having to look up. Confirm those definitions before expanding the glossary.
