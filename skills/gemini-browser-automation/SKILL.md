---
name: gemini-browser-automation
description: >-
  Google Gemini Web App (gemini.google.com) Browser Automation, Imagen 3 / Nano Banana Pro
  2K Image Generation, Chrome DevTools Protocol (CDP) Session Attachment, and Playwright
  Persistent Context Operator. Activate whenever the user asks to automate the Gemini browser tab,
  generate sets/characters/assets directly via their Google AI Pro web subscription, or drive
  gemini.google.com without hitting developer API rate limits.
---

# Gemini Web App Browser Automation Operator (`gemini-browser-automation`)

## 1. Domain Overview & Value Proposition
Google provides consumer subscriptions (Google One AI Premium / Google AI Pro) with high-tier Imagen 3 and 2K image generation models on `gemini.google.com`.
However, developer APIs (`gemini-3.1-flash-image`, etc.) frequently hit strict rate limits (`429 RESOURCE_EXHAUSTED`) on free/tier-1 quotas.
Automating the Gemini web application enables:
- Unlimited/high-quota 2K photorealistic image generation backed by the user's active Google AI subscription.
- Consistent style and identity generation using conversational context and uploaded reference images.
- Autonomous asset downloading directly to project directories without manual user copy-pasting.

---

## 2. Browser Connection Architecture

### Pattern 1: Remote Debugging Port (CDP Attachment) — Recommended for Existing Sessions
When the user already has Google Chrome open with their authenticated Google account:
1. Chrome must be launched with remote debugging enabled:
   ```cmd
   "C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222
   ```
2. Playwright attaches via CDP:
   ```python
   from playwright.sync_api import sync_playwright

   with sync_playwright() as p:
       browser = p.chromium.connect_over_cdp("http://localhost:9222")
       context = browser.contexts[0]
       # Find existing Gemini tab or open new
       page = next((pg for pg in context.pages if "gemini.google.com" in pg.url), None)
       if not page:
           page = context.new_page()
           page.goto("https://gemini.google.com/app")
   ```

### Pattern 2: Persistent User Profile (Dedicated Automation Profile)
When running standalone without needing the user's personal browser window:
```python
from playwright.sync_api import sync_playwright

USER_DATA_DIR = r"C:\Users\piyus\.chrome_gemini_profile"

with sync_playwright() as p:
    context = p.chromium.launch_persistent_context(
        user_data_dir=USER_DATA_DIR,
        channel="chrome",
        headless=False,  # Headless triggers Google bot detection
        args=["--disable-blink-features=AutomationControlled"]
    )
    page = context.pages[0] if context.pages else context.new_page()
    page.goto("https://gemini.google.com/app")
```
*Note: The user signs in once manually into this profile. All cookies, Google One AI Pro credentials, and chat histories persist indefinitely.*

---

## 3. DOM Interaction & Generation Pipeline

### 3.1 Prompt Submission
Gemini web app uses a Quill-based contenteditable rich text editor:
- **Selector:** `div.ql-editor[contenteditable="true"]` or `rich-textarea`
- **Typing Technique:**
  ```python
  editor = page.wait_for_selector("div.ql-editor", timeout=15000)
  editor.click()
  # Fill text or type
  editor.fill(prompt_text)
  page.wait_for_timeout(500)
  # Click Send button or press Enter
  send_btn = page.query_selector('button[aria-label*="Send"], button.send-button')
  if send_btn and send_btn.is_enabled():
      send_btn.click()
  else:
      page.keyboard.press("Enter")
  ```

### 3.2 Reference Image Upload
To upload reference images (e.g. Hazel's face ID or room template):
- Locate the file input: `input[type="file"]` (often hidden inside upload menu `button[aria-label*="Upload"]` or `button[aria-label*="Add image"]`).
- Set input files:
  ```python
  file_input = page.wait_for_selector('input[type="file"]', timeout=5000)
  file_input.set_input_files(image_path)
  page.wait_for_selector('.image-preview, .uploaded-image-chip', timeout=10000)
  ```

### 3.3 Waiting for Completion & Downloading
1. Monitor generation state:
   - Wait for response bubble to stabilize (no active `.loading`, `mat-progress-bar`, or streaming animation).
   - Minimum wait: 8–15 seconds for Imagen 3 rendering.
2. Locate the generated high-resolution image:
   - Generated images render with URLs matching `lh3.googleusercontent.com` or download triggers.
   - Click the image card or full-res download button to fetch the raw JPEG/PNG.
   - Save directly to target folder (e.g. `C:\Projects\AI Influencers\Hazel\02 Sets\`).

---

## 4. Gemini (Antigravity) Execution SOP
1. **Status Verification:** Check if Chrome CDP port 9222 is active or launch a persistent context.
2. **Prompt Optimization:** Format image generation prompts using the `photorealistic-architectural-imagery` standard (lens, lighting, 2K/4K tags, physical architecture details).
3. **Download & Clean Placement:**
   - Save the raw image to project directory.
   - Verify image dimensions (min `1080x1920` or `2048x1152`).
   - Archive any previous variations into `_rejected/`.

---

## 5. Claude Execution SOP
1. Read existing generation parameters and script needs from persona folders.
2. Delegate generation runs via Playwright CDP script runner.
3. Validate output file sizes and report progress.
