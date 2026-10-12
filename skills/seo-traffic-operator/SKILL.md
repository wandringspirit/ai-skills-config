---
name: seo-traffic-operator
description: >-
  End-to-end SEO, Search Console indexing, programmatic long-tail page generation,
  community seeding (Reddit/WatchUSeek/Quora), Pinterest visual search, and B2B jeweler
  backlink outreach operator for ActualRingSize. Activate this skill whenever the user
  asks to run SEO tasks, submit sitemaps, generate traffic, post to communities, or
  manage search rankings after the final custom domain is live.
---

# ActualRingSize SEO & Traffic Operator Skill (`seo-traffic-operator`)

This skill equips the agent (and the dedicated `seo-traffic-agent` subagent) to execute all technical SEO, search console indexing, programmatic content expansion, and organic traffic acquisition workflows for **ActualRingSize**.

---

## 0. Mandatory Safety & Permission Gates (STRICTLY ENFORCED)

1. **Final Domain Live Gate**:
   - **DO NOT** execute external indexing, community posts, Pinterest pins, or B2B outreach while `SITE_URL` in [`src/lib/studio-meta.ts`](../../../src/lib/studio-meta.ts) is still a temporary staging domain or unconfigured placeholder, **unless** the user explicitly confirms the final custom domain is live.
   - Before starting any external SEO campaign, check [`src/lib/studio-meta.ts`](../../../src/lib/studio-meta.ts) and confirm with the user that the production domain is live and serving HTTPS (`200 OK`).
2. **Human-in-the-Loop Approval Gate (Zero Unapproved Posting)**:
   - **NEVER** publish a post, comment, pin, message, email, or form submission on any external platform (Reddit, Pinterest, WatchUSeek, Quora, Etsy, Shopify, Google Search Console, Bing Webmaster Tools) without **first showing the user the exact draft, target URL, and destination** and receiving explicit `"Yes / Approved"` confirmation.
   - If the agent needs login credentials, 2FA, or browser access (via `/browser`), stop and ask the user for permission first.

---

## 1. Runbook A: Final Domain Cutover & Technical SEO Audit

When the user provides their purchased custom domain (e.g., `https://actualringsizer.com`):

1. **Update Single-Source Constants**:
   - Edit `SITE_URL` and `SUPPORT_EMAIL` in [`src/lib/studio-meta.ts`](../../../src/lib/studio-meta.ts).
   - Replace all domain URLs in [`public/sitemap.xml`](../../../public/sitemap.xml), [`public/robots.txt`](../../../public/robots.txt), and [`docs/DEPLOY.md`](../../../docs/DEPLOY.md).
2. **Run Verification Suite**:
   - Run `npx vitest run` (must pass all 29+ tests).
   - Run `npm run build` (must pre-render all 14+ static routes into `dist/client`).
3. **Commit & Push to Vercel**:
   - Push to `origin/main` (`git@github.com:wandringspirit/ring-size.git`) so Vercel (`vercel.com/piyush-1ddf/ring-size`) deploys the updated canonical tags and sitemap.
4. **Live Canonical & Schema Verification**:
   - Fetch the live domain root `/`, `/watch`, `/diamonds`, `/conversion`, `/sitemap.xml`, and `/robots.txt` to verify HTTP 200, `<link rel="canonical">`, `hreflang` alternates, and JSON-LD `@graph` schemas.

---

## 2. Runbook B: Google Search Console & Bing Webmaster Onboarding (Browser-Assisted)

Once the final domain is live:

1. **Ask Permission**: Ask the user to confirm before opening or interacting with Google Search Console (`search.google.com/search-console`) and Bing Webmaster Tools (`bing.com/webmasters`) as `piyushgaur17@gmail.com`.
2. **Google Search Console Setup**:
   - Add Domain Property → Copy DNS TXT verification token → Ask user approval before adding TXT record in DNS registrar.
   - Submit `https://<final-domain>/sitemap.xml` under **Sitemaps**.
   - Use **URL Inspection → Request Indexing** on the 10 priority routes:
     1. `/`
     2. `/watch`
     3. `/diamonds`
     4. `/conversion`
     5. `/how-to-measure-ring-size`
     6. `/mens-womens-ring-size-guide`
     7. `/printable-ring-sizer`
     8. `/watch-size-guide`
     9. `/diamond-carat-size-chart`
     10. `/faq`
3. **Bing Webmaster Tools & AI Search Setup**:
   - Open `bing.com/webmasters` → Click **Import from Google Search Console** (automatically indexes the domain for Bing, **ChatGPT Search**, **Microsoft Copilot**, and **DuckDuckGo**).

---

## 3. Runbook C: Approval-Gated Community & Forum Seeding (Reddit / WatchUSeek / PriceScope)

To drive immediate targeted visitors (Days 1–30):

1. **Research Live Threads**:
   - Search target communities (`r/Watches`, `r/EngagementRings`, `r/Moissanite`, `r/LabGrownDiamonds`, `r/jewelry`, `WatchUSeek`) for recent sizing questions:
     - Watch lug-to-lug overhang questions (e.g., *"36mm vs 41mm on a 6.5 inch wrist"*).
     - Ring sizing at home / wide band comfort-fit questions.
     - Diamond carat face-up size comparisons on specific finger sizes.
2. **Draft Value-First Response with Deep Link**:
   - Compute the exact deterministic millimeter numbers using [`src/lib/measurements.ts`](../../../src/lib/measurements.ts).
   - Generate a deep-linked studio URL (e.g., `https://<domain>/watch?case=36&lug=43.3&strap=20&lprof=curved` or `https://<domain>/?d=17.32&m=ring`).
3. **MANDATORY APPROVAL STEP**:
   - Present a preview table to the user containing:
     - **Target Thread URL & Title**
     - **Proposed Reply / Post Text**
     - **Deep Link Included**
   - Wait for the user's explicit approval before posting or modifying anything in the browser.

---

## 4. Runbook D: Approval-Gated Pinterest Visual Search & B2B Jeweler Outreach

1. **Pinterest Visual Pins**:
   - Capture crisp 1:1 studio screenshots for high-search bridal/horology comparisons (e.g., *"1ct vs 2ct Oval Diamond on Size 6 Finger"*, *"International Ring Size Chart US/UK/EU/India/Japan"*, *"Watch Lug-to-Lug Wrist Fit Chart"*).
   - Present the image, Pin Title, Pin Description, and Destination URL to the user for approval before uploading to Pinterest Business.
2. **B2B Jeweler Backlink Outreach**:
   - Identify independent jewelers (Shopify, Etsy, boutique bridal studios) whose *"Ring Size Guide"* page only has a static text table or broken PDF.
   - Draft a personalized message using [`docs/OUTREACH.md`](../../../docs/OUTREACH.md).
   - Present the prospect list and exact email/DM copy to the user for approval before sending.

---

## 5. Runbook E: Programmatic Long-Tail SEO Route Expansion

When scaling organic search impressions (Weeks 2–8):

1. Analyze top queries and impressions from Google Search Console or [`docs/SEO.md`](../../../docs/SEO.md).
2. Propose a batch of pre-rendered programmatic routes (e.g., `/size/$slug` for exact millimeter/US/UK/EU/Cartier conversions, or `/diamond/$slug` for exact carat+cut comparisons) that reuse [`src/lib/measurements.ts`](../../../src/lib/measurements.ts).
3. Ensure every new route is covered by Vitest tests (`npx vitest run`) and static prerendering in [`vite.config.ts`](../../../vite.config.ts).
