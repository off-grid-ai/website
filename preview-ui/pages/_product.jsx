import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import * as Accordion from '@radix-ui/react-accordion';
import { CaretDown, Check, GithubLogo, Play, Pause, LockKey, X, WifiSlash, ChatCircle, FilePdf, Microphone } from '@phosphor-icons/react';
import { AnimatedBackground } from '@motion-primitives/animated-background';
import { TypingAnimation } from '@magicui/typing-animation';
import { NumberTicker } from '@magicui/number-ticker';
import { Iphone } from '@magicui/iphone';
import { TextEffect } from '@motion-primitives/text-effect';
import AIMessage from '@smoothui/ai-message';
import AIResponse from '@smoothui/ai-response';
import AIReasoning from '@smoothui/ai-reasoning';
import AIApproval from '@smoothui/ai-approval';
import Button from '@smoothui/smooth-button';
import { Kicker, Title, Lede, SceneCard, MobileRail, useNarrow, ShotSeq, PlatformIcon } from '../shared.jsx';

// Shared composition for the product pages (/desktop/, /mobile/). Not a page itself (leading underscore).

// The beta links resolve to the newest GitHub prerelease at runtime, as on the old page (same logic as
// /assets/js/beta-download.js). The GitHub API is rate limited: one request per session, result (or failure)
// cached in sessionStorage, and the pinned beta URLs stay when anything goes wrong.
const BETA_SUFFIX = { dmg: '.dmg', exe: '-setup.exe', AppImage: '.AppImage', deb: '_amd64.deb' };
export function useBetaLinks() {
  useEffect(() => {
    const links = [...document.querySelectorAll('a[data-beta-download]')]; if (!links.length) return;
    const apply = (map) => links.forEach(l => { const u = map && map[l.dataset.betaDownload]; if (u) l.href = u; });
    let cached; try { cached = JSON.parse(sessionStorage.getItem('og-beta-links') || 'null'); } catch (_) {}
    if (cached) { apply(cached.map); return; }
    // Ask GitHub only when someone reaches for a beta link (hover, focus or touch), never on page load.
    let asked = false;
    const go = () => { if (asked) return; asked = true; links.forEach(l => ['pointerenter', 'focus', 'touchstart'].forEach(e => l.removeEventListener(e, go))); lookup(); };
    links.forEach(l => ['pointerenter', 'focus', 'touchstart'].forEach(e => l.addEventListener(e, go, { passive: true })));
    return () => links.forEach(l => ['pointerenter', 'focus', 'touchstart'].forEach(e => l.removeEventListener(e, go)));
    function lookup() {
    const save = (map) => { try { sessionStorage.setItem('og-beta-links', JSON.stringify({ map })); } catch (_) {} };
    fetch('https://api.github.com/repos/off-grid-ai/OGAD/releases?per_page=100', { headers: { Accept: 'application/vnd.github+json' } })
      .then(r => (r.ok ? r.json() : null))
      .then(releases => {
        if (!Array.isArray(releases)) { save({}); return; }
        const betas = releases.filter(r => r.prerelease && !r.draft && /-beta\./.test(r.tag_name)).sort((a, b) => Date.parse(b.published_at) - Date.parse(a.published_at));
        const map = {};
        for (const [k, suf] of Object.entries(BETA_SUFFIX)) for (const r of betas) { const a = (r.assets || []).find(x => x.name.endsWith(suf) && x.state === 'uploaded'); if (a) { map[k] = a.browser_download_url; break; } }
        save(map); apply(map);
      })
      .catch(() => save({}));
    }
  }, []);
}

// Streams `text` word by word once mounted.
export function useStream(text, { start = 600, every = 70 } = {}) {
  const words = text.split(' ');
  const [n, setN] = useState(0);
  useEffect(() => {
    let iv; const t = setTimeout(() => { iv = setInterval(() => setN(v => { if (v + 1 >= words.length) clearInterval(iv); return v + 1; }), every); }, start);
    return () => { clearTimeout(t); clearInterval(iv); };
  }, [text]);
  return [words.slice(0, n).join(' '), n < words.length];
}

