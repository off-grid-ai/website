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
EXCLUDE_IDS = {3334610, 3334575, 3333721}  # startup advice with incidental product mentions


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


TOPICS = (
    ("Sync & sharing", r"sync|transfer|share|clipboard|between devices|from your (?:phone|computer)|home network|remote server|tailscale|copy text|paste it|control your mac from"),
    ("Voice & audio", r"transcrib|speech|voice|dictat|audio|record|listen|speak|narrat|podcast|talk to ai"),
    ("Images & vision", r"image|photo|picture|screenshot|comic|visual|vision|camera|mood board|diffusion|sdxl|illustrat|svg|graphic|flowchart"),
    ("Privacy & control", r"privacy|private|vault|password|encrypt|without being tracked|where does your data|what does off grid ai record|backup|licen[cs]e|requires pro"),
    ("Documents & research", r"document|pdf|paper|research|knowledge base|webpage|article|manual|application form|pitch deck|files? locally"),
    ("Writing & learning", r"writ|draft|blog|newsletter|exam|study|course|lecture|translation|cover letter|\bcv\b|promotion case|spoken ideas"),
    ("Automation & tools", r"automat|tool calling|mcp|code sandbox|browser task|connector|api|prototype|html app|react app|node\.js|python|calculator app"),
    ("Work & organization", r"meeting|task|project|client|work|calendar|email|agenda|proposal|checklist|interview|contractor|to-do|journal|notes|decision"),
    ("Models & performance", r"model|gpu|ram|speed|performance|memory|llm|gemma|qwen|hardware|ollama|lm studio|local ai server|decoding|replies"),
    ("Everyday tasks", r"flight|travel|nearby places|product prices|spotify|rental agreement|home inventory"),
)


def topic(title):
    lower = title.lower()
    for name, pattern in TOPICS:
        if re.search(pattern, lower):
            return name
    return "Getting started"


def platform(title):
    lower = title.lower()
    found = [name for name, pattern in (
        ("Android", r"android"), ("iPhone", r"iphone|\bios\b"),
        ("Mac", r"\bmac\b|macos"), ("Windows", r"windows"),
        ("Linux", r"linux"),
    ) if re.search(pattern, lower)]
    if len(found) > 1:
        return "Across devices"
    if found:
        return found[0]
    if re.search(r"phone|mobile", lower):
        return "Phone"
    if re.search(r"computer|desktop|laptop|\bpc\b", lower):
        return "Computer"
    return "Any device"


def main():
    if not SOURCE.exists():
        raise SystemExit(f"Missing sibling DEV.to source: {SOURCE}")
    sys.path.insert(0, str(SOURCE))
    from stats_devto import fetch_all

    published = list({article["id"]: article for article in fetch_all()}.values())
    selected = [article for article in published if article["id"] not in EXCLUDE_IDS
                and (PATTERN.search(article["title"])
                     or PATTERN.search(article.get("body_markdown") or ""))]
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
        published_at = article.get("published_at") or ""
        date = published_at[:10]
        cover = article.get("cover_image") or ""
        header = [
            "---",
            "layout: default",
            f"title: {yaml_string(title)}",
            f"description: {yaml_string(article.get('description'))}",
            f"date: {yaml_string(date)}",
            f"permalink: /articles/{path.stem}/",
            f"published_at: {yaml_string(published_at)}",
            f"article_topic: {yaml_string(topic(title))}",
            f"article_platform: {yaml_string(platform(title))}",
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
    expected = {article["id"]: ARTICLES / (article["url"].rstrip("/").split("/")[-1] + ".md")
                for article in imported}
    for path in ARTICLES.glob("*.md"):
        match = re.search(r"^devto_id:\s*(\d+)$", path.read_text(), re.M)
        if match and int(match.group(1)) in expected and path != expected[int(match.group(1))]:
            path.unlink()
    (ROOT / "_data/devto-import.json").write_text(json.dumps(manifest, indent=2) + "\n")
    print(f"Fetched {len(published)} published DEV.to posts; selected {len(selected)} Off Grid AI posts")
    print(f"Imported {len(imported)} articles; {len(already_on_site)} already have site pages")


if __name__ == "__main__":
    main()
