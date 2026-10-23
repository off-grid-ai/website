import React, { useLayoutEffect, useRef } from 'react';
import { ListGroup, ListRow } from '@offgrid-ui/list-row';
import { Heading } from '@radix-ui/themes';
import Button from '@smoothui/smooth-button';
import { ArrowRight, Check, GithubLogo, ShieldCheck, DeviceMobile, Stack, Timer } from '@phosphor-icons/react';
import { PageShell, Kicker, Title, Lede, SceneCard } from '../shared.jsx';
import { PRO_SIZES, MONTHLY_FROM, BOOST_TOPUP, BOOST_LAUNCH, BANK_MONTHS, minutesText } from '../pro-plans.js';

// /boost/: Off Grid AI Boost, hosted open models for people whose phone or computer can't run a model, or runs
// it too slowly. Boost comes with Pro (monthly or yearly); this page explains it and sends people to /pro to buy.
const ETHOS = [
  [ShieldCheck, 'Never stored or trained on.', 'Your prompts are answered and gone. We don\'t keep them or learn from them.'],
  [DeviceMobile, 'You choose what runs where.', 'Each model runs on your device or on Boost. Nothing leaves your device unless you pick Boost for it.'],
  [Stack, 'Models your device can\'t run.', 'The largest open chat models, newer image models and faster voice, on any phone or laptop.'],
  [Timer, 'Included in Pro.', `Pro includes Boost minutes, from $${MONTHLY_FROM} a month for ${PRO_SIZES[0].minutes}, billed by the millisecond. Top up from $${BOOST_TOPUP.from} for ${BOOST_TOPUP.minutes} minutes, or carry on on your own device.`],
  [GithubLogo, 'No lock-in.', 'The serving code will be open source, so you can run it on your own hardware.'],
];

// The library's ListGroup of ListRows: one surface, rows divided by hairlines. ListRow takes no extra
// attributes, so its rows are marked living after each render; the group arrives once on scroll.
function Rows({ label, children }) {
  const ref = useRef(null);
  useLayoutEffect(() => { ref.current?.querySelectorAll(':scope > [data-slot=list-row]:not([data-og-living])').forEach((row) => row.setAttribute('data-og-living', '')); });
  return <ListGroup ref={ref} label={label} className="og-rows" data-og-reveal="">{children}</ListGroup>;
}

// The three Pro sizes, so the minutes have a price beside them; buying happens on /pro.
function Plans() {
  return <SceneCard className="cl-card"><div className="cl-plans">
    <Kicker>BOOST COMES WITH PRO</Kicker>
    <ul className="cl-plan-list">{PRO_SIZES.map(size => <li key={size.minutes}><Check size={14} /><span>{minutesText(size)}</span><b>${size.monthly}/mo</b><small>or ${size.yearly}/yr</small></li>)}</ul>
    <p className="cl-hint">Every Pro feature starts the day you pay. Boost goes live in {BOOST_LAUNCH}; the minutes you pay for before then bank, up to {BANK_MONTHS} months' worth.</p>
    <Button asChild data-site-button="primary" variant="solid" size="lg" className="pro-shimmer cl-submit"><a href="/pro/#buy" data-analytics-event="pro_cta_click" data-analytics-placement="boost_page">Get Pro <ArrowRight size={16} /></a></Button>
  </div></SceneCard>;
}

export default function BoostPage() {
  return <PageShell feedback={false}><div className="ideas cl">
    <section className="has-bg ideas-hero cl-hero" aria-labelledby="cl-h">
      <div className="section-shell cl-grid">
        <div className="sec-head ideas-head">
          <Kicker>{`BOOST · LIVE ${BOOST_LAUNCH.toUpperCase()}`}</Kicker>
          <Title as="h1" id="cl-h" lead="Bigger models when you need them." dim="Without a bigger computer." />
          <Lede>{`Some models are too big or too slow for your phone or laptop. Boost runs them for you, inside the Off Grid AI apps you already use, and only when you choose. Boost comes with Pro and goes live in ${BOOST_LAUNCH}. We never store or train on your prompts.`}</Lede>
        </div>
        <div className="cl-request" data-analytics-view="boost_plans_viewed" data-analytics-placement="boost_page"><Plans /></div>
      </div>
    </section>

    <section className="chapter cl-sec og-solid" aria-labelledby="cl-ethos-h"><div className="section-shell cl-ethos">
      <div className="sec-head ideas-head cl-head"><Kicker>WHAT YOU GET</Kicker><Title id="cl-ethos-h" lead="Private by default." dim="Your device stays first." /></div>
      <Rows label="What Off Grid AI Boost gives you">
        {ETHOS.map(([Icon, t, d]) => <ListRow key={t} className="og-row" leading={<Icon size={18} className="og-row-ic" />} title={t} description={d} />)}
      </Rows>
    </div></section>
  </div></PageShell>;
}
