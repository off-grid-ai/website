// Website screenshot seed: one Thursday for Alex. Ported from the Oct 8 capture rig.
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
const WS = new URL('.', import.meta.url).pathname.replace(/\/$/, '')
export const q = (v) => (v === null || v === undefined ? 'NULL' : `'${String(v).replaceAll("'", "''")}'`)
export function at(hhmm, dayOffset = 0, nowMs = Date.now()) {
  const [h, m] = hhmm.split(':').map(Number)
  const d = new Date(nowMs); d.setDate(d.getDate() + dayOffset); d.setHours(h, m, 0, 0)
  return d.getTime()
}
export const utc = (ms) => new Date(ms).toISOString().slice(0, 19).replace('T', ' ')
// ---------- One Thursday for Alex (shared by Day, People, Reflect) ----------
// [start, end, surface, [summaries], [entities (first = timeline label)], category]
export const TODAY = [
  ['09:00', '09:25', 'Slack', ['Caught up on #acme-pilot: Priya posted the v3 rollout plan for review', 'Tom flagged the gateway policy as the last open item'], ['Acme Corp pilot', 'Priya Nair', 'Tom Reyes']],
  ['09:30', '09:55', 'Mail', ['Read Sam Okafor’s agenda for the 10:00 Acme pilot kickoff', 'Sam wants the start date, seat count and owners settled on the call'], ['Sam Okafor', 'Acme Corp']],
  ['10:00', '10:40', 'Zoom', ['Acme Corp pilot kickoff with Sam Okafor: start moved to 14 Nov with 40 seats', 'Promised Sam the revised rollout plan by Friday, with owners per stage', 'Agreed a check-in call next Tuesday at 10:00', 'Priya owns the rollout; Tom confirms the gateway policy before the start'], ['Sam Okafor', 'Acme Corp pilot', 'Priya Nair', 'Tom Reyes']],
  ['10:45', '11:00', 'Preview', ['Read Acme_rollout_v3.pdf: three stages, 10 laptops in week 1, all 40 seats from week 2', 'Success metric: hours saved per person per week, measured in week 6'], ['Acme Corp pilot']],
  ['11:05', '11:20', 'Gmail', ['Approved the reply to Sam and sent it: 14 Nov start, 40 seats, Tuesday 10:00 check-in', 'Off Grid AI drafted it from the kickoff notes; sent at 11:14'], ['Sam Okafor', 'Acme Corp pilot']],
  ['11:30', '12:10', 'Linear', ['Updated PIL-42 Acme Corp pilot review with owners per stage', 'Assigned stage 1 to Priya, the gateway policy to Tom, onboarding to Maya'], ['Acme Corp pilot', 'Priya Nair', 'Tom Reyes', 'Maya Chen']],
  ['12:15', '12:40', 'Figma', ['Placed the Acme logo in the pilot onboarding deck with Maya', 'Picked the welcome screen for the 10 product-team laptops'], ['Maya Chen', 'Acme Corp']],
  ['13:30', '14:15', 'Notion', ['Northwind board prep: drafted the Q3 update for Daniel Cole', 'Added the Acme pilot as the first enterprise proof point', 'Listed the three board risks: hiring, gateway security, pilot timing'], ['Daniel Cole', 'Northwind Capital', 'Acme Corp pilot']],
  ['14:20', '14:45', 'Slack', ['Tom confirmed he will sign off the Acme gateway policy by Monday', 'Priya shared the laptop list for the first 10 seats'], ['Tom Reyes', 'Priya Nair', 'Acme Corp pilot']],
  ['14:50', '15:25', 'Numbers', ['Built the hours-saved baseline for the week 6 review with Sam', 'October baseline: 3.1 hours a week per person on meeting follow-ups'], ['Acme Corp pilot', 'Sam Okafor']],
  ['15:30', '16:05', 'Google Meet', ['Design review of the Day view with Maya Chen and Tom Reyes', 'Agreed a denser timeline and a journal that cites the day’s meetings'], ['Maya Chen', 'Tom Reyes']]
]
export const YESTERDAY = [
  ['09:05', '09:40', 'Linear', ['Planned the Gateway v1 sprint: streaming fix, image edits endpoint, Windows update', 'Moved the llama.cpp 9B regression to Tom'], ['Gateway v1', 'Tom Reyes']],
  ['09:45', '10:30', 'Code Editor', ['Reviewed Tom’s streaming fix for the local gateway', 'Left two comments on the retry path'], ['Gateway v1', 'Tom Reyes']],
  ['10:35', '11:00', 'Mail', ['Sam Okafor asked to move the Acme pilot from 7 Nov to 14 Nov', 'He wants 40 seats instead of 25'], ['Sam Okafor', 'Acme Corp']],
  ['11:00', '11:50', 'Google Docs', ['Rewrote the rollout plan as v3: staged start, 40 seats, week 6 metric', 'Sent v3 to Priya for review'], ['Acme Corp pilot', 'Priya Nair']],
  ['11:55', '12:30', 'Zoom', ['Weekly product sync with Priya and Maya', 'Agreed the Day view redesign ships after the pilot starts'], ['Priya Nair', 'Maya Chen']],
  ['13:30', '14:20', 'Notion', ['Answered Daniel Cole’s questions for the Northwind board deck', 'Updated the private-inference metrics for Q3'], ['Daniel Cole', 'Northwind Capital']],
  ['14:25', '15:10', 'Figma', ['Reviewed Maya’s onboarding screens for the Acme laptops'], ['Maya Chen', 'Acme Corp pilot']],
  ['15:15', '15:45', 'Slack', ['Tom asked which internal tools the Acme gateway may call', 'Started the security review notes'], ['Tom Reyes', 'Acme Corp pilot']],
  ['15:50', '16:40', 'Zoom', ['Security review with Acme’s IT team and Sam Okafor', 'Audit log retention set to 90 days'], ['Sam Okafor', 'Acme Corp']],
  ['16:45', '17:30', 'Linear', ['Closed four Gateway v1 issues and tagged the 0.0.9 release candidate'], ['Gateway v1', 'Tom Reyes']]
]
export const JOURNAL_TODAY = 'The day turned on the 10:00 Acme Corp pilot kickoff with Sam Okafor. We moved the start to 14 November with 40 seats, 10 laptops in the product team first. I promised Sam three things: the revised rollout plan by Friday, a named owner for every stage, and a check-in call next Tuesday at 10:00.\n\nRight after the call I reread Acme_rollout_v3.pdf and Off Grid AI drafted the reply from the kickoff notes. I approved it at 11:14 and it went to Sam from Gmail. In Linear I put owners on PIL-42: Priya runs the rollout, Tom signs off the gateway policy, Maya handles onboarding.\n\nThe afternoon went to Northwind. I drafted the Q3 board update for Daniel Cole with the Acme pilot as the first enterprise proof point, then built the hours-saved baseline Sam will judge week 6 against. Tom confirmed the gateway sign-off for Monday.\n\nStill open: send Sam the revised plan by Friday and book Tuesday’s check-in. Northwind board prep with Daniel is at 4:30.'
export const JOURNAL_YESTERDAY = 'A Gateway v1 morning. I planned the sprint with Tom, reviewed his streaming fix, and moved the llama.cpp 9B regression onto his list.\n\nSam Okafor wrote in to push the Acme pilot from 7 to 14 November and to grow it from 25 to 40 seats. I rewrote the rollout plan as v3 with a staged start and a week 6 success metric, and sent it to Priya.\n\nThe afternoon covered Daniel Cole’s board questions, Maya’s onboarding screens and the security review with Acme’s IT team, where we set audit log retention to 90 days. I closed four Gateway v1 issues before 17:30.'

// One observation per ~2 minutes of each block, each with a captured frame of that block's window.
function blockSql(sqlite, blocks, dayOffset, nowMs, idBase, profileDir, look = dayOffset, linkEntities = true) {
  const ents = Object.fromEntries(JSON.parse(sqlite('SELECT id, name FROM entities', true) || '[]').map((e) => [e.name, e.id]))
  const cap = path.join(profileDir, 'captures'); fs.mkdirSync(cap, { recursive: true })
  const sql = []
  const used = new Set()
  let id = idBase
  blocks.forEach(([s, e, surface, sums, names], bi) => {
    const t0 = at(s, dayOffset, nowMs), t1 = at(e, dayOffset, nowMs)
    const n = Math.max(2, Math.round((t1 - t0) / 120_000) + 1)
    const img = path.join(WS, 'frames', 'blocks', `${look}-${bi}.png`)
    const obsIds = sums.map((summary, k) => {
      const ts = t0 + Math.round(((t1 - t0) * k) / sums.length)
      const oid = id++
      sql.push(`INSERT INTO observations (id, summary, surface, surface_app, category, engagement, salience, ts) VALUES (${oid}, ${q(summary)}, ${q(surface)}, ${q(surface)}, ${['Slack', 'Mail', 'Gmail', 'Zoom', 'Google Meet'].includes(surface) ? "'communication'" : "'work'"}, 0.7, 0.6, '${utc(ts)}');`)
      if (linkEntities) for (const nm of names) if (ents[nm]) sql.push(`INSERT OR IGNORE INTO observation_entities (observation_id, entity_id, role) VALUES (${oid}, ${ents[nm]}, '${nm === names[0] ? 'subject' : 'mention'}');`)
      return oid
    })
    for (let i = 0; i < n; i++) {
      let ts = t0 + Math.round(((t1 - t0) * i) / (n - 1))
      while (used.has(ts)) ts += 1000
      used.add(ts)
      const k = Math.min(sums.length - 1, Math.floor((i * sums.length) / n))
      const fid = id++
      const framePath = path.join(cap, `capture-${ts}.png`)
      fs.copyFileSync(img, framePath)
      sql.push(`INSERT INTO frames (id, ts, surface, app, window_title, image_path, text, source, processing_status, processed_at) VALUES (${fid}, '${utc(ts)}', ${q(surface)}, ${q(surface)}, ${q(TITLES[look][bi])}, ${q(framePath)}, ${q(sums[k])}, 'vision', 'observed', '${utc(ts + 20000)}');`)
      sql.push(`INSERT INTO observation_frames (observation_id, frame_id) VALUES (${obsIds[k]}, ${fid});`)
    }
  })
  return sql
}

