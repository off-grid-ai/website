# Off Grid AI Desktop — Reddit launch posts

Drafts for a multi-subreddit launch. **One product, a different *outcome* and a different *tone* per subreddit** — the same move as the last round (r/StableDiffusion got "multi-modal local studio," r/DigitalPrivacy got "an AI that remembers everything you do").

This folder is excluded from the Jekyll build (`_config.yml`), so nothing here publishes to the site.

## Ground rules I wrote to

- **Reddit is not a landing page.** No headline-stacking, no "Join early access (free)" buttons. First person, a real person sharing a real thing. The website copy rules (Bly/Ogilvy) still run underneath — specificity, benefit-led, proof — but dialled into a forum voice.
- **Self-promo etiquette:** on the hardcore/privacy/open subs the *link and the offer go in the first comment*, not the body. On builder/founder subs (SideProject, Startup_Ideas) the offer is welcome in the body.
- **The offer is real and time-boxed:** Pro is $39/mo founder rate; the **$50-once-keep-it-for-life** window closes **July 1** (this is genuinely ~5 days out as of June 26). Use the urgency only where it's audience-appropriate.
- **Don't overclaim.** Free open-source app = the local model runner (text/image/vision/voice, 100K downloads). "Off Grid AI Desktop" = the Pro layer on top: capture → memory → reflect → act, all on-device.
- **Stagger the posting** over several days and tweak wording per sub — identical cross-posts get filtered and read as spam.

### Canonical links (paste these)

- **Repo / builds:** https://github.com/off-grid-ai/desktop
- **Site:** https://getoffgridai.co
- **Lifetime $50 deal (closes July 1):** https://getoffgridai.co/pay
- **Early access / founder rate:** https://getoffgridai.co/early-access

### Subreddit → outcome map (so no two posts say the same thing)

| Subreddit | Outcome it leads with | Tone |
|---|---|---|
| r/StableDiffusion | A fully local multimodal *creative + vision* workspace, no API | Maker, show-the-stack |
| r/DigitalPrivacy | A searchable record of everything you saw that *physically can't leave* the machine | Privacy-fear, anti-Rewind |
| r/OpenSourceAI / r/OpenSourceeAI | An AGPL, auditable local "chief of staff" — the architecture | Project/contributor |
| r/LocalLLaMA | Getting *real work* out of small local models (the pipeline + model choices) | Deeply technical, skeptic-proof |
| r/LocalLLM | Replacing a cloud second-brain with a local daily-driver setup | Practical setup/how-to |
| r/SideProject | The build journey + the launch window | Founder, candid |
| r/europrivacy | Data sovereignty / GDPR — nothing leaves the device or the jurisdiction | Regulation-aware |
| r/Startup_Ideas | The category thesis: local-first personal AI — sanity-check it | Discussion, asks for feedback |
| r/ollama | Turning your local models into an always-on ambient assistant | Practical, integration-first |

---

## 0. Hacker News — Show HN (flagship)

**Outcome:** the whole product in one frame — ambient on-device memory that never leaves your Mac.
**Tone:** HN — surprising specific hook → vivid use-cases → tech for credibility → tight CTA. The exact shape that hit 124 points last time, pointed at Desktop.
**Rulebook applied:** Ogilvy specificity (named tech, real numbers), Bly's motivators (fear of forgetting + privacy), benefit-over-feature, no superlatives, honest limitation in the comment.

**Submission URL:** https://github.com/off-grid-ai/desktop

**Title:**
`Show HN: Off Grid AI – Ambient AI memory for your Mac that never leaves your Mac`

**Body:**

You forget most of what you see. The doc from Tuesday, the Slack thread where the decision got made, the number from last week's call — gone, or buried where you'll never dig it out. Your Mac watched all of it happen and kept none of it.

Off Grid AI is an ambient memory that runs quietly in the background and remembers for you. It captures what's on your screen, transcribes your meetings, and builds a private, searchable record of everything you've seen. The tools that already do this — Rewind, Limitless — stream your screen to someone else's servers. Off Grid AI does it entirely on your machine. No account, no cloud, no upload. Pull the ethernet cable and it still works.

It doesn't just wait to be searched. Ask "what did I work on yesterday?" and get a real answer. But it's also proactive: open a project and it pulls up the docs you read last time you touched it, the decisions from the last meeting about it, the thing you saw three weeks ago that's suddenly relevant again. You don't go looking for the memory — it comes to you.

