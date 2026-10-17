---
name: meta-ads-conversion-operator
description: Meta Ads Manager (Facebook & Instagram Ads) Campaign Architecture, Advantage+ Sales Audit, Pixel/CAPI Attribution, CPM/CTR/CPC/ROAS Diagnostics, and Low-Ticket Digital Product Scaling Operator. Activate whenever the user asks to review Meta Ads settings, audit Ads Manager screenshots, build or optimize Facebook/Instagram ad campaigns, diagnose high CPMs or zero purchases, or scale digital product funnels.
---

# Meta Ads Conversion & Campaign Audit Operator (`meta-ads-conversion-operator`)

## 1. Core Domain Knowledge & Diagnostic Benchmarks

### A. Campaign Structure & Objective Standards (Low-Ticket Digital Products: ₹299–₹999 / $9–$49)
1. **Campaign Objective:**
   - Must be **Sales (`OUTCOME_SALES`)** optimizing for **Website Purchases (`Purchase`)** — never Traffic, Engagement, or Link Clicks (which optimize for non-buyers).
2. **Budget Architecture:**
   - **Advantage+ Campaign Budget (CBO):** Ideal when testing 1–3 ad sets with 3–5 video/image creatives so Meta dynamically routes spend toward the highest-converting creative.
   - **Daily Budget Floor (India INR):** `₹400–₹800/day` for initial creative & funnel validation; scale by `20%–30%` every 48–72 hours once CPA is below target (`< ₹200–₹250` for a `₹399` front-end product with order bumps).
3. **Bid Strategy & Attribution:**
   - **Bid Strategy:** `Highest volume` (lowest cost without cap) during initial data collection and creative testing (< 50 purchases/week).
   - **Attribution Setting:**
     - **Standard Best Practice:** `7-day click, 1-day view` (or `7-day click` only when running heavy organic Reels + ManyChat alongside paid ads so view-through doesn't over-credit retargeting). For cold low-ticket impulse funnels, `7-day click, 1-day view` gives Meta's Andromeda delivery engine maximum conversion feedback signals.
4. **Delivery & Learning Phase Metrics (India Tier-1/2 Digital Product Benchmarks):**
   - **CPM (Cost per 1,000 Impressions):**
     - Normal India Broad/Interest (Sales objective): `₹150 – ₹450`.
     - **Early Cold-Start Spike Warning:** During the first `₹200–₹500` of spend (`< 500 impressions`), Meta probes high-intent auction pockets, often producing a temporary CPM of `₹800 – ₹1,200+`. If CPM stays above `₹800` after `1,500+ impressions`, broaden targeting (remove stacked interests/age restrictions), enable Advantage+ Placements (Reels + Stories + Feed), or refresh the 3-second video hook.
   - **Outbound CTR (Link Click-Through Rate):**
     - Target: `> 1.5%` (India) / `> 1.2%` (Global).
     - Below `1.0%`: Hook / first 3 seconds of video or headline/CTA isn't stopping the scroll.
   - **Landing Page View (LPV) Rate (`LPV / Outbound Clicks`):**
     - Target: `> 75%–80%`.
   - **Checkout Initiation (`InitiateCheckout / LPV`):**
     - Target: `> 8%–15%` on low-ticket (`₹399`) impulse pages.
   - **Purchase Conversion Rate (`Purchase / LPV`):**
     - Target: `2.0% – 5.0%+` (breakeven ROAS on `₹399` base + `₹199` bumps = ~`₹480` AOV).

### B. The 5-Point Ads Manager Screenshot Audit Checklist
Whenever the user shares an Ads Manager screenshot or asks *"Are these settings good?"*, evaluate:
1. **Campaign Objective & Conversion Event:** Confirm `Website purchase` appears under the `Results` column (not `Link clicks` or `Landing page views`).
2. **Attribution & Bid Strategy:** Confirm `7-day click, 1-day view` + `Highest volume` + `Ongoing` end date.
3. **Spend vs. Impressions / CPM Check:** Calculate `Effective CPM = (Amount Spent / Impressions) × 1000` and `Frequency = Impressions / Reach`. Flag if early learning-phase CPM is elevated (`> ₹800`) and explain whether it's normal initial auction probing (`< 500 impressions`) or requires placement/audience expansion.
4. **Custom Columns Diagnostic (`Columns: Performance` vs. Funnel Columns):**
   - The default `Columns: Performance` view hides **Link Clicks**, **CTR (Link Click-Through Rate)**, **CPC**, **Landing Page Views**, and **Initiate Checkout**.
   - Always recommend switching the column preset to **Performance and Clicks** (or adding `Outbound clicks`, `CTR (link click-through rate)`, `Landing page views`, `Checkouts initiated`, `Purchases`, and `ROAS`) so you can see where traffic drops off before the first purchase.
5. **Unpublished Draft Changes Check:**
   - Check the top-right corner of Ads Manager (`Review and publish` button). If it is active/highlighted or has pending edits, remind the user whether any draft edits are waiting to be published.

### C. Mandatory Indian GST & Real Bank Cashflow Protocol (Strict Rule)
1. **Never conflate "Media Spend" with "Actual Cash Spent":**
   - In India, Meta levies **18% Goods & Services Tax (GST)** on all ad spend / prepaid deductions.
   - `Actual Bank Cash Outflow = Media Spend in Ads Manager × 1.18`.
2. **Zero-Delusion Profit & Loss Reporting:**
   - Whenever reporting profit, loss, deficit, or breakeven to the user, **ALWAYS calculate and lead with the Real Bank Cash Position (including 18% GST)**.
   - **STRICTLY PROHIBITED:** Never claim a campaign is "in net profit", "paying for itself", or "generating cash" unless `Total Revenue Collected > (Total Media Spend × 1.18)`.
   - Always display the dual-ledger truth table:
     - **Dashboard Ad Level (Auction Efficiency):** `Media Spend vs. Revenue` (Platform ROAS).
     - **Bank Cash Reality (Take-Home Solopreneur Truth):** `Total Cash Deducted (Media + 18% GST) vs. Razorpay Cash Collected`.

---

## Gemini (Antigravity) Execution SOP
1. When auditing a Meta Ads campaign or screenshot:
   - Announce `**[Skill Active: meta-ads-conversion-operator]**`.
   - Compute exact derived metrics from visible numbers (`CPM`, `Frequency`, `% of Daily Budget spent`, `Cost per Reach`).
   - Give a clear **Verdict** (`✅ What is Set Correctly` vs. `⚠️ What to Watch / Optimize Next`) with zero fluff.
2. Before making live changes to budgets, bid strategies, or pausing/publishing ads in Chrome DevTools MCP, always respect the **Human-in-the-Loop Approval Gate**.

## Claude Execution SOP
1. Read this shared `SKILL.md` before analyzing Meta Ads campaigns or writing ad copy/scripts.
2. Compute funnel diagnostics (`CPM`, `CTR`, `CPC`, `LPV%`, `IC%`, `CVR%`, `CPA`, `ROAS`) deterministically and provide actionable ad set / creative recommendations.
