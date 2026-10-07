---
layout: content
title: "How to Remove Client Names From a Draft Using Local AI in 2026"
description: "Use local AI to prepare a draft with client names replaced, then check identifiers, document metadata, and the final exported copy yourself."
date: "2026-09-29"
permalink: /articles/how-to-remove-client-names-from-a-draft-using-local-ai-in-2026/
published_at: "2026-09-29T13:58:23.348Z"
article_topic: "Writing & learning"
article_platform: "Any device"
devto_article: true
devto_id: 4771936
devto_url: "https://dev.to/alichherawalla/how-to-remove-client-names-from-a-draft-using-local-ai-in-2026-31ma"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2Fctqstnjrkp6i1riev6ra.png"
---
You want to reuse a project write-up without including the client's name. OGAD (Off Grid AI Desktop) can help find identifying references and prepare a revised draft on your computer. With a local model selected, you can do that without sending the original text to a cloud AI service. The result still needs your review: replacing names is not the same as proving that a document is anonymous.

[Download OGAD](https://getoffgridai.co/desktop/) | [Desktop releases](https://github.com/off-grid-ai/OGAD/releases)


![Off Grid AI brand artwork](https://getoffgridai.co/assets/cover.png)

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@offgridmobileai.co](mailto:support@offgridmobileai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).


## Start with the version you intend to share

Make a copy of the draft and decide who will read it. An internal example, a public portfolio piece, and a training handout need different levels of detail. Define what the reader needs to learn before removing information.

Suppose a consultant wants to share a project lesson. The draft names “Northbank Foods,” its operations director, a town, and an exact launch date. Removing only the company name leaves several clues. Even a phrase such as “the town's only frozen-food exporter” could identify the client.

Use the model as an extra review pass. Keep the final decision about what can be shared with you and the person who owns that decision in your business.

## What should you prepare in OGAD?

You need the desktop app and a downloaded local text model. For a short draft, paste the text into a fresh chat. For a longer document, use a dedicated project with text-based PDF, DOCX, TXT, or Markdown files. Document chat is a core feature; this task does not require background capture.

Finish app, model, and local search setup before disconnecting. Select a local model for the review. Remote models and external tools have separate network behavior, so do not use them for this local-only workflow.

If you import a DOCX file, OGAD extracts its text. It does not edit every property of the original Word document. PDF import reads available text; it is not a complete visual inspection of scanned pages, logos, or signatures. The [extractor code](https://github.com/off-grid-ai/OGAD/blob/v0.0.51/src/main/rag/extractors.ts) makes this distinction clear.

## Use a replacement plan instead of asking for anonymity

Write a small replacement list before generating the new draft:

| Original detail | Intended treatment |
|---|---|
| Client company name | Replace with “Client A” |
| Named staff | Replace with role labels |
| Email addresses and phone numbers | Remove |
| Exact dates | Retain only if necessary; otherwise use a broader period |
| Commercial figures | Remove or use an approved range |
| Project code names | Replace with a neutral project label |

A role can itself identify a person in a very small company. Review combinations of details, not just individual words. If the exact project story is confidential, changing names may not make it suitable to publish.

Keep the replacement list private. It can reveal the connection between the revised draft and the source.

## First ask for a list of possible identifiers

For a short draft, paste the complete text and ask:

> Review this draft for details that could identify a client or person. List company names, personal names, contact details, project codes, locations, exact dates, and unusual combinations of facts. Quote each candidate exactly and explain why I should review it. Do not rewrite the draft yet.

Compare that list with the text. Add items the model missed. Use your editor's search to find the exact company name, abbreviations, product names, email domain, and known staff names.

This step is valuable because it separates finding details from rewriting prose. A smooth rewrite can hide an omitted identifier or change a fact you wanted to preserve.

## Then create the revised draft

Once you have a checked replacement list, ask:

> Rewrite the supplied text using the replacement list below. Preserve the lesson and sequence of events. Do not invent substitute facts. Where removing a detail makes a sentence unclear, use a plain general description. Return the revised draft and a list of changes for my review.

For the fictional consultancy example, the model might replace the client name with “a food business.” Check that it has not invented a size, country, or product category. A generic replacement should remove detail, not introduce new claims.

Read the revised version next to the original. Check both privacy and meaning. If “the director rejected the first option” becomes “the team agreed on the first option,” the rewrite has changed the lesson.

## How should you handle a longer document?

Use **Projects > New project**, open **Knowledge & settings > Knowledge base > Add files**, and add the working copy. Wait for indexing, then open the project's **Chats > New chat**. If Pro's **Include captured memory** is available, turn it off and save for this document-only task.

Work through the document section by section. Project search supplies selected passages to the model; it does not guarantee that every line is checked by a single question. A request to “remove every name in this document” can therefore miss content.

Keep a section checklist in your editor. Review the introduction, examples, tables, appendices, and footnotes separately. For final text checking, direct editor searches provide a useful second method.

## Check the file you will actually send

Copy the reviewed text into a clean output document. Then inspect that document outside the AI chat:

- Check headers, footers, captions, links, and embedded images.
- Remove comments and tracked changes if they expose the source.
- Check the filename and document properties.
- Open the exported PDF or other final format and read it again.
- Confirm that no replacement key or original attachment is included.

These are manual checks in your document tools. OGAD's text rewrite does not certify that the resulting file contains no identifying information.

## When should you stop and obtain permission?

If the lesson depends on a rare event, a recognisable transaction, or a sensitive allegation, name replacement may be insufficient. Ask the appropriate person whether the example can be shared. You may need a new fictional example instead of a modified real one.

Keep the original only where it belongs under your usual handling rules. Deleting a chat is not proof that every source copy or backup has been removed.

## Try one paragraph first

[Download OGAD](https://getoffgridai.co/desktop/) and start with a short working copy. Ask for identifying details, review the list, and generate a draft from approved replacements. That gives you a useful editing assistant while keeping responsibility for the final shared document clear.
