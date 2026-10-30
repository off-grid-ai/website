---
layout: content
title: "How to Prepare for Every Meeting Automatically on Linux in 2026 (Private Local AI)"
description: "See who is in each meeting, what you last discussed and what is still open, in one click on your Linux computer."
date: "2026-10-30"
permalink: /articles/how-to-prepare-for-every-meeting-automatically-on-linux-in-2026-private-local-ai/
published_at: "2026-10-30T06:55:00Z"
article_topic: "Work & organization"
article_platform: "Linux"
devto_article: true
devto_id: 4945434
devto_url: "https://dev.to/alichherawalla/how-to-prepare-for-every-meeting-automatically-on-linux-in-2026-private-local-ai-2fap"
---
You have a call in five minutes. You want to know who is on it, which company or project it is about, what you talked about last time, and what you still owe them. On Linux, Off Grid AI Desktop Pro puts all of that next to the meeting in your calendar. Click **Prep** and it is there. You do not write a prep document. The app builds the context from the mail, chats and calls it has already seen on your computer.

## What you need

- A 64-bit Linux computer with Off Grid AI Desktop 0.0.55 or later, from the AppImage or the deb package. The Meetings calendar and Prep are in the current stable release. [Download Off Grid AI Desktop for Linux](/desktop/).
- Off Grid AI Pro. Meetings, capture and Prep are Pro features. Pro is monthly or a one-time lifetime price; the [Pro page](/pro/) shows today's price.
- A Google account with your calendar, or a calendar you open on screen while capture is on.
- A local model downloaded in the app, so capture can read your work into people, companies and to-dos. An NVIDIA GPU with the CUDA engine reads faster. See [how to use your NVIDIA GPU for local AI on Linux](/articles/how-to-use-your-nvidia-gpu-for-local-ai-on-linux-in-2026/).

## What Prep shows

Each meeting's prep has four parts:

| Section | What it shows |
|---|---|
| **Who** | The people in the meeting, matched by email address first and then by name. You are left out, so prep is about the other people. |
| **About** | The companies and projects the meeting is about: those named in its title, and up to three your attendees are seen with at least three times. |
| **Recently discussed** | Your latest conversations with those people: mail, chats and recorded meetings, one line per source, newest first. |
| **Open items** | Open to-dos linked to those people, with a due date when one is known. |

Prep is a lookup in the database on your computer. It does not run a model when you click, so it opens straight away. A link between a person and a company needs three pieces of evidence, so one stray mention does not put the wrong company in your prep.

## Step 1: Bring your calendar into Off Grid AI

1. Open Off Grid AI Desktop and go to **Integrations**.
2. On the **Google** card (Gmail, Calendar, Drive, Contacts), click **Connect**.
3. Under **Choose what to connect**, turn on **Calendar**. Turn on **Gmail** too if you want your mail threads in **Recently discussed**.
4. Under **Connection option**, pick **Connect with Off Grid AI**. You do not need your own Google Cloud project. If you have one, pick **Use your own application**.
5. Your browser opens. Sign in to Google and allow access.

The app pulls your calendar on its own schedule while it runs. To pull it now, open the Google connection in **Integrations** and click the **Sync recent** button. When an event is cancelled, declined or deleted in Google Calendar, the next sync removes it from Off Grid AI too.

Calendar sync uses the internet to reach Google. Prep itself runs on your Linux computer.

If you do not want to connect Google, there is a second path. With capture on, when you open a calendar on screen, such as Google Calendar in your browser, the local model reads the upcoming events off the screen and adds them.

## Step 2: Let capture learn who you work with

Prep is only as good as what Off Grid AI has seen. Capture saves your screen as you work, and a local model turns it into people, companies, projects and to-dos. People come from real conversations only, not from every name on a page.

1. Click **Replay** in the sidebar.
2. If it shows **Paused**, click **Resume capture**. It should then show **Capturing**.
3. On GNOME with Wayland, the default on Ubuntu, the app uses a small GNOME Shell extension, **Off Grid AI Capture**, to see which window is in focus. If the app asks, open **Extensions** and turn it on.

