---
layout: default
title: Pro
nav_order: 6
nav_group: Products
description: Off Grid AI Pro is a private intelligence layer for your laptop and phone. It captures your day, remembers everything, and drafts the next move, on your own hardware. Live now - own it forever for $69, or $49/year. See every feature and get your key.
---

<div class="early-access-hero">
  <div class="early-access-badge">Off Grid AI Pro · Live now</div>
  <h1>The assistant that<br>was in the room.</h1>
  <p class="early-access-sub">The free app runs models. Off Grid AI Pro adds the layer that sees your day, remembers it, and gets ahead of you, the way a chief of staff would. Always on, on your own hardware. It is live now on your laptop and your phone. You never brief it. It briefs you. Nothing is sent anywhere, because there is no server to send it to.</p>
</div>

<div class="hero-buttons">
  <a href="#buy" class="btn btn-green">Own Off Grid AI Pro forever - ${{ site.data.pricing.lifetime }}</a>
  <a href="#what-pro-is" class="btn btn-outline">See what it does</a>
</div>

<div class="offer-closing" role="note">
  <strong>Off Grid AI Pro is live today on desktop and mobile.</strong> Own it forever for <strong>${{ site.data.pricing.lifetime }}</strong> right now, or pay <strong>${{ site.data.pricing.price }}/{{ site.data.pricing.period }}</strong> if you'd rather not commit. The price climbs as more people join - never down - so today's tier is the lowest it will ever be, and the rate you join at is the rate you hold. The layer that merges your phone and laptop into one is landing through July, and you run each piece the day it ships.
</div>

---

