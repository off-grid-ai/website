---
layout: content
title: "How to Move AI Models to an External Drive in Off Grid AI in 2026 Without Downloading Them Again"
description: "Move managed AI model files to an external drive, restart safely, and verify the new storage path before cleaning up."
date: "2026-10-13"
permalink: /articles/how-to-move-ai-models-to-an-external-drive-in-off-grid-ai-in-2026-without-downloading-them-again/
published_at: "2026-10-13T09:19:35Z"
article_topic: "Models & performance"
article_platform: "Computer"
devto_article: true
devto_id: 4843122
devto_url: "https://dev.to/alichherawalla/how-to-move-ai-models-to-an-external-drive-in-off-grid-ai-in-2026-without-downloading-them-again-1044"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto/https%3A%2F%2Fgetoffgridai.co%2Fassets%2Fimg%2Fhome%2Fapp%2Fmodels-storage-light-1760.webp"
---
Large model downloads can fill your internal drive quickly. OGAD (Off Grid AI Desktop) can move its managed model files to a new storage folder, including a folder on an external drive, without downloading those same files again.

Use **Model folder** in the Storage view and choose **Move files** when prompted. Keep both drives connected until the copy, restart, and verification are complete. This moves model storage, not every conversation or other piece of app data.

[Download OGAD](https://getoffgridai.co/desktop/) | [Desktop beta 122 release notes](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.55-beta.122)

![Off Grid AI Desktop model storage inventory; folder controls vary by release](https://getoffgridai.co/assets/img/home/app/models-storage-light-1760.webp)

---

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@getoffgridai.co](mailto:support@getoffgridai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-494gbuv5c-kj9tT7U0AS8Kq8UUO63_jw), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

## Decide whether you need to move or reuse

There are two different jobs in the Storage view. **Model folder** sets the destination for model downloads. **Other model folders** lets the app find compatible models that already live elsewhere.

If OGAD's current model folder is filling your internal disk, change **Model folder** and move the managed files. If the models are already on an external drive, add that folder under **Other model folders** instead. That avoids making another copy just to make the app see them.

This guide covers the first case: moving the app's existing managed model collection to a new location.

## Prepare the external drive

Connect the drive and create a clearly named folder for the models. Confirm that your user account can read and write there and that the drive has enough free space for the copy and future downloads.

The move copies files before old verified copies are removed after a restart. Do not assume the operation instantly frees the same amount of internal space. Keep enough room for the process to finish, and avoid disconnecting either location during the move.

Finish or cancel active model downloads first. The app blocks a storage-folder change while downloads are active. Also finish the model work you care about before restarting the app.

## Choose the new model folder

1. Open **Models**, then **Storage** in [OGAD](https://getoffgridai.co/desktop/).
2. Find **Model folder** and note the current path.
3. Choose **Choose folder**.
4. Select the folder on the external drive.
5. When asked about existing model files, choose **Move files**.
6. Read the result, including any warning or count of unknown entries left behind.

The app copies recognized Off Grid model files and uses the new folder. It does not blindly remove every file in the old directory. Unknown files stay in place so that a storage change does not become an unreviewed cleanup of unrelated data.

If you choose **Cancel**, stop and check the displayed path before trying again. If an error appears, inspect its cause rather than manually deleting the original files to force more space.

## Understand the Leave files option

**Leave files** chooses a different arrangement. Existing files remain in the old folder, and that location is added as a folder to scan. The new download folder takes effect through the indicated restart flow.

That can be useful when you want future downloads on the external disk but do not want to copy the current collection now. It is not the same as moving all existing storage off the internal drive.

Use the option that matches your goal. If your purpose is to recover internal disk space, leaving the current files there will not achieve that by itself.

## Restart and verify before cleanup

Use **Restart now** when the Storage view offers it. After the app starts again, return to Storage and confirm the new path. Check that the expected models still appear in the inventory.

Activate one model you use often and send a short test prompt. For another model type, perform the relevant small check, such as a short transcription or image job. A visible file in the list does not establish that every companion file is present and usable.

Old copies are removed after restart only when the move's checks permit it. If unknown files remain, review them separately. Do not delete the old folder wholesale merely because the main model worked once.

## Keep the external location available

The external drive must be mounted when you load models stored there. If it is absent, the app cannot read those weights. A missing drive can also pause model downloads rather than silently placing new files somewhere else.

Use a stable folder location. Renaming the drive or changing how it mounts can change the path the app expects. If you intentionally reorganize it, update the configured folder and check the inventory again.

Storage capacity and working memory are separate. Moving a model to a larger drive does not give the computer more RAM or guarantee that a larger model can run.

## Fix common move problems

| Symptom | Next check |
| --- | --- |
| Choose folder is disabled | Active or queued downloads |
| Folder cannot be used | Read/write permission and drive availability |
| Copy fails | Free space, connection, and reported error |
| Model disappears after restart | New path and mounted drive |
| Internal space is not fully recovered | Verified cleanup state and unknown files left behind |

[Open Storage in OGAD](https://getoffgridai.co/desktop/), choose a suitable external folder, and move one managed collection through the app's flow. Confirm the path and a real model response after restart before you treat the move as complete.
