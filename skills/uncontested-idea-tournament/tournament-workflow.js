export const meta = {
  name: 'uncontested-idea-tournament',
  description: "5 rival agents pitch online-income ideas nobody is doing yet, then hunt competitors in each other's ideas for 10 rounds",
  phases: [
    { title: 'R1 Pitch', detail: 'each agent kills its own crowded candidates, pitches 2 survivors' },
    { title: 'R2 Competitor hunt' },
    { title: 'R3 Demand' },
    { title: 'R4 Hunt II + platform risk', detail: 'then cut to 5' },
    { title: 'R5 Money' },
    { title: 'R6 Distribution' },
    { title: 'R7 Build & risk', detail: 'then cut to 3' },
    { title: 'R8 Copycat & moat' },
    { title: 'R9 Final kill attempt' },
    { title: 'R10 Final vote' },
  ],
}

const PERSONAS = [
  { key: 'CLOCK', name: 'The Clock-Watcher',
    lens: `Gaps opened in the last 12 months by something that changed: a law or regulation that started applying in 2025-2026 (EU, UK, US states, India), a platform policy change, an API launched or shut down, a new device or AI capability. A new obligation or new possibility means nobody has productized it yet. Read effective dates, deprecation notices, changelogs.`,
    style: `Impatient. Thinks every other idea is two years late.` },
  { key: 'MINER', name: 'The Long-Tail Miner',
    lens: `Tiny, specific audiences (one profession, one hobby, one niche software ecosystem, one kind of small business) too small for funded companies to bother with: a $1k-$10k/month ceiling. Mine Reddit, niche forums, Discords, Facebook groups, GitHub issues and Stack Exchange for "is there a tool that...", "I wish someone made...", "does anyone know an app for..." threads that got no good answer.`,
    style: `Patient, quotes real forum posts, sneers at big vague markets.` },
  { key: 'SLEUTH', name: 'The Workaround Sleuth',
    lens: `Proven spending, missing product: people already pay for an ugly workaround (recurring Fiverr/Upwork gigs, VAs doing a repetitive task, a spreadsheet passed around a community, a manual service, a consultant producing the same deliverable over and over) where no dedicated product exists. Demand is proven by money already moving.`,
    style: `Follows the money. Calls ideas without paying customers "hobbies".` },
  { key: 'MACHINE', name: 'The Machine-Customer Hunter',
    lens: `Buyers and needs that did not exist two years ago: people building with AI agents, MCP servers, Claude Code / Cursor / Codex users, local-model runners, teams fighting for AI-search visibility, businesses adapting to AI agents as customers (agent-readable catalogs, agent payments), and the new chores all of that creates. Builder-to-builder products a developer can ship fast.`,
    style: `Fast-talking, technical, mocks pre-AI thinking.` },
  { key: 'DATA', name: 'The Boring-Data Prospector',
    lens: `Assets nobody has assembled because it is tedious: public but scattered data (government registers, filings, recalls, notices, tariffs, standards, permit records, public changelogs, price lists) turned into a searchable database, alert service, API or comparison that a specific buyer will pay for. "Nobody does it" because it is boring, not because nobody wants it.`,
    style: `Dry, precise, distrusts anything without a dataset behind it.` },
]

const FOUNDER = `TODAY is 2026-10-14.
THE FOUNDER you are finding money for:
- Solo developer based in India, selling online to US/UK/global buyers (Indian buyers too if that is where the gap is).
- Ships fast with Claude Code; comfortable with TypeScript, Cloudflare Workers, small web apps, browser extensions, APIs, processing public data, SEO tool pages. Has run Meta ads and Instagram.
- Budget: under about $300 to start. Wants first revenue within 90 days; $1,000+/month within 6 months would be a real win.
- Collects money through a merchant of record (Lemon Squeezy, Paddle, Gumroad, Dodo Payments) or Razorpay/PayPal; do not assume a US company or US bank.
- Ideas must be legal, within platform terms of service, and must not deceive or exploit anyone. No regulated advice that needs a licence.
- The founder's complaint: almost every idea they were given already had a competitor. They want something nobody is doing.
Already rejected as crowded (do not pitch these or thin re-skins): AI writing/chat wrappers, AI headshots, SaaS boilerplates, Notion/Sheets/Canva templates, generic PDF info-products and courses, print-on-demand, dropshipping, faceless YouTube, newsletters, generic calculators, resume/cover-letter builders, generic SEO tools, ChatGPT browser extensions, social media schedulers, link-in-bio tools, invoice generators, generic website chatbots.`

