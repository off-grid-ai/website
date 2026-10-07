import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Theme, Card, Badge, Box, Flex, Text, Heading, Link } from '@radix-ui/themes';
import * as Dialog from '@radix-ui/react-dialog';
import {
  ArrowUpRight, ArrowRight, ArrowDown, ArrowLeft, Check, List, X, GithubLogo, EnvelopeSimple, FilePdf, ChatsCircle,
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
export const MODELS = [
  ['Qwen 3.8', 'Text'], ['Gemma 4', 'Vision'], ['Muse Glimmer 30B', 'Vision'], ['Bonsai 2 27B', 'Vision'],
  ['Nemotron 3.5 Lightning', 'Text'], ['Qwen3-VL', 'Vision'], ['Holo 3.1', 'Computer use'], ['Whisper Large v3 Turbo', 'Speech'],
  ['Parakeet TDT', 'Speech'], ['Kokoro', 'Voice'], ['Qwen-Image 2.1', 'Image'], ['Z-Image Turbo', 'Image'],
];
export const GENERATED = [['dreamshaper', 'DreamShaper XL'], ['juggernaut', 'Juggernaut XL'], ['realvis', 'RealVisXL'], ['illustrious', 'Illustrious XL'], ['realvis-lightning', 'RealVisXL Lightning']];
export const NAV = [['How it works', '/#how'], ['Privacy', '/#private'], ['Pro', '/pro/'], ['Pricing', '/#pricing'], ['Guides', '/guides/']];

// Real app screens, captured from the seeded desktop build in both themes.
export const SHOT_V = '20261007e';
export function Shot({ name, alt, className = '', lazy = true }) {
  const props = { width: 1760, height: 944, alt, loading: lazy ? 'lazy' : undefined, sizes: '(max-width: 860px) 900px, 70vw' };
  const set = (t) => `/assets/img/home/app/${name}-${t}-1760.webp?v=${SHOT_V} 1760w, /assets/img/home/app/${name}-${t}.webp?v=${SHOT_V} 3520w`;
  return <>
    <img className={`shot shot-dark ${className}`} src={`/assets/img/home/app/${name}-dark-1760.webp?v=${SHOT_V}`} srcSet={set('dark')} {...props} />
    <img className={`shot shot-light ${className}`} src={`/assets/img/home/app/${name}-light-1760.webp?v=${SHOT_V}`} srcSet={set('light')} {...props} alt="" aria-hidden="true" />
  </>;
}

// Replays a looping demo: the returned key changes every `ms` while mounted.
export function useCycle(ms) {
  const [n, setN] = useState(0);
  useEffect(() => { if (!ms) return; const t = setInterval(() => setN(v => v + 1), ms); return () => clearInterval(t); }, [ms]);
  return n;
}

// Opening screen: the product frame rises and settles as the page scrolls (transform + opacity).
function HeroReveal({ title, children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, .5], [.94, 1]);
  const y = useTransform(scrollYProgress, [0, .5], [40, 0]);
  const fade = useTransform(scrollYProgress, [0, .35], [1, 0]);
  return <div ref={ref} className="hero-inner">
    <motion.div style={{ opacity: fade }}>{title}</motion.div>
    <motion.div className="hero-frame" style={{ scale, y }}>{children}</motion.div>
  </div>;
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
  ['PRODUCT', [['Desktop', '/desktop/'], ['Mobile', '/mobile/'], ['Pro', '/pro/'], ['Download', '/download/'], ['Hardware', '/ogap/']]],
  ['LEARN', [['Quick start', '/quick-start/'], ['Guides', '/guides/'], ['Articles', '/articles/'], ['Writing', '/writing/']]],
  ['IDEAS', [['Ethos', '/ethos/'], ['Mission', '/mission/'], ['Vision', '/vision/'], ['Design partners', '/design-partners/']]],
  ['CONNECT', [['GitHub', 'https://github.com/off-grid-ai'], ['Slack community', SLACK], ['Reddit', 'https://www.reddit.com/r/off_grid_ai/'], ['Support', 'mailto:support@offgridmobileai.co']]],
];

/* ───────────────────────── Story chapters ───────────────────────── */

const CHAPTERS = [
  { kicker: '01 · Capture', title: 'It sees what you share.', text: 'Mail, files, chats, meetings. On your disk.' },
  { kicker: '02 · Remember', title: 'Your day becomes memory.', text: 'People, projects and dates, sorted for you.' },
  { kicker: '03 · Ask', title: 'Ask. Get the answer and the source.', text: 'Every answer shows where it came from.' },
  { kicker: '04 · Act', title: 'It drafts. You approve.', text: 'Nothing goes out without your yes.' },
  { kicker: '05 · Continue', title: 'Pick it up on your phone.', text: 'Device to device. Encrypted. No server.' },
];
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
  const [k, setK] = useState(0); const [auto, setAuto] = useState(undefined);
  const burst = useRef(null);
  useEffect(() => { setAuto(undefined); const t = setTimeout(() => setAuto('send'), 3200); return () => clearTimeout(t); }, [k]);
  useEffect(() => { if (auto === 'send') burst.current?.fire({ particleCount: 70, spread: 70, startVelocity: 28, origin: { y: .75 }, colors: ['#34D399', '#10B981', '#6EE7B7'] }); }, [auto]);
  return <div className="scene scene-act">
    <Confetti ref={burst} manualstart className="act-confetti" />
    <SceneCard busy={!auto}>
      <Flex justify="between" align="center" className="app-head"><Text className="eyebrow">OFF GRID SUGGESTS</Text><Badge variant="outline">Email draft</Badge></Flex>
      <dl className="draft"><dt>To</dt><dd>Sam Okafor</dd><dt>Subject</dt><dd>Acme Corp pilot moves to 14 November</dd></dl>
      <p className="draft-body"><span className="draft-from"><ChatCircle size={11} /> From your answer in Ask</span><TypingAnimation key={k} as="span" duration={14} startOnView={false} showCursor={false}>Hi Sam, confirming today's sync: the pilot moves to 14 November, 40 seats stay at the current price, and the revised rollout plan reaches you by Friday.</TypingAnimation></p>
      <AIApproval key={`${k}-${auto || 'open'}`} resolvedId={auto} question="Send this reply to Sam?" options={[{ id: 'send', label: 'Approve and send', detail: 'Logged on this device' }, { id: 'edit', label: 'Edit first', detail: 'Opens the draft' }, { id: 'later', label: 'Not now', detail: 'Keep as a suggestion' }]}>
        <Text>Try it. Nothing is sent.</Text>
      </AIApproval>
      <button type="button" className="text-btn" onClick={() => setK(k + 1)}>Reset <ArrowRight size={13} /></button>
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
  return <div className="scene scene-continue" ref={box}>
    <SceneCard className="sync-card" innerRef={desk} busy>
      <Flex justify="between" align="center" className="app-head"><Text className="eyebrow">DESKTOP</Text><Badge variant="outline"><LockKey size={11} /> Pro Sync</Badge></Flex>
      <div className="sync-rows">{SYNCED.map((it, i) => <motion.div className="sync-row" key={it.title} initial={{ opacity: .35 }} animate={{ opacity: 1 }} transition={{ delay: .4 + i * .7 }}>
        <span className="tl-ic"><it.Icon size={15} /></span><span className="sync-t">{it.title}</span>
        <motion.span className="sync-ok" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: .9 + i * .7, type: 'spring', stiffness: 420, damping: 22 }}><Check size={13} weight="bold" /></motion.span>
      </motion.div>)}</div>
    </SceneCard>
    <div className="dev-phone" ref={phone}>
      <Iphone />
      <div className="phone-live">
        <div className="phone-status"><span>18:53</span><span><LockKey size={10} /> Synced</span></div>
        <div className="phone-title">Acme Corp</div>
        <AnimatedList delay={700} className="phone-list">
          {SYNCED.map(it => <div className="notif" key={it.title}><span className="notif-ic"><it.Icon size={14} /></span><span className="notif-tx"><b>{it.title}</b><small>{it.meta}</small></span></div>)}
        </AnimatedList>
      </div>
    </div>
    <span className="sync-tag"><LockKey size={13} /> Device to device · no server</span>
    <Beam containerRef={box} fromRef={desk} toRef={phone} curvature={0} duration={2.2} pathWidth={2} pathColor="var(--og-text-muted)" pathOpacity={.18} gradientStartColor="var(--og-primary)" gradientStopColor="var(--og-primary-light)" />
  </div>;
}
const SCENES = [CaptureScene, RememberScene, AskScene, ActScene, ContinueScene];

