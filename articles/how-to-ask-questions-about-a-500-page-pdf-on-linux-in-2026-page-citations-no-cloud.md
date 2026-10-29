---
layout: content
title: "How to Ask Questions About a 500-Page PDF on Linux in 2026 (Page Citations, No Cloud)"
description: "Drop a long PDF into a chat on your Linux PC, ask about it, and get answers that cite the page. Click a page chip to open the PDF there."
date: "2026-10-30"
permalink: /articles/how-to-ask-questions-about-a-500-page-pdf-on-linux-in-2026-page-citations-no-cloud/
published_at: "2026-10-29T21:50:15Z"
article_topic: "Documents & research"
article_platform: "Linux"
devto_article: true
---
You have a 500-page spec, standard, contract or textbook as a PDF on your Linux machine. You want to ask "what does section 7 say about failover?" and get an answer you can check against the source. Off Grid AI Desktop reads the whole file on your computer, answers from it, and puts a small page chip such as **p. 212** next to each claim. Click the chip and the PDF opens at that page, beside the chat. The file stays on your machine, and there is no page limit and no file size cap.

## What you need

- A 64-bit x86 (x64) Linux PC with enough RAM for the chat model you pick. 16 GB is a comfortable start.
- Off Grid AI Desktop 0.0.55 or later, the current stable release. It ships as an **AppImage** and as an **amd64 `.deb`** for Ubuntu and other Debian-based distributions. [Download Off Grid AI Desktop for Linux](/desktop/).
- An NVIDIA graphics card helps but is not required. With one and a working NVIDIA driver, the app can run the chat model on the GPU with CUDA. Without one, it runs on the processor and system RAM.
- A chat model downloaded in the app. Any local text model works. A larger model writes better answers; the document part works the same with all of them.
- No account and no payment. Document chat is part of the free app.

Page citations arrived in 0.0.55. In older builds a long attachment could end the reply with "Context is full." That limit is gone.

## Step 1: Attach the PDF

1. Open a chat in Off Grid AI Desktop.
2. Click the **+** button at the left of the message box and choose **Attach files**. Your desktop's file picker opens. Select one PDF or several.
3. Or drag the files from your file manager, such as GNOME Files or Dolphin, onto the message box. It reads **Drop files to attach** while you hold them over it.

The app reads PDF, Word (`.docx`), plain text, Markdown, CSV and JSON files. Each file shows as a small pill in the message box. You can send your question straight away while the file is indexed.

## Step 2: Watch it read the file

As soon as a chat has a document, a button with a file icon and a number appears in the row under the message box. Its tooltip reads, for example, "1 document in this chat". Click it to open **Documents in this chat**. Each file has a status line:

- **Reading...** while the app pulls the text out of each page.
- **Reading scanned pages 12/40** when pages are images with no text layer, for example a scanned contract.
- **Indexing 45%** while it builds the search index.
- **512 pages** when it is ready.

On Linux, scanned pages are read with PaddleOCR, an open-source text recognizer that runs on your machine through ONNX Runtime. Its built-in models read English and Chinese. For a document in Hindi, Marathi or Nepali, the app downloads PaddleOCR's Devanagari model the first time it needs it, then reads offline from then on. You do not need to install Tesseract or any other OCR package.

If some pages cannot be read, the status line says so, for example "3 scanned pages not read". The app does not pretend those pages are in its answers.

## Step 3: Ask your question

Type the question the way you would ask a colleague who has read the document: "What are the termination clauses, and what notice does each one need?"

While the app prepares the answer, the work timeline above the reply shows each stage: "Opening 1 document...", "Searching 1 document...", "Ranking 24 passages...". Then the model writes.

How much of the document the model reads depends on your hardware. The app measures how fast your machine reads text into the model, and compares that with the model's context window. An NVIDIA GPU with CUDA reads text in much faster than a processor alone, so on a PC with one, more documents count as "fits".

