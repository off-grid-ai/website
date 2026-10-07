---
layout: content
title: "How to Automatically Delete Old Dictation Recordings in Off Grid AI on Your Mac in 2026"
description: "Set age and count limits for Off Grid AI’s Voice library on Mac, and understand what automatic cleanup removes."
date: "2026-09-29"
permalink: /articles/how-to-automatically-delete-old-dictation-recordings-in-off-grid-ai-on-your-mac-in-2026/
published_at: "2026-09-29T11:37:14.756Z"
article_topic: "Voice & audio"
article_platform: "Mac"
devto_article: true
devto_id: 4771131
devto_url: "https://dev.to/alichherawalla/how-to-automatically-delete-old-dictation-recordings-in-off-grid-ai-on-your-mac-in-2026-5c2f"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2Fav07m9wotsgsehmu5xn7.png"
---
Your dictation library is useful when a paragraph needs another look. It becomes less useful when it keeps months of audio you no longer need.

OGAD (Off Grid AI Desktop) Pro lets you set both an age limit and a recording count for its **Voice** history. It applies those rules during supported recording operations, removing expired records and their retained audio. You can keep a short recovery window without choosing every old entry by hand.

[Download OGAD for Mac](https://getoffgridai.co/desktop/) | [Beta 0.0.52-beta.103](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.52-beta.103)


![Off Grid AI brand artwork](https://getoffgridai.co/assets/cover.png)

---

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@offgridmobileai.co](mailto:support@offgridmobileai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

## What do the two limits control?

**Keep** limits the number of recordings. **Auto-delete** limits their age. When both are set, an entry can be removed by either rule.

| Control | Available choices |
|---|---|
| Keep | 50, 100, 200, 500 or Unlimited |
| Auto-delete | 7 days, 30 days, 90 days or Never |

For example, **Keep: 100** and **Auto-delete: 30 days** retains at most the newest 100 records, and removes records older than 30 days when cleanup runs. A busy dictation day can reach the count limit before the age limit.

This guide uses the Mac Pro Voice library in the linked beta. It is not a cleanup setting for every audio file on your Mac.

## Set a useful recovery window

1. Open **Voice** and select **Voice settings**.
2. Go to **History**.
3. Choose a **Keep** count that covers the recordings you still expect to review.
4. Choose an **Auto-delete** age.
5. Review any important older entries before continuing your recording work.

Copy needed text or save a separate audio copy before it becomes eligible for removal. A retained recording is also what makes later playback or re-transcription possible. A shorter retention policy reduces that recovery window.

## When does automatic deletion happen?

The app applies retention when a new dictation or imported-file transcription completes. It is not a promise that a file disappears at an exact time while OGAD is closed or idle.

After the next supported operation completes, inspect the Voice library. If an old entry remains, check the chosen limits and whether the operation has finished. File errors can prevent deletion, so a configured policy alone is not proof that every eligible file was removed.

## What stays outside this policy?

The cleanup removes Voice recording records and audio retained in OGAD's Voice storage. It does not erase an original recording you imported from another folder, a copy you exported, or text already pasted into another app.

**Feed to memory** is a separate destination. If it created tasks or memory records from a transcript, review those records separately. Shortening Voice history does not promise removal of every derived item.

The same distinction applies to backups: a local library deletion is not a secure-erasure guarantee for old backup copies.

## Use a smaller history without losing useful work

Keep enough history to recover a failed paste or correct a recent transcript. Move text you need long term into the document where it belongs, then let Voice retain only the recent recordings you still want available.

[Open OGAD's Voice workflow](https://getoffgridai.co/desktop/), choose a count and an age, and check the oldest entries you still need before recording again.