function Story() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const [chapter, setChapter] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', v => setChapter(Math.min(CHAPTERS.length - 1, Math.floor(v * CHAPTERS.length * .999))));
  const fill = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const go = (i) => {
    const el = ref.current; if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + span * ((i + .5) / CHAPTERS.length), behavior: 'smooth' });
  };
  const Scene = SCENES[chapter];
  const cycle = useCycle([0, 7000, 9000, 7000, 7000][chapter]);
  return <section id="how" className="story" ref={ref} aria-labelledby="how-heading">
    <div className="story-pin">
      <div className="story-copy">
        <span id="how-heading"><Kicker>HOW IT WORKS · ONE DAY WITH SAM</Kicker></span>
        <ol className="steps" aria-label="Chapters">
          {CHAPTERS.map((c, i) => <li key={c.kicker}><button type="button" aria-current={i === chapter ? 'step' : undefined} onClick={() => go(i)}><span>{c.kicker.split(' · ')[0]}</span>{c.kicker.split(' · ')[1]}</button></li>)}
        </ol>
        <div className="rail" aria-hidden="true"><motion.i style={{ width: fill }} /></div>
        <div className="chapter-stack">
          <AnimatePresence initial={false}>
            <motion.div key={chapter} className="chapter-copy" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: .4, ease: [.2, .8, .2, 1] }}>
              <Heading as="h2"><TextAnimate as="span" by="word" animation="slideUp" duration={.5}>{CHAPTERS[chapter].title}</TextAnimate></Heading>
              <TextAnimate as="p" by="word" animation="fadeIn" delay={.15} duration={.5}>{CHAPTERS[chapter].text}</TextAnimate>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="story-stage">
        <AnimatePresence initial={false}>
          <motion.div key={chapter} className="stage-inner" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} transition={{ duration: .4, ease: [.2, .8, .2, 1] }}>
            <motion.div key={cycle} className="scene-cycle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .35 }}><Scene /></motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
    <div className="sr-only">{CHAPTERS.map(c => <div key={c.kicker}><h3>{c.kicker}: {c.title}</h3><p>{c.text}</p></div>)}</div>
  </section>;
}


/* ───────────────────────── Web use (real Agentic Studio screens) ───────────────────────── */

const AGENT = [
  { id: 'plan', label: 'It plans', image: '/assets/img/home/agent-04g-plan.webp', alt: 'Off Grid AI Tasks: a web task broken into steps with the reasoning for each one.' },
  { id: 'turn', label: 'You take over', image: '/assets/img/home/agent-04b-web-use-pointer-and-takeover.webp', alt: 'Off Grid AI Tasks waiting for you: confirm the protected account step yourself. Off Grid AI does not read your password or codes.' },
  { id: 'live', label: 'It finishes', image: '/assets/img/home/agent-04d-complete.webp', alt: 'Off Grid AI Tasks: the web task resumed after your step and completed.' },
];
function AgentSection() {
  const [tab, setTab] = useState('turn');
  const item = AGENT.find(a => a.id === tab);
  return <section id="web-use" className="chapter agent" aria-labelledby="agent-heading">
    <div className="section-shell">
      <BlurFade blur="0px" inView inViewMargin="-80px" className="sec-head"><Kicker>PRO · WEB USE</Kicker><Title id="agent-heading" lead="It uses the browser for you." dim="Passwords stay yours." /></BlurFade>
      <div className="agent-tabs" role="tablist" aria-label="Web use views">
        <AnimatedBackground defaultValue={tab} onValueChange={(id) => id && setTab(id)} className="seg-hover">
          {AGENT.map(a => <button type="button" role="tab" data-id={a.id} key={a.id} aria-selected={a.id === tab} className="seg">{a.label}</button>)}
        </AnimatedBackground>
      </div>
      
        <div className="agent-frame">
          <AnimatePresence initial={false}>
            <motion.div key={item.id} className="agent-shot" initial={{ opacity: 0, scale: 1.01 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: .45 }}>
              <img src={item.image} alt={item.alt} width="1760" height="993" loading="lazy" />
            </motion.div>
          </AnimatePresence>
        </div>
      
    </div>
  </section>;
}


/* ───────────────────────── Seven capabilities ───────────────────────── */

