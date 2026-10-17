---
name: paypal-india-merchant-operator
description: PayPal India Business Account KYC unblocking, RBI compliance (OPGSP / Purpose Codes), micro-deposit bank confirmation, and Message Center compliance escalation operator for Indian creators and solopreneurs.
---

# PayPal India Merchant & Cross-Border Compliance Operator

This skill provides an authoritative, step-by-step operational protocol for Indian digital entrepreneurs, solopreneurs, and creators operating PayPal India Business accounts. It covers RBI regulatory frameworks, KYC/CIP bottlenecks, the "Identity verification in progress / You've done your bit" infinite loop, bank micro-deposit confirmation, and rapid support escalation.

---

## 1. Regulatory Context: RBI & OPGSP Framework

In India, cross-border retail export of goods and services via PayPal is strictly governed by the **Reserve Bank of India (RBI) Online Payment Gateway Service Provider (OPGSP)** guidelines and the Foreign Exchange Management Act (FEMA):

1. **No Storing Foreign Currency (Zero USD Wallet Balance):**
   - Indian PayPal accounts cannot hold foreign currencies in an e-wallet.
   - All inward foreign remittances (USD, EUR, GBP, etc.) must be automatically converted to INR and swept/withdrawn into a linked Indian bank account (SBI, HDFC, ICICI, etc.) within 24 to 48 hours.
2. **Mandatory Purpose Code Binding (RBI Requirement):**
   - Every transaction must carry an RBI Purpose Code.
   - Common codes for digital solopreneurs:
     - `P0802`: Software consulting / implementation.
     - `P0803`: Data processing, database services, online content portals.
     - `P0806`: Other information services.
     - `P1007`: Educational services / digital courses / e-learning.
3. **Mandatory KYC & CIP (Customer Identification Procedure):**
   - RBI mandates 100% full verification before a single rupee or dollar can be received or moved.

---

## 2. The 4 Mandatory Pillars of PayPal India Verification

An account cannot accept or withdraw payments until all 4 pillars are fully satisfied:

| Pillar | Requirement | How It Is Verified |
| :--- | :--- | :--- |
| **1. PAN Verification** | Personal PAN (Sole Proprietor) or Company PAN | Instant electronic match against Income Tax database (NSDL/UTIITSL). |
| **2. Purpose Code** | Default RBI export category | Selected in Account Settings -> Business Info -> Purpose Code. |
| **3. Bank Confirmation** | Linked Indian Bank Account (Current or Savings) | PayPal sends **2 random micro-deposits** (between ₹1.01 and ₹1.99). User must check bank statement and input both exact amounts. |
| **4. Identity & Address (CIP)** | Proof of Identity (Aadhaar / Passport / Voter ID) + Address | DigiLocker integration, Video KYC, or manual document upload processed via third-party compliance vendors. |

---

## 3. Anatomy of the "Indefinite Review Loop" (> 1 Week Stuck)

### Why Accounts Get Stuck on "You've done your bit. We'll get back to you in 2 to 3 days":
1. **Third-Party Vendor Webhook Drop:**
   - PayPal India uses automated vendor services (e.g. IDfy/Signzy) for document verification and Video KYC. If the vendor verifies your ID but their webhook fails to trigger PayPal's core ledger status update, the dashboard remains indefinitely stuck on `PENDING_REVIEW`.
2. **Silent String Mismatches:**
   - If the name on your PAN card is `PIYUSH GAUR`, but your SBI bank account is registered with an expanded/abbreviated name (e.g. `P GAUR` or middle name included), the automated algorithm flags the discrepancy and shunts the file into a **manual unassigned queue**.
3. **The Unassigned Queue Abyss:**
   - PayPal's internal ticket routing will not notify you of a discrepancy. Instead, it leaves the generic yellow/orange banner up indefinitely until an internal compliance officer manually claims the ticket.
4. **Unconfirmed Bank Account:**
   - The user often believes KYC is complete, but the linked bank account has not had its 2 micro-deposits confirmed.

---

## 4. The 4-Step Rapid Unblocking Protocol

### Step 1: Verify Bank Confirmation State
1. Go to `Pay & Get Paid` ➔ `Banks & Cards`.
2. Click directly on the linked bank account card (e.g. `STATE BANK OF INDIA Current account •••• 4038`).
3. Check the status badge:
   - If it says **"Confirmation Pending"** or shows a button **"Confirm Bank"**:
     - Check your SBI NetBanking / YONO statement for two micro-deposits from PayPal (e.g., `+₹1.14` and `+₹1.28`).
     - Enter those exact amounts. This immediately completes Pillar #3.
   - If it says **"Confirmed"**, proceed to Step 2.

