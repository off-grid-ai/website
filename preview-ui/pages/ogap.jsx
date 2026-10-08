import React, { useEffect, useRef, useState } from 'react';
import { Badge, Card, Heading, Text, TextField } from '@radix-ui/themes';
import * as Accordion from '@radix-ui/react-accordion';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ArrowDown, ArrowUpRight, Check, Fan, BatteryCharging, FrameCorners, Lightning, Ruler, Plus, WifiHigh, Plug } from '@phosphor-icons/react';
import Button from '@smoothui/smooth-button';
import { MagicCard } from '@magicui/magic-card';
import { BlurFade } from '@magicui/blur-fade';
import { NumberTicker } from '@magicui/number-ticker';
import { Ripple } from '@magicui/ripple';
import { ShimmerButton } from '@magicui/shimmer-button';
import { PageShell, Kicker, Title, Lede, Reveal, SceneCard, SectionBg, MobileRail, useNarrow } from '../shared.jsx';

const IMG = '/assets/img/ogap/website-v2/';

// OGAP renders, one per theme. CSS shows the one matching the page theme.
function OgapImg({ name, alt, w = 1536, h = 1024, sizes = '(max-width: 860px) 100vw, 60vw', mobile, big = true, eager }) {
  const load = eager ? { loading: 'eager', fetchPriority: 'high' } : { loading: 'lazy' };
  return ['dark', 'light'].map(t => <picture key={t} className={`og-img og-img-${t}`}>
    {mobile && <source media="(max-width: 640px)" srcSet={`${IMG}${name}-${t}-mobile.webp`} type="image/webp" width="819" height="1024" />}
    <source srcSet={big ? `${IMG}${name}-${t}-1200.webp 1200w, ${IMG}${name}-${t}-1536.webp 1536w` : `${IMG}${name}-${t}-1200.webp`} sizes={sizes} type="image/webp" />
    <img src={`${IMG}${name}-${t}${name.startsWith('hero') ? '.png' : '-fallback.jpg'}`} alt={t === 'dark' ? alt : ''} aria-hidden={t === 'light' ? 'true' : undefined} width={w} height={h} decoding="async" {...load} />
  </picture>);
}

function Hero({ ogap }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 40]);
  return <section className="has-bg og-hero" aria-labelledby="ogap-h" ref={ref}><SectionBg />
    <div className="section-shell og-hero-grid">
      <div className="og-hero-copy">
        <Kicker>OGAP · OFF GRID AI POWER</Kicker>
        <div className="og-badges"><Badge color="green" variant="soft">Prototype</Badge><Badge variant="outline">{ogap.status}</Badge></div>
        <Title as="h1" id="ogap-h" className="og-h1" lead="Your phone can" dim="think all day." />
        <Lede className="og-lede">Cooling and a battery that lock around the phone you already own. It stays cool and keeps going.</Lede>
        <div className="og-ctas">
          <Button asChild size="lg"><a href="#reserve" data-analytics-event="ogap_preorder_cta_clicked" data-analytics-placement="ogap_hero">Pre-order ${ogap.price}, shipped worldwide</a></Button>
          <Button asChild size="lg" variant="outline"><a href="#what-it-is">See what is in it <ArrowDown size={15} /></a></Button>
        </div>
      </div>
      <figure className="og-hero-fig">
        <SceneCard busy className="og-hero-card">
          <motion.div className="og-hero-img" style={{ scale, y }}>
            <OgapImg name="hero-ecosystem" eager alt="The OGAP adjustable frame, cooling module, battery, rails, bumpers, and built-in connector shown without a phone." />
          </motion.div>
        </SceneCard>
        <figcaption className="small">OGAP shown without a phone. Industrial-design concept; the shipping design may change.</figcaption>
      </figure>
    </div>
  </section>;
}

