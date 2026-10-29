import { LifetimePrice } from '../lifetime-price.jsx';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Heading, Text, TextField, Badge, Progress } from '@radix-ui/themes';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'motion/react';
import * as Accordion from '@radix-ui/react-accordion';
import { ArrowRight, ArrowUpRight, Check, LockKey, Brain, ChartBar, CheckCircle, Sparkle, ShieldCheck, ArrowsClockwise, PaperPlaneTilt, EnvelopeSimple, Plus, Key, ClipboardText, DeviceMobile } from '@phosphor-icons/react';
import { Highlighter } from '@magicui/highlighter';
import { AnimatedShinyText } from '@magicui/animated-shiny-text';
import Button from '@smoothui/smooth-button';
import { orchestra } from '@offgrid-ui/alive';
import { PageShell, Kicker, Title, Lede, SceneCard, ReviewLine } from '../shared.jsx';
import { PAGE_REVIEWS } from '../reviews.js';
import { installClickTracking } from './_track.js';
import { Explorer, Seq } from './_product.jsx';
import { usePricing } from '../pricing.js';

const toBuy = (label, section) => { proCta('#buy', label, section); document.getElementById('buy')?.scrollIntoView({ behavior: 'smooth' }); history.replaceState(null, '', '#buy'); };

/* ───────── Hero: the product, large ───────── */

function Proof() {
  return <p className="pp-proof"><span><b>250,000+</b> downloads</span><span><b>3,400+</b> GitHub stars</span><span><b>600+</b> community</span></p>;
}

function Hero({ pricing }) {
  return <section className="has-bg pp-sec pp-hero" data-section="Hero" aria-labelledby="pp-h">
    <div className="section-shell pp-hero-in">
      <Badge className="pp-live" size="2" variant="surface" color="gray" radius="full"><span className="pulse" /><AnimatedShinyText shimmerWidth={120}>Off Grid AI Pro · Live now</AnimatedShinyText></Badge>
      <Title as="h1" id="pp-h" className="pp-h1" lead="It remembers your work." dim="You approve." />
      {pricing.lifetime_offer?.enabled && <LifetimePrice pricing={pricing} />}
      <div className="pp-cta">
        <Button data-site-button="primary" variant="solid" className="pro-shimmer pp-shimmer"
          onClick={(e) => toBuy(e.currentTarget.textContent.trim(), 'Hero')}>Own Pro for ${pricing.lifetime}</Button>
        <a className="pp-quiet" href="#buy" data-cta="">or ${pricing.monthly}/month</a>
      </div>
      <Proof />
      <ReviewLine quotes={PAGE_REVIEWS.pro} placement="pro:hero" />
    </div>
  </section>;
}

/* ───────── Price ladder (live tier from the customer count) ───────── */

