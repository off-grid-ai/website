import React, { useEffect, useState } from 'react';
import { usePricing } from '../pricing.js';
import { motion, AnimatePresence } from 'motion/react';
import { Badge } from '@radix-ui/themes';
import { ArrowUpRight, LockKey, Check, CheckCircle } from '@phosphor-icons/react';
import { Terminal, AnimatedSpan, TypingAnimation as TermTyping } from '@magicui/terminal';
import Button from '@smoothui/smooth-button';
import { Safari } from '@magicui/safari';
import { PageShell, Kicker, Title, Lede, SceneCard, SectionBg, Shot, PlatformIcon, useSteps, CmdBar, CmdScope, ZoomCtx, useZoomOwner } from '../shared.jsx';
import { useBetaLinks, Proof, Dl, AppWindow, Explorer, Framed, Seq, Fit, Loop, Wipe, AutoCtl, FreeVsPro, Faq, OfflineScene } from './_product.jsx';

const V = '0.0.54';
const BETA = '0.0.55-beta.114';
const REL = `https://github.com/off-grid-ai/OGAD/releases/download/v${V}`;
const DL = {
  macos: { id: 'macos', href: `${REL}/OffGrid-${V}.dmg`, aria: 'Download for macOS stable', small: 'Download for', label: 'macOS', note: 'Apple Silicon, M1 and later' },
  windows: { id: 'windows', href: `${REL}/off-grid-ai-${V}-setup.exe`, aria: 'Download for Windows stable', small: 'Download for', label: 'Windows', note: 'x64 installer' },
  linux: { id: 'linux', href: `${REL}/off-grid-ai-${V}.AppImage`, aria: 'Download for Linux stable (AppImage)', small: 'AppImage for', label: 'Linux', note: 'x64 AppImage' },
};
const GITHUB = { id: 'github', href: 'https://github.com/off-grid-ai/OGAD', small: 'Open source', label: 'Star on GitHub', external: true };

// The real desktop app, chapter by chapter.
const CHAPTERS = [
  { id: 'god', label: 'God', cmd: 'brief me, Ares', shots: [['god', 'Off Grid AI God: the 8:50 AM briefing from Ares, with three approvals waiting.', 3800], ['god-prep', 'Off Grid AI God: prep for the Northwind board meeting, with last-time notes and cited sources.', 3800], ['god-waiting', 'Off Grid AI God: what is waiting for you, the approvals and what Priya and Tom owe you.', 3600], ['god-voice', 'Off Grid AI God in voice mode: the morning briefing as voice notes.', 3200], ['god-routines', 'Off Grid AI God settings: scheduled tasks such as the weekday morning briefing, meeting prep and an approvals digest.', 3400], ['god-rules', 'Off Grid AI God settings: the rules Ares always follows, like never sending anything to Acme without asking.', 3000], ['god-choose', 'Off Grid AI God settings: Ares is your god; Athena is a download away.', 3000]] },
  { id: 'act', label: 'Actions', cmd: 'what do I owe people?', shots: [['actions', 'Off Grid AI Actions: open to-dos from your work, Suggest actions, and three approvals waiting.', 3600], ['approval', 'Off Grid AI approval card: the full Gmail reply to Sam Okafor, waiting for Approve, Edit or Reject.', 4000]] },
  { id: 'vault', label: 'Vault', cmd: 'unlock my vault', shots: [['vault-locked', 'Off Grid AI Vault, locked.', 1600], ['vault-typing', 'Entering the master password.', 1400], ['vault-open', 'Off Grid AI Vault: logins, an API key, a secure note and a signed PDF.', 3400]] },
  { id: 'api', label: 'API', cmd: 'curl localhost:7878/v1/chat/completions', shots: [['gateway', 'Off Grid AI Gateway: the local base URL, a curl example, and endpoints for chat, images, speech, embeddings and models.', 4000]] },
];

function OsPick({ os }) {
  const main = DL[os]; const rest = Object.values(DL).filter(d => d.id !== os);
  return <div className="pp-cta">
    <Button asChild size="lg" className="pp-main"><a href={main.href} aria-label={main.aria} title={main.aria}><PlatformIcon id={main.id} size={18} /> Download for {main.label}</a></Button>
    <span className="pp-main-note">Free · {V} · {main.note}</span>
    <div className="pp-alts">
      {rest.map(d => <a key={d.id} className="pp-alt" href={d.href} aria-label={d.aria} title={d.aria}><PlatformIcon id={d.id} size={15} />{d.id === 'linux' ? 'Linux AppImage' : d.label}</a>)}
      <a className="pp-alt" href={GITHUB.href} target="_blank" rel="noopener">Star on GitHub <ArrowUpRight size={13} /></a>
    </div>
  </div>;
}

