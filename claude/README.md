# Claude Master Command & Skill Sync Guide (`claude/`)

## 1. Where Claude Reads Global Instructions & Skills

- **Global Master Rule file**: `~/.claude/CLAUDE.md` (`C:\Users\piyus\.claude\CLAUDE.md`, linked to `C:\Users\piyus\ai-skills-config\claude\CLAUDE.md`)
- **Global Skills folder**: `~/.claude/skills/<skill-name>/SKILL.md` (junction linked directly to the unified `C:\Users\piyus\ai-skills-config\skills\`)
- **Global Agents folder**: `~/.claude/agents/<agent-name>.md` (junction linked directly to `C:\Users\piyus\ai-skills-config\claude\agents\`)

---

## 2. 1-Command PowerShell Setup

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\.claude" | Out-Null
Remove-Item "$HOME\.claude\CLAUDE.md" -Force -ErrorAction SilentlyContinue
New-Item -ItemType HardLink -Path "$HOME\.claude\CLAUDE.md" -Target "$HOME\ai-skills-config\claude\CLAUDE.md" | Out-Null

cmd /c rmdir "$HOME\.claude\skills" 2>$null
cmd /c mklink /J "$HOME\.claude\skills" "$HOME\ai-skills-config\skills"

cmd /c rmdir "$HOME\.claude\agents" 2>$null
cmd /c mklink /J "$HOME\.claude\agents" "$HOME\ai-skills-config\claude\agents"
```
