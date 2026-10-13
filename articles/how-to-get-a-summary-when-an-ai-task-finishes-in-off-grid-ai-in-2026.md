---
layout: content
title: "How to Get a Summary When an AI Task Finishes in Off Grid AI in 2026"
description: "Create an event-triggered God routine that summarizes a web or computer task after it ends, including status, evidence, and unresolved work."
date: "2026-10-13"
permalink: /articles/how-to-get-a-summary-when-an-ai-task-finishes-in-off-grid-ai-in-2026/
published_at: "2026-10-13T09:30:15Z"
article_topic: "Automation & tools"
article_platform: "Computer"
devto_article: true
devto_id: 4843170
devto_url: "https://dev.to/alichherawalla/how-to-get-a-summary-when-an-ai-task-finishes-in-off-grid-ai-in-2026-1id4"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto/https%3A%2F%2Fgetoffgridai.co%2Fassets%2Fimg%2Fhome%2Fapp%2Fgod-routines-light-1760.webp"
---
When an AI task ends, you need to know what happened, what was produced, and what still needs checking. OGAD (Off Grid AI Desktop) can start a God routine when a web or computer task finishes and prepare that summary in a conversation.

Use the Pro event trigger **When a web or computer task finishes**. Treat the reported task status as part of the evidence. An ended task is not automatically a successful task.

[Download OGAD](https://getoffgridai.co/desktop/) | [Desktop beta 122 release notes](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.55-beta.122)

![Off Grid AI Desktop God scheduled-task settings with sample routines](https://getoffgridai.co/assets/img/home/app/god-routines-light-1760.webp)

---

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@getoffgridai.co](mailto:support@getoffgridai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-494gbuv5c-kj9tT7U0AS8Kq8UUO63_jw), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

## Define a useful completion summary

Ask for the original goal, final reported status, completed steps, output locations, and unresolved items. Keep failure or cancellation visible rather than hiding it behind a cheerful completion sentence.

For a web comparison, the useful output might be a table and source links. For a file task, it might be the saved path and the change made. The summary should point to the result, not merely repeat that the assistant worked on it.

A short template helps you compare runs: goal, status, result, evidence, and next check. Use the same structure for success and failure so that missing output is obvious.

## Prepare God and the task workflow

Install [OGAD](https://getoffgridai.co/desktop/), enable Pro, and check that God can run a normal instruction with your chosen model. If you want local processing, select a local model with the necessary tool support.

Start with a harmless task you can inspect, such as reading a few known pages or preparing a draft. Confirm that its task card reports the execution state and activity.

The event routine depends on the app receiving the task event while the system is available. It is not a replacement for the original task record, and it does not move execution to another computer.

## Add the task-finished trigger

1. Open God settings and expand **Scheduled tasks**.
2. Choose **Add a scheduled task**.
3. Enter a name such as “Task completion brief.”
4. Write the summary instruction in **What to do**.
5. Select **When a web or computer task finishes** under **When**.
6. Choose **Add** and leave the routine enabled.

Use an instruction such as:

> Summarize the task that just ended. State its goal and reported final status. List confirmed outputs and where to inspect them. Separate completed work from failed, cancelled, or unverified work. Include relevant task evidence. If no output is confirmed, say so. Do not start another task or send the summary elsewhere.

This keeps the event response focused. A completion notification should not accidentally become an open-ended chain of new work.

## Test with a small real task

Run the chosen harmless task and let it reach a final state. Then open the God result produced by the routine. Compare its task identity and status with the task card.

**Run now** can test the routine's general instruction, but a manual run without a new task event may not have the same event context. To check the trigger itself, inspect a result after an actual task finishes.

If several tasks end near each other, make sure the summary names the correct one. A familiar project name alone may not distinguish two attempts at the same job.

## Check the claimed output

Open a saved file, source link, generated image, or other deliverable named in the summary. Confirm that it exists and corresponds to the requested work. A natural-language claim cannot substitute for that check.

For an image job, inspect the image itself. For a spreadsheet change, inspect the saved workbook. For web research, open the cited pages and check that the conclusion is supported.

If a task stopped after partial progress, keep the useful partial output but label it accurately. “Three of five pages reviewed” is a better basis for the next decision than “research complete.”

## Diagnose missing or misleading summaries

| Symptom | Next check |
| --- | --- |
| No summary appears | Routine enabled, event received, app and model available |
| Summary is delayed | Other queued model work |
| Wrong task is described | Task identity and event context |
| Failure is described as success | Final status and routine wording |
| Output path is claimed but empty | Original task result and actual saved artifact |

Use the task card as the starting record when the summary and execution state disagree. Adjust the routine to state uncertainty rather than treating the model's most optimistic sentence as authoritative.

## Keep the next action deliberate

The summary can propose a next step, but that proposal should not silently retry a failed action or publish a partial result. Decide whether to inspect, repair, rerun, or stop based on the actual output.

If you want a later routine to act on a completion event, define that separately with a clear scope. Begin with a read-only summary so you can learn how task events appear in your own workflow.

Local task evidence can be summarized with a local model after setup. Online sources used by the original task still need their own connections, and a remote response model changes where the summary's input is processed.

[Add a completion brief in OGAD](https://getoffgridai.co/desktop/) and test it with one small task. Check the final status and one real output before you rely on the next automatic summary.
