---
layout: default
title: "How to Keep Recording a Mac Meeting When You Switch Apps in Off Grid AI in 2026"
description: "Keep an agreed Mac meeting recording active while you open notes or a document, and stop it explicitly when you are finished."
date: "2026-09-29"
permalink: /articles/how-to-keep-recording-a-mac-meeting-when-you-switch-apps-in-off-grid-ai-in-2026/
article_category: "Desktop"
devto_article: true
devto_id: 4771137
devto_url: "https://dev.to/alichherawalla/how-to-keep-recording-a-mac-meeting-when-you-switch-apps-in-off-grid-ai-in-2026-j9g"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2F4hnquony28gikel7mb42.png"
---
You leave the meeting window to check a document, then worry that the recording stopped while you were away.

OGAD (Off Grid AI Desktop) Pro has a meeting setting that keeps recording while you work in another app. Use **Keeps recording when away** when you need that continuity, watch the visible recording state, and select **Stop** when the agreed recording is finished.

[Download OGAD for Mac](https://getoffgridai.co/desktop/) | [Beta 0.0.52-beta.103](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.52-beta.103)

![OGAD desktop chat interface](https://getoffgridai.co/assets/img/desktop-chat.png)

---

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@offgridmobileai.co](mailto:support@offgridmobileai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

## Does switching apps have to stop the recording?

No. The linked Mac beta defaults to keeping a meeting recording active when call presence is no longer detected. You can review a spreadsheet, take notes or open a reference page without choosing the optional stop-when-away behavior.

That setting controls when the recording ends. It does not guarantee that every recording source survives a disconnected display, a closed window or a system interruption. Check the saved media after a short first run with the apps you use.

## Prepare the meeting recording

Use OGAD Pro on a supported Mac. Complete microphone and screen-recording permissions through **Settings → Setup & health → System permissions**. Prepare local transcription and text models if you want the later transcript and summary processed on the Mac.

With Pro running and recording permissions granted, detected supported calls can start recording automatically. **Record meeting** provides a manual start. Use the visible state and get participants' agreement before recording. An online call still needs its usual network connection.

## Keep the recording running while you work

1. Open **Meetings** before the call.
2. Look for **Keeps recording when away**. If the control says **Stops when you leave**, select it to switch back.
3. Start or join your agreed recording and check the timer and **Stop** control.
4. Open the notes or reference app you need, then return to Meetings to check the state.
5. Select **Stop** when finished. Wait for the saved recording and later processing.

Do not rely on closing the call to stop a recording in this mode. The released policy also has a four-hour maximum; it is not intended as an unlimited recording session.

## When should you use Stops when you leave?

Use it when you prefer the app to stop after it can no longer confirm that you are in the call. The released policy waits five minutes, warns, and allows a further 20 seconds before stopping. Returning to the detected call can clear that warning.

This is a detection policy, not exact knowledge of whether the meeting has ended. An app switch or an unusual call window can change what the detector sees. Choose the policy that fits your work, then check the visible state.

## Check continuity before a long meeting

For a short agreed check, record a spoken sentence, switch to your reference app, then return and say another sentence. Stop and play the saved media. Confirm that the parts you need are present before relying on the setup for an important call.

A timer confirms that the app considers recording active; it does not prove that both microphone and call audio are audible. Check those separately in playback.

With local model selections, the later transcript and summary use local processing. A remote provider changes that processing path. A generated summary can also omit details, so use the recording or transcript to check important decisions.

[Download OGAD for Mac](https://getoffgridai.co/desktop/), choose the away behavior you want, and make a short recording while you switch to your normal notes app.
