# Off Grid AI Desktop (OGAD): app fixes found while capturing website screenshots

Repo: `/Users/user/wednesday/off-grid-ai/desktop` (Pro code is in the `pro/` submodule).

Each item below has the symptom, where it shows, the likely cause (with file pointers where we found them) and what "fixed" looks like. File and line pointers come from capture sessions on 7–8 Oct 2026; check them against current code.

## Priority 1 (blocks website screenshots)

### 1. Reflect › Week: the daily bars never render
- **Symptom:** On Reflect, the Week tab's "Daily activity" chart shows empty columns. Every bar has zero height.
- **Cause:** The day columns sit in a row styled `flex h-48 items-end gap-3` in `pro/renderer/screens/ReflectScreen.tsx` (around line 457). With `items-end` the columns don't stretch to the row height, so each bar's percentage height resolves to 0.
- **Fix:**
  - Make the columns stretch: `items-stretch` on the row.
  - Bottom-align each bar inside its column, e.g. a column with `flex flex-col justify-end`.
  - Check both themes.
  - Add a render test asserting a non-zero bar height for a day with activity.
- **Verified:** Changing `items-end` to `items-stretch` made the bars render in a throwaway build.

### 2. Web Use / Computer Use task titles leak the internal prompt
- **Symptom:** Every task started from Chat is titled "Current user request (authoritative): Use Web Use to open https://… and …". Tasks started over MCP get "Structured task summary: …". The title shows in:
  - the Live Task header;
  - the Task Record;
  - Task History;
  - the iPhone's synced task cards.
- **Cause:** `taskGoalWithConversation` in `src/main/tools/nativeActionToolExtension.ts` builds the model-facing goal text, and the same string is used as the task's display title.
- **Fix:**
  - Store a separate display title: a short, plain task name such as "Calculate Team pricing for 40 people", with no "Current user request (authoritative):" or "Structured task summary:" prefix and no long URLs. Use the user's request trimmed to one sentence, or a model-generated short title.
  - Keep the full text for the model only.
  - Make sure the mobile sync payload carries the clean title.
  - Add unit tests for the title derivation.

## Priority 2 (visible in screenshots, small)

3. **Jargon in the task header.**
   - **Symptom:** While the model thinks, the Live Task header reads "Choosing the next semantic action".
   - **Fix:** Use plain words, e.g. "Deciding the next step".
4. **Stray period in live updates.**
   - **Symptom:** Live-update lines end in ".: completed", e.g. "Clicked Monthly button to view monthly pricing.: completed".
   - **Fix:** Join without the period ("…pricing: completed"), or drop the suffix.
5. **The internal tool reply shows in chat.**
   - **Symptom:** After a Web Use launch, the chat shows "Task reference: <uuid>. Web Use started. … Do not call web_use again for this goal."
   - **Fix:** Hide the tool result from the transcript, or render a small "Task started" card linking to the task.
6. **Markdown tables in chat render as plain text.**
   - **Symptom:** A table in a reply shows with no borders or cell padding, so the columns run together.
   - **Fix:** Style markdown tables in chat (borders or row lines, padding, header weight) in both themes.
7. **Text around a Mermaid block disappears.**
   - **Symptom:** When a reply contains a Mermaid code block, only the "MERMAID artifact" card renders; the sentences before and after it are dropped.
   - **Fix:** Render the surrounding markdown as well as the artifact card.
8. **The image generation details line shows a raw file name.**
   - **Symptom:** The details line under a generated image shows e.g. `dreamshaper-xl-v2-turbo-Q8_0.gguf`.
   - **Fix:** Show the model's display name, e.g. "DreamShaper XL Turbo".
9. **Gateway curl snippet looks selected.**
   - **Symptom:** In Gateway, every line of the curl code block gets its own highlight box.
   - **Cause:** The inline-code style also applies inside code blocks.
   - **Fix:** Scope the inline-code style so it doesn't apply inside `pre`.
10. **"Tools sent in request (N)" exposes internal text.**
    - **Symptom:** This line shows under every live answer, and expanding it lists internal tool descriptions written for the model.
    - **Fix:** Hide it by default (developer setting), or show tool names only.
11. **God voice transcript cuts off.**
    - **Symptom:** In God's Voice mode, the transcript box has a fixed height and clips the last line of a long answer.
    - **Fix:** Let it grow or scroll.
12. **Meetings shows a red "MOSTLY OFF-TASK" verdict wrongly.**
    - **Symptom:** The verdict appears in red when a meeting simply has no linked entities.
    - **Fix:** Show a neutral or no verdict when there's nothing to judge against.
13. **Day › Today's meetings hides earlier meetings.**
    - **Symptom:** Meetings that started more than an hour ago drop off, so a morning meeting never shows in an afternoon Day view.
    - **Fix:** Keep today's past meetings (greyed out) in the list.
14. **The Day timeline mislabels blocks.**
    - **Symptom:** A timeline block is labelled with its lowest-id linked entity rather than its main subject, e.g. a block about the Acme kickoff labelled "Tom Reyes".
    - **Fix:** Label by the primary subject (the project or meeting) or the most-referenced entity.
15. **Replay work threads collapse into one band.**
    - **Symptom:** A whole day can land in one thread band labelled after a person.
    - **Fix:** Group by project or meeting, and label by subject.
16. **Clipboard image clips are titled "[Image]".**
    - **Symptom:** In list views, image clips show only "[Image]" and lose their source name.
    - **Fix:** Show "Image from Figma" or the file name.