The "never leaves your Mac" part is the whole point. It runs on a work laptop where a screen-recording SaaS is a compliance non-starter. In regulated work — law, health, finance — where "we send your screen to a vendor" ends the conversation. Or just because a record of everything you've seen is too sensitive to hand to anyone but yourself.

The tech: macOS ScreenCaptureKit for frames, Apple's Vision framework for on-device OCR, Whisper for meeting transcription, a small local LLM (Gemma) to distill raw capture into readable summaries, and hybrid search (SQLite FTS + LanceDB vectors) across the whole archive. Everything runs on the Apple Silicon you already paid for.

Capture is always explicit opt-in, per app, with a visible recording indicator. AGPL-3.0, build from source.

**Founder's first comment (post immediately after submitting):**

> A bit more on how it works, since "records your screen" understandably makes people nervous.
>
> Capture is frame-based, not a continuous video stream. ScreenCaptureKit grabs frames, Vision OCRs them on-device, and anything that doesn't change (you staring at the same doc) gets deduped before it's ever stored — so the archive is text and sparse keyframes, not hours of raw video. That's what keeps it small enough to live entirely on disk and searchable without a cloud index.
>
> The proactive part is the piece I'm most proud of and the hardest to get right. A small local model (Gemma) distills raw capture into per-project summaries, and hybrid SQLite-FTS + LanceDB vector search decides what's relevant to surface. It runs as a background job on idle, so it's not fighting your foreground apps for the GPU.
>
> Honest limitations: it's macOS + Apple Silicon only right now (the whole thing leans on ScreenCaptureKit and the Neural Engine). Intel Macs work but OCR and the LLM are noticeably slower. And it's a memory layer, not a full agent yet — it surfaces and answers, it doesn't act on your behalf. That's the next thing.
>
> Happy to go deep on the capture pipeline, the dedup/storage model, or why I went truly-local instead of "private cloud." What would be most useful?

> *Title alternates if you want to A/B:* (2) `Show HN: Off Grid AI – AI that remembers everything you see, and never uploads it` · (3) `Show HN: Off Grid AI – Rewind for your Mac, except nothing leaves your machine`

---

## 0b. HN — facts-only scaffold (WRITE THE POST FROM THIS, IN YOUR OWN WORDS)

dang's current #1 tip: **don't let an LLM generate or edit a single word of what you post to HN** — the community is actively flagging LLM-language right now and it draws backlash. The draft above (0) reads LLM-polished. So don't paste it. Instead, sit down and type the post yourself in one go, using only the raw facts below. Aim for plain, slightly uneven prose — first person, no smooth tricolons, no "it's not X, it's Y", go easy on em-dashes.

**Cover these, in roughly this order:**

The problem (your own framing)
- You forget most of what you saw on your screen during a workday.
- Your machine saw all of it and stored none of it.

What it is
- An always-on, on-device memory for your Mac.
- Captures screen + transcribes meetings → private searchable record.
- Runs 100% locally: no account, no cloud, no upload, works offline.
- Contrast with Rewind / Limitless: those send your screen to their servers.

What it does (two modes)
- Reactive: ask "what did I work on yesterday?" → real answer.
- Proactive: open a project → it surfaces docs/decisions/things you saw before that are now relevant.

Who it's for / why local matters
- Work laptops where a screen-recording SaaS is a compliance non-starter.
- Regulated work (law, health, finance) where "we send your screen to a vendor" kills the deal.

The tech (your credibility — keep these exact)
- macOS ScreenCaptureKit → frame capture.
- Apple Vision framework → on-device OCR (LLM never reads pixels).
- Whisper → meeting transcription (speaker diarization).
- Gemma (small local LLM, ~4B) → distills raw capture into per-project summaries, runs as a background job on idle so it doesn't fight foreground apps for the GPU.
- Hybrid search: SQLite FTS (exact/lexical) + LanceDB (vector/semantic), fused.
- Runs on Apple Silicon you already own.

Storage / privacy mechanics (for the first comment)
- Frame-based, not continuous video.
- Unchanged frames deduped before storage → archive is text + sparse keyframes, not hours of video.
- That's what keeps it disk-resident and searchable with no cloud index.
- Capture is explicit opt-in, per app, visible recording indicator, menu-bar pause.
- No telemetry on content, no training on your data.