// The visitor's desktop platform: macOS until the browser says Windows or Linux (server render stays macOS).
function useOs() {
  const [os, setOs] = useState('macos');
  useEffect(() => { const ua = navigator.userAgent; if (/Windows/i.test(ua)) setOs('windows'); else if (/Linux/i.test(ua) && !/Android/i.test(ua)) setOs('linux'); }, []);
  return os;
}
function FreeDownload() {
  const d = DL[useOs()];
  return <a className="pp-btn" href={d.href} aria-label={d.aria} title={d.aria}><PlatformIcon id={d.id} size={15} /> Download free</a>;
}

function Hero() {
  const os = useOs();
  return <section className="pp pp-hero has-bg" aria-labelledby="pp-h1"><SectionBg />
    <div className="section-shell pp-hero-stack">
      <div className="pp-hero-copy">
        <span className="pp-plat"><Kicker>OFF GRID AI DESKTOP</Kicker><span className="pp-plat-ic" role="img" aria-label="macOS, Windows, Linux"><PlatformIcon id="macos" size={15} /><PlatformIcon id="windows" size={15} /><PlatformIcon id="linux" size={15} /></span></span>
        <Title as="h1" id="pp-h1" className="pp-h1" lead="Your personal AI." dim="On your computer." />
        <Lede className="pp-lede">Free on the computer you own. Pro adds memory and actions you approve.</Lede>
        <OsPick os={os} />
        <Proof />
      </div>
      <AppWindow chapters={CHAPTERS} label="Desktop app views" />
    </div>
  </section>;
}

/* ── Free capabilities ── */
const card = (node) => (compact) => compact ? <div className="pp-card-scene"><Loop>{node}</Loop></div> : <Fit><SceneCard className="pp-scene-card"><Loop>{node}</Loop></SceneCard></Fit>;
const FREE = [
  { id: 'chat', cmd: 'what did I promise Sam?', title: 'Chat', line: 'Local text and vision models.', visual: () => <Seq shots={[['chat', 'Off Grid AI Chat: a sourced answer about the Acme Corp pilot, citing a meeting and a document.', 3800], ['chat-translate', 'Off Grid AI Chat: the reply to Sam translated into Spanish, names and dates kept.', 3800], ['vision-chat', 'Off Grid AI Chat reading an attached chart with a local vision model.', 3800]]} /> },
  { id: 'images', cmd: 'make an image', title: 'Image generation', line: 'Images made on your GPU.', visual: () => <Seq shots={[['models-image', 'Off Grid AI Models: Z-Image Turbo and SDXL Lightning on this computer.', 3200], ['imagegen-chat', 'Off Grid AI Chat: the alpine lake prompt and its generated image.', 3800]]} /> },
  { id: 'voice', cmd: 'ask about the pilot out loud', title: 'Voice', line: 'Dictate with Whisper. Hear replies with Kokoro.', visual: () => <Framed><Shot lazy={false} name="voice-reply" alt="Off Grid AI chat in voice mode: a spoken question about the Acme pilot and a spoken answer, both with transcripts." /></Framed> },
  { id: 'projects', cmd: 'ask the Acme project', title: 'Projects', line: 'Answers from your documents, with sources.', visual: () => <Seq shots={[['projects', 'Off Grid AI Projects: an answer about the Acme pilot with document citations.', 3800], ['project-compare', 'Off Grid AI Projects: what changed from v2 to v3 of the rollout plan, citing both PDFs.', 3800], ['project-checklist', 'Off Grid AI Projects: a launch checklist for 14 Nov, built from three project documents.', 3800]]} /> },
  { id: 'artifacts', cmd: 'draw the rollout as a flowchart', title: 'Artifacts', line: 'Charts, pages and diagrams beside your chat.', visual: () => <Framed><Shot lazy={false} name="artifacts" alt="Off Grid AI chat with the canvas beside it: a Mermaid flowchart of the Acme rollout." /></Framed> },
  { id: 'connectors', cmd: 'connect my tools', title: 'Connectors', line: 'Your accounts and MCP tools, inside chat.', visual: () => <Seq shots={[['integrations', 'Off Grid AI Integrations: Google, Microsoft, Notion, Jira and Linear, acting only after approval.', 3400], ['settings-mcp', 'Off Grid AI settings: tool groups for calendar, web, memory and more, each on or off.', 3400]]} /> },
  { id: 'models', cmd: 'show text models', title: 'Any model', line: 'The catalog, or any GGUF on Hugging Face.', visual: () => <Seq shots={[['models-text', 'Off Grid AI model library: text models.', 1800], ['models-vision', 'Vision models.', 1800], ['models-transcription', 'Speech to text models.', 1800], ['models-computer-use', 'Computer use models.', 1800], ['models-voice', 'Text to speech models.', 1800], ['models-fit', 'Off Grid AI Models: text models marked by how well they fit this Mac.', 3400], ['models-storage', 'Off Grid AI Models: storage used by each downloaded model.', 3400]]} /> },
  { id: 'offline', cmd: 'turn off Wi-Fi and ask', title: 'Offline by default', line: 'Download once. No account, no internet.', visual: card(<OfflineScene where="your computer" />) },
];

