---
layout: default
title: Vision
parent: Ethos
nav_order: 1
description: Off Grid AI is the operating system of a knowledge worker. Remember everything locally, recall it precisely, and act with scoped permission. Access without surrender.
---

<div class="fx vision" markdown="0">

<style>
/* Vision page — structural layout only (effects live in fx.css). Built on the
   site's own CSS variables, so it matches the site and flips light/dark. */
.vision .v-kick{font-size:.72rem;letter-spacing:.22em;text-transform:uppercase;font-family:var(--font-mono);margin-bottom:18px;display:inline-block;}
.vision .v-hero{padding:18px 0 6px;position:relative;}
.vision .v-hero .fx-aurora{position:absolute;z-index:0;}
.vision .v-hero h1{font-size:clamp(2rem,5.2vw,3.15rem);line-height:1.05;letter-spacing:-.02em;margin:0 0 18px;}
.vision .v-hero h1 .em{color:var(--accent);}
.vision .v-lede{font-size:1.12rem;color:var(--text-secondary);max-width:42rem;margin:0 0 14px;}
.vision .v-one{display:block;font-family:var(--font-mono);font-size:1.02rem;color:var(--accent);border-left:2px solid var(--accent);padding:6px 0 6px 16px;margin:24px 0 28px;max-width:42rem;}

/* terminal */
.vision .v-term{border:1px solid var(--border);border-radius:var(--radius);background:var(--bg-subtle);overflow:hidden;max-width:42rem;margin:6px 0 0;font-family:var(--font-mono);font-size:.86rem;}
.vision .v-term-bar{display:flex;gap:7px;padding:11px 14px;border-bottom:1px solid var(--border);}
.vision .v-term-bar i{width:11px;height:11px;border-radius:50%;background:var(--bg-hover);}
.vision .v-term-body{padding:18px;color:var(--text-muted);min-height:150px;}
.vision .v-term-body .ln{margin:6px 0;opacity:0;transform:translateY(4px);}
.vision .v-term-body .ln.show{opacity:1;transform:none;transition:.3s ease;}
.vision .v-term .pr{color:var(--accent);}.vision .v-term .cmd{color:var(--text-primary);}
.vision .v-term .warn{color:#d99a2b;}.vision .v-term .ok{color:var(--accent);}

/* sections */
.vision .v-sec{margin:62px 0;}
.vision .v-tag{font-family:var(--font-mono);font-size:.72rem;letter-spacing:.18em;text-transform:uppercase;color:var(--accent);margin-bottom:14px;}
.vision .v-sec h2{font-size:1.7rem;letter-spacing:-.01em;margin:0 0 14px;border:0;padding:0;}
.vision .v-sec p{color:var(--text-secondary);max-width:42rem;}
.vision .v-sec p .hi{color:var(--text-primary);font-weight:600;}

/* compare grid */
.vision .v-split{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--border);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;margin-top:26px;}
.vision .v-split>div{background:var(--bg);padding:22px;}
.vision .v-split h3{font-family:var(--font-mono);font-size:.74rem;letter-spacing:.08em;text-transform:uppercase;margin:0 0 14px;}
.vision .v-split .bad h3{color:var(--text-muted);}.vision .v-split .good h3{color:var(--accent);}
.vision .v-split ul{list-style:none;margin:0;padding:0;}
.vision .v-split li{position:relative;padding:7px 0 7px 22px;color:var(--text-secondary);font-size:.94rem;}
.vision .v-split .bad li::before{content:"\2715";position:absolute;left:0;color:var(--text-muted);}
.vision .v-split .good li::before{content:"\2192";position:absolute;left:0;color:var(--accent);}