Honest limitations (say these plainly — they win trust)
- macOS + Apple Silicon only right now.
- Intel Macs work but OCR + inference noticeably slower.
- It's a memory layer, not a full agent yet — surfaces and answers, doesn't act for you. That's next.
- Diarization on overlapping speech is still rough.

License / try it
- AGPL-3.0, build from source: https://github.com/off-grid-ai/desktop

Mechanics
- Title must start with `Show HN:`. Submission URL = the repo.
- Post the deeper how-it-works as your own first comment right after submitting.
- Don't paste the lifetime/$50 offer or any pricing on HN — reads as marketing, instant turnoff there.
- Be around to reply fast in the first hour; have real numbers ready (tok/s, OCR latency, how far back it indexes, disk/day).

---

## 1. r/StableDiffusion

**Outcome:** a fully local, multimodal creative + vision workspace — image gen, vision models, and a memory of your work, no API key in sight.
**Tone:** maker sharing a rig. Lead with the stack, the crowd respects that.

**Title:**
`I built a fully local multimodal studio — SD image gen + a vision model that actually reads my screen, no cloud, no API`

**Body:**

I got tired of my creative stack being half-local. Image gen ran on my machine, but everything around it (prompts, references, "what did I make last week") lived in some webapp. So I built the missing half.

Off Grid AI Desktop runs the whole loop on-device: Stable Diffusion-class image gen, a local VLM (SmolVLM / Qwen-VL) that can look at whatever's on my screen and describe or pull text out of it, Whisper for voice, and a small local LLM (Gemma) tying it together. Apple Silicon does the work — no API key, nothing uploaded.

The part I didn't expect to love: it *remembers*. Every reference image I pulled, every prompt that worked, every screen I looked at while building a piece — it's all in one local, searchable archive. "Show me the prompt I used for that foggy-forest batch three weeks ago" actually returns it. The studio has a memory now, and it's mine, on disk.

Stack, for the people who'll ask: ScreenCaptureKit → Apple Vision OCR, llama.cpp for the LLM, local diffusion for images, LanceDB for vector search over the whole thing. AGPL, build from source.

Curious what the local-gen crowd thinks of folding a vision+memory layer into the creative workflow vs keeping them separate.

*(First comment — drop the link here, not in the post):*
> Repo + builds: https://github.com/off-grid-ai/desktop. Core's free and open source; there's a paid layer that adds the always-on capture/memory stuff if you want it, but everything in this post runs on the free build.

---

## 2. r/DigitalPrivacy

**Outcome:** a searchable record of everything you saw all day that has no mechanism to leave your machine — the anti-Rewind.
**Tone:** the concern is the hook. Architecture, not policy.

**Title:**
`I built the "records everything you see" tool — except it physically can't send anything anywhere`

**Body:**

Tools like Rewind and Limitless solve a real problem: you forget most of what you see, and a searchable record of your day is genuinely useful. The dealbreaker is *how* they do it — your screen, your meetings, your life, streamed to someone else's servers. For a lot of us that's an instant no.

So I built one that can't do that. Off Grid AI Desktop captures what's on your screen, transcribes your meetings, and builds a private searchable memory of all of it — and the model runs in your own machine's memory. No account. No cloud. No upload. There is no server to send anything to. You can pull the ethernet cable and it works exactly the same.

"Private by policy" means a company promises not to look. "Private by architecture" means there's no mechanism for anyone to look, and you can verify it because the whole thing is open source (AGPL). The honest answer to "what leaves my machine?" is *nothing*, and you can read the code to check.

Some specifics privacy folks usually ask about:
- Capture is explicit opt-in, per app, with a visible recording indicator and a pause button in the menu bar.
- It stores text + sparse keyframes, deduped — not a continuous video of your life.
- No telemetry on your content. No training on your data. No analytics pipe for the captures.

It records everything and tells no one. That was the whole point.

*(First comment):*
> Open source + builds, kept out of the post so it doesn't read like an ad: https://github.com/off-grid-ai/desktop. Free core is the full local capture/memory; happy to answer anything about the threat model.

---

## 3. r/OpenSourceAI  (and r/OpenSourceeAI — reuse, tweak a line)

