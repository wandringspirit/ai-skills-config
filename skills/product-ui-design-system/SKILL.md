---
name: product-ui-design-system
description: >-
  Process and quality bar for designing web product UI (tool sites, dashboards, review queues,
  prototypes, landing pages) that looks custom-made rather than templated. Each project gets its own
  DESIGN.md (audience, mood, colour tokens with dark mode, type, components), the build uses only
  those tokens, and a ship checklist (WCAG 2.2 AA contrast, focus, targets, phone width, dark mode,
  reduced motion, tone) runs before anything is called done. Activate whenever building or reviewing
  any user-facing page, component or prototype.
---

# Product UI Design System (`product-ui-design-system`)

This skill fixes **how** to design, not **what it looks like**. Every product gets its own look,
derived from its audience. What stays constant is the process and the quality bar.

Origin: the "craft studio" prototypes (Oct 2026), a pattern review queue and a PDF chart reader,
which the owner rated "really really good". They worked because a product-specific design spec
existed **before** any code, and the build stuck to it.

---

## 1. Principles

1. **Spec before pixels.** Write the project's `docs/DESIGN.md` (section 2) first. Never start from
   a generic template, a UI kit default or another project's palette.
2. **Mood from the audience and the material.** Pick the palette from the product's world: linen and
   thread red for cross-stitch, paper and ink for a printables site, night sky for an aurora tool.
   Name it, and say how it differs from the top 2–3 competitors.
3. **One accent.** One confident brand colour for the primary action, links and focus. Status
   colours (success, warning) are separate and muted. Everything else is neutral.
4. **Calm by default.** One main action per screen; up to three main controls, with the rest under
   "More options" / `<details>`. Plain-word status labels ("Passes", "Needs a look"), never colour
   alone.
5. **Content is the hero.** The user's file, chart, result or data gets the space; chrome stays
   quiet: 1px borders instead of heavy shadows, at most one soft shadow level.
6. **Readable for everyone.** Body text 16px (14px minimum), line-height about 1.5, tabular
   numerals for any number that sits in a column, WCAG 2.2 AA throughout.
7. **Honest UI.** No dark patterns, fake urgency, or surprise paywalls; errors say what happened and
   what to do next.

---

## 2. The project DESIGN.md (template)

| Section | Must contain |
| --- | --- |
| Who we design for | 2–4 personas with context (device, posture, lighting, age, skill) and needs |
| Principles | 4–6, specific to the product (e.g. "made for the hoop") |
| Benchmark | Each competitor: what to keep, where they fall short, and our bar in one sentence |
| UX targets | Measurable: time to first result, Lighthouse scores, Core Web Vitals, task success |
| Visual system | Mood line; token table (light + dark); typography; components; spacing; motion |
| Words and tone | Voice in one line, 3–4 example phrases, error-message rule |
| Accessibility checklist | Section 4 below, as checkboxes |
| Testing | Who, which tasks, what to record, the "fix before adding" rule |

### Token table (minimum set)

| Token | Role | Rule |
| --- | --- | --- |
| `--bg` | Page background | Never pure white for warm brands; give `body` an explicit background |
| `--surface` | Cards, panels, top bar | Distinct from `--bg` by at least a visible step |
| `--ink` | Primary text | ≥ 7:1 on `--bg` and `--surface` |
| `--ink-muted` | Secondary text | ≥ 4.5:1 on `--bg` **and** `--surface` |
| `--line` | Borders, dividers | Decorative; a component that relies on a border to be seen needs ≥ 3:1 |
| `--accent` | Primary action, links, focus ring | ≥ 4.5:1 as link text; ≥ 3:1 as a focus ring |
| `--accent-ink` | Text on accent | ≥ 4.5:1 on `--accent` |
| `--success`, `--warning` | Status | ≥ 4.5:1 when used as text |

Every token gets a dark-mode value under `@media (prefers-color-scheme: dark)`. Dark mode is
designed, not inverted: lighter, slightly desaturated accents; surfaces a step above the background.

### Typography

- One readable UI/body face plus, optionally, one display face for headings. Prefer OFL fonts,
  self-hosted in production (`font-display: swap`, preload the body weight, subset).
- System font stack is acceptable for internal tools and prototypes, but say so.
- Scale: 13 / 14 / 16 / 18 / 22 / 28 / 36 px. Headings tighter line-height (1.15–1.25).

### Shape, space, motion

- 4px spacing grid. Radii: about 12px on cards and 10px on controls, 999px for pills.
- Motion 150–220 ms ease-out, only for state changes; everything wrapped in
  `@media (prefers-reduced-motion: no-preference)`.

---

## 3. Build rules

