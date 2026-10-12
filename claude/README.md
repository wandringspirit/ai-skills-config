# Claude Master Command & Skill Sync Guide (`claude/`)

## 1. Where Claude Reads Global Instructions & Skills

- **Claude Code (CLI / VS Code / Terminal)**:
  - Global Master Rule file: `~/.claude/CLAUDE.md` (`C:\Users\piyus\.claude\CLAUDE.md` on Windows)
  - Global Skills folder: `~/.claude/skills/<skill-name>/SKILL.md`
  - Project Master Rule file: `<project-root>/CLAUDE.md`
  - Project Skills folder: `<project-root>/.claude/skills/<skill-name>/SKILL.md`
- **Claude Desktop App / claude.ai Web**:
  - **Settings → Profile → Custom Instructions** (*"What personal preferences should Claude consider in responses?"*)
  - **Settings → Capabilities → Skills** (upload or link folders from `skills/`)

---

## 2. 1-Command PowerShell Setup (Links Claude to `ai-skills-config`)

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\.claude" | Out-Null
Copy-Item "$HOME\.gemini\config\claude\CLAUDE.md" "$HOME\.claude\CLAUDE.md" -Force
if (-not (Test-Path "$HOME\.claude\skills")) {
  cmd /c mklink /J "$HOME\.claude\skills" "$HOME\.gemini\config\skills"
}
```

---

## 3. Master Claude Command (Copy-Paste)

See [`CLAUDE.md`](./CLAUDE.md) for the exact rule file automatically loaded by Claude Code, or paste its contents into Claude Desktop / Web Custom Instructions.