/* ── Pro capabilities ── */
const PRO = [
  { id: 'sees', cmd: 'replay what I worked on', title: 'It sees', line: 'Your screen, as searchable memory.', visual: () => <Seq shots={[['replay', 'Off Grid AI Replay: the Acme rollout plan you had open, captured with a summary.', 3400], ['capture-settings', 'Off Grid AI capture settings: capturing, with Messages, Keychain Access and banking excluded.', 3400]]} /> },
  { id: 'remembers', cmd: 'open today', title: 'It remembers', line: 'Meetings, to-dos, a journal and a timeline.', visual: () => <Seq shots={[['day', "Off Grid AI Day: to-dos, today's meetings, the journal, time spent and suggestions.", 3400], ['today-journal', 'Off Grid AI Day: the journal Off Grid AI wrote from the day, the kickoff, the promise and the reply.', 3400], ['today-timeline', 'Off Grid AI Day: the timeline, hour by hour across Slack, Zoom, Mail, Linear and Figma.', 3400]]} /> },
  { id: 'maps', cmd: 'who is Sam Okafor?', title: 'It maps your world', line: 'People, projects and open work, kept current.', visual: () => <Seq shots={[['people-sam', "Off Grid AI People: Sam Okafor's story, open to-dos and today's timeline.", 3400], ['people-why', 'Off Grid AI People: Why opens the captured screen behind a claim about Sam.', 3400], ['people-project', 'Off Grid AI People: the Acme Corp pilot project, its story, people and timeline.', 3400]]} /> },
  { id: 'reflects', cmd: 'where did my time go?', title: 'It reflects', line: 'Time by app, and how often you switch.', visual: () => <Framed><Shot lazy={false} name="reflect" alt="Off Grid AI Pro Reflect view: mind-share, time by app, and focus versus context-switching." /></Framed> },
  { id: 'meetings', cmd: 'summarize the Acme pilot kickoff', title: 'Meetings', line: 'Zoom, Meet and Teams, transcribed on this computer.', visual: () => <Seq shots={[['meetings', 'Off Grid AI Meetings: the Acme pilot kickoff summary, screens shared and decisions.', 3400], ['meetings-transcript', 'Off Grid AI Meetings: the transcript, transcribed on this Mac.', 3400], ['meetings-followups', 'Off Grid AI Actions: follow-ups from the kickoff, landed as to-dos.', 3400]]} /> },
  { id: 'dictation', cmd: 'dictate a note', title: 'Dictation', line: 'Hold a key and speak. It types for you.', visual: () => <Seq shots={[['voice-library', 'Off Grid AI Voice: dictations with the people, projects and to-dos pulled out.', 3400], ['voice-clean', 'Off Grid AI Voice: the same take with filler words, before cleanup.', 3400], ['voice-settings', 'Off Grid AI Voice settings: mode, shortcut, paste at cursor and the Whisper engine.', 3400]]} /> },
  { id: 'clipboard', cmd: 'search what I copied for acme', title: 'Clipboard', line: 'Everything you copied, searchable.', visual: () => <Seq shots={[['clipboard-all', 'Off Grid AI Clipboard: everything copied today, images, files, links and text.', 3400], ['clipboard-pdf', 'Off Grid AI Clipboard: the rollout plan PDF, previewed as text.', 3400], ['clipboard-quick', 'Off Grid AI Clipboard: quick open over any app, searching for Sam.', 3400]]} /> },
  { id: 'search', cmd: 'search everything for acme pilot', title: 'One search', line: 'Screens, meetings, chats and people in one search.', visual: () => <Seq shots={[['search', 'Off Grid AI Search: acme pilot across chats, meetings, screens and people.', 3400], ['ask-filter', 'Off Grid AI Search: results narrowed to meetings and mail, newest first.', 3400]]} /> },
];