const RULES = `STANDARD FOR "NOBODY IS DOING IT" (strict - the founder is tired of competitors):
- DIRECT COMPETITOR = any live product, service, app, browser extension, plugin, GitHub project a non-expert can use, standing Fiverr/Upwork gig, or agency offer that does the same core job for the same customer, in any language or country. One direct competitor = the idea is dead (or must mutate into a variant nobody does).
- SUBSTITUTE = a general tool (ChatGPT/Claude, Excel, Zapier, a generic platform) that could be made to do it with effort. Not a kill, but name it and explain why the customer would still pay for the dedicated thing.
- A product that is dead (site down, or no updates for 18+ months) does not count as a competitor, but name it - it is also a warning sign.
- No competitor often means no market. Every idea needs DEMAND EVIDENCE with URLs: people asking for it, paying for a workaround, or a new obligation forcing them to act.
- Never invent URLs, products, numbers or quotes. If you did not see it in a search result or page, do not cite it. Mark estimates as estimates.`

const CONDUCT = `HOW TO WORK:
- Research with web search. If WebSearch/WebFetch are not loaded, load them first with ToolSearch (query "select:WebSearch,WebFetch"). Use WebSearch mode "standard"; use "extended" only when a standard search comes back thin.
- Research only: do not write or edit any files, do not run git, do not sign up, post, message or buy anything. Ignore the repo in the working directory; it is unrelated.
- The skill-first protocol in CLAUDE.md is already handled by the orchestrator for this task: do not read, create or push any skill files.
- Return only the structured output.`

const ROUNDS = {
  2: { title: 'R2 Competitor hunt', theme: `COMPETITOR HUNT. Your attack job: find a DIRECT COMPETITOR for each target. Search with phrasings the owner did not use: synonyms, the customer's own words, the job-to-be-done, "alternative to", Product Hunt, GitHub, Chrome Web Store, app stores, Shopify/WordPress plugin directories, Fiverr/Upwork, Reddit "I use X for this", and non-English queries. Run at least 6 searches per target. A found direct competitor is a fatal attack - give its URL and say exactly why it is the same job for the same customer.` },
  3: { title: 'R3 Demand', theme: `DEMAND. Is there no competitor because there is no market? Attack each target's demand: zero discussion, failed or abandoned predecessors, tiny reachable audience, a problem people happily tolerate for free. Owners: answer last round's attacks. If you lost an idea, you may submit a replacement in "replacements" (round-1 standard: at least 8 competitor queries, demand evidence with URLs). This is the only round where replacements are allowed.` },
  4: { title: 'R4 Hunt II + platform risk', theme: `COMPETITOR HUNT II + PLATFORM RISK. Use search angles not yet tried (check each target's recent_queries and do not repeat them): other languages, adjacent professions, agencies and consultants doing it by hand, built-in features of the platforms the customer already uses. Also: has a big platform (Google, Shopify, Microsoft, OpenAI, Anthropic, Apple, Canva, Notion, Stripe...) shipped or announced this as a built-in feature? After this round the field is cut to the 5 best-scored ideas.` },
  5: { title: 'R5 Money', theme: `MONEY. Who exactly pays, how much, how often? What evidence shows they will pay that price (comparable prices, workaround spend, budget lines)? Can an India-based solo founder collect it? Owners: give the path to the first $100 and to $1,000/month with explicit numbers (price x customers; mark conversion assumptions as estimates). Attack: untested price, buyer cannot or will not pay, lifetime value too low, payment-rail problems.` },
  6: { title: 'R6 Distribution', theme: `DISTRIBUTION. How does a solo founder with about $0 ad budget reach the first 50 paying customers? Owners: name exact places (specific subreddits, forums, directories, marketplaces, communities, search queries with buyer intent) and check their self-promotion rules. Attack: buyer unreachable, communities ban promotion, search demand near zero, sales cycle too long for 90 days.` },
  7: { title: 'R7 Build & risk', theme: `BUILD & RISK. Can one developer with Claude Code ship a sellable first version in 4 weeks or less? Attack: dependencies on APIs that can be revoked or are expensive, scraping or terms-of-service problems, data licensing, regulated advice or licensing needs, liability if the output is wrong, ongoing manual work that will not scale. After this round the field is cut to the 3 best-scored ideas.` },
  8: { title: 'R8 Copycat & moat', theme: `COPYCAT & MOAT. If this works, how fast can someone clone it, and why does the founder still win (data, distribution, speed, niche trust, integrations)? Also run a fresh competitor sweep on every target with at least 5 phrasings nobody has tried yet.` },
  9: { title: 'R9 Final kill attempt', theme: `FINAL KILL ATTEMPT + PLAN. Last chance to kill: sweep every finalist that is not yours with at least 6 brand-new phrasings (other languages, marketplaces, GitHub, app and extension stores, agencies). Owners: put a 14-day validation plan in "owner_plans": a pre-sell or smoke test, the exact numbers that would mean "kill it", and the first-dollar target.` },
}

