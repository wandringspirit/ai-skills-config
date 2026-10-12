# Gemini / Antigravity Master Command & Skill Sync Guide (`gemini/`)

## 1. Where Gemini / Antigravity Reads Global Instructions & Skills

- **Global Master Rule file**: `~/.gemini/config/GEMINI.md` (`C:\Users\piyus\.gemini\config\GEMINI.md` on Windows)
- **Global Skills folder**: `~/.gemini/config/skills/<skill-name>/SKILL.md`
- **Project Master Rule file**: `<project-root>/AGENTS.md` or `<project-root>/GEMINI.md`
- **Project Skills folder**: `<project-root>/.agents/skills/<skill-name>/SKILL.md`

---

## 2. 1-Command PowerShell Restore on a New Laptop

```powershell
cd "$HOME\.gemini\config"
git init -b main
git remote add origin https://github.com/wandringspirit/ai-skills-config.git
git fetch origin
git checkout -f main
```

---

## 3. Master Gemini Command

See [`GEMINI.md`](./GEMINI.md) for the exact rule file automatically injected into `<RULE[user_global]>` across every chat in Antigravity.
