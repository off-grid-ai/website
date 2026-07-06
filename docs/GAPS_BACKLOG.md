# Website gaps backlog

Open gaps, surfaced honestly. Close with evidence, then mark resolved.

## Open

_None._

## Resolved

- **Landing page had no product screenshots** (2026-07-06). Pulled real app shots from `desktop/docs/screenshots/`, resized to 1760px wide and (for the Pro shots) top-cropped to trim empty background. Wired 5 into `desktop.md` via `.hero-cover`: chat (hero), artifacts (free studio), and Day / Reflect / Entities (Pro section, each captioned). Verified rendered and copied into `_site/assets/img/` by screenshot.

- **Download / Star buttons fired no named analytics events** (2026-07-06). Only mobile app-store links were tracked (`docs_download_click`). Added `desktop_download_click` (with `build: stable|nightly`) and `github_star_click` to the outbound-click handler in `_layouts/default.html`. Verified present in the built `_site/desktop/index.html`.
</content>
