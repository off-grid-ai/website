import React, { useEffect, useRef, useState } from 'react';
import { Heading, Text, TextField } from '@radix-ui/themes';
import { motion, AnimatePresence } from 'motion/react';
import * as Accordion from '@radix-ui/react-accordion';
import { ArrowRight, ArrowUpRight, Check, LockKey, Brain, ChartBar, CheckCircle, Sparkle, ShieldCheck, ArrowsClockwise, PaperPlaneTilt, EnvelopeSimple, Plus, Key, Play, Pause, ClipboardText } from '@phosphor-icons/react';
import { AnimatedBackground } from '@motion-primitives/animated-background';
import { BlurFade } from '@magicui/blur-fade';
import { ShimmerButton } from '@magicui/shimmer-button';
import { InteractiveHoverButton } from '@magicui/interactive-hover-button';
import { Highlighter } from '@magicui/highlighter';
import { AnimatedShinyText } from '@magicui/animated-shiny-text';
import Button from '@smoothui/smooth-button';
import { PageShell, Kicker, Title, Lede, SceneCard, SectionBg, ShotSeq, Shot, Preload, ZoomCtx, useZoomOwner, ScreenCtx, CmdBar, CmdScope, screenTime } from '../shared.jsx';
import { installClickTracking } from './_track.js';
import { useAutoProgress } from './_product.jsx';

const toBuy = (label, section) => { proCta('#buy', label, section); document.getElementById('buy')?.scrollIntoView({ behavior: 'smooth' }); history.replaceState(null, '', '#buy'); };

/* ───────── Hero: the product, large ───────── */

function Proof() {
  return <p className="pp-proof"><span><b>250,000+</b> downloads</span><span><b>3,400+</b> GitHub stars</span><span><b>600+</b> community</span></p>;
}

function Hero({ pricing }) {
  return <section className="has-bg pp-sec pp-hero" data-section="Hero" aria-labelledby="pp-h"><SectionBg />
    <div className="section-shell pp-hero-in">
      <span className="pp-live"><span className="pulse" /><AnimatedShinyText shimmerWidth={120}>Off Grid AI Pro · Live now</AnimatedShinyText></span>
      <Title as="h1" id="pp-h" className="pp-h1" lead="An AI that remembers your work." dim="And acts when you say yes." />
      <div className="pp-cta">
        <ShimmerButton className="pro-shimmer pp-shimmer" shimmerColor="#6EE7B7" shimmerSize="0.08em" borderRadius="8px" shimmerDuration="2.6s" background="var(--og-primary)"
          onClick={(e) => toBuy(e.currentTarget.textContent.trim(), 'Hero')}>Own Pro for ${pricing.lifetime}</ShimmerButton>
        <a className="pp-quiet" href="#buy" data-cta="">or ${pricing.monthly}/month</a>
      </div>
      <Proof />
      <SceneCard className="pp-hero-card" busy><CmdScope chapter="pro-hero" cmd="open today">{(text, seq) => <><CmdBar text={text} seq={seq} className="tour-cmd-card" />
        <div className="pp-frame"><ScreenCtx.Provider value={null}><div className="wt-shot pp-under" aria-hidden="true"><div className="wt-shot-in"><Shot name="day" alt="" lazy={false} /></div></div></ScreenCtx.Provider><ShotSeq ms={3800} shots={[
          ['day', 'Off Grid AI Day: to-dos, journal, meetings and time spent.'],
          ['approval', 'Off Grid AI approval card: the reply to Sam Okafor, waiting for Approve, Edit or Reject.'],
        ]} /></div>
      </>}</CmdScope></SceneCard>
    </div>
  </section>;
}

/* ───────── Price ladder (live tier from the customer count) ───────── */

function currentTier(tiers, count) {
  for (let i = 0; i < tiers.length; i++) {
    if (tiers[i].until === 0) return i;
    if (count < tiers[i].until) return i;
  }
  return tiers.length - 1;
}