- Use only the tokens. A raw hex value in component CSS is a bug, except data colours (thread
  swatches, chart series), which are data and never used for UI text.
- Layout: a sticky top bar for tools with filters; content max-width about 1200–1400px for grids and
  about 70ch for prose; card grids with `repeat(auto-fit, minmax(280–300px, 1fr))`.
- Phone first: 16px side gutter, no horizontal scroll at 360px, wrap toolbars, stack headers.
- `[hidden]{display:none!important}` so component `display` rules never override `hidden`.
- Buttons are `<button>`, links are `<a>`; active toggles carry `aria-pressed`; live counts use
  `aria-live="polite"`.
- Images: `width`/`height` or `aspect-ratio` to avoid layout shift; `loading="lazy"` below the fold;
  meaningful `alt`.

---

## 4. Ship checklist (run every time, report the results)

- [ ] **Contrast:** run `scripts/contrast.mjs` on the token pairs, light and dark. Text ≥ 4.5:1
      (large text ≥ 3:1); focus rings and essential UI borders ≥ 3:1.
- [ ] **Focus:** every interactive element shows a visible `:focus-visible` ring
      (`outline: 2px solid var(--accent); outline-offset: 2px`). Tab through the page once.
- [ ] **Targets:** controls at least 24×24 CSS px (WCAG 2.2 minimum), 44×44 for touch-first screens.
- [ ] **Phone width:** check at 375px. No horizontal scroll, no clipped text, toolbars wrap.
- [ ] **Dark mode:** view the page in both schemes; nothing hard-coded to light.
- [ ] **Reduced motion:** animations are off when the user asks.
- [ ] **Colour is never the only cue:** status has a word or icon too.
- [ ] **Tone:** labels are plain words; errors say what happened and what to do next.
- [ ] **Fonts:** the spec's fonts load (or the deviation is noted).
- [ ] **Console:** no errors on load.

---

## Claude Execution SOP

1. Look for the project's `docs/DESIGN.md`. If it exists, read the visual system, accessibility and
   tone sections and follow them exactly. If it doesn't, draft one from section 2 (personas and
   competitors first) and show the owner the mood line and token table before building anything
   big.
2. Build with tokens on `:root` plus a dark-mode block, following section 3.
3. Run the section 4 checklist:
   - Contrast: `node ~/.claude/skills/product-ui-design-system/scripts/contrast.mjs tokens.json`
     (a JSON of `{"light": {...}, "dark": {...}}` token maps), or pass pairs inline (see the
     script header).
   - Serve the page through the browser preview (`.claude/launch.json` + `preview_start`) and
     verify with `read_page`/`find`/`javascript_tool`; screenshots can time out on image-heavy pages.
   - Phone width: `resize_window` preset `mobile`, then check
     `document.documentElement.scrollWidth <= innerWidth`; reset to `desktop` afterwards.
   - Dark mode: `resize_window` with `colorScheme: "dark"`.
   - Focus: check computed `outline` under `:focus-visible` with `javascript_tool`, or Tab with
     `computer` `key`.
   - Gotchas found in the first test run (Oct 2026):
     - Python `http.server` pages get cached: navigate with `?v=N` after a rebuild.
     - When the browser pane is hidden (`document.visibilityState === 'hidden'`), CSS transitions
       don't run, so computed colours read mid-transition. Inject `transition:none!important`
       before reading them.
     - `el.focus()` from script does not trigger `:focus-visible`; press Tab with `computer` `key`.
4. Report the checklist with pass/fail per line and fix the fails before calling the work done.
   Common fails to look for first:
   - hard-coded `#fff` text on an accent or status colour (passes in light mode, fails in dark);
     use `--accent-ink`
   - `opacity` on whole cards to show "failed" or "rejected" (it drags text below 4.5:1); dim the
     image only
   - only the browser's default focus ring
   - a sticky toolbar that eats a quarter of a phone screen; make it static under about 640px
   - `<img>` without `width`/`height`
   - toggle buttons without `aria-pressed`
5. Announce `**[Skill Active: product-ui-design-system]**`. Any change to this skill gets committed
   and pushed to `wandringspirit/ai-skills-config` only with the owner's approval.

---

## Gemini (Antigravity) Execution SOP

1. Read the project's `docs/DESIGN.md` first; if missing, draft it from section 2 and get the
   owner's approval on the mood line and token table.
2. Build with tokens only; follow section 3.
3. Run the section 4 checklist using the Antigravity browser: check contrast with
   `scripts/contrast.mjs`, view at 375px and in dark mode, tab through for focus.
4. Report pass/fail per checklist line and fix the fails before finishing.
