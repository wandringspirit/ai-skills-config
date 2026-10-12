---
name: seo-traffic-operator
description: >-
  Claude-native SEO, Search Console indexing, programmatic long-tail page generation,
  community seeding (Reddit/WatchUSeek/Quora), Pinterest visual search, and B2B jeweler
  backlink outreach operator for ActualRingSize. Isolated in claude/skills/ to prevent
  any tool or naming collision with Gemini.
---

# ActualRingSize SEO & Traffic Operator — Claude Edition (`claude/skills/seo-traffic-operator`)

1. **Mandatory Safety & Permission Gates**:
   - **Final Domain Live Gate**: Never execute external indexing, community posts, Pinterest pins, or B2B outreach until `SITE_URL` in `src/lib/studio-meta.ts` is updated to the final custom `.com` domain and confirmed live by the user.
   - **Human-in-the-Loop Approval Gate**: Never post, comment, or submit forms externally without first showing the user the exact draft, target URL, and preview and receiving explicit approval.
2. **References**:
   - Follow `docs/SEO.md`, `docs/OUTREACH.md`, and `docs/DEPLOY.md` in `c:\Projects\ring-size`.
   - Run `npx vitest run` and `npm run build` via `Bash` after any SEO route or metadata changes.
