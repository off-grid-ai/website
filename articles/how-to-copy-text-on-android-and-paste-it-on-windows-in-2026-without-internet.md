---
layout: content
title: "How to Copy Text on Android and Paste It on Windows in 2026 Without Internet"
description: "Send selected Android text to your Windows PC over your local network, then paste it into an app. Set up clipboard sync and use the supported Android handoff."
date: "2026-09-29"
permalink: /articles/how-to-copy-text-on-android-and-paste-it-on-windows-in-2026-without-internet/
published_at: "2026-09-29T08:32:49.193Z"
article_topic: "Sync & sharing"
article_platform: "Across devices"
devto_article: true
devto_id: 4769768
devto_url: "https://dev.to/alichherawalla/how-to-copy-text-on-android-and-paste-it-on-windows-in-2026-without-internet-152h"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2Ft2eo9q93wvumuxznyxww.png"
---
You find an address, a quote or a useful sentence on your Android phone. You need it on your Windows PC, but sending yourself a message adds another copy and another step. A direct clipboard connection lets you move that text over your own network.

You can move text from Android to your Windows PC without emailing it or using cloud storage. OGAM (Off Grid AI Mobile) sends text to OGAD (Off Grid AI Desktop) over your paired local connection. On Android, select text and choose **Copy to Off Grid AI**; on your Windows PC, paste it with **Ctrl+V**.

[Get OGAM on Google Play](https://play.google.com/store/apps/details?id=ai.offgridmobile) | [Download OGAD](https://getoffgridai.co/desktop/)

<div style="width: 100%;">
  <img width="320" alt="The Sync screen in OGAM on iPhone, shown here paired with a Mac over Wi-Fi: 2 of 5 devices saved, and Sharing, Activity and Files below." src="https://getoffgridai.co/assets/img/home/mobile/sync-ios-1-light-640.webp" />
</div>

---

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@offgridmobileai.co](mailto:support@offgridmobileai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

The Android action matters. Android restricts ordinary apps from reading another app's clipboard in the background. This guide uses an explicit selected-text handoff. It does not promise that pressing the normal Copy button in every Android app will silently sync its contents.

## What do you need before copying text between devices?

Install OGAM and OGAD, activate Pro, and pair your Android phone with your Windows PC. Keep them connected to the same local network. Complete installation and licence setup while internet is available; the text transfer itself can then use a network without internet.

The procedure uses OGAM 0.0.111 and OGAD 0.0.51. It transfers text and does not require an AI model to generate an answer.

If you have not paired the devices:

1. Open **Devices** in OGAD and make the computer discoverable.
2. Select **Show QR Code**.
3. On Android, open **Settings → Sync** in OGAM.
4. Use **Scan pairing QR code** and scan the computer's code. You can also select the computer from the device list and enter its pairing code.
5. Wait for connected status on both devices.

Keep both apps open during the first test. A saved device can still be offline.

## How do you enable copied-text sharing?

Turn on **Copied text** in the sharing settings on both devices. On the computer, also check that receiving rules allow copied text from the phone. These are separate from ordinary local clipboard history and from the chat sync that pairing provides.

1. In OGAM, open **Sync → Sharing**.
2. Under **Sending**, enable **Copied text**. Android's description says: “Select text, then choose Copy to Off Grid AI.”
3. In OGAD, open **Devices → Sharing**.
4. Enable **Sending** and **Copied text**. The clipboard sync control is needed for the clipboard connection, including accepting its messages.
5. Under **Receiving**, allow optional data and check that **Copied text** is allowed. If you have a rule for this particular phone, check that rule too.

Pair only devices you trust with the shared data. Chats and projects are part of the paired workspace as well; pairing is broader than enabling a one-off clipboard transfer.

## How do you send text from Android and paste it on your Windows PC?

Use a short test phrase first. Send it through the Android selection menu, return to OGAM so the handoff can be processed, then paste it into a text editor on your computer.

1. On Android, open an app with selectable text.
2. Select a harmless phrase, such as “Bring the blue notebook.”
3. Open the selection menu. If needed, use its additional-actions menu.
4. Choose **Copy to Off Grid AI**.
5. Return to OGAM and leave it open while the paired devices are connected.
6. On your Windows PC, place the cursor in a text field and press **Ctrl+V**.
7. Check that the selected phrase appears.

The receiver writes the accepted text to the computer's clipboard. If another copy operation has replaced it, open **Clipboard** in OGAD, select the received entry and use **Copy**. Then paste into the target app again.

You can also open the quick clipboard with **Ctrl+Shift+C**. Selecting an older item is useful when you have copied something else since the phone sent its text. Pasting into a particular app can depend on focus and permissions, so the explicit Copy-then-paste route is a useful check.

## Why is Copy to Off Grid AI missing from the Android menu?

The source app must expose Android's selected-text actions. Some custom text fields and app interfaces do not. Try the test in an app with a normal selectable text field, and make sure OGAM is installed and current.

Choosing the normal **Copy** action is not equivalent to choosing **Copy to Off Grid AI**. The dedicated action sends exactly the selection through Android's supported handoff. It is a plain-text workflow, not an image, file or full formatted-document transfer.

## What should you check if pasting shows old text?

| What you see | What to check |
|---|---|
| The original text is still on the computer clipboard | Check that the devices show connected status and that Copied text is enabled on both |
| The Android action ran but nothing arrives | Bring OGAM to the foreground so it can process the selected-text handoff |
| Other sync works but copied text does not | Check the computer's optional Receiving rules and the phone-specific rule |
| The right entry is in OGAD but normal paste shows something else | Select that entry, choose Copy and paste again |
| No device connection | Check the local network, discovery controls and whether the computer is awake |
| The source app offers no action | Test another app with a standard text-selection menu |

If the Windows PC is visible but cannot connect, check **Windows Security → Firewall & network protection → Allow an app through firewall**. Allow OGAD on the trusted network you use for sync. Keep the firewall enabled. [Microsoft explains the app-specific controls](https://support.microsoft.com/en-us/windows/security/windows-security/firewall-and-network-protection-in-the-windows-security-app).

## Can you use this without mobile data or home internet?

Yes, after setup, with a working local network between the devices. Turn off mobile data on Android for a clear test and keep local Wi-Fi enabled. The router does not need an internet connection to carry traffic between devices that it can connect locally.

The devices must remain reachable. If you leave the local network, this connection cannot carry new text until they reconnect.

[Install OGAM on Android](https://play.google.com/store/apps/details?id=ai.offgridmobile) and [get OGAD for your Windows PC](https://getoffgridai.co/desktop/). Pair them, send one selected phrase, and paste it into a text editor. That first transfer gives you a direct route for the text you usually send to yourself.