// Autoplay control: a visible pause/resume plus a one-line hint.
export function AutoCtl({ manual, onToggle, hint, className = '' }) {
  return <div className={`pp-auto ${className}`}>
    <Button variant="outline" size="sm" className="pp-auto-btn" aria-pressed={!manual} onClick={onToggle}>{manual ? <><Play size={12} weight="fill" /> Resume autoplay</> : <><Pause size={12} weight="fill" /> Pause autoplay</>}</Button>
    <span>{hint}</span>
  </div>;
}

// Replays a composed scene every `ms` so every demo loops.
export function Loop({ ms = 9000, children }) {
  const reduce = useReducedMotion();
  const [k, setK] = useState(0);
  useEffect(() => { if (reduce) return; const t = setInterval(() => setK(v => v + 1), ms); return () => clearInterval(t); }, [ms, reduce]);
  return <React.Fragment key={k}>{children}</React.Fragment>;
}

// Left-to-right wipe with a scan line, the home page's screen transition.
export const WIPE_T = { duration: .7, ease: [.65, 0, .35, 1] };
export function Wipe({ id, className = '', children }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={`pp-wipe ${className}`}>{children}</div>;
  return <AnimatePresence initial={false}>
    <motion.div key={id} className={`pp-wipe ${className}`} initial={{ clipPath: 'inset(0 100% 0 0)' }} animate={{ clipPath: 'inset(0 0% 0 0)', transition: WIPE_T }} exit={{ opacity: 1, transition: { delay: .7, duration: 0 } }}>
      {children}
      <motion.i className="wipe-edge" initial={{ left: '0%', opacity: 1 }} animate={{ left: '100%', opacity: [1, 1, 0] }} transition={WIPE_T} />
    </motion.div>
  </AnimatePresence>;
}

// Approved proof numbers.
export function Proof() {
  return <div className="pp-proof">
    {[[250000, 'downloads'], [3400, 'GitHub stars'], [600, 'community']].map(([v, l]) => <span key={l}><b><NumberTicker value={v} startValue={Math.round(v * .92)} />+</b> {l}</span>)}
  </div>;
}

// A download link, styled like the home page's download grid. Real anchors: analytics reads the href.
export function Dl({ href, id, small, label, aria, external, beta, className = '' }) {
  return <a className={`dl ${className}`} href={href} aria-label={aria} title={aria} {...(beta ? { 'data-beta-download': beta } : {})} {...(external ? { target: '_blank', rel: 'noopener' } : {})}>
    {id === 'github' ? <GithubLogo size={22} /> : <PlatformIcon id={id} size={22} />}<span><small>{small}</small>{label}</span>
  </a>;
}

// The real app in a window: each chapter types its command and wipes through its screens.
// Tabs below, autoplay with a progress bar, hover holds, drag or swipe the window to step.
export function AppWindow({ chapters, label }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0); const [hold, setHold] = useState(false); const [manual, setManual] = useState(false);
  const C = chapters[i];
  const dwell = C.dwell || C.shots.reduce((a, s) => a + (s[2] || 3200), 0) + 300;
  useEffect(() => { if (hold || manual || reduce) return; const t = setTimeout(() => setI(v => (v + 1) % chapters.length), dwell); return () => clearTimeout(t); }, [i, hold, manual, reduce]);
  const go = (n) => { setManual(true); setI((n + chapters.length) % chapters.length); };
  const still = hold || manual || reduce;
  return <div className="pp-app" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
    <motion.div className="pp-win" drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={.18}
      onDragEnd={(_, info) => { if (info.offset.x < -60) go(i + 1); else if (info.offset.x > 60) go(i - 1); }}>
      <div className="pp-bar">
        <span className="pp-dots"><i /><i /><i /></span>
        <span className="pp-cmd"><span className="cmd-caret">›</span><TypingAnimation key={C.id} as="span" duration={38} delay={150} startOnView={false} showCursor blinkCursor>{C.cmd}</TypingAnimation></span>
        <span className="pp-badge"><LockKey size={11} /> On this device</span>
      </div>
      <div className="pp-view"><ShotSeq key={C.id} shots={C.shots} /></div>
    </motion.div>
    <div className="pp-tabs" role="group" aria-label={label}>
      <AnimatedBackground defaultValue={C.id} onValueChange={(id) => { const n = chapters.findIndex(c => c.id === id); if (n >= 0 && n !== i) go(n); }} className="pp-tab-hover">
        {chapters.map((c, n) => <button type="button"  data-id={c.id} key={c.id} aria-pressed={n === i} className="pp-tab">
          {c.label}
          {n === i && <motion.i key={`${i}-${still}`} className="pp-tab-bar" initial={{ scaleX: 0 }} animate={{ scaleX: still ? 0 : 1 }} transition={{ duration: still ? .2 : dwell / 1000, ease: 'linear' }} />}
        </button>)}
      </AnimatedBackground>
    </div>
    {!reduce && <AutoCtl className="pp-auto-c" manual={manual} onToggle={() => setManual(m => !m)} hint="Pick a view or drag the window." />}
  </div>;
}

