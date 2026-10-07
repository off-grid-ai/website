import React from 'react';
import { Hub } from './_hub.jsx';

// /articles/ — every article, with search, topic and device filters.
export default function ArticlesPage({ data }) {
  return <Hub hub={data.hub} kicker="ARTICLES" lead="Articles." dim="Find your task."
    lede="Choose a topic or search for the task you want to do." placement="articles" noun="guides" defaultTitle="Latest articles"
    searchLabel="Search articles" placeholder="Search: PDF, voice, sync..." />;
}
