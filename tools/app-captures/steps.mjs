import * as S from './seed.mjs'
import { makeJourney, STATIC } from './journey.mjs'
const VIEWS = ['day','reflect','replay','reflect','actions','meetings','entities','search','clipboard','god','projects']
import fs from 'node:fs'
import path from 'node:path'
const CMD = new URL('./cmd/', import.meta.url).pathname
export default {
  // Keep the app open and run JS bodies dropped into cmd/<n>.js (ctx in scope); results in cmd/<n>.out.
  async serve(ctx) {
    const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor
    for (;;) {
      const jobs = fs.readdirSync(CMD).filter((f) => f.endsWith('.js') && !fs.existsSync(path.join(CMD, f.replace(/\.js$/, '.out'))))
      for (const f of jobs.sort()) {
        const code = fs.readFileSync(path.join(CMD, f), 'utf8')
        if (code.trim() === 'QUIT') { fs.writeFileSync(path.join(CMD, f.replace(/\.js$/, '.out')), 'bye'); return }
        let out
        try { out = await new AsyncFunction('ctx', 'S', ...Object.keys(ctx), code)(ctx, S, ...Object.values(ctx)); out = typeof out === 'string' ? out : JSON.stringify(out, null, 1) }
        catch (e) { out = 'ERROR ' + String(e?.stack ?? e).slice(0, 1500) }
        fs.writeFileSync(path.join(CMD, f.replace(/\.js$/, '.out')), String(out ?? 'ok'))
      }
      await ctx.pause(400)
    }
  },
  async seed(ctx) {
    const { page, pause } = ctx
    await page.evaluate(() => localStorage.setItem('sidebar_pinned', 'true'))
    // Never touch the real pasteboard or the LAN.
    await page.evaluate(async () => {
      await window.api.proInvoke('clipboard:set-settings', { captureEnabled: false })
      await window.api.proInvoke('pro:sync:set-discoverable', false)
      await window.api.proInvoke('pro:sync:set-browsing', false)
    })
    const now = await page.evaluate(() => Date.now())
    S.seedEntities(ctx)
    S.seedDay(ctx, now)
    S.seedMeetings(ctx, now)
    S.seedPeople(ctx)
    S.seedApprovals(ctx, now)
    S.seedTodos(ctx, now)
    S.seedClipboard(ctx, now)
    S.seedDevices(ctx, now)
    S.seedAiLogs(ctx, now)
    // The seed renders its demo images on the local GPU after launch; wait for one before seeding chats.
    for (let i = 0; i < 90; i++) {
      const dir = path.join(ctx.profileDir, 'generated-images')
      const big = fs.existsSync(dir) && fs.readdirSync(dir).some((f) => f.endsWith('.png') && fs.statSync(path.join(dir, f)).size > 100_000)
      if (big) break
      await pause(2000)
    }
    S.seedChats(ctx, now)
    S.seedGod(ctx, now)
    S.seedWebTasks(ctx, now)
    await page.reload(); await page.waitForLoadState('domcontentloaded'); await ctx.settle()
    await S.seedJournals(ctx)
    await S.stageDevices(ctx, now)
    await page.evaluate((d) => window.api.proInvoke('secretary:prefs:set', d), S.LEARNED)
    await S.seedVault(ctx)
    await page.reload(); await page.waitForLoadState('domcontentloaded'); await ctx.settle()
  },
  async journey(ctx) {
    const M = await import('./journey.mjs?t=' + Date.now())
    const J = M.makeJourney(ctx)
    const groups = { ...M.STATIC, ...M.STATIC2 }
    for (const g of (process.env.WS_GROUPS ?? Object.keys(groups).join(',')).split(',')) {
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          let timer
          await Promise.race([groups[g](ctx, J), new Promise((_, rej) => { timer = setTimeout(() => rej(new Error('group timed out (page closed)')), 360_000) })])
          clearTimeout(timer); console.log('GROUP', g, 'ok'); break
        }
        catch (e) {
          console.log('GROUP', g, 'FAILED', String(e).slice(0, 400))
          if (/closed/.test(String(e)) && attempt === 0) { await ctx.recover(); continue }
          await ctx.page.screenshot({ path: ctx.OUT + '/../dbg/fail-' + g + '.png', scale: 'css' }).catch(() => {}); break
        }
      }
    }
  },
  async static(ctx) {
    const J = makeJourney(ctx)
    for (const [k, fn] of Object.entries(STATIC)) {
      if (process.env.WS_GROUPS && !process.env.WS_GROUPS.split(',').includes(k)) continue
      try { await fn(ctx, J) } catch (e) { console.log('GROUP', k, 'FAILED', String(e).slice(0, 300)); await ctx.page.screenshot({ path: ctx.OUT + '/../dbg/fail-' + k + '.png', scale: 'css' }).catch(() => {}) }
    }
  },
  async look({ nav, shot, setTheme }) {
    await setTheme('Dark')
    for (const v of VIEWS) { await nav(v); await shot(`look-${v}`) }
  }
}
