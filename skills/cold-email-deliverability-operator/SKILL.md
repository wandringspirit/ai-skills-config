---
name: cold-email-deliverability-operator
description: Cold email deliverability architecture, DNS authentication (SPF, DKIM, DMARC, MX, Custom Tracking Domain), secondary domain isolation, Google Workspace / Microsoft 365 mailbox provisioning, warmup protocols, spintax copy optimization, and spam filter avoidance operator. Activate whenever the user asks why cold emails land in spam, how to set up cold outreach infrastructure, how to fix domain reputation, or how to scale cold B2B campaigns safely.
---

# Cold Email Deliverability & Outreach Infrastructure Operator (`cold-email-deliverability-operator`)

## 1. Root Cause Analysis: Why Cold Emails Land in Spam

When cold outreach fails to hit the primary inbox, it is virtually always caused by one or more of these 6 structural breakdowns:

1. **Primary Domain Contamination (The Death Spiral):**
   - Sending cold outbound from the main production domain (e.g., `actualringsizer.com`) or generic addresses like `support@` or `info@`.
   - When recipients hit "Report Spam" or bounce, the primary domain’s spam score rises across Google Postmaster and Microsoft SNDS. This poisons transactional emails (password resets, customer invoices, onboarding receipts).
2. **Missing or Broken DNS Authentication:**
   - Failure to configure **SPF**, **DKIM (2048-bit)**, and **DMARC** with proper alignment (`aspf=r`, `adkim=r`).
   - In February 2024, Google and Yahoo made DMARC and SPF/DKIM alignment mandatory for all commercial senders; unaligned emails are silently dropped or routed to Junk.
3. **Shared Tracking Domain Blacklisting:**
   - Cold sequencers track opens and clicks via redirect URLs (e.g., `track.sequencer.com`). Because thousands of spam senders share that default tracking domain, spam filters blacklist the link domain itself.
4. **Volume Spikes & Cold Mailbox Blasting:**
   - Firing 50–200 cold emails per day from a brand new mailbox with zero inbound engagement or sending history.
5. **Spam-Triggering Copy & Layout:**
   - Including links (`https://...`), images, HTML formatting, tracked attachments, or pricing keywords (`$`, `Free`, `Trial`, `Special Offer`) in **Email 1** of a cold sequence.
   - Sending identical byte-for-byte text to 100+ prospects without dynamic Spintax variation.
6. **List Decay & Dirty Data (Bounce Rate > 2%):**
   - Sending to invalid, scraped, or catch-all addresses. Any bounce rate exceeding 2% immediately flags the mailbox as a malicious scraper.

---

## 2. The 5-Pillar Permanent Deliverability Architecture

```
[Secondary Lookalike Domains] ---> [Google Workspace / M365 Mailboxes]
     (tryproduct.com, getproduct.com)      (max 2 inboxes / domain, max 25-30 emails/day)
                  |                                     |
                  v                                     v
       [Complete DNS Auth Stack]           [14-21 Day Automated Warmup]
     (SPF + DKIM + DMARC + MX + CTD)        (Instantly / Smartlead, 30% background)
                  |                                     |
                  +-----------------+-------------------+
                                    |
                                    v
                     [Plain Text + Spintax Copy]
                       (Zero links in Email 1,
                        Verified leads <1.5% bounce)
                                    |
                                    v
                       ==> 85%+ PRIMARY INBOX PLACEMENT
```

### Pillar 1: Domain Isolation & 301 Redirects
- **Golden Rule:** Never send a single cold email from your root production domain.
- **Secondary Domain Strategy:**
  - Register 2–3 lookalike domains per product (e.g., if main is `actualringsizer.com`, buy `tryactualringsizer.com`, `actualringsizerapp.com`, `getactualringsizer.com`).
  - Purchase via Cloudflare Registrar, Namecheap, or Porkbun.
  - Set up an immediate **HTTP 301 Redirect** from each secondary domain to your primary website URL (`https://actualringsizer.com`). Anyone checking the domain in a browser lands safely on the real site.

### Pillar 2: Technical DNS & Authentication Configuration
Every secondary sending domain must have all 5 records set before any email is sent:

1. **SPF (Sender Policy Framework):**
   - For Google Workspace: `v=spf1 include:_spf.google.com ~all`
   - For Microsoft 365: `v=spf1 include:spf.protection.outlook.com -all`
   - *Rule:* Exactly ONE SPF record per domain. Never combine multiple SPF TXT records into separate lines.
