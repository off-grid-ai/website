import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Badge } from '@radix-ui/themes';
import { ArrowUpRight, LockKey, Check, CheckCircle, MagnifyingGlass, VideoCamera, ClipboardText, Monitor, NotePencil } from '@phosphor-icons/react';
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
  { id: 'god', label: 'God', cmd: 'brief me, Ares', shots: [['god', 'Off Grid AI God: Ares briefing you, with approvals waiting.', 3800]] },
  { id: 'models', label: 'Models', cmd: 'download models for this computer', shots: [['models-text', 'Off Grid AI Models: text models.', 1700], ['models-vision', 'Off Grid AI Models: vision models.', 1700], ['models-image', 'Off Grid AI Models: image models.', 1700], ['models-voice', 'Off Grid AI Models: text to speech models.', 1700], ['models-transcription', 'Off Grid AI Models: speech to text models.', 1700], ['models-computer-use', 'Off Grid AI Models: computer use models.', 2200]] },
  { id: 'day', label: 'Day', cmd: 'open today', shots: [['day', 'Off Grid AI Day: to-dos, journal, meetings and time spent.', 3400]] },
  { id: 'people', label: 'People', cmd: 'who is Sam Okafor?', shots: [['entities', 'Off Grid AI People: Sam Okafor at Acme Corp, with his timeline.', 3400]] },
  { id: 'reflect', label: 'Reflect', cmd: 'where did my week go?', shots: [['reflect', 'Off Grid AI Reflect: time by app, people and focus.', 3400]] },
  { id: 'vault', label: 'Vault', cmd: 'unlock my vault', shots: [['vault-locked', 'Off Grid AI Vault, locked.', 1600], ['vault-typing', 'Entering the master password.', 1400], ['vault-open', 'Off Grid AI Vault unlocked: logins, keys and notes.', 3400]] },
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

function Hero() {
  const [os, setOs] = useState('macos');
  useEffect(() => { const ua = navigator.userAgent; if (/Windows/i.test(ua)) setOs('windows'); else if (/Linux/i.test(ua) && !/Android/i.test(ua)) setOs('linux'); }, []);
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
  { id: 'chat', title: 'Chat', line: 'Write, ask, and reason with local text and vision models.', visual: () => <Framed><Shot lazy={false} name="chat" alt="Off Grid AI Chat: a sourced answer about the Acme Corp pilot, citing a meeting and a document." /></Framed> },
  { id: 'images', title: 'Image generation', line: 'Create or edit images on your GPU with Z-Image-Turbo and SDXL-Lightning.', visual: () => <Framed><Shot lazy={false} name="imagegen-chat" alt="Off Grid AI Chat: the alpine lake prompt and its generated image." /></Framed> },
  { id: 'voice', title: 'Voice', line: 'Dictate with Whisper. Hear replies with Kokoro. Both run locally.', visual: () => <Framed><Shot lazy={false} name="voice" alt="Off Grid AI Voice: dictation and transcripts, on this device." /></Framed> },
  { id: 'projects', title: 'Projects', line: 'Ask about your documents and notes. Answers cite their sources.', visual: () => <Framed><Shot lazy={false} name="projects" alt="Off Grid AI Projects: an answer about the Acme pilot with document citations." /></Framed> },
  { id: 'artifacts', title: 'Artifacts', line: 'View generated HTML, React, SVG, and Mermaid beside your chat.', visual: () => <Framed><Shot lazy={false} name="artifacts" alt="Off Grid AI Projects: the generated Acme pilot pricing table open as an HTML artifact." /></Framed> },
  { id: 'connectors', title: 'Connectors', line: 'Use connected MCP tools inside your chat.', visual: card(<ConnectorsScene />) },
  { id: 'models', title: 'Any model', line: 'Choose from the catalog or find compatible GGUF models on Hugging Face.', note: 'Run any model: a curated catalog plus direct Hugging Face search, all local.', visual: () => <Seq shots={[['models-text', 'Off Grid AI model library: text models.', 1800], ['models-vision', 'Vision models.', 1800], ['models-image', 'Image models.', 1800], ['models-transcription', 'Speech to text models.', 1800]]} /> },
  { id: 'offline', title: 'Offline by default', line: 'Download a model once. Use it without an account or internet.', visual: card(<OfflineScene where="your computer" />) },
];