const KIT = [
  [Fan, 'Active cooling', 'The upper grille pulls heat off the back of the phone, so the chip holds the speed it started with instead of throttling.'],
  [BatteryCharging, 'Power that rides along', 'The battery sits below the cooling section. A bidirectional USB-C port charges OGAP.'],
  [FrameCorners, 'One frame, not a bag of parts', 'Concealed width arms and height locks. Four soft bumpers. Camera, screen edges and side controls stay open.'],
  [Lightning, 'Tuned for this workload', 'Built for a phone transcribing, embedding and generating for hours, the load we see on our users\' phones.'],
  [Ruler, 'Three sizes', 'S, M and L. Tell us the phone you carry at checkout and we ship the size that fits.'],
];
function KitCard({ Icon, title, text }) {
  return <MagicCard className="feat og-feat" gradientColor="rgba(16, 185, 129, 0.08)" gradientFrom="var(--og-primary)" gradientTo="var(--og-primary-dark)">
    <div className="feat-in"><Icon size={22} /><Heading as="h3">{title}</Heading><Text as="p">{text}</Text></div>
  </MagicCard>;
}

const POWER = [
  { id: 'wireless', Icon: WifiHigh, label: 'Wireless', title: 'For phones with wireless charging', text: 'The coil behind the battery body lines up with the coil in your phone. No cable between them.', flow: ['OGAP COIL', 'PHONE COIL'], alt: 'OGAP fitted to a phone with the wireless charging area centred over the battery body.' },
  { id: 'wired', Icon: Plug, label: 'Wired', title: 'For phones without wireless charging', text: 'Power runs inside the frame to your phone\'s USB-C port. Nothing loops outside, even on phones like the OnePlus Nord 5.', flow: ['OGAP OUTPUT', 'PHONE USB-C'], alt: 'A close view of OGAP\'s underside port and integrated route to the phone USB-C connection.' },
];
function PowerCard({ p }) {
  return <SceneCard className="og-power">
    <div className={`og-power-vis og-power-${p.id}`}>
      <OgapImg name={p.id} big={false} w={1448} h={1086} sizes="(max-width: 860px) 90vw, 560px" alt={p.alt} />
      {p.id === 'wireless' && <Ripple mainCircleSize={70} numCircles={4} mainCircleOpacity={.2} className="og-ripple" />}
    </div>
    <div className="og-power-copy">
      <Kicker>{p.label.toUpperCase()}</Kicker>
      <Heading as="h3">{p.title}</Heading>
      <Text as="p">{p.text}</Text>
      <div className="og-flow" aria-label={`${p.flow[0]} to ${p.flow[1]}`}><span>{p.flow[0]}</span><ArrowRight size={13} aria-hidden="true" /><span>{p.flow[1]}</span></div>
    </div>
  </SceneCard>;
}

const STATUS = [
  ['Industrial design', 'Finishing it now.', true],
  ['Prototypes', 'Building them now.', true],
  ['Real numbers', 'Airflow, mAh and extra hours, once measured on shipping hardware.', false],
  ['Shipping', 'We email you when your unit ships.', false],
];