function Ladder({ pricing }) {
  const tiers = pricing.tiers; const n = tiers.length;
  const [count, setCount] = useState(null); const [failed, setFailed] = useState(false);
  useEffect(() => {
    const endpoint = pricing.count_endpoint; if (!endpoint) return;
    const controller = typeof AbortController === 'function' ? new AbortController() : null;
    const timeout = setTimeout(() => { if (controller) controller.abort(); setFailed(true); }, 8000);
    fetch(endpoint, controller ? { signal: controller.signal } : undefined)
      .then(r => (r.ok ? r.json() : Promise.reject()))
      .then(d => { if (typeof d.count !== 'number') throw new Error('Invalid customer count'); setCount(d.count); })
      .catch(() => setFailed(true))
      .then(() => clearTimeout(timeout));
    return () => clearTimeout(timeout);
  }, []);
  const cur = count == null ? 0 : currentTier(tiers, count);
  const start = cur > 0 ? tiers[cur - 1].until : 0; const end = tiers[cur].until;
  const frac = count != null && end > start ? Math.min(1, Math.max(0, (count - start) / (end - start))) : 0;
  const fill = count == null ? 0 : (cur + frac) / (n - 1);
  const monthly = cur === n - 1 ? `Prefer a subscription? Pay $${tiers[cur].monthly}/month.`
    : cur === n - 2 ? `Prefer a subscription? Pay $${tiers[cur].monthly}/month before it rises to $${tiers[cur + 1].monthly}.`
    : `Prefer a subscription? Pay $${tiers[cur].monthly}/month before it rises to $${tiers[cur + 1].monthly}, then $${tiers[n - 1].monthly}.`;
  return <div className="pp-ladder" id="og-ladder" data-endpoint={pricing.count_endpoint}>
    <p className="pp-count" id="og-count-line" role="status" aria-live="polite">
      {count == null ? <span className="pp-muted">{failed ? 'Customer count unavailable.' : 'Loading customer count...'}</span>
        : <span><b>{count.toLocaleString()}</b> people own Pro. The price rises as more join.</span>}
    </p>
    <div className="pp-tiers" style={{ '--n': n }}>
      <div className="pp-track" aria-hidden="true"><i /><motion.b initial={{ scaleX: 0 }} animate={{ scaleX: fill }} transition={{ duration: 1.2, ease: [.2, .8, .2, 1] }} /></div>
      {tiers.map((t, i) => <div key={t.label} className={`pp-tier ${count != null && i < cur ? 'past' : ''} ${count != null && i === cur ? 'cur' : ''}`}>
        <span className="pp-dot" />
        <span className="pp-tier-price">${t.lifetime}<small> once</small></span>
        <span className="pp-tier-label">{t.label}</span>
      </div>)}
    </div>
    {count != null && tiers[cur].until !== 0 && <p className="pp-spots" id="og-spots"><b>{Math.max(0, tiers[cur].until - count).toLocaleString()}</b> spots left at ${tiers[cur].lifetime} for life before the price jumps to ${tiers[cur + 1].lifetime}.</p>}
    <p className="pp-monthly" id="og-monthly">{count == null ? `Prefer a subscription? Pay $${pricing.monthly}/month before it rises to $7.99, then $${pricing.top_monthly}.` : monthly}</p>
  </div>;
}

/* ───────── Checkout: same behaviour as the old /pro/ script ───────── */

// Stable id per buyer+plan so a double-click reports ONE Google Ads conversion. Hashed: the raw email never goes to Google.
function dedupeId(plan, email) {
  let h = 5381;
  for (let i = 0; i < email.length; i++) h = ((h << 5) + h + email.charCodeAt(i)) | 0;
  return plan + '-' + (h >>> 0).toString(36);
}

// The checkout helpers stay plain browser scripts (they are shared with /thank-you/ and unit tests):
// load them as globals, exactly as pro.md did with <script src>.
function useScript(src) {
  useEffect(() => {
    if (document.querySelector(`script[src="${src}"]`)) return;
    const s = document.createElement('script'); s.src = src; document.body.appendChild(s);
  }, [src]);
}

