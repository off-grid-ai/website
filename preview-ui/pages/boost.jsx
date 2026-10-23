import React, { useLayoutEffect, useRef, useState } from 'react';
import { ListGroup, ListRow } from '@offgrid-ui/list-row';
import { CheckboxCards, RadioCards, Text, TextField } from '@radix-ui/themes';
import Button from '@smoothui/smooth-button';
import { ArrowDown, ArrowRight, Check, EnvelopeSimple, GithubLogo, ShieldCheck, DeviceMobile, Stack, Timer } from '@phosphor-icons/react';
import { PageShell, Kicker, Title, Lede, SceneCard } from '../shared.jsx';
import { PRO_MONTHLY, BOOST_TOPUP, monthlyLabel } from '../pro-plans.js';

// /boost/: the waitlist for Off Grid AI Boost, hosted open models for people whose phone or computer can't run
// a model, or runs it too slowly. The request is recorded the same way as the newsletter: identify the email
// in PostHog, then capture one event with the answers.
const USES = ['Chat with bigger models', 'Image generation', 'Voice and speech', 'Video', 'Documents and research'];
const DEVICES = [['phone', 'My phone'], ['computer', 'My computer'], ['both', 'Both']];
const PLANS = [...PRO_MONTHLY.map(p => [p.id, monthlyLabel(p)]), ['unsure', 'Not sure yet']];
const ETHOS = [
  [ShieldCheck, 'Never stored or trained on.', 'Your prompts are answered and gone. We don\'t keep them or learn from them.'],
  [DeviceMobile, 'You choose what runs where.', 'Each model runs on your device or on Boost. Nothing leaves your device unless you pick Boost for it.'],
  [Stack, 'Models your device can\'t run.', 'The largest open chat models, newer image models and faster voice, on any phone or laptop.'],
  [Timer, 'Part of Pro monthly.', `Pro monthly includes Boost minutes, from $${PRO_MONTHLY[0].price} for ${PRO_MONTHLY[0].minutes} a month, billed by the millisecond. Top up from $${BOOST_TOPUP.from} for ${BOOST_TOPUP.minutes} minutes, or carry on on your own device.`],
  [GithubLogo, 'No lock-in.', 'The serving code will be open source, so you can run it on your own hardware.'],
];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Choices({ legend, hint, Group, value, onChange, items }) {
  return <fieldset>
    <legend className="eyebrow">{legend}</legend>
    {hint && <Text as="p" className="cl-hint">{hint}</Text>}
    <Group.Root size="1" value={value} onValueChange={onChange} className="cl-pick">
      {items.map(([v, l]) => <Group.Item key={v} value={v}>{l}</Group.Item>)}
    </Group.Root>
  </fieldset>;
}

// The library's ListGroup of ListRows: one surface, rows divided by hairlines. ListRow takes no extra
// attributes, so its rows are marked living after each render; the group arrives once on scroll.
function Rows({ label, children }) {
  const ref = useRef(null);
  useLayoutEffect(() => { ref.current?.querySelectorAll(':scope > [data-slot=list-row]:not([data-og-living])').forEach((row) => row.setAttribute('data-og-living', '')); });
  return <ListGroup ref={ref} label={label} className="og-rows" data-og-reveal="">{children}</ListGroup>;
}

function RequestForm() {
  const [uses, setUses] = useState([]);
  const [device, setDevice] = useState('');
  // /pro links here with the size already chosen (?plan=pro-300).
  const [plan, setPlan] = useState(() => { const q = typeof location === 'undefined' ? '' : new URLSearchParams(location.search).get('plan'); return PRO_MONTHLY.some(p => p.id === q) ? q : ''; });
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(['', '']);
  const [busy, setBusy] = useState(false);
  const done = status[1] === 'success';
  const submit = (e) => {
    e.preventDefault();
    const value = email.trim();
    if (!uses.length) return setStatus(['Pick at least one thing you\'d use Boost for.', 'error']);
    if (!device) return setStatus(['Choose where you use Off Grid AI.', 'error']);
    if (!EMAIL.test(value)) return setStatus(['Enter a valid email address.', 'error']);
    if (typeof posthog !== 'undefined') {
      posthog.identify(value, { email: value });
      posthog.capture('boost_waitlist_joined', { email: value, uses, device, plan: plan || null, source: window.location.pathname });
    }
    // A brief busy state, then the card settles with one pulse as the request lands.
    setBusy(true); setStatus(['', '']);
    setTimeout(() => { setBusy(false); setStatus(['You\'re on the list. We\'ll email you when Boost opens.', 'success']); }, 700);
  };
  return <SceneCard className="cl-card" busy={busy}><form className="cl-form" onSubmit={submit} noValidate>
    <fieldset disabled={done || busy} className="cl-group">
      <Choices legend="What would you use Boost for?" Group={CheckboxCards} value={uses} onChange={setUses} items={USES.map(u => [u, u])} />
      <Choices legend="Where do you use Off Grid AI?" Group={RadioCards} value={device} onChange={setDevice} items={DEVICES} />
      <Choices legend="Which Pro monthly plan would you pick?" hint="Every Pro feature, plus Boost minutes each month. Optional." Group={RadioCards} value={plan} onChange={setPlan} items={PLANS} />
      <fieldset>
        <legend className="eyebrow">Email</legend>
        <div className="cl-send">
          <TextField.Root size="3" type="email" name="email" required autoComplete="email" placeholder="your@email.com" aria-label="Email address" aria-invalid={status[1] === 'error' && !EMAIL.test(email.trim())} value={email} onChange={(e) => setEmail(e.target.value)} className="cl-email">
            <TextField.Slot><EnvelopeSimple size={16} /></TextField.Slot>
          </TextField.Root>
          <Button data-site-button="primary" type="submit" size="lg" className="cl-submit">{done ? <><Check size={16} /> On the list</> : <>Join the waitlist <ArrowRight size={16} /></>}</Button>
        </div>
      </fieldset>
    </fieldset>
    <Text as="p" className={`cl-status ${status[1]}`} aria-live="polite">{status[0]}</Text>
  </form></SceneCard>;
}

export default function BoostPage() {
  return <PageShell feedback={false}><div className="ideas cl">
    <section className="has-bg ideas-hero cl-hero" aria-labelledby="cl-h">
      <div className="section-shell cl-grid">
        <div className="sec-head ideas-head">
          <Kicker>BOOST · PART OF PRO MONTHLY</Kicker>
          <Title as="h1" id="cl-h" lead="Bigger models when you need them." dim="Without a bigger computer." />
          <Lede>Some models are too big or too slow for your phone or laptop. Boost runs them for you, inside the Off Grid AI apps you already use, and only when you choose. Pro monthly comes with Boost minutes every month. We never store or train on your prompts.</Lede>
          <a className="cl-jump" href="#cl-request">Join the waitlist <ArrowDown size={14} /></a>
        </div>
        <div id="cl-request" className="cl-request" data-analytics-view="boost_form_viewed" data-analytics-placement="boost_page"><RequestForm /></div>
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
