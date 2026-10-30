---
layout: content
title: "A Private Microsoft Recall Alternative on Linux in 2026 (Local AI Reviews Your Day Overnight)"
description: "Save your Linux screen as you work, then let a local model read it overnight. Your computer stays fast by day and your journal is ready by morning."
date: "2026-10-29"
permalink: /articles/a-private-microsoft-recall-alternative-on-linux-in-2026-local-ai-reviews-your-day-overnight/
published_at: "2026-10-29T16:46:02Z"
article_topic: "Privacy & control"
article_platform: "Linux"
devto_article: true
devto_id: 4942423
devto_url: "https://dev.to/alichherawalla/a-private-microsoft-recall-alternative-on-linux-in-2026-local-ai-reviews-your-day-overnight-14kf"
---
You want a searchable memory of your workday, and you use Linux. Microsoft Recall is Windows only, and it needs a Copilot+ PC. Off Grid AI Desktop Pro gives you the same kind of record on your Linux computer. It saves your screen as you work and leaves the heavy part, the AI analysis, for the night. By default the analysis runs from 03:00 to 08:00. A systemd timer can wake the computer from suspend to do it, and the model runs on the computer itself. In the morning, your **Day** view has the journal, timeline and to-dos from yesterday.

## What you need

- A 64-bit Linux computer with Off Grid AI Desktop 0.0.55 or later, from the AppImage or the deb package. Overnight analysis is in the current stable release. [Download Off Grid AI Desktop for Linux](/desktop/).
- Off Grid AI Pro. Screen capture and the Day view are Pro features. Pro is monthly or a one-time lifetime price; the [Pro page](/pro/) shows today's price.
- A local vision model downloaded in the app. On Linux, each saved frame is read by a vision model, so this is required. An NVIDIA GPU with the CUDA engine reads each frame faster, but overnight mode means speed matters less. See [how to use your NVIDIA GPU for local AI on Linux](/articles/how-to-use-your-nvidia-gpu-for-local-ai-on-linux-in-2026/).
- systemd and pkexec, for the nightly wake. Ubuntu, Fedora, Debian and most desktop distributions have both.
- A laptop plugged in at night.

## How it works

Capture has two halves. Taking a screenshot is light, so it runs all day. Reading each saved moment with a local model is heavy: one model pass per frame. Overnight mode splits them. Screenshots are saved to disk as you work and wait in a queue as pending. The model works through the queue inside the window you choose. Nothing is lost while they wait.

## Step 1: Turn on capture and choose Overnight

1. Open Off Grid AI Desktop and click **Replay** in the sidebar.
2. The capture status at the top shows **Paused**. Click **Resume capture**. If it already shows **Capturing**, go to Step 2 and pick **Overnight** there.
3. On GNOME with Wayland (the Ubuntu default), the app installs a small GNOME Shell extension, **Off Grid AI Capture**, so it can see which window is in focus. If the app asks you to enable it, open **Extensions** and turn it on. If it is not listed yet, sign out of Linux, sign in once, and turn capture on again.
4. The first time you turn capture on, the app asks: "When should Off Grid analyze your day?" There are two options:
   - **Overnight (recommended)**: your Linux computer stays fast all day, and the analysis runs at night and can wake it.
   - **As it happens**: "Your day appears as you go, using some power while you work."
5. Click **Overnight (recommended)**.
6. Linux asks for your password through pkexec. Enter it. The app needs root once to install a systemd timer.

The timer is named **offgrid-night-wake.timer**. It is set with `WakeSystem=true`, so systemd resumes the computer from suspend at the start of the window. Its service does nothing else; Off Grid AI Desktop does the work. The app only adds and removes its own two unit files in `/etc/systemd/system`.

You see this question once. To change your answer later, use Settings.

## Step 2: Change the hours in Settings

1. Click **Settings** in the sidebar.
2. Scroll to **Capture & processing**.
3. Find the **Analyze** row. If it reads "As it happens.", switch its control to **Overnight**. It then reads "Overnight. Your Linux computer wakes at 03:00 to do it."
4. Two time fields appear: **Analysis starts** and **Analysis ends**. Set them to hours you are away, such as 01:00 to 06:00. A window can cross midnight, such as 22:00 to 06:00.
5. To analyze during the day again, switch the control to **As it happens**. The app removes its systemd timer.

Each change to the hours rewrites the timer, so Linux asks for your password again.