2. **DKIM (DomainKeys Identified Mail):**
   - Generate a **2048-bit** RSA key inside Google Workspace Admin (`Apps > Google Workspace > Gmail > Authenticate email`) or Microsoft Defender.
   - Publish as TXT record: host `google._domainkey`, value provided by Google. Enable DKIM signing after propagation.
3. **DMARC (Domain-based Message Authentication, Reporting, and Conformance):**
   - Initial setup record (TXT on `_dmarc.yourdomain.com`):
     ```
     v=DMARC1; p=none; rua=mailto:dmarc-reports@yourdomain.com; pct=100; adkim=r; aspf=r
     ```
   - Monitor reports for 2 weeks to ensure 100% alignment, then upgrade to `p=quarantine`.
4. **MX Records:**
   - Properly routed to Google or Microsoft mail servers with correct priority (1, 5, 10).
5. **Custom Tracking Domain (CTD):**
   - In your outreach tool (Instantly / Smartlead), configure a dedicated subdomain CNAME:
     - Name: `track` (or `inst`) -> Target: ESP custom tracking endpoint.
     - Enable SSL. This isolates your click/open tracking from shared third-party pools.

### Pillar 3: Mailbox Provisioning & Conservative Volume Caps
- **Provider Choice:** Use genuine **Google Workspace** or **Microsoft 365 Business** mailboxes. Avoid cheap bulk SMTP relays, cPanel webmail, or shared marketing servers.
- **Mailbox Density:** Maximum **2 mailboxes per secondary domain** (e.g., `piyush@tryactualringsizer.com`, `p.sharma@tryactualringsizer.com`).
- **Daily Volume Cap:**
  - **Cold Outreach:** 25 to 35 cold emails per mailbox per day (including automated follow-ups).
  - **Warmup Volume:** 15 to 20 warmup emails per day running simultaneously.
  - **Total Mailbox Activity:** Never exceed 50 total emails/day per inbox.
- **Scaling Equation:** To send 300 cold emails per day, do NOT increase mailbox limits. Scale horizontally:
  - 3 secondary domains × 2 mailboxes = 6 mailboxes.
  - 6 mailboxes × 30 emails/day = 180 emails/day.
  - Add 2 more domains (4 mailboxes) = 300 emails/day total.

### Pillar 4: Automated Warmup & Ramp-Up Protocol
- Connect every new mailbox to a peer-to-peer warmup pool (Instantly.ai, Smartlead.ai).
- **Ramp-Up Schedule:**
  - Day 1–3: 5 warmup emails/day.
  - Day 4–7: 10 warmup emails/day.
  - Day 8–14: 15–20 warmup emails/day.
  - Day 14+: Begin cold outbound at 5–10 emails/day while keeping warmup active.
- **Warmup Settings:**
  - Set Reply Rate to `30%–35%`.
  - Enable "Read Emulation", "Spam Folder Rescue", and "Mark as Important".
  - **Crucial:** Never turn warmup off. Keep it running in the background at 25%–30% of total volume permanently to protect against sudden complaint spikes.

### Pillar 5: Cold Copy Hygiene & Spam-Filter Trigger Rules
1. **Email 1 Must Be 100% Plain Text:**
   - **Zero Links:** Do not include `https://...` or clickable hyperlinks in the very first touchpoint. Provide value or pose a question, and ask for permission to send the link.
   - **Zero Images / Attachments:** No logos, banners, or PDF attachments.
   - **Zero HTML Formatting:** Strip colored fonts, tables, and tracking widgets.
2. **Eliminate Trigger Keywords:**
   - Avoid: `Free`, `100% Guaranteed`, `Discount`, `$`, `Pricing`, `Cash`, `Click here`, `Urgent`, `Trial`.
3. **Implement Spintax (Message Variation):**
   - Cold filters flag identical content repeated across multiple inboxes.
   - Use nested spintax syntax:
     `{Hi|Hey|Hello} {FirstName}, {I noticed|I came across|I saw} {StoreName}'s size guide...`
4. **Zero-Bounce List Verification:**
   - Run all prospect email lists through verification tools (NeverBounce, MillionVerifier, Scrubby) before uploading to a campaign.
   - Immediately discard "Invalid" and "Catch-All / Risky" addresses.
   - Keep bounce rate strictly under **1.5%** (a 2%+ bounce rate will pause your inbox on Google/Outlook).
