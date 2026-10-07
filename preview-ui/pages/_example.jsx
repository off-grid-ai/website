import React from 'react';
import { PageShell, Kicker, Title, Lede, SceneCard, SectionBg, Shot } from '../shared.jsx';

// Template for a page. Copy to <slug>.jsx (no leading underscore) to build it.
export default function ExamplePage({ data }) {
  return <PageShell>
    <section className="chapter has-bg" aria-labelledby="ex-h"><SectionBg />
      <div className="section-shell">
        <div className="sec-head"><Kicker>EXAMPLE</Kicker><Title id="ex-h" lead="A page on the shared kit." dim="Header, footer and theme come free." /><Lede>{`Lifetime is $${data.pricing.lifetime}.`}</Lede></div>
        <SceneCard><Shot name="day" alt="Off Grid AI Day view." /></SceneCard>
      </div>
    </section>
  </PageShell>;
}
