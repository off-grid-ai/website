---
layout: content
title: "How to Ask Questions About a 500-Page PDF on Your Mac in 2026 (Page Citations, No Cloud)"
description: "Drop a long PDF into a chat on your Mac, ask about it, and get answers that cite the page. Click a page chip to open the PDF there."
date: "2026-10-25"
permalink: /articles/how-to-ask-questions-about-a-500-page-pdf-on-your-mac-in-2026-page-citations-no-cloud/
published_at: "2026-10-25T09:30:00Z"
article_topic: "Documents & research"
article_platform: "Mac"
devto_article: true
---
You have a 500-page contract, annual report or textbook as a PDF on your Mac. You want to ask "what does it say about termination?" and get an answer you can check, not a guess. Off Grid AI Desktop reads the whole file on your Mac, answers from it, and puts a small page chip such as **p. 212** next to each claim. Click the chip and the PDF opens at that page. The file never leaves your Mac, and there is no page limit and no file size cap.

## What you need

- A Mac with Apple silicon (M1 or later) and macOS 13 or later. The Mac download is built for Apple silicon only.
- Off Grid AI Desktop 0.0.55 or later, the current stable release. [Download Off Grid AI Desktop for Mac](/desktop/).
- A chat model downloaded in the app. Any local text model works. A larger model writes better answers; the documents part works the same with all of them.
- No account and no payment. Document chat is part of the free app.

Page citations arrived in 0.0.55. If you used an older build, the old limits are gone: a long attachment no longer ends the reply with "Context is full.", and follow-up questions no longer lose the document.

## Step 1: Attach the PDF

1. Open a chat in Off Grid AI Desktop.
2. Click the **+** button at the left of the message box and choose **Attach files**. A Finder window opens. Select one PDF or several.
3. Or drag the files from Finder onto the message box. It reads **Drop files to attach** while you hold them over it.

The app reads PDF, Word (`.docx`), plain text, Markdown, CSV and JSON files. Each file shows as a small pill in the message box. You can type and send your question straight away. The pill stays usable while the app reads and indexes the file in the background.

## Step 2: Watch it read the file

As soon as a chat has a document, a button with a file icon and a number appears in the row under the message box. Its tooltip reads, for example, "1 document in this chat". Click it to open **Documents in this chat**. Each file has a status line:

- **Reading...** while the app pulls the text out of each page.
- **Reading scanned pages 12/40** when pages are images with no text layer, for example a scanned contract.
- **Indexing 45%** while it builds the search index.
- **512 pages** when it is ready.

On a Mac, scanned pages are read with Apple Vision, the text recognition built into macOS. Off Grid AI's own measurement puts it at about 0.2 to 0.5 seconds a page, and it reads Latin and Chinese, Japanese and Korean text. For a document in Hindi, Marathi or Nepali, the app uses PaddleOCR instead and downloads its Devanagari model the first time it needs it.

If some pages cannot be read, the status line says so, for example "3 scanned pages not read". The app does not pretend those pages are in its answers.

## Step 3: Ask your question

Type the question the way you would ask a colleague who read the document: "What are the termination clauses, and what notice does each one need?"

While the app prepares the answer, the work timeline above the reply shows what it is doing: "Opening 1 document...", "Searching 1 document...", "Ranking 24 passages...". Then the model writes.

How much of the document the model reads depends on your Mac. The app measures how fast your Mac reads text into the model, and compares that with the model's context window.

- **A document that fits** is read whole, every page, on every question.
- **A document that does not fit**, such as a 500-page PDF on a smaller model, is read as a map of the whole document plus the passages that best match your question. The app finds them with a keyword index and a local embedding model (multilingual-e5-small), then re-ranks them with a second local model before the chat model sees them.

Both happen on every turn. A follow-up question searches the document again for that question, so it does not depend on what the previous answer happened to quote.

## Step 4: Check the answer against the page

Each claim drawn from the PDF ends with a green chip that names the page, such as **p. 212**.

- **Hover** over a chip to see the file name and the passage it cites.
- **Click** a chip to open the PDF in the viewer beside the chat, at that page. Use **Fit to screen** in the viewer if the page is too wide for the panel.

This is the part that makes a long document usable. You do not have to trust the summary. You read the sentence on page 212 yourself.

## Work with several documents in one chat

You can attach more files later in the same chat, for example last year's report next to this year's. Every answer reads every included document.

To leave a file out, open **Documents in this chat** and turn off its switch. The file name is struck through and the button shows a count such as **2/3**. Turn the switch back on to include it again. The eye icon next to each file opens it in the viewer.

## Use a project for documents you ask about often

If you ask about the same set of files across many chats, such as a policy library or a course reader, put them in a project instead.

1. Open **Projects** and create a project.
2. Under **Knowledge base**, click **Add files** and pick the documents. Each file shows its progress while it is indexed.
3. Start chats inside the project.

Then choose how chats use them in **Settings** > **Text** > **Project knowledge**:

- **When needed** (the default) searches the knowledge base only when a question needs it, so other answers in the project stay fast.
- **Relevant passages** searches it for every question and adds the best matches.
- **Every answer** reads all of it each time.

## What this does not do

- It does not read Excel, PowerPoint, Pages, Keynote, Numbers, old `.doc` files or ebooks yet. Export them to PDF first.
- It does not make a small model smart. A 1B model can find page 212, but its answer will be weaker than a 9B model's. Pick the largest model your Mac runs well.
- On a 500-page file that does not fit the model, the answer comes from the best-matching passages, not every page. A question like "list every date in the document" can miss some. Ask narrower questions, or split the work by chapter.
- Pages Apple Vision cannot read, such as poor scans or handwriting, are reported as not read rather than guessed.

## Where the document goes

The PDF stays on your Mac. The text, the index and the page map are stored in the app's encrypted database. Nothing is uploaded. If you back up the app, the backup includes the document text. If you delete the chat, the app also deletes the documents no other chat uses.

## FAQ

**Can I chat with a PDF on my Mac without uploading it?**
Yes. Off Grid AI Desktop reads the PDF on your Mac with a local model. The file, its text and the answers stay on your Mac.

**Is there a page or size limit for PDFs?**
No. The app reads the PDF page by page with no size cap. A document too large for the model is read as a map plus the passages that match each question.

**Does it work with scanned PDFs on a Mac?**
Yes. Scanned pages are read with Apple Vision, the text recognition built into macOS. Pages it cannot read are listed as not read.

**How do I know the answer is really in the PDF?**
Each claim carries a page chip such as **p. 212**. Hover to see the passage, or click to open the PDF at that page.

**Does it work offline?**
Yes, once you have downloaded a chat model. Reading the PDF, searching it and writing the answer all run on your Mac.

**Is it free?**
Yes. Document chat with page citations is part of the free Off Grid AI Desktop app, with no account.

## Related

- [Download Off Grid AI Desktop](/desktop/)
- [How to Summarise Long Documents on Your Mac in 2026 Without Uploading Them](/articles/how-to-summarise-long-documents-on-your-mac-in-2026-without-uploading-them/)
- [How to Run LLMs Locally on Your Mac in 2026 (Completely Offline, No Subscription)](/articles/how-to-run-llms-locally-on-your-mac-in-2026-completely-offline-no-subscription/)
- [How to Compare Local AI Models Side by Side on Your Mac in 2026 (One Question, Up to Six Models)](/articles/how-to-compare-local-ai-models-side-by-side-on-your-mac-in-2026-one-question-up-to-six-models/)
