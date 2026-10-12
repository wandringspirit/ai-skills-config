---
name: skill-first-operator
description: >-
  Universal meta-skill for Claude that applies to 100% of domains, topics, and industries
  without exception. Ensures Claude dynamically identifies the domain of any user request,
  checks ~/.claude/skills/ (claude/skills/), or researches and creates a Claude-native
  SKILL.md before executing the task, without colliding with Gemini's skills folder.
---

# Universal Skill-First Operator — Claude Edition (`claude/skills/skill-first-operator`)

This workflow applies **universally to every domain, discipline, or subject matter without exception**:

1. **Dynamically Identify the Domain**:
   - Determine the exact field, discipline, or workflow required by the user's prompt.
2. **Check Claude's Dedicated Skills Folder First (`~/.claude/skills/`)**:
   - Inspect `~/.claude/skills/` (`C:\Users\piyus\.gemini\config\claude\skills\`) and `<workspace>/.claude/skills/`.
   - If a matching `SKILL.md` exists in Claude's folder, read it and follow its steps.
   - If the skill does not exist in `claude/skills/` yet, check if Gemini already has a domain reference in `C:\Users\piyus\.gemini\config\skills\<domain>\SKILL.md`. If so, adapt its domain checklists into a **separate** Claude-native skill inside `~/.claude/skills/<domain>/SKILL.md` (never overwrite Gemini's folder).
3. **Create Missing Skill in `claude/skills/`**:
   - If no skill exists for that domain yet, research the authoritative frameworks, formulas, and best practices, and write `~/.claude/skills/<domain-skill-name>/SKILL.md` using Claude's native tools (`Read`, `Write`, `Edit`, `Bash`, `Task`).
4. **Auto-Backup to Git (`wandringspirit/ai-skills-config`)**:
   - Stage, commit, and push changes under `claude/` to `https://github.com/wandringspirit/ai-skills-config`.
5. **Approval Gate**:
   - Always request explicit user approval before executing any external submission, live transaction, or irreversible action.
