---
layout: content
title: "How to Exclude Private Files and Clipboard Items From Device Sync in Off Grid AI in 2026"
description: "Set file and clipboard sharing rules before private material reaches another paired device."
date: "2026-09-29"
permalink: /articles/how-to-exclude-private-files-and-clipboard-items-from-device-sync-in-off-grid-ai-in-2026/
published_at: "2026-09-29T08:36:44.673Z"
article_topic: "Sync & sharing"
article_platform: "Any device"
devto_article: true
devto_id: 4769809
devto_url: "https://dev.to/alichherawalla/how-to-stop-private-files-and-clipboard-items-from-syncing-to-other-devices-in-2026-40f4"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2Flwu5wbtsu409dk2gfamu.png"
---
You want a conversation to follow you to your laptop, but not every screenshot or copied item. OGAM (Off Grid AI Mobile) and OGAD (Off Grid AI Desktop) separate required chat sync from optional file and clipboard sharing. Set those optional rules before sensitive material enters a sharing source.

[Get OGAM](https://getoffgridai.co/mobile/) | [Get OGAD](https://getoffgridai.co/desktop/)

<div style="width: 100%;">
  <img width="320" alt="The Sync screen in OGAM on iPhone: Maya's Mac connected over Wi-Fi, 2 of 5 devices saved, and Sharing, Activity and Files below." src="https://getoffgridai.co/assets/img/home/mobile/sync-ios-1-light-640.webp" />
</div>

---

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@offgridmobileai.co](mailto:support@offgridmobileai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

Full device sync is a Pro feature. The steps below use the mobile **Sync sharing** controls after pairing. They help you prevent future optional transfers; they do not remotely erase files already copied to another device.

## Which content can you exclude?

You can control optional screenshot, download, and clipboard sharing. Chats and projects are required sync data. Files attached to synced messages and generated media follow that chat workflow rather than acting like independent optional Downloads items.

This means a file can still be shared when you attach it to a synced conversation, even if you disabled automatic sharing from Downloads. Paired workspace sync includes all chats and projects; there is no per-project sync switch. If a document must never reach a paired device, keep it out of that paired installation's chats and projects.

For content that must stay on one installation, use an unpaired installation or remove the device relationship first. Hiding a device from discovery is not the same as removing an existing trusted relationship.

## How do you stop automatic file sharing?

On your phone, open **Settings > Sync > Sharing**. In **Sending**, open **Automatic sharing**. Check the destination and set the relevant source to **OFF**. Choose **ASK** instead if you want to review new eligible items before sending them.

| Setting | Use it when |
|---|---|
| OFF | This source should not start automatic sharing |
| ASK | You want to approve eligible files before sharing |
| AUTO | You intend eligible files to transfer without a separate approval |

Check whether the rule applies to all paired devices or a named device. Repeat the check for each destination you use. The controls available for screenshots and downloads depend on the phone's permissions and supported source access.

Start with **Downloads > OFF**. If a single document needs to move later, share it deliberately instead of enabling an entire source just for that transfer.

## How do you prevent clipboard sharing?

In **Sync sharing > Sending**, turn the optional **Copied text** sharing control off. Check the receiving device's rules too if you also want to refuse incoming clipboard content.

On Android, ordinary clipboard access is restricted. The supported external-text route uses **Copy to Off Grid AI** in the text selection menu; it is not a universal background reader of every copied value. Avoid that action for text you do not want to share.

Do not use a real password or private document for a check. Use a harmless sample, change the rule, then confirm that a new sample does not arrive through the disabled route.

## How do you refuse optional incoming files?

Open **Receiving** in **Sync sharing**, choose the relevant device or scope, then open **Receiving rules**. Select **REFUSE** for the optional type you do not want. The alternative is **ACCEPT**.

Sending rules control what your device offers. Receiving rules control which optional content it accepts. Review both directions if you use the devices for different kinds of work.

## Choose rules for a real workday

Suppose your phone has both reference screenshots and private account screenshots. You want occasional reference images on the computer, but you do not want every new screenshot copied there. Start with **ASK** for that source and review each eligible offer. Use **OFF** if you do not want offers from it at all.

For a Downloads folder that mixes work and personal files, leaving automatic sharing off can be easier to manage than remembering which new file will be eligible. Share the specific work document deliberately when needed. This does not create a private folder inside the sync system; attaching that document to a synced chat still follows the required chat-sharing route.

Check the route as well as the item:

| Your intention | Rule to review |
|---|---|
| Approve new screenshot offers | Sending rule for Screenshots and its destination |
| Stop new automatic Downloads offers | Sending rule for Downloads |
| Refuse optional files offered by another device | Receiving rule for that device and file type |
| Keep a chat entirely off another device | Device pairing; optional file rules cannot do this |

After choosing the rules, use two harmless test items with different names. Keep one outside a chat and attach the other to a test conversation. Their behavior helps you check the distinction between optional sharing and required conversation sync. Do not use this check to infer that an older private copy was removed.

## What if private content has already arrived?

Changing a rule affects sharing behavior; it does not recall a previous copy. Check the destination device and remove any stored copy through the appropriate local controls. Copies exported or shared outside the app need separate attention.

If you no longer trust a device, remove its pairing rather than only making it hidden. Do not assume that removing a device deletes files from it, especially when it is offline.

## Why did a file still appear after you disabled Downloads?

| Check | What it means |
|---|---|
| Was the file attached to a chat? | Chat attachments use required chat sync. |
| Was it already sent? | A new rule does not erase a received copy. |
| Did you edit the correct destination? | A rule for one device is not necessarily the rule for another. |
| Did you share it explicitly? | Manual sharing is separate from an automatic source rule. |

The [sync release notes](https://github.com/off-grid-ai/OGAM/releases/tag/v0.0.104-beta.1) describe per-source automatic and approval-based sharing. The important choice is the source and destination, not a blanket assumption that pairing shares everything or nothing.

[Get OGAM](https://getoffgridai.co/mobile/) and review **Sync sharing** before enabling automatic file transfers. Begin with OFF, then allow only the sources and devices you need.
