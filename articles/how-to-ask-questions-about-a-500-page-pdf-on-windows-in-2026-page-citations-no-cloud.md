---
layout: content
title: "How to Ask Questions About a 500-Page PDF on Windows in 2026 (Page Citations, No Cloud)"
description: "Drop a long PDF into a chat on your Windows PC, ask about it, and get answers that cite the page. Click a page chip to open the PDF there."
date: "2026-10-28"
permalink: /articles/how-to-ask-questions-about-a-500-page-pdf-on-windows-in-2026-page-citations-no-cloud/
published_at: "2026-10-27T22:20:34Z"
article_topic: "Documents & research"
article_platform: "Windows"
devto_article: true
devto_id: 4931118
devto_url: "https://dev.to/alichherawalla/how-to-ask-questions-about-a-500-page-pdf-on-windows-in-2026-page-citations-no-cloud-4991"
---
You have a 500-page contract, tender document or textbook as a PDF on your Windows PC. You want to ask "what does it say about penalties for late delivery?" and get an answer you can check against the source. Off Grid AI Desktop reads the whole file on your PC, answers from it, and puts a small page chip such as **p. 212** next to each claim. Click the chip and the PDF opens at that page, beside the chat. The file never leaves your PC, and there is no page limit and no file size cap.

## What you need

- A Windows PC with a 64-bit (x64) processor and enough RAM for the chat model you pick. 16 GB is a comfortable start.
- An NVIDIA graphics card helps but is not required. With one, the app runs the chat model on the GPU with CUDA. Without one, it runs on the processor and system RAM.
- Off Grid AI Desktop 0.0.55 or later, the current stable release. [Download Off Grid AI Desktop for Windows](/desktop/).
- A chat model downloaded in the app. Any local text model works. A larger model writes better answers; the document part works the same with all of them.
- No account and no payment. Document chat is part of the free app.

Page citations arrived in 0.0.55. In older builds a long attachment could end the reply with "Context is full." That limit is gone.

## Step 1: Attach the PDF

1. Open a chat in Off Grid AI Desktop.
2. Click the **+** button at the left of the message box and choose **Attach files**. The Windows file picker opens. Select one PDF or several.
3. Or drag the files from File Explorer onto the message box. It reads **Drop files to attach** while you hold them over it.

The app reads PDF, Word (`.docx`), plain text, Markdown, CSV and JSON files. Each file shows as a small pill in the message box. You can send your question straight away while the file is indexed.

## Step 2: Watch it read the file

As soon as a chat has a document, a button with a file icon and a number appears in the row under the message box. Its tooltip reads, for example, "1 document in this chat". Click it to open **Documents in this chat**. Each file has a status line:

- **Reading...** while the app pulls the text out of each page.
- **Reading scanned pages 12/40** when pages are images with no text layer, for example a scanned contract.
- **Indexing 45%** while it builds the search index.
- **512 pages** when it is ready.

On Windows, scanned pages are read with PaddleOCR, an open-source text recognizer that runs on your PC. Its built-in models read English and Chinese. For a document in Hindi, Marathi or Nepali, the app downloads PaddleOCR's Devanagari model the first time it needs it, then reads offline from then on.

If some pages cannot be read, the status line says so, for example "3 scanned pages not read". The app does not pretend those pages are in its answers.

## Step 3: Ask your question

Type the question the way you would ask a colleague who has read the document: "What are the termination clauses, and what notice does each one need?"

While the app prepares the answer, the work timeline above the reply shows each stage: "Opening 1 document...", "Searching 1 document...", "Ranking 24 passages...". Then the model writes.

How much of the document the model reads depends on your PC. The app measures how fast your PC reads text into the model, and compares that with the model's context window. An NVIDIA GPU reads text in much faster than a processor alone, so on a PC with one, more documents count as "fits".

- **A document that fits** is read whole, every page, on every question.
- **A document that does not fit**, such as a 500-page PDF on a smaller model, is read as a map of the whole document plus the passages that best match your question. The app finds them with a keyword index and a local embedding model (multilingual-e5-small), then re-ranks them with a second local model before the chat model sees them.

Both happen on every turn. A follow-up question searches the document again for that question, so it does not depend on what the previous answer happened to quote.

## Step 4: Check the answer against the page

Each claim drawn from the PDF ends with a chip that names the page, such as **p. 212**.

- **Hover** over a chip to see the file name and the passage it cites.
- **Click** a chip to open the PDF in the viewer beside the chat, at that page.

You do not have to trust the summary. You read page 212 yourself.

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

- It does not read Excel, PowerPoint, old `.doc` files or ebooks yet. Save them as PDF first. In Word, Excel and PowerPoint that is **File** > **Save As** > **PDF**.
- It does not make a small model smart. A 1B model can find page 212, but its answer will be weaker than a 9B model's. Pick the largest model your GPU or RAM runs well.
- On a 500-page file that does not fit the model, the answer comes from the best-matching passages, not every page. A question like "list every date in the document" can miss some. Ask narrower questions, or split the work by chapter.
- Scanned pages in scripts other than English, Chinese and Devanagari are not read well on Windows. Poor scans and handwriting are reported as not read rather than guessed.

## Where the document goes

The PDF stays on your PC. The text, the index and the page map are stored in the app's encrypted database. Nothing is uploaded. If you delete the chat, the app also deletes the documents no other chat uses.

## FAQ

**Can I chat with a PDF on Windows without uploading it?**
Yes. Off Grid AI Desktop reads the PDF on your PC with a local model. The file, its text and the answers stay on your PC.

**Is there a page or size limit for PDFs?**
No. The app reads the PDF page by page with no size cap. A document too large for the model is read as a map plus the passages that match each question.

**Does it work with scanned PDFs on Windows?**
Yes. Scanned pages are read on your PC with PaddleOCR, which reads English and Chinese out of the box and Hindi, Marathi and Nepali after a one-time model download. Pages it cannot read are listed as not read.

**Do I need an NVIDIA GPU?**
No. The app runs on the processor and system RAM without one. An NVIDIA GPU with CUDA reads text into the model faster, so long documents are more often read in full and answers arrive sooner.

**How do I know the answer is really in the PDF?**
Each claim carries a page chip such as **p. 212**. Hover to see the passage, or click to open the PDF at that page.

**Is it free?**
Yes. Document chat with page citations is part of the free app, with no account.

## Related

- [Download Off Grid AI Desktop](/desktop/)
- [How to Summarise Long Documents on Windows in 2026 Without Cloud AI](/articles/how-to-summarise-long-documents-on-windows-in-2026-without-cloud-ai/)
- [How to Run LLMs Locally on Your Windows PC in 2026 (Completely Offline, No Subscription)](/articles/how-to-run-llms-locally-on-your-windows-pc-in-2026-completely-offline-no-subscription/)
- [How to Use Your NVIDIA GPU for Local AI on Windows in 2026](/articles/how-to-use-your-nvidia-gpu-for-local-ai-on-windows-in-2026/)
