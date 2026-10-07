import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, ArrowDown, EnvelopeSimple, RocketLaunch, Sparkle, Laptop, DeviceMobile, LinkSimple } from '@phosphor-icons/react';
import { Confetti } from '@magicui/confetti';
import { Badge } from '@radix-ui/themes';
import Button from '@smoothui/smooth-button';
import { PageShell, Kicker, Title, Lede, SceneCard, SectionBg, MobileRail, PlatformIcon, Shot, DOWNLOADS, useNarrow } from '../shared.jsx';
import { installClickTracking } from './_track.js';
import { purchaseScript } from './_thank-you-purchase.js';

// /thank-you/ — where RevenueCat's checkout lands the buyer. One idea per screen: you're in (the key is
// on its way), what to do next, your apps, where to go from here. Purchase reporting is the old page's
// script, run at the same point in the page (see _thank-you-purchase.js).
const KEY_FROM = 'keys@offgridmobileai.co';
const KEY_SUBJECT = 'Your Off Grid Pro license key';
const SUPPORT = 'support@offgridmobileai.co';

// Requirements as on /download/; links come from the shared DOWNLOADS (same URLs as /download/).
const REQ = { ios: ['iPhone', 'iOS 17+ · iPhone 12+'], android: ['Android', 'Android 10+ · 4GB RAM+'], macos: ['macOS', 'Apple Silicon'], windows: ['Windows', 'x64'], linux: ['Linux', 'Ubuntu 24.04+ · x64'] };

function detect() {
  const ua = navigator.userAgent || ''; const p = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || '';
  if (/iPhone|iPad|iPod/.test(ua) || (/Mac/.test(p) && navigator.maxTouchPoints > 1)) return 'ios';
  if (/Android/i.test(ua)) return 'android';
  if (/Win/i.test(p) || /Windows/.test(ua)) return 'windows';
  if (/Linux/i.test(p) || /Linux|X11/.test(ua)) return 'linux';
  return 'macos';
}

// One burst on arrival. Skipped entirely when the visitor asks for reduced motion.
function Celebrate() {
  const ref = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setTimeout(() => ref.current?.fire({ particleCount: 110, spread: 90, startVelocity: 38, ticks: 220, gravity: .9, scalar: .9, origin: { x: .5, y: .32 }, colors: ['#34D399', '#10B981', '#6EE7B7', '#A7F3D0'] }), 350);
    return () => clearTimeout(t);
  }, []);
  return <Confetti ref={ref} manualstart className="ty-confetti" aria-hidden="true" />;
}

function Hero({ devices }) {
  // RevenueCat's redemption link, validated by the purchase script (RevenueCat hosts only).
  const [redeem, setRedeem] = useState('');
  useEffect(() => { if (typeof window.OG_REDEEM_URL === 'string') setRedeem(window.OG_REDEEM_URL); }, []);
  return <section className="ty ty-hero has-bg" aria-labelledby="ty-h"><SectionBg />
    <Celebrate />
    <div className="section-shell ty-hero-in">
      <Kicker>PAYMENT COMPLETE</Kicker>
      <Title as="h1" id="ty-h" className="ty-h1" lead="You're in." dim="Your key is on its way." />
      <Lede className="ty-lede">{`Your Off Grid AI Pro license key is landing in the inbox you paid with, usually inside a minute. One key covers up to ${devices} devices you already own.`}</Lede>
      <SceneCard busy className="ty-mail">
        <div className="ty-mail-head"><span className="ty-mail-ic"><EnvelopeSimple size={20} /></span><span className="ty-mail-live"><span className="pulse" />Arriving now</span></div>
        <dl className="ty-mail-rows">
          <div><dt>From</dt><dd>{KEY_FROM}</dd></div>
          <div><dt>Subject</dt><dd>{KEY_SUBJECT}</dd></div>
        </dl>
        <p className="ty-mail-note"><b>Check spam first.</b> Found it there? Mark it Not spam (Gmail) or Not junk (Apple Mail, Outlook) so updates reach your inbox.</p>
      </SceneCard>
      {redeem && <p className="ea-status ty-redeem" id="redeemSlot"><LinkSimple size={15} aria-hidden="true" /><a href={redeem} rel="noopener">Attach this purchase to your Off Grid AI account</a></p>}
      <div className="ty-cta">
        <Button asChild size="lg" className="ty-main btn"><a href="#apps">Get the apps <ArrowDown size={16} /></a></Button>
        <a className="ty-quiet" href="#what-to-do-next">What happens next</a>
      </div>
    </div>
  </section>;
}

const STEPS = (devices) => [
  ['Find your key, spam folder included.', `Search your mail for ${KEY_FROM}. Mark it Not spam the moment you find it there, so the next message reaches you.`],
  ['Install Off Grid AI.', 'macOS, Windows or Linux on your computer. iPhone or Android on your phone.'],
  ['Paste your key.', `Into the app on each device, up to ${devices}. That is the whole activation. No account, no sign-in.`],
  ['Turn on capture when you are ready.', 'It stays off until you switch it on, per device, and shows a recording indicator the whole time it runs.'],
];

