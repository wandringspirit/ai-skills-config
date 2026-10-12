---
name: skill-first-operator
description: >-
  Universal meta-skill that applies to 100% of domains, topics, and industries without
  exception. Ensures the agent dynamically identifies the domain of any user request,
  checks for an existing SKILL.md, or researches and creates a domain-specific SKILL.md
  (and specialized subagent when needed) before executing the task, and backs up global
  skills to the ~/.gemini/config Git repository.
---

# Universal Skill-First Operator (`skill-first-operator`)

This workflow applies **universally to every domain, discipline, or subject matter without exception**:

1. **Dynamically Identify the Domain**:
   - Determine the exact field, discipline, or workflow required by the user's prompt (no matter what topic it is).
2. **Check Existing Skills**:
   - Inspect built-in skills, `~/.gemini/config/skills/`, and `<workspace>/.agents/skills/`.
   - If a matching `SKILL.md` exists, read it via `view_file` and follow its steps.
3. **Download or Author Missing Skill for Any New Domain**:
   - If no matching skill exists yet for that domain:
     - Research the gold-standard frameworks, formulas, checklists, and best practices for that discipline (or fetch a skill template if provided).
     - Write a structured `SKILL.md` with YAML frontmatter (`name`, `description`) into `~/.gemini/config/skills/<domain-skill-name>/SKILL.md` (so it is permanently learned for all future chats) or `<workspace>/.agents/skills/<domain-skill-name>/SKILL.md` (if specific to one repo).
4. **Auto-Backup Global Skills to Git**:
   - Whenever a skill or rule is added or updated in `~/.gemini/config/`, stage and commit the change in `~/.gemini/config` (`git add GEMINI.md skills/; git commit -m "feat(skill): add/update <skill-name>"`) and push to `origin main` if a remote is configured.
5. **Assign Subagent (When Appropriate)**:
   - For multi-step workflows, call `define_subagent` to create a domain specialist bound to that `SKILL.md`.
6. **Approval Gate**:
   - Always request explicit user approval before executing any external submission, live transaction, or irreversible action.
