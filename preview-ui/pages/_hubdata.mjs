// Shared data for the three learning hubs (/guides/, /articles/, /writing/). Mirrors the
// selections _includes/article-hub.html made in Liquid, from the same front matter.
import { readFile, readdir } from 'node:fs/promises';
import { parse } from 'yaml';

async function frontMatter(dir) {
  const out = [];
  for (const name of (await readdir(dir)).filter(f => f.endsWith('.md') && f !== 'index.md').sort()) {
    const src = await readFile(`${dir}/${name}`, 'utf8');
    const m = src.match(/^---\n([\s\S]*?)\n---/);
    if (!m) continue;
    const fm = parse(m[1]) || {};
    if (fm.published === false) continue;
    const words = src.slice(m[0].length).replace(/<[^>]+>|\{[%{][^}]*[%}]\}|[#*_>`|\[\]()-]/g, ' ').split(/\s+/).filter(Boolean).length;
    out.push({ ...fm, minutes: Math.max(1, Math.round(words / 220)), url: fm.permalink || `/${dir}/${name.replace(/\.md$/, '')}/` });
  }
  return out;
}

const entry = (p, topic) => ({
  url: p.url, title: String(p.title || ''), description: String(p.description || ''),
  topic: topic ?? (p.article_topic || ''), keywords: p.article_topic || '',
  platform: p.article_platform || 'Any device', minutes: p.minutes, date: p.published_at ? String(p.published_at) : '',
});
const newestFirst = (a, b) => (b.date || '').localeCompare(a.date || '');

// kind: 'guides' (devto articles + Guides), 'articles' (devto articles), 'section' (one parent)
export async function hubData(kind, section) {
  const sections = parse(await readFile('_data/article_sections.yml', 'utf8'));
  const pages = [...await frontMatter('articles'), ...await frontMatter('guides'), ...await frontMatter('writing')];
  let items;
  if (kind === 'guides') items = pages.filter(p => p.devto_article === true || p.parent === 'Guides').map(p => entry(p)).sort(newestFirst);
  else if (kind === 'articles') items = pages.filter(p => p.devto_article === true).map(p => entry(p)).sort(newestFirst);
  else items = pages.filter(p => p.parent === section).sort((a, b) => String(a.title).localeCompare(String(b.title))).map(p => entry(p));
  const topics = sections.map(s => ({ name: s.name, description: s.description, count: items.filter(i => i.topic === s.name).length }))
    .filter(t => kind !== 'section' || t.count > 0);
  const platforms = kind === 'section'
    ? [...new Set(items.map(i => i.platform))].sort()
    : ['Android', 'iPhone', 'Mac', 'Windows', 'Linux', 'Phone', 'Computer', 'Across devices', 'Any device'];
  return { hub: { kind, items, topics, platforms } };
}
