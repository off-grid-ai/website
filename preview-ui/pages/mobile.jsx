import React, { useEffect, useState } from 'react';
import { usePricing } from '../pricing.js';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, CheckCircle, LockKey } from '@phosphor-icons/react';
import Button from '@smoothui/smooth-button';
import { PageShell, Kicker, Title, Lede, SceneCard, SectionBg, PlatformIcon, useNarrow, CmdBar, CmdScope } from '../shared.jsx';
import { Proof, Dl, Explorer, Seq, Loop, Wipe, AutoCtl, PhoneShots, FreeVsPro, Faq, Phone, Screen, OfflineScene } from './_product.jsx';

const UTM = 'utm_source=offgrid-docs&utm_medium=website&utm_campaign=mobile';
const IOS = { id: 'ios', href: `https://apps.apple.com/us/app/off-grid-local-ai/id6759299882?${UTM}`, aria: 'Download for iOS', small: 'Download on the', label: 'App Store', external: true };
const ANDROID = { id: 'android', href: `https://play.google.com/store/apps/details?id=ai.offgridmobile&${UTM}`, aria: 'Download for Android', small: 'Get it on', label: 'Google Play', external: true };
// Android visitors get Google Play; everyone else (and the server render) gets the App Store.
function FreeDownload() {
  const [d, setD] = useState(IOS);
  useEffect(() => { if (/Android/i.test(navigator.userAgent)) setD(ANDROID); }, []);
  return <a className="pp-btn" href={d.href} target="_blank" rel="noopener" aria-label={d.aria} title={d.aria}><PlatformIcon id={d.id} size={15} /> Download free</a>;
}
const GITHUB = { id: 'github', href: 'https://github.com/off-grid-ai/off-grid-ai-mobile', small: 'Open source', label: 'Star on GitHub', external: true };


const SCENES = {
  offline: () => <OfflineScene where="your phone" />,
};
// Real screens where the app has them; a composed scene stands in only for features without captures (offline).
// Each feature's real screens, start to result, in both themes (file names without the theme suffix).
const both = (list) => ({ light: list.map(([n, alt]) => [`${n}-light`, alt, 3000]), dark: list.map(([n, alt]) => [`${n}-dark`, alt, 3000]) });
const REAL = {
  chat: both([['chat-start-ios', 'Ask in the Acme Corp pilot project: draft a reply to Sam about the pilot date.'], ['seq-chat-2', 'The reply streams in, with the model working through the pilot notes.'], ['chat-ios-1', 'A reply to Sam Okafor at Acme Corp, drafted on the phone by a local model.']]),
  images: both([['seq-images-1', 'The prompt: a lighthouse at dusk, film photo.'], ['imagegen-ios-1', 'The finished lighthouse image and its enhanced prompt, made on the phone.']]),
  vision: both([['seq-vision-1', 'A receipt photo attached, with the question typed.'], ['seq-vision-2', 'The local vision model reading the receipt.'], ['vision-ios-2', 'The answer: the total, with the tax.']]),
  voice: both([['seq-voice-1', 'Recording: Whisper listens on the phone.'], ['seq-voice-2', 'The transcript, ready in the message box.'], ['seq-voice-3', 'Sent, with the reply about the Acme pilot.']]),
  projects: both([['seq-projects-1', 'The Acme Corp pilot project: its instructions.'], ['seq-projects-3', 'Its documents and chats.'], ['project-ios-3', 'The rollout PDF read on the phone.'], ['project-ios-2', 'What you promised Sam, answered from the project documents.']]),
  tools: both([['seq-tools-1', 'The question: how many seat-days is the pilot?'], ['seq-tools-2', 'The calculator tool working it out.'], ['tools-ios-1', 'The result: 1,200 seat-days.']]),
  larger: both([['remote-ios-2', "Remote Servers on iPhone: Alex's Mac, connected over Wi-Fi."], ['seq-larger-3', "The answer from the bigger model on Alex's Mac."], ['web-step-ios', 'The phone following a task that runs on the Mac.']]),
  voicemode: both([['voice-ios-2', 'You ask by voice and the replies come back as voice notes, each with a transcript.'], ['voice-pick-ios', 'Pick the voice that answers.'], ['voice-ios-1', 'A spoken brief on the Acme pilot, with its transcript.']]),
  approve: both([['seq-approve-1', 'A reply to Sam drafted on the phone, waiting for your yes before it is sent.']]),
  sync: both([['sync-ios-1', "Off Grid AI Sync on iPhone: Alex's Mac connected over Wi-Fi."], ['seq-sync-3', 'Sync activity: the rollout PDF arriving from the Mac.'], ['web-replay-ios', 'A finished task from the Mac, replayed on the phone.']]),
};
const composed = (id, compact) => compact ? <Screen><Loop>{SCENES[id]()}</Loop></Screen> : <div className="mp-stage-phone"><Phone><Loop>{SCENES[id]()}</Loop></Phone></div>;
const real = (shots, compact) => <div className={compact ? 'mp-card-phone' : 'mp-stage-phone'}><PhoneShots shots={shots} /></div>;
const inPhone = (id) => (compact) => {
  const r = REAL[id]; if (!r) return composed(id, compact);
  return <><div className="only-dark">{r.dark ? real(r.dark, compact) : composed(id, compact)}</div><div className="only-light">{r.light ? real(r.light, compact) : composed(id, compact)}</div></>;
};

