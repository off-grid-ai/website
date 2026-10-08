# Chapter depth: what each tour chapter's feature can actually do

Research date: 8 Oct 2026. Read-only pass over the OGAD desktop repo and the website.

**Path roots used below**
- `D/` = `/Users/user/wednesday/off-grid-ai/desktop/`
- `P/` = `/Users/user/wednesday/off-grid-ai/desktop/pro/` (the Pro submodule)
- `W/` = `/Users/user/wednesday/off-grid-ai/website/`

**What the site shows today** (from `W/preview-ui/page.jsx:736-754` and `W/assets/img/home/app/`):
Today = `day` (1 shot). God = 5 shots. Phone = 2 phone shots. Capture = `replay`, `capture-settings`. People = `entities` (1). Reflect = `reflect` (1; `reflect-week` exists but is unused). Ask = `search`, `chat`. Act = `approval` (1; `actions` exists but is unused). Web = `web-plan`, `web-takeover`, `web-done`. Meetings = `meetings` (1). Voice = 1 phone shot. Vision = 1 phone shot. Vault = 3 shots. Clipboard = `clipboard` (1). Images = 1 phone shot. Models = 6 shots. API = `gateway` (1).

**Out of scope on purpose.** I did not open the Vault UI or engine code (`P/renderer/screens/VaultScreen.tsx`, `P/main/vault/*`), the license or seed-license scripts, or anything under `~/Library`. The Vault capabilities below come from the Pro catalog copy and the website's Vault articles.

---

## How to capture: one seeded throwaway profile

- **Harness.** One already exists. `D/scripts/screenshots-pro.mjs` launches the built app with Pro active, in an isolated profile (`OFFGRID_USER_DATA=<tmp>`), seeded through `OFFGRID_SEED_PRO=1|force`. The seeder is `P/main/dev-seed.ts`.
- **What the seed fills:** entities with hierarchy, aliases and facts; today's observations, plus synthetic Replay frames rendered with sharp; calendar events; actions; approvals plus the audit log; meetings; voice recordings; text-only clipboard items; and the day journal.
- **What the seed does NOT fill:** paired devices, vault, God routines, Web Use or Computer Use task history, chat conversations, AI activity logs, image or file clipboard items, and meeting media (`audio_path` is `''`, so the video player and the Audio/Video export buttons stay hidden).
- **Persona drift to fix in the seed.** The seed's cast is already close to the storyboard: Sam Okafor, Priya Nair, Tom Reyes, Maya Chen, Daniel Cole and Northwind Capital. Three things differ.
  - Sam's company is **Helio Labs**, and the kickoff is "Helio Labs pilot kickoff". Rename both to **Acme Corp** / "Acme pilot kickoff" (`P/main/dev-seed.ts:92-108, 361-475`).
  - The brief puts Priya, Tom and Maya "at Northwind". The seed and the storyboard make them Alex's team, with only Daniel at Northwind. **Pick one.** I assume the storyboard version below.
  - Add the 14 Nov / 40-seat facts, `Acme_rollout_v3.pdf` observations, and the 10:00 kickoff with a `You:` / `Them:` transcript.
- **LLM answers** (chat, God, journal refresh, synthesis) need a local text model downloaded into the throwaway profile. That needs no account, but replies vary from run to run. They are marked **medium**.

Difficulty key:
- **easy:** reachable with the seed plus clicks.
- **medium:** needs a model download, a small seed addition, a local file or a second local process.
- **blocked:** needs a real phone, a real account, a microphone, a real call or real credentials.

---

## 1. Today (Day)

Site copy: "Meetings, to-dos, journal and time spent." Current shot: `day` only.

### Capabilities
- **Bento of 6 blocks** on the live day: To do, Today's meetings, Off Grid AI suggests, Journal, Time spent and Timeline. `P/renderer/screens/DayView.tsx:730-745`
- **Arrange the layout.** Drag blocks within and across the Ahead/Behind columns. Resize them with dividers. Hide a block (it then appears as a "Hidden: + Journal" chip) and restore it. "Reset layout". The layout persists per device through `day:get-layout`/`day:set-layout`. `DayView.tsx:720-1032, 1203-1227`
- **To do block.** "Jot a to-do..." inline. Mark done, with an Undo toast. Prioritize (thumbs). Dismiss with an optional reason; the button becomes "Dismiss & teach". Click an entity chip to open the person. `DayView.tsx:466-554`, `P/renderer/screens/TodoCard.tsx`
- **Meetings block.**
  - Each event has a **Prep** toggle that expands **Who** (attendees with their dossier line), **Recently discussed** and **Open items**. States: "Pulling context..." while loading, and "No prior context found".
  - The event title opens Google Calendar. `DayView.tsx:140-311`
- **Off Grid AI suggests.**
  - Proposed actions, each with a "Where this came from" provenance panel listing the observations it was based on.
  - "Review in Chat", or dismiss with a reason. `DayView.tsx:313-464`, `P/renderer/screens/ProvenanceBlock.tsx`
- **Journal.** Auto-written prose about the day. Refresh. States: "Writing your day..." and "No summary yet." `DayView.tsx:558-599`
- **Time spent.** Bars per surface (app or site). `DayView.tsx:601-625`
- **Timeline.**
  - Grouped by hour. Click a block to expand extra summaries and entity chips.
  - An icon opens Replay at that exact moment. `DayView.tsx:627-717`
- **Day navigation.** Previous/next day. A past day switches to a **retrospective recap**: journal, time spent, and the timeline with "Open in Replay ->". `DayView.tsx:1160-1334`
- **"View all"** links to Actions (To do / Approvals), Meetings and Replay. `DayView.tsx:1135-1157`
- **Proactive delivery.** Morning briefing and meeting heads-up arrive as local notifications, even with the window closed. `P/renderer/settings-sections.tsx:263-282`, `D/src/renderer/src/components/pro/proCatalog.ts` (notifications entry)

### Proposed screens

| # | File | Exact UI state | Seed needed | Command |
|---|---|---|---|---|
| 1 | `today-bento` | Day, Today, default layout. Header shows "Thursday... 6h of activity". | 08:50 events, to-dos and journal, as in the storyboard | "open today" |
| 2 | `today-prep` | Meetings block: **Prep ▴** expanded on the "Acme pilot kickoff · 10:00" event. Who shows Sam Okafor (Acme Corp IT lead), Priya Nair and Tom Reyes. Recently discussed and Open items are filled. | Event attendees "Sam Okafor, Priya Nair, Tom Reyes". Prior observations about Acme. One open item due Friday. | "prep me for Acme kickoff" |
| 3 | `today-why` | Off Grid AI suggests: "Draft a reply to Sam Okafor re: rollout plan" expanded, showing the provenance list (kickoff 10:00, `Acme_rollout_v3.pdf` in Preview). | Pending approval plus linked observations | "where did this come from?" |
| 4 | `today-timeline` | Timeline block resized tall. The 10 AM block is expanded, with chips Sam Okafor, Acme Corp and Acme pilot, and the Replay icon hovered. | Today's observations, 10:00-10:45 | "show my 10am in detail" |
| 5 | `today-journal` | The day after 21:00. Journal block enlarged and Time spent visible, recounting the call, the promise and the reply. | `day_journals` row for today in the storyboard's wording | "write my journal" |
| 6 | `today-yesterday` | Previous day (Wed 7 Oct) in recap mode: journal, time spent, timeline, "Open in Replay ->". | Yesterday's observations and journal (the seed currently adds today only) | "what did I do yesterday?" |

### Capture difficulty
- Screens 1-5: **easy**. Prep is read from the database (`crm:event-prep` -> `getEventPrep`, `P/main/crm-ipc.ts:439`), so it needs no model.
- Screen 6: **medium**. Add a second day of observations and a journal to the seed.

