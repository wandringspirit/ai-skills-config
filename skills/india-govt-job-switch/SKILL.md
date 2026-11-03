---
name: india-govt-job-switch
description: >-
  Map which Indian government jobs (UPSC CSE/ESE, regulator Grade A/B, PSU, DRDO/ISRO, state PSC,
  SSC) a private-sector professional can still apply for, from their CV, date of birth and category.
  Covers exact age-reckoning per exam, attempts left, degree-branch eligibility, the yearly
  calendar, pay versus private salary, and how to verify against official notices. Activate when
  the user asks "what government jobs can I get", "am I eligible for UPSC/ESE/RBI/SEBI", or wants
  to switch from a private job to a sarkari job.
---

# India Government Job Switch (`skills/india-govt-job-switch`)

## 1. Inputs to collect first

- **Date of birth** (exact day; most cut-offs hinge on a single day).
- **Category** (UR/EWS/OBC-NCL/SC/ST/PwBD, ex-serviceman). If unknown, compute for UR and state the
  standard relaxations: OBC +3, SC/ST +5, PwBD +10 (central exams).
- **Degree, branch, marks** (some posts need 60% or a specific branch).
- **Domicile state** (state PSCs give relaxations, sometimes reservations, only to domiciles).
- **Current location/salary** (exams are written in India; pay drop must be stated plainly).

## 2. Age reckoning: how to compute eligibility

Each exam states an age range "as on" a fixed date, written as a DOB window:
"born not earlier than D+1 of year (Y − upper) and not later than D of year (Y − lower)".
So for upper limit U and reference date R, eligible iff DOB ≥ (R − U years) + 1 day.
Compute every remaining cycle year by year; never say "you are under 30 so eligible".

| Exam | Range (UR) | Reference date | Notes |
|---|---|---|---|
| UPSC CSE (IAS/IPS/IFS etc.) | 21–32 | 1 Aug of exam year | 6 attempts UR, 9 OBC, unlimited SC/ST till age limit |
| UPSC ESE (Engineering Services) | 21–30 | 1 Jan of exam year | Civil/Mech/Electrical/E&T only; notification ~Sep, prelims Jan–Feb |
| UPSC IFoS | 21–32 | 1 Aug | Needs science/engineering degree; shares CSE prelims |
| RBI Grade B (General/DEPR/DSIM) | 21–30 | ~1 Apr (2026 cycle) | Notification ~Apr–May, Phase 1 June; 60% in graduation |
| SEBI / NABARD / SIDBI / IRDAI / PFRDA Grade A | ~21–30 | set per notice | SEBI has an IT stream; check branch wording each year |
| GATE-based PSU Executive Trainee | usually 26–28 | per notice | Mostly closes by 28 for UR |
| DRDO RAC Scientist 'B' (via GATE) | reported 35 (2025 cycle), was 28 earlier | per notice | Verify on rac.gov.in |
| ISRO Scientist/Engineer 'SC' | 28 | closing date | |
| SSC CGL | 18–27/30/32 by post | 1 Jan/1 Aug per notice | Group B/C; big pay cut for experienced engineers |
| State PSC (UPPSC, RPSC, MPPSC, HPSC…) | up to 37–42 | per notice | UPPSC 21–40 as on 1 Jul; longest runway |
| Territorial Army officer | 18–42 | per notice | Part-time while keeping a civilian job |

Defence direct entries (CDS, AFCAT, SSC Tech) close at 24–27: rule them out for anyone 28+.

## 3. Branch eligibility traps

- IBPS SO IT Officer usually lists CS/IT/ECE/E&TC/Instrumentation, **not Electrical**. An EE graduate
  working in software is often ineligible despite experience.
- SBI/bank lateral IT roles (Deputy/Assistant Manager Systems) often require CS/IT/ECE or MCA plus
  years of experience; read the qualification line.
- ESE and GATE-based PSUs take the degree branch, not the job domain: an EE grad in software writes EE.

## 4. Fit heuristics for a software professional

- **Tech-aligned, highest ROI:** SEBI Grade A IT, RBI Grade B / RBI IT officer posts, NIC Scientist-B,
  DRDO Scientist B (GATE CS or degree branch), CERT-In/CDAC specialist roles.
- **Administrative:** UPSC CSE (3–4 attempts if starting at 28), state PSC (long runway).
- **Engineering-branch:** ESE/PSU via original branch; needs relearning a branch not used for years.
- Contractual MeitY / Digital India / UIDAI roles are not permanent government service.

## 5. Pay reality check (7th CPC, approximate)

IAS Level 10 starts at ₹56,100 basic (~₹1–1.3 lakh/month gross with DA/HRA). RBI Grade B and SEBI
Grade A gross ~₹1.5–1.9 lakh/month. A 5-year private SDE usually takes a large cash cut; the trade is
security, pension (NPS/UPS), perks and authority. Say this explicitly.

## 6. Verification rule

Coaching and aggregator sites disagree on age dates and relaxations. Before quoting any deadline or
age window, search for the current cycle, and send the user to the official source: upsc.gov.in,
opportunities.rbi.org.in, sebi.gov.in/careers, rac.gov.in, uppsc.up.nic.in, ssc.gov.in.
State "today's date" and mark windows that have already closed.

## Claude Execution SOP

1. Read the CV (PDF: extract text with `pypdf` and `PYTHONIOENCODING=utf-8` on Windows if page
   rendering fails). Ask for DOB/category only if missing.
2. Run WebSearch (standard) for the current cycle of each candidate exam in one turn.
3. Compute eligibility year by year with the §2 rule; produce a table: exam, cycles left, next
   window, fit for this profile.
4. Give a ranked recommendation plus a 12-month timeline, the pay reality, and source links.

## Gemini (Antigravity) Execution SOP

Follow the same steps using Gemini's browsing tools; keep the §2 computation explicit.
