---
name: web-api-curl-extractor
description: >-
  Reverse-engineer and extract exact HTTP requests (curl commands) used by web applications,
  HTML forms, SPAs, and open-source backends. Distinguishes client-to-backend requests
  (XHR/fetch/SSR form POST) from backend-to-upstream third-party API calls, verifies payload
  encoding, pagination, auth headers/keys, and response parsing. Activate whenever the user asks
  for the curl command, API endpoint, or network request a website uses to fetch data.
---

# Web API & cURL Extractor (`skills/web-api-curl-extractor`)

A systematic methodology for inspecting how a web application fetches data and producing exact, verified `curl` commands without guessing.

---

## 1. Two-Layer Request Model (Always Check Both)

When a user asks *"give me the curl that `<site>` uses to fetch X"*, there are often **two distinct layers**:

1. **Layer 1 — Browser → Site Backend**:
   - **SSR / Form apps** (FastAPI/Jinja, Rails, Django, PHP): `<form method="POST" action="...">` sending `application/x-www-form-urlencoded` or `multipart/form-data`, returning HTML (often with embedded JSON `<script type="application/json" id="...">`).
   - **SPA / XHR apps** (React, Next.js, Vue, Svelte): `fetch()` / `axios` calls to `/api/...`, GraphQL endpoints, or third-party APIs directly from the browser.
2. **Layer 2 — Site Backend → Upstream Third-Party API**:
   - When the site proxies calls to an upstream API (e.g., YouTube Data API v3, GitHub API, Stripe, OpenAI), the browser never sees those upstream requests.
   - Check for a linked public source repository (GitHub/GitLab link in footer, `sameAs` in JSON-LD, or open-source attribution) to extract the **exact upstream endpoints, query parameters, `fields` masks, chunk sizes, and pagination loops**.

Always present **both layers clearly** when both exist so the user gets whichever one they meant (calling the site directly vs. replicating what the site's backend calls upstream).

---

## 2. Inspection Workflow

1. **Fetch the HTML document first**:
   - `curl -sL <url>` to inspect `<form>`, `<input name="...">`, `<script src="...">`, JSON-LD (`sameAs`), and inline scripts.
2. **Inspect linked client-side JS bundles**:
   - Fetch referenced scripts to check for `fetch(`, `XMLHttpRequest`, `axios`, validation rules, custom headers, or CSRF tokens.
3. **Check for open-source backend code**:
   - Look for GitHub/GitLab URLs in the navbar, footer, or `<script type="application/ld+json">`.
   - Read route handlers (`app.py`, `routes/`, `api/`, `server.js`) and HTTP client wrappers to capture exact endpoints, parameters, batch sizes, and auth mechanisms.
4. **Verify dynamic/JS-rendered apps (only if static inspection is insufficient)**:
   - If the request is dynamically constructed in obfuscated/minified JS or requires a live interaction, inspect network requests in DevTools / headless browser.
5. **Synthesize clean, runnable `curl` commands**:
   - Prefer `--data-urlencode` (for `POST` forms and `GET -G` queries) so URLs, newlines, and special characters encode safely.
   - Redact or parameterize secrets (`YOUR_API_KEY`, `PLAYLIST_ID`) — never hardcode real credentials.
   - Note optional parameters, rate limits, pagination (`pageToken` / cursor), caching behavior, and how to parse structured output (e.g., embedded JSON script tags or `jq`).

---

## 3. Verification & Safety Checklist

- [ ] Verified HTTP method (`GET`/`POST`), exact path, and `Content-Type` from source or live HTML.
- [ ] Verified every required and optional parameter name against form inputs or backend handler signature.
- [ ] Documented pagination / batching limits (e.g., `maxResults=50`, 50-ID chunks, max item cap).
- [ ] Distinguished site-facing request vs. upstream API requests.
- [ ] Never bypassed auth, CAPTCHAs, or access controls; never leaked private keys.

---

## Gemini (Antigravity) Execution SOP

- **Static inspection first**: Use `run_command` with `curl.exe -sL` (PowerShell on Windows) to inspect HTML, static JS, and public GitHub raw files (`raw.githubusercontent.com` / `api.github.com`).
- **Live browser fallback**: Only delegate to the `browser` subagent if the site is heavily obfuscated or strictly requires client-side JS execution to reveal the endpoint.
- **Formatting**: Provide copy-pasteable `curl` blocks (POSIX `\` continuations, plus PowerShell-safe notes if relevant) and cite exact source files/routes inspected.

---

## Claude Execution SOP

- **Static inspection first**: Use `Bash` (`curl -sL`) or `WebFetch` to retrieve the page HTML, referenced scripts, and any linked GitHub repository source files.
- **Output**: Present both Layer 1 (site endpoint) and Layer 2 (upstream API calls, if open-source/discoverable) with exact parameter tables and response-parsing hints.