**Outcome:** an open, auditable, self-hostable local intelligence layer — here's how it's built and why open core.
**Tone:** contributor-to-contributors. Architecture and licensing honesty.

**Title:**
`Off Grid AI Desktop: an AGPL "personal chief of staff" that runs entirely on your own hardware — architecture writeup`

**Body:**

Sharing a project I've been building in the open. The goal: the kind of always-on assistant that's only ever existed as a cloud product (Rewind, the various "AI memory" startups), but local-first and auditable.

What it does: captures your screen and meetings on-device, distills them into a searchable memory, reflects on where your day actually went, and can draft/file/update things through an approval queue. The model runs in your machine's memory — no round trips.

How it's built:
- **Capture:** ScreenCaptureKit + Apple Vision for on-device OCR; Whisper for meeting transcription with speaker diarization.
- **Distill:** a small local LLM (Gemma) turns raw capture into per-project summaries on idle, so it's not fighting foreground apps for the GPU.
- **Memory:** hybrid retrieval — SQLite FTS + LanceDB vectors over the whole archive.
- **Act:** connectors (Slack, Gmail, Calendar, Notion, Linear, Jira, GitHub, any MCP server). Read tools run freely; *write* tools route through an approval gate that logs every sign-off.

License is **AGPL-3.0** with an open-core model — the local capture/memory/runtime is open and yours to inspect and self-build; a paid layer funds the work. I went open *because* of what it does: a system that can see your screen has to be one you can audit. "Trust us" isn't good enough when the answer to "what leaves the device" needs to be verifiable.

Would love eyes on the architecture, especially the on-idle distillation and the approval-gate design. Repo in comments.

*(First comment):*
> Source: https://github.com/off-grid-ai/desktop. AGPL-3.0, build from source. The local capture/memory/runtime is all in there; happy to walk through any part of the pipeline.