// Capabilities: a tab list with a live stage on wider screens, a swipe row of cards on phones.
// items: { id, title, line, note?, visual: (compact) => node }
export function Explorer({ items, label, ms = 6500, className = '' }) {
  const narrow = useNarrow();
  const reduce = useReducedMotion();
  const [i, setI] = useState(0); const [hold, setHold] = useState(false); const [manual, setManual] = useState(false);
  useEffect(() => { if (hold || narrow || manual || reduce) return; const t = setTimeout(() => setI(v => (v + 1) % items.length), ms); return () => clearTimeout(t); }, [i, hold, narrow, manual, reduce]);
  if (narrow) return <MobileRail className={`pp-rail ${className}`}>
    {items.map(it => <article className="pp-card" key={it.id}>
      <div className="pp-card-vis">{typeof it.visual === 'function' ? it.visual(true) : null}</div>
      <div className="pp-card-tx"><b>{it.title}</b><span>{it.line}</span>{it.note && <small>{it.note}</small>}</div>
    </article>)}
  </MobileRail>;
  const P = items[i];
  return <div className={`pillar-grid pp-explorer ${className}`} onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
    <div className="pillar-list" role="group" aria-label={label}>
      <AnimatedBackground defaultValue={P.id} onValueChange={(id) => { const n = items.findIndex(p => p.id === id); if (n >= 0) { setManual(true); setI(n); } }} className="pillar-hover">
        {items.map((p, n) => <button type="button"  data-id={p.id} key={p.id} aria-pressed={n === i} className="pillar-tab">
          <span className="pillar-num">{String(n + 1).padStart(2, '0')}</span>
          <span className="pillar-tx"><b>{p.title}</b>{n === i && <motion.span className="pillar-line" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{p.line}</motion.span>}</span>
          {n === i && <motion.i key={`${i}-${hold}-${manual}`} className="pillar-bar" initial={{ scaleX: 0 }} animate={{ scaleX: hold || manual || reduce ? 0 : 1 }} transition={{ duration: hold || manual || reduce ? .2 : ms / 1000, ease: 'linear' }} />}
        </button>)}
      </AnimatedBackground>
      {!reduce && <AutoCtl manual={manual} onToggle={() => setManual(m => !m)} hint="Select a feature to stop autoplay." />}
    </div>
    <div className="pillar-stage pp-stage">
      <Wipe id={P.id} className="pillar-view">
        <div className="pillar-visual">{typeof P.visual === 'function' ? P.visual(false) : null}</div>
        {P.note && <p className="pp-note">{P.note}</p>}
      </Wipe>
    </div>
    <div className="sr-only">{items.map(p => <p key={p.id}>{p.title}: {p.line}{p.note ? ` ${p.note}` : ''}</p>)}</div>
  </div>;
}

// A fixed design canvas scaled to fill its box (CSS zoom, like the home walkthrough's --fit),
// so a composed scene reads at the same proportions in any stage.
export function Fit({ w = 560, h = 420, max = 1.6, children }) {
  const ref = useRef(null); const [z, setZ] = useState(1);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const ro = new ResizeObserver(([e]) => { const { width, height } = e.contentRect; if (width) setZ(Math.min(width / w, height ? height / h : width / w, max)); });
    ro.observe(el); return () => ro.disconnect();
  }, []);
  return <div className="pp-fit" ref={ref} style={{ '--ar': `${w}/${h}` }}><div className="pp-fit-in" style={{ width: w, height: h, zoom: z }}>{children}</div></div>;
}

