---
layout: content
title: "How to Stop an AI Document Assistant From Using Outdated Files in Off Grid AI in 2026"
description: "Keep old drafts out of new document answers without deleting them. Choose which project files OGAD retrieves and check the sources behind the result."
date: "2026-09-29"
permalink: /articles/how-to-stop-an-ai-document-assistant-from-using-outdated-files-in-off-grid-ai-in-2026/
published_at: "2026-09-29T11:31:15.385Z"
article_topic: "Documents & research"
article_platform: "Any device"
devto_article: true
devto_id: 4771101
devto_url: "https://dev.to/alichherawalla/how-to-stop-an-ai-document-assistant-from-using-outdated-files-in-off-grid-ai-in-2026-1kfo"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2Fxr3g9yu48evqk6gt9bcd.png"
---
The old specification says one thing. The new specification says another. If both remain available to your document assistant, a confident answer can still use the wrong version.

OGAD (Off Grid AI Desktop) lets you disable an uploaded project document for retrieval without deleting it. Keep the earlier draft for reference, enable the current version, and ask the next question against the sources you intend to use.

[Download OGAD](https://getoffgridai.co/desktop/)

---

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@offgridmobileai.co](mailto:support@offgridmobileai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

This feature is available without Pro on Mac and Windows. Use a downloaded local chat model, and complete the local embedding-model download before offline use.

## Keep the archive without keeping it in every answer

A project can hold several versions of the same material. Its document list has a retrieval switch for each file. Turning that switch off excludes that document's indexed passages from new retrieval requests in the project.

For example, you can retain an old brief while making only the approved brief available for the next answer. You do not have to delete the earlier file just to stop treating it as a current source.

The switch is part of [OGAD 0.0.51](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.51). It is a source-selection control, not an automatic version detector. You decide which document is current.

## Set up a small version check

Choose two short documents with an easy-to-check difference. Give them clear filenames, such as “Brief draft” and “Brief approved.” Use a fact you can verify directly, rather than asking the model to decide which file looks newer.

1. Open **Projects**, select the relevant project, and open **Knowledge & settings**.
2. In its document list, locate the outdated file by name.
3. Turn off that file's retrieval switch. Its state changes from **Enabled in retrieval** to **Disabled**.
4. Leave the current file enabled. Add it first if it is not already in the project, and allow indexing to finish.
5. Ask a specific question in the project's chat and inspect the cited source.

A useful first question is: “What delivery date does the approved brief specify? Cite the document.” Check the cited passage against the actual file.

## Disabling a source does not erase earlier chat

If the old version already appeared in a conversation, its text may remain in that history. Turning off the document does not rewrite previous replies or guarantee that no other source contains the same fact.

State the correction clearly when needed: “The earlier date is outdated; use the approved brief for this question.” Check other enabled documents for duplicated old material too.

You can begin a new conversation for a cleaner discussion, but do not treat that as proof of complete isolation from every project context source. Use the source citation and the original document to verify the answer.

## Re-enable only when the task needs it

For a comparison between drafts, turn both documents on and name them in the question. Ask the assistant to separate what each version says. After the comparison, turn the old document off again if future answers should use the current one.

Deleting a document is a separate action. Use the retrieval switch when your goal is to change the evidence available for answers while retaining the file in the project.

## If an answer still uses old information

Check which document the answer cites, whether indexing of the new file finished, and whether the question was sent in the correct project. Look for the old text in another enabled file or an earlier message.

The model can also answer incorrectly despite the right sources. Correct the prompt and inspect the passage rather than assuming the switch makes every answer true.


## Compare drafts without confusing the next answer

Use two short files for the first check. In “Brief draft,” put a sample delivery date of 12 October. In “Brief approved,” use 19 October and mark it as the approved source. 

Disable the draft's retrieval switch and ask for the date in the approved brief with a source reference. Open that source and verify 19 October. If the answer uses 12 October, inspect other enabled documents and earlier chat messages before changing more settings.

For a version-comparison task, enable both files and ask:

> Compare Brief draft and Brief approved. List each changed requirement in two columns and identify which file supports each value. Do not combine the two versions into one current specification.

Read the comparison against both originals. When the comparison is finished, disable the old draft again if later questions should use the approved version.

This gives you two useful workflows with the same retained files: comparison when both versions matter, and current-source retrieval when only the approved material should guide the answer. The switch makes that choice explicit; it does not replace your check of which document is actually approved.

## Give the next answer the right evidence

[Open a project in OGAD](https://getoffgridai.co/desktop/), disable one outdated source, and ask one question you can check. You keep the reference material while making your intended source choice clear.
