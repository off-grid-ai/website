---
layout: content
title: "A Private Microsoft Recall Alternative on Windows in 2026 (Local AI Reviews Your Day Overnight)"
description: "Save your Windows PC screen as you work, then let a local model read it overnight. Your PC stays fast by day and your journal is ready by morning."
date: "2026-10-27"
permalink: /articles/a-private-microsoft-recall-alternative-on-windows-in-2026-local-ai-reviews-your-day-overnight/
published_at: "2026-10-27T06:53:18Z"
article_topic: "Privacy & control"
article_platform: "Windows"
devto_article: true
---
You want a searchable memory of your workday on Windows. Microsoft Recall does that, but it runs only on Copilot+ PCs, and you may not want a model reading screenshots while you work. Off Grid AI Desktop Pro saves your screen as you work and leaves the heavy part, the AI analysis, for the night. By default it runs from 03:00 to 08:00, it can wake your PC to do it, and the model runs on the PC itself. In the morning your **Day** view has the journal, timeline and to-dos from yesterday.

It does not need a Copilot+ PC or an NPU. Any Windows PC that runs Off Grid AI Desktop and a local vision model can use it.

## What you need

- A Windows PC with Off Grid AI Desktop 0.0.55 or later. Overnight analysis is in the current stable release. [Download Off Grid AI Desktop for Windows](/desktop/).
- Off Grid AI Pro. Screen capture and the Day view are Pro features. Pro is monthly or a one-time lifetime price; the [Pro page](/pro/) shows today's price.
- A local vision model downloaded in the app. On Windows, frame summaries come from a vision model, so this is required. An NVIDIA GPU makes each frame faster, but overnight mode exists so speed matters less.
- Your PC plugged in at night if it is a laptop.

Windows needs no special screen permission and no administrator password for this feature.

## How it works

Capture has two halves. Taking a screenshot is light, so it runs all day. Analyzing each saved moment with a local model is heavy: it is one model pass per frame. Overnight mode splits them. Screenshots are saved to disk as you work, wait in a queue as pending, and the model works through the queue inside the window you choose. Nothing is lost while they wait.

## Step 1: Turn on capture and choose Overnight

1. Open Off Grid AI Desktop and click **Replay** in the sidebar.
2. At the top, the capture status shows **Paused**. Click **Resume capture**. If it already shows **Capturing**, skip to Step 2 and pick **Overnight** there.
3. The first time you turn capture on, the app asks: "When should Off Grid analyze your day?" Two options appear:
   - **Overnight (recommended)**: "Your Windows PC stays fast all day. Analysis runs 3:00-8:00 and can wake it."
   - **As it happens**: "Your day appears as you go, using some power while you work."
4. Click **Overnight (recommended)**.

That is all. There is no prompt. The app registers a per-user task in Windows Task Scheduler named **Off Grid AI night processing**, with "Wake the computer to run this task" turned on. The task does nothing except wake the PC at the start of the window; Off Grid AI Desktop does the work.

You are asked this question once. To change your answer later, use Settings.

## Step 2: Change the hours in Settings

1. Click **Settings** in the sidebar.
2. Scroll to **Capture & processing**.
3. Under **Processing**, find the **Analyze** row. If it reads "As it happens.", switch its control to **Overnight**. It then reads "Overnight. Your Windows PC wakes at 03:00 to do it."
4. Two time fields appear next to it: **Analysis starts** and **Analysis ends**. Set them to any hours you are away from the PC, such as 01:00 to 06:00. A window can cross midnight, such as 22:00 to 06:00.
5. To go back to analyzing during the day, switch the control from **Overnight** to **As it happens**. The app removes its Task Scheduler task.

When you change the start time, the app updates the task to match.

If the row reads "Overnight, while your computer is awake." and shows "Windows did not accept the wake task.", the task could not be registered. Analysis still runs in the window, but only if the PC is already awake.

## Step 3: Make sure Windows can wake the PC

The PC does the work, so a few things must be true at night:

