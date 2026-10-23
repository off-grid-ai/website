# App captures for the website

Rebuilds every desktop app screenshot on the site (`assets/img/home/app/*`) from one seeded launch of the
desktop app: one Thursday for Alex and the cast (Acme Corp pilot, Sam, Priya, Tom, Maya, Daniel), dark and light.

## Run

```bash
cd tools/app-captures
ln -sfn ../../../desktop/node_modules node_modules   # once
(cd ../../../desktop && npx electron-vite build)
WS_ONLY=seed,journey npx playwright test -c playwright.config.ts
./encode.sh out ../../assets/img/home/app            # writes full, 1760, 960, 640, 160 webp
```

Then bump `SHOT_V` in `preview-ui/page.jsx` and run `npm run build:preview`.

- `WS_GROUPS=god,web` runs only some groups (see `journey.mjs`); `WS_ONLY=seed,serve` keeps the app open
  for `./run.sh '<js>'` / `./rungroups.sh g1,g2` while you fix a step.
- `./sheet.sh name out/*-dark.png` makes a contact sheet in `dbg/` to review.

## Safety rails (keep them)

- Clipboard capture and LAN discovery start off (pre-seeded before launch); never record the real pasteboard
  or pair with real devices.
- Global hotkeys are released at launch, so the test app never takes the person's shortcuts.
- Devices are staged in the main process: the license's real seat registry is never shown.
- Screen capture stays paused. No remote models: everything runs on seeded data or local models.