function Preorder({ ogap }) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState({ text: '', kind: '' });
  const [bad, setBad] = useState('');
  const [busy, setBusy] = useState(false);
  const emailRef = useRef(null); const phoneRef = useRef(null);
  // The same browser globals the checkout pages use (RevenueCatLink, CheckoutPlan), loaded once.
  useEffect(() => {
    ['/assets/js/revenuecat-link.js', '/assets/js/checkout-plan.js'].forEach(src => {
      if (document.querySelector(`script[src="${src}"]`)) return;
      const s = document.createElement('script'); s.src = src; s.async = false; document.head.appendChild(s);
    });
  }, []);
  const fail = (field, message) => { setBad(field); setStatus({ text: message, kind: 'error' }); (field === 'email' ? emailRef : phoneRef).current?.focus(); };
  const edit = (set) => (e) => { set(e.target.value); setBad(''); if (status.kind === 'error') setStatus({ text: '', kind: '' }); };
  const submit = (e) => {
    e.preventDefault();
    const mail = email.trim(); const model = phone.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) return fail('email', 'Enter a valid email address.');
    // Free-form on purpose: people describe their phone however they describe it, and we map that to S / M / L ourselves.
    if (model.length < 2) return fail('phone', 'Tell us which phone you carry so we can pick your size.');
    setBad('');
    // Same App User ID convention as Pro: the email itself, so a customer who buys both lands on one RevenueCat customer.
    let url = window.RevenueCatLink && window.RevenueCatLink.buildPurchaseUrl(ogap.link, mail);
    if (!url) { setStatus({ text: 'Checkout is not available right now. Please try again later.', kind: 'error' }); return; }
    // The phone model rides along as a UTM term, the only custom value a Web Purchase Link carries into RevenueCat metadata.
    url += '&utm_source=offgrid-docs&utm_medium=website&utm_campaign=ogap-preorder';
    url += '&utm_term=' + encodeURIComponent(model.slice(0, 80));
    // Hand the plan to /thank-you/: the RevenueCat redirect carries only the app user id.
    if (window.CheckoutPlan) window.CheckoutPlan.remember('ogap', ogap.price);
    try { if (window.posthog) window.posthog.capture('ogap_preorder_started', { price: ogap.price, page: window.location.pathname }); } catch (err) { /* analytics never blocks checkout */ }
    setStatus({ text: 'Taking you to checkout...', kind: 'success' });
    setBusy(true);
    window.location.href = url;
  };
  return <section id="reserve" className="has-bg chapter og-reserve" aria-labelledby="pre-order" data-analytics-view="ogap_preorder_viewed" data-analytics-placement="ogap_reserve"><SectionBg />
    <div className="section-shell">
      <BlurFade blur="0px" inView inViewMargin="-80px" className="sec-head"><Kicker>PRE-ORDER</Kicker><Title id="pre-order" lead="Hold the price now." dim="Shipping included, anywhere." /></BlurFade>
      <SceneCard busy className="og-buy">
        <div className="og-buy-grid">
          <div className="og-buy-price">
            <div className="price"><span className="amt">${ogap.price}</span><small>shipped worldwide</small></div>
            <ul>{['S / M / L matched to the phone you name', 'We email you for your address after checkout', 'Checkout handled by RevenueCat'].map(x => <li key={x}><Check size={14} />{x}</li>)}</ul>
          </div>
          <form id="ogapForm" className="og-form" noValidate onSubmit={submit}>
            <label className="og-label" htmlFor="ogapEmail">Your email</label>
            <TextField.Root ref={emailRef} size="3" type="email" id="ogapEmail" placeholder="your@email.com" autoComplete="email" required value={email} onChange={edit(setEmail)} aria-invalid={bad === 'email' ? 'true' : 'false'} aria-describedby="ogapStatus" className={bad === 'email' ? 'og-input-error' : ''} />
            <label className="og-label" htmlFor="ogapPhone">The phone you carry</label>
            <TextField.Root ref={phoneRef} size="3" type="text" id="ogapPhone" placeholder="iPhone 15 Pro, Pixel 8, Galaxy S24 Ultra..." autoComplete="off" required value={phone} onChange={edit(setPhone)} aria-invalid={bad === 'phone' ? 'true' : 'false'} aria-describedby="ogapStatus" className={bad === 'phone' ? 'og-input-error' : ''} />
            <ShimmerButton type="submit" disabled={busy} className="og-submit" shimmerColor="#6EE7B7" shimmerSize="0.08em" borderRadius="8px" shimmerDuration="2.6s" background="var(--og-primary)">Pre-order OGAP · ${ogap.price}</ShimmerButton>
            <p className={`og-status og-status-${status.kind}`} id="ogapStatus" aria-live="polite">{status.text}</p>
          </form>
        </div>
      </SceneCard>
    </div>
  </section>;
}

