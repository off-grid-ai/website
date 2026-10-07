import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Theme, Card, Badge, Box, Flex, Text, Heading, Link, TextArea, TextField } from '@radix-ui/themes';
import * as Dialog from '@radix-ui/react-dialog';
import {
  ThumbsUp, ThumbsDown, ArrowUpRight, ArrowRight, ArrowDown, ArrowLeft, Check, List, X, GithubLogo, EnvelopeSimple, FilePdf, ChatsCircle,
  VideoCamera, Globe, NotePencil, LockKey, Cpu, HardDrives, ChatCircle, Microphone, ImageSquare, WifiSlash, Files,
  Laptop, DeviceMobile, PuzzlePiece, CalendarBlank, TerminalWindow, MagnifyingGlass, UsersThree, ClockCounterClockwise, Clock, CheckCircle, ShieldCheck, Network, Sparkle, ClipboardText, ChartBar, AppleLogo, AndroidLogo, WifiHigh, House, Play, Pause, WindowsLogo, LinuxLogo, GoogleChromeLogo,
} from '@phosphor-icons/react';
import { motion, MotionConfig, AnimatePresence, useScroll, useTransform, useMotionValueEvent, useReducedMotion, animate } from 'motion/react';
import OrbitalImageWheel from '@smoothui/orbital-image-wheel';
import { Carousel, CarouselContent, CarouselItem, CarouselIndicator } from '@motion-primitives/carousel';
import useEmblaCarousel from 'embla-carousel-react';
import CoverflowCarousel from '@smoothui/coverflow-carousel';
import Button from '@smoothui/smooth-button';
import MagneticButton from '@smoothui/magnetic-button';
import ThemeToggle from '@smoothui/theme-toggle';
import AIApproval from '@smoothui/ai-approval';
import AIMessage from '@smoothui/ai-message';
import AIResponse from '@smoothui/ai-response';
import AIReasoning from '@smoothui/ai-reasoning';
import { TextEffect } from '@motion-primitives/text-effect';
import { AnimatedBackground } from '@motion-primitives/animated-background';
import { TextScramble } from '@motion-primitives/text-scramble';
import { FlickeringGrid } from '@magicui/flickering-grid';
import { BorderBeam } from '@magicui/border-beam';
import { BentoGrid, BentoCard } from '@magicui/bento-grid';
import { AnimatedBeam } from '@magicui/animated-beam';
import { NumberTicker } from '@magicui/number-ticker';
import { Marquee } from '@magicui/marquee';
import { MagicCard } from '@magicui/magic-card';
import { Iphone } from '@magicui/iphone';
import { AnimatedShinyText } from '@magicui/animated-shiny-text';
import { Ripple } from '@magicui/ripple';
import { AnimatedList } from '@magicui/animated-list';
import { ScrollProgress } from '@magicui/scroll-progress';
import { ScrollVelocityContainer, ScrollVelocityRow } from '@magicui/scroll-based-velocity';
import { BlurFade } from '@magicui/blur-fade';
import { TypingAnimation } from '@magicui/typing-animation';
import { InteractiveGridPattern } from '@magicui/interactive-grid-pattern';
import AISuggestions from '@smoothui/ai-suggestions';
import { WordRotate } from '@magicui/word-rotate';
import { Dock, DockIcon } from '@magicui/dock';
import { Safari } from '@magicui/safari';
import { AnimatedCircularProgressBar } from '@magicui/animated-circular-progress-bar';
import { Confetti } from '@magicui/confetti';
import { Terminal, AnimatedSpan, TypingAnimation as TermTyping } from '@magicui/terminal';
import { InteractiveHoverButton } from '@magicui/interactive-hover-button';
import { Highlighter } from '@magicui/highlighter';
import { PlaceholdersAndVanishInput } from '@aceternity/placeholders-and-vanish-input';
import { TextAnimate } from '@magicui/text-animate';
import { HyperText } from '@magicui/hyper-text';
import { TextReveal } from '@magicui/text-reveal';
import { ShineBorder } from '@magicui/shine-border';
import { DotPattern } from '@magicui/dot-pattern';
import { OrbitingCircles } from '@magicui/orbiting-circles';
import { ShimmerButton } from '@magicui/shimmer-button';
import { DottedMap } from '@magicui/dotted-map';

// Composition only. Every visual element is an upstream component imported
// intact (see build.mjs). This file arranges them, supplies product content,
// and maps page scroll to the story's chapters.

export const SLACK = 'https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ';
export const DOWNLOADS = [
  { id: 'ios', small: 'Download on the', label: 'App Store', href: 'https://apps.apple.com/us/app/off-grid-local-ai/id6759299882?utm_source=offgrid-docs&utm_medium=website&utm_campaign=download', external: true },
  { id: 'android', small: 'Get it on', label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=ai.offgridmobile&utm_source=offgrid-docs&utm_medium=website&utm_campaign=download', external: true },
  { id: 'macos', small: 'Download for', label: 'macOS', href: 'https://github.com/off-grid-ai/OGAD/releases/download/v0.0.54/OffGrid-0.0.54.dmg' },
  { id: 'windows', small: 'Download for', label: 'Windows', href: 'https://github.com/off-grid-ai/OGAD/releases/download/v0.0.54/off-grid-ai-0.0.54-setup.exe' },
  { id: 'linux', small: 'AppImage for', label: 'Linux', href: 'https://github.com/off-grid-ai/OGAD/releases/download/v0.0.54/off-grid-ai-0.0.54.AppImage' },
];
// From the shared model catalog (shared/packages/models).
// Name, kind, maker. Makers with a mark in the pinned lobe-icons set show it (assets/img/logos);
// the others show the model kind's icon rather than an invented logo.
export const MODELS = [
  ['Qwen 3.8', 'Text', 'qwen'], ['Gemma 4', 'Vision', 'gemma'], ['Muse Glimmer 30B', 'Vision', 'meta'], ['Bonsai 2 27B', 'Vision'],
  ['Nemotron 3.5 Lightning', 'Text', 'nvidia'], ['Qwen3-VL', 'Vision', 'qwen'], ['Holo 3.1', 'Computer use'], ['Whisper Large v3 Turbo', 'Speech', 'openai'],
  ['Parakeet TDT', 'Speech', 'nvidia'], ['Kokoro', 'Voice'], ['Qwen-Image 2.1', 'Image', 'qwen'], ['Z-Image Turbo', 'Image', 'alibaba'],
];
const KIND_ICON = { Text: ChatCircle, Vision: ImageSquare, 'Computer use': Laptop, Speech: Microphone, Voice: Microphone, Image: ImageSquare };
function ModelChip({ name, kind, maker }) {
  const Icon = KIND_ICON[kind];
  return <span className="mq-model">{maker
    ? <span className="mq-logo" style={{ '--logo': `url(/assets/img/logos/${maker}.svg)` }} role="img" aria-label={maker} />
    : <span className="mq-logo mq-kind" aria-hidden="true"><Icon size={16} /></span>}<b>{name}</b><small>{kind}</small></span>;
}
export const GENERATED = [['dreamshaper', 'DreamShaper XL'], ['juggernaut', 'Juggernaut XL'], ['realvis', 'RealVisXL'], ['illustrious', 'Illustrious XL'], ['realvis-lightning', 'RealVisXL Lightning']];
// Header: where people want to go from any page. Home-only anchors live in the phone menu.
export const NAV = [['Desktop', '/desktop/'], ['Mobile', '/mobile/'], ['Pro', '/pro/'], ['Pricing', '/#pricing'], ['Guides', '/guides/']];
const MENU = [...NAV, ['How it works', '/#how'], ['Privacy', '/#private'], ['Download', '/download/'], ['Get Pro', '/pro/#buy'], ['Desktop releases', '/desktop/releases/'], ['Mobile releases', '/mobile/releases/']];

// Real app screens, captured from the seeded desktop build in both themes.
export const SHOT_V = '20261007g';
export function Shot({ name, alt, className = '', lazy = true }) {
  const theme = useContext(ThemeCtx); const { takeOver } = useContext(PlayCtx);
  const load = (t) => (lazy || t !== theme ? 'lazy' : undefined); // the other theme's file only loads if it is shown
  const props = { width: 1760, height: 944, alt, sizes: '(max-width: 860px) 900px, 70vw' };
  const set = (t) => `/assets/img/home/app/${name}-${t}-1760.webp?v=${SHOT_V} 1760w, /assets/img/home/app/${name}-${t}.webp?v=${SHOT_V} 3520w`;
  return <>
    <a className="shot-link shot-link-dark" href={`/assets/img/home/app/${name}-dark.webp?v=${SHOT_V}`} target="_blank" rel="noopener" aria-label={`Open full-size screenshot: ${alt}`} onClick={takeOver} onPointerDown={(e) => e.stopPropagation()}>
      <img className={`shot shot-dark ${className}`} src={`/assets/img/home/app/${name}-dark-1760.webp?v=${SHOT_V}`} srcSet={set('dark')} loading={load('dark')} {...props} draggable={false} />
    </a>
    <a className="shot-link shot-link-light" href={`/assets/img/home/app/${name}-light.webp?v=${SHOT_V}`} target="_blank" rel="noopener" aria-label={`Open full-size screenshot: ${alt}`} onClick={takeOver} onPointerDown={(e) => e.stopPropagation()}>
      <img className={`shot shot-light ${className}`} src={`/assets/img/home/app/${name}-light-1760.webp?v=${SHOT_V}`} srcSet={set('light')} loading={load('light')} {...props} alt="" draggable={false} />
    </a>
  </>;
}

// Replays a looping demo: the returned key changes every `ms` while mounted.
export function useCycle(ms) {
  const [n, setN] = useState(0); const reduce = useReducedMotion();
  useEffect(() => { if (!ms || reduce) return; const t = setInterval(() => setN(v => v + 1), ms); return () => clearInterval(t); }, [ms, reduce]);
  return n;
}

export function Logo({ size = 28, className = '' }) {
  return <span className={`logo ${className}`} style={{ width: size, height: size }}>
    <img className="logo-dark" src="/assets/img/home/logo-dark.png" width={size} height={size} alt="" />
    <img className="logo-light" src="/assets/img/home/logo-light.png" width={size} height={size} alt="" />
  </span>;
}

// Every scene card: Magic UI MagicCard (border spotlight follows the pointer) with a Magic UI
// BorderBeam running while the card is working (thinking, streaming, downloading, filling).
export function SceneCard({ busy, className = '', children, innerRef }) {
  return <div className={`scene-card ${className}`} ref={innerRef}>
    <MagicCard className="scene-mc" gradientSize={240} gradientColor="rgba(52, 211, 153, 0.10)" gradientOpacity={1} gradientFrom="var(--og-primary)" gradientTo="var(--og-primary-dark)">
      <div className="scene-card-in">{children}</div>
    </MagicCard>
    {busy && <BorderBeam size={110} duration={3.2} colorFrom="#34D399" colorTo="#6EE7B7" borderWidth={1.5} />}
  </div>;
}

// Steps a scripted scene forward once: returns how many of the given delays (ms) have elapsed.
export function useSteps(times) {
  const [s, setS] = useState(0);
  useEffect(() => { const ts = times.map((t, i) => setTimeout(() => setS(i + 1), t)); return () => ts.forEach(clearTimeout); }, []);
  return s;
}

// Living backdrop for every section after the walkthrough: grid cells answer the cursor, dots breathe.
export function SectionBg() {
  return <div className="sec-bg" aria-hidden="true">
    <FlickeringGrid squareSize={3} gridGap={10} maxOpacity={.14} flickerChance={.12} color="rgb(52, 211, 153)" className="sec-dots" />
    <InteractiveGridPattern width={56} height={56} squares={[40, 30]} className="igrid" squaresClassName="igrid-sq" />
  </div>;
}

const BeamLayer = createContext(null);
// AnimatedBeam measures screen pixels; inside a scaled canvas it would draw at the wrong scale.
// When a beam layer is available, beams render into it, unscaled, with the layer as container.
function Beam(props) {
  const layer = useContext(BeamLayer);
  const [, force] = useState(0);
  useEffect(() => { if (layer && !layer.current) { const t = setTimeout(() => force(v => v + 1), 0); return () => clearTimeout(t); } }, [layer]);
  if (layer && layer.current) return createPortal(<AnimatedBeam {...props} containerRef={layer} />, layer.current);
  return <AnimatedBeam {...props} />;
}

export function PlatformIcon({ id, size = 16 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><use href={`/assets/platform-icons.svg#${id}`} /></svg>;
}


// Text roles. Every heading, label and lede animates through an upstream text component.
export function Kicker({ children }) {
  return <HyperText as="span" className="eyebrow kicker" startOnView animateOnHover duration={700} characterSet={'ABCDEFGHIJKLMNOPQRSTUVWXYZ01/_'.split('')}>{children}</HyperText>;
}
export function Title({ id, lead, dim, as = 'h2', className }) {
  return <Heading as={as} id={id} className={className}>
    <TextAnimate as="span" by="word" animation="slideUp" once startOnView className="t-line">{lead}</TextAnimate>
    {dim && <TextAnimate as="span" by="word" animation="slideUp" once startOnView delay={.2} className="t-line t-dim">{dim}</TextAnimate>}
  </Heading>;
}
export function Lede({ children, className }) {
  return <TextAnimate as="p" by="word" animation="fadeIn" duration={.6} once startOnView className={className}>{children}</TextAnimate>;
}
const SHINE = ['rgb(52 211 153)', 'rgb(110 231 183)', 'rgb(16 185 129)'];
export const FOOTER = [
  ['PRODUCT', [['Desktop', '/desktop/'], ['Mobile', '/mobile/'], ['Pro', '/pro/'], ['Pricing', '/pro/#buy'], ['Download', '/download/'], ['Hardware', '/ogap/']]],
  ['LEARN', [['Quick start', '/quick-start/'], ['Guides', '/guides/'], ['Articles', '/articles/'], ['Writing', '/writing/'], ['Desktop releases', '/desktop/releases/'], ['Mobile releases', '/mobile/releases/']]],
  ['COMPANY', [['Ethos', '/ethos/'], ['Mission', '/mission/'], ['Vision', '/vision/'], ['Design partners', '/design-partners/'], ['Wednesday Solutions', 'https://www.wednesday.is/']]],
  ['CONNECT', [['GitHub', 'https://github.com/off-grid-ai'], ['Slack community', SLACK], ['Reddit', 'https://www.reddit.com/r/off_grid_ai/'], ['Support', 'mailto:support@offgridmobileai.co']]],
];

/* ───────────────────────── Story chapters ───────────────────────── */

const SOURCES = [
  { Icon: EnvelopeSimple, app: 'Mail', time: '09:12', text: 'Rollout plan attached' },
  { Icon: FilePdf, app: 'PDF', time: '10:40', text: 'Acme_rollout_v3.pdf' },
  { Icon: ChatsCircle, app: 'Slack', time: '13:05', text: 'Can we move the pilot?' },
  { Icon: VideoCamera, app: 'Meeting', time: '15:00', text: 'Acme Corp sync · 32m' },
  { Icon: Globe, app: 'Browser', time: '16:20', text: 'Seat pricing page' },
  { Icon: NotePencil, app: 'Note', time: '18:45', text: 'Confirm pilot date' },
];

function CaptureScene() {
  const box = useRef(null); const hub = useRef(null);
  const refs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
  const column = (side) => <div className={`src-col src-${side ? 'right' : 'left'}`}>
    {SOURCES.slice(side * 3, side * 3 + 3).map((s, i) => <motion.div className="src" ref={refs[side * 3 + i]} key={s.app}
      initial={{ opacity: 0, x: side ? 24 : -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .1 + i * .12, duration: .45 }}>
      <span className="src-ic"><s.Icon size={18} /></span>
      <span className="src-tx"><b>{s.app} · {s.time}</b><span>{s.text}</span></span>
    </motion.div>)}
  </div>;
  return <div className="scene scene-capture" ref={box}>
    {column(0)}
    <div className="hub" ref={hub}><Logo size={76} /><span>On this device</span></div>
    {column(1)}
    {refs.map((r, i) => <Beam key={i} containerRef={box} fromRef={r} toRef={hub} reverse={i > 2} curvature={(i % 3 - 1) * -36}
      duration={2.6 + (i % 3) * .5} delay={i * .2} pathWidth={2} pathColor="var(--og-text-muted)" pathOpacity={.16} gradientStartColor="var(--og-primary)" gradientStopColor="var(--og-primary-light)" />)}
  </div>;
}

const TIMELINE = [
  { Icon: EnvelopeSimple, time: '09:12', text: 'Sam Okafor: rollout plan attached' },
  { Icon: FilePdf, time: '10:40', text: 'Read Acme_rollout_v3.pdf' },
  { Icon: ChatsCircle, time: '13:05', text: '#acme: can we move the pilot?' },
  { Icon: VideoCamera, time: '15:00', text: 'Acme Corp sync with Sam · 32 min' },
  { Icon: NotePencil, time: '18:45', text: 'Confirm the pilot date with Sam' },
];
function RememberScene() {
  const s = useSteps([3400]);
  return <div className="scene scene-remember">
    <SceneCard busy={s < 1}>
      <Flex justify="between" align="center" className="app-head"><Text className="eyebrow">TODAY · TIMELINE</Text><Badge variant="outline">5 moments</Badge></Flex>
      <AnimatedList delay={550} className="tl">
        {TIMELINE.map(t => <div className="tl-row" key={t.time}><span className="tl-ic"><t.Icon size={15} /></span><span className="tl-t">{t.time}</span><span className="tl-x">{t.text}</span></div>)}
      </AnimatedList>
    </SceneCard>
    <div className="ents">
      {[['Sam Okafor', 'Person'], ['Acme Corp', 'Company'], ['Q4 pilot', 'Project'], ['14 Nov', 'Date']].map(([n, k], i) =>
        <motion.span className="ent" key={n} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 + i * .15, duration: .4 }}><b>{n}</b>{k}</motion.span>)}
    </div>
  </div>;
}

