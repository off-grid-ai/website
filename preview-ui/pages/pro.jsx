import React, { useEffect, useState } from 'react';
import { Heading, Badge } from '@radix-ui/themes';
import { motion, AnimatePresence } from 'motion/react';
import * as Accordion from '@radix-ui/react-accordion';
import { ArrowRight, ArrowUpRight, Check, LockKey, Brain, ChartBar, CheckCircle, Sparkle, ShieldCheck, ArrowsClockwise, PaperPlaneTilt, Plus, ClipboardText, DeviceMobile } from '@phosphor-icons/react';
import { AnimatedShinyText } from '@magicui/animated-shiny-text';
import Button from '@smoothui/smooth-button';
import { PageShell, Kicker, Title, Lede, SceneCard } from '../shared.jsx';
import { installClickTracking } from './_track.js';
import { Explorer, Seq } from './_product.jsx';
import { usePricing } from '../pricing.js';
import { PRO_SIZES, planId, minutesText, MONTHLY_FROM, YEARLY_FROM, BOOST_TOPUP, BOOST_LAUNCH, BANK_MONTHS, PRO_ONLY_MONTHLY } from '../pro-plans.js';

const toBuy = (label, section) => { proCta('#buy', label, section); document.getElementById('buy')?.scrollIntoView({ behavior: 'smooth' }); history.replaceState(null, '', '#buy'); };

/* ───────── Hero: the product, large ───────── */

function Proof() {
  return <p className="pp-proof"><span><b>250,000+</b> downloads</span><span><b>3,400+</b> GitHub stars</span><span><b>600+</b> community</span></p>;
}

function Hero() {
  return <section className="has-bg pp-sec pp-hero" data-section="Hero" aria-labelledby="pp-h">
    <div className="section-shell pp-hero-in">
      <Badge className="pp-live" size="2" variant="surface" color="gray" radius="full"><span className="pulse" /><AnimatedShinyText shimmerWidth={120}>Off Grid AI Pro · Live now</AnimatedShinyText></Badge>
      <Title as="h1" id="pp-h" className="pp-h1" lead="It remembers your work." dim="You approve." />
      <div className="pp-cta">
        <Button data-site-button="primary" variant="solid" className="pro-shimmer pp-shimmer"
          onClick={(e) => toBuy(e.currentTarget.textContent.trim(), 'Hero')}>Get Pro from ${MONTHLY_FROM}/month</Button>
        <a className="pp-quiet" href="#buy" data-cta="">Boost included from {BOOST_LAUNCH}, at a founding price</a>
      </div>
      <Proof />
    </div>
  </section>;
}

/* ───────── Get Pro: three sizes, monthly or yearly ───────── */

// Opens Stripe Checkout for a plan. The worker picks the price; the page only names the plan.
async function openStripeCheckout(endpoint, plan) {
  const response = await fetch(`${endpoint}/checkout`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ plan, checkout_id: crypto.randomUUID() }),
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) throw new Error('Checkout unavailable');
  const session = await response.json();
  const target = new URL(session.url);
  if (target.protocol !== 'https:' || target.hostname !== 'checkout.stripe.com') throw new Error('Invalid checkout');
  try { window.posthog?.capture('pro_checkout_started', { plan, provider: 'stripe' }); } catch {}
  window.location.assign(target.href);
}

const EVERY_PLAN = (p) => ['Every Pro feature, starting today', `${p.devices} devices, desktop and mobile`, `Boost from ${BOOST_LAUNCH}; minutes bank until then`, 'Founding price, locked while you stay', 'Cancel any time'];

function Buy({ pricing, failed, ready }) {
  const [yearly, setYearly] = useState(false);
  const [busy, setBusy] = useState(null);
  const [error, setError] = useState(false);
  const sold = new Set((pricing.pro_plans ?? []).map(p => p.plan));
  const buy = async (plan) => {
    if (busy) return;
    setBusy(plan); setError(false);
    try { await openStripeCheckout(pricing.stripe_endpoint, plan); } catch { setError(true); setBusy(null); }
  };
  return <section id="buy" className="pp-sec pp-buy-sec" data-section="Get Pro" aria-labelledby="buy-h">
    <div className="section-shell">
      <div className="pp-head pp-head-c" data-og-reveal=""><Kicker>GET PRO</Kicker>
        <Heading as="h2" id="buy-h" className="pp-h2"><span className="t-line">Get Pro.</span><span className="t-line t-dim">Boost included. Monthly or yearly.</span></Heading>
      </div>
      <div className="pp-toggle" role="radiogroup" aria-label="Billing">
        <button type="button" role="radio" aria-checked={!yearly} onClick={() => setYearly(false)}>Monthly</button>
        <button type="button" role="radio" aria-checked={yearly} onClick={() => setYearly(true)}>Yearly <span className="pp-toggle-save">2 months free</span></button>
      </div>
      <div className="pp-plans-grid">
        {PRO_SIZES.map((size, k) => {
          const plan = planId(size, yearly);
          const ok = ready && !failed && sold.has(plan);
          return <SceneCard key={size.minutes} className={`plan-card pp-plan${k === 0 ? ' plan-card-hero' : ''}`} busy={!ready && !failed}>
            <div className={`plan${k === 0 ? ' plan-hero' : ''}`}>
              <Heading as="h3" className="pp-plan-min">{minutesText(size)}</Heading>
              <div className="price"><span className="amt">${yearly ? size.yearly : size.monthly}</span><small>{yearly ? '/ year' : '/ month'}</small></div>
              <p className="pp-plan-note">{yearly ? `$${(size.yearly / 12).toFixed(2)} a month, billed yearly` : `or $${size.yearly} a year`}</p>
              <Button data-site-button="primary" variant={k === 0 ? 'solid' : 'outline'} type="button" disabled={!ok || busy !== null} onClick={() => buy(plan)}
                className={`pp-buy${k === 0 ? ' pro-shimmer pp-shimmer' : ''}`} data-analytics-event="pro_cta_click" data-analytics-placement={`pro_plan_${plan}`}>
                {busy === plan ? 'Opening secure checkout...' : 'Get Pro'}</Button>
            </div>
          </SceneCard>;
        })}
      </div>
      <ul className="pp-every" aria-label="Every plan includes">{EVERY_PLAN(pricing).map(x => <li key={x}><Check size={14} />{x}</li>)}</ul>
      <p className={`ea-status pp-pay-status ${error ? 'ea-status-error' : ''}`} aria-live="polite">
        {error ? 'Checkout is unavailable. Please try again.' : failed ? 'Pricing unavailable. Reload this page to try again.' : !ready ? 'Loading current pricing...' : null}</p>
    </div>
  </section>;
}

