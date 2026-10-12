---
name: domain-brand-naming-architect
description: >-
  Brand naming, domain strategy, TLD evaluation, SEO keyword-vs-brandability scoring, and live
  RDAP/DNS availability verification architect. Activate whenever the user asks for domain name
  ideas, brand naming, TLD comparisons (.com, .studio, .co, .app, .io), or live domain availability checks.
---

# Domain & Brand Naming Architect (`domain-brand-naming-architect`)

## 1. The 4-Archetype Naming Framework
Every high-converting utility or luxury SaaS product should evaluate domain candidates across four distinct strategic archetypes:

1. **Exact-Match / High-Intent SEO Utility (`[Keyword].com`)**:
   - Captures immediate type-in and organic search CTR for high-intent queries (e.g., `ring size`, `true scale`, `actual size`, `mm sizer`).
   - Best when organic search is the #1 acquisition channel.
2. **Category-Expanded Multi-Tool Authority (`[Precision/Scale/Fit].com`)**:
   - Bridges all product pillars (Rings + Watches + Diamonds + International Conversion) without boxing the brand into a single object.
   - Prevents brand friction when expanding into horology (`Watch Fit`) or gemology (`Diamond Carat Studio`).
3. **Luxury Maison / Horology & Atelier Aesthetic (`[Editorial/Optical].com` or `.studio`)**:
   - Evokes Swiss horology, Leica optics, and Place Vendôme jewelry houses (*Calibre, Reticle, Loupe, Vernier, Mandrel, Carat, Atelier*).
   - Ideal for B2B jeweler embeds, luxury PR, and high-trust consumer perception.
4. **Short Verb / Actionable Consumer Brand (`[Verb+Noun].com`)**:
   - Memorable 2-syllable or 3-syllable wordplay built for word-of-mouth, social sharing, and mobile bookmarks.

---

## 2. The 5-Point Domain Scoring Rubric
Score every recommended domain out of 100 across:
- **Radio Test & Spelling Clarity (25 pts)**: Zero hyphen ambiguity, zero double-letter traps, unmistakable when spoken aloud.
- **SEO & Click-Through Intent (25 pts)**: Signals 1:1 accuracy, sizing, or jewelry/watch fit in Google SERPs.
- **Category Elasticity (20 pts)**: Works for Ring Sizer today AND Watch/Diamond/Jewelry sizing tomorrow.
- **Luxury & Optical Trust (15 pts)**: Sounds like a precision instrument rather than a spammy ad-farm.
- **TLD Authority (15 pts)**: `.com` is gold standard (15/15); `.studio` / `.co` / `.app` are strong secondary/redirect options.

---

## 3. Live RDAP / DNS Verification Protocol (Never Guess Availability)
Never suggest a domain name without verifying whether it is registered or available:
- Query RDAP (`https://rdap.verisign.com/com/v1/domain/<domain>`) or DNS NS/SOA records (`Resolve-DnsName` / `nslookup` / `dig`) for every candidate before presenting the table.
- Clearly label each candidate as **AVAILABLE (Unregistered)** or **REGISTERED (Taken)**.

---

## Gemini (Antigravity) Execution SOP
1. Read this `SKILL.md` via `view_file`.
2. Generate candidates across all 4 archetypes (Exact-Match SEO, Multi-Tool Scale/Fit, Luxury Optical/Horology, and `.studio`/`.app` companions).
3. Run a PowerShell script via `run_command` to check live RDAP/DNS status for all candidate domains in parallel.
4. Present a ranked comparison table with availability badges, rubric scores, and migration impact (e.g., updating `SITE_URL` in `src/lib/studio-meta.ts` and `public/sitemap.xml`).

---

## Claude Execution SOP
1. Read this `SKILL.md` using `Read`.
2. Verify domain availability via `Bash` (`curl -s -o /dev/null -w "%{http_code}" https://rdap.verisign.com/com/v1/domain/<domain>`) where `404` = Available and `200` = Registered.
3. Present the scored matrix across the 4 naming archetypes.