const FAQ = [
  ['What exactly do I get?', 'One kit: an adjustable frame with four soft rail bumpers, an upper cooling section, the battery below it, wireless charging, and a built-in USB-C connection to your phone.'],
  ['Why would I need it?', 'Running models on your own phone all day is the heaviest thing you can ask of it. Heat makes the chip throttle, which slows every token, and continuous capture and inference drain the battery far faster than normal use. OGAP attacks both directly: pull the heat off, and carry your own power.'],
  ['Do I still need a phone case?', 'OGAP is designed to take the place of a full case while it is fitted. The two rails and four soft bumpers protect the held edges without covering the camera area or side controls. Final protection claims wait for shipping-hardware tests.'],
  ['How does it charge?', 'Both ways. The battery body can charge your phone wirelessly or route power through the frame to your phone\'s USB-C port. The same bidirectional USB-C port charges OGAP itself.'],
  ['Does it fit my phone?', 'It comes in three sizes, S, M and L, and the frame adjusts in width and height within each. Tell us the phone you carry at checkout, in your own words, and we match the size to it.'],
];

const LIMIT = 'A phone running AI all day runs hot and runs out. Software can only shave the cost. So we are building the hardware.';
// The honest limit: a scroll-driven reveal on wide screens, a short statement on phones (less scrolling).
function Limit() {
  const narrow = useNarrow();
  if (narrow) return <section className="has-bg og-limit" aria-label="The honest limit of on-device AI"><SectionBg /><div className="section-shell"><Kicker>THE HONEST LIMIT</Kicker><Title lead={LIMIT} className="og-limit-h" /></div></section>;
  return <section className="has-bg manifesto" aria-label="The honest limit of on-device AI"><SectionBg /><Reveal>{LIMIT}</Reveal></section>;
}