Keep apps you never want saved, such as a password manager, under **Excluded apps**. See [how to keep sensitive apps out of saved screen history on Linux](/articles/how-to-keep-sensitive-apps-out-of-saved-screen-history-in-off-grid-ai-on-linux-in-2026/).

Recorded calls feed prep too. When you record a meeting on Linux, its transcript counts as a conversation with the people in it. See [how to record and transcribe meetings on Linux](/articles/how-to-record-and-transcribe-meetings-on-linux-in-2026-without-cloud-processing/).

## Step 3: Open the Meetings calendar

1. Click **Meetings** in the sidebar.
2. At the top right, switch the view from **Recorded** to **Calendar**.
3. The calendar opens in **Week**. Switch to **Day** or **Month** as you like, and click **Today** to come back to the current date.

Each meeting from your calendar sits in its time slot.

## Step 4: Click a meeting to see its prep

1. Click a meeting in the calendar.
2. A panel opens to the right of the grid with that meeting and its prep: **Who**, **About**, **Recently discussed** and **Open items**.
3. Click a name or a company to open everything Off Grid AI knows about it.
4. When the event has a video call link, the row shows **Join**. Click it to open the call. Without a call link, the row opens the event in Google Calendar.
5. Click the same meeting again to close the panel.

You can also start from your day. On the **Day** page, each meeting in today's calendar has a **Prep** button. Click it and Off Grid AI opens the Meetings calendar on that day with the prep panel open.

If prep is empty, the panel says "No prior context found for this one yet." That means Off Grid AI has not seen these people in a conversation. It fills in as capture and your recorded calls add to it.

## Make prep sharper over time

- **Add attendees to invites.** Prep matches people by the email address on the event first. An invite with real attendees gives the best result.
- **Name the company or project in the title.** A meeting called "Acme renewal" brings up the company Acme even before you have spoken with the attendees.
- **Keep your to-dos honest.** Mark a to-do done when it is done, so **Open items** shows only what is still open.
- **Record the calls that matter.** A recorded call adds a line to **Recently discussed** for the next meeting with the same people.

## FAQ

**Is there a private meeting prep tool for Linux?**
Yes. Off Grid AI Desktop Pro runs on Linux from an AppImage or deb package and shows prep for each meeting in its calendar. The people, conversations and to-dos it uses are stored on your computer, and the lookup runs there.

**Does Off Grid AI work with Google Calendar on Linux?**
Yes. Connect Google under **Integrations**, turn on **Calendar** and sign in through your browser. Your events show in **Meetings > Calendar** and update on their own while the app runs.

**Do I need my own Google Cloud OAuth client?**
No. **Connect with Off Grid AI** signs you in without one. If your company requires its own client, pick **Use your own application** instead.

**Why is the prep for my meeting empty?**
Off Grid AI has not yet seen the attendees in mail, chat or a recorded call. Keep capture on and connect Gmail, and the next prep for the same people will have content.

**Does meeting prep work on Wayland?**
Yes. On GNOME with Wayland, turn on the **Off Grid AI Capture** extension when the app asks, so capture knows which window you are using. The calendar and prep panel work the same on X11 and Wayland.

**Does it slow down my computer before a call?**
No. Clicking a meeting reads from the local database and does not start a model. The model work happens as capture reads your screen, and you can move that to the night.

## Related

- [How to record and transcribe meetings on Linux in 2026 without cloud processing](/articles/how-to-record-and-transcribe-meetings-on-linux-in-2026-without-cloud-processing/)
- [A private Microsoft Recall alternative on Linux in 2026](/articles/a-private-microsoft-recall-alternative-on-linux-in-2026-local-ai-reviews-your-day-overnight/)
- [How to search chats, meeting notes and screen history together on Linux](/articles/how-to-search-chats-meeting-notes-and-screen-history-together-in-off-grid-ai-on-linux-in-2026/)

[Download Off Grid AI Desktop for Linux](/desktop/) | [Explore Pro](/pro/)