/* ── Pro capabilities ── */
const SEARCH_HITS = [[Monitor, 'Screen · 10:42', 'Acme_rollout_v3.pdf, page 4'], [VideoCamera, 'Meeting · 15:00', 'Acme Corp sync: pilot moves to 14 Nov'], [ClipboardText, 'Clipboard · 16:05', 'https://acme.example/pilot/rollout-plan'], [NotePencil, 'Memory', 'Sam Okafor owns the pilot at Acme Corp']];
const PRO = [
  { id: 'sees', title: 'It sees', line: 'Turn the screen activity you choose to record into searchable memory.', visual: () => <Framed><Shot lazy={false} name="replay" alt="Off Grid AI Replay: a recorded browser screen and its capture timeline." /></Framed> },
  { id: 'remembers', title: 'It remembers', line: 'Review your day in a journal or replay recorded screens.', note: 'Your Day: the brief a chief of staff would hand you each morning.', visual: () => <Framed><Shot lazy={false} name="day" alt="Off Grid AI Pro showing Your Day: a journal, to-do list, and timeline of the day." /></Framed> },
  { id: 'maps', title: 'It maps your world', line: 'Keep summaries of people, projects, and open work from captured activity.', note: 'Entities: the people, projects, and companies you touch, kept current for you.', visual: () => <Framed><Shot lazy={false} name="entities" alt="Off Grid AI Pro Entities view: the people, projects, and companies you touch, each with a running summary." /></Framed> },
  { id: 'reflects', title: 'It reflects', line: 'See time spent by app and how often you switch tasks.', note: 'Reflect: where your attention actually went, by hour and by app.', visual: () => <Framed><Shot lazy={false} name="reflect" alt="Off Grid AI Pro Reflect view: mind-share, time by app, and focus versus context-switching." /></Framed> },
  { id: 'meetings', title: 'Meetings', line: 'Record and transcribe Google Meet and Zoom locally. Find summaries in your timeline.', visual: () => <Framed><Shot lazy={false} name="meetings" alt="Off Grid AI Meetings: a recorded meeting with summary, decisions and transcript." /></Framed> },
  { id: 'dictation', title: 'Dictation', line: 'Hold the dictation key. Speak. Insert transcribed text at your cursor.', visual: () => <Framed><Shot lazy={false} name="voice" alt="Off Grid AI Voice: hold the dictation key and speak." /></Framed> },
  { id: 'clipboard', title: 'Clipboard', line: 'Search copied text, images, and files stored on your disk.', visual: () => <Framed><Shot lazy={false} name="clipboard" alt="Off Grid AI Clipboard history with search." /></Framed> },
  { id: 'search', title: 'One search', line: 'Find context across recorded screens, meetings, clipboard, and memory.', visual: () => <Framed><Shot lazy={false} name="search" alt="Off Grid AI Search: one query across screens, meetings, chats, people and documents." /></Framed> },
  { id: 'use', title: 'Computer Use and Web Use', line: 'Approve a task in your apps or browser. Pause, stop, or take over at any time.', visual: (c) => web(c) },
];

// Web use: Off Grid works through a real task in the browser, step by step, and hands you the sign-in.
// Composed (no captured test pages): same approach as the home page's Web chapter.
const WEB_STEPS = ['Search for local-first note apps', 'Read three product pages', 'Compare price, sync and offline', 'Your turn: sign in to save the doc', 'Saved to your docs'];
const WEB_ROWS = [['Notesmith', '$0', 'Device to device', 'Yes'], ['Leafline', '$8/mo', 'Their cloud', 'Partial'], ['Inkwell', '$4/mo', 'Their cloud', 'No']];
const POINTER = [[12, 14], [38, 48], [62, 62], [78, 30], [50, 82]];
// Real web-use task: it plans and works the page, hands you the sign-in, then finishes.
const WEB_SHOTS = [['web-plan', 'Off Grid AI working a web task step by step on a comparison site.', 4200], ['web-takeover', 'Your turn: Off Grid AI pauses for you to sign in. It never reads your password.', 4200], ['web-done', 'The web task finished, with the result.', 4200]];
const web = () => <Seq shots={WEB_SHOTS} />;

function ComputerUse() {
  return <section className="chapter pp pp-agent has-bg" aria-labelledby="computer-use"><SectionBg />
    <div className="section-shell">
      <div className="sec-head"><Kicker>PRO · LIVE NOW</Kicker><h2 id="computer-use" className="pp-h2"><span className="t-line">Computer Use and Web Use are live.</span></h2><Lede>Ask your assistant to work in your apps or browser. You approve the task and can pause, stop, or take over.</Lede></div>
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
      pro={['Capture and searchable memory', 'Day, Replay and Reflect', 'People and projects, kept current', 'Meetings, dictation and clipboard', 'Computer Use and Web Use, with your approval', `Up to ${p.devices} devices`]}
      freeCta={<a className="pp-btn" href={DL.macos.href} aria-label="Download for macOS stable" title="Download for macOS stable"><PlatformIcon id="macos" size={15} /> Download free</a>} />

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