// The command each feature's window types before (or without) a screen of its own.
const FEATURE_CMDS = { chat: 'draft a reply to Sam', images: 'make an image', vision: "what's the total on this receipt?", voice: 'dictate a note', projects: 'ask the Acme project', tools: 'how many seat-days is the pilot?', larger: 'use the bigger model on my Mac', offline: 'turn off Wi-Fi and ask', voicemode: 'talk to my AI', approve: 'draft a reply for my yes', sync: 'pair my phone and my Mac' };
const FREE = [
  ['chat', 'Chat', 'Qwen, Llama, Gemma and Phi, on your phone.'],
  ['images', 'Image generation', 'Stable Diffusion on your phone. Short prompts get enhanced.'],
  ['vision', 'Vision AI', 'Ask about a photo, a receipt or a page.'],
  ['voice', 'Voice input', 'Whisper turns speech into text, on the phone.'],
  ['projects', 'Projects', 'Answers from your documents, with sources.'],
  ['tools', 'Tools', 'It can use a calculator or search the web.'],
  ['larger', 'Larger models', 'Use bigger models on your computer, over your own Wi-Fi.'],
  ['offline', 'Offline by default', 'Download once. No internet needed.'],
].map(([id, title, line]) => ({ id, cmd: FEATURE_CMDS[id], title, line, visual: inPhone(id) }));
const PRO = [
  ['voicemode', 'Voice mode', 'Talk hands-free. Kokoro answers out loud.'],
  ['approve', 'Draft, then approve', 'It drafts. You approve before anything is sent.'],
  ['sync', 'Sync is live', 'Phone and computer, encrypted, over your own Wi-Fi.'],
].map(([id, title, line]) => ({ id, cmd: FEATURE_CMDS[id], title, line, visual: inPhone(id) }));
// The same Pro also runs on your computer: those features, shown on the Mac.
const PRO_DESKTOP = [
  ['god', 'God', 'brief me, Ares', 'A morning brief on your computer, with work lined up for your yes.', [['god', 'Off Grid AI God: the 8:50 AM briefing from Ares, with three approvals waiting.'], ['god-prep', 'Off Grid AI God: prep for the Northwind board meeting, with sources.'], ['god-waiting', 'Off Grid AI God: what is waiting for you, and what Priya and Tom owe you.']]],
  ['meetings', 'Meeting recorder', 'summarize the Acme pilot kickoff', 'Zoom, Meet and Teams, transcribed on your computer.', [['meetings', 'Off Grid AI Meetings: the Acme pilot kickoff summary, screens shared and decisions.'], ['meetings-transcript', 'Off Grid AI Meetings: the transcript, made on the computer.']]],
  ['memory', 'Memory and search', 'what did I promise Sam?', 'Find anything you saw, said or read, with sources.', [['replay', 'Off Grid AI Replay: the rollout plan you had open, with its summary.'], ['search', 'Off Grid AI Search: acme pilot across chats, meetings, screens and people.'], ['chat', 'Off Grid AI Chat: what Alex promised Sam, with sources.']]],
  ['day', 'Day and journal', 'write my journal', 'Your day, written for you.', [['day', "Off Grid AI Day: to-dos, today's meetings, the journal and time spent."], ['today-journal', 'Off Grid AI Day: the journal written from the day.']]],
  ['web', 'Tasks', 'calculate Team pricing for 40 people', 'Computer Use and Web Use, step by step. You take over for passwords.', [['web-plan', 'Off Grid AI Web Use: the plan on the pricing page, step by step.'], ['web-compare', 'Off Grid AI chat: Team pricing in a table, with a recommendation.'], ['web-done', 'Off Grid AI Web Use: the finished task with its result.']]],
  ['private', 'Clipboard and Vault', 'unlock my vault', 'Everything you copied, and your passwords, encrypted.', [['clipboard-all', 'Off Grid AI Clipboard: everything copied today.'], ['vault-open', 'Off Grid AI Vault: logins, an API key, a secure note and a signed PDF.']]],
].map(([id, title, cmd, line, shots]) => ({ id: `desk-${id}`, cmd, title, line, visual: () => <Seq shots={shots} /> }));