5. **Friction-Free Plain-Text Opt-Out:**
   - Include a low-friction plain-text exit in the signature:
     *"PS: If this isn't relevant to you, just let me know and I won't reach out again."*

---

## 3. Audit Framework: Before vs. After Transformation

When evaluating cold outreach copy (e.g., B2B jewelry outreach):

| Element | High-Spam-Risk Anti-Pattern (Original) | Deliverability-Optimized Pattern (Transformed) |
| :--- | :--- | :--- |
| **Sending Domain** | Root domain (`actualringsizer.com`) | Secondary isolated domain (`tryactualringsizer.com`) |
| **Sender Address** | `support@actualringsizer.com` (generic/bot flag) | `piyush@tryactualringsizer.com` (real personal name) |
| **Links in Email 1** | Hardcoded URL (`https://actualringsizer.com`) | Zero links; asks permission: *"Would you be open to a 20-sec preview?"* |
| **Pricing / Spam Words** | `Free for the first month`, `$[19]/month` | Discuss business outcome: *"reduce size returns and exchanges"* |
| **Format** | Formatted rich text / tracking pixels | 100% Plain text (mimics authentic 1-to-1 human email) |
| **Variability** | Static single template | Dynamic Spintax variations on greetings, hooks, and CTAs |

---

## 4. The 100% Zero-Cost / Free Cold Outreach Architecture ($0 Budget)

For bootstrapped founders, solopreneurs, and pilots targeting 30–100 prospects, you **do not need to pay for secondary domains, Google Workspace seats ($6/mo), or paid sequencers ($50–$100/mo)**.

### A. Zero-Cost Domain Isolation: Subdomains ($0.00)
- Instead of purchasing a new domain, create a **subdomain** on your existing product domain:
  - Examples: `reach.actualringsizer.com`, `connect.actualringsizer.com`, or `mail.actualringsizer.com`.
- **Why this works:** In DNS specifications, subdomains have their own dedicated SPF, DKIM, and DMARC records. If your outreach subdomain encounters spam penalties, your primary apex domain (`actualringsizer.com`) is insulated from total failure.

### B. Free Professional Business Inboxes ($0.00)
- **Zoho Mail Forever Free Plan:**
  - Up to **5 free business mailboxes** on your custom domain/subdomain (e.g., `piyush@reach.actualringsizer.com`).
  - 5 GB storage per mailbox.
  - Native DNS authentication support: SPF, 2048-bit DKIM, DMARC.
  - Cost: **$0.00 forever** (no credit card required).
- **Alternative: Cloudflare Email Routing + Personal Gmail ($0.00):**
  - Cloudflare Email Routing forwards inbound emails from `piyush@actualringsizer.com` or `connect.actualringsizer.com` to your personal Gmail for free.
  - Configure Gmail's "Send mail as" (alias) using an authenticated free SMTP relay (such as Brevo's free 300 emails/day SMTP with custom DKIM).

### C. Zero-Cost Lead Verification ($0.00)
- Never pay for verification credits when testing a 30–50 lead pilot:
  - **ZeroBounce:** 100 free verification credits upon signup.
  - **MillionVerifier:** 100 free credits on trial.
  - **EmailListVerify:** 100 free credits upon registration.
  - For a list of 30 jewelers, free tier credits cover 100% of your verification needs.

### D. Zero-Cost "Organic 2-Way" Warmup Protocol ($0.00)
- For sending 10–15 emails/day, you do not need a $40/mo automated warmup pool.
- **The 7-Day Peer Warmup Method:**
  1. Create your new inbox (`piyush@reach.actualringsizer.com`).
  2. Send 3–5 emails per day to your personal Gmail, Outlook, and trusted friends/colleagues.
  3. Have the recipients reply with natural 2-sentence conversational text, star the message, and mark it as "Important" / "Not Spam".
  4. Day 7+: Your inbox gains trusted sender history on Google and Microsoft algorithms for free.

### E. "Sniper Outreach" vs. "Shotgun Blasts" (Why 30 Leads Win on $0)
- When reaching out to independent boutique businesses (e.g., Shopify/WooCommerce jewelers), automated bulk software looks generic and lands in spam.
- **The Sniper Strategy:**
  - Send **10 to 15 personalized plain-text emails per day** directly from your authenticated free mailbox.
  - Takes 15 minutes a day.
  - Delivers **95%+ Primary Inbox placement** (zero sequencer tracking pixels).
  - Produces a **15%–25% reply rate** (vs. 1%–2% on mass automated blasts).