> *(r/OpenSourceeAI variant: same post, swap the opening line to "Reposting for this community since the focus here skews more applied —" so it doesn't look like a bot cross-post.)*

---

## 4. r/LocalLLaMA

**Outcome:** getting genuinely useful work out of *small* local models — the pipeline, the model choices, the perf, warts included.
**Tone:** deeply technical, assume a skeptical audience, lead with substance not story.

**Title:**
`Getting real work out of a 4B local model: the distill-on-idle pipeline behind an on-device "memory" assistant`

**Body:**

Posting the engineering, because "local AI assistant" usually means "wrapper around an API" and this crowd will (rightly) call that out.

The problem: turn raw screen capture + meeting transcripts into something queryable, using only models that run comfortably on a laptop, without melting the battery or stealing the GPU from whatever you're actually doing.

What ended up working:
- **OCR is not the LLM's job.** Apple's Vision framework does on-device OCR; the LLM never burns tokens reading pixels. Huge win on both speed and accuracy.
- **Distillation runs on idle, in batches.** A 4B-class model (Gemma) summarizes capture into per-project notes when the machine isn't busy. Foreground stays snappy because the heavy lifting waits for slack time.
- **Retrieval is hybrid, not pure-vector.** SQLite FTS for exact/lexical + LanceDB for semantic, fused. Pure vector search kept missing exact identifiers (ticket numbers, error strings); FTS alone missed paraphrase. Together they're solid.
- **Small models are fine when the context is tight.** The trick isn't a bigger model, it's giving a small one a small, relevant, well-retrieved slice. Most "the local model is dumb" failures I hit were retrieval failures wearing a costume.

Honest limitations: macOS + Apple Silicon today (leans hard on ScreenCaptureKit + the Neural Engine). Intel works but OCR + inference are noticeably slower. Diarization quality on overlapping speech is still meh.

Whole thing is AGPL — interested in how others here are handling on-idle scheduling and the FTS+vector fusion weighting. Link in comments to keep it clean.

*(First comment):*
> Code: https://github.com/off-grid-ai/desktop. Build from source. Happy to get into the scheduler internals or the retrieval fusion if anyone wants to compare notes.

---

## 5. r/LocalLLM

**Outcome:** a practical local daily-driver — "I replaced my cloud second-brain with this, here's the actual setup."
**Tone:** practical, helpful, what-models-what-hardware. Less theory than LocalLLaMA, more "here's how to run it."

**Title:**
`Replaced my cloud "second brain" (Rewind/Notion AI) with a fully local setup — here's what I run`

**Body:**

I'd been paying for a couple of cloud tools to remember my work for me and finally moved the whole thing local. Sharing the setup in case it's useful to anyone here doing the same.

What I wanted: search across everything I've seen/done, automatic meeting notes, and a "what did I work on yesterday" that actually answers — without anything leaving the laptop.

What I landed on (Off Grid AI Desktop, open source, does it all in one app so I'm not duct-taping scripts):
- **Models:** Gemma (4B-ish) for summarization/Q&A, Whisper for transcription, a small VLM for screen understanding. All local.
- **Capture:** on-device screen OCR + automatic meeting recording/transcription. Opt-in per app, pause button in the menu bar.
- **Search:** one query across screens, meetings, and docs. Hybrid keyword + semantic, so both "that error string" and "the thing about pricing" find their target.
- **Hardware:** runs fine on my M-series MacBook; idle-time processing means I don't notice it during the day.

Practical notes: storage is text + deduped keyframes, not raw video, so it doesn't eat the disk. Battery hit is small because the heavy summarization waits for idle. No account, no subscription for the core.

Happy to share config/links in the comments. What's everyone else using for the *retrieval* side — anyone gone past plain vector search?

*(First comment):*
> Open source, build from source here: https://github.com/off-grid-ai/desktop. Core's free with no account; happy to share my exact model setup.

---

## 6. r/SideProject

**Outcome:** the build journey + a real launch window. The offer belongs in the body here.
**Tone:** candid founder, traction-forward, a little vulnerable.

**Title:**
`After 100K downloads of my free local-AI app, I built the thing people actually kept asking for — and I'm betting the launch on a deadline`

**Body:**

Backstory: I shipped a free, open-source app that runs AI models locally on your phone/laptop — text, image, vision, voice, no cloud. It did better than I expected (~100K downloads). But the request that kept coming back wasn't "more models." It was "can it *remember* — can it watch my day and actually help me with it?"

So that became Off Grid AI Desktop: an always-on, on-device layer that captures your screen and meetings, builds a private searchable memory, shows you where your time actually went, and drafts your next moves through an approval queue. Same principle as the original — runs on your own hardware, nothing uploaded — but now it's a "chief of staff," not just a model runner.

The launch bet: Pro ships July 2026 at $39/mo (founder rate, locked for early members). But until **July 1** I'm doing a one-time **$50, keep-it-for-life** deal — that includes Pro free, forever. After July 1 the one-time price is gone and it's monthly only. Either it's worth betting on at $50, or the deadline does nothing and I learn something.

Stuff I'm still wrestling with as a solo-ish project: pricing a "pay once" against the reality of ongoing dev, and how much to lean on the privacy angle vs the productivity angle in the messaging. Genuinely want this sub's read on both.

Repo: https://github.com/off-grid-ai/desktop · the $50-for-life deal before July 1: https://getoffgridai.co/pay. Happy to talk stack, GTM, or why I went open-core.

---

## 7. r/europrivacy

**Outcome:** data sovereignty / GDPR — your data never leaves the device, let alone the jurisdiction.
**Tone:** regulation-aware, sober, EU-context.

**Title:**
`A "remembers your whole workday" AI where the data never leaves the device — no processor, no transfer, no DPA needed`

**Body:**

The productivity tools that record your screen and meetings to make them searchable are useful, but from a data-protection standpoint they're a nightmare: you're shipping potentially everything — client data, health info, privileged material — to a US cloud processor. That's a transfer problem, a sub-processor problem, and a "you have no idea what they train on" problem.

I built one that sidesteps the entire question. Off Grid AI Desktop captures your screen and meetings, transcribes and indexes them, and runs the model **in your own machine's memory**. There is no cloud component. No data leaves the device, so there's no international transfer, no third-party processor to put in your records, and nothing sitting on a server to be subpoenaed or breached.

For the GDPR-minded specifically:
- **Data minimisation / locality:** processing is on-device by architecture, not by configuration you have to trust.
- **Auditability:** it's open source (AGPL), so "what does it do with the data" is a question you can answer by reading, not by believing a privacy policy.
- **Control:** capture is opt-in per app, with a visible indicator and a pause control; storage is local and deletable.

It's the rare case where the privacy story isn't a policy — it's the absence of a mechanism. Curious how people here weigh on-device tools against the usual SaaS DPAs. Link in comments.

*(First comment):*
> Source to read for yourself: https://github.com/off-grid-ai/desktop. AGPL, runs entirely on-device. No processor agreement to sign because there's no processor.

---

## 8. r/Startup_Ideas

**Outcome:** the category thesis — local-first personal AI as a business. Framed to invite critique.
**Tone:** discussion, thinking-out-loud, asks for the punch.

**Title:**
`Thesis: the "AI that remembers your whole life" category is going to be won by whoever makes it local, not whoever makes it smartest. Poke holes in this.`

**Body:**

The bet I'm building on, want this sub to stress-test it.

**Premise:** the genuinely valuable personal-AI product is one that sees your whole day and gets ahead of you — a chief of staff. To do that it needs to know basically everything about you. The current players (Rewind, Limitless, the big assistants) deliver this by hoovering your life into their cloud.

**The thesis:** that data-sharing requirement is the category's ceiling, not its engine. The more useful the product, the more terrifying the cloud version becomes — so the people who'd benefit most (anyone handling sensitive work) are exactly the people who can't adopt it. Whoever makes the *same capability* run entirely on the user's own hardware removes the ceiling. Privacy stops being a feature and becomes the unlock.

**Why now:** the hardware to run useful models locally is already in everyone's bag (Apple Silicon, phone NPUs). The compute for a personal chief of staff isn't rented anymore — it's sitting idle on your desk.

**How I'm testing it:** built it (Off Grid AI Desktop — on-device capture/memory/act, open source: https://github.com/off-grid-ai/desktop), shipped a free local-AI predecessor that hit ~100K downloads, and I'm gating a paid "remember + act" layer behind it.

Where I think the thesis is weakest, and where I want your fire:
1. Is "local-first" a real moat or just a temporary trust advantage the incumbents copy with on-device modes?
2. Does the average knowledge worker actually care about privacy enough to choose on it, or do they pick the smarter cloud product every time?
3. Is "pay once / self-host" a viable business against VC-subsidized free cloud tiers?

Tear into it.

---

## 9. r/ollama

**Outcome:** turn the local models you already run into an always-on ambient assistant — integration-first.
**Tone:** practical, peer-to-peer, "you already have the models, here's the missing layer."

**Title:**
`You're already running local models — here's the always-on "memory + assistant" layer I built to sit on top of them`

**Body:**

Most of us here already run local models for chat. What I wanted was the layer *above* that: something always-on that feeds the model real context about my day so it's actually useful, not just a blank chat box I have to spoon-feed every time.

So I built Off Grid AI Desktop. It captures my screen and meetings on-device, OCRs and transcribes them, and keeps a local searchable memory — then a small local model (Gemma-class, same spirit as what you'd pull in Ollama) distills and answers over it. The model has context now: "what did I work on yesterday," "pull the decision from Tuesday's call," "what's open with this person" — all answered from local memory, nothing uploaded.

For this crowd specifically:
- Runs the LLM in local memory, on idle, so it's not competing with your foreground work.
- Retrieval is hybrid (keyword + vector), which mattered way more than model size for answer quality — a small model with good retrieval beats a big one guessing.
- OCR/transcription are handled by dedicated on-device models (Vision/Whisper), so the LLM only ever sees clean text.

It's AGPL and open source. If you've already got the local-inference habit, this is the "make it ambient and give it a memory" piece. Repo/builds in the comments — and I'm curious how people here would wire the distillation step differently.

*(First comment):*
> Code + builds: https://github.com/off-grid-ai/desktop. AGPL, build from source.

---

## Posting checklist

- [ ] Space posts out (1–2/day), don't blast all nine at once.
- [ ] Rewrite the first line of each so they're not detectably templated.
- [ ] Link + offer in the **first comment** for: StableDiffusion, DigitalPrivacy, OpenSourceAI(+ee), LocalLLaMA, LocalLLM, europrivacy, ollama. Offer **in body** OK for: SideProject, Startup_Ideas.
- [ ] Read each sub's self-promo rule first — some require a flair or a ratio of non-promo posts.
- [ ] Have real numbers ready for replies (tok/s, OCR latency, how far back it indexes, disk/day). The body claims are conservative; the comments are where credibility is won.
- [ ] Reply fast in the first hour — early engagement drives the rest.
