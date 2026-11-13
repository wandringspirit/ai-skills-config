---
name: artist-themed-fan-pages
description: Build an unofficial, artist-themed data page on a tool or content site (a discography's total length, an era-by-era breakdown, a tour's set lengths) that looks made for the fans without borrowing anything the artist or label owns. Covers what may and may not be used (names yes; logos, album art, photos, lyrics, fonts no), the "unofficial, not affiliated" line, era colour palettes built inside the site's own tokens with WCAG contrast in light and dark, open music data (MusicBrainz, CC0 core data, one request a second, a named User-Agent) and stating the counting rules. Activate when the user asks for a page themed on a singer, band, album era or fandom.
---

# Artist-themed fan pages

A fan page about an artist works when it answers a fan's question with real numbers and *feels* like it
belongs to the fandom. It fails, legally or with readers, when it borrows the artist's property or
pretends to be official. The theme has to come from colour, structure and vocabulary the site owns.

## 1. What a page may and may not use

| Use | OK? | Why |
|---|---|---|
| The artist's name, album and song titles, as facts | Yes | Names used to refer to the thing itself (nominative use). Titles are facts, not copyrighted works |
| Track lengths, release dates, track counts | Yes | Facts. From open data (MusicBrainz core data is CC0) |
| Era nicknames fans use ("Red era", "Eras Tour") | Yes, as words | Same as titles: reference, not branding |
| Colours that evoke an era (a red, a lavender, a gold) | Yes | Colours are not ownable as used here; build them in the site's tokens |
| Album artwork, artist photos, tour posters | **No** | Copyright of the label or photographer. Not even thumbnails, not "fair use" |
| Logos, signature or wordmark lettering, the artist's own fonts | **No** | Trademark and font licences. Use the site's type |
| Lyrics, even a line | **No** | Lyrics are licensed; quoting them invites takedowns and AdSense trouble |
| "Official", the artist's handle as the page's identity, a fake verified look | **No** | Passing off. The page must never look like it comes from the artist or label |
| Streaming-service data (Spotify, Apple Music) | Check terms first | Spotify (2026): no derived data near ads, dev mode non-commercial; Apple needs a paid account |

Every page carries a plain line near the top or bottom: **"Unofficial fan page. Not affiliated with,
endorsed by or connected to [Artist] or [label]."** Keep it in normal text, not a footnote nobody sees.

## 2. Theme through colour and structure, in the site's own tokens

- **One palette per era, 3 colours each:** a background tint, an accent and a text-safe ink. Derive
  them from the site's existing token scale (same lightness steps), so the page still looks like the
  site, just wearing the era.
- **Contrast is non-negotiable (WCAG 2.2 AA):** body text ≥ 4.5:1, large text and UI parts ≥ 3:1, in
  **both light and dark mode**. Era colours usually fail as text: use them for borders, bars, chips and
  backgrounds, and keep the text on the site's ink. Check every pair with a contrast calculator, and
  write the ratios in the PR or change log.
- **Never colour alone carries meaning:** each era row also has its name and its number.
- **Structure is the theme:** an era-by-era table or bar chart, in release order, is what makes it read
  as a fan page. A timeline beats a gallery.
- Respect `prefers-reduced-motion`; no autoplaying audio or video.

## 3. Data: open, attributed, counted out loud

- **MusicBrainz** (musicbrainz.org/ws/2): core data (artists, release groups, releases, recordings,
  lengths) is CC0, so commercial use with ads is fine; supplementary data (tags, ratings, annotations)
  is CC BY-NC-SA, so don't use it. Send a meaningful `User-Agent` (app name, version, a contact URL,
  never a personal email unless the owner agrees), keep to **one request a second**, and fetch once
  into a static file rather than per page view.
- **State the counting rules on the page**, because fans will check: which albums count (studio only?
  live, compilations, EPs?), which edition (standard vs deluxe vs "The Anthology"), re-recordings
  (count originals and re-recordings separately, never mixed), bonus and "From the Vault" tracks.
  Give the total for each rule rather than one ambiguous number.
- **Date the numbers** ("counted on 13 November 2026 from MusicBrainz") and give the source a link.
- Round consistently, and show hours *and* minutes for the headline (fans search "in hours and minutes").

## 4. Page shape

1. H1 = the question fans type ("How long is Taylor Swift's discography?").
2. The answer in the first two sentences, with the headline number for the most common rule.
3. The era table (album, year, tracks, length), then totals by rule.
4. A "what if you listen" conversion (days at an hour a day, on 1.25× not applicable for music: use
   listening hours, commute counts, flights).
5. FAQ with the exact searches (deluxe, Taylor's Version, longest album, shortest album).
6. The unofficial line, the source and date.

## 5. Ship check

- No image, logo, lyric or font from the artist anywhere (search the HTML for `<img`).
- Contrast pairs checked in light and dark; layout checked at 375 px with no horizontal scroll.
- The disclaimer is visible without scrolling to the very bottom, or at least present in the body.
- The data file and the script that produced it are kept, so a new album is one rerun.

---

## Claude Execution SOP

- Fetch MusicBrainz with Python `urllib`, sleeping ≥ 1.1 s between requests, User-Agent
  `<site>/1.0 ( https://<site> )`; save raw JSON to the scratchpad, then write a small typed data module
  into the project. Run Python with `-I` and `sys.stdout.reconfigure(encoding="utf-8")`.
- Check contrast with a script (relative luminance formula) for every text/background pair in both
  themes before showing the page.
- Follow the project's own rules for new pages and links from existing pages (ask before touching an
  existing page), commit by file name, and push only when the owner says so.

## Gemini (Antigravity) Execution SOP

- Same rules. Fetch MusicBrainz at one request a second with a named User-Agent; never scrape
  streaming services or lyric sites; never download album art.