function Checkout({ pricing, checkout }) {
  useScript('/assets/js/revenuecat-link.js');
  useScript('/assets/js/checkout-plan.js');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const form = useRef(null); const input = useRef(null); const fired = useRef({});
  const LINKS = checkout.links;
  const PLAN_VALUES = { monthly: Number(pricing.monthly), lifetime: Number(pricing.lifetime) };
  const ADS_ENABLED = checkout.adsLabel !== '';
  const ADS_SEND_TO = `${checkout.adsId}/${checkout.adsLabel}`;
  const reportOnce = (name) => {
    if (fired.current[name] || typeof window.posthog === 'undefined') return;
    fired.current[name] = true;
    try { window.posthog.capture(name, { source: window.location.pathname }); } catch (err) { console.warn('PostHog tracking failed:', err); }
  };
  useEffect(() => {
    // The browser may autofill or restore the field without an input event.
    if (input.current && input.current.value !== email) setEmail(input.current.value);
    if (typeof IntersectionObserver !== 'function' || !form.current) return;
    const io = new IntersectionObserver((entries) => {
      if (entries.some(e => e.isIntersecting)) { reportOnce('pro_buy_form_viewed'); io.disconnect(); }
    }, { threshold: 0.4 });
    io.observe(form.current);
    return () => io.disconnect();
  }, []);
  const onInput = (e) => {
    const v = e.target.value; setEmail(v);
    if (status && status.kind === 'error') setStatus(null);
    if (v.trim() !== '') reportOnce('pro_email_entered');
  };
  const buy = (plan) => {
    const RevenueCatLink = window.RevenueCatLink; if (!RevenueCatLink) return;
    const value = (input.current ? input.current.value : email).trim();
    if (!RevenueCatLink.isValidEmail(value)) { setStatus({ kind: 'error', text: 'Enter a valid email address.' }); input.current && input.current.focus(); return; }
    const url = RevenueCatLink.buildPurchaseUrl(LINKS[plan], value);
    if (!url) { setStatus({ kind: 'error', text: 'Checkout is not available right now. Please try again later.' }); return; }
    if (typeof window.posthog !== 'undefined') {
      // Never let an analytics failure stop the purchase. Identify on the email: it is the RevenueCat app user id.
      try {
        window.posthog.identify(value, { email: value });
        window.posthog.capture('pro_checkout_started', { email: value, plan, source: window.location.pathname });
      } catch (err) { console.warn('PostHog tracking failed:', err); }
    }
    // Hand the plan to /thank-you/: RevenueCat's redirect carries only the app user id.
    if (window.CheckoutPlan) window.CheckoutPlan.remember(plan, PLAN_VALUES[plan]);
    if (ADS_ENABLED && typeof window.gtag === 'function') {
      try { window.gtag('event', 'conversion', { send_to: ADS_SEND_TO, value: PLAN_VALUES[plan], currency: 'USD', transaction_id: dedupeId(plan, value) }); }
      catch (err) { console.warn('Google Ads conversion failed:', err); }
    }
    setStatus({ kind: 'success', url });
    window.open(url, '_blank');
  };
  const off = email.trim() === '';
  // A visitor who chose monthly on another page lands with monthly as the main action.
  const [plan, setPlan] = useState('lifetime');
  useEffect(() => { if (new URLSearchParams(location.search).get('plan') === 'monthly') setPlan('monthly'); }, []);
  const primary = plan === 'monthly' ? ['monthly', `Start Pro for $${pricing.monthly}/month`] : ['lifetime', `Own Pro forever for $${pricing.lifetime}`];
  const secondary = plan === 'monthly' ? ['lifetime', `Or own it forever for $${pricing.lifetime}`] : ['monthly', `Or $${pricing.monthly}/month`];
  const err = status && status.kind === 'error';
  return <form id="payForm" ref={form} className="pp-form" noValidate onSubmit={(e) => { e.preventDefault(); buy(primary[0]); }}>
    <label className="pp-label" htmlFor="payEmail">Email for your license key</label>
    <TextField.Root ref={input} id="payEmail" type="email" size="3" placeholder="your@email.com" autoComplete="email" required
      aria-invalid={err ? 'true' : 'false'} aria-describedby="payStatus" className={`pp-input ${err ? 'ea-input-error' : ''}`} value={email} onChange={onInput}>
      <TextField.Slot><EnvelopeSimple size={16} /></TextField.Slot>
    </TextField.Root>
    <ShimmerButton type="button" data-plan={primary[0]} disabled={off} onClick={() => buy(primary[0])} className="pro-shimmer pp-shimmer pp-buy"
      shimmerColor="#6EE7B7" shimmerSize="0.08em" borderRadius="8px" shimmerDuration="2.6s" background="var(--og-primary)">{primary[1]}</ShimmerButton>
    <InteractiveHoverButton type="button" data-plan={secondary[0]} disabled={off} onClick={() => buy(secondary[0])} className="ihb pp-buy">{secondary[1]}</InteractiveHoverButton>
    <p className={`ea-status pp-status ${err ? 'ea-status-error' : ''} ${status && status.kind === 'success' ? 'ea-status-success' : ''}`} id="payStatus" aria-live="polite">
      {err ? status.text : status && status.kind === 'success' ? <>Checkout opened in a new tab. <a href={status.url} target="_blank" rel="noopener">Reopen it</a> if your browser blocked the popup.</> : null}
    </p>
    <ul className="pp-trust">
      <li><Key size={13} />Your key arrives by email. Enter it in the app.</li>
      <li><LockKey size={13} />Secure checkout by RevenueCat. Promo codes go in there.</li>
      <li><ShieldCheck size={13} />Your devices, models and data never touch the purchase.</li>
    </ul>
    <p className="pp-fine"><a href="/terms/">Terms</a></p>
  </form>;
}