function ExtPanels() {
  return <div className="ext-panels">
    {[['agent-desktop-web-use', 'Runs a task on the page'], ['chat-recording', 'Talk to any page'], ['vault-item', 'Autofill from your vault']].map(([f, l], i) =>
      <motion.figure className="ext-panel" key={f} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1 + i * .12, duration: .4 }}>
        <img src={`/assets/img/home/ext/${f}.webp`} alt={`Off Grid AI browser extension: ${l.toLowerCase()}.`} width="400" height="700" loading="lazy" />
        <figcaption>{l}</figcaption>
      </motion.figure>)}
  </div>;
}
function FramedShot({ children }) {
  return <div className="pillar-shot">{children}</div>;
}
const PILLARS = [
  { id: 'local', title: 'Your AI. Your hardware.', line: 'Chat, vision, voice and images on your own phone or computer. Offline after setup. Video generation coming soon.',
    chips: ['Choose your model', 'Vision', 'Voice', 'Image generation', 'Open source'], visual: () => <FramedShot><Shot name="models" alt="Off Grid AI model library: Bonsai 2, Qwen 3.8, Gemma 4 and more, picked for your device." /></FramedShot> },
  { id: 'memory', title: 'A memory that builds itself.', line: 'Journal, timeline, recall and replay, from the work you choose to capture.',
    chips: ['Day', 'Timeline', 'Recall', 'Replay', 'Reflect', 'People and projects'], visual: () => <FramedShot><Shot name="day" alt="Off Grid AI Day: to-dos, journal, meetings, time spent and timeline." /></FramedShot> },
  { id: 'god', title: 'God, your chief of staff.', line: 'Your accounts, calendar and memory in one place. It briefs you, runs routines and does tasks with your approval.',
    chips: ['Briefings', 'Routines', 'Multiple accounts', 'Computer use', 'Web use'], visual: () => <FramedShot><img className="shot" src="/assets/img/home/agent-04b-web-use-pointer-and-takeover.webp" width="1760" height="993" alt="Off Grid AI running a web task step by step, then handing you the password step." loading="lazy" /></FramedShot> },
  { id: 'meetings', title: 'Your meetings become answers.', line: 'Local transcripts, summaries, decisions and follow-ups. No bot joins your call.',
    chips: ['Meeting notetaker', 'Recorder', 'Ask a recording'], visual: () => <FramedShot><Shot name="meetings" alt="Off Grid AI Meetings: a design review with summary, decisions and transcript." /></FramedShot> },
  { id: 'devices', title: 'Your devices work as one.', line: 'Chats, files, settings and copied text move device to device. Your phone can use your computer\'s models.',
    chips: ['Pro Sync', 'Shared compute', 'Task control from phone'], visual: () => <div className="pillar-live"><ContinueScene /></div> },
  { id: 'browser', title: 'Your browser, with AI.', line: 'Chrome and Firefox. It reads the page, fills from your vault and runs tasks in your signed-in browser.',
    chips: ['Chrome', 'Firefox', 'Page questions', 'Browser tasks', 'Autofill'], visual: () => <ExtPanels /> },
  { id: 'vault', title: 'Your secrets stay yours.', line: 'An encrypted vault for passwords, keys and files. Clipboard history you can search.',
    chips: ['Vault', 'Autofill', 'Clipboard'], visual: () => <FramedShot><img className="shot" src="/assets/img/home/app/vault-dark.webp" width="1760" height="944" alt="Off Grid AI Vault with demo logins, an API key and a secure note." loading="lazy" /></FramedShot> },
];
const PILLAR_MS = 6500;
function Pillars() {
  const [i, setI] = useState(0); const [hold, setHold] = useState(false);
  useEffect(() => { if (hold) return; const t = setTimeout(() => setI(v => (v + 1) % PILLARS.length), PILLAR_MS); return () => clearTimeout(t); }, [i, hold]);
  const P = PILLARS[i];
  return <section id="features" className="chapter pillars" aria-labelledby="pillars-heading">
    <div className="section-shell">
      <BlurFade blur="0px" inView inViewMargin="-80px" className="sec-head"><Kicker>WHAT IT DOES</Kicker><Title id="pillars-heading" lead="Seven things. One assistant." dim="All on hardware you own." /><Lede>Desktop, mobile and the browser. Free to start, Pro when you want memory and action.</Lede></BlurFade>
      <div className="pillar-grid" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
        <div className="pillar-list" role="tablist" aria-label="Capabilities">
          <AnimatedBackground defaultValue={P.id} onValueChange={(id) => { const n = PILLARS.findIndex(p => p.id === id); if (n >= 0) setI(n); }} className="pillar-hover">
            {PILLARS.map((p, n) => <button type="button" role="tab" data-id={p.id} key={p.id} aria-selected={n === i} className="pillar-tab">
              <span className="pillar-num">{String(n + 1).padStart(2, '0')}</span>
              <span className="pillar-tx"><b>{p.title}</b>{n === i && <motion.span className="pillar-line" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{p.line}</motion.span>}</span>
              {n === i && <motion.i key={`${i}-${hold}`} className="pillar-bar" initial={{ scaleX: 0 }} animate={{ scaleX: hold ? 0 : 1 }} transition={{ duration: hold ? .2 : PILLAR_MS / 1000, ease: 'linear' }} />}
            </button>)}
          </AnimatedBackground>
        </div>
        <div className="pillar-stage">
          <AnimatePresence initial={false}>
            <motion.div key={P.id} className="pillar-view" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: .35 }}>
              <div className="pillar-visual">{P.visual()}</div>
              <div className="pillar-chips">{P.chips.map((c, k) => <motion.span key={c} className="chip" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15 + k * .05 }}>{c}</motion.span>)}</div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  </section>;
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

const imgView = (src, alt) => Object.assign(() => <div className="wt-shot"><img className="shot" src={src} alt={alt} width="1760" height="993" /></div>, { fill: true });
// Loads every screen of a sequence up front so a wipe never reveals an empty frame.
export function Preload({ names }) {
  return <div className="preload" aria-hidden="true">{names.map(n => <Shot key={n} name={n} alt="" lazy={false} />)}</div>;
}

