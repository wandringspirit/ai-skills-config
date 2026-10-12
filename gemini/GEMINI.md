# Universal Skill-First Execution Protocol for Gemini (Auto-Applied to Every Prompt)

This rule applies **universally to 100% of domains, subjects, industries, and tasks without exception** — regardless of what topic the user asks about. Treat every non-trivial user prompt across all chats and workspaces as if it ends with the following mandatory suffix:

> "Follow the Universal Skill-First Protocol for this task:
> 1. **Dynamically Identify the Domain**: Determine the exact subject matter or workflow of my request.
> 2. **Check & Read Existing Skills First (Single Shared Source)**:
>    - Check `.agents/skills/`, `~/ai-skills-config/skills/` (`~/.gemini/config/skills/`), and built-in skills, and read the matching `SKILL.md` (plus `GEMINI-SOP.md` if present) using `view_file` BEFORE planning or executing the task.
>    - **Single-Source + Zero-SOP-Conflict Rule**: Both Gemini and Claude share the unified `~/ai-skills-config/skills/<skill-name>/SKILL.md` directory so domain knowledge is never duplicated. When execution workflows differ between Gemini and Claude for the same skill name, follow `## Gemini (Antigravity) Execution SOP` (or `GEMINI-SOP.md`), and **never overwrite or delete** `## Claude Execution SOP` (or `CLAUDE-SOP.md`).
> 3. **Auto-Acquire / Create Missing Skills First**:
>    - If no skill exists in `~/ai-skills-config/skills/` for this domain yet — no matter what the topic or field is — first research the authoritative frameworks, methodologies, and best practices for that domain, create a reusable `SKILL.md` in `~/ai-skills-config/skills/<domain-skill-name>/SKILL.md` (with shared domain knowledge + `## Gemini (Antigravity) Execution SOP` and `## Claude Execution SOP` sections when applicable), define a specialized subagent via `define_subagent` when appropriate, and then execute the task step-by-step using that skill.
> 4. **Always Announce Skill Usage & Acquisition to the User**:
>    - **Every time you use an existing skill or acquire/create a new skill, explicitly tell the user in your response** which skill you activated or created (e.g., `**[Skill Active: <skill-name>]**` or `**[New Skill Acquired & Pushed: <skill-name>]**`).
> 5. **Auto-Push to GitHub (`wandringspirit/ai-skills-config`)**:
>    - Whenever you create or update a skill or rule in `~/ai-skills-config/`, immediately stage, commit, and push it to the `wandringspirit/ai-skills-config` GitHub repository:
>      `git -C "C:\Users\piyus\ai-skills-config" add skills/ gemini/ README.md; git -C "C:\Users\piyus\ai-skills-config" commit -m "feat(skill): add/update <skill-name>"; git -C "C:\Users\piyus\ai-skills-config" push origin main`
> 6. **Human-in-the-Loop Approval Gate**:
>    - Always ask for my explicit approval before any external submission, live action, or irreversible change."
