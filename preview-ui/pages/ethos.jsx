import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Heading, Text, TextField, Select } from '@radix-ui/themes';
import Button from '@smoothui/smooth-button';
import { MagnifyingGlass, ArrowRight, Eye, Brain, CheckCircle, X } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'motion/react';
import { AnimatedBackground } from '@motion-primitives/animated-background';
import { MagicCard } from '@magicui/magic-card';
import { PageShell, Kicker, Title, Lede, SectionBg } from '../shared.jsx';
import { IdeasHero, Platforms, Points, Statement } from './_ideas.jsx';

// The Ethos hub: search, topic filter, device and sort, exactly as assets/js/article-hub.js
// behaves on the section hubs, including its analytics events and properties.
const PAGE_SIZE = 24;
const PLACEMENT = 'ethos';
const RESULT_LABEL = 'pages';
const DEFAULT_TITLE = 'Ethos';

function filterPages(entries, { query, topic, device, sort }, visible) {
  const q = query.trim().toLocaleLowerCase();
  const terms = q.split(/\s+/).filter(Boolean);
  const matches = entries.filter(e => (!topic || e.page.topic === topic) && (!device || e.page.platform === device) && terms.every(t => e.text.includes(t)));
  matches.sort((a, b) => {
    if (q) {
      const score = (e) => (e.heading.includes(q) ? 8 : 0) + terms.reduce((n, t) => n + (e.heading.includes(t) ? 2 : 0), 0);
      const d = score(b) - score(a); if (d) return d;
    }
    if (sort === 'title') return a.heading.localeCompare(b.heading);
    return b.page.date.localeCompare(a.page.date);
  });
  return { q, matches, shown: matches.slice(0, visible) };
}

