---
layout: content
title: "How to Get To-Dos From Your Workday With the Exact Quote Behind Each One on Windows in 2026"
description: "Off Grid AI Desktop Pro on Windows turns real asks in your chats, calls and voice notes into to-dos, each with the exact words that created it."
date: "2026-10-28"
permalink: /articles/how-to-get-to-dos-from-your-workday-with-the-exact-quote-behind-each-one-on-windows-in-2026/
published_at: "2026-10-28T09:52:15Z"
article_topic: "Work & organization"
article_platform: "Windows"
devto_article: true
---
Someone asks you for the deck in a Teams chat, a client asks for a revised quote on a call, and you promise a colleague a review while dictating a note. By evening those asks are scattered across three apps. Off Grid AI Desktop Pro on Windows reads your day with a model on your PC and turns those asks into to-dos. Each to-do carries the exact words that created it, so you can check where it came from before you act on it.

The app only keeps a to-do when the model can point at a sentence that is really in the text, and you decide which suggestions become tasks.

## What you need

- A Windows PC with Off Grid AI Desktop 0.0.55 or later. Cited to-dos are in the current stable release. [Download Off Grid AI Desktop for Windows](/desktop/).
- Off Grid AI Pro. Screen capture, meetings and the **Actions** screen are Pro features. Pro is monthly or a one-time lifetime price; the [Pro page](/pro/) shows today's price.
- A local model downloaded in the app. Screen capture on Windows reads each saved moment with a vision model, so download one if you want to-dos from what was on screen. An NVIDIA GPU makes each pass faster.
- At least one source turned on: screen capture in **Replay**, a recorded call in **Meetings**, a voice note in **Voice**, or a tool you connected.

## How a to-do earns its place

Every candidate passes the same checks in code before you see it:

- **It must quote the source.** The model has to copy the sentence it relied on, and the app checks that this quote appears in the captured text. A quote shorter than eight characters is rejected, because one word proves nothing.
- **It must be yours.** Only an ask made to you, a promise you made, or something you asked another person to do is kept. A task that belongs to someone else is dropped.
- **A delegated ask must name who it waits on.** If you wrote "can you send the file?" to Priya, the to-do waits on Priya. If the app cannot tell who, it does not guess.
- **Lists are not conversations.** A capture that names more than four people or projects, such as an inbox or a chat list, produces no to-dos. Instructions you type to an AI tool or a terminal are not your tasks either.
- **In a call, the speaker counts.** Meeting transcripts label lines as you or them. A to-do from a call must come from one speaker's line, and an ask you hand to someone else must be something you said.

Automatic to-dos arrive as suggestions. Nothing goes onto your list until you accept it.

## Step 1: Review suggestions in Actions

1. Open Off Grid AI Desktop and click **Actions** in the sidebar, under **Work**.
2. Make sure the top switch is on **To do**, not **Approvals**.
3. Pick **suggested** in the row of status tabs: **suggested**, **open**, **waiting on**, **done**, **dismissed**. Each tab shows a count when it has items.
4. Each suggestion is a row in a table with the columns **To do**, **Who**, **Waiting on**, **Source**, **Due** and **When**. A column only appears when at least one row has that fact. Click any column header to sort by it.

## Step 2: Check the quote behind a to-do

Click the to-do's text. A panel opens under the row, headed **Based on** and the app it came from, for example Microsoft Teams or Outlook. It shows the quoted sentence, then a short summary of that moment with the time it happened.

This is the part to read. If the quote says "can you send me the revised numbers by Thursday", the to-do and its due date should match it. A deadline is only filled in when the source states one, copied as written, such as "by Thursday" or "EOD".

The **Who** chip appears only for a person or project the app has real evidence for. Click the chip to see all to-dos for that person.

## Step 3: Accept or dismiss

On the right of each suggested row there are two icon buttons. Hover over them to see their names.

1. Click **Accept** (the check icon) to move the suggestion to **open**, or to **waiting on** if the ask is for someone else.
2. Click **Dismiss** (the X icon) to drop it. A field opens: "Why isn't this a priority? (optional - Off Grid AI learns from it)". Type a reason such as "newsletter asks are not tasks" and the button changes to **Dismiss & teach**. Press Enter to submit or Esc to cancel.

