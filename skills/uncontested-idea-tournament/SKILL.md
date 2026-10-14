---
name: uncontested-idea-tournament
description: >-
  Find an online income idea that nobody is doing yet ("zero competitors", "blue ocean", "white space")
  and prove it with competitor searches, using 5 rival agents that pitch through different gap-finding
  lenses and then spend 10 rounds trying to find a competitor in each other's ideas. Activate when the
  user says every idea already has a competitor, asks for something "no one is doing", or asks for
  agents to debate/fight over business or side-income ideas.
---

# Uncontested Idea Tournament (`skills/uncontested-idea-tournament`)

## 1. The honest premise

"Nobody is doing it" usually means one of three things:

1. **Too new**: something changed in the last 12 months (a rule took effect, an API shipped or died,
   a new kind of user appeared) and nobody has built for it yet. This is the best kind of gap, and it closes.
2. **Too small or too boring** for funded companies: a $1k-$10k/month niche, or tedious public data
   nobody has assembled. Good for a solo founder; not a venture business.
3. **No market**: nobody wants it. Most "uncontested" ideas are this.

So an idea only counts when it passes **both** tests: no direct competitor after a real search, **and**
demand evidence with URLs (people asking for it, paying for a workaround, or forced by a new obligation).
A gap with no demand evidence is a loss, not a win.

## 2. Definitions (strict)

- **Direct competitor**: any live product, service, app, browser extension, plugin, usable GitHub project,
  standing Fiverr/Upwork gig, or agency offer doing the same core job for the same customer, in any
  language or country. One is enough to kill the idea or force a mutation.
- **Substitute**: a general tool (ChatGPT/Claude, Excel, Zapier, a platform feature) that could be made
  to do it. Not a kill, but the idea must say why the customer still pays for the dedicated thing.
- **Dead product**: site down or no updates for 18+ months. Not a competitor, but a warning sign: find out why it died.
- "We found no competitor in N searches" is evidence, not proof. Report the search count, never "nobody exists".

## 3. Where to search for competitors (each idea, 8+ phrasings)

Product-style names; the customer's own words; the job to be done; "tool/app/software for X";
"alternative to"; Product Hunt; GitHub; Chrome Web Store; Apple/Google app stores; Shopify, WordPress
and other plugin directories; Fiverr and Upwork (a standing gig is a competitor); Reddit "I use X for
this"; agencies and consultants doing it by hand; non-English queries; built-in features of the platforms
the customer already uses (and their announced roadmaps).

## 4. The five gap-finding lenses (one per agent)

| Agent | Lens | Where gaps come from |
|---|---|---|
| CLOCK | Timing | Laws/regulations taking effect, platform policy changes, API launches and shutdowns, new device or AI capability |
| MINER | Long tail | One profession/hobby/ecosystem too small for funded companies; unanswered "is there a tool that..." threads |
| SLEUTH | Workarounds | Money already moving: recurring Fiverr gigs, VAs, shared spreadsheets, consultants repeating one deliverable |
| MACHINE | New buyers | AI agent builders, MCP, coding-agent users, AI-search visibility, businesses selling to AI agents |
| DATA | Boring data | Public but scattered records turned into a database, alert service, API or comparison |

## 5. The 10 rounds

| Round | Theme | Notes |
|---|---|---|
| 1 | Pitch | Each agent brainstorms 8+ candidates, self-kills every one with a competitor, pitches 2 survivors; lists the killed ones |
| 2 | Competitor hunt | Attack = find a direct competitor (6+ new phrasings per target) |
| 3 | Demand | "No competitor because no market?" Only round where lost ideas may be replaced |
| 4 | Hunt II + platform risk | Untried angles; has a big platform shipped/announced it? **Cut to 5** |
| 5 | Money | Who pays, how much; path to first $100 and $1k/month; can the founder collect it |
| 6 | Distribution | First 50 customers with ~$0 ads; check community self-promotion rules |
| 7 | Build & risk | Shippable in 4 weeks? API, ToS, licensing, liability, manual-work risks. **Cut to 3** |
| 8 | Copycat & moat | Why the founder still wins once copied; fresh sweep |
| 9 | Final kill attempt | 6+ brand-new phrasings per finalist; owners give a 14-day pre-sell plan with kill criteria |
| 10 | Final vote | Rank finalists excluding own; verdict + "would you bet 90 days" for each |

Every round from 2 to 9, each agent: defends its ideas (rebut with evidence / mutate into a variant
with fresh searches / concede), attacks assigned targets (each idea gets 2 attackers per round, all 4
rivals over two rounds), logs every search even when it finds nothing, and scores every rival idea.

**Score** = 0.35 uncontested + 0.25 demand + 0.20 money + 0.20 fit (0-10 each; owners never score their own).
**Final vote**: normalised rank points (first = 1, last = 0) averaged over voters, tie-break on rival "would bet" count.

## 6. Reporting to the user

- Lead with the winner: what it is, who pays, why nobody does it yet, the closest things found and why
  they are not the same, the demand evidence, and how many searches by how many rivals failed to find a competitor.
- Then the 14-day pre-sell test and kill criteria. The idea is not "validated" until someone pays.
- Then runners-up and the kill log (which ideas died and what killed them). Seeing the bodies is
  what makes the survivor credible.
- Spot-check the winner yourself with a few fresh searches before presenting it.

---

## Gemini (Antigravity) Execution SOP

- Define the 5 lens personas above and run the 10 rounds with real web searches; never simulate search results.
- Keep the shared state (ideas, versions, attacks, searches, scores) in one file and pass it to every round.
- Produce the tournament record and the winner's 14-day plan.

---

## Claude Execution SOP

- Only run the multi-agent version when the user asked for agents/rounds in their own words. It is about
  50 agent calls with heavy web search, so say so if they did not.
- Use the Workflow tool with `tournament-workflow.js` in this folder (pass the script inline or by
  `scriptPath`). Edit the `FOUNDER` block first: today's date, the user's skills, budget, payment rails,
  and the categories they already rejected.
- Agents run as `agentType: 'general-purpose'` with schemas; the prompt tells them to load
  WebSearch/WebFetch via ToolSearch, research only, and **not** to run the skill-first protocol
  (subagents inherit CLAUDE.md and would otherwise try to create and push skills).
- Rounds are barriers by design (each round needs the previous round's attacks). Expect 1-2 hours.
- After it finishes, spot-check the winner with your own searches, then report as in section 6.