### F. Free Email Warmup Tools & Sequencer Comparison (2024–2026 Landscape)
1. **AutoMailer (automailer.io):**
   - **Verdict:** Highly viable free alternative to Instantly/Smartlead for bootstrapping.
   - **Strengths:** Free forever tier with unlimited connected inboxes, sequence builder, dynamic Spintax support, and inbox rotation without upfront credit card requirements.
   - **Caution:** Turn OFF open/click tracking on cold step #1 (to eliminate shared redirect tracking penalties), enforce plain text copy, and keep daily output to 15–20 emails/day per connected inbox.
2. **TrulyInbox (⚠️ WARNING: Changed to 7-Day Trial Only):**
   - **Caution:** TrulyInbox previously advertised a free tier, but now converts all new accounts to a strict **7-Day Free Trial** that locks and demands paid upgrades. **Do NOT pick TrulyInbox for free bootstrap setups**; email warmup requires 14–21 continuous days to build inbox reputation.
3. **Mailflow.io (Originally QuickMail Auto-Warmer — Recommended $0 Option):**
   - Free pool tier supporting 5–10 warmup emails/day per inbox. Threaded real peer conversations.
4. **Mails.ai (Free Plan):**
   - Pre-warmed workspace routing with 3,000 free events/month.
5. **E-Warmup (Free Forever Tier):**
   - 1 mailbox, 10 warmup sends/day, plus 5 free deliverability audits/month.
6. **Apollo.io (Free Plan):**
   - Includes sequence builder + Warmbox-powered automated mailbox ramp-up pacing.

---

## 5. Checking Where Your Emails Land (Inbox, Promotions, Spam)

You cannot see a recipient's folders, so test with mailboxes you control or a seed-test service.

1. **Seed test with your own accounts (free, most reliable for a personal Gmail):** send the exact pitch,
   links included, to 2–3 addresses you own on different providers (a second Gmail, an Outlook.com,
   a Yahoo). Don't open them first from the sender account. Note the folder: Primary / Promotions /
   Spam (Outlook: Focused / Other / Junk). Repeat after any copy change.
2. **mail-tester.com (free, 3 tests/day):** send to the one-time address it shows, get a /10 score with
   SPF/DKIM/DMARC, blacklist and content checks. A plain Gmail sender usually scores 9–10; anything
   below 8 names the fix.
3. **Inbox-placement seed services:** GlockApps (a few free tests on signup) sends to ~30–80 seed
   inboxes and reports Inbox / Promotions / Spam per provider. Warm-up tools (Mailivery, Instantly,
   Lemwarm) also show an inbox-placement % from their own pool, but that pool is friendlier than real
   recipients, so treat it as an upper bound.
4. **Signals in your own mailbox:** bounce notices (`mailer-daemon`), replies landing, and Google's
   "This message might be dangerous" or "Be careful with this message" warnings on test sends.
5. **Domain senders only:** Google Postmaster Tools shows spam rate and reputation for a custom
   domain sending 100+ emails/day to Gmail. It doesn't work for a `@gmail.com` sender.

Gmail-specific: Promotions is triggered more by layout (HTML, images, many links, unsubscribe
footers) than by words. A short plain-text note with one or two links usually lands in Primary.

---

## Gemini (Antigravity) Execution SOP
1. **Activation:**
   - Announce `**[Skill Active: cold-email-deliverability-operator]**`.
2. **Infrastructure Triage:**
   - Immediately check the user's sending domain, authentication records (SPF/DKIM/DMARC), and current sender address.
   - If they are sending from their main product domain or a generic address (`support@`), issue an urgent warning regarding root domain protection.
3. **Blueprint Generation:**
   - Provide a step-by-step checklist tailored to their tech stack (DNS registrar, email provider, cold sending platform).
   - Rewrite their cold email template into 100% deliverability-safe copy (plain text, zero links in Email 1, spintax-ready, conversational CTA).
4. **Approval Gate:**
   - Always respect the Human-in-the-Loop Approval Gate before modifying live DNS records, purchasing domains, or launching external campaigns.

## Claude Execution SOP
1. Read this shared `SKILL.md` before advising on cold email campaigns or deliverability diagnostics.
2. Structure advice across the 5 core pillars: Domain Isolation, DNS Auth, Mailbox Caps, Warmup, and Copy Hygiene.
3. Deliver transformed, deliverability-safe email sequences with Spintax syntax and zero spam triggers.
