---
name: fraud-scam-website-auditor
description: Forensic audit, threat intelligence, and risk evaluation operator for fraudulent, phishing, and scam websites. Covers fake task/recharge Ponzi portals (UniApp H5), brand impersonation, domain age/RDAP verification, Chinese turnkey scam template signatures, victim damage control, and reporting channels (APWG, Google Safe Browsing, CERT-In, registrar/hosting abuse). Activate whenever the user asks to analyze, verify, or review suspicious websites, investment/task apps, or links requesting recharges/deposits.
---

# Fraud & Scam Website Threat Intelligence Auditor (`fraud-scam-website-auditor`)

A rigorous forensic framework for dissecting suspicious URLs, phishing portals, predatory investment platforms, and turnkey task/recharge scam networks.

---

## 1. Threat Anatomy & Scam Archetypes

### A. The "Task / Recharge" Ponzi Engine (Pig Butchering / Southeast Asian Syndicates)
- **Modus Operandi:** Victims are lured via Telegram, WhatsApp, or Instagram with promises of "Part-time job", "Distributor daily earnings", or "Like YouTube videos / rate products for ₹2,000–₹10,000/day".
- **The H5 Web App:** Built using Vue.js / UniApp mobile web templates (served under `/h5/#/pages/...`), forcing a mobile app look and feel even on desktop.
- **The Recharge Trap (`#/pages/my/recharge`):** To "unlock" higher commissions or release earnings, victims must "recharge" their account wallet via UPI, IMPS, or USDT.
- **The Withdrawal Lockout:** Once money is deposited, withdrawals fail with fake errors ("credit score low", "pay 30% tax first", "system upgrade"). Deposited funds are never returned.

### B. Brand Impersonation & Typosquatting
- Legitimate corporate entities (e.g., Berger Paints, Tata, Reliance, Amazon, DHL) are impersonated using lookalike domains or subdomain tricks (e.g., `iknu.bergercoating.com` vs legitimate `bergerpaints.com`).
- Stolen high-resolution logos, fake corporate certificates, and fabricated MCA/incorporation documents are embedded in the UI.

---

## 2. The 6-Point Technical Forensic Audit Protocol

Whenever a suspicious URL is submitted, execute these 6 forensic verification checks:

### 1. Domain Registration & Age Check (RDAP / WHOIS)
- Query RDAP via `https://rdap.verisign.com/com/v1/domain/<domain>` or system RDAP endpoints.
- **Red Flag:** Any domain registered within the last 1–60 days claiming to represent a multi-decade corporate enterprise or handling high-volume investment/recharge funds is **guaranteed fraud**.
- **Registrar Analysis:** High-risk budget registrars (Dynadot, Namecheap, Alibaba, Gname, Nicenic) combined with privacy redaction services.

### 2. DNS & Reverse Proxy Profiling
- Run DNS resolution (`Resolve-DnsName` or `dig`).
- Check if the site hides behind Cloudflare proxy IPs (`104.21.x.x`, `172.67.x.x`) to conceal the true offshore hosting origin (commonly located in Hong Kong, Cambodia, Myanmar, Malaysia, or Russia).

### 3. Source Code & Scam Template Fingerprinting
- Inspect raw HTML/JS via curl or web request:
  - **Single Page App Hash Routing:** `/h5/#/pages/login/...`, `/h5/#/pages/my/recharge`, `/h5/#/pages/task/...`.
  - **Invite Code Gating:** Mandatory referral codes (`inviteCode`, `c=`, `code=`) without which new users cannot register.
  - **Turnkey Translation Artefacts:** Direct literal translations of Chinese boilerplate text:
    - `<noscript>The network is not smooth, please refresh the page</noscript>` (direct translation of "网络不顺畅，请刷新页面").
    - "Recharge record", "Withdrawal commission", "Team bonus", "VIP Grade".
  - **Fake Loading Simulators:** JavaScript timers that artificially tick up progress bars (0% to 100%) to simulate native mobile app initialization.

### 4. Financial Gateway & Payment Rail Inspection
- Legitimate businesses use registered merchant gateways (Razorpay, Cashfree, Stripe, PayU) tied to verified corporate GSTIN/EIN and bank accounts with automatic callbacks.
- Scam platforms use rotating peer-to-peer (P2P) mule accounts:
  - Personal UPI IDs (e.g., `xyz987@okaxis`, `merchant123@ybl`) rotated every few hours.
  - P2P crypto deposit addresses (TRC-20 USDT wallets).
  - Manual deposit proof upload (requiring users to take a screenshot of their transaction reference/UTR number).

