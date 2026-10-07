import React from 'react';
import { Hub } from './_hub.jsx';

// /writing/ — the Perspectives essays, with search, topic and device filters.
export default function WritingPage({ data }) {
  return <Hub hub={data.hub} kicker="PERSPECTIVES" lead="Perspectives." dim="Ideas for personal AI."
    lede="Your hardware, your context, your control." placement="writing" noun="pages" defaultTitle="Perspectives"
    searchLabel="Search Perspectives" placeholder="Search: privacy, memory..." sortDefault="Default"
    outro={<p className="hub-outro">Mohammed Ali Chherawalla is the creator of Off Grid AI. New essays go to <a href="https://dev.to/alichherawalla">dev.to/alichherawalla</a> first.</p>} />;
}