---

## 2. God

Site copy: "chief of staff... briefs you, and lines up work for your yes." Current shots: god, god-prep, god-waiting, god-voice, god-choose.

### Capabilities
- **Three-column screen.** `P/renderer/components/god/GodTwinScreen.tsx:190-281`
  - The 3D god (Ares; Athena is downloadable) with a status line and a control bar: Talk, poses, spin.
  - A **Right now** card: time; next meeting with "Prep me for..."; open to-dos; approvals waiting; connected accounts. `GodContextCard.tsx:60-132`
  - **One-tap offers:** Prep me for X, What should I do first?, Review what is waiting, Plan my day, What did I miss?, What's new in Off Grid AI. `P/shared/god/god-context.ts:125-165`
- **Chat or Voice mode switch.** Voice "speaks every answer" and keeps listening. `GodTwinScreen.tsx:428-463`
- **Welcome state.** "Ask Ares" heading and a "What can you do for me?" button, then 7 capability cards, each with sample prompts and a deep link: Your day, Mail and accounts, Memory, Acts for you, To-dos and approvals, Works while you are away, Voice. Below them, "Make Ares yours". `GodWelcome.tsx`, `P/shared/god/god-capabilities.ts:26-137`
- **Rail.** `GodRail.tsx`
  - **Needs you:** approval, meeting, task, due and brief items. Approvals get **Approve / Deny / Ask Ares** and an amber border. Other items can be dismissed.
  - **Activity:** "Working on..." with a spinner, then a done tick.
- **Scheduled tasks (routines).**
  - Clock schedules: every day, weekdays, every few hours, once.
  - **Event triggers:** when an email arrives (with an optional "From" filter), when a meeting is about to start, when a web or computer task finishes, when something waits for approval.
  - Each routine has run now, edit and delete. `RoutineForm.tsx:11-19`, `GodRoutines.tsx`, `P/shared/god/god-routines.ts:22-29`
- **God settings panel.** `GodTwinSettings.tsx`
  - Look: helmet, shield, spear or sword, greaves.
  - Rename the god.
  - **Rules it always follows**, e.g. "Ask before sending any email".
  - Control bar choices; whether clicks go through Ares on the desktop.
  - Reply sound; show on desktop.
  - Wake word: "Listen for 'Ares'", change the word, plus **wake-word training** ("Teach Ares"). `WakeWordTraining.tsx`
- **All workflows** (presets with intake forms and readiness badges such as "Needs a paired phone", "Needs some capture history" and "Needs an image model"): `D/src/renderer/src/components/explore/presetCatalog.ts`, `ExploreSection.tsx:29-34`
  - Create a comic book
  - Find a flight
  - Best-reviewed spots nearby
  - Compare prices across stores
  - Train My Feed (X, LinkedIn, Instagram, TikTok, YouTube)
  - Play music on Spotify
  - Edit a screenshot
  - Draft an email reply
  - Recall your day
  - Find something you saw
  - Get today's summary on your phone
- **Desktop companion.** Ares stands on the desktop outside the app and mirrors state. `GodTwinCompanion.tsx`, `P/main/god/god-twin-window.ts`

### Proposed screens

| # | File | Exact UI state | Seed needed | Command |
|---|---|---|---|---|
| 1 | `god-welcome` | Empty God chat: capability cards in the centre. Right now shows "Acme pilot kickoff in 1h 10m", "4 open: Send revised rollout plan", "3 waiting for your approval". Rail has 3 Needs-you items. | Events, to-dos, approvals; god character downloaded | "what can you do?" |
| 2 | `god-brief` | Answer to "brief me" in chat. Rail Activity shows a done tick on "Read your calendar" and "Checked approvals". | Same, plus local LLM | "brief me, Ares" |
| 3 | `god-needs-you` | Rail scrolled: the approval "Send rollout reply to Sam Okafor" with **Approve / Deny / Ask Ares**, a meeting item, and a due item "Owners per stage, due Fri". | Approvals and actions | "what's waiting for me?" |
| 4 | `god-routine` | God settings -> Scheduled tasks. The form is open: title "Morning brief", When "Weekdays at" 09:00. A second routine is listed: "When a meeting is about to start", meeting name "Acme". | none (create in UI) | "brief me every weekday" |
| 5 | `god-rules` | God settings -> Name and rules, with "Ask before sending any email. Never message Northwind without me." and the wake word "Ares" on. | none | "always ask before emailing" |
| 6 | `god-workflows` | Left column: "All workflows" expanded showing the preset cards with badges ("Ready to run", "Needs a paired phone"). | Capture history present | "show me all workflows" |

### Capture difficulty
- Screens 1 and 3-6: **medium only for the one-time god character download** (network, no account), otherwise easy.
- Screen 2: **medium** (needs a local LLM; output varies).
- Live wake-word listening and Voice-mode speech: **blocked** (microphone). The settings toggles themselves are easy.

---

## 3. Phone (sync)

Site copy: "Device to device and encrypted. No Off Grid AI server in between." Current shots are phone-side only. The desktop Devices screen is not shown; `sync-devices` exists but is unused.

### Capabilities
- **Devices screen tabs:** Devices, Sync sharing, Activity, Files. `D/src/renderer/src/lib/internal-tab-route.ts:16-21`, `P/renderer/screens/DevicesScreen.tsx`
- **Pairing and connection.** `DevicesScreen.tsx:1350-1440, 2356-2690`, `P/renderer/components/DeviceActions.tsx`
  - "Pair a device" by **QR code** or by code.
  - **Find nearby devices** over WiFi and Apple "Nearby". Rescan.
  - Rename this device; Reconnect; Pair again; a device-limit state.
  - **Connection settings:** sync port; a private-network address (an IP or machine name, Tailscale-style).
- **Sync sharing.** Choose what stays in step: chats, projects, model settings, and "Text copied after you turn this on" for the clipboard. `P/renderer/settings-sync.tsx:120-135`
- **Remote actions.** "Let paired devices use this Mac's tools", so the phone drives the Mac. `P/renderer/components/ToolSharingControls.tsx`
- **Ambient files.** `P/renderer/components/AmbientSharingControls.tsx:33-35, 249-325`, `AmbientDocumentKindsDialog.tsx`
  - Watch a chosen folder.
  - Per-destination mode: **Off / Ask / Auto**.
  - Pick which document kinds are sent.
  - "Queue while a device is offline"; "Send a file now"; previews open inside OGAD.
- **Activity.** Transfer activity with a filter and "Clear activity". `DevicesScreen.tsx:1700-1790, 2909-2931`
- **Send a model to the phone.** Model type filter, only OGAM-compatible models, "Send in background". `DevicesScreen.tsx:3030-3243`
- **Shared compute.** A phone chat is answered by the Mac's model. `P/renderer/components/RemoteChatPreviews.tsx`, `P/main/sync/desktop-model-control.ts`
- **Task status from the phone.** Computer Use and Web Use task records sync. `D/docs/COMPUTER_USE.md:43-44`

### Proposed screens

| # | File | Exact UI state | Seed needed | Command |
|---|---|---|---|---|
| 1 | `phone-pair` | Devices tab, "Pair a device" panel with the QR code and "Find nearby devices" scanning. | none | "pair my phone and Mac" |
| 2 | `phone-devices` | Devices list: "Alex's iPhone · Online", "Alex's Mac (this device)". Remote actions **on**. | A real paired peer | "show my devices" |
| 3 | `phone-sharing` | Sync sharing tab: chats, projects and model settings on. Ambient files watching `~/Downloads/Acme` in **Ask** mode, document kinds = PDF, DOCX. | none for toggles; folder pick is local | "choose what syncs" |
| 4 | `phone-send-model` | Send-model dialog: Model type = Text, Gemma selected, "Send in background" ticked. | An OGAM-compatible model installed, plus a paired peer | "send a model to my phone" |
| 5 | `phone-activity` | Activity tab: `Acme_rollout_v3.pdf` sent to Alex's iPhone, a screenshot received, a clipboard text received. | Real transfers | "what came across?" |
| 6 | (keep) `mobile/project-ios-2` | Phone answering from the Acme project using the Mac's model | existing | "ask Acme on my phone" |

