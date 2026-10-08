import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Badge } from '@radix-ui/themes';
import { ArrowUpRight, LockKey, Check, CheckCircle } from '@phosphor-icons/react';
import { Terminal, AnimatedSpan, TypingAnimation as TermTyping } from '@magicui/terminal';
import Button from '@smoothui/smooth-button';
import { Safari } from '@magicui/safari';
import { PageShell, Kicker, Title, Lede, SceneCard, SectionBg, Shot, PlatformIcon, useSteps } from '../shared.jsx';
import { useBetaLinks, Proof, Dl, AppWindow, Explorer, Framed, Seq, Fit, Loop, Wipe, AutoCtl, FreeVsPro, Faq, SceneHead, OfflineScene, useStream } from './_product.jsx';
import AIMessage from '@smoothui/ai-message';
import AIResponse from '@smoothui/ai-response';
import AIReasoning from '@smoothui/ai-reasoning';

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
  { id: 'god', label: 'God', cmd: 'brief me, Ares', shots: [['god', 'Off Grid AI God: the 8:50 AM briefing from Ares, with three approvals waiting.', 3800], ['god-prep', 'Off Grid AI God: prep for the Northwind board meeting, with last-time notes and cited sources.', 3800], ['god-waiting', 'Off Grid AI God: what is waiting for you, the approvals and what Priya and Tom owe you.', 3600], ['god-voice', 'Off Grid AI God in voice mode: the morning briefing as voice notes.', 3200], ['god-routines', 'Off Grid AI God settings: scheduled tasks such as the weekday morning briefing, meeting prep and an approvals digest.', 3400], ['god-choose', 'Off Grid AI God settings: Ares is your god; Athena is a download away.', 3000]] },
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
        <Lede className="pp-lede">Built for the computer you already own. Start free. Add Pro for work memory and actions you approve on supported platforms.</Lede>
        <OsPick os={os} />
        <Proof />
      </div>
      <AppWindow chapters={CHAPTERS} label="Desktop app views" />
    </div>
  </section>;
}

/* ── Free capabilities ── */
function ConnectorsScene() {
  const [done, setDone] = useState(false);
  useEffect(() => { const t = setTimeout(() => setDone(true), 1800); return () => clearTimeout(t); }, []);
  const [text, streaming] = useStream('Done. The issue "Acme Corp pilot review, 14 Nov" is in Linear, assigned to you and linked to the rollout plan.', { start: 2000 });
  return <div className="ms">
    <SceneHead title="Chat" badge="MCP tools" />
    <div className="ms-tools">{['Linear', 'Notion', 'Obsidian'].map(t => <span key={t} className="chip"><Check size={10} weight="bold" /> {t}</span>)}</div>
    <AIMessage from="user">Create a Linear issue for the pilot review.</AIMessage>
    <AIReasoning isStreaming={!done} duration={1} defaultOpen={false}>Used Linear: create issue. Read the rollout plan from Notion.</AIReasoning>
    <AIResponse isStreaming={streaming} text={text} />
  </div>;
}
const card = (node) => (compact) => compact ? <div className="pp-card-scene"><Loop>{node}</Loop></div> : <Fit><SceneCard className="pp-scene-card"><Loop>{node}</Loop></SceneCard></Fit>;
const FREE = [
  { id: 'chat', cmd: 'what did I promise Sam?', title: 'Chat', line: 'Write, ask, and reason with local text and vision models.', visual: () => <Seq shots={[['chat', 'Off Grid AI Chat: a sourced answer about the Acme Corp pilot, citing a meeting and a document.', 3800], ['chat-translate', 'Off Grid AI Chat: the reply to Sam translated into Spanish, names and dates kept.', 3800], ['vision-chat', 'Off Grid AI Chat reading an attached chart with a local vision model.', 3800]]} /> },
  { id: 'images', cmd: 'make an image', title: 'Image generation', line: 'Create images on your GPU with Z-Image-Turbo and SDXL-Lightning.', visual: () => <Seq shots={[['models-image', 'Off Grid AI Models: Z-Image Turbo and SDXL Lightning on this computer.', 3200], ['imagegen-chat', 'Off Grid AI Chat: the alpine lake prompt and its generated image.', 3800]]} /> },
  { id: 'voice', cmd: 'ask about the pilot out loud', title: 'Voice', line: 'Dictate with Whisper. Hear replies with Kokoro. Both run locally.', visual: () => <Framed><Shot lazy={false} name="voice-reply" alt="Off Grid AI chat in voice mode: a spoken question about the Acme pilot and a spoken answer, both with transcripts." /></Framed> },
  { id: 'projects', cmd: 'ask the Acme project', title: 'Projects', line: 'Ask about your documents and notes. Answers cite their sources.', visual: () => <Seq shots={[['projects', 'Off Grid AI Projects: an answer about the Acme pilot with document citations.', 3800], ['project-compare', 'Off Grid AI Projects: what changed from v2 to v3 of the rollout plan, citing both PDFs.', 3800], ['project-checklist', 'Off Grid AI Projects: a launch checklist for 14 Nov, built from three project documents.', 3800]]} /> },
  { id: 'artifacts', cmd: 'draw the rollout as a flowchart', title: 'Artifacts', line: 'See a flowchart, page or chart render beside your chat: Mermaid, HTML, React or SVG.', visual: () => <Framed><Shot lazy={false} name="artifacts" alt="Off Grid AI chat with the canvas beside it: a Mermaid flowchart of the Acme rollout." /></Framed> },
  { id: 'connectors', cmd: 'connect my tools', title: 'Connectors', line: 'Use connected MCP tools inside your chat.', visual: card(<ConnectorsScene />) },
  { id: 'models', cmd: 'show text models', title: 'Any model', line: 'Choose from the catalog or find compatible GGUF models on Hugging Face.', note: 'Run any model: a curated catalog plus direct Hugging Face search, all local.', visual: () => <Seq shots={[['models-text', 'Off Grid AI model library: text models.', 1800], ['models-vision', 'Vision models.', 1800], ['models-transcription', 'Speech to text models.', 1800], ['models-computer-use', 'Computer use models.', 1800], ['models-voice', 'Text to speech models.', 1800]]} /> },
  { id: 'offline', cmd: 'turn off Wi-Fi and ask', title: 'Offline by default', line: 'Download a model once. Use it without an account or internet.', visual: card(<OfflineScene where="your computer" />) },
];

