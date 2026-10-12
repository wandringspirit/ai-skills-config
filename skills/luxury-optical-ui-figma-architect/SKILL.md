---
name: luxury-optical-ui-figma-architect
description: >-
  Principal UI/UX & Figma Design System Architect for physical-digital optical measurement
  instruments, luxury jewelry/horology tools (Cartier, Tiffany, Chrono24, Leica aesthetic),
  and dual-theme (Light Daylight Ivory & Dark Zero-Halation OLED) interactive Figma canvas
  specifications. Activate whenever designing, critiquing, or prototyping UI/UX and Figma
  mockups for measurement studios, jewelry tools, or high-precision web applications.
---

# Luxury Optical UI/UX & Figma Design System Architect (`luxury-optical-ui-figma-architect`)

## 1. Core Human-Factors & Optical Physics Principles

1. **Zero-Halation Dual-Polarity Optics (Why Dark vs. Light Mode Both Matter Physically)**:
   - **Dark Mode ("Chrono Obsidian / Leica Night")**: Bright white/gold lines on a deep obsidian field (`#090A0F`) create *irradiation/halation* if strokes are >1.5px. Use crisp `1px` vector hairlines (`#D4AF37` Champagne Gold & `#F8FAFC` Optical White) and an instant **"Backlight Pad Toggle"** when placing dark rings on glass.
   - **Light Mode ("Atelier Ivory / Cartier Daylight")**: Essential when measuring a **physical silver/platinum/gold ring on the screen** in a bright room, because a bright warm-ivory stage (`#FAF7F2`) acts as a **physical lightbox** that illuminates the inner metal edge of the ring from underneath!
2. **Above-the-Fold Instrument First (Zero Hero Scroll)**:
   - Never push the optical stage below a marketing hero block (`intro` + 4 telemetry boxes). On mobile and desktop, the **1:1 Optical Stage + Calibration Pill + Primary Result Bar** must occupy the immediate viewport (`100dvh` studio workspace), while editorial/SEO content lives below the studio fold.
3. **Ergonomic Thumb-Zone Separation (Zero Hand Occlusion)**:
   - Left hand holds the physical ring or lays the finger on the upper/left glass.
   - Right hand operates the **Micrometer Vernier Dial & `±0.05 mm` Stepper Dock** in the bottom/right zone so the user's hand never blocks the optical reticle.
4. **Trust & Conversion Architecture**:
   - **Calibration Confidence Bar**: Instead of a buried banner below the stage, place a compact **1-Tap ISO/IEC 7810 Bank Card Calibration Pill** (`🟢 118 PPI Verified` or `🟡 Uncalibrated — Tap to Match Credit Card`) directly in the stage header.
   - **Instant International Size Passport Card**: Display US, UK, EU, JP, and IN/CN sizes simultaneously in a jewel-certificate card with **"Between Sizes? Go up 0.25 for >4mm bands"** guidance and 1-click **"Save Ring Passport / Share Size Link"**.

---

## 2. Dual-Theme Figma Token Specification

| Semantic Token | Light Mode ("Atelier Ivory") | Dark Mode ("Chrono Obsidian") | Usage |
|---|---|---|---|
| `--bg-canvas` | `#F6F3EC` (Warm Alabaster) | `#08090D` (Deep Obsidian) | App background |
| `--bg-surface` | `#FFFFFF` (Pure Porcelain) | `#10131C` (Instrument Slate) | Cards & control docks |
| `--bg-stage` | `#FCFBF7` (Lightbox Ivory) | `#050608` (Zero-Glare Matte) | 1:1 Optical Measurement Stage |
| `--text-primary` | `#141413` (Onyx Ink) | `#F5F3EF` (Silk White) | Primary typography & readouts |
| `--text-muted` | `#6E6A63` (Warm Pewter) | `#8E95A5` (Muted Titanium) | Labels & micro-copy |
| `--accent-gold` | `#9A722C` (Burnished Brass) | `#D6B168` (Champagne Gold) | Primary reticle, active tabs, CTAs |
| `--accent-emerald` | `#0F766E` (Vermeil Teal) | `#10B981` (Calibrated Emerald) | Verified PPI / Fit OK badge |
| `--border-hairline`| `#E5DFD3` (`1px solid`) | `#1E2433` (`1px solid`) | Precision grid lines & dividers |

### Typography Scale
- **Display / Editorial Headers**: `'Cormorant Garamond'` or `'Instrument Serif'`, `600` weight, `-0.02em` tracking.
- **UI & Controls**: `'Plus Jakarta Sans'` or `'Inter'`, `500/600` weight.
- **Micrometer Readouts & Millimetre Rulers**: `'JetBrains Mono'`, `tabular-nums`, zero layout jitter during slider drag.

---

## 3. Required Multi-Page Figma Artboard Matrix (All Pages in Dark + Light Mode)

Whenever delivering a full-site Figma redesign for an optical sizing platform, include interactive side-by-side / toggleable **Light Mode + Dark Mode** artboards for all 6 core page templates:
1. **Page 1 — Home / 1:1 Ring Sizer Studio (`/`)**: Circle reticle + inward tangent arrows + Vernier dial + International Size Passport.
2. **Page 2 — Optical Finger Calliper (`/finger-sizer`)**: Dual vertical calliper rails + Knuckle Clearance toggle + Band Width compensator.
3. **Page 3 — Flush Top-Edge Strip & String Ruler (`/printable-ring-sizer`)**: Top-edge `0–85 mm` physical ruler + circum-to-size converter + Printable PDF vector sheet preview.
4. **Page 4 — International Conversion Matrix & Programmatic Hub (`/ring-size-chart`)**: Instant converter bar + US/UK/EU/JP/IN filterable luxury table + Cartier/Tiffany brand fit notes.
5. **Page 5 — Watch Lug-to-Lug Wrist Visualizer (`/watch-wrist-sizer`)**: 1:1 wrist silhouette + lug overhang risk gauge + Iconic watch preset selector (Submariner, Speedmaster, Tank, Royal Oak).
6. **Page 6 — GIA Diamond Carat & Shape Studio (`/diamond-carat-size-on-finger`)**: 1:1 stone-on-finger silhouette + GIA face-up mm dimensions + Solitaire/Halo/Pavé setting switcher + Dual-Stone Comparison mode.

---

## Gemini (Antigravity) Execution SOP

- When asked for Figma-only / no-code deliverables:
  1. **Never modify `src/` application code**.
  2. Read the built-in `generative_ui` skill and build an interactive **Figma Design Canvas Artifact (`.html`)** in the conversation's artifact directory (`UserFacing: true`) featuring a Figma-style infinite/tabbed artboard viewer with **Light Mode + Dark Mode** side-by-side and toggleable views for all pages, complete with inspectable Figma tokens, component anatomy, and UX callouts.
  3. Optionally use `generate_image` to render high-resolution visual mockups if requested.

---

## Claude Execution SOP

- When asked for Figma-only / no-code deliverables:
  1. Do not edit `src/` files.
  2. Generate a self-contained interactive HTML Figma Artboard Specification viewer showing every page in both Light Mode and Dark Mode with inspectable CSS/Figma variables.