function EthosHub({ pages, sections }) {
  const entries = useMemo(() => pages.map(page => ({
    page, heading: page.title.toLocaleLowerCase(),
    text: `${page.title} ${page.description} ${page.topic} ${page.platform} ${page.topic}`.toLocaleLowerCase(),
  })), [pages]);
  const topics = useMemo(() => sections.map(name => [name, name, pages.filter(p => p.topic === name).length]).filter(([, , n]) => n > 0), [pages, sections]);
  const platforms = useMemo(() => [...new Set(pages.map(p => p.platform))].sort(), [pages]);

  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState('');
  const [device, setDevice] = useState('');
  const [sort, setSort] = useState('newest');
  const [visible, setVisible] = useState(PAGE_SIZE);
  const state = { query, topic, device, sort };
  const { q, matches, shown } = filterPages(entries, state, visible);

  // Analytics, same names and properties as article-hub.js. Queries are compared locally and never sent.
  const live = useRef({}); live.current = { ...state, matchCount: matches.length, shownCount: Math.min(visible, matches.length) };
  const lastSearch = useRef(''); const timer = useRef(0); const inputRef = useRef(null);
  const track = (name, extra, s = live.current) => {
    if (typeof window === 'undefined' || !window.OffGridAnalytics) return;
    const query = s.query.trim();
    window.OffGridAnalytics.capture(name, Object.assign({
      placement: PLACEMENT, topic: s.topic || 'all', device: s.device || 'all', sort: s.sort,
      search_active: Boolean(query), query_length: query.length, term_count: query ? query.split(/\s+/).length : 0,
      result_count: s.matchCount, shown_count: s.shownCount,
    }, extra));
  };
  const snapshot = (next) => { const s = { ...live.current, ...next }; const v = next.visible ?? PAGE_SIZE; const r = filterPages(entries, s, v); return { ...s, matchCount: r.matches.length, shownCount: Math.min(v, r.matches.length) }; };
  const reportSearch = () => {
    clearTimeout(timer.current);
    const query = live.current.query.trim().toLocaleLowerCase();
    if (query === lastSearch.current) return;
    const had = Boolean(lastSearch.current); lastSearch.current = query;
    if (query) track('resource_search_used'); else if (had) track('resource_search_cleared');
  };
  useEffect(() => { const f = () => reportSearch(); addEventListener('pagehide', f); return () => removeEventListener('pagehide', f); }, []);

  const onQuery = (value) => { setQuery(value); setVisible(PAGE_SIZE); clearTimeout(timer.current); timer.current = setTimeout(reportSearch, 750); };
  const onTopic = (id) => {
    const next = id === 'all' || id === topic ? '' : id;
    setTopic(next); setVisible(PAGE_SIZE);
    track('resource_topic_selected', undefined, snapshot({ topic: next }));
  };
  const onDevice = (v) => { const next = v === 'all' ? '' : v; setDevice(next); setVisible(PAGE_SIZE); track('resource_device_selected', undefined, snapshot({ device: next })); };
  const onSort = (v) => { setSort(v); setVisible(PAGE_SIZE); track('resource_sort_changed', undefined, snapshot({ sort: v })); };
  const onMore = () => { reportSearch(); const v = visible + PAGE_SIZE; setVisible(v); track('resource_more_clicked', undefined, snapshot({ visible: v })); };
  const onClear = () => {
    reportSearch(); track('resource_filters_cleared');
    lastSearch.current = ''; setQuery(''); setDevice(''); setSort('newest'); setTopic(''); setVisible(PAGE_SIZE);
    inputRef.current?.focus();
  };
  const onResult = (page, position) => {
    reportSearch();
    track('resource_result_clicked', { destination: new URL(page.url, location.href).pathname, result_topic: page.topic, result_device: page.platform, position });
  };

  const title = q ? (topic ? `Search results in ${topic}` : 'Search results') : (topic || DEFAULT_TITLE);
  const count = matches.length ? `Showing ${Math.min(visible, matches.length)} of ${matches.length} ${RESULT_LABEL}` : `0 ${RESULT_LABEL}`;

  return <div className="article-hub ethos-hub" data-pagefind-ignore>
    <div className="article-search-row ethos-search" data-analytics-view="resource_hub_viewed" data-analytics-placement={PLACEMENT}>
      <label className="sr-only" htmlFor="article-search">Search Ethos</label>
      <TextField.Root ref={inputRef} id="article-search" size="3" type="search" placeholder="Try privacy, memory, context..." autoComplete="off" value={query}
        onChange={(e) => onQuery(e.target.value)} onBlur={reportSearch} onKeyDown={(e) => { if (e.key === 'Enter') reportSearch(); }} className="ethos-input">
        <TextField.Slot><MagnifyingGlass size={16} /></TextField.Slot>
        {query && <TextField.Slot><button type="button" className="ethos-x" aria-label="Clear search" onClick={() => { onQuery(''); inputRef.current?.focus(); }}><X size={14} /></button></TextField.Slot>}
      </TextField.Root>
    </div>

    <AnimatePresence initial={false}>
      {!q && <motion.div key="topics" className="ethos-topics" role="group" aria-label="Filter by topic" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .15 }}>
        <AnimatedBackground defaultValue={topic || 'all'} onValueChange={(id) => id && onTopic(id)} className="seg-hover" transition={{ type: 'spring', bounce: .15, duration: .4 }}>
          {[['all', 'All topics', pages.length], ...topics].map(([id, name, n]) => <button type="button" key={id} data-id={id} className="seg ethos-topic" aria-pressed={(topic || 'all') === id}>
            <span>{name}</span><small>{n} {RESULT_LABEL}</small>
          </button>)}
        </AnimatedBackground>
      </motion.div>}
    </AnimatePresence>

    <motion.div layout="position" className="ethos-toolbar">
      <div className="ethos-toolbar-title"><Heading as="h2" id="article-result-title">{title}</Heading><Text as="p" id="article-result-count" role="status" aria-live="polite">{count}</Text></div>
      <div className="ethos-controls">
        <Select.Root value={device || 'all'} onValueChange={onDevice}>
          <Select.Trigger aria-label="Device" className="ethos-select" />
          <Select.Content position="popper">
            <Select.Item value="all">All devices</Select.Item>
            {platforms.map(p => <Select.Item key={p} value={p}>{p}</Select.Item>)}
          </Select.Content>
        </Select.Root>
        <Select.Root value={sort} onValueChange={onSort}>
          <Select.Trigger aria-label="Sort" className="ethos-select" />
          <Select.Content position="popper">
            <Select.Item value="newest">Default</Select.Item>
            <Select.Item value="title">Title A–Z</Select.Item>
          </Select.Content>
        </Select.Root>
        <Button variant="ghost" className="ethos-clear" onClick={onClear}>Clear filters</Button>
      </div>
    </motion.div>

    <motion.div layout="position" className="ethos-results" id="article-results">
      <AnimatePresence initial={false} mode="popLayout">
        {shown.map(({ page }, i) => <motion.div key={page.url} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: .98 }} transition={{ duration: .25 }}>
          <a className="ethos-card article-result" href={page.url} data-topic={page.topic} data-platform={page.platform} onClick={() => onResult(page, i + 1)}>
            <MagicCard className="feat ethos-mc" gradientSize={260} gradientColor="rgba(16, 185, 129, 0.08)" gradientFrom="var(--og-primary)" gradientTo="var(--og-primary-dark)">
              <div className="ethos-card-in">
                <span className="eyebrow">{page.topic} · {page.platform}</span>
                <Heading as="h3">{page.title}</Heading>
                {page.headline && <p className="ethos-card-head">{page.headline}</p>}
                <Text as="p" className="ethos-card-desc">{page.description}</Text>
                <span className="ex-link">Read the {page.title.toLowerCase()} <ArrowRight size={15} /></span>
              </div>
            </MagicCard>
          </a>
        </motion.div>)}
      </AnimatePresence>
    </motion.div>
    {!matches.length && <p id="article-empty" className="ethos-empty">No pages match. Try another term or clear the filters.</p>}
    {matches.length > visible && <Button variant="outline" className="ethos-more" onClick={onMore}>Show more pages</Button>}
  </div>;
}

export default function EthosPage({ data }) {
  return <PageShell><div className="ideas ideas-ethos">
    <IdeasHero kicker="ETHOS" id="ethos" lead="Personal AI on hardware" dim="you already own."
      lede="An assistant that knows what you share, remembers your work, and acts with your approval.">
      <Platforms />
      <Points featured items={[
        [Brain, 'Memory on your devices.', 'Local models and captured memory stay with you. You control capture and Sync.'],
        [Eye, 'Context you choose.', ''],
        [CheckCircle, 'Action with your approval.', ''],
      ]} />
    </IdeasHero>

    <section className="ideas-hub-sec" aria-labelledby="ethos-read-h"><div className="section-shell">
      <div className="sec-head ideas-head ideas-stack ethos-hub-head"><Kicker>MISSION AND VISION</Kicker><Title id="ethos-read-h" lead="Why we build." dim="Where we are taking it." /><Lede>Search the ideas behind Off Grid AI, or see what ships today.</Lede><a className="ex-link" href="/download/">See current features <ArrowRight size={15} /></a></div>
      <EthosHub pages={data.hub.pages} sections={data.hub.sections} />
    </div></section>

    <Statement label="Ethos">Your hardware. Your context. Your personal AI assistant.</Statement>
  </div></PageShell>;
}