function Next({ devices }) {
  return <section className="ty ty-sec ty-next" aria-labelledby="what-to-do-next">
    <div className="section-shell">
      <div className="sec-head"><Kicker>WHAT TO DO NEXT</Kicker><Title id="what-to-do-next" lead="Four steps." dim="No account, no sign-in." /></div>
      <div className="ty-next-grid">
        <ol className="ty-steps">
          {STEPS(devices).map(([t, d], k) => <li key={t}>
            <span className="ty-step-n" aria-hidden="true">{k + 1}</span>
            <span className="ty-step-tx"><b>{t}</b><span>{d}</span></span>
          </li>)}
        </ol>
        <figure className="ty-shot">
          <SceneCard className="ty-shot-card"><div className="ty-frame"><Shot name="god" alt="Off Grid AI God: Ares briefs you on your day, with approvals waiting. Part of Pro." /></div></SceneCard>
          <figcaption>What your key unlocks: God briefs you on your day and lines up work for your yes.</figcaption>
        </figure>
      </div>
    </div>
  </section>;
}

function AppCard({ d, mine }) {
  const [name, req] = REQ[d.id];
  return <SceneCard busy={mine} className={`ty-app${mine ? ' ty-mine' : ''}`}>
    <div className="ty-app-head">
      <span className="ty-app-ic"><PlatformIcon id={d.id} size={22} /></span>
      <span className="ty-app-name"><b>{name}</b><small>{req}</small></span>
    </div>
    {mine ? <Badge color="green" variant="soft" radius="small" className="ty-badge">This device</Badge> : <span className="ty-badge-gap" aria-hidden="true" />}
    <a className="dl ty-dl" href={d.href} {...(d.external ? { target: '_blank', rel: 'noopener' } : {})}>
      <span><small>{d.small}</small>{d.label}</span>{d.external ? <ArrowUpRight size={16} /> : <ArrowDown size={16} />}
    </a>
  </SceneCard>;
}

function Apps() {
  const narrow = useNarrow();
  const [dev, setDev] = useState(null);
  useEffect(() => { setDev(detect()); }, []);
  const start = Math.max(0, DOWNLOADS.findIndex(d => d.id === dev));
  return <section id="apps" className="ty ty-sec ty-apps has-bg" aria-labelledby="ty-apps-h"><SectionBg />
    <div className="section-shell">
      <div className="sec-head"><Kicker>YOUR APPS</Kicker><Title id="ty-apps-h" lead="Every device you own." dim="One key for all of them." /></div>
      <MobileRail key={narrow ? `rail-${dev}` : 'grid'} start={start} className="ty-app-grid">
        {DOWNLOADS.map(d => <AppCard key={d.id} d={d} mine={d.id === dev} />)}
      </MobileRail>
      <p className="ty-fine"><a href="/download/">All downloads and betas</a><span>·</span><a href="/desktop/releases/">Desktop releases</a><span>·</span><a href="/mobile/releases/">Mobile releases</a></p>
    </div>
  </section>;
}

const LINKS = [
  [RocketLaunch, 'Quick start', 'From install to your first answer.', '/quick-start/'],
  [Sparkle, 'See everything Pro does', 'Memory, actions you approve, God and Sync.', '/pro/'],
  [Laptop, 'Pro on desktop', 'What Pro adds on your computer.', '/desktop/'],
  [DeviceMobile, 'Pro on mobile', 'What Pro adds on your phone.', '/mobile/'],
];

function Onward() {
  return <section className="ty ty-sec ty-on" aria-labelledby="ty-on-h">
    <div className="section-shell">
      <div className="sec-head"><Kicker>FROM HERE</Kicker><Title id="ty-on-h" lead="Make it yours." /></div>
      <MobileRail className="ty-on-grid">
        {LINKS.map(([I, t, d, href]) => <a key={href} className="ty-on-a" href={href}><SceneCard className="ty-on-card">
          <span className="ty-on-ic"><I size={20} /></span>
          <span className="ty-on-tx"><b>{t}</b><span>{d}</span></span>
          <ArrowRight size={16} className="ty-go" />
        </SceneCard></a>)}
      </MobileRail>
      <p className="ty-help">Still nothing after five minutes, spam checked? Email <a href={`mailto:${SUPPORT}`}>{SUPPORT}</a> from the address you paid with and we will get your key to you.</p>
    </div>
  </section>;
}

export default function ThankYouPage({ data }) {
  const { pricing, purchase } = data;
  useEffect(() => installClickTracking(), []);
  return <PageShell>
    <Hero devices={pricing.devices} />
    <Next devices={pricing.devices} />
    <Apps />
    <Onward />
    {/* Purchase reporting, exactly where the old page ran it: parser-inserted, before PostHog and React. */}
    <script src="/assets/js/checkout-plan.js" />
    <script dangerouslySetInnerHTML={{ __html: purchaseScript(pricing, purchase) }} />
  </PageShell>;
}
