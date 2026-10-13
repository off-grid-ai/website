# Off Grid AI Website

Marketing site and documentation for [Off Grid AI](https://getoffgridai.co) - your personal AI
assistant, built to run on hardware you already own. Start with local models; add Pro for
context, memory, and actions you approve. Off Grid AI is available on:

- **iOS** - stable 0.0.111 on the App Store (iOS 17+)
- **Android** - stable on Google Play (Android 10+), plus preview APK 0.0.114-beta.1 on GitHub
- **macOS** - stable 0.0.54 for Apple Silicon, plus beta 0.0.55-beta.122
- **Windows** - stable 0.0.54 for x64, plus beta 0.0.55-beta.122
- **Linux** - stable 0.0.54 for x64 (AppImage and deb), plus beta 0.0.55-beta.122 packages

Built with [Jekyll](https://jekyllrb.com/) and deployed to **https://getoffgridai.co**
via GitHub Pages (see `.github/workflows/pages.yml`). Search is powered by
[Pagefind](https://pagefind.app/).

## Local development

```bash
bundle install
bundle exec jekyll serve
```

The site is then available at http://localhost:4000.

## Structure

- `index.md`, `download.md`, `mobile.md`, `desktop.md` - product discovery and downloads
- `mobile-releases.md`, `desktop-releases.md` - platform release status and notes
- `mission.md`, `vision.md`, `ethos.md`, `early-access.md`, `quick-start.md` - top-level pages
- `guides/` - setup and how-to guides
- `writing/` - long-form articles
- `llms.txt` - machine-readable product and platform summary
- `_layouts/` - page templates
- `assets/` - CSS, images, icons
- `CNAME` - custom domain (`getoffgridai.co`)

## Deployment

Every push to `main` triggers the GitHub Actions workflow, which builds the Jekyll site,
indexes it with Pagefind, and publishes to GitHub Pages. DNS for the domain is managed in
Cloudflare; the apex `getoffgridai.co` points at GitHub Pages through the Cloudflare proxy.
The apex and `www` web records are proxied. The existing Full SSL mode remains active.
The “Long browser cache for versioned website assets” cache rule matches only
`/assets/preview/` and `/assets/img/home/` URLs with a `v=` query parameter on these
hostnames. Its edge TTL is 30 days and browser TTL is one year. Keep the complete
query string in the cache key. Change the version when changing an asset; preview
bundle versions are generated from content by `npm run build:preview`, and screenshot
versions use `SHOT_V` in `preview-ui/page.jsx`. HTML and unversioned files retain their
normal cache policy. To undo this cache change, disable that rule and turn off the
proxy on the apex and `www` web records. The former domain
`offgridmobileai.co` 301-redirects to `getoffgridai.co` (Cloudflare redirect rule).
