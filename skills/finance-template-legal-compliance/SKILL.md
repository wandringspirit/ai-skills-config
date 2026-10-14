---
name: finance-template-legal-compliance
description: >-
  Legal and compliance check for selling tax, bookkeeping, expense, budget or cost calculators, spreadsheets,
  Notion/Sheets templates and calculator websites to US, UK and Australian consumers. Covers where licensing starts
  (tax advice vs a tool), what disclaimers can and cannot do, consumer law that cannot be contracted out of, reuse of
  official IRS/HMRC categories, government-name misuse, UK Making Tax Digital, and when an expert accuracy review is
  worth paying for. Activate whenever the user asks "do I need a CPA/accountant/tax consultant to check this",
  "is this disclaimer enough", "is it legal to sell this template/calculator", or fact-checks advice on those topics.
---

# Finance Template & Calculator Legal Compliance (`skills/finance-template-legal-compliance`)

Facts verified 2026-10-14. Re-verify anything dated before relying on it; tax thresholds and rates change every year.
This is general information for building products, not legal advice; for a real dispute or a large launch, ask a lawyer
in the buyer's country.

---

## 1. Where licensing starts (the tool vs advice boundary)

Selling a blank template with formulas and public categories needs no licence in the US, UK or Australia. Licensing
attaches to doing tax work for a specific person, not to selling a tool.

| Country | What is regulated | What is not |
|---|---|---|
| US | Preparing someone's return for pay needs a PTIN (Treas. Reg. 1.6109-2); a few states (CA, OR, MD, NY) add preparer registration. Representing taxpayers before the IRS is limited to CPAs, attorneys and enrolled agents (Circular 230). The CPA licence protects audit/attest work and the CPA title. | Tax advice as such is not reserved to CPAs. Selling templates or software. |
| UK | Tax advice is largely unregulated; protected titles (e.g. Chartered Tax Adviser) belong to professional bodies. | Selling templates, spreadsheets, software. |
| Australia | Providing a "tax agent service" for a fee requires Tax Practitioners Board registration (Tax Agent Services Act 2009). Tailored tax advice sold to a client is the risk area. | General-information calculators and blank templates. |

Common mistake in AI-generated advice: framing tax advice as "unauthorized practice of law/CPA". In the US the real
lines are PTIN (paid preparation), Circular 230 (representation) and state preparer rules.

## 2. What a disclaimer can and cannot do

A disclaimer sets expectations and helps against claims that the buyer relied on the tool as personal advice. It does
NOT remove all liability. Never let copy or advice say it is "ironclad" or "removes all liability".

- UK: Consumer Rights Act 2015 s.47 makes any term void to the extent it excludes or restricts liability for digital
  content being of satisfactory quality (s.34), fit for a stated purpose (s.35) and as described (s.36). A broken
  formula still entitles the buyer to repair/replacement or a price reduction/refund.
- UK: digital downloads carry a 14-day cancellation right unless, before download, the buyer gives express consent to
  immediate supply and acknowledges losing the right (Consumer Contracts Regulations 2013, reg. 37). Check the checkout
  or the merchant of record collects this.
- US: the FTC judges the net impression of marketing; a disclaimer does not cure a false or misleading claim
  ("maximize deductions", "audit-proof", "IRS-compliant").
- Australia: Australian Consumer Law guarantees (acceptable quality, fit for purpose, matches description) cannot be
  excluded by contract.
- Practical liability is refunds, chargebacks and reviews, which no disclaimer prevents. Accuracy is the real shield.

## 3. Reusing official categories and wording

- US federal government works are public domain (17 U.S.C. 105): Schedule C line names and IRS publication text can be
  copied.
- GOV.UK content is under the Open Government Licence v3.0: reuse is allowed with attribution
  ("Contains public sector information licensed under the Open Government Licence v3.0").
- Categories say where an expense is reported, not whether a specific expense is deductible. Limits still apply
  (e.g. US business meals generally 50%; UK simplified expenses and use-of-home flat rates; mileage rates change yearly).
  A template that only sorts expenses is low risk; one that computes deductions or tax is higher risk.

## 4. Government names and logos