const ANSWER = 'In the 3:00 PM sync you agreed to move the Acme Corp pilot to 14 November and keep 40 seats at the current price [1]. You also promised Sam the revised rollout plan by Friday [2].';
const CITED = { '10:40': 2, '15:00': 1 };
function AskScene() {
  const [n, setN] = useState(0); const [thinking, setThinking] = useState(true);
  const words = ANSWER.split(' ');
  useEffect(() => {
    const t0 = setTimeout(() => setThinking(false), 1300);
    let i = 0; let iv;
    const t1 = setTimeout(() => { iv = setInterval(() => { i += 1; setN(i); if (i >= words.length) clearInterval(iv); }, 55); }, 1400);
    return () => { clearTimeout(t0); clearTimeout(t1); clearInterval(iv); };
  }, []);
  const shown = words.slice(0, n).join(' ');
  const lit = (k) => !thinking && shown.includes(`[${k}]`);
  return <div className="scene scene-ask">
    <SceneCard className="ask-rail" busy={thinking}>
      <Text className="eyebrow">Searched 214 moments</Text>
      <div className="rail-rows">{TIMELINE.map((t, i) => { const k = CITED[t.time]; const on = !!k && lit(k);
        return <motion.div key={t.time} className={`rail-row ${on ? 'on' : ''}`} initial={{ opacity: 0, x: -8 }} animate={{ opacity: thinking || on ? 1 : .4, x: 0 }} transition={{ delay: i * .12, duration: .3 }}>
          <span className="tl-ic"><t.Icon size={13} /></span><span className="rail-tx"><span className="tl-t">{t.time}</span><span>{t.text}</span></span>{on && <span className="rail-k">{k}</span>}
        </motion.div>; })}</div>
    </SceneCard>
    <SceneCard className="ask-card" busy={!thinking && n < words.length}>
      <Flex direction="column" gap="4">
        <AIMessage from="user">What did I promise Sam about the Acme Corp pilot?</AIMessage>
        <AIReasoning isStreaming={thinking} duration={1} defaultOpen={false}>Searched 214 moments. Found a meeting, a PDF and a Slack thread.</AIReasoning>
        <AIResponse isStreaming={n < words.length} text={shown}
          citations={[{ id: 'sync', index: 1, title: 'Acme Corp sync · 15:00' }, { id: 'pdf', index: 2, title: 'Acme_rollout_v3.pdf' }]} />
        <Flex gap="2" wrap="wrap" className="cites"><Badge variant="surface" className={lit(1) ? 'badge-on' : ''}><VideoCamera size={12} /> 1 · Acme Corp sync, 15:00</Badge><Badge variant="surface" className={lit(2) ? 'badge-on' : ''}><FilePdf size={12} /> 2 · Acme_rollout_v3.pdf</Badge></Flex>
      </Flex>
    </SceneCard>
  </div>;
}

function ActScene() {
  // Until the visitor chooses, the demo approves after a pause. Once they choose, their choice stays
  // until Reset: Approve shows a sample success, Edit opens the draft, Not now keeps it as a suggestion.
  const { takeOver } = useContext(PlayCtx);
  const [k, setK] = useState(0); const [auto, setAuto] = useState(undefined); const [choice, setChoice] = useState(null);
  const [draft, setDraft] = useState("Hi Sam, confirming today's sync: the pilot moves to 14 November, 40 seats stay at the current price, and the revised rollout plan reaches you by Friday.");
  const burst = useRef(null);
  useEffect(() => { setAuto(undefined); if (choice) return; const t = setTimeout(() => setAuto('send'), 3200); return () => clearTimeout(t); }, [k, choice]);
  const done = choice || auto;
  useEffect(() => { if (done === 'send') burst.current?.fire({ particleCount: 70, spread: 70, startVelocity: 28, origin: { y: .75 }, colors: ['#34D399', '#10B981', '#6EE7B7'] }); }, [done]);
  const decide = (o) => { setChoice(o.id); takeOver(); };
  return <div className="scene scene-act">
    <Confetti ref={burst} manualstart className="act-confetti" />
    <SceneCard busy={!done}>
      <Flex justify="between" align="center" className="app-head"><Text className="eyebrow">OFF GRID SUGGESTS</Text><Badge variant="outline">Email draft</Badge></Flex>
      <dl className="draft"><dt>To</dt><dd>Sam Okafor</dd><dt>Subject</dt><dd>Acme Corp pilot moves to 14 November</dd></dl>
      {choice === 'edit'
        ? <TextArea className="draft-edit" size="2" resize="vertical" aria-label="Edit the sample draft" value={draft} onChange={(e) => setDraft(e.target.value)} autoFocus />
        : <p className="draft-body"><span className="draft-from"><ChatCircle size={11} /> From your answer in Ask</span><TypingAnimation key={k} as="span" duration={14} startOnView={false} showCursor={false}>{draft}</TypingAnimation></p>}
      <AIApproval key={`${k}-${choice || auto || 'open'}`} resolvedId={done} onDecide={decide} question="Send this reply to Sam?" options={[{ id: 'send', label: 'Approve and send', detail: 'Sample only. Nothing is sent' }, { id: 'edit', label: 'Edit first', detail: 'Opens the draft' }, { id: 'later', label: 'Not now', detail: 'Keep as a suggestion' }]}>
        <Text>{choice === 'later' ? 'Kept as a suggestion. Nothing was sent.' : choice === 'edit' ? 'Edit the draft above. Nothing is sent.' : 'Try it. Nothing is sent.'}</Text>
      </AIApproval>
      <button type="button" className="text-btn" onClick={() => { setChoice(null); setK(k + 1); }}>Reset <ArrowRight size={13} /></button>
    </SceneCard>
  </div>;
}

