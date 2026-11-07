---
name: instagram-creator-operator
description: >-
  Autonomous Instagram Creator Account, Viral Reels Production, Meta Business Suite
  Content Planner Scheduling, Carousel/Story Generation, Bio Optimization, and ManyChat
  Comment-to-DM Funnel Operator. Activate whenever the user wants the agent to manage an
  Instagram account, generate and publish Reels/posts/carousels/stories, schedule content
  calendars via Meta Business Suite or Instagram Web, or reply/convert followers via DMs.
---

# Instagram Creator & Viral Reels Operator (`gemini/skills/instagram-creator-operator`)

## 1. Core Capabilities & Browser Automation Workflows

1. **Automated Video Reel & Carousel Production (`FFmpeg` + AI Image/Video Pipeline)**:
   - Generate high-retention `9:16` (`1080x1920`, `30fps`, `H.264`) Reels with burned-in hook captions, 0–3s curiosity text overlays, and trending audio/voiceover tracks.
   - Generate `4:5` (`1080x1350`) and `1:1` (`1080x1080`) multi-slide educational/storytelling carousels and high-converting cover thumbnails.

2. **Direct Publishing & 30-Day Batch Scheduling via Browser**:
   - **Route A — Meta Business Suite Content Planner (`business.facebook.com/latest/content_calendar`):**
     - Supports uploading `9:16` Reels, Carousels, Single Photos, and Stories.
     - Allows scheduling up to **29 days in advance** at peak engagement windows (`12:00 PM`, `6:00 PM`, `9:00 PM IST`) without needing a mobile phone.
     - Supports custom Reel cover frames, collaborator tags, location tags, and first-comment hashtags.
   - **Route B — Instagram Web Direct Upload (`instagram.com`):**
     - Click `+ Create` → `Post` → Upload video/carousel → Set `9:16` Original aspect ratio → Select cover photo → Paste SEO-optimized caption + ManyChat keyword trigger (`Comment "AI" or "LAUNCH"`) → Click `Share`.

3. **Algorithm & Retention Engineering (2026 Instagram Reels Best Practices)**:
   - **0–3 Second Visual + Text Hook:** Every Reel must open with a pattern-interrupt visual movement and a bold 6–8 word on-screen hook (`"Wait... she doesn't actually exist 😳"`).
   - **Looping Audio & Cut Pacing:** Scene cuts or subtle zoom shifts every `1.8–2.5 seconds`; end sentence loops cleanly into the first frame to boost `>110%` average watch percentage.
   - **Comment-to-DM Conversion Trigger:** Every caption ends with a single frictionless CTA (`Comment "AI" and I'll DM you the exact 5-day blueprint 🚀`) wired to ManyChat (`manychat.com`) so every comment boosts algorithmic reach AND triggers an instant DM link.
   - **Trial Reels Testing:** Test new hooks to non-followers first when available to validate watch-time before pushing to main grid.

4. **Account Safety & Anti-Shadowban Protocol**:
   - **Warmup Window (Days 1–5 of a new account):** Keep bio clean (no raw `.store` links or discount spam text in bio for the first 5 days; use ManyChat DM links instead).
   - **Consistent Posting Cadence:** 1–2 Reels per day + 2–3 interactive Stories (Polls / Question Stickers / Link Stickers) per day.
   - **Zero Bot-Like Spam Actions:** Never mass-follow/unfollow or paste identical cold DMs manually; always use official Meta Business Suite scheduling and verified ManyChat Comment-to-DM triggers.

5. **Human-in-the-Loop Approval Gate**:
   - Always preview or list the planned Reel video, thumbnail, caption, and schedule time for user approval before clicking `Publish` or `Schedule` on the live Instagram account (unless the user explicitly approves a batch of posts to be published/scheduled).

6. **Meta Business Suite Browser Automation SOP (Zero-Dialog, Zero-Timeout Pattern)**:
   - **Persistent Local File Bridge (`127.0.0.1:8766`)**:
     - Run `node instagram-studio/scripts/ig_bridge.js` with `IsDaemon: true` so Windows Job Object keeps it alive across turns.
     - `business.facebook.com` allows `http://127.0.0.1:*` in `script-src` when the page's CSP `nonce` (`document.querySelector('script[nonce], style[nonce]')`) is copied onto the injected `<script>` tag.
   - **Attaching Videos & Multi-Slide Carousels Without Native File Dialogs**:
     - Never make `<input type="file">` visible on screen or click `"Add video"` via coordinate-based `mcp_chrome_devtools_click`.
     - Override `HTMLInputElement.prototype.click` and `HTMLInputElement.prototype.showPicker` to capture `this` into `window.__lastFileInput`, attach `File` objects via `DataTransfer`, and dispatch **both** `new Event('input', { bubbles: true })` (required by Meta's `useFileInput` hook on `reels_composer`) and `new Event('change', { bubbles: true })`.
   - **Setting Captions & Schedule Dates Synchronously (`waitForStableDom: false`)**:
     - Never call `mcp_chrome_devtools_click` or `mcp_chrome_devtools_type_text` while a video is uploading (upload progress bars mutate the DOM every 100ms and trigger 60s `waitForStableDom` timeouts).
     - Set captions in 1ms via Meta's Draft.js fiber (`window.require('ContentState')` + `window.require('EditorState').push(p.editorState, newContent, 'insert-characters')` -> `p.onChange(newState)`).
     - Set schedule date & time via the `input[placeholder="dd/mm/yyyy"]` React fiber `onChange(p.value.set({ year, month, day, hour, minute, second: 0 }))`.

7. **Mandatory Reels Hook Standard: 100% Fluid Dance Motion (Strict Rule)**:
   - **Carousels Only for Stills:** Static image slides, infographics, and prompt comparisons are exclusively reserved for multi-slide 4:5 Carousel posts.
   - **Reels Strict Mandate:** Whenever posting Reels, the hook character must **ALWAYS be physically dancing in real motion** in the style of the master winning reels (tasteful, alluring, rhythmic, high-energy movement: waist/hip sways, classical mudra turns, backless dress spins, radiant eye-contact smiles).
   - **Zero Ken Burns Still Substitutions:** Never substitute static photos with zoom-and-pan effects as a Reel video hook. Reels must open with genuine fluid video movement.
   - **100% Generic AI Model Terminology:** Spoken voiceovers, burned-in subtitles, and captions must use generic terminology ("hyper-realistic AI model", "virtual creator", "AI influencer") with zero geographic, ethnic, or regional tags.
