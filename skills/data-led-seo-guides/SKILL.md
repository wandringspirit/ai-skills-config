---
name: data-led-seo-guides
description: >-
  Write a search guide (an article page on a tool or content site) that ranks and gets cited by AI
  answers because it carries numbers nobody else has, measured with the site's own tool or data.
  Activate when the user says "write the next guide", "write a blog post", "add an article", or a
  roadmap row asks for guides on a cadence.
---

# Data-led SEO guides (`data-led-seo-guides`)

## 1. Pick the topic from evidence, not from a keyword list

- **Start from what the site can measure that others can't**: its own tool's outputs, its own
  curated lists, its own logs. A guide built on first-party numbers is citable; a rewrite of the
  top ten results is not.
- **Check for cannibalisation**: list every existing guide's title, description and H2s. The new
  one must answer a different question. If it overlaps, refresh the old page instead (and ask, if
  the owner gates changes to existing pages).
- **Name the searches it answers** ("how many hours is a Python course", "how long to learn X on
  YouTube"), and make the H1 one of them in plain words.

## 2. Measure, then write

- Pull the numbers live on the day and write the date into the text ("measured on 14 October").
  Read them from the site's own pages or cache rather than paying for fresh upstream calls.
- Report medians and ranges, not means, when a few huge items skew the set. Say what was left out
  and why (not counted yet, incomplete data).
- Keep the scripts that produced the numbers in the scratchpad, so a refresh is one rerun.

## 3. Shape of the page

- **Answer in the first two paragraphs**, with the headline number. AI answers and featured
  snippets quote the opening.
- **One table that is the page's reason to exist**, sized for a 375 px phone (four or five short
  columns, units in the cells, `&nbsp;` between number and unit).
- **Then what the numbers mean**: patterns, the surprising case, and a conversion into the reader's
  decision (hours → weeks, cost → months).
- **Link out to the site's deeper pages** where each row is explored (hubs, tools), and to two or
  three related guides. Internal links are the cheapest ranking help there is.
- **A short FAQ** with the exact questions people type; each answer stands alone in two or three
  sentences.
- Title ≤ 60 characters for `<title>` (keep a fuller H1 if the site supports both); description
  140–160 characters with the headline number in it.

## 4. Ship it safely

- Adding a page can change existing ones: "newest first" lists on the home page or "related" boxes
  push an older link off. Check list caps and raise them so nothing drops, and name every existing
  page the change touches.
- Run the site's tests (SEO baselines, sitemaps, `llms.txt`), log the change, and leave indexing
  requests to the owner after the deploy.

---

## Gemini (Antigravity) Execution SOP

- Fetch the site's own pages with an HTTP client to measure; never scrape third-party sites for the
  numbers without the user's approval.

---

## Claude Execution SOP

- Save fetched pages and the stats script in the scratchpad; parse HTML with Python, and run it with
  `-I` (call `sys.stdout.reconfigure(encoding="utf-8")`, since `-I` ignores `PYTHONIOENCODING`).
- Follow the project's own rules on existing pages, roadmap rows and change logs (CLAUDE.md);
  commit by file name and push only when the user says so.