const SYNCED = [
  { Icon: CheckCircle, title: 'Reply to Sam sent', meta: 'Approved on your Mac · 18:52' },
  { Icon: VideoCamera, title: 'Acme Corp sync', meta: 'Pilot moves to 14 Nov' },
  { Icon: ChatCircle, title: 'What did I promise Sam?', meta: 'Chat · 2 sources' },
  { Icon: FilePdf, title: 'Acme_rollout_v3.pdf', meta: 'Attachment · 1.2 MB' },
];
function ContinueScene() {
  const box = useRef(null); const desk = useRef(null); const phone = useRef(null);
  const phase = useSteps([2400, 4800]);
  const [desktop, mobile, label] = [
    ['gateway', 'remote-ios-1', 'Your phone connected to Off Grid AI Desktop.'],
    ['chat', 'chat-ios-1', 'Off Grid AI Chat on your computer and phone.'],
    ['projects', 'project-ios-2', 'Off Grid AI Projects and cited document answers on your computer and phone.'],
  ][phase];
  return <div className="scene scene-continue" ref={box}>
    <div className="sync-card sync-shot" ref={desk}><Shot name={desktop} alt={label} lazy={false} /></div>
    <div className="dev-phone" ref={phone}>
      <Iphone />
      <div className="phone-live phone-capture">
        {['dark', 'light'].map(theme => <a key={theme} className={`shot-link shot-link-${theme}`} href={`/assets/img/home/mobile/${mobile}-${theme}.webp`} target="_blank" rel="noopener" aria-label={`Open full-size screenshot: ${label}`} onPointerDown={e => e.stopPropagation()}>
          <img className={`shot shot-${theme}`} src={`/assets/img/home/mobile/${mobile}-${theme}-640.webp`} alt={label} draggable={false} />
        </a>)}
      </div>
    </div>
    <span className="sync-tag"><LockKey size={13} /> Your computer and phone. Select a screen to enlarge it.</span>
    <Beam containerRef={box} fromRef={desk} toRef={phone} curvature={0} duration={2.2} pathWidth={2} pathColor="var(--og-text-muted)" pathOpacity={.18} gradientStartColor="var(--og-primary)" gradientStopColor="var(--og-primary-light)" />
  </div>;
}
// Browser: a sign-in page in Safari, the Off Grid side panel docked inside it, the vault login filling the form.
function BrowserScene() {
  const s = useSteps([500, 1300, 2700, 3700, 4500]);
  const filled = s >= 2;
  return <div className="scene scene-browser">
    <div className="br-frame">
      <Safari url="partners.acme.example/sign-in" />
      <div className="br-screen">
        <div className="br-page">
          <div className="br-brand"><span className="br-mark">A</span>Acme Corp <small>Partner portal</small></div>
          <AnimatePresence mode="wait" initial={false}>
            {s < 4 ? <motion.div key="form" className="br-form" exit={{ opacity: 0, y: -8 }} transition={{ duration: .25 }}>
              <b className="br-h">Sign in</b>
              <label>Email<span className={`br-field ${s === 2 || s === 3 ? 'on' : ''}`}>{filled ? <TypingAnimation as="span" duration={30} startOnView={false} showCursor={false}>sam@acme.example</TypingAnimation> : <i>you@company.com</i>}</span></label>
              <label>Password<span className={`br-field ${s === 3 ? 'on' : ''}`}>{s >= 3 ? <TypingAnimation as="span" duration={40} startOnView={false} showCursor={false}>••••••••••••</TypingAnimation> : <i>Password</i>}</span></label>
              <span className={`br-submit ${s >= 3 ? 'ready' : ''}`}>Sign in</span>
            </motion.div>
            : <motion.div key="done" className="br-done" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .3 }}>
              <CheckCircle size={28} weight="fill" /><b>Welcome back, Sam</b><span>Signed in to the partner portal</span>
            </motion.div>}
          </AnimatePresence>
        </div>
        <motion.aside className="br-side" initial={{ x: '100%' }} animate={{ x: s >= 1 ? 0 : '100%' }} transition={{ type: 'spring', stiffness: 260, damping: 30 }}>
          <div className="br-side-head"><Logo size={16} />Off Grid AI</div>
          <span className="eyebrow">Vault match</span>
          <div className={`br-item ${filled ? 'on' : ''}`}>
            <span className="br-item-ic"><LockKey size={14} /></span>
            <span className="br-item-tx"><b>Acme Corp partner portal</b><small>sam@acme.example</small></span>
          </div>
          <span className={`br-fill ${filled ? 'pressed' : ''}`}>{s >= 4 ? <><Check size={12} weight="bold" /> Filled</> : 'Fill login'}</span>
          <AnimatePresence>{s >= 5 && <motion.p className="br-note" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><ShieldCheck size={13} /> Filled from your vault. Nothing left this device.</motion.p>}</AnimatePresence>
        </motion.aside>
      </div>
    </div>
  </div>;
}

// Models: the real Models screen moves through every kind of model while each one downloads to this
// device; once all six are ready, the Wi-Fi goes off and they keep running.
const LOCAL_MODELS = [
  { Icon: ChatCircle, name: 'Qwen 3.8', kind: 'Text', tab: 'text', does: 'Chats and writes' },
  { Icon: ImageSquare, name: 'Gemma 4', kind: 'Vision', tab: 'vision', does: 'Reads images and screens' },
  { Icon: ImageSquare, name: 'Qwen-Image 2.1', kind: 'Image', tab: 'image', does: 'Makes images' },
  { Icon: Microphone, name: 'Whisper Large v3 Turbo', kind: 'Speech to text', tab: 'transcription', does: 'Transcribes meetings' },
  { Icon: ChatsCircle, name: 'Kokoro', kind: 'Text to speech', tab: 'voice', does: 'Reads answers aloud' },
  { Icon: Laptop, name: 'Holo 3.1', kind: 'Computer use', tab: 'computer-use', does: 'Clicks and types for you' },
];
function ModelsScene() {
  const STEP = 1500;
  const [v, setV] = useState(0);
  useEffect(() => { const t = setInterval(() => setV(x => { if (x >= LOCAL_MODELS.length * 100) { clearInterval(t); return x; } return x + 5; }), STEP / 20); return () => clearInterval(t); }, []);
  const active = Math.min(LOCAL_MODELS.length - 1, Math.floor(v / 100)); const done = v >= LOCAL_MODELS.length * 100;
  const m = LOCAL_MODELS[active];
  return <div className="scene scene-models">
    <Preload names={LOCAL_MODELS.map(x => `models-${x.tab}`)} />
    <div className="wt-shot">
      <AnimatePresence initial={false}>
        <motion.div key={m.tab} className="wt-shot-in" initial={{ clipPath: 'inset(0 100% 0 0)' }} animate={{ clipPath: 'inset(0 0% 0 0)', transition: { duration: .7, ease: [.65, 0, .35, 1] } }} exit={{ opacity: 1, transition: { delay: .7, duration: 0 } }}><Shot name={`models-${m.tab}`} alt={`Off Grid AI Models: ${m.kind.toLowerCase()} models you can download to this device.`} lazy={false} /><motion.i className="wipe-edge" initial={{ left: '0%', opacity: 1 }} animate={{ left: '100%', opacity: [1, 1, 0] }} transition={{ duration: .7, ease: [.65, 0, .35, 1] }} /></motion.div>
      </AnimatePresence>
    </div>
    <SceneCard className="models-card" busy={!done}>
      <Flex justify="between" align="center" className="app-head"><Text className="eyebrow">On this device</Text>
        <Badge variant="outline" className={done ? 'badge-on' : ''}>{done ? <><WifiSlash size={11} /> Wi-Fi off · all running</> : `${active} of ${LOCAL_MODELS.length} ready`}</Badge></Flex>
      <div className="mdl-rows">{LOCAL_MODELS.map((x, i) => {
        const p = done || i < active ? 100 : i === active ? v % 100 : 0;
        return <div className={`mdl-row ${p === 100 ? 'ready' : ''} ${i === active && !done ? 'cur' : ''}`} key={x.name}>
          <span className="tl-ic"><x.Icon size={14} /></span>
          <span className="mdl-tx"><b>{x.name}</b><small>{x.kind}</small></span>
          <span className="mdl-st">{p === 100 ? <Check size={13} weight="bold" /> : <AnimatedCircularProgressBar value={p} gaugePrimaryColor="#34D399" gaugeSecondaryColor="rgba(128,128,128,0.25)" className="mdl-ring" />}</span>
        </div>;
      })}</div>
    </SceneCard>
  </div>;
}
ModelsScene.fill = true;

function ApiScene() {
  return <div className="scene scene-api">
    <Terminal className="term" startOnView={false}>
      <TermTyping>$ curl localhost:7878/v1/chat/completions</TermTyping>
      <AnimatedSpan className="t-dim">{`  -d '{"model":"qwen3.8","messages":[{"role":"user","content":"Pilot date?"}]}'`}</AnimatedSpan>
      <AnimatedSpan className="t-ok">✓ OpenAI-compatible endpoint on this machine</AnimatedSpan>
      <AnimatedSpan className="t-ok">✓ Model loaded locally · no API key</AnimatedSpan>
      <AnimatedSpan>{'{ "role": "assistant", "content": "The pilot moves to 14 November." }'}</AnimatedSpan>
      <TermTyping className="t-dim">Works with your editor, scripts and MCP tools.</TermTyping>
    </Terminal>
  </div>;
}