/* ladder (component) */
.vision .fx-ladder{margin-top:24px;}
.vision .fx-rung{border:1px solid var(--border);border-left:3px solid var(--border);border-radius:var(--radius);background:var(--bg);margin-bottom:10px;transition:border-color .15s;}
.vision .fx-rung:hover{border-color:var(--text-muted);}
.vision .fx-rung.is-live{border-left-color:var(--accent);}
.vision .fx-rung-head{display:flex;align-items:center;gap:14px;padding:16px 18px;cursor:pointer;}
.vision .fx-rung-n{font-family:var(--font-mono);font-size:.8rem;color:var(--text-muted);width:22px;}
.vision .fx-rung-name{font-size:1.05rem;font-weight:600;flex:1;}
.vision .fx-rung-stat{font-family:var(--font-mono);font-size:.64rem;letter-spacing:.08em;text-transform:uppercase;padding:3px 9px;border:1px solid var(--border);border-radius:99px;color:var(--text-muted);}
.vision .fx-rung.is-live .fx-rung-stat{color:var(--accent);border-color:var(--accent-subtle-border);background:var(--accent-subtle);}
.vision .fx-rung-arrow{color:var(--text-muted);transition:transform .2s;}
.vision .fx-rung.open .fx-rung-arrow{transform:rotate(90deg);color:var(--accent);}
.vision .fx-rung-body{max-height:0;overflow:hidden;transition:max-height .3s ease;}
.vision .fx-rung-body p{color:var(--text-secondary);font-size:.96rem;margin:0;padding:0 18px 0 54px;}
.vision .fx-rung.open .fx-rung-body{max-height:220px;}
.vision .fx-rung.open .fx-rung-body p{padding-bottom:18px;}

/* surfaces */
.vision .v-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:26px;}
.vision .v-card{border:1px solid var(--border);border-radius:var(--radius);background:var(--bg);padding:22px;transition:border-color .15s,transform .15s;}
.vision .v-card:hover{border-color:var(--text-muted);transform:translateY(-3px);}
.vision .v-card .ico{font-family:var(--font-mono);font-size:.68rem;letter-spacing:.1em;text-transform:uppercase;color:var(--accent);margin-bottom:12px;}
.vision .v-card h3{font-size:1.1rem;margin:0 0 8px;}
.vision .v-card p{font-size:.9rem;color:var(--text-secondary);margin:0 0 14px;}
.vision .v-card .pill{display:inline-block;font-family:var(--font-mono);font-size:.64rem;color:var(--accent);border:1px solid var(--accent-subtle-border);background:var(--accent-subtle);padding:2px 9px;border-radius:99px;}

@media (max-width:720px){.vision .v-split,.vision .v-cards{grid-template-columns:1fr;}}
</style>

<div class="v-hero fx-dotbg fx-spot" data-fx-spot data-fx-reveal>
  <div class="fx-aurora" aria-hidden="true"></div>
  <div class="v-kick fx-shine">// the operating system of a knowledge worker</div>
  <h1 class="fx-generate">
    <span>Your</span> <span>tools</span> <span>want</span> <span>your</span> <span>data.</span><br>
    <span>Give</span> <span>them</span> <span class="em">permission</span> <span>instead.</span>
  </h1>
  <p class="v-lede">Every app today must hold your email, your calendar, your conversations to be useful. So you hand your life to a dozen clouds — or you go without.</p>
  <p class="v-lede">Off Grid AI is the layer underneath all of it. It remembers everything <span style="color:var(--text-primary);font-weight:600">on your devices</span>, and rents apps scoped, audited <span style="color:var(--accent)">action</span> — rather than handing over your raw data wholesale.</p>
  <span class="v-one">remember everything locally → recall it precisely → act with scoped permission.</span>
  <div class="hero-buttons">
    <a href="{{ '/early-access' | relative_url }}" class="btn btn-green">Get early access</a>
    <a href="#how-it-works" class="btn btn-outline">See how it works</a>
  </div>
</div>

<div class="v-term fx-beam" data-fx-type data-fx-reveal>
  <div class="v-term-bar"><i></i><i></i><i></i></div>
  <div class="v-term-body">
    <div class="ln"><span class="pr">offgrid ❯</span> <span class="cmd">recall "the pricing thread with Ali"</span></div>
    <div class="ln" data-quick>found 3 sources · email · meeting 06-21 · screen 14:02</div>
    <div class="ln"><span class="pr">offgrid ❯</span> <span class="cmd">draft a reply and log it to the CRM</span></div>
    <div class="ln" data-quick><span class="warn">⏸ proposed action → approval queue</span> (write · Attio, Gmail)</div>
    <div class="ln"><span class="pr">offgrid ❯</span> <span class="ok">approved · sent · logged ✓</span></div>
  </div>
</div>

