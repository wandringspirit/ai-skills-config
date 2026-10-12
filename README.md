# Portable Antigravity Global Brain (`~/.gemini/config`)

Owner: **`wandringspirit`** (`piyushgaur17@gmail.com`)

This repository backs up your **Universal Skill-First Master Rule** (`GEMINI.md`) and all **Global Skills** (`skills/<domain>/SKILL.md`) so they never get lost when switching laptops.

---

## Restore on a New Laptop (Windows PowerShell)

If `~/.gemini/config` does not exist yet:
```powershell
git clone git@github.com:wandringspirit/gemini-config.git "$HOME\.gemini\config"
```

If Antigravity already created `~/.gemini/config` on the new laptop:
```powershell
cd "$HOME\.gemini\config"
git init -b main
git remote add origin git@github.com:wandringspirit/gemini-config.git
git fetch origin
git checkout -f main
```

---

## What Is Tracked
- `GEMINI.md` — Universal Skill-First Execution Protocol (auto-injected into `<RULE[user_global]>` in every chat).
- `skills/` — All reusable domain `SKILL.md` runbooks created across your chats.
- `.gitignore` — Whitelists only `GEMINI.md`, `rules/`, and `skills/` so machine-local state (`projects/`, `node_modules/`, `config.json`) stays private to each machine.