// A real screen, framed. Always shown whole.
export function Framed({ children }) { return <div className="pillar-shot pp-framed">{children}</div>; }
export function Seq({ shots }) { return <div className="pp-seq"><ShotSeq shots={shots} /></div>; }

// Free vs Pro, side by side (a swipe row on phones).
export function FreeVsPro({ pricing, free, pro, freeCta, id = 'free-vs-pro', lead = 'Free to run.', dim = 'Pro when you want more.' }) {
  return <section id={id} className="chapter pp pp-plans-sec" aria-labelledby={`${id}-h`}>
    <div className="section-shell">
      <div className="sec-head"><Kicker>FREE OR PRO</Kicker><Title id={`${id}-h`} lead={lead} dim={dim} /></div>
      <MobileRail className="pp-plans" start={0}>
        <SceneCard className="plan-card"><div className="plan"><Kicker>FREE</Kicker><div className="price"><span className="amt">$0</span><small>forever</small></div>
          <ul>{free.map(x => <li key={x}><Check size={14} />{x}</li>)}</ul>
          {freeCta}</div></SceneCard>
        <SceneCard className="plan-card plan-card-hero" busy><div className="plan plan-hero"><Kicker>PRO</Kicker><div className="price"><span className="amt">${pricing.lifetime}</span><small>once, yours forever</small></div>
          <ul>{pro.map(x => <li key={x}><Check size={14} />{x}</li>)}</ul>
          <p className="pp-offer"><strong>Off Grid AI Pro is live: ${pricing.lifetime}, yours forever.</strong> Up to {pricing.devices} devices. Or ${pricing.monthly}/month. The lifetime price rises as we grow.</p>
          <div className="pp-plan-ctas"><a className="pp-btn pp-btn-primary" href="/pro/#buy">Own Pro forever · ${pricing.lifetime}</a><a className="pp-btn" href="/pro/">See everything Pro does</a></div>
        </div></SceneCard>
      </MobileRail>
    </div>
  </section>;
}

// FAQ: Radix Accordion. Answers are nodes so links survive.
export function Faq({ items }) {
  return <section className="chapter pp pp-faq-sec" aria-labelledby="questions">
    <div className="section-shell">
      <div className="sec-head"><Kicker>QUESTIONS</Kicker><h2 id="questions" className="pp-h2"><span className="t-line">Questions.</span><span className="t-line t-dim">Short answers.</span></h2></div>
      <Accordion.Root type="single" collapsible defaultValue="q0" className="pp-faq">
        {items.map(([q, a], n) => <Accordion.Item key={q} value={`q${n}`} className="pp-faq-item">
          <Accordion.Header asChild><h3><Accordion.Trigger className="pp-faq-q">{q}<CaretDown size={14} aria-hidden="true" /></Accordion.Trigger></h3></Accordion.Header>
          <Accordion.Content className="pp-faq-a" forceMount><div>{a}</div></Accordion.Content>
        </Accordion.Item>)}
      </Accordion.Root>
    </div>
  </section>;
}

/* ───────── Live scenes, composed with SmoothUI AI components. Used on phone screens and in cards. ───────── */

