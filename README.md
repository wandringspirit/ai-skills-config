# Universal AI Skills & Master Command Config (`ai-skills-config`)

Owner: **`wandringspirit`** (`piyushgaur17@gmail.com`)  
Repository: **`https://github.com/wandringspirit/ai-skills-config`**

A single repository that stores your **Universal Skill-First Master Commands** and **isolated, zero-collision `SKILL.md` libraries** for **Google Gemini / Antigravity** (`gemini/skills/`) and **Anthropic Claude** (`claude/skills/`).

---

## Zero-Collision Architecture (Why Claude & Gemini Never Clash)

Even if Claude and Gemini both have a skill with the **exact same name** (e.g., `financial-portfolio` or `seo-traffic-operator`), they **never conflict or overwrite each other** because each AI writes strictly to its own isolated directory:

```text
ai-skills-config/
├── README.md                              # Setup guide + Master Prompts for Gemini & Claude
├── GEMINI.md                              # Root Master Rule auto-loaded by Gemini / Antigravity
├── CLAUDE.md                              # Root Master Rule auto-loaded by Claude Code
├── gemini/                                # ISOLATED GEMINI NAMESPACE
│   ├── GEMINI.md                          # Gemini Master Rule
│   ├── README.md                          # Gemini setup guide
│   └── skills/                            # Gemini-only skills (uses view_file, define_subagent, etc.)
│       ├── skill-first-operator/SKILL.md
│       └── seo-traffic-operator/SKILL.md
├── claude/                                # ISOLATED CLAUDE NAMESPACE
│   ├── CLAUDE.md                          # Claude Master Rule
│   ├── README.md                          # Claude setup guide
│   ├── agents/                            # Claude-only subagents (~/.claude/agents/)
│   │   ├── skill-first-operator.md
│   │   └── seo-traffic-agent.md
│   └── skills/                            # Claude-only skills (~/.claude/skills/ -> uses Read, Write, Task, Bash)
│       ├── skill-first-operator/SKILL.md
│       └── seo-traffic-operator/SKILL.md
└── skills/                                # Active Antigravity runtime mount (~/.gemini/config/skills/)
```

- **Cross-Reading Allowed, Overwriting Blocked**: If Claude already built `claude/skills/marketing-funnel/SKILL.md`, Gemini can read it for domain inspiration and save a Gemini-native version into `gemini/skills/marketing-funnel/SKILL.md` — and vice versa — without ever touching the other agent's file!

---

## 1. Setup for Claude (`~/.claude` → `claude/skills` & `claude/agents`)

Run in Windows PowerShell:

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\.claude" | Out-Null
Copy-Item "$HOME\.gemini\config\claude\CLAUDE.md" "$HOME\.claude\CLAUDE.md" -Force
cmd /c mklink /J "$HOME\.claude\skills" "$HOME\.gemini\config\claude\skills"
cmd /c mklink /J "$HOME\.claude\agents" "$HOME\.gemini\config\claude\agents"
```

---

## 2. Setup for Google Gemini / Antigravity (`~/.gemini/config`)

Run in Windows PowerShell on any new laptop:

```powershell
cd "$HOME\.gemini\config"
git init -b main
git remote add origin https://github.com/wandringspirit/ai-skills-config.git
git fetch origin
git checkout -f main
```
