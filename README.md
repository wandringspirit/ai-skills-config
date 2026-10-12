# Universal AI Skills & Master Command Config (`ai-skills-config`)

Owner: **`wandringspirit`** (`piyushgaur17@gmail.com`)  
Repository: **`https://github.com/wandringspirit/ai-skills-config`**

A single, unified repository that stores your **Universal Skill-First Master Commands** and **all reusable `SKILL.md` domain skills** across **Google Gemini / Antigravity** and **Anthropic Claude (Claude Code, Claude Desktop & claude.ai)**.

---

## Repository Structure

```text
ai-skills-config/
├── README.md                              # Complete setup guide + copy-paste Master Prompts for Gemini & Claude
├── GEMINI.md                              # Root Master Rule auto-loaded by Gemini / Antigravity
├── CLAUDE.md                              # Root Master Rule auto-loaded by Claude Code
├── gemini/
│   ├── GEMINI.md                          # Gemini Master Rule file
│   └── README.md                          # How to set up Gemini / Antigravity Global Rules
├── claude/
│   ├── CLAUDE.md                          # Claude Master Rule file
│   └── README.md                          # How to set up Claude Code (~/.claude) + Claude Desktop/Web Custom Instructions
└── skills/                                # Shared Universal Skills Library (used by BOTH Gemini & Claude)
    ├── skill-first-operator/
    │   └── SKILL.md                       # Universal meta-skill (auto-creates & syncs new skills)
    └── seo-traffic-operator/
        └── SKILL.md                       # End-to-end SEO, Search Console & traffic operator
```

---

## 1. Master Command for Claude (Claude Code, Claude Desktop & claude.ai)

### Option A: Automatic Setup for **Claude Code CLI / IDE** (`~/.claude/CLAUDE.md`)
Run this in Windows PowerShell to automatically load the Master Command and shared `skills/` folder into Claude Code across all chats and projects:

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\.claude" | Out-Null
Copy-Item "$HOME\.gemini\config\CLAUDE.md" "$HOME\.claude\CLAUDE.md" -Force
cmd /c mklink /J "$HOME\.claude\skills" "$HOME\.gemini\config\skills"
```

### Option B: Copy-Paste Master Prompt for **Claude Desktop / claude.ai Web**
Go to **Claude → Settings → Profile → "What personal preferences should Claude consider in responses?"** (or **Project Instructions**) and paste:

```markdown
# Universal Skill-First Execution Protocol (Auto-Applied to Every Prompt)

This rule applies universally to 100% of domains, subjects, industries, and tasks without exception — regardless of what topic I ask about. Treat every non-trivial prompt across all chats and workspaces as if it ends with the following mandatory suffix:

1. Dynamically identify the domain or subject matter of my request.
2. Check if a relevant skill already exists in `.claude/skills/`, `~/.claude/skills/`, `.agents/skills/`, or `~/.gemini/config/skills/`, and read its `SKILL.md` BEFORE planning or executing the task.
3. If no skill exists for this domain yet — no matter what the topic or field is (coding, finance/portfolio analysis, marketing, sales, SEO, design, research, law, or any other field) — first research the authoritative frameworks, methodologies, and best practices for that domain, create a reusable `SKILL.md` in `skills/<domain-skill-name>/SKILL.md`, spawn a specialized subagent assigned to that skill when appropriate, and then execute the task step-by-step using that skill.
4. Whenever you create or update a global skill or rule, commit and push it to the `wandringspirit/ai-skills-config` Git repository (`git push origin main`) so the skill library stays synced across Claude and Gemini on all machines.
5. Always ask for my explicit approval before any external submission, live action, or irreversible change.
```

---

## 2. Master Command for Google Gemini / Antigravity (`~/.gemini/config/GEMINI.md`)

### Automatic Setup on Any New Laptop (Windows PowerShell)

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

### Copy-Paste Master Prompt for Gemini Global Rules (`GEMINI.md`)

```markdown
# Universal Skill-First Execution Protocol (Auto-Applied to Every Prompt)

This rule applies universally to 100% of domains, subjects, industries, and tasks without exception — regardless of what topic the user asks about. Treat every non-trivial user prompt across all chats and workspaces as if it ends with the following mandatory suffix:

> "Follow the Universal Skill-First Protocol for this task:
> 1. Dynamically identify the domain or subject matter of my request.
> 2. Check if a relevant skill already exists in `.agents/skills/`, `~/.gemini/config/skills/`, or built-in skills, and read its `SKILL.md` using `view_file` BEFORE planning or executing the task.
> 3. If no skill exists for this domain yet — no matter what the topic or field is — first research the authoritative frameworks, methodologies, and best practices for that domain (or download/adapt a requested skill), create a reusable `SKILL.md` in `~/.gemini/config/skills/<domain-skill-name>/SKILL.md` (or `.agents/skills/<domain-skill-name>/SKILL.md` if project-specific), define a specialized subagent via `define_subagent` assigned to that skill when appropriate, and then execute the task step-by-step using that skill.
> 4. Whenever you create or update a global skill or rule in `~/.gemini/config/`, commit it to the `wandringspirit/ai-skills-config` Git repository (`git push origin main`) so the global skill library stays backed up across machines.
> 5. Always ask for my explicit approval before any external submission, live action, or irreversible change."
```
