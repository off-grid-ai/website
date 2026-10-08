---
layout: content
title: "How to Automatically Organize People and Projects From Your Mac Workday in Off Grid AI in 2026"
description: "Build a private record of people and projects from activity you choose to capture. Review its sources and correct names without maintaining every entry by hand."
date: "2026-09-29"
permalink: /articles/how-to-automatically-organize-people-and-projects-from-your-mac-workday-in-off-grid-ai-in-2026/
published_at: "2026-09-29T09:55:13.288Z"
article_topic: "Automation & tools"
article_platform: "Mac"
devto_article: true
devto_id: 4770361
devto_url: "https://dev.to/alichherawalla/how-to-automatically-organize-people-and-projects-from-your-mac-workday-in-2026-3bag"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2F3qmzbx68gtajva6awtya.png"
---
You remember the project. You remember the person. The details are spread across messages, documents, and meetings.

OGAD (Off Grid AI Desktop) can build a private directory of people and projects from work you choose to capture on your Mac. After you enable capture and prepare local models, it turns supported activity into notes and links the people and projects it identifies. You can return to a name instead of starting another search through every app.

[Download OGAD for Mac](https://getoffgridai.co/desktop/)

![Entities in Off Grid AI Desktop: the people found in your work, each with a count of mentions, beside tabs for projects and companies.](/assets/img/home/app/people-directory-light-1760.webp)

---

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@offgridmobileai.co](mailto:support@offgridmobileai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

This is a Pro workflow. With local processing selected, the work history can stay on your Mac. Download the app and models before working without internet.

## A directory that grows from your work

Open **Entities** to find the people and projects identified in your retained activity. Each record can have a summary under **The story**, a **Timeline** of related notes, and source details that help you check what the AI found.

For a project, that gives you a way back into work after a gap. For a person, it gives you context before the next conversation. You do not have to type a directory entry for every name that the model recognizes.

The automatic part starts with capture you enable. It does not import your entire contact list or read every old message in every app. Notes come from captured and processed material. Names and relationships can be wrong, especially when a screen contains several unrelated conversations.

These controls are included in [OGAD 0.0.51](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.51).

## Start with one project you know

Pick a project with a clear name. A small, familiar work session makes it easy to check whether the resulting notes are useful.

1. Install OGAD, activate Pro, and prepare the local models used for capture processing.
2. Open **Settings → Setup & health → System permissions** and review the required macOS permissions.
3. Open **Settings → Capture** or **Replay**. Enable or resume capture and check the visible Capturing state.
4. Work on the project. Use **Pause capture** before material you do not want recorded.
5. Allow processing to finish, then open **Entities** and use **Find…** to look for the project or a person involved.

The useful first result is a record with recognizable activity. An empty directory can mean that capture was paused, processing is not ready, or the model did not identify a useful name in that session.

## Check where a note came from

Open a record and read its Timeline. When an entry has attached evidence, select **Why** to inspect the captured material behind it. A source link may also be available.

Use this before relying on a summary of a decision. A model can confuse a suggestion with an agreement or associate a name from the wrong part of a window. The recorded source helps you correct the interpretation.

**The story** is a generated summary of the record. Use it to get oriented, then inspect the relevant timeline entry for an important detail. **Re-synthesize** can rebuild the summary after you correct the record.

## Keep names and relationships useful

You can fix the directory as you use it:

- Click a record's name to correct its spelling or give it a clearer name.
- Use **Merge** when two records refer to the same person or project. Check the destination carefully.
- Use **Move to another entity** on a timeline entry that belongs elsewhere.
- Use **Remove from this entity** to remove an incorrect association. That does not delete the underlying captured history.

Related project records can also be placed under a parent project. This organizes the work directory; it does not move uploaded documents or create shared chat instructions.

If an old record makes the directory harder to scan, its **Hide from feed (still captured)** control can reduce that clutter. **Show archived** brings hidden records back into view. Hiding is not a capture exclusion or a deletion action.

## Choose what enters the record

Capture has a visible state and starts only after you opt in. Pause it when you need to. Screen capture, clipboard capture, and meeting recording have separate controls.

Keep the processing route local when you want these notes processed on your Mac. A remote model changes where the processing happens. The directory also depends on the history you retain: deleting source material can reduce what you can inspect later.

## Find the context before the next conversation

[Download OGAD](https://getoffgridai.co/desktop/), capture one work session you choose, and find its people and project records afterward. Check one source and correct one name if needed. You now have a useful place to resume the work, with less directory maintenance by hand.
