// The Ethos hub lists every page whose front matter has `parent: Ethos`, like the
// Liquid include it replaces (site.pages | where: "parent", "Ethos" | sort: "title").
import { readFile, readdir } from 'node:fs/promises';
import { parse } from 'yaml';

export default async function () {
  const sections = parse(await readFile('_data/article_sections.yml', 'utf8')).map(s => s.name);
  const pages = [];
  for (const file of (await readdir('.')).filter(f => f.endsWith('.md'))) {
    const match = (await readFile(file, 'utf8')).match(/^---\n([\s\S]*?)\n---/);
    if (!match) continue;
    const fm = parse(match[1]);
    if (fm.parent !== 'Ethos') continue;
    pages.push({
      url: fm.permalink || `/${file.replace(/\.md$/, '')}/`,
      title: String(fm.title),
      headline: fm.headline || '',
      description: fm.description || '',
      topic: fm.article_topic || '',
      platform: fm.article_platform || 'Any device',
      date: fm.published_at ? String(fm.published_at) : '',
    });
  }
  pages.sort((a, b) => (a.title < b.title ? -1 : a.title > b.title ? 1 : 0));
  return { hub: { pages, sections } };
}
