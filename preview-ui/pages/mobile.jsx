import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, CheckCircle, LockKey, Sparkle } from '@phosphor-icons/react';
import Button from '@smoothui/smooth-button';
import { PageShell, Kicker, Title, Lede, SceneCard, SectionBg, PlatformIcon, useNarrow, CmdBar, CmdScope } from '../shared.jsx';
import { Proof, Dl, Explorer, Loop, Wipe, AutoCtl, PhoneShots, FreeVsPro, Faq, Phone, Screen, SceneHead, ChatScene, VoiceScene, OfflineScene, ApprovalScene } from './_product.jsx';

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

function PersonaScene() {
  return <div className="ms">
    <SceneHead title="Persona" badge="Pro" />
    <div className="ms-persona"><span className="ms-avatar"><Sparkle size={16} /></span><span><b>Research partner</b><small>Your assistant, your rules</small></span></div>
    {[['Instructions', 'Short answers. Cite the source. Ask before guessing.'], ['Voice', 'Kokoro · calm, clear'], ['Memory', 'Works with Acme Corp on the pilot · prefers metric units · pilot starts 14 Nov']].map(([k, v], i) =>
      <motion.div key={k} className="ms-field" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .3 + i * .35 }}><small>{k}</small><span>{v}</span></motion.div>)}
  </div>;
}

const SCENES = {
  voice: () => <VoiceScene />,
  larger: () => <ChatScene model="Qwen 3.5 9B · on your Mac" q="Summarize the Acme rollout plan in three bullets." a="Pilot kicks off 14 November with 40 seats. Priya Nair owns the plan. Tom Reyes signs off the gateway policy first." />,
  offline: () => <OfflineScene where="your phone" />,
  personas: () => <PersonaScene />,
  approve: () => <ApprovalScene to="Sam Okafor" question="Send this reply to Sam?" draft="Hi Sam, confirming the pilot moves to 14 November. The revised rollout plan reaches you by Friday." />,
};
// Real screens where the app has them, only in their own theme; a composed scene stands in for the other theme.
// Every REAL entry below has both themes except `larger`, so only `larger` (dark) falls back to SCENES.
const REAL = {
  chat: { light: [["chat-ios-1-light", "A reply to Sam Okafor at Acme Corp, drafted on the phone by a local model.", 3800]], dark: [["chat-ios-1-dark", "A reply to Sam Okafor at Acme Corp, drafted on the phone by a local model.", 3800]] },
  projects: { light: [["project-ios-1-light", "The Acme Corp pilot project and its rollout notes on iPhone.", 3800], ["project-ios-2-light", "Who owns the rollout and when it starts, answered from the project notes with a citation.", 3800]], dark: [["project-ios-1-dark", "The Acme Corp pilot project and its rollout notes on iPhone.", 3800], ["project-ios-2-dark", "Who owns the rollout and when it starts, answered from the project notes with a citation.", 3800]] },
  images: { light: [['imagegen-ios-1-light', 'Off Grid AI on iPhone: "A lighthouse at dusk, film photo" turned into an enhanced prompt and a finished image.', 4600]], dark: [['imagegen-ios-1-dark', 'Off Grid AI on iPhone: "A lighthouse at dusk, film photo" turned into an enhanced prompt and a finished image.', 4600]] },
  voicemode: { light: [['voice-ios-2-light', 'Off Grid AI on iPhone: you ask by voice and the replies come back as voice notes, each with a transcript.', 4600]], dark: [['voice-ios-2-dark', 'Off Grid AI on iPhone: you ask by voice and the replies come back as voice notes, each with a transcript.', 4600]] },
  vision: { light: [['vision-ios-2-light', 'Off Grid AI on iPhone: a photo of a receipt, answered with the total.', 4200]], dark: [['vision-ios-2-dark', 'Off Grid AI on iPhone: a photo of a receipt, answered with the total.', 4200]] },
  tools: { light: [['tools-ios-1-light', 'A calculator tool call in chat: 40 seats for 6 weeks of 5 days is 1,200 seat-days.', 4200]], dark: [['tools-ios-1-dark', 'A calculator tool call in chat: 40 seats for 6 weeks of 5 days is 1,200 seat-days.', 4200]] },
  sync: { light: [['sync-ios-1-light', 'Off Grid AI Sync on iPhone: your Mac connected over Wi-Fi.', 4200]], dark: [['sync-ios-1-dark', 'Off Grid AI Sync on iPhone: your Mac connected over Wi-Fi.', 4200]] },
  larger: { light: [['remote-ios-2-light', "Remote Servers on iPhone: your Mac's Off Grid AI gateway, connected over your own Wi-Fi.", 4200]] },
};
const composed = (id, compact) => compact ? <Screen><Loop>{SCENES[id]()}</Loop></Screen> : <div className="mp-stage-phone"><Phone><Loop>{SCENES[id]()}</Loop></Phone></div>;
const real = (shots, compact) => <div className={compact ? 'mp-card-phone' : 'mp-stage-phone'}><PhoneShots shots={shots} /></div>;
const inPhone = (id) => (compact) => {
  const r = REAL[id]; if (!r) return composed(id, compact);
  return <><div className="only-dark">{r.dark ? real(r.dark, compact) : composed(id, compact)}</div><div className="only-light">{r.light ? real(r.light, compact) : composed(id, compact)}</div></>;
};

