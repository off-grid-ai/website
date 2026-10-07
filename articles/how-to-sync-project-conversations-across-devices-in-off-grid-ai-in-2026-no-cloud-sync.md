---
layout: content
title: "How to Sync Project Conversations Across Devices in Off Grid AI in 2026 (No Cloud Sync)"
description: "Continue an AI project on your phone or computer with the same conversations and instructions. Pair your devices and sync over your own local network."
date: "2026-09-29"
permalink: /articles/how-to-sync-project-conversations-across-devices-in-off-grid-ai-in-2026-no-cloud-sync/
published_at: "2026-09-29T08:29:01.215Z"
article_topic: "Sync & sharing"
article_platform: "Any device"
devto_article: true
devto_id: 4769750
devto_url: "https://dev.to/alichherawalla/how-to-keep-ai-project-conversations-in-sync-across-your-devices-in-2026-no-cloud-sync-2151"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2Fvwri9uv1akipeyg35jcr.png"
---
You can keep an AI project's conversations and instructions together when you move between your phone and computer. OGAM (Off Grid AI Mobile) and OGAD (Off Grid AI Desktop) sync project data between paired devices over your local network. Set up Pro access and pairing first. You do not need a cloud service to carry the project between them.

[Get OGAM for Android](https://play.google.com/store/apps/details?id=ai.offgridmobile) | [Get OGAM for iPhone](https://apps.apple.com/us/app/off-grid-local-ai/id6759299882) | [Get OGAD](https://getoffgridai.co/desktop/)

![OGAM](https://getoffgridai.co/assets/cover.png)

---

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@offgridmobileai.co](mailto:support@offgridmobileai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

Suppose you use your phone to plan a workshop and your computer to write its materials. Separate chats for the agenda, exercises, and invitations can belong to one project. The project instructions travel with them, so you do not need to recreate that setup when you switch devices.

A project here is a group of AI conversations with shared instructions and optional knowledge documents. It is not automatic sync of every file in a folder on your computer.

## What project information moves between devices?

Project sync carries project settings, chat assignments, messages, and project knowledge documents. The project record includes its name, description, and system prompt. Messages and file contents can arrive at different times, so check that a document is ready before asking a question that depends on it.

| Information | What to expect |
|---|---|
| Project name and description | The project can be identified on the other device |
| Project system prompt | Shared instructions are available with the project |
| Conversations and their project assignments | Related chats remain grouped |
| Project knowledge documents | Document data transfers through its own file workflow |
| Downloaded model files | Separate from project sync; prepare or transfer them separately |

The [phone and Mac sync release](https://github.com/off-grid-ai/OGAM/releases/tag/v0.0.104-beta.1) introduced continuing project conversations across devices. This guide uses the sync flow in OGAM 0.0.111 and OGAD 0.0.51.

Receiving the project's instructions does not make two different models respond identically. The model running on each device still determines its capabilities and output.

## What do you need before pairing?

Use current apps with Pro access, two devices you trust with the shared data, and a working local network. Complete installation, licence setup, and model downloads while connected to the internet. Keep both apps open and the computer awake during the first check.

You can follow the phone-to-Mac steps below with Android or iPhone. OGAD's Windows release also includes Devices and local-network sync. Windows uses the LAN route; do not assume Apple's nearby-device route is available there.

Each device that will generate new answers needs a suitable local model. A device can receive project history without already having the model that produced that history.

## How do you connect your phone and computer?

Open **Devices** in OGAD and **Settings → Sync** in OGAM. Make the computer discoverable, display its pairing QR code, and scan it with the phone. Wait for a connected device status before testing a project.

1. Connect both devices to the same local network.
2. In OGAD, open **Devices**. Make it discoverable if its status is Hidden, and enable **Find nearby devices**.
3. Choose **Show QR Code**.
4. In OGAM, open **Settings → Sync** and use **Scan pairing QR code**.
5. Follow the pairing prompts and wait for the computer to appear as connected.

You can enter a pairing code instead of using the camera. Select the discovered computer on the phone, enter the displayed code, and choose **Pair**.

If discovery fails, keep both apps in the foreground, check the phone's **Device settings**, and use **Rescan**. A guest Wi-Fi network may keep devices apart even when they use the same router.

## How do you create a project that is easy to check?

Create one small project with a recognizable name and a simple instruction. Start a conversation inside it, then open the same project on the other device. Check the project settings and message history directly before asking for a new reply.

### 1. Create the project on your phone

Open **Projects**, choose **New**, and name it **Cedar Workshop**. Enter a short description, such as “Plan a beginner gardening workshop.”

In **System Prompt**, enter:

> Help me plan a beginner gardening workshop. Keep the language simple. Separate confirmed details from suggestions.

Choose **Save**.

### 2. Start one project conversation

Open Cedar Workshop and start a chat from the project. Ask:

> Suggest a three-part agenda for a one-hour workshop.

Let the answer finish. Keep the phone connected and the app open.

### 3. Check the project on the computer

In OGAD, open **Projects** and select Cedar Workshop. Check its name, description, and **System prompt**. Open the conversation and confirm that the question and answer are present.

### 4. Continue the same conversation

Select a local chat model on the computer if needed. Add:

> Turn the second part into an exercise that needs no special equipment.

When the answer finishes, return to the phone and open that conversation. The new exchange should appear in the same project.

This checks a complete handoff in both directions. Finish one turn before sending from the other device during the first test; it makes missing or late updates easier to identify.

## How do you add project documents?

In OGAD, open the project's knowledge documents area and choose **Add files**. Use a small, non-sensitive document for the first transfer. Let it finish processing and transferring, then check its availability on the phone before relying on it in a question.

Project knowledge documents and individual chat attachments are different sources. A file in a single message belongs to that conversation. A knowledge document is added to the project's shared reference material.

A filename appearing before its contents are ready does not mean the receiving model can already use it. Local indexing or processing can also require a suitable model and enough memory on the receiving device.

## Can project sync work without internet?

Yes, after setup, when the paired devices still have a reachable local connection. Keep Wi-Fi or the local wired network available. Turn off mobile data and test on a local network with no internet access, using downloaded local models.

Do not turn off every network connection. A local sync service still needs a path between the devices. Being paired does not make a sleeping home computer reachable from anywhere.

Cloud chat models, web searches, and connected services have separate network requirements. A locally synced project can still contain a question that needs internet to answer.

## What should you check if a project is missing or incomplete?

| Problem | Check and next step |
|---|---|
| No project appears | Confirm both devices show connected, then reopen Projects |
| The project appears but its chat does not | Confirm the conversation was created inside or assigned to that project |
| Messages arrive but a document is unavailable | Wait for file processing and transfer; keep the sending device awake |
| The receiver cannot generate an answer | Select a downloaded model that fits that device |
| Project instructions seem ignored | Check the actual System prompt field, then review model behavior separately |
| Sync stops after the phone is put away | Reopen OGAM and restore the local connection; do not assume indefinite background execution |

Chats and projects are required parts of the shared workspace in the current sync flow. The optional **Sharing** controls are not a per-project privacy switch. Pair only devices that should receive your project data.

## Is sync also a project backup?

Sync keeps a shared workspace current. It is not an independent archive of every earlier state. Use a separate supported backup/export workflow when you need a recoverable copy before major changes. Do not delete a project on one device as a test of whether the other device preserves it.

[Install OGAD](https://getoffgridai.co/desktop/) and pair it with OGAM. Start with one project and one conversation. When you can open that same work on your phone and computer, move the project you actually need to finish.
