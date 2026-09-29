---
layout: default
title: "How to Get an Automatic Morning Briefing of Meetings and To-Dos in Off Grid AI on Mac in 2026"
description: "Prepare Day context and local notifications so your Mac can deliver a morning overview without a new prompt."
date: "2026-09-29"
permalink: /articles/how-to-get-an-automatic-morning-briefing-of-meetings-and-to-dos-in-off-grid-ai-on-mac-in-2026/
published_at: "2026-09-29T12:01:44.705Z"
article_topic: "Automation & tools"
article_platform: "Mac"
devto_article: true
devto_id: 4771260
devto_url: "https://dev.to/alichherawalla/how-to-get-an-automatic-morning-briefing-of-meetings-and-to-dos-in-off-grid-ai-on-mac-in-2026-375o"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2Flbu63pwz3va2touew8fn.png"
---
You open your Mac and spend the first part of the day rebuilding your plan. The calendar has your meetings. A few commitments are buried in chats. Yesterday's notes explain why one task needs attention first.

OGAD (Off Grid AI Desktop) Pro can bring available meetings and to-dos into a short morning briefing, then deliver it as a local notification. Once you set it up, you do not need to start the morning by typing another prompt. You get a starting point to check and act on.

[Download OGAD for Mac](https://getoffgridai.co/desktop/)

![OGAD desktop chat interface](https://getoffgridai.co/assets/img/desktop-chat.png)

---

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@offgridmobileai.co](mailto:support@offgridmobileai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

## Start with a decision you need to make

Suppose you have a client review at 11 AM and an open task to check the proposal before that review. You also have a less urgent draft to write.

The useful result is knowing what deserves the next block of time: check the proposal before the call. The briefing can use saved context to suggest that order. You inspect the underlying task and calendar before treating the suggestion as your plan.

That matters more than having another list. A calendar can tell you when the call starts; a task record can tell you what you intended to finish. Bringing them together gives the model enough context to propose a next action.

## What information does the briefing use?

The released workflow builds a daily plan from remaining calendar events, a selection of your open to-dos, and recent retained email summaries when available. It sends a short opening portion of that plan as a notification.

| Available record | What it can contribute |
|---|---|
| Imported upcoming event | A known meeting time, title, and available attendees |
| Your open to-do | A concrete action, plus an available due date or linked person |
| Retained email summary | A possible follow-up or useful subject from previously imported mail |

It does not read every account when the notification fires. An email snippet is not the whole email. The personal-priority list also excludes tasks classified as waiting on someone else. Review that separate list when planning follow-ups.

The generated plan can misjudge urgency. If a task was completed outside OGAD but still says open, the briefing can continue treating it as work to do. Keeping the records current is part of getting a useful result.

## Put one real meeting and task in place

This guide uses Mac Pro behavior verified in [OGAD 0.0.52-beta.103](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.52-beta.103). Activate Pro and prepare a downloaded local text model before relying on local generation. Initial setup and downloads need internet.

For Google Calendar, open **Integrations > Google Calendar**. Complete **Google client setup** if requested. Use the panel's redirect URI, `http://127.0.0.1:33418/callback`, when configuring the Web application OAuth client. Save the client values, choose **Connect**, and authorize the intended Google account.

Then select **Sync recent** and open **Day**. Check that the event's title and time match your calendar. The [calendar and Day setup guide](https://dev.to/alichherawalla/how-to-see-todays-meetings-and-to-dos-together-in-off-grid-ai-on-your-mac-in-2026-jb2) covers this route in more detail. A successful sign-in alone is not proof that the event has been imported.

Open **Actions > To do** and review your tasks. Use **Jot a to-do** for an important missing action. Check inferred names and dates, and mark work done only when you have completed it.

You can also let [opt-in background capture extract commitments from work chats](https://dev.to/alichherawalla/how-to-automatically-build-a-private-to-do-list-from-your-work-chats-in-off-grid-ai-on-mac-in-2026-178m). That can reduce repeated manual entry, but capture is sampled and suggestions need review. You do not have to enable screen capture simply to combine a manually entered task with an imported calendar event.

## Enable automatic delivery

1. Keep OGAD running with Pro active and the local text model ready.
2. Open **Settings > Capture** and turn on **Proactive delivery**.
3. Allow OGAD notifications in macOS settings. Check Focus if banners are being suppressed.
4. Review Day and Actions before the next morning, so the briefing has useful records.
5. Leave the app running during the morning and inspect the notification when it arrives.

The same switch enables meeting heads-up notifications. It does not start screen recording or grant access to your microphone. Capture permissions and recording controls remain separate.

The notification is deliberately short: the released code limits its body to 240 characters. Open OGAD to review the supporting Day and Actions records. Do not expect the banner to contain a complete schedule or every task.

## When does it arrive?

The workflow checks during your local morning, from 6 AM until before noon. Checks run periodically while the app's main process is running, with at most one morning briefing per day. There is no exact delivery-time setting in this workflow.

Closing the app window is different from quitting OGAD. The background process must remain running. A sleeping Mac, a stopped app, or notification suppression can prevent you from seeing the briefing when expected.

If generation returns no usable plan, that day can be marked as attempted without a notification. Adding records later or repeatedly switching delivery off and on does not guarantee another attempt that morning. Prepare the data and model before the next morning instead.

## Keep fresh information separate from saved information

Calendar refresh and email imports need the relevant online service. A saved local event can support a briefing without a fresh cloud AI request, but it may no longer reflect a rescheduled meeting. Refresh before relying on an important time.

Keep the text model local for local plan generation. Choosing a remote model changes where the supplied planning context is processed. A local notification is not evidence that every input was obtained offline.

The plan is saved locally. If a later generation attempt fails, the workflow can fall back to an already saved plan for that day. Check the current event and task records before acting on a suggestion that may be older.

## Use the briefing to choose one action

When it arrives, check the next meeting and the suggested priority. Confirm that the task is still open, then choose a specific first action you can finish. For the proposal example, that could be checking the pricing section and writing one question for the review.

[Try OGAD on your Mac](https://getoffgridai.co/desktop/) with one reviewed calendar and a small, accurate to-do list. Let the morning notification bring those records back to your attention, then start the work you chose.