const GET = (p) => ['Memory and search', 'Actions you approve', 'Pro Sync', `${p.devices} devices, desktop and mobile`, 'Every update'];

function Buy({ pricing, checkout }) {
  return <section id="buy" className="pp-sec pp-buy-sec" data-section="Get Pro" aria-labelledby="buy-h">
    <div className="section-shell">
      <BlurFade blur="0px" inView inViewMargin="-80px" className="pp-head pp-head-c"><Kicker>GET PRO</Kicker>
        <Heading as="h2" id="buy-h" className="pp-h2"><span className="t-line">Own it now,</span><span className="t-line t-dim">before the price <Highlighter action="underline" color="#34D399" strokeWidth={2} padding={2} isView>climbs</Highlighter>.</span></Heading>
      </BlurFade>
      <div className="pp-buy-grid">
        <SceneCard className="plan-card plan-card-hero pp-checkout" busy>
          <div className="plan plan-hero">
            <div className="pp-plan-top"><Kicker>RECOMMENDED · ONE PAYMENT</Kicker></div>
            <div className="pp-plan-row"><Heading as="h3">Pro lifetime</Heading><div className="price"><span className="amt">${pricing.lifetime}</span><small>once</small></div></div>
            <ul className="pp-get">{GET(pricing).map(x => <li key={x}><Check size={14} />{x}</li>)}</ul>
            <Checkout pricing={pricing} checkout={checkout} />
          </div>
        </SceneCard>
        <div className="pp-buy-side" id="do-the-math">
          <Ladder pricing={pricing} />
          <Proof />
        </div>
      </div>
    </div>
  </section>;
}

const FAQ = (p) => [
  ['Does the price go up?', `Yes, as more people join. Lifetime steps from $${p.lifetime} to $119, then $${p.top_lifetime}. Monthly from $${p.monthly} to $7.99, then $${p.top_monthly}. You keep the price you buy at.`],
  ['How many devices?', `One key covers up to ${p.devices} devices.`],
  ['Desktop and mobile?', 'Yes. One key unlocks Pro on both. Features differ by platform.'],
  ['Does it work offline?', 'Local models run on your hardware. Once a model is downloaded, local chat works offline. Web tools and connected services need a connection.'],
  ['What does Free include?', 'Local models for chat, files, voice and images. Offline. No account. Pro adds memory, actions you approve, God and Sync.'],
  ['What happens after I pay?', 'We email your key. Enter it in the app and Pro starts right away.'],
  ['Can I use a promo code?', 'Yes. Enter it on the checkout page before you pay.'],
];
function Faq({ pricing }) {
  return <section id="faq" className="pp-sec pp-faq-sec" aria-labelledby="faq-h">
    <div className="section-shell pp-faq-grid">
      <div className="pp-head"><Kicker>QUESTIONS</Kicker><Heading as="h2" id="faq-h" className="pp-h2"><span className="t-line">Before you buy.</span></Heading></div>
      <div>
        <Accordion.Root type="single" collapsible className="pp-faq">
          {FAQ(pricing).map(([q, a]) => <Accordion.Item key={q} value={q} className="pp-faq-item">
            <Accordion.Header asChild><h3><Accordion.Trigger className="pp-faq-q">{q}<Plus size={16} aria-hidden="true" /></Accordion.Trigger></h3></Accordion.Header>
            <Accordion.Content className="pp-faq-a"><p>{a}</p></Accordion.Content>
          </Accordion.Item>)}
        </Accordion.Root>
        <p className="pp-before" data-analytics-view="design_partner_offer_viewed" data-analytics-placement="pro_payment_form">Team under 50 people? You could get Pro free. <a href="/design-partners/" data-analytics-event="design_partner_offer_clicked" data-analytics-placement="pro_payment_form">Read the offer</a></p>
      </div>
    </div>
  </section>;
}