// Web use: Off Grid works through a real task in the browser, step by step, and hands you the sign-in.
const WEB_STEPS = ['Search for local-first note apps', 'Read three product pages', 'Compare price, sync and offline', 'Your turn: sign in to save the doc', 'Saved to your docs'];
const WEB_ROWS = [['Notesmith', '$0', 'Device to device', 'Yes'], ['Leafline', '$8/mo', 'Their cloud', 'Partial'], ['Inkwell', '$4/mo', 'Their cloud', 'No']];
const POINTER = [[12, 14], [38, 48], [62, 62], [78, 30], [50, 82]];
function WebScene() {
  const s = useSteps([900, 2100, 3300, 4600, 6200]);
  const at = Math.min(s, WEB_STEPS.length) - 1;
  const [px, py] = POINTER[Math.max(0, at)];
  return <div className="scene scene-web">
    <SceneCard className="web-steps" busy={s < 5 && s !== 4}>
      <Text className="eyebrow">Task · Compare note apps</Text>
      <ol className="web-list">{WEB_STEPS.map((t, i) => <li key={t} className={`${i < at || s >= 5 ? 'done' : ''} ${i === at && s < 5 ? 'cur' : ''} ${i === 3 ? 'you' : ''}`}>
        <span className="web-dot">{i < at || s >= 5 ? <Check size={10} weight="bold" /> : i + 1}</span>{t}</li>)}</ol>
    </SceneCard>
    <div className="br-frame web-frame">
      <Safari url="notes-compare.example" />
      <div className="br-screen web-screen">
        <div className="web-page">
          <b className="web-h">Local-first note apps</b>
          <div className="web-table">
            <div className="web-tr web-th"><span>App</span><span>Price</span><span>Sync</span><span>Offline</span></div>
            {WEB_ROWS.map((r, i) => <motion.div key={r[0]} className="web-tr" initial={{ opacity: 0 }} animate={{ opacity: s >= 2 + (i > 0 ? 1 : 0) ? 1 : .15 }} transition={{ duration: .3 }}>{r.map(c => <span key={c}>{c}</span>)}</motion.div>)}
          </div>
          <AnimatePresence>{s === 4 && <motion.div className="web-takeover" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><LockKey size={13} /> Your turn. Off Grid AI never sees your password.</motion.div>}</AnimatePresence>
          <AnimatePresence>{s >= 5 && <motion.div className="web-takeover ok" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}><CheckCircle size={13} weight="fill" /> Comparison saved</motion.div>}</AnimatePresence>
        </div>
        <motion.svg className="web-pointer" width="18" height="18" viewBox="0 0 24 24" animate={{ left: `${px}%`, top: `${py}%` }} transition={{ type: 'spring', stiffness: 120, damping: 20 }}><path d="M4 2l16 9-7 2-3 7z" fill="currentColor" stroke="var(--og-background)" strokeWidth="1.5" /></motion.svg>
      </div>
    </div>
  </div>;
}

// Images: a prompt, the model working on this device, the picture landing in the gallery.
const GEN_RUNS = [
  ['dreamshaper', 'DreamShaper XL', 'A golden retriever in an autumn park, warm light'],
  ['juggernaut', 'Juggernaut XL', 'Neon city street after rain, cinematic'],
  ['realvis-lightning', 'RealVisXL Lightning', 'Portrait of an old fisherman, flat cap, film grain'],
  ['realvis', 'RealVisXL', 'Alpine lake at sunrise, still water'],
];
function ImagesScene() {
  const [run, setRun] = useState(0); const [phase, setPhase] = useState(0);
  useEffect(() => {
    const ts = [setTimeout(() => setPhase(1), 1500), setTimeout(() => setPhase(2), 3300), setTimeout(() => { setPhase(0); setRun(r => (r + 1) % GEN_RUNS.length); }, 5200)];
    return () => ts.forEach(clearTimeout);
  }, [run]);
  const [f, model, prompt] = GEN_RUNS[run];
  return <div className="scene scene-images">
    <SceneCard className="gen-card" busy={phase === 1}>
      <Flex justify="between" align="center" className="app-head"><Text className="eyebrow">Create image</Text><Badge variant="outline"><WifiSlash size={11} /> {model}</Badge></Flex>
      <div className="gen-prompt"><span className="cmd-caret">›</span><TypingAnimation key={run} as="span" duration={26} startOnView={false} showCursor={phase === 0}>{prompt}</TypingAnimation></div>
      <div className="gen-stage">
        <AnimatePresence mode="wait">
          {phase < 2 ? <motion.div key={`w${run}`} className="gen-wait" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <span>{phase === 1 ? 'Generating on this device' : 'Waiting for prompt'}</span>
            <i><motion.b key={`${run}-${phase}`} initial={{ scaleX: 0 }} animate={{ scaleX: phase === 1 ? 1 : 0 }} transition={{ duration: 1.7, ease: 'linear' }} /></i>
          </motion.div>
          : <motion.img key={`i${run}`} src={`/assets/img/home/gen-${f}.webp`} alt={`${prompt}, made on device with ${model}`} width="512" height="512" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: .45 }} />}
        </AnimatePresence>
      </div>
      <div className="gen-strip">{GEN_RUNS.map(([g, m], i) => <img key={g} className={i === run ? 'on' : ''} src={`/assets/img/home/gen-${g}.webp`} alt="" width="512" height="512" />)}<span>No internet. No limits.</span></div>
    </SceneCard>
  </div>;
}

// Vault: locked, the master password going in, then your items. Then it locks again.
const VaultScene = Object.assign(() => <ShotSeq shots={[['vault-locked', 'Off Grid AI Vault, locked.', 1600], ['vault-typing', 'Entering the master password.', 1400], ['vault-open', 'Off Grid AI Vault unlocked: logins, keys and notes.', 3600]]} />, { fill: true });

/* ───────────────────────── Walkthrough: one window, the whole way down ───────────────────────── */

// Loads every screen of a sequence up front so a wipe never reveals an empty frame.
export function Preload({ names }) {
  return <div className="preload" aria-hidden="true" inert>{names.map(n => <Shot key={n} name={n} alt="" lazy={false} />)}</div>;
}

// Real app screens. Each one wipes in left to right; chapters with several screens step through them.
export const WIPE = { duration: .7, ease: [.65, 0, .35, 1] };
// Where the readable result sits in each capture; phones crop to it instead of shrinking the whole app.
const FOCUS = { day: .42, actions: .45, god: .5, entities: .78, meetings: .66, voice: .55, reflect: .5, replay: .45, clipboard: .42, 'vault-locked': .62, 'vault-typing': .62, 'vault-open': .55, 'models-text': .5, 'models-vision': .5, 'models-image': .5, 'models-voice': .5, 'models-transcription': .5, 'models-computer-use': .5 };
export function ShotSeq({ shots, ms = 3200 }) {
  const [i, setI] = useState(0);
  const [n, setN] = useState(0); const { playing } = useContext(PlayCtx);
  const reduce = useReducedMotion();
  useEffect(() => { if (!playing || reduce || shots.length < 2) return; const t = setTimeout(() => { setI(v => (v + 1) % shots.length); setN(v => v + 1); }, shots[i][2] || ms); return () => clearTimeout(t); }, [n, playing, reduce]);
  const [name, alt] = shots[i];
  return <>
    <div className="wt-shot">
      {shots.length > 1 && <Preload names={shots.map(x => x[0])} />}
      <AnimatePresence initial={false}>
        <motion.div key={`${name}-${n}`} style={{ '--fx': FOCUS[name] ?? .5 }} className="wt-shot-in" initial={reduce ? false : { clipPath: 'inset(0 100% 0 0)' }} animate={{ clipPath: 'inset(0 0% 0 0)', transition: reduce ? { duration: 0 } : WIPE }} exit={{ opacity: 1, transition: { delay: reduce ? 0 : .7, duration: 0 } }}>
          <Shot name={name} alt={alt} lazy={false} />
          {!reduce && <motion.i className="wipe-edge" initial={{ left: '0%', opacity: 1 }} animate={{ left: '100%', opacity: [1, 1, 0] }} transition={WIPE} />}
        </motion.div>
      </AnimatePresence>
    </div>

  </>;
}
const shotView = (...shots) => Object.assign(() => <ShotSeq shots={shots} />, { fill: true });
const WALK = [
  { id: 'today', cmd: 'open today', title: 'Your day, already sorted.', line: 'Meetings, to-dos, journal and time spent. Built from what you chose to share.', chips: ['Day', 'Journal', 'Timeline'], loop: 0, View: shotView(['day', 'Off Grid AI Day view with to-dos, journal, meetings and time spent.'], ['actions', 'Off Grid AI Actions: follow-ups pulled from the day.']) },
  { id: 'god', cmd: 'brief me, Ares', title: 'Your God knows your day.', line: 'God is your chief of staff. It knows your accounts, calendar and memory, briefs you, and lines up work for your yes.', chips: ['Briefings', 'Routines', 'Approvals'], loop: 0, View: shotView(['god', 'Off Grid AI God: Ares briefing you, with approvals waiting.'], ['actions', 'Off Grid AI Actions: approvals waiting for your yes.']) },
  { id: 'capture', cmd: 'capture my day', title: 'Your work, captured on your disk.', line: 'Mail, files, chats and meetings. Stored on your disk.', chips: ['Opt in per device', 'On device'], loop: 0, View: shotView(['integrations', 'Off Grid AI Integrations: accounts and tools you choose to connect.', 4000], ['replay', 'Off Grid AI Replay: a captured screen stored on your device.', 4000]) },
  { id: 'remember', cmd: 'remember today', title: 'Your day becomes memory.', line: 'People, projects and dates, sorted for you.', chips: ['Timeline', 'People', 'Projects'], loop: 0, View: shotView(['day', 'Off Grid AI Day: a timeline built from your captured work.', 4000], ['entities', 'Off Grid AI People: related people, companies and projects.', 4000], ['search', 'Off Grid AI Search: find a past decision in your memory.', 4000]) },
  { id: 'people', cmd: 'who is Sam Okafor?', title: 'Your people, already mapped.', line: 'People and companies from your mail, meetings and chats. Always current.', chips: ['People', 'Companies', 'Projects'], loop: 0, View: shotView(['entities', 'Off Grid AI People: Sam Okafor at Acme Corp, with his timeline.'], ['meetings', 'Off Grid AI Meetings: the Acme Corp pilot kickoff with Sam.']) },
  { id: 'reflect', cmd: 'where did my week go?', title: 'Your week, accounted for.', line: 'Time by app, project and person. No timers.', chips: ['Reflect', 'Focus'], loop: 0, View: shotView(['reflect', 'Off Grid AI Reflect: time by app, people and focus.'], ['replay', 'Off Grid AI Replay: scrub back through what you chose to record.']) },
  { id: 'ask', cmd: 'what did I promise Sam?', title: 'Your answers come with sources.', line: 'Every answer shows where it came from.', chips: ['Recall', 'Sources'], loop: 0, View: shotView(['search', 'Off Grid AI Search with relevant memory and source references.', 4000], ['chat', 'Off Grid AI Chat with an answer from your work.', 4000], ['projects', 'Off Grid AI Projects: documents and cited answers.', 4000]) },
  { id: 'act', cmd: 'draft the reply to Sam', title: 'Your yes sends it.', line: 'Nothing goes out without your yes.', chips: ['Actions', 'Approvals', 'Audit log'], loop: 0, View: shotView(['actions', 'Off Grid AI Actions: proposals waiting for approval.', 4000], ['god', 'Off Grid AI God: the briefing and tasks waiting for your decision.', 4000]) },
  { id: 'web', cmd: 'compare note apps on the web', title: 'Your web errands, handled.', line: 'Step by step. You take over for passwords.', chips: ['Web use', 'Computer use', 'Takeover'], loop: 0, View: shotView(['web-plan', 'Off Grid AI Web use: reading and comparing note-app pricing.', 4000], ['web-takeover', 'Off Grid AI Web use: sign-in handed to you.', 4000], ['web-done', 'Off Grid AI Web use: completed task and its result.', 4000]) },
  { id: 'meetings', cmd: 'summarize the design review', title: 'Your meetings become answers.', line: 'Local transcripts, decisions and follow-ups. No bot joins your call.', chips: ['Notetaker', 'Recorder', 'Ask a recording'], loop: 0, View: shotView(['meetings', 'Off Grid AI Meetings with summary, decisions and transcript.'], ['voice', 'Off Grid AI Voice notes with transcripts and to-dos.']) },
  { id: 'phone', cmd: 'send it to my phone', title: 'Your phone picks it up.', line: 'Device to device and encrypted. No Off Grid AI server in between.', chips: ['Pro Sync', 'Shared compute'], loop: 7000, View: ContinueScene },
  { id: 'browser', cmd: 'take over for sign-in', title: 'Your browser, with AI.', line: 'Your AI handles the task. You take over for sign-in and keep your passwords in your vault.', chips: ['Browser tasks', 'Takeover', 'Vault'], loop: 0, View: shotView(['web-takeover', 'Off Grid AI browser task waiting for you to sign in.', 4000], ['vault-open', 'Off Grid AI Vault: your saved logins and secrets.', 4000]) },
  { id: 'vault', cmd: 'unlock my vault', title: 'Your secrets stay yours.', line: 'Encrypted passwords, keys and files. A clipboard you can search.', chips: ['Vault', 'Clipboard'], loop: 0, View: shotView(['vault-locked', 'Off Grid AI Vault: locked.', 2200], ['vault-typing', 'Off Grid AI Vault: entering the master password.', 2200], ['vault-open', 'Off Grid AI Vault: saved logins and notes.', 4000]) },
  { id: 'clipboard', cmd: 'find that link I copied', title: 'Your clipboard remembers.', line: 'Text, links, images and files. One shortcut, from any app.', chips: ['Clipboard', 'Quick open', 'Synced'], loop: 0, View: shotView(['clipboard', 'Off Grid AI Clipboard history with search.']) },
  { id: 'images', cmd: 'make an image', title: 'Your images. Made offline.', line: 'Open image models on your own machine. No credits, no queue.', chips: ['Image generation', 'Vision'], loop: 0, View: shotView(['imagegen-chat', 'Off Grid AI Chat: a generated image and its prompt.', 4000], ['artifacts', 'Off Grid AI Artifacts: saved work and generated results.', 4000]) },
  { id: 'models', cmd: 'download models for this Mac', title: 'Your models. Every kind.', line: 'Text, vision, images, speech and computer use. Downloaded once, then it works with the Wi-Fi off.', chips: ['Text', 'Vision', 'Image', 'Speech', 'Computer use'], loop: 0, View: shotView(['models-text', 'Off Grid AI Models: text models available to download.', 2800], ['models-vision', 'Off Grid AI Models: vision models available to download.', 2800], ['models-image', 'Off Grid AI Models: image models available to download.', 2800], ['models-voice', 'Off Grid AI Models: voice models available to download.', 2800], ['models-transcription', 'Off Grid AI Models: transcription models available to download.', 2800], ['models-computer-use', 'Off Grid AI Models: computer use models available to download.', 2800]) },
  { id: 'api', cmd: 'curl localhost:7878/v1/chat/completions', title: 'Your other apps can use it too.', line: 'An OpenAI-compatible API on your own machine. Chat, images, speech and embeddings.', chips: ['OpenAI-compatible', 'MCP', 'No API key'], loop: 0, View: shotView(['gateway', 'Off Grid AI Gateway: local API endpoints and active models.', 4000]) },
];
const PROMPTS = [
  { id: 'ask', label: 'What did I promise Sam?' }, { id: 'act', label: 'Draft the reply' }, { id: 'phone', label: 'Send it to my phone' },
  { id: 'browser', label: 'Fill my login' }, { id: 'meetings', label: 'Summarize my meeting' },
];
const INTENTS = [[/image|picture|draw|photo/i, 'images'], [/clipboard|copied|paste/i, 'clipboard'], [/brief|ares|god|chief/i, 'god'], [/who is|people|crm|contact/i, 'people'], [/week|time|hours|reflect/i, 'reflect'],[/promise|agree|what did|ask|recall|remember/i, 'ask'], [/draft|reply|email|send.*sam|approve/i, 'act'], [/phone|sync|mobile/i, 'phone'],
  [/login|password|fill|browser|chrome|firefox/i, 'browser'], [/meeting|summar|call|record/i, 'meetings'], [/vault|secret|key/i, 'vault'], [/model|offline|qwen|gemma/i, 'models'], [/web|search|compare|browse/i, 'web'], [/today|day|journal/i, 'today']];