// Real web-use task: it plans and works the page, hands you the sign-in, then finishes.
const WEB_SHOTS = [['web-tasks', 'Off Grid AI Task history with a finished Web use errand.', 3400], ['web-plan', 'Off Grid AI Web use: the plan on the Leafline pricing page, step by step.', 4000], ['web-step', 'Off Grid AI Web use reading the Team plan price, with live progress.', 4000], ['web-compare', 'Off Grid AI chat: Team pricing for 40 people in a table, with a recommendation.', 4200], ['web-takeover', 'Your turn: Off Grid AI pauses for you to sign in. It never reads your password.', 4200], ['web-done', 'The finished errand with its result and a step-by-step replay.', 4200]];
const web = () => <Seq shots={WEB_SHOTS} />;
function WebTour() {
  const { ctx: zoom, viewer } = useZoomOwner({ index: 0, count: 1, title: 'Computer Use and Web Use', line: 'Your web errands, handled step by step. You take over for passwords.', progress: null, goTo: () => {} });
  return <div className="pp-web-stage pp-web-tour"><CmdScope chapter="web" cmd="calculate Team pricing for 40 people">{(text, seq) => <>
    <CmdBar text={text} seq={seq} />
    <div className="pp-web-view"><ZoomCtx.Provider value={zoom}>{web(false)}</ZoomCtx.Provider></div>
  </>}</CmdScope>{viewer}</div>;
}

function ComputerUse() {
  return <section className="chapter pp pp-agent has-bg" aria-labelledby="computer-use"><SectionBg />
    <div className="section-shell">
      <div className="sec-head"><Kicker>PRO · LIVE NOW</Kicker><h2 id="computer-use" className="pp-h2"><span className="t-line">Computer Use and Web Use are live.</span></h2><Lede>It works in your browser. You approve, pause or take over.</Lede></div>
      {/* The same tour window as everywhere else: typed command per screen, camera roll, full-screen on click. */}
      <WebTour />
    </div>
  </section>;
}

function Api() {
  return <section id="one-local-endpoint-that-speaks-openai-sec" className="chapter pp pp-api" aria-labelledby="one-local-endpoint-that-speaks-openai">
    <div className="section-shell">
      <div className="sec-head"><Kicker>LOCAL API</Kicker>
        <h2 id="one-local-endpoint-that-speaks-openai" className="pp-h2"><span className="t-line">One local endpoint</span><span className="t-line t-dim">that speaks OpenAI.</span></h2>
        <Lede>{'Point any OpenAI client at http://127.0.0.1:7878/v1. No key.'}</Lede>
      </div>
      <div className="pp-api-grid">
      <Terminal className="pp-term" startOnView>
        <TermTyping>$ python hello.py</TermTyping>
        <AnimatedSpan className="t-dim">from openai import OpenAI</AnimatedSpan>
        <AnimatedSpan className="t-dim">{'client = OpenAI(base_url="http://127.0.0.1:7878/v1", api_key="not-needed")'}</AnimatedSpan>
        <AnimatedSpan className="t-dim">{'print(client.chat.completions.create('}</AnimatedSpan>
        <AnimatedSpan className="t-dim">{'    model="local",'}</AnimatedSpan>
        <AnimatedSpan className="t-dim">{'    messages=[{"role": "user", "content": "Hello"}]'}</AnimatedSpan>
        <AnimatedSpan className="t-dim">{').choices[0].message.content)'}</AnimatedSpan>
        <AnimatedSpan className="t-ok">✓ Answered by a model on this machine · no API key</AnimatedSpan>
        <TermTyping>Hello. How can I help?</TermTyping>
      </Terminal>
      <div className="pp-api-side">
        <p className="pp-lede-p">Run it headless with <code>--server-only</code>.</p>
      </div>
      </div>
    </div>
  </section>;
}

const FAQ = (p) => [
  ['Is it really free?', 'Yes. Chat, images, voice and documents are free. Pro adds memory and actions.'],
  ['Which Macs?', 'macOS on Apple Silicon, M1 and later. Signed and notarized.'],
  ['What about Windows and Linux?', <>Both have stable and beta builds. See <a href="/desktop/releases/">releases</a>.</>],
  ['Does it phone home?', 'No. No account, no API key, no cloud inference.'],
  ['What models can I run?', 'Qwen, Gemma, Llama, Mistral, and compatible GGUF models that fit your memory.'],
];