/* ── Pro capabilities ── */
const PRO = [
  { id: 'sees', cmd: 'replay what I worked on', title: 'It sees', line: 'Turn the screen activity you choose to record into searchable memory.', visual: () => <Framed><Shot lazy={false} name="replay" alt="Off Grid AI Replay: the Acme rollout plan you had open, captured with a summary and a work-thread timeline." /></Framed> },
  { id: 'remembers', cmd: 'open today', title: 'It remembers', line: 'Review your day: meetings, to-dos, a journal and a timeline.', note: 'Your Day: the brief a chief of staff would hand you each morning.', visual: () => <Framed><Shot lazy={false} name="day" alt="Off Grid AI Day: to-dos, a journal, meetings, time spent and a timeline of the day." /></Framed> },
  { id: 'maps', cmd: 'who is Sam Okafor?', title: 'It maps your world', line: 'Keep summaries of people, projects, and open work from captured activity.', note: 'Entities: the people, projects, and companies you touch, kept current for you.', visual: () => <Framed><Shot lazy={false} name="entities" alt="Off Grid AI People: Sam Okafor's dossier, with his story, open to-dos and a timeline from mail and screens." /></Framed> },
  { id: 'reflects', cmd: 'where did my time go?', title: 'It reflects', line: 'See time spent by app and how often you switch tasks.', note: 'Reflect: where your attention went, by project, person and app.', visual: () => <Framed><Shot lazy={false} name="reflect" alt="Off Grid AI Pro Reflect view: mind-share, time by app, and focus versus context-switching." /></Framed> },
  { id: 'meetings', cmd: 'summarize the Acme pilot kickoff', title: 'Meetings', line: 'Record and transcribe Zoom, Meet and Teams on this computer. See the summary, the screens shared and your focus.', visual: () => <Framed><Shot lazy={false} name="meetings" alt="Off Grid AI Meetings: the Acme Corp pilot kickoff, with its summary, the screens shared during the call and a Locked in focus verdict." /></Framed> },
  { id: 'dictation', cmd: 'dictate a note', title: 'Dictation', line: 'Hold the dictation key. Speak. Insert transcribed text at your cursor.', visual: () => <Framed><Shot lazy={false} name="voice" alt="Off Grid AI Voice: transcribed takes pasted where you were typing, with to-dos pulled out." /></Framed> },
  { id: 'clipboard', cmd: 'search what I copied for acme', title: 'Clipboard', line: 'Search copied text, images, and files stored on your disk.', visual: () => <Framed><Shot lazy={false} name="clipboard" alt="Off Grid AI Clipboard: a search for acme finds an image, a PDF, a link and text." /></Framed> },
  { id: 'search', cmd: 'search everything for acme pilot', title: 'One search', line: 'Find context across recorded screens, meetings, chats and people.', visual: () => <Framed><Shot lazy={false} name="search" alt="Off Grid AI Search: one query across chats, screens, a meeting and people." /></Framed> },
];