function Ladder({ pricing, count, failed, tier }) {
  const tiers = pricing.tiers;
  // The cohorts that sold out before the current ladder, then the ladder itself: one price history.
  const past = pricing.history || [];
  // The history, the live ladder, and one step for what nobody has decided yet.
  const steps = [...past.map(h => ({ ...h, closed: true })), ...tiers, { unknown: true }];
  // Every cohort is labelled with the seats it was sold in. The stepper shows where the count is;
  // the page never prints how many seats are left.
  const seats = (i) => steps[i].unknown ? '\u00a0' : !steps[i].until ? 'after that' : <><b>{steps[i].seats.toLocaleString()}</b> seats</>;
  // Each step is as wide as its cohort is big, dampened so the first 100 stay legible
  // beside the 5,000. Uncapped steps take the narrowest width.
  const widths = steps.map((s) => {
    if (!s.until) return 1;
    return Math.min(4, Math.cbrt(s.seats) / Math.cbrt(steps[0].seats));
  });
  const cols = widths.map(w => `${w.toFixed(3)}fr`).join(' ');
  const n = steps.length;
  const rail = useRef(null);
  // Below the fold, the track waits to climb until the ladder scrolls into view; on screen at
  // load (or with reduced motion) it is already where it belongs, so nothing blinks.
  const reduce = useReducedMotion();
  const [held, setHeld] = useState(false);
  useLayoutEffect(() => { if (!reduce && rail.current?.getBoundingClientRect().top > innerHeight) setHeld(true); }, [reduce]);
  const inView = useInView(rail, { once: true, margin: '0px 0px -20% 0px' });
  // The column fades in first (the conductor's reveal); the climb starts once it has arrived.
  const [seen, setSeen] = useState(false);
  useEffect(() => { if (!inView) return; const id = setTimeout(() => setSeen(true), 650); return () => clearTimeout(id); }, [inView]);
  // Hovering a cohort lifts its checkpoint on the track.
  const [hot, setHot] = useState(-1);
  // Left alone, the lift travels on its own: first checkpoint, then the next, up to the live one,
  // a beat of rest, and round again. A hover takes over; off screen or with reduced motion it rests.
  const [wave, setWave] = useState(-1);
  const onScreen = useInView(rail);
  const climbed = !held || seen;
  // The library's alive layer gives progress indicators their travelling sheen and glow by data-slot.
  useLayoutEffect(() => { rail.current?.querySelector('.rt-ProgressIndicator')?.setAttribute('data-slot', 'progress-indicator'); }, []);
  // The live count fills the track on its own; when it lands, the field answers from the current tier
  // (strong enough that the ring reaches the checkout card beside it).
  const landed = () => { const at = rail.current?.querySelector('.pp-tier.cur .pp-tier-price'); if (at) orchestra.pulseFrom(at, 'change', 0.8); };
  // Stripe serves the live price instead of a customer count: read the cohort back off the price.
  const live = pricing.lifetime_offer?.enabled ? pricing.lifetime_offer.original_price : pricing.lifetime;
  const t = tier ?? Math.max(0, tiers.findIndex(x => x.lifetime === live));
  const cur = past.length + t;
  const from = t > 0 ? tiers[t - 1].until : 0; const to = tiers[t].until;
  const frac = count != null && to > from ? Math.min(1, Math.max(0, (count - from) / (to - from))) : 0;
  // The track runs between the first and last checkpoint; with uneven columns both the
  // rail's ends and the fill come off the same widths.
  const total = widths.reduce((a, b) => a + b, 0);
  const centre = (i) => (widths.slice(0, i).reduce((a, b) => a + b, 0) + widths[i] / 2) / total;
  const railStart = centre(0); const railEnd = centre(n - 1);
  const here = centre(cur) + frac * (centre(Math.min(n - 1, cur + 1)) - centre(cur));
  const fill = Math.min(1, Math.max(0, (here - railStart) / (railEnd - railStart)));
  const offer = pricing.lifetime_offer?.enabled ? pricing.lifetime_offer : null;
  const monthly = t === tiers.length - 1 ? `Prefer a subscription? Pay $${tiers[t].monthly}/month.`
    : t === tiers.length - 2 ? `Prefer a subscription? Pay $${tiers[t].monthly}/month before it rises to $${tiers[t + 1].monthly}.`
    : `Prefer a subscription? Pay $${tiers[t].monthly}/month before it rises to $${tiers[t + 1].monthly}, then $${tiers[tiers.length - 1].monthly}.`;
  useEffect(() => {
    setWave(-1);
    if (reduce || !seen || !onScreen || hot >= 0) return;
    let k = -1; let tick;
    // Starts once the climb has landed, then one checkpoint per beat.
    const start = setTimeout(() => { tick = setInterval(() => { k = (k + 1) % (cur + 2); setWave(k <= cur ? k : -1); }, 1300); }, 1400);
    return () => { clearTimeout(start); clearInterval(tick); };
  }, [reduce, seen, onScreen, hot, cur]);
  return <div className="pp-ladder" id="og-ladder" data-endpoint={pricing.count_endpoint}>
    <Kicker>{offer ? 'THE LIFETIME OFFER' : 'PRO LIFETIME'}</Kicker>
    <Heading as="h3">One payment. Every Pro feature.</Heading>
    {offer
      ? <p className="pp-ladder-lede">Lifetime access is ${pricing.lifetime} instead of ${offer.original_price} for a limited time. The ${offer.amount_off.toFixed(2)} discount is already applied at checkout. One key for up to {pricing.devices} devices.</p>
      : <p className="pp-ladder-lede">Lifetime access is ${pricing.lifetime}. One key for up to {pricing.devices} devices.</p>}
    {/* The price history, left to right. Radix Themes Progress draws how far it has climbed;
        hidden from assistive tech because the prices and labels already say it. */}
    <div className="pp-tiers" ref={rail} style={{ '--n': n, '--cols': cols }}>
      <Progress className="pp-progress" variant="soft" value={climbed ? Math.round(fill * 100) : 0} max={100} aria-hidden="true"
        style={{ left: `${railStart * 100}%`, right: `${(1 - railEnd) * 100}%` }}
        onTransitionEnd={(e) => { if (e.propertyName === 'transform') landed(); }} />
      <div className="pp-nodes" aria-hidden="true">
        {/* The library timeline's checkpoints: a sold-out cohort fills with a check, the live one is a
            breathing ring, the rest wait hollow. Each arrives as the climbing fill reaches it (--at). */}
        {steps.map((s, i) => <span key={i} style={{ '--at': Math.max(0, (centre(i) - railStart) / (railEnd - railStart)).toFixed(3) }}
          className={`pp-dot ${climbed && i < cur ? 'past' : ''} ${climbed && i === cur ? 'cur' : ''} ${i === hot || (hot < 0 && i === wave) ? 'hot' : ''}`}>
          {climbed && i < cur && <svg viewBox="0 0 10 10" fill="none"><path d="M2.2 5.2 4.2 7.1 7.8 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>}
          {climbed && i === cur && <span className="pp-dot-core" />}
        </span>)}
      </div>
      {steps.map((s, i) => {
        // The cohort the offer runs in shows its regular price scratched and the offer price in its place.
        const offered = offer && s.lifetime === offer.original_price;
        return <div key={i} data-og-living="" onPointerEnter={() => setHot(i)} onPointerLeave={() => setHot(-1)} className={`pp-tier ${s.closed ? 'pp-tier-past' : ''} ${s.unknown ? 'pp-tier-unknown' : ''} ${i < cur ? 'past' : ''} ${i === cur ? 'cur' : ''}`}>
          <span className={`pp-tier-price ${offered ? 'pp-tier-offered' : ''}`}>
            {offered && <s className="pp-tier-was"><span className="sr-only">Regular price </span>${s.lifetime}</s>}
            <span>{s.unknown ? <abbr title="Nobody knows yet">?</abbr>
              : <>{offered && <span className="sr-only">Offer price </span>}${offered ? pricing.lifetime : s.lifetime}</>}</span>
          </span>
          <span className="pp-tier-label">{seats(i)}</span>
        </div>;
      })}
    </div>
    <p className="pp-monthly" id="og-monthly">{monthly}</p>
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

function Checkout({ pricing, checkout, count, failed, tier, ready }) {
  useScript('/assets/js/revenuecat-link.js');
  useScript('/assets/js/checkout-plan.js');
  const stripe = pricing.checkout_provider === 'stripe';
  const [busy, setBusy] = useState(false);
  const submitting = useRef(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const form = useRef(null); const input = useRef(null); const fired = useRef({});
  const [embedOpen, setEmbedOpen] = useState(false); const embedUi = useRef(null); const loadingStripe = useRef(null);
  // Mounted Stripe UIs have to be destroyed, or a second open throws and the buyer is stuck.
  useEffect(() => () => { try { embedUi.current?.destroy(); } catch {} }, []);
  const LINKS = { ...(tier === 1 ? checkout.nextLinks : checkout.links),
    ...(pricing.lifetime_offer?.enabled ? { lifetime: checkout.nextLinks.lifetime } : {}) };
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
      if (entries.some(e => e.isIntersecting)) {
        reportOnce('pro_buy_form_viewed');
        // Fetch Stripe.js while they are still reading. Cold, it can lose the race against the first click and send
        // them to the hosted page instead; warm, the form opens at once.
        if (stripe) stripeJs().catch(() => {});
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(form.current);
    return () => io.disconnect();
  }, []);
  const onInput = (e) => {
    const v = e.target.value; setEmail(v);
    if (status && status.kind === 'error') setStatus(null);
  };
  // Ask the worker for a session. `ui` picks the embedded form or Stripe's own page; the worker falls back to the
  // hosted page whenever it has no publishable key, so this asks for embedded and takes whatever comes back.
  const session = async (plan, ui) => {
    const response = await fetch(`${pricing.stripe_endpoint}/checkout`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan, ui, checkout_id: crypto.randomUUID() }),
      signal: AbortSignal.timeout(20000),
    });
    if (!response.ok) throw new Error('Checkout unavailable');
    return response.json();
  };
  const toStripe = (url) => {
    const target = new URL(url);
    if (target.protocol !== 'https:' || target.hostname !== 'checkout.stripe.com') throw new Error('Invalid checkout');
    window.location.assign(target.href);
  };
  // Stripe.js must come from Stripe itself; the embedded form will not mount from a copy. It is fetched once and the
  // same attempt is shared, so a second click cannot start a second download or race the first.
  const stripeJs = () => {
    if (window.Stripe) return Promise.resolve(window.Stripe);
    if (!loadingStripe.current) loadingStripe.current = new Promise((resolve, reject) => {
      const s = document.createElement('script'); s.src = 'https://js.stripe.com/v3/';
      s.onload = () => resolve(window.Stripe);
      s.onerror = () => { loadingStripe.current = null; reject(new Error('Stripe.js blocked')); };
      document.head.appendChild(s);
    });
    return loadingStripe.current;
  };
  // Stripe's page is headed with the company that owns the Stripe account, not Off Grid AI, and most people who
  // reached it left without typing anything. The form opens here instead, on the page they already trust.
  const openEmbedded = async (plan) => {
    const { clientSecret, publishableKey, url } = await session(plan, 'embedded');
    if (!clientSecret) return toStripe(url); // the worker has no publishable key yet
    const Stripe = await stripeJs();
    const checkoutUi = await Stripe(publishableKey).initEmbeddedCheckout({ clientSecret });
    setEmbedOpen(true);
    embedUi.current = checkoutUi;
    checkoutUi.mount('#pp-embed');
    document.getElementById('pp-embed')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  // Some people would rather finish on Stripe's own page, and a blocked or broken embed must never cost the sale.
  const payOnStripe = async (plan) => {
    setBusy(true);
    try { toStripe((await session(plan, 'hosted')).url); }
    catch { setStatus({ kind: 'error', text: 'Checkout is unavailable. Please try again.' }); setBusy(false); }
  };
  const buy = async (plan) => {
    if (stripe) {
      // Stripe Checkout asks for the email the key is sent to, so this page does not.
      if (submitting.current || !ready || failed) return;
      submitting.current = true; setBusy(true); setStatus(null);
      try {
        try { window.posthog?.capture('pro_checkout_started', { plan, provider: 'stripe' }); } catch {}
        await openEmbedded(plan);
        submitting.current = false; setBusy(false);
      } catch {
        // The form could not open: fall through to Stripe's page rather than showing an error.
        try { await payOnStripe(plan); } catch {
          setStatus({ kind: 'error', text: 'Checkout is unavailable. Please try again.' });
        }
        submitting.current = false; setBusy(false);
      }
      return;
    }
    const RevenueCatLink = window.RevenueCatLink; if (!RevenueCatLink) return;
    const value = (input.current ? input.current.value : email).trim();
    if (!RevenueCatLink.isValidEmail(value)) { setStatus({ kind: 'error', text: 'Enter a valid email address.' }); input.current && input.current.focus(); return; }
    if (count === null || failed) return;
    const url = RevenueCatLink.buildPurchaseUrl(LINKS?.[plan], value);
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
    // The success line holds a link, so the conductor does not settle it: the form ripples instead.
    if (form.current) orchestra.pulseFrom(form.current, 'change', 0.8);
  };
  const off = (!stripe && email.trim() === '') || (stripe ? !ready : count === null) || failed || busy;
  // The buy buttons wake when they become usable: the field answers from the primary one.
  const wasOff = useRef(off);
  useEffect(() => {
    if (wasOff.current && !off) { const b = form.current?.querySelector('.pp-buy'); if (b) orchestra.pulseFrom(b, 'change', 0.45); }
    wasOff.current = off;
  }, [off]);
  // A visitor who chose monthly on another page lands with monthly as the main action.
  const [plan, setPlan] = useState('lifetime');
  useEffect(() => { if (new URLSearchParams(location.search).get('plan') === 'monthly') setPlan('monthly'); }, []);
  const primary = plan === 'monthly' ? ['monthly', `Start Pro for $${pricing.monthly}/month`] : ['lifetime', `Own Pro forever for $${pricing.lifetime}`];
  const secondary = plan === 'monthly' ? ['lifetime', `Or own it forever for $${pricing.lifetime}`] : ['monthly', `Or $${pricing.monthly}/month`];
  const err = status && status.kind === 'error';
  return <form id="payForm" ref={form} className="pp-form" noValidate onSubmit={(e) => { e.preventDefault(); buy(primary[0]); }}>
    {!stripe && <>
      <label className="pp-label" htmlFor="payEmail">Email for your license key</label>
      <TextField.Root ref={input} id="payEmail" type="email" size="3" placeholder="your@email.com" autoComplete="email" required
        aria-invalid={err ? 'true' : 'false'} aria-describedby="payStatus" className={`pp-input ${err ? 'ea-input-error' : ''}`} value={email} onChange={onInput}>
        <TextField.Slot><EnvelopeSimple size={16} /></TextField.Slot>
      </TextField.Root>
    </>}
    <Button data-site-button="primary" variant="solid" type="button" data-plan={primary[0]} disabled={off} onClick={() => buy(primary[0])} className="pro-shimmer pp-shimmer pp-buy">{primary[1]}</Button>
    <Button data-site-button="secondary" variant="outline" type="button" data-plan={secondary[0]} disabled={off} onClick={() => buy(secondary[0])} className="ihb pp-buy">{secondary[1]}</Button>
    <p className={`ea-status pp-pay-status ${err ? 'ea-status-error' : ''} ${status && status.kind === 'success' ? 'ea-status-success' : ''}`} id="payStatus" aria-live="polite">
      {busy ? 'Opening secure checkout...' : err ? status.text : status && status.kind === 'success' ? <>Checkout opened in a new tab. <a href={status.url} target="_blank" rel="noopener">Reopen it</a> if your browser blocked the popup.</> : (stripe ? !ready : count === null) ? (failed ? 'Pricing unavailable. Reload this page to try again.' : 'Loading current pricing...') : null}
    </p>
    {/* The form opens here, on this page. It stays in the document so Stripe always has somewhere to mount. */}
    <div id="pp-embed" className="pp-embed" hidden={!embedOpen} />
    {stripe && embedOpen &&
      <p className="pp-fine pp-embed-alt">Prefer Stripe's own page?{' '}
        <a href="#buy" onClick={(e) => { e.preventDefault(); payOnStripe(primary[0]); }}>Pay there instead</a></p>}
    <ul className="pp-trust">
      <li><Key size={13} />{stripe ? 'Your key goes to the email you pay with. Enter it in the app.' : 'Your key arrives by email. Enter it in the app.'}</li>
      <li><LockKey size={13} />{pricing.lifetime_offer?.enabled ? 'Secure checkout. Lifetime discount applied automatically.' : stripe ? 'Secure checkout by Stripe.' : 'Secure checkout by RevenueCat. Promo codes go in there.'}</li>
      <li><ShieldCheck size={13} />Your devices, models and data never touch the purchase.</li>
    </ul>
    <p className="pp-fine"><a href="/terms/">Terms</a></p>
  </form>;
}