// The hero offers a preset chapter, using the same options as the suggestion row.
function CommandBar({ onRun }) {
  const prompt = PROMPTS[0];
  const open = () => onRun(prompt.id);
  return <div className="cmd-vanish" aria-label="Off Grid AI demo">
    <form onSubmit={(e) => { e.preventDefault(); open(); }}>
      <TextField.Root size="3" value={prompt.label} readOnly aria-label="Open the example chapter" onFocus={open}>
        <TextField.Slot side="right"><Button type="submit" size="sm" aria-label="Open example chapter"><ArrowRight size={16} /></Button></TextField.Slot>
      </TextField.Root>
    </form>
    <p className="cmd-note">Open this example or choose an option below.</p>
  </div>;
}

const HERO = .07;
const STAGE = .5;
const DWELL = { today: 7200, god: 7200, capture: 8600, remember: 12600, people: 7200, reflect: 7200, ask: 12600, act: 8600, web: 12600, meetings: 7200, phone: 6500, browser: 8600, vault: 9000, clipboard: 5200, images: 10400, models: 17400, api: 8200 };
const ROT_WORDS = ['memory.', 'meetings.', 'devices.', 'browser.', 'secrets.'];
export const WALK_LABELS = { today: 'Today', god: 'God', capture: 'Capture', remember: 'Memory', people: 'People', reflect: 'Reflect', ask: 'Ask', act: 'Act', web: 'Web', meetings: 'Meetings', phone: 'Phone', browser: 'Browser', vault: 'Vault', clipboard: 'Clipboard', images: 'Images', models: 'Models', api: 'API' };
export const WALK_ICONS = { god: Sparkle, people: UsersThree, clipboard: ClipboardText, images: ImageSquare, reflect: ChartBar, today: CalendarBlank, capture: Files, remember: ClockCounterClockwise, ask: ChatCircle, act: CheckCircle, web: Globe, meetings: VideoCamera, phone: DeviceMobile, browser: PuzzlePiece, vault: LockKey, models: Cpu, api: TerminalWindow };

