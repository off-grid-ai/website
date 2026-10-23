// The website capture journey: one launch, every screen in dark then light.
export function makeJourney(ctx) {
  const { page, nav, settle, both, pause } = ctx
  const click = async (text, o = {}) => {
    const loc = o.role ? page.getByRole(o.role, { name: text, exact: o.exact ?? false }) : page.locator(o.sel ?? 'button', { hasText: text })
    await loc.first().click({ force: true, timeout: 8000 }); await settle()
  }
  const clickText = async (text, exact = true) => { await page.getByText(text, { exact }).first().click({ force: true, timeout: 8000 }); await settle() }
  const scrollTo = async (text) => { await page.getByText(text, { exact: false }).first().scrollIntoViewIfNeeded().catch(() => {}); await settle() }
  const type = async (sel, text) => { const l = page.locator(sel).first(); await l.click({ force: true }); await l.fill(text); await settle() }
  const shotState = async (name, go) => { await go(); await both(name, async () => { await settle() }) }
  return { click, clickText, scrollTo, type, shotState }
}

// Open one chat as the only tab.
async function openChat(ctx, id, text) {
  // Background demo generation can add chats after seeding; keep only the cast's.
  ctx.sqlite("DELETE FROM rag_messages WHERE conversation_id IN (SELECT id FROM rag_conversations WHERE id NOT LIKE 'ws-%' AND surface IS NOT 'god'); DELETE FROM rag_conversations WHERE id NOT LIKE 'ws-%' AND surface IS NOT 'god';")
  await ctx.nav('day')
  await ctx.page.evaluate((i) => { localStorage.setItem('offgrid:chat:open-tabs', JSON.stringify([i])); localStorage.setItem('offgrid:chat:active-tab', i) }, id)
  await ctx.nav({ view: 'memory-chat', conversationId: id }, text)
}
const openSources = async (ctx) => { await ctx.page.getByText(/Searched your memory/).first().click({ force: true }).catch(() => {}); await ctx.settle() }