A dismissed to-do is not suggested again. If the same ask shows up later in a new email, chat or recording, the app attaches it to the dismissed one instead of making a new suggestion. The same is true of a to-do you marked done. If you change your mind, open the **dismissed** tab and click **Restore**.

The reasons you type are added to the list of things the model is told to skip the next time it reads your day.

## Step 4: Work the list

On the **open** tab:

- Click the circle on the left of a row to mark it done. Click it again to mark it not done.
- Click the thumbs-up (**Prioritize**, "I prioritize this") to tell the app this kind of task matters to you.
- To add something the app missed, type in the field "Jot a to-do. Off Grid AI sets its priority and due date." and press Enter or click **Add**. A to-do you type goes straight to **open**, even if you dismissed the same text before.
- Use **Find** next to the tabs to filter the list by text.

Things you asked others to do sit on the **waiting on** tab, with the person in the **Waiting on** column.

The **Day** screen also has a **To do** block with the same rows. Click the open icon on a row to jump to it in **Actions**.

## Step 5: Clean up to-dos from before the rules

If you used Pro before 0.0.55, your history may hold to-dos made under looser rules. After you update, the app can show a dialog titled **Tidy up your timeline, people and to-dos**. It is built from a read-only check of your data, so the numbers you see are what will change before anything changes.

It lists, for example, how many automatic to-dos will wait in **Suggested** for you to accept, how many instructions to AI tools and repeats are set aside, and how many to-dos from screens you already deleted are removed. Your own edits, and the to-dos you marked done or dismissed, stay. Anything set aside can be restored.

Click **Tidy up** to apply it, or **Not now** to keep things as they are. The app asks again on a later launch until you accept.

## What this does not do

- **It does not catch every ask.** The rules are strict on purpose: discussion, advice, ideas and vague asks like "look into it" are left out. When in doubt the model is told not to extract. Use **Jot a to-do** for anything it misses.
- **It does not read a whole long capture.** A screen moment is read up to its first 4,000 characters. A long call transcript is read in parts, up to about the first 19,500 characters.
- **It does not see what was never captured.** Paused capture, apps you excluded, and calls you did not record produce nothing.
- **It does not send your day to a server by default.** The reading runs on a local model on your PC. If you have no local model and selected a remote chat server in the app, capture uses that server instead.

## FAQ

**How do I get to-dos from Microsoft Teams chats automatically on Windows?**
Turn on screen capture in **Replay** in Off Grid AI Desktop Pro and download a local vision model. When a Teams message asks you for something, a suggestion appears in **Actions** with the message quoted under **Based on**.

**Why did an ask I saw not become a to-do?**
The quote has to match the captured text exactly, the task has to be yours or delegated by you, and inbox or chat list views are skipped. A short or vague ask is also left out. Add it yourself with **Jot a to-do**.

**Will a dismissed to-do come back?**
No. A later sighting of the same ask is attached to the dismissed one and stays dismissed. You can bring it back with **Restore** on the **dismissed** tab.

**Does it work offline?**
Yes, once Pro is active and a local model is downloaded. Extraction, quoting and the Actions screen run on your PC.

**Can it make to-dos from meetings?**
Yes. A recorded call in **Meetings** is transcribed on your PC, and asks made to you or by you become suggestions with the speaker's line quoted.

## Related

- [How to see today's meetings and to-dos together in Off Grid AI on Windows in 2026](/articles/how-to-see-todays-meetings-and-to-dos-together-in-off-grid-ai-on-windows-in-2026/)
- [A private Microsoft Recall alternative on Windows in 2026](/articles/a-private-microsoft-recall-alternative-on-windows-in-2026-local-ai-reviews-your-day-overnight/)
- [How to get automatic Microsoft Teams meeting notes on Windows in 2026](/articles/how-to-get-automatic-microsoft-teams-meeting-notes-on-windows-in-2026/)

[Download Off Grid AI Desktop for Windows](/desktop/) | [Explore Pro](/pro/)
