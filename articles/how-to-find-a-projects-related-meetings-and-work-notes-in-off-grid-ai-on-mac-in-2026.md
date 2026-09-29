---
layout: default
title: "How to Find a Project’s Related Meetings and Work Notes in Off Grid AI on Mac in 2026"
description: "Recover project context from recorded meetings and captured work notes. Find related sources, check decisions, and correct project associations locally."
date: "2026-09-29"
permalink: /articles/how-to-find-a-projects-related-meetings-and-work-notes-in-off-grid-ai-on-mac-in-2026/
article_category: "Desktop"
devto_article: true
devto_id: 4770376
devto_url: "https://dev.to/alichherawalla/how-to-find-a-projects-related-meetings-and-work-notes-on-your-mac-in-2026-akk"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2Fnp5e2jlqd5uwcegt35vy.png"
---
Returning to a project should not mean reconstructing it from a meeting app, several messages, and yesterday's browser tabs.

OGAD (Off Grid AI Desktop) gives you a local place to find retained meeting records and captured work notes on your Mac. Pro work history can link recognized projects to observations, while Search helps you find material that has not landed under the right project. Keep the AI processing local to review that context without uploading it to a cloud assistant.

[Download OGAD for Mac](https://getoffgridai.co/desktop/)

![OGAD desktop chat interface](https://getoffgridai.co/assets/img/desktop-chat.png)

---

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@offgridmobileai.co](mailto:support@offgridmobileai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

The benefit is a shorter path back to the work: find the project, inspect its recent history, and check the source behind a decision.

## Start with the project, then inspect the record

Open **Entities**, use **Find…**, and select the project. **The story** gives you a generated overview. **Timeline** shows the observations associated with that record.

This can bring together activity from different apps when OGAD has captured and recognized the connection. You can review the sequence without remembering which app contained each detail.

Not every related meeting is automatically linked to the project. A meeting summary may identify the people involved without identifying its project. Use Search to find that meeting, and correct a related timeline entry's association when needed.

These work-history features are included in [OGAD 0.0.51](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.51).

## Find the decision that changed the work

A broad project overview is useful for orientation. A specific question is better when you need to act:

> Which recorded discussion explains why the delivery date changed?

Start with the relevant time in the project Timeline. On entries with captured evidence, select **Why** to inspect the supporting material. Follow a source link when available.

For a meeting, open the retained meeting record and inspect its transcript. Check that the date, participant, and decision match the project you are working on. A generated summary can leave out a condition that matters to the next step.

If you cannot find the item under the project, open **Search**. Try a distinctive phrase, project name, or participant name rather than a broad word such as “update.” Search can find retained indexed records; it does not scan every file on your disk or import every old conversation.

## Build the record while you work

Screen-derived notes begin with capture you enable. Meeting audio uses a separate recording service, which can start for detected calls after its permissions are enabled. Check its visible recording indicator and Stop control.

To build useful project history:

1. Install OGAD, activate Pro, and prepare local models for the processing you will use.
2. Review **Settings → Setup & health → System permissions**.
3. Enable or resume screen capture in **Settings → Capture** or **Replay**. Confirm the visible Capturing state.
4. Work on one recognizable project. Pause capture for material you do not want retained.
5. Record a meeting separately if you need its audio and transcript in the history.
6. Let processing finish, then inspect the project in **Entities** and search for the meeting by its topic.

Use a session you know well for the first check. The expected result is recognizable retained material that you can find again. A missing note may mean capture was paused, processing is still pending, or the model did not recognize the project.

## Put misplaced notes with the right project

A person may work on several projects. A meeting can therefore appear in the person's history without appearing in the project you expected.

On an applicable timeline entry, use **Move to another entity** and choose the project that the entry belongs to. Use **Remove from this entity** for an incorrect association. Check the source first so you do not move an unrelated discussion into the project record.

If the same project appears under two names, inspect both records before using **Merge**. After correcting the history, **Re-synthesize** can rebuild the project's overview from its associated notes.

These controls organize captured work history. They do not move documents between chat projects or change the contents of the original files.

## Keep the source and its limits in view

A screen observation captures a moment, not necessarily a whole document. A meeting summary is shorter than its transcript. An incomplete meeting recording may contain only part of the conversation. Use the fullest retained source available when a detail matters.

Local operation also depends on your model choice. Download the required models before going offline and keep processing on your Mac. Selecting a remote service changes where the model receives the material.

Deleting retained history can remove information you expected to find later. Pausing capture prevents new screen capture; it does not erase old records or stop separate meeting and clipboard workflows.

## Return to the work with context

[Download OGAD](https://getoffgridai.co/desktop/) and start with one project. Capture a session you choose, record a relevant meeting when needed, then find the notes that explain the next step. Keep the project history useful by checking sources and correcting the few associations that need it.
