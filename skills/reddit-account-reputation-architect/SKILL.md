---
name: reddit-account-reputation-architect
description: >-
  Strategic Reddit account warmup, Contributor Quality Score (CQS) elevation,
  organic comment/post karma acceleration, and anti-shadowban protocols. Activates
  whenever warming up new or dormant Reddit accounts, building karma ethically,
  avoiding spam filters, or preparing accounts for community authority.
---

# Reddit Account Reputation Architect (`reddit-account-reputation-architect`)

A comprehensive, platform-compliant playbook for legitimately warming up new or dormant Reddit accounts, accelerating comment and link karma, optimizing Reddit's internal Contributor Quality Score (CQS), and avoiding automated spam filters and shadowbans.

---

## 1. Safety, Platform Compliance & Anti-Shadowban Rules

### A. The "Never Do" List (Guaranteed Shadowbans / Suspensions)
1. **Never Use Karma-Farming Subreddits (`r/FreeKarma4U`, etc.)**:
   - Major subreddits use AutoModerator rules and bots (like `SafestBot`, `ContextModBot`) that scrape user history. Having even a single post or comment in a karma-trading subreddit results in automatic permanent bans across hundreds of top communities.
2. **Never Automate Direct Account Posting**:
   - Automated scripts logging in to post generic AI comments violate Reddit's User Agreement on vote manipulation and content manipulation.
   - Reddit's anti-bot heuristics detect browser fingerprint anomalies, IP jumps, and synthetic posting frequencies, resulting in silent shadowbans (posts/comments invisible to everyone except the poster).
3. **Never Post External Links on Fresh Accounts (< 14 Days / < 100 Karma)**:
   - Fresh accounts dropping outbound links trigger Reddit's domain spam filters immediately.
   - Strictly follow the **9:1 Rule**: at least 9 high-value, purely helpful contributions without any links for every 1 contextual, transparent recommendation.

### B. Contributor Quality Score (CQS) Mechanics
Reddit scores every account internally from `Lowest` to `Highest` based on:
- Email verification status.
- Account age and consistency of activity.
- Upvote-to-downvote ratio on comments and submissions.
- Absence of deleted rule-violating comments or moderator removals.
- Natural interaction patterns (reading, upvoting, commenting across varied subreddits).

---

## 2. The 3-Phase Karma Acceleration Protocol

```
Phase 1: Safe-Haven Seeding      Phase 2: Authority & Depth         Phase 3: Mature Account
[Days 1 – 3]                    [Days 4 – 14]                     [Days 15+]
Target: 0 -> 100 Comment Karma  Target: 100 -> 1,000+ Karma       Target: High CQS / Authority
Focus: Fast, relatable answers  Focus: Detailed, expert insights  Focus: Niche leadership / links
```

### Phase 1: Zero-Threshold Safe Havens (Days 1–3)
**Objective**: Build initial 50–100 comment karma to pass standard AutoMod minimums without risking downvotes.

1. **Target Subreddits with Zero/Low Minimums**:
   - `r/AskReddit`, `r/NoStupidQuestions`, `r/CasualConversation`
   - Pet/Visual subs: `r/aww`, `r/rarepuppers`, `r/mildlyinteresting`, `r/MadeMeSmile`
   - Wholesome/Advice subs: `r/Advice`, `r/help`
2. **The "Rising" Tab Strategy**:
   - Do NOT comment on posts already on the "Hot" or "Top" page (your comment will be buried at position #450).
   - Go to `r/AskReddit` or `r/NoStupidQuestions` -> sort by **Rising** or **Top (Past Hour)**.
   - Look for posts with 10–40 upvotes and fewer than 20 comments where the original post is clearly gaining traction.
3. **High-Converting Comment Archetypes**:
   - *Direct & Concise*: The factual, straightforward answer to an obscure question.
   - *Relatable Personal Anecdote*: 2–4 sentences describing a funny or relatable personal experience.
   - *Empathetic Validation*: Supporting someone asking for reassurance or everyday advice.

### Phase 2: Domain Expertise & High-Signal Comments (Days 4–14)
**Objective**: Elevate CQS, build 500–1,000+ karma, and establish topical credibility.

1. **Target Mid-Size Niche Subreddits**:
   - Identify 3–5 subreddits aligned with your actual interests or business domain (e.g., `r/webdev`, `r/smallbusiness`, `r/personalfinance`, `r/technology`, `r/productivity`).
2. **Value-First Formatting**:
   - Use bold headers, bullet points, and clear structural formatting.
   - Answer unanswered technical or practical questions comprehensively.
   - Cite verified facts, calculators, or step-by-step methodologies directly in plain text.
3. **Posting Cadence**:
   - 3 to 6 quality comments spread throughout the day (morning, afternoon, evening).
   - Upvote relevant threads and other insightful comments organically.

### Phase 3: Post Karma & Long-Term Authority (Days 15+)
**Objective**: Unlock submission privileges in strict communities and participate in discussions naturally.

1. **Creating High-Value Original Submissions**:
   - Post case studies, well-researched guides, or insightful discussion prompts in niche communities.
   - Ask thought-provoking, non-promotional questions that invite debate.
2. **Transparent Linking (When Applicable)**:
   - Only share tools or links if directly requested by other users or as an optional reference at the very end of an exhaustive, free guide.

---

## 3. Gemini (Antigravity) Execution SOP

When the user asks to warm up an account or increase Reddit karma:

1. **Human-in-the-Loop & Platform Gate**:
   - Explicitly inform the user: automated bot spamming or credential logging violates Reddit policy and leads to instant bans.
   - Position the agent as an **Editorial Co-Pilot**: the agent identifies high-potential threads and drafts top-tier responses; the user reviews, selects, and submits them manually.
2. **Identify Target Subreddits & Domain**:
   - Ask the user what domains/interests they have (tech, gaming, finance, design, fitness, daily life).
   - Select the optimal combination of Safe-Haven subs and Topical Niche subs.
3. **Thread Discovery & Response Drafting**:
   - Research trending and rising questions in those communities using web search.
   - Draft 2–3 bespoke comment options for target questions:
     - Option A: Witty / Relatable
     - Option B: Deep Expert Breakdown
     - Option C: Fast Direct Answer
4. **Review & Iterate**:
   - Present the drafts with formatting.
   - Track successful karma milestones with the user.

---

## 4. Claude Execution SOP

1. Analyze the age, current karma, and intended use-case of the Reddit account.
2. Formulate a structured 14-day posting schedule outlining daily target subreddits, sorting filters (Rising / New), and topic prompts.
3. Generate high-retention comment scripts tailored to Reddit's informal, authentic, anti-corporate community tone.
4. Review submitted content to ensure complete avoidance of promotional keywords, URL spam, or detectable repetitive phrasing.
