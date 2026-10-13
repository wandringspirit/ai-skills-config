---
name: india-solopreneur-tax-accounting
description: Indian Income Tax (IT Act 1961), GST, Presumptive Taxation (Section 44AD/44ADA), and digital product business expense accounting architect for creators, solopreneurs, and bootstrapped startups operating from personal bank accounts.
---

# Indian Solopreneur & Digital Creator Tax & Accounting Architecture

This skill provides an authoritative, legally grounded roadmap for digital product creators, course creators, e-commerce solopreneurs, and SaaS builders in India. It covers business expense deductions, personal account banking, GST thresholds, Section 44AD/44ADA presumptive taxation, Meta Ads GST handling, and Razorpay bookkeeping.

---

## 1. Legal Entity & Personal Account Realities

### Sole Proprietorship = Personal PAN
- In India, an individual selling courses, software, or digital goods without a formal LLP or Private Limited incorporation is legally considered a **Sole Proprietorship**.
- Under the Income Tax Act, 1961, **there is zero legal distinction between an individual and their sole proprietorship**. Your PAN card is your business PAN card.
- **Can you use a personal bank account?**
  - **Yes, legally 100% permitted.** Razorpay settlements can flow directly into your savings bank account.
  - However, for clean bookkeeping and to avoid mixing groceries/rent with business cashflow, open a separate zero-balance savings account (or current account under your name or trade name like PersonaLabs Academy) dedicated exclusively to business inflows and outflows.

---

## 2. Business Expense Deductions (Section 37(1))

### Are Meta Ad Expenses Deductible?
**YES, 100% deductible.** Under **Section 37(1)** of the Income Tax Act, 1961, any expenditure laid out or expended wholly and exclusively for the purposes of the business or profession is deductible from gross income before calculating taxes.

