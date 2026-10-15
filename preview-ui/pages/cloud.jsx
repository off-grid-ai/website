import React, { useLayoutEffect, useRef, useState } from 'react';
import { ListGroup, ListRow } from '@offgrid-ui/list-row';
import { CheckboxCards, RadioCards, Text, TextField } from '@radix-ui/themes';
import Button from '@smoothui/smooth-button';
import { ArrowDown, ArrowRight, Check, EnvelopeSimple, Cube, GithubLogo, ShieldCheck, DeviceMobile, Stack } from '@phosphor-icons/react';
import { PageShell, Kicker, Title, Lede, SceneCard } from '../shared.jsx';

// /cloud/ — early access to Off Grid AI Cloud (hosted inference). The request is recorded the same
// way as the newsletter: identify the email in PostHog, then capture one event with the answers.
const KINDS = ['Text and vision', 'Speech to text', 'Text to speech', 'Voice', 'Embeddings', 'Reranking', 'Image', 'Video', 'Decision models', 'Grounding specialists'];
const SPEND = [['200-500', '$200 to $500'], ['500-2k', '$500 to $2k'], ['2k-10k', '$2k to $10k'], ['10k-50k', '$10k to $50k'], ['50k+', '$50k+']];
const COMMIT = [['monthly', 'Month to month'], ['3m', '3 months'], ['6m', '6 months'], ['12m', '1 year'], ['24m+', '2 years or more']];
const ETHOS = [
  [GithubLogo, 'The code will be open source.', 'Read exactly how your requests are handled. Run it on your own hardware if you prefer.'],
  [ShieldCheck, 'Privacy first.', 'Built on the same ethos as the Off Grid AI apps.'],
  [DeviceMobile, 'Works with your device.', 'Same open models on device or in the cloud. You choose where each runs.'],
  [Stack, 'Every modality.', 'Text, vision, speech, voice, embeddings, image, video, decision models and grounding specialists.'],
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
  const [kinds, setKinds] = useState([]);
  const [models, setModels] = useState('');
  const [spend, setSpend] = useState('');
  const [commit, setCommit] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(['', '']);
  const [busy, setBusy] = useState(false);
  const done = status[1] === 'success';
  const submit = (e) => {
    e.preventDefault();
    const value = email.trim();
    if (!kinds.length && !models.trim()) return setStatus(['Pick at least one kind of model.', 'error']);
    if (!spend) return setStatus(['Choose your monthly spend.', 'error']);
    if (!commit) return setStatus(['Choose a minimum commitment.', 'error']);
    if (!EMAIL.test(value)) return setStatus(['Enter a valid email address.', 'error']);
    if (typeof posthog !== 'undefined') {
      posthog.identify(value, { email: value });
      posthog.capture('cloud_early_access_requested', { email: value, model_kinds: kinds, models: models.trim() || null, monthly_spend: spend, min_commitment: commit, source: window.location.pathname });
    }
    // A brief busy state, then the card settles with one pulse as the request lands.
    setBusy(true); setStatus(['', '']);
    setTimeout(() => { setBusy(false); setStatus(['You\'re on the list. We\'ll email you to get set up.', 'success']); }, 700);
  };
  return <SceneCard className="cl-card" busy={busy}><form className="cl-form" onSubmit={submit} noValidate>
    <fieldset disabled={done || busy} className="cl-group">
      <Choices legend="What do you want to run?" Group={CheckboxCards} value={kinds} onChange={setKinds} items={KINDS.map(k => [k, k])} />
      <TextField.Root size="3" value={models} onChange={(e) => setModels(e.target.value)} placeholder="Model names, like Qwen3-VL" aria-label="Which models" className="cl-other">
        <TextField.Slot><Cube size={16} /></TextField.Slot>
      </TextField.Root>
      <Choices legend="Monthly inference spend (USD)" hint="From $200 a month, billed per millisecond." Group={RadioCards} value={spend} onChange={setSpend} items={SPEND} />
      <Choices legend="Shortest commitment you'd sign" Group={RadioCards} value={commit} onChange={setCommit} items={COMMIT} />
      <fieldset>
        <legend className="eyebrow">Email</legend>
        <div className="cl-send">
          <TextField.Root size="3" type="email" name="email" required autoComplete="email" placeholder="you@company.com" aria-label="Email address" aria-invalid={status[1] === 'error' && !EMAIL.test(email.trim())} value={email} onChange={(e) => setEmail(e.target.value)} className="cl-email">
            <TextField.Slot><EnvelopeSimple size={16} /></TextField.Slot>
          </TextField.Root>
          <Button data-site-button="primary" type="submit" size="lg" className="cl-submit">{done ? <><Check size={16} /> Requested</> : <>Request access <ArrowRight size={16} /></>}</Button>
        </div>
      </fieldset>
    </fieldset>
    <Text as="p" className={`cl-status ${status[1]}`} aria-live="polite">{status[0]}</Text>
  </form></SceneCard>;
}

export default function CloudPage() {
  return <PageShell feedback={false}><div className="ideas cl">
    <section className="has-bg ideas-hero cl-hero" aria-labelledby="cl-h">
      <div className="section-shell cl-grid">
        <div className="sec-head ideas-head">
          <Kicker>OFF GRID AI CLOUD · FIRST COHORT</Kicker>
          <Title as="h1" id="cl-h" lead="Open models, served for you." dim="No GPUs to manage." />
          <Lede>Run inference in our cloud when you need scale, or private access to frontier models. We're onboarding our first cohort now.</Lede>
          <a className="cl-jump" href="#cl-request">Request access <ArrowDown size={14} /></a>
        </div>
        <div id="cl-request" className="cl-request"><RequestForm /></div>
      </div>
    </section>

    <section className="chapter cl-sec og-solid" aria-labelledby="cl-ethos-h"><div className="section-shell cl-ethos">
      <div className="sec-head ideas-head cl-head"><Kicker>TRUE TO THE ETHOS</Kicker><Title id="cl-ethos-h" lead="Open source." dim="Privacy first." /></div>
      <Rows label="Off Grid AI Cloud principles">
        {ETHOS.map(([Icon, t, d]) => <ListRow key={t} className="og-row" leading={<Icon size={18} className="og-row-ic" />} title={t} description={d} />)}
      </Rows>
    </div></section>
  </div></PageShell>;
}