### Capture difficulty
- Screen 1: **medium**. Needs a Pro-activated profile. The QR encodes a LAN address, so blur it.
- Screen 3: **easy** to **medium**.
- Screens 2, 4, 5: **blocked** without a real phone. They become medium if a second OGAD instance on the LAN acts as the peer (it would show as a computer, not "iPhone").

---

## 4. Capture (Replay)

Site copy: "Mail, files, chats and meetings. Stored on your disk." Current shots: `replay`, `capture-settings`.

### Capabilities
- **Film player.** `P/renderer/screens/ReplayScreen.tsx:99, 455-867`
  - Play/pause, step, scrubber with an "n/N" frame count, **speed 1x/2x/4x/8x/16x**.
  - Keyboard: Space, left and right arrows.
  - Previous/next day; frame count in the header.
- **Frame commentary panel** (resizable). `ReplayScreen.tsx:576-707, 868-905`
  - App, time, processing status (queued, processing, failed, blocked, "Description added"), AI description and #tags.
  - **Edit** the description and tags.
  - **Reprocess this frame** with the current model.
  - **Delete frame**. The dialog explains it also removes observations that only this frame supports.
- **Work threads.** The day is clustered into concurrent threads, drawn as coloured bands. Click a band to seek; legend chips list entities. Clicking an entity chip opens **focus mode**: "Sam Okafor · this day · 7 moments", a list of scenes that jump the film. `ReplayScreen.tsx:533-575, 711-795`
- **Capture controls in the header.** Pause, Resume, Restart. Capture settings popover with **Excluded apps** (add or remove by name). `P/renderer/CaptureToggle.tsx`, `P/renderer/CaptureExclusionsPanel.tsx`, `P/renderer/use-capture-control.ts:108-124`
- **Settings -> Capture.** `P/renderer/settings-sections.tsx:69-285`, `ReprocessButton.tsx`, `CaptureFailureRecovery.tsx`
  - Metrics: Screen access, Accessibility text, Vision model, Frame queue, Last frame, Last observation.
  - Pipeline: "Accessibility text + local vision" on macOS.
  - Model context, with Change context.
  - **Re-process today**; **Retry failed frames**; Proactive delivery.
- **Other sources:**
  - Google (Gmail, Calendar, Drive, Contacts), Microsoft, and **Obsidian vaults** (local notes). `P/renderer/QuickProviderConnections.tsx:9`, `ObsidianQuickConnection.tsx:120-151`
  - Chat tools search Replay and meetings. `P/main/replay-tool.ts`, `P/main/meeting-tool.ts`

### Proposed screens

| # | File | Exact UI state | Seed needed | Command |
|---|---|---|---|---|
| 1 | `capture-film` | Replay, Today, paused at 10:45 on a frame of `Acme_rollout_v3.pdf` p.3 in Preview. Commentary: "Reading Acme rollout plan v3: pilot starts 14 Nov, 40 seats" with #acme #rollout. Speed 4x selected. | A custom frame PNG of the PDF page plus caption and tags | "replay what I worked on" |
| 2 | `capture-threads` | Same day. Transport shows Work threads "4 threads · 19 bands" with legend chips Acme pilot, Northwind, Off Grid AI, Sam Okafor. | Observations attributed to entities across the day | "show my work threads" |
| 3 | `capture-focus` | Focus on **Sam Okafor**: right panel lists the 10:00 kickoff, 10:45 PDF and 11:05 Gmail draft scenes. | Same | "everything about Sam today" |
| 4 | `capture-edit` | Commentary in **Edit** mode: description corrected, tags "acme, rollout, pilot". | Same | "fix this frame's notes" |
| 5 | `capture-exclude` | Header capture settings popover: Excluded apps = "Banking", "Messages", "Keychain Access" (no competitor brands). Capture toggle shows "Capturing". | none | "keep banking out of capture" |
| 6 | `capture-health` | Settings -> Capture: metric grid all green, "Re-process today" and "Retry failed frames" visible. | Pipeline running | "is capture working?" |

### Capture difficulty
- Screens 2-5: **easy** with the seed. The seed draws its own synthetic frames.
- Screen 1: **medium**, to get a realistic PDF frame: add one PNG and point a `frames.image_path` at it.
- Screen 6: **medium**. "Capturing" with green metrics needs the OS screen-recording permission and a vision model in the throwaway profile.

---

## 5. People (Entities)

Site copy: "People and companies from your mail, meetings and chats." Current shot: `entities` (1).

### Capabilities
- **Directory.** `P/renderer/screens/EntitiesScreen.tsx:224-362`, `D/src/renderer/src/lib/internal-tab-route.ts:22-30`
  - Tabs with counts: All, Projects, People, Companies, Topics, Places, Objects.
  - Find....
  - **Latent (n)**: one-off mentions held back until they recur.
  - **Show archived**.
  - **Organize**: auto-merge duplicates and build the project hierarchy.
- **Projects table.** Project, Mentions, Last active. Expand a row to see sub-projects. Merge or hide per row. `EntitiesScreen.tsx:700-770`
- **Dossier slide-over.** `EntitiesScreen.tsx:940-1313`
  - Header: set a photo; rename inline; change type; **Merge**; **Archive**.
  - Identifiers: **Email / Phone / Handle** chips, add and remove; a.k.a. aliases.
  - "Part of" parent-project picker, for projects.
  - **Source coverage** chips, e.g. "2 meetings · 14 screen · 1 voice".
  - **The story**: synthesized automatically, with Re-synthesize.
  - **Timeline**: grouped by day, with a source badge per entry. Per entry: **Move to another entity**, **Remove from this entity**, and **Why**, which shows the captured window, link and text behind the entry. `EntitiesScreen.tsx:1400-1520`
  - Right rail: **Open to-dos**, **Related**, **Completed**.
- **Merge overlay.** "Search the survivor entity...". `EntitiesScreen.tsx:280-303, 852`
- **To-do link.** A to-do's person chip filters Actions to that person, with "Open record". `P/renderer/screens/ActionsScreen.tsx:359-384`

### Proposed screens

| # | File | Exact UI state | Seed needed | Command |
|---|---|---|---|---|
| 1 | `people-directory` | People tab: cards for Sam Okafor (Acme Corp), Priya Nair, Tom Reyes, Maya Chen and Daniel Cole (Northwind), with counts in the tabs. | Entities | "who do I work with?" |
| 2 | `people-sam` | Dossier for **Sam Okafor**. Email sam@acme.example. Coverage "1 meeting · 9 screen · 1 mail". Story mentions the 14 Nov pilot and 40 seats. Timeline "Today" starts with the 10:00 kickoff. Open to-dos: "Send revised rollout plan by Fri", "Owners per stage". | Entities, observations, actions | "who is Sam Okafor?" |
| 3 | `people-why` | Same dossier. One timeline entry has **Why** expanded, showing the captured frame thumbnail, URL and text. | Observation linked to a frame | "why do you think that?" |
| 4 | `people-project` | Projects tab: "Acme pilot" expanded under "Acme Corp", with Mentions and Last active. The Acme pilot dossier is open with **Part of: Acme Corp** and Related chips. | Project hierarchy | "show the Acme pilot" |
| 5 | `people-merge` | Merge overlay: source "S. Okafor", search "Sam" with Sam Okafor highlighted. | A duplicate entity "S. Okafor" | "these two are the same" |
| 6 | `people-companies` | Companies tab: Acme Corp and Northwind Capital, plus the "Latent (6)" and "Organize" buttons in view. | Companies and latent entities | "which companies do I deal with?" |