export function seedDay(ctx, nowMs) {
  const { sqlite, profileDir } = ctx
  const midnight = (off) => { const d = new Date(nowMs); d.setDate(d.getDate() + off); d.setHours(0, 0, 0, 0); return d.getTime() }
  const sql = [
    `DELETE FROM observation_frames WHERE frame_id IN (SELECT id FROM frames WHERE ts >= '${utc(midnight(-3))}');`,
    `DELETE FROM frames WHERE ts >= '${utc(midnight(-3))}';`,
    `DELETE FROM observations WHERE ts >= '${utc(midnight(-3))}';`,
    `UPDATE entities SET hidden = 0;`
  ]
  // Monday and Tuesday give Reflect a week; they carry no entity links so people timelines stay on Wed/Thu.
  sql.push(...blockSql(sqlite, YESTERDAY.slice(0, 8), -3, nowMs, 880000, profileDir, -1, false))
  sql.push(...blockSql(sqlite, TODAY.slice(2, 10), -2, nowMs, 890000, profileDir, 0, false))
  sql.push(...blockSql(sqlite, YESTERDAY, -1, nowMs, 900000, profileDir))
  sql.push(...blockSql(sqlite, TODAY, 0, nowMs, 910000, profileDir))
  sql.push(`INSERT INTO day_journals (day_key, text, updated_at) VALUES (${midnight(0) / 1000}, ${q(JOURNAL_TODAY)}, ${nowMs}) ON CONFLICT(day_key) DO UPDATE SET text = excluded.text, updated_at = excluded.updated_at;`)
  sql.push(`INSERT INTO day_journals (day_key, text, updated_at) VALUES (${midnight(-1) / 1000}, ${q(JOURNAL_YESTERDAY)}, ${nowMs}) ON CONFLICT(day_key) DO UPDATE SET text = excluded.text, updated_at = excluded.updated_at;`)
  // Today's calendar (Day shows events from now-1h to midnight).
  const ev = [
    ['Acme Corp pilot kickoff', '10:00', '10:40', 'Zoom', 'Sam Okafor, Priya Nair'],
    ['Design review, Day view', '15:30', '16:05', 'Google Meet', 'Maya Chen, Tom Reyes'],
    ['Northwind board prep', '16:30', '17:00', 'Zoom', 'Daniel Cole'],
    ['1:1 with Priya Nair', '17:05', '17:30', 'Zoom', 'Priya Nair']
  ]
  sql.push('DELETE FROM upcoming_events;')
  for (const [title, s, e, loc, who] of ev) {
    const a = at(s, 0, nowMs) / 1000, b = at(e, 0, nowMs) / 1000
    sql.push(`INSERT INTO upcoming_events (title, starts_at, ends_at, location, attendees, source_app, source_ts, dedup_key, url, created_at) VALUES (${q(title)}, ${a}, ${b}, ${q(loc)}, ${q(who)}, 'Google Calendar', ${a - 86400}, ${q(title + '|' + a)}, '', ${nowMs});`)
  }
  sqlite(sql.join('\n'))
}

export const KICKOFF_TRANSCRIPT = [
  ['Them', 'Morning, Alex. Priya and Tom are on too, so we can settle the dates today.'],
  ['You', 'Great. First thing: we can’t start on the 7th. Can we move the pilot to 14 November?'],
  ['Them', '14 November works. And we’d like 40 seats, not 25.'],
  ['You', 'Forty is fine. We’ll start with 10 laptops in your product team in week 1, then all 40 from week 2.'],
  ['Them', 'Good. Who owns each stage? I need names before I take it to my leadership.'],
  ['You', 'Priya owns the rollout. Tom signs off the gateway policy before the start. Maya runs onboarding.'],
  ['Them', 'And nothing leaves the laptops?'],
  ['You', 'Nothing leaves the laptops. The gateway only opens to your internal tools once Tom approves the policy.'],
  ['Them', 'How do we know it worked?'],
  ['You', 'Hours saved per person per week on meeting follow-ups, measured in week 6 against your October baseline.'],
  ['Them', 'Fine. Send me the revised plan with the owners.'],
  ['You', 'You’ll have the revised rollout plan by Friday, with an owner for every stage. And let’s hold a check-in next Tuesday at 10:00.'],
  ['Them', 'Tuesday at 10 is good. Thanks, Alex.']
].map(([w, t]) => `${w}: ${t}`).join('\n')

export function seedMeetings(ctx, nowMs) {
  const { sqlite } = ctx
  const M = [
    ['Acme Corp pilot kickoff', '10:00', '10:38', 0, 'Moved the Acme Corp pilot to 14 Nov with 40 seats: 10 product-team laptops in week 1, all 40 from week 2. Priya owns the rollout, Tom signs off the gateway policy, Maya runs onboarding. Success metric: hours saved per person per week, measured in week 6. Alex promised Sam the revised rollout plan by Friday with owners per stage, and a check-in next Tuesday at 10:00.', KICKOFF_TRANSCRIPT],
    ['Design review, Day view', '15:30', '16:04', 0, 'Maya and Tom agreed a denser Day timeline and a journal that cites the day’s meetings. Tom will prototype the timeline grouping before Monday.', 'You: Let’s look at the timeline first.\nThem: It reads well, but the blocks are too tall.\nYou: Agreed. Can we group by hour and keep one line per block?\nThem: Yes, and the journal should mention the meetings it draws on.'],
    ['Security review with Acme IT', '15:50', '16:38', -1, 'Walked Acme’s IT team and Sam Okafor through the on-device pipeline. Audit log retention set to 90 days. Tom to confirm which internal tools the gateway may call.', 'Them: Where does the audio go?\nYou: Nowhere. It is transcribed on the laptop and the recording stays there.\nThem: We need audit logs for 90 days.\nYou: We can set retention to 90 days in the pilot policy.'],
    ['Weekly product sync', '11:55', '12:28', -1, 'Priya and Maya agreed the Day view redesign ships after the Acme pilot starts. Release 0.0.9 stays on track for next week.', 'You: Two things today: the Day view and 0.0.9.\nThem: The redesign can wait until the pilot is live.\nYou: Agreed. 0.0.9 ships next week.'],
    ['Northwind quarterly update', '14:00', '14:45', -3, 'Daniel Cole reviewed Q3 with Alex. He asked for the private-inference metrics and an enterprise proof point before the board meeting.', 'Them: The numbers look good. What does the board see from enterprise?\nYou: The Acme Corp pilot. It starts in November.\nThem: Bring the metrics to the board prep.']
  ]
  const sql = ['DELETE FROM meetings;']
  for (const [title, s, e, d, summary, tr] of M) {
    const a = at(s, d, nowMs), b = at(e, d, nowMs)
    sql.push(`INSERT INTO meetings (title, transcript, summary, audio_path, started_at, ended_at, duration_sec, created_at) VALUES (${q(title)}, ${q(tr)}, ${q(summary)}, NULL, ${a}, ${b}, ${Math.round((b - a) / 1000)}, ${b});`)
  }
  sqlite(sql.join('\n'))
}

export const REPLY_BODY = 'Hi Sam,\n\nThanks for this morning. Confirming what we agreed on the kickoff call:\n\n- The pilot starts on 14 November with 40 seats: 10 laptops in your product team in week 1, all 40 from week 2.\n- Priya Nair owns the rollout, Tom Reyes signs off the gateway policy before the start, and Maya Chen runs onboarding.\n- We measure hours saved per person per week, in week 6.\n\nYou will have the revised rollout plan with owners per stage by Friday. I have held next Tuesday at 10:00 for our check-in.\n\nBest,\nAlex'
export const GATE2 = {
  actionId: 'gate-acme-reply-2', actionType: 'gmail.send_email', title: 'Send email with Gmail', risk: 'medium', sourceRef: 'acme-reply',
  args: { to: 'Sam Okafor <sam@acme.example>', subject: 'Acme Corp pilot: 14 November start', body: REPLY_BODY }
}

export function seedPeople(ctx) {
  const { sqlite } = ctx
  const id = (n) => sqlite(`SELECT id FROM entities WHERE name=${q(n)} ORDER BY id LIMIT 1`).trim()
  const S = [
    ['Sam Okafor', 'IT lead at Acme Corp and the sponsor of the Acme Corp pilot. Agreed the 14 Nov start with 40 seats on today’s kickoff call; expects the revised rollout plan by Friday and a check-in next Tuesday at 10:00.', 'Acme Corp'],
    ['Priya Nair', 'Product manager at Off Grid AI. Owns the Acme Corp pilot rollout and the weekly release sync.', null],
    ['Tom Reyes', 'Founding engineer at Off Grid AI. Signs off the gateway policy for the Acme Corp pilot by Monday.', null],
    ['Maya Chen', 'Product designer at Off Grid AI. Runs onboarding for the Acme pilot and owns the Day view.', null],
    ['Daniel Cole', 'Partner at Northwind Capital and lead investor. Wants the Acme pilot’s week 6 hours-saved number at the next board meeting.', 'Northwind Capital'],
    ['Acme Corp pilot', '40-seat Off Grid AI pilot at Acme Corp, sponsored by Sam Okafor. Starts 14 Nov with 10 product-team laptops, all 40 seats from week 2. Priya owns the rollout, Tom signs off the gateway policy, Maya runs onboarding. Success metric: hours saved per person per week, measured in week 6. Next: revised rollout plan to Sam by Friday, check-in Tuesday 10:00.', 'Acme Corp'],
    ['Acme Corp', 'Customer running the 40-seat Off Grid AI pilot from 14 Nov. Sam Okafor, IT lead, is the sponsor.', null],
    ['Northwind Capital', 'Lead investor. Daniel Cole sits on the board; the Q3 board update leads with the Acme Corp pilot.', null]
  ]
  const sql = []
  for (const [n, summary, parent] of S) {
    sql.push(`UPDATE entities SET summary=${q(summary)}, hidden=0, updated_at=datetime('now','-20 minutes') WHERE name=${q(n)};`)
    if (parent) sql.push(`UPDATE entities SET parent_id=${id(parent)} WHERE name=${q(n)};`)
  }
  sql.push(`UPDATE entities SET parent_id=NULL WHERE name IN ('Priya Nair','Tom Reyes','Maya Chen');`)
  sqlite(sql.join('\n'))
}

