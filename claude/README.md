# Claude Master Command & Skill Sync Guide (`claude/`)

## 1. Where Claude Reads Global Instructions & Skills

- **Claude Code (CLI / VS Code / Terminal)**:
  - Global Master Rule file: `~/.claude/CLAUDE.md` (`C:\Users\piyus\.claude\CLAUDE.md` on Windows, linked directly to `C:\Users\piyus\ai-skills-config\claude\CLAUDE.md`)
  - Global Skills folder: `~/.claude/skills/<skill-name>/SKILL.md` (junction linked directly to `C:\Users\piyus\ai-skills-config\claude\skills\`)
  - Global Agents folder: `~/.claude/agents/<agent-name>.md` (junction linked directly to `C:\Users\piyus\ai-skills-config\claude\agents\`)
  - Project Master Rule file: `<project-root>/CLAUDE.md`
  - Project Skills folder: `<project-root>/.claude/skills/<skill-name>/SKILL.md`
- **Claude Desktop App / claude.ai Web**:
  - **Settings → Profile → Custom Instructions** (*"What personal preferences should Claude consider in responses?"*)
  - **Settings → Capabilities → Skills** (upload or link folders from `claude/skills/`)

---

## 2. 1-Command PowerShell Setup (Links Claude Directly to `ai-skills-config\claude`)

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\.claude" | Out-Null
Remove-Item "$HOME\.claude\CLAUDE.md" -Force -ErrorAction SilentlyContinue
New-Item -ItemType HardLink -Path "$HOME\.claude\CLAUDE.md" -Target "$HOME\ai-skills-config\claude\CLAUDE.md" | Out-Null

cmd /c rmdir "$HOME\.claude\skills" 2>$null
cmd /c mklink /J "$HOME\.claude\skills" "$HOME\ai-skills-config\claude\skills"

cmd /c rmdir "$HOME\.claude\agents" 2>$null
cmd /c mklink /J "$HOME\.claude\agents" "$HOME\ai-skills-config\claude\agents"
```

---

## 3. Master Claude Command (Copy-Paste)

See [`CLAUDE.md`](./CLAUDE.md) for the exact rule file automatically loaded by Claude Code, or paste its contents into Claude Desktop / Web Custom Instructions.
