# Universal AI Skills & Config (`ai-skills-config`)

Owner: **`wandringspirit`** (`piyushgaur17@gmail.com`)  
Repository: **`https://github.com/wandringspirit/ai-skills-config`**

A single, unified repository that stores your **Universal Skill-First Master Rule** and **all reusable `SKILL.md` domain skills** across **Google Gemini / Antigravity**, **Claude Code / Claude Desktop**, and any Agent Skills-compatible AI assistant.

---

## Repository Structure

```text
ai-skills-config/
├── README.md                              # Setup & restore guide for Gemini + Claude
├── GEMINI.md                              # Root Master Rule auto-loaded by Gemini / Antigravity
├── CLAUDE.md                              # Root Master Rule auto-loaded by Claude Code
├── gemini/
│   └── GEMINI.md                          # Gemini / Antigravity reference rule copy
├── claude/
│   └── CLAUDE.md                          # Claude Code reference rule copy
└── skills/                                # Shared Universal Skills Library (used by BOTH Gemini & Claude)
    ├── skill-first-operator/
    │   └── SKILL.md                       # Universal meta-skill (auto-creates & syncs new skills)
    └── seo-traffic-operator/
        └── SKILL.md                       # End-to-end SEO, Search Console & traffic operator
```

---

## 1. Restore for Google Gemini / Antigravity (New Laptop)

On Windows PowerShell:

```powershell
# If ~/.gemini/config does not exist yet:
git clone https://github.com/wandringspirit/ai-skills-config.git "$HOME\.gemini\config"

# If Antigravity already created ~/.gemini/config on the new laptop:
cd "$HOME\.gemini\config"
git init -b main
git remote add origin https://github.com/wandringspirit/ai-skills-config.git
git fetch origin
git checkout -f main
```

---

## 2. Connect to Claude Code (`~/.claude`) on the Same or New Laptop

Claude Code uses the exact same `skills/<name>/SKILL.md` format! Run this in PowerShell to link Claude to this exact same skill library:

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\.claude" | Out-Null
Copy-Item "$HOME\.gemini\config\CLAUDE.md" "$HOME\.claude\CLAUDE.md" -Force
cmd /c mklink /J "$HOME\.claude\skills" "$HOME\.gemini\config\skills"
```

Now whenever **either** Gemini or Claude learns a new skill in `skills/<domain>/SKILL.md`, **both** AI agents immediately have access to it and sync it to `wandringspirit/ai-skills-config`!
