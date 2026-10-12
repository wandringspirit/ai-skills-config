---
name: skill-first-operator
description: >-
  Universal meta-skill shared by Gemini (Antigravity) and Claude that applies to 100% of
  domains, topics, and industries without exception. Ensures the agent dynamically identifies
  the domain of any user request, checks the unified C:\Users\piyus\ai-skills-config\skills\
  directory, or researches and creates a domain-specific SKILL.md (with shared domain knowledge
  plus separate Gemini/Claude SOP sections when workflows differ), explicitly announces the
  active/acquired skill to the user, and pushes updates to wandringspirit/ai-skills-config.
---

# Universal Skill-First Operator — Shared Gemini & Claude Edition (`skills/skill-first-operator`)

This workflow applies **universally to every domain, discipline, or subject matter without exception**:

## 1. Core Shared Workflow (Both Gemini & Claude)

1. **Dynamically Identify the Domain**:
   - Determine the exact field, discipline, or workflow required by the user's prompt.
2. **Check the Unified Skills Folder First (`C:\Users\piyus\ai-skills-config\skills\`)**:
   - Both `~/.gemini/config/skills/` and `~/.claude/skills/` link directly to the single shared source at `C:\Users\piyus\ai-skills-config\skills\`.
   - Also check project-local skills (`.agents/skills/` or `.claude/skills/`).
   - If a matching `SKILL.md` exists, read it before planning or executing the task.
3. **Zero-Duplication + Zero-SOP-Conflict Rule**:
   - All skills live in the **single shared directory** `C:\Users\piyus\ai-skills-config\skills\<skill-name>\SKILL.md`.
   - **Shared Domain Playbook**: The core frameworks, formulas, checklists, and domain rules live in the main body of `SKILL.md` so data is never duplicated.
   - **Agent-Specific SOPs (When Workflows Differ)**:
     - If Gemini and Claude need different execution SOPs for the same skill, include two clearly labeled sections inside `SKILL.md`:
       - `## Gemini (Antigravity) Execution SOP`
       - `## Claude Execution SOP`
       *(or optional companion files `GEMINI-SOP.md` and `CLAUDE-SOP.md` inside the skill folder for large custom workflows).*
     - **Never delete or overwrite the other agent's SOP section!** Gemini only edits the shared domain content and `## Gemini (Antigravity) Execution SOP` (`GEMINI-SOP.md`); Claude only edits the shared domain content and `## Claude Execution SOP` (`CLAUDE-SOP.md`).
4. **Create Missing Skill for Any New Domain**:
   - If no matching skill exists yet in `C:\Users\piyus\ai-skills-config\skills\`, research the authoritative frameworks, formulas, and best practices, and create `C:\Users\piyus\ai-skills-config\skills\<domain-skill-name>\SKILL.md`.
5. **Always Announce Skill Usage & Acquisition to the User**:
   - **Every time you use an existing skill or acquire/create a new skill, explicitly state it in your response** (e.g., `**[Skill Active: <skill-name>]**` or `**[New Skill Acquired & Pushed: <skill-name>]**`).
6. **Auto-Push to GitHub (`wandringspirit/ai-skills-config`)**:
   - Immediately stage, commit, and push any new or updated skill or rule:
     `git -C "C:\Users\piyus\ai-skills-config" add skills/ gemini/ claude/ README.md; git -C "C:\Users\piyus\ai-skills-config" commit -m "feat(skill): add/update <skill-name>"; git -C "C:\Users\piyus\ai-skills-config" push origin main`
7. **Human-in-the-Loop Approval Gate**:
   - Always request explicit user approval before executing any external submission, live transaction, or irreversible action.

---

## Gemini (Antigravity) Execution SOP

- **Reading Skills**: Use `view_file` on `C:\Users\piyus\.gemini\config\skills\<skill-name>\SKILL.md` (and `GEMINI-SOP.md` if present).
- **Writing / Updating Skills**: Use `write_to_file` or `replace_file_content` on `C:\Users\piyus\ai-skills-config\skills\<skill-name>\SKILL.md`.
- **Subagents**: Use `define_subagent` and `invoke_subagent` when delegating multi-step domain workflows.

---

## Claude Execution SOP

- **Reading Skills**: Use `Read` on `~/.claude/skills/<skill-name>/SKILL.md` (and `CLAUDE-SOP.md` if present).
- **Writing / Updating Skills**: Use `Write` or `Edit` on `C:\Users\piyus\ai-skills-config\skills\<skill-name>\SKILL.md`.
- **Subagents**: Create or invoke specialist agents in `~/.claude/agents/<agent-name>.md` via the `Task` tool.
