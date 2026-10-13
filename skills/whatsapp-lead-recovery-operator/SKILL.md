---
name: whatsapp-lead-recovery-operator
description: WhatsApp Business Lead Recovery, Virtual vs. Real SIM Phone Provisioning, WhatsApp Anti-Ban Architecture, Meta Cloud API / Webhook Integration, and Abandoned Cart Recovery Funnels for Solopreneurs and Digital Product Creators. Activate whenever the user asks about WhatsApp numbers, virtual numbers for WhatsApp, avoiding bans, recovering abandoned checkout leads via WhatsApp or email, or setting up WhatsApp Business.
---

# WhatsApp Lead Recovery Operator (`whatsapp-lead-recovery-operator`)

## 1. Domain Knowledge & Architectural Standards

### A. Phone Number Provisioning for WhatsApp: Real SIM vs. Virtual VoIP
1. **The "Free Virtual Number" Pitfall (Why 99% Fail in 2026):**
   - **Carrier Lookup / VoIP Blacklisting:** Meta / WhatsApp uses carrier lookups (HLR / carrier type database). Virtual VoIP numbers from free apps (TextNow, Google Voice, Dingtone, TextFree, Receive-SMS-Free) are automatically detected and blocked with *"This phone number cannot be used to register a WhatsApp account."*
   - **Public OTP Snooping:** Public web SMS services expose incoming SMS messages to anyone on the internet. Anyone can hijack or reset the account.
   - **Algorithmic Spam Traps:** When a newly registered foreign number (+1 US, +44 UK, +62 Indonesia) initiates a cold message to a +91 Indian consumer, Meta's fraud detection assigns a high risk score. If even 1 or 2 users tap *"Report & Block"*, the account is permanently banned within minutes.
   - **No Recovery Key:** If WhatsApp logs out or prompts a 6-digit verification challenge, temporary numbers cannot receive a second OTP, resulting in total loss of chat history and customer leads.

2. **The 3 Legitimate, Ban-Proof Number Strategies:**
   - **Strategy 1: Secondary Prepaid Physical SIM or eSIM (Recommended for Solopreneurs):**
     - Cost: ₹0–₹100 (Jio / Airtel prepaid SIM or eSIM).
     - Install the standalone **WhatsApp Business App** alongside personal WhatsApp on the same phone (Dual SIM or eSIM).
     - 100% legitimate Indian mobile number (+91).
     - Immune to VoIP anti-fraud blacklists.
     - Builds trust with Indian buyers (displays verified Business Profile, Catalog, Website, and Business Hours).
   - **Strategy 2: Paid Real-SIM SMS Verification Pool (For Disposable/Testing only):**
     - Platforms: SMS-Activate, 5SIM.
     - Uses real SIM card pools (not VoIP) for a one-time OTP (~₹30–₹70).
     - *Limitation:* Cannot re-verify if logged out; international country codes cause drop-offs in Indian consumer trust.
   - **Strategy 3: Official Meta WhatsApp Cloud API / BSP (Wati, Interakt, AiSensy):**
     - Requires a fresh phone number not currently registered on WhatsApp app.
     - Official green-tick capability, approved template messaging, automated abandoned cart webhooks.

### B. High-Converting Abandoned Checkout Recovery Protocol
1. **Timing Windows:**
   - **T + 15–30 Minutes:** Warmest window. Customer experienced a friction point (UPI timeout, bank server glitch, distraction).
   - **T + 4–6 Hours:** Reminder window with social proof or bonus offer.
   - **T + 24 Hours:** Final courtesy notice before order link expires.

2. **WhatsApp Recovery Copy Rules (Non-Salesy, High-Empathy):**
   - Never sound like an aggressive automated sales bot.
   - Frame the message as technical customer support checking if the payment gateway or UPI app failed.
   - Include direct customer first name, specific product ordered, and a 1-click retry payment link.
   - Provide an easy out (*"If you already completed it, please ignore this!"*).

3. **Fallback Channel: Email Recovery (Zero-Phone-Number Needed):**
   - When phone outreach is not preferred or number privacy is strictly required, fallback to 1-to-1 personalized email from the official branded domain/Gmail.
   - Delivers identical recovery rates (15%–25%) without exposing any personal phone number.

---

## Gemini (Antigravity) Execution SOP
1. When the user asks about temporary or virtual WhatsApp numbers:
   - Announce `**[Skill Active: whatsapp-lead-recovery-operator]**`.
   - Provide honest, technical reality check regarding free VoIP numbers (instant bans, security risks, carrier blocking).
   - Offer the three practical paths:
     1. Zero-cost Email Fallback (100% private, no phone number needed).
     2. Dedicated Secondary Indian SIM / eSIM (₹100, official WhatsApp Business).
     3. Temporary Non-VoIP SMS Pools (SMS-Activate, ~₹40).
   - Provide ready-to-use, compliant recovery message scripts for both WhatsApp and Email.

## Claude Execution SOP
1. Read this shared `SKILL.md` before advising on WhatsApp communication, virtual numbers, or abandoned checkout sequences.
2. Ensure all messaging templates comply with WhatsApp Business messaging policies and do not trigger spam reporting.
