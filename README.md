# AI Skills & Master Protocol Config (`ai-skills-config`)

Standalone, zero-duplication repository for **Gemini (Antigravity)** and **Claude (Claude Code / Claude Desktop)**:

- **Unified Shared Skills (`skills/`)**: Both Gemini and Claude link directly to the **single shared `skills/<skill-name>/SKILL.md` folder** so domain knowledge is never duplicated.
- **Zero SOP Conflict**: Whenever Gemini and Claude need different execution steps for the same skill name, the `SKILL.md` includes separate **`## Gemini (Antigravity) Execution SOP`** and **`## Claude Execution SOP`** sections (or optional `GEMINI-SOP.md` / `CLAUDE-SOP.md` files inside the skill folder). Each agent only edits its own SOP section.
- **`gemini/GEMINI.md`**: Global master rule file for Gemini / Antigravity (`~/.gemini/config/GEMINI.md`).
- **`claude/CLAUDE.md` & `claude/agents/`**: Global master rule file (`~/.claude/CLAUDE.md`) and specialist subagents (`~/.claude/agents/`) for Claude.

---

## Repository Structure

```text
C:\Users\piyus\ai-skills-config\
├── README.md
├── skills\                             <-- Single shared source for all 24 skills (Zero Duplication)
│   ├── agents-sdk\SKILL.md
│   ├── cloudflare\SKILL.md
│   ├── instagram-creator-operator\SKILL.md
│   ├── meta-ads-conversion-operator\SKILL.md
│   ├── multi-agent-mission-control\SKILL.md
│   ├── product-codebase-competitor-audit\SKILL.md
│   ├── product-ui-design-system\SKILL.md (+ scripts\contrast.mjs)
│   ├── seo-traffic-operator\SKILL.md
│   ├── skill-first-operator\SKILL.md
│   ├── windows-desktop-automation\SKILL.md
│   └── ...
├── gemini\
│   ├── GEMINI.md                       <-- Linked to ~/.gemini/config/GEMINI.md
│   └── README.md
└── claude\
    ├── CLAUDE.md                       <-- Linked to ~/.claude/CLAUDE.md
    ├── README.md
    └── agents\                         <-- Linked to ~/.claude/agents/
        └── seo-traffic-agent.md
```

---

## 1-Command Restore on Any Windows Laptop (PowerShell)

```powershell
# 1. Clone into standalone directory
git clone https://github.com/wandringspirit/ai-skills-config.git "$HOME\ai-skills-config"

# 2. Link Gemini / Antigravity directly to gemini/GEMINI.md and shared skills/
New-Item -ItemType Directory -Force -Path "$HOME\.gemini\config" | Out-Null
Remove-Item "$HOME\.gemini\config\GEMINI.md" -Force -ErrorAction SilentlyContinue
New-Item -ItemType HardLink -Path "$HOME\.gemini\config\GEMINI.md" -Target "$HOME\ai-skills-config\gemini\GEMINI.md" | Out-Null
cmd /c rmdir "$HOME\.gemini\config\skills" 2>$null
cmd /c mklink /J "$HOME\.gemini\config\skills" "$HOME\ai-skills-config\skills"

# 3. Link Claude directly to claude/CLAUDE.md, claude/agents/, and shared skills/
New-Item -ItemType Directory -Force -Path "$HOME\.claude" | Out-Null
Remove-Item "$HOME\.claude\CLAUDE.md" -Force -ErrorAction SilentlyContinue
New-Item -ItemType HardLink -Path "$HOME\.claude\CLAUDE.md" -Target "$HOME\ai-skills-config\claude\CLAUDE.md" | Out-Null
cmd /c rmdir "$HOME\.claude\skills" 2>$null
cmd /c mklink /J "$HOME\.claude\skills" "$HOME\ai-skills-config\skills"
cmd /c rmdir "$HOME\.claude\agents" 2>$null
cmd /c mklink /J "$HOME\.claude\agents" "$HOME\ai-skills-config\claude\agents"
```
