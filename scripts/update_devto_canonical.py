#!/usr/bin/env python3
"""Point imported DEV.to articles at their matching Off Grid AI website URLs."""

import json
import sys
import time
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT.parent / "desktop/marketing/devto"
sys.path.insert(0, str(SOURCE))
from stats_devto import _request, fetch_all  # noqa: E402


def main():
    manifest = json.loads((ROOT / "_data/devto-import.json").read_text())
    targets = {item["id"]: item["url"] for group in manifest.values() for item in group}
    current = {item["id"]: item for item in fetch_all()}
    missing = sorted(set(targets) - set(current))
    if missing:
        current.update({item["id"]: item for item in fetch_all()})
        missing = sorted(set(targets) - set(current))
    if missing:
        raise SystemExit(f"DEV.to did not return {len(missing)} target IDs; stopped before updating")

    changed = 0
    failed = []
    for index, (article_id, url) in enumerate(targets.items(), 1):
        if current[article_id].get("canonical_url") == url:
            continue
        body = json.dumps({"article": {"canonical_url": url}}).encode()
        result = _request(f"https://dev.to/api/articles/{article_id}", data=body, method="PUT")
        if not result or result.get("canonical_url") != url:
            failed.append(article_id)
        else:
            changed += 1
        if index % 25 == 0 or index == len(targets):
            print(f"{index}/{len(targets)} checked; {changed} updated; {len(failed)} failed", flush=True)
        time.sleep(1.1)
    print(f"Done: {changed} updated; {len(failed)} failed", flush=True)
    if failed:
        print("Failed IDs:", failed, flush=True)
        raise SystemExit(1)


if __name__ == "__main__":
    main()