export const STATIC2 = {
  async god(ctx, J) {
    const openGod = async (title) => { await ctx.nav('day'); await ctx.nav('god'); await ctx.page.getByText(title, { exact: true }).first().click({ force: true }); await ctx.settle() }
    // Scheduled tasks may have run on their own; keep only the cast's conversations.
    ctx.sqlite("DELETE FROM rag_messages WHERE conversation_id IN (SELECT id FROM rag_conversations WHERE surface = 'god' AND id NOT LIKE 'ws-god-%'); DELETE FROM rag_conversations WHERE surface = 'god' AND id NOT LIKE 'ws-god-%';")
    await ctx.nav('day'); await ctx.nav('god'); await ctx.both('god-choose')
    await openGod('What should I do first today?'); await ctx.both('god')
    await openGod('Prep for Northwind board prep'); await openSources(ctx); await ctx.both('god-prep')
    await openGod('What is waiting for me?'); await ctx.both('god-waiting')
    const S2 = await import(new URL('./seed.mjs?t=' + Date.now(), import.meta.url).href)
    await S2.seedRoutines(ctx)
    await ctx.page.getByRole('button', { name: 'God settings' }).click({ force: true }); await ctx.settle()
    const rules = ctx.page.getByPlaceholder(/Ask before sending any email/)
    if (await rules.count()) { await rules.fill(S2.GOD_RULES); await rules.blur(); await ctx.settle() }
    await ctx.both('god-rules')
    const st = ctx.page.getByRole('button', { name: /Scheduled tasks/ })
    if (!(await ctx.page.locator('#god-routines-h').count())) await st.click({ force: true }); await ctx.settle()
    await ctx.page.locator('#god-routines-h').evaluate((e) => e.scrollIntoView({ block: 'start' })); await ctx.settle(); await ctx.both('god-routines')
    await ctx.page.keyboard.press('Escape'); await ctx.settle()
    await ctx.nav('day'); await ctx.nav('god'); await J.click('Voice'); await ctx.both('god-voice')
  },
  async vault(ctx, J) {
    await ctx.page.evaluate(() => window.api.proInvoke('vault:lock')); await ctx.nav('day'); await ctx.nav('vault', /Open Vault|Vault/); await ctx.both('vault-locked')
    const S2 = await import(new URL('./seed.mjs?t=' + Date.now(), import.meta.url).href)
    const f = ctx.page.getByPlaceholder('Master password')
    await ctx.both('vault-typing', async () => { await f.fill(S2.vaultPassword()); await f.focus() })
    await ctx.page.getByRole('button', { name: 'Open Vault' }).click({ force: true }); await ctx.settle()
    await ctx.page.getByText('Acme partner portal').first().click({ force: true }); await ctx.settle(); await ctx.both('vault-open')
    await ctx.page.getByText('Acme gateway .env').first().click({ force: true }); await ctx.settle(); await ctx.both('vault-file')
  },
  async voice(ctx, J) {
    await ctx.nav('day'); await ctx.nav('voice'); await ctx.both('voice'); await ctx.both('voice-library'); await ctx.both('voice-clean')
    await ctx.page.locator('button:not([class*="group/nav"])').last().click({ force: true }).catch(() => {}); await ctx.settle(); await ctx.both('voice-settings')
  },
  async approval(ctx, J) {
    const S2 = await import(new URL('./seed.mjs?t=' + Date.now(), import.meta.url).href)
    S2.seedApprovalCard(ctx, await ctx.page.evaluate(() => Date.now()))
    await openChat(ctx, 'ws-chat-reply', 'Yes, send it from Gmail.')
    const toCard = async () => { await ctx.page.getByText(/APPROVAL NEEDED/i).last().evaluate((e) => e.scrollIntoView({ block: 'center' })).catch(() => {}); await ctx.settle() }
    await toCard(); await ctx.both('approval', toCard)
    S2.clearApprovalCard(ctx)
    await openChat(ctx, 'ws-chat-promise', 'What did I promise Sam');
    await ctx.page.getByRole('button', { name: 'Settings', exact: true }).nth(1).click({ force: true }); await ctx.settle()
    await ctx.page.evaluate(() => { const el = [...document.querySelectorAll('[role=tab],button')].filter((b) => b.innerText.trim() === 'Tools').pop(); el?.click() }); await ctx.settle()
    await ctx.both('settings-mcp'); await ctx.page.keyboard.press('Escape')
  },
  async extra(ctx, J) {
    await ctx.nav('day'); await ctx.nav('models')
    await ctx.page.evaluate(() => { const el = [...document.querySelectorAll('button')].filter((b) => b.innerText.trim() === 'Vision' && !b.className.includes('group/nav')).pop(); el?.click() }); await ctx.settle()
    await ctx.both('models-vision')
    ctx.sqlite("DELETE FROM clipboard_items WHERE id NOT LIKE 'ws-clip-%'")
    await ctx.nav('day'); await ctx.nav('clipboard')
    await ctx.page.getByText('Acme Corp pilot: 40 seats from 14 Nov', { exact: false }).first().click({ force: true }); await ctx.settle()
    await ctx.both('clipboard-phone')
  },
  async web(ctx, J) {
    const toList = async () => { for (const n of ['Back to task list', 'Back to Task History']) { const b = ctx.page.getByRole('button', { name: n }); if (await b.count() && await b.first().isVisible()) { await b.first().click({ force: true }); await ctx.settle() } } }
    await openChat(ctx, 'ws-chat-web', 'compare Team pricing'); await ctx.both('web-compare')
    await ctx.nav('day'); await ctx.nav('tasks', /TASKS|Tasks/)
    if (await ctx.page.getByText('Waiting for you to sign in to Leafline', { exact: false }).count()) await ctx.both('web-takeover')
    await toList(); await ctx.both('web-tasks')
    await ctx.page.getByText('Compare Team pricing for 40 people').first().click({ force: true }); await ctx.settle(); await ctx.both('web-plan')
    const frame = async (pick) => {
      const r = ctx.page.getByLabel('Review saved task frame')
      const max = Number(await r.getAttribute('max')) || 6, min = Number(await r.getAttribute('min')) || 0
      await r.fill(String(pick(min, max))); await ctx.settle()
    }
    await frame((min) => min + 1); await ctx.both('web-step')
    await frame((min, max) => max); await ctx.both('web-done')
  }
}