const GET = (p) => ['Memory and search', 'Actions you approve', 'Pro Sync', `${p.devices} devices, desktop and mobile`, 'Every update'];

function Buy({ pricing, checkout, count, failed, tier, ready }) {
  return <section id="buy" className="pp-sec pp-buy-sec" data-section="Get Pro" aria-labelledby="buy-h">
    <div className="section-shell">
      <div className="pp-head pp-head-c" data-og-reveal=""><Kicker>GET PRO</Kicker>
        <Heading as="h2" id="buy-h" className="pp-h2"><span className="t-line">Own Pro for life.</span><span className="t-line t-dim">{pricing.lifetime_offer?.enabled ? 'Pay less for a limited time.' : 'One payment. Yours forever.'}</span></Heading>
      </div>
      <div className="pp-buy-grid">
        {/* Busy only while the live price loads; when it lands the card settles once. */}
        <SceneCard className="plan-card plan-card-hero pp-checkout" busy={!ready && !failed}>
          <div className="plan plan-hero">
            <div className="pp-plan-top"><Kicker>RECOMMENDED · ONE PAYMENT</Kicker></div>
            <div className="pp-plan-row"><Heading as="h3">Pro lifetime</Heading><LifetimePrice pricing={pricing} /></div>
            <ul className="pp-get">{GET(pricing).map(x => <li key={x}><Check size={14} />{x}</li>)}</ul>
            <Checkout pricing={pricing} checkout={checkout} count={count} failed={failed} tier={tier} ready={ready} />
          </div>
        </SceneCard>
        <div className="pp-buy-side" id="do-the-math" data-og-reveal="">
          <Ladder pricing={pricing} count={count} failed={failed} tier={tier} />
        </div>
      </div>
    </div>
  </section>;
}