// The primary CTA, repeated after each major section.
function Again({ pricing, section }) {
  return <div className="pp-again"><ShimmerButton className="pro-shimmer pp-shimmer" shimmerColor="#6EE7B7" shimmerSize="0.08em" borderRadius="8px" shimmerDuration="2.6s" background="var(--og-primary)"
    onClick={(e) => toBuy(e.currentTarget.textContent.trim(), section)}>Own Pro for ${pricing.lifetime}</ShimmerButton></div>;
}

// Phones: a bottom bar once the hero is gone, hidden while the buy block is on screen.
function StickyBuy({ pricing }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const hero = document.querySelector('.pp-hero'); const buy = document.getElementById('buy');
    if (!hero || !buy || typeof IntersectionObserver !== 'function') return;
    // Hidden over the hero, over the buy block and whenever an inline Get Pro button is on screen.
    let pastHero = false; let buyOn = false; const ctas = new Set();
    const sync = () => { const on = pastHero && !buyOn && ctas.size === 0; setShow(on); document.documentElement.classList.toggle('pp-bar-on', on); };
    const io1 = new IntersectionObserver(([e]) => { pastHero = !e.isIntersecting && e.boundingClientRect.top < 0; sync(); });
    const io2 = new IntersectionObserver(([e]) => { buyOn = e.isIntersecting; sync(); }, { threshold: 0.05 });
    const io3 = new IntersectionObserver((es) => { es.forEach(e => (e.isIntersecting ? ctas.add(e.target) : ctas.delete(e.target))); sync(); });
    io1.observe(hero); io2.observe(buy); document.querySelectorAll('.pp-again, .pp-final .pp-shimmer').forEach(el => io3.observe(el));
    const io1d = io1.disconnect.bind(io1); io1.disconnect = () => { io1d(); io3.disconnect(); };
    return () => { io1.disconnect(); io2.disconnect(); document.documentElement.classList.remove('pp-bar-on'); };
  }, []);
  return <AnimatePresence>{show && <motion.div className="pp-bar" initial={{ y: '110%' }} animate={{ y: 0 }} exit={{ y: '110%' }} transition={{ type: 'spring', stiffness: 380, damping: 36 }}>
    <span className="pp-bar-tx"><b>Pro · ${pricing.lifetime} once</b><small>or ${pricing.monthly}/month</small></span>
    <ShimmerButton className="pro-shimmer pp-shimmer pp-bar-btn" shimmerColor="#6EE7B7" shimmerSize="0.08em" borderRadius="8px" shimmerDuration="2.6s" background="var(--og-primary)"
      onClick={(e) => toBuy(e.currentTarget.textContent.trim(), 'Sticky bar')}>Own Pro · ${pricing.lifetime}</ShimmerButton>
  </motion.div>}</AnimatePresence>;
}

/* ───────── What Pro is: one tab per capability, one large real screen ───────── */