### Capture difficulty
- Screens 1, 2, 4, 5, 6: **easy**. The seed carries summaries, so no synthesis call is needed.
- Screen 3: **medium**. The seed must link an observation to a frame (`frameCount > 0`).

---

## 6. Reflect

Site copy: "Time by app, project and person. No timers." Current shot: `reflect`. `reflect-week` exists but is not used.

### Capabilities
- **Day/Week toggle** and previous/next. `P/renderer/screens/ReflectScreen.tsx:133-195`
- **Day view.** `ReflectScreen.tsx:198-434`
  - **Mind share** stacked bar: top 8 projects or people, with % and time.
  - **Time by app**.
  - **Balance**: work, communication, consumption.
  - **Focus & context switching**: switches, per hour, longest focus, average focus, and an amber "Fragmented" warning above 30 per hour.
  - **Insights** in plain sentences: "A people-heavy day", "Most of your attention went to Acme pilot (34%)", "You engaged with 5 people, most with Sam Okafor", "Steady focus".
  - Footnote: "Estimated from N captured moments".
- **Week view.** `ReflectScreen.tsx:436-570`
  - Daily stacked bars (work, communication, consumption).
  - This week: deep work, average per day, average switches per hour, total active.
  - Mind share for the week.

### Proposed screens

| # | File | Exact UI state | Seed needed | Command |
|---|---|---|---|---|
| 1 | `reflect-day` | Day, Today: mind share led by Acme pilot, then Sam Okafor, Northwind; Time by app (Gmail, Preview, Zoom, Linear). | Categorised observations | "where did my time go?" |
| 2 | `reflect-focus` | Scrolled to Focus & context switching plus Insights, e.g. "longest focus 52m". | Same | "how focused was I?" |
| 3 | `reflect-people` | Mind-share card zoomed, showing people rows (Sam Okafor, Priya Nair, Tom Reyes) and the "You engaged with 5 people" insight. | Person-attributed observations | "who did I spend it with?" |
| 4 | `reflect-week` | Week: 7 stacked bars with Thursday tallest, deep-work stat, week mind share. | 7 days of observations | "how was my week?" |

### Capture difficulty
- Screens 1-3: **easy**.
- Screen 4: **medium**. The seed needs observations on the past 6 days.

---

## 7. Ask (search and chat with sources)

Site copy: "Every answer shows where it came from." Current shots: `search`, `chat`.

### Capabilities
- **Universal search.** `P/renderer/screens/SearchScreen.tsx:17-268`, `SearchResultGrid.tsx:16-22`, `D/src/main/search.ts:130-181`
  - "Search everything you've seen, said, and saved...". With an empty query it shows "Recent".
  - **Sources rail** with counts: each app or site, Meeting, Chat, Knowledge base. Multi-select, with "clear".
  - Sort: **Relevant / Recent / Match**.
  - Result kinds: screen, meeting, memory, entity, fact, chat, doc.
  - Show more. Opening a result jumps to Replay, the meeting, the entity or the chat.
- **Chat with memory.** `D/src/renderer/src/components/MemoryChat/index.tsx:4590-4640`, `MemoryChat/components/MessageContext.tsx:60-200`
  - Memory selector: All memory, No memory, or a project.
  - With Tools on, answers carry **"Sources (n), cited as [S#]"** cards. Screen sources show a **thumbnail** and "open in Replay ->". Meetings, entities, chats and documents open in place.
  - Also Memories and Master memory panels.
- **Chat tools.** Regenerate with **left/right answer variants**, edit-and-fork, thinking mode, conversation search, tabs. `D/docs/features/chat.md`, `W/articles/how-to-compare-alternative-ai-answers-...md`
- **Projects (RAG).** Upload PDF, DOCX, images, audio and video. Instructions per project. Cited retrieval. `D/docs/features/projects.md`
- **Meeting search tool.** `search_meetings` lets chat answer from recordings. `P/main/meeting-tool.ts:9-75`

### Proposed screens

| # | File | Exact UI state | Seed needed | Command |
|---|---|---|---|---|
| 1 | `ask-search` | Search "acme pilot": Sources rail shows Meeting 2, Gmail 4, Preview 3, Chat 1, Knowledge base 2; Sort = Relevant; grid has kickoff, PDF frame, Sam entity, fact "40 seats". | Seed rows mentioning Acme | "search everything for acme" |
| 2 | `ask-filter` | Same query with **Meeting** and **Preview** selected and Sort = Recent; the context line reads "... · Meeting, Preview". | Same | "only meetings and the PDF" |
| 3 | `ask-chat` | Chat, All memory, Tools on. Answer: "You promised Sam (1) the revised rollout plan by Friday, (2) owners per stage, (3) a kickoff call Tue 10:00 [S1][S2]", above the Sources grid: [S1] meeting "Acme pilot kickoff", [S2] screen thumbnail of `Acme_rollout_v3.pdf`, [S3] Gmail. | Same plus local LLM | "what did I promise Sam?" |
| 4 | `ask-open-source` | After clicking [S2]: Replay opened at 10:45 on the PDF frame. | Frame from Capture screen 1 | "show me where" |
| 5 | `ask-project` | Project "Acme pilot": Files tab lists `Acme_rollout_v3.pdf`, `Pilot_scope.docx`, `Acme_rollout_v2.pdf`; the chat answer cites the PDF page. | Upload 3 local files | "what changed since v2?" |

### Capture difficulty
- Screens 1, 2, 4: **easy**.
- Screens 3 and 5: **medium**. They need a local LLM and, for 5, an embedding model and local fake documents. Answers vary, so take a few runs.

---

## 8. Act (approvals)

Site copy: "Nothing goes out without your yes." Current shot: `approval`. `actions` exists but is unused.

### Capabilities
- **Actions screen.** Two modes, **To do** and **Approvals**, plus **Suggest actions**: it "surveys your tools and context and proposes actions" and reports "Proposed 3 actions for your review". `P/renderer/screens/ActionsScreen.tsx:221-337`
- **To do.** `ActionsScreen.tsx:357-433`, `TodoCard.tsx:100-300`
  - Sub-tabs: **open / waiting on / done / dismissed**, with counts.
  - "Jot a to-do: Off Grid AI figures out the priority and due date". While it works, the card shows "figuring out priority + due...".
  - Each card: priority (high/low), person chip (filters by person), "**waiting on Priya**", due, and a **source badge** (Meeting, Voice). "Where this came from" expands.
  - Card actions: prioritize; dismiss with a reason; restore; Undo toast.
- **Approvals.** `ActionsScreen.tsx:435-556`, `ProvenanceBlock.tsx`
  - Sub-tabs: **pending / history**.
  - Status colours: pending, approved, executed, rejected, failed.
  - Each card shows entity, connector and tool (e.g. "Gmail · send_draft") and time.
  - **details**: description, provenance, raw args JSON, Result.
  - Reject, with "Dismiss & teach".
- **Review in Chat.**
  - Approval setup form: "What should Off Grid AI do?", Useful context, and every argument editable, then "Start in chat". `D/src/renderer/src/components/actions/ApprovalSetup.tsx`
  - Then the in-chat gate: **Approve / Edit / Reject**, an "This action cannot be undone" warning for irreversible actions, the result "Done - verified", and **Undo** when the handler can reverse it. `ActionGateDock.tsx:34-213`, `action-approval-presentation.ts:125-156`