If you close the password prompt, the row says "The password prompt was cancelled, so the computer will not wake on its own." If your system has no systemd or pkexec, it says "Linux did not accept the wake timer. It needs systemd and pkexec." In both cases the row then reads "Overnight, while your computer is awake." Analysis still runs in the window, as long as the computer is awake.

To check the timer from a terminal:

```bash
systemctl list-timers offgrid-night-wake.timer
```

## Step 3: Get your Linux computer ready for the night

- **Keep Off Grid AI Desktop running.** On Linux, closing the last app window quits the app. Minimize it instead. If the app is closed, nothing is analyzed.
- **Suspend, do not shut down.** The timer wakes the computer from suspend. A computer that is shut down stays off until you turn it on.
- **Plug in a laptop.** While frames wait inside the window, the app asks the system not to suspend again. When the queue is empty or the window ends, it lets the computer sleep.
- **Lock the screen if you like.** Locking stops new screenshots. It does not stop the analysis of frames already saved, which is what the overnight window is for.

If you paused capture yourself, the analysis waits too. The Day view says so instead of promising a run that will not happen.

## Step 4: Read your day in the morning

Click **Day** in the sidebar. The journal, timeline, time spent by app and to-dos come from what the model read overnight.

During the day, the Day view shows what is waiting, for example "42 moments waiting · analyzed tonight at 03:00". To see results now, click **Analyze now** (the play icon) next to that line. It analyzes today's pending frames straight away.

On a laptop on battery with **As it happens** selected, the Day view offers the switch once: "On battery. Analyze overnight instead?" Click **Overnight** to switch, or dismiss it.

## Check what happened overnight

In **Settings**, **Capture & processing** has a **Pipeline health** panel with **Screen access**, **Vision model**, **Frame queue**, **Last frame** and **Last observation**. The queue counts update as frames move.

If some frames failed, a panel reads, for example, "3 frames need another pass". It groups them by reason, with a count for each, and says how many retry on their own and how many need you. The frames stay saved, and a retry button sits next to them.

A frame can also be too large for the active model's context. Those show as waiting for a larger model. Raise the context or switch to a larger model, and the app reads them on its own.

Your screen history stays on your Linux computer. Apps you add under **Excluded apps** are never saved. For the full setup, see [how to keep sensitive apps out of saved screen history on Linux](/articles/how-to-keep-sensitive-apps-out-of-saved-screen-history-in-off-grid-ai-on-linux-in-2026/).

## FAQ

**Is there a Microsoft Recall alternative for Linux?**
Yes. Off Grid AI Desktop Pro saves a searchable screen history on Linux and reads it with a local vision model. The analysis runs on your computer, at night by default, and builds a daily journal, timeline and to-do list.

**Why does Off Grid AI ask for my password on Linux?**
The nightly wake is a systemd timer in `/etc/systemd/system`, and writing there needs root. The app asks through pkexec when you choose **Overnight**, change the hours, or switch back to **As it happens**.

**Why did my Linux computer not wake up for the analysis?**
Check that the computer was suspended, not shut down, and that Off Grid AI Desktop was still running. Then run `systemctl list-timers offgrid-night-wake.timer` to see that the timer is active and when it fires next.

**Does it work on Wayland?**
Yes. On GNOME with Wayland, the app uses its **Off Grid AI Capture** extension to read the focused window. Turn it on in **Extensions** when the app asks.

**Can I see my day before the overnight run?**
Yes. Click **Analyze now** next to the waiting count in the Day view, or **Re-process today** in **Capture & processing**. Live capture pauses while that pass runs.

**Will it slow down my computer during the day?**
With **Overnight** selected, the model work waits for the window, so daytime use is only the screenshots. With **As it happens**, the analysis runs while you work and uses your CPU or GPU.

## Related

- [How to find something you saw on your Linux computer in 2026 without taking notes](/articles/how-to-find-something-you-saw-on-your-linux-computer-in-2026-without-taking-notes/)
- [How to create a private work journal from your Linux desktop activity in 2026](/articles/how-to-create-a-private-work-journal-from-your-linux-desktop-activity-in-2026/)
- [How to write a weekly work update from saved Linux activity in 2026](/articles/how-to-write-a-weekly-work-update-from-saved-linux-activity-in-2026/)

[Download Off Grid AI Desktop for Linux](/desktop/) | [Explore Pro](/pro/)
