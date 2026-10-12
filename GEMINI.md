# Universal Skill-First Execution Protocol for Gemini (Auto-Applied to Every Prompt)

This rule applies **universally to 100% of domains, subjects, industries, and tasks without exception** — regardless of what topic the user asks about. Treat every non-trivial user prompt across all chats and workspaces as if it ends with the following mandatory suffix:

> "Follow the Universal Skill-First Protocol for this task:
> 1. **Dynamically Identify the Domain**: Determine the exact subject matter or workflow of my request.
> 2. **Check & Read Existing Skills First**:
>    - Check `.agents/skills/`, `~/.gemini/config/skills/` (`gemini/skills/`), and built-in skills, and read the matching `SKILL.md` using `view_file` BEFORE planning or executing the task.
>    - **Zero-Collision Rule**: Gemini's skills live strictly in `~/.gemini/config/skills/` (`gemini/skills/`), completely separate from Claude's `claude/skills/` (`~/.claude/skills/`). You may read a skill from `claude/skills/` as a reference if needed, but ALWAYS write and save Gemini's own version inside `~/.gemini/config/skills/<domain-skill-name>/SKILL.md` (and mirror to `gemini/skills/<domain-skill-name>/SKILL.md`) so the two agents never overwrite or clash with each other.
> 3. **Auto-Acquire / Create Missing Skills First**:
>    - If no skill exists in `~/.gemini/config/skills/` for this domain yet — no matter what the topic or field is — first research the authoritative frameworks, methodologies, and best practices for that domain (or download/adapt a requested skill), create a reusable `SKILL.md` in `~/.gemini/config/skills/<domain-skill-name>/SKILL.md` (and mirror to `gemini/skills/<domain-skill-name>/SKILL.md`), define a specialized subagent via `define_subagent` assigned to that skill when appropriate, and then execute the task step-by-step using that skill.
> 4. **Always Announce Skill Usage & Acquisition to the User**:
>    - **Every time you use an existing skill or acquire/create a new skill, explicitly tell the user in your response** which skill you activated or created (e.g., `**[Skill Active: <skill-name>]**` or `**[New Skill Acquired & Saved: <skill-name>]**`).
> 5. **Auto-Push to GitHub (`wandringspirit/ai-skills-config`)**:
>    - Whenever you create or update a global skill or rule in `~/.gemini/config/`, immediately stage, commit, and push it to the `wandringspirit/ai-skills-config` GitHub repository:
>      `git -C "C:\Users\piyus\.gemini\config" add GEMINI.md CLAUDE.md README.md gemini/ claude/ skills/; git -C "C:\Users\piyus\.gemini\config" commit -m "feat(skill): add/update <skill-name>"; git -C "C:\Users\piyus\.gemini\config" push origin main`
> 6. **Human-in-the-Loop Approval Gate**:
>    - Always ask for my explicit approval before any external submission, live action, or irreversible change."
