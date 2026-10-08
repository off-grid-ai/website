# Image feedback and requests for getoffgridai.co

Read this before creating or redoing any image. Save the finished images in this folder (`output/imagegen/remaining-demos/`).

## Rules for every image

1. **Cast and data.** Use only this made-up data, never real names, contacts or personal data.
   - The user is **Alex** at Off Grid AI (`alex@offgrid.example`). Devices are "Alex's iPhone" and "Alex's Mac", replies are signed "Alex", and paths look like `/Users/alex/...`.
   - Maya Chen is a colleague, not the user. Do not use "Maya's iPhone", "Maya's Mac", "signed Maya" or `/Users/maya`.
   - Sam Okafor is the customer contact at Acme Corp (`sam@acme.example`). Priya Nair owns the rollout plan. Tom Reyes verifies the gateway policy before kickoff. Daniel Cole is at Northwind Capital.
   - The Acme Corp pilot starts on 14 November with 40 seats. The documents are `Acme_rollout_v3.pdf` and `Pilot_scope.docx`.
2. **Time.** Daytime only, between 9 AM and 6 PM, both in chat timestamps and in the status bar.
3. **Never show:**
   - placeholders such as "[Your Name]";
   - raw model file names such as `xxx-Q4_K_M.gguf` or `SmolLM2-135M`;
   - error, empty, FAILED or "not downloaded" states;
   - overlays such as a "2982 ms" pill;
   - notifications, debug banners, or an SOS status bar.
4. **Match the real app exactly. Do not invent UI.**
   - Compare against a real capture before exporting: `assets/img/home/app/chat-light.webp`, `god-light.webp` and `approval-light.webp` for desktop, and `assets/img/home/mobile/chat-ios-1-light.webp` for phone.
   - Desktop sidebar, in this order:
     - Discover: Search, Day, Replay, Reflect.
     - Work: Meetings, Actions, Entities, Projects, Chat, God, Tasks, Voice.
     - Private data: Vault, Clipboard, Devices.
     - Then: Model running, Theme, Settings, Mobile app.
     - There is no "SYSTEM" section.
   - Desktop chat composer: the chip row always shows "All memory" and the model chip (for example `Qwen 3.5 9B · 16K`), then God, Thinking, Voice and Image.
5. **Themes.** Every image needs a light version and a dark version with identical content. Name them `<name>-light.png` and `<name>-dark.png`.
6. **Sizes and aspect ratios.**
   - **Desktop: 1512 × 977 (1.548 : 1), exported at 3024 × 1954.** This is the exact screen of the MacBook mockup on the site. Wider images (for example 1712 × 919) get cut off on the right.
   - **iPhone: 1320 × 2868 (about 0.46 : 1).** 851 × 1848 has the right shape and works, but 1320 × 2868 is sharper.
7. **Copy style.** Plain sentences, no exclamation marks and no em dashes.

## Feedback on images already delivered

| File | Status | What to change |
|---|---|---|
| `phone-voice-{light,dark}` | **Used on the site** | Optional: make the answer to "What did I promise Sam?" match the desktop: "You made three commitments to Sam: the pilot scope, owners and checks (Priya owns the rollout, Tom verifies the gateway policy), and a kickoff call next Tuesday." |
| `phone-vision-{light,dark}` | **Used on the site** | No changes. |
| `phone-sync-{light,dark}` | **Used on the site** | Rename "Maya's iPhone" and "Maya's Mac" to "Alex's iPhone" and "Alex's Mac". |
| `phone-remote-light` | **Used, light only** | Rename to "Alex's Mac", and **add a dark version**. |
| `phone-computer-use-light` | Outdated; not used | The current app opens live view in a bottom sheet over the task chat. Capture that real sheet, with the chat visible behind it, a large Mac view, and the existing step controls. Use "Create reminder: Send Sam the rollout plan, Friday 10 AM" and a current macOS wallpaper. Do not use the old full-screen layout. Capture light and dark versions from the app. |
| `desktop-sync-light` | Used in articles, light only | Rename Maya to Alex. Remove the invented "SYSTEM" sidebar section and match the real sidebar (rule 4). Export at 3024 × 1954 and **add a dark version**. |
| `desktop-translation-light` | Fallback only | "comienza el 14 November" reads like a bug. Use "14 de noviembre", and make the prompt "Keep the names unchanged". Sign the email "Alex". Add the missing "All memory" and model chips to the composer. Fix the size to 3024 × 1954 and add dark. |
| `desktop-backup-light` | Fallback only | Change `/Users/maya/...` to `/Users/alex/...`. Fix the size to 3024 × 1954 and add dark. |
| `desktop-mcp-light` | Fallback only | Timestamps read 9:50 PM, so make them daytime. The answer says "Tom handles security"; make it "Tom verifies the gateway policy". Fix the size to 3024 × 1954 and add dark. |