function Walkthrough({ reduce, theme }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const N = WALK.length;
  const [ch, setCh] = useState(0); const [rot, setRot] = useState(0); const rotRef = useRef(0); const spin = useRef(null); const settle = useRef(null);
  const [paused, setPaused] = useState(false); const [docked, setDocked] = useState(false); const [q, setQ] = useState('');
  const STEP = 360 / N; const idxOf = (r) => ((Math.round(-r / STEP) % N) + N) % N;
  const wheelBox = useRef(null); const [wz, setWz] = useState(.6); const tabsRef = useRef(null); const tap = useRef(null); const [miss, setMiss] = useState(''); const [inView, setInView] = useState(false); const [hoverI, setHoverI] = useState(-1); const lock = useRef(0); const [manual, setManual] = useState(false); const copyRef = useRef(null); const [copyH, setCopyH] = useState(260);
  const [geo, setGeo] = useState({ d: 380, s: .62, mobile: false, ready: false });
  const view = useRef(null); const heroRef = useRef(null); const beamLayer = useRef(null); const [fit, setFit] = useState(1);
  useEffect(() => {
    const el = view.current; if (!el) return;
    const ro = new ResizeObserver(([e]) => { const { width: w, height: h } = e.contentRect; const mob = innerWidth <= 860; setFit(Math.min(w / (mob ? 432 : 704), h / (mob ? 612 : 524), 1.1)); });
    ro.observe(el); return () => ro.disconnect();
  }, []);
  useEffect(() => {
    const fitWheel = () => { const mob = innerWidth <= 860; const w = wheelBox.current?.parentElement?.clientWidth || 320;
      setWz(mob ? Math.min(.62, (innerWidth - 24) / 680) : Math.max(.36, Math.min(w / 680, (innerHeight - 68 - 170) / 680, .62))); };
    fitWheel(); addEventListener('resize', fitWheel); return () => removeEventListener('resize', fitWheel);
  }, []);
  useEffect(() => {
    const measure = () => {
      const mobile = innerWidth <= 860; const col = Math.min(1200, innerWidth - 48); const vh = innerHeight;
      const heroBottom = 68 + (heroRef.current ? heroRef.current.offsetTop + heroRef.current.offsetHeight : vh * .6) + 28;
      if (mobile) { const ch = copyRef.current ? copyRef.current.offsetHeight : 260; setCopyH(ch); setGeo({ d: heroBottom + 8 - (14 + ch + 10), s: 1, mobile, ready: true }); return; }
      const W = col * .7; const H = Math.min(W * .66, (vh - 68) * .9); const hs = col / W;
      setGeo({ d: Math.max(vh * .62, heroBottom) - (vh * .5 + 34) + (H * hs) / 2, s: hs, mobile, ready: true });
    };
    measure(); addEventListener('resize', measure); const ro = new ResizeObserver(measure); if (copyRef.current) ro.observe(copyRef.current); return () => { removeEventListener('resize', measure); ro.disconnect(); };
  }, []);
  useMotionValueEvent(scrollYProgress, 'change', v => setDocked(v > STAGE * .7));
  const dock = useTransform(scrollYProgress, [0, STAGE], [0, 1]);
  const scale = useTransform(dock, [0, 1], [geo.s, 1]);
  const y = useTransform(dock, [0, 1], [geo.d, 0]);
  const heroFade = useTransform(dock, [0, .55], [1, 0]);
  const heroLift = useTransform(dock, [0, 1], [0, -60]);
  const copyFade = useTransform(dock, [.55, 1], [0, 1]);
  // The wheel turns to a chapter; whatever sits at the top plays in the window.
  const spinTo = useCallback((i, instant) => {
    const cur = rotRef.current; const d = ((((-i * STEP) - cur) % 360) + 540) % 360 - 180; const target = cur + d;
    spin.current?.stop(); clearTimeout(settle.current);
    if (instant || reduce) { rotRef.current = target; setRot(target); setCh(i); return; }
    setCh(i);
    spin.current = animate(cur, target, { duration: .7, ease: [.65, 0, .35, 1], onUpdate: (v) => { rotRef.current = v; setRot(v); } });
  }, [STEP, reduce]);
  // Keep the selected chapter tab in view on phones.
  useEffect(() => { const row = tabsRef.current; const t = row?.querySelector('[aria-pressed="true"]'); if (!t || !row.offsetParent) return; row.scrollTo({ left: t.offsetLeft - (row.clientWidth - t.offsetWidth) / 2, behavior: 'smooth' }); }, [ch]);
  useEffect(() => { const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting)); if (ref.current) io.observe(ref.current); return () => io.disconnect(); }, []);
  // Any drag, key or tap on the wheel means the visitor is driving: autoplay stops for good.
  const onWheel = (r) => { if (performance.now() < lock.current) return; setManual(true); spin.current?.stop(); rotRef.current = r; setRot(r); clearTimeout(settle.current); settle.current = setTimeout(() => setCh(idxOf(rotRef.current)), 160); };
  const dockTop = () => { const el = ref.current; if (!el) return null; return el.getBoundingClientRect().top + scrollY + (el.offsetHeight - innerHeight) * Math.min(1, STAGE * 1.1); };
  const go = useCallback((i) => {
    const n = (i + N) % N;
    if (!docked) { const t = dockTop(); if (t != null) scrollTo({ top: t, behavior: Math.abs(t - scrollY) > innerHeight * 1.5 ? 'instant' : 'smooth' }); spinTo(n, true); return; }
    spinTo(n);
  }, [N, docked, spinTo]);
  const goRef = useRef(go); goRef.current = go;
  const goId = (id) => go(WALK.findIndex(w => w.id === id));
  const linkRef = useRef(null); const linkDone = useRef(false);
  if (linkRef.current === null && typeof window !== 'undefined') linkRef.current = location.hash.slice(1);
  // The URL tracks the chapter, so every step is a shareable link (#ask, #browser, ...).
  useEffect(() => {
    if (!linkDone.current) return;
    const id = docked ? WALK[ch].id : null;
    const want = id ? `#${id}` : '';
    if (location.hash === want || (!id && !WALK.some(w => `#${w.id}` === location.hash))) return;
    history.replaceState(null, '', `${location.pathname}${location.search}${want}`);
  }, [docked, ch]);
  useEffect(() => {
    const id = linkRef.current || ''; const n = WALK.findIndex(w => w.id === id);
    const onHash = () => { const k = WALK.findIndex(w => `#${w.id}` === location.hash); if (k >= 0) goRef.current(k); };
    addEventListener('hashchange', onHash);
    if (n < 0) { linkDone.current = true; return () => removeEventListener('hashchange', onHash); }
    try { history.scrollRestoration = 'manual'; } catch (_) {}
    const t = setTimeout(() => { const top = dockTop(); if (top != null) scrollTo({ top, behavior: 'instant' }); spinTo(n, true); setTimeout(() => { linkDone.current = true; }, 300); }, 350);
    return () => { clearTimeout(t); removeEventListener('hashchange', onHash); };
  }, []);
  const submit = (e) => { e.preventDefault(); const hit = INTENTS.find(([re]) => re.test(q)); setTimeout(() => goId(hit ? hit[1] : 'ask'), 700); };
  // Chapters inside the act advance on their own; hovering the window holds the current one.
  useEffect(() => { if (!docked || !inView || paused || manual || reduce) return; const t = setTimeout(() => spinTo((ch + 1) % N), DWELL[WALK[ch].id] || 7000); return () => clearTimeout(t); }, [docked, inView, paused, manual, ch, reduce, spinTo]);
  const C = WALK[docked ? ch : 0]; const playing = docked && inView && !manual && !paused; const cycle = useCycle(playing ? C.loop : 0);
  const play = { playing, takeOver: () => setManual(true) };
  return <section id="how" className="walk" ref={ref}  aria-labelledby="hero-title">
    <div className="walk-pin" style={{ '--copyH': `${copyH}px` }}>
      {!reduce && <div className="walk-grid" aria-hidden="true"><FlickeringGrid squareSize={3} gridGap={9} maxOpacity={.2} flickerChance={.16} color="rgb(52, 211, 153)" /></div>}
      <div className="walk-igrid"><InteractiveGridPattern width={48} height={48} squares={[40, 24]} className="igrid" squaresClassName="igrid-sq" /></div>

      <motion.div ref={heroRef} inert={docked} className={`walk-hero ${docked ? 'off' : ''}`} style={{ opacity: heroFade, y: heroLift }}>
        <a className="hero-pill" href="#how"><span className="pulse" /><AnimatedShinyText shimmerWidth={140}>Open source · Five platforms · Browser extension in early access</AnimatedShinyText><ArrowRight size={13} /></a>
        <h1 id="hero-title" className="hero-title">
          <TextScramble as="span" duration={.8} speed={.03} characterSet="01/_.:<>">Your AI.</TextScramble>
          <span className="sr-only">Your memory, meetings, devices, browser and secrets.</span>
        </h1>
        <div className="hero-title rot-line" aria-hidden="true"><span className="dim">Your</span>{reduce ? <span className="rot">{ROT_WORDS[0]}</span> : <WordRotate words={ROT_WORDS} duration={2200} className="rot" />}</div>
        <CommandBar onRun={(id) => { setManual(true); goId(id); }} />
        <AISuggestions className="cmd-chips" suggestions={PROMPTS} onSelect={(sug) => { setManual(true); goId(sug.id); }} />
        <div className="hero-proof">
          {[[250000, 'downloads'], [3400, 'GitHub stars'], [600, 'community']].map(([v, l]) => <span key={l}><b><NumberTicker value={v} />+</b> {l}</span>)}
          <span className="hero-plat">{DOWNLOADS.map(d => <PlatformIcon key={d.id} id={d.id} size={14} />)}<PuzzlePiece size={14} aria-label="Browser extension" /></span>
        </div>
      </motion.div>

      <motion.div ref={copyRef} inert={!docked} className={`walk-copy ${docked ? '' : 'off'}`} style={{ opacity: copyFade }}>
        <Kicker>ONE DAY WITH SAM</Kicker>
        <div className="wheel-wrap" ref={wheelBox} style={{ '--wz': wz }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => { setPaused(false); setHoverI(-1); }}
          // The wheel captures the pointer for dragging, so its circles never receive a click. A press and release on the same circle without moving opens that chapter.
          onPointerDownCapture={(e) => { const b = e.target.closest?.('.og-wheel > button'); tap.current = b ? { b, x: e.clientX, y: e.clientY } : null; }}
          onPointerUpCapture={(e) => { const t = tap.current; tap.current = null; if (!t || Math.hypot(e.clientX - t.x, e.clientY - t.y) > 6) return; const i = [...wheelBox.current.querySelectorAll('.og-wheel > button')].indexOf(t.b); if (i >= 0) { setManual(true); setHoverI(-1); lock.current = performance.now() + 700; setTimeout(() => spinTo(i), 0); } }}
          onFocus={(e) => { const b = e.target.closest?.('.og-wheel > button'); if (b) setHoverI([...wheelBox.current.querySelectorAll('.og-wheel > button')].indexOf(b)); }} onBlur={() => setHoverI(-1)}
          onPointerMove={(e) => { if (e.buttons) return; const b = document.elementFromPoint(e.clientX, e.clientY)?.closest?.('.og-wheel > button'); const i = b ? [...wheelBox.current.querySelectorAll('.og-wheel > button')].indexOf(b) : -1; setHoverI(v => (v === i ? v : i)); }}>
          <OrbitalImageWheel className="og-wheel" radius={300} snap rotation={rot} onRotationChange={onWheel} activeId={WALK[ch].id}
            items={WALK.map((w) => ({ id: w.id, image: `/assets/img/home/wheel/${w.id}-${theme}.svg`, alt: w.title, label: `${w.title} ${w.line}` }))} />
          <div className="wheel-center">
            {hoverI >= 0 && hoverI !== ch && <div className="wheel-peek"><span className="walk-count">{String(hoverI + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}</span><b>{WALK[hoverI].title}</b><small>Click to open</small></div>}
            <div className="walk-count"><span>{String(ch + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}</span><i className="ch-rail"><motion.b key={`${ch}-${paused}`} initial={{ scaleX: 0 }} animate={{ scaleX: paused || manual ? 0 : 1 }} transition={{ duration: paused || manual ? .2 : (DWELL[C.id] || 7000) / 1000, ease: 'linear' }} /></i></div>
            <div className="chapter-stack">
              <AnimatePresence initial={false}>
                <motion.div key={C.id} className="chapter-copy" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: .3 }}>
                  <Heading as="h2"><TextAnimate as="span" by="word" animation="slideUp" duration={.4}>{C.title}</TextAnimate></Heading>
                  <Text as="p">{C.line}</Text>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
        <div className="chap-nav">
          <Button variant="outline" size="sm" className="rail-btn" aria-label="Previous chapter" onClick={() => { setManual(true); go(ch - 1); }}><ArrowLeft size={16} /></Button>
          <div className="chap-tabs" role="group" aria-label="Tour chapters" ref={tabsRef}>
            <AnimatedBackground className="rail-tab-hl" defaultValue={WALK[ch].id} onValueChange={(v) => { const k = WALK.findIndex(w => w.id === v); if (k >= 0 && k !== ch) { setManual(true); go(k); } }}>
              {WALK.map((w, k) => { const Icon = WALK_ICONS[w.id]; return <button type="button" key={w.id} data-id={w.id} aria-pressed={k === ch} className="rail-tab chap-tab"><Icon size={14} /> {WALK_LABELS[w.id]}</button>; })}
            </AnimatedBackground>
          </div>
          <Button variant="outline" size="sm" className="rail-btn" aria-label="Next chapter" onClick={() => { setManual(true); go(ch + 1); }}><ArrowRight size={16} /></Button>
        </div>
        <div className="mob-copy" aria-hidden="true"><span className="walk-count">{String(ch + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}</span><AnimatePresence mode="wait" initial={false}><motion.b key={C.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: .25 }}>{C.title}</motion.b></AnimatePresence></div>
        <div className="wheel-hint" style={{ width: `${680 * wz}px` }}>
          <Button variant="outline" size="sm" className="autoplay-btn" aria-pressed={!manual} onClick={() => setManual(m => !m)}>{manual ? <><Play size={12} weight="fill" /> Resume autoplay</> : <><Pause size={12} weight="fill" /> Pause autoplay</>}</Button>
          <span className="hint-desk">Drag to spin, click a chapter, or use ← →.</span><span className="hint-mob">Swipe the dial or tap a chapter.</span>
        </div>
      </motion.div>

      <motion.div className={`wt-window ${geo.ready ? 'is-ready' : ''}`} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} style={{ scale, y }} drag={docked ? 'x' : false} dragConstraints={{ left: 0, right: 0 }} dragElastic={.18}
        onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 60) setManual(true); if (info.offset.x < -60) go(ch + 1); else if (info.offset.x > 60) go(ch - 1); }}>
        <div className="wt-bar">
          <span className="dots"><i /><i /><i /></span>
          <span className="wt-cmd"><span className="cmd-caret">›</span><TypingAnimation key={C.id} as="span" duration={38} delay={150} startOnView={false} showCursor blinkCursor>{C.cmd}</TypingAnimation></span>
          <span className="wt-badge"><LockKey size={11} /> On this device</span>
        </div>
        <PlayCtx.Provider value={play}><BeamLayer.Provider value={beamLayer}>
        <div className="wt-view" ref={view} style={{ '--fit': fit }}>
          <DotPattern width={18} height={18} cr={1} className="wt-dots" />
          <AnimatePresence initial={false}>
            <motion.div key={`${C.id}-${cycle}`} className="wt-scene" initial={{ opacity: 0, scale: .985 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: .4 }}>
              {C.View.fill ? <C.View /> : <div className="wt-canvas"><C.View /></div>}
            </motion.div>
          </AnimatePresence>
          <div className="beam-layer" ref={beamLayer} aria-hidden="true" />
        </div>
        </BeamLayer.Provider></PlayCtx.Provider>
      </motion.div>
    </div>
    <div className="sr-only">{WALK.map(w => <div key={w.id}><h3>{w.title}</h3><p>{w.line}</p></div>)}</div>
  </section>;
}

/* ───────────────────────── Privacy ───────────────────────── */

