---
name: small-site-link-building
description: >-
  Plan how a small, new tool or content site earns backlinks with no budget: which tactics work in
  2026, which waste time or risk a penalty (Medium/Web 2.0 posts, AI guest-post farms, bought links,
  directories), realistic yields, and a weekly routine. Activate when the user asks "how do we get
  backlinks", "should we write Medium/guest posts", "how do others build links", or wants a link plan.
---

# Small-site link building (`small-site-link-building`)

For sites with no budget and no brand. Pair with `backlink-reclamation` (dead competitor links) and
`data-led-seo-guides` (pages built around data nobody else has).

## 1. What a link is worth

- A link helps rankings when it is **editorial** (someone chose to cite you), **followed** (no
  `nofollow`/`ugc`/`sponsored`), on a **relevant, indexed page that real people read**.
- **Nofollow links pass little or nothing** to rankings. Medium (all outbound links nofollow since
  about 2023–24), GitHub READMEs, Reddit, Quora, forum signatures and most social profiles are nofollow.
  Their value is referral visits, brand mentions, and being seen by AI answers, not ranking.
- **Embeds:** a credit link inside the `<iframe>` counts for the embedding domain's own page, not for
  you. The credit link must sit in the host page's HTML, outside the iframe, to be a backlink. Vary its
  anchor (brand name, URL) so widget links don't all use one money keyword.

## 2. Tactics, ranked for a no-budget tool site

| Rank | Tactic | Typical yield | Notes |
|---|---|---|---|
| 1 | **Linkable asset + targeted outreach**: a free tool, embed, or printable that a page's readers need; email the page owner | 1–3 links per 20 personal emails | Best fit for calculators. Target pages that already link a weaker tool or a static chart |
| 2 | **Original data ("we compared X")**: a finding nobody else has, from your own tool or public data, pitched to writers who cover the niche | 0–10 links per study, lumpy | Journalists link data they can't get elsewhere. One clear headline number |
| 3 | **Resource and "useful links" pages**: clubs, schools, associations, libraries, local programmes | 1 in 10–20 asks | Search `"<topic>" "useful links"`, `inurl:resources`, `inurl:links` |
| 4 | **Broken-link / dead-competitor reclamation** | handful per dead tool | See `backlink-reclamation` |
| 5 | **Journalist requests** (Source of Sources: free; Qwoted: free tier; Help a B2B Writer: free; Featured: paid). HARO/Connectively closed Dec 2024 | low, but high-authority | Answer only in your niche, with a specific number or method, within hours |
| 6 | **Unlinked mentions**: pages that name the brand without a link | small | Only once the brand is mentioned anywhere |
| 7 | **Community answers** (Reddit, forums) | nofollow | Traffic and AI-answer visibility, not ranking. Mostly no link (see `reddit-account-reputation-architect`) |

Realistic pace for one person doing it by hand: **2–8 real links a month after 2–3 months**, not
dozens. Rankings respond 1–3 months after links appear.

## 3. Don't

- **Medium, Blogger, Tumblr, "Web 2.0" posts written for links**: nofollow and/or low-value; time is
  better spent on one outreach email. Republishing your pages there also splits your own content.
- **AI-written guest posts at scale, guest-post marketplaces, PBNs, expired domains, link exchanges,
  paid links without `rel="sponsored"`**: Google's link-spam and scaled-content-abuse policies (2024
  onward, enforced in later spam updates) target these; a manual action can sink a new site.
- **Mass directory submission**: a few genuinely relevant, human-edited directories are fine; bulk
  lists are noise.
- **Exact-match anchors everywhere**: let others choose the wording.

## 4. Weekly routine (about 2–3 hours)

1. Find 3–5 pages whose readers need the tool (shops, clubs, schools, guides, local programmes).
   Check each is live, read, and has a contact.
2. Draft a short personal email per page: one specific thing you noticed, what you offer, the
   link, no ask for a specific anchor. Signed by the owner.
3. One follow-up at most, about 10 days later, only if no reply.
4. Once a quarter: one data finding from the site's own data, pitched to 10–20 writers who cover it.
5. Track each target: sent, replied, linked (check the live page with `curl -s <page> | grep <domain>`).

---

## Gemini (Antigravity) Execution SOP

- Research targets and draft emails; never send. Record targets in the project's outreach doc.

---

## Claude Execution SOP

- Check the site's embed code: is the credit link outside the iframe? Fix that before outreach.
- Use `curl` with a browser UA to read target pages (fetch agents get rate-limited); pull contact
  addresses from the page, check the domain's MX before trusting an odd address (`nslookup -type=MX`).
- Drafts go in the project's outreach doc, signed with the owner's name; the owner sends.
- Report yield honestly; say when a vein is exhausted.
