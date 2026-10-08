# Tour audit: copy accuracy and screenshot grouping

Date: 8 Oct 2026. Read-only pass. Sources: `preview-ui/page.jsx`, `preview-ui/pages/*.jsx`, every screenshot actually used (opened at -1760 / -640, light theme; dark checked where a problem was found), and the live site at http://127.0.0.1:4000 (Brave + Playwright, 1440 and 390 wide). The rendered titles, lines, commands and alts match the source; no console errors and no horizontal overflow on /, /desktop/, /mobile/, /pro/, /download/, /quick-start/, /thank-you/ or /vision/.

Severity: **wrong** = the copy is false, the persona is broken, a competitor is named, or the same screen repeats inside one item. **weak** = a claim the screens don't show, a screen the copy doesn't cover, or a thin item where a better capture already exists. **nit** = wording, ordering or dead code.

Paths are relative to `preview-ui/`. Capture names in *italics* are new captures from `tmp/CHAPTER_DEPTH.md`. Everything else already exists in `assets/img/home/`.

## What the screenshots actually show (the facts the findings rest on)

| Shot | What is on it |
|---|---|
| `day` | Today, "1h 6m of activity". To do (Maya's handoff, Tom's fix, reply to Sam), Journal, three meetings (Northwind board prep 2:50 PM, Design review, 1:1 with Priya), Time spent, Off Grid AI suggests, Timeline. |
| `god` | Tab "Morning briefing". The question is "What should I do first today?" (not "brief me"). Answer at 8:50 AM. Rail: 3 approvals and 3 Needs-you items. |
| `god-prep` | "Prep me for Northwind board prep", with Last time (24 Sep), What he wants, Bring, and 3 cited sources. |
| `god-waiting` | "What's waiting for me?": 3 approvals, plus what Priya and Tom owe. |
| `god-voice` | Voice mode: a spoken question and a spoken answer. |
| `god-choose` | God settings, Gods panel: Ares is "Your god", Athena "90 MB download". |
| `god-routines` (**unused**) | God settings, Scheduled tasks: Morning briefing (weekdays 08:30), Meeting prep (when a meeting is about to start), Approvals digest, End-of-day review. |
| `replay` | Replay paused on `Acme_rollout_v3.pdf` p.2. Commentary: "Read the Acme Corp pilot rollout plan v3...". Work threads band "Acme Corp pilot". Speed 4x. |
| `capture-settings` | Capture & processing panel. Excluded apps: **1Password**, Messages, Keychain Access, Banking (both themes). |
| `entities` | People (5) tab; Sam Okafor's dossier. Email `sam@acme.example`, story "Design partner at Acme Corp", timeline from Gmail and Meet. Open to-dos: "No open to-dos". Sam's timeline also lists "Confirmed tomorrow's design review with Maya" and "Sent Daniel the updated board metrics". |
| `reflect` | Day view: mind share, time by app, balance, focus and switching, insights. No hourly breakdown. |
| `reflect-week` (**unused**) | Week view: 7 daily stacked bars, deep work 7h 52m, week mind share. |
| `search` | "acme pilot", 9 results. Sources: Gmail, Meet, Linear, Chat, Meeting. Kinds: chat, screen, meeting, entity. No clipboard or document results. |
| `chat` | "What did I promise Sam...", 3 commitments, sources [S1] meeting and [S2] "Acme pilot plan.pdf". |
| `approval` | In-chat gate "Send email with Gmail" to Sam Okafor, signed "Best, Alex". Approve / Edit / Reject. |
| `actions` (**unused**) | Actions, To do: 6 open cards, Suggest actions, Approvals 3. |
| `web-plan` | Live task "Compare local-first note apps", stage 2 of 4, pricing table on notes-compare.example. |
| `web-takeover` | "Waiting for you" on the Leafline sign-in page, with Continue / Stop. |
| `web-done` | Done: Leafline Team plans; the summary text in the left pane. The signed-in avatar shows "S". |
| `meetings` | Acme Corp pilot kickoff: Summary, an "On screen" strip of 6 frames, "During this call: LOCKED IN", activity rows with entity chips. Header "Zoom/Meet/Teams". There is only a Transcript button; no transcript is shown. |
| `voice` | Voice library: "Hold ⌥ Space to dictate". 4 takes marked "pasted", with extracted to-dos. |
| `voice-reply` | Desktop chat in Voice mode: a spoken question about the Acme pilot and a spoken answer, both with transcripts. Kokoro is not visible. |
| `vault-*` | Locked, then the password typed, then open: Leafline login, Acme partner portal, Northwind data room, an API key, a secure note, `Acme_MSA_signed.pdf`. |
| `clipboard` | Search "acme": Acme logo image (selected), PDF, text, Linear link, Sam's email. All tagged "This Mac". Header "Quick open anywhere ⌘⇧C". |
| `gateway` | Base URL, curl tab, endpoint grid (chat, images, STT, TTS, embeddings, models). No MCP. |
| `vision-chat` | Desktop chat: the Acme hours-saved bar chart, read by Qwen 3.5 9B. |
| `imagegen-chat` | Desktop chat: an alpine lake (RealVisXL Lightning). |
| `projects` | Project "Acme Corp pilot": "When does the Acme pilot go live", citing 2 docs and a meeting. |
| `artifacts` | A Mermaid flowchart of the Acme rollout in the canvas. |
| `integrations` (**unused**) | Integrations: Notion, Jira + Confluence and Linear connected; Google, Microsoft and Obsidian ready to connect. |
| `chat-translate`, `project-compare`, `project-checklist`, `project-summary` (**unused**) | Acme chats: a Spanish translation signed Alex, a v2 vs v3 comparison citing both PDFs, a launch checklist, and a summary. |
| `sync-devices` (**unused**, light only) | Devices: "Maya's Mac", "Maya's iPhone". Unusable until recaptured. |
| `mobile/chat-ios-1` | Reply to Sam Okafor. The prompt says "signed Priya" and the reply is signed **Priya**. No model name is visible. |
| `mobile/sync-ios-1` | Sync: "**Maya's iPhone**", connected to "**Maya's Mac**" (both themes). |
| `mobile/remote-ios-2` (light only) | Remote Servers: "**Maya's Mac**" gateway, connected. It shows no chat. |
| `mobile/project-ios-1` / `-2` | The Acme Corp pilot project (`Acme_rollout_v3.txt`), then "Who owns the Acme rollout..." answered with an inline citation. |
| `mobile/voice-ios-2` / `-1` | "Follow-up with Sam" as voice notes (voice Sarah); then the Acme brief as a voice note with transcript (voice River). |
| `mobile/vision-ios-2` | A "LEAFLINE CAFE" receipt, total $18.90. Nothing on screen says the Mac answered it. |
| `mobile/imagegen-ios-1` | A lighthouse, with "Enhanced prompt" and the finished image. |
| `mobile/tools-ios-1` | A calculator tool call: 1,200 seat-days. Only the calculator is used. |
| `mobile/models-ios-1` | Phone model library, recommended for the device. |

