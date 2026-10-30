---
layout: content
title: "How to Get To-Dos From Your Workday With the Exact Quote Behind Each One on Linux in 2026"
description: "Off Grid AI Desktop Pro on Linux turns real asks in your chats, calls and voice notes into to-dos, each with the exact words behind it."
date: "2026-10-30"
permalink: /articles/how-to-get-to-dos-from-your-workday-with-the-exact-quote-behind-each-one-on-linux-in-2026/
published_at: "2026-10-30T12:49:35Z"
article_topic: "Work & organization"
article_platform: "Linux"
devto_article: true
devto_id: 4947506
devto_url: "https://dev.to/alichherawalla/how-to-get-to-dos-from-your-workday-with-the-exact-quote-behind-each-one-on-linux-in-2026-eo0"
---
A teammate asks for the release notes in Slack, a client asks for a revised estimate on a call, and you promise a review in a Thunderbird reply. By the end of the day those asks sit in three apps and one of them gets lost. Off Grid AI Desktop Pro on Linux reads your day with a model on your own computer and turns those asks into to-dos. Each to-do carries the exact sentence that created it, so you can see where it came from before you act on it.

The app keeps a to-do only when the model can point at a sentence that is really in the captured text. You decide which suggestions become tasks.

## What you need

- A 64-bit Linux computer with Off Grid AI Desktop 0.0.55 or later, from the AppImage or the deb package. Cited to-dos are in the current stable release. [Download Off Grid AI Desktop for Linux](/desktop/).
- Off Grid AI Pro. Screen capture, meetings and the **Actions** screen are Pro features. Pro is monthly or a one-time lifetime price; the [Pro page](/pro/) shows today's price.
- A local vision model downloaded in the app. On Linux, each saved screen moment is read by a vision model, so this is required for to-dos from what was on screen. An NVIDIA GPU with the CUDA engine reads each moment faster. See [how to use your NVIDIA GPU for local AI on Linux](/articles/how-to-use-your-nvidia-gpu-for-local-ai-on-linux-in-2026/).
- At least one source turned on: screen capture in **Replay**, a recorded call in **Meetings**, a voice note in **Voice**, or a tool you connected.

## Step 1: Turn on capture and choose when it reads your day

1. Open Off Grid AI Desktop and turn on screen capture in **Replay**.
2. On GNOME with Wayland, the Ubuntu default, the app installs a small GNOME Shell extension, **Off Grid AI Capture**, so it can tell which window is in focus. If the app asks you to enable it, open **Extensions** and turn it on.
3. The app asks **When should Off Grid analyze your day?** Pick **Overnight (recommended)** to keep your computer fast during the day, or **As it happens** to see suggestions while you work.

With **Overnight**, analysis runs from 3:00 to 8:00 and suggestions are waiting in the morning. To wake the computer from suspend, the app installs a systemd timer, so Linux asks for your password once through pkexec.

Keep the app running. On Linux, closing the last window quits Off Grid AI Desktop, and a closed app reads nothing. Minimize it instead.

## How a to-do earns its place

- **It must quote the source.** The model copies the sentence it relied on, and the app checks that this quote appears in the captured text. A quote shorter than eight characters is rejected, because one word proves nothing.
- **It must be yours.** Only an ask made to you, a promise you made, or something you asked another person to do is kept. A task that belongs to someone else is dropped.
- **A delegated ask names who it waits on.** If you wrote "can you send the logs?" to Priya in Element, the to-do waits on Priya. If the app cannot tell who, it does not guess.
- **Lists are not conversations.** A capture that names more than four people or projects, such as an inbox or a channel list, produces no to-dos. Commands you type into a terminal or an AI tool are not your tasks either.
- **In a call, the speaker counts.** Meeting transcripts label each line as you or them. A to-do from a call must come from one speaker's line.

Automatic to-dos arrive as suggestions. Nothing goes onto your list until you accept it.

## Step 2: Review suggestions in Actions

1. Click **Actions** in the sidebar, under **Work**.
2. Make sure the top switch is on **To do**, not **Approvals**.
3. Pick **suggested** in the row of status tabs: **suggested**, **open**, **waiting on**, **done**, **dismissed**. Each tab shows a count when it has items.
4. Each suggestion is a row with the columns **To do**, **Who**, **Waiting on**, **Source**, **Due** and **When**. A column appears only when at least one row has that fact. Click a column header to sort by it.

