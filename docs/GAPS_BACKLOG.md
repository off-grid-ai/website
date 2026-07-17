# Website gaps backlog

Open gaps, surfaced honestly. Close with evidence, then mark resolved.

## Open

_None._

## Resolved

- **Visual browser QA was incomplete for the four-platform rollout** (2026-07-17). Rendered and inspected `/`, `/download/`, `/desktop/`, `/desktop/releases/`, `/mobile/`, and `/mobile/releases/` at 1440x1000 and 390x844 after the final production build. Platform labels, release states, download controls, headings, and requirements are readable and unclipped at both widths, with no horizontal overflow in the changed journey.

- **Platform availability was not represented consistently across the main customer journey** (2026-07-17). Home, Download, Desktop, Desktop Releases, Mobile, Mobile Releases, analytics metadata, site metadata, and `llms.txt` now present iOS, Android, macOS, and Windows. The copy distinguishes macOS stable/nightly from Windows x64 nightly-only and states that Windows has no stable build yet. Verified with a production Jekyll build, Pagefind indexing, rendered assertions for six routes plus `llms.txt`, and GitHub release APIs: macOS stable `v0.0.38`, Windows pre-release `v0.0.39-beta.66`, and both permanent nightly assets exist and redirect.

- **Mobile minimum-version copy conflicted across download, product, and guide pages** (2026-07-17). Standardized the published requirements to iOS 17+ and Android 10+ across the affected customer journey. Verified iOS 0.0.103 and minimum iOS 17.0 through Apple's lookup API, then rebuilt the production site and asserted the rendered routes.

- **Landing page had no product screenshots** (2026-07-06). Pulled real app shots from `desktop/docs/screenshots/`, resized to 1760px wide and (for the Pro shots) top-cropped to trim empty background. Wired 5 into `desktop.md` via `.hero-cover`: chat (hero), artifacts (free studio), and Day / Reflect / Entities (Pro section, each captioned). Verified rendered and copied into `_site/assets/img/` by screenshot.

- **Download / Star buttons fired no named analytics events** (2026-07-06). Only mobile app-store links were tracked (`docs_download_click`). Added `desktop_download_click` (with `build: stable|nightly`) and `github_star_click` to the outbound-click handler in `_layouts/default.html`. Verified present in the built `_site/desktop/index.html`.
</content>