### Complete List of Eligible Business Deductions:
1. **Ad Spend (Meta / Google / YouTube Ads):** All amounts spent on running advertisements (including the 18% GST charged on ad receipts if you don't claim ITC).
2. **Payment Gateway Charges:** Razorpay / Stripe transaction fees (~2% + GST).
3. **Hosting & Infrastructure:** Vercel, Supabase, Cloudflare, AWS, Domain renewals (Porkbun, Namecheap).
4. **AI & Software Subscriptions:** Midjourney, Kling AI, ChatGPT Plus, SeaArt, CapCut, Canva, ManyChat, Google Workspace.
5. **Telecom & Utilities (Pro-rated):** Broadband Wi-Fi and mobile phone recharge used for running and monitoring ads.
6. **Equipment Depreciation (Section 32):** Laptops, smartphones, monitors purchased for business operations (typically 40% depreciation per year for computers).

### The Core Net Profit Formula:
$$\text{Taxable Business Profit} = \text{Gross Razorpay Settlements} - \sum(\text{Eligible Business Expenses})$$

You **never** pay tax on gross revenue; you only pay income tax on **Net Cash Profit**.

---

## 3. Presumptive Taxation Scheme (Section 44AD vs Normal Bookkeeping)

For Indian digital businesses with turnover under ₹2 Crores (extended to ₹3 Crores if 95%+ of transactions are digital):

### Section 44AD (Deemed Profit Scheme for Businesses)
- Designed to relieve small entrepreneurs from the burden of maintaining audited books of accounts and hiring chartered accountants for statutory audits.
- **Rate for Digital Receipts:** Under Section 44AD, if all receipts are received through banking channels/UPI/digital gateways (like Razorpay), your minimum deemed taxable profit is **only 6% of gross turnover** (8% for cash).
- **Practical Application:**
  - If your course generates **₹10,00,000** in digital sales in a financial year, you can declare **₹60,000 (6%)** as your taxable business income.
  - If your actual profit is higher and you want to be conservative, you can declare your actual profit (e.g., 20% or 30%).
  - If your total taxable income is below the basic exemption limit (under the New Tax Regime, income up to ₹3,00,000 has 0% tax, and up to ₹7,00,000 has full Section 87A rebate resulting in ₹0 tax payable), your effective tax liability is **₹0**!
- **Which ITR form?** File **ITR-4 (Sugam)**.

### Normal Bookkeeping (ITR-3)
- If your actual profit margin is significantly lower than 6% (e.g., after heavy ad spend), or if you want to track exact line-by-line expenses:
- Maintain a basic P&L spreadsheet:
  - Inflows: Razorpay settlement reports.
  - Outflows: Meta Ads receipts (`Billing & Payments -> Payment history -> Download invoice`), Vercel bills, tool receipts.
- File **ITR-3** under "Profits and Gains from Business or Profession (PGBP)".

---

## 4. GST (Goods & Services Tax) Compliance

### Threshold Exemption Limit:
- In India, registration under GST is mandatory only when annual turnover from services / digital goods exceeds:
  - **₹20 Lakhs** (for standard states).
  - **₹10 Lakhs** (for special category northeastern states).
- **Until you cross ₹20 Lakhs in sales:** You do **not** need a GST number, you do **not** collect GST from Indian buyers, and you do **not** need to file monthly GST returns.

### Meta Ads GST & Invoicing:
- Meta Ads India charges **18% GST** on ad spend for unregistered advertisers.
- When you do not have a GST number:
  - Meta adds 18% GST to your ad invoices.
  - That 18% tax simply becomes part of your total deductible ad expenditure under Section 37(1) of the Income Tax Act!
- Once your business scales past ₹20L and you obtain a GSTIN:
  - Add your GSTIN to Meta Ads Manager (`Billing & payments -> Accounts -> Business info`).
  - You can then claim **Input Tax Credit (ITC)** on the 18% GST paid to Meta against any GST collected on course sales.

---

## 5. Razorpay & 1% TDS (Section 194-O)

- Under Section 194-O of the Income Tax Act, e-commerce operators / payment gateways are mandated to deduct **1% TDS** on gross sales if total sales exceed ₹5 Lakhs in a financial year for individual PANs.
- Any TDS deducted by Razorpay is credited directly against your PAN card and will reflect in your **Form 26AS / AIS** on the Income Tax portal (`eportal.incometax.gov.in`).
- When filing your annual ITR, this 1% TDS is adjusted against your tax liability, or refunded directly to your bank account if your tax payable is zero!

---

## 6. Actionable Solopreneur Financial Setup Checklist

1. **Keep a Simple Monthly Spreadsheet (`P&L.xlsx`):**
   - Column A: Date
   - Column B: Category (`Ad Spend`, `Razorpay Payout`, `Software`, `Hardware`)
   - Column C: Description (e.g. `Meta Prepaid Add Funds`, `Razorpay Settlement ORD-MV6FVGS`)
   - Column D: Inflow (+) / Outflow (-)
   - Column E: Receipt Link / Invoice PDF
2. **Download Meta Invoices Monthly:**
   - Go to `adsmanager.facebook.com` -> `Billing & payments` -> `Payment history`.
   - Click `Download all receipts` at the end of each month and save them to a Google Drive folder (`Finance/Meta-Invoices/2026/`).
3. **Reinvest Net Profit Confidently:**
   - Since ad spend reduces your taxable profit rupee-for-rupee, scaling ad spend on high-converting ads (`Ad 01`, `Ad 03`) is both cashflow-positive and tax-efficient.

---

## Gemini (Antigravity) Execution SOP

1. **Verify Jurisdictional Applicability:** Confirm business location (India), currency (INR), and legal structure (Sole Proprietorship vs registered company).
2. **Review Ad Account Invoicing:** Check Ads Manager billing setup to identify whether invoices are issued under Meta Payments Inc or Meta Ireland, and whether 18% GST is being levied.
3. **P&L Reconciliation:** Extract order transactions (e.g., from Orders DB Google Sheet) and reconcile gross revenue against ad spend to compute true net profit and tax provisions.
4. **Presumptive Taxation Recommendation:** Guide the user on Section 44AD applicability (6% deemed profit on digital sales) to simplify annual ITR-4 filing.
5. **Advance Tax Verification:** Calculate whether projected net profit creates tax liability exceeding ₹10,000 for the financial year; schedule quarterly advance tax reminders if triggered.

---

## Claude Execution SOP

1. **Assess Business Turnover vs GST Threshold:** Audit trailing 12-month gross revenue against the ₹20L threshold.
2. **Classify Expense Line Items:** Review creator bank statements/receipts for Section 37(1) compliance (Meta ads, tool APIs, hosting).
3. **Generate P&L & Tax Provision Summary:** Produce formatted tables detailing Gross Revenue, Allowable Deductions, Net Taxable Profit, and estimated tax under Old vs New Tax Regimes.