### 5. Legal & Regulatory Verification
- Check official corporate registers:
  - **India:** MCA (Ministry of Corporate Affairs), SEBI (Securities and Exchange Board of India) investor alert list, RBI Sachet portal (`sachet.rbi.org.in`).
  - **US/Global:** SEC EDGAR, FTC warning list, UK FCA Register.
- Official primary domain cross-referencing (e.g., Berger Paints India is exclusively `bergerpaints.com`, not `bergercoating.com`).

### 6. Threat Intel & Reputation Feeds
- Check URL against:
  - Google Safe Browsing API / Transparency Report.
  - VirusTotal / URLhaus / PhishTank.
  - Open threat intelligence community reports.

---

## 3. Incident Response & Victim Damage Control Guide

If the user or someone they know has interacted with the malicious portal:

### A. If NO money was sent:
1. **Immediate Disengagement:** Close the site, do not register, do not share OTPs or phone numbers.
2. **Password Security:** If a shared password was entered during registration, change it immediately across personal email, banking, and social accounts.
3. **Block Outreach:** Block and report any Telegram/WhatsApp agents or recruiters who shared the link.

### B. If Money Was Already Sent (Golden Hour Response):
1. **India (Immediate 24-48 Hour Window):**
   - Call the **National Cybercrime Helpline: `1930`** immediately.
   - File a complaint on **`https://cybercrime.gov.in`** under "Financial Fraud".
   - Contact your bank/UPI provider immediately with the UTR number, stating it was a fraudulent transaction to initiate an emergency account freeze on the beneficiary mule account.
2. **International (US/EU/Global):**
   - US: File an IC3 report at **`https://ic3.gov`** and report to **`https://reportfraud.ftc.gov`**.
   - UK: Report to Action Fraud (`actionfraud.police.uk`).
   - Crypto: Mark the destination address on Tronscan/Etherscan as scam/stolen funds.

---

## 4. Takedown & Abuse Reporting Pipeline

To disable the malicious infrastructure and protect future victims:
1. **Cloudflare Abuse Submission:**
   - URL: `https://abuse.cloudflare.com/phishing`
   - Target URL, impersonated brand, and evidence of fake recharge/login flow.
2. **Registrar Takedown Notice:**
   - Send email to registrar abuse contact (e.g., `abuse@dynadot.com` or registrar web form) citing trademark infringement, phishing, and financial fraud.
3. **Google Safe Browsing Report:**
   - Submit URL to `https://safebrowsing.google.com/safebrowsing/report_phish/` to trigger red interstitial warnings in Chrome/Android.
4. **Target Brand Legal Alert:**
   - Notify the official legal/compliance team of the impersonated corporation (e.g., Berger Paints corporate legal/grievance cell).

---

## Gemini (Antigravity) Execution SOP

1. **Activation:**
   - Announce `**[New Skill Acquired & Pushed: fraud-scam-website-auditor]**` or `**[Skill Active: fraud-scam-website-auditor]**`.
2. **Forensic Triangulation:**
   - Always run DNS resolution, RDAP domain age verification, and safe page header/HTML sampling via CLI tools.
   - Cross-examine the target URL against official corporate domains and known scam signatures.
3. **Unambiguous Risk Verdict:**
   - Deliver an immediate, bold, clear warning header: **CRITICAL DANGER: FRAUDULENT SCAM WEBSITE**.
   - Break down the evidence: domain creation date, fake brand impersonation, H5 scam kit structure, and financial trap mechanics.
4. **Actionable Protection Steps:**
   - Provide concrete next steps (do not deposit, cybercrime reporting, helpline numbers).
5. **Auto-Push to Git:**
   - Commit and push skill additions to `wandringspirit/ai-skills-config` following standard protocol.

---

## Claude Execution SOP

1. Read this shared `SKILL.md` before analyzing any suspicious domain, investment link, or financial recharge portal.
2. Conduct forensic breakdown across Domain Age, Brand Spoofing, UniApp/H5 Signature, and Payment Mule architecture.
3. Issue a direct, unequivocal scam warning to prevent financial loss, followed by actionable emergency reporting numbers.
