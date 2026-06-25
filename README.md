# Off Grid Website

Marketing site and documentation for [Off Grid](https://getoffgridai.co) — run powerful
AI models directly on your iPhone or Android phone, no internet required.

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

- `index.md`, `mission.md`, `vision.md`, `ethos.md`, `early-access.md`, `quick-start.md` — top-level pages
- `guides/` — setup and how-to guides
- `writing/` — long-form articles
- `_layouts/` — page templates
- `assets/` — CSS, images, icons
- `CNAME` — custom domain (`getoffgridai.co`)

## Deployment

Every push to `main` triggers the GitHub Actions workflow, which builds the Jekyll site,
indexes it with Pagefind, and publishes to GitHub Pages. DNS for the domain is managed in
Cloudflare; the apex `getoffgridai.co` points at GitHub Pages. The former domain
`offgridmobileai.co` 301-redirects to `getoffgridai.co` (Cloudflare redirect rule).
