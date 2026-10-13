---
name: free-tool-portfolio-strategy
description: >-
  Decide whether a content or utility site should build another free tool, calculator or
  generator page ("engineering as marketing"), and which one. Activate when the user asks
  "should we add more tools", "what tool should we build next", "is this calculator worth it",
  or wants to prioritise tool pages against other page types (hubs, guides, programmatic pages).
---

# Free-tool portfolio strategy (`free-tool-portfolio-strategy`)

A free tool is a marketing channel that happens to be code. Judge it the way a channel is judged:
by the visitors it brings per unit of effort, against the other channels the same effort could buy.
The usual mistake is judging it by how useful or clever the tool is.

## 1. Frameworks this rests on

- **Engineering as marketing** (Weinberg & Mares, *Traction*, 2015): free tools earn traffic and
  links when they solve a searched-for job adjacent to the product. They fail when nobody searches
  for that job, or the tool duplicates what the product page already does.
- **Bullseye** (same book): test channels cheaply, then put effort into the one that is working.
  Applied here, compare page *types* (tools vs hubs vs guides vs the core product page) by the
  entries each brings, and build more of the type that wins.
- **RICE** (Intercom): Reach × Impact × Confidence ÷ Effort. Reach comes from measured demand
  (Search Console impressions, GA4 landings, keyword volume), never from a guess.
- **Google Search spam policies, scaled content abuse (March 2024)** and the people-first
  ("helpful content") guidance: many thin near-duplicate tool pages, or machine-translated copies
  of them, are a site-wide risk. Each tool must do a distinct job well.
- **Cannibalisation**: if Google already ranks one of your pages for the query, a new tool page for
  that query splits the signal. Improve the ranking page instead.

## 2. The decision procedure

1. **Measure what existing tools earn.** In GA4, take landing-page sessions by page type over the
   last 2–4 weeks: tools, hubs/listicles, guides, core product pages, home. Then work out entries
   per page, per week, for each type. If tool pages earn far less per page than another type, the
   default answer is "no new tool; build more of the winning type".
2. **Check search demand for the candidate.** Use Search Console queries you already get
   impressions for, plus keyword volume. A #3 ranking on a query with 20 searches a month is worth
   about 5 visits. High rankings on tiny queries are the usual way tool pages look good and earn nothing.
3. **Check the results page.** If years-old domains with strong authority hold the top results, a
   young site takes the build cost without the traffic.
4. **Check policy and cost gates.** Does the tool break a platform's terms (scraping, downloading,
   anything the API forbids)? Does it spend API quota or storage writes per use? Can it run
   entirely in the browser?
5. **Count the full cost.** Code, copy, every locale's translation, schema, sitemap, cross-links
   from every existing tool page, tests, and maintenance. A site with N locales pays N× for copy.
6. **Score with RICE** against the best non-tool alternative, such as the next hub, a guide fix or
   a core-page improvement.
7. **Write the kill criterion before building:** the metric, its baseline, the threshold, and the
   date it is read (search changes need 2–4 weeks). If it misses, stop building tools of that kind.

## 3. Signals that a tool IS worth building

- The core product's own users ask for it, so it raises engagement or retention, not only entries.
- Search Console already shows impressions for the job, with no page of yours answering it.
- It is linkable: developers, teachers or creators would embed it or cite it, as with badges or calculators.
- It runs in the browser, needs no quota and breaks no terms.

## 4. Signals it is NOT

- Existing tool pages bring under ~1 entry a week each.
- AI assistants send traffic to lists and answers (hubs, guides), not to tools.
- The query is already answered by one of your guides that ranks.
- The only demand is the tool's name and nobody searches for the job.

---

## Gemini (Antigravity) Execution SOP

- Pull GA4 landing pages by page type and Search Console queries; read project docs on past tool
  decisions before proposing anything.
- Present the comparison table and a recommendation; never build or deploy without the owner's
  approval.

---

## Claude Execution SOP

- Read the project's roadmap and SEO docs for earlier tool decisions and their reasons first; do not
  re-litigate a decision the owner already made without new data.
- Pull GA4 with `mcp__analytics-mcp__run_report`: `landingPage` × `sessionDefaultChannelGroup` and
  `pagePath` × `screenPageViews`. Use `match_type` 4 (contains) so locale-prefixed paths are counted.
- Answer with: entries per page type (table), the verdict, and which roadmap rows would change. Ask
  before changing an approved row.
