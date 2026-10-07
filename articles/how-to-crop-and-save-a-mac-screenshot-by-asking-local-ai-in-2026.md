---
layout: content
title: "How to Crop and Save a Mac Screenshot by Asking Local AI in 2026"
description: "Describe a screenshot crop and save a separate edited copy with local AI on Mac."
date: "2026-09-29"
permalink: /articles/how-to-crop-and-save-a-mac-screenshot-by-asking-local-ai-in-2026/
published_at: "2026-09-29T10:27:16.536Z"
article_topic: "Images & vision"
article_platform: "Mac"
devto_article: true
devto_id: 4770624
devto_url: "https://dev.to/alichherawalla/how-to-crop-and-save-a-mac-screenshot-by-asking-local-ai-in-2026-261m"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2Fx64xnnkc3f8w2wxvrbxh.png"
---
You need a clean screenshot for a guide or message, but the original has too much around the useful area. OGAD (Off Grid AI Desktop) Pro can open the image in Preview, apply a described crop through **Computer Use**, and save an edited copy. Local task models can handle the screen work without a cloud image-editing service.

[Get OGAD](https://getoffgridai.co/desktop/) | [Desktop releases](https://github.com/off-grid-ai/OGAD/releases)

![OGAD chat interface](https://getoffgridai.co/assets/img/desktop-chat.png)

---

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@offgridmobileai.co](mailto:support@offgridmobileai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

The important parts of the brief are the exact source file, what must remain visible, and where the new copy should go. A clear path is safer than asking it to guess which screenshot you meant.

## Prepare one crop

Select local text and Computer Use models in OGAD. Set the downloaded specialist under **Settings > Computer use**, and grant macOS Accessibility and Screen Recording permissions through **Settings > Setup & health** when needed.

Then open **Assistant > Edit a screenshot** and fill the form:

- **Source screenshot:** the full path to the image.
- **Crop and edit instructions:** the area to keep, such as “Keep the full settings dialog and remove the desktop around it.”
- **Save result:** a new filename beside the source.
- **Editing app:** Preview.
- **Source file rule:** **Preserve the source**.

Choose a sample without private information for the first attempt.

## Run and check the saved copy

Select **Start in chat**. Review the Computer Use request before it changes the file, then watch the task. The flow tells the assistant to preserve the original unless you approve overwriting it.

When it reports completion, open the new file yourself. Check that the important text is intact, the crop is correct, and the filename differs from the source. A result message alone does not prove the correct image was saved.

If it selects the wrong source, stop and give the exact path. If the crop is wrong, use the preserved original for another attempt rather than repeatedly cropping the already edited copy.

## Describe the crop in terms of what must survive

“Make it cleaner” leaves too many choices to the model. Name the part of the screen the reader needs and the context that must stay around it.

For a guide screenshot, a useful brief could be:

> Keep the entire settings dialog, including its title and Save button. Remove the unrelated desktop around it. Do not cut through any label. Save a new PNG beside the original with the suffix -cropped. Preserve the source.

Use a real source path in the form.

If you need exact dimensions, include them and inspect the exported image. A visual task can fail to select the exact boundary even when the result looks close. Keep the original so you can repeat the operation without losing more of the image.

## Check the image for the person who will read it

Open the new file at the size it will be used. If it is going into a chat message, check whether the important labels are readable without zooming. If it is for a step-by-step guide, preserve enough context for the reader to recognize the same control in the app.

Compare it with the original:

| Check | Why it matters |
|---|---|
| The intended dialog is complete | A missing title or footer can remove useful context |
| No required text is cut off | A clean-looking edge can still clip a label |
| The new file opens correctly | A completion message is not the output file |
| The original remains | You can recover from the wrong crop |

Review visible account names, notifications, and other private content separately before sharing. A crop does not automatically detect or redact sensitive information. If something private remains inside the desired area, decide how to remove it before publishing the image.

## Make the next correction specific

If the first crop removed a button, say which edge needs more space. If it left too much desktop, name the extra region. Start again from the preserved original when the needed content is already gone from the edited version.

This is a useful first computer-use task because the final result is tangible: one separate file whose framing you can check. Keep the task that small before combining crop, annotation, export, and several destination folders in one request.

## What can stay offline?

After models and the app are installed, a local file in Preview can be processed with local models without a cloud AI service. A cloud-synced source folder or remote model has separate network behavior.

This flow operates an image app. It is not a promise of automatic sensitive-data removal. Review every image before sharing it.

[Try OGAD](https://getoffgridai.co/desktop/) with one screenshot, one crop instruction, and a new output filename. Check the saved copy, then use the same brief shape for your next image.