- US: 31 U.S.C. 333 prohibits using Treasury/IRS names, initials, emblems or seals in a way that suggests approval,
  endorsement or association. The Bureau of the Fiscal Service says a disclaimer is legally irrelevant to a violation.
  No IRS logo, no "IRS-approved", no look-alike seals. Plain factual references ("categories follow Schedule C") are fine.
- UK: do not use HMRC or GOV.UK branding or imply HMRC recognition. "HMRC-recognised" applies only to software on HMRC's
  official MTD software list.

## 5. UK Making Tax Digital for Income Tax (MTD ITSA)

- Live since 6 April 2026 for sole traders and landlords with qualifying income over £50,000 (based on 2024-25 figures);
  over £30,000 from April 2027; over £20,000 from April 2028.
- In scope taxpayers must keep digital records and send quarterly updates through HMRC-recognised software, plus an
  annual final declaration. First quarterly deadline was 7 August 2026.
- A spreadsheet is allowed only together with bridging software from HMRC's list, with digital links between steps.
- So a UK self-employed tracker must state this plainly. Selling it as a complete tax solution to an in-scope buyer is
  misleading. Opportunity: design the sheet to export cleanly to common bridging tools, without claiming HMRC recognition.

## 6. Do you need an expert accuracy review?

Legally: no, for any of the countries above. Commercially:

| Product | Review |
|---|---|
| Sorts income/expenses into official categories, no tax maths | Optional. Self-check category names against the current year's Schedule C / SA103 guidance. |
| Computes deductions, mileage, home office, self-employment tax, set-aside %, quarterly estimates | Worth a paid one-off review (about 1 hour with an enrolled agent, CPA or UK accountant) each tax year before selling. |
| Calculators that apply rebates, credits or new tax rules | Required in practice: test against official worked examples and record source URL + effective dates per rule. |

## 7. Pre-launch checklist

- [ ] No claim of approval, compliance or guaranteed savings; no government logos or seals.
- [ ] Every rate and threshold shows its tax year and source link; a yearly update is scheduled.
- [ ] Formulas tested against official worked examples; edge cases (zero, negative, over-threshold) checked.
- [ ] Disclaimer on the sales page and inside the product (start tab), using the wording in section 8.
- [ ] UK: MTD statement present if the buyer could be in scope; checkout collects digital-content consent.
- [ ] Refund policy written and consistent with consumer law (do not say "no refunds" to UK/AU consumers).
- [ ] OGL attribution if GOV.UK text is reused.

## 8. Disclaimer wording (starting point)

> This spreadsheet is a record-keeping and educational tool. It is general information, not tax, legal or financial
> advice, and it does not take your personal circumstances into account. Categories and rates reflect [tax year] and
> official guidance from [IRS / HMRC] at that date; rules change, so check current guidance. For advice on your own
> situation, consult a CPA, enrolled agent or chartered tax adviser. [UK: If you are within Making Tax Digital for
> Income Tax, you must also use HMRC-recognised software, such as bridging software, to submit your updates.]

Pair it with accurate formulas and a fair refund policy; the wording alone does not limit statutory consumer rights.

---

## Claude Execution SOP

1. Identify the product type (sorting template vs calculator with tax maths vs advice service) and the buyer countries.
2. Walk sections 1 to 6 for those countries; re-verify any dated fact (MTD thresholds, rates, pending rule changes)
   with a quick web search and cite official sources (IRS, GOV.UK, legislation.gov.uk, TPB, FTC).
3. When fact-checking pasted advice, separate: correct, overstated, wrong, missing. Lead with the verdict.
4. Give the user a corrected disclaimer and the section 7 checklist items that apply. State plainly that this is not
   legal advice and when a lawyer is worth it.

## Gemini (Antigravity) Execution SOP

1. Load this skill whenever a digital product touches tax, bookkeeping, budgeting or rebate calculations.
2. Apply sections 1 to 6 to the specific product and buyer countries; verify dated facts against official sources
   before stating them.
3. Never describe a disclaimer as removing all liability, and never suggest government logos or "approved" claims.
4. Output the applicable checklist items and the adapted disclaimer from section 8.