// The command each feature's window types before (or without) a screen of its own.
const FEATURE_CMDS = { chat: 'draft a reply to Sam', images: 'make an image', vision: "what's the total on this receipt?", voice: 'dictate a note', projects: 'ask the Acme project', tools: 'how many seat-days is the pilot?', larger: 'use the bigger model on my Mac', offline: 'turn off Wi-Fi and ask', voicemode: 'talk to my AI', personas: "set my assistant's voice", approve: 'draft a reply for my yes', sync: 'pair my phone and my Mac' };
const FREE = [
  ['chat', 'Chat', 'Write, ask, and reason with local models such as Qwen, Llama, Gemma, and Phi.'],
  ['images', 'Image generation', 'Create images on your phone with Stable Diffusion. Short prompts are enhanced first.'],
  ['vision', 'Vision AI', 'Ask about a photo, read a receipt, or extract text. On the phone, or with your computer’s vision models.'],
  ['voice', 'Voice input', 'Turn speech into text on your phone with Whisper.'],
  ['projects', 'Projects', 'Ask about your documents and notes. Answers cite their sources.'],
  ['tools', 'Tools', 'Let compatible models use a calculator, web search and document lookup. Here, the calculator works out seat-days.'],
  ['larger', 'Larger models', 'Use Off Grid AI Desktop, Ollama, or LM Studio over your local network.'],
  ['offline', 'Offline by default', 'Download a model once. Use it without internet.'],
].map(([id, title, line]) => ({ id, cmd: FEATURE_CMDS[id], title, line, visual: inPhone(id) }));
const PRO = [
  ['voicemode', 'Voice mode', 'Talk hands-free. Kokoro generates spoken replies on your phone.'],
  ['personas', 'Custom personas', "Set your assistant's instructions, voice, and persistent memory."],
  ['approve', 'Draft, then approve', 'Draft replies and tasks through connected tools. You approve before sending.'],
  ['sync', 'Sync is live', 'Pair your phone and computer over your own Wi-Fi. Transfers are encrypted, without an Off Grid AI storage server.'],
].map(([id, title, line]) => ({ id, cmd: FEATURE_CMDS[id], title, line, visual: inPhone(id) }));

// Hero phone: the real app, screen after screen, in the page's theme.
// Screens the explorers below don't use, so the hero never repeats them.
const HERO_LIGHT = [
  ['models-ios-1-light', 'Models picked for your phone, with vision and tools marked.', 3800],
  ['voice-ios-1-light', 'A spoken brief on the Acme pilot, with its transcript.', 3800],
  ['models-ios-2-light', 'Kokoro, the voice model that speaks on your phone.', 3800],
];
const HERO_DARK = [
  ['models-ios-1-dark', 'Models picked for your phone, with vision and tools marked.', 3800],
  ['voice-ios-1-dark', 'A spoken brief on the Acme pilot, with its transcript.', 3800],
  ['models-ios-2-dark', 'Kokoro, the voice model that speaks on your phone.', 3800],
];
function HeroPhone() {
  return <div className="mp-hero-phone">{[["only-dark", HERO_DARK], ["only-light", HERO_LIGHT]].map(([cls, list]) => <div key={cls} className={cls}><CmdScope chapter="mobile-hero" cmd="choose models for my phone">{(text, seq) => <><CmdBar text={text} seq={seq} className="tour-cmd-chip" /><PhoneShots shots={list} controls /></>}</CmdScope></div>)}</div>;
}