<div class="v-sec" data-fx-reveal id="why">
  <div class="v-tag">// the problem</div>
  <h2>Access is all-or-nothing. So you lose either way.</h2>
  <p>A CRM can't manage your relationships without deep access to your inbox, calendar, and calls. You <span class="hi">can't safely give it that</span> — so it stays half-blind, and you do the data entry it was supposed to save you. The data and the intelligence end up living in someone else's cloud. You become the guest in a system built on your own life.</p>
  <div class="v-split">
    <div class="bad">
      <h3>The cloud deal</h3>
      <ul>
        <li>Hand over raw email, calendar, files</li>
        <li>Your data is the product</li>
        <li>Intelligence runs on their servers</li>
        <li>You trust a policy, not an architecture</li>
        <li>One breach exposes everything</li>
      </ul>
    </div>
    <div class="good">
      <h3>The Off Grid AI deal</h3>
      <ul>
        <li>Data never leaves your devices</li>
        <li>The model runs locally, on your hardware</li>
        <li>Apps get scoped, approved action</li>
        <li>Every action logged and reversible</li>
        <li>Privacy by architecture, not promise</li>
      </ul>
    </div>
  </div>
  <p style="margin-top:26px"><span class="hi">Access without surrender.</span> The vendor gets the outcome it needs. You keep the data. That inversion is the whole product.</p>
</div>

<div class="v-sec" data-fx-reveal id="how-it-works">
  <div class="v-tag">// how it works</div>
  <h2>One idea, climbing one ladder.</h2>
  <p>An OS that already remembers everything can stop waiting for you to assemble context — and start anticipating it. Each rung is a step from passive memory toward acting on your behalf.</p>
  {% include fx/ladder.html open=2 %}
</div>

<div class="v-sec" data-fx-reveal id="surfaces">
  <div class="v-tag">// three surfaces, one OS</div>
  <h2>It lives where you work.</h2>
  <div class="v-cards">
    <div class="v-card fx-spot" data-fx-spot>
      <div class="ico">desktop</div>
      <h3>The spine</h3>
      <p>Captures your screen, meetings, and work into private memory. Replay your day, reflect on where your attention went, act on what matters.</p>
      <span class="pill">shipping now</span>
    </div>
    <div class="v-card fx-spot" data-fx-spot>
      <div class="ico">mobile</div>
      <h3>In your pocket</h3>
      <p>A full offline AI suite — chat, vision, image generation, voice — running entirely on your phone. No account, no cloud, no subscription.</p>
      <span class="pill">live on iOS &amp; Android</span>
    </div>
    <div class="v-card fx-spot" data-fx-spot>
      <div class="ico">console</div>
      <h3>Across the org</h3>
      <p>A control plane for a fleet of devices. Share scoped intelligence across a team — guardrails, audit, governance — without raw data leaving a device.</p>
      <span class="pill">for teams</span>
    </div>
  </div>
</div>

<div class="v-sec" data-fx-reveal id="local">
  <div class="v-tag">// why local wins</div>
  <h2>A superpower on your device is surveillance in the cloud.</h2>
  <p>An assistant that watches your screen, remembers everything, and acts for you is only safe if it <span class="hi">can't phone home</span>. Local isn't a constraint on the vision — it's the only thing that makes the vision acceptable. The free core is open source (AGPL-3.0) so the foundation is auditable; Off Grid AI Pro is the paid layer on top, closed source but running entirely on your own hardware. Either way there is no server to send your life to.</p>
</div>

<div class="ea-essay-links" data-fx-reveal>
  <a href="{{ '/early-access' | relative_url }}" class="ea-essay-card fx-spot" data-fx-spot>
    <div class="ea-essay-title">Join the waitlist →</div>
    <div class="ea-essay-desc">Run the personal AI OS before anyone else. Early access members get 6 months free.</div>
  </a>
  <a href="{{ '/pro' | relative_url }}" class="ea-essay-card fx-spot" data-fx-spot>
    <div class="ea-essay-title">See Off Grid AI Pro →</div>
    <div class="ea-essay-desc">The layer that sees your day, remembers it, and gets ahead of you — capture, memory, replay, and actions you approve.</div>
  </a>
  <a href="{{ '/console' | relative_url }}" class="ea-essay-card fx-spot" data-fx-spot>
    <div class="ea-essay-title">Off Grid AI Console →</div>
    <div class="ea-essay-desc">The control plane for a whole organization's AI — governed, auditable, on your own infrastructure.</div>
  </a>
</div>

</div>
