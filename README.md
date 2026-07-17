# Off Grid Website

Marketing site and documentation for [Off Grid](https://getoffgridai.co) - private AI
that runs on hardware you own, with no cloud or account. Off Grid is available on:

- **iOS** - stable 0.0.103 on the App Store (iOS 17+)
- **Android** - stable on Google Play (Android 10+)
- **macOS** - stable 0.0.38 for Apple Silicon, plus a nightly track
- **Windows** - x64 nightly 0.0.39-beta.66; pre-release, with no stable build yet

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
Cloudflare; the apex `getoffgridai.co` points at GitHub Pages. The former domain
`offgridmobileai.co` 301-redirects to `getoffgridai.co` (Cloudflare redirect rule).
