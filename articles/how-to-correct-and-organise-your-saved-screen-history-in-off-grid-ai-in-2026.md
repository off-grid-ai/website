---
layout: content
title: "How to Correct and Organise Your Saved Screen History in Off Grid AI in 2026"
description: "Edit Replay descriptions and tags, reprocess a saved frame, and keep screen history tied to its source."
date: "2026-10-07"
permalink: /articles/how-to-correct-and-organise-your-saved-screen-history-in-off-grid-ai-in-2026/
published_at: "2026-10-07T21:19:16Z"
article_topic: "Getting started"
article_platform: "Any device"
devto_article: true
devto_id: 4814486
devto_url: "https://dev.to/alichherawalla/how-to-correct-and-organise-your-saved-screen-history-in-off-grid-ai-in-2026-509o"
image: "https://dev-to-uploads.s3.us-east-2.amazonaws.com/uploads/articles/nbogylja5cws6rrvx1bj.png"
---
A saved screen image can be useful even when its AI description is wrong. OGAD (Off Grid AI Desktop) Pro beta 114 lets you edit a Replay description and tags, or process the frame again with the current model. Keep the image as the source and make the text easier to find and use.

[Download OGAD](https://getoffgridai.co/desktop/) | [Get beta 114](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.55-beta.114)

![Editing a saved frame in Replay in Off Grid AI Desktop: its description and the tags acme, rollout and pilot, with Save and Cancel.](https://getoffgridai.co/assets/img/home/app/capture-edit-light-1760.webp)

---

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@offgridmobileai.co](mailto:support@offgridmobileai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

## What can you correct?

Replay stores captured screen images and processed context. A description can misread a heading, attach the wrong project name, or omit a detail you need later. Editing lets you correct the description and add useful tags without pretending the original image changed.

Reprocessing is a different choice. It asks the current model to process the saved frame again. Use it when you want another recognition attempt, then inspect the new result. A new run is not a guarantee of a better description.

These controls arrived in the recent beta workflow. Use beta 114 with Pro active and a saved Replay frame. You cannot reconstruct screen activity that was never captured.

## Find a frame worth correcting

Open **Replay**, choose the relevant date, and select a frame. Read the image before reading its generated text. Decide which fact needs correction: a document title, project name, or short description of the visible work.

Suppose the image shows a proposal for Project Cedar, but the description names Project Elm. Correct that name and retain only what the image supports. Reading a proposal does not prove it was approved or sent.

If the frame is blank, unreadable, or unrelated, editing a confident description will not make it evidence. Keep the limits of the source visible.

## Edit the description and tags

1. Select the saved frame in **Replay**.
2. Select **Edit** for its description and tags.
3. Correct the description using the visible source.
4. Add short, useful tags separated as the editor expects.
5. Select **Save**.
6. Reopen the frame and check the saved text.

Use a tag you will remember, such as the project name or work type. Keep it consistent across related frames. “Cedar proposal” is more useful than a vague tag such as “important” when you later need a specific record.

Do not put a secret into a tag or title. These labels are meant for retrieval, and can appear separately from the full image. Keep the description short enough to identify the work without copying unrelated private content.

## Process the image again

Prepare the local model you want to use for frame processing. Select **Reprocess this frame**. Wait for completion, then compare the returned description with the image and the earlier version you wanted to improve.

If the frame is busy, wait before trying again. If the model cannot read the relevant text, manually correcting a visible fact may be more useful than repeatedly running it.

A selected remote model changes where processing occurs. Choose the local route when you want the saved screen input processed on your computer. Editing text manually and reprocessing an image are separate operations.

## Use the corrected record later

Open Search or return to Replay with the project name and approximate time. A clearer description can help you recognize the right record. Use the linked image to check an exact fact before drafting a report or deciding what happened.

For a work update, keep the distinction between activity and outcome. “Reviewed the Cedar proposal” can be supported by a screen showing the review. “Approved the proposal” needs evidence of the approval itself.

A tag groups related material; it does not prove that all tagged frames describe the same completed task. Check the sequence and add your own context where capture is missing.

## Remove a frame you do not want retained

Replay also has **Delete this frame**. Use it only after confirming the selected image. The recent beta removes that frame's saved image and related processed record. It does not erase copies already exported, shared, or retained by another app.

For future private work, use capture exclusions or **Pause capture**. Correcting or deleting an old frame does not change what the app will capture next.

This guide covers **OGAD beta 0.0.55-beta.114**. The [release](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.55-beta.114) and [build record](https://github.com/off-grid-ai/OGAD/actions/runs/37334426829) identify the desktop version and its included Pro code. Setup details follow that code; they are not a device test.

[Download OGAD](https://getoffgridai.co/desktop/) and correct one known Replay frame. Save a clear description, add one useful tag, and verify the source before using the record elsewhere.
