---
name: skill-first-operator
description: >-
  Universal meta-skill that applies to 100% of domains, topics, and industries without
  exception. Ensures the agent dynamically identifies the domain of any user request,
  checks for an existing SKILL.md in ~/.gemini/config/skills/ (C:\Users\piyus\ai-skills-config\gemini\skills\),
  or researches and creates a domain-specific SKILL.md before executing the task, explicitly
  announces the active/acquired skill to the user, and pushes new or updated skills to the
  wandringspirit/ai-skills-config GitHub repo.
---

# Universal Skill-First Operator — Gemini Edition (`gemini/skills/skill-first-operator`)

This workflow applies **universally to every domain, discipline, or subject matter without exception**:

1. **Dynamically Identify the Domain**:
   - Determine the exact field, discipline, or workflow required by the user's prompt.
2. **Check Existing Skills**:
   - Inspect built-in skills, `~/.gemini/config/skills/` (`C:\Users\piyus\ai-skills-config\gemini\skills\`), and `<workspace>/.agents/skills/`.
   - If a matching `SKILL.md` exists, read it via `view_file` and follow its steps.
3. **Download or Author Missing Skill for Any New Domain**:
   - If no matching skill exists yet for that domain:
     - Research the gold-standard frameworks, formulas, checklists, and best practices for that discipline.
     - Write a structured `SKILL.md` with YAML frontmatter (`name`, `description`) into `~/.gemini/config/skills/<domain-skill-name>/SKILL.md` (`C:\Users\piyus\ai-skills-config\gemini\skills\<domain-skill-name>\SKILL.md`).
4. **Always Announce Skill Usage & Acquisition to the User**:
   - **Every time you use an existing skill or acquire/create a new skill, explicitly state it in your response** (e.g., `**[Skill Active: <skill-name>]**` or `**[New Skill Acquired & Pushed: <skill-name>]**`).
5. **Auto-Push Global Skills to GitHub (`wandringspirit/ai-skills-config`)**:
   - Whenever a skill or rule is added or updated in `C:\Users\piyus\ai-skills-config\gemini\`, immediately stage, commit, and push the change to GitHub:
     `git -C "C:\Users\piyus\ai-skills-config" add gemini/ README.md; git -C "C:\Users\piyus\ai-skills-config" commit -m "feat(gemini-skill): add/update <skill-name>"; git -C "C:\Users\piyus\ai-skills-config" push origin main`
6. **Assign Subagent (When Appropriate)**:
   - For multi-step workflows, call `define_subagent` to create a domain specialist bound to that `SKILL.md`.
7. **Approval Gate**:
   - Always request explicit user approval before executing any external submission, live transaction, or irreversible action.