---

## Home (`/`)

### Orbital tour (`page.jsx:737-755`, `SHOT_PAIRS` 593-603, `SCREEN_CMDS` 619-637)

#### Tour-wide
- **weak**, `page.jsx:922`. The kicker "ONE DAY WITH SAM" casts Sam as the protagonist. Alex is the user; Sam is the Acme contact. **Fix:** "ONE DAY WITH ALEX" (or "ONE DAY, START TO FINISH"). Commit 65f058f1 restored this kicker on purpose, so treat this as a call for the founder.
- **nit**, `page.jsx:622` vs `635`. `SCREEN_CMDS` defines `'mobile/chat-ios-1'` and `'mobile/sync-ios-1'` twice. The later entries win, so `'send it to my phone'` at 622 is dead. **Fix:** delete both keys from line 622.
- **nit**, `page.jsx:592`. The rule "Pair only captures of the same task" is broken by 3 of the 9 pairs (see Phone, Vision, Images). `'mobile/models-ios-1' → 'models-text'` (599) is a loose "same kind of screen" pair. It is acceptable.

#### 01 Today, `page.jsx:738`
Title "Your day, already sorted." Line "Meetings, to-dos, journal and time spent. Built from what you chose to share." Command `open today`. Chips: Day, Journal, Timeline. Screens: `day` ("Off Grid AI Day view with to-dos, journal, meetings and time spent.").
- The copy matches the screen.
- **weak (thin)**: one screen. **Fix:** add *`today-prep`*, *`today-why`*, *`today-timeline`*. No existing capture adds depth here.
- **nit (capture)**: `day` puts Northwind board prep at 2:50 PM, while every God shot says it is "in 30-35 min" at 8:50 to 9:13 AM. Fix this when *`today-bento`* is reshot.

#### 02 God, `page.jsx:739`
Title "Your God knows your day." Line "God is your chief of staff. It knows your accounts, calendar and memory, briefs you, and lines up work for your yes." Chips: Briefings, **Routines**, Approvals. Screens and commands:

| Screen | Command |
|---|---|
| `god` | brief me, Ares |
| `god-prep` | prep me for the Northwind meeting |
| `god-waiting` | what's waiting for me? |
| `god-voice` | brief me out loud |
| `god-choose` | choose my god |

- **weak**: the "Routines" chip is not shown, but `god-routines` exists and is unused. **Fix:** replace `god-choose` with `['god-routines', 'Off Grid AI God settings: scheduled tasks such as the weekday morning briefing, meeting prep and an approvals digest.', 3400]`, and add `'god-routines': 'brief me every weekday'` to `SCREEN_CMDS`. Picking a god is the least useful of the five.
- **nit**, `page.jsx:621`. The `god` command reads "brief me, Ares", but the captured question is "What should I do first today?". **Fix:** `'god': 'what should I do first today?'`. Alternatively, keep it as the chapter command only.

#### 03 Phone, `page.jsx:740`
Title "Your phone picks it up." Line "Device to device and encrypted. No Off Grid AI server in between." Chips: Pro Sync, Shared compute. Screens:

| Screen | Paired with | Command |
|---|---|---|
| `mobile/sync-ios-1` | `projects` | pair my phone and my Mac |
| `mobile/project-ios-2` | `projects` | ask the Acme project on my phone |

- **wrong (persona)**: `sync-ios-1` shows "Maya's iPhone" and "Maya's Mac" in both themes. **Fix:** recapture as *`phone-devices`* (or a reshot `sync-ios-1`) with "Alex's iPhone" and "Alex's Mac".
- **wrong (grouping)**, `page.jsx:594` and `597`. Both phone screens pair with the same `projects` desktop shot, so the chapter shows it twice. Pairing `sync-ios-1` with `projects` is also not "the same task": a pairing screen next to a project answer. **Fix:** delete the `'mobile/sync-ios-1'` entry at line 594 so the sync screen stands alone, and keep `project-ios-2 ↔ projects`.
- **weak**: the "Shared compute" chip is not shown. No screen shows the Mac's model answering the phone. **Fix:** chips `['Pro Sync', 'Projects']`. Or add *`phone-send-model`* once captured.
- **nit**: the `project-ios-2` / `projects` pair asks two different questions ("Who owns the Acme rollout" vs "When does the Acme pilot go live"). Accept it, or recapture so both ask the same thing.
- **thin**: *`phone-pair`*, *`phone-sharing`*, *`phone-activity`*.

