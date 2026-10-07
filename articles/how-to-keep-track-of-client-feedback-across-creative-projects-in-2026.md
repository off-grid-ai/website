---
layout: content
title: "How to Keep Track of Client Feedback Across Creative Projects in 2026"
description: "Organise creative feedback by project and version, find the source of a revision request, and keep approved decisions distinct from suggestions with local AI."
date: "2026-09-29"
permalink: /articles/how-to-keep-track-of-client-feedback-across-creative-projects-in-2026/
published_at: "2026-09-29T14:31:03.993Z"
article_topic: "Work & organization"
article_platform: "Any device"
devto_article: true
devto_id: 4772139
devto_url: "https://dev.to/alichherawalla/how-to-keep-track-of-client-feedback-across-creative-projects-in-2026-25ob"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2Fzjemduwb05wv6vksnmfd.png"
---
A client asked for a change, but which version were they reviewing? When feedback arrives in several rounds, the missing context can matter as much as the comment itself.

OGAD (Off Grid AI Desktop) can help you organise saved feedback notes in separate projects and query them with a local model. Keep dates, asset versions, and approval status beside each comment. You can then find the request behind a revision before changing the work again.

[Download OGAD](https://getoffgridai.co/desktop/) | [Desktop releases](https://github.com/off-grid-ai/OGAD/releases)

![A project chat in Off Grid AI Desktop answering from the project files and citing the PDF, the DOCX and the meeting it used.](https://getoffgridai.co/assets/img/home/app/projects-light-1760.webp)

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@offgridmobileai.co](mailto:support@offgridmobileai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

For a small studio or agency, the useful result is a clearer record of what changed and why. It helps the person doing the next revision distinguish an active request from a comment that a later decision replaced.

## What context should you save with feedback?

Keep the project, asset version, source, date, and status with the comment. “Make it warmer” means little without the version or passage it refers to. A short structured note can preserve that context without creating a large process.

Suppose your studio is preparing a launch video and a landing page. The client asks for a slower opening in the first video review. In the next round, they approve the timing but ask for a different final frame.

If you keep both comments without status, a later summary might recommend slowing the opening again. The record needs to show that the first request was addressed and the timing approved.

| Field | What to record |
|---|---|
| Asset | Video, page, presentation, or another item |
| Version | The exact version reviewed |
| Feedback | The client's wording or a checked summary |
| Source | Meeting note, saved message, or review document |
| Status | Proposed, accepted, completed, approved, or superseded |

These statuses are your reviewed records. The model does not know that a revision was completed unless you supply that information.

## What should go into each project?

Create one project for a related client engagement. Add the brief, checked feedback notes, and dated approval records. Keep different clients in separate projects so their tone, preferences, and requirements do not share the same working context.

The workflow uses free core Projects with a local text model. Complete app, model, and indexing setup while connected. Supported Mac and Windows builds are available from the download page; [0.0.54-beta.108](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.54-beta.108) also provides Linux beta packages.

Use readable TXT, Markdown, DOCX, or text PDFs. For a saved message, include the relevant context when copying it into a note. Do not assume adding one file connects the app to every message or review service you use.

A scanned feedback page needs checked readable text. For comments that depend on an image or video frame, keep the original available and describe the relevant asset location in your note.

## How do you set up the feedback collection?

Start with one active project and two review rounds. This is enough to test whether the source names and statuses let you find the current request.

1. Select a downloaded local model in **Models > Text**.
2. Open **Projects > New project**, name the engagement, and press Enter.
3. Open **Knowledge & settings > Knowledge base > Add files**.
4. Add the brief and checked feedback notes. Wait for indexing.
5. Open **Chats > New chat** inside the project.

The [project controls](https://github.com/off-grid-ai/OGAD/blob/v0.0.54-beta.108/src/renderer/src/components/ProjectsScreen.tsx) let you enable or disable sources for retrieval. If Pro shows **Include captured memory**, leave it off for a collection intended to use only the selected feedback sources, then save.

Use filenames such as `launch-video-v02-review-2026-09-19.md`. Keep the asset version inside the document too, so it remains visible if you later copy an excerpt.

## How do you ask what still needs changing?

Ask for current requests with the source and any later status. Do not ask the model to infer completion from the fact that a new version exists.

> Find feedback about the launch video's final frame. Show the asset version, source date, request, and any later approval or completion note. Keep current requests separate from superseded comments. Mark status as unknown when the notes do not establish it.

Check the returned passages against the source. If the answer combines feedback for the landing page and video, narrow the question to the asset name and version.

Project retrieval finds selected relevant passages. It does not guarantee a complete list of all feedback in the archive. For a delivery check, maintain your own reviewed revision list and compare it with the sources.

## How do you handle conflicting comments?

Keep both comments with their sources and ask which decision should govern the work. One may refer to a different audience, asset, or version. A newer comment may still be a suggestion rather than an approved change.

For example, one note might ask for a shorter page while another asks for more detail. The intended solution could be a shorter opening with supporting detail below, but that is a proposed interpretation until the client confirms it.

Ask the model:

> Show comments that may conflict about page length. Quote the relevant wording and identify the asset versions. Suggest a neutral clarification question. Do not resolve the conflict by inventing client intent.

Use the draft question in your normal review process after checking it. Generating the question does not send it or obtain approval.

## How do you keep the record current?

After a review, add a dated note stating which requests were accepted, completed, or replaced. Name the new asset version and the evidence of approval where available.

If an old working document should stop guiding answers, disable it for retrieval. Keep the final approved record easy to identify. Prior project chats can contain earlier discussion, so ask for current approved sources when preparing a new revision.

A useful end-of-round note includes:

- The version the client reviewed.
- Changes accepted for the next version.
- Questions still open.
- Items explicitly approved.
- The next review point, if agreed.

You can ask the model to draft this note from checked feedback, then review each status before saving it.

## How can this help across several creative projects?

Repeat the same source structure for each engagement. When switching projects, open the relevant project's chat rather than continuing a conversation with unrelated context.

Within one engagement, use asset names consistently. A campaign may contain several pieces, but the question should identify which one you intend to change. The model can help locate the evidence once that scope is clear.

Project separation organises knowledge. It does not create a shared client portal, staff permissions, or automatic approval tracking. Keep those parts of your existing workflow explicit.

## Start with the revision you are about to make

[Download OGAD](https://getoffgridai.co/desktop/) and add the current brief plus two feedback rounds. Ask for the request behind one planned change and check whether a later approval affected it.

Keep the model local for processing after setup. Later sharing and remote models have separate data paths. The first useful result is a revision grounded in the client's current feedback, with the source close at hand.