const CAPS = [
  { id: 'memory', cmd: 'remember my work', anchors: ['it-sees', 'it-remembers'], Icon: Brain, tab: 'Memory', title: 'It sees. It remembers.', line: 'Screens, meetings, mail and docs become one local memory.',
    shots: [['replay', 'Off Grid AI Replay: the Acme rollout plan you had open, captured with a summary.'], ['meetings', 'Off Grid AI Meetings: the Acme pilot kickoff summary, screens shared and decisions.'], ['meetings-transcript', 'Off Grid AI Meetings: the transcript, transcribed on this Mac.'], ['people-sam', "Off Grid AI People: Sam Okafor's story, open to-dos and today's timeline."], ['people-why', 'Off Grid AI People: Why opens the captured screen behind a claim about Sam.']] },
  { id: 'act', cmd: 'what do I owe people?', anchors: ['it-acts-you-approve', 'built-for-people-who-build'], Icon: CheckCircle, tab: 'Actions', title: 'It acts. You approve.', line: 'Replies, issues and docs through Gmail, Linear, Jira and Notion. Nothing runs without your yes.',
    shots: [['act-todos', 'Off Grid AI Actions: to-dos with owners, due dates and where they came from.'], ['act-draft', 'Off Grid AI Chat: the reply to Sam drafted from the kickoff, with sources.'], ['act-approvals', 'Off Grid AI Actions: pending approvals, each showing where it came from.'], ['act-history', 'Off Grid AI Actions: history, the reply to Sam sent and a promo email rejected.']] },
  { id: 'god', cmd: 'brief me, Ares', anchors: ['it-gets-ahead-of-you'], Icon: Sparkle, tab: 'God', title: 'God, your chief of staff.', line: 'It briefs you, runs your routines and lines up work for your yes.',
    shots: [['god', 'Off Grid AI God: the 8:50 AM briefing from Ares, with three approvals waiting.'], ['god-prep', 'Off Grid AI God: prep for the Northwind board meeting, with last-time notes and cited sources.'], ['god-waiting', 'Off Grid AI God: what is waiting for you, the approvals and what Priya and Tom owe you.'], ['god-voice', 'Off Grid AI God in voice mode: the morning briefing as voice notes.'], ['god-routines', 'Off Grid AI God settings: scheduled tasks such as the weekday morning briefing, meeting prep and an approvals digest.'], ['god-rules', 'Off Grid AI God settings: the rules Ares always follows, like never sending anything to Acme without asking.'], ['god-choose', 'Off Grid AI God settings: Ares is your god; Athena is a download away.']] },
  { id: 'reflect', cmd: 'where did my time go?', anchors: ['it-reflects'], Icon: ChartBar, tab: 'Reflect', title: 'Where your day went.', line: 'Time by project, app and person. No timers.',
    shots: [['reflect', 'Off Grid AI Reflect: time by app, people and focus.']] },
  { id: 'vault', cmd: 'unlock my vault', anchors: [], Icon: LockKey, tab: 'Vault', title: 'Your secrets stay yours.', line: 'Passwords, keys, notes and files, encrypted. Unlocked only by you.',
    shots: [['vault-locked', 'Off Grid AI Vault, locked.', 1500], ['vault-typing', 'Entering the master password.', 1300], ['vault-open', 'Off Grid AI Vault: logins, an API key, a secure note and a signed PDF.', 3400]] },
  { id: 'clipboard', cmd: 'search what I copied for acme', anchors: [], Icon: ClipboardText, tab: 'Clipboard', title: 'Your clipboard remembers.', line: 'Text, links, images and files you copy, searchable on your disk.',
    shots: [['clipboard-all', 'Off Grid AI Clipboard: everything copied today, images, files, links and text.'], ['clipboard-pdf', 'Off Grid AI Clipboard: the rollout plan PDF, previewed as text.'], ['clipboard-phone', "Off Grid AI Clipboard: a note copied on Alex's iPhone, on the Mac."], ['clipboard-quick', 'Off Grid AI Clipboard: quick open over any app, searching for Sam.']] },
];
// Each tab plays all of its screens once, then hands over.
const dwell = (c) => c.shots.reduce((t, x) => t + screenTime(x), 0);

