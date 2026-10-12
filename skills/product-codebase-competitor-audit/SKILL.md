---
name: product-codebase-competitor-audit
description: >-
  Comprehensive 360-degree audit framework for web applications: verifies every documentation
  claim against actual source code, audits deterministic formulas and edge cases, checks SEO
  and deployment readiness, identifies dead code and bundle bloat, and benchmarks features
  against top market competitors. Activate whenever the user asks to audit the codebase,
  verify documentation claims, find missing functionality, or compare against competitors.
---

# 360° Product, Codebase, Documentation & Competitor Audit (`product-codebase-competitor-audit`)

## 1. The 5-Pillar Audit Methodology

### Pillar 1: Documentation & Marketing Claims vs. Code Reality ("Truth Table")
Cross-check every claim in `README.md`, `docs/*.md`, `AGENTS.md`, `CLAUDE.md`, and on-page SEO copy against the actual implementation:
- Are claimed formulas accurate in code? (e.g., ISO/ANSI ring size tables, GIA diamond spread formulas, watch lug-to-lug math).
- Do claimed features actually exist and work end-to-end? (e.g., domain live status, email deliverability, print stylesheets, localization coverage, camera/photo overlays, share links).
- Flag any **Discrepancy / Contradiction** between two places in the codebase (e.g., formula in `seo-authority-section.tsx` vs. formula in `measurements.ts`).

### Pillar 2: Functional & Mathematical Metrology Audit
- Verify unit conversion accuracy against official international standards (ANSI/NAJA US ring sizes, BS 1283 / Wheatsheaf UK sizes, ISO 8653 EU sizes, JCS Japanese sizes, Bureau of Indian Standards BIS sizes, GIA carat-to-mm tables).
- Audit interactive pointer/touch physics (SVG viewBox vs. bounding box coordinate math, mobile viewport overflow, zoom invalidation).

### Pillar 3: Code Hygiene, Bundle Weight & Dead Code
- Inspect `package.json` and `src/components/ui/` for unused dependencies and scaffolded boilerplate that inflate build time or repo surface area.
- Check accessibility (`aria-*`, keyboard navigation, focus traps) and Core Web Vitals (`CLS`, render-blocking Google Fonts, image dimensions).

### Pillar 4: SEO, Indexing & Production Readiness Audit
- Verify `SITE_URL`, `sitemap.xml`, `robots.txt`, OpenGraph image format (`.svg` vs `.png`/`.jpg` — critical because Twitter/X, iMessage, WhatsApp, Facebook, and LinkedIn **do NOT support `.svg` for `og:image`**!), and `hreflang` implementation (client-side only vs. SSR language query handling).

### Pillar 5: Head-to-Head Competitor Matrix
Benchmark the product against the top 5 real-world competitors in its category across accuracy, UX, features, speed, and trust signals, highlighting where we win and where competitors still have an edge.

---

## Gemini (Antigravity) Execution SOP
- Use `view_file` and `run_command` (read-only) to inspect all source files, tests, and docs before synthesizing the audit report.
- Do not modify project source files during a pure audit unless the user asks to apply the fixes.

---

## Claude Execution SOP
- Use `Read`, `Glob`, and `Grep` to verify every claim against source lines and present line-linked findings.