const FAQ = (p) => [
  ['Is it really free?', 'Local chat, images, and document tools are free. Pro adds memory, voice, approved draft actions, and Sync.'],
  ['Does it work offline?', 'Yes, with downloaded local models. Online tools and remote models need a connection.'],
  ['Which phones?', 'iPhone 12 or newer on iOS 17+, and Android 10+ with 4GB of RAM or more.'],
  ['Does it phone home?', 'Local inference stays on your phone. Pro activates with a key. Connected services and Sync use your chosen connections.'],
  ['What models can I run?', 'Qwen, Gemma, Llama, Phi, and compatible GGUF models that fit your memory. Use desktop models over your local network.'],
  ['What does Pro cost?', `$${p.lifetime} for lifetime access or $${p.monthly}/month. Up to ${p.devices} devices. The lifetime price rises as we grow.`],
];

export default function MobilePage({ data }) {
  const p = data.pricing;
  return <PageShell>
    <section className="pp pp-hero mp-hero has-bg" aria-labelledby="pp-h1"><SectionBg />
      <div className="section-shell pp-hero-grid mp-hero-grid">
        <div className="pp-hero-copy">
          <span className="pp-plat"><Kicker>OFF GRID AI MOBILE</Kicker><span className="pp-plat-ic" role="img" aria-label="Android, iOS"><PlatformIcon id="android" size={15} /><PlatformIcon id="ios" size={15} /></span></span>
          <Title as="h1" id="pp-h1" className="pp-h1" lead="Your personal AI." dim="On your phone." />
          <Lede className="pp-lede">Built for the phone you already own. Start free. Add Pro for memory, voice, and actions you approve.</Lede>
          <div className="pp-dl-row mp-stores"><Dl {...IOS} className="dl-main" /><Dl {...ANDROID} /></div>
          <div className="pp-alts"><a className="pp-alt" href={GITHUB.href} target="_blank" rel="noopener">Star on GitHub <ArrowUpRight size={13} /></a></div>
          <p className="pp-fine">GitHub: 0.0.111 · Preview: 0.0.112-beta.1. Store versions can differ: <a href="/mobile/releases/">see what shipped</a>.<br />iOS 17+ · iPhone 12+ · Android 10+ · 4GB RAM</p>
          <p className="pp-offline-note"><LockKey size={13} /> Your local AI works offline after you download a model. Your prompts stay on your phone.</p>
          <Proof />
        </div>
        <HeroPhone />
      </div>
    </section>

    <section className="chapter pp pp-free" aria-labelledby="what-you-get-for-free">
      <div className="section-shell">
        <div className="sec-head"><Kicker>FREE · ON YOUR PHONE</Kicker><h2 id="what-you-get-for-free" className="pp-h2"><span className="t-line">What you get for free.</span><span className="t-line t-dim">Your phone runs the AI.</span></h2>
          <Lede>Write a draft, understand a photo, or ask about a document.</Lede></div>
        <Explorer items={FREE} label="Free features" className="mp-explorer" />
      </div>
    </section>

    <section className="chapter pp pp-pro" aria-labelledby="keep-your-assistant-close">
      <div className="section-shell">
        <div className="sec-head"><Kicker>OFF GRID AI PRO</Kicker><h2 id="keep-your-assistant-close" className="pp-h2"><span className="t-line">Keep your assistant close.</span><span className="t-line t-dim">Pro, in your pocket.</span></h2>
          <p className="pp-lede-p">Pro adds memory, voice, approved actions, and Sync. One Pro purchase covers up to {p.devices} devices. Also available on <a href="/desktop/">desktop</a>.</p></div>
        <Explorer items={PRO} label="Pro features" className="mp-explorer mp-explorer-pro" />
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
      pro={['Memory', 'Voice mode with Kokoro', 'Custom personas', 'Drafts you approve', 'Sync across paired devices', `Up to ${p.devices} devices`]}
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