- **Learning loop.** Settings -> "What Off Grid AI has learned": preferences distilled from your dismissal reasons, each line removable, plus Clear all. `P/renderer/settings-sections.tsx:540-600`
- **Audit log.** Every decision is logged (`audit_log` table, written by the seed at `P/main/dev-seed.ts:629-632`).

### Proposed screens

| # | File | Exact UI state | Seed needed | Command |
|---|---|---|---|---|
| 1 | `act-todos` | To do / open: "Send Sam the revised rollout plan · high · Sam Okafor · by Friday · Meeting", "Name owners per stage · waiting on Priya", "Book kickoff Tue 10:00". | Actions with `waiting_on` and meeting source | "what do I owe people?" |
| 2 | `act-approvals` | Approvals / pending. The "Reply to Sam Okafor: rollout plan" card is expanded: details, provenance (kickoff 10:00 + PDF) and args JSON (to sam@acme.example, subject, body). | Approval with args | "what's waiting for my yes?" |
| 3 | `act-review` | In chat: the gate dock with editable To/Subject/Body and **Approve / Edit / Reject**. | Pending action request in chat | "draft the reply to Sam" |
| 4 | `act-history` | Approvals / history: "executed" (green) with Result "Draft sent to sam@acme.example", and "rejected" for a promo blast. | Seed already has executed/rejected rows; reword for Acme | "show what was sent" |
| 5 | `act-suggest` | After **Suggest actions**: green banner "Proposed 2 actions for your review." | Local LLM | "suggest what to do next" |
| 6 | `act-learned` | Settings -> What Off Grid AI has learned: "- Don't suggest marketing emails", "- Northwind items go to Daniel only". | Write the secretary prefs setting | "stop suggesting promo emails" |

### Capture difficulty
- Screens 1, 2, 4: **easy**.
- Screens 3, 5, 6: **medium**. Screen 3 needs a chat turn that raises an action request. Screen 5 needs an LLM. Screen 6 needs a seeded preference or real dismissals.
- Actually sending through Gmail: **blocked** (real account). Show only the pre-approve state and a seeded "executed" row.

---

## 9. Web (Web Use)

Site copy: "Step by step. You take over for passwords." Current shots: web-plan, web-takeover, web-done.

### Capabilities
- **Starting a task.** Supervised tasks start from Chat, after approval. On first start, the Web Use pane takes the whole window. `D/docs/COMPUTER_USE.md:8-63`
- **Browser chrome.** Pages and tabs, back, forward, reload, address bar. `P/renderer/components/browser/tasks/BrowserChrome.tsx`
- **Live activity.** `TaskLiveActivity.tsx:19-182`
  - Phases: preparing, capturing the screen, model working, performing the action, checking the visible result, **waiting for you**.
  - Fields: milestone, current operation, latest decision, visible evidence, active model, live updates.
- **Execution plan.** Stages, each with Intent (operation, target, value), Decision, "Why this action", Reasoning, Result, and full-screen step screenshots. `TaskExecutionPlanView.tsx:174-504`
- **Controls.** Pause, Resume, Stop, **Take Over**; "Continue" when waiting on you. Escape stops. `@offgrid/automation` `read-model.ts:91-130`, `LiveTaskSurface.tsx:62-96`
- **Live guidance mid-run.** "Guide this task..." with **file and image attachments** (up to 12 MB). The trace marks guidance "Accepted" and then "Applied to the next decision". `TaskGuideComposer.tsx`, `TaskRunDetails.tsx:17-20`
- **Task history.**
  - **Saved task playback** with play and pause, decision details, and show/hide screenshots.
  - Total runtime.
  - "Open the chat this task came from". `TaskHistoryList.tsx`, `TaskVisualPlayback.tsx`
- **Floating task view** while you work elsewhere. `FloatingTaskView.tsx`
- **Safety.**
  - Secure or unknown fields stop the run and ask you to type.
  - Typed content is redacted from history.
  - A run is capped at 200 steps. `D/docs/COMPUTER_USE.md:37-47`
- **Task models.** "Same as Chat" or "Separate specialist". `D/docs/COMPUTER_USE.md:60-63`
- **Presets** with intake forms: flight, nearby places, price comparison, Train My Feed. `presetCatalog.ts:201-540`

### Proposed screens

| # | File | Exact UI state | Seed needed | Command |
|---|---|---|---|---|
| 1 | `web-brief` | Chat: the "Compare prices across stores" intake form filled (exact product "team plan for a note app", currency, stores to include). | none | "compare Team pricing for three note apps" |
| 2 | `web-live` | Task workspace: browser on a pricing page. Execution plan stage 2 of 4 is current. Live activity expanded: "Checking the visible result", with Latest decision and Visible evidence. | Real run (public sites) | "show me what it's doing" |
| 3 | `web-guide` | Guidance box with "Ignore enterprise tiers; monthly price only" and an attached `Acme_rollout_v3.pdf`. The trace line reads "Accepted. Applying to the next decision." | Same | "skip the enterprise tier" |
| 4 | `web-takeover` | Status **Waiting for you** on a sign-in page, with **Continue / Stop** buttons; the "Take Over" control is shown. | A public login page; type nothing | "take over for sign-in" |
| 5 | `web-history` | Tasks history: the finished run with Saved task playback paused on a step, screenshots on, total runtime, "Open the chat this task came from". | Finished run | "replay that errand" |
| 6 | `web-done` | Chat: result table (3 apps × price per seat for 40 seats), citing pages. | Finished run | "what did you find?" |

### Capture difficulty
- All screens: **medium**. They need a Computer Use or vision model downloaded and a real browsing run on public sites (no account).
- Screen 4 must only show a sign-in page. Never enter real credentials; a local test login page on `localhost` is the safest prop.
- Screen 1: **easy**.

---

## 10. Meetings

Site copy: "Local transcripts, decisions and follow-ups. No bot joins your call." Current shot: `meetings` (1).

### Capabilities
- **Recording.** `P/renderer/screens/MeetingsScreen.tsx:279-367`
  - Auto-detects and records Zoom, Meet and Teams: screen, speaker audio and mic.
  - Manual **Record meeting**. While recording, the button reads **Stop · 12:04** next to a banner.
  - "Keeps recording when away" / "Stops when you leave" toggle.
- **Meeting list.** Windowed (loads more as you scroll); delete. `MeetingsScreen.tsx:330-360`
- **Detail view.** `MeetingsScreen.tsx:374-553`
  - Video player.
  - **Summary**: names people, decisions and next steps (`P/main/meetings.ts:427-428`).
  - **Transcript**: speaker-labelled **You: / Them:** where diarized (`meetings.ts:310, 529-535`).
  - Transcription **Model** and **Language** selectors; **Re-transcribe**; "Retry transcription".
  - **Export** Transcript, Audio or Video.
- **During this call.** `MeetingDuringCall.tsx`, `MeetingFrameTimeline.tsx`, `MeetingActivitySection.tsx`, `P/main/meeting-relevance.ts:68-77`
  - **On screen**: a strip of the frames captured while the call ran.
  - A **focus verdict**: "Locked in", "Split focus" or "Mostly off-task".
  - Relevant versus off-task activity, with entity chips.
- **Follow-ups.** Action items are extracted into To-dos with a Meeting badge (`meetings.ts:475`). People become entities. Chat can ask a recording through `search_meetings`.

### Proposed screens

