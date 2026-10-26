---
name: backlink-reclamation
description: >-
  Find pages that still link a dead or replaced competitor tool and ask their owners to swap the link
  (broken-link building / link reclamation). Activate when the user wants links from a target audience
  ("US/UK educators", "universities"), asks for a "dead-link search", or a competitor's old domain has died.
---

# Backlink reclamation (`backlink-reclamation`)

## 1. Find the dead links

- **List the competitors' old addresses**, especially free hosts that died (Heroku's free tier ended in
  2022; also old `onrender`, `glitch.me`, `repl.co`, `vercel.app` previews). Confirm each is dead.
- **GitHub code search is the best index** for course notes, syllabi and docs:
  `gh search code "<old-domain>" --limit 100 --json repository,path`. Group by repo, then sort out
  the copies (awesome-list forks, OSINT lists, ad-block filter lists) from the real owners.
- **Web search engines barely index link targets**; a quoted domain search mostly returns spam pages.
  Use them only to find the owner's live site once the repo is known.
- For each real owner, check: is the page **live and read by people** (a rendered site, a syllabus
  for the current term), is the repo **active** (last commit), and does it **accept outside PRs**
  (`gh pr list --state all`).

## 2. Make the ask easy to say yes to

- **A pull request beats an issue**: one click to merge, no work for the owner. Change only the source
  files (`.Rmd`, link reference files such as `links.md`), not the generated output (`docs/`, knitted
  `.md`/`.tex`), and say that the rebuild picks it up.
- Keep the body short: what is broken, what replaces it, that you made the replacement, nothing else.
  Disclose the affiliation in the first lines.
- **One follow-up at most**, and only with something new (for example, the PR itself after an
  unanswered issue).
- Never open the PR or comment from the agent; the user posts under their own account.
- **Merged is not live.** On a site built from source (R Markdown, Jekyll, Quarto), the merge changes
  the source only; the published page keeps the old link until the owner rebuilds. Count the link
  when the live URL shows it (`curl -s <page> | grep <domain>`), not when the PR merges, and don't
  nudge about the rebuild. Example: a professor's syllabus PR merged 11 days after it was opened, and
  the published FAQ still showed the dead link the next morning.

## 3. Be honest about the yield

A dead competitor usually leaves a handful of real owners, not dozens. Report the count after
filtering, and say when the vein is exhausted rather than padding the list with directories.

---

## Gemini (Antigravity) Execution SOP

- Use `gh` for searches and repo checks; draft PR text for the user, never submit it.

---

## Claude Execution SOP

- `gh search code` is rate-limited: sleep ~6 s between queries. `gh api repos/<r>/contents/<path> -q .content | base64 -d`
  reads a file without cloning.
- Record the target and the drafted ask in the project's roadmap as one row for the user.