#### 04 Capture, `page.jsx:741`
Title "Your work, captured on your disk." Line "Mail, files, chats and meetings. Stored on your disk." Chips: Opt in per device, On device. Screens: `replay` (replay what I worked on), `capture-settings` (keep my banking app out of capture).
- **wrong (competitor)**: `capture-settings` lists **1Password** under Excluded apps, in light and dark. **Fix:** recapture as *`capture-exclude`* with only Banking, Messages and Keychain Access. Until then, drop the screen from the chapter (it is used only here).
- **weak**: the line claims mail, chats and meetings. The screens show a captured PDF and the capture settings. "On your disk" also repeats the title. **Fix:** line "Your screen, read and summarised on this Mac. Leave out any app you choose." Chips `['Opt in per device', 'Excluded apps']`.
- **nit**: the alt says "summarised", while the rest of the site writes "summarize". Pick one spelling.
- **thin**: *`capture-threads`*, *`capture-focus`*, *`capture-edit`*.

#### 05 People, `page.jsx:742`
Title "Your people, already mapped." Line "People and companies from your mail, meetings and chats. Always current." Chips: People, Companies, Projects. Screen: `entities` (who is Sam Okafor?).
- **weak**: the timeline shows Gmail and Meet sources only; chats are not shown. **Fix:** line "People and companies from your mail and meetings, each with a running timeline."
- **nit (capture)**: Sam's timeline contains Maya and Daniel items, and "No open to-dos" contradicts the Day and Actions to-do "Reply to Sam...". Fix this when *`people-sam`* is reshot.
- **thin**: *`people-why`*, *`people-project`*, *`people-companies`*.

#### 06 Reflect, `page.jsx:743`
Title "Your time, accounted for." Line "Time by app, project and person. No timers." Chips: Reflect, Focus. Screen: `reflect`.
- The copy matches the screen.
- **weak (thin)**: `reflect-week` exists and is unused. **Fix:** add `['reflect-week', 'Off Grid AI Reflect, week view: daily work and communication, deep work and the week's mind share.', 3600]`, plus `SCREEN_CMDS 'reflect-week': 'how was my week?'`. Chips `['Day', 'Week', 'Focus']`.

#### 07 Ask, `page.jsx:744`
Title "Your answers come with sources." Line "Every answer shows where it came from." Chips: Recall, Sources. Screens: `search` (search everything for acme pilot), `chat` (what did I promise Sam?).
- The copy matches the screens.
- **nit**: the `search` alt "with relevant memory and source references" is vague. **Fix:** "Off Grid AI Search: one query for acme pilot across chats, screens, a meeting and people, with a sources filter."
- **nit (capture)**: `chat` cites "Acme pilot plan.pdf", while every other shot uses `Acme_rollout_v3.pdf`. Fix this in *`ask-chat`*.
- **thin**: *`ask-filter`*, *`ask-open-source`*.

#### 08 Act, `page.jsx:745`
Title "Your yes sends it." Line "Nothing goes out without your yes." Chips: Actions, Approvals, **Audit log**. Screen: `approval` (draft the reply to Sam).
- **weak**: no audit log is shown, and the Actions screen is not in the chapter, although `actions` exists and is unused. **Fix:** prepend `['actions', 'Off Grid AI Actions: open to-dos from your work, Suggest actions, and three approvals waiting.', 3600]`, with `SCREEN_CMDS 'actions': 'what do I owe people?'`. Chips `['To-dos', 'Approvals', 'Edit before sending']`.
- **thin**: *`act-history`* (the audit log), *`act-learned`*.

#### 09 Web, `page.jsx:746`
Title "Your web errands, handled." Line "Step by step. You take over for passwords." Chips: Web use, **Computer use**, Takeover. Screens:

| Screen | Command |
|---|---|
| `web-plan` | compare Team pricing for three note apps |
| `web-takeover` | take over for sign-in |
| `web-done` | show me what you found |

- **weak**: all three screens show the browser; Computer Use (other apps) is not shown. **Fix:** chips `['Web use', 'Live plan', 'Takeover']`.
- **nit**, `page.jsx:626`. The task on screen is "Compare local-first note apps"; Team pricing is only stage 4. **Fix:** `'web-plan': 'compare three local-first note apps'`.
- **nit (capture)**: the Leafline avatar in `web-done` reads "S", as if Sam were signed in. Use "A" in *`web-history`* / a reshot `web-done`.
- **thin**: *`web-guide`* (steering mid-run), *`web-history`*.

#### 10 Meetings, `page.jsx:747`
Title "Your meetings become answers." Line "Local transcripts, decisions and follow-ups. No bot joins your call." Chips: Notetaker, Recorder, **Ask a recording**. Screen: `meetings` ("...with summary, decisions and transcript.").
- **weak (caption)**: no transcript is visible. The screen shows the summary, the On screen strip and a "Locked in" verdict. **Fix:** alt "Off Grid AI Meetings: the Acme Corp pilot kickoff, with its summary, the screens shared during the call and a Locked in focus verdict."
- **weak**: "Ask a recording" and transcripts are not shown, and the strongest things on screen (On screen, focus) are not in the copy. **Fix:** line "Summaries, what was on screen and how focused you were. Transcribed on this Mac. No bot joins your call." Chips `['Notetaker', 'On screen', 'Focus']`.
- **thin**: *`meetings-transcript`* (transcripts label only You/Them; never write "who said what"), *`meetings-followups`*.

#### 11 Voice, `page.jsx:748`
Title "Your AI has a voice." Line "Dictate into any app on your Mac. Talk to it on your phone and hear the answer." Chips: Dictation, Voice replies, Phone. Screens:

| Screen | Paired with | Command |
|---|---|---|
| `mobile/voice-ios-2` | `mobile/voice-ios-1` | talk to my AI |
| `voice` | | dictate a note |
| `voice-reply` | | read this reply aloud |

- **weak**: the line puts the Mac first, but the first screen is the phone. The Mac voice chat (`voice-reply`) is not covered, because the line gives "hear the answer" to the phone only. **Fix:** order the screens `voice`, `voice-reply`, `mobile/voice-ios-2`. Line: "Dictate into any app on your Mac. Ask out loud on your Mac or phone and hear the answer."
- **nit**, `page.jsx:633`. `voice-reply` shows a spoken question and a spoken answer, not a reply being read. **Fix:** `'voice-reply': 'ask about the pilot out loud'`.