## Step 3: Check the quote behind a to-do

Click the to-do's text. A panel opens under the row, headed **Based on** and the app it came from, for example Slack or Firefox. It shows the quoted sentence, then a short summary of that moment with the time it happened.

Read the quote first. If it says "can you send me the revised estimate by Friday", the to-do and its due date should match it. A deadline is filled in only when the source states one, copied as written, such as "by Friday" or "EOD".

The **Who** chip appears only for a person or project the app has real evidence for. Click it to see every to-do for that person.

## Step 4: Accept or dismiss

On the right of each suggested row there are two icon buttons. Hover over them to see their names.

1. Click **Accept** (the check icon) to move the suggestion to **open**, or to **waiting on** if the ask is for someone else.
2. Click **Dismiss** (the X icon) to drop it. A field opens: "Why isn't this a priority? (optional - Off Grid AI learns from it)". Type a reason, such as "CI notifications are not tasks", and the button changes to **Dismiss & teach**. Press Enter to submit or Esc to cancel.

A dismissed to-do is not suggested again. If the same ask shows up later in a new message or recording, the app attaches it to the dismissed one instead of making a new suggestion. To bring one back, open the **dismissed** tab and click **Restore**.

## Step 5: Work the list

On the **open** tab:

- Click the circle on the left of a row to mark it done. Click it again to undo.
- Click the thumbs-up (**Prioritize**, "I prioritize this") to tell the app this kind of task matters to you.
- To add something yourself, type in the field "Jot a to-do. Off Grid AI sets its priority and due date." and press Enter or click **Add**. A to-do you type goes straight to **open**.

Asks you handed to others sit on the **waiting on** tab, with the person in the **Waiting on** column.

## Step 6: Get to-dos from calls

In **Meetings**, record a call from Zoom, Google Meet or Teams in the browser. On Linux the recorder uses PipeWire for screen and system sound, with your microphone on its own track. On Wayland, your desktop shows its own screen sharing prompt; pick the screen with the call. The call is transcribed on your computer, and asks made to you or by you become suggestions with the speaker's line quoted.

## Step 7: Clean up older to-dos

If you used Pro before 0.0.55, your history may hold to-dos made under looser rules. After you update, the app can show a dialog titled **Tidy up your timeline, people and to-dos**. It is built from a read-only check of your data, so you see the counts before anything changes. Your own edits, and the to-dos you marked done or dismissed, stay, and anything set aside can be restored.

Click **Tidy up** to apply it, or **Not now** to keep things as they are.

Your screen history and to-dos stay on your Linux computer, and with a local model the reading runs there too. Apps you add under **Excluded apps** are never saved. See [how to keep sensitive apps out of saved screen history on Linux](/articles/how-to-keep-sensitive-apps-out-of-saved-screen-history-in-off-grid-ai-on-linux-in-2026/).

## FAQ

**How do I get to-dos from Slack messages automatically on Linux?**
Turn on screen capture in **Replay** in Off Grid AI Desktop Pro and download a local vision model. When a Slack message asks you for something, a suggestion appears in **Actions** with the message quoted under **Based on**.

**Does it work on Wayland?**
Yes. On GNOME with Wayland, the app installs the **Off Grid AI Capture** extension to see the focused window. Turn it on in **Extensions** when the app asks.

**Why did an ask I saw not become a to-do?**
The quote has to match the captured text, the task has to be yours or delegated by you, and inbox or channel list views are skipped. If you chose **Overnight**, suggestions appear after the 3:00 to 8:00 run. Add anything missing with **Jot a to-do**.

**Does it work offline?**
Yes, once Pro is active and a local model is downloaded. Capture, extraction, quoting and the **Actions** screen run on your computer.

## Related

- [A private Microsoft Recall alternative on Linux in 2026](/articles/a-private-microsoft-recall-alternative-on-linux-in-2026-local-ai-reviews-your-day-overnight/)
- [How to record and transcribe meetings on Linux in 2026 without cloud processing](/articles/how-to-record-and-transcribe-meetings-on-linux-in-2026-without-cloud-processing/)
- [How to create a private work journal from your Linux desktop activity in 2026](/articles/how-to-create-a-private-work-journal-from-your-linux-desktop-activity-in-2026/)

[Download Off Grid AI Desktop for Linux](/desktop/) | [Explore Pro](/pro/)