export default function OgapPage({ data }) {
  const { ogap, pricing } = data;
  const faq = [...FAQ, ['Can I buy it now?', `Yes. Pre-orders are open at $${ogap.price} with shipping included, anywhere in the world. You pay now and hold that price; we email you for your shipping address, then again when your unit ships.`]];
  return <PageShell><div className="og-page">
    <Hero ogap={ogap} />

    <Limit />

    <section id="what-it-is" className="has-bg chapter" aria-labelledby="what-is-in-it"><SectionBg />
      <div className="section-shell">
        <BlurFade blur="0px" inView inViewMargin="-80px" className="sec-head"><Kicker>WHAT IS IN IT</Kicker><Title id="what-is-in-it" lead="One kit around the phone you own." dim="No new case. No dock. No loose battery pack." /></BlurFade>
        <div className="og-kit">
          <figure className="og-kit-fig">
            <SceneCard className="og-kit-card"><OgapImg name="fit" alt="OGAP fitted around a bare phone, with adjustable width arms and height rails leaving the camera and side buttons clear." /></SceneCard>
            <figcaption className="small">Width and height lock to your phone. The camera area and side controls stay open.</figcaption>
          </figure>
          <MobileRail className="og-kit-list">{KIT.map(([Icon, title, text]) => <KitCard key={title} Icon={Icon} title={title} text={text} />)}</MobileRail>
        </div>
      </div>
    </section>

    <section id="power-two-ways" className="has-bg chapter" aria-labelledby="power-h"><SectionBg />
      <div className="section-shell">
        <BlurFade blur="0px" inView inViewMargin="-80px" className="sec-head"><Kicker>POWER, TWO WAYS</Kicker><Title id="power-h" lead="Same frame." dim="You choose how it powers the phone." /></BlurFade>
        <MobileRail className="og-power-grid">{POWER.map(p => <PowerCard key={p.id} p={p} />)}</MobileRail>
      </div>
    </section>

    <section id="why-hardware-and-why-us" className="chapter og-why og-solid" aria-labelledby="why-h">
      <div className="section-shell og-why-grid">
        <BlurFade blur="0px" inView inViewMargin="-80px" className="sec-head"><Kicker>WHY HARDWARE, AND WHY US</Kicker><Title id="why-h" lead="We put the load there." dim="So we carry the fix." /></BlurFade>
        <div className="og-why-copy">
          <Text as="p"><a href="/mobile/">Off Grid AI Mobile</a> runs models in your phone's memory, and <a href="/mobile/recorder/">its recorder</a> keeps capture, transcription and a local model working all day. Battery and heat are the first limits our users hit.</Text>
          <Text as="p">Nothing else changes: nothing leaves your device, and the software works with or without OGAP.</Text>
        </div>
      </div>
    </section>

    <section id="where-it-is-right-now" className="chapter og-solid" aria-labelledby="now-h">
      <div className="section-shell">
        <BlurFade blur="0px" inView inViewMargin="-80px" className="sec-head"><Kicker>WHERE IT IS RIGHT NOW</Kicker><Title id="now-h" lead="A prototype, not a product yet." dim="No numbers until we measure them." /></BlurFade>
        <ol className="og-steps">{STATUS.map(([t, d, live], i) => <li key={t} className={`og-step ${live ? 'og-step-live' : ''}`}>
          <BlurFade inView delay={i * .12} blur="0px" className="og-step-in"><span className="og-step-n">{String(i + 1).padStart(2, '0')} · {live ? 'NOW' : 'NEXT'}</span><Heading as="h3">{t}</Heading><Text as="p">{d}</Text></BlurFade>
        </li>)}</ol>
      </div>
    </section>

    <Preorder ogap={ogap} />

    <section id="questions" className="chapter og-solid" aria-labelledby="faq-h">
      <div className="section-shell og-faq-grid">
        <BlurFade blur="0px" inView inViewMargin="-80px" className="sec-head"><Kicker>QUESTIONS</Kicker><Title id="faq-h" lead="Before you pre‑order." /></BlurFade>
        <Accordion.Root type="single" collapsible className="og-faq">
          {faq.map(([q, a]) => <Accordion.Item key={q} value={q} className="og-faq-item">
            <Accordion.Header asChild><h3><Accordion.Trigger className="og-faq-q">{q}<Plus size={16} aria-hidden="true" /></Accordion.Trigger></h3></Accordion.Header>
            <Accordion.Content className="og-faq-a"><p>{a}</p></Accordion.Content>
          </Accordion.Item>)}
        </Accordion.Root>
      </div>
    </section>

    <section className="has-bg chapter sec-explore" aria-labelledby="next-h"><SectionBg />
      <div className="section-shell">
        <BlurFade blur="0px" inView inViewMargin="-80px" className="sec-head"><Kicker>KEEP GOING</Kicker><Title id="next-h" lead="The software it is built for." /></BlurFade>
        <MobileRail className="explore">
          <Card asChild className="ex" size="3"><a href="/mobile/recorder/" data-analytics-event="ogap_related_clicked" data-analytics-placement="ogap_recorder"><Badge variant="outline">Private alpha · Cohort full</Badge><Heading as="h3">The recorder this is built for.</Heading><Text as="p">Your whole day, caught and transcribed on your phone. The workload that makes a phone hot.</Text><span className="ex-link">See Recorder <ArrowRight size={15} /></span></a></Card>
          <Card asChild className="ex" size="3"><a href="/mobile/" data-analytics-event="ogap_related_clicked" data-analytics-placement="ogap_mobile"><Badge variant="outline">Free · Open source</Badge><Heading as="h3">Get the free app.</Heading><Text as="p">Chat, vision, image, voice and documents on your phone. No account. Works in airplane mode.</Text><span className="ex-link">Explore Mobile <ArrowRight size={15} /></span></a></Card>
          <Card asChild className="ex" size="3"><a href="/pro/#buy" data-analytics-event="ogap_related_clicked" data-analytics-placement="ogap_pro"><Badge variant="outline">{`$${pricing.lifetime} once · $${pricing.monthly}/month`}</Badge><Heading as="h3">Get Off Grid AI Pro.</Heading><Text as="p">Sees your day, remembers it, gets ahead of you. On your own hardware.</Text><span className="ex-link">Get Pro <ArrowUpRight size={15} /></span></a></Card>
        </MobileRail>
      </div>
    </section>
  </div></PageShell>;
}
