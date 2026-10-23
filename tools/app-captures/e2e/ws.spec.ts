import { expect, test, type ElectronApplication, type Page } from '@playwright/test'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { completeOnboarding } from '/Users/user/wednesday/off-grid-ai/desktop/e2e/helpers/onboarding'
import { launchOffGrid } from '/Users/user/wednesday/off-grid-ai/desktop/e2e/helpers/launch'

// Website screenshot harness: see README.md.
const WS = path.resolve(__dirname, '..')
const OUT = path.join(WS, process.env.WS_OUT ?? 'out')
const W = 1512
const H = 977
let app: ElectronApplication
let page: Page
let profileDir = ''
test.describe.configure({ timeout: 3_600_000 })
const SQLITE = '/opt/homebrew/opt/sqlite/bin/sqlite3'
const sqlite = (sql: string, json = false): string =>
  execFileSync(SQLITE, ['-cmd', '.timeout 8000', ...(json ? ['-json'] : []), path.join(profileDir, 'memories.db'), sql], { maxBuffer: 64 << 20 }).toString()
const pause = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms))

async function setTheme(theme: 'Dark' | 'Light'): Promise<void> {
  for (let i = 0; i < 4; i += 1) {
    if (await page.getByRole('button', { name: `Theme: ${theme}` }).count()) return
    // A DOM click, not a pointer click: open drawers and sheets dismiss on pointerdown outside.
    await page.getByRole('button', { name: /^Theme: / }).first().evaluate((b) => (b as HTMLElement).click())
    await pause(400)
  }
}
async function sizeWindow(): Promise<void> {
  for (let i = 0; i < 10; i += 1) {
    await app.evaluate(({ BrowserWindow }, s) => {
      const win = BrowserWindow.getAllWindows().sort((a, b) => b.getBounds().width - a.getBounds().width)[0]
      win?.setContentSize(s.w, s.h)
    }, { w: W, h: H })
    await pause(300)
    const d = await page.evaluate(() => [innerWidth, innerHeight])
    if (d[0] === W && d[1] === H) return
  }
}
async function shot(name: string): Promise<void> {
  await sizeWindow()
  await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur())
  await page.mouse.move(W - 4, H - 4)
  await pause(900)
  await page.screenshot({ path: path.join(OUT, `${name}.png`) })
  console.log('SHOT', name)
}
async function both(name: string, before?: () => Promise<void>): Promise<void> {
  for (const t of ['Dark', 'Light'] as const) {
    await setTheme(t)
    if (before) await before()
    await shot(`${name}-${t.toLowerCase()}`)
  }
}
async function dismissPrompts(): Promise<void> {
  // One-off prompts (history tidy-up) sit over the view; close them the way a user would.
  const notNow = page.getByRole('button', { name: 'Not now', exact: true })
  if (await notNow.isVisible().catch(() => false)) await notNow.click().catch(() => undefined)
}
const viewText = (): Promise<string> =>
  page.evaluate(() => [...document.querySelectorAll('h1, h2, h3, button, td, li, p')].map((e) => (e as HTMLElement).innerText).join('\n'))
async function settle(prev = ''): Promise<void> {
  // Wait (up to 30s) for the view to change, then for it to hold still for 1.5s.
  let last = '', stable = 0
  for (let i = 0; i < 120 && stable < 5; i += 1) {
    await pause(300)
    await dismissPrompts()
    const t = await viewText()
    if (prev && t === prev && i < 100) continue
    stable = t === last ? stable + 1 : 0
    last = t
  }
}
const TITLES: Record<string, RegExp> = {
  dashboard: /^Today$/, day: /^Today$/, replay: /^Replay$/, reflect: /^Reflect$/, actions: /^Actions$/, meetings: /^Meetings$/,
  entities: /^(People|Entities)$/, search: /^Search$/, clipboard: /^Clipboard$/, god: /^God$/, projects: /^Projects$/,
  models: /^Models$/, gateway: /^Gateway$/, settings: /^Settings$/, connectors: /^Integrations$/, vault: /Vault/, devices: /^Devices$/,
  voice: /^Voice/, tasks: /^Tasks$/, notifications: /^Notifications$/
}
async function recover(): Promise<void> {
  // The renderer can go away mid-run; reload the window and re-attach to its new page.
  await app.evaluate(({ BrowserWindow }) => BrowserWindow.getAllWindows()[0]?.webContents.reload())
  for (let i = 0; i < 60; i += 1) {
    const live = app.windows().find((w) => !w.isClosed())
    if (live) { page = live; break }
    await pause(500)
  }
  await page.waitForLoadState('domcontentloaded')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await settle()
}
async function nav(view: string | Record<string, unknown>, expectText?: string | RegExp): Promise<void> {
  const key = typeof view === 'string' ? view : String(view.view)
  await page.evaluate((v) => window.dispatchEvent(new CustomEvent('og:navigate', { detail: v })), view)
  const want = expectText ?? TITLES[key]
  if (want) {
    const loc = page.getByText(want).first()
    for (let i = 0; i < 200; i += 1) {
      await dismissPrompts()
      if (await loc.isVisible().catch(() => false)) break
      await pause(300)
    }
  }
  await settle()
}