| # | File | Exact UI state | Seed needed | Command |
|---|---|---|---|---|
| 1 | `meetings-summary` | List: "Acme pilot kickoff · 10:00 · 38m" selected. Summary: "Sam confirmed pilot 14 Nov, 40 seats... Alex to send revised plan by Friday...". | Meeting row with Acme wording | "summarize the Acme pilot kickoff" |
| 2 | `meetings-transcript` | Scrolled to Transcript ("You:" / "Them:" lines), plus the Model selector and the Language = English dropdown open. | `You:` / `Them:` transcript | "show who said what" |
| 3 | `meetings-onscreen` | "On screen" strip of 6 frames (the PDF, the slide) and "During this call: **Locked in**" with Sam Okafor and Acme pilot chips. | Frames and observations inside 10:00-10:38 | "what was on screen?" |
| 4 | `meetings-followups` | Actions / To do filtered to the Meeting source: three promises from the kickoff, each with a Meeting badge. | Actions with source = meeting | "what did we agree?" |
| 5 | `meetings-player` | Video player showing the call recording, plus the Transcript, Audio and Video export buttons. | Put an mp4 in the profile and set `audio_path` | "export the transcript" |
| 6 | `meetings-recording` | Header shows the red **Stop · 04:12** button with the "Recording your current screen + speaker audio + mic" banner. | Live recording | "record this call" |

### Capture difficulty
- Screens 1, 2, 4: **easy** after reworking the seed text.
- Screens 3 and 5: **medium**. Screen 3 needs frames within the meeting window. Screen 5 needs a local media file.
- Screen 6: **blocked**. It needs mic and system-audio permission and a live recording.

> **Caution.** Speaker labels are only "You" and "Them". The site must not promise named speakers ("Sam said...") in the transcript itself.

---

## 11. Voice

Site copy: "Listen to spoken replies and read their transcripts on your phone." The only shot is a phone shot. **Desktop dictation is missing from the tour entirely.**

### Capabilities
- **Dictation anywhere.** `D/src/renderer/src/components/pro/proCatalog.ts` (voice entry), `P/renderer/screens/VoiceScreen.tsx:264-267, 576-578`
  - **Option+Space** with three modes: Hold (push-to-talk), Toggle, or Both.
  - The text is **pasted at the cursor** in any app.
- **Output options.** Paste at cursor, Append a space, **Feed to memory** (people, projects and to-dos are extracted), **Auto-send** (presses Enter). `VoiceScreen.tsx:429-448`
- **Transcription.** `VoiceScreen.tsx:450-513`
  - Engine: **Whisper or Parakeet**.
  - Keep model in memory.
  - 15 languages plus auto-detect.
  - **Custom words**.
  - **Remove filler words**, with "Paste cleaned text"; the original is kept and can be toggled back.
- **History.** Keep 50 to 500 recordings or unlimited; auto-delete after 7, 30 or 90 days. `VoiceScreen.tsx:530-555`
- **Library.**
  - Searchable transcripts. Per take: copy, re-transcribe, delete, and show more or less.
  - "Filler words removed: toggle the original".
  - **Drop audio or video to transcribe**. `VoiceScreen.tsx:700-790, 947-1036`
- **Chat voice mode.** `D/src/renderer/src/components/ChatVoiceComposer.tsx:66-227`, `VoiceBubble.tsx:285-472`, `VoiceSettingsTab.tsx:307-532`
  - Replies arrive as **voice notes** with transcripts, playback speed, copy and regenerate.
  - Input: tap-to-record or hands-free.
  - Kokoro voices by language and speaker, with "Test voice".
  - God Voice mode speaks every answer.

### Proposed screens

| # | File | Exact UI state | Seed needed | Command |
|---|---|---|---|---|
| 1 | `voice-library` | Voice screen: search "Priya" matches "Send Priya the owners-per-stage list..." with extracted people and to-dos visible. | Voice recordings (seed has them; reword) | "find what I dictated" |
| 2 | `voice-clean` | Same take expanded, with the "Filler words removed" toggle showing the cleaned and original text. | Recording with raw and clean variants | "remove the ums" |
| 3 | `voice-settings` | Voice settings panel: Mode = Both, Engine = Parakeet, Language = English, Custom words "Okafor, Acme, Northwind", Auto-delete 30 days. | none | "teach it Acme names" |
| 4 | `voice-drop` | Drag-over state: "Drop audio or video to transcribe" with `kickoff_notes.m4a` hovering. | A local audio file | "transcribe this recording" |
| 5 | `voice-notes` | Chat in voice mode: Alex's voice note "what did I promise Sam?", then the assistant's voice-note reply with the transcript shown and 1.5x speed. | Mic turn, or a synced phone turn | "answer me out loud" |
| 6 | `voice-picker` | Settings -> Voice: language English (US), speaker list with Heart, River and Sarah, "Test voice" playing. | Kokoro installed | "pick a different voice" |

### Capture difficulty
- Screens 1, 3, 6: **easy**. Screen 6 also needs the Kokoro download.
- Screens 2 and 4: **medium**. Screen 2 needs a seeded raw/clean pair. Screen 4 is a transient drag state that needs a whisper model.
- Screen 5: **blocked** for a live mic turn. It becomes medium if a synced phone conversation is used.
- The live dictation overlay over another app: **blocked** (microphone).

---

## 12. Vision

Site copy: "Ask about a photo on your phone... a vision model running on your Mac." The only shot is a phone shot. `vision-chat` exists but is unused.

### Capabilities
- **Images in chat.** Drop images or screenshots into chat and ask about them. `D/docs/features/chat.md`
- **Vision models.** The Models tag "Vision" covers images, screenshots and documents. A one-click "**Download the vision projector so this model can read images**". `D/src/renderer/src/components/ModelsScreen.tsx:197-198, 1020`
- **Remote vision server.** Saved servers, test connection, choose models, switch between this device and a remote server. `D/src/renderer/src/components/RemoteVisionSettingsTab.tsx:102-339`
- **Shared compute.** A phone photo is answered by the Mac's vision model. `P/main/sync/desktop-model-control.ts`; site copy.
- **Vision across the product.**
  - It powers Replay frame descriptions on Windows and Linux, and enrichment on macOS (`proCatalog.ts` replay notes).
  - It powers Computer Use grounding (`D/src/main/vision/`).
  - The gateway accepts `image_url` parts as data URLs, http URLs or file URLs (`D/docs/API.md:62-66`).

### Proposed screens

| # | File | Exact UI state | Seed needed | Command |
|---|---|---|---|---|
| 1 | `vision-screenshot` | Desktop chat: screenshot of `Acme_rollout_v3.pdf` p.3 attached. Answer lists "Pilot start 14 Nov · 40 seats · 10 laptops week 1". | Local image plus vision model | "what's in this screenshot?" |
| 2 | `vision-compare` | Two attached slide images (v2 versus v3). Answer: "v3 moves start to 14 Nov and adds owners per stage". | Two local images | "compare these two slides" |
| 3 | `vision-models` | Models -> Text tab with the **Vision** tag filter; one card shows "Download the vision projector". | none | "which models can see?" |
| 4 | (keep) `mobile/vision-ios-2` | Phone receipt answered by the Mac | existing | "what's the total here?" |

### Capture difficulty
- Screens 1-3: **medium** (vision model download; output varies).
- Screen 4: already captured. Re-shooting it is **blocked** without a phone.

---

## 13. Vault

Site copy: "Encrypted passwords, keys and files. A clipboard you can search." The second sentence belongs to Clipboard and should be removed here. Current shots: vault-locked, vault-typing, vault-open.

### Capabilities (from catalog and articles only, see the scope note)
- **Storage and encryption.** `D/src/renderer/src/components/pro/proCatalog.ts:205-224`
  - KDBX4 vault, **compatible with KeePassXC**.
  - AES-256 + Argon2id. Device-key bound: the file alone is unreadable.
  - Back the file up anywhere. Sync to your devices.
