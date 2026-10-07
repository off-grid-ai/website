import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, CheckCircle, Check, LockKey, ChatCircle, VideoCamera, FilePdf, Sparkle } from '@phosphor-icons/react';
import { AnimatedList } from '@magicui/animated-list';
import Button from '@smoothui/smooth-button';
import { PageShell, Kicker, Title, Lede, SceneCard, SectionBg, PlatformIcon, useNarrow } from '../shared.jsx';
import { Proof, Dl, Explorer, Loop, Wipe, AutoCtl, PhoneShots, FreeVsPro, Faq, Phone, Screen, SceneHead, ChatScene, ImageScene, VoiceScene, OfflineScene, ToolsScene, ApprovalScene } from './_product.jsx';

const UTM = 'utm_source=offgrid-docs&utm_medium=website&utm_campaign=mobile';
const IOS = { id: 'ios', href: `https://apps.apple.com/us/app/off-grid-local-ai/id6759299882?${UTM}`, aria: 'Download for iOS', small: 'Download on the', label: 'App Store', external: true };
const ANDROID = { id: 'android', href: `https://play.google.com/store/apps/details?id=ai.offgridmobile&${UTM}`, aria: 'Download for Android', small: 'Get it on', label: 'Google Play', external: true };
const GITHUB = { id: 'github', href: 'https://github.com/off-grid-ai/off-grid-ai-mobile', small: 'Open source', label: 'Star on GitHub', external: true };

const GEN = [['dreamshaper', 'Stable Diffusion', 'A golden retriever in an autumn park'], ['realvis', 'Stable Diffusion', 'Alpine lake at sunrise, still water'], ['juggernaut', 'Stable Diffusion', 'Neon city street after rain']];

function PersonaScene() {
  return <div className="ms">
    <SceneHead title="Persona" badge="Pro" />
    <div className="ms-persona"><span className="ms-avatar"><Sparkle size={16} /></span><span><b>Research partner</b><small>Your assistant, your rules</small></span></div>
    {[['Instructions', 'Short answers. Cite the source. Ask before guessing.'], ['Voice', 'Kokoro · calm, clear'], ['Memory', 'Works at Acme Corp · prefers metric units · pilot starts 14 Nov']].map(([k, v], i) =>
      <motion.div key={k} className="ms-field" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .3 + i * .35 }}><small>{k}</small><span>{v}</span></motion.div>)}
  </div>;
}

const SYNCED = [[CheckCircle, 'Reply to Sam sent', 'Approved on your Mac'], [VideoCamera, 'Acme Corp sync', 'Pilot moves to 14 Nov'], [ChatCircle, 'What did I promise Sam?', 'Chat · 2 sources'], [FilePdf, 'Acme_rollout_v3.pdf', 'Attachment · 1.2 MB']];
function SyncScene() {
  return <div className="ms">
    <SceneHead title="Synced" badge={<><LockKey size={10} /> Encrypted</>} />
    <AnimatedList delay={700} className="ms-sync">
      {SYNCED.map(([Icon, t, m]) => <div className="ms-server" key={t}><span className="tl-ic"><Icon size={13} /></span><span className="ms-sync-tx"><b>{t}</b><small>{m}</small></span><Check size={12} weight="bold" className="ms-ok" /></div>)}
    </AnimatedList>
    <p className="ms-foot">Device to device. No Off Grid AI storage server.</p>
  </div>;
}

const SCENES = {
  chat: () => <ChatScene model="Qwen 3.8 · on device" q="Draft a reply to my landlord about the deposit." a="Hi, I moved out on 30 September and left the flat as I found it. Could you return the deposit by Friday? Thanks, Sam" />,
  images: () => <ImageScene runs={GEN} label="On this phone" />,
  voice: () => <VoiceScene />,
  projects: () => <ChatScene file="Acme_rollout_v3.pdf" model="Project" q="How many seats are in the pilot?" a="The pilot covers 40 seats and starts after the security review [1]." citations={[{ id: 'p4', index: 1, title: 'Page 4' }]} />,
  tools: () => <ToolsScene />,
  offline: () => <OfflineScene where="your phone" />,
  voicemode: () => <VoiceScene title="Voice mode" badge="Kokoro · on device" speaking text="Your pilot with Acme Corp moves to the fourteenth. Want me to tell Sam?" />,
  personas: () => <PersonaScene />,
  approve: () => <ApprovalScene to="Sam Okafor" question="Send this reply to Sam?" draft="Hi Sam, confirming the pilot moves to 14 November. The revised rollout plan reaches you by Friday." />,
  sync: () => <SyncScene />,
};
// Real screens where the app has them, only in their own theme; a composed scene stands in for the other theme.
const REAL = {
  images: { light: [['imagegen-ios-1-light', 'Off Grid AI on iPhone: "A lighthouse at dusk, film photo" turned into an enhanced prompt and a finished image.', 4600]], dark: [['imagegen-ios-1-dark', 'Off Grid AI on iPhone: "A lighthouse at dusk, film photo" turned into an enhanced prompt and a finished image.', 4600]] },
  voice: { light: [['voice-ios-1-light', 'Off Grid AI on iPhone: a spoken reply as a voice note, with its transcript.', 4200]], dark: [['voice-ios-1-dark', 'Off Grid AI on iPhone: a spoken reply as a voice note, with its transcript.', 4200]] },
  vision: { light: [['vision-ios-1-light', 'Off Grid AI on iPhone answering "What\'s in this picture?" about an attached picture, using Qwen 3.5 9B running on your Mac through Off Grid AI Desktop.', 4200]], dark: [['vision-ios-1-dark', 'Off Grid AI on iPhone answering "What\'s in this picture?" about an attached picture, using Qwen 3.5 9B running on your Mac through Off Grid AI Desktop.', 4200]] },
  larger: { light: [['remote-ios-1-light', 'Off Grid AI on iPhone connected to Off Grid AI Desktop over your own network, with Ollama and LM Studio discovery in Remote Servers.', 4200]], dark: [['remote-ios-1-dark', 'Off Grid AI on iPhone connected to Off Grid AI Desktop over your own network, with Ollama and LM Studio discovery in Remote Servers.', 4200]] },
  voicemode: { light: [['voice-2-light', 'Off Grid AI hands-free voice mode: tap to speak, everything runs on your device.', 4200]], dark: [['voice-3-dark', 'Off Grid AI voice picker: Kokoro voices, speech runs on your phone.', 4200]] },
  sync: { light: [['sync-1-light', 'Off Grid AI Sync sharing: what to send and receive between paired devices.', 3800], ['sync-2-light', 'Off Grid AI Sync rules for screenshots, downloads, media and attachments.', 3800]] },
};
const composed = (id, compact) => compact ? <Screen><Loop>{SCENES[id]()}</Loop></Screen> : <div className="mp-stage-phone"><Phone><Loop>{SCENES[id]()}</Loop></Phone></div>;
const real = (shots, compact) => <div className={compact ? 'mp-card-phone' : 'mp-stage-phone'}><PhoneShots shots={shots} /></div>;
const inPhone = (id) => (compact) => {
  const r = REAL[id]; if (!r) return composed(id, compact);
  return <><div className="only-dark">{r.dark ? real(r.dark, compact) : composed(id, compact)}</div><div className="only-light">{r.light ? real(r.light, compact) : composed(id, compact)}</div></>;
};