## Get Pro
{: #buy}

{% include pricing-ladder.html %}

<p class="early-access-sub" style="max-width:720px;margin:28px auto 0;">One price covers both your laptop and your phone - a single license key, up to {{ site.data.pricing.devices }} devices, every release included. It runs on your own hardware; nothing you capture leaves your device. Enter your email, check out, and we email your key.</p>

<div class="early-access-form-section ea-form-top">
  <form id="payForm" class="early-access-form" novalidate>
    <input type="email" id="payEmail" class="ea-input" placeholder="your@email.com" autocomplete="email" aria-invalid="false" aria-describedby="payStatus" required>
    <div class="ea-buy-row">
      <button type="button" class="ea-submit" data-plan="lifetime" disabled>Own it forever - ${{ site.data.pricing.lifetime }}</button>
      <button type="button" class="ea-submit ea-submit-alt" data-plan="annual" disabled>Or ${{ site.data.pricing.price }}/{{ site.data.pricing.period }}</button>
    </div>
    <div class="ea-form-footer">
      <p class="ea-pricing-note">one key for desktop + mobile · up to {{ site.data.pricing.devices }} devices · we email your key</p>
    </div>
    <p class="ea-status" id="payStatus" aria-live="polite"></p>
  </form>
  <p class="ea-slack-direct">
    Have a promo code? Enter it on the checkout page before you pay. Checkout is handled by RevenueCat. Nothing on this page touches your devices, your models, or your data.
  </p>
</div>

---

## Do the math

<div class="early-access-perks">
  <div class="perk-card">
    <div class="perk-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
    </div>
    <div>
      <div class="perk-title">The price only goes up</div>
      <div class="perk-desc">Lifetime is <strong>${{ site.data.pricing.lifetime }}</strong> today. As more people join, it steps up toward <strong>${{ site.data.pricing.top_lifetime }}</strong> - never down. Own it at today's tier and that is the price you paid, forever. The earlier you are, the less you pay, for good.</div>
    </div>
  </div>
  <div class="perk-card">
    <div class="perk-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    </div>
    <div>
      <div class="perk-title">Every release, included</div>
      <div class="perk-desc">Your ${{ site.data.pricing.lifetime }} covers everything Off Grid AI Pro does today and everything it adds next, including the cross-device layer landing through July. One license key, good on up to {{ site.data.pricing.devices }} devices, no renewal and no upgrade fee.</div>
    </div>
  </div>
  <div class="perk-card">
    <div class="perk-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
    </div>
    <div>
      <div class="perk-title">Working today, not a promise</div>
      <div class="perk-desc">Off Grid AI Pro is already live on desktop and mobile. You pay, the license key lands in your inbox, and you unlock it in minutes on both. You are buying a product you can run tonight, not a roadmap.</div>
    </div>
  </div>
  <div class="perk-card">
    <div class="perk-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    </div>
    <div>
      <div class="perk-title">100,000 already run the free app</div>
      <div class="perk-desc">The open-source core has 100K downloads. Off Grid AI Pro extends it, it does not replace it. Privacy first: it all runs on your own hardware, and your data does not leave your device.</div>
    </div>
  </div>
</div>

---

## What Pro is

You do not remember what you did last Tuesday. Your laptop does.

Pro is a quiet record of your work that you can actually ask. It watches the meeting, reads the thread, sees the ticket, then files all of it into one local memory you can search, replay, and act on. The model runs in your laptop's own memory. No cloud round trips, no account, no API key.

A personal chief of staff used to be a privilege. The compute to run one now sits in your bag. Pro is that layer, private and in your hands, not rented from a company that reads your mail.

It moves through four stages: it **sees**, it **remembers**, it **acts**, and then it gets **ahead of you**.

---

## It sees

Capture is one primitive, always your choice. Pro only sees what you let it see, per device, with a visible recording indicator. Pause it from the menu bar anytime. Off grid means in your control, not just off the cloud.

<div class="early-access-perks">
  <div class="perk-card">
    <div class="perk-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
    </div>
    <div>
      <div class="perk-title">Screen capture, on device</div>
      <div class="perk-desc">It quietly takes in what you see and do, turns it into text, and remembers it. Opt-in per device, with a recording indicator and a pause button in the menu bar. The pixels and the text never leave your disk.</div>
    </div>
  </div>
  <div class="perk-card">
    <div class="perk-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
    </div>
    <div>
      <div class="perk-title">Meetings, recorded and transcribed</div>
      <div class="perk-desc">It detects when a call starts, records it, transcribes it, and separates who said what, all on device. The decisions and the action items are searchable the moment the call ends. No bot joins your meeting. No audio is uploaded.</div>
    </div>
  </div>
  <div class="perk-card">
    <div class="perk-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
    </div>
    <div>
      <div class="perk-title">Source of truth, not screenshots</div>
      <div class="perk-desc">When you open a Notion page or a Linear issue, Pro pulls the real thing from the source, on device, instead of guessing from pixels. It learns what you care about from what you look at, then fetches the accurate version.</div>
    </div>
  </div>
</div>

---

## It remembers

A second brain only works if you feed it. This one feeds itself. Capture, meetings, email, Notion, Linear, and Jira flow into one local memory without you copy-pasting anything.

<div class="early-access-perks">
  <div class="perk-card">
    <div class="perk-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2z"/></svg>
    </div>
    <div>
      <div class="perk-title">It never forgets</div>
      <div class="perk-desc">Everything you see and do becomes memory you keep, even after you switch tools. Your conversations across ChatGPT, Claude, and Gemini end up in one place that is yours. Switch apps whenever you want. Your memory stays.</div>
    </div>
  </div>
  <div class="perk-card">
    <div class="perk-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
    </div>
    <div>
      <div class="perk-title">One search across everything</div>
      <div class="perk-desc">Search your entire work life, not one app at a time. The message, the page, the meeting, the screen from last week, all in one place that only you can read. The end of where did that go.</div>
    </div>
  </div>
  <div class="perk-card">
    <div class="perk-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    </div>
    <div>
      <div class="perk-title">A CRM that builds itself</div>
      <div class="perk-desc">Pro maps the people, projects, and companies you work with, and what is open with each, with cross-source summaries. A relationship graph you never have to update, because it updates itself from what you already do.</div>
    </div>
  </div>
  <div class="perk-card">
    <div class="perk-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
    </div>
    <div>
      <div class="perk-title">Replay your whole day</div>
      <div class="perk-desc">Scrub through your day like a recording. Every screen, in order, on device. The thing you swear you saw three hours ago is right there. The rear-view, in full resolution.</div>
    </div>
  </div>
</div>

---

## It reflects

Not hours logged. Mind share. Pro shows what you actually spent the day thinking about.

<div class="early-access-perks">
  <div class="perk-card">
    <div class="perk-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    </div>
    <div>
      <div class="perk-title">Where your time really went</div>
      <div class="perk-desc">You start no timer and tag nothing. At day's end the breakdown is just there: 4h on the rewrite, 50m on Slack, 30m you will wish you had back, and how many times you context-switched to get it.</div>
    </div>
  </div>
  <div class="perk-card">
    <div class="perk-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
    </div>
    <div>
      <div class="perk-title">Your day, laid out</div>
      <div class="perk-desc">Open your laptop and the day is already planned: your meetings, the tickets that matter, what to protect focus for, and who you are about to meet. The rear-view becomes the windshield.</div>
    </div>
  </div>
</div>

---

## It acts, you approve

Pro can draft the reply, file the ticket, update the doc. It never does it on its own. Every action is a proposal you approve, and every approval is logged. This is not an open-ended agent you hand the keys to. It is structured, with guardrails you set, so you stay in control.

<div class="early-access-perks">
  <div class="perk-card">
    <div class="perk-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
    </div>
    <div>
      <div class="perk-title">Approval-gated actions</div>
      <div class="perk-desc">Drafts and changes land in a queue. You read, edit, and approve before anything leaves your device. Nothing acts on the world without your sign-off, and the sign-off is recorded.</div>
    </div>
  </div>
  <div class="perk-card">
    <div class="perk-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
    </div>
    <div>
      <div class="perk-title">To-dos, found not written</div>
      <div class="perk-desc">You wrote we need to ship X by Friday in an email. Pro noticed and put it on a list. It finds the commitments you make and the asks aimed at you, across everything you touch.</div>
    </div>
  </div>
  <div class="perk-card">
    <div class="perk-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
    </div>
    <div>
      <div class="perk-title">Skills automation</div>
      <div class="perk-desc">Set a trigger, set an action. On a schedule, on a keyword, on an event. Pro runs the routine for you and routes anything that touches the outside world through the same approval gate.</div>
    </div>
  </div>
  <div class="perk-card">
    <div class="perk-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.59 13.41a1.998 1.998 0 0 1 0-2.83l4.24-4.24a4 4 0 0 1 5.66 5.66l-1.41 1.41"/><path d="M13.41 10.59a1.998 1.998 0 0 1 0 2.83l-4.24 4.24a4 4 0 0 1-5.66-5.66l1.41-1.41"/></svg>
    </div>
    <div>
      <div class="perk-title">Connectors that read and write</div>
      <div class="perk-desc">Slack, Gmail, Calendar, Notion, Linear, Jira, GitHub, any MCP server, connected in one click. Read tools run freely. Write tools route to the approval queue. You approve every action that leaves the machine.</div>
    </div>
  </div>
</div>

---

## It gets ahead of you

Imagine opening your laptop and the day is already laid out. The 9am is with someone you have not spoken to in three months. There is an open item you never closed. A draft reply is waiting for the email you have been avoiding. You did not ask for any of it. It noticed, because it was there with you all day.

That is the proactive secretary. It does not wait to be opened. It briefs you on the day, surfaces what matters, and drafts the next move before you remember you owe it. Every draft is still yours to approve.

---

## Built for people who build

Pro is tuned for software, design, and product. It speaks issues, PRs, cycles, and tickets, not generic tasks. Linear, Jira, GitHub, Sentry, and Vercel connect in one click. The context that makes the rest useful is the context you already work in.

---

## Sync: one brain across your devices, landing through July

Your laptop knows your work. Your phone knows your life. Today neither has the full picture. Off Grid AI Sync is the private backbone that closes the loop, and it is rolling out through July 2026.

When it lands, captures, memory, and context move device to device over your own network, never through a cloud relay. Your work and your life merge into one model of your day, and it is one you alone can read. Buy now and every piece arrives the day it ships, at no extra cost.

<div class="early-access-perks">
  <div class="perk-card">
    <div class="perk-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
    </div>
    <div>
      <div class="perk-title">Device to device, no relay</div>
      <div class="perk-desc">Your phone and laptop sync over your own network, never a server in the middle. There is no cloud copy to leak, subpoena, or train on. The transfer is between your devices and no one else.</div>
    </div>
  </div>
  <div class="perk-card">
    <div class="perk-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
    </div>
    <div>
      <div class="perk-title">Merges while you sleep</div>
      <div class="perk-desc">You set nothing up each day. The two devices reconcile in the background, so the morning briefing already has both your work and your life in it. One picture, ready before you open the lid.</div>
    </div>
  </div>
  <div class="perk-card">
    <div class="perk-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
    </div>
    <div>
      <div class="perk-title">Your phone, a Pro device</div>
      <div class="perk-desc">Off Grid AI Mobile adds Pro voice mode, MCP servers like Linear and Notion, and draft email and calendar actions you approve, all on device. Everything you do there is yours, and joins your laptop's memory once Sync lands.</div>
    </div>
  </div>
  <div class="perk-card">
    <div class="perk-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/><path d="M7 9l3 3 4-5"/></svg>
    </div>
    <div>
      <div class="perk-title">Full intelligence in your pocket</div>
      <div class="perk-desc">Chat, image, vision, voice, and documents run locally on the phone itself, no laptop required. The same memory you capture on the desktop is there in your hand, so the assistant has the full picture wherever you are.</div>
    </div>
  </div>
</div>

---

## Private by architecture, not by policy

Most private AI still uploads your screen to someone's cloud. Pro runs the model in your laptop's own memory.

No training on your data. No selling it. No server to leak. Privacy first: it all runs on your own hardware, and your data does not leave your device.

---

## How checkout works

You enter your email and we send you to RevenueCat's hosted checkout with that email attached. Once you pay, we email a license key to that address. Enter the key in the app to unlock Off Grid AI Pro on up to {{ site.data.pricing.devices }} devices, on desktop and mobile, right away.

Have a promo code? Apply it on the checkout page, before you pay. The price updates once the code is accepted.

Own it for **${{ site.data.pricing.lifetime }}** - about a year and a half of the yearly price up front, then it's yours forever with no renewal, every release included. Off Grid AI Pro is live today on both platforms, so you get it the moment you enter your key. Own it at today's tier and that is the price you hold - it only steps up as more people join, toward ${{ site.data.pricing.top_lifetime }}, never down.

Not ready to commit? Choose **${{ site.data.pricing.price }}/{{ site.data.pricing.period }}** at checkout instead - a smaller step in. It renews once a year, cancel anytime and you keep using the version you paid for, and it climbs with the ladder too, toward ${{ site.data.pricing.top_price }}/{{ site.data.pricing.period }}.

<div class="hero-buttons">
  <a href="#buy" class="btn btn-green">Own Off Grid AI Pro forever - ${{ site.data.pricing.lifetime }}</a>
</div>

---

## For companies: Off Grid Console

Pro is the personal layer. Companies have a different problem: knowing what AI runs across the org, on what data, at what cost, and whether it is safe. That is a separate product, the Off Grid Console.

The Console is the control plane for agentic AI. One gateway every model call and agent passes through, so you can route it, observe it, cost it, and kill-switch it. The end of shadow AI. PII and prompt-injection screening on every request, role-based access to models and tools, a private RAG brain over your own docs with verified citations, agent evals and drift detection, and an append-only audit trail a regulator can defend.

It runs on your own infrastructure, built entirely on open source. No per-token fees, no per-seat AI licence, nothing routed through a server we own.

Console is licensed separately from Pro. Buying Pro does not include it, and you do not need Pro to run it.

<div class="hero-buttons">
  <a href="https://onprem-console.getoffgridai.co" target="_blank" rel="noopener" class="btn btn-green">Explore Off Grid Console</a>
</div>

<div class="ea-essay-links">
  <a href="#buy" class="ea-essay-card">
    <div class="ea-essay-title">Get Pro →</div>
    <div class="ea-essay-desc">Own Off Grid AI Pro forever for ${{ site.data.pricing.lifetime }} today, or ${{ site.data.pricing.price }}/{{ site.data.pricing.period }} if you'd rather not commit. The price climbs as we grow - never down. Join now and hold it for good. Existing members get every new piece free.</div>
  </a>
  <a href="{{ '/vision' | relative_url }}" class="ea-essay-card">
    <div class="ea-essay-title">Read the vision →</div>
    <div class="ea-essay-desc">What the world looks like when intelligence is ambient, personal, and private, on the hardware you already own.</div>
  </a>
</div>

<script src="{{ '/assets/js/revenuecat-link.js' | relative_url }}"></script>
<script>
  (function() {
    // One RevenueCat purchase link per product; the buttons carry data-plan.
    var LINKS = {
      annual: {{ site.revenuecat_link_annual | jsonify }},
      lifetime: {{ site.revenuecat_link_lifetime | jsonify }}
    };
    var form = document.getElementById('payForm');
    var emailInput = document.getElementById('payEmail');
    var buttons = form ? form.querySelectorAll('button[data-plan]') : [];
    var status = document.getElementById('payStatus');
    if (!form || !window.RevenueCatLink) return;

    function setEnabled() {
      var ok = emailInput.value.trim() !== '';
      buttons.forEach(function(b) { b.disabled = !ok; });
    }
    // Sync on load too - the browser may autofill or restore the field without
    // firing an input event.
    setEnabled();

    function clearError() {
      emailInput.classList.remove('ea-input-error');
      emailInput.setAttribute('aria-invalid', 'false');
      if (status.classList.contains('ea-status-error')) {
        status.textContent = '';
        status.className = 'ea-status';
      }
    }

    function showError(message) {
      emailInput.classList.add('ea-input-error');
      emailInput.setAttribute('aria-invalid', 'true');
      status.textContent = message;
      status.className = 'ea-status ea-status-error';
    }

    emailInput.addEventListener('input', function() { setEnabled(); clearError(); });

    buttons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var plan = btn.dataset.plan;
        var email = emailInput.value.trim();
        if (!RevenueCatLink.isValidEmail(email)) {
          showError('Enter a valid email address.');
          emailInput.focus();
          return;
        }
        var url = RevenueCatLink.buildPurchaseUrl(LINKS[plan], email);
        if (!url) {
          showError('Checkout is not available right now. Please try again later.');
          return;
        }
        if (typeof posthog !== 'undefined') {
          // Never let an analytics failure (blocked, errored) stop the purchase.
          try {
            posthog.identify(email, { email: email });
            posthog.capture('pro_checkout_started', {
              email: email,
              plan: plan,
              source: window.location.pathname
            });
          } catch (err) {
            console.warn('PostHog tracking failed:', err);
          }
        }
        status.innerHTML = 'Checkout opened in a new tab. <a href="' + url + '" target="_blank" rel="noopener">Reopen it</a> if your browser blocked the popup.';
        status.className = 'ea-status ea-status-success';
        window.open(url, '_blank');
      });
    });
  })();