export function seedApprovals(ctx, nowMs) {
  const { sqlite } = ctx
  const T = (h, d = 0) => at(h, d, nowMs)
  const rows = [
    // [title, detail, connector, tool, args, entity, status, created, decided, result, kind]
    ['Reply to Sam Okafor: Acme Corp pilot, 14 November start', 'Drafted from the 10:00 Acme Corp pilot kickoff. Confirms the 14 Nov start with 40 seats, the owner of each stage and Tuesday’s 10:00 check-in.', 'Gmail', 'send_email', { to: 'Sam Okafor <sam@acme.example>', subject: 'Acme Corp pilot: 14 November start', body: REPLY_BODY }, 'Sam Okafor', 'executed', T('11:05'), T('11:14'), 'Sent to Sam Okafor <sam@acme.example> at 11:14 AM', 'email'],
    ['Create Linear issue: Revised Acme rollout plan with owners per stage', 'Promised to Sam on the kickoff call: the revised rollout plan by Friday, with an owner for every stage.', 'Linear', 'create_issue', { team: 'Pilots', title: 'Revised Acme rollout plan with owners per stage', description: 'Due Friday. Stage 1 (10 laptops): Priya Nair. Gateway policy: Tom Reyes. Onboarding: Maya Chen. Send to Sam Okafor when done.', assignee: 'Priya Nair', due: 'Friday' }, 'Acme Corp pilot', 'pending', T('12:05'), null, null, 'issue'],
    ['Invite Sam Okafor: Acme pilot check-in, Tuesday 10:00', 'Agreed on the kickoff call. 30 minutes, weekly from next Tuesday.', 'Google Calendar', 'create_event', { title: 'Acme Corp pilot check-in', when: 'Tuesday, 10:00–10:30, weekly', attendees: 'Sam Okafor, Priya Nair, Alex', location: 'Zoom' }, 'Sam Okafor', 'pending', T('11:20'), null, null, 'calendar'],
    ['Share the Q3 board brief with Daniel Cole', 'Daniel asked for the brief before the Northwind board prep at 4:30.', 'Gmail', 'send_email', { to: 'Daniel Cole <daniel@northwind.example>', subject: 'Q3 board brief', body: 'Hi Daniel,\n\nAttached is the Q3 brief for the board prep at 4:30. The Acme Corp pilot leads the enterprise section: 40 seats from 14 November, with a week 6 hours-saved measure.\n\nBest,\nAlex' }, 'Daniel Cole', 'pending', T('14:20'), null, null, 'email']
  ]
  rows.push(['Send the October promo email to the newsletter list', 'A bulk promotion drafted from a Mailchimp template. You rejected it: nothing goes to Acme contacts without asking.', 'Gmail', 'send_email', { to: 'newsletter@offgrid.example', subject: 'October: what is new in Off Grid AI', body: 'Hi there,\n\nHere is what shipped in October...' }, null, 'rejected', T('09:20'), T('09:24'), 'Rejected by you at 9:24 AM', 'email'])
  // What each proposal was based on (shown under "Based on" when a row is opened).
  const EVID = [
    ['Zoom', '10:34', 'Acme Corp pilot kickoff. You: “You’ll have the revised rollout plan by Friday, with an owner for every stage. And let’s hold a check-in next Tuesday at 10:00.”'],
    ['Zoom', '10:34', 'Acme Corp pilot kickoff. You promised Sam the revised rollout plan by Friday, with an owner for every stage.'],
    ['Zoom', '10:36', 'Acme Corp pilot kickoff. Them: “Tuesday at 10 is good. Thanks, Alex.”'],
    ['Mail', '13:40', 'Daniel Cole: “Could you send the Q3 brief before the board prep at 4:30?”'],
    ['Mail', '09:18', 'Mailchimp template “October update” saved as a draft.']
  ]
  const sql = ['DELETE FROM approvals;', 'DELETE FROM audit_log;']
  rows.forEach(([title, detail, conn, tool, args, ent, status, c, d, result, kind], i) => {
    const [surface, hhmm, text] = EVID[i]
    const evidence = JSON.stringify({ surface, ts: utc(T(hhmm)), text })
    sql.push(`INSERT INTO approvals (id, title, detail, connector, tool, args, entity_name, source, risk, action_kind, status, result, created_at, decided_at, evidence) VALUES (${i + 1}, ${q(title)}, ${q(detail)}, ${q(conn)}, ${q(tool)}, ${q(JSON.stringify(args))}, ${q(ent)}, 'chat', 'mutate', ${q(kind)}, ${q(status)}, ${q(result)}, ${c}, ${d ?? 'NULL'}, ${q(evidence)});`)
    sql.push(`INSERT INTO audit_log (ts, action, approval_id, detail) VALUES (${c}, 'proposed', ${i + 1}, ${q(title)});`)
    if (status !== 'pending') sql.push(`INSERT INTO audit_log (ts, action, approval_id, detail) VALUES (${d}, ${q(status)}, ${i + 1}, ${q(result)});`)
  })
  sqlite(sql.join('\n'))
}

const MOCKS = { Mail: ['mail.png', 'Mail', 'Re: Acme Corp pilot kickoff agenda'], Zoom: ['meet.png', 'Zoom', 'Acme Corp pilot kickoff'], Preview: ['preview.png', 'Preview', 'Acme_rollout_v3.pdf'], Gmail: ['mail.png', 'Mail', 'Re: Acme Corp pilot timeline'], Linear: ['issue.png', 'Linear', 'PIL-42 Acme Corp pilot review'] }
// Replay frames for today's blocks that have a rendered mock (09:30 Mail, 10:00 Zoom, 10:45 Preview, 11:30 Linear).
export function seedFrames(ctx, nowMs) {
  const { sqlite, profileDir } = ctx
  const cap = path.join(profileDir, 'captures'); fs.mkdirSync(cap, { recursive: true })
  const mid = new Date(nowMs); mid.setHours(0, 0, 0, 0)
  for (const f of fs.readdirSync(cap)) { const m = /^capture-(\d+)\.png$/.exec(f); if (m && Number(m[1]) >= mid.getTime() && Number(m[1]) <= nowMs) fs.rmSync(path.join(cap, f)) }
  const obs = JSON.parse(sqlite(`SELECT id, surface, CAST(strftime('%s', ts) AS INTEGER) * 1000 AS ms FROM observations WHERE id >= 910000 ORDER BY ts`, true) || '[]')
  const sql = [`DELETE FROM frames WHERE ts >= '${utc(mid.getTime())}';`, `DELETE FROM replay_frame_edits;`]
  let fid = 950000
  for (const o of obs) {
    const m = MOCKS[o.surface]; if (!m) continue
    const p = path.join(cap, `capture-${o.ms}.png`)
    fs.copyFileSync(path.join(WS, 'frames', m[0]), p)
    sql.push(`INSERT INTO frames (id, ts, surface, app, window_title, image_path, source, processing_status, processed_at) VALUES (${fid}, '${utc(o.ms)}', ${q(m[1])}, ${q(m[1])}, ${q(m[2])}, ${q(p)}, 'screen', 'observed', '${utc(o.ms + 20000)}');`)
    sql.push(`INSERT OR IGNORE INTO observation_frames (observation_id, frame_id) VALUES (${o.id}, ${fid});`)
    fid++
  }
  sqlite(sql.join('\n'))
  return fid - 950000
}