- **Entry types:** Web Login, app passwords, **API keys**, secure notes, **files** (.env and similar; drag into the form; preview or retrieve). `W/articles/how-to-store-sensitive-files-in-an-encrypted-local-vault-in-2026.md`, `how-to-store-api-keys-securely-...md`
- **Recovery.** "Forgot password? Recover with your phrase": the 24-word phrase lets you set a new master password. `W/articles/how-to-recover-your-offline-password-vault-in-off-grid-ai-on-mac-in-2026.md`
- **Browser extension.** "On this site -> **Fill**". "Vault tools -> **Security check**" lists weak and reused passwords. `W/articles/how-to-fill-website-logins-from-your-off-grid-ai-vault-in-2026.md`, `how-to-find-weak-and-reused-passwords-...md`

### Proposed screens

| # | File | Exact UI state | Seed needed | Command |
|---|---|---|---|---|
| 1 | `vault-locked` | (keep) Locked screen, including the "Forgot password? Recover with your phrase" link | Throwaway vault | "unlock my vault" |
| 2 | `vault-open` | (keep, re-dress) Entries: "Acme admin console" (Web Login), "Acme gateway .env" (File), "Northwind data room" (Login), "Gateway API key" (API key) | Fake entries only | "show my saved logins" |
| 3 | `vault-file` | New entry -> File: title "Acme gateway .env" with a file being dropped into the form | A local fake `.env` | "lock away this .env" |
| 4 | `vault-recover` | Recovery form with word fields filled (throwaway phrase) and new password fields | Throwaway vault | "I forgot my master password" |
| 5 | `vault-fill` | Browser extension popup on a local test login page: "On this site", with **Fill** on "Acme admin console" | Extension installed and paired | "fill my login" |
| 6 | `vault-check` | Extension "Security check": 2 weak, 1 reused group | Deliberately weak fake entries | "find my weak passwords" |

### Capture difficulty
- Screens 1-4: **easy**. Use a generated throwaway master password and fake entries in the isolated profile. Store them in the project's seed or example config, never in chat.
- Screens 5 and 6: **medium**. They need the browser extension installed and paired with OGAD. Use only a local test page.

---

## 14. Clipboard

Site copy: "Text, links, images and files. One shortcut, from any app." Current shot: `clipboard` (1).

### Capabilities
- **History.** Searchable history of text, rich text, images and files. "Search content or tags...". Keyboard up/down and Delete. `P/renderer/screens/ClipboardScreen.tsx:143-249`
- **Filters.** Text, Rich Text, Image, File, plus **# Tagged**. `P/renderer/components/clipboard/clipboardUtil.ts:14-18`, `ClipTypeFilters.tsx:47-57`
- **Tags** per clip. `ClipTags.tsx`
- **Previews.** Images render inline. **PDF, DOCX, md, html and txt files show their extracted text.** `ClipPreview.tsx:6-69`
- **Origin badge.** "This Mac" versus "**Alex's iPhone**", for copies synced from paired devices. `ClipOriginBadge.tsx`, `P/main/clipboard-store.ts:68-95`
- **Quick open anywhere.** Cmd+Shift+C popup with search and keyboard selection; the pick is pasted into the current app. `ClipboardPopup.tsx`, `ClipboardScreen.tsx:34, 188-191`
- **Settings.** Capture clipboard on/off; capture images on/off; keep history Forever, 7, 30 or 90 days. `ClipboardSettingsPanel.tsx:31-72`

### Proposed screens

| # | File | Exact UI state | Seed needed | Command |
|---|---|---|---|---|
| 1 | `clipboard-today` | All items, newest first: link `https://acme.example/pilot`, Acme logo image, `Acme_rollout_v3.pdf`, text "40 seats from 14 Nov" | Image and file clips | "show what I copied today" |
| 2 | `clipboard-search` | Search "acme" with the **Link** text clip selected | Same | "find that link I copied" |
| 3 | `clipboard-pdf` | File filter on; `Acme_rollout_v3.pdf` selected, with the extracted-text preview on the right | PDF copied from Finder | "preview the rollout PDF" |
| 4 | `clipboard-tags` | Clip tagged "acme" and "pilot"; the **# Tagged** chip active | Tags | "tag it for Acme" |
| 5 | `clipboard-phone` | A text clip with the origin badge **Alex's iPhone** ("Gate code 4471... "), next to "This Mac" items | `source_device` set on one row | "what did I copy on my phone?" |
| 6 | `clipboard-quick` | Cmd+Shift+C popup floating over Mail compose, filtered to "acme", second row highlighted | Same | "open clipboard anywhere" |

### Capture difficulty
- Screens 1-2: **easy** for text, which is seeded.
- Screens 3, 4, 6: **medium**.
  - The seed is text-only, so copy a real image and a real PDF in the session with capture on.
  - Screen 6 is a global popup over another app, so it needs an OS-level screenshot.
- Screen 5: **medium** if `clipboard_items.source_device` is seeded directly; **blocked** if it must come through real sync.

---

## 15. Images

Site copy: "Open image models on your own machine. No credits, no queue." The only shot is a phone shot. `imagegen-chat` exists but is unused.

### Capabilities
- **Generation.** Text to image, and image to image (attach a reference). `D/docs/features/image-generation.md`, `D/README.md`
- **Model families.** SDXL-Lightning, SDXL finetunes (RealVis, Juggernaut, DreamShaper), SD 1.5/2.1 and Z-Image-Turbo. LoRA support. `D/docs/features/image-generation.md`
- **15 style presets:** Cinematic, Anime, Sketch, Watercolor, Oil painting, Monochrome, Neon, 3D render, Steampunk, Surreal, Vintage film, Minimal, Risograph, Fantasy art, Studio portrait. `D/src/renderer/src/components/MemoryChat/components/StylePresetPicker.tsx:30-100`
- **Tuning.** Size, steps, guidance, seed, negative prompt, **Enhance prompts** (the chat model rewrites your prompt; an enhancement row appears in chat), and hardware selection. `ImageSettingsTab.tsx:101-260`, `PromptEnhancementMessageRow.tsx`
- **While generating.** Live per-step preview, progress and ETA, cancel. Then a lightbox, and a gallery scoped to each chat or project. `D/README.md`
- **Comic book workflow.** Story brief; art style (Manga, Noir, Ligne claire...); hero reference image; length; page format. Produces a page-by-page comic, with a reader. `presetCatalog.ts:90-200`, `comicBookReader.ts`
- **Elsewhere.** Generated images sync to the phone (articles). The gateway exposes `/v1/images` with async jobs. `D/docs/API.md:260-410`

### Proposed screens

| # | File | Exact UI state | Seed needed | Command |
|---|---|---|---|---|
| 1 | `images-prompt` | Chat composer with the "Acme pilot launch poster, 40 laptops" prompt and style **Cinematic** selected | Image model | "make a launch poster" |
| 2 | `images-progress` | The same turn mid-generation: preview at step 5/8, progress and ETA, Cancel | Same | "show it rendering" |
| 3 | `images-enhance` | Enhancement row showing the rewritten prompt above the finished image | Same plus LLM | "make my prompt better" |
| 4 | `images-edit` | Image-to-image: the poster attached as reference with "make it night, neon"; the result next to it | Same | "make it night-time" |
| 5 | `images-comic` | Comic intake form (Manga, portrait 3-5 panels), then the comic reader page 2 | Same | "make the pilot a comic" |
| 6 | `images-settings` | Image settings: Steps 8, Seed 4471, Negative prompt "text, watermark" | none | "fewer steps, same seed" |

### Capture difficulty
- Screens 1-5: **medium**. They need a 2-7 GB image model download and GPU time; no account.
- Screen 6: **easy**.

---

## 16. Models

Site copy: "Text, vision, images, speech and computer use... works with the Wi-Fi off." Current shots: 6.