#### 12 Vision, `page.jsx:749`
Title "Your photos become answers." Line "Ask about a photo on your phone. This answer uses a vision model running on your Mac." Chips: Vision, Phone, Shared compute. Screen: `mobile/vision-ios-2`, paired with `vision-chat` (what's the total on this receipt?).
- **wrong (grouping)**, `page.jsx:602`. The pair puts a receipt on the phone next to a desktop chat about the Acme chart. These are different tasks, which breaks the pairing rule, and the line reads as if the desktop shot shows the Mac answering the phone. **Fix:** delete the `'mobile/vision-ios-2'` pair. Show two screens: `mobile/vision-ios-2`, then `vision-chat` ("Off Grid AI on the Mac: a chart from the Acme rollout plan, read by a local vision model.", with `SCREEN_CMDS 'vision-chat': 'what does this chart show?'`, which already exists).
- **weak**: nothing in `vision-ios-2` shows that the Mac answered. **Fix:** line "Ask about a photo on your phone, or a chart on your Mac. A local vision model answers." Chips `['Vision', 'Phone', 'Mac']`.
- **nit**: the alt has no final period ("...on your Mac"). Also, if the shared-compute claim stays, the alt asserts something the screen does not show.
- **nit (capture)**: the receipt reads "LEAFLINE CAFE", which reuses the note-app brand from Web.

#### 13 Vault, `page.jsx:750`
Title "Your secrets stay yours." Line "Encrypted passwords, keys, notes and files. Unlocked only by you." Chips: Passwords, Keys. Screens: `vault-locked`, `vault-typing`, `vault-open`.
- The copy matches. The CHAPTER_DEPTH correction (drop "A clipboard you can search") is done here, but not on /pro/ (see below).
- **nit**: the `vault-open` alt "saved logins and notes" undersells the screen. **Fix:** "Off Grid AI Vault: logins, an API key, a secure note and a signed PDF."
- **thin**: *`vault-file`*, *`vault-recover`*, *`vault-fill`*.

#### 14 Clipboard, `page.jsx:751`
Title "Your clipboard remembers." Line "Text, links, images and files. One shortcut, from any app." Chips: Clipboard, Quick open, **Synced**. Screen: `clipboard` (find that link I copied).
- **weak**: "Synced" is not shown; every item is tagged "This Mac". **Fix:** chips `['Clipboard', 'Quick open', 'Search']`, or add *`clipboard-phone`*.
- **nit**, `page.jsx:629`. The selected clip is the logo image, not a link. **Fix:** `'clipboard': 'search what I copied for acme'`.
- **thin**: *`clipboard-pdf`*, *`clipboard-quick`*.

#### 15 Images, `page.jsx:752`
Title "Your images. Made offline." Line "Open image models on your own machine. No credits, no queue." Chips: Image generation, **Vision**. Screen: `mobile/imagegen-ios-1`, paired with `imagegen-chat` (make an image).
- **wrong (grouping)**, `page.jsx:598`. The phone lighthouse is paired with the desktop alpine lake: different prompts, so not the same task. **Fix:** delete the pair. Use two screens: `imagegen-chat` ("Off Grid AI on the Mac: an alpine lake made with RealVisXL Lightning, with its prompt and settings.") and `mobile/imagegen-ios-1`.
- **weak**: the "Vision" chip belongs to the Vision chapter. **Fix:** chips `['Image generation', 'Enhanced prompts']`. `imagegen-ios-1` shows the enhanced prompt.
- **thin**: *`images-progress`*, *`images-edit`*.

#### 16 Models, `page.jsx:753`
Title "Your models. Every kind." Line "Text, vision, images, speech and computer use. Downloaded once, then it works with the Wi-Fi off." Screens: `mobile/models-ios-1` (paired with `models-text`), `models-voice-list`, `models-vision`, `models-image`, `models-transcription`, `models-computer-use`.
- The copy matches, and every kind is shown.
- **nit**: the `models-voice-list` alt says "Kokoro voices on your computer". The screen is Settings → Voice with the Heart/River/Sarah list, so the caption is fine.

#### 17 API, `page.jsx:754`
Title "Your other apps can use it too." Line "An OpenAI-compatible API on your own machine. Chat, images, speech and embeddings." Chips: OpenAI-compatible, **MCP**, No API key. Screen: `gateway` (curl localhost:7878/v1/chat/completions).
- **weak**: MCP is not on the Gateway screen. **Fix:** chips `['OpenAI-compatible', 'Headless', 'No API key']`. The screen shows `--server-only`.
- **nit**: the alt "local API endpoints and active models" is vague. **Fix:** "Off Grid AI Gateway: the local base URL, a curl example, and endpoints for chat, images, speech, embeddings and models."
- **thin**: *`api-docs`*, *`api-activity`*.

### Privacy section (`page.jsx:987-1068`)
- There are no screenshots; it is an animated illustration labelled "An illustration." The copy is accurate, with no em dashes and no exclamation marks. No findings.

### Explore cards (`page.jsx:1246-1253`)
- **nit**: the section title "Build it with us." (1243) repeats the first card's heading "Build it with us. Pay $0." **Fix:** section title "What comes next."
- The OGAP image alt matches `hero-ecosystem` (frame, cooling module, battery). The Recorder card is fine.

---

## Desktop (`/desktop/`)

### Hero app window, `CHAPTERS` (`pages/desktop.jsx:25-32`)

| Tab | Command | Screens |
|---|---|---|
| God | brief me, Ares | `god`, `god-prep`, `god-waiting`, `god-voice`, `god-choose` |
| Models | download models for this computer | `models-text`, `models-vision`, `models-image`, `models-voice`, `models-transcription`, `models-computer-use` |
| Day | open today | `day` |
| People | who is Sam Okafor? | `entities` |
| Reflect | where did my time go? | `reflect` |
| Vault | unlock my vault | `vault-locked`, `vault-typing`, `vault-open` |

- **wrong (grouping)**: 4 of the 6 hero tabs repeat screens from the explorers on the same page:
  - Day = PRO "It remembers" (`day`).
  - People = PRO "It maps your world" (`entities`).
  - Reflect = PRO "It reflects" (`reflect`).
  - Models = FREE "Any model" (`models-text`, `models-vision`, `models-image`, `models-transcription`) and FREE "Image generation" (`models-image`).

  Meanwhile, the hero lede promises "actions you approve", and no approval appears anywhere on /desktop/. **Fix:** hero `CHAPTERS` = God (add `god-routines`), Act (`actions`, `approval`), Vault (3), API (`gateway`, command `curl localhost:7878/v1/chat/completions`). Drop the Day, People, Reflect and Models tabs; the explorers own those.
- **weak**: the God tab has the same missing-routines gap as on home. **Fix:** add `god-routines`.

### FREE explorer (`pages/desktop.jsx:87-96`)
1. **Chat**, command "what did I promise Sam?". Screens: `chat` (sourced Acme answer), `vision-chat`. Line "Write, ask, and reason with local text and vision models."
   - **nit**: "Write" is not shown. **Fix:** add `['chat-translate', 'Off Grid AI Chat: the reply to Sam translated into Spanish, names and dates kept.', 3800]`, plus `SCREEN_CMDS` already has `'chat-translate'`.
2. **Image generation**, command "make an image". Screens: `models-image`, `imagegen-chat`. Line "Create or edit images on your GPU with Z-Image-Turbo and SDXL-Lightning."
   - **nit**: editing is not shown. **Fix:** "Create images on your GPU with Z-Image-Turbo and SDXL-Lightning."
   - **wrong (grouping)**: `models-image` repeats in "Any model" (item 7) and the hero. **Fix:** keep it here and remove it from item 7 (see below).
3. **Voice**, command "read this reply aloud". Screen: `voice-reply`. Line "Dictate with Whisper. Hear replies with Kokoro. Both run locally."
   - **nit**: the alt names Kokoro, which is not visible, and the command doesn't match the screen. **Fix:** alt "Off Grid AI chat in voice mode: a spoken question about the Acme pilot and a spoken answer, both with transcripts." Command "ask about the pilot out loud".
4. **Projects**, command "ask the Acme project". Screen: `projects`.
   - The copy matches.
   - **weak (thin)**: three Acme project captures sit unused. **Fix:** `Seq` of `projects`, `project-compare` ("What changed from v2 to v3, citing both PDFs."), `project-checklist`. The commands already exist in `SCREEN_CMDS`.
5. **Artifacts**, command "draw the rollout as a flowchart". Screen: `artifacts` (Mermaid flowchart).
   - **nit**: the line lists HTML, React and SVG; only Mermaid is shown. **Fix:** "See a flowchart, page or chart render beside your chat: Mermaid, HTML, React or SVG." Or accept as is.
6. **Connectors**, command "connect my tools". A composed scene (Linear, Notion, Obsidian).
   - **weak**: a real `integrations` capture exists (Notion, Jira and Linear connected; Obsidian ready). **Fix:** use `Framed` `integrations` with alt "Off Grid AI Integrations: Notion, Jira and Linear connected; Google, Microsoft and Obsidian ready to connect." Do this only if Integrations is part of Free; otherwise keep the scene.
7. **Any model**, command "show text models". Screens: `models-text`, `models-vision`, `models-image`, `models-transcription`. Note "Run any model: a curated catalog plus direct Hugging Face search, all local."
   - **wrong (grouping)**: these duplicate item 2 and the hero. **Fix:** `models-text`, `models-vision`, `models-transcription`, `models-computer-use`, `models-voice`, with `models-image` dropped. Once the hero Models tab is removed, this is the only place they appear.
   - **thin**: *`models-hf`* would show the Hugging Face search the line promises.
8. **Offline by default**: a composed scene. Fine.

### PRO explorer (`pages/desktop.jsx:100-110`)
1. **It sees**, command "replay what I worked on". Screen: `replay`.
   - The copy matches.
   - **thin**: *`capture-threads`*.
2. **It remembers**, command "open today". Screen: `day`. Line "Review your day in a journal or replay recorded screens."
   - **nit**: Replay is item 1, not this screen. **Fix:** "Review your day: meetings, to-dos, a journal and a timeline."
   - **wrong (grouping)**: duplicates the hero Day tab. This is resolved by the hero fix.
3. **It maps your world**, command "who is Sam Okafor?". Screen: `entities`.
   - **nit (caption)**: the alt says "the people, projects, and companies you touch, each with a running summary", but the screen is one person's dossier. **Fix:** "Off Grid AI People: Sam Okafor's dossier, with his story and a timeline from Gmail and Meet."
   - Also duplicates the hero (resolved by the hero fix).
4. **It reflects**, command "where did my time go?". Screen: `reflect`.
   - **weak**: the note says "by hour and by app", but there is no hourly view. **Fix:** note "Reflect: where your attention went, by project, person and app." Add `reflect-week`.
   - Also duplicates the hero (resolved by the hero fix).
5. **Meetings**, command "summarize the Acme pilot kickoff". Screen: `meetings`. Line "Record and transcribe Google Meet and Zoom locally. Find summaries in your timeline."
   - **weak**: the screen header lists Zoom, Meet and Teams, and summaries are shown in Meetings, not the timeline. The alt claims a transcript that is not shown. **Fix:** line "Record and transcribe Zoom, Meet and Teams on this computer. See the summary, the screens shared and your focus." Use the alt from home Meetings.
6. **Dictation**, command "dictate a note". Screen: `voice`. Fine.
   - **nit**: the alt could say "...transcribed takes pasted where you were typing, with to-dos pulled out."
7. **Clipboard**, command "find that link I copied". Screen: `clipboard`.
   - **nit**: same command fix as home ("search what I copied for acme").
8. **One search**, command "search everything for acme pilot". Screen: `search`. Line "Find context across recorded screens, meetings, clipboard, and memory."
   - **wrong**: the clipboard is not a search source. The screen shows Gmail, Meet, Linear, Chat and Meeting, and CHAPTER_DEPTH §7 lists no clipboard result kind. The alt also says "documents", which do not appear. **Fix:** line "Find context across recorded screens, meetings, chats and people." Alt "Off Grid AI Search: one query across chats, screens, a meeting and people."
9. **Computer Use and Web Use**, command "compare Team pricing for three note apps". Screens: `web-plan`, `web-takeover`, `web-done`.
   - **wrong (grouping)**: these three screens also play in the Computer Use section on the same page (`desktop.jsx:125`, `web(false)`). **Fix:** remove this item from `PRO`, because the section already covers it.
   - **weak**: "in your apps" (Computer Use) is never shown, here or in the section. No capture exists. Either reword the section Lede to "Ask your assistant to work in your browser..." or capture a Computer Use run (not in CHAPTER_DEPTH; suggest `computer-live`).

### Web Use section (`pages/desktop.jsx:118-128`)
Screen alts:
- `web-plan`: "working a web task step by step on a comparison site".
- `web-takeover`: "Your turn: Off Grid AI pauses for you to sign in. It never reads your password."
- `web-done`: "finished, with the result".

Findings:
- **nit**: "It never reads your password" is a claim the screen can't show. It is consistent with COMPUTER_USE.md (secure fields stop the run, and typed text is redacted), so keep it, or soften it to "It stops at the password field."
- **nit**: `SEARCH_HITS` (99), `WEB_STEPS`, `WEB_ROWS` and `POINTER` (114-116) are dead constants. `WEB_ROWS` prices Leafline at $8/mo, which contradicts the captured $5. **Fix:** delete them.

### Free-vs-Pro card (`pages/desktop.jsx:202-205`)
- **weak**: the Pro list omits God and Vault, which the hero shows, and Sync and approvals, which the lede promises. "Day, Replay and Reflect" splits Replay away from "Capture". **Fix:** pro = `['God, your chief of staff', 'Capture, Replay and searchable memory', 'Day, People and Reflect', 'Meetings, dictation and clipboard', 'Actions and Web Use, with your approval', 'Vault, and Sync across up to N devices']`.
- The Free list matches the FREE explorer.

### Other
- **nit**, `desktop.jsx:198`. "Desktop preview adds Linux Pro capture..." is fine.

---

## Mobile (`/mobile/`)

### Hero phone (`pages/mobile.jsx:93-111`)
Command `draft a reply to Sam`, which then follows the screen on show.

| Screen | Command | Alt |
|---|---|---|
| `chat-ios-1` | draft a reply to Sam | A reply drafted on the phone for the Acme team. |
| `imagegen-ios-1` | make an image | An image generated from a short prompt, with the enhanced prompt it used. |
| `vision-ios-2` | what's the total on this receipt? | A photo of a receipt, answered with the total. |
| `voice-ios-2` | talk to my AI | Asked by voice, answered as voice notes with transcripts. |
| `project-ios-2` | ask the Acme project on my phone | A project answer that cites its document. |
| `models-ios-1` | choose models for my phone | Models picked for your phone, with vision and tools marked. |

- **wrong (persona)**: `chat-ios-1` (both themes) is a reply to Sam **signed "Priya"**, from a prompt that says "signed Priya". Alex is the user. **Fix:** recapture `chat-ios-1` with "signed Alex" in the prompt. This one shot also appears in the mobile FREE Chat item and in the /download/ hero.
- **nit (caption)**: "for the Acme team" is wrong; the reply goes to Sam Okafor, the customer. **Fix:** "A reply to Sam Okafor, drafted on the phone."
- **weak (grouping)**: 5 of the 6 hero screens repeat in the explorers below:
  - `chat-ios-1` = FREE Chat
  - `imagegen-ios-1` = FREE Images
  - `vision-ios-2` = FREE Vision
  - `project-ios-2` = FREE Projects
  - `voice-ios-2` = PRO Voice mode

  **Fix:** make the hero a short "what it looks like" loop of shots the explorers don't use: `models-ios-1`, `voice-ios-1` ("A spoken brief on the Acme pilot, with its transcript."), `models-ios-2` ("Kokoro, the on-device voice."), then one of the five above. Or accept the hero as a summary and drop the matching explorer shots in favour of new captures. `home-ios-1` is light-only, so it can't be used until a dark twin exists.

### FREE explorer (`pages/mobile.jsx:75-84`, `REAL` 56-65, `FEATURE_CMDS` 74)
1. **Chat**, command "draft a reply to Sam". Screen: `chat-ios-1`.
   - **wrong**: the Priya persona problem above.
   - **nit**: the alt says "Gemma, running on the phone", but no model name is visible. **Fix:** "A reply to Sam Okafor at Acme Corp, drafted on the phone by a local model."
2. **Image generation**, command "make an image". Screen: `imagegen-ios-1`. Line "Create images with on-device Stable Diffusion and a live preview."
   - **nit**: no live preview is shown; the screen shows an enhanced prompt and the finished image. **Fix:** "Create images on your phone with Stable Diffusion. Short prompts are enhanced first."
3. **Vision AI**, command "what's the total on this receipt?". Screen: `vision-ios-2`. The copy matches.
   - "or with your computer's vision models" is a claim the screen does not show. This is acceptable as a capability line.
4. **Voice input**, command "dictate a note". A composed `VoiceScene` with the Whisper badge.
   - **weak (thin)**: there is no real screen, and no existing mobile capture fits: `voice-1` and `voice-r*` are off-persona "Hey, how are you doing?" chats. **Fix:** new capture `voice-dictate-ios` (not in CHAPTER_DEPTH, which covers desktop only).
5. **Projects**, command "open the Acme project", then "ask the Acme project on my phone". Screens: `project-ios-1`, `project-ios-2`. Line "Ask about your PDFs and documents."
   - **nit**: the document shown is `Acme_rollout_v3.txt`, not a PDF. **Fix:** "Ask about your documents and notes. Answers cite their sources."
6. **Tools**, command "how many seat-days is the pilot?". Screen: `tools-ios-1`. Line "Use web search, a calculator, and document lookup with compatible models."
   - **weak**: only the calculator is shown. **Fix:** "Let compatible models use a calculator, web search and document lookup. Here, the calculator works out seat-days." Or capture a web-search turn.
7. **Larger models**, command "use the model on my Mac". Light: `remote-ios-2`; dark: a composed scene. Line "Use Off Grid AI Desktop, Ollama, or LM Studio over your local network."
   - **wrong (persona)**: `remote-ios-2` shows "**Maya's Mac**". **Fix:** recapture with "Alex's Mac".
   - **weak (caption)**: "using a model on your Mac" doesn't match a screen that lists servers and shows no chat. **Fix:** "Remote Servers on iPhone: your Mac's Off Grid AI gateway, connected over your own Wi-Fi."
   - **weak (rule check)**: the line names Ollama and LM Studio, both rival local-AI apps. If the no-competitor rule covers them: "Use Off Grid AI Desktop, or another local model server, over your local network." Founder's call: they are real compatibility targets, and `remote-ios-1` shows them as scan options.
8. **Offline by default**: a composed scene. Fine.

### PRO explorer (`pages/mobile.jsx:85-90`)
1. **Voice mode**, command "talk to my AI". Screen: `voice-ios-2`.
   - **nit**: the line names Kokoro, but the voice picker shows "Sarah", which is a Kokoro voice. Fine.
   - Duplicates the hero (see above).
2. **Custom personas**: a composed `PersonaScene` (`mobile.jsx:22-29`).
   - **wrong (persona)**: the Memory field says "Works at Acme Corp". That makes the user an Acme employee; Alex works with Acme, and Sam works at Acme. **Fix:** `'Works with Acme Corp on the pilot · prefers metric units · pilot starts 14 Nov'`.
3. **Draft, then approve**: a composed `ApprovalScene`, "To Sam Okafor". Fine.
4. **Sync is live**, command "pair my phone and my Mac". Screen: `sync-ios-1`. Line "Continue chats across paired devices. Transfers are encrypted, without an Off Grid AI storage server."
   - **wrong (persona)**: the Maya's iPhone / Maya's Mac problem from home Phone.
   - **weak**: the screen shows pairing, not a chat being continued. **Fix:** "Pair your phone and computer over your own Wi-Fi. Transfers are encrypted, without an Off Grid AI storage server."

### Phone cards at narrow widths (390 wide)
- These are the same 12 items as cards. They render with no overflow and no errors. The same findings apply. Composed cards: Voice input, Offline, Personas, Approve.

### Dead copy
- **nit**, `mobile.jsx:43`. `SCENES.chat` (a landlord reply signed "**Sam**") never renders, because `REAL.chat` covers both themes. It would make Sam the user. **Fix:** delete it, or sign it Alex. `SCENES.projects`, `.images`, `.tools`, `.sync` and `.voicemode` are dead for the same reason.

### Free-vs-Pro card (`mobile.jsx:167-170`)
- **nit**: "Image generation with live preview" is not shown (see FREE 2). **Fix:** "Image generation, with enhanced prompts".

---

## Pro (`/pro/`)

### Hero sequence (`pages/pro.jsx:36-41`)
Command "brief me, Ares". Screens: `god` ("Ares briefs you on your day, with approvals waiting."), `day` (open today).
- **weak (grouping)**: `god` is also screen 1 of the God tab below. The H1 is "An AI that remembers your work. And acts when you say yes.", but the hero shows no "yes". **Fix:** hero = `day` (remembers) + `approval` ("Off Grid AI approval card: the reply to Sam Okafor, waiting for Approve, Edit or Reject."). The chapter command becomes "open today". The God tab keeps `god`. Then move the Actions tab to `actions` + `integrations` (below), so `approval` isn't repeated.

### Capability tabs, `CAPS` (`pages/pro.jsx:277-288`)
1. **Memory**, "It sees. It remembers.", command "remember my work". Screens: `entities`, `meetings`, `replay`. Line "Screens, meetings, mail and docs become one local memory."
   - The copy is covered: Gmail is in the entities timeline and the PDF is in replay.
   - **nit**: order the screens to match the title: `replay` ("sees"), `meetings`, `entities`. The `meetings` alt is fine; the `replay` alt "recorded screen activity" could name the Acme plan.
2. **Actions**, "It acts. You approve.", command "draft the reply to Sam". Screen: `approval`. Line "Replies, tickets and docs in Slack, Gmail, Linear, Jira and GitHub. Nothing runs without your yes."
   - **weak**: only one Gmail reply is shown; Slack, Linear, Jira and GitHub are not. **Fix:** screens `actions` ("Off Grid AI Actions: open to-dos, Suggest actions and three approvals waiting.") and `integrations` ("Notion, Jira and Linear connected; actions run only after approval."), plus `approval` if the hero keeps `day` + `god`. Line "Replies, issues and docs through Gmail, Linear, Jira and Notion. Nothing runs without your yes."
3. **God**, "God, your chief of staff.", command "brief me, Ares". Five God screens. Line "It briefs you, runs your routines and lines up work for your yes."
   - **weak**: "runs your routines" is not shown. **Fix:** add `god-routines`. It duplicates the hero's `god` (resolved by the hero fix).
4. **Reflect**, "Where your day went.", command "where did my time go?". Screen: `reflect`. Line "Time by task, app and person. No timers."
   - **nit**: the screen shows projects, not tasks. **Fix:** "Time by project, app and person. No timers."
   - **thin**: add `reflect-week`.
5. **Vault**, "Your secrets stay yours.", command "unlock my vault". Screens: `vault-locked`, `vault-typing`, `vault-open`, `clipboard`. Line "Passwords, keys and notes, encrypted. Plus a searchable history of everything you copy."
   - **weak (misgrouped)**: this is the CHAPTER_DEPTH correction ("A clipboard you can search" belongs to Clipboard) still live on /pro/. The command stays "unlock my vault" while the clipboard plays. **Fix:** remove `clipboard` from this tab. Line "Passwords, keys, notes and files, encrypted. Unlocked only by you." Add a sixth tab `{ id: 'clipboard', cmd: 'search what I copied for acme', Icon: ClipboardText, tab: 'Clipboard', title: 'Your clipboard remembers.', line: 'Text, links, images and files you copy, searchable on your disk.', shots: [['clipboard', 'Off Grid AI Clipboard: a search for acme finds an image, a PDF, a link and text.']] }`.
   - **nit**: the clipboard alt "Clipboard history with search." is generic (fixed by the line above).

### Other blocks
- The Sync section (`pro.jsx:337-352`) has no screenshots. "Send files and models to a paired device" is a claim with no screen. Add *`phone-send-model`* once it exists. The `sync-ios-1` / `sync-devices` captures are unusable until the Maya → Alex recapture.

---

## Download (`/download/`), hero (`pages/download.jsx:97-103`)
Command "brief me, Ares", then per screen.

| Screen | Alt |
|---|---|
| `god` | the 8:50 AM briefing, with three approvals waiting |
| `chat` | what you promised Sam, answered with sources |
| `meetings` | an Acme Corp call summarized and transcribed on device |
| `mobile/chat-ios-1` | the reply to Sam drafted on the phone |
| `models-text` | the text models on this computer and the catalog |

- **wrong (grouping)**: `mobile/chat-ios-1` is a `SHOT_PAIRS` key (`page.jsx:596`), so it renders next to `chat`, which is already screen 2. The same desktop shot appears twice in one sequence. `chat-ios-1` also carries the Priya signature. **Fix:** replace screen 4 with `['mobile/voice-ios-1', 'Off Grid AI on iPhone: a spoken brief on the Acme pilot, with its transcript.', 3600]`, which is unpaired and on-persona.
- **nit**: the `meetings` alt "summarized and transcribed on device". The transcript is not shown, though the header says "transcribed on device". **Fix:** "an Acme Corp call, summarized on device, with what was on screen."

## Quick start (`/quick-start/`), `STEPS` (`pages/quick-start.jsx:31-46`)
1. **Install**, command "install Off Grid AI". A composed install card. Fine.
2. **Prepare a model**, command "download a model" (shown: "show text models"). Screen: `models-text`.
   - **weak**: the line walks through "Settings → Setup & health ... Configure", which the screen does not show; it shows the Models catalog. **Fix:** either reword the line to match the shot ("Open Models, pick a text model that fits your memory, and select Download"), or capture `setup-health` (new; not in CHAPTER_DEPTH).
3. **Start a chat**: a composed chat (Qwen 3.8, Acme bullets). Fine.
4. **Add memory and actions**, command "turn on memory and actions" (shown: "draft the reply to Sam"). Screens: `approval`, `replay`. The compact card shows `approval` only.
   - **nit**: the line's order is license, then capture, then approve; the screens run approve, then capture. **Fix:** `Seq` order `replay`, then `approval`. Use `replay` for the compact card too, since memory is the first thing Pro turns on.

## Thank you (`/thank-you/`) (`pages/thank-you.jsx:86-87`)
- `god`, with alt "Ares briefs you on your day, with approvals waiting. Part of Pro." and figcaption "God briefs you on your day and lines up work for your yes." Both match. No findings.

## Vision (`/vision/`) (`pages/vision.jsx:28`)
- **weak**: chapter 01 says "your 9am is with someone you haven't spoken to in three months, and the last conversation left an open item". The `day` shot shows nothing like that; its meetings are at 2:50, 3:45 and 5:45 PM. **Fix:** use `god-prep` (it shows "Last time (24 Sep)" and "You owed him the Q3 risk list. It is still open"), with alt "Off Grid AI God: prep for the Northwind board meeting, with what you discussed last time and the item you still owe." Optionally soften "three months" to "weeks".

## OGAP (`/ogap/`)
- Product renders only, no app screenshot sequences. Alts match the images: `hero-ecosystem` is checked, and `fit`, `wired` and `wireless` alts describe their renders. No findings.

---

## Rule sweep (all tour copy in `page.jsx` and `pages/*.jsx`)
- **Em dashes**: none in rendered copy; they appear only in code comments. Several app UI strings inside screenshots contain "—" (Gateway subtitle, Actions header, Reflect insights). That is app copy, so it is out of scope here.
- **Exclamation marks**: none in site copy. Some screenshots contain them ("Hello!" in the gateway curl, "Thank you!" on the receipt). Those are app or prop content.
- **Competitor names**: "1Password" inside `capture-settings` (**wrong**, above). "Ollama, or LM Studio" in the mobile Larger models line (founder's call, above). "OpenAI-compatible" is a protocol descriptor and is fine.
- **Persona drift**:
  - "Maya's iPhone/Mac" in `mobile/sync-ios-1`, `mobile/remote-ios-2` and the unused `sync-devices`.
  - The reply signed "Priya" in `mobile/chat-ios-1`.
  - "Works at Acme Corp" in the mobile persona scene.
  - The "ONE DAY WITH SAM" kicker.
  - The dead landlord scene signed "Sam".
  - The "S" avatar in `web-done`.
  - The Helio Labs seed issue from CHAPTER_DEPTH is resolved; every Acme shot says Acme Corp.

## CHAPTER_DEPTH "Copy and claims to correct": status
1. Vault line includes the clipboard: **fixed on home**, **still live on /pro/** (`pro.jsx:286`).
2. Meetings "who said what": no current copy says it. Watch the proposed *`meetings-transcript`* command "show who said what" when capturing.
3. Voice is phone-only: **fixed**. Home Voice now includes desktop `voice` and `voice-reply`.
4. Seed company Helio Labs: **fixed** in all used captures. The new drift is Maya and Priya, as listed above.
