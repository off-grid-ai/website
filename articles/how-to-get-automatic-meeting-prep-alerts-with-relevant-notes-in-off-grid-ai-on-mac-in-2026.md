---
layout: content
title: "How to Get Automatic Meeting Preparation From Your Calendar and Saved Work in 2026"
description: "Prepare a sourced meeting brief automatically when a calendar meeting approaches, using connected accounts and retained work context."
date: "2026-09-29"
permalink: /articles/how-to-get-automatic-meeting-prep-alerts-with-relevant-notes-in-off-grid-ai-on-mac-in-2026/
published_at: "2026-09-29T12:02:32.153Z"
article_topic: "Automation & tools"
article_platform: "Mac"
devto_article: true
devto_id: 4771264
devto_url: "https://dev.to/alichherawalla/how-to-get-automatic-meeting-prep-alerts-with-relevant-notes-in-off-grid-ai-on-mac-in-2026-d1b"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2Fh5h0qrj7m9idoz7zx6l6.png"
last_modified_at: "2026-10-13"
---
A calendar reminder tells you when a meeting starts. It rarely tells you what you promised last time. OGAD (Off Grid AI Desktop) can prepare a meeting brief in God from the approaching event and the saved work or connected sources you make available.

Set up a Pro routine for **When a meeting is about to start**. The released trigger checks the next meeting as it approaches within about 15 minutes. Keep the computer awake, OGAD running, and the required account connections available.

[Download OGAD](https://getoffgridai.co/desktop/) | [Desktop beta 122 release notes](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.55-beta.122)

![Off Grid AI Desktop God showing a sample meeting brief with source references and pending approval cards](https://getoffgridai.co/assets/img/home/app/god-prep-light-1760.webp)

---

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@getoffgridai.co](mailto:support@getoffgridai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-494gbuv5c-kj9tT7U0AS8Kq8UUO63_jw), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

## What should the brief answer?

Ask for the meeting purpose, the last relevant decision, open commitments, and the questions you need to resolve. Keep each claim tied to a source. A short brief is useful when it helps you decide what to bring and what to ask.

For a client review, separate three things: what the client requested, what your team agreed to do, and what has evidence of completion. A request in an email is not the same as an accepted commitment, and a task mentioned in notes is not necessarily finished.

The brief should say when it cannot find previous context. A meeting title alone is not enough to invent a history with its attendees.

## Connect the calendar and relevant work

Install [OGAD](https://getoffgridai.co/desktop/), open God with Pro, and select a suitable local tool-capable model. Connect the calendar account you actually use for the meeting.

Check the event manually first. Confirm its title, start time, and attendees. Google calendar reads in this release use the connected account's primary calendar. Do not assume that a secondary calendar is included. For Outlook, check the intended connected calendar explicitly.

Enable the retained work context you want to use, or connect relevant notes and accounts. Capture is opt-in and cannot recover uncaptured past meetings. Live calendar and email reads need internet even when the summary model is local.

## Write a preparation prompt

Use a specific instruction in **What to do**:

> Prepare a brief for the approaching meeting. Give its title, start time, and attendees from the event. Find the latest relevant notes and messages. List prior decisions, open commitments, and three questions to resolve. Include source names and dates. Distinguish requests from agreed actions. If no prior evidence is found, say so. Draft only; do not send messages or change the calendar.

If you work with several clients, add the project name or account label. A common meeting title such as “Weekly check-in” needs more context than a unique project review.

Ask for a short brief rather than a complete transcript of every related source. You need a reading aid before the meeting, with links back to details when necessary.

## Enable the meeting trigger

1. Open God settings and **Scheduled tasks**.
2. Choose **Add a scheduled task**.
3. Give it a name such as “Client meeting prep.”
4. Enter the preparation prompt in **What to do**.
5. Under **When**, select **When a meeting is about to start**.
6. Add match text if you want to narrow the meeting titles, then choose **Add**.

Keep the routine enabled. The match is a text filter, not a guaranteed identity match for a client. Check which titles it selects, especially if several projects use similar words.

The trigger works from the meeting information available to God. It is not a guarantee that every overlapping event across every calendar will produce a separate brief.

## Test the content before the next meeting

Use **Run now** to test the instruction with the current available context, or ask the same preparation question for a known meeting. Inspect the sources and correct the scope before relying on an automatic run.

Check one prior decision and one open commitment. Look for later evidence that changes either. A note from last month may have been superseded by a message yesterday.

If the next meeting is too far away for the event trigger, test the prompt manually and then check the actual scheduled behavior when a suitable event approaches. A manual result alone does not demonstrate that the future trigger fired.

## Handle missing or late briefs

| Symptom | What to inspect |
| --- | --- |
| No meeting detected | Calendar connection, calendar scope, and start time |
| Wrong meeting selected | Event title and match text |
| Brief arrives late | Computer availability and model job queue |
| Brief lacks prior decisions | Retained notes, capture coverage, and source access |
| Old information appears | Source dates and later updates |

Allow time for local model work. The scheduler checks periodically, and another running task can delay processing. If you need more preparation time, add a separate earlier calendar review routine instead of assuming the near-meeting trigger runs hours ahead.

## Take the checked brief into the meeting

Keep the useful source links and mark unresolved points as questions. Do not treat generated certainty as a substitute for a missing record. If the assistant proposes sending a brief, review that as a separate action.

[Set up one meeting-preparation routine in OGAD](https://getoffgridai.co/desktop/) and check it against a meeting you know. Once its scope and sources are right, it can prepare that same structured starting point as later meetings approach.