const IDEA_PROPS = {
  name: { type: 'string' },
  one_liner: { type: 'string', description: 'What it is, for whom, in one sentence' },
  customer: { type: 'string', description: 'Exactly who pays (role, situation, size)' },
  problem: { type: 'string' },
  product: { type: 'string', description: 'What the founder builds or sells, concretely' },
  why_nobody: { type: 'string', description: 'Why nobody is doing it yet (timing, too small, too boring, too new...)' },
  price_model: { type: 'string' },
  first_customers: { type: 'string', description: 'Where the first 10 paying customers come from' },
  build_days: { type: 'number' },
  competitor_queries: { type: 'array', items: { type: 'string' }, description: 'Every search query you ran to look for competitors' },
  closest_things: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, url: { type: 'string' }, why_not_same: { type: 'string' } }, required: ['name', 'url', 'why_not_same'] } },
  substitutes: { type: 'string' },
  demand_evidence: { type: 'array', items: { type: 'object', properties: { url: { type: 'string' }, signal: { type: 'string' } }, required: ['url', 'signal'] } },
  risks: { type: 'string' },
}
const IDEA = { type: 'object', properties: IDEA_PROPS, required: Object.keys(IDEA_PROPS) }

const R1_SCHEMA = {
  type: 'object',
  properties: {
    ideas: { type: 'array', items: IDEA, minItems: 2, maxItems: 2 },
    candidates_killed: { type: 'array', items: { type: 'object', properties: { candidate: { type: 'string' }, killed_by: { type: 'string', description: 'Competitor name and URL, or other reason' } }, required: ['candidate', 'killed_by'] } },
    statement: { type: 'string', description: 'Your in-character opening line, under 60 words' },
  },
  required: ['ideas', 'candidates_killed', 'statement'],
}

const SCORE = { type: 'number', minimum: 0, maximum: 10 }
const ROUND_SCHEMA = {
  type: 'object',
  properties: {
    defenses: { type: 'array', items: { type: 'object', properties: {
      idea_id: { type: 'string' }, action: { type: 'string', enum: ['rebut', 'mutate', 'concede'] }, reply: { type: 'string' }, mutated_idea: IDEA,
    }, required: ['idea_id', 'action', 'reply'] } },
    replacements: { type: 'array', items: IDEA },
    hunts: { type: 'array', items: { type: 'object', properties: {
      idea_id: { type: 'string' }, queries: { type: 'array', items: { type: 'string' } }, found: { type: 'string', description: 'What the searches turned up, including "nothing direct"' },
    }, required: ['idea_id', 'queries', 'found'] } },
    attacks: { type: 'array', items: { type: 'object', properties: {
      idea_id: { type: 'string' },
      kind: { type: 'string', enum: ['direct_competitor', 'no_demand', 'no_money', 'unreachable', 'unbuildable', 'legal_or_tos', 'platform_risk', 'copycat', 'other'] },
      severity: { type: 'string', enum: ['fatal', 'serious', 'minor'] },
      claim: { type: 'string' }, evidence_urls: { type: 'array', items: { type: 'string' } },
    }, required: ['idea_id', 'kind', 'severity', 'claim', 'evidence_urls'] } },
    scores: { type: 'array', items: { type: 'object', properties: {
      idea_id: { type: 'string' }, uncontested: SCORE, demand: SCORE, money: SCORE, fit: SCORE, note: { type: 'string' },
    }, required: ['idea_id', 'uncontested', 'demand', 'money', 'fit', 'note'] } },
    owner_plans: { type: 'array', items: { type: 'object', properties: {
      idea_id: { type: 'string' }, plan_14_days: { type: 'string' }, presell_test: { type: 'string' }, kill_criteria: { type: 'string' }, first_dollar_target: { type: 'string' },
    }, required: ['idea_id', 'plan_14_days', 'presell_test', 'kill_criteria', 'first_dollar_target'] } },
    statement: { type: 'string', description: 'Your in-character debate line for this round, under 60 words' },
  },
  required: ['defenses', 'replacements', 'hunts', 'attacks', 'scores', 'owner_plans', 'statement'],
}

