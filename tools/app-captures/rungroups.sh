#!/bin/zsh
# rungroups.sh g1,g2  -> runs STATIC groups in the served app with fresh code
W=${0:A:h}
$W/run.sh "const M = await import('$W/journey.mjs?t=' + Date.now()); const J = M.makeJourney(ctx); const log = []; for (const g of '$1'.split(',')) { try { await (M.STATIC[g] ?? M.STATIC2[g])(ctx, J); log.push(g + ' ok') } catch (e) { log.push(g + ' FAILED ' + String(e).slice(0, 400)); await page.screenshot({ path: '$W/dbg/fail-' + g + '.png', scale: 'css' }).catch(() => {}) } } return log.join('\n')"
