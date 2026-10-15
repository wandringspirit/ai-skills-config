---
name: youtube-shorts-repurposing-operator
description: >-
  Architect and operator for extracting, synthesizing, and repurposing viral long-form YouTube videos
  into original high-retention YouTube Shorts using AI workflows. Covers YouTube Shorts algorithm metrics
  (Viewed vs. Swiped Away, APV > 100%), YouTube Partner Program Reused Content Policy compliance,
  anti-"AI slop" pacing, copyright/fair use boundaries, and monetization unit economics (AdSense RPM vs. backend funnels).
---

# YouTube Shorts Repurposing & Faceless Channel Operator

A specialized framework for converting viral long-form concepts, lectures, podcasts, documentaries, and essays into original, high-performing YouTube Shorts, TikToks, and Instagram Reels without triggering YouTube's Reused Content demonetization penalty or falling into the low-retention "AI slop" trap.

---

## 1. The Core Idea vs. The YouTube Reality

### The Tempting Pitch
*"Find a viral 30-minute YouTube video with 2M views, extract the transcript, ask an AI to rewrite it into a 50-second script, run it through an AI voice generator, stitch stock footage or AI clips, and post 3 Shorts a day for passive income."*

### The Ground Truth Reality
1. **The Repetitious / Reused Content Barrier**:
   - YouTube's monetization guidelines specifically state: Channels that produce mass-generated, templated, or programmatic content with minimal unique value or editorial transformation are classified as **"Reused Content"** or **"Repetitious Content"**.
   - Even if you hit 10M Shorts views and 1,000 subscribers, YPP (YouTube Partner Program) human reviewers frequently reject automated faceless channels.
2. **Shorts AdSense Economics are Brutal**:
   - YouTube Shorts RPM (Revenue Per Mille - payout per 1,000 views) ranges between **$0.02 and $0.08** in Tier-1 countries (US/UK/Canada/Australia) and as low as **$0.005 to $0.015** in Tier-3 countries.
   - **1,000,000 views** on YouTube Shorts typically yields **$20 to $60** in AdSense revenue.
   - If your entire monetization strategy is ad revenue, you will burn out paying API fees or software subscriptions ($50-$150/mo) before breaking even.
3. **The Algorithm is Brutal on Retention**:
   - Long-form YouTube rewards Click-Through Rate (CTR) and Average Duration.
   - Shorts feeds reward two metrics above all else:
     - **Viewed vs. Swiped Away Ratio**: Must be **75% to 85%+ viewed** (if >25% swipe away in the first 2 seconds, the algorithm cuts distribution).
     - **Average Percentage Viewed (APV)**: A 30-50 second Short needs **110% to 140%+ APV** (meaning people re-watch or loop the video) to break beyond the 10,000-view initial seed audience.

---

## 2. YouTube Policy & Copyright Compliance Architecture

To ensure channel longevity and monetization safety:

### A. YouTube Reused Content Policy (YPP Compliance)
YouTube defines reused content as content that does not provide significant original commentary, educational value, or unique creative modification.

| Dangerous (High Rejection / Demonetization Risk) | Monetizable (YPP Compliant) |
|---|---|
| Auto-summarized script with robotic TTS voiceover | Human voice or hyper-realistic conversational AI voice with distinct personality/cadence |
| Generic random stock footage (Pexels/Pixabay) unrelated to words | Custom-edited motion graphics, on-screen kinetic demonstrations, curated diagrams, or custom b-roll |
| Direct 1:1 summary of a single creator's long video | Synthesis of multiple perspectives, contrarian critique, or original breakdown applying the concept to a new scenario |
| Programmatic output: 5-10 videos/day uploaded via API | 1-2 curated, meticulously polished Shorts/day |

### B. Fair Use vs. Copyright Infringement
- **Copyright Claim (Content ID)**: If you use the original creator's audio or video snippets, Content ID may claim the revenue or block the video.
- **Fair Use Doctrine (US 17 U.S.C. § 107)**: Fair use requires transformative purpose (criticism, comment, news reporting, teaching, scholarship). Re-voicing someone's original thoughts without attribution, critique, or added synthesis can still provoke manual DMCA takedowns.
- **Safe Repurposing Rule**: Extract the **underlying facts, ideas, or principles** (ideas and facts are not copyrightable), but completely rewrite the narrative structure, hook, analogies, and presentation. Never mirror the original creator's exact sentence flow or visual montage.

---

## 3. The 5 Critical Metrics of YouTube Shorts

1. **Swipe-Away Rate (0-2 seconds)**:
   - Target: **> 78% Stayed / < 22% Swiped Away**.
   - Rule: The first frame must contain visual movement, a high-contrast kinetic caption, and an open loop.
2. **Average Percentage Viewed (APV)**:
   - For a 30s Short: Target **> 120%**.
   - For a 50s Short: Target **> 95%**.
3. **Loop Mechanics**:
   - Seamless loop: The last sentence connects grammatically or narratively back to the first sentence.
4. **Engagement Velocity (Likes, Comments, Shares per 1,000 views)**:
   - **Shares** are the highest-weighted algorithmic signal in Shorts. A video that prompts a viewer to DM a friend will be pushed into millions of feeds.