// Real app screens. Each one wipes in left to right; chapters with several screens step through them.
export const WIPE = { duration: .7, ease: [.65, 0, .35, 1] };
export function ShotSeq({ shots, ms = 3200 }) {
  const [i, setI] = useState(0);
  const [n, setN] = useState(0);
  useEffect(() => { const t = setTimeout(() => { setI(v => (v + 1) % shots.length); setN(v => v + 1); }, shots[i][2] || ms); return () => clearTimeout(t); }, [n]);
  const [name, alt] = shots[i];
  return <div className="wt-shot">
    {shots.length > 1 && <Preload names={shots.map(x => x[0])} />}
    <AnimatePresence initial>
      <motion.div key={`${name}-${n}`} className="wt-shot-in" initial={{ clipPath: 'inset(0 100% 0 0)' }} animate={{ clipPath: 'inset(0 0% 0 0)', transition: WIPE }} exit={{ opacity: 1, transition: { delay: .7, duration: 0 } }}>
        <Shot name={name} alt={alt} lazy={false} />
        <motion.i className="wipe-edge" initial={{ left: '0%', opacity: 1 }} animate={{ left: '100%', opacity: [1, 1, 0] }} transition={WIPE} />
      </motion.div>
    </AnimatePresence>
  </div>;
}
const shotView = (...shots) => Object.assign(() => <ShotSeq shots={shots} />, { fill: true });
const WALK = [
  { id: 'today', cmd: 'open today', title: 'Your day, already sorted.', line: 'Meetings, to-dos, journal and time spent. Built from what you chose to share.', chips: ['Day', 'Journal', 'Timeline'], loop: 0, View: shotView(['day', 'Off Grid AI Day view with to-dos, journal, meetings and time spent.'], ['actions', 'Off Grid AI Actions: follow-ups pulled from the day.']) },
  { id: 'god', cmd: 'brief me, Ares', title: 'Your God knows your day.', line: 'Your accounts, calendar and memory in one place. It briefs you and lines up work for your yes.', chips: ['Briefings', 'Routines', 'Approvals'], loop: 0, View: shotView(['god', 'Off Grid AI God: Ares briefing you, with approvals waiting.'], ['actions', 'Off Grid AI Actions: approvals waiting for your yes.']) },
  { id: 'capture', cmd: 'capture my day', title: 'Your work, captured on your disk.', line: 'Mail, files, chats and meetings. Stored on your disk.', chips: ['Opt in per device', 'On device'], loop: 8000, View: CaptureScene },
  { id: 'remember', cmd: 'remember today', title: 'Your day becomes memory.', line: 'People, projects and dates, sorted for you.', chips: ['Timeline', 'People', 'Projects'], loop: 7000, View: RememberScene },
  { id: 'people', cmd: 'who is Sam Okafor?', title: 'Your people, already mapped.', line: 'People and companies from your mail, meetings and chats. Always current.', chips: ['People', 'Companies', 'Projects'], loop: 0, View: shotView(['entities', 'Off Grid AI People: Sam Okafor at Acme Corp, with his timeline.'], ['meetings', 'Off Grid AI Meetings: the Acme Corp pilot kickoff with Sam.']) },
  { id: 'reflect', cmd: 'where did my week go?', title: 'Your week, accounted for.', line: 'Time by app, project and person. No timers.', chips: ['Reflect', 'Focus'], loop: 0, View: shotView(['reflect', 'Off Grid AI Reflect: time by app, people and focus.'], ['replay', 'Off Grid AI Replay: scrub back through your day.']) },
  { id: 'ask', cmd: 'what did I promise Sam?', title: 'Your answers come with sources.', line: 'Every answer shows where it came from.', chips: ['Recall', 'Sources'], loop: 9000, View: AskScene },
  { id: 'act', cmd: 'draft the reply to Sam', title: 'Your yes sends it.', line: 'Nothing goes out without your yes.', chips: ['Actions', 'Approvals', 'Audit log'], loop: 7000, View: ActScene },
  { id: 'web', cmd: 'compare note apps on the web', title: 'Your web errands, handled.', line: 'Step by step. You take over for passwords.', chips: ['Web use', 'Computer use', 'Takeover'], loop: 9500, View: WebScene },
  { id: 'meetings', cmd: 'summarize the design review', title: 'Your meetings become answers.', line: 'Local transcripts, decisions and follow-ups. No bot joins your call.', chips: ['Notetaker', 'Recorder', 'Ask a recording'], loop: 0, View: shotView(['meetings', 'Off Grid AI Meetings with summary, decisions and transcript.'], ['voice', 'Off Grid AI Voice notes with transcripts and to-dos.']) },
  { id: 'phone', cmd: 'send it to my phone', title: 'Your phone picks it up.', line: 'Device to device. Encrypted. No server.', chips: ['Pro Sync', 'Shared compute'], loop: 7000, View: ContinueScene },
  { id: 'browser', cmd: 'fill my Acme login', title: 'Your browser, with AI.', line: 'Chrome and Firefox. Reads the page, fills from your vault, runs tasks.', chips: ['Chrome', 'Firefox', 'Autofill'], loop: 7500, View: BrowserScene },
  { id: 'vault', cmd: 'unlock my vault', title: 'Your secrets stay yours.', line: 'Encrypted passwords, keys and files. A clipboard you can search.', chips: ['Vault', 'Clipboard'], loop: 0, View: VaultScene },
  { id: 'clipboard', cmd: 'find that link I copied', title: 'Your clipboard remembers.', line: 'Text, links, images and files. One shortcut, from any app.', chips: ['Clipboard', 'Quick open', 'Synced'], loop: 0, View: shotView(['clipboard', 'Off Grid AI Clipboard history with search.']) },
  { id: 'images', cmd: 'make an image', title: 'Your images. Made offline.', line: 'Open image models on your own machine. No credits, no queue.', chips: ['Image generation', 'Vision'], loop: 0, View: ImagesScene },
  { id: 'models', cmd: 'download models for this Mac', title: 'Your models. Every kind.', line: 'Text, vision, images, speech and computer use. Downloaded once, then it works with the Wi-Fi off.', chips: ['Text', 'Vision', 'Image', 'Speech', 'Computer use'], loop: 14000, View: ModelsScene },
  { id: 'api', cmd: 'curl localhost:7878/v1/chat/completions', title: 'Your other apps can use it too.', line: 'An OpenAI-compatible API on your own machine. Chat, images, speech and embeddings.', chips: ['OpenAI-compatible', 'MCP', 'No API key'], loop: 9000, View: ApiScene },
];
const PROMPTS = [
  { id: 'ask', label: 'What did I promise Sam?' }, { id: 'act', label: 'Draft the reply' }, { id: 'phone', label: 'Send it to my phone' },
  { id: 'browser', label: 'Fill my login' }, { id: 'meetings', label: 'Summarize my meeting' },
];
const INTENTS = [[/image|picture|draw|photo/i, 'images'], [/clipboard|copied|paste/i, 'clipboard'], [/brief|ares|god|chief/i, 'god'], [/who is|people|crm|contact/i, 'people'], [/week|time|hours|reflect/i, 'reflect'],[/promise|agree|what did|ask|recall|remember/i, 'ask'], [/draft|reply|email|send.*sam|approve/i, 'act'], [/phone|sync|mobile/i, 'phone'],
  [/login|password|fill|browser|chrome|firefox/i, 'browser'], [/meeting|summar|call|record/i, 'meetings'], [/vault|secret|key/i, 'vault'], [/model|offline|qwen|gemma/i, 'models'], [/web|search|compare|browse/i, 'web'], [/today|day|journal/i, 'today']];

// The command bar runs real prompts only: clicking or pressing Enter types the prompt that is
// cycling in the placeholder, dissolves it (Aceternity vanish effect) and jumps the window there.
const BAR_PROMPTS = ['What did I promise Sam?', 'Draft the reply to Sam', 'Send it to my phone', 'Summarize the design review', 'Fill my Acme Corp login'];
function CommandBar({ onRun }) {
  const wrap = useRef(null); const busy = useRef(false); const typed = useRef('');
  const run = () => {
    const root = wrap.current; if (!root || busy.current) return;
    const input = root.querySelector('input'); const form = root.querySelector('form'); if (!input || !form) return;
    const shown = [...root.querySelectorAll('p')].map(p => p.textContent.trim()).find(t => BAR_PROMPTS.includes(t)) || BAR_PROMPTS[0];
    busy.current = true; typed.current = shown;
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
    let i = 0;
    const tick = () => {
      i += 1; setter.call(input, shown.slice(0, i)); input.dispatchEvent(new Event('input', { bubbles: true }));
      if (i < shown.length) setTimeout(tick, Math.max(6, 300 / shown.length));
      else setTimeout(() => { form.requestSubmit(); setTimeout(() => { busy.current = false; }, 900); }, 100);
    };
    tick();
  };
  const onKeyDownCapture = (e) => {
    if (busy.current) { if (e.key !== 'Tab') e.preventDefault(); return; }
    if (e.key === 'Enter') { e.preventDefault(); run(); return; }
    if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Delete') e.preventDefault();
  };
  return <div className="cmd-vanish" ref={wrap} role="search" aria-label="Try Off Grid AI. Click to run the suggested prompt."
    onKeyDownCapture={onKeyDownCapture} onPasteCapture={(e) => e.preventDefault()} onPointerDown={(e) => { if (e.target.closest('button')) return; e.preventDefault(); wrap.current?.querySelector('input')?.focus(); run(); }}>
    <PlaceholdersAndVanishInput placeholders={BAR_PROMPTS} onChange={() => {}} onSubmit={(e) => { e.preventDefault(); onRun(typed.current); }} />
  </div>;
}