- **Off Grid AI Desktop is running.** On Windows, closing the last app window quits the app. Minimize it instead. If the app is closed, nothing is analyzed.
- **Wake timers are allowed.** Open **Control Panel**, then **Power Options**, **Change plan settings**, **Change advanced power settings**. Under **Sleep**, set **Allow wake timers** to **Enable**. Windows turns it on by default for plugged-in power, but a PC maker or an IT policy can turn it off.
- **A laptop is plugged in.** While frames are waiting inside the window, the app keeps the PC from going back to sleep, then lets it sleep again when the queue is empty or the window ends.
- **The PC can be locked.** Locking Windows (Win+L) pauses new screenshots, but it does not stop the analysis of frames already saved. That is the point of the overnight window.

Analysis does wait if you paused capture yourself. The Day view says so instead of promising a run that will not happen.

## Step 4: Read your day in the morning

Click **Day** in the sidebar. The journal, timeline, time spent by app and to-dos are built from what the model read overnight.

During the day, the Day view shows how much is waiting, for example "42 moments waiting · analyzed tonight at 03:00". If you want the results now, click the **Analyze now** button (the play icon) next to that line. It analyzes today's pending frames straight away.

If you work on a laptop on battery with **As it happens** selected, the Day view offers the switch once: "On battery. Analyze overnight instead?" Click **Overnight** to switch, or dismiss it.

## Check what happened overnight

The **Capture & processing** card has a **Pipeline health** panel with **Screen access**, **Vision model**, **Frame queue**, **Last frame** and **Last observation**. The queue counts update as frames move.

If some frames failed, a panel reads, for example, "3 frames need another pass". It groups them by the real reason, with a count for each, and says how many will retry on their own and how many need you. Frames stay saved, and a retry button sits next to them.

A frame can also be too large for the active model's context. Those show as "frames are waiting for a larger model". There is no retry button for them, because retrying would not help. Raise the context or switch to a larger model, and they are analyzed on their own.

## What this does not do

- **It does not run when the app is closed.** Off Grid AI Desktop must be running at night, so minimize the window rather than closing it.
- **It does not wake a PC that is shut down.** Wake timers bring Windows out of sleep. A PC you shut down stays off until you turn it on.
- **It does not send your screen anywhere by default.** Analysis uses a local model. One exception: if you have no local model installed and you selected a remote chat server in the app, capture analyzes with that server instead. Install a local vision model if you want every frame to stay on the PC.
- **It does not capture everything.** Apps you add under **Excluded apps** in **Capture & processing** are not saved, and nothing is saved while capture is paused.

## FAQ

**Is there a Microsoft Recall alternative that does not need a Copilot+ PC?**
Yes. Off Grid AI Desktop Pro saves a searchable screen history on any Windows PC that runs the app and a local vision model. The analysis runs on your PC, at night by default.

**Why is my PC not waking up for the analysis?**
Check that **Allow wake timers** is enabled in Power Options, that the PC was asleep rather than shut down, and that Off Grid AI Desktop was still running. Then open **Task Scheduler** from the Start menu and check that **Off Grid AI night processing** is in **Task Scheduler Library**.

**Does it ask for an administrator password on Windows?**
No. The wake task is a per-user task, so Windows registers it without a prompt. The app removes the task when you switch back to **As it happens**.

**Can I see my day before the overnight run?**
Yes. Click **Analyze now** next to the waiting count in the Day view, or **Re-process today** under **Today's captures** in Settings. Live capture pauses while that pass runs.

**Will it slow down my PC during the day?**
With **Overnight** selected, the model work waits for the window, so daytime use is limited to taking screenshots. With **As it happens**, analysis runs while you work and uses your CPU or GPU.

## Related

- [How to find something you saw on your Windows PC in 2026 without taking notes](/articles/how-to-find-something-you-saw-on-your-windows-pc-in-2026-without-taking-notes/)
- [How to write a weekly work update from saved Windows activity in 2026](/articles/how-to-write-a-weekly-work-update-from-saved-windows-activity-in-2026/)
- [How to use your NVIDIA GPU for local AI on Windows in 2026](/articles/how-to-use-your-nvidia-gpu-for-local-ai-on-windows-in-2026/)

[Download Off Grid AI Desktop for Windows](/desktop/) | [Explore Pro](/pro/)