// Real web-use task: it plans and works the page, hands you the sign-in, then finishes.
const WEB_SHOTS = [['web-tasks', 'Off Grid AI Task history with a finished Web use errand.', 3400], ['web-plan', 'Off Grid AI Web use: the plan on the Leafline pricing page, step by step.', 4000], ['web-step', 'Off Grid AI Web use reading the Team plan price, with live progress.', 4000], ['web-compare', 'Off Grid AI chat: Team pricing for 40 people in a table, with a recommendation.', 4200], ['web-takeover', 'Your turn: Off Grid AI pauses for you to sign in. It never reads your password.', 4200], ['web-done', 'The finished errand with its result and a step-by-step replay.', 4200]];
const web = () => <Seq shots={WEB_SHOTS} />;

function ComputerUse() {
  return <section className="chapter pp pp-agent has-bg" aria-labelledby="computer-use"><SectionBg />
    <div className="section-shell">
      <div className="sec-head"><Kicker>PRO · LIVE NOW</Kicker><h2 id="computer-use" className="pp-h2"><span className="t-line">Computer Use and Web Use are live.</span></h2><Lede>Ask your assistant to work in your browser. You approve the task and can pause, stop, or take over.</Lede></div>
      <div className="pp-web-stage">{web(false)}</div>
    </div>
  </section>;
}

function Api() {
  return <section id="one-local-endpoint-that-speaks-openai-sec" className="chapter pp pp-api" aria-labelledby="one-local-endpoint-that-speaks-openai">
    <div className="section-shell">
      <div className="sec-head"><Kicker>LOCAL API</Kicker>
        <h2 id="one-local-endpoint-that-speaks-openai" className="pp-h2"><span className="t-line">One local endpoint</span><span className="t-line t-dim">that speaks OpenAI.</span></h2>
        <Lede>{'Point any OpenAI client at http://127.0.0.1:7878/v1 and it works. No key. Chat, vision, image, audio, and embeddings, all on one local server.'}</Lede>
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
        <p className="pp-lede-p">Run it headless with <code>--server-only</code> for a homelab box, a server, or wiring local models into your own apps.</p>
      </div>
      </div>
    </div>
  </section>;
}

const FAQ = (p) => [
  ['Is it really free?', 'Local chat, images, voice, and document tools are free. Pro adds work memory and approved actions.'],
  ['Does it work offline?', 'Yes, with downloaded local models. Connected services need a connection.'],
  ['Which Macs?', 'macOS on Apple Silicon, M1 and later. Signed and notarized.'],
  ['What about Windows and Linux?', <>Both have stable and beta builds. Linux offers AppImage and deb packages. See <a href="/desktop/releases/">releases</a>.</>],
  ['Does it phone home?', 'No cloud inference, no account, no API key. Capture is opt-in, with a visible indicator.'],
  ['What models can I run?', 'Qwen, Gemma, Llama, Mistral, and compatible GGUF models that fit your memory.'],
  ['What does Pro cost?', `$${p.lifetime} for lifetime access or $${p.monthly}/month. Up to ${p.devices} devices. The lifetime price rises as we grow.`],
];

export default function DesktopPage({ data }) {
  useBetaLinks();
  const p = data.pricing;
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
          <Lede>Your digital twin remembers the work you choose to record. Find a decision, revisit a screen, or continue an open task.</Lede></div>
        <Explorer items={PRO} label="Pro features" />
        <p className="pp-fine pp-after">Desktop preview adds Linux Pro capture, Replay, Clipboard, and Vault; Windows Day, Notifications, and Reflect. Features differ by platform.</p>
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
