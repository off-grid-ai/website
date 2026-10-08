import React from 'react';
import { ArrowUpRight } from '@phosphor-icons/react';
import Button from '@smoothui/smooth-button';
import { PageShell, Kicker, Title, Lede, SectionBg } from '../shared.jsx';
import { Seq, Explorer, Faq } from './_product.jsx';
import { FEATURES, fill } from './_features.mjs';

// A feature group page: a short hero, the group's features in the shared explorer (each plays its screens),
// guides, questions, and the other groups. Copy lives in _features.mjs.
function Ctas({ free }) {
  const pro = <Button asChild variant={free ? 'outline' : undefined} key="pro"><a href="/pro/#buy">Get Pro</a></Button>;
  const dl = <Button asChild variant={free ? undefined : 'outline'} key="dl"><a href="/download/">Download free</a></Button>;
  return <div className="ft-ctas">{free ? [dl, pro] : [pro, dl]}</div>;
}

export default function FeaturePage({ slug, data }) {
  const f = FEATURES.find(x => x.slug === slug); const p = data.pricing; const free = f.kicker === 'FREE';
  const items = f.items.map(it => ({ ...it, visual: () => <Seq shots={it.shots} /> }));
  return <PageShell>
    <section className="pp ft-hero has-bg" aria-labelledby="ft-h1"><SectionBg />
      <div className="section-shell ft-hero-in">
        <Kicker>{f.kicker}</Kicker>
        <Title as="h1" id="ft-h1" className="pp-h1" lead={f.lead} dim={f.dim} />
        <Lede className="pp-lede ft-lede">{f.lede}</Lede>
        <Ctas free={free} />
      </div>
      <div className="section-shell"><Explorer items={items} label={`${f.name} features`} /></div>
    </section>

    {data.articles?.length ? <section className="chapter pp ft-read" aria-labelledby="ft-read-h">
      <div className="section-shell">
        <div className="sec-head"><Kicker>GUIDES</Kicker><Title id="ft-read-h" lead="Set it up." dim="Step by step." /></div>
        <ul className="ft-articles">{data.articles.map(a => <li key={a.href}><a href={a.href}><span>{a.title}</span><ArrowUpRight size={16} aria-hidden="true" /></a></li>)}</ul>
      </div>
    </section> : null}

    <Faq items={f.faq.map(([q, a]) => [q, fill(a, p)])} />

    <section className="chapter pp ft-more" aria-labelledby="ft-more-h">
      <div className="section-shell">
        <div className="sec-head"><Kicker>MORE FEATURES</Kicker><Title id="ft-more-h" lead="Off Grid AI does more." dim="On the same devices." /></div>
        <ul className="ft-others">{FEATURES.filter(x => x.slug !== slug).map(o => <li key={o.slug}><a href={`/features/${o.slug}/`}><b>{o.name}</b><small>{o.note}</small></a></li>)}</ul>
      </div>
    </section>

    <section className="pp pp-final has-bg" aria-labelledby="ft-final-h"><SectionBg />
      <div className="section-shell final-in">
        <Kicker>OFF GRID AI</Kicker>
        <h2 id="ft-final-h" className="final-h">Your computer. Your phone. Your AI.</h2>
        <p className="final-lede">{free ? 'Free on every platform.' : `Pro, on up to ${p.devices} devices.`}</p>
        <Ctas free={free} />
      </div>
    </section>
  </PageShell>;
}