const HERO = .07;
const STAGE = .5;
const DWELL = { today: 7200, god: 7200, capture: 6000, remember: 6200, people: 7200, reflect: 7200, ask: 8600, act: 7600, web: 9000, meetings: 7200, phone: 6500, browser: 7200, vault: 6800, clipboard: 5200, images: 10400, models: 11000, api: 8200 };
const ROT_WORDS = ['memory.', 'meetings.', 'devices.', 'browser.', 'secrets.'];
export const WALK_ICONS = { god: Sparkle, people: UsersThree, clipboard: ClipboardText, images: ImageSquare, reflect: ChartBar, today: CalendarBlank, capture: Files, remember: ClockCounterClockwise, ask: ChatCircle, act: CheckCircle, web: Globe, meetings: VideoCamera, phone: DeviceMobile, browser: PuzzlePiece, vault: LockKey, models: Cpu, api: TerminalWindow };

function Walkthrough({ reduce, theme }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const N = WALK.length;
  const [ch, setCh] = useState(0); const [rot, setRot] = useState(0); const rotRef = useRef(0); const spin = useRef(null); const settle = useRef(null);
  const [paused, setPaused] = useState(false); const [docked, setDocked] = useState(false); const [q, setQ] = useState('');
  const STEP = 360 / N; const idxOf = (r) => ((Math.round(-r / STEP) % N) + N) % N;
  const wheelBox = useRef(null); const [wz, setWz] = useState(.6); const tap = useRef(null); const [hoverI, setHoverI] = useState(-1); const lock = useRef(0); const [manual, setManual] = useState(false); const copyRef = useRef(null); const [copyH, setCopyH] = useState(260);
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
      if (mobile) { const ch = copyRef.current ? copyRef.current.offsetHeight : 260; setCopyH(ch); setGeo({ d: Math.max(heroBottom, vh * .62) - (14 + ch + 10), s: 1, mobile, ready: true }); return; }
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
  useEffect(() => {
    const onKey = (e) => {
      if (!docked || e.target.closest?.('input,textarea')) return;
      const r = ref.current?.getBoundingClientRect(); if (!r || r.bottom < innerHeight || r.top > 0) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); setManual(true); go(ch + 1); }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); setManual(true); go(ch - 1); }
    };
    addEventListener('keydown', onKey); return () => removeEventListener('keydown', onKey);
  }, [docked, ch, go]);
  const submit = (e) => { e.preventDefault(); const hit = INTENTS.find(([re]) => re.test(q)); setTimeout(() => goId(hit ? hit[1] : 'ask'), 700); };
  // Chapters inside the act advance on their own; hovering the window holds the current one.
  useEffect(() => { if (!docked || paused || manual || reduce) return; const t = setTimeout(() => spinTo((ch + 1) % N), DWELL[WALK[ch].id] || 7000); return () => clearTimeout(t); }, [docked, paused, manual, ch, reduce, spinTo]);
  const C = WALK[docked ? ch : 0]; const cycle = useCycle(docked ? C.loop : 0);
  return <section id="how" className="walk" ref={ref}  aria-labelledby="hero-title">
    <div className="walk-pin" style={{ '--copyH': `${copyH}px` }}>
      {!reduce && <div className="walk-grid" aria-hidden="true"><FlickeringGrid squareSize={3} gridGap={9} maxOpacity={.2} flickerChance={.16} color="rgb(52, 211, 153)" /></div>}
      <div className="walk-igrid"><InteractiveGridPattern width={48} height={48} squares={[40, 24]} className="igrid" squaresClassName="igrid-sq" /></div>

      <motion.div ref={heroRef} className={`walk-hero ${docked ? 'off' : ''}`} style={{ opacity: heroFade, y: heroLift }}>
        <a className="hero-pill" href="#how"><span className="pulse" /><AnimatedShinyText shimmerWidth={140}>Open source · Five platforms · Browser extension</AnimatedShinyText><ArrowRight size={13} /></a>
        <h1 id="hero-title" className="hero-title">
          <TextScramble as="span" duration={.8} speed={.03} characterSet="01/_.:<>">Your AI.</TextScramble>
          <span className="sr-only">Your memory, meetings, devices, browser and secrets.</span>
        </h1>
        <div className="hero-title rot-line" aria-hidden="true"><span className="dim">Your</span><WordRotate words={ROT_WORDS} duration={2200} className="rot" /></div>
        <CommandBar onRun={(text) => { const hit = INTENTS.find(([re]) => re.test(text)); setTimeout(() => goId(hit ? hit[1] : 'ask'), 350); }} />
        <AISuggestions className="cmd-chips" suggestions={PROMPTS} onSelect={(sug) => goId(sug.id)} />
        <div className="hero-proof">
          {[[250000, 'downloads'], [3400, 'GitHub stars'], [600, 'community']].map(([v, l]) => <span key={l}><b><NumberTicker value={v} />+</b> {l}</span>)}
          <span className="hero-plat">{DOWNLOADS.map(d => <PlatformIcon key={d.id} id={d.id} size={14} />)}<PuzzlePiece size={14} aria-label="Browser extension" /></span>
        </div>
      </motion.div>

      <motion.div ref={copyRef} className={`walk-copy ${docked ? '' : 'off'}`} style={{ opacity: copyFade }}>
        <Kicker>ONE DAY WITH SAM</Kicker>
        <div className="wheel-wrap" ref={wheelBox} style={{ '--wz': wz }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => { setPaused(false); setHoverI(-1); }}
          // The wheel captures the pointer for dragging, so its circles never receive a click. A press and release on the same circle without moving opens that chapter.
          onPointerDownCapture={(e) => { const b = e.target.closest?.('.og-wheel > button'); tap.current = b ? { b, x: e.clientX, y: e.clientY } : null; }}
          onPointerUpCapture={(e) => { const t = tap.current; tap.current = null; if (!t || Math.hypot(e.clientX - t.x, e.clientY - t.y) > 6) return; const i = [...wheelBox.current.querySelectorAll('.og-wheel > button')].indexOf(t.b); if (i >= 0) { setManual(true); setHoverI(-1); lock.current = performance.now() + 700; setTimeout(() => spinTo(i), 0); } }}
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
        <BeamLayer.Provider value={beamLayer}>
        <div className="wt-view" ref={view} style={{ '--fit': fit }}>
          <DotPattern width={18} height={18} cr={1} className="wt-dots" />
          <AnimatePresence initial={false}>
            <motion.div key={`${C.id}-${cycle}`} className="wt-scene" initial={{ opacity: 0, scale: .985 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: .4 }}>
              {C.View.fill ? <C.View /> : <div className="wt-canvas"><C.View /></div>}
            </motion.div>
          </AnimatePresence>
          <div className="beam-layer" ref={beamLayer} aria-hidden="true" />
        </div>
        </BeamLayer.Provider>
      </motion.div>
    </div>
    <div className="sr-only">{WALK.map(w => <div key={w.id}><h3>{w.title}</h3><p>{w.line}</p></div>)}</div>
  </section>;
}

