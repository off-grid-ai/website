---
layout: content
title: "How to Transcribe Audio in Multiple Languages on Windows in 2026 (Completely Offline)"
description: "Turn speech into editable text on Windows with local AI. Choose a multilingual model, set the spoken language, and record without internet after setup."
date: "2026-09-29"
permalink: /articles/how-to-transcribe-audio-in-multiple-languages-on-windows-in-2026-completely-offline/
published_at: "2026-09-29T07:16:35.363Z"
article_topic: "Voice & audio"
article_platform: "Windows"
devto_article: true
devto_id: 4769311
devto_url: "https://dev.to/alichherawalla/how-to-transcribe-audio-in-multiple-languages-on-your-windows-pc-completely-offline-aki"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2Foi8r7q2i8ag1mk8oik3r.png"
---
You can dictate a note in Hindi, Spanish, French, or another supported language on your Windows PC without uploading the recording. OGAD (Off Grid AI Desktop) runs the speech model on your computer. Download the app and model first. Then you can record and get editable text with your network disconnected.

[Download OGAD for Windows](https://getoffgridai.co/desktop/) | [Desktop releases](https://github.com/off-grid-ai/OGAD/releases)

---

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@offgridmobileai.co](mailto:support@offgridmobileai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

This guide covers the microphone in the app's chat screen. You speak, stop the recording, and review the transcript in the message box. It is useful when you want to draft a message in a language that is slower to type on your keyboard.

The Windows workflow uses the free desktop app. It does not require the separate Pro feature that inserts dictation into other applications.

## What do you need for offline transcription on Windows?

You need the Windows x64 desktop app, a working microphone, and a downloaded multilingual speech model. You also need enough free storage and memory for that model. Internet access is required for the initial downloads, but local transcription runs without a connection after setup.

Before you start:

- Install the Windows x64 build from the desktop download page. See [current stable and preview releases]({{ '/desktop/releases/' | relative_url }}).
- Connect your microphone or select your laptop's microphone as the Windows input device.
- Allow microphone access for desktop applications in Windows privacy settings.
- Keep space for the app, the model download, and working files.

Start with a small speech model. Its download size is not its full memory requirement. Windows and your other applications also need RAM.

You do not need a chat model just to get words from speech. You need a downloaded local chat model if you also want an offline AI reply, translation, or summary.

## Which model should you download for multiple languages?

Start with **Whisper Base** for a short test. Select the multilingual model, whose file is `ggml-base.bin`. A model file containing `.en`, such as `ggml-base.en.bin`, supports English only. Changing the Windows display language does not change the speech model's language support.

The desktop catalog includes these multilingual models:

| Model | Approximate download | When to try it |
|---|---:|---|
| Whisper Tiny | 78 MB | A small download to check recording and transcription |
| Whisper Base | 148 MB | A first test with your own voice and language |
| Whisper Small | 488 MB | Compare with Base when it misses words |
| Whisper Medium | 1.53 GB | A larger option when your PC has enough free memory |
| Whisper Large v3 Turbo | 1.62 GB | Compare on your own recordings before choosing it |
| Whisper Large v3 | 3.10 GB | A larger download with higher memory needs |

These are rounded file sizes from the desktop model catalog, using decimal MB and GB. The app's displayed size can differ because of unit conversion or the selected model file. Mobile and desktop model downloads are not always the same size.

A larger model is a choice to test, not an accuracy guarantee. Background noise, accents, names, and the language all affect the transcript. The [Whisper engine documentation](https://github.com/ggml-org/whisper.cpp) describes the model families and English-only variants.

## How do you set up multilingual transcription?

Download a multilingual model in **Models > Transcription**, then select it for use. In **Settings > Transcription**, check **Current model** and set **Spoken language**. An explicit language is useful for a short first recording. Auto-detect is also available with multilingual Whisper models.

### 1. Download the speech model

Open **Models** and select **Transcription**. Find **Whisper Base** and choose **Download**. Wait until the download finishes.

If you choose a file variant, use the multilingual file without `.en` in its name. Do not choose an English-only variant for Hindi, French, or Spanish speech.

### 2. Activate it

Select **Use** on the downloaded model. The model card should show **Active**.

Open **Settings > Transcription**. Check that **Current model** is the local model you selected. This setting controls the next recording. Downloading a model and selecting it are separate steps.

### 3. Choose the spoken language

Set **Spoken language** to the language you will record. You can choose **Auto-detect** later if you want the model to identify the language.

If only English is available, check the active model. Choose a multilingual Whisper model before trying again.

## How do you record and get text without internet?

Use the microphone button in the normal text chat screen. Click **Record voice**, speak, then click **Stop recording**. OGAD transcribes the recording and adds the result to the message box. You can edit or copy the text before sending it to a chat model.

### 1. Disconnect the PC

After the download and model selection are complete, turn off Wi-Fi. Disconnect Ethernet too if your PC uses a cable.

This is a practical check that your chosen setup works without internet. Use the microphone inside OGAD for this check. The Windows voice-typing shortcut is a different feature.

### 2. Record a short sentence

Stay in the normal text chat screen for this first test. Click **Record voice**, say a full sentence, then click **Stop recording**.

Try a sentence with information you can check. For example, say the equivalent of "The train leaves on Friday at nine" in your chosen language.

### 3. Check the transcript

Wait for the text to appear in the message box. Check the day and time, then correct any errors. Copy the text if that is all you need.

Normal text chat lets you review the result before sending. Voice conversation mode has a different flow and can send the transcribed turn automatically.

For an AI reply while disconnected, select a downloaded local chat model as well. A working transcript does not mean a remote chat model can answer offline.

## What should you check when transcription fails?

Check the microphone first if no audio records. Check the selected speech model and language if audio records but the words are wrong. If text appears and only the AI reply fails, check the chat model. These are different parts of the workflow.

| Problem | Check | Action |
|---|---|---|
| Recording does not start | Windows input device and microphone permissions | Select a working microphone and allow desktop apps to use it. Try another short recording. |
| Only English is offered | The active model may be English-only | Select multilingual Whisper Base or Small, then reopen Spoken language. |
| The output uses the wrong language | Auto-detect may have too little speech | Select the language explicitly and record a full sentence. |
| The app says no transcription model was found | The download may be incomplete, or no local model is selected | Finish the download in Models > Transcription, then select Use. |
| The model cannot load | Other models and applications may use available memory | Close memory-heavy applications and try Tiny or Base. |
| Transcription needs a network connection | A remote transcription service may be active | Select the downloaded local transcription model again and check Current model. |
| The transcript appears but the AI does not answer | The selected chat model may be remote | Use a downloaded local chat model for an offline reply. |
| The app reports a missing transcription runtime | The speech engine is missing from the installation | Reinstall the current official Windows build. Downloading a different model will not replace a missing engine. |

For poor recognition, move closer to the microphone and reduce background noise. Compare Base and Small with similar recordings if you need a better result. Review names and numbers even when the rest of the sentence reads well.

## Does the recording leave your Windows PC?

With a local transcription model selected, the desktop app processes the recording using its local speech engine. It does not need a cloud transcription API to return the text. The network-disconnected test lets you check this workflow yourself.

OGAD also supports remote model connections. Selecting remote transcription changes where the audio is processed. Sending the resulting text to a remote chat model is another separate network action.

Local processing does not mean no local files exist. The app uses local files during transcription. Treat text you copy, save, or share according to where you put it.

## Offline transcription FAQ

### Is multilingual transcription free on Windows?

Yes. Speech input in the desktop chat is part of the free core app. The [desktop feature list](https://github.com/off-grid-ai/OGAD#features-free--open-source) includes speech-to-text. Pro dictation into other applications is a separate workflow.

### Does this type directly into Word or another Windows app?

This procedure puts the transcript in OGAD's message box. Review it there, then copy it into your document or email. Do not expect these steps to set up system-wide dictation.

### Can I transcribe one language and get another language back?

This workflow writes down the language you speak. For translation, review the transcript and ask a downloaded local chat model to translate it. Keep both the speech model and chat model local for an offline result.

### Can I switch languages inside one recording?

Multilingual support does not guarantee accurate recognition of every language change within a sentence. Start with short recordings in one language. Check the result before using mixed-language recordings for important notes.

### Do I need a paid speech API or an account?

The local workflow does not need a cloud speech API key. Download the app and local model, then use the app's microphone. Choose local models for the full offline workflow.

[Get the Windows desktop app](https://getoffgridai.co/desktop/), select a multilingual speech model, and try one sentence with Wi-Fi and Ethernet disconnected.
