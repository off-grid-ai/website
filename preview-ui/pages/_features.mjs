// Feature pages: one per group at /features/<slug>/, all rendered by _feature.jsx from this list.
// tools/gen-features.mjs writes each page's wrapper, stylesheet and Markdown (with its FAQ) from here.
// Each item plays its screens in the shared feature explorer; 'mobile/…' screens are phone captures.
// Copy follows brand/brand_tone_voice.md: short, specific, no em dashes, "Off Grid AI" in full.
export const FEATURES = [
  {
    slug: 'meetings-and-memory', name: 'Meetings & memory', note: 'Calls, screens and your day, remembered',
    kicker: 'OFF GRID AI PRO', lead: 'Your workday,', dim: 'remembered.',
    lede: 'Calls, screens, your day and the people in it, kept on your computer. Ask about any of it later.',
    description: 'Off Grid AI records your meetings, remembers your screen, writes your daily journal and answers with sources. All on your computer.',
    items: [
      { id: 'meetings', title: 'Meeting recorder', cmd: 'summarize the Acme pilot kickoff', line: 'Zoom, Meet and Teams, recorded and transcribed on your computer. No bot joins the call.', shots: [
        ['meetings', 'Off Grid AI Meetings: the Acme pilot kickoff summary, screens shared and decisions.'],
        ['meetings-onscreen', 'Off Grid AI Meetings: what was on screen during the call, frame by frame.'],
        ['meetings-transcript', 'Off Grid AI Meetings: the transcript, made on this computer.'],
        ['meetings-followups', 'Off Grid AI Actions: follow-ups from the kickoff, landed as to-dos.']] },
      { id: 'replay', title: 'Screen memory', cmd: 'replay what I worked on', line: 'Your screen, read and summarized on your computer. Pause it, or keep an app out.', shots: [
        ['replay', 'Off Grid AI Replay: the Acme rollout plan you had open, with its summary.'],
        ['capture-film', 'Off Grid AI Replay: the day as a filmstrip, frame by frame.'],
        ['capture-edit', 'Off Grid AI Replay: a frame with its description and tags, ready to edit.'],
        ['capture-exclude', 'Off Grid AI capture settings: Messages, Keychain Access, banking and private notes kept out.']] },
      { id: 'day', title: 'Auto-journal', cmd: 'write my journal', line: 'Meetings, to-dos, a journal and a timeline, written from your day.', shots: [
        ['day', "Off Grid AI Day: to-dos, today's meetings, the journal, time spent and suggestions."],
        ['today-journal', 'Off Grid AI Day: the journal written from the day, the kickoff, the promise and the reply.'],
        ['today-timeline', 'Off Grid AI Day: the timeline, hour by hour across Slack, Zoom, Mail, Linear and Figma.'],
        ['day-earlier', "Off Grid AI Day: Wednesday's recap, its journal, time spent and timeline."],
        ['today-yesterday', "Off Grid AI Day: yesterday's recap, its journal and timeline."]] },
      { id: 'reflect', title: 'Time tracking', cmd: 'where did my time go?', line: 'Time by app, project and person. No timers to start.', shots: [
        ['reflect', 'Off Grid AI Reflect: time by app, people and focus.'],
        ['reflect-day', 'Off Grid AI Reflect: mind share, focus and the insights from one day.'],
        ['reflect-week', 'Off Grid AI Reflect: the week, day by day, work against communication.']] },
      { id: 'search', title: 'Search everything', cmd: 'what did I promise Sam?', line: 'Chats, meetings, screens and people in one search. Every answer shows its sources.', shots: [
        ['search', 'Off Grid AI Search: acme pilot across chats, meetings, screens and people.'],
        ['ask-filter', 'Off Grid AI Search: results narrowed to meetings and mail, newest first.'],
        ['chat', 'Off Grid AI Chat: what Alex promised Sam, with the kickoff and the rollout plan as sources.']] },
      { id: 'people', title: 'People', cmd: 'who is Sam Okafor?', line: 'People and companies from your mail, meetings and screens, each with a timeline.', shots: [
        ['people-directory', 'Off Grid AI People: Sam, Priya, Tom, Maya and Daniel, with their companies.'],
        ['people-list', 'Off Grid AI People: each person with their company, mentions and last seen.'],
        ['people-sam', "Off Grid AI People: Sam Okafor's story, open to-dos and today's timeline."],
        ['people-why', 'Off Grid AI People: Why opens the captured screen behind a claim about Sam.'],
        ['people-companies', 'Off Grid AI People: companies, Acme Corp and Northwind Capital.']] },
    ],
    faq: [
      ['Does a bot join my meetings?', 'No. Off Grid AI records Zoom, Meet and Teams on your computer, so nothing joins the call. Let people know you are recording, as you would with any notetaker.'],
      ['Where is my data kept?', "On your computer, in Off Grid AI's encrypted database. Transcription and summaries run on the same computer."],
      ['Can I keep apps out of capture?', 'Yes. Add an app to the excluded list and Off Grid AI saves no screen images while it is open. You can pause capture any time.'],
      ['Is this free?', 'These are Off Grid AI Pro features. Chat, images, voice and documents are free.'],
    ],
    articles: [
      'how-to-get-automatic-zoom-meeting-notes-on-your-mac-in-2026-no-cloud-transcription',
      'how-to-find-something-you-saw-on-your-mac-in-2026-without-taking-notes',
      'how-to-create-a-private-work-journal-from-your-mac-activity-in-2026-no-manual-logging',
      'how-to-spot-focus-and-context-switching-patterns-in-your-mac-workday-in-2026',
    ],
  },
  {
    slug: 'ai-assistant', name: 'AI assistant', note: 'Briefings, drafts and tasks',
    kicker: 'OFF GRID AI', lead: 'An assistant', dim: 'that waits for your yes.',
    lede: 'It briefs you, drafts the reply and runs the task. Nothing goes out until you approve it.',
    description: 'Off Grid AI briefs you each morning, drafts replies for your approval, runs web errands and takes dictation.',
    items: [
      { id: 'god', title: 'Morning briefing', cmd: 'brief me, Ares', line: 'Your calendar, approvals and open work in one brief, every morning.', shots: [
        ['god', 'Off Grid AI God: the 8:50 AM briefing from Ares, with three approvals waiting.'],
        ['god-prep', 'Off Grid AI God: prep for the Northwind board meeting, with last-time notes and sources.'],
        ['god-waiting', 'Off Grid AI God: what is waiting for you, and what Priya and Tom owe you.'],
        ['god-routines', 'Off Grid AI God: scheduled tasks such as the weekday briefing and meeting prep.'],
        ['god-rules', 'Off Grid AI God: the rules Ares follows, like never sending anything to Acme without asking.']] },
      { id: 'act', title: 'Approvals', cmd: 'draft the reply to Sam', line: 'It drafts the email and you approve, edit or reject it.', shots: [
        ['act-todos', 'Off Grid AI Actions: to-dos with owners, due dates and where they came from.'],
        ['act-list', 'Off Grid AI Actions: pending approvals, each with the notes it came from and the exact request.'],
        ['act-draft', 'Off Grid AI Chat: the reply to Sam drafted from the kickoff, with sources.'],
        ['approval', 'Off Grid AI approval card: the Gmail reply to Sam, waiting for Approve, Edit or Reject.'],
        ['act-done', 'Off Grid AI Actions: the reply to Sam, sent after approval, with its sources and result.'],
        ['act-history', 'Off Grid AI Actions: history, the reply to Sam sent and a promo email rejected.']] },
      { id: 'tasks', title: 'Tasks', cmd: 'calculate Team pricing for 40 people', line: 'Computer Use and Web Use: it works in your apps and browser. You take over for passwords.', shots: [
        ['web-tasks', 'Off Grid AI Tasks: the history of finished tasks, with replays.'],
        ['web-plan', 'Off Grid AI Web Use: the plan on the Leafline pricing page, step by step.'],
        ['web-step', 'Off Grid AI Web Use reading the Team plan price, with live progress.'],
        ['web-compare', 'Off Grid AI chat: Team pricing for 40 people in a table, with a recommendation.'],
        ['web-takeover', 'Off Grid AI Web Use pauses for you to sign in. It never reads your password.'],
        ['web-done', 'Off Grid AI Web Use: the finished task with its result and replay.']] },
      { id: 'voice', title: 'Voice and dictation', cmd: 'dictate a note', line: 'Dictate into any app. Ask out loud and hear the answer.', shots: [
        ['voice-library', 'Off Grid AI Voice: dictations with the people, projects and to-dos pulled out.'],
        ['voice-clean', 'Off Grid AI Voice: the same take with filler words, before cleanup.'],
        ['voice-reply', 'Off Grid AI chat in voice mode: spoken question, spoken answer.'],
        ['mobile/voice-ios-2', 'Off Grid AI on iPhone: replies come back as voice notes, each with a transcript.']] },
    ],
    faq: [
      ['Will it send anything without asking?', 'No. Emails, messages and web submissions wait for your Approve. You can edit the draft first or reject it.'],
      ['What do tasks do with my passwords?', 'It stops and hands the page to you. You sign in yourself, and Off Grid AI never reads the password.'],
      ['Which parts are free?', 'Chat and voice replies are free. Briefings, approvals, dictation and tasks are part of Off Grid AI Pro.'],
      ['Does it work offline?', 'Chat and voice run on local models with the Wi-Fi off. Email, calendar and the web need a connection.'],
    ],
    articles: [
      'how-to-get-an-automatic-morning-briefing-of-meetings-and-to-dos-in-off-grid-ai-on-mac-in-2026',
      'how-to-automate-tasks-in-your-signed-in-browser-with-local-ai-in-2026',
      'how-to-dictate-into-any-mac-app-with-local-ai-in-2026-no-cloud-transcription',
      'how-to-ask-ai-about-your-company-documents-in-2026-without-uploading-them',
    ],
  },
  {
    slug: 'documents-and-tools', name: 'Documents & tools', note: 'RAG, projects, MCP and connectors',
    kicker: 'OFF GRID AI', lead: 'Your documents and tools,', dim: 'in one chat.',
    lede: 'Ask your PDFs and notes, with page citations. Connect your accounts and MCP servers. Actions wait for your yes.',
    description: 'Chat with your documents using local RAG, organise work into projects, and connect Gmail, Calendar, Notion, Linear, Jira and any MCP server to Off Grid AI. Answers cite their sources and actions wait for your approval.',
    items: [
      { id: 'projects', title: 'Projects and RAG', cmd: 'summarise the rollout plan with page numbers', line: 'Answers from your PDFs and notes, with the page each one came from.', shots: [
        ['project-summary', 'Off Grid AI Projects: Acme_rollout_v3.pdf summarised with page numbers and a cited source.'],
        ['project-compare', 'Off Grid AI Projects: what changed from v2 to v3 of the rollout plan, citing both PDFs.'],
        ['project-checklist', 'Off Grid AI Projects: a launch checklist for 14 Nov, built from three documents.'],
        ['mobile/project-ios-1', 'Off Grid AI on iPhone: the Acme Corp pilot project with its documents and chats.'],
        ['mobile/project-ios-2', 'Off Grid AI on iPhone answering from the Acme project documents.']] },
      { id: 'connectors', title: 'Connectors', cmd: 'connect my work tools', line: 'Google, Microsoft, Notion, Jira and Linear, read live when you ask.', shots: [
        ['integrations', 'Off Grid AI Integrations: Google, Microsoft, Notion, Jira, Linear, Obsidian, Vercel and Attio.'],
        ['approval', 'Off Grid AI approval card: a Gmail reply to Sam, waiting for Approve, Edit or Reject.'],
        ['act-history', 'Off Grid AI Actions: history, the reply to Sam sent and a promo email rejected.']] },
      { id: 'tools', title: 'Tools and MCP', cmd: 'how many seat-days is the pilot?', line: 'Built-in tools and your MCP servers. Switch each one on or off.', shots: [
        ['settings-mcp', 'Off Grid AI settings: tool groups for calendar, web, memory, device and more, each on or off.'],
        ['mobile/tools-ios-1', 'Off Grid AI on iPhone: a calculator tool call works out 1,200 seat-days.']] },
      { id: 'artifacts', title: 'Artifacts', cmd: 'draw the rollout as a flowchart', line: 'Flowcharts, pages and charts, drawn beside your chat.', shots: [
        ['artifacts', 'Off Grid AI Canvas: the Acme rollout plan as a flowchart beside the chat.']] },
    ],
    faq: [
      ['Do my documents get uploaded?', 'No. Off Grid AI indexes them on your device, and answers cite the file and page.'],
      ['Which accounts can I connect?', 'Google, Microsoft, Notion, Jira, Linear, Obsidian and more, plus any MCP server you add.'],
      ['Will it act without asking?', 'No. Connected accounts are read when you ask. Every send or change waits for your Approve.'],
      ['Which parts are free?', 'Projects, MCP servers and artifacts are free. Account connectors and actions are part of Off Grid AI Pro.'],
    ],
    articles: [
      'how-to-chat-with-your-documents-locally-offline-rag-no-cloud',
      'connector-support-in-off-grid-ai-desktop-private-approval-gated-integrations',
      'how-to-expose-on-device-ai-models-as-mcp-tools-local-mcp-server-no-cloud',
      'how-to-export-ai-generated-web-pages-diagrams-and-code-in-off-grid-ai-in-2026',
    ],
  },
  {
    slug: 'devices-and-privacy', name: 'Devices & privacy', note: 'Sync, clipboard and vault, no cloud',
    kicker: 'OFF GRID AI PRO', lead: 'Your devices,', dim: 'with no cloud between them.',
    lede: 'Phone and computer stay in sync over your own network. Your clipboard and passwords stay encrypted on them.',
    description: 'Off Grid AI syncs chats, files, images and models between your phone and computer, keeps your clipboard history and stores passwords in an encrypted vault. No cloud.',
    items: [
      { id: 'sync', title: 'Sync', cmd: 'pair my phone and my Mac', line: 'Chats, files, images and models move between your devices, encrypted, over your own network.', shots: [
        ['sync-devices', "Off Grid AI Devices: Alex's iPhone connected over Wi-Fi, with Send model."],
        ['mobile/sync-ios-1', 'Off Grid AI Sync on iPhone: the Mac connected over Wi-Fi.'],
        ['sync-sharing', 'Off Grid AI Devices: what syncs automatically, what asks first, and what never leaves.'],
        ['sync-activity', "Off Grid AI Devices: files, a model and an image sent to and from Alex's iPhone."]] },
      { id: 'clipboard', title: 'Clipboard', cmd: 'search what I copied for acme', line: 'Everything you copied, searchable, on every device. One shortcut opens it over any app.', shots: [
        ['clipboard-all', 'Off Grid AI Clipboard: everything copied today, images, files, links and text.'],
        ['clipboard-search', 'Off Grid AI Clipboard: a search for acme across copies.'],
        ['clipboard-file', 'Off Grid AI Clipboard: files only, the rollout plan PDF previewed as text.'],
        ['clipboard-tags', 'Off Grid AI Clipboard: tagged copies, ready to find again.'],
        ['clipboard-phone', "Off Grid AI Clipboard: a note copied on Alex's iPhone, on the Mac."],
        ['clipboard-quick', 'Off Grid AI Clipboard: quick open over any app, searching for Sam.']] },
      { id: 'vault', title: 'Vault', cmd: 'unlock my vault', line: 'Passwords, keys, notes and files, encrypted and unlocked only by you.', shots: [
        ['vault-locked', 'Off Grid AI Vault: locked.'],
        ['vault-typing', 'Off Grid AI Vault: entering the master password.'],
        ['vault-open', 'Off Grid AI Vault: logins, an API key, a secure note and a signed PDF.'],
        ['vault-file', 'Off Grid AI Vault: an encrypted .env file with its keys masked.']] },
    ],
    faq: [
      ['Does sync need the internet?', 'No. Devices sync over your local network, or directly between nearby Apple devices.'],
      ['What can sync?', 'Chats and projects, files, generated images, copied text, screenshots and downloaded models.'],
      ['How many devices?', 'Up to {devices} devices with Off Grid AI Pro.'],
      ['Who can open my vault?', 'Only you, with your master password. It is encrypted on your device and never uploaded.'],
    ],
    articles: [
      'how-to-pair-your-phone-and-computer-in-off-grid-ai-in-2026-local-chat-and-file-sync',
      'how-to-recover-text-you-copied-earlier-on-your-mac-in-2026-automatic-clipboard-history',
      'how-to-store-api-keys-securely-on-your-computer-in-2026-no-cloud-vault',
      'how-to-transfer-ai-models-from-your-computer-to-your-phone-in-2026-without-downloading-them-again',
    ],
  },
  {
    slug: 'models', name: 'Models', note: 'Local and remote, every kind',
    kicker: 'FREE', lead: 'Every kind of model.', dim: 'On your own hardware.',
    lede: 'Text, vision, images, speech and transcription. Download once and they work with the Wi-Fi off.',
    description: 'Run local AI models on your computer and phone with Off Grid AI: text, vision, image generation, speech and transcription, plus remote servers and a local OpenAI-compatible API.',
    items: [
      { id: 'local', title: 'Local models', cmd: 'choose models for my devices', line: 'Qwen, Gemma, Llama and more, marked by how well they fit your computer.', shots: [
        ['models-fit', 'Off Grid AI Models: text models marked by how well they fit this computer.'],
        ['mobile/models-ios-1', 'Off Grid AI on iPhone: models picked for the phone, with vision and tools marked.'],
        ['models-storage', 'Off Grid AI Models: storage used by each downloaded model.']] },
      { id: 'remote', title: 'Remote models', cmd: 'use the model on my Mac', line: 'Use a bigger model on your computer from your phone, or any OpenAI-compatible server.', shots: [
        ['mobile/remote-ios-2', "Off Grid AI on iPhone: Remote Servers using Alex's Mac over Wi-Fi."],
        ['gateway', 'Off Grid AI Gateway: the computer serving its models to the phone.']] },
      { id: 'vision', title: 'Vision', cmd: "what's the total on this receipt?", line: 'Ask about a photo, a page, a chart or two versions of a slide.', shots: [
        ['mobile/vision-ios-2', 'Off Grid AI on iPhone: a photo of a receipt, answered with the total.'],
        ['vision-screenshot', 'Off Grid AI Chat reading a page of the rollout plan: the start date and the owner.'],
        ['vision-compare', 'Off Grid AI Chat comparing v2 and v3 of a rollout slide: new dates, a new stage, named owners.'],
        ['vision-chat', 'Off Grid AI Chat reading an attached chart.']] },
      { id: 'images', title: 'Image generation', cmd: 'make an image', line: 'Open image models on your own machine. No credits and no queue.', shots: [
        ['mobile/imagegen-ios-1', 'Off Grid AI on iPhone: a lighthouse image and its enhanced prompt.'],
        ['imagegen-chat', 'Off Grid AI Chat: the alpine lake prompt and its generated image.'],
        ['models-image', 'Off Grid AI Models: image models on this computer.']] },
      { id: 'transcription', title: 'Transcription', cmd: 'translate this for Sam’s team', line: 'Whisper on your computer, in the language spoken. Translate the result in chat.', shots: [
        ['models-transcription', 'Off Grid AI Models: transcription models available to download.'],
        ['chat-translate', 'Off Grid AI Chat: the reply to Sam translated into Spanish, names and dates kept.']] },
      { id: 'api', title: 'Local API', cmd: 'curl localhost:7878/v1/chat/completions', line: 'An OpenAI-compatible endpoint on your machine for your other apps. No API key.', shots: [
        ['gateway', 'Off Grid AI Gateway: the local base URL, a curl example, and endpoints for chat, images, speech and embeddings.'],
        ['gateway-log', 'Off Grid AI activity: every model call, with its request, response and timing.'],
        ['api-activity', 'Off Grid AI activity: every model call, with its request and response.']] },
    ],
    faq: [
      ['Which models can I run?', 'Qwen, Gemma, Llama, Mistral and other GGUF models that fit your memory. Off Grid AI marks which ones fit.'],
      ['Do I need an account or API key?', 'No. Download a model and run it. Remote servers are optional and use the keys you add.'],
      ['Does it work offline?', 'Yes. Once a model is downloaded, chat, vision, images and transcription work with the Wi-Fi off.'],
      ['Can my other apps use these models?', 'Yes. Point any OpenAI client at http://127.0.0.1:7878/v1 on your computer.'],
    ],
    articles: [
      'do-you-need-a-powerful-computer-to-run-local-ai-in-2026',
      'how-to-switch-between-local-and-remote-llms-on-your-phone-without-two-apps-or-two-workflows',
      'how-to-explain-a-chart-with-local-ai-in-2026-without-uploading-the-image',
      'how-to-run-a-local-openai-compatible-api-on-your-desktop-in-2026-no-cloud-no-keys',
    ],
  },
];

// Fill {devices}, {lifetime} and {monthly} from the live pricing.
export const fill = (s, p) => s.replace(/\{(\w+)\}/g, (m, k) => (p && p[k] != null ? String(p[k]) : m));
