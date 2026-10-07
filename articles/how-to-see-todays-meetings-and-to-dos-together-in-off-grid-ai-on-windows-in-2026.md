---
layout: default
title: "How to See Today\u2019s Meetings and To-Dos Together in Off Grid AI on Windows in 2026"
description: "See retained calendar events and open to-dos together in Off Grid AI’s Day view, then choose the next useful action."
date: "2026-10-07"
permalink: /articles/how-to-see-todays-meetings-and-to-dos-together-in-off-grid-ai-on-windows-in-2026/
published_at: "2026-10-07T21:16:26Z"
article_topic: "Work & organization"
article_platform: "Windows"
devto_article: true
devto_id: 4814477
devto_url: "https://dev.to/alichherawalla/how-to-see-todays-meetings-and-to-dos-together-in-off-grid-ai-on-windows-in-2026-44n5"
image: "https://dev-to-uploads.s3.us-east-2.amazonaws.com/uploads/articles/dgf9n2fvgzgd6ejbmrx3.png"
---
Your calendar shows when you are busy. Your task list shows what you owe. Planning the day is easier when you can see both without moving between separate lists.

OGAD (Off Grid AI Desktop) Pro brings **Today's meetings** and **To do** into its **Day** view on Windows. Use it to check the next meeting, review open commitments and choose work that fits the time available.

![Off Grid AI example view: Day: meetings, to-dos, and a journal together.](https://getoffgridai.co/assets/img/home/app/day-light-1760.webp)

---

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@offgridmobileai.co](mailto:support@offgridmobileai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

## Prepare the Windows beta first

Use the x64 Windows installer from [beta 114](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.55-beta.114), with Pro active. Prepare downloaded local models for any AI processing used below. Initial downloads and licence setup can need internet.



## What appears in the Day view?

The current day can show upcoming calendar events saved in OGAD and priorities from its Actions list. These are existing records, not an automatic discovery of every appointment and promise across all your accounts.

For example, you might see a client call later today and an open task to review that client's outline. Together, they help you choose the review before you start an unrelated piece of work.

This guide uses the linked Windows beta with Pro. Opening a dashboard is different from scheduling an automatic briefing or notification.

## Bring in the calendar and tasks you need

For Google Calendar, open **Integrations** and select **Google Calendar**. Complete **Google client setup** if requested: enable the Google Calendar API in your Google Cloud project, configure the OAuth consent and Web application client, and enter the client values in OGAD. Use the setup panel's redirect URI, `http://127.0.0.1:33418/callback`, then **Save client**.

Select **Connect**, authorize the intended Google account and check the connection. In that integration's detail view, choose **Sync recent**. This imports calendar events for the Day view. If the connection or import fails, resolve its error before relying on the agenda.

This setup and refresh need internet. The local event list reflects what OGAD has received; compare important times with the original calendar, especially after a reschedule.

For tasks, open **Actions → To do** and review the existing suggestions. You can also use **Jot a to-do** to add a missing commitment. Check inferred due dates and linked names before relying on the priority order.

The dashboard can remain useful with a few deliberate records. You do not need to capture every work session to put a manually entered task beside imported calendar events.

## Review today in one place

1. Open **Day** and choose **Today** if you were reviewing an earlier date.
2. Find **Today's meetings** and **To do**.
3. If you hid either block, use its button under **Hidden**, or **Reset layout** to restore the default arrangement.
4. Review the next event and the task you want to finish before it.
5. Open the task or use **View all** to inspect the full Actions list.

Use the source context behind a task to confirm what it means. The dashboard is a useful selection of your data, not a substitute for checking a calendar change or an uncertain commitment.

## Turn the overview into a small plan

Pick one useful action for the next available block of time. Keep it concrete: review a two-page outline, write the meeting questions or send a finished file.

Mark completed work done so it stops competing with current commitments. Dismiss a task that was never yours. If the task is too large for the available time, add a smaller next step rather than treating a due-date estimate as a complete schedule.

The meeting block focuses on upcoming events around the current day. It is not a full historical calendar. Check your calendar app when you need the complete schedule or a recently changed invitation.

## Keep the network boundary clear

Saved tasks and imported event records can be viewed locally. Connecting a calendar and obtaining fresh remote changes can require internet. A cached event is not proof that a cancelled meeting is still happening.

If you use generated summaries or task extraction, select local models for local processing. The basic act of viewing saved cards should not be confused with those separate AI steps.


## Plan the next hour from a real commitment

Imagine you have a client review at 3 PM and an open task to read the outline before the call. Open Day, confirm the meeting time and inspect the task's source. If the outline review is still needed, make it the next action instead of starting a less urgent task from another project.

Break a vague task into something you can finish: “Read the two-page outline and note three questions.” Use Jot a to-do for that next step if the existing item is too broad. The dashboard does not automatically reserve a calendar block or estimate how long your work will take.

After the review, mark the finished task done. If the meeting was moved, refresh the calendar connection and compare it with the original calendar. That prevents an old cached event from shaping the rest of the afternoon.

## Check missing information before trusting the overview

An empty meeting block can mean there are no imported upcoming events, not that you have a free day. An empty task block can mean no open items were captured or entered, not that you made no commitments.

Use the source app when a gap matters. Add one missing task deliberately, or repair the calendar connection and import before you use the view to choose work. If a block was hidden, restore it rather than repeatedly importing the same data.

The useful outcome is a small decision about what to do next. You do not need a perfect record of every work system to benefit from seeing the next confirmed meeting beside the task that prepares you for it.

[Download OGAD for Windows](https://getoffgridai.co/desktop/), add one real task and bring in today's calendar. Open Day and choose what you will finish before the next meeting.

This guide covers **OGAD beta 0.0.55-beta.114**. The [release](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.55-beta.114) and [build record](https://github.com/off-grid-ai/OGAD/actions/runs/37334426829) identify the desktop version and its included Pro code. Setup details follow that code; they are not a device test.
