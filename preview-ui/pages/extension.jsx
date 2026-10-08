import React, { useState } from 'react';
import { TextField } from '@radix-ui/themes';
import { EnvelopeSimple, ChatCircle, Key, Robot, ArrowUpRight, PlugsConnected, LinkSimple, Waveform, Check, X } from '@phosphor-icons/react';
import Button from '@smoothui/smooth-button';
import { PageShell, Kicker, Title, Lede, SectionBg, SceneCard, BrowserScene } from '../shared.jsx';
import { Faq } from './_product.jsx';

// The browser extension is in early access: people ask to join, and the request is recorded in PostHog,
// the same way the newsletter signs people up (identify + one capture with the details).
const BROWSERS = ['Chrome', 'Edge', 'Brave', 'Arc', 'Firefox'];
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
  [Robot, 'Tasks in your own tabs', 'It clicks, types and reads in your real browser, signed in. You watch the pointer and can stop it any time.'],
  [PlugsConnected, "Your desktop's tools", 'Calendar, mail and your connectors, used from the browser. Actions still wait for your yes.'],
  [ChatCircle, 'A chat for every tab', 'Ask about the page or a screenshot. Each tab keeps its own conversation.'],
  [Key, 'Your Vault in the sign-in field', 'A key icon fills your saved logins and makes new passwords.'],
  [LinkSimple, 'A private link to your desktop', 'Pair with six words. Chats sync both ways. It does not count toward your devices.'],
  [Waveform, 'Every model your desktop runs', 'Text, vision, voice in and out, and images.'],
];
// Where the work happens: an agent driving a remote browser, compared with the extension in your own browser.
const WHY = [
  ['Runs in a browser on a remote server', 'Runs in the browser you already use'],
  ['You sign in again, in that browser', 'Uses the sessions you are already signed in to'],
  ["Pages are read by the provider's model", 'Pages are read by a model on your computer'],
  ['Needs an account with the provider', 'No account. Off Grid AI Desktop does the work'],
];
const FAQ = [
  ['What do I need?', 'Off Grid AI Desktop running with a model, and Chrome, Edge, Brave or Arc. Firefox comes later.'],
  ['Why my own browser?', 'The sites you use already know you there. Tasks run with the sessions you have, so you do not sign in again somewhere else.'],
  ['Will it type my passwords or pay for things?', 'No. Codes, card numbers and CAPTCHAs are refused in code. Sign-ins come from your Vault or from you.'],
  ['Is it free?', 'Chat and connectors are free. The Vault, your desktop tools and tasks need Off Grid AI Pro.'],
  ['When do I get access?', 'We are letting people in a few at a time. You will get an email when yours is ready.'],
];

export default function ExtensionPage() {
  return <PageShell>
    <section className="pp ex-hero has-bg" aria-labelledby="ex-h1"><SectionBg />
      <div className="section-shell ex-hero-grid">
        <div className="ex-copy">
          <Kicker>BROWSER EXTENSION · EARLY ACCESS</Kicker>
          <Title as="h1" id="ex-h1" className="pp-h1" lead="Your AI, in your browser." dim="Signed in, like you." />
          <Lede className="pp-lede">Tasks run in your own tabs, with your logins. Your desktop model does the thinking.</Lede>
          <RequestAccess placement="hero" />
          <p className="ex-fine">Needs <a href="/desktop/">Off Grid AI Desktop</a>. Chrome, Edge, Brave and Arc first.</p>
        </div>
        <div className="ex-visual"><SceneCard className="ex-scene"><BrowserScene /></SceneCard></div>
      </div>
    </section>

    <section className="chapter pp ex-why" aria-labelledby="ex-why-h">
      <div className="section-shell">
        <div className="sec-head"><Kicker>WHERE THE WORK HAPPENS</Kicker><Title id="ex-why-h" lead="Your browser." dim="Not a remote one." /></div>
        <div className="ex-vs" role="table" aria-label="An agent in a remote browser compared with Off Grid AI in your browser">
          <div className="ex-vs-col" role="rowgroup"><span className="ex-vs-h" role="columnheader">Agent in a remote browser</span>{WHY.map(([a]) => <span key={a} className="ex-vs-row" role="cell"><X size={14} />{a}</span>)}</div>
          <div className="ex-vs-col is-us" role="rowgroup"><span className="ex-vs-h" role="columnheader">Off Grid AI in your browser</span>{WHY.map(([, b]) => <span key={b} className="ex-vs-row" role="cell"><Check size={14} />{b}</span>)}</div>
        </div>
      </div>
    </section>

    <section className="chapter pp ex-does" aria-labelledby="ex-does-h">
      <div className="section-shell">
        <div className="sec-head"><Kicker>WHAT IT DOES</Kicker><Title id="ex-does-h" lead="What it does." dim="All through your desktop." /></div>
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