5. **Session Time Contribution**:
   - Does watching your Short make the user keep scrolling or close the app?

---

## 4. The 4 Fatal Traps of "AI Faceless" Repurposing

1. **The "CapCut Stock Video" Fatigue**:
   - Viewers immediately recognize generic b-roll (a man in a suit walking, timelapse of city traffic, random neon particles). Viewers instinctively swipe away within 0.8 seconds.
2. **Monotonous TTS Cadence**:
   - Standard text-to-speech lacks natural breathing pauses, emphasis on punchy words, and dynamic pitch variation.
3. **Lack of an Audience Anchor (No Channel Identity)**:
   - When every video looks and sounds like a generic documentary, viewers never subscribe, recognize the channel, or return.
4. **AdSense Dependency**:
   - Relying on YouTube Shorts fund/AdSense without an email list, affiliate offer, sponsor integration, or digital product is an unsustainable business model.

---

## 5. The Winning "Hybrid" Repurposing Blueprint

If you want to build a sustainable, profitable channel using this model:

```
[Viral Long-Form Video / Research Paper / Book]
                │
                ▼
1. Core Insight Extraction (Gemini / Claude)
   - Extract the 1 single non-obvious insight or counter-intuitive mechanism.
                │
                ▼
2. The Hook Architecture (3 Frameworks)
   - The Negative Hook: "Stop doing X if you want Y..."
   - The Curiosity Gap: "In 1973, an experiment was banned because..."
   - The Contrarian Stance: "Everything you've been told about X is backward."
                │
                ▼
3. The Script (45-55 Seconds, 130-150 words)
   - Beat 1 (0-3s): Hook + Visual Shock
   - Beat 2 (3-15s): The Problem / The Agitation
   - Beat 3 (15-35s): The Mechanism (The "Why" & "How")
   - Beat 4 (35-48s): The Resolution / Punchline
   - Beat 5 (48-52s): The Loop Transition
                │
                ▼
4. Visual Engine (Anti-Slop Curation)
   - 3D spatial illustrations, zoom-ins, fast typography, dynamic sound FX (wooshes, pops, bass drops).
   - Change visual element every 1.2 to 2.0 seconds.
                │
                ▼
5. Monetization Engine (Backend Driven)
   - Pinned comment with a lead magnet / newsletter / high-ticket digital product or affiliate tool.
```

---

## 6. High-Leverage Niches vs. Dead Niches for Shorts Repurposing

| Niche Category | RPM / AdSense | Sponsorship / Affiliate Potential | Viability Score | Notes |
|---|---|---|---|---|
| **Personal Finance / Investing** | High ($0.08 - $0.15) | Extreme (Fintech apps, brokerages, books) | **9/10** | High scrutiny from YPP (YMYL - Your Money Your Life). Must provide accurate disclaimers. |
| **B2B SaaS / AI Productivity Tools** | Medium ($0.05 - $0.09) | High (Software affiliates $20-$100/sale) | **8.5/10** | Easy to demonstrate on screen; high intent. |
| **Philosophy / Psychology / Dark History** | Low ($0.02 - $0.04) | Medium (Book clubs, courses, merch) | **7/10** | High view counts, but low ad revenue; needs digital product. |
| **Generic Motivational / Stoicism Quotes** | Very Low ($0.01 - $0.03) | Extremely Low | **2/10** | Totally saturated; massive YPP reused content demonetization wave. |
| **Celebrity Gossip / Clip Farming** | Low ($0.02 - $0.04) | Low | **1/10** | Constant copyright strikes, Content ID blocks, demonetization. |

---

## Gemini (Antigravity) Execution SOP

1. **Evaluate Request Viability**:
   - When a user asks about repurposing viral YouTube videos into AI Shorts, evaluate the proposition across 4 pillars:
     1. Algorithmic retention feasibility (Viewed vs Swiped, APV).
     2. YouTube Terms of Service & YPP Reused Content policy.
     3. Financial unit economics (Shorts RPM vs tool subscriptions).
     4. Sustainable competitive advantage / differentiation.
2. **Execute Multi-Agent Debate**:
   - When requested, spin up specialized debate agents representing distinct operational archetypes:
     - *Algorithm & Distribution Strategist*
     - *Monetization & Policy Compliance Auditor*
     - *AI Production & Workflow Architect*
     - *Ruthless Devil's Advocate / Skeptic*
     - *Growth Hacker & Hybrid Realist*
   - Moderate across 5 structured rounds: Strategy Viability, Policy & Monetization, AI Slop vs Differentiation, Unit Economics & Costs, and Final Verdict with Actionable Roadmap.
3. **Deliver Clear Human-in-the-Loop Action Protocol**:
   - Provide concrete steps, toolchains, and kill criteria so the user does not waste money on doomed automation schemes.

---

## Claude Execution SOP

1. Analyze the repurposing proposition with realistic mathematical rigor.
2. Highlight the difference between theoretical views and actual bankable cash flow.
3. Ensure no unauthorized copyright material or scraped content is recommended.