export function Phone({ children, time = '09:41', status }) {
  return <div className="pp-phone">
    <div className="pp-screen"><div className="pp-status"><span>{time}</span><span>{status || <><WifiSlash size={10} /> Offline</>}</span></div><div className="pp-screen-in">{children}</div></div>
    <Iphone />
  </div>;
}
// Real phone screens (assets/img/home/mobile, curated: no personal data), wiping left to right in a Magic UI Iphone.
// shots: [[file, alt, ms?]]; file is the name without extension, e.g. 'models-1-light'.
const mobSrc = (f) => `/assets/img/home/mobile/${f}-640.webp`;
export function PhoneShots({ shots, ms = 3600, controls }) {
  const [i, setI] = useState(0); const [manual, setManual] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => { if (shots.length < 2 || manual || reduce) return; const t = setTimeout(() => setI(v => (v + 1) % shots.length), shots[i][2] || ms); return () => clearTimeout(t); }, [i, shots.length, manual, reduce]);
  const [f, alt] = shots[i];
  const phone = <div className="pp-phone pp-phone-shot">
    <div className="pp-screen pp-screen-shot">
      {shots.length > 1 && <div className="preload" aria-hidden="true">{shots.map(x => <img key={x[0]} src={mobSrc(x[0])} alt="" />)}</div>}
      <Wipe id={`${f}-${i}`}><a className="pp-screen-link" href={`/assets/img/home/mobile/${f}.webp`} target="_blank" rel="noopener" aria-label={`Open full-size screenshot: ${alt}`} onClick={() => setManual(true)}>
        <img className={`pp-mshot ${/-dark$/.test(f) ? 'is-dark' : ''}`} src={mobSrc(f)} srcSet={`${mobSrc(f)} 640w, /assets/img/home/mobile/${f}.webp 1290w`} sizes="(max-width: 860px) 300px, 400px" alt={alt} draggable={false} />
      </a></Wipe>
    </div>
    <Iphone />
  </div>;
  if (!controls) return phone;
  return <>{phone}{!reduce && <AutoCtl className="pp-auto-c" manual={manual} onToggle={() => setManual(m => !m)} hint="Select the image to enlarge it. Pinch to zoom." />}</>;
}

// Same content without the phone frame (phone-width cards).
export function Screen({ children }) { return <div className="pp-screen pp-screen-flat"><div className="pp-screen-in">{children}</div></div>; }

export function SceneHead({ title, badge }) {
  return <div className="ms-head"><b>{title}</b>{badge && <span className="ms-badge">{badge}</span>}</div>;
}

export function ChatScene({ q, a, model, citations, file }) {
  const [text, streaming] = useStream(a, { start: 900 });
  return <div className="ms">
    <SceneHead title="Chat" badge={model} />
    {file && <span className="ms-file"><FilePdf size={12} /> {file}</span>}
    <AIMessage from="user">{q}</AIMessage>
    <AIResponse isStreaming={streaming} text={text} citations={citations} />
  </div>;
}

export function ImageScene({ runs, label }) {
  const [run, setRun] = useState(0); const [phase, setPhase] = useState(0);
  useEffect(() => {
    const ts = [setTimeout(() => setPhase(1), 1500), setTimeout(() => setPhase(2), 3300), setTimeout(() => { setPhase(0); setRun(r => (r + 1) % runs.length); }, 5600)];
    return () => ts.forEach(clearTimeout);
  }, [run]);
  const [f, model, prompt] = runs[run];
  return <div className="ms">
    <SceneHead title="Create image" badge={label || model} />
    <div className="ms-prompt"><span className="cmd-caret">›</span><TypingAnimation key={run} as="span" duration={24} startOnView={false} showCursor={phase === 0}>{prompt}</TypingAnimation></div>
    <div className="ms-canvas">
      <AnimatePresence initial={false}>
        <motion.img key={`${run}-${phase > 0}`} src={`/assets/img/home/gen-${f}.webp`} alt={phase ? `${prompt}, made on device with ${model}` : ''} width="512" height="512"
          initial={{ opacity: 0 }} animate={{ opacity: phase === 0 ? 0 : phase === 1 ? .35 : 1, scale: phase === 1 ? 1.04 : 1 }} exit={{ opacity: 0 }} transition={{ duration: phase === 1 ? 1.6 : .45 }} />
      </AnimatePresence>
      {phase < 2 && <span className="ms-canvas-tag">{phase === 1 ? 'Live preview · on this device' : 'Waiting for prompt'}</span>}
      <i className="ms-progress"><motion.b key={`${run}-${phase}`} initial={{ scaleX: phase === 2 ? 1 : 0 }} animate={{ scaleX: phase === 0 ? 0 : 1 }} transition={{ duration: phase === 1 ? 1.8 : 0, ease: 'linear' }} /></i>
    </div>
  </div>;
}

