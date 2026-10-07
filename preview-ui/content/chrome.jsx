import React from 'react';
import Button from '@smoothui/smooth-button';
import { MagnifyingGlass } from '@phosphor-icons/react';
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
    <Button variant="outline" size="sm" className="doc-search" onClick={() => window.ogOpenSearch && window.ogOpenSearch()} aria-label="Search the site">
      <MagnifyingGlass size={16} /><span className="doc-search-label">Search</span><kbd>⌘K</kbd>
    </Button>
  </div>;
}

export default function ContentChrome({ a = SLOT_MARKS[0], b = SLOT_MARKS[1] }) {
  return <PageShell feedback={false}>
    <div className="doc-page">
      <SearchButton />
      <Slot id="og-doc-a" html={a} />
      <DocEnd />
      <Slot id="og-doc-b" html={b} />
    </div>
  </PageShell>;
}
