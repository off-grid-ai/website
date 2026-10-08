# Home tour storyboard: one workday, told by the app

The tour is one continuous Thursday (8 Oct) for **Alex**, a product lead at Off Grid AI, who is running the **Acme Corp pilot** for **Sam Okafor** (Acme's IT lead).

Every screen belongs to that day. Each later screen points back to an earlier one: the call, the promise, the reply, the journal. Each chapter is a mini arc of **trigger, then the AI working, then the result**. The window command narrates every step.

## Cast and facts (identical in every screen)
- **Alex** (you), alex@offgrid.example. Devices: "Alex's Mac" and "Alex's iPhone".
- **Sam Okafor**, Acme Corp IT lead, sam@acme.example. The customer.
- **Priya Nair** owns the rollout plan. **Tom Reyes** verifies the gateway policy. **Maya Chen** is on design. **Daniel Cole** is at Northwind Capital (board).
- **The pilot:** starts **14 November**, **40 seats**, 10 laptops in the product team in week 1. Success metric: hours saved per person per week. Weekly check-in on Tuesdays at 10:00.
- **Documents:** `Acme_rollout_v3.pdf` (6 pages), `Pilot_scope.docx`, `Acme_rollout_v2.pdf`.
- **The promise made today:** in the 10:00 kickoff, Alex promised Sam (1) the revised rollout plan by Friday, (2) owners per stage, (3) a kickoff call next Tuesday at 10:00.

## The day (story order for the data; the tour keeps its current chapter order)

| # | Time | Chapter | Screens (command typed for each) | What it proves |
|---|---|---|---|---|
| 1 | 08:50 | **God briefs you** | god "brief me, Ares" → god-prep "prep me for the Northwind meeting" → god-waiting "what's waiting for me?" | It knows your day before you do |
| 2 | 10:00 | **Meetings** | meetings-list "show today's meetings" → meetings "summarize the Acme pilot kickoff" → meetings-transcript "show who said what" → meetings-decisions "what did we decide?" | No bot joins. The call becomes decisions |
| 3 | 10:45 | **Capture** | replay "replay what I worked on" (Alex reading Acme_rollout_v3.pdf) → capture-settings "keep my banking app out of capture" | It sees only what you allow |
| 4 | 11:00 | **Ask** | search "search everything for acme pilot" → chat "what did I promise Sam?" (answer cites the kickoff and the PDF) | Answers with sources from your own day |
| 5 | 11:05 | **Act** | act-draft "draft the reply to Sam" → approval "send it from Gmail" → act-done "show what was sent" | Nothing goes out without your yes |
| 6 | 11:30 | **Web** | web-plan "compare Team pricing for three note apps" → web-step → web-compare → web-takeover "take over for sign-in" → web-done | It runs errands; you keep the keys |
| 7 | 12:30 | **Clipboard** | clipboard-all "show what I copied today" → clipboard "find that link I copied" → clipboard-file → clipboard-quick "open clipboard anywhere" | Everything you copied, searchable |
| 8 | 14:00 | **People** | people-list "who do I work with?" → people-sam "who is Sam Okafor?" (timeline includes today's call and the promise) → people-project "show the Acme pilot" | Your world, mapped and current |
| 9 | 17:40 | **Phone** | sync-devices "pair my phone and my Mac" → mobile/sync-ios-1 → sync-activity "what came across?" → mobile/project-ios-2 "ask the Acme project on my phone" | Leave the desk; the work comes with you |
| 10 | 18:05 | **Voice** | phone voice start → mobile/voice-ios-2 "what did I promise Sam?" (spoken) → voice picker | Ask out loud; it answers out loud |
| 11 | 19:30 | **Vision** | receipt attached → mobile/vision-ios-2 "what's the total on this receipt?" → follow-up | Your photos become answers |
| 12 | 21:00 | **Today** | day "open today" → day-journal "write my journal" (it recounts the call, the promise, the reply) → day-timeline "show my timeline" | Your day, written for you |
| 13 | 21:05 | **Reflect** | reflect "where did my time go?" → reflect-people "who did I spend it with?" | Time by project and person, no timers |
| 14 | – | **Vault** | vault-locked → vault-typing → vault-open | Secrets stay yours |
| 15 | – | **Images** | imagegen-chat, mobile/imagegen-ios-1 | Made offline |
| 16 | – | **Models** | models-* set | Every kind of model |
| 17 | – | **API** | gateway → gateway-models → gateway-playground | Your other apps can use it |

## Rules for every capture
- **Clock:** timestamps match the table above. Seed the day so the meetings list, timeline, journal, Replay and People all show the same events at the same times.
- **The 10:00 kickoff** is the spine: it appears in Meetings, the People timeline, the Ask sources, the Journal and the Timeline.
- **The reply to Sam** appears in Act, then as "sent" in the People timeline and the Journal.
- **No competitor products** (no 1Password and similar). Neutral tools (Linear, Figma, Mail, Zoom) are fine.
- Chapter order and copy on the site are not changed by this storyboard; it only guides capture data.