const FREE = [
  ['chat', 'Chat', 'Write, ask, and reason with local models such as Qwen, Llama, Gemma, and Phi.'],
  ['images', 'Image generation', 'Create images with on-device Stable Diffusion and a live preview.'],
  ['vision', 'Vision AI', 'Ask about a photo, read a receipt, or extract text. On the phone, or with your computer’s vision models.'],
  ['voice', 'Voice input', 'Turn speech into text on your phone with Whisper.'],
  ['projects', 'Projects', 'Ask about your PDFs and documents. Answers cite their sources.'],
  ['tools', 'Tools', 'Use web search, a calculator, and document lookup with compatible models.'],
  ['larger', 'Larger models', 'Use Off Grid AI Desktop, Ollama, or LM Studio over your local network.'],
  ['offline', 'Offline by default', 'Download a model once. Use it without internet.'],
].map(([id, title, line]) => ({ id, title, line, visual: inPhone(id) }));
const PRO = [
  ['voicemode', 'Voice mode', 'Talk hands-free. Kokoro generates spoken replies on your phone.'],
  ['personas', 'Custom personas', "Set your assistant's instructions, voice, and persistent memory."],
  ['approve', 'Draft, then approve', 'Draft replies and tasks through connected tools. You approve before sending.'],
  ['sync', 'Sync is live', 'Continue chats across paired devices. Transfers are encrypted, without an Off Grid AI storage server.'],
].map(([id, title, line]) => ({ id, title, line, visual: inPhone(id) }));

// Hero phone: the real app, screen after screen, in the page's theme.
const HERO_LIGHT = [
  ['chat-ios-1-light', 'A reply drafted on the phone for the Acme team.', 3800],
  ['imagegen-ios-1-light', 'An image generated from a short prompt, with the enhanced prompt it used.', 3800],
  ['vision-ios-1-light', 'Asking about a picture, answered by your computer’s vision model.', 3800],
  ['voice-ios-1-light', 'A spoken reply as a voice note, with its transcript.', 3800],
  ['project-ios-2-light', 'A project answer that cites its document.', 3800],
  ['models-ios-1-light', 'Models picked for your phone, with vision and tools marked.', 3800],
];
const HERO_DARK = [
  ['chat-ios-1-dark', 'A reply drafted on the phone for the Acme team.', 3800],
  ['imagegen-ios-1-dark', 'An image generated from a short prompt, with the enhanced prompt it used.', 3800],
  ['vision-ios-1-dark', 'Asking about a picture, answered by your computer’s vision model.', 3800],
  ['voice-ios-1-dark', 'A spoken reply as a voice note, with its transcript.', 3800],
  ['project-ios-2-dark', 'A project answer that cites its document.', 3800],
  ['models-ios-1-dark', 'Models picked for your phone, with vision and tools marked.', 3800],
];
function HeroPhone() {
  return <div className="mp-hero-phone"><div className="only-dark"><PhoneShots shots={HERO_DARK} controls /></div><div className="only-light"><PhoneShots shots={HERO_LIGHT} controls /></div></div>;
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
      free={['Chat with Qwen, Llama, Gemma and Phi', 'Image generation with live preview', 'Vision and voice input', 'Projects with cited answers', 'Tools and larger models on your network', 'Offline, prompts stay on your phone']}
      pro={['Memory', 'Voice mode with Kokoro', 'Custom personas', 'Drafts you approve', 'Sync across paired devices', `Up to ${p.devices} devices`]}
      freeCta={<a className="pp-btn" href={IOS.href} target="_blank" rel="noopener" aria-label="Download for iOS" title="Download for iOS"><PlatformIcon id="ios" size={15} /> Download free</a>} />

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
