import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { TextField, Select, SegmentedControl, Badge } from '@radix-ui/themes';
import Button from '@smoothui/smooth-button';
import { AnimatedBackground } from '@motion-primitives/animated-background';
import {
  MagnifyingGlass, X, ArrowRight, RocketLaunch, Cpu, Microphone, ImageSquare, FileText, PencilLine, Briefcase,
  ArrowsClockwise, ShieldCheck, Wrench, SunHorizon, BookOpen, Clock,
} from '@phosphor-icons/react';
import { PageShell, Kicker, Title, Lede, SectionBg, SceneCard, MobileRail } from '../shared.jsx';

// The learning hubs (/guides/, /articles/, /writing/). Browsing: a featured row, then one section per
// topic (a few cards and "See all"; phones swipe each topic as a MobileRail). Searching or filtering:
// one ranked, paged result grid. Same filtering and the same analytics events and properties as the
// old assets/js/article-hub.js (resource_* events; the query text is never sent).
const ALL = 'all';
export const TOPIC_ICONS = {
  'Getting started': RocketLaunch, 'Models & performance': Cpu, 'Voice & audio': Microphone, 'Images & vision': ImageSquare,
  'Documents & research': FileText, 'Writing & learning': PencilLine, 'Work & organization': Briefcase, 'Sync & sharing': ArrowsClockwise,
  'Privacy & control': ShieldCheck, 'Automation & tools': Wrench, 'Everyday tasks': SunHorizon,
};
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const fmt = (d) => { const [y, m, day] = (d || '').slice(0, 10).split('-'); return y && m && day ? `${day} ${MONTHS[+m - 1]} ${y}` : ''; };

// One card: Magic UI MagicCard (via the kit's SceneCard) with the topic icon, platform chip and reading time.
export function HubCard({ item, featured, position }) {
  const Icon = TOPIC_ICONS[item.topic] || BookOpen;
  return <SceneCard className={`hub-mc${featured ? ' hub-mc-feat' : ''}`}>
    <a className="hub-card" href={item.url} data-topic={item.topic} data-platform={item.platform} data-position={position}>
      <span className="hub-card-top">
        <span className="hub-card-topic"><Icon size={featured ? 20 : 16} weight="duotone" />{item.topic || 'Off Grid AI'}</span>
        <Badge className="hub-chip" variant="outline" color="gray">{item.platform}</Badge>
      </span>
      <span className="hub-card-title">{item.title}</span>
      <span className="hub-card-desc">{item.description}</span>
      <span className="hub-card-foot">
        {item.date ? <time dateTime={item.date.slice(0, 10)}>{fmt(item.date)}</time> : null}
        {item.minutes ? <span><Clock size={12} />{item.minutes} min read</span> : null}
        <ArrowRight size={14} className="hub-card-go" />
      </span>
    </a>
  </SceneCard>;
}

