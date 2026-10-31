import React, { useLayoutEffect, useRef, useState } from 'react';
import { ListGroup, ListRow } from '@offgrid-ui/list-row';
import { RadioCards, Text, TextArea, TextField } from '@radix-ui/themes';
import Button from '@smoothui/smooth-button';
import { ArrowDown, ArrowRight, Check, EnvelopeSimple, User, GlobeHemisphereWest, Devices, Receipt, GithubLogo, Cpu } from '@phosphor-icons/react';
import { PageShell, Kicker, Title, Lede, SceneCard } from '../shared.jsx';

// /investors/ — angels and community-round investors register interest. Recorded the same way as the
// cloud early-access request: identify the email in PostHog, then capture one event with the answers.
const ROUTES = [['angel', 'Angel'], ['community', 'Community round']];
const AMOUNTS = [['10k-50k', '$10k to $50k'], ['50k-250k', '$50k to $250k'], ['250k+', '$250k+']];
const BUILT = [
  [Devices, 'Five platforms, live today.', 'Mac, Windows, Linux, iPhone and Android, plus a Chrome extension.'],
  [Receipt, 'Revenue from day one.', 'Pro sells monthly and lifetime. Boost, hosted inference for teams, is onboarding its first cohort.'],
  [Cpu, 'Almost nothing to serve.', 'The models run on each user\'s own phone or laptop, so a new user adds no server bill.'],
  [GithubLogo, '250,000+ downloads.', 'And 3,300+ GitHub stars. Open source, so anyone can check that their chats never leave the device.'],
];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Choices({ legend, value, onChange, items }) {
  return <fieldset>
    <legend className="eyebrow">{legend}</legend>
    <RadioCards.Root size="1" value={value} onValueChange={onChange} className="iv-pick">
      {items.map(([v, l]) => <RadioCards.Item key={v} value={v}>{l}</RadioCards.Item>)}
    </RadioCards.Root>
  </fieldset>;
}

// The library's ListGroup of ListRows: one surface, rows divided by hairlines. ListRow takes no extra
// attributes, so its rows are marked living after each render; the group arrives once on scroll.
function Rows({ label, children }) {
  const ref = useRef(null);
  useLayoutEffect(() => { ref.current?.querySelectorAll(':scope > [data-slot=list-row]:not([data-og-living])').forEach((row) => row.setAttribute('data-og-living', '')); });
  return <ListGroup ref={ref} label={label} className="og-rows" data-og-reveal="">{children}</ListGroup>;
}

function InterestForm() {
  const [route, setRoute] = useState('');
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState(['', '']);
  const [busy, setBusy] = useState(false);
  const done = status[1] === 'success';
  const submit = (e) => {
    e.preventDefault();
    const value = email.trim();
    if (!route) return setStatus(['Choose angel or community round.', 'error']);
    if (!amount) return setStatus(['Choose roughly how much.', 'error']);
    if (!name.trim()) return setStatus(['Enter your name.', 'error']);
    if (!EMAIL.test(value)) return setStatus(['Enter a valid email address.', 'error']);
    if (!country.trim()) return setStatus(['Enter the country you live in.', 'error']);
    if (typeof posthog !== 'undefined') {
      posthog.identify(value, { email: value, name: name.trim() });
      posthog.capture('investor_interest_registered', { email: value, name: name.trim(), route, amount, country: country.trim(), note: note.trim() || null, source: window.location.pathname });
    }
    // A brief busy state, then the card settles with one pulse as the request lands.
    setBusy(true); setStatus(['', '']);
    setTimeout(() => { setBusy(false); setStatus(['Thanks. Your interest is registered.', 'success']); }, 700);
  };
  return <SceneCard className="iv-card" busy={busy}><form className="iv-form" onSubmit={submit} noValidate>
    <fieldset disabled={done || busy} className="iv-group">
      <Choices legend="How would you invest?" value={route} onChange={setRoute} items={ROUTES} />
      <Choices legend="Roughly how much (USD, from $10k)" value={amount} onChange={setAmount} items={AMOUNTS} />
      <fieldset>
        <legend className="eyebrow">About you</legend>
        <div className="iv-pair">
          <TextField.Root size="3" name="name" autoComplete="name" placeholder="Your name" aria-label="Name" value={name} onChange={(e) => setName(e.target.value)}>
            <TextField.Slot><User size={16} /></TextField.Slot>
          </TextField.Root>
          <TextField.Root size="3" name="country" autoComplete="country-name" placeholder="Country" aria-label="Country you live in" value={country} onChange={(e) => setCountry(e.target.value)}>
            <TextField.Slot><GlobeHemisphereWest size={16} /></TextField.Slot>
          </TextField.Root>
        </div>
        <TextArea size="3" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Anything we should know (optional)" aria-label="Note" className="iv-note" />
      </fieldset>
      <fieldset>
        <legend className="eyebrow">Email</legend>
        <div className="iv-send">
          <TextField.Root size="3" type="email" name="email" required autoComplete="email" placeholder="you@example.com" aria-label="Email address" aria-invalid={status[1] === 'error' && !EMAIL.test(email.trim())} value={email} onChange={(e) => setEmail(e.target.value)} className="iv-email">
            <TextField.Slot><EnvelopeSimple size={16} /></TextField.Slot>
          </TextField.Root>
          <Button data-site-button="primary" type="submit" size="lg" className="iv-submit">{done ? <><Check size={16} /> Registered</> : <>Register interest <ArrowRight size={16} /></>}</Button>
        </div>
      </fieldset>
    </fieldset>
    <Text as="p" className={`iv-status ${status[1]}`} aria-live="polite">{status[0]}</Text>
    <Text as="p" className="iv-legal">Registering interest commits you to nothing, and we take no money through this page. It is not an offer to sell securities.</Text>
  </form></SceneCard>;
}

export default function InvestorsPage() {
  return <PageShell feedback={false}><div className="ideas iv">
    <section className="has-bg ideas-hero iv-hero" aria-labelledby="iv-h">
      <div className="section-shell iv-grid">
        <div className="sec-head ideas-head">
          <Kicker>INVESTORS · ANGEL AND COMMUNITY ROUNDS OPEN</Kicker>
          <Title as="h1" id="iv-h" lead="Own part of Off Grid AI." dim="The round is open." />
          <Lede>Personal AI that runs on the phone and laptop you already own. 250,000+ downloads across five platforms, and earning from Pro. Angels and community investors can join from $10k.</Lede>
          <a className="iv-jump" href="#iv-register">Register interest <ArrowDown size={14} /></a>
        </div>
        <div id="iv-register" className="iv-register" data-analytics-view="investor_form_viewed" data-analytics-placement="investors_page"><InterestForm /></div>
      </div>
    </section>

    <section className="chapter iv-sec og-solid" aria-labelledby="iv-built-h"><div className="section-shell iv-built">
      <div className="sec-head ideas-head iv-head"><Kicker>WHAT YOU'D BACK</Kicker><Title id="iv-built-h" lead="Already shipping." dim="Already earning." /></div>
      <Rows label="What Off Grid AI has built">
        {BUILT.map(([Icon, t, d]) => <ListRow key={t} className="og-row" leading={<Icon size={18} className="og-row-ic" />} title={t} description={d} />)}
      </Rows>
    </div></section>
  </div></PageShell>;
}
