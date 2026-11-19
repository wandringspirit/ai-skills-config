---
name: screen-physical-scale
description: >-
  Work out how many CSS pixels make one real millimetre or inch on a given screen (CSS PPI), for
  on-screen rulers, ring/coin/card sizers, "actual size" previews and device preset lists. Covers
  the formula, why physical PPI ÷ devicePixelRatio is wrong on scaled displays (most MacBook Airs,
  Windows at 125%/150%), how to source each number from the maker's spec page, and how to check it
  on a real device. Activate when the user adds or checks a device PPI preset, a screen-size guess,
  a calibration default, or asks "how big is 1 mm on screen X".
---

# Screen physical scale (`screen-physical-scale`)

A browser lays out pages in CSS pixels. To draw something at true size you need **CSS pixels per
inch (CSS PPI)** for the screen in its *current display mode*. Nothing in the browser reports it;
it has to come from a card/ruler calibration or from published specs.

## 1. The formula

```
CSS PPI = hypot(screen CSS width, screen CSS height) / diagonal in inches
        = physical PPI × (CSS width / panel pixel width)        # same thing, from the PPI figure
CSS px per mm = CSS PPI / 25.4
```

- `screen.width` / `screen.height` are CSS pixels across the whole display, so this holds in
  scaled modes. Valid only at 100 % browser zoom (and no pinch zoom).
- **Physical PPI ÷ devicePixelRatio is only right when the mode is an exact 2× / 3×** (iPhone,
  iPad, MacBook Pro 14/16 at default). On a scaled mode (MacBook Air default, Windows 125 %), the
  backing store is downsampled, so PPI ÷ DPR is wrong by 10–15 %.
- Compute both ways from the maker's figures; they should agree within about 0.3 % (Apple rounds
  PPI and diagonal). A bigger gap means a wrong mode or a typo.
- Sanity check a "looks like" size: height should equal width × panel height / panel width, to
  within 1 px.

## 2. Sourcing rules

- **Panel resolution, PPI and diagonal:** the maker's own spec page (Apple: support.apple.com
  tech-spec pages). Quote the page URL and the date checked.
- **Default display mode:** makers often don't publish it (Apple's spec pages list the scaled
  modes but don't say which is default). Use owner reports that quote the Displays settings pane,
  check them with the aspect ratio test above, and say in the docs that the default comes from user
  reports. Best evidence: a real device reading of `screen.width`, `screen.height`,
  `devicePixelRatio` at 100 % zoom, plus a card check.
- **Spec aggregator sites (YesViz and similar) often list the 2× "viewport"**, not the default
  mode, so their PPI matches the non-default larger-text setting. Don't copy them.
- A preset is a starting point, never a calibration: a user who changed "looks like" or OS scaling
  gets a different value. Say so next to the preset list.

## 3. Reference values (checked 2026-11-19; re-verify before relying on them)

| Screen | Panel (Apple) | Default "looks like" | CSS PPI | 2× mode CSS PPI |
|---|---|---|---|---|
| MacBook Air 13.3" Retina (2018–2020 Intel, M1) | 2560×1600, 227 ppi | 1440×900 (user reports) | 127.7 | 1280×800 → 113.5 |
| MacBook Air 13.6" (M2 and later) | 2560×1664, 224 ppi | 1470×956 (user reports) | 128.6–128.9 | 1280×832 → 112.0 |
| MacBook Air 15.3" (M2 and later) | 2880×1864, 224 ppi | 1710×1107 (user reports) | 133.0–133.1 | 1440×932 → 112.0 |
| MacBook Pro 14.2" (2021 and later) | 3024×1964, 254 ppi | 1512×982 (2×) | 127.0 | same |
| MacBook Pro 16.2" (2021 and later) | 3456×2234, 254 ppi | 1728×1117 (2×) | 127.0 | same |

Sources: support.apple.com/en-us/111883 (M1 Air), /111991 (2020 Intel Air), /111867 (M2 Air 13),
/111346 (15" M2 Air), /111902 (14" MBP 2021); MacRumors forum threads 2360072 (M2 Air default
1470×956), 2392960 (15" Air modes, 1710×1107 default), 2343003 and 2392242 (13.3" Air default
1440×900).

Error scale: choosing 113 on a 127.7 screen draws everything at 0.885× true size, so a 17.35 mm
ring circle shows as 15.35 mm, about 4 US sizes off.

## 4. Real-device check (ask the owner; takes one minute)

1. Browser at 100 % zoom, then in the console: `[screen.width, screen.height, devicePixelRatio]`.
2. Compare with the table; the OS display setting should read the default.
3. Hold a bank card (85.60 mm, ISO/IEC 7810 ID-1) to a box drawn at `85.6 × pxPerMm` CSS px.

## Claude Execution SOP

1. Find every place the value lives (preset arrays, screen-guess tables, docs, tests, copy).
2. Read the maker's spec page for each model (browser pane, `get_page_text` / JS slice of the
   Display section). Record URL + date.
3. Find the default mode source; run the aspect ratio test; compute CSS PPI both ways (node one-liner).
4. Propose values with sources and the error of the old value; ask before changing live copy;
   log in the project's change log; never commit/push without approval.

## Gemini (Antigravity) Execution SOP

Same steps. Use the browser tool for spec pages, compute with a short script, and present the
proposal for approval before editing project files.
