import React, { useState } from 'react';
import { TextField } from '@radix-ui/themes';
import { EnvelopeSimple, ChatCircle, Eye, Key, Robot, ArrowUpRight } from '@phosphor-icons/react';
import Button from '@smoothui/smooth-button';
import { PageShell, Kicker, Title, Lede, SectionBg, SceneCard, BrowserScene } from '../shared.jsx';
import { Faq } from './_product.jsx';

// The browser extension is in early access: people ask to join, and the request is recorded in PostHog,
// the same way the newsletter signs people up (identify + one capture with the details).
const BROWSERS = ['Chrome', 'Firefox', 'Edge', 'Brave', 'Arc'];
function RequestAccess({ placement }) {
  const [email, setEmail] = useState(''); const [browser, setBrowser] = useState('Chrome'); const [status, setStatus] = useState(['', '']);
  const submit = (e) => {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) { setStatus(['Enter a valid email address.', 'error']); return; }
    if (typeof posthog !== 'undefined') {
      posthog.identify(value, { email: value });
      posthog.capture('extension_access_request', { email: value, browser, placement, source: window.location.pathname });
    }
    setEmail(''); setStatus(["You're on the list. We'll email you when your access is ready.", 'success']);
  };
  return <form className="ex-form" onSubmit={submit} noValidate aria-label="Request access to the browser extension">
    <div className="ex-browsers" role="radiogroup" aria-label="Your browser">
      {BROWSERS.map(b => <button type="button" key={b} role="radio" aria-checked={browser === b} className={`ex-chip${browser === b ? ' is-on' : ''}`} onClick={() => setBrowser(b)}>{b}</button>)}
    </div>
    <div className="ex-row">
      <TextField.Root className="ex-input" type="email" name="email" required size="3" placeholder="your@email.com" autoComplete="email" aria-label="Email address" aria-invalid={status[1] === 'error'} value={email} onChange={(e) => { setEmail(e.target.value); if (status[0]) setStatus(['', '']); }}>
        <TextField.Slot><EnvelopeSimple size={16} /></TextField.Slot>
      </TextField.Root>
      <Button type="submit" className="ex-btn" disabled={status[1] === 'success'}>Request access</Button>
    </div>
    <p className={`ex-status ${status[1]}`} aria-live="polite">{status[0]}</p>
  </form>;
}

const DOES = [
  [ChatCircle, 'Ask about any page', 'Summarise, rewrite or translate what you are reading.'],
  [Eye, 'Ask about a screenshot', 'A vision model reads the visible tab.'],
  [Key, 'Fill logins from your Vault', 'Saved logins and new passwords, from your unlocked desktop Vault.'],
  [Robot, 'Run tasks in the tab', 'Agent mode works through the page while you watch.'],
];
const FAQ = [
  ['What do I need?', 'Off Grid AI Desktop running with a model, and Chrome. Firefox, Edge, Brave and Arc builds are in testing.'],
  ['Does the page leave my computer?', 'No. The extension sends it to Off Grid AI Desktop on your machine, and your model answers there.'],
  ['Is it free?', 'Chat about pages is free. Vault filling and tasks with your desktop tools need Off Grid AI Pro.'],
  ['When do I get access?', 'We are letting people in a few at a time. You will get an email when yours is ready.'],
];

export default function ExtensionPage() {
  return <PageShell>
    <section className="pp ex-hero has-bg" aria-labelledby="ex-h1"><SectionBg />
      <div className="section-shell ex-hero-grid">
        <div className="ex-copy">
          <Kicker>BROWSER EXTENSION · EARLY ACCESS</Kicker>
          <Title as="h1" id="ex-h1" className="pp-h1" lead="Your AI, in every tab." dim="On your computer." />
          <Lede className="pp-lede">Ask about any page. Your desktop model answers.</Lede>
          <RequestAccess placement="hero" />
          <p className="ex-fine">Needs <a href="/desktop/">Off Grid AI Desktop</a>. Chrome first, more browsers soon.</p>
        </div>
        <div className="ex-visual"><SceneCard className="ex-scene"><BrowserScene /></SceneCard></div>
      </div>
    </section>

    <section className="chapter pp ex-does" aria-labelledby="ex-does-h">
      <div className="section-shell">
        <div className="sec-head"><Kicker>WHAT IT DOES</Kicker><Title id="ex-does-h" lead="Four things." dim="All on your machine." /></div>
        <ul className="ex-list">{DOES.map(([Icon, t, l]) => <li key={t}><span className="ex-ic"><Icon size={20} /></span><b>{t}</b><span>{l}</span></li>)}</ul>
      </div>
    </section>

    <Faq items={FAQ} />

    <section className="pp pp-final has-bg" aria-labelledby="ex-final-h"><SectionBg />
      <div className="section-shell final-in">
        <Kicker>EARLY ACCESS</Kicker>
        <h2 id="ex-final-h" className="final-h">Join the list.</h2>
        <RequestAccess placement="final" />
        <p className="fine"><a href="/articles/how-to-summarise-web-pages-with-local-ai-in-your-browser-in-2026/">Summarise pages</a> · <a href="/articles/how-to-fill-website-logins-from-your-off-grid-ai-vault-in-2026/">Fill logins</a> · <a href="https://github.com/off-grid-ai/browser-extension" target="_blank" rel="noopener">Source on GitHub <ArrowUpRight size={12} /></a></p>
      </div>
    </section>
  </PageShell>;
}