Translation, backup and MCP are being captured from the real app as well. These generated versions are only used if the real captures fail.

## Images still needed

In priority order. Every one needs light and dark.

| # | File name | Device | Exact content |
|---|---|---|---|
| 1 | `phone-computer-use` | iPhone | Real capture of the current live-view bottom sheet over the task chat, as described above. Use synthetic task data. Do not generate the app UI. |
| 2 | `phone-remote-dark` | iPhone | The dark twin of `phone-remote-light`, renamed to "Alex's Mac". |
| 3 | `desktop-sync` | Desktop | Devices screen: "Alex's iPhone" **Connected** over Wi-Fi. Recent activity shows completed transfers of the chat "What did I promise Sam?" and `Acme_rollout_v3.pdf`. No pairing code shown, no error banner. |
| 4 | `phone-sync-chat` | iPhone | The desktop chat "What did I promise Sam?" open on the phone after Sync, with the same answer as the desktop (see the voice row above). |
| 5 | `phone-project-pdf` | iPhone | Project "Acme Corp pilot" with **`Acme_rollout_v3.pdf`** (a PDF, not .txt) in the knowledge base, and a chat answer citing it: "Priya Nair owns the rollout plan, Tom Reyes verifies the gateway policy before kickoff, and the pilot kicks off on 14 November." |
| 6 | `phone-dictation` | iPhone | Whisper dictation on the phone in Spanish, with the transcribed Spanish text in the message box ready to send. |
| 7 | `phone-models-mac` | iPhone | Model picker listing on-phone models (Gemma 4 E4B, Qwen 3.5 2B) **and** an "On Alex's Mac" group (Qwen 3.5 9B, Gemma 4 26B). Off Grid AI Desktop only. **No Ollama and no LM Studio.** |
| 8 | `desktop-computer-use` | Desktop | Computer Use in Reminders. Task panel: "Create reminder: Send Sam the rollout plan, Friday 10 AM", step progress with ticks, and the Reminders window visible with the new reminder. |
| 9 | `desktop-meeting-in-person` | Desktop | Meetings: an in-person recording in progress (microphone only), with the timer running and the live transcript of a short Acme pilot discussion. |
| 10 | `desktop-meetings-teams` | Desktop | Meetings list with a Microsoft Teams meeting row "Acme Corp pilot weekly", plus its summary and decisions. |
| 11 | `desktop-imagegen-zimage` | Desktop | An image generated in chat with **Z-Image Turbo**: the prompt "A lighthouse at dusk, film photo", the image, and a details line showing the model's display name "Z-Image Turbo" (not a file name). |
| 12 | `desktop-image-edit` | Desktop | Qwen-Image 2.1 editing a photo: the source photo and the edited result side by side in chat, with the prompt "Make it golden hour". |
| 13 | `desktop-integrations` | Desktop | Integrations with **Gmail and Google Calendar connected** (as `alex@offgrid.example`), plus Slack and Linear. Every logo must be visible in dark mode. |

## Do not create

- Anything showing Ollama or LM Studio.
- Reflect > Week. It waits for an app fix and will be captured from the real app.

## Phone walkthroughs (new, priority after the list above)

Each home-tour phone chapter should become a short walkthrough of 2–3 screens instead of one. Same rules as above (Alex cast, daytime, both themes, 1320 x 2868, real app UI only).

| Chapter | File names | Screens in order |
|---|---|---|
| Voice | `phone-voice-start`, `phone-voice` (have), `phone-voice-pick` | 1. Voice mode idle, "Tap to speak", voice chip "Heart". 2. Have it. 3. The voice picker sheet with Kokoro voices (Heart, River, Sarah, Adam). |
| Vision | `phone-vision-attach`, `phone-vision` (have), `phone-vision-followup` | 1. The receipt photo attached in the composer before sending. 2. Have it. 3. A follow-up "Split it between two people" answered ($9.45 each). |
| Images | `phone-image-prompt`, `phone-image-progress`, `phone-image` (have) | 1. Prompt typed "a lighthouse at dusk, film photo". 2. Generation in progress with the live preview and step count. 3. Have it. |
| Phone / Sync | `phone-sync` (have), `phone-sync-activity`, `phone-sync-chat` | 2. Sync Activity with completed transfers (the Sam chat, Acme_rollout_v3.pdf, an image). 3. The synced desktop chat "What did I promise Sam?" open on the phone. |
| Models | `phone-models-text`, `phone-models-download`, `phone-models-mac` | 1. Text models on the phone. 2. A small model downloading with progress. 3. The model picker with an "On Alex's Mac" group (Off Grid AI Desktop only, no Ollama or LM Studio). |