const SAMPLE_PROMPTS = ['Summarize my blood test results', 'Review this NDA before I sign it', 'Compare these two salary offers', 'Draft a reply to my landlord about the deposit'];
function PrivLane({ local, prompt, n }) {
  const box = useRef(null); const a = useRef(null); const b = useRef(null); const c = useRef(null);
  const nodes = local ? [[ChatCircle, 'Your prompt', a], [Cpu, 'Your chip', b], [CheckCircle, 'Your answer', c]] : [[ChatCircle, 'Your prompt', a], [Globe, 'The internet', b], [HardDrives, 'Their servers', c]];
  const log = local ? [['PROCESSED', 'on your own devices'], ['STORED', 'on your own devices'], ['THIRD PARTIES', 'none receive it'], ['ANSWER', 'stays with you']]
    : [['SENT', "to the provider's servers"], ['LOGGED', `"${prompt}"`], ['STORED', 'per their retention policy'], ['TRAINING', 'depends on the provider']];
  return <SceneCard className={`plane ${local ? 'plane-local' : ''}`} busy={local}>
    <div className="plane-head"><Kicker>{local ? 'OFF GRID AI' : 'CLOUD AI SERVICE'}</Kicker><span className="plane-count">{local ? 'Stays on your devices' : 'Leaves your device'}</span></div>
    {local ? <div className="lane-viz lane-local">
      <DotPattern width={10} height={10} cr={.8} className="local-dots" />
      <span className="map-tag"><LockKey size={12} /> Your prompt, between your own devices</span>
      <div className="dev-pair" ref={box}>
      <span className="dev-ic" ref={a}><DeviceMobile size={26} /></span>
      <span className="dev-ic" ref={b}><Laptop size={30} /></span>
      {[[0, false], [.95, false], [1.9, false], [.45, true], [1.4, true]].map(([d, r], k) => <AnimatedBeam key={`b${n}-${k}`} containerRef={box} fromRef={a} toRef={b} curvature={-26} reverse={r} duration={2.8} delay={d} repeatDelay={0} pathWidth={3} pathColor={k ? 'transparent' : 'var(--og-primary)'} pathOpacity={.18} gradientStartColor="#34D399" gradientStopColor="#059669" />)}
      </div>
    </div>
    : <div className="lane-viz lane-map">
      <DottedMap key={n} width={150} height={75} mapSamples={4200} dotRadius={.22} markerColor="#a3a3a3" pulse
        markers={[{ lat: 19.07, lng: 72.87, size: .9 }, { lat: 39.04, lng: -77.49, size: .7, pulse: true }, { lat: 45.6, lng: -121.18, size: .7, pulse: true }, { lat: 53.35, lng: -6.26, size: .7, pulse: true }, { lat: 1.35, lng: 103.82, size: .7, pulse: true }]} className="map-svg" />
      <span className="map-tag"><Globe size={12} /> Your prompt, copied to their data centers</span>
    </div>}
    <AnimatedList key={n} delay={450} className="plog">
      {log.map(([k, v]) => <div className="plog-row" key={k}><b>{k}</b><span>{v}</span>{local ? <Check size={13} /> : <X size={13} />}</div>)}
    </AnimatedList>
  </SceneCard>;
}

export function useNarrow(px = 860) {
  const [n, setN] = useState(false);
  useEffect(() => { const m = matchMedia(`(max-width: ${px}px)`); const f = () => setN(m.matches); f(); m.addEventListener('change', f); return () => m.removeEventListener('change', f); }, [px]);
  return n;
}
// Phones get a swipeable row (Motion Primitives Carousel) with named tabs and previous/next;
// wider screens keep the grid.
export function MobileRail({ className, start = 0, labels, children }) {
  const narrow = useNarrow();
  const items = React.Children.toArray(children);
  const [i, setI] = useState(start);
  if (!narrow) return <div className={className}>{items}</div>;
  return <div className="og-rail">
    {labels && <div className="rail-tabs" role="group" aria-label="Choose a card"><AnimatedBackground className="rail-tab-hl" defaultValue={String(i)} onValueChange={(v) => v != null && setI(Number(v))}>
      {labels.map((l, k) => <button type="button" key={l} data-id={String(k)} aria-pressed={k === i} className="rail-tab">{l}</button>)}
    </AnimatedBackground></div>}
    <Carousel className="rail-carousel" index={i} onIndexChange={setI}><CarouselContent className="rail-track">
      {items.map((c, k) => <CarouselItem key={k} className="rail-item"><div inert={k !== i} aria-hidden={k !== i}>{c}</div></CarouselItem>)}
    </CarouselContent>
      <div className="rail-ctl">
        <Button variant="outline" size="sm" className="rail-btn" aria-label="Previous" disabled={i === 0} onClick={() => setI(Math.max(0, i - 1))}><ArrowLeft size={16} /></Button>
        <div className="dots-wrap" aria-hidden="true"><CarouselIndicator className="planes-dots" /></div>
        <Button variant="outline" size="sm" className="rail-btn" aria-label="Next" disabled={i === items.length - 1} onClick={() => setI(Math.min(items.length - 1, i + 1))}><ArrowRight size={16} /></Button>
      </div>
    </Carousel>
  </div>;
}
function PrivacySection() {
  const narrow = useNarrow();
  const [prompt, setPrompt] = useState(SAMPLE_PROMPTS[0]); const [n, setN] = useState(0); const [draft, setDraft] = useState('');
  // Samples rotate only while the section is on screen and until the visitor submits their own prompt.
  const box = useRef(null); const [seen, setSeen] = useState(false); const [held, setHeld] = useState(false);
  useEffect(() => { const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting)); if (box.current) io.observe(box.current); return () => io.disconnect(); }, []);
  const auto = useCycle(seen && !held ? 7000 : 0);
  useEffect(() => { if (auto) { setPrompt(SAMPLE_PROMPTS[auto % SAMPLE_PROMPTS.length]); setN(v => v + 1); } }, [auto]);
  useEffect(() => { const root = box.current?.querySelector('.priv-input'); root?.querySelector('input')?.setAttribute('aria-label', 'Type a private question for the illustration'); root?.querySelector('button')?.setAttribute('aria-label', 'Show where it goes'); }, []);
  const send = (e) => { e.preventDefault(); if (!draft.trim()) return; setPrompt(draft.trim().slice(0, 64)); setN(v => v + 1); setHeld(true); };
  return <section id="private" className="chapter" aria-labelledby="priv-heading" ref={box}><div className="section-shell">
    <BlurFade blur="0px" inView inViewMargin="-80px" className="sec-head"><Kicker>WHERE YOUR DATA GOES</Kicker><Title id="priv-heading" lead="Type something private." dim="Watch where it goes." /><Lede>An illustration. Same question, two places to send it.</Lede></BlurFade>
    <div className="priv-input"><PlaceholdersAndVanishInput placeholders={SAMPLE_PROMPTS} onChange={(e) => setDraft(e.target.value)} onSubmit={send} /></div>
    <MobileRail className="planes" labels={['Cloud AI', 'Off Grid AI']} start={1}>
      <PrivLane prompt={prompt} n={n} />
      <PrivLane local prompt={prompt} n={n} />
    </MobileRail>
  </div></section>;
}

/* ───────────────────────── Page ───────────────────────── */

function useSectionHash(ids) {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting && location.hash !== `#${e.target.id}`) history.replaceState(null, '', `#${e.target.id}`); });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
    ids.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
}

export const ThemeCtx = createContext('dark');
// Whether the tour is playing on its own; scenes and screen sequences hold still when it isn't.
export const PlayCtx = createContext({ playing: true, takeOver: () => {} });
// Every page: theme handling, header, main, footer. Pages pass their sections as children.
// "Did this land?" (same storage key and PostHog event as the old layout) and the
// creator newsletter (same identify + newsletter_signup capture as the old sidebar form).
export function DocEnd() {
  const [reaction, setReaction] = useState(null);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(['', '']);
  const [ctx, setCtx] = useState({ slug: '', title: '' });
  useEffect(() => {
    const slug = window.location.pathname;
    const el = document.querySelector('[data-page-title]');
    setCtx({ slug, title: el ? el.getAttribute('data-page-title') : document.title });
    try { const saved = localStorage.getItem('reaction:' + slug); if (saved) setReaction(saved); } catch (_) {}
  }, []);
  const react = (r) => {
    if (reaction === r) return;
    setReaction(r);
    try { localStorage.setItem('reaction:' + ctx.slug, r); } catch (_) {}
    if (typeof posthog !== 'undefined') posthog.capture('page_reaction', { slug: ctx.slug, reaction: r, title: ctx.title });
  };
  const subscribe = (e) => {
    e.preventDefault();
    const value = email.trim();
    if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) { setStatus(['Enter a valid email address.', 'error']); return; }
    if (typeof posthog !== 'undefined') {
      posthog.identify(value, { email: value });
      posthog.capture('newsletter_signup', { email: value, source: window.location.pathname });
    }
    setEmail(''); setStatus(['You\'re in. Updates on their way.', 'success']);
  };
  return <section className="doc-end" aria-label="Feedback and updates" data-pagefind-ignore>
    <div className="doc-end-in">
      <div className="doc-react">
        <Kicker>DID THIS LAND?</Kicker>
        <div className="doc-react-row">
          <Button variant={reaction === 'agree' ? 'soft' : 'outline'} size="icon" aria-pressed={reaction === 'agree'} aria-label="Agree with this" onClick={() => react('agree')}><ThumbsUp size={18} weight={reaction === 'agree' ? 'fill' : 'regular'} /></Button>
          <Button variant={reaction === 'disagree' ? 'soft' : 'outline'} size="icon" aria-pressed={reaction === 'disagree'} aria-label="Disagree with this" onClick={() => react('disagree')}><ThumbsDown size={18} weight={reaction === 'disagree' ? 'fill' : 'regular'} /></Button>
          <span className="doc-react-thanks" aria-live="polite">{reaction ? (reaction === 'agree' ? 'Glad it landed.' : 'Thanks for the feedback.') : ''}</span>
        </div>
      </div>
      <form className="doc-news" onSubmit={subscribe} noValidate>
        <Kicker>UPDATES FROM THE CREATOR</Kicker>
        <div className="doc-news-row">
          <TextField.Root className="doc-news-input" type="email" name="email" required aria-invalid={status[1] === 'error'} size="3" placeholder="your@email.com" autoComplete="email" aria-label="Email address" value={email} onChange={(e) => setEmail(e.target.value)} disabled={status[1] === 'success'}>
            <TextField.Slot><EnvelopeSimple size={16} /></TextField.Slot>
          </TextField.Root>
          <Button type="submit" className="doc-news-btn" disabled={status[1] === 'success'}>Subscribe</Button>
        </div>
        <p className={`doc-news-status ${status[1]}`} aria-live="polite">{status[0]}</p>
      </form>
    </div>
  </section>;
}

