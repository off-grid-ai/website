---
layout: content
title: "How to Batch-Transcribe Audio Files on Your Computer With a Local API in 2026"
description: "Transcribe a folder of WAV recordings through a local API. Save one text file per recording without uploading the batch to cloud AI."
date: "2026-09-29"
permalink: /articles/how-to-batch-transcribe-audio-files-on-your-computer-with-a-local-api-in-2026/
published_at: "2026-09-29T10:40:54.460Z"
article_topic: "Voice & audio"
article_platform: "Computer"
devto_article: true
devto_id: 4770735
devto_url: "https://dev.to/alichherawalla/how-to-batch-transcribe-audio-files-on-your-computer-with-a-local-api-in-2026-5fon"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2Ffpqufemenox38gfbtzhh.png"
---
A folder of recordings should not need a separate manual transcription request for every file.

OGAD (Off Grid AI Desktop) exposes local transcription through `/v1/audio/transcriptions`. A small script can send recordings one at a time and save a text file for each. With a downloaded local transcription model selected, the audio is processed on your computer instead of an online transcription service.

[Download OGAD for Mac or Windows](https://getoffgridai.co/desktop/)

![Off Grid AI](https://getoffgridai.co/assets/cover.png)

---

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@offgridmobileai.co](mailto:support@offgridmobileai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

## Prepare one recording before the batch

Install OGAD and download a local transcription model in **Models**. Select the local model, then open **Gateway** and check the address. The usual local port is `7878`; change the examples if the app uses another one.

For multilingual recordings, select a multilingual transcription model. An English-only model is not the right route for a folder of Hindi or Spanish recordings.

The gateway is part of the core app. You do not need Pro meeting capture to submit existing audio files through this endpoint. Initial model downloads need internet; the configured local transcription route can then work offline.

Try one WAV file first:

```bash
curl --fail --show-error \
  http://127.0.0.1:7878/v1/audio/transcriptions \
  -F 'file=@./audio/sample.wav' \
  -F 'response_format=text'
```

The expected result is the transcript text printed in the terminal. Listen to a short section of the original and check the words before processing the folder.

## Save one transcript per recording

The following Bash script processes `.wav` files directly inside an `audio` folder. It uses a new output directory and refuses to overwrite an existing one.

Save it as `transcribe-folder.sh`:

```bash
#!/usr/bin/env bash
set -u
shopt -s nullglob

base='http://127.0.0.1:7878'
input_dir='./audio'
output_dir='./transcripts'
files=("$input_dir"/*.wav)

if [ "${#files[@]}" -eq 0 ]; then
  echo 'No WAV files found in ./audio' >&2
  exit 1
fi
if ! mkdir "$output_dir"; then
  echo 'Choose a new output directory before running again.' >&2
  exit 1
fi

failed=0
for file in "${files[@]}"; do
  name=$(basename "$file" .wav)
  target="$output_dir/$name.txt"
  temporary="$target.partial"
  echo "Transcribing: $file"
  if curl --fail --show-error --silent \
      "$base/v1/audio/transcriptions" \
      -F "file=@$file" -F 'response_format=text' \
      -o "$temporary"; then
    mv "$temporary" "$target"
  else
    echo "Failed: $file" >&2
    rm -f "$temporary"
    failed=1
  fi
done
exit "$failed"
```

Run it from the directory that contains `audio`:

```bash
bash transcribe-folder.sh
```

Each successful request becomes a `.txt` file. Failed requests are reported and do not leave a completed transcript under the expected name. Keep the original audio until you have checked the results.

## Keep the batch within the local API's limits

The released endpoint limits the complete upload request to 200 MiB, including multipart overhead. Leave room below that limit. Split a larger recording into smaller audio files before submitting it.

This example sends one file at a time. That keeps the batch simple and avoids launching multiple heavy requests merely because the folder has many files. Processing time depends on the selected model, audio length and hardware.

The text response is a transcript. It does not give this script speaker identities, word timestamps or an SRT subtitle file. Add those only through a separately verified route if your workflow needs them.

Names, technical terms and mixed-language speech still need review. Check important passages against the audio before quoting them in a report.

The gateway listens on network interfaces and its inference endpoints do not require an API key. These examples use `127.0.0.1` on the same computer. Keep the host on a trusted network and do not expose this port to the public internet.

These API routes are present in [OGAD 0.0.51](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.51). The running gateway also serves its API reference at `/docs`.


## Check the batch as a set of files

Start with three short recordings: one clear sample, one with a name or technical term and one that resembles your normal recording conditions. Use filenames you can recognize, such as `review-01.wav`, so the matching transcript remains easy to find.

After the script finishes, check the terminal for failures and compare the number of final `.txt` files with the recordings you expected it to process. The sample only reads lower-case `.wav` files directly in `audio`; it does not recurse into subfolders or include other extensions.

Open each transcript and listen to a short passage near the beginning and a passage that contains an important name, number or commitment. A file's existence proves that the request returned successfully, not that the words are accurate or the recording contained useful speech.

## Recover a failed item without losing good results

The script refuses to reuse an existing `transcripts` directory. Keep that protection for the first batch: it prevents a rerun from silently replacing checked text. For another attempt, choose a new output directory or put only the failed recordings into a separate input folder and change `input_dir` accordingly.

If one recording exceeds the upload limit, split it before resubmitting and preserve the order in the filenames. Keep a note that several transcript files belong to one recording. Do not assume this simple loop will join them or remove repeated words at the boundaries.

If every file fails, return to the one-file command. Check the app, port, selected transcription model and supported input before running the whole folder again. A problem shared by every request needs a setup fix, not dozens of retries.

## Turn the next folder into searchable text

[Download OGAD](https://getoffgridai.co/desktop/), test one recording and run a small batch. Keep a transcript beside each source file so your notes can become searchable without a cloud AI upload.