export function VisionScene() {
  const [text, streaming] = useStream('A golden retriever, sitting on the grass in an autumn park. Fallen leaves, warm afternoon light.', { start: 1400 });
  return <div className="ms">
    <SceneHead title="Vision" badge="Gemma 4 · on device" />
    <img className="ms-photo" src="/assets/img/home/gen-dreamshaper.webp" alt="A golden retriever in an autumn park." width="512" height="512" loading="lazy" />
    <AIMessage from="user">What is in this photo?</AIMessage>
    <AIResponse isStreaming={streaming} text={text} />
  </div>;
}

export function VoiceScene({ title = 'Voice', badge = 'Whisper · on device', text = 'Move the pilot to the fourteenth and tell Sam.', speaking }) {
  const [k, setK] = useState(0);
  useEffect(() => { const t = setInterval(() => setK(v => v + 1), 5200); return () => clearInterval(t); }, []);
  return <div className="ms ms-voice">
    <SceneHead title={title} badge={badge} />
    <div className="ms-wave" aria-hidden="true">{Array.from({ length: 22 }, (_, n) => <motion.i key={n} animate={{ scaleY: [.25, .5 + ((n * 37) % 50) / 100, .25] }} transition={{ duration: .9 + (n % 5) * .15, repeat: Infinity, ease: 'easeInOut', delay: (n % 7) * .08 }} />)}</div>
    <span className="ms-mic">{speaking ? <ChatCircle size={18} /> : <Microphone size={18} />}</span>
    <TextEffect key={k} as="p" per="word" preset="fade" speedReveal={.6} className="ms-said">{text}</TextEffect>
  </div>;
}

export function OfflineScene({ where = 'this device' }) {
  const [text, streaming] = useStream(`Still answering. The model runs on ${where}, so it works on a plane, in a basement, anywhere.`, { start: 1300 });
  return <div className="ms">
    <SceneHead title="Chat" badge={<><WifiSlash size={10} /> No internet</>} />
    <motion.span className="ms-offline" initial={{ opacity: 0, scale: .8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .5 }}><WifiSlash size={26} /><small>Wi-Fi off</small></motion.span>
    <AIMessage from="user">Do you still work offline?</AIMessage>
    <AIResponse isStreaming={streaming} text={text} />
  </div>;
}

export function ToolsScene() {
  const [done, setDone] = useState(false);
  useEffect(() => { const t = setTimeout(() => setDone(true), 1600); return () => clearTimeout(t); }, []);
  const [text, streaming] = useStream('18% of 2,450 is 441. Your notes say the pilot budget is 2,450, so 441 is the contingency.', { start: 1800 });
  return <div className="ms">
    <SceneHead title="Chat" badge="Tools on" />
    <div className="ms-tools">{['Web search', 'Calculator', 'Document lookup'].map(t => <span key={t} className="chip">{t}</span>)}</div>
    <AIMessage from="user">What is 18% of the pilot budget?</AIMessage>
    <AIReasoning isStreaming={!done} duration={1} defaultOpen={false}>Looked up the budget in your notes. Used the calculator.</AIReasoning>
    <AIResponse isStreaming={streaming} text={text} />
  </div>;
}

export function ApprovalScene({ draft, to, question }) {
  const [k, setK] = useState(0); const [auto, setAuto] = useState(undefined);
  useEffect(() => { setAuto(undefined); const t = setTimeout(() => setAuto('send'), 3600); const r = setTimeout(() => setK(v => v + 1), 8200); return () => { clearTimeout(t); clearTimeout(r); }; }, [k]);
  return <div className="ms">
    <SceneHead title="Draft" badge={`To ${to}`} />
    <p className="ms-draft"><TypingAnimation key={k} as="span" duration={14} startOnView={false} showCursor={false}>{draft}</TypingAnimation></p>
    <div className="ms-approval">
      <AIApproval key={`${k}-${auto || 'open'}`} resolvedId={auto} question={question}
        options={[{ id: 'send', label: 'Approve and send', detail: 'Nothing goes without your yes' }, { id: 'later', label: 'Not now', detail: 'Keep as a draft' }]} />
    </div>
  </div>;
}

