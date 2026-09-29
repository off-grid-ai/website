---
layout: default
title: "How to Dictate Site Visit Notes on Your Phone Without Internet in 2026"
description: "Dictate checked site-visit notes on Android or iPhone with local speech recognition, then copy them into your normal record system."
date: "2026-09-29"
permalink: /articles/how-to-dictate-site-visit-notes-on-your-phone-without-internet-in-2026/
published_at: "2026-09-29T14:34:27.595Z"
article_topic: "Voice & audio"
article_platform: "Phone"
devto_article: true
devto_id: 4772166
devto_url: "https://dev.to/alichherawalla/how-to-dictate-site-visit-notes-on-your-phone-without-internet-in-2026-3c6e"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2Fro78cxqvl5sznwommy31.png"
---
After a site visit, the details are still fresh but typing a complete note on your phone can be awkward. OGAM (Off Grid AI Mobile) lets you dictate into the app and review the resulting text. Download an on-device speech model before the visit, and you can do this without internet. Check the note before copying it into your usual work record.

[Get OGAM for your phone](https://getoffgridai.co/mobile/) | [Mobile releases](https://github.com/off-grid-ai/OGAM/releases)

![OGAM](https://getoffgridai.co/assets/cover.png)

---

> **What would you like to do with Off Grid AI?**
>
> Want help with this workflow, or a feature you would like us to add? Email [support@offgridmobileai.co](mailto:support@offgridmobileai.co) with your devices and the task you want to improve.
>
> [Join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ) · [Talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/)

## Capture a useful note while the details are fresh

A good site note separates the location, the observation, the action taken, and the follow-up. Dictation is useful when you know those details but do not want to type a long paragraph on a phone.

Suppose you have completed an equipment visit. You want to record the asset number, what the customer reported, what you observed, and the question that remains open. The transcript should preserve those differences. It should not turn the customer's report into your confirmed finding.

Record your note when you can safely stop and pay attention. Follow the site's rules for phone use and recording. This workflow is deliberate dictation, not continuous background recording.

## Prepare the phone before leaving

Install OGAM and download a local transcription model while connected. Check the current [mobile requirements](https://getoffgridai.co/mobile/) for your device. A phone that can install the app may not have enough memory for every model.

Start with a small model and test your actual terminology. The catalog's multilingual Base model is approximately 142 MB; Small is approximately 466 MB. Those are download sizes, not total working-memory requirements, and they are not accuracy guarantees.

You do not need a large chat model simply to convert speech into text. If you also want the app to organise the note into a structured draft, download and select a local text model separately.

## Choose local speech recognition

1. Open **Model Settings**.
2. Expand **Transcription (Speech to Text)**.
3. Select **Transcription model**.
4. Under **On-device models**, download and select the model you want.
5. Open **Chat Settings > SPEECH TO TEXT > Language** and choose the language you will speak.

Use a multilingual model for a non-English note. An English-only model does not gain other languages because you change the phone's interface language. A remote transcription selection uses a different processing route and is not the offline path described here.

The [mobile release source](https://github.com/off-grid-ai/OGAM/releases/tag/v0.0.111) supports this model-selection and dictation workflow on Android and iPhone. Interface details can change in later versions, so check the active model rather than assuming the first microphone shortcut selected the one you wanted.

## Test one note offline

After setup, turn off mobile data and Wi-Fi, or use airplane mode and check that Wi-Fi is also off. Open **Chat mode** and use the microphone control inside OGAM, not the phone keyboard's dictation button.

Hold the app microphone while you speak, then release it. Allow microphone permission if prompted. The transcript appears in the message box for review; this dictation path does not automatically send the text as a chat message.

Use a test sentence with a date, an asset code, and an observation you can check. If those details are wrong, adjust the recording conditions or model choice before relying on the setup at a site.

## Use a repeatable spoken structure

You can dictate a note in short sections:

| Section | What to say |
|---|---|
| Visit | Date, site, and purpose |
| Asset | Exact identifier and relevant model |
| Reported issue | What another person said |
| Observation | What you directly observed |
| Action | What you actually did |
| Follow-up | What remains to confirm and who will handle it if agreed |

For example: “Visit on 29 September. Asset A-17. Customer reports an intermittent alert. I observed the alert log. No repair completed. Follow-up is to locate the previous service record.” This is a fictional note structure, not a technical procedure.

Speak identifiers carefully and check them in the transcript. If a code matters, type it rather than repeatedly trusting a recognition guess.

## Review before leaving the record behind

Check the text while you can still resolve uncertainty. Pay particular attention to names, serial numbers, dates, quantities, and negative words such as “not.”

“Part ordered” is not “part installed.” “Customer reports” is not “I confirmed.” A small transcription error can change the record substantially.

Edit the text in the message box or copy it into a local notes tool for review. Do not assume that an unsent composer draft is your permanent work record. Save the checked note in the system your team uses.

## Optionally organise the text with local AI

If you have a downloaded local text model, ask it to format the reviewed note:

> Organise this checked site note under Visit, Asset, Reported issue, Observation, Action taken, and Follow-up. Preserve identifiers and uncertainty. Do not add a diagnosis, repair, owner, or deadline. Put missing details under Questions to confirm.

Read the result against your checked transcript. Formatting should not change the facts. If the model turns a tentative observation into a conclusion, correct it before saving.

This step is optional. A clean transcript may already be enough for your record.

## What if the site is noisy?

Move to a suitable quieter place when possible and dictate short notes. Do not record while noise makes the result difficult to verify. A larger model may behave differently, but it cannot restore information that the microphone did not capture clearly.

If you use technical terms frequently, check them manually and keep a reference list. Do not assume that correcting one transcript permanently teaches the speech model your vocabulary.

For mixed-language speech, inspect the language setting and test the result. Catalog language support does not imply equal accuracy for every accent, term, or environment.

## Keep the final record under your control

Copy the approved note into your normal service or project system when appropriate. Uploading it later, sharing it, or using another app has its own data-handling behavior. Local dictation describes the speech-processing step, not every later destination.

[Get OGAM](https://getoffgridai.co/mobile/) and try one short site-note template before your next visit. The first useful result is a checked record of what happened, captured while the details are fresh and saved where your team can use it.
