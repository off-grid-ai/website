---
layout: default
title: "How to Transcribe Audio in Multiple Languages on iPhone in 2026 (Completely Offline)"
description: "Dictate notes in your language on iPhone with local speech recognition. Choose a multilingual model, check the text, and work offline after setup."
date: "2026-09-29"
permalink: /articles/how-to-transcribe-audio-in-multiple-languages-on-iphone-in-2026-completely-offline/
article_category: "Mobile"
devto_article: true
devto_id: 4769264
devto_url: "https://dev.to/alichherawalla/how-to-transcribe-audio-in-multiple-languages-on-your-iphone-completely-offline-1igp"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2Fkcq5spc3apj2jzfacnfk.png"
---
You can dictate a note in Hindi, Spanish, French, or another supported language on your iPhone without sending the recording to a speech service. OGAM (Off Grid AI Mobile) processes the audio on your phone. Download a multilingual speech model first, then record and get text with Wi-Fi and mobile data off.

[Get OGAM on the App Store](https://apps.apple.com/us/app/off-grid-ai-private-local-ai/id6759299882) | [iPhone setup guide](https://getoffgridai.co/guides/ios-setup/)

![OGAM](https://getoffgridai.co/assets/cover.png)

---

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@offgridmobileai.co](mailto:support@offgridmobileai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

This guide covers microphone dictation inside OGAM: speak, review the text, and use it as a note or chat message. It does not require an upload or a paid transcription service.

Two settings matter: the speech model and its language. Downloading an English-only model, then changing your iPhone's language, will not give that model multilingual recognition.

## What do you need for offline transcription on iPhone?

Use an iPhone 12 or newer with iOS 17 or later, following the [published iPhone requirements](https://getoffgridai.co/guides/ios-setup/). Install OGAM 0.0.111 or later for the settings described here. Download the speech model while connected, and allow microphone access when you record.

Before you disconnect, check that you have:

- Free storage for the speech model, in addition to the app.
- A completed download of a model marked **99 languages**.
- The downloaded model selected under **On-device models**.
- Microphone permission for OGAM.

A speech model has its own memory needs. A phone that can install the app cannot necessarily run every large model in the catalog. Start with Base or Tiny and check your own results.

Apple's current US App Store lookup lists version 0.0.111, released September 26, 2026. Store availability can differ by region. If your installed version has different controls, check for an update before following the steps below.

## Which multilingual model should you download?

Start with **Base, 99 languages**, an approximate 142 MB download. It is a small first choice for checking your voice and language. The app also has an English-only Base model, so read the language label as well as the model name.

Open **Model Settings > Transcription (Speech to Text) > Transcription model**. In **On-device models**, select the multilingual model you want.

| Multilingual model | Approximate download | Use it for |
|---|---:|---|
| Tiny | 75 MB | A small download to check the recording workflow |
| Base | 142 MB | A first test with short notes in your language |
| Small | 466 MB | A comparison if Base misses too many words |
| Medium | 1.5 GB | Further testing when more memory is available |
| Large v3 Turbo | 809 MB | Comparing another model on the same recordings |
| Large v3 | 1.55 GB | Testing a larger model when your phone has enough memory |

These are approximate catalog download sizes. They are not the total RAM needed during transcription. Larger models also need working memory, and a larger download does not guarantee better results for your particular recording.

The language label is more useful here than the filename. If you do see filenames, `.en` means English-only: `base.en` differs from multilingual `base`.

## How do you set the transcription language?

Open **Chat Settings > SPEECH TO TEXT > Language**. Select the language you will speak. A multilingual model also offers **Auto-detect**, which lets the model identify the language from the recording. For your first short note, select a specific language so you can check the result more easily.

The selector uses the active speech model's supported languages. If it offers only English, return to the model picker and select a version marked **99 languages**.

The App Store's English language listing describes the app interface. It does not limit the languages that a downloaded multilingual speech model can recognize.

## How do you record and transcribe without internet?

With a multilingual on-device model selected, open Chat mode and hold the app's microphone control. Speak, then release the control. The dictation transcript appears in the message box for review. The speech model can do this offline once its download is complete.

### 1. Finish the download

Select **Base, 99 languages** in the transcription model picker. Wait for the download and model loading to finish. Check that the local model is selected before leaving settings.

The microphone's first-use download shortcut may select an English-only model. Use the model picker for this multilingual setup.

### 2. Choose your language

Open **Chat Settings > SPEECH TO TEXT > Language** and select the language for your recording.

### 3. Put the iPhone offline

Turn on airplane mode. Check that Wi-Fi is also off; airplane mode can leave Wi-Fi enabled. This gives you a clear offline check after setup.

### 4. Record a short sentence

Use **Chat mode** and the microphone control inside OGAM. Hold it while you speak, then release it. Grant microphone access if iOS asks.

Use a sentence you can check yourself. For example, say the equivalent of "The train leaves on Tuesday at eight" in your language. Check the day and time in the result.

Your iPhone keyboard's dictation button is a separate control. Use the app's microphone for this workflow.

### 5. Review the text

Read the transcript in the message box. Correct names, numbers, and missing words before sending. You can copy the text if you only need a note.

This procedure uses ordinary chat dictation with a text model. Voice conversation mode and models that accept audio directly can handle recordings differently, including sending voice turns automatically.

## Can the iPhone answer or translate the note offline too?

Yes, if you also select a downloaded local chat model that can handle the task and language. The speech model writes down your words. A separate chat model can answer, summarize, or translate the reviewed transcript. A remote chat model still needs a connection, even when transcription runs locally.

For translation, first check that the transcript matches what you said. Then ask the local chat model to translate that text. The transcription setting itself does not request translation into English.

The [iPhone local AI guide](https://dev.to/alichherawalla/how-to-run-llms-locally-on-your-iphone-in-2026-completely-offline-no-subscription-4b3a) covers the separate chat-model setup.

## What should you check when transcription does not work?

Check the selected speech model, language, and microphone access first. A downloaded chat model does not replace a speech model. An internet connection will not fix a language mismatch in an English-only model.

| What you see | What to check or change |
|---|---|
| Only English appears in Language | Select a speech model marked **99 languages**, then reopen Chat Settings. |
| The language is wrong | Select the language explicitly and record a full sentence instead of a single word. |
| The app cannot record | Check that OGAM has microphone access in iPhone Settings. |
| The model will not load | Unload unused models and try Tiny or Base. Download size is not the model's total memory use. |
| Recording works online but fails offline | Check that an on-device transcription model is active and its download is complete. |
| Text appears but no AI reply arrives | Select a downloaded local chat model for an offline answer. |
| The Language control is missing | Check your installed version and the App Store update. These steps use version 0.0.111 or later. |

Reduce background noise and keep the microphone near your voice. Use a short recording in one language for the first check. The **99 languages** label does not promise equal accuracy across languages, accents, or mixed-language sentences.

## Does the recording stay on your iPhone?

When you select an on-device transcription model, OGAM processes the recording on the iPhone. A cloud speech API is not needed for this path. The offline check above confirms that the selected workflow can return text without a network connection.

OGAM also supports remote transcription services. Selecting one changes where audio is processed. Sending the transcript to a remote chat model or connected tool is another network action. Keep both model choices local for the offline workflow described here.

## Is local speech-to-text free?

Yes. The [free mobile app includes local speech-to-text](https://getoffgridai.co/mobile/). Spoken AI replies use a separate text-to-speech feature in Pro. You do not need spoken replies to dictate a note and review its text.

Download Base with the **99 languages** label, choose your language, and try one sentence in airplane mode. Check the words before you rely on a longer recording.