const FAQ = (p) => [
  ['Monthly or yearly?', `Same plan, two ways to pay. Yearly costs ten months, so two months are free. You can switch between them, or change size, any time from the link in your key email.`],
  ['What are Boost minutes?', `Boost runs bigger open models for you when your device can't, inside the same apps: a minute is one minute of one GPU working for you, billed by the millisecond. Pick 300, 900 or 2,100 minutes a month. It's opt-in for each model, and your prompts are never stored or trained on. Need more in a month? Top up from $${BOOST_TOPUP.from} for ${BOOST_TOPUP.minutes} minutes.`],
  ['What if I join before Boost launches?', `Every Pro feature starts the day you pay. Boost goes live in ${BOOST_LAUNCH}; the minutes you pay for before then bank, up to ${BANK_MONTHS} months' worth, ready on launch day. If Boost isn't live by the end of ${BOOST_LAUNCH}, we refund what you paid above $${PRO_ONLY_MONTHLY} a month for every month after.`],
  ['Does the price go up?', 'Not for you. The founding price stays locked as long as you stay subscribed.'],
  ['I bought Pro lifetime. What now?', `Nothing changes: you keep every Pro feature for life. Boost minutes come with the monthly and yearly plans, or as top-ups from $${BOOST_TOPUP.from}.`],
  ['How many devices?', `One key covers up to ${p.devices} devices.`],
  ['Desktop and mobile?', 'Yes. One key unlocks Pro on both. Features differ by platform.'],
  ['Does it work offline?', 'Local models run on your hardware. Once a model is downloaded, local chat works offline. Web tools, connected services and Boost need a connection.'],
  ['What does Free include?', 'Local models for chat, files, voice and images. Offline. No account. Pro adds memory, actions you approve, God, Sync and Boost.'],
  ['What happens after I pay?', 'We email your key. Enter it in the app and Pro starts right away.'],
  ['Do I need a promo code?', 'No. If you have one, enter it on the checkout page before you pay.'],
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
function Again({ section }) {
  return <div className="pp-again"><Button data-site-button="primary" variant="solid" className="pro-shimmer pp-shimmer"
    onClick={(e) => toBuy(e.currentTarget.textContent.trim(), section)}>Get Pro from ${MONTHLY_FROM}/month</Button></div>;
}

// Phones: a bottom bar once the hero is gone, hidden while the buy block is on screen.
function StickyBuy() {
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
    <span className="pp-bar-tx">Pro with Boost · from <b>${MONTHLY_FROM}</b>/mo</span>
    <Button data-site-button="primary" variant="solid" className="pro-shimmer pp-shimmer pp-bar-btn"
      onClick={(e) => toBuy(e.currentTarget.textContent.trim(), 'Sticky bar')}>Get Pro</Button>
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

function Final() {
  return <section className="has-bg final pp-final" data-section="Get Pro" aria-labelledby="pp-final-h">
    <div className="section-shell final-in" data-og-reveal="">
      <Kicker>OFF GRID AI PRO</Kicker>
      <Heading as="h2" id="pp-final-h" className="pp-final-h">Your AI, with room to grow.</Heading>
      <Button data-site-button="primary" variant="solid" className="pro-shimmer pp-shimmer"
        onClick={(e) => toBuy(e.currentTarget.textContent.trim(), 'Get Pro')}>Get Pro from ${MONTHLY_FROM}/month</Button>
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
  const { pricing, failed, ready } = usePricing(data.pricing);
  return <PageShell>
    <Hero />
    <WhatPro again={<Again section="What Pro is" />} />
    <Buy pricing={pricing} failed={failed} ready={ready} />
    <Faq pricing={pricing} />
    <Sync again={<Again section="Sync is live across your devices" />} />
    <Private />
    <Checkout4 />
    <Final />
    <StickyBuy />
  </PageShell>;
}