test.beforeAll(async () => {
  profileDir = fs.mkdtempSync(path.join(os.tmpdir(), 'offgrid-ws-'))
  // An existing (empty) DB file keeps the app from creating an encrypted one, so sqlite3 can seed it.
  // Clipboard capture starts OFF: the profile must never record the real pasteboard.
  execFileSync(SQLITE, [path.join(profileDir, 'memories.db'), `CREATE TABLE app_settings (key TEXT PRIMARY KEY, value TEXT NOT NULL, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP);
    CREATE TABLE sync_meta (key TEXT PRIMARY KEY, value TEXT NOT NULL);
    INSERT INTO sync_meta (key, value) VALUES ('sync.discoverable', 'false'), ('sync.browsing', 'false'), ('sync.port', '47878');
    INSERT INTO app_settings (key, value) VALUES ('clipboard:settings', '{"captureEnabled":false,"maxItems":1000,"retentionDays":0,"captureImages":true}');`])
  fs.symlinkSync(path.join(os.homedir(), 'Library/Application Support/Off Grid AI Desktop/models'), path.join(profileDir, 'models'))
  app = await launchOffGrid({
    cwd: '/Users/user/wednesday/off-grid-ai/desktop', appEntry: '/Users/user/wednesday/off-grid-ai/desktop',
    extraArgs: ['--force-device-scale-factor=2'],
    env: {
      OFFGRID_USER_DATA: profileDir,
      OFFGRID_PRO: '1',
      OFFGRID_SEED: 'force',
      OFFGRID_SEED_PRO: 'force',
      OFFGRID_E2E_HEADLESS: '1',
      OFFGRID_E2E_ISOLATED_INSTANCE: '1'
    }
  })
  page = await app.firstWindow()
  // The harness app must never take the person's global hotkeys (clipboard popup, dictation).
  const freeHotkeys = (): Promise<unknown> => app.evaluate(({ globalShortcut }) => { globalShortcut.unregisterAll(); return 1 }).catch(() => undefined)
  await freeHotkeys()
  const hotkeyTimer = setInterval(() => void freeHotkeys(), 2000)
  hotkeyTimer.unref?.()
  const log = fs.createWriteStream(path.join(WS, 'dbg', 'main.log'))
  app.process().stdout?.on('data', (d) => log.write(d))
  app.process().stderr?.on('data', (d) => log.write(d))
  await app.evaluate(({ app: a }) => {
    a.on('render-process-gone', (_e, _wc, d) => console.log('[ws] render-process-gone ' + JSON.stringify(d)))
    a.on('child-process-gone', (_e, d) => console.log('[ws] child-process-gone ' + JSON.stringify(d)))
    return 1
  }).catch(() => undefined)
  page.on('console', (m) => { if (m.type() === 'error') log.write('[renderer] ' + m.text() + '\n') })
  await page.waitForLoadState('domcontentloaded')
  await completeOnboarding(page)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  // Shift the clock (main + renderer) so "now" is a weekday afternoon after the cast's day.
  const [hh, mm] = (process.env.WS_CLOCK ?? '16:40').split(':').map(Number)
  const t = new Date(); t.setDate(t.getDate() + Number(process.env.WS_DAY ?? -1)); t.setHours(hh!, mm!, 0, 0)
  const off = t.getTime() - Date.now()
  await app.evaluate((_e, o) => {
    const Real = Date
    class Shifted extends Real {
      constructor(...a: unknown[]) { if (a.length) super(...(a as [number])); else super(Real.now() + o) }
      static now(): number { return Real.now() + o }
    }
    ;(globalThis as { Date: DateConstructor }).Date = Shifted as unknown as DateConstructor
  }, off)
  // Renderer: shift Date only (timers and animation clocks stay real), now and after every reload.
  const shiftDate = (o: number): void => {
    const Real = Date
    if ((Real as unknown as { __ws?: boolean }).__ws) return
    class Shifted extends Real {
      constructor(...a: unknown[]) { if (a.length) super(...(a as [number])); else super(Real.now() + o) }
      static now(): number { return Real.now() + o }
    }
    ;(Shifted as unknown as { __ws: boolean }).__ws = true
    ;(globalThis as { Date: DateConstructor }).Date = Shifted as unknown as DateConstructor
  }
  await app.context().addInitScript(shiftDate, off)
  await page.evaluate(shiftDate, off)
  await page.reload(); await page.waitForLoadState('domcontentloaded')
  await pause(8000)
})
test.afterAll(async () => {
  await app?.close().catch(() => undefined)
  console.log('PROFILE', profileDir)
})
test('website screenshots', async () => {
  const steps = (await import(path.join(WS, 'steps.mjs'))).default
  const only = (process.env.WS_ONLY ?? 'probe').split(',')
  for (const name of only) {
    try {
      await steps[name]({ recover, get page() { return page }, dismissPrompts, settle, sqlite, app, nav, both, shot, pause, setTheme, expect, profileDir, OUT, sizeWindow })
    } catch (e) {
      console.log('STEP', name, 'FAILED', String(e).slice(0, 600))
      await page.screenshot({ path: path.join(WS, 'dbg', `fail-${name}.png`) }).catch(() => undefined)
    }
  }
})
