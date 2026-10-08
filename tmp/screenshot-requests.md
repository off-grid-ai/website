# Screenshot requests for the home page

All shots: **dark mode**, no debug banners, no personal data. Use the demo persona already seeded in the desktop app: **Sam Okafor (Helio Labs)**, Priya Nair, Tom Reyes, Maya Chen, Daniel Cole, Northwind Capital. Desktop at 1600×1000 window (2x display). Phone at native resolution.

Drop finished files in `website/tmp/requested/` with the names below.

## 1. God twin (desktop) — `god-dark.png`
Start from your existing God screenshot. Edit with the image agent:
- Replace every real name and topic with the demo persona: "Mac / Ali" → "Sam / Helio Labs", "Ali Hafizji" → "Sam Okafor", "Startup Qatar Investment Program" → "Helio Labs pilot", "Vikram", "Maria Perez", "Ryan" → Priya Nair, Daniel Cole, Maya Chen.
- Keep the layout: character panel (Ares, Listening), chat in the middle, "Needs you" approvals on the right with Approve / Deny.
- Approvals should read like: "Send Sam the revised rollout plan", "Confirm the Helio pilot success metric", "Share the board brief with Daniel Cole".

## 2. Phone: computer use on your Mac — `phone-computer-use.png`
Start from the WhatsApp computer-use screenshot. Edit:
- Task title: `Send "Pilot moves to 14 Nov" to Sam Okafor in Slack`.
- Replace the Mac screen thumbnails with a neutral app (Slack or Notes) showing demo names only.
- Remove "Connect to Metro to develop JavaScript." and "Settings changed — tap to reload model".

## 3. Phone: web use — `phone-web-use.png`
A clean phone screen of a web task running (live view + steps). Synthetic shop page is fine.

## 4. Phone: chat with sources — `phone-ask.png`
Question: "What did I promise Sam about the Helio Labs pilot?" Answer with two source pills (meeting, PDF).

## 5. Phone: sync — `phone-sync.png`
The paired-devices screen showing the Mac connected, with chats, projects and clipboard syncing.

## 6. Phone: image generation — `phone-image.png`
Any of the horse / green Ferrari / Lamborghini shots from 14–18 Sep, with the "Connect to Metro" banner and error toasts removed.

## 7. Browser extension at 2x — `ext-*.png`
Re-run the extension e2e screens at deviceScaleFactor 2 (current ones are 400×700): agent-desktop-web-use, chat-recording, vault-item, agent-steps.
