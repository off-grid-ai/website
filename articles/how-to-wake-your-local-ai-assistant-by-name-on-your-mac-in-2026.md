---
layout: content
title: "How to Wake Your Local AI Assistant by Name on Your Mac in 2026"
description: "Train a local wake word for God on Mac, choose the microphone, and control when wake-word listening is enabled."
date: "2026-10-13"
permalink: /articles/how-to-wake-your-local-ai-assistant-by-name-on-your-mac-in-2026/
published_at: "2026-10-13T09:13:12Z"
article_topic: "Voice & audio"
article_platform: "Computer"
devto_article: true
devto_id: 4843083
devto_url: "https://dev.to/alichherawalla/how-to-wake-your-local-ai-assistant-by-name-on-your-mac-in-2026-p9m"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto/https%3A%2F%2Fgetoffgridai.co%2Fassets%2Fimg%2Fhome%2Fapp%2Fgod-choose-light-1760.webp"
last_modified_at: "2026-10-13"
---
You can call your local assistant by name instead of opening a chat and pressing the microphone each time. In OGAD (Off Grid AI Desktop), God supports a trained wake word on Mac. You choose the name, teach it your voice, and explicitly enable background wake-word listening.

This is part of the Pro God workflow. Wake-word listening, speech transcription, spoken replies, and screen capture are separate controls. Turn on only the parts you intend to use.

[Download OGAD](https://getoffgridai.co/desktop/) | [Desktop beta 122 release notes](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.55-beta.122)

![God settings in Off Grid AI Desktop with Wake word and Sound and desktop sections](https://getoffgridai.co/assets/img/home/app/god-choose-light-1760.webp)

---

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@getoffgridai.co](mailto:support@getoffgridai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-494gbuv5c-kj9tT7U0AS8Kq8UUO63_jw), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

## What happens when you say the name?

The wake-word detector listens for the trained word locally. When it detects the word, the assistant can begin the voice interaction. This lets you start a request while you are reading or working in another window.

The detector is not the same thing as a model continuously transcribing everything in the room. However, the request you speak after activation can become part of a saved conversation. Local wake detection does not mean every later voice interaction is temporary.

A useful first phrase is a short, distinct name that does not occur often in your normal work. A common word can lead to more accidental activations.

## Prepare the models and microphone

Install the current [OGAD beta for Mac](https://getoffgridai.co/desktop/) and open God with Pro enabled. Download the required local voice and model components before expecting the workflow to work without internet.

Give the app microphone permission in macOS when requested. Choose the microphone you actually use at your desk. A laptop microphone and a headset can hear your voice very differently, especially when the laptop lid is closed or you move away from it.

Test an ordinary voice request first. If manual voice input cannot hear you, training a wake word will not solve the microphone problem. Check the input device, permission, and level before continuing.

## Teach the wake word

1. Open God settings and expand **Wake word**.
2. Choose the word and the intended microphone.
3. Start the training control, such as **Teach Ares “Ares”**.
4. Say the requested word for the five training takes.
5. Follow the separate prompt to speak something else for a few seconds.
6. Finish the training and check the resulting state.

The extra speech gives the training flow an example of your voice that is not the wake word. Speak naturally, at the distance you expect to use. Do not shout every training take if you plan to speak quietly during work.

The training clips are processed locally and are not kept as a collection of recordings. The trained detector still needs its saved configuration to recognize the word later.

## Enable listening deliberately

After training, turn on **Always listen for the wake word**. This explicit switch controls the background wake-word behavior. Choosing Chat instead of Voice for a conversation is not a substitute for checking that switch.

Say the wake word, wait for the assistant to activate, and give it a small request. For example: “List the next step from this conversation.” Use a request that does not depend on a live account for the first test.

Then try a phrase that does not contain the wake word. The assistant should not treat ordinary conversation as a command. This is a practical test for you to perform in your room; the guide does not claim a measured detection rate for every microphone or voice.

## Adjust missed or accidental activations

| Symptom | Check | Try next |
| --- | --- | --- |
| It never wakes | Listening switch and microphone | Enable the switch and select the correct input |
| Manual voice also fails | macOS permission and input | Fix the microphone path first |
| It wakes during unrelated speech | Word choice and sensitivity | Use a more distinct word or adjust sensitivity |
| It works only very close to the mic | Training conditions | Teach it again at your normal distance |

Use **Teach again** if your microphone or normal speaking conditions change. Test after each adjustment instead of moving several settings at once. More sensitivity can increase activations without making them more accurate.

You can use **Forget my voice** to remove the trained voice setup. Turn the listening switch off when you do not want the wake-word detector active.

## Keep voice and work access clear

Waking God does not grant it access to an account you have not connected. A calendar request still needs the calendar connection. A request about saved work still needs the relevant retained evidence. A live web request still needs network access.

The response model also matters. Select a local model if you want the request processed on your computer. A remote model configuration adds the selected remote endpoint to that interaction even though the wake detector itself is local.


## Choose what happens after the wake word

Wake-word detection and voice turns solve different parts of the interaction. The wake word gets the assistant's attention. **Manual**, **Auto**, and **Hands-free** in the voice box determine how the following spoken turn starts and ends.

Use Manual when you want to control recording directly. Auto starts from your microphone action and ends on a detected pause. Hands-free starts from detected speech while listening is active and ends on a pause. Check the visible state after a wake before speaking a long request.

The turn setting and optional reply sound are shared between Chat and God in [desktop beta 122](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.55-beta.122). If the behavior changes after using ordinary Chat, check that shared setting before retraining the wake word. Retraining addresses recognition of the name; it does not fix a voice mode or missing speech model.

## Start with a short, repeatable request

[Open God in OGAD](https://getoffgridai.co/desktop/), train one distinct wake word, and test it from your normal working position. Once activation is reliable for you, add the calendar or memory requests you use most. Keep the listening switch easy to find so that you control when the feature is active.
