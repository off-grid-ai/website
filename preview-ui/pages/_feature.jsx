import React, { useLayoutEffect, useRef } from 'react';
import { ArrowUpRight } from '@phosphor-icons/react';
import Button from '@smoothui/smooth-button';
import { ListGroup, ListRow } from '@offgrid-ui/list-row';
import { PageShell, Kicker, Title, Lede } from '../shared.jsx';
import { Seq, Explorer, Faq } from './_product.jsx';
import { FEATURES, fill } from './_features.mjs';

// A feature group page: a short hero, the group's features in the shared explorer (each plays its screens),
// guides, questions, and the other groups. Copy lives in _features.mjs.
// The page's one background is the living field (PageShell). Blocks below the fold arrive once on scroll
// (data-og-reveal; the conductor staggers siblings). Headings built from Title/Kicker already animate in, so they
// carry no second entrance. Guides and the other groups are the library's ListGroup of ListRows on .og-solid;
// the shared Faq sits on .og-solid too.

// The library's ListGroup, its rows marked as living surfaces after each render (ListRow takes no extra
// attributes), the same way the hubs do it (_hub.jsx). The group arrives once on scroll.
function FtList({ labelledBy, children }) {
  const ref = useRef(null);
  useLayoutEffect(() => { ref.current?.querySelectorAll(':scope > [data-slot=list-row]:not([data-og-living])').forEach((row) => row.setAttribute('data-og-living', '')); });
  return <ListGroup ref={ref} aria-labelledby={labelledBy} className="ft-list og-solid" data-og-reveal="">{children}</ListGroup>;
}

// One row: the title is the row's link, stretched over the row in _feature.css.
function FtRow({ href, title, line }) {
  return <ListRow className="ft-row" title={<a className="ft-row-link" href={href}>{title}</a>} description={line}
    trailing={<ArrowUpRight size={14} className="ft-row-go" aria-hidden="true" />} />;
}

function Ctas({ free }) {
  // The site button reads its look from data-site-button, so the outline call is "secondary".
  const pro = <Button data-site-button={free ? 'secondary' : 'primary'} asChild variant={free ? 'outline' : undefined} key="pro"><a href="/pro/#buy">Get Pro</a></Button>;
  const dl = <Button data-site-button={free ? 'primary' : 'secondary'} asChild variant={free ? undefined : 'outline'} key="dl"><a href="/download/">Download free</a></Button>;
  return <div className="ft-ctas">{free ? [dl, pro] : [pro, dl]}</div>;
}

export default function FeaturePage({ slug, data }) {
  const f = FEATURES.find(x => x.slug === slug); const p = data.pricing; const free = f.kicker === 'FREE';
  const items = f.items.map(it => ({ ...it, visual: () => <Seq shots={it.shots} /> }));
  return <PageShell>
    <section className="pp ft-hero has-bg" aria-labelledby="ft-h1">
      <div className="section-shell ft-hero-in">
        <Kicker>{f.kicker}</Kicker>
        <Title as="h1" id="ft-h1" className="pp-h1" lead={f.lead} dim={f.dim} />
        <Lede className="pp-lede ft-lede">{f.lede}</Lede>
        <Ctas free={free} />
      </div>
      <div className="section-shell" data-og-reveal=""><Explorer items={items} label={`${f.name} features`} /></div>
    </section>

    {data.articles?.length ? <section className="chapter pp ft-read" aria-labelledby="ft-read-h">
      <div className="section-shell">
        <div className="sec-head"><Kicker>GUIDES</Kicker><Title id="ft-read-h" lead="Set it up." dim="Step by step." /></div>
        <FtList labelledBy="ft-read-h">{data.articles.map(a => <FtRow key={a.href} href={a.href} title={a.title} />)}</FtList>
      </div>
    </section> : null}

    <Faq items={f.faq.map(([q, a]) => [q, fill(a, p)])} />

    <section className="chapter pp ft-more" aria-labelledby="ft-more-h">
      <div className="section-shell">
        <div className="sec-head"><Kicker>MORE FEATURES</Kicker><Title id="ft-more-h" lead="Off Grid AI does more." dim="On the same devices." /></div>
        <FtList labelledBy="ft-more-h">{FEATURES.filter(x => x.slug !== slug).map(o => <FtRow key={o.slug} href={`/features/${o.slug}/`} title={o.name} line={o.note} />)}</FtList>
      </div>
    </section>

    <section className="pp pp-final has-bg" aria-labelledby="ft-final-h">
      <div className="section-shell final-in" data-og-reveal="">
        <Kicker>OFF GRID AI</Kicker>
        <h2 id="ft-final-h" className="final-h">Your computer. Your phone. Your AI.</h2>
        <p className="final-lede">{free ? 'Free on every platform.' : `Pro, on up to ${p.devices} devices.`}</p>
        <Ctas free={free} />
      </div>
    </section>
  </PageShell>;
}