</script>

<script>
  // Track Pro page CTA clicks (buttons + cards), tagged with the section they
  // sit in (nearest preceding heading) so we can see which features drive intent.
  (function() {
    var article = document.querySelector('.content');
    if (!article) return;

    function sectionFor(el) {
      var node = el;
      while (node && node !== article) {
        var sib = node.previousElementSibling;
        while (sib) {
          if (/^H[1-4]$/.test(sib.tagName)) return sib.textContent.replace(/#$/, '').trim();
          sib = sib.previousElementSibling;
        }
        node = node.parentElement;
      }
      return 'page';
    }

    window.__ctaTracked = true; // opt out of the layout's generic cta_click; this page tracks its own
    article.addEventListener('click', function(e) {
      var link = e.target.closest('a.btn, a.ea-essay-card');
      if (!link || !article.contains(link)) return;
      var href = link.getAttribute('href') || '';
      var destination = href.indexOf('#buy') !== -1 ? 'buy'
        : href.indexOf('/vision') !== -1 ? 'vision'
        : href.indexOf('console') !== -1 ? 'console'
        : href;
      var label = (link.querySelector('.ea-essay-title') || link).textContent
        .replace(/→/g, '').replace(/#$/, '').trim();
      if (typeof posthog === 'undefined') return;
      try {
        posthog.capture('pro_cta_click', {
          destination: destination,
          href: href,
          label: label,
          section: sectionFor(link),
          source: window.location.pathname
        });
      } catch (err) {
        console.warn('PostHog tracking failed:', err);
      }
    });
  })();
</script>