/* ───────────────────────── Free features ───────────────────────── */

function ComputeBeam() {
  const box = useRef(null); const a = useRef(null); const b = useRef(null);
  return <div className="bento-net" ref={box}>
    <span className="node" ref={a}><DeviceMobile size={26} /><small>Off Grid AI on your phone</small></span>
    <span className="net-tag"><LockKey size={12} /> Your own network</span>
    <span className="node node-big" ref={b}><Laptop size={30} /><small>Off Grid AI Desktop</small></span>
    <AnimatedBeam containerRef={box} fromRef={a} toRef={b} duration={2.6} pathWidth={2} pathColor="var(--og-text-muted)" pathOpacity={.2} gradientStartColor="var(--og-primary)" gradientStopColor="var(--og-primary-light)" />
    <AnimatedBeam containerRef={box} fromRef={a} toRef={b} reverse duration={2.6} delay={1.3} pathWidth={2} pathColor="transparent" gradientStartColor="var(--og-primary)" gradientStopColor="var(--og-primary-light)" />
  </div>;
}

function LoopOffline() {
  const n = useCycle(4200);
  return <div className="bento-offline-viz" key={n}>
    <motion.span className="wifi-ic" initial={{ opacity: 1 }} animate={{ opacity: [1, 1, .25] }} transition={{ duration: 1.2, times: [0, .6, 1] }}><WifiSlash size={30} /></motion.span>
    <AIResponse isStreaming text="Still answering. The model runs on this device." />
  </div>;
}

function LoopVoice() {
  const n = useCycle(5000);
  return <div className="bento-voicebox"><Microphone size={22} /><TextEffect key={n} as="p" per="word" preset="fade" speedReveal={.5}>Move the pilot to the fourteenth and tell Sam.</TextEffect></div>;
}

function FreeSection() {
  return <section id="free" className="section-shell chapter" aria-labelledby="free-heading">
    <BlurFade blur="0px" inView inViewMargin="-80px" className="sec-head"><Kicker>FREE · ON YOUR DEVICE</Kicker><Title id="free-heading" lead="Everything you ask AI for." dim="Without sending it anywhere." /><Lede>No account. No subscription. No Wi-Fi needed.</Lede></BlurFade>
    <BentoGrid className="bento">
      <BentoCard name="The newest open models" description="Qwen 3.8, Gemma 4, Muse Glimmer. Picked for your device." Icon={Cpu} href="/guides/which-model/" cta="Find your model" className="bento-models"
        background={<div className="bento-shot"><Shot name="models" alt="Off Grid AI model library with Qwen, Gemma 4, Muse Glimmer and Bonsai." /></div>} />
      <BentoCard name="Works offline" description="Plane, basement, anywhere." Icon={WifiSlash} href="/quick-start/" cta="Set it up in five minutes" className="bento-offline"
        background={<LoopOffline />} />
      <BentoCard name="Ask your files" description="PDFs, sheets, code." Icon={Files} href="/desktop/" cta="Explore Desktop" className="bento-docs"
        background={<div className="bento-doc"><Card size="2"><Flex direction="column" gap="2"><Badge variant="outline"><FilePdf size={12} /> rollout_v3.pdf</Badge><AIResponse text="The pilot covers 40 seats and starts after security review [1]." citations={[{ id: 'p4', index: 1, title: 'Page 4' }]} /></Flex></Card></div>} />
      <BentoCard name="Talk to it" description="Transcribed on your device." Icon={Microphone} href="/mobile/" cta="Explore Mobile" className="bento-voice"
        background={<LoopVoice />} />
      <BentoCard name="Images, both ways" description="Create them. Ask about them." Icon={ImageSquare} href="/guides/" cta="Read the guides" className="bento-images"
        background={<div className="bento-marquee"><Marquee vertical pauseOnHover className="mq-v">{GENERATED.map(([f, m]) => <figure className="gen" key={f}><img src={`/assets/img/home/gen-${f}.webp`} alt={`Image made on device with ${m}`} width="512" height="512" loading="lazy" /><figcaption>{m}</figcaption></figure>)}</Marquee></div>} />
      <BentoCard name="Need more power? Use your computer." description="Your phone borrows your desktop over your own network." Icon={Network} href="/articles/how-to-analyze-images-from-your-phone-using-your-computer-s-ai-in-2026/" cta="See how it works" className="bento-net-card" background={<ComputeBeam />} />
    </BentoGrid>
  </section>;
}

/* ───────────────────────── Privacy ───────────────────────── */

