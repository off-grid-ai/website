---
layout: default
title: "How to Automatically Track Tasks You Assign to Others in Work Chats in Off Grid AI on Mac in 2026"
description: "Keep a private waiting-on list from captured work chats, then check the person, deadline and source before following up."
date: "2026-09-29"
permalink: /articles/how-to-automatically-track-tasks-you-assign-to-others-in-work-chats-in-off-grid-ai-on-mac-in-2026/
published_at: "2026-09-29T11:34:35.677Z"
article_topic: "Automation & tools"
article_platform: "Mac"
devto_article: true
devto_id: 4771119
devto_url: "https://dev.to/alichherawalla/how-to-automatically-track-tasks-you-assign-to-others-in-work-chats-in-off-grid-ai-on-mac-in-2026-1d8m"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2F5xygrkvjxvs7nhnzdq6c.png"
---
You asked a colleague for a file, another for a review, and a third for a date. Your own to-do list does not tell you which of those replies you still need.

OGAD (Off Grid AI Desktop) Pro can identify requests you made to other people in captured work chats and put them in a **waiting on** view. With capture enabled and local models ready, it builds a private starting list for your next follow-up.

[Download OGAD for Mac](https://getoffgridai.co/desktop/) | [Beta 0.0.52-beta.103](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.52-beta.103)

![OGAD desktop chat interface](https://getoffgridai.co/assets/img/desktop-chat.png)

---

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@offgridmobileai.co](mailto:support@offgridmobileai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

## What does automatic tracking mean here?

OGAD looks for a concrete request you assigned to someone else. It can attach that person's name to the task and keep it separate from your own commitments.

It does not monitor the other person's computer or independently confirm their progress. It does not send reminders to them. You check the source, follow up through your usual app, and update the list when you know the result.

For example, “Maya, please send the revised deck by Friday” has an owner and a deliverable. “We should improve the deck sometime” is a discussion, not a clear assignment.

## Build a list from the work you already see

This guide uses Mac Pro in the linked beta. Prepare a local text model and local capture analysis, then enable the required permissions in **Settings → Setup & health → System permissions**. In **Replay** or **Capture** settings, choose **Resume capture** and confirm **Capturing**.

Capture only the work sessions you intend to retain. New visible communication can trigger background extraction. Older messages outside captured activity, missed frames and unclear wording can leave gaps.

After a normal chat session, open **Actions → To do → waiting on**. Check the task text and the **waiting on** name. Open the task's source detail to inspect the app, time and summary behind it.

## Turn the list into a useful follow-up

Before contacting someone, check three things:

| Check | Why it matters |
|---|---|
| The person | The model may have linked the wrong name in a crowded thread |
| The deliverable | A discussion is not always an assignment |
| The current conversation | A reply or completed file may have arrived since capture |

Use a person or project label on the task to narrow the list. This helps you review related requests together rather than sending several disconnected follow-ups.

A useful message might be: “Do you have the revised deck, or is Friday still the expected date?” Write and send it yourself in the original conversation. The list supplies context; you decide whether contact is needed.

## Close the loop yourself

Once you confirm delivery, mark the task done. Dismiss a suggestion that was never a real request. Check **done** or **dismissed** if you need to find a previous item again.

An unchanged waiting-on card is not evidence that someone is late. It may simply mean that you have not updated your private list. Avoid treating inferred tasks as a shared team record.

Select local models to keep the extraction local. Your work-chat app still has its own network and storage behavior, and downloading models or setting up Pro can require internet.


## Review a set of requests before a client call

Suppose you asked Maya for a revised deck and Ben for an estimate. Before the next project call, open waiting on and use the project's label to gather those related requests. Inspect the source for each item, then check the current conversation for a reply.

If Maya has already sent the file, mark that item done. If Ben has not replied, confirm whether a date was actually agreed before writing a follow-up. A message that asks for an estimate is not proof that Ben committed to a particular delivery time.

You now have a short agenda: review the received deck and ask about the estimate. That is more useful than sending a generic “any update?” message to everyone on the project.

## Keep follow-ups tied to the original request

A useful follow-up names the deliverable and leaves room for changed circumstances:

> We are reviewing the proposal tomorrow. Is the estimate ready, or should we plan around a later date?

Write and send that message in your normal work app after checking the source. The waiting-on list does not make that external action for you, and it does not know about a completion that happened outside its retained context.

If the wrong person is linked to a task, do not use the label as proof of ownership. Check the source and correct your working list before contacting someone. If no waiting-on item appears, inspect whether the request was visible during capture and whether the wording clearly assigned a next step. You can still follow up from the original message without waiting for automatic extraction.

[Download OGAD for Mac](https://getoffgridai.co/desktop/) and review one set of requests in **waiting on**. Keep the useful items, check the source, and use the list to make your next follow-up specific.
