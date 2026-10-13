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