const SAMPLE_PROMPTS = ['Summarize my blood test results', 'Review this NDA before I sign it', 'Compare these two salary offers', 'Draft a reply to my landlord about the deposit'];
function PrivLane({ local, prompt, n }) {
  const box = useRef(null); const a = useRef(null); const b = useRef(null); const c = useRef(null);
  const nodes = local ? [[ChatCircle, 'Your prompt', a], [Cpu, 'Your chip', b], [CheckCircle, 'Your answer', c]] : [[ChatCircle, 'Your prompt', a], [Globe, 'The internet', b], [HardDrives, 'Their servers', c]];
  const log = local ? [['PROCESSED', 'on this device'], ['SENT', '0 bytes'], ['COPIES', '0'], ['ANSWER', 'stays here']]
    : [['LOGGED', `"${prompt}"`], ['STORED', 'with your account'], ['RETAINED', 'on their schedule'], ['TRAINING', 'may be used']];
  return <SceneCard className={`plane ${local ? 'plane-local' : ''}`} busy={local}>
    <div className="plane-head"><Kicker>{local ? 'OFF GRID AI' : 'CLOUD AI SERVICE'}</Kicker><span className="plane-count"><NumberTicker key={n} value={local ? 0 : 3 + (n % 4)} /> {local ? 'copies' : 'copies kept'}</span></div>
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
// Phones get a swipeable row (Motion Primitives Carousel); wider screens keep the grid.
export function MobileRail({ className, start = 0, children }) {
  const narrow = useNarrow();
  const items = React.Children.toArray(children);
  if (!narrow) return <div className={className}>{items}</div>;
  return <Carousel className="rail-carousel" initialIndex={start}><CarouselContent className="rail-track">
    {items.map((c, i) => <CarouselItem key={i} className="rail-item">{c}</CarouselItem>)}
  </CarouselContent><CarouselIndicator className="planes-dots" /></Carousel>;
}
function PrivacySection() {
  const narrow = useNarrow();
  const [prompt, setPrompt] = useState(SAMPLE_PROMPTS[0]); const [n, setN] = useState(0); const [draft, setDraft] = useState('');
  const auto = useCycle(7000);
  useEffect(() => { if (auto) { setPrompt(SAMPLE_PROMPTS[auto % SAMPLE_PROMPTS.length]); setN(v => v + 1); } }, [auto]);
  const send = (e) => { e.preventDefault(); if (!draft.trim()) return; setPrompt(draft.trim().slice(0, 64)); setN(v => v + 1); };
  return <section id="private" className="has-bg chapter" aria-labelledby="priv-heading"><SectionBg /><div className="section-shell">
    <BlurFade blur="0px" inView inViewMargin="-80px" className="sec-head"><Kicker>WHERE YOUR DATA GOES</Kicker><Title id="priv-heading" lead="Type something private." dim="Watch where it goes." /><Lede>Same question, two places to send it.</Lede></BlurFade>
    <div className="priv-input"><PlaceholdersAndVanishInput placeholders={SAMPLE_PROMPTS} onChange={(e) => setDraft(e.target.value)} onSubmit={send} /></div>
    {narrow ? <Carousel className="planes-carousel"><CarouselContent className="planes-track">
        <CarouselItem className="planes-item"><PrivLane prompt={prompt} n={n} /></CarouselItem>
        <CarouselItem className="planes-item"><PrivLane local prompt={prompt} n={n} /></CarouselItem>
      </CarouselContent><CarouselIndicator className="planes-dots" /></Carousel>
      : <div className="planes">
        <PrivLane prompt={prompt} n={n} />
        <PrivLane local prompt={prompt} n={n} />
      </div>}
  </div></section>;
}

/* ───────────────────────── Pro ───────────────────────── */

const MEMORIES = [
  { id: 'day', label: 'Your day', title: 'The whole day on one screen.', alt: 'Off Grid AI Day view with to-dos, journal, meetings and suggestions.' },
  { id: 'actions', label: 'Actions', title: 'Promises, already on the list.', alt: 'Off Grid AI Actions: follow-ups for Sam and Acme Corp pulled from the day.' },
  { id: 'meetings', label: 'Meetings', title: 'Every meeting, summarized.', alt: 'Off Grid AI Meetings: a design review with summary and decisions.' },
  { id: 'voice', label: 'Voice notes', title: 'Say it once. Tasks appear.', alt: 'Off Grid AI Voice: transcripts tagged with people and tasks.' },
  { id: 'entities', label: 'People', title: 'Everyone, already mapped.', alt: 'Off Grid AI Entities: Sam Okafor, Priya Nair, Acme Corp and more.' },
  { id: 'reflect', label: 'Reflect', title: 'Where the hours went.', alt: 'Off Grid AI Reflect: time by app, people and focus.' },
];
function MemoryCard({ item }) {
  return <Card className="memory-card" size="2"><div className="memory-img"><Shot name={item.id} alt={item.alt} /></div><Box className="memory-cap"><Text className="eyebrow">{item.label}</Text><Heading as="h3">{item.title}</Heading></Box></Card>;
}
function MemoryRail() {
  const [viewportRef, api] = useEmblaCarousel({ align: 'start', containScroll: 'trimSnaps' });
  const [sel, setSel] = useState(0);
  const update = useCallback(() => { if (api) setSel(api.selectedScrollSnap()); }, [api]);
  useEffect(() => { if (!api) return; update(); api.on('select', update); return () => { api.off('select', update); }; }, [api, update]);
  return <Box className="memory-rail" role="region" aria-roledescription="carousel" aria-label="Pro views">
    <Box className="embla" ref={viewportRef}><Box className="embla-track">{MEMORIES.map((m, i) => <Box className="embla-slide" key={m.id} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${MEMORIES.length}`}><MemoryCard item={m} /></Box>)}</Box></Box>
    <Flex justify="between" align="center" className="rail-ctl"><Text className="small" aria-live="polite">{sel + 1} / {MEMORIES.length}</Text><Flex gap="2"><Button variant="outline" aria-label="Previous view" disabled={!sel} onClick={() => api?.scrollPrev()}><ArrowLeft size={16} /></Button><Button variant="outline" aria-label="Next view" disabled={sel === MEMORIES.length - 1} onClick={() => api?.scrollNext()}><ArrowRight size={16} /></Button></Flex></Flex>
  </Box>;
}

const FEATURES = [
  [Laptop, 'Capture', 'Screen and meetings become memory. Opt in per device.'],
  [MagnifyingGlass, 'Search everything', 'Every message, page and meeting. One box.'],
  [UsersThree, 'A CRM that fills itself', 'People and companies, kept current.'],
  [ClockCounterClockwise, 'Replay your day', 'Scrub back to anything you saw.'],
  [Clock, 'Where time went', 'No timers. No tags.'],
  [CheckCircle, 'It acts, you approve', 'Every action waits for your yes.'],
];
function ProSection() {
  const [index, setIndex] = useState(0);
  return <section id="pro" className="chapter pro" aria-labelledby="pro-heading">
    <div className="section-shell">
      <BlurFade blur="0px" inView inViewMargin="-80px" className="sec-head"><Kicker>OFF GRID AI PRO</Kicker><Title id="pro-heading" lead="The assistant that knows your day." dim="On your hardware, under your control." /><Lede>The same day with Sam, as Pro saw it.</Lede></BlurFade>
      <Box className="memory-desktop">
        <CoverflowCarousel className="memory-coverflow" items={MEMORIES.map(m => ({ id: m.id, content: <MemoryCard item={m} /> }))} index={index} onIndexChange={setIndex} spacing={320} depth={110} rotation={14} scaleStep={.08} />
        <div className="segbar"><AnimatedBackground className="seg-hover" defaultValue={MEMORIES[index].id} onValueChange={(id) => { const i = MEMORIES.findIndex(m => m.id === id); if (i >= 0) setIndex(i); }}>
          {MEMORIES.map((m, i) => <button type="button" data-id={m.id} key={m.id} className="seg" aria-pressed={i === index}>{m.label}</button>)}
        </AnimatedBackground></div>
      </Box>
      <MemoryRail />
      <div className="feats">
        {FEATURES.map(([Icon, title, text]) => <MagicCard key={title} className="feat" gradientColor="rgba(16, 185, 129, 0.08)" gradientFrom="var(--og-primary)" gradientTo="var(--og-primary-dark)">
          <div className="feat-in"><Icon size={22} /><Heading as="h3">{title}</Heading><Text as="p">{text}</Text></div>
        </MagicCard>)}
      </div>
      <Flex gap="3" wrap="wrap" className="pro-cta"><Button asChild size="lg"><a href="/pro/">See every Pro feature <ArrowUpRight size={16} /></a></Button></Flex>
    </div>
  </section>;
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
// Every page: theme handling, header, main, footer. Pages pass their sections as children.
export function PageShell({ children }) {
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
        <Button asChild className="header-download"><a href="/download/">Download</a></Button>
        <Dialog.Root><Dialog.Trigger asChild><Button variant="ghost" className="menu-trigger" aria-label="Open navigation"><List size={22} /></Button></Dialog.Trigger>
          <Dialog.Portal><Dialog.Overlay className="nav-overlay" /><Dialog.Content className="mobile-nav">
            <Dialog.Title className="eyebrow">OFF GRID AI</Dialog.Title><Dialog.Description className="sr-only">Site navigation</Dialog.Description>
            <Dialog.Close asChild><Button variant="ghost" className="nav-close" aria-label="Close navigation"><X size={22} /></Button></Dialog.Close>
            <nav aria-label="Mobile navigation">{[...NAV, ['Desktop', '/desktop/'], ['Mobile', '/mobile/'], ['Download', '/download/']].map(([label, href]) => <Dialog.Close asChild key={href}><a href={href}>{label}<ArrowUpRight size={20} /></a></Dialog.Close>)}</nav>
          </Dialog.Content></Dialog.Portal>
        </Dialog.Root>
      </div>
    </div></header>

    <main id="main"><ThemeCtx.Provider value={theme}>{children}</ThemeCtx.Provider></main>

    <footer className="site-footer"><div className="section-shell">
      <div className="footer-top"><a className="wordmark" href="/"><Logo size={30} /><span>Off Grid AI</span></a><Text as="p">Your personal AI.<br />On hardware you already own.</Text></div>
      <div className="footer-links">
        {FOOTER.map(([head, links]) => <div key={head}><Kicker>{head}</Kicker><div className="foot-col"><AnimatedBackground enableHover className="foot-hover">{links.map(([l, h]) => <a key={h} data-id={h} href={h} {...(h.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}>{l}</a>)}</AnimatedBackground></div></div>)}
      </div>
      <div className="footer-bottom"><span>Off Grid AI · Wednesday Solutions</span><span><a href="/privacy/">Privacy</a> · <a href="/terms/">Terms</a> · <a href="/desktop/releases/">Desktop releases</a> · <a href="/mobile/releases/">Mobile releases</a></span></div>
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
          <ScrollVelocityRow baseVelocity={3} direction={1}>{MODELS.slice(0, 6).map(([n, k]) => <span className="mq-model" key={n}><b>{n}</b><small>{k}</small></span>)}</ScrollVelocityRow>
          <ScrollVelocityRow baseVelocity={3} direction={-1}>{MODELS.slice(6).map(([n, k]) => <span className="mq-model" key={n}><b>{n}</b><small>{k}</small></span>)}</ScrollVelocityRow>
        </ScrollVelocityContainer>
      </section>
      <PrivacySection />
      <section className="has-bg manifesto" aria-label="Why local"><SectionBg /><TextReveal className="reveal">Cloud AI keeps your data on their computer. Off Grid AI keeps it on yours.</TextReveal></section>

      {/* Pricing: Radix cards, Magic UI border beam on the recommended plan. */}
      <section id="pricing" className="has-bg chapter" aria-labelledby="price-heading"><SectionBg /><div className="section-shell">
        <BlurFade blur="0px" inView inViewMargin="-80px" className="sec-head"><Kicker>PRICING</Kicker><Heading as="h2" id="price-heading"><span className="t-line">Start free.</span><span className="t-line t-dim">Own Pro <Highlighter action="underline" color="#34D399" strokeWidth={2} padding={2} isView>forever</Highlighter>, or go monthly.</span></Heading></BlurFade>
        <MobileRail className="plans" start={1}>
          <SceneCard className="plan-card"><div className="plan"><Kicker>LOCAL AI</Kicker><Heading as="h3">Free</Heading><div className="price"><span className="amt">$<NumberTicker value={0} /></span><small>forever</small></div>
            <ul>{['Local models', 'Files, voice, images', 'Offline', 'No account'].map(x => <li key={x}><Check size={14} />{x}</li>)}</ul>
            <InteractiveHoverButton className="ihb" onClick={() => { location.href = '/download/'; }}>Download free</InteractiveHoverButton></div></SceneCard>
          <SceneCard className="plan-card plan-card-hero" busy><div className="plan plan-hero"><Kicker>BEST VALUE · ONE PAYMENT</Kicker><Heading as="h3">Pro lifetime</Heading><div className="price"><span className="amt">$<NumberTicker value={Number(pricing.lifetime)} startValue={Math.round(Number(pricing.lifetime) * 1.6)} /></span><small>once</small></div>
            <ul>{['Memory and search', 'Actions you approve', 'Sync', `${pricing.devices} devices`].map(x => <li key={x}><Check size={14} />{x}</li>)}</ul>
            <ShimmerButton className="pro-shimmer" shimmerColor="#6EE7B7" shimmerSize="0.08em" borderRadius="8px" shimmerDuration="2.6s" background="var(--og-primary)" onClick={() => { location.href = '/pro/#buy'; }}>Own Pro for ${pricing.lifetime}</ShimmerButton>
            <Text as="p" className="small">Price rises as we grow.</Text></div></SceneCard>
          <SceneCard className="plan-card"><div className="plan"><Kicker>FLEXIBLE</Kicker><Heading as="h3">Pro monthly</Heading><div className="price"><span className="amt">$<NumberTicker value={Number(pricing.monthly)} decimalPlaces={2} /></span><small>/ month</small></div>
            <ul>{['Every Pro feature', 'Cancel any time'].map(x => <li key={x}><Check size={14} />{x}</li>)}</ul>
            <InteractiveHoverButton className="ihb" onClick={() => { location.href = '/pro/#buy'; }}>Start Pro monthly</InteractiveHoverButton></div></SceneCard>
        </MobileRail>
        <Text as="p" className="fine"><a href="/pro/">Full terms</a></Text>
      </div></section>

      {/* Explore: SmoothUI tilt cards over Radix cards. */}
      <section className="has-bg chapter sec-explore" aria-labelledby="explore-heading"><SectionBg /><div className="section-shell">
        <BlurFade blur="0px" inView inViewMargin="-80px" className="sec-head"><Kicker>WHAT COMES NEXT</Kicker><Title id="explore-heading" lead="Build it with us."  /></BlurFade>
        <MobileRail className="explore">
          <Card asChild className="ex" size="3"><a href="/design-partners/" data-analytics-event="design_partner_offer_clicked" data-analytics-view="design_partner_offer_viewed" data-analytics-placement="home_card">
            <Badge variant="outline">Teams under 50 people</Badge><div className="ex-mark">[ your team ]<br /><span>+ Off Grid AI</span></div><Heading as="h3">Build it with us. Pay $0.</Heading><Text as="p">Teams under 50.</Text><span className="ex-link">See the design partner offer <ArrowRight size={15} /></span></a></Card>
          <Card asChild className="ex" size="3"><a href="/ogap/">
            <Badge variant="outline">Hardware · Prototype</Badge><img src="/assets/img/ogap/website-v2/hero-ecosystem-dark-mobile.webp" alt="OGAP frame with cooling module and battery for an existing phone." width="768" height="512" loading="lazy" /><Heading as="h3">More from your phone.</Heading><Text as="p">Cooling and power for bigger models.</Text><span className="ex-link">See the hardware <ArrowRight size={15} /></span></a></Card>
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
