# Gemini / Antigravity Master Command & Skill Sync Guide (`gemini/`)

## 1. Where Gemini / Antigravity Reads Global Instructions & Skills

- **Global Master Rule file**: `~/.gemini/config/GEMINI.md` (`C:\Users\piyus\.gemini\config\GEMINI.md`, linked to `C:\Users\piyus\ai-skills-config\gemini\GEMINI.md`)
- **Global Skills folder**: `~/.gemini/config/skills/<skill-name>/SKILL.md` (junction linked directly to the unified `C:\Users\piyus\ai-skills-config\skills\`)
- **Project Master Rule file**: `<project-root>/AGENTS.md` or `<project-root>/GEMINI.md`
- **Project Skills folder**: `<project-root>/.agents/skills/<skill-name>/SKILL.md`

---

## 2. 1-Command PowerShell Setup

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\.gemini\config" | Out-Null
Remove-Item "$HOME\.gemini\config\GEMINI.md" -Force -ErrorAction SilentlyContinue
New-Item -ItemType HardLink -Path "$HOME\.gemini\config\GEMINI.md" -Target "$HOME\ai-skills-config\gemini\GEMINI.md" | Out-Null

cmd /c rmdir "$HOME\.gemini\config\skills" 2>$null
cmd /c mklink /J "$HOME\.gemini\config\skills" "$HOME\ai-skills-config\skills"
```
