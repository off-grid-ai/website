import React, { useLayoutEffect, useRef, useState } from 'react';
import { ListGroup, ListRow } from '@offgrid-ui/list-row';
import { CheckboxCards, RadioCards, Text, TextArea, TextField } from '@radix-ui/themes';
import Button from '@smoothui/smooth-button';
import { ArrowDown, ArrowRight, Check, EnvelopeSimple, User, Link as LinkIcon, DownloadSimple, GithubLogo, AirplaneTilt, CurrencyDollar } from '@phosphor-icons/react';
import { PageShell, Kicker, Title, Lede, SceneCard } from '../shared.jsx';

// /affiliates/ — creators and influencers apply to the affiliate program. Recorded the same way as the
// investors page: identify the email in PostHog, then capture one event with the answers.
const CHANNELS = ['YouTube', 'X', 'Instagram', 'TikTok', 'LinkedIn', 'Newsletter', 'Blog', 'Podcast', 'Community'];
const AUDIENCE = [['<1k', 'Under 1k'], ['1k-10k', '1k to 10k'], ['10k-100k', '10k to 100k'], ['100k-1m', '100k to 1M'], ['1m+', '1M+']];
const WHY = [
  [AirplaneTilt, 'A demo that lands.', 'Turn on airplane mode and keep chatting. Your audience sees the privacy instead of taking your word for it.'],
  [DownloadSimple, 'Free to start.', 'No account and no card. Viewers can try it minutes after your video ends.'],
  [GithubLogo, 'Nothing to defend.', 'Open source with 3,300+ GitHub stars. Anyone who doubts you can read the code.'],
  [CurrencyDollar, 'Paid on Pro.', 'You earn when your audience buys Off Grid AI Pro.'],
];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Choices({ legend, Group, value, onChange, items }) {
  return <fieldset>
    <legend className="eyebrow">{legend}</legend>
    <Group.Root size="1" value={value} onValueChange={onChange} className="af-pick">
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

function ApplyForm() {
  const [channels, setChannels] = useState([]);
  const [audience, setAudience] = useState('');
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [note, setNote] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(['', '']);
  const [busy, setBusy] = useState(false);
  const done = status[1] === 'success';
  const submit = (e) => {
    e.preventDefault();
    const value = email.trim();
    if (!channels.length) return setStatus(['Pick where you publish.', 'error']);
    if (!audience) return setStatus(['Choose your audience size.', 'error']);
    if (!name.trim()) return setStatus(['Enter your name.', 'error']);
    if (!link.trim()) return setStatus(['Add a link to your channel.', 'error']);
    if (!EMAIL.test(value)) return setStatus(['Enter a valid email address.', 'error']);
    if (typeof posthog !== 'undefined') {
      posthog.identify(value, { email: value, name: name.trim() });
      posthog.capture('affiliate_application_submitted', { email: value, name: name.trim(), channels, audience, link: link.trim(), note: note.trim() || null, source: window.location.pathname });
    }
    // A brief busy state, then the card settles with one pulse as the application lands.
    setBusy(true); setStatus(['', '']);
    setTimeout(() => { setBusy(false); setStatus(['Thanks. Your application is in.', 'success']); }, 700);
  };
  return <SceneCard className="af-card" busy={busy}><form className="af-form" onSubmit={submit} noValidate>
    <fieldset disabled={done || busy} className="af-group">
      <Choices legend="Where do you publish?" Group={CheckboxCards} value={channels} onChange={setChannels} items={CHANNELS.map(c => [c, c])} />
      <Choices legend="Audience size" Group={RadioCards} value={audience} onChange={setAudience} items={AUDIENCE} />
      <fieldset>
        <legend className="eyebrow">About you</legend>
        <div className="af-pair">
          <TextField.Root size="3" name="name" autoComplete="name" placeholder="Your name" aria-label="Name" value={name} onChange={(e) => setName(e.target.value)}>
            <TextField.Slot><User size={16} /></TextField.Slot>
          </TextField.Root>
          <TextField.Root size="3" type="url" name="link" autoComplete="url" placeholder="Link to your channel" aria-label="Link to your channel" value={link} onChange={(e) => setLink(e.target.value)}>
            <TextField.Slot><LinkIcon size={16} /></TextField.Slot>
          </TextField.Root>
        </div>
        <TextArea size="3" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Who is your audience? (optional)" aria-label="About your audience" className="af-note" />
      </fieldset>
      <fieldset>
        <legend className="eyebrow">Email</legend>
        <div className="af-send">
          <TextField.Root size="3" type="email" name="email" required autoComplete="email" placeholder="you@example.com" aria-label="Email address" aria-invalid={status[1] === 'error' && !EMAIL.test(email.trim())} value={email} onChange={(e) => setEmail(e.target.value)} className="af-email">
            <TextField.Slot><EnvelopeSimple size={16} /></TextField.Slot>
          </TextField.Root>
          <Button data-site-button="primary" type="submit" size="lg" className="af-submit">{done ? <><Check size={16} /> Applied</> : <>Apply to join <ArrowRight size={16} /></>}</Button>
        </div>
      </fieldset>
    </fieldset>
    <Text as="p" className={`af-status ${status[1]}`} aria-live="polite">{status[0]}</Text>
  </form></SceneCard>;
}

export default function AffiliatesPage() {
  return <PageShell feedback={false}><div className="ideas af">
    <section className="has-bg ideas-hero af-hero" aria-labelledby="af-h">
      <div className="section-shell af-grid">
        <div className="sec-head ideas-head">
          <Kicker>AFFILIATES · CREATORS AND INFLUENCERS</Kicker>
          <Title as="h1" id="af-h" lead="Show your audience AI that works in airplane mode." dim="Earn when they go Pro." />
          <Lede>Off Grid AI runs on the phone and laptop they already own. If you make videos, posts or newsletters about AI, privacy or productivity, apply to join.</Lede>
          <a className="af-jump" href="#af-apply">Apply to join <ArrowDown size={14} /></a>
        </div>
        <div id="af-apply" className="af-apply" data-analytics-view="affiliate_form_viewed" data-analytics-placement="affiliates_page"><ApplyForm /></div>
      </div>
    </section>

    <section className="chapter af-sec og-solid" aria-labelledby="af-why-h"><div className="section-shell af-why">
      <div className="sec-head ideas-head af-head"><Kicker>WHAT YOU'D SHARE</Kicker><Title id="af-why-h" lead="Easy to show." dim="Easy to trust." /></div>
      <Rows label="Why Off Grid AI is easy to recommend">
        {WHY.map(([Icon, t, d]) => <ListRow key={t} className="og-row" leading={<Icon size={18} className="og-row-ic" />} title={t} description={d} />)}
      </Rows>
    </div></section>
  </div></PageShell>;
}
