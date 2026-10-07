---
layout: content
title: "How to Keep a Private Record of Your Mac Activity During Meetings in Off Grid AI in 2026"
description: "Review captured Mac activity from a meeting’s time window alongside its saved local meeting record."
date: "2026-09-29"
permalink: /articles/how-to-keep-a-private-record-of-your-mac-activity-during-meetings-in-off-grid-ai-in-2026/
published_at: "2026-09-29T11:54:32.669Z"
article_topic: "Voice & audio"
article_platform: "Mac"
devto_article: true
devto_id: 4771206
devto_url: "https://dev.to/alichherawalla/how-to-keep-a-private-record-of-your-mac-activity-during-meetings-in-off-grid-ai-in-2026-5n3"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2Fihns7nvu313vcjobujvz.png"
---
A transcript tells you what was said. It may not remind you which document you opened, which app you checked, or what other work you did during the discussion.

**OGAD (Off Grid AI Desktop)** Pro can show captured activity from a saved meeting's time window under **During this call**. With capture enabled and local processing configured, you can review those observations beside the meeting record on your Mac.

[Download OGAD](https://getoffgridai.co/desktop/)

![Off Grid AI Replay: a recorded browser screen with a capture timeline.](/assets/img/home/app/replay-light-1760.webp)

---

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@offgridmobileai.co](mailto:support@offgridmobileai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

## Add context to the conversation

Imagine a project discussion where you open a design document, check a note, and return to the call. Later, the transcript gives you the spoken discussion. The activity view can help you find the captured work that happened at the same time.

OGAD uses the meeting's recorded start and end times to find retained observations from that period. It separates observations by whether they share recognized people or projects with the meeting.

That gives you a useful way into the record. It is not a complete log of every click, a measure of attention, or proof that an activity was relevant. An observation can belong to the project even if the model did not recognize the same project name in both places.

## Prepare capture before the meeting

This guide uses the Mac Pro meeting and activity workflow in [OGAD 0.0.52-beta.103](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.52-beta.103). It needs recorded activity during the call; enabling capture afterward cannot fill in the missing past.

1. Activate Pro and prepare local models for screen-derived observations, transcription, and meeting summaries.
2. Review **Settings → Setup & health → System permissions** and grant the permissions needed for the work you choose to record.
3. In **Settings → Capture** or **Replay**, enable or resume screen capture and check the visible capture state.
4. Make sure the people in the call agree to recording. Check the meeting recording indicator rather than assuming detection succeeded.
5. Keep capture running only for the material you want retained. Use **Pause capture** when needed.

Screen-activity capture and meeting recording are separate flows. Pausing one is not a reliable way to stop the other. Use the meeting's **Stop** control when you want the call recording to end.

Online calls still need the meeting service's connection. Local transcription and local activity processing do not make the call itself offline. Keep the selected models local when you want the AI processing to stay on your Mac.

## Find what happened during the call

After the recording has been saved and processing has had time to finish:

1. Open **Meetings** and select the saved call.
2. Review its summary and transcript for the spoken discussion.
3. Find **During this call** in the meeting details.
4. Read the captured observations and their app, time, and linked entity information.
5. Open **Show off-task** if you also want to inspect observations that did not share the meeting's recognized entities.

The labels **on-topic** and **off-task** are based on those entity links. Use them to find entries, then judge the content yourself. A missing link can put useful work in the other group.

For an important detail, check the source document or recording. A generated observation is a summary of retained activity, not a substitute for the original material.

## Why might the section be missing?

The section does not appear when the meeting lacks a usable time window or there are no retained observations in that window. Capture may have been paused, processing may not be complete, or the activity may not have produced a saved observation.

Start with a short call and a document you can recognize. Record the meeting and deliberately enable activity capture beforehand. After saving, check whether the document-related observation appears in the meeting's activity view.

[Try OGAD](https://getoffgridai.co/desktop/) with one short meeting. Keep the spoken notes and captured work context together so you can return to the discussion with less guesswork.
