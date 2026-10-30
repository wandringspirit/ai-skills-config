---
name: sports-gear-sizing
description: >-
  Research, verify and implement sizing logic for sports gear (adult and kids' bikes, snowboards,
  skis, and similar fit-by-body-measurement gear) for calculators and size-chart pages. Activate
  when the user asks for a size calculator, a "size chart" page, sizing formulas, a brand size
  comparison table, or asks "what size bike/board/ski" logic to be written or checked.
---

# Sports gear sizing (`sports-gear-sizing`)

Size charts disagree with each other by about one size, and every retailer's chart is written to
sell its own stock. A trustworthy sizing tool therefore (1) cites where every number came from,
(2) answers with a range plus a best pick and the reasons, and (3) prefers a brand's own chart for
that brand's products over any generic formula.

## 1. Principles

- **Brand chart > consensus chart > formula.** Formulas are a starting point and a cross-check.
- **Range + best pick + reasons.** Never a single number with no explanation.
- **No source, no rule.** Rules without a citation are labelled "our convention" or "open" and kept
  out of reader-facing copy until sourced.
- **Store metric, show both.** 1 in = 2.54 cm; 1 lb = 0.45359237 kg.
- **Restate charts as facts** in your own tables with source URL and checked date; never copy
  text, images or logos. Re-check sources at least yearly.
- **Tests reproduce the source charts** within a stated tolerance (usually one size, or ±5 cm).

## 2. Domain knowledge (as found 2026-10-30; re-verify before relying on it)

### Adult bikes
- Classic seat-tube formulas: road/gravel = inseam(cm) × 0.665 (cm); hybrid × 0.685 (cm);
  MTB = inseam(cm) × 0.226 (inches). LeMond saddle height = inseam × 0.883 (BB centre to saddle top).
- Brands now size mostly by **rider height bands** and letter sizes; band edges agree across brands
  to about one size, but the **names** differ (a 175 cm rider: Specialized 54–56, Canyon S/M).
- MTB seat tubes shrank with dropper posts: height bands decide MTB size; 0.226 is only a check.
- Standover clearance (REI): road ≈ 1" (level top tube), 2"+ sloping; MTB ≥ 2".
- Between sizes: larger = longer reach, more stable; smaller = more manoeuvrable, lower standover.

### Kids' bikes
- Inseam first, then height, age last ("a blunt indicator", Cycling UK).
- Wheel diameter ≤ inside leg (Cycling UK). Ranges per wheel overlap by 1–3"; first/nervous riders
  take the smaller (seat = inseam), confident riders the larger (seat 2–4" above inseam).
- Minimum seat height varies widely between models of the same wheel size; show brand data.

### Snowboards
- Weight sets length (it flexes the board; brands list rider weight); height cross-checks.
- Beginner/park → short end; all-mountain → middle; freeride/powder → long end or volume-shifted.
- Width from boot size: boots overhang each edge ~1–2 cm; wide boards from about US men's 11.5,
  mid-wide around 10.5–11 (evo and REI tables).
- Kids: between chest and chin, ≈ 0.78–0.88 × height.

### Alpine skis
- evo and REI agree: beginner ≈ height − 12 cm, intermediate ≈ height − 2, expert ≈ height + 5
  (all rows within 5 cm). Chin to top of head is the rule of thumb.
- Longer: advanced, fast, heavier than average, ungroomed, rockered/wide skis. Shorter: beginner,
  quick turns, lighter, groomers, cambered carving skis.
- Kids: between chest and nose; don't size long "to grow into".

## 3. Research method that works

1. Search for the brand's and big retailers' own sizing pages (evo, REI, brand sites).
2. Read tables **on the page**, not from search summaries. Extract `<table>` rows with a small
   `document.querySelectorAll('table')` script in a browser.
3. Many sizing pages refuse plain HTTP fetchers (REI 403, Specialized 403, evo 429/404 on old URLs).
   A real browser (built-in browser pane, or the user's Chrome) reads them. Chrome output filters may
   block strings with quotes/`=`/`;` (feet-inch marks): replace those characters before returning.
4. Spam "chart" mirror domains (subdomains of unrelated companies, universities) dominate searches for
   brand charts. Ignore them; use only the brand's or a named retailer's page.
5. Record for each source: URL, what it gives, date read, and how it was read.

## Claude Execution SOP

1. Write the sources table first (S1, S2…), then per sport: what the sources say (tables), the
   method, and an "Open" list for anything unsourced.
2. Implement as pure functions `size(input) → { range, best, reasons[] }` with no DOM, metric inside.
3. Tests: reproduce each source row within tolerance; unit round-trips; edge heights.
4. When brand pages block automated fetches, use the browser tools; ask the user to tick any
   "verify you are human" box rather than trying to bypass it.

## Gemini (Antigravity) Execution SOP

1. Same structure as the Claude SOP. Use the browser subagent to read tables directly from pages;
   never rely on search-result summaries for numbers.
2. Keep the sources table and checked dates in the project docs; flag anything unsourced as open.
