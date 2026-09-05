# Off Grid - website

The public Off Grid marketing/content site. Copy is customer-facing - follow the brand guides in `../brand/` before writing a word (outcomes not functionality, speak to the reader as "you"; see `../brand/README.md`).

## Multi-agent operating model (how we build here)

Substantial work is executed by a fleet of parallel subagents orchestrated by the main session - not one linear thread. The standard:

- **Parallel workers, 3 at a time.** Decompose work into worktree-isolated subagents that run concurrently in a rolling window of ~3, each on a DISJOINT file-set so they never merge-conflict. As each lands: review against the engineering standards, merge, run a **local production build gate** (typecheck + tests do NOT catch build/route errors - build before deploy), deploy, verify, then launch the next from the backlog. One agent owns nav/shared-file changes per round; the others avoid them.
- **The gap agent.** Any gap, regression, or "not fully done" is logged to the repo's gaps doc (`docs/GAPS_BACKLOG.md`). A standing gap agent is woken whenever there are gaps: it picks them up, closes them, and marks them resolved with evidence. Gaps are surfaced honestly, never hidden.
- **The QA / platform-integration + docs sweep agent.** After every 3 agent completions, run a sweep agent that (a) verifies the whole platform integrates and works end-to-end (run the integration harness + exercise real cross-service/-surface flows), (b) surfaces any new gaps into the gaps doc, and (c) writes/updates USER-FACING documentation live - how to use / what to do / why / when, per surface - so docs stay current with the build.
- **Merge gate (every merge, non-negotiable):** SOLID + pure logic isolated (unit-testable, zero-IO) separated from I/O; thin handlers; REAL tests exercising real behavior (mocks sparingly); typecheck clean; tests pass; a clean local production build; verify UI by screenshot (vision) and integration by the harness. Nothing is "done" until VERIFIED live, not merely merged.
- **Honesty bar:** report status as a gate (code / wired / verified), never inflate "done." A premature "complete" is a defect.

## Design

Inherit the shared Off Grid design philosophy from `../brand/DESIGN_PHILOSOPHY.md` (the source of truth - brutalist/terminal, Menlo mono, emerald accent, tokens in `@offgrid/design`). Platform specifics: this repo has no separate design doc yet - follow the shared philosophy and the tokens directly.
