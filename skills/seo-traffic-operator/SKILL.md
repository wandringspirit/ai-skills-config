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

This skill equips the agent (and the dedicated `seo-traffic-agent` subagent) to execute all technical SEO, search console indexing, programmatic content expansion, and organic traffic acquisition workflows for **ActualRingSize (`https://actualringsizer.com`)**.

---

## 0. Mandatory Safety & Permission Gates (STRICTLY ENFORCED)

1. **Final Domain Live Gate**:
   - Production domain **`https://actualringsizer.com`** (`SITE_URL` in [`src/lib/studio-meta.ts`](../../../src/lib/studio-meta.ts)) is **LIVE** on Cloudflare Workers Static Assets (`200 OK`), with duplicate `.workers.dev` and Vercel hosts disabled.
   - Before starting any external SEO campaign, verify `https://actualringsizer.com` is serving HTTPS (`200 OK`).
2. **Human-in-the-Loop Approval Gate (Zero Unapproved Posting)**:
   - **NEVER** publish a post, comment, pin, message, email, or form submission on any external platform (Reddit, Pinterest, WatchUSeek, Quora, Etsy, Shopify, Google Search Console, Bing Webmaster Tools) without **first showing the user the exact draft, target URL, and destination** and receiving explicit `"Yes / Approved"` confirmation.
   - If the agent needs login credentials, 2FA, or browser access (via `/browser`), stop and ask the user for permission first.

---

## 1. Runbook A: Technical SEO & Deployment Audit (`https://actualringsizer.com`)

1. **Single-Source Constants**:
   - `SITE_URL = 'https://actualringsizer.com'` and `SUPPORT_EMAIL = 'support@actualringsizer.com'` in [`src/lib/studio-meta.ts`](../../../src/lib/studio-meta.ts).
   - Sitemap and crawler rules in [`public/sitemap.xml`](../../../public/sitemap.xml) (26 routes) and [`public/robots.txt`](../../../public/robots.txt).
   - IndexNow verification key file in [`public/08a29e7105054e33aac3a1c04a0fcef3.txt`](../../../public/08a29e7105054e33aac3a1c04a0fcef3.txt).
2. **Verification Suite**:
   - Run `npm test` (must pass all 34+ Vitest tests across 4 suites).
   - Run `npm run build` (must pre-render all 26+ static routes into `dist/client`).
3. **Commit & Push to Cloudflare Workers**:
   - Push to `origin/main` (`git@github.com:wandringspirit/ring-size.git`) so Cloudflare Workers (`ring-size` project, configured via `wrangler.jsonc` + `worker.ts`) deploys automatically to `https://actualringsizer.com`.
4. **Live Canonical & Schema Verification**:
   - Fetch `https://actualringsizer.com/`, `/watch`, `/diamonds`, `/conversion`, `/sitemap.xml`, and `/robots.txt` to verify HTTP 200, `<link rel="canonical">`, `hreflang` alternates, and JSON-LD `@graph` schemas.

---

## 2. Runbook B: Google Search Console, Bing Webmaster & IndexNow Operations

1. **Google Search Console (`sc-domain:actualringsizer.com` — LIVE)**:
   - Sitemap `https://actualringsizer.com/sitemap.xml` submitted (`26 discovered pages`).
   - Priority routes inspected and requested for indexing (`/`, `/watch`, `/diamonds`, `/conversion`, `/how-to-measure-ring-size`, `/mens-womens-ring-size-guide`, `/printable-ring-sizer`, `/watch-size-guide`, `/diamond-carat-size-chart`, `/faq`).
2. **Bing Webmaster Tools & IndexNow API (LIVE)**:
   - Property imported from Google Search Console (`26 URLs submitted`).
   - Whenever new routes are added, ping `https://api.indexnow.org/IndexNow` with host `actualringsizer.com` and key `08a29e7105054e33aac3a1c04a0fcef3` to immediately index in Bing, **ChatGPT Search**, **Microsoft Copilot**, and **DuckDuckGo**.

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
   - Generate a deep-linked studio URL (e.g., `https://actualringsizer.com/watch?case=36&lug=43.3&strap=20&lprof=curved` or `https://actualringsizer.com/?d=17.32&m=ring`).
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
2. Propose a batch of pre-rendered programmatic routes in [`src/lib/programmatic-seo.ts`](../../../src/lib/programmatic-seo.ts) and [`src/routes/size.$slug.tsx`](../../../src/routes/size.$slug.tsx) that reuse [`src/lib/measurements.ts`](../../../src/lib/measurements.ts).
3. Ensure every new route is covered by Vitest tests (`npm test`), listed in [`public/sitemap.xml`](../../../public/sitemap.xml), pre-rendered in [`vite.config.ts`](../../../vite.config.ts), and pushed to IndexNow.
