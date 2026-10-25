---
name: adsense-approval
description: Get a site approved by Google AdSense and recover from a rejection ("Low value content", "Site down or unavailable", "Policy violations"). Activate when the user shares an AdSense Sites screen, a rejection email, or asks when to apply or re-apply.
---

# AdSense approval and rejections

## What the review looks at
- The site as a whole, not one page: original text a reader would miss if it were gone, navigation, legal pages
  (About, Contact, Privacy with the AdSense cookie paragraph, Terms), a custom domain, `ads.txt`.
- **"Low value content"** is the catch-all rejection. Google gives no page list. In practice it is one of:
  1. too little original writing against the number of pages (tool output, API data, scraped or templated pages);
  2. the site is new or Google Search does not index it (a reviewer of a site that Search has judged thin rarely
     approves it; Search Console "Crawled – currently not indexed" on the written pages is the tell);
  3. pages that are mostly a widget with a line of text, or empty/"coming soon" sections;
  4. public text that reads as made for machines (keyword lists, AI-generated filler, llms.txt prose, doorway pages).
- The yellow "add payment info" banner is account setup, not a cause; the owner fills it in themselves.

## After a rejection
1. Do not press "Request review" the same day. Each review takes 1–3 weeks and repeated rejections teach nothing.
2. Find the cause in the order above. If Search has also dropped the site, fix and wait for that first: the same
   quality judgment usually drives both, and re-indexing of the written pages is the signal to re-apply.
3. Fix at the site level: noindex or remove thin generated pages, add original pages with numbers nobody else has,
   make the home page say what the site is in a paragraph a person would read.
4. Re-apply with the tick "I confirm I have fixed the issues", once, when the evidence has moved. Record the date.
5. Never put ad code on before approval beyond the verification snippet or `ads.txt`.

## Claude Execution SOP
- Read the project's roadmap/changelog for the application date, the publisher id and any Search Console reads
  before advising; tie the rejection to what Search Console shows.
- Give a re-apply trigger the owner can check (e.g. "URL inspection shows the hubs and guides on Google"), and
  put it in the project's Blocked/To do list rather than a date guess.
- Payment, tax and bank details are the owner's to enter; never handle them.
- Earnings stakes: weigh the delay against the project's own earnings estimate before suggesting big changes.

## Gemini (Antigravity) Execution SOP
- Same steps; read the AdSense Sites screen from the user's screenshot, never log into AdSense on their behalf.
