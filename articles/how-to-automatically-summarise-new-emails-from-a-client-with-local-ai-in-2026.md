---
layout: content
title: "How to Automatically Summarise New Emails From a Client With Local AI in 2026"
description: "Create an email-triggered routine in Off Grid AI. Get a short client update with requests, dates and open questions, while keeping inference local."
date: "2026-10-13"
permalink: /articles/how-to-automatically-summarise-new-emails-from-a-client-with-local-ai-in-2026/
published_at: "2026-10-13T08:07:09Z"
article_topic: "Work & organization"
article_platform: "Computer"
devto_article: true
devto_id: 4842758
devto_url: "https://dev.to/alichherawalla/how-to-automatically-summarise-new-emails-from-a-client-with-local-ai-in-2026-1gk6"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto/https%3A%2F%2Fgetoffgridai.co%2Fassets%2Fimg%2Fhome%2Fapp%2Fgod-routines-light-1760.webp"
---
OGAD (Off Grid AI Desktop) Pro can run an assistant routine when it detects a matching new email. You can ask it to identify a client's request, deadline, and next decision, then read the result in **God**. With a local text model selected, the summary is produced on your computer.

This works after you connect an email account and enable the routine. The computer must remain available. Email checks need internet, and the trigger checks periodically rather than reacting instantly to every delivery.

[Download OGAD](https://getoffgridai.co/desktop/) | [Read the beta 122 release notes](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.55-beta.122)

![Scheduled tasks in God settings, with example routines and controls to run, edit or disable them.](https://getoffgridai.co/assets/img/home/app/god-routines-light-1760.webp)

---

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@getoffgridai.co](mailto:support@getoffgridai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-494gbuv5c-kj9tT7U0AS8Kq8UUO63_jw), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

## What should the summary help you decide?

Suppose a client sends a design review update while you are working on another project. You want to know what changed and whether you must respond today. A useful summary names the requested change, the stated date, and any detail the client still needs to provide.

It should not turn “Could we review this Friday?” into “The final delivery is Friday.” Those statements mean different things. It should also separate the sender's request from a next step proposed by the model.

Use a small format first: three facts, one open question, and a suggested next action. You can open the original message for the full context. The routine reduces the work needed to find the important points; it does not replace the email as the source.

## Connect the account and check a manual request

Use the current desktop beta with Pro enabled. In **Integrations**, connect the Google or Microsoft account that receives the client's messages. Complete the account's permission flow. If the connection asks for your own application details, finish that setup before you create the routine.

Select a downloaded local text model with tool support. In God, ask it to find a recent message from the client and identify its subject and date. This checks the account connection and the model's ability to use it.

Do not assume all attachments or the full conversation are available from an email preview. Ask the assistant to say when it needs more text. If a deadline exists only in an attachment it has not read, the summary must leave that deadline unconfirmed.

## Add the email routine

1. Open **God**, then its settings.
2. Expand **Scheduled tasks** and select **Add a scheduled task**.
3. Give it a clear **Name**, such as “Client review updates”.
4. In **What to do**, enter the instructions below, with your client's real address.
5. In **When**, select **When an email arrives**.
6. In **From (optional)**, enter the client's full email address.
7. Save the routine and confirm that it is enabled.

Example instructions:

> Read the new email that triggered this routine. Check that the sender is client@example.com. Summarise the request in three bullets. Include any date exactly as stated, one open question, and a suggested next action. Identify the account, sender, subject, and message time so I can find the original. If the available text is incomplete, say what you could not read. Do not send a reply or change any account data.

Replace the example address before saving. The **From** field is a text filter on the event details, not an exact sender-identity rule. Including the full address reduces broad matches. Keeping a sender check in the task instructions also makes the expected scope clear.

## Check both the task and the trigger

Use **Run now** to check whether the instructions produce a useful answer. This checks the task. It does not prove that a later email will trigger it.

For the trigger, leave the enabled routine and connected account available. Then check the result after a new matching message arrives. OGAD checks for new mail about every five minutes while an email routine is enabled. Allow for the account request and model response as well.

The first successful mail check establishes a starting point. Existing inbox messages are not all treated as newly arrived mail. If you need a summary of earlier messages, ask for that separately with a date range.

The current check reads a recent, limited set of messages from each account. It is not a guaranteed record of every message in a busy inbox. Use your normal email notifications for deadlines that cannot wait.

## Turn the result into useful work

After you read the summary, open the original email and confirm the request. Then ask God to prepare a reply for your review, or compare the request with relevant saved project notes.

For example:

> Draft a reply that confirms the two agreed changes and asks whether Friday is the review date or the delivery date. Keep the draft here for me to check.

A connected email reader does not automatically supply a send-mail tool. Sending through another enabled tool or a browser task is a separate action with its own access and approval requirements. A routine that prepares a draft is useful without automatic sending.

## Fix common problems

| Problem | Check |
|---|---|
| No new result | Routine enabled, computer awake, OGAD running, account connected |
| An old message did not trigger | The initial check establishes a baseline; ask for older mail directly |
| Too many messages match | Use a more specific address or text filter and inspect the sender |
| Summary misses a detail | Check whether the full text or attachment was available |
| Task runs but cannot read mail | Check account permissions and the selected model's tool support |

Keep the routine narrow until it reliably produces the kind of brief you need. Edit the instructions when the output is too long or blends facts with guesses. Disable it when the project ends.

This guide is based on beta 122's routine and account implementation. Start with one client and verify one new-message result in [OGAD](https://getoffgridai.co/desktop/) before you add more email rules.