export function Hub({ hub, kicker, lead, dim, lede, placement, noun, defaultTitle, searchLabel, placeholder, sortDefault = 'Newest', pageSize = 24, featured = [], perTopic = 3, intro, outro }) {
  const { items, topics, platforms } = hub;
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState('');
  const [device, setDevice] = useState(ALL);
  const [sort, setSort] = useState('newest');
  const [visible, setVisible] = useState(pageSize);
  const state = useRef({}); const lastSearch = useRef(''); const timer = useRef(0); const inputRef = useRef(null); const resultsRef = useRef(null);

  const q = query.trim().toLocaleLowerCase();
  const browsing = !q && !topic && device === ALL && sort === 'newest';
  const matches = useMemo(() => {
    const terms = q.split(/\s+/).filter(Boolean);
    const text = (i) => `${i.title} ${i.description} ${i.topic} ${i.platform} ${i.keywords}`.toLocaleLowerCase();
    const list = items.map((item, index) => ({ item, index })).filter(({ item }) =>
      (!topic || item.topic === topic) && (device === ALL || item.platform === device) && terms.every(t => text(item).includes(t)));
    const heading = (i) => i.title.toLocaleLowerCase();
    const score = (i) => (heading(i).includes(q) ? 8 : 0) + terms.reduce((n, t) => n + (heading(i).includes(t) ? 2 : 0), 0);
    return list.sort((a, b) => {
      if (q) { const d = score(b.item) - score(a.item); if (d) return d; }
      if (sort === 'title') return heading(a.item).localeCompare(heading(b.item));
      return (b.item.date || '').localeCompare(a.item.date || '') || a.index - b.index;
    }).map(m => m.item);
  }, [items, q, topic, device, sort]);
  const shown = Math.min(visible, matches.length);
  state.current = { query: query.trim(), topic, device, sort, matchCount: matches.length, shown };

  const track = useCallback((name, extra) => {
    if (!window.OffGridAnalytics) return;
    const s = state.current;
    window.OffGridAnalytics.capture(name, Object.assign({
      placement, topic: s.topic || 'all', device: s.device === ALL ? 'all' : s.device, sort: s.sort,
      search_active: Boolean(s.query), query_length: s.query.length, term_count: s.query ? s.query.split(/\s+/).length : 0,
      result_count: s.matchCount, shown_count: s.shown,
    }, extra));
  }, [placement]);
  // Compare queries locally; never send the words someone typed.
  const reportSearch = useCallback(() => {
    clearTimeout(timer.current);
    const now = state.current.query.toLocaleLowerCase();
    if (now === lastSearch.current) return;
    const had = Boolean(lastSearch.current); lastSearch.current = now;
    if (now) track('resource_search_used'); else if (had) track('resource_search_cleared');
  }, [track]);
  useEffect(() => { window.addEventListener('pagehide', reportSearch); return () => window.removeEventListener('pagehide', reportSearch); }, [reportSearch]);
  // Events fire after the render that applied the change, so counts match what is on screen.
  const pending = useRef(null);
  useEffect(() => { if (pending.current) { const [n, e] = pending.current; pending.current = null; track(n, e); } });

  const toResults = () => { const el = resultsRef.current; if (el && el.getBoundingClientRect().top < 0) el.scrollIntoView({ block: 'start' }); };
  const pickTopic = (id, jump) => { const next = id === topic ? '' : (id || ''); setTopic(next); setVisible(pageSize); pending.current = ['resource_topic_selected']; if (jump) requestAnimationFrame(toResults); };
  const onQuery = (v) => { setQuery(v); setVisible(pageSize); clearTimeout(timer.current); timer.current = setTimeout(reportSearch, 750); };
  const clear = () => {
    reportSearch(); track('resource_filters_cleared'); lastSearch.current = '';
    setQuery(''); setDevice(ALL); setSort('newest'); setTopic(''); setVisible(pageSize);
    if (inputRef.current) inputRef.current.focus();
  };
  const title = q ? (topic ? `Search results in ${topic}` : 'Search results') : (topic || defaultTitle);
  const topicInfo = topics.find(t => t.name === topic);
  const onResultClick = (e) => {
    const link = e.target.closest && e.target.closest('a.hub-card'); if (!link) return;
    reportSearch();
    track('resource_result_clicked', { destination: new URL(link.href, window.location.href).pathname, result_topic: link.dataset.topic, result_device: link.dataset.platform, position: Number(link.dataset.position) || 0 });
  };

  // Browsing layout: featured row, then a few cards per topic.
  const feat = useMemo(() => {
    const picked = featured.map(u => items.find(i => i.url === u)).filter(Boolean);
    const starter = items.find(i => i.topic === 'Getting started' && !picked.includes(i));
    if (starter && picked.length < 2) picked.push(starter);
    for (const i of items) { if (picked.length >= 3) break; if (!picked.includes(i)) picked.push(i); }
    return picked.slice(0, 3);
  }, [items, featured]);
  const groups = useMemo(() => topics.map(t => ({ ...t, items: items.filter(i => i.topic === t.name) })).filter(g => g.items.length), [items, topics]);
  let pos = 0;

  return <PageShell>
    <section className="chapter has-bg hub-hero" aria-labelledby="hub-h"><SectionBg />
      <div className="section-shell">
        <div className="sec-head"><Kicker>{kicker}</Kicker><Title as="h1" id="hub-h" lead={lead} dim={dim} /><Lede>{lede}</Lede></div>
        {intro}
      </div>
    </section>
    <section className="hub" aria-labelledby="hub-results-h">
      <div className="hub-bar" data-analytics-view="resource_hub_viewed" data-analytics-placement={placement}>
        <div className="section-shell hub-bar-in">
          <label className="sr-only" htmlFor="hub-search-input">{searchLabel}</label>
          <TextField.Root id="hub-search-input" ref={inputRef} className="hub-input" size="3" type="search" autoComplete="off" placeholder={placeholder} value={query}
            onChange={(e) => onQuery(e.target.value)} onBlur={reportSearch} onKeyDown={(e) => { if (e.key === 'Enter') reportSearch(); }}>
            <TextField.Slot><MagnifyingGlass size={18} /></TextField.Slot>
            {query && <TextField.Slot><Button variant="ghost" size="icon-sm" className="hub-input-clear" aria-label="Clear search" onClick={() => { onQuery(''); inputRef.current && inputRef.current.focus(); }}><X size={16} /></Button></TextField.Slot>}
          </TextField.Root>
          <div className="hub-controls">
            <Select.Root value={device} onValueChange={(v) => { setDevice(v); setVisible(pageSize); pending.current = ['resource_device_selected']; }}>
              <Select.Trigger className="hub-select" aria-label="Device" />
              <Select.Content position="popper" className="hub-select-menu">
                <Select.Item value={ALL}>All devices</Select.Item>
                {platforms.map(p => <Select.Item key={p} value={p}>{p}</Select.Item>)}
              </Select.Content>
            </Select.Root>
            <SegmentedControl.Root className="hub-sort" value={sort} aria-label="Sort" onValueChange={(v) => { setSort(v); setVisible(pageSize); pending.current = ['resource_sort_changed']; }}>
              <SegmentedControl.Item value="newest">{sortDefault}</SegmentedControl.Item>
              <SegmentedControl.Item value="title">A–Z</SegmentedControl.Item>
            </SegmentedControl.Root>
          </div>
        </div>
      </div>
      <div className="section-shell" ref={resultsRef}>
        <div className="hub-topics" role="group" aria-label="Filter by topic">
          <AnimatedBackground defaultValue={topic} onValueChange={(id) => pickTopic(id)} className="hub-topic-bg" transition={{ type: 'spring', bounce: .15, duration: .35 }}>
            {[{ name: '', label: 'All topics', count: items.length }, ...topics].map(t => {
              const Icon = t.name ? (TOPIC_ICONS[t.name] || BookOpen) : null;
              return <button key={t.name || 'all'} data-id={t.name} type="button" className="hub-topic" aria-pressed={topic === t.name} title={t.description || undefined}>
                {Icon && <Icon size={15} weight="duotone" className="hub-topic-ic" />}<span className="hub-topic-name">{t.label || t.name}</span><span className="hub-topic-count">{t.count}</span>
              </button>;
            })}
          </AnimatedBackground>
        </div>

        {browsing ? <div className="hub-browse" onClick={onResultClick}>
          <h2 id="hub-results-h" className="sr-only">{defaultTitle}</h2>
          <p className="sr-only" role="status" aria-live="polite">{`${items.length} ${noun}`}</p>
          <div className="hub-group hub-featured">
            <div className="hub-group-head"><Kicker>FEATURED</Kicker></div>
            <MobileRail className="hub-feat-grid">{feat.map((item, i) => <HubCard key={item.url} item={item} featured={i === 0} position={++pos} />)}</MobileRail>
          </div>
          {groups.map(g => {
            const Icon = TOPIC_ICONS[g.name] || BookOpen;
            const list = g.items.filter(i => !feat.includes(i)).slice(0, perTopic);
            return <section key={g.name} className="hub-group" aria-labelledby={`hub-g-${slug(g.name)}`}>
              <div className="hub-group-head">
                <span className="hub-group-ic"><Icon size={18} weight="duotone" /></span>
                <div className="hub-group-tx"><h3 id={`hub-g-${slug(g.name)}`}>{g.name}</h3>{g.description && <p>{g.description}</p>}</div>
                {g.items.length > list.length && <Button variant="ghost" size="sm" className="hub-seeall" onClick={(e) => { e.stopPropagation(); pickTopic(g.name, true); }}>See all {g.items.length}<ArrowRight size={14} /></Button>}
              </div>
              <MobileRail className="hub-grid">{list.map(item => <HubCard key={item.url} item={item} position={++pos} />)}</MobileRail>
            </section>;
          })}
        </div> : <>
          <div className="hub-toolbar">
            <div className="hub-toolbar-title">
              <h2 id="hub-results-h">{title}</h2>
              <p role="status" aria-live="polite">{matches.length ? `Showing ${shown} of ${matches.length} ${noun}` : `0 ${noun}`}{topicInfo && !q ? ` · ${topicInfo.description}` : ''}</p>
            </div>
            <Button variant="outline" size="sm" className="hub-clear" onClick={clear}><X size={14} />Clear filters</Button>
          </div>
          <div className="hub-grid hub-results" onClick={onResultClick}>
            {matches.slice(0, visible).map((item, i) => <HubCard key={item.url} item={item} position={i + 1} />)}
          </div>
          {!matches.length && <p className="hub-empty">No {noun} match. Try another term or clear the filters.</p>}
          {matches.length > visible && <div className="hub-more"><Button variant="outline" className="hub-more-btn" onClick={() => { reportSearch(); setVisible(v => v + pageSize); pending.current = ['resource_more_clicked']; }}>Show more {noun}<ArrowRight size={16} /></Button></div>}
        </>}
        {outro}
      </div>
    </section>
  </PageShell>;
}
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');