function WhatPro({ again }) {
  const [i, setI] = useState(0); const [hold, setHold] = useState(false); const prev = useRef(null);
  const go = (k) => setI(cur => { if (k !== cur) prev.current = CAPS[cur]; return k; });
  const prog = useAutoProgress(i, dwell(CAPS[i]), hold, () => go((i + 1) % CAPS.length));
  const { ctx: zoom, viewer } = useZoomOwner({ index: i, count: CAPS.length, title: CAPS[i].title, line: CAPS[i].line, progress: prog, goTo: go });
  // Old deep links (#it-sees, #it-acts-you-approve, ...) open their tab.
  useEffect(() => {
    const open = () => { const h = location.hash.slice(1); const k = CAPS.findIndex(c => c.anchors.includes(h) || c.id === h); if (k >= 0) { go(k); setHold(true); } };
    open(); addEventListener('hashchange', open); return () => removeEventListener('hashchange', open);
  }, []);
  const C = CAPS[i]; const P = prev.current;
  const pick = (id) => { const k = CAPS.findIndex(c => c.id === id); if (k >= 0) { go(k); setHold(true); } };
  return <section id="what-pro-is" className="pp-sec pp-what" data-section="What Pro is" aria-labelledby="what-h">
    {CAPS.flatMap(c => c.anchors).map(a => <span key={a} id={a} className="pp-anchor" aria-hidden="true" />)}
    <div className="section-shell">
      <BlurFade blur="0px" inView inViewMargin="-80px" className="pp-head"><Kicker>WHAT PRO IS</Kicker>
        <Title id="what-h" className="pp-h2" lead="It knows your day." dim="It waits for your yes." /></BlurFade>
      <div className="pp-cap-tabs" role="group" aria-label="Pro capabilities">
        <AnimatedBackground defaultValue={C.id} onValueChange={(id) => id && pick(id)} className="pp-cap-hover">
          {CAPS.map((c, n) => <button type="button"  data-id={c.id} key={c.id} aria-pressed={n === i} className="pp-cap-tab">
            <c.Icon size={15} /><span>{c.tab}</span>
            {n === i && <><i className="pp-cap-track" aria-hidden="true" /><motion.i className="pp-cap-bar" style={{ scaleX: prog }} /></>}
          </button>)}
        </AnimatedBackground>
      </div>
      <div className="pp-cap-view">
        <motion.div key={C.id} className="pp-cap-head" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .3 }}><Heading as="h3">{C.title}</Heading><Text as="p">{C.line}</Text></motion.div>
        <SceneCard className="pp-cap-card"><CmdScope key={C.id} chapter={C.id} cmd={C.cmd}>{(text, seq) => <><CmdBar text={text} seq={seq} className="tour-cmd-card" /><div className="pp-frame">
          <Preload names={CAPS.map(c => c.shots[0][0])} />
          <ScreenCtx.Provider value={null}><div className="wt-shot pp-under" aria-hidden="true"><div className="wt-shot-in"><Shot name={(P || C).shots[0][0]} alt="" lazy={false} /></div></div></ScreenCtx.Provider>
          <ZoomCtx.Provider value={zoom}><ShotSeq key={C.id} ms={3400} shots={C.shots} /></ZoomCtx.Provider>
        </div></>}</CmdScope></SceneCard>
        <div className="pp-cap-ctl">
          <Button variant="outline" size="sm" className="autoplay-btn" aria-pressed={!hold} onClick={() => setHold(h => !h)}>{hold ? <><Play size={12} weight="fill" /> Resume autoplay</> : <><Pause size={12} weight="fill" /> Pause autoplay</>}</Button>
          <span className="pp-hint">Pick a tab to look closer.</span>
        </div>
      </div>
      {again}
    </div>
    {viewer}
  </section>;
}

/* ───────── Sync ───────── */

const SYNC = [
  [ArrowsClockwise, 'Start on your computer. Finish on your phone.'],
  [ShieldCheck, 'Encrypted, device to device. No server keeps a copy.'],
  [PaperPlaneTilt, 'Send files and models to a paired device.'],
];
function Sync({ again }) {
  return <section id="sync" className="pp-sec pp-sync" data-section="Sync is live across your devices" aria-labelledby="sync-h">
    <div className="section-shell">
      <BlurFade blur="0px" inView inViewMargin="-80px" className="pp-head"><Kicker>PRO SYNC</Kicker>
        <Title id="sync-h" className="pp-h2" lead="Sync is live." dim="Across every device you own." /></BlurFade>
      <ul className="pp-points">{SYNC.map(([Icon, t]) => <li key={t}><span className="pp-ic"><Icon size={18} /></span>{t}</li>)}</ul>
      <a className="pp-link" href="/download/" data-cta="">Get the apps <ArrowRight size={15} /></a>
      {again}
    </div>
  </section>;
}

/* ───────── Private: one statement ───────── */

function Private() {
  return <section id="private-by-architecture-not-by-policy" className="has-bg pp-sec pp-private" aria-labelledby="priv-h"><SectionBg />
    <div className="section-shell pp-private-in">
      <Kicker>PRIVATE</Kicker>
      <Title id="priv-h" className="pp-h2" lead="Private by architecture." dim="Not by policy." />
      <Lede className="pp-lede">{`Local models. Memory on your devices. Connections you choose.`}</Lede>
    </div>
  </section>;
}