// Hero phone: the real app, screen after screen, in the page's theme.
// Screens the explorers below don't use, so the hero never repeats them.
const HERO_LIGHT = [
  ['models-ios-1-light', 'Models picked for your phone, with vision and tools marked.', 3800],
  ['models-ios-2-light', 'Kokoro, the voice model that speaks on your phone.', 3800],
];
const HERO_DARK = [
  ['models-ios-1-dark', 'Models picked for your phone, with vision and tools marked.', 3800],
  ['models-ios-2-dark', 'Kokoro, the voice model that speaks on your phone.', 3800],
];
function HeroPhone() {
  return <div className="mp-hero-phone">{[["only-dark", HERO_DARK], ["only-light", HERO_LIGHT]].map(([cls, list]) => <div key={cls} className={cls}><CmdScope chapter="mobile-hero" cmd="choose models for my phone">{(text, seq) => <><CmdBar text={text} seq={seq} className="tour-cmd-chip" /><PhoneShots shots={list} controls /></>}</CmdScope></div>)}</div>;
}

const FAQ = (p) => [
  ['Is it really free?', 'Yes. Chat, images, vision and documents are free. Pro adds memory, voice mode, approvals and Sync.'],
  ['Which phones?', 'iPhone 12 or newer on iOS 17+, and Android 10+ with 4GB of RAM or more.'],
  ['Does it phone home?', 'No. Local models run on your phone. Pro activates with a key.'],
  ['What models can I run?', 'Qwen, Gemma, Llama, Phi and other GGUF models that fit your memory.'],
];