## Cast fixes (top priority, these are live on the site now)

| File | Problem | Fix |
|---|---|---|
| `phone-sync-{light,dark}` | Shows "Maya's iPhone" and "Maya's Mac" | Same screen with "Alex's iPhone" and "Alex's Mac" |
| `phone-remote-{light,dark}` | Shows "Maya's Mac"; dark missing | "Alex's Mac", both themes |
| `phone-chat-{light,dark}` (new) | The current phone chat reply to Sam is signed "Priya" | The same chat ("Draft a short reply to Sam Okafor at Acme Corp… signed Alex"), with the reply signed **Alex**, daytime timestamps, both themes |

## Native mobile capture additions (8 October 2026)

Use synthetic data in the real iPhone app and native screenshots only. Do not generate or paint app UI. Light and dark for each, 1320 × 2868, Alex cast and daytime timestamps.

- `phone-project-instructions`: the Acme Corp pilot project's instructions, written for Alex's work.
- `phone-approval`: a pending draft approval on the phone using Sam at Acme Corp; do not send a real message or approve an external action.
- `phone-dictation`: Spanish dictation with transcribed text in the composer, ready to send.
- `phone-offline`: a local-model chat with synthetic content, showing the real offline state if the app supports it.

Desktop Devices is supplied by the website owner and is outside this capture run.

## Desktop screens the website still needs (capture from the real Off Grid AI Desktop debug app)

The website's own capture harness can't produce these. It has no real local model, God shows the upgrade page there, and it has no accounts or microphone.

**How to capture**
- Capture the app window only: `screencapture -l <windowID>` or Cmd+Shift+4, then Space, then click. The window is **1512 × 977**, so the file is **3024 × 1954**.
- Light and dark versions with identical content.
- Daytime times.
- The Alex cast: Sam Okafor is the Acme Corp contact, Priya and Tom are Alex's team, Daniel Cole is at Northwind Capital.
- No personal data, no keys, no localhost in view, and no competitor product names.
- Save as `desktop-<name>-{light,dark}.png` in this folder.

| # | File name | Screen and exact state | Why |
|---|---|---|---|
| D-1 | `desktop-god-needs-you` | God with the **Needs you** rail: 3 approvals with full text and Approve / Deny / Ask Ares | God chapter |
| D-2 | `desktop-god-routines` | God settings › Scheduled tasks with **event triggers** (new email, before a meeting, task finished) and last-run times | God chapter |
| D-3 | `desktop-god-rules` | God settings › Name and rules with 3–4 standing rules ("Never send to anyone outside Acme without asking", …), plus the Wake word setting | God chapter |
| D-4 | `desktop-image-progress` | Image generation in chat **in progress**: the live step-by-step preview and step count, prompt "A lighthouse at dusk, film photo" | Images chapter |
| D-5 | `desktop-image-enhance` | The same chat after generation: **enhanced prompt** expanded, the finished image, and the details line with the model's display name (Z-Image Turbo or SDXL Lightning) | Images chapter |
| D-6 | `desktop-image-edit` | **Image edit** with Qwen-Image: the source photo and the edited result, prompt "Make it golden hour" | Images chapter |
| D-7 | `desktop-vision-screenshot` | Chat with a **screenshot of Acme_rollout_v3.pdf** attached: "What are the three stages and who owns each?", answered by a local vision model | Vision chapter |
| D-8 | `desktop-vision-compare` | Two slide images attached: "What changed between v2 and v3?", answered | Vision chapter |
| D-9 | `desktop-computer-use` | Computer Use in **Reminders**: the plan "Create reminder: Send Sam the rollout plan, Friday 10 AM", step ticks, with the Reminders window showing the new reminder | Desktop Computer Use section |
| D-10 | `desktop-meeting-recording` | Meetings: an **in-person recording in progress**, with the microphone, a running timer and the live transcript | Meetings chapter |
| D-11 | `desktop-integrations` | Integrations with **Gmail and Google Calendar connected** (a test account), plus Slack and Linear, every logo visible in dark | Act and Connectors |
| D-12 | `desktop-voice-dictate` | Dictation **live** over another app (a Notes or Mail window), the dictation pill showing words appearing | Voice chapter |
| D-13 | `desktop-reflect-week` | Reflect › **Week**, with the daily bars rendering (needs the bar fix in the build) | Reflect chapter |

**Lower priority:**
- the Capture work-threads band showing 2–3 threads, e.g. "Acme Corp pilot" and "Northwind board prep" (`desktop-capture-threads`);
- the Gateway interactive docs page with a request and response, with no localhost visible (`desktop-api-docs`).
