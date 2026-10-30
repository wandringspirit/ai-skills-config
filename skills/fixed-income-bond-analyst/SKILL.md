---
name: fixed-income-bond-analyst
description: Comprehensive framework for analyzing retail fixed-income corporate bonds, Non-Convertible Debentures (NCDs), Securitized Debt Instruments (SDIs), cash flow schedules, XIRR / IRR calculation, coupon yield vs. amortizing bond return analysis, and platform audits (Wint Wealth, Grip Invest, Jiraaf, GoldenPi).
---

# Fixed-Income & Corporate Bond Yield Analyst

Authoritative framework for analyzing retail fixed-income securities, evaluating corporate bonds, NCDs (Non-Convertible Debentures), SDIs (Securitized Debt Instruments), and calculating true annualized returns across platforms like Wint Wealth, Grip Invest, Jiraaf, and IndiaBonds.

---

## 1. Core Bond Mathematics & Return Terminology

When retail investors review bond dashboards, confusion often arises between **Coupon Rate**, **XIRR / Yield to Maturity (YTM)**, and **Simple Annualized Return**.

### A. Bullet Bonds vs. Amortizing Bonds
1. **Bullet Repayment Bonds**:
   - The entire principal (e.g., ₹10,000 per bond) is locked until the final maturity date.
   - The investor receives only coupon interest periodically (monthly, quarterly, or annually).
   - Principal is returned 100% at maturity.
   - Formula:
     $$\text{Annual Return} = \frac{\text{Annual Coupon Payment}}{\text{Invested Amount}} \approx \text{YTM}$$

2. **Amortizing Bonds (Structured / Part-Redemption / Monthly EMI Style)**:
   - Very common in retail NBFC NCDs and SDIs (e.g., Akara Capital, Mahaveer Finance, KrazyBee, etc.).
   - The issuer returns a portion of the **principal along with interest** every month or quarter.
   - Because outstanding principal decreases with every payout, the total interest earned in absolute rupees looks lower than a bullet bond, but the **internal rate of return (IRR / XIRR)** on active capital remains high (e.g., 11%–14% p.a.).

---

## 2. Reading Platform Portfolio Metrics (e.g., Wint Wealth / Grip / Jiraaf)

| Dashboard Column | Meaning | Key Formula / Notes |
| :--- | :--- | :--- |
| **Bond Name & Qty** | Instrument name, quantity held, and coupon frequency | e.g., "2 qty · Monthly interest" |
| **Upcoming (Tenure Left)** | Total cash flows yet to be received (Remaining Principal + Remaining Interest) over the remaining months | Upcoming = Outstanding Principal + Expected Future Interest |
| **Received (Interest)** | Cumulative cash flows already credited to the investor's bank account (Total Received / Split of Interest) | Received = Capital Repaid + Interest Paid |
| **Invested (Maturity)** | Initial principal invested vs. total scheduled payout at the end of the tenure | Maturity / Total Payout = Principal + Total Interest |

### Interpreting Discrepancies
- **Why Simple Annual Return $\neq$ XIRR**:
  $$\text{Simple Annual Return} = \frac{\text{Total Profit}}{\text{Initial Invested}} \times \frac{12}{\text{Tenure Months}}$$
  In an amortizing bond, this yields an apparent return of ~7% to 8%, because the initial principal is divided over the full tenure, ignoring that the investor got half their money back halfway through.
- **True Annualized Return (XIRR / IRR)**:
  Measures the exact annualized return taking into account the exact dates cash is returned into the investor's account:
  $$\sum_{t=0}^{N} \frac{C_t}{(1 + \text{XIRR})^{t/365}} = 0$$

---

## 3. Step-by-Step Portfolio Calculation Protocol

1. **Extract Core Parameters**:
   - Issuer name, ISIN, credit rating (e.g., BBB, A-, AA).
   - Payout frequency (Monthly, Quarterly, Cumulative).
   - Quantity held, Purchase Price / Invested Amount ($P_{\text{inv}}$).
   - Expected Total Payout / Maturity Amount ($P_{\text{mat}}$).
   - Remaining tenure ($T$ months).

2. **Compute Absolute Profit**:
   $$\text{Absolute Profit} = P_{\text{mat}} - P_{\text{inv}}$$

3. **Compute Simple Annualized Return**:
   $$\text{Simple Annual Return (\%)} = \frac{\text{Absolute Profit}}{P_{\text{inv}}} \times \frac{12}{T} \times 100$$

4. **Compute Effective Annualized Return / XIRR (Cash Flow Discounting)**:
   - Model the monthly or quarterly periodic cash flow $C = P_{\text{mat}} / T$ (or schedule).
   - Solve for periodic rate $r$, then compute annualized effective yield:
     $$\text{Annualized Yield (Effective)} = (1 + r)^m - 1$$

5. **Provide Clear Context to Investor**:
   - Show both the absolute rupee gain, the simple annualized rate, and the true pre-tax XIRR / IRR.
   - Explain whether capital is returned periodically (amortizing) or at maturity (bullet).

---

## 4. Gemini (Antigravity) Execution SOP

1. **Verify Inputs**: Extract all numerical figures from uploaded screenshots or text.
2. **Execute Precise Computation**: Always run a Python script in workspace to calculate IRR, XIRR, simple interest, and periodic cash flows accurately without mental arithmetic approximations.
3. **Structured Reporting**:
   - Provide Bond-by-Bond breakdown (Invested, Expected Total, Net Gain, Tenure, Payout frequency).
   - Portfolio Total summary (Total Invested, Total Expected, Overall Profit).
   - Clear distinction between **Simple Annual Return** vs. **True Annualized Yield (XIRR)**.
   - Mention taxation notes (e.g., Section 193 TDS on listed NCDs, taxed at slab rate for individuals in India).

---

## 5. Claude Execution SOP

1. Maintain single source of domain knowledge in `SKILL.md`.
2. Follow standard bond evaluation frameworks and cash flow modeling.
3. Compute and present exact XIRR alongside simple annual return metrics.
