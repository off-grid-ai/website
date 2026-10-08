---
layout: content
title: "How to Get Automatic Meeting Prep Alerts in Off Grid AI on Windows in 2026"
description: "Get a local heads-up linked to available people and open items before a meeting, with clear setup and timing limits."
date: "2026-10-07"
permalink: /articles/how-to-get-automatic-meeting-prep-alerts-in-off-grid-ai-on-windows-in-2026/
published_at: "2026-10-07T21:17:33Z"
article_topic: "Automation & tools"
article_platform: "Windows"
devto_article: true
devto_id: 4814480
devto_url: "https://dev.to/alichherawalla/how-to-get-automatic-meeting-prep-alerts-in-off-grid-ai-on-windows-in-2026-k1f"
image: "https://dev-to-uploads.s3.us-east-2.amazonaws.com/uploads/articles/h5h0qrj7m9idoz7zx6l6.png"
---
A meeting reminder tells you when to join. It rarely reminds you which question was left open, what you promised last time, or which note you need before speaking.

OGAD (Off Grid AI Desktop) Pro can send a meeting heads-up connected to the people and open items in its saved work history. Open the notification, review the available context, and turn it into a question or action before the call starts.

[Get OGAD for Windows](https://getoffgridai.co/desktop/)

![Day in Off Grid AI Desktop with meeting prep open for Northwind board prep: who Daniel Cole is, what was recently discussed and the open items.](https://getoffgridai.co/assets/img/home/app/today-prep-light-1760.webp)

---

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@getoffgridai.co](mailto:support@getoffgridai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

## Prepare the Windows beta first

Use the x64 Windows installer from [beta 114](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.55-beta.114), with Pro active. Prepare downloaded local models for any AI processing used below. Initial downloads and licence setup can need internet.

For screen-based history, review **Settings > Setup & health**, allow the requested system access, then explicitly choose **Resume capture** in **Replay** or **Settings > Capture**. Check the visible **Capturing** state. Use **Pause capture** when you do not want new screen history retained. Imported calendar records, manually entered tasks, and notification controls are separate choices.

## Arrive with the unfinished question ready

Imagine an upcoming review with Maya. You previously discussed two launch dates and still have an open item to confirm which date is possible.

A meeting heads-up can bring the matching person and open-item count to your attention. In the prep view, you review the retained discussion and check whether the date question is still unresolved.

Your useful result might be one sentence in your own meeting notes:

> Can we confirm the launch date today, or is the dependency still open?

You now have a reason for the question and a source to check. The notification does not need to contain the whole previous discussion to help you prepare.

## What can the prep view show?

For a known event, OGAD uses available attendee names and names recognized in the event title to look for matching local records. It can show these sections:

| Section | What to use it for |
|---|---|
| Who | Review recognized people and available summaries |
| Recently discussed | Recover context from retained observations linked to those people |
| Open items | Find related actions that are still marked open |

This is a local lookup over saved records. It is not a live search through every attendee's messages, a complete biography, or an automatically researched briefing on the meeting topic.

Names matter. An event containing an email address may not match a person stored under a different display name. An event with no useful name can have no prior context even when you know the people well. Review and correct the person records you actually use; do not invent an association to fill an empty panel.

## Bring the event into OGAD first

For Google Calendar, open **Integrations > Google Calendar**. Complete the Google-client setup and account authorization, then use **Sync recent**. Open **Day** and check that the expected meeting has the correct time and title.

If this is your first connection, the [calendar setup and Day guide](https://dev.to/alichherawalla/how-to-see-todays-meetings-and-to-dos-together-in-off-grid-ai-on-your-mac-in-2026-jb2) includes the OAuth client requirements and callback address. A meeting visible in your browser's calendar is not enough; check that it has reached Day.

Calendar connection and refresh need internet. Refresh again after an important change, and compare the imported time with the original calendar before relying on an alert.

## Build useful context during normal work

Opt-in background capture can save and process sampled work activity while you use your Windows computer. It can associate observations with recognized people and extract concrete commitments into Actions. That gives meeting prep something useful to retrieve later, without requiring you to write a separate prep document for every interaction.

Prepare the local processing models and required permissions. Choose **Resume capture** in Replay or Capture settings only when you want that work retained, and check the visible **Capturing** state. Pause capture for material you do not want saved.

The [automatic work-chat to-do guide](https://dev.to/alichherawalla/how-to-automatically-build-a-private-to-do-list-from-your-work-chats-in-off-grid-ai-on-mac-in-2026-178m) shows how to check a suggested task's source. Review mistaken names, completed tasks, and irrelevant suggestions before relying on them as meeting context.

Screen capture is sampled. It does not automatically record all audio or preserve every chat message. A separate meeting recording or supported import contributes only the material that was actually saved and processed.

## Check the prep view before you enable alerts

1. Open **Day** and find the upcoming event under **Today's meetings**.
2. Select **Prep** beside the event.
3. Read any available Who, Recently discussed, and Open items sections.
4. Compare one important detail with its original conversation, document, or recording.
5. Write one question or next action in the notes you will use during the call.

This first check separates two problems: whether useful context exists and whether a notification can reach you. If Prep says **No prior context found for this one yet**, enabling notifications will not create the missing history.

The prep panel displays retained summaries. Check exact quotations and commitments in the original source. A task that still says open may already have been resolved elsewhere.

## Turn on the automatic heads-up

Open **Settings > Capture** and enable **Proactive delivery**. Allow OGAD notifications in Windows settings, and keep the Windows computer awake with OGAD running before the meeting. Check Focus if notifications are hidden.

The app targets roughly 20 minutes before a meeting. It checks periodically within a wider window, so this is not an exact 20-minute timer. An event imported too late can miss that window.

A notification can name recognized people and show the number of open items. When matching context is absent, it can still invite you to open prep. Select the notification to open that event's context in OGAD. If the event was removed, the app can report that it no longer exists.

Proactive delivery also controls the morning briefing. Turning it on does not grant capture permission, start a microphone recording, join the call, or send a message to an attendee.

## If the alert is missing or incomplete

| Symptom | First check |
|---|---|
| No alert | Confirm the event is in Day, the app is running, and notifications are allowed |
| Alert arrives late | Check sleep, calendar import timing, and system notification suppression |
| Prep has no useful history | Inspect attendee names and retained person records |
| An open item is wrong | Review it in Actions and check its source before updating or dismissing it |
| The meeting changed | Refresh the calendar and confirm the current time in the original service |

Stored event context can be reviewed locally. Fresh calendar changes need internet, and remote models used to generate the underlying notes change where that processing occurs. Keep those models local when you want the work history processed on your Windows computer.

[Try OGAD](https://getoffgridai.co/desktop/) with one familiar meeting. Check Prep first, enable the heads-up, and arrive with one supported question ready instead of reconstructing the previous conversation as the call begins.

This guide covers **OGAD beta 0.0.55-beta.114**. The [release](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.55-beta.114) and [build record](https://github.com/off-grid-ai/OGAD/actions/runs/37334426829) identify the desktop version and its included Pro code. Setup details follow that code; they are not a device test.