export function seedTodos(ctx, nowMs) {
  const { sqlite } = ctx
  const s = (hhmm) => Math.round(at(hhmm, 0, nowMs) / 1000)
  const E = (n) => `(SELECT id FROM entities WHERE name=${q(n)} LIMIT 1)`
  const K = 'Acme Corp pilot kickoff, 10:00'
  // [id, text, due, entity, source_app, source_summary, hhmm, priority, waiting_on, status]
  const T = [
    [10, 'Send Sam the revised rollout plan with owners per stage', 'Friday', 'Sam Okafor', 'Meeting', `${K}. You: “You’ll have the revised rollout plan by Friday, with an owner for every stage.”`, '10:34', 'high', null, 'open'],
    [14, 'Book the Tuesday 10:00 check-in with Sam', 'Tuesday', 'Sam Okafor', 'Meeting', `${K}. You: “Let’s hold a check-in next Tuesday at 10:00.” Them: “Tuesday at 10 is good.”`, '10:36', 'normal', null, 'open'],
    [1, 'Name an owner for every rollout stage', 'Friday', 'Priya Nair', 'Meeting', `${K}. Priya owns the rollout; owners per stage go in the revised plan.`, '10:30', 'normal', 'Priya Nair', 'open'],
    [2, 'Sign off the gateway policy for the Acme pilot', 'Monday', 'Tom Reyes', 'Slack', 'Tom in #acme-pilot: “I’ll sign off the gateway policy by Monday.”', '14:22', 'normal', 'Tom Reyes', 'open'],
    [3, 'Prototype the hour-grouped Day timeline', 'Monday', 'Tom Reyes', 'Meeting', 'Design review, Day view, 15:30. Tom will prototype the timeline grouping before Monday.', '15:58', 'low', 'Tom Reyes', 'open'],
    [4, 'Send the laptop list for the first 10 seats', 'today', 'Priya Nair', 'Slack', 'Priya shared the laptop list in #acme-pilot.', '14:31', 'normal', null, 'done'],
    [5, 'Draft the Q3 risk list for Daniel', 'today', 'Daniel Cole', 'Notion', 'Northwind board prep: hiring, gateway security, pilot timing.', '14:05', 'high', null, 'open'],
    [6, 'Book the week 6 pilot review with Sam', 'next week', 'Acme Corp pilot', 'Mail', 'Sam’s agenda: review hours saved in week 6.', '09:40', 'normal', null, 'open'],
    [7, 'Send Sam the pilot onboarding guide', 'Monday', 'Acme Corp pilot', 'Figma', 'Onboarding deck for the 10 product-team laptops.', '12:30', 'normal', null, 'open'],
    [8, 'Share the audit log retention plan with Daniel', 'this week', 'Daniel Cole', 'Notion', 'Security review: audit logs kept for 90 days.', '13:50', 'low', null, 'open'],
    [9, 'Send the Q3 board update to Daniel', 'by Friday', 'Daniel Cole', 'Notion', 'Northwind board prep: the Acme pilot leads the enterprise section.', '14:10', 'normal', null, 'open'],
    [11, 'Review Tom’s fix for the llama.cpp 9B regression', 'this week', 'Tom Reyes', 'Linear', 'Gateway v1 sprint.', '09:10', 'low', null, 'open'],
    [12, 'Cut the v0.0.9 release notes with Priya', 'this week', 'Priya Nair', 'Slack', 'Release 0.0.9 ships next week.', '09:15', 'low', null, 'open'],
    [13, 'Approve Maya’s denser Day timeline', 'tomorrow', 'Maya Chen', 'Meeting', 'Design review, Day view, 15:30. Maya and Tom agreed a denser timeline.', '16:02', 'normal', null, 'open'],
    [15, 'Reply to Sam with the 14 Nov start and Tuesday check-in', null, 'Sam Okafor', 'Gmail', 'Sent from Gmail at 11:14 after your approval.', '11:14', 'normal', null, 'done']
  ]
  const sql = ['DELETE FROM action_item_sources;', 'DELETE FROM action_items;']
  for (const [id, text, due, ent, app, sum, hhmm, pr, wait, st] of T) {
    sql.push(`INSERT INTO action_items (id, text, raw_text, due, entity_name, entity_id, source_app, source_summary, source_ts, confidence, status, created_at, dedup_key, priority, waiting_on, accepted_at) VALUES (${id}, ${q(text)}, ${q(text)}, ${q(due)}, ${q(ent)}, ${E(ent)}, ${q(app)}, ${q(sum)}, ${s(hhmm)}, 0.86, ${q(st)}, ${s(hhmm) * 1000}, ${q('ws-' + id)}, ${q(pr)}, ${q(wait)}, ${s(hhmm) * 1000});`)
    sql.push(`INSERT INTO action_item_sources (action_item_id, source_kind, source_key, candidate_key, source_app, source_summary, source_ts, evidence_text, created_at) VALUES (${id}, ${app === 'Meeting' ? "'meeting'" : "'observation'"}, ${q('ws-src-' + id)}, ${q('ws-cand-' + id)}, ${q(app)}, ${q(sum)}, ${s(hhmm)}, ${q(sum)}, ${s(hhmm) * 1000});`)
  }
  sqlite(sql.join('\n'))
}

// Entities the story needs; Helio Labs (a real company) becomes Acme Corp everywhere.
export function seedEntities(ctx) {
  const { sqlite } = ctx
  const cols = (t) => sqlite(`SELECT group_concat(name, ' ') FROM pragma_table_info('${t}') WHERE type = 'TEXT'`).trim().split(' ').filter(Boolean)
  // Throwaway demo profile: drop the immutability guards so the seed can rewrite rows.
  for (const t of sqlite("SELECT name FROM sqlite_master WHERE type = 'trigger' AND sql LIKE '%immutable%'").split('\n').filter(Boolean)) sqlite(`DROP TRIGGER "${t}"`)
  const sql = [`DELETE FROM entities WHERE name = 'Acme Corp' AND EXISTS (SELECT 1 FROM entities WHERE name = 'Helio Labs');`]
  const tables = sqlite("SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE '%fts%' AND name NOT LIKE 'sqlite_%'").split('\n').filter(Boolean)
  for (const t of tables) {
    for (const col of cols(t)) {
      for (const [a, b] of [['Helio Labs', 'Acme Corp'], ['heliolabs', 'acme'], ['Helio', 'Acme'], ['helio', 'acme']]) {
        sql.push(`UPDATE "${t}" SET "${col}" = replace("${col}", '${a}', '${b}') WHERE "${col}" LIKE '%${a}%';`)
      }
    }
  }
  const need = [['Acme Corp', 'company'], ['Acme Corp pilot', 'project'], ['Gateway v1', 'project'], ['Northwind Capital', 'company'], ['Sam Okafor', 'person'], ['Priya Nair', 'person'], ['Tom Reyes', 'person'], ['Maya Chen', 'person'], ['Daniel Cole', 'person']]
  for (const [n, type] of need) sql.push(`INSERT INTO entities (name, type, created_at, updated_at, hidden) SELECT ${q(n)}, ${q(type)}, datetime('now'), datetime('now'), 0 WHERE NOT EXISTS (SELECT 1 FROM entities WHERE name = ${q(n)});`)
  sqlite(sql.join('\n'))
}

export function seedClipboard(ctx, now) {
  const { sqlite } = ctx
  const F = path.join(WS, 'frames')
  const ago = (min) => now - min * 60_000
  const curl = 'curl http://127.0.0.1:7878/v1/chat/completions \\\n  -H "Content-Type: application/json" \\\n  -d \'{"model": "qwen3.5-9b", "messages": [{"role": "user", "content": "Summarise PIL-42 for Sam"}]}\''
  const items = [
    ['logo', 'image', 'Acme logo', 'Figma', 4, `readfile('${F}/acme-logo.png')`, '[Image]', null, null],
    ['pdf', 'file', 'Acme_rollout_v3.pdf', 'Finder', 9, `readfile('${F}/Acme_rollout_v3.pdf')`, 'Acme_rollout_v3.pdf', null, '["acme"]'],
    ['linear', 'text', 'https://linear.app/offgrid/issue/PIL-42/acme-corp-pilot-review', 'Linear', 17, 'NULL', null, null, null],
    ['pricing', 'image', 'Acme Corp pilot pricing table', 'Screenshot', 26, `readfile('${F}/pricing.png')`, '[Image]', null, '["acme"]'],
    ['sam', 'text', 'Sam Okafor <sam@acme.example>', 'Mail', 38, 'NULL', null, null, '["acme"]'],
    ['curl', 'text', curl, 'Terminal', 52, 'NULL', null, null, null],
    ['chart', 'image', 'Acme hours saved chart', 'Numbers', 71, `readfile('${F}/chart.png')`, '[Image]', null, '["acme"]'],
    ['note', 'text', 'Acme Corp pilot: 40 seats from 14 Nov. Revised rollout plan to Sam by Friday, owners per stage, check-in next Tuesday at 10:00.', 'Notes', 96, 'NULL', null, "Alex's iPhone", '["acme"]'],
    ['owners', 'text', 'Owners per stage: Priya Nair (rollout), Tom Reyes (gateway policy), Maya Chen (onboarding)', 'Notes', 128, 'NULL', null, null, null],
    ['address', 'text', 'Acme Corp, 200 Harbor Street, Floor 4, Oakland, CA 94607', 'Maps', 151, 'NULL', null, "Alex's iPhone", null]
  ]
  const sql = ['DELETE FROM clipboard_items;']
  for (const [id, type, text, app, mins, raw, prev, dev, tags] of items) {
    sql.push(`INSERT INTO clipboard_items (id, timestamp, content_type, text_content, source_app, source_device, hash, raw_data, preview, tags) VALUES ('ws-clip-${id}', ${ago(mins)}, '${type}', ${q(text)}, '${app}', ${q(dev)}, 'ws-hash-${id}', ${raw}, ${q(prev ?? text.replace(/\s+/g, ' ').slice(0, 200))}, ${q(tags)});`)
  }
  sqlite(sql.join('\n'))
}

// Window titles per block (same order as TODAY / YESTERDAY); frames/blocks/<day>-<i>.png is the rendered window.
export const TITLES = {
  0: ['#acme-pilot', 'Re: Acme Corp pilot kickoff agenda', 'Acme Corp pilot kickoff', 'Acme_rollout_v3.pdf', 'Re: Acme Corp pilot timeline', 'PIL-42 Acme Corp pilot review', 'Pilot onboarding deck', 'Northwind board prep', '#acme-pilot', 'Hours saved baseline', 'Design review, Day view'],
  [-1]: ['Gateway v1 sprint', 'gateway/stream.ts', 'Acme pilot: move to 14 Nov', 'Acme rollout plan v3', 'Weekly product sync', 'Northwind board prep', 'Pilot onboarding deck', '#gateway', 'Security review with Acme IT', 'Gateway v1 sprint']
}

