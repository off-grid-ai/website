---
layout: content
title: "How to Compare a Client Email With Your Obsidian Project Notes Using Local AI in 2026"
description: "Compare a client email with local Obsidian project notes using source quotes, dates, and an explicit list of unresolved differences."
date: "2026-10-13"
permalink: /articles/how-to-compare-a-client-email-with-your-obsidian-project-notes-using-local-ai-in-2026/
published_at: "2026-10-13T09:33:45Z"
article_topic: "Documents & research"
article_platform: "Computer"
devto_article: true
devto_id: 4843357
devto_url: "https://dev.to/alichherawalla/how-to-compare-a-client-email-with-your-obsidian-project-notes-using-local-ai-in-2026-6a"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fraw.githubusercontent.com%2Foff-grid-ai%2FOGAD%2Fv0.0.55-beta.122%2Fdocs%2Fpr-screenshots%2F2026-10-06%2Fobsidian-two-vaults.png"
---
A client email may ask for something that differs from your project notes. OGAD (Off Grid AI Desktop) can help compare the message with local Obsidian Markdown through connected tools and a local model.

Read both sources before asking for a conclusion. Outlook can provide a selected message as text; Gmail search provides snippets and links, so you may need to open the full Gmail message yourself. A preview is not enough to establish every condition in a client request.

[Download OGAD](https://getoffgridai.co/desktop/) | [Desktop beta 122 release notes](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.55-beta.122)

![Off Grid AI Desktop Integrations with two local Obsidian vault connections](https://raw.githubusercontent.com/off-grid-ai/OGAD/v0.0.55-beta.122/docs/pr-screenshots/2026-10-06/obsidian-two-vaults.png)

---

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@getoffgridai.co](mailto:support@getoffgridai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-494gbuv5c-kj9tT7U0AS8Kq8UUO63_jw), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

## Name the question you need to resolve

Choose one issue: delivery date, scope, owner, budget wording, or acceptance criteria. A narrow question is easier to verify than “Do these sources agree?” across an entire project.

For example, suppose your notes say the review is on Friday, while the client asks whether Monday is possible. The useful answer is not simply “the date changed.” You need to know whether the email proposes a change or confirms one.

Ask the comparison to preserve those distinctions. A proposal, a request, and an agreed decision can use similar words while having different effects on the work.

## Connect the email account and Obsidian vault

Install [OGAD](https://getoffgridai.co/desktop/) and use the Pro **Integrations** workflow. Connect the relevant Google or Microsoft account and give it a clear label.

For Obsidian, choose **Choose vault** and select the local folder containing the project notes. Use **Add vault** if you need another vault. Check that the Markdown files are fully available on disk and that you selected the correct folder.

The Obsidian tools read local notes. They do not require an Obsidian cloud API, but they cannot read a file that is only an unavailable cloud placeholder. Live email still requires its provider connection and internet.

## Retrieve the exact sources

Ask for the relevant message by sender, subject, and date. Inspect the result and read the full Outlook message when available. For Gmail, open the message link if the snippet omits the wording you need; provide the relevant text through a supported local input route if necessary.

Then find the matching project note by vault, filename, and topic. Read that note before asking for a comparison. A search hit or file title does not prove that the model saw its contents.

Record the message date and the note's stated decision date where present. File modification time can be useful context, but it is not necessarily the date on which a project decision was approved.

## Ask for a side-by-side evidence table

Use a prompt like:

> Compare the client's 12 October email with Cedar/Project brief.md on the delivery date and review process. Show a short quote from each source, the source date, and the exact difference. Classify each difference as compatible detail, proposed change, direct conflict, or insufficient evidence. Do not decide which source is authoritative unless the sources establish that.

A useful table keeps the two statements visible. It lets you see whether the model found a real disagreement or simply different levels of detail.

Ask for missing information explicitly. If the note does not name an owner, the comparison should say “not specified,” not assign the sender of the email by default.

## Check whether a later source resolves the difference

Search for a reply or updated note that accepts, rejects, or clarifies the proposed change. A newer date alone does not establish authority. Look for the actual decision and the person or process that made it.

If you find a resolution, add it as a third source. Keep the original difference in the record so you can explain why the current interpretation changed.

If no resolution is found, turn the gap into a focused question. For example: “Should we keep Friday's review, or has Monday been agreed?” That is more useful than drafting a response that assumes the answer.

## Draft the reply without changing the notes

Ask for a short draft that repeats the verified facts and asks only the unresolved question. State “draft only” if you do not want a sending action.

The direct account and Obsidian reading tools described here do not automatically edit the original note or send the email. A proposed note revision in chat is still a draft. Review and apply it through your normal workflow if you choose.

Keep the source filename and message link with your working comparison. That makes the next review easier when another email arrives.

## Fix unreliable comparisons

| Symptom | Next check |
| --- | --- |
| The email summary seems incomplete | Full message versus search snippet |
| Wrong project note is compared | Vault label, filename, and read result |
| Every difference is called a conflict | Require the four comparison categories |
| A proposed date is treated as agreed | Look for acceptance evidence |
| The model invents an owner | Require a supporting quote or “not specified” |

Local models can process the retrieved material on your computer. A remote model configuration changes that processing boundary. Disconnecting a source does not remove excerpts already retained in a conversation.

## Resolve one difference with evidence

[Connect your sources in OGAD](https://getoffgridai.co/desktop/) and compare one client message with one project note. Verify the quoted passages, find any later decision, and use the result to ask a precise question or make a checked update.