17. **Approval cards clip their argument JSON.**
    - **Symptom:** The argument JSON is cut off on the right with no wrap.
    - **Fix:** Wrap the JSON or let it scroll horizontally.
    - Separately, the approval history card's "Result" line wraps "AM" onto its own line; keep the time together.
18. **Models › Tasks can show an unavailable model as active.**
    - **Symptom:** The active grounding specialist can be UI-TARS-1.5-7B, which isn't downloaded and is also listed under "Available to download", while UI-Mate-9B is on disk.
    - **Fix:** Fall back to the downloaded model, or mark the active one as "not downloaded".
19. **The Kokoro card reads oddly.**
    - **Symptom:** It shows "hexgrad · 0.082B".
    - **Fix:** Show "82M parameters", or the size in MB.
20. **Navigating to God can show the Pro upsell.**
    - **Symptom:** Going to God through `og:navigate` (or certain launch paths) shows "Off Grid AI Pro is here / Get Pro" even with Pro active. Clicking God in the sidebar works.
    - **Fix:** Use the same entitlement check on every route into God.
21. **An empty pane after closing chat tabs.**
    - **Symptom:** Closing chat tabs can leave an empty pane about 600px wide on the right, with the chat squeezed left. Opening and closing Tasks fixes it.
    - **Fix:** Reset the split layout when the last tab in a pane closes.

28. **The vision error message points the wrong way.**
    - **Symptom:** With a remote Text & Vision model whose image setting is off in Remote settings, attaching an image says "This model can't read images. Switch to a vision model (Gemma E4B or Qwen3-VL 2B)".
    - **Fix:** When a remote server is active, point to the setting that enables images for it (with a link to Remote settings) instead of suggesting local downloads.

## Priority 3 (environment and robustness)

22. **A second instance breaks Replay and capture images.**
    - **Symptom:** The media server prefers port 7879, and that port is baked into the page's CSP. If another instance holds 7879, the server moves to 7880, the CSP blocks it, and every Replay and capture image breaks.
    - **Fix:** Build the CSP from the actual port, or serve media through a custom protocol.
23. **Sync fails when port 37878 is taken.**
    - **Symptom:** If another instance holds 37878, Pro sync never registers its handlers ("No handler registered for 'pro:sync:prefs'"). Devices then shows "All slots are in use", because the registry fallback reports a maximum of 0 devices.
    - **Fix:**
      - Fall back to another port.
      - Register the handlers regardless.
      - Report the real slot count.
24. **Devices lists a connected phone in the wrong place.**
    - **Symptom:** A connected phone shows under "Available", not "Saved", while Saved reads "Every licensed device is on your network".
    - **Fix:** List paired, connected devices under Saved.
    - Also use "Wi-Fi" consistently instead of "WiFi".
25. **The Kokoro voice download can stall.**
    - **Symptom:** It can sit at "Downloading English (US) audio · 100% · 0 MB / 0 MB" indefinitely.
    - **Fix:** Detect the zero-byte state; retry, or show an error with a Retry button.
26. **Settings shows the Electron version in tests.**
    - **Symptom:** Launched through the e2e capture fixture, Settings shows "Off Grid AI v39.2.7", which is the Electron version, not the app's.
    - **Fix:** Read the version from `package.json` or `app.getVersion()` consistently.
27. **Capture settings can hold competitor names.**
    - **Symptom:** The capture-settings excluded-apps list can be pre-filled with competitor product names (e.g. a password manager) in demo seeds.
    - **Fix:** Use neutral defaults in the seed: Messages, Keychain Access, banking apps.

## Product gaps (not bugs, worth deciding)

- **Web Use has no Approve / Deny card before irreversible steps.** Irreversible web steps such as submitting a form go to a "Waiting for you" handover with Continue / Stop. The Approve / Edit / Reject dock exists only for connector actions.
- **No Vault suggestion during the sign-in takeover.** The Vault fills logins only in the browser extension, not in the in-app takeover.
- **No source-device marker on synced chats.** The app stores the device a synced chat came from but never shows it.
- **Fixed Web Use live view size.** The live page keeps a 1440×900 shape inside the task pane, so at smaller window sizes empty bands appear above and below it.

## Off Grid AI Mobile (OGAM), found on the iPhone

- The Models › Voice card shows "At least 0GB RAM".
- A downloaded image model (SD 2.1 Palettized) disappears from Models › Image instead of showing as downloaded.
- The image gallery has blank tiles that open an empty viewer.
- Chats flip into voice mode by themselves once the TTS model loads, and new chats sometimes open in voice mode.
- The Kokoro voice switches (Heart to River) and unloads without user action; "Speak" then disappears from message actions.
- In the Tools screen, Web Search, Date & Time and URL Reader toggles sit in an ambiguous grey state, yet `web_search` and `web_fetch` are still sent in requests.
- "Thought process" previews clip mid-word with no ellipsis.
- In voice mode, "Tools sent in request (N)" appears twice.
- The empty state and model lists show raw HF ids (e.g. `gemma-4-E4B-it-GGUF`), and the remote list can show a raw filesystem path.
- Dark theme: chat titles in project cards and the "New Project" header are nearly invisible (dark on dark).
- The mic button looks enabled when microphone permission is denied.
- Modals and sheets are missing from the accessibility tree (affects automation and screen readers).