export default function DesktopPage({ data }) {
  useBetaLinks();
  const { pricing: p } = usePricing(data.pricing);
  return <PageShell>
    <Hero />

    <section className="chapter pp pp-free" aria-labelledby="what-you-get-free">
      <div className="section-shell">
        <div className="sec-head"><Kicker>FREE · ON YOUR COMPUTER</Kicker><h2 id="what-you-get-free" className="pp-h2"><span className="t-line">What you get, free.</span><span className="t-line t-dim">Write, research, and create with local models.</span></h2></div>
        <Explorer items={FREE} label="Free features" />
      </div>
    </section>

    <section className="chapter pp pp-trust" aria-labelledby="why-you-can-trust-it">
      <div className="section-shell">
        <div className="sec-head"><Kicker>WHY YOU CAN TRUST IT</Kicker><h2 id="why-you-can-trust-it" className="pp-h2"><span className="t-line">Why you can trust it.</span><span className="t-line t-dim">Read the code.</span></h2></div>
        <div className="pp-trust-body">
          <ul className="pp-checks">{['Local models process your prompts on your computer.', 'Your database is encrypted at rest.', 'Connected tools and remote models use the connections you choose.', 'The code is open source.'].map(x => <li key={x}><CheckCircle size={16} weight="fill" />{x}</li>)}</ul>
          <div className="pp-trust-side"><Dl {...GITHUB} className="dl-main" /></div>
        </div>
      </div>
    </section>

    <Api />
    <ComputerUse />

    <section className="chapter pp pp-pro" aria-labelledby="an-assistant-that-knows-your-working-day">
      <div className="section-shell">
        <div className="sec-head"><Kicker>OFF GRID AI PRO</Kicker><h2 id="an-assistant-that-knows-your-working-day" className="pp-h2"><span className="t-line">An assistant that knows</span><span className="t-line t-dim">your working day.</span></h2>
          <Lede>It remembers the work you choose to record.</Lede></div>
        <Explorer items={PRO} label="Pro features" />
        <p className="pp-fine pp-after">Features differ by platform. See <a href="/desktop/releases/">releases</a>.</p>
      </div>
    </section>

    <FreeVsPro pricing={p}
      free={['Chat with local text and vision models', 'Image generation on your GPU', 'Voice: Whisper and Kokoro', 'Projects with cited answers', 'Artifacts and MCP connectors', 'Offline, no account']}
      pro={['God, your chief of staff', 'Capture, Replay and searchable memory', 'Day, People and Reflect', 'Meetings, dictation and clipboard', 'Actions and Web Use, with your approval', `Vault, and Sync across up to ${p.devices} devices`]}
      freeCta={<FreeDownload />} />

    <Faq items={FAQ(p)} />

    <section id="download" className="pp pp-final has-bg" aria-labelledby="pp-final-h"><SectionBg />
      <div className="section-shell final-in">
        <Kicker>OFF GRID AI DESKTOP</Kicker>
        <h2 id="pp-final-h" className="final-h">Your computer. Your AI.</h2>
        <p className="final-lede">Free. macOS, Windows and Linux.</p>
        <div className="pp-dl-row pp-dl-final">{Object.values(DL).map(d => <Dl key={d.id} {...d} />)}<Dl {...GITHUB} /></div>
        <p className="pp-fine">Desktop stable: {V}. Windows and Linux packages are x64. <a href={`https://github.com/off-grid-ai/OGAD/releases/tag/v${V}`}>See the GitHub release</a>.</p>
        <p className="pp-fine">For new work as it lands, get the {BETA} <a href={`https://github.com/off-grid-ai/OGAD/releases/download/v${BETA}/OffGrid-${BETA}.dmg`} data-beta-download="dmg" aria-label="Download for macOS beta" title="Download for macOS beta" className="pp-ic-link"><PlatformIcon id="macos" size={13} /> macOS</a> or <a href={`https://github.com/off-grid-ai/OGAD/releases/download/v${BETA}/off-grid-ai-${BETA}-setup.exe`} data-beta-download="exe" aria-label="Download for Windows beta" title="Download for Windows beta" className="pp-ic-link"><PlatformIcon id="windows" size={13} /> Windows</a> build, or the <a href="/desktop/releases/">Linux beta AppImage and deb packages</a>. Beta builds can have rough edges.</p>
        <p className="fine"><a href="/desktop/releases/">Desktop releases</a> · <a href="/quick-start/">Quick start</a> · <a href="/guides/which-model/">Which model should I use?</a> · <a href="/mobile/">Off Grid AI on your phone</a></p>
      </div>
    </section>
  </PageShell>;
}