const FAQ = (p) => [
  [p.lifetime_offer?.enabled ? 'How does the lifetime offer work?' : 'Does the price go up?', p.lifetime_offer?.enabled ? `Pay $${p.lifetime} once instead of $${p.lifetime_offer.original_price}. The $${p.lifetime_offer.amount_off.toFixed(2)} discount is applied automatically at checkout. The offer is available for a limited time. Your lifetime access does not expire when the offer ends.` : `Yes, as more people join. Lifetime steps from $${p.tiers[0].lifetime} to $${p.tiers[1].lifetime}, then $${p.top_lifetime}. Monthly from $${p.tiers[0].monthly} to $${p.tiers[1].monthly}, then $${p.top_monthly}. You keep the price you buy at.`],
  ['How many devices?', `One key covers up to ${p.devices} devices.`],
  ['Desktop and mobile?', 'Yes. One key unlocks Pro on both. Features differ by platform.'],
  ['Does it work offline?', 'Local models run on your hardware. Once a model is downloaded, local chat works offline. Web tools and connected services need a connection.'],
  ['What does Free include?', 'Local models for chat, files, voice and images. Offline. No account. Pro adds memory, actions you approve, God and Sync.'],
  ['What happens after I pay?', 'We email your key. Enter it in the app and Pro starts right away.'],
  ['Do I need a promo code?', p.lifetime_offer?.enabled ? 'No. The lifetime discount is applied automatically when you open checkout from this website.' : 'You can enter a promo code on the checkout page before you pay.'],
];
function Faq({ pricing }) {
  return <section id="faq" className="pp-sec pp-faq-sec og-solid" aria-labelledby="faq-h">
    <div className="section-shell pp-faq-grid">
      <div className="pp-head" data-og-reveal=""><Kicker>QUESTIONS</Kicker><Heading as="h2" id="faq-h" className="pp-h2"><span className="t-line">Before you buy.</span></Heading></div>
      <div>
        <Accordion.Root type="single" collapsible className="pp-faq">
          {FAQ(pricing).map(([q, a]) => <Accordion.Item key={q} value={q} className="pp-faq-item" data-og-reveal="">
            <Accordion.Header asChild><h3><Accordion.Trigger className="pp-faq-q">{q}<Plus size={16} aria-hidden="true" /></Accordion.Trigger></h3></Accordion.Header>
            <Accordion.Content className="pp-faq-a"><p>{a}</p></Accordion.Content>
          </Accordion.Item>)}
        </Accordion.Root>
        <p className="pp-before" data-analytics-placement="pro_payment_form">Team under 50 people? You could get Pro free. <a href="/design-partners/" data-analytics-event="design_partner_offer_clicked" data-analytics-placement="pro_payment_form">Read the offer</a></p>
      </div>
    </div>
  </section>;
}