- **A document that fits** is read whole, every page, on every question.
- **A document that does not fit**, such as a 500-page PDF on a smaller model, is read as a map of the whole document plus the passages that best match your question. The app finds them with a keyword index and a local embedding model (multilingual-e5-small), then re-ranks them with a second local model before the chat model sees them.

Both happen on every turn. A follow-up question searches the document again for that question, so it does not depend on what the previous answer happened to quote.

Narrow questions get the sharpest answers from a long file. "What notice period applies to termination for convenience?" beats "summarise the contract". For a question that spans the whole book, ask it chapter by chapter.

## Step 4: Check the answer against the page

Each claim drawn from the PDF ends with a chip that names the page, such as **p. 212**.

- **Hover** over a chip to see the file name and the passage it cites.
- **Click** a chip to open the PDF in the viewer beside the chat, at that page.

You do not have to trust the summary. You read page 212 yourself.

## Work with several documents in one chat

You can attach more files later in the same chat, for example last year's report next to this year's. Every answer reads every included document.

To leave a file out, open **Documents in this chat** and turn off its switch. The file name is struck through and the button shows a count such as **2/3**. Turn the switch back on to include it again. The eye icon next to each file opens it in the viewer.

Got a spreadsheet, a slide deck or an old `.doc` file? Export it to PDF first. In LibreOffice that is **File** > **Export as** > **Export as PDF**, then attach the PDF.

## Use a project for documents you ask about often

If you ask about the same set of files across many chats, such as a policy library, a set of RFCs or a course reader, put them in a project instead.

1. Open **Projects** and create a project.
2. Under **Knowledge base**, click **Add files** and pick the documents. Each file shows its progress while it is indexed.
3. Start chats inside the project.

Then choose how chats use them in **Settings** > **Text** > **Project knowledge**:

- **When needed** (the default) searches the knowledge base only when a question needs it, so other answers in the project stay fast.
- **Relevant passages** searches it for every question and adds the best matches.
- **Every answer** reads all of it each time.

## Where the document goes

The PDF stays on your machine. The text, the index and the page map are stored in the app's encrypted database. Nothing is uploaded. If you delete the chat, the app also deletes the documents no other chat uses.

## FAQ

**Can I chat with a PDF on Linux without uploading it?**
Yes. Off Grid AI Desktop reads the PDF on your machine with a local model. The file, its text and the answers stay on your computer.

**Is there a page or size limit for PDFs?**
No. The app reads the PDF page by page with no size cap. A document too large for the model is read as a map plus the passages that match each question.

**Does it work with scanned PDFs on Linux?**
Yes. Scanned pages are read on your machine with PaddleOCR, which reads English and Chinese out of the box and Hindi, Marathi and Nepali after a one-time model download. There is nothing extra to install, and pages it cannot read are listed as not read.

**Do I need an NVIDIA GPU?**
No. The app runs on the processor and system RAM without one. An NVIDIA GPU with CUDA reads text into the model faster, so long documents are more often read in full and answers arrive sooner.

**How do I know the answer is really in the PDF?**
Each claim carries a page chip such as **p. 212**. Hover to see the passage, or click to open the PDF at that page.

**Is it free?**
Yes. Document chat with page citations is part of the free app, with no account.

## Related

- [Download Off Grid AI Desktop](/desktop/)
- [How to Run Local AI on Linux in 2026 (No Cloud, No Account)](/articles/how-to-run-local-ai-on-linux-in-2026-no-cloud-no-account/)
- [How to Use Your NVIDIA GPU for Local AI on Linux in 2026](/articles/how-to-use-your-nvidia-gpu-for-local-ai-on-linux-in-2026/)
- [How to Search Chats, Meeting Notes, and Screen History Together in Off Grid AI on Linux in 2026](/articles/how-to-search-chats-meeting-notes-and-screen-history-together-in-off-grid-ai-on-linux-in-2026/)