export const STATIC = {
  async chats(ctx, J) {
    await openChat(ctx, 'ws-chat-promise', 'What did I promise Sam on the kickoff call?'); await openSources(ctx); await ctx.both('chat'); await ctx.both('ask-chat')
    await openChat(ctx, 'ws-chat-reply', 'Draft the reply to Sam'); await openSources(ctx); await ctx.both('act-draft')
    await openChat(ctx, 'ws-chat-translate', 'Translate this into Spanish'); await ctx.both('chat-translate')
    await openChat(ctx, 'ws-chat-summary', 'Summarise Acme_rollout_v3.pdf'); await openSources(ctx); await ctx.both('project-summary')
    await openChat(ctx, 'ws-chat-compare', 'Compare rollout plan v2 with v3'); await openSources(ctx); await ctx.both('project-compare')
    await openChat(ctx, 'ws-chat-checklist', 'Turn the pilot scope into a launch checklist'); await ctx.both('project-checklist')
    await openChat(ctx, 'ws-chat-vision-page', 'When does the pilot start, and who owns the rollout?'); await ctx.both('vision-screenshot')
    await openChat(ctx, 'ws-chat-vision-compare', 'What changed between v2 and v3 of the rollout timeline?'); await ctx.both('vision-compare')
    await openChat(ctx, 'ws-chat-vision-chart', 'What does this chart show?'); await ctx.both('vision-chat')
    await openChat(ctx, 'ws-chat-image', 'off-grid cabin'); await ctx.pause(1500); await ctx.both('imagegen-chat')
    await ctx.nav('projects'); await J.clickText('Acme Corp pilot'); await ctx.both('projects')
  },

  async day(ctx, J) {
    await ctx.nav('day')
    await ctx.both('day'); await ctx.both('today-journal'); await ctx.both('today-bento')
    await ctx.page.getByText('Acme Corp pilot kickoff with Sam', { exact: false }).last().evaluate((e) => { let p = e.parentElement; while (p && p.scrollHeight <= p.clientHeight + 4) p = p.parentElement; if (p) p.scrollTop = Math.max(0, p.scrollTop + 160) }).catch(() => {})
    await ctx.settle(); await ctx.both('today-timeline'); await ctx.both('day-timeline')
    await ctx.nav('day')
    await ctx.page.locator('div', { hasText: /^4:30 PM\s*Northwind board prep/ }).last().locator('button', { hasText: 'Prep' }).first().click({ force: true }).catch(async () => {
      await ctx.page.locator('button', { hasText: 'Prep' }).nth(2).click({ force: true })
    })
    await ctx.settle(); await ctx.both('today-prep')
  },
  async yesterday(ctx, J) {
    await ctx.nav('day'); await ctx.page.getByRole('button', { name: /Previous day|previous/i }).first().click({ force: true }); await ctx.settle()
    await ctx.both('today-yesterday'); await ctx.both('day-earlier')
  },
  async actions(ctx, J) {
    await ctx.nav('actions'); await J.click('To do'); await J.click('open')
    await ctx.both('act-todos'); await ctx.both('actions')
    await J.click('waiting on'); await ctx.both('act-waiting')
    await J.click('open'); await ctx.page.getByPlaceholder(/Find/).fill('Sam'); await ctx.settle(); await ctx.both('meetings-followups')
    await ctx.page.getByPlaceholder(/Find/).fill(''); await J.click('Approvals'); await J.click('Pending'); await ctx.both('act-approvals')
    const row = ctx.page.locator('tr', { hasText: 'Create Linear issue' }).first()
    await row.getByRole('button', { name: 'Show details' }).click({ force: true }); await ctx.settle(); await ctx.both('act-list')
    await J.click('History'); const sent = ctx.page.locator('tr', { hasText: 'Reply to Sam Okafor' }).first()
    await sent.getByRole('button', { name: 'Show details' }).click({ force: true }); await ctx.settle()
    await ctx.both('act-done'); await ctx.both('act-history')
  },
  async meetings(ctx, J) {
    await ctx.nav('meetings'); await J.clickText('Acme Corp pilot kickoff', false)
    await ctx.both('meetings'); await ctx.both('meetings-summary'); await ctx.both('meetings-list')
    await J.scrollTo('ON SCREEN'); await ctx.both('meetings-onscreen')
    await J.scrollTo('TRANSCRIPT'); await ctx.both('meetings-transcript'); await ctx.both('meetings-decisions')
  },
  async replay(ctx, J) {
    await ctx.nav('replay')
    // Seek to the rollout plan in Preview (10:50) with the timeline slider.
    await ctx.page.evaluate(() => { const r = document.querySelector('input[type=range]'); if (r) { r.focus() } })
    for (let i = 0; i < 400; i++) {
      const t = await ctx.page.evaluate(() => document.body.innerText.includes('Acme_rollout_v3.pdf') && /Preview/.test(document.body.innerText))
      if (t) break
      await ctx.page.getByRole('button', { name: 'Previous frame' }).click({ force: true }); await ctx.pause(60)
    }
    await ctx.settle(); await ctx.both('replay'); await ctx.both('capture-film')
    await ctx.page.getByRole('button', { name: 'Edit frame description and tags' }).click({ force: true }); await ctx.settle()
    await ctx.both('capture-edit')
    await ctx.page.getByRole('button', { name: 'Cancel' }).click({ force: true }).catch(() => {})
  },
  async reflect(ctx, J) {
    await ctx.nav('reflect'); await ctx.both('reflect'); await ctx.both('reflect-day'); await ctx.both('reflect-apps')
    await J.click('Week'); await ctx.both('reflect-week')
  },
  async search(ctx, J) {
    await ctx.nav('search')
    const box = ctx.page.getByPlaceholder(/Search everything/).first(); await box.fill('acme pilot'); await box.press('Enter'); await ctx.settle()
    await ctx.both('search'); await ctx.both('ask-search')
    for (const s of ['Meeting', 'Mail']) await ctx.page.getByText(s, { exact: true }).first().click({ force: true }).catch(() => {})
    await J.click('Recent'); await ctx.both('ask-filter')
  },
  async people(ctx, J) {
    await ctx.nav('entities'); await ctx.both('entities'); await ctx.both('people-directory')
    await J.click('People'); await ctx.both('people-list')
    await J.click('Companies'); await ctx.both('people-companies')
    const openEntity = async (name) => {
      await ctx.page.keyboard.press('Escape'); await ctx.nav('day'); await ctx.nav('entities')
      await ctx.page.getByRole('button', { name: 'Open ' + name, exact: true }).first().click({ force: true }); await ctx.settle()
    }
    await openEntity('Acme Corp pilot'); await ctx.both('people-project')
    await openEntity('Sam Okafor'); await ctx.both('people-sam')
    const r = ctx.page.locator('div', { hasText: 'Promised Sam the revised rollout plan by Friday' }).last()
    await r.locator('button').last().click({ force: true }); await ctx.settle(); await ctx.both('people-why'); await ctx.both('today-why')
  },
  async clipboard(ctx, J) {
    ctx.sqlite("DELETE FROM clipboard_items WHERE id NOT LIKE 'ws-clip-%'")
    await ctx.nav('day'); await ctx.nav('clipboard'); await ctx.both('clipboard'); await ctx.both('clipboard-all'); await ctx.both('clipboard-today')
    const box = ctx.page.getByPlaceholder(/Search content/).first()
    await box.fill('acme'); await ctx.settle(); await ctx.both('clipboard-search')
    await box.fill(''); await J.click('File'); await ctx.both('clipboard-file'); await ctx.both('clipboard-pdf')
    await J.click('Image'); await ctx.both('clipboard-images')
    await J.click('Tagged'); await ctx.both('clipboard-tags')
    await J.click('All'); await ctx.page.getByText('linear.app/offgrid', { exact: false }).first().focus().catch(() => {}); await ctx.both('clipboard-link')
  },
  async settings(ctx, J) {
    await ctx.nav('settings'); await J.clickText('Capture & processing'); await ctx.both('capture-settings')
    await J.scrollTo('EXCLUDED'); await ctx.both('capture-exclude')
    await ctx.nav('settings'); await J.clickText('What Off Grid AI has learned'); await ctx.both('act-learned')
    await ctx.nav('settings'); await J.clickText('AI activity'); await ctx.both('api-activity'); await ctx.both('gateway-log')
    await ctx.nav('settings'); await J.clickText('You'); await ctx.both('settings-instructions')
    await ctx.nav('settings'); await J.clickText('Engines'); await ctx.both('settings-performance')
  },
  async system(ctx, J) {
    await ctx.nav('connectors'); await ctx.both('integrations')
    await ctx.nav('gateway'); await ctx.both('gateway')
    await ctx.nav('models'); await ctx.both('models'); await ctx.both('models-text'); await ctx.both('models-fit')
    for (const [tab, name] of [['IMAGE', 'models-image'], ['TASKS', 'models-tasks'], ['VOICE', 'models-voice'], ['TRANSCRIPTION', 'models-transcription'], ['STORAGE', 'models-storage']]) {
      await ctx.page.locator('button:not([class*="group/nav"])').filter({ hasText: new RegExp('^\\s*' + tab, 'i') }).first().click({ force: true }).catch(() => {}); await ctx.settle(); await ctx.both(name)
    }
    await ctx.nav('devices'); await ctx.both('sync-devices'); await ctx.both('phone-devices')
    await J.click('Sync sharing'); await ctx.both('sync-sharing'); await ctx.both('phone-sharing')
    await J.click('Activity'); await ctx.both('sync-activity'); await ctx.both('phone-activity')
  }
}