const FINAL_SCHEMA = {
  type: 'object',
  properties: {
    ranking: { type: 'array', items: { type: 'string' }, description: 'Finalist ids NOT owned by you, best first' },
    verdicts: { type: 'array', items: { type: 'object', properties: {
      idea_id: { type: 'string' }, verdict: { type: 'string' }, biggest_risk: { type: 'string' }, would_bet_90_days: { type: 'boolean' },
    }, required: ['idea_id', 'verdict', 'biggest_risk', 'would_bet_90_days'] } },
    final_statement: { type: 'string' },
  },
  required: ['ranking', 'verdicts', 'final_statement'],
}

const W = { u: 0.35, d: 0.25, m: 0.2, f: 0.2 }
const trunc = (s, n) => { s = String(s == null ? '' : s); return s.length > n ? s.slice(0, n) + '...' : s }
const clamp = x => Math.max(0, Math.min(10, Number(x) || 0))
const round1 = x => Math.round(x * 10) / 10
const round2 = x => Math.round(x * 100) / 100

const ideas = {}
const notes = []
let pendingAttacks = {}

const live = () => Object.values(ideas).filter(i => i.status === 'alive')
const find = id => ideas[id] || ideas[String(id || '').toUpperCase().trim()]

function addIdea(owner, data, round) {
  const p = PERSONAS[owner]
  const n = Object.values(ideas).filter(i => i.owner === owner).length + 1
  const id = `${p.key}-${n}`
  ideas[id] = {
    id, owner, ownerKey: p.key, version: 1, born: round, data, status: 'alive',
    history: [`R${round} pitched by ${p.key}`], queries: [...(data.competitor_queries || [])],
    hunts: [], hunters: {}, attacks: [], scoresByRound: {}, lastScore: null, lastBreakdown: null, plan: null, killedReason: null,
  }
  return id
}

function view(i) {
  const d = i.data
  return {
    id: i.id, owner: i.ownerKey, version: i.version,
    name: d.name, one_liner: d.one_liner, customer: trunc(d.customer, 300), problem: trunc(d.problem, 400), product: trunc(d.product, 500),
    why_nobody: trunc(d.why_nobody, 400), price_model: trunc(d.price_model, 300), first_customers: trunc(d.first_customers, 300),
    build_days: d.build_days, substitutes: trunc(d.substitutes, 300), risks: trunc(d.risks, 300),
    closest_things: (d.closest_things || []).slice(0, 8),
    demand_evidence: (d.demand_evidence || []).slice(0, 8),
    competitor_queries_so_far: i.queries.length,
    rival_search_counts: i.hunters,
    recent_queries: i.queries.slice(-25),
    history: i.history.slice(-14),
    last_avg_score: i.lastScore, last_breakdown: i.lastBreakdown,
    plan: i.plan,
  }
}

function header(a) {
  const p = PERSONAS[a]
  return `You are ${p.name} (${p.key}), one of 5 rival agents in a 10-round tournament to find the founder an online income idea that NOBODY is doing yet. The other four are CLOCK, MINER, SLEUTH, MACHINE and DATA minus you.
Your hunting lens: ${p.lens}
Your debate style: ${p.style}
Be adversarial and evidence-driven, no polite filler - but stay honest: concede when evidence is real, and never inflate a rival's flaw.

${FOUNDER}

${RULES}`
}

