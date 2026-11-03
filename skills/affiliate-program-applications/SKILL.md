---
name: affiliate-program-applications
description: Apply to affiliate networks (AvantLink, Impact, Amazon Associates, CJ, Rakuten) as a non-US publisher, especially from India, for a content or tool site; covers which network a merchant uses, what the application asks, tax forms (W-8BEN), payouts into India, and what to do after approval or rejection. Activate when the user asks how to join an affiliate programme, what documents are needed, or why an application was rejected.
---

# Affiliate programme applications (non-US publisher)

## Shared domain knowledge

### 1. Find the network first
- Merchants move networks. Check the merchant's own "affiliate" or "partner programme" page, then the network's
  marketplace search, before applying. Third-party lists (Lasso, Affilimate, UpPromote) are often stale and disagree.
- Outdoor/snow examples (checked Oct 2026): evo and REI run on **AvantLink**; Backcountry is on **Impact**
  (some older lists still say AvantLink; its old /sc/affiliate-program page returns 404).
- Two-step model on AvantLink and Impact: (1) get the network account approved, (2) apply to each merchant inside it.
  Each merchant approves separately.

### 2. What reviewers look at
- A finished site: no lorem ipsum, no empty pages, About, Contact, Privacy Policy, affiliate disclosure page or line.
- Relevant content for the merchant's products (sizing guides for ski/bike shops fit well).
- Traffic: Impact verified and queued a days-old site; **AvantLink refused one** (gearsizing.com, India,
  4 days live, ~0 visitors, Nov 2026: "website or affiliate model did not appear to be a fit"). AvantLink
  accepts under 30% of applicants, so apply there only once reads show steady US visitors (or with a
  written invitation from a merchant, which the refusal email says to reply with). REI is selective too.
- A refusal is cheap: no penalty seen, reapply after traffic grows. Don't argue by reply.
- A short honest description: site purpose, audience countries, traffic source (organic search), how links
  will be used (in-content links on calculators and size charts), monthly visitors (state the real number).
- Never: coupon/incentive traffic, brand-term paid search, or email to lists unless the merchant allows it.

### 3. Documents and details (individual in India, no company)
- Identity: full legal name as on PAN, address, email, phone. Accounts usually need 2FA.
- Website URL plus ownership (often a verification snippet or simply live content).
- **W-8BEN** (individual, non-US person) — filled online in the network dashboard, not mailed:
  name, country of citizenship (India), permanent address, foreign TIN = **PAN**, date of birth.
  Treaty claim (Part II): affiliate commissions for work done outside the US are generally not US-source
  income, so withholding is usually 0 either way; if the form forces a treaty article, India–US treaty
  Article 7 (business profits) is the common choice. Not tax advice: confirm with a CA.
  Valid until the end of the third calendar year after signing. A company uses W-8BEN-E instead.
- Payout: AvantLink pays through Tipalti (international bank transfer) or PayPal, ~$25 minimum, monthly
  around the 23rd–25th, only after the merchant has paid AvantLink. Impact pays by bank/PayPal with a
  ~$10–25 threshold. For Indian bank transfers: bank name, account number, IFSC, SWIFT/BIC, account name exactly
  as on PAN.
- No GST/company registration is needed to apply. In India: commissions are taxable business income
  (ITR-3/ITR-4 with 44ADA/44AD if eligible); keep FIRA/FIRC or bank advice for each foreign credit;
  PayPal India needs a purpose code (see `paypal-india-merchant-operator`). GST registration only above
  the services threshold (₹20 lakh) — see `india-solopreneur-tax-accounting`.

### 4. After approval
- Get links from the network's link builder (deep links to the exact product category).
- Add `rel="sponsored nofollow"` and a disclosure near the first affiliate link (FTC, UK ASA/CAP, Canada Competition Bureau).
- Respect each merchant's terms (no cloaking if forbidden, no price claims that go stale).

## Claude Execution SOP
1. Verify the merchant's current network with a fresh search or its own page; record the date checked.
2. Give the owner step-by-step instructions; the owner creates accounts and enters tax/bank details
   (Claude never handles passwords, PAN, bank numbers or tax IDs).
3. Draft the "describe your site" text for the owner to paste, using real traffic numbers only.
4. After approval, swap links in the site's data file, with the owner's OK for live pages; log it in CHANGES.

## Gemini (Antigravity) Execution SOP
Same steps as the Claude SOP. Do not fill account, tax or bank forms on the owner's behalf.
