---
layout: content
title: "How to Keep Sensitive Apps Out of Saved Screen History in Off Grid AI on Linux in 2026"
description: "Control when OGAD records your Linux screen. Pause capture before sensitive work, check the visible state, and understand the built-in exclusions."
date: "2026-10-07"
permalink: /articles/how-to-keep-sensitive-apps-out-of-saved-screen-history-in-off-grid-ai-on-linux-in-2026/
published_at: "2026-10-07T21:13:36Z"
article_topic: "Getting started"
article_platform: "Linux"
devto_article: true
devto_id: 4814469
devto_url: "https://dev.to/alichherawalla/how-to-keep-sensitive-apps-out-of-saved-screen-history-in-off-grid-ai-on-linux-in-2026-5f8k"
image: "https://dev-to-uploads.s3.us-east-2.amazonaws.com/uploads/articles/qrls7b5cfwavm5i2yd4b.png"
---
You can keep a useful work history without recording every session. OGAD (Off Grid AI Desktop) gives you visible **Pause capture** and **Resume capture** controls for its automatic screen history. Pause before opening sensitive material, check the status, and resume when you return to work you want recorded.

[Download OGAD for Linux](https://getoffgridai.co/desktop/)

![Replay in Off Grid AI Desktop with Capture & processing open: capture running with a Pause capture button, and excluded apps such as Messages, Keychain Access, Banking and Notes (private).](https://getoffgridai.co/assets/img/home/app/capture-settings-light-1760.webp)

---

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@getoffgridai.co](mailto:support@getoffgridai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

## Prepare the Linux beta first

Use the x64 Linux AppImage or deb package from [beta 114](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.55-beta.114), with Pro active. This guide covers the Pro code included in that build. Earlier Linux betas did not expose the same feature set.

For screen-based history, prepare the local processing models, review **Settings > Setup & health**, and allow the capture request your desktop session presents. On Wayland, the desktop portal and your screen or window selection affect what can be captured. Desktop accessibility data depends on what your session and apps expose. Start with a short session before relying on a full day's record.

Choose **Resume capture** in **Replay** or **Settings > Capture** only when you want screen history retained. Check the visible **Capturing** state. Use **Pause capture** to stop new screen history. Clipboard, Vault, and imported calendar records are separate workflows; they do not require you to keep screen capture on.

The capture workflow is opt-in and part of Pro. It also has built-in exclusions for recognized sensitive surfaces. The practical first step is to know the capture state before opening something you want to keep outside that history.

## Start recording only when you choose

A new profile starts with screen capture paused. System access is a separate requirement from choosing to retain activity. You enable or resume it through OGAD's capture controls.

The app shows states such as **Capturing**, **Paused**, or a permission problem. Those states tell you whether to expect new history from your current work.

Use **Settings → Setup & health → System permissions** to review Linux permissions. Use Replay or the Capture section to control recording. These are separate choices: permission allows the capability, while the capture control determines whether you use it.

## Pause before the private task

If you are about to view a private document, handle credentials, or open a personal conversation you do not want recorded, pause capture first. Wait for the visible state to say Paused before opening the material.

That sequence is more useful than trying to remove individual screenshots after the event. You make the recording decision before the content appears.

A user pause stays in place until you resume it. Restarting the capture service is not meant to clear that privacy choice. When you finish the private task, return to OGAD and choose Resume capture only if you want new screen history again.

## What do the built-in exclusions do?

The capture policy skips recognized password-manager apps, certain system credential surfaces, identified private-browsing windows, and specific password-management URLs. It also avoids capturing OGAD's own windows.

These checks depend on the app name, available URL, or window title that the system reports. For example, a private-window check can recognize title markers such as Incognito or Private Browsing. That is not a guarantee that every browser, website, or custom app exposes a matching marker.

Treat built-in exclusions as helpful rules around known surfaces. Pause capture for sensitive material when you want an explicit recording boundary, especially inside a general browser or document app.

## Getting started with a safe check

Use a harmless test window to become familiar with the state change before relying on it during private work.

1. Open Replay in OGAD and inspect the capture status.
2. If capture is active, select **Pause capture**.
3. Wait for **Paused**.
4. Open a harmless test document and work in it briefly.
5. Return to OGAD and inspect the relevant period in Replay.
6. Select **Resume capture** when you want recording again.

The point of this check is to learn the controls and the history view. You do not need to open real secrets to test whether you understand the workflow.

If the app shows a permission or capture error, resolve it in the app before assuming the state. The visible status is more useful than whether the app is merely open in the background.

## Screen capture is one data source

Clipboard history, meeting recording, and manually added chat files have separate controls. Pausing screen capture does not mean a copied password cannot enter clipboard history, or that an active meeting recording has stopped.

Before a private task, think about how the information will enter the computer. If you will copy it, review clipboard capture. If you will speak it during a recording, review that recording. If you add a file to a chat, that is a deliberate input independent of screen capture.

The result is a clear set of source choices, rather than assuming one pause button disables every feature.

## What if the content was already captured?

Pausing stops future capture. It does not delete the history already saved. Review **Settings → Data & privacy** if you need to remove stored captures or related memory records.

Check the category before deleting. Screen images, derived notes, conversations, and files can be separate records. Backups and copies on other devices also require separate attention.

If the current work should stay local, choose local models for its processing. A recording exclusion controls what is captured; model selection controls where captured input is processed.

## Keep the history you want, when you want it

[Download OGAD for Linux](https://getoffgridai.co/desktop/) and learn the pause-and-resume flow with a harmless window. Then make capture state part of the transition into private work. You can retain useful context from the sessions you choose without treating every screen as something to remember.

## Add an app to the exclusion list

Open the capture settings panel and find **Excluded apps**. Add the app name and save the change. Check a harmless session with that app in the foreground before relying on the exclusion for private material. The saved setting applies to new captures; it does not remove frames already in Replay.

Use **Pause capture** when you need an immediate boundary or when the app is not recognized as expected. A whole browser exclusion can also remove useful work history from ordinary browser tasks, so choose the boundary that fits the work. An identified private window is not a guarantee that every custom browser window is classified correctly.



This guide covers **OGAD beta 0.0.55-beta.114**. The [release](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.55-beta.114) and [build record](https://github.com/off-grid-ai/OGAD/actions/runs/37334426829) identify the desktop version and its included Pro code. Setup details follow that code; they are not a device test.