// The Day journal is written by the model only while capture runs; store the cast's journal against
// the same fingerprint the app computes (JOURNAL_VERSION 4 + dayFacts lines), so it reads as current.
export async function seedJournals(ctx) {
  const { page, sqlite } = ctx
  const { createHash } = await import('node:crypto')
  for (const [off, text] of [[0, JOURNAL_TODAY], [-1, JOURNAL_YESTERDAY]]) {
    const r = await page.evaluate(async (o) => {
      const d = new Date(); d.setDate(d.getDate() + o); d.setHours(0, 0, 0, 0)
      const s = Math.floor(d.getTime() / 1000), e = s + 86400
      const blocks = (await window.api.crmDayActivity(s, e)) ?? []
      const clock = (x) => new Date(x * 1000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
      const facts = blocks.filter((b) => b.id.startsWith('O') || b.activeSec >= 120).map((b) => {
        const span = b.id.startsWith('O') ? clock(b.startSec) : `${clock(b.startSec)}–${clock(b.endSec)} (${Math.round(b.activeSec / 60)} min)`
        const people = b.entities.map((x) => x.name).slice(0, 4).join(', ')
        const what = b.summaries.slice(0, 2).join(' | ')
        return { id: b.id, surface: b.surface, line: `[${b.id}] ${span} ${b.surface}: ${b.label}${people ? ` — with/about ${people}` : ''}${what ? ` — ${what}` : ''}` }
      })
      return { s, facts }
    }, off)
    const fp = createHash('sha1').update(`4\n${r.facts.map((f) => f.line).join('\n')}`).digest('hex')
    // Cite the blocks each sentence talks about, by the app names it mentions.
    const sentences = text.split(/\n\n+/).flatMap((p) => p.split(/(?<=[.!?])\s+/)).map((t) => t.trim()).map((t) => ({
      text: t,
      cites: r.facts.filter((f) => t.includes(f.surface) || (/kickoff|call/i.test(t) && f.surface === 'Zoom')).map((f) => f.id).slice(0, 3)
    }))
    sqlite(`INSERT INTO day_journals (day_key, text, updated_at, source_fp, sentences_json) VALUES (${r.s}, ${q(text)}, ${Date.now()}, '${fp}', ${q(JSON.stringify(sentences))}) ON CONFLICT(day_key) DO UPDATE SET text = excluded.text, updated_at = excluded.updated_at, source_fp = excluded.source_fp, sentences_json = excluded.sentences_json;`)
    console.log(`JOURNAL day=${off} facts=${r.facts.length}`)
  }
}

// Devices: the license's seat registry lists real test devices. Replace it with the cast's Mac and
// iPhone, pair the iPhone and give it finished transfers.
export function seedDevices(ctx, nowMs) {
  const { sqlite } = ctx
  const local = sqlite("SELECT value FROM sync_meta WHERE key = 'sync.localDevice'").trim()
  const phone = '9d25c24e4b6a2753dcc08a89b0342194'
  const t = (hhmm) => at(hhmm, 0, nowMs)
  const sql = [
    `DELETE FROM sync_personal_mesh_registry_cache WHERE sync_device_id NOT IN (${q(local)}, ${q(phone)});`,
    `UPDATE sync_personal_mesh_registry_cache SET device_name = 'Alex''s Mac', last_active_at = ${nowMs} WHERE sync_device_id = ${q(local)};`,
    `INSERT OR REPLACE INTO sync_meta (key, value) VALUES ('sync.localDeviceName', 'Alex''s Mac'), ('sync.discoverable', 'false'), ('sync.browsing', 'false');`,
    `DELETE FROM sync_paired_devices;`,
    `INSERT INTO sync_paired_devices (id, name, platform, version, host, port, shared_secret, paired_at, last_connected) VALUES (${q(phone)}, 'Alex''s iPhone', 'ios', '0.0.9', '', 0, '', ${nowMs - 7 * 864e5}, ${t('16:38')});`,
    `DELETE FROM sync_transfer_history;`
  ]
  const T = [
    ['Acme_rollout_v3.pdf', 'send', 'application/pdf', 248312, '16:36'],
    ['Pilot_scope.docx', 'send', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 41920, '16:36'],
    ['Whiteboard_owners_per_stage.jpg', 'receive', 'image/jpeg', 1843200, '16:31'],
    ['Acme_hours_saved.png', 'send', 'image/png', 45120, '16:22'],
    ['Qwen 3.5 4B', 'send', 'application/vnd.offgrid.model', 2_740_000_000, '15:52']
  ]
  T.forEach(([name, dir, mime, bytes, hhmm], i) => {
    sql.push(`INSERT INTO sync_transfer_history (request_id, device_id, device_name, direction, file_name, bytes_transferred, total_bytes, completed_at, mime_type, kind, status, updated_at) VALUES ('ws-xfer-${i}', ${q(phone)}, 'Alex''s iPhone', '${dir}', ${q(name)}, ${bytes}, ${bytes}, ${t(hhmm)}, '${mime}', NULL, 'completed', ${t(hhmm)});`)
  })
  sqlite(sql.join('\n'))
}

// Screenshot staging for Devices (harness only): the status the Devices screen reads, with the
// cast's Mac and a connected iPhone instead of the license's real seat registry and LAN peers.
export async function stageDevices(ctx, nowMs) {
  const phone = '9d25c24e4b6a2753dcc08a89b0342194'
  const t = (hhmm) => at(hhmm, 0, nowMs)
  const transfers = [
    ['Acme_rollout_v3.pdf', 'send', 'application/pdf', 248312, '16:36'],
    ['Pilot_scope.docx', 'send', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 41920, '16:36'],
    ['Whiteboard_owners_per_stage.jpg', 'receive', 'image/jpeg', 1843200, '16:31'],
    ['Acme_hours_saved.png', 'send', 'image/png', 45120, '16:22'],
    ['Qwen 3.5 4B', 'send', 'application/vnd.offgrid.model', 2_740_000_000, '15:52']
  ].map(([fileName, direction, mimeType, bytes, hhmm], i) => ({
    requestId: `ws-xfer-${i}`, deviceId: phone, deviceName: "Alex's iPhone", direction, fileName,
    bytesTransferred: bytes, totalBytes: bytes, completedAt: t(hhmm), updatedAt: t(hhmm), mimeType, status: 'completed'
  }))
  await ctx.app.evaluate(({ ipcMain }, { phone, transfers, now }) => {
    const m = ipcMain._invokeHandlers
    const orig = globalThis.__wsSyncStatus ?? m.get('pro:sync:status')
    globalThis.__wsSyncStatus = orig
    m.set('pro:sync:status', async (e, ...a) => {
      const s = await orig(e, ...a)
      const mac = s.localDevice?.id
      s.localDevice = { ...s.localDevice, name: "Alex's Mac", host: '' }
      s.discovered = []; s.pairingAttempts = []; s.repairDeviceIds = []; s.issueByDeviceId = {}
      s.discoverable = false; s.browsing = false
      s.paired = [{ id: phone, name: "Alex's iPhone", platform: 'ios', version: '0.0.9', host: '', port: 0, pairedAt: now - 7 * 864e5, lastSeenAt: now - 60e3 }]
      s.connectedIds = [phone]
      s.routeByDeviceId = { [phone]: 'lan' }
      s.completedTransfers = transfers
      const reg = s.entitlementReconciliation?.registry
      if (reg) {
        reg.installations = reg.installations.filter((i) => i.syncDeviceId === mac || i.syncDeviceId === phone)
          .map((i) => ({ ...i, deviceName: i.syncDeviceId === mac ? "Alex's Mac" : "Alex's iPhone", lastActiveAt: now - 60e3 }))
        s.entitlementReconciliation.installations = reg.installations.length
        s.entitlementReconciliation.copy = { ...s.entitlementReconciliation.copy, description: `${reg.installations.length} of 5 installations registered.` }
      }
      return s
    })
  }, { phone, transfers, now: nowMs })
}

// AI activity: a clean log of the day's model calls (the seed's own demo calls carry absolute paths).
export function seedAiLogs(ctx, nowMs) {
  const { sqlite } = ctx
  const t = (hhmm) => at(hhmm, 0, nowMs)
  const rows = [
    ['text', 'Chat', 'Qwen 3.5 9B', 'Metal', '16:12', 2140, 'What did I promise Sam on the kickoff call?', 'You promised Sam three things: the revised rollout plan by Friday, an owner for every stage, and a check-in next Tuesday at 10:00.'],
    ['embedding', 'Memory search', 'all-MiniLM-L6-v2', 'Metal', '16:12', 96, 'What did I promise Sam on the kickoff call?', '384-dimension vector'],
    ['text', 'Day journal', 'Qwen 3.5 9B', 'Metal', '15:40', 6210, 'Write my journal for this day, in first person, from the facts below.', 'The day turned on the 10:00 Acme Corp pilot kickoff with Sam Okafor…'],
    ['vision', 'Screen capture', 'Gemma 4 E4B', 'Metal', '14:21', 1830, 'Describe what is on screen: Slack #acme-pilot', 'Tom confirmed he will sign off the Acme gateway policy by Monday.'],
    ['text', 'Summarise', 'Qwen 3.5 9B', 'Metal', '12:06', 3120, 'Summarise PIL-42 for Sam', 'PIL-42 tracks the Acme Corp pilot review: owners per stage, gateway policy sign-off, week 6 metric.'],
    ['text', 'Draft reply', 'Qwen 3.5 9B', 'Metal', '11:05', 4480, 'Draft the reply to Sam from this morning’s kickoff.', 'Hi Sam, Thanks for this morning. Confirming what we agreed on the kickoff call…'],
    ['transcription', 'Meeting', 'Whisper Large v3 Turbo', 'Metal', '10:41', 38400, 'Acme Corp pilot kickoff (38 min audio)', 'Them: Morning, Alex. Priya and Tom are on too, so we can settle the dates today…'],
    ['image', 'Image', 'DreamShaper XL Turbo', 'Metal', '09:52', 7900, 'A misty alpine lake at sunrise, snow-capped peak', '1024×1024 PNG']
  ]
  const sql = ['DELETE FROM ai_request_logs;']
  rows.forEach(([modality, source, model, backend, hhmm, ms, input, output], i) => {
    const id = `ws-ai-${i}`, startedAt = t(hhmm)
    const request = modality === 'text' ? { messages: [{ role: 'user', content: input }] } : { input }
    const response = modality === 'text' ? { content: output } : { output }
    const detail = { id, modality, source, model, backend, status: 'completed', startedAt, preview: input, request, finishedAt: startedAt + ms, durationMs: ms, response }
    const summary = { id, modality, source, model, backend, status: 'completed', startedAt, preview: input, durationMs: ms }
    sql.push(`INSERT INTO ai_request_logs (id, parent_id, started_at, duration_ms, modality, status, model, backend, search, summary, detail, bytes) VALUES ('${id}', NULL, ${startedAt}, ${ms}, '${modality}', 'completed', ${q(model)}, ${q(backend)}, ${q([source, model, backend, input, output].join(' '))}, ${q(JSON.stringify(summary))}, ${q(JSON.stringify(detail))}, ${JSON.stringify(detail).length});`)
  })
  sqlite(sql.join('\n'))
}

export const LEARNED = [
  "Don't suggest marketing or promo emails.",
  'Northwind board items go to Daniel Cole only.',
  'Acme pilot replies go to Sam Okafor, with Priya Nair in copy.',
  'Keep check-ins to 30 minutes, on Tuesdays or Thursdays.',
  'Draft customer emails short, with owners and dates in a list.'
].join('\n')

// Chats in the Acme Corp pilot project, each answer citing the kickoff and the rollout plan.
export function seedChats(ctx, nowMs) {
  const { sqlite } = ctx
  const one = (sql) => (JSON.parse(sqlite(sql, true) || '[]')[0] ?? {})
  const kickoff = one("SELECT id, started_at AS ts FROM meetings WHERE title = 'Acme Corp pilot kickoff'")
  const pdf = one("SELECT id, image_path, CAST(strftime('%s', ts) AS INTEGER) * 1000 AS ts FROM frames WHERE app = 'Preview' ORDER BY ts DESC LIMIT 1")
  const mail = one("SELECT id, image_path, CAST(strftime('%s', ts) AS INTEGER) * 1000 AS ts FROM frames WHERE app = 'Mail' ORDER BY ts LIMIT 1")
  const S = {
    kickoff: { kind: 'meeting', refId: kickoff.id, title: 'Acme Corp pilot kickoff', snippet: 'You’ll have the revised rollout plan by Friday, with an owner for every stage. And let’s hold a check-in next Tuesday at 10:00.', surface: 'Meetings', ts: kickoff.ts, imagePath: null },
    pdf: { kind: 'screen', refId: pdf.id, title: 'Acme_rollout_v3.pdf', snippet: 'Three stages: 10 laptops in week 1, all 40 seats from week 2. Success metric: hours saved per person per week.', surface: 'Preview', ts: pdf.ts, imagePath: pdf.image_path },
    agenda: { kind: 'screen', refId: mail.id, title: 'Re: Acme Corp pilot kickoff agenda', snippet: 'Sam wants the start date, seat count and owners settled on the call.', surface: 'Mail', ts: mail.ts, imagePath: mail.image_path }
  }
  const doc = (name, pages) => ({ name, kind: 'pdf', documentId: name, pages })
  const C = [
    ['ws-chat-promise', 'What did I promise Sam?', '16:10', 'What did I promise Sam on the kickoff call?',
      'In the 10:00 Acme Corp pilot kickoff you made Sam Okafor three promises [S1]:\n\n1. **The revised rollout plan by Friday.** It updates Acme_rollout_v3.pdf, which starts the pilot on 14 November with 40 seats [S2].\n2. **An owner for every stage.** Priya Nair runs the rollout, Tom Reyes signs off the gateway policy and Maya Chen runs onboarding [S1].\n3. **A check-in call next Tuesday at 10:00.** Sam agreed: “Tuesday at 10 is good.” [S1]\n\nSam asked for exactly these before the call [S3]. Nothing has gone to him yet.',
      { unified: [S.kickoff, S.pdf, S.agenda] }],
    ['ws-chat-reply', 'Draft the reply to Sam', '11:04', 'Draft the reply to Sam from this morning’s kickoff.',
      'Here is a reply to Sam Okafor, drafted from the 10:00 kickoff [S1] and Acme_rollout_v3.pdf [S2]:\n\n**To:** Sam Okafor <sam@acme.example>\n**Subject:** Acme Corp pilot: 14 November start\n\n> Hi Sam,\n>\n> Thanks for this morning. Confirming what we agreed on the kickoff call:\n>\n> - The pilot starts on 14 November with 40 seats: 10 laptops in your product team in week 1, all 40 from week 2.\n> - Priya Nair owns the rollout, Tom Reyes signs off the gateway policy before the start, and Maya Chen runs onboarding.\n> - We measure hours saved per person per week, in week 6.\n>\n> You will have the revised rollout plan with owners per stage by Friday. I have held next Tuesday at 10:00 for our check-in.\n>\n> Best,\n> Alex\n\nWant me to send it from Gmail? Nothing goes out until you approve it.',
      { unified: [S.kickoff, S.pdf] }],
    ['ws-chat-translate', 'Translate the reply for Sam’s team', '11:30', 'Translate this into Spanish for Sam’s team. Keep names, dates and numbers exactly as they are.',
      'Aquí tienes la traducción. Los nombres, las fechas y las cifras no cambian.\n\n> Hola, Sam:\n>\n> Gracias por esta mañana. Confirmo lo que acordamos en la reunión inicial:\n>\n> - El piloto comienza el 14 de noviembre con 40 puestos: 10 portátiles de vuestro equipo de producto en la semana 1 y los 40 a partir de la semana 2.\n> - Priya Nair dirige el despliegue, Tom Reyes aprueba la política de la pasarela antes del inicio y Maya Chen se encarga de la incorporación.\n> - Mediremos las horas ahorradas por persona y semana, en la semana 6.\n>\n> Tendrás el plan de despliegue revisado, con un responsable por etapa, el viernes. He reservado el próximo martes a las 10:00 para nuestra revisión.\n>\n> Un saludo,\n> Alex\n\nSin cambios: **Acme Corp, Sam, Priya Nair, Tom Reyes, Maya Chen, 14 de noviembre, 40 puestos, martes 10:00**.',
      {}],
    ['ws-chat-summary', 'Summary of the rollout plan', '12:20', 'Summarise Acme_rollout_v3.pdf with page numbers.',
      '**Acme_rollout_v3.pdf** (6 pages) [S1]\n\n- **Goal (p. 1):** show that Off Grid AI saves Acme’s team time on meeting follow-ups, with no data leaving their laptops.\n- **Stages (p. 2):** 10 laptops in the product team in week 1, all 40 seats from week 2, approved email and issue drafts from week 5.\n- **Security (p. 3):** everything runs on-device; the local gateway only reaches internal tools once Tom Reyes approves the policy.\n- **Roles (p. 4):** Priya Nair owns the rollout, Tom Reyes the gateway review, Sam Okafor is Acme’s sponsor.\n- **Success metric (p. 5):** hours saved per person per week on meeting follow-ups, measured in week 6 against the October baseline.\n- **Cadence (p. 6):** check-in with Sam every Tuesday at 10:00, and a decision on extending after week 12.\n\nOne gap: the plan does not yet name an owner for onboarding.',
      { unified: [S.pdf], attachments: [doc('Acme_rollout_v3.pdf', 6)] }],
    ['ws-chat-compare', 'Rollout plan v2 vs v3', '12:40', 'Compare rollout plan v2 with v3. What changed?',
      'Here is what changed from v2 to v3 [S1]:\n\n- **Start date:** 7 Nov → **14 Nov**\n- **Seats:** 25 → **40**\n- **First stage:** all 25 at once → **10 laptops in the product team in week 1**, all 40 from week 2\n- **Local gateway:** not in scope → **on for internal tools once Tom Reyes signs off**\n- **Success metric:** “hours saved” → **hours saved per person per week, measured in week 6**\n- **Owners:** “TBD” → **Priya Nair** (rollout), **Tom Reyes** (gateway), **Maya Chen** (onboarding)\n\nIn short, v3 starts a week later with more seats, a staged rollout and a clearer success measure.',
      { unified: [S.pdf], attachments: [doc('Acme_rollout_v2.pdf', 5), doc('Acme_rollout_v3.pdf', 6)] }],
    ['ws-chat-checklist', 'Launch checklist for 14 Nov', '13:05', 'Turn the pilot scope into a launch checklist for 14 Nov.',
      'Launch checklist for the Acme Corp pilot [S1] [S2]:\n\n**Before 14 Nov**\n- [ ] Rollout plan v3 shared with Sam\n- [ ] Tom signs off the gateway policy\n- [ ] Priya confirms the 10 laptops for week 1\n- [ ] Agree the hours-saved baseline with Sam\n\n**Week 1**\n- [ ] Install Off Grid AI on the 10 product-team laptops\n- [ ] Turn on meeting notes and follow-ups\n\n**Week 2**\n- [ ] Expand to all 40 seats\n- [ ] Open the local gateway for internal tools\n\n**Week 6**\n- [ ] Measure hours saved per person per week and review it with Sam',
      { unified: [S.pdf, S.kickoff], attachments: [doc('Acme_rollout_v3.pdf', 6), doc('Pilot_scope.docx', 2), doc('Security_review_notes.pdf', 3)] }]
  ]
  // Images the user attached (vision) and one the app generated, kept inside the profile.
  const up = path.join(ctx.profileDir, 'uploads'); fs.mkdirSync(up, { recursive: true })
  const img = (name) => { const dst = path.join(up, name); fs.copyFileSync(path.join(WS, 'frames', name), dst); return dst }
  const genDir = path.join(ctx.profileDir, 'generated-images')
  const gen = fs.existsSync(genDir) ? fs.readdirSync(genDir).filter((f) => f.endsWith('.png')).map((f) => path.join(genDir, f)).sort((a, b) => fs.statSync(b).size - fs.statSync(a).size) : []
  C.push(
    ['ws-chat-vision-chart', 'What does this chart show?', '14:55', 'What does this chart show? Anything I should flag to Sam before the pilot review?',
      'This chart shows hours spent per person per week on meeting follow-ups at Acme, against the October baseline of **3.1 hours** [S1].\n\n- **Week 2:** 2.2 hours, about 30% less\n- **Week 4:** 1.7 hours\n- **Week 5:** 1.4 hours\n- **Week 6 target:** 1.2 hours\n\nWorth flagging to Sam:\n\n1. **The week 6 bar is a target, not a measurement.** Label it as such in the review.\n2. **Weeks 2 to 4 are the 10-laptop product team only.** The 40-seat numbers start in week 2 of the full rollout.\n3. **“Hours saved” is defined per person per week,** matching what you agreed on the kickoff call.',
      { unified: [S.kickoff] }, img('chart.png')],
    ['ws-chat-vision-page', 'When does the pilot start?', '10:52', 'When does the pilot start, and who owns the rollout?',
      'The pilot starts on **14 November** with 10 laptops in Acme’s product team, then all **40 seats** from week 2 [S1].\n\n**Priya Nair** owns the rollout. Tom Reyes signs off the gateway policy before the start, and Sam Okafor is Acme’s sponsor.',
      { unified: [S.pdf] }, img('preview.png')],
    ['ws-chat-vision-compare', 'What changed between v2 and v3?', '12:44', 'What changed between v2 and v3 of the rollout timeline?',
      'Comparing the two timelines (v2 → v3):\n\n- **Start:** 7 Nov → **14 Nov**\n- **Seats:** 25 at once → **10 in week 1, 40 from week 2**\n- **Gateway:** not in scope → **internal tools, after Tom’s sign-off**\n- **Owners:** TBD → **Priya, Tom and Maya**\n- **Review:** week 4 → **week 6, measured in hours saved**\n\nIn short: a week later, more seats, a staged start, and named owners.',
      {}, img('slide.png')]
  )
  C.push(['ws-chat-web', 'Team pricing for 40 people', '15:39', 'Use Web Use to compare Team pricing for 40 people on Leafline, Quillworks and Pinecrest Notes. Recommend one.',
    'Here is Team pricing for 40 people, read from each vendor’s pricing page:\n\n| Plan | Per user / month | 40 people / month | Admin controls |\n| --- | --- | --- | --- |\n| Leafline Team | $10 | **$400** | Yes |\n| Quillworks Team | $12 | $480 | Yes |\n| Pinecrest Notes Team | $6.40 (billed yearly) | $256 | No |\n\n**Recommendation: Leafline Team.** It is the cheapest plan billed monthly that includes admin controls, and it covers up to 50 people, so the pilot can grow. Pinecrest is cheaper but bills a year up front and has no admin controls.',
    { taskResult: { taskId: 'ws-web-compare', kind: 'web_use', status: 'done', url: 'https://pinecrest.example/pricing' } }, null])
  if (gen.length) C.push(['ws-chat-image', 'Cabin at dawn', '09:52', 'A serene off-grid cabin on a forested mountain at dawn, misty valley, warm light',
    'Generated for: A serene off-grid cabin on a forested mountain at dawn, misty valley, warm light', { image: gen[0], imageMetadata: { width: 1024, height: 1024, steps: 8, cfgScale: 2, seed: 4117, model: 'DreamShaper XL Turbo' } }, null])
  const sql = [`DELETE FROM projects WHERE id = 'offgrid-demo';`, `DELETE FROM rag_messages WHERE conversation_id NOT IN (SELECT id FROM rag_conversations WHERE project_id IS NULL AND surface IS NOT NULL);`, `DELETE FROM rag_conversations WHERE NOT (project_id IS NULL AND surface IS NOT NULL);`]
  for (const [id, title, hhmm, question, answer, context, userImage] of C) {
    const t0 = at(hhmm, 0, nowMs)
    sql.push(`INSERT INTO rag_conversations (id, title, created_at, updated_at, project_id, surface) VALUES ('${id}', ${q(title)}, '${utc(t0)}', '${utc(t0 + 9000)}', 'demo-acme-pilot', NULL);`)
    sql.push(`INSERT INTO rag_messages (conversation_id, role, content, context, created_at, uuid) VALUES ('${id}', 'user', ${q(question)}, ${userImage ? q(JSON.stringify({ image: userImage })) : 'NULL'}, '${utc(t0)}', '${id}-q');`)
    sql.push(`INSERT INTO rag_messages (conversation_id, role, content, context, created_at, uuid) VALUES ('${id}', 'assistant', ${q(answer)}, ${q(JSON.stringify(context))}, '${utc(t0 + 9000)}', '${id}-a');`)
  }
  sqlite(sql.join('\n'))
}

// Ares (God) conversations: the morning briefing, board prep, and what is waiting.
export function seedGod(ctx, nowMs) {
  const { sqlite } = ctx
  const kickoff = (JSON.parse(sqlite("SELECT id, started_at AS ts FROM meetings WHERE title = 'Northwind quarterly update'", true) || '[]')[0]) ?? {}
  const C = [
    ['ws-god-brief', 'What should I do first today?', '08:50', 'What should I do first today?',
      'Start with **the 10:00 Acme Corp pilot kickoff**. Sam Okafor wants the start date, seat count and owners settled on the call.\n\nAfter that:\n\n- **Reply to Sam** with what you agree. I will draft it from the call.\n- **Approve Maya’s denser Day timeline,** due today.\n- **Draft the Q3 risk list for Daniel** before the 4:30 Northwind board prep.\n\nThree approvals are waiting on the right. Nothing will be sent until you approve it.', {}],
    ['ws-god-prep', 'Prep for Northwind board prep', '16:05', 'Prep me for the Northwind board prep',
      'Northwind board prep starts at **4:30** with Daniel Cole [S1].\n\n**Last time (Q3 update, Monday)**\n- Daniel asked for the private-inference metrics and an enterprise proof point before the board meeting [S1].\n- You agreed to bring the Acme Corp pilot as that proof point.\n\n**What is new since**\n- The Acme pilot now starts on **14 November with 40 seats**, with a week 6 hours-saved measure.\n- Tom signs off the gateway policy by Monday.\n\n**Bring**\n- The Q3 board brief (waiting for your approval to send).\n- The three risks: hiring, gateway security, pilot timing.\n\nOpen with the risk list, since that is the item Daniel still owes the board.',
      { unified: [{ kind: 'meeting', refId: kickoff.id, title: 'Northwind quarterly update', snippet: 'Daniel asked for the private-inference metrics and an enterprise proof point before the board meeting.', surface: 'Meetings', ts: kickoff.ts, imagePath: null }] }],
    ['ws-god-waiting', 'What is waiting for me?', '15:10', 'What is waiting for me?',
      '**Three approvals need you**\n\n1. **Share the Q3 board brief with Daniel Cole** before the 4:30 board prep.\n2. **Create a Linear issue** for the revised Acme rollout plan, with owners per stage.\n3. **Invite Sam Okafor** to the weekly pilot check-in, Tuesdays at 10:00.\n\n**You are waiting on**\n\n- **Priya Nair:** an owner for every rollout stage, due Friday.\n- **Tom Reyes:** the gateway policy sign-off, due Monday.\n\nApprove them on the right, or tell me what to change in a draft first.', {}]
  ]
  const sql = [`DELETE FROM rag_messages WHERE conversation_id IN (SELECT id FROM rag_conversations WHERE surface = 'god');`, `DELETE FROM rag_conversations WHERE surface = 'god';`]
  for (const [id, title, hhmm, question, answer, context] of C) {
    const t0 = at(hhmm, 0, nowMs)
    sql.push(`INSERT INTO rag_conversations (id, title, created_at, updated_at, project_id, surface) VALUES ('${id}', ${q(title)}, '${utc(t0)}', '${utc(t0 + 9000)}', NULL, 'god');`)
    sql.push(`INSERT INTO rag_messages (conversation_id, role, content, context, created_at, uuid) VALUES ('${id}', 'user', ${q(question)}, NULL, '${utc(t0)}', '${id}-q');`)
    sql.push(`INSERT INTO rag_messages (conversation_id, role, content, context, created_at, uuid) VALUES ('${id}', 'assistant', ${q(answer)}, ${q(JSON.stringify(context))}, '${utc(t0 + 9000)}', '${id}-a');`)
  }
  sqlite(sql.join('\n'))
}

// Ares's scheduled tasks and rules, set through the app's own IPC.
export const GOD_RULES = 'Never send anything to Acme without asking me first\nKeep replies short, with owners and dates in a list\nNorthwind board items go to Daniel Cole only\nNever book anything over $200'
export const ROUTINES = [
  { title: 'Weekday briefing', instruction: 'Every weekday at 8:50, brief me on my day: meetings, what is due, and what is waiting for my approval.', schedule: { kind: 'daily', time: '08:50', days: [1, 2, 3, 4, 5] } },
  { title: 'Meeting prep', instruction: 'Fifteen minutes before a meeting, prep me with last time’s notes, open items and sources.', schedule: { kind: 'event', on: 'meeting_soon', match: '' } },
  { title: 'Acme pilot check-in notes', instruction: 'Every Tuesday at 9:30, draft the agenda for the 10:00 Acme pilot check-in with Sam.', schedule: { kind: 'daily', time: '09:30', days: [2] } },
  { title: 'Approvals digest', instruction: 'When something waits for my approval, tell me what it is and why it is waiting.', schedule: { kind: 'event', on: 'approval_waiting', match: '' } }
]
export async function seedRoutines(ctx) {
  await ctx.page.evaluate(async (rs) => {
    for (const r of await window.api.proInvoke('god:routines:list')) await window.api.proInvoke('god:routines:delete', r.id)
    for (const r of rs) await window.api.proInvoke('god:routines:create', r)
  }, ROUTINES)
}

// Vault: created with a throwaway test password (kept in ws/.vault-test-password), filled with the
// cast's items, then locked so the journey can show locked → typing → open.
export const vaultPassword = () => {
  const f = path.join(WS, '.vault-test-password')
  if (!fs.existsSync(f)) fs.writeFileSync(f, crypto.randomBytes(18).toString('base64url'), { mode: 0o600 })
  return fs.readFileSync(f, 'utf8').trim()
}
export async function seedVault(ctx) {
  const items = [
    { type: 'login', title: 'Acme partner portal', username: 'alex@offgrid.example', password: 'demo-Portal-4471', url: 'https://partners.acme.example', folder: 'Acme Corp' },
    { type: 'login', title: 'Northwind Capital data room', username: 'alex@offgrid.example', password: 'demo-DataRoom-2290', url: 'https://dataroom.northwind.example', folder: 'Northwind' },
    { type: 'login', title: 'Linear', username: 'alex@offgrid.example', password: 'demo-Linear-8812', url: 'https://linear.app', folder: 'Work' },
    { type: 'key', title: 'Acme gateway key', password: 'og_live_demo_9f3c2a7d41b84e06', notes: 'Local gateway key for the Acme pilot laptops.', folder: 'Acme Corp' },
    { type: 'secure-note', title: 'Acme pilot Wi-Fi', notes: 'Network: ACME-PILOT\nPassword: demo-wifi-1411\nFloor 4, Harbor Street office', folder: 'Acme Corp' }
  ]
  const files = [['acme-gateway.env', 'Acme gateway .env'], ['Acme_rollout_v3.pdf', 'Acme MSA (signed)']]
  const bytes = Object.fromEntries(files.map(([f]) => [f, [...fs.readFileSync(path.join(WS, 'frames', f))]]))
  await ctx.page.evaluate(async ({ pw, items, files, bytes }) => {
    const inv = window.api.proInvoke
    const st = await inv('vault:status')
    if (st?.status === 'not_initialized') await inv('vault:init', pw); else await inv('vault:unlock', pw)
    for (const e of (await inv('vault:entries:list'))?.entries ?? []) await inv('vault:entries:delete', e.uuid)
    for (const it of items) await inv('vault:entries:add', it)
    for (const [f, title] of files) {
      const s = await inv('vault:files:stage-dropped', f, new Uint8Array(bytes[f]))
      if (s?.ok) await inv('vault:files:add', title, s.token)
    }
    await inv('vault:lock')
  }, { pw: vaultPassword(), items, files, bytes })
}

// Web Use: a finished three-vendor price comparison (one screenshot per step) and a demo request
// paused at sign-in, plus the chat that asked for the comparison.
export function seedWebTasks(ctx, nowMs) {
  const { sqlite, profileDir } = ctx
  const snaps = path.join(profileDir, 'task-run-snapshots'); fs.mkdirSync(snaps, { recursive: true })
  const local = sqlite("SELECT value FROM sync_meta WHERE key = 'sync.localDevice'").trim()
  const shot = (page, name) => { const dst = path.join(snaps, name); fs.copyFileSync(path.join(WS, 'frames', 'wu', page + '.png'), dst); return dst }
  const task = (id, title, status, summary, hhmm, steps, url, urlTitle) => {
    const t0 = at(hhmm, 0, nowMs)
    const plan = { version: 1, phases: steps.map((s, i) => ({ id: String(i + 1), title: s[0] })) }
    const stepsJson = [`TASK PLAN · ${JSON.stringify(plan)}`, ...steps.flatMap((s, i) => [`TASK PHASE · ${i + 1}`, s[0]])]
    const details = steps.map(([title, page, result], i) => ({
      stepId: String(i + 1), at: t0 + (i + 1) * 9000, phase: status === 'done' || i < steps.length - 1 ? 'complete' : 'waiting', decisionSummary: title,
      execution: { status: status === 'done' || i < steps.length - 1 ? 'complete' : 'waiting', result: result ?? title },
      ...(page ? { screenshot: { path: shot(page, `${id}-${i + 1}.png`), availability: 'device_local', executionDeviceId: local, executionDeviceName: "Alex's Mac", originalWidth: 2560, originalHeight: 1600, inferenceWidth: 1280, inferenceHeight: 800 } } : {})
    }))
    const last = details.filter((d) => d.screenshot).at(-1)?.screenshot.path ?? null
    return `INSERT INTO task_run_history (task_id, journey_id, model_id, model_name, kind, title, status, summary, steps_json, started_at, finished_at, updated_at, execution_device_id, execution_device_name, phase, current_step, current_action, last_url, last_title, screenshot_path, screenshot_device_id, step_details_json) VALUES ('${id}', '${id}', 'qwen3.5-9b', 'Qwen 3.5 9B', 'web_use', ${q(title)}, '${status}', ${q(summary)}, ${q(JSON.stringify(stepsJson))}, ${t0}, ${status === 'done' ? t0 + steps.length * 9000 : 'NULL'}, ${t0 + steps.length * 9000}, '${local}', 'Alex''s Mac', '${status === 'done' ? 'complete' : 'waiting'}', ${steps.length}, ${q(steps.at(-1)[0])}, ${q(url)}, ${q(urlTitle)}, ${q(last)}, '${local}', ${q(JSON.stringify(details))});`
  }
  const sql = [`DELETE FROM task_run_history WHERE task_id LIKE 'ws-web-%';`, `UPDATE task_run_history SET started_at = ${at('13:31', 0, nowMs)}, finished_at = ${at('13:32', 0, nowMs)}, updated_at = ${at('13:32', 0, nowMs)} WHERE task_id = 'demo-acme-reminder';`]
  sql.push(task('ws-web-compare', 'Compare Team pricing for 40 people', 'done',
    'Leafline Team is $10 per user a month ($400 for 40), Quillworks $12 ($480), Pinecrest Notes $6.40 billed yearly ($256). Leafline is the cheapest monthly plan with admin controls.', '15:40', [
      ['Open the Leafline pricing page', 'leafline-pricing', 'Opened leafline.example/pricing'],
      ['Read the Team plan price', 'leafline-pricing', 'Team: $10 per user per month, up to 50 people'],
      ['Open the Quillworks pricing page', 'northwind-pricing', 'Opened quillworks.example/pricing'],
      ['Read the Team plan price', 'northwind-pricing', 'Team: $12 per member per month'],
      ['Open the Pinecrest Notes pricing page', 'acme-notes-pricing', 'Opened pinecrest.example/pricing'],
      ['Read the Team plan price', 'acme-notes-pricing', 'Team: $6.40 per user per month, billed yearly'],
      ['Compare for 40 people', null, 'Leafline $400, Quillworks $480, Pinecrest Notes $256 a month']
    ], 'https://pinecrest.example/pricing', 'Pinecrest Notes · Pricing'))
  sql.push(task('ws-web-demo', 'Request a Leafline demo for Tuesday', 'waiting',
    'Waiting for you to sign in to Leafline. Off Grid AI never reads your password.', '16:20', [
      ['Open the Leafline demo page', 'leafline-pricing', 'Opened leafline.example'],
      ['Sign in to Leafline', 'leafline-signin', 'Waiting for you to sign in']
    ], 'https://app.leafline.example/signin', 'Sign in to Leafline'))
  sqlite(sql.join('\n'))
}

// The approval card: the Gmail send of the reply to Sam, waiting in its chat. Seeded only for that shot.
export function seedApprovalCard(ctx, nowMs) {
  const { sqlite } = ctx
  const t0 = at('11:06', 0, nowMs)
  const args = { to: 'Sam Okafor <sam@acme.example>', subject: 'Acme Corp pilot: 14 November start', body: REPLY_BODY }
  sqlite([
    `DELETE FROM approvals WHERE id = 60;`,
    `INSERT INTO approvals (id, title, detail, connector, tool, args, entity_name, source, risk, action_kind, status, result, created_at, decided_at, execution_chat_id, evidence) VALUES (60, 'Send email with Gmail', 'Reply to Sam Okafor, drafted from the 10:00 Acme Corp pilot kickoff.', 'Gmail', 'send_email', ${q(JSON.stringify(args))}, 'Sam Okafor', 'chat', 'mutate', 'email', 'pending', NULL, ${t0}, NULL, 'ws-chat-reply', ${q(JSON.stringify({ surface: 'Zoom', ts: utc(at('10:34', 0, nowMs)), text: 'Acme Corp pilot kickoff. You promised Sam the revised rollout plan by Friday, with an owner for every stage.' }))});`,
    `DELETE FROM rag_messages WHERE uuid = 'ws-chat-reply-ok' OR uuid = 'ws-chat-reply-card';`,
    `INSERT INTO rag_messages (conversation_id, role, content, context, created_at, uuid) VALUES ('ws-chat-reply', 'user', 'Yes, send it from Gmail.', NULL, '${utc(t0)}', 'ws-chat-reply-ok');`,
    `INSERT INTO rag_messages (conversation_id, role, content, context, created_at, uuid) VALUES ('ws-chat-reply', 'assistant', 'Ready to send. Approve, edit or reject it below. Nothing goes out until you approve it.', ${q(JSON.stringify({ executionApproval: { approvalId: 60, title: 'Send email with Gmail', detail: 'To Sam Okafor <sam@acme.example>', status: 'pending' } }))}, '${utc(t0 + 3000)}', 'ws-chat-reply-card');`
  ].join('\n'))
}
export function clearApprovalCard(ctx) {
  ctx.sqlite(`DELETE FROM approvals WHERE id = 60; DELETE FROM rag_messages WHERE uuid IN ('ws-chat-reply-ok', 'ws-chat-reply-card');`)
}
