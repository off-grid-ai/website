---
layout: default
title: Console
nav_order: 5
nav_group: Products
description: "Off Grid AI Console turns the processes your teams already run into governed AI apps. Work arrives through existing systems, people review only what needs judgment, and every outcome is measured."
---

<div class="early-access-hero">
  <div class="early-access-badge">Off Grid AI Console / Source available</div>
  <h1>Put the intelligence of your entire enterprise behind every person.</h1>
  <p class="early-access-sub">Your teams describe how work should happen. Off Grid AI gives them a working App that already knows your data, follows your rules, uses your tools, and proves what it did.</p>
</div>

<div class="hero-buttons">
  <a href="https://onprem-console.getoffgridai.co" target="_blank" rel="noopener" class="btn btn-green">View the live product</a>
  <a href="https://onprem-console.getoffgridai.co/?book=1" target="_blank" rel="noopener" class="btn btn-outline">Book a call</a>
  <a href="https://github.com/off-grid-ai/OGAC" target="_blank" rel="noopener" class="btn btn-outline">View source</a>
</div>

Runs on your infrastructure. Human review stays where judgment matters. Every result is traced.

---

## A department gets its own working product.

Each team gets an App built around the process it already owns.

1. **Describe the process.** Say what should happen in plain language.
2. **Inherit the company.** Approved data, tools, rules, and access come with it.
3. **Run the real work.** Cases arrive from existing systems. People step in only when needed.
4. **Prove the outcome.** Reports show the result, evidence, approvals, quality, and cost.

---

## The front door matches the job.

Different processes need different ways to begin. The App adapts to the work instead of forcing every team into the same interface.

<div class="early-access-perks">
  <div class="perk-card">
    <div>
      <div class="perk-title">DECISION QUEUE</div>
      <div class="perk-desc">Work arrives from email, WhatsApp, webhooks, and connected systems. The App handles routine steps and waits for you when a decision needs judgment.</div>
    </div>
  </div>
  <div class="perk-card">
    <div>
      <div class="perk-title">JOB / REPORT</div>
      <div class="perk-desc">Run recurring analysis now or on a schedule. The latest result, quality, and next run stay visible.</div>
    </div>
  </div>
</div>

---

## Every App inherits the same enterprise foundation.

Your team sees the work. Off Grid AI handles the controls, context, and infrastructure underneath it.

| Foundation | What your App inherits |
|---|---|
| **Data** | Approved systems, files, knowledge, and lineage |
| **AI runtime** | Models, gateways, tools, and budgets |
| **Governance** | Policy, access, guardrails, and evidence |
| **Insights** | Quality, adoption, drift, and economics |
| **Operations** | Services, fleet, health, and recovery |

---

## Know what happened. Know why.

Every run carries the context a person, operator, or auditor needs to trust the result.

<div class="early-access-perks">
  <div class="perk-card">
    <div>
      <div class="perk-title">Sources</div>
      <div class="perk-desc">See the approved data behind the result.</div>
    </div>
  </div>
  <div class="perk-card">
    <div>
      <div class="perk-title">Decisions</div>
      <div class="perk-desc">Follow each step and the reason it ran.</div>
    </div>
  </div>
  <div class="perk-card">
    <div>
      <div class="perk-title">Human review</div>
      <div class="perk-desc">Keep people at decisions that need judgment.</div>
    </div>
  </div>
  <div class="perk-card">
    <div>
      <div class="perk-title">Quality</div>
      <div class="perk-desc">Catch failed evaluations and drift early.</div>
    </div>
  </div>
  <div class="perk-card">
    <div>
      <div class="perk-title">Evidence</div>
      <div class="perk-desc">Trace approvals, actions, and changes.</div>
    </div>
  </div>
  <div class="perk-card">
    <div>
      <div class="perk-title">Cost</div>
      <div class="perk-desc">Measure what each use case consumes.</div>
    </div>
  </div>
</div>

---

## Follow a real process from work to evidence.

Both environments use synthetic data and are read-only. Tour the product on your own time.

<div class="hero-buttons">
  <a href="https://bharatunion-onprem-console.getoffgridai.co/overview" target="_blank" rel="noopener" class="btn btn-green">Open the bank environment</a>
  <a href="https://suraksha-onprem-console.getoffgridai.co/overview" target="_blank" rel="noopener" class="btn btn-outline">Open the insurer environment</a>
</div>

---

## Five working use cases. Live in 14 days. Zero cost.

Agree on the outcomes first. See them working on your systems. Then decide what comes next.

<div class="hero-buttons">
  <a href="https://onprem-console.getoffgridai.co" target="_blank" rel="noopener" class="btn btn-green">View the live product</a>
  <a href="https://onprem-console.getoffgridai.co/?book=1" target="_blank" rel="noopener" class="btn btn-outline">Book a call</a>
</div>

<script>
  (function() {
    var article = document.querySelector('.content');
    if (!article) return;
    window.__ctaTracked = true;
    article.addEventListener('click', function(event) {
      var link = event.target.closest('a.btn');
      if (!link || !article.contains(link) || typeof posthog === 'undefined') return;
      try {
        posthog.capture('console_cta_click', {
          href: link.href,
          label: link.textContent.trim(),
          source: window.location.pathname
        });
      } catch (error) {
        console.warn('PostHog tracking failed:', error);
      }
    });
  })();
</script>
