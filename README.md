# Universal AI Skills & Master Command Config (`ai-skills-config`)

Owner: **`wandringspirit`** (`piyushgaur17@gmail.com`)  
Repository: **`https://github.com/wandringspirit/ai-skills-config`**

A single, standalone repository cloned to `$HOME\ai-skills-config` (`C:\Users\piyus\ai-skills-config`) that both **Google Gemini / Antigravity** and **Anthropic Claude** read from directly via isolated subfolders (`gemini/` and `claude/`).

---

## Repository Structure (Zero-Collision Architecture)

```text
ai-skills-config/                          # Cloned to $HOME\ai-skills-config
├── README.md                              # Setup guide + Master Prompts for Gemini & Claude
├── gemini/                                # ISOLATED GEMINI NAMESPACE (Read by ~/.gemini/config)
│   ├── GEMINI.md                          # Gemini Master Rule
│   ├── README.md                          # Gemini setup guide
│   └── skills/                            # Gemini-only skills (view_file, define_subagent, etc.)
│       ├── skill-first-operator/SKILL.md
│       └── seo-traffic-operator/SKILL.md
└── claude/                                # ISOLATED CLAUDE NAMESPACE (Read by ~/.claude)
    ├── CLAUDE.md                          # Claude Master Rule
    ├── README.md                          # Claude setup guide
    ├── agents/                            # Claude-only subagents (~/.claude/agents/)
    │   ├── skill-first-operator.md
    │   └── seo-traffic-agent.md
    └── skills/                            # Claude-only skills (~/.claude/skills/)
        ├── skill-first-operator/SKILL.md
        ├── seo-traffic-operator/SKILL.md
        └── ... (14 Claude skills)
```

---

## Step 1: Clone the Repo Directly (On Any New Laptop)

Run in Windows PowerShell:

```powershell
git clone https://github.com/wandringspirit/ai-skills-config.git "$HOME\ai-skills-config"
```

---

## Step 2: Connect Google Gemini / Antigravity Directly to `ai-skills-config\gemini`

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\.gemini\config" | Out-Null
if (Test-Path "$HOME\.gemini\config\GEMINI.md") { Remove-Item "$HOME\.gemini\config\GEMINI.md" -Force }
if (Test-Path "$HOME\.gemini\config\skills") { Remove-Item -Recurse -Force "$HOME\.gemini\config\skills" }
New-Item -ItemType HardLink -Path "$HOME\.gemini\config\GEMINI.md" -Target "$HOME\ai-skills-config\gemini\GEMINI.md"
cmd /c mklink /J "$HOME\.gemini\config\skills" "$HOME\ai-skills-config\gemini\skills"
```

---

## Step 3: Connect Claude Directly to `ai-skills-config\claude`

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\.claude" | Out-Null
if (Test-Path "$HOME\.claude\CLAUDE.md") { Remove-Item "$HOME\.claude\CLAUDE.md" -Force }
if (Test-Path "$HOME\.claude\skills") { cmd /c rmdir "$HOME\.claude\skills" }
if (Test-Path "$HOME\.claude\agents") { cmd /c rmdir "$HOME\.claude\agents" }
New-Item -ItemType HardLink -Path "$HOME\.claude\CLAUDE.md" -Target "$HOME\ai-skills-config\claude\CLAUDE.md"
cmd /c mklink /J "$HOME\.claude\skills" "$HOME\ai-skills-config\claude\skills"
cmd /c mklink /J "$HOME\.claude\agents" "$HOME\ai-skills-config\claude\agents"
```