export function PageShell({ children, feedback = true }) {
  const [theme, setTheme] = useState('dark');
  const reduce = useReducedMotion();
  useEffect(() => {
    const sync = () => setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
    sync();
    const pref = window.matchMedia('(prefers-color-scheme: dark)');
    const follow = () => {
      let saved; try { saved = localStorage.getItem('theme'); } catch (_) {}
      if (saved === 'dark' || saved === 'light') return;
      apply(pref.matches ? 'dark' : 'light'); sync();
    };
    pref.addEventListener('change', follow);
    return () => pref.removeEventListener('change', follow);
  }, []);
  const apply = (next) => {
    const el = document.documentElement;
    el.dataset.theme = next; el.classList.toggle('dark', next === 'dark'); el.classList.toggle('light', next === 'light'); el.style.colorScheme = next;
  };
  const changeTheme = (next) => { apply(next); setTheme(next); try { localStorage.setItem('theme', next); } catch (_) {} };

  return <MotionConfig reducedMotion="user"><Theme appearance="inherit" accentColor="green" grayColor="gray" radius="small" className="offgrid-page">
    <a className="skip-link" href="#main">Skip to content</a>
    <ScrollProgress className="h-0.5 z-[100] from-(--og-primary-dark) via-(--og-primary) to-(--og-primary-light)" />
    <header className="site-header"><div className="header-inner">
      <a className="wordmark" href="/" aria-label="Off Grid AI home"><Logo size={30} /><span>Off Grid AI</span></a>
      <nav className="desktop-nav" aria-label="Main navigation"><AnimatedBackground enableHover className="nav-hover">{NAV.map(([label, href]) => <a data-id={href} key={href} href={href}>{label}</a>)}</AnimatedBackground></nav>
      <div className="header-actions">
        <a className="icon-link hide-sm" href="https://github.com/off-grid-ai" target="_blank" rel="noopener" aria-label="Off Grid AI on GitHub"><GithubLogo size={18} /></a>
        <span className="theme-ctl"><ThemeToggle variant="sun-moon" size="sm" showSystem={false} theme={theme} onThemeChange={changeTheme} /></span>
        <Button asChild variant="outline" className="header-pro hide-sm"><a href="/pro/#buy">Get Pro</a></Button>
        <Button asChild className="header-download"><a href="/download/">Download</a></Button>
        <Dialog.Root><Dialog.Trigger asChild><Button variant="ghost" className="menu-trigger" aria-label="Open navigation"><List size={22} /></Button></Dialog.Trigger>
          <Dialog.Portal><Dialog.Overlay className="nav-overlay" /><Dialog.Content className="mobile-nav">
            <Dialog.Title className="eyebrow">OFF GRID AI</Dialog.Title><Dialog.Description className="sr-only">Site navigation</Dialog.Description>
            <Dialog.Close asChild><Button variant="ghost" className="nav-close" aria-label="Close navigation"><X size={22} /></Button></Dialog.Close>
            <nav aria-label="Mobile navigation">{MENU.map(([label, href]) => <Dialog.Close asChild key={href}><a href={href}>{label}<ArrowUpRight size={20} /></a></Dialog.Close>)}</nav>
          </Dialog.Content></Dialog.Portal>
        </Dialog.Root>
      </div>
    </div></header>

    <main id="main" tabIndex={-1}><ThemeCtx.Provider value={theme}>{children}</ThemeCtx.Provider></main>

    {feedback && <div className="section-shell page-feedback"><DocEnd /></div>}
    <footer className="site-footer"><div className="section-shell">
      <div className="footer-top"><a className="wordmark" href="/"><Logo size={30} /><span>Off Grid AI</span></a><Text as="p">Your personal AI.<br />On hardware you already own.</Text></div>
      <div className="footer-links">
        {FOOTER.map(([head, links]) => <div key={head}><Kicker>{head}</Kicker><div className="foot-col"><AnimatedBackground enableHover className="foot-hover">{links.map(([l, h]) => <a key={h} data-id={h} href={h} {...(h.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}>{l}</a>)}</AnimatedBackground></div></div>)}
      </div>
      <div className="footer-bottom"><span>Off Grid AI is built by <a href="https://www.wednesday.is/" target="_blank" rel="noopener">Wednesday Solutions</a></span><span><a href="/privacy/">Privacy</a> · <a href="/terms/">Terms</a></span></div>
    </div></footer>
  </Theme></MotionConfig>;
}

export default function PreviewPage({ pricing }) {
  useSectionHash(['private', 'pricing', 'download']);
  return <PageShell><HomeSections pricing={pricing} /></PageShell>;
}
function HomeSections({ pricing }) {
  const theme = useContext(ThemeCtx); const reduce = useReducedMotion();
  return <>
      <Walkthrough reduce={reduce} theme={theme} />
      <section className="models-band" aria-label="Models you can run">
        <ScrollVelocityContainer className="models-vel">
          <ScrollVelocityRow baseVelocity={3} direction={1}>{MODELS.slice(0, 6).map(([n, k, m]) => <ModelChip key={n} name={n} kind={k} maker={m} />)}</ScrollVelocityRow>
          <ScrollVelocityRow baseVelocity={3} direction={-1}>{MODELS.slice(6).map(([n, k, m]) => <ModelChip key={n} name={n} kind={k} maker={m} />)}</ScrollVelocityRow>
        </ScrollVelocityContainer>
      </section>
      <PrivacySection />
      <section className="manifesto" aria-label="Why local"><p className="sr-only">Cloud AI keeps your data on their computer. Off Grid AI keeps it on yours.</p><div aria-hidden="true"><TextReveal className="reveal">Cloud AI keeps your data on their computer. Off Grid AI keeps it on yours.</TextReveal></div></section>

      {/* Pricing: Radix cards, Magic UI border beam on the recommended plan. */}
      <section id="pricing" className="chapter" aria-labelledby="price-heading"><div className="section-shell">
        <BlurFade blur="0px" inView inViewMargin="-80px" className="sec-head"><Kicker>PRICING</Kicker><Heading as="h2" id="price-heading"><span className="t-line">Start free.</span><span className="t-line t-dim">Own Pro <Highlighter action="underline" color="#34D399" strokeWidth={2} padding={2} isView>forever</Highlighter>, or go monthly.</span></Heading></BlurFade>
        <MobileRail className="plans" start={1} labels={['Free', 'Lifetime', 'Monthly']}>
          <SceneCard className="plan-card"><div className="plan"><Kicker>LOCAL AI</Kicker><Heading as="h3">Free</Heading><div className="price"><span className="amt">$0</span><small>forever</small></div>
            <ul>{['Local models', 'Files, voice, images', 'Offline', 'No account'].map(x => <li key={x}><Check size={14} />{x}</li>)}</ul>
            <Button asChild variant="outline" size="lg" className="plan-btn"><a href="/download/">Download free</a></Button></div></SceneCard>
          <SceneCard className="plan-card plan-card-hero" busy><div className="plan plan-hero"><Kicker>BEST VALUE · ONE PAYMENT</Kicker><Heading as="h3">Pro lifetime</Heading><div className="price"><span className="amt">${pricing.lifetime}</span><small>once</small></div>
            <ul>{['Memory and search', 'Actions you approve', 'Sync', `${pricing.devices} devices`].map(x => <li key={x}><Check size={14} />{x}</li>)}</ul>
            <ShimmerButton className="pro-shimmer" shimmerColor="#6EE7B7" shimmerSize="0.08em" borderRadius="8px" shimmerDuration="2.6s" background="var(--og-primary)" onClick={() => { window.OffGridAnalytics?.capture('cta_click', { label: `Own Pro for $${pricing.lifetime}`, href: '/pro/#buy', page: location.pathname }); location.href = '/pro/#buy'; }}>Own Pro for ${pricing.lifetime}</ShimmerButton>
            <Text as="p" className="small">Price rises as we grow.</Text></div></SceneCard>
          <SceneCard className="plan-card"><div className="plan"><Kicker>FLEXIBLE</Kicker><Heading as="h3">Pro monthly</Heading><div className="price"><span className="amt">${pricing.monthly}</span><small>/ month</small></div>
            <ul>{['Every Pro feature', 'Cancel any time'].map(x => <li key={x}><Check size={14} />{x}</li>)}</ul>
            <Button asChild variant="outline" size="lg" className="plan-btn"><a href="/pro/?plan=monthly#buy">Start Pro monthly</a></Button></div></SceneCard>
        </MobileRail>
        <Text as="p" className="fine"><a href="/pro/">Full terms</a></Text>
      </div></section>

      {/* Explore: SmoothUI tilt cards over Radix cards. */}
      <section className="chapter sec-explore" aria-labelledby="explore-heading"><div className="section-shell">
        <BlurFade blur="0px" inView inViewMargin="-80px" className="sec-head"><Kicker>WHAT COMES NEXT</Kicker><Title id="explore-heading" lead="Build it with us."  /></BlurFade>
        <MobileRail className="explore" labels={['Partners', 'Hardware', 'Recorder']}>
          <Card asChild className="ex" size="3"><a href="/design-partners/" data-analytics-event="design_partner_offer_clicked" data-analytics-view="design_partner_offer_viewed" data-analytics-placement="home_card">
            <Badge variant="outline">Teams under 50 people</Badge><div className="ex-mark">[ your team ]<br /><span>+ Off Grid AI</span></div><Heading as="h3">Build it with us. Pay $0.</Heading><Text as="p">Teams under 50.</Text><span className="ex-link">See the design partner offer <ArrowRight size={15} /></span></a></Card>
          <Card asChild className="ex" size="3"><a href="/ogap/">
            <Badge variant="outline">Hardware · Prototype</Badge><img className="theme-dark" src="/assets/img/ogap/website-v2/hero-ecosystem-dark-mobile.webp" alt="OGAP frame with cooling module and battery for an existing phone." width="768" height="512" loading="lazy" /><img className="theme-light" src="/assets/img/ogap/website-v2/hero-ecosystem-light-mobile.webp" alt="" data-alt="OGAP frame with cooling module and battery for an existing phone." width="768" height="512" loading="lazy"  aria-hidden="true" /><Heading as="h3">More from your phone.</Heading><Text as="p">Cooling and power for bigger models.</Text><span className="ex-link">See the hardware <ArrowRight size={15} /></span></a></Card>
          <Card asChild className="ex" size="3"><a href="/mobile/recorder/">
            <Badge variant="outline">Private alpha · Cohort full</Badge><div className="ex-mark ex-ic"><Microphone size={56} weight="thin" /></div><Heading as="h3">Keep the conversation.</Heading><Text as="p">Meetings, recorded on your phone.</Text><span className="ex-link">See Recorder status <ArrowRight size={15} /></span></a></Card>
        </MobileRail>
        <nav className="learn" aria-label="Learn more"><AnimatedBackground enableHover className="learn-hover">{[['Quick start', '/quick-start/'], ['Guides', '/guides/'], ['Articles', '/articles/'], ['Writing', '/writing/'], ['Ethos', '/ethos/'], ['Mission', '/mission/'], ['Vision', '/vision/']].map(([l, h]) => <a key={h} data-id={h} href={h}>{l}<ArrowUpRight size={13} /></a>)}</AnimatedBackground></nav>
      </div></section>

      {/* Closing: Magic UI ripple. */}
      <section id="download" className="has-bg final" aria-labelledby="final-heading"><SectionBg />
        
        <div className="section-shell final-in">
          <Kicker>YOUR INTELLIGENCE. WITH YOU.</Kicker>
          <Heading as="h2" id="final-heading" className="final-h"><TextAnimate as="span" by="word" animation="slideUp" once startOnView duration={.8}>Here. It's yours.</TextAnimate></Heading>
          <Text as="p" className="final-lede">Free. Five platforms. Chrome and Firefox.</Text>
          <div className="dl-grid">{DOWNLOADS.map(d => <a className="dl" key={d.id} href={d.href} {...(d.external ? { target: '_blank', rel: 'noopener' } : {})}><PlatformIcon id={d.id} size={22} /><span><small>{d.small}</small>{d.label}</span></a>)}</div>
          <Text as="p" className="fine"><a href="/quick-start/">Quick start</a> · <a href="/guides/which-model/">Which model should I use?</a> · <a href="/download/">All downloads and betas</a></Text>
        </div>
      </section>
  </>;
}
