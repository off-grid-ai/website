# iPhone screenshots still needed for getoffgridai.co/mobile (updated 8 Oct 2026)

This replaces the earlier brief. Each feature on /mobile/ plays its screens in order: start, then working, then result. Each screen shows for **3 seconds** (not 1.8).

## Setup (unchanged)
- Native screenshots from the current Off Grid AI build, at the same iPhone resolution as before (1320 × 2868).
- Every screen in **light and dark**, with the same content in both.
- The **same clock time on every screen**. Use 9:41, full battery and Wi-Fi on. The offline feature is the only exception: Wi-Fi off.
- Synthetic data and the same cast:
  - **Alex** is the user.
  - **Sam Okafor** is at Acme Corp.
  - **Priya Nair** and **Tom Reyes** are on Alex's team.
  - The pilot starts on 14 November with 40 seats.
- No real names, accounts or photos of people. No Ollama or LM Studio on screen.
- Name files `<feature>-ios-<step>-<theme>.png` and put them in one folder. The site makes the .webp versions.

## Already done (no need to recapture)
| Feature | Screens on the site |
|---|---|
| Projects | 1: Acme Corp pilot documents · 2: the rollout PDF · 3: "What did I promise Sam?" answered |
| Voice mode (Pro) | 1: voice-note conversation with transcripts · 2: voice picker · 3: spoken brief |
| Models | Text models list; Voice models list |
| Sync (Pro) | Alex's Mac connected over Wi-Fi |
| Larger models | Remote Servers with Alex's Mac, plus its models |
| Chat, Images, Vision, Tools | The result screen only (step 3) |

## Still needed
| Feature | 1 · start | 2 · working | 3 · result |
|---|---|---|---|
| Chat | Composer with "Draft a reply to Sam about the pilot date" typed | Reply streaming in | have |
| Images | Prompt "a lighthouse at dusk, film photo" typed | Enhanced prompt shown, progress visible | have |
| Vision | Receipt photo attached in the composer, before sending | "What's the total?" sent, the model reading | have |
| Voice (dictation) | Mic held, waveform recording | Transcribed text in the composer | Sent, with the reply |
| Tools | "How many seat-days is the pilot?" asked | Calculator tool call running | have |
| Larger models | (have) | (have) | A chat answered by the Mac's model, in both themes |
| Offline | Wi-Fi off (Control Centre or the app's offline badge) | A question asked with no connection | Answered on the phone |
| Projects | Project instructions being edited | A document added to the project | An answer citing that document |
| Approve (Pro) | Draft reply to Sam waiting for approval | Approval sheet: "Send this reply to Sam?" | Sent confirmation |
| Sync (Pro) | Pairing code shown | (have) | A synced item arriving from the Mac (native Sync Activity) |

## Optional
- **Projects dark overview** (the project page listing chats): it can wait until the app's dark chat-title bug is fixed. Today the titles are invisible.

## Checks before handing over
- Every screen exists in both themes.
- The clock reads the same on every screen.
- No personal data anywhere, including keyboard suggestions.
- Each step follows the one before it: same conversation, same project.