/* ───────── How checkout works ───────── */

const STEPS = [
  ['Enter your email', 'Opens RevenueCat checkout.'],
  ['Pay', 'Promo codes go in here.'],
  ['Get your key', 'By email.'],
  ['Unlock Pro', 'Desktop and mobile.'],
];
function Checkout4() {
  return <section id="how-checkout-works" className="pp-sec pp-steps-sec" data-section="How checkout works" aria-labelledby="checkout-h">
    <div className="section-shell">
      <BlurFade blur="0px" inView inViewMargin="-80px" className="pp-head"><Kicker>HOW CHECKOUT WORKS</Kicker>
        <Title id="checkout-h" className="pp-h2" lead="Four steps." dim="About a minute." /></BlurFade>
      <ol className="pp-steps">{STEPS.map(([t, d], k) => <li key={t}><span className="pp-step-n">{k + 1}</span><b>{t}</b><small>{d}</small></li>)}</ol>
    </div>
  </section>;
}

function Final({ pricing }) {
  return <section className="has-bg final pp-final" data-section="Get Pro" aria-labelledby="pp-final-h"><SectionBg />
    <div className="section-shell final-in">
      <Kicker>OFF GRID AI PRO</Kicker>
      <Heading as="h2" id="pp-final-h" className="pp-final-h">Yours. Forever.</Heading>
      <ShimmerButton className="pro-shimmer pp-shimmer" shimmerColor="#6EE7B7" shimmerSize="0.08em" borderRadius="8px" shimmerDuration="2.6s" background="var(--og-primary)"
        onClick={(e) => toBuy(e.currentTarget.textContent.trim(), 'Get Pro')}>Own Pro for ${pricing.lifetime}</ShimmerButton>
      <p className="pp-final-links">
        <a href="/design-partners/" data-analytics-event="design_partner_offer_clicked" data-analytics-view="design_partner_offer_viewed" data-analytics-placement="pro_card">Small team? Get Pro free <ArrowRight size={13} /></a>
        <a href="/vision/" data-cta="">Read the vision <ArrowUpRight size={13} /></a>
      </p>
    </div>
  </section>;
}

function proCta(href, label, section) {
  if (typeof window.posthog === 'undefined') return;
  const destination = href.indexOf('#buy') !== -1 ? 'buy' : href.indexOf('/vision') !== -1 ? 'vision' : href.indexOf('console') !== -1 ? 'console' : href;
  try { window.posthog.capture('pro_cta_click', { destination, href, label, section, source: window.location.pathname }); }
  catch (err) { console.warn('PostHog tracking failed:', err); }
}

// pro_cta_click: every CTA link, tagged with the section it sits in (same event and fields as before).
function useProCtaTracking() {
  useEffect(() => {
    const off = installClickTracking({ ownCta: true });
    const onClick = (e) => {
      const link = e.target.closest && e.target.closest('a[data-cta]');
      if (!link) return;
      const title = link.querySelector('h3');
      const sec = link.closest('[data-section]');
      proCta(link.getAttribute('href') || '', (title || link).textContent.replace(/→/g, '').replace(/#$/, '').trim(), sec ? sec.dataset.section : 'page');
    };
    document.addEventListener('click', onClick);
    return () => { off(); document.removeEventListener('click', onClick); };
  }, []);
}


export default function ProPage({ data }) {
  useProCtaTracking();
  // /pro/#buy lands on the form once the page has laid out.
  useEffect(() => { if (location.hash === '#buy') { const t = setTimeout(() => document.getElementById('buy')?.scrollIntoView(), 60); return () => clearTimeout(t); } }, []);
  const { pricing, checkout } = data;
  return <PageShell>
    <Hero pricing={pricing} />
    <Buy pricing={pricing} checkout={checkout} />
    <Faq pricing={pricing} />
    <WhatPro again={<Again pricing={pricing} section="What Pro is" />} />
    <Sync again={<Again pricing={pricing} section="Sync is live across your devices" />} />
    <Private />
    <Checkout4 />
    <Final pricing={pricing} />
    <StickyBuy pricing={pricing} />
  </PageShell>;
}
