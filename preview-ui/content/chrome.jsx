import React, { useEffect } from 'react';
import Button from '@smoothui/smooth-button';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { orchestra } from '@offgrid-ui/alive';
import { PageShell, DocEnd } from '../shared.jsx';

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
    <Button data-site-button="secondary" variant="outline" size="sm" className="doc-search" onClick={() => window.ogOpenSearch && window.ogOpenSearch()} aria-label="Search the site">
      <MagnifyingGlass size={16} /><span className="doc-search-label">Search</span><kbd>⌘K</kbd>
    </Button>
  </div>;
}

// The Markdown arrives as Jekyll HTML, so its parts join the alive layer here, once, before the
// conductor starts: AliveDoc renders inside PageShell, and child effects run before its AliveProvider's.
// - The reading stays calm: text boxes inside the article (FAQ answers, tables, notes) are still.
//   Link cards in it (guide cards, related links) stay living: the conductor finds them on its own.
// - After the article, the call to action, the pager and the more-on-this-topic cards arrive on scroll.
// - Links written as buttons get the library's button motion.
// - The "On this page" rail answers the reading position: a soft pulse each time the current
//   section changes (the layout's scroll spy toggles .is-current).
const STILL = '.doc-body :is(.faq-item,.table-scroll,.ea-pricing-note)';
const ARRIVE = '.doc-after :is(.doc-cta,.doc-pager>a,.doc-more-grid>a)';
function AliveDoc() {
  useEffect(() => {
    document.querySelectorAll(STILL).forEach((el) => el.setAttribute('data-og-still', ''));
    document.querySelectorAll(ARRIVE).forEach((el) => el.setAttribute('data-og-reveal', ''));
    document.querySelectorAll('.doc-cta a, .doc-body a.btn').forEach((el) => {
      el.setAttribute('data-slot', 'button');
      el.setAttribute('data-variant', el.closest('.doc-cta') || el.classList.contains('btn-green') ? 'default' : 'outline');
    });
    const toc = document.querySelector('.doc-toc');
    if (!toc) return undefined;
    const spy = new MutationObserver((records) => {
      const now = records.map((r) => r.target).find((el) => el.classList.contains('is-current'));
      if (now && now.getClientRects().length) orchestra.pulseFrom(now, 'change', 0.25);
    });
    spy.observe(toc, { subtree: true, attributes: true, attributeFilter: ['class'] });
    return () => spy.disconnect();
  }, []);
  return null;
}

export default function ContentChrome({ a = SLOT_MARKS[0], b = SLOT_MARKS[1] }) {
  return <PageShell feedback={false}>
    <AliveDoc />
    <div className="doc-page">
      <SearchButton />
      <Slot id="og-doc-a" html={a} />
      <DocEnd />
      <Slot id="og-doc-b" html={b} />
    </div>
  </PageShell>;
}
