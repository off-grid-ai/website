#!/usr/bin/env python3
"""Import published Off Grid AI DEV.to articles from the sibling desktop checkout.

Run from the website repository: python3 scripts/import_devto.py
The DEV.to credential stays in desktop/marketing/devto/stats_devto.py.
"""

import json
import re
import sys
import unicodedata
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT.parent / "desktop/marketing/devto"
ARTICLES = ROOT / "articles"
PATTERN = re.compile(r"off[ -]?grid|\bOGAM\b|\bOGAD\b", re.I)
FRONTMATTER = re.compile(r"\A---\s*\n.*?\n---\s*\n", re.S)


def yaml_string(value):
    return json.dumps(value or "", ensure_ascii=False)


def slugify(value):
    ascii_text = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", ascii_text.lower()).strip("-")[:100]


def site_titles():
    titles = {}
    for directory in (ROOT / "guides", ROOT / "writing"):
        for path in directory.glob("*.md"):
            match = re.search(r'^title:\s*["\']?(.*?)["\']?\s*$', path.read_text(), re.M)
            if match:
                titles[match.group(1).strip('"\' ').casefold()] = path
    return titles


def category(title):
    lower = title.lower()
    if re.search(r"android|iphone|phone|mobile|ios", lower):
        return "Mobile"
    if re.search(r"\bmac\b|windows|desktop|computer|laptop|pc\b", lower):
        return "Desktop"
    return "Workflows"


def main():
    if not SOURCE.exists():
        raise SystemExit(f"Missing sibling DEV.to source: {SOURCE}")
    sys.path.insert(0, str(SOURCE))
    from stats_devto import fetch_all

    published = fetch_all()
    selected = [article for article in published if PATTERN.search(article["title"])
                or PATTERN.search(article.get("body_markdown") or "")]
    if len(selected) < 300:
        raise SystemExit(f"Only {len(selected)} matching articles returned; import stopped")

    ARTICLES.mkdir(exist_ok=True)
    existing = site_titles()
    by_id = {}
    for path in ARTICLES.glob("*.md"):
        match = re.search(r"^devto_id:\s*(\d+)$", path.read_text(), re.M)
        if match:
            by_id[int(match.group(1))] = path
    claimed = {path.stem for path in ARTICLES.glob("*.md")}
    imported = []
    already_on_site = []

    for article in selected:
        title = article["title"].strip()
        match = existing.get(title.casefold())
        if match:
            already_on_site.append({"id": article["id"], "url": f"https://getoffgridai.co/{match.parent.name}/{match.stem}/"})
            continue
        body = FRONTMATTER.sub("", article.get("body_markdown") or "", count=1).strip()
        if not body:
            raise SystemExit(f"Missing body for DEV.to article {article['id']}")
        if "{{" in body or "{%" in body:
            raise SystemExit(f"Liquid syntax needs review in DEV.to article {article['id']}")

        path = by_id.get(article["id"])
        if path is None:
            slug = slugify(title)
            if slug in claimed:
                slug = f"{slug[:90]}-{article['id']}"
            path = ARTICLES / f"{slug}.md"
            claimed.add(slug)
        url = f"https://getoffgridai.co/articles/{path.stem}/"
        date = (article.get("published_at") or "")[:10]
        cover = article.get("cover_image") or ""
        header = [
            "---",
            "layout: default",
            f"title: {yaml_string(title)}",
            f"description: {yaml_string(article.get('description'))}",
            f"date: {yaml_string(date)}",
            f"permalink: /articles/{path.stem}/",
            f"article_category: {yaml_string(category(title))}",
            "devto_article: true",
            f"devto_id: {article['id']}",
            f"devto_url: {yaml_string(article['url'])}",
        ]
        if cover:
            header.append(f"image: {yaml_string(cover)}")
        header += ["---", ""]
        path.write_text("\n".join(header) + body + "\n", encoding="utf-8")
        imported.append({"id": article["id"], "url": url, "devto_url": article["url"]})

    manifest = {"imported": imported, "already_on_site": already_on_site}
    (ROOT / "_data/devto-import.json").write_text(json.dumps(manifest, indent=2) + "\n")
    print(f"Fetched {len(published)} published DEV.to posts; selected {len(selected)} Off Grid AI posts")
    print(f"Imported {len(imported)} articles; {len(already_on_site)} already have site pages")


if __name__ == "__main__":
    main()