### Step 2: Check Direct CIP & Resolution Center URLs
Often the main dashboard hides the specific required field. Open these direct URLs on desktop:
- **CIP Hub:** `https://www.paypal.com/policy/hub/cip`
- **Resolution Center:** `https://www.paypal.com/disputes/`
- **Notifications Hub:** Click the Bell icon ➔ click `See details` on the orange banner.

### Step 3: Submit a Direct Message Center Compliance Ticket
Do not wait for PayPal to reach out. Submitting a structured compliance ticket pulls your file from the unassigned queue into an active agent's SLA queue (typically resolved within 2 to 4 business hours).

1. Log into PayPal on desktop.
2. Click **Help** (top bar or footer) ➔ **Message Center**.
3. Click **New Message** (or "Ask the PayPal Assistant" ➔ type `"Agent"` or `"Speak to human"`).
4. Send this exact high-priority compliance escalation prompt:

```text
Subject: URGENT: Manual KYC/CIP Review Escalation - Account Stuck for > 7 Days (Piyush Gaur)

Dear PayPal Compliance Team,

My PayPal India Business Account has been stuck in the "Identity verification is in progress / You've done your bit" review state for more than 7 days, well past the standard 2-3 business day window.

All required compliance items and documents have been submitted:
1. Full Name: Piyush Gaur
2. Registered Email: [Your PayPal Email]
3. Primary PAN: [Your PAN Number]
4. Bank Account Linked: State Bank of India (Current Account ending in 4038)
5. RBI Purpose Code: P0803 (Data processing / information services) / P1007 (Educational services)

Our digital product store is actively launching international sales, and payments are currently blocked due to this automated queue delay. 

Please manually review my submitted verification documents and update my account status from PENDING to VERIFIED, or let me know immediately if any specific additional document is required.

Thank you,
Piyush Gaur
```

### Step 4: Phone Support Escalation (Monday–Friday 9 AM – 9 PM IST)
If Message Center does not respond within 24 hours:
1. Go to `paypal.com` ➔ scroll to bottom ➔ click **Contact**.
2. Click **Call Us**.
3. PayPal will display a **6-digit One-Time Passcode** (valid for 15 minutes) and the toll-free number: **1800 419 9838** (or `+91-44-6634-8000`).
4. Call, enter the 6-digit passcode on the dialpad, select "Business Account & Verification", and ask the representative to perform a **"Live File Sync on CIP Status"**.

---

## 5. Alternative Cross-Border Payment Rails for Indian Solopreneurs

While PayPal is being unfrozen, Indian solopreneurs selling digital products globally should not let one gateway block international revenue:

1. **Razorpay International:**
   - Enable International Cards directly inside Razorpay Dashboard (`Settings` ➔ `Payment Methods` ➔ `International Payments`). Works for USD/EUR/GBP credit and debit cards without requiring PayPal!
2. **Lemon Squeezy / Paddle (Merchant of Record - MoR):**
   - Handles global sales tax/VAT, accepts PayPal + Apple Pay + Cards, and remits payouts to Indian bank accounts.
3. **Dodo Payments / Stripe India:**
   - Stripe India (invite-only or registered entity) or Dodo Payments provides clean developer APIs for cross-border digital sales.

---

## Gemini (Antigravity) Execution SOP

1. **Analyze Current Verification State:** Inspect uploaded screenshots, checking dashboard alerts, bank confirmation indicators, and notification badges.
2. **Distinguish Architecture:** Clarify the difference between standard weekend processing delays and true stagnant queue bugs (> 7 days).
3. **Deliver Precise Escalation Script:** Provide the exact copy-paste message tailored to the user's name, linked bank (SBI Current `•••• 4038`), and business context.
4. **Audit Domestic vs. International Decoupling:** Ensure domestic sales remain 100% active on Razorpay while international PayPal rails are being unblocked.

---

## Claude Execution SOP

1. **KYC Document Checklist Review:** Verify PAN, bank statement, and identity proof alignment across all legal names.
2. **Escalation Path Recommendation:** Detail both digital (Message Center) and telephony (Toll-Free with 6-digit PIN) escalation routes.
3. **Cross-Border Contingency Planning:** Outline alternative international gateways to prevent vendor lock-in.