export default function MobilePage({ data }) {
  const { pricing: p } = usePricing(data.pricing);
  return <PageShell>
    <section className="pp pp-hero mp-hero has-bg" aria-labelledby="pp-h1"><SectionBg />
      <div className="section-shell pp-hero-grid mp-hero-grid">
        <div className="pp-hero-copy">
          <span className="pp-plat"><Kicker>OFF GRID AI MOBILE</Kicker><span className="pp-plat-ic" role="img" aria-label="Android, iOS"><PlatformIcon id="android" size={15} /><PlatformIcon id="ios" size={15} /></span></span>
          <Title as="h1" id="pp-h1" className="pp-h1" lead="Your personal AI." dim="On your phone." />
          <Lede className="pp-lede">Free on the phone you own. Pro adds memory, voice and actions you approve.</Lede>
          <div className="pp-dl-row mp-stores"><Dl {...IOS} className="dl-main" /><Dl {...ANDROID} /></div>
          <div className="pp-alts"><a className="pp-alt" href={GITHUB.href} target="_blank" rel="noopener">Star on GitHub <ArrowUpRight size={13} /></a></div>
          <p className="pp-fine">GitHub: 0.0.111 · Preview: 0.0.112-beta.1. Store versions can differ: <a href="/mobile/releases/">see what shipped</a>.<br />iOS 17+ · iPhone 12+ · Android 10+ · 4GB RAM</p>
          <p className="pp-offline-note"><LockKey size={13} /> Download a model once. Your prompts stay on your phone.</p>
          <Proof />
        </div>
        <HeroPhone />
      </div>
    </section>

    <section className="chapter pp pp-free" aria-labelledby="what-you-get-for-free">
      <div className="section-shell">
        <div className="sec-head"><Kicker>FREE · ON YOUR PHONE</Kicker><h2 id="what-you-get-for-free" className="pp-h2"><span className="t-line">What you get for free.</span><span className="t-line t-dim">Your phone runs the AI.</span></h2></div>
        <Explorer items={FREE} label="Free features" className="mp-explorer" />
      </div>
    </section>

    <section className="chapter pp pp-pro" aria-labelledby="keep-your-assistant-close">
      <div className="section-shell">
        <div className="sec-head"><Kicker>OFF GRID AI PRO</Kicker><h2 id="keep-your-assistant-close" className="pp-h2"><span className="t-line">Everything in Pro.</span><span className="t-line t-dim">Phone and computer, one license.</span></h2></div>
        <p className="mp-pro-label">One Pro covers up to {p.devices} devices. On your phone:</p>
        <Explorer items={PRO} label="Pro on your phone" className="mp-explorer mp-explorer-pro" />
        <p className="mp-pro-label mp-pro-desk">And on your <a href="/desktop/">computer</a>:</p>
        <Explorer items={PRO_DESKTOP} label="Pro on your computer" />
      </div>
    </section>

    <section className="chapter pp pp-trust" aria-labelledby="why-you-can-trust-it">
      <div className="section-shell">
        <div className="sec-head"><Kicker>WHY YOU CAN TRUST IT</Kicker><h2 id="why-you-can-trust-it" className="pp-h2"><span className="t-line">Why you can trust it.</span><span className="t-line t-dim">Read the code.</span></h2></div>
        <div className="pp-trust-body">
          <ul className="pp-checks">{['Local models process your prompts on your phone.', 'Connected tools, remote models, and Sync use the connections you choose.', 'The code is open source.'].map(x => <li key={x}><CheckCircle size={16} weight="fill" />{x}</li>)}</ul>
          <div className="pp-trust-side"><Dl {...GITHUB} className="dl-main" /></div>
        </div>
      </div>
    </section>

    <FreeVsPro pricing={p}
      free={['Chat with Qwen, Llama, Gemma and Phi', 'Image generation, with enhanced prompts', 'Vision and voice input', 'Projects with cited answers', 'Tools and larger models on your network', 'Offline, prompts stay on your phone']}
      pro={['Voice mode with Kokoro', 'Drafts you approve', 'Sync across your devices', 'God, meetings and memory on your computer', 'Tasks, Clipboard and Vault on your computer', `Up to ${p.devices} devices`]}
      freeCta={<FreeDownload />} />

    <Faq items={FAQ(p)} />

    <section id="download" className="pp pp-final has-bg" aria-labelledby="pp-final-h"><SectionBg />
      <div className="section-shell final-in">
        <Kicker>OFF GRID AI MOBILE</Kicker>
        <h2 id="pp-final-h" className="final-h">Your phone. Your AI.</h2>
        <p className="final-lede">Free. iPhone and Android.</p>
        <div className="pp-dl-row pp-dl-final"><Dl {...IOS} /><Dl {...ANDROID} /><Dl {...GITHUB} /></div>
        <p className="fine"><a href="/mobile/releases/">Mobile releases</a> · <a href="/quick-start/">Quick start</a> · <a href="/guides/which-model/">Which model should I use?</a> · <a href="/desktop/">Off Grid AI on your computer</a></p>
      </div>
    </section>
  </PageShell>;
}