// The primary CTA, repeated after each major section.
function Again({ pricing, section }) {
  return <div className="pp-again"><Button data-site-button="primary" variant="solid" className="pro-shimmer pp-shimmer"
    onClick={(e) => toBuy(e.currentTarget.textContent.trim(), section)}>Own Pro for ${pricing.lifetime}</Button></div>;
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
    <span className="pp-bar-tx"><LifetimePrice pricing={pricing} compact /></span>
    <Button data-site-button="primary" variant="solid" className="pro-shimmer pp-shimmer pp-bar-btn"
      onClick={(e) => toBuy(e.currentTarget.textContent.trim(), 'Sticky bar')}>Own Pro · ${pricing.lifetime}</Button>
  </motion.div>}</AnimatePresence>;
}

/* ───────── What Pro is: one tab per capability, one large real screen ───────── */

const CAPS = [
  { id: 'memory', cmd: 'remember my work', anchors: ['it-sees', 'it-remembers'], Icon: Brain, tab: 'Memory', title: 'It sees. It remembers.', line: 'Screens, meetings, mail and docs become one local memory.',
    shots: [['replay', 'Off Grid AI Replay: the Acme rollout plan you had open, captured with a summary.'], ['meetings', 'Off Grid AI Meetings: the Acme pilot kickoff summary, screens shared and decisions.'], ['meetings-transcript', 'Off Grid AI Meetings: the transcript, transcribed on this Mac.'], ['people-sam', "Off Grid AI People: Sam Okafor's story, open to-dos and today's timeline."], ['people-why', 'Off Grid AI People: Why opens the captured screen behind a claim about Sam.']] },
  { id: 'phone', cmd: 'draft a reply to Sam', anchors: [], Icon: DeviceMobile, tab: 'Phone and Mac', title: 'Pro on your phone and your Mac.', line: 'The same Pro on your iPhone and your computer, in sync.',
    shots: [['mobile/chat-ios-1', 'Off Grid AI on iPhone and Mac: the reply to Sam, drafted on each.'], ['mobile/voice-pick-ios', 'Off Grid AI voice mode on the Mac and the voice picker on iPhone.'], ['mobile/project-ios-2', 'Off Grid AI on Mac and iPhone: answers from the Acme project documents.'], ['mobile/vision-ios-2', 'Off Grid AI vision on Mac and iPhone: a chart and a receipt, answered.'], ['mobile/sync-ios-1', "Off Grid AI Sync: Alex's iPhone and Mac connected over Wi-Fi."]] },
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

function WhatPro({ again }) {
  // The shared feature explorer: features listed on the side, the screens playing beside them.
  const items = CAPS.map(c => ({ id: c.id, cmd: c.cmd, title: c.tab, line: c.line, visual: () => <Seq shots={c.shots} /> }));
  return <section id="what-pro-is" className="pp-sec pp-what" data-section="What Pro is" aria-labelledby="what-h">
    {CAPS.flatMap(c => c.anchors).map(a => <span key={a} id={a} className="pp-anchor" aria-hidden="true" />)}
    <div className="section-shell">
      <h2 id="what-h" className="sr-only">What Pro is</h2>
      <Explorer items={items} label="Pro features" />
      {again}
    </div>
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
      <div className="pp-head"><Kicker>PRO SYNC</Kicker>
        <Title id="sync-h" className="pp-h2" lead="Sync is live." dim="Across every device you own." /></div>
      <ul className="pp-points">{SYNC.map(([Icon, t]) => <li key={t} data-og-reveal=""><span className="pp-ic"><Icon size={18} /></span>{t}</li>)}</ul>
      <a className="pp-link" href="/download/" data-cta="">Get the apps <ArrowRight size={15} /></a>
      {again}
    </div>
  </section>;
}

/* ───────── Private: one statement ───────── */

function Private() {
  return <section id="private-by-architecture-not-by-policy" className="has-bg pp-sec pp-private" aria-labelledby="priv-h">
    <div className="section-shell pp-private-in">
      <Kicker>PRIVATE</Kicker>
      <Title id="priv-h" className="pp-h2" lead="Private by architecture." dim="Not by policy." />
      <Lede className="pp-lede">{`Local models. Memory on your devices. Connections you choose.`}</Lede>
    </div>
  </section>;
}

/* ───────── How checkout works ───────── */

const STEPS = [
  ['Choose a plan', 'Opens secure checkout.'],
  ['Pay', 'Enter your email and pay.'],
  ['Get your key', 'By email.'],
  ['Unlock Pro', 'Desktop and mobile.'],
];
function Checkout4() {
  return <section id="how-checkout-works" className="pp-sec pp-steps-sec" data-section="How checkout works" aria-labelledby="checkout-h">
    <div className="section-shell">
      <div className="pp-head"><Kicker>HOW CHECKOUT WORKS</Kicker>
        <Title id="checkout-h" className="pp-h2" lead="Four steps." dim="About a minute." /></div>
      <div className="pp-steps">{STEPS.map(([t, d], k) => <SceneCard key={t} className="pp-step"><span className="pp-step-n">{k + 1}</span><b>{t}</b><small>{d}</small></SceneCard>)}</div>
    </div>
  </section>;
}

function Final({ pricing }) {
  return <section className="has-bg final pp-final" data-section="Get Pro" aria-labelledby="pp-final-h">
    <div className="section-shell final-in" data-og-reveal="">
      <Kicker>OFF GRID AI PRO</Kicker>
      <Heading as="h2" id="pp-final-h" className="pp-final-h">Yours. Forever.</Heading>
      <Button data-site-button="primary" variant="solid" className="pro-shimmer pp-shimmer"
        onClick={(e) => toBuy(e.currentTarget.textContent.trim(), 'Get Pro')}>Own Pro for ${pricing.lifetime}</Button>
      <p className="pp-final-links">
        <a href="/design-partners/" data-analytics-event="design_partner_offer_clicked" data-analytics-placement="pro_card">Small team? Get Pro free <ArrowRight size={13} /></a>
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
  const { checkout } = data;
  const { pricing, count, failed, tier, ready } = usePricing(data.pricing);
  return <PageShell>
    <Hero pricing={pricing} />
    <WhatPro again={<Again pricing={pricing} section="What Pro is" />} />
    <Buy pricing={pricing} checkout={checkout} count={count} failed={failed} tier={tier} ready={ready} />
    <Faq pricing={pricing} />
    <Sync again={<Again pricing={pricing} section="Sync is live across your devices" />} />
    <Private />
    <Checkout4 />
    <Final pricing={pricing} />
    <StickyBuy pricing={pricing} />
  </PageShell>;
}