function r1Prompt(a) {
  return `${header(a)}

ROUND 1 of 10 - PITCH.
Hunt through your lens. Process: brainstorm at least 8 candidate ideas, run competitor searches on each (for every idea you keep, at least 8 differently-worded queries: product-style names, the customer's own words, "tool for", "app for", "alternative to", Product Hunt, GitHub, Chrome Web Store, app stores, Fiverr/Upwork, Reddit, non-English), kill every candidate that has a direct competitor, and keep the 2 strongest survivors that also have real demand evidence. List the killed candidates and what killed them in "candidates_killed" - the founder wants to see them.
Your rivals will spend the next 9 rounds trying to find a competitor you missed, and every one they find costs you. Pitch only what you have checked.

${CONDUCT}`
}

function targetsFor(a, r) {
  const others = live().filter(i => i.owner !== a)
  if (others.length <= 4) return others.map(i => i.id)
  const offsets = r % 2 === 0 ? [1, 2] : [3, 4]
  const picked = others.filter(i => offsets.includes((i.owner - a + 5) % 5))
  return (picked.length ? picked : others.slice(0, 2)).map(i => i.id)
}

function roundPrompt(a, r) {
  const mine = live().filter(i => i.owner === a)
  const others = live().filter(i => i.owner !== a)
  const myAttacks = mine.map(i => ({ idea_id: i.id, attacks_last_round: pendingAttacks[i.id] || [] }))
  const targets = targetsFor(a, r)
  return `${header(a)}

ROUND ${r} of 10 - ${ROUNDS[r].theme}

${mine.length ? `YOUR LIVE IDEAS (defend them: one entry in "defenses" per idea that was attacked; you may also mutate an unattacked idea to make it stronger):
${JSON.stringify(mine.map(view), null, 1)}

ATTACKS ON YOUR IDEAS FROM LAST ROUND:
${JSON.stringify(myAttacks, null, 1)}

Defense options: "rebut" (with evidence: why the cited thing is not the same job for the same customer), "mutate" (give the full new version in "mutated_idea": a narrower or shifted variant that escapes the attack; run fresh competitor searches for it and list them in its competitor_queries), or "concede" (the idea dies). Rebutting a real direct competitor will cost you in everyone's scores.` : `You have no live ideas left. You fight on as a pure attacker and judge; leave "defenses" empty.`}

YOUR ATTACK TARGETS THIS ROUND: ${JSON.stringify(targets)}
For each target, record the searches you ran in "hunts" (even when they found nothing - that record matters) and put every real problem you found in "attacks".

SCORE every rival idea below (all of them, not only your targets) from 0-10 on: uncontested (10 = verified nobody does it), demand (10 = strong evidence people want and look for it), money (10 = clear willingness to pay a useful price), fit (10 = this founder can build and sell it in 90 days with ~$300). Score honestly.

RIVAL IDEAS:
${JSON.stringify(others.map(view), null, 1)}

${r === 9 ? 'This round, fill "owner_plans" for each of your live ideas.' : 'Leave "owner_plans" empty this round.'}
${r === 3 ? `Replacements: allowed this round only if you have fewer than 2 live ideas (at most ${Math.max(0, 2 - mine.length)}). Count ideas you concede this round as lost.` : 'Leave "replacements" empty this round.'}

${CONDUCT}`
}

function applyRound(r, results) {
  const next = {}
  results.forEach((res, a) => {
    if (!res) { log(`R${r}: ${PERSONAS[a].key} did not report`); return }
    const key = PERSONAS[a].key
    for (const d of res.defenses || []) {
      const i = find(d.idea_id)
      if (!i || i.owner !== a || i.status !== 'alive') continue
      if (d.action === 'concede') {
        i.status = 'killed'
        i.killedReason = `R${r}: ${key} conceded - ${trunc(d.reply, 300)}`
        i.history.push(`R${r} ${key} CONCEDED: ${trunc(d.reply, 250)}`)
        log(`R${r}: ${i.id} "${trunc(i.data.name, 60)}" conceded by ${key}`)
      } else if (d.action === 'mutate' && d.mutated_idea) {
        i.version += 1
        i.data = d.mutated_idea
        i.queries.push(...(d.mutated_idea.competitor_queries || []))
        i.history.push(`R${r} ${key} MUTATED to v${i.version} "${trunc(d.mutated_idea.name, 80)}": ${trunc(d.reply, 250)}`)
      } else {
        i.history.push(`R${r} ${key} rebutted: ${trunc(d.reply, 300)}`)
      }
    }
  })
  if (r === 3) {
    results.forEach((res, a) => {
      if (!res) return
      let room = 2 - live().filter(i => i.owner === a).length
      for (const d of res.replacements || []) {
        if (room <= 0) break
        room -= 1
        const id = addIdea(a, d, r)
        log(`R3: ${PERSONAS[a].key} entered replacement ${id} "${trunc(d.name, 60)}"`)
      }
    })
  }
  const tally = {}
  results.forEach((res, a) => {
    if (!res) return
    const key = PERSONAS[a].key
    notes.push({ round: r, agent: key, text: res.statement })
    for (const h of res.hunts || []) {
      const i = find(h.idea_id)
      if (!i || i.owner === a) continue
      const q = h.queries || []
      i.queries.push(...q)
      i.hunters[key] = (i.hunters[key] || 0) + q.length
      i.hunts.push({ round: r, by: key, queries: q.length, found: trunc(h.found, 300) })
    }
    for (const at of res.attacks || []) {
      const i = find(at.idea_id)
      if (!i || i.owner === a || i.status !== 'alive') continue
      const entry = { round: r, by: key, kind: at.kind, severity: at.severity, claim: trunc(at.claim, 500), evidence_urls: (at.evidence_urls || []).slice(0, 5) }
      if (!next[i.id]) next[i.id] = []
      next[i.id].push(entry)
      i.attacks.push(entry)
      i.history.push(`R${r} ${key} ATTACK ${at.severity}/${at.kind}: ${trunc(at.claim, 220)} ${(at.evidence_urls || []).slice(0, 2).join(' ')}`)
    }
    for (const s of res.scores || []) {
      const i = find(s.idea_id)
      if (!i || i.owner === a) continue
      if (!tally[i.id]) tally[i.id] = []
      tally[i.id].push({ by: key, u: clamp(s.uncontested), d: clamp(s.demand), m: clamp(s.money), f: clamp(s.fit), note: trunc(s.note, 200) })
    }
    for (const op of res.owner_plans || []) {
      const i = find(op.idea_id)
      if (i && i.owner === a) i.plan = op
    }
  })
  for (const id of Object.keys(tally)) {
    const i = ideas[id]
    const list = tally[id]
    const avg = k => list.reduce((s, x) => s + x[k], 0) / list.length
    const b = { u: avg('u'), d: avg('d'), m: avg('m'), f: avg('f') }
    i.lastScore = round1(W.u * b.u + W.d * b.d + W.m * b.m + W.f * b.f)
    i.lastBreakdown = { uncontested: round1(b.u), demand: round1(b.d), money: round1(b.m), fit: round1(b.f), scorers: list.length }
    i.scoresByRound[r] = Object.assign({ overall: i.lastScore }, i.lastBreakdown, { notes: list.map(x => `${x.by}: ${x.note}`) })
  }
  pendingAttacks = next
}

function cut(n, r) {
  const alive = live().sort((x, y) => (y.lastScore || 0) - (x.lastScore || 0))
  const dropped = alive.slice(n)
  dropped.forEach(i => {
    i.status = 'cut'
    i.killedReason = `Cut after R${r} (avg score ${i.lastScore})`
    i.history.push(`R${r} CUT (avg score ${i.lastScore})`)
  })
  if (dropped.length) log(`Cut after R${r}: ${dropped.map(i => `${i.id}(${i.lastScore})`).join(', ')}`)
}

// ---- Round 1
phase('R1 Pitch')
const r1 = await parallel(PERSONAS.map((p, a) => () =>
  agent(r1Prompt(a), { label: `R1 ${p.key}`, phase: 'R1 Pitch', schema: R1_SCHEMA, agentType: 'general-purpose' })))
const r1Killed = []
r1.forEach((res, a) => {
  if (!res) { log(`R1: ${PERSONAS[a].key} did not report`); return }
  res.ideas.forEach(d => addIdea(a, d, 1))
  res.candidates_killed.forEach(k => r1Killed.push({ by: PERSONAS[a].key, candidate: k.candidate, killed_by: k.killed_by }))
  notes.push({ round: 1, agent: PERSONAS[a].key, text: res.statement })
})
log(`R1: ${live().length} ideas pitched; ${r1Killed.length} candidates self-killed: ${live().map(i => `${i.id} "${trunc(i.data.name, 50)}"`).join(' | ')}`)

// ---- Rounds 2-9
for (let r = 2; r <= 9; r++) {
  if (!live().length) { log('Every idea is dead.'); break }
  const t = ROUNDS[r].title
  phase(t)
  const res = await parallel(PERSONAS.map((p, a) => () =>
    agent(roundPrompt(a, r), { label: `R${r} ${p.key}`, phase: t, schema: ROUND_SCHEMA, agentType: 'general-purpose' })))
  applyRound(r, res)
  if (r === 4) cut(5, r)
  if (r === 7) cut(3, r)
  log(`After R${r}: alive ${live().map(i => `${i.id}(${i.lastScore})`).join(', ') || 'none'}`)
}

// ---- Round 10
const finalists = live()
const votes = {}
finalists.forEach(i => { votes[i.id] = { pts: [], bets: 0, verdicts: [] } })
if (finalists.length) {
  phase('R10 Final vote')
  const r10 = await parallel(PERSONAS.map((p, a) => () =>
    agent(`${header(a)}

ROUND 10 of 10 - FINAL VOTE. Nine rounds are over. Below are the finalists with their full fight history, the competitor searches run against them, scores, and the owners' 14-day plans.
Rank the finalists that are NOT yours, best first, in "ranking". Give a verdict for EVERY finalist, including your own: is it really uncontested, will someone pay, and would you bet the founder's next 90 days on it ("would_bet_90_days"). You are now the founder's ally, not a debater: if none of them deserves a bet, say so plainly. You may run a few final searches if a doubt remains.

FINALISTS:
${JSON.stringify(finalists.map(i => Object.assign(view(i), { history: i.history, hunts: i.hunts, score_trend: i.scoresByRound })), null, 1)}

${CONDUCT}`, { label: `R10 ${p.key}`, phase: 'R10 Final vote', schema: FINAL_SCHEMA, agentType: 'general-purpose' })))
  r10.forEach((res, a) => {
    if (!res) return
    const key = PERSONAS[a].key
    notes.push({ round: 10, agent: key, text: res.final_statement })
    const ranked = []
    for (const x of res.ranking || []) {
      const i = find(x)
      if (i && votes[i.id] && i.owner !== a && !ranked.includes(i.id)) ranked.push(i.id)
    }
    const L = ranked.length
    ranked.forEach((id, pos) => votes[id].pts.push(L <= 1 ? 1 : 1 - pos / (L - 1)))
    for (const v of res.verdicts || []) {
      const i = find(v.idea_id)
      if (!i || !votes[i.id]) continue
      votes[i.id].verdicts.push({ by: key, own: i.owner === a, verdict: trunc(v.verdict, 700), biggest_risk: trunc(v.biggest_risk, 300), would_bet: !!v.would_bet_90_days })
      if (v.would_bet_90_days && i.owner !== a) votes[i.id].bets += 1
    }
  })
}

const standings = finalists.map(i => {
  const v = votes[i.id]
  const vote = v.pts.length ? round2(v.pts.reduce((s, x) => s + x, 0) / v.pts.length) : 0
  return { i, vote, bets: v.bets }
}).sort((x, y) => (y.vote - x.vote) || (y.bets - x.bets) || ((y.i.lastScore || 0) - (x.i.lastScore || 0)))

return {
  winner: standings.length ? standings[0].i.id : null,
  standings: standings.map(s => ({
    id: s.i.id, owner: s.i.ownerKey, vote_score: s.vote, rival_bets: s.bets,
    last_score: s.i.lastScore, breakdown: s.i.lastBreakdown, version: s.i.version,
    total_queries: s.i.queries.length, rival_queries_by_agent: s.i.hunters,
    idea: s.i.data, plan: s.i.plan, verdicts: votes[s.i.id].verdicts,
    history: s.i.history, attacks: s.i.attacks, hunts: s.i.hunts, score_trend: s.i.scoresByRound,
  })),
  eliminated: Object.values(ideas).filter(i => i.status !== 'alive').map(i => ({
    id: i.id, name: i.data.name, one_liner: i.data.one_liner, status: i.status, reason: i.killedReason,
    last_score: i.lastScore, fatal_attacks: i.attacks.filter(x => x.severity === 'fatal').slice(0, 3),
  })),
  r1_self_killed: r1Killed,
  statements: notes,
}
