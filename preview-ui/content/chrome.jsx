import React, { useEffect, useState } from 'react';
import { TextField } from '@radix-ui/themes';
import Button from '@smoothui/smooth-button';
import { ThumbsUp, ThumbsDown, MagnifyingGlass, EnvelopeSimple } from '@phosphor-icons/react';
import { PageShell, Kicker } from '../shared.jsx';

// Chrome for every Markdown page (_layouts/content.html): the kit's header, footer and
// theme around Jekyll's rendered Markdown. The chrome is page-agnostic, so it is rendered
// once at build time. Jekyll fills the two slots; the client reads the slot HTML back
// from the DOM before hydrating, so React keeps the Markdown nodes exactly as served.
export const SLOT_MARKS = ['<!--og-slot-a-->', '<!--og-slot-b-->'];

function Slot({ id, html }) {
  return <div id={id} className="doc-slot" dangerouslySetInnerHTML={{ __html: html }} suppressHydrationWarning />;
}

// Pagefind search, opened by the button or Cmd/Ctrl+K (the old layout's shortcut).
function SearchButton() {
  return <div className="doc-tools" data-pagefind-ignore>
    <Button variant="outline" size="sm" className="doc-search" onClick={() => window.ogOpenSearch && window.ogOpenSearch()} aria-label="Search the site">
      <MagnifyingGlass size={16} /><span className="doc-search-label">Search</span><kbd>⌘K</kbd>
    </Button>
  </div>;
}

// "Did this land?" (same storage key and PostHog event as the old layout) and the
// creator newsletter (same identify + newsletter_signup capture as the old sidebar form).
function DocEnd() {
  const [reaction, setReaction] = useState(null);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(['', '']);
  const [ctx, setCtx] = useState({ slug: '', title: '' });
  useEffect(() => {
    const slug = window.location.pathname;
    const el = document.querySelector('[data-page-title]');
    setCtx({ slug, title: el ? el.getAttribute('data-page-title') : document.title });
    try { const saved = localStorage.getItem('reaction:' + slug); if (saved) setReaction(saved); } catch (_) {}
  }, []);
  const react = (r) => {
    if (reaction === r) return;
    setReaction(r);
    try { localStorage.setItem('reaction:' + ctx.slug, r); } catch (_) {}
    if (typeof posthog !== 'undefined') posthog.capture('page_reaction', { slug: ctx.slug, reaction: r, title: ctx.title });
  };
  const subscribe = (e) => {
    e.preventDefault();
    const value = email.trim();
    if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) { setStatus(['Enter a valid email address.', 'error']); return; }
    if (typeof posthog !== 'undefined') {
      posthog.identify(value, { email: value });
      posthog.capture('newsletter_signup', { email: value, source: window.location.pathname });
    }
    setEmail(''); setStatus(['You\'re in. Updates on their way.', 'success']);
  };
  return <section className="doc-end" aria-label="Feedback and updates" data-pagefind-ignore>
    <div className="doc-end-in">
      <div className="doc-react">
        <Kicker>DID THIS LAND?</Kicker>
        <div className="doc-react-row">
          <Button variant={reaction === 'agree' ? 'soft' : 'outline'} size="icon" aria-pressed={reaction === 'agree'} aria-label="Agree with this" onClick={() => react('agree')}><ThumbsUp size={18} weight={reaction === 'agree' ? 'fill' : 'regular'} /></Button>
          <Button variant={reaction === 'disagree' ? 'soft' : 'outline'} size="icon" aria-pressed={reaction === 'disagree'} aria-label="Disagree with this" onClick={() => react('disagree')}><ThumbsDown size={18} weight={reaction === 'disagree' ? 'fill' : 'regular'} /></Button>
          <span className="doc-react-thanks" aria-live="polite">{reaction ? (reaction === 'agree' ? 'Glad it landed.' : 'Thanks for the feedback.') : ''}</span>
        </div>
      </div>
      <form className="doc-news" onSubmit={subscribe} noValidate>
        <Kicker>UPDATES FROM THE CREATOR</Kicker>
        <div className="doc-news-row">
          <TextField.Root className="doc-news-input" type="email" size="3" placeholder="your@email.com" autoComplete="email" aria-label="Email address" value={email} onChange={(e) => setEmail(e.target.value)} disabled={status[1] === 'success'}>
            <TextField.Slot><EnvelopeSimple size={16} /></TextField.Slot>
          </TextField.Root>
          <Button type="submit" className="doc-news-btn" disabled={status[1] === 'success'}>Subscribe</Button>
        </div>
        <p className={`doc-news-status ${status[1]}`} aria-live="polite">{status[0]}</p>
      </form>
    </div>
  </section>;
}

export default function ContentChrome({ a = SLOT_MARKS[0], b = SLOT_MARKS[1] }) {
  return <PageShell>
    <div className="doc-page">
      <SearchButton />
      <Slot id="og-doc-a" html={a} />
      <DocEnd />
      <Slot id="og-doc-b" html={b} />
    </div>
  </PageShell>;
}