### Capabilities
- **Kind tabs:** Text, Image, Tasks (computer use), Voice, Transcription, **Storage**. `D/src/renderer/src/lib/internal-tab-route.ts:31-38`, `model-kind-labels.ts`
- **Use-case tags:** All, General, Coding, Writing, Legal, Vision, Lightweight. `ModelsScreen.tsx:170-205`
- **RAM fit.** "Tight on RAM: context will be reduced" and "**Won't fit: Load anyway**". `ModelsScreen.tsx:871, 1438`
- **Finding and adding models.**
  - **Search HuggingFace**, then "Choose a model file" (a GGUF variant).
  - **Import .gguf**. `ModelsScreen.tsx:1071, 1140-1620`
- **Groups on each tab:** On this device, **Remote models** (from a saved server), Available to download, Coming soon. On the Tasks tab, **Grounding specialists** versus **Decision models**. `ModelsScreen.tsx:1297-1335`
- **Card actions.**
  - Details (quantization...); open settings for the active model; delete (blocked while the model is active).
  - Download the vision projector; download DFlash for **speculative decoding**. `ModelsScreen.tsx:809-1029`
- **Beyond this screen.**
  - Send a model to the phone (Phone chapter).
  - Pull, activate and delete models over HTTP when headless (`D/README.md`, gateway section).

### Proposed screens

| # | File | Exact UI state | Seed needed | Command |
|---|---|---|---|---|
| 1 | `models-fit` | Text tab, tag General: cards showing "fits", "Tight on RAM" and "Won't fit: Load anyway" badges | none | "what fits my Mac?" |
| 2 | `models-hf` | "Search HuggingFace..." = "qwen gguf"; results, plus the "Choose a model file" dialog listing quantizations | Internet, no account | "find a Qwen GGUF" |
| 3 | `models-download` | A text model downloading with progress; another marked active | none | "download a model for chat" |
| 4 | `models-tasks` | Tasks tab: Grounding specialists and Decision models groups | none | "models that use my computer" |
| 5 | `models-storage` | Storage tab: disk by kind, with cleanup | Some models installed | "what's using my disk?" |
| 6 | (keep) `models-voice-list` | Kokoro voices | existing | "pick a speaking voice" |

### Capture difficulty
- All screens: **easy** (internet only for the catalog and HF). Screen 5 is better after one or two downloads.

---

## 17. API (Gateway)

Site copy: "An OpenAI-compatible API on your own machine." Current shot: `gateway` (1).

### Capabilities
- **Gateway screen.** Base URL `http://127.0.0.1:7878/v1` with copy and "open docs". Quick start in curl, Python (openai) and JavaScript, plus an Image example. Endpoint list. `D/src/renderer/src/components/GatewayScreen.tsx:13-184`
- **Endpoints** (`D/docs/API.md:46-66`):
  - chat and vision
  - legacy completions
  - embeddings
  - STT
  - TTS, with a voice list
  - text-to-image and image-to-image
  - models
- **Interactive docs.** `/docs` and `/openapi.json`.
- **Access.** No API key; CORS open.
- **Async jobs.** **Any POST can run async**: 202 plus `GET /v1/requests/{id}`. `D/docs/API.md:362-410`
- **Headless.** `--server-only` / `OFFGRID_SERVER_ONLY=1`, with model **pull, activate and delete over HTTP**. `D/README.md` (gateway section)
- **AI activity log.** Settings -> AI activity.
  - Every request to the local models, filterable by modality (Text & vision, Transcription, ...).
  - Sort newest, oldest or **slowest**; search requests, responses and models.
  - Request and response payloads, generation details, model and hardware, related attempts, media; "Delete history". `D/src/renderer/src/components/AIRequestLogs.tsx`

### Proposed screens

| # | File | Exact UI state | Seed needed | Command |
|---|---|---|---|---|
| 1 | `api-gateway` | (keep) Gateway screen, Python tab | none | "show my local API" |
| 2 | `api-docs` | `localhost:7878/docs` interactive reference with `/v1/chat/completions` expanded | none | "open the API docs" |
| 3 | `api-curl` | Terminal: the curl to `/v1/chat/completions` and its JSON reply about the Acme pilot | Text model | "curl localhost:7878/v1/chat/completions" |
| 4 | `api-activity` | Settings -> AI activity: rows from curl, the Python script and Ares, sorted slowest first; detail panel with timings and backend | A few requests | "what called my models?" |
| 5 | `api-async` | Terminal: `POST /v1/images?async=true` returns 202, then `GET /v1/requests/{id}` returns "completed" | Image model | "generate an image in background" |

### Capture difficulty
- Screens 1, 2, 4: **easy**.
- Screens 3 and 5: **medium** (a model is needed for the responses).

---

## Strong capabilities the site never mentions

1. **Day:**
   - Per-meeting **Prep** (who, last discussed, open items).
   - Dismissing with a reason **teaches** the assistant, and the lessons are visible and editable under "What Off Grid AI has learned".
   - A drag-and-resize bento layout.
2. **God:**
   - **Event-triggered routines**: on new email from X, before a meeting, when a task finishes, when an approval waits.
   - **Standing rules**, and **wake-word training**.
   - Ares living on the desktop outside the app.
   - Ready workflows: Spotify, comic book, Train My Feed, flights.
3. **Phone:**
   - Send **models** to the phone.
   - Let the phone **use the Mac's tools** (Remote actions).
   - **Auto-share a watched folder**, with Off, Ask and Auto modes.
   - Pair over a private-network address.
4. **Capture:**
   - **Work threads**: the day clustered into concurrent tasks, plus a per-person "everything about Sam today" focus mode.
   - Edit, tag, reprocess or delete any frame.
   - Excluded apps.
   - Obsidian vaults as a source.
5. **People:** **Why**, which shows the exact captured window, link and text behind every claim. Merge, Organize (automatic deduplication and hierarchy), and Latent mentions.
6. **Reflect:** context-switch rate, longest and average focus, and plain-English insights ("a people-heavy day").
7. **Ask:** citations are clickable **screen thumbnails that jump into Replay at that second**, and a source facet rail.
8. **Act:**
   - **Suggest actions** on demand.
   - Every argument editable before approval.
   - **Undo** after a verified execution.
   - "Waiting on Priya" tracking.
9. **Web:**
   - **Steer a running task mid-flight, with file attachments.**
   - Saved playback of every step.
   - Secure-field detection stops the run before it types.
10. **Meetings:**
    - **Focus verdict**: "Locked in", "Split focus" or "Mostly off-task".
    - A strip of what was on screen during the call.
    - Re-transcribe with another model or language.
    - Export transcript, audio or video.
11. **Voice (desktop):** the whole Option+Space dictation feature is missing from the tour. It includes:
    - paste anywhere;
    - filler-word removal;
    - custom words;
    - Parakeet;
    - auto-send;
    - feed to memory;
    - drag-in file transcription.
12. **Vision:** a remote vision server option, and the one-click vision projector.
13. **Vault:**
    - KeePassXC-compatible file.
    - Recovery phrase.
    - Browser-extension **Fill** and **weak/reused password check**.
14. **Clipboard:**
    - Copies **from your phone**, with an origin badge.
    - Tags.
    - **PDF and DOCX text preview**.
15. **Images:** **Enhance prompts**, the comic-book workflow, and 15 styles.
16. **Models:** RAM-fit verdicts, HF search with quantization picking, Import .gguf, remote models, speculative decoding.
17. **API:**
    - **AI activity log** of every model call.
    - Async jobs for any endpoint.
    - Headless model pull and activate over HTTP.

## Copy and claims to correct

- **Vault** chapter line: "A clipboard you can search" belongs to Clipboard.
- **Meetings**: transcripts label only **You** and **Them**. Avoid "who said what" implying named speakers. The summary does name people.
- **Voice** chapter is phone-only. The desktop's flagship dictation is absent.
- **Seed company**: the seed calls Sam's company **Helio Labs**. Rename it to **Acme Corp** before any capture, or the People, Meetings and Act shots will contradict the tour.
