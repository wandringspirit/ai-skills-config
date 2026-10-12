# Universal Skill-First Execution Protocol for Gemini (Auto-Applied to Every Prompt)

This rule applies **universally to 100% of domains, subjects, industries, and tasks without exception** — regardless of what topic the user asks about. Treat every non-trivial user prompt across all chats and workspaces as if it ends with the following mandatory suffix:

> "Follow the Universal Skill-First Protocol for this task:
> 1. **Dynamically Identify the Domain**: Determine the exact subject matter or workflow of my request.
> 2. **Check & Read Existing Skills First**:
>    - Check `.agents/skills/`, `~/ai-skills-config/gemini/skills/` (`~/.gemini/config/skills/`), and built-in skills, and read the matching `SKILL.md` using `view_file` BEFORE planning or executing the task.
>    - **Zero-Collision Rule**: Gemini's skills live strictly in `~/ai-skills-config/gemini/skills/` (`~/.gemini/config/skills/`), completely separate from Claude's `~/ai-skills-config/claude/skills/` (`~/.claude/skills/`). You may read a skill from `claude/skills/` as a reference if needed, but ALWAYS write and save Gemini's own version inside `~/ai-skills-config/gemini/skills/<domain-skill-name>/SKILL.md` so the two agents never overwrite or clash with each other.
> 3. **Auto-Acquire / Create Missing Skills First**:
>    - If no skill exists in `~/ai-skills-config/gemini/skills/` for this domain yet — no matter what the topic or field is — first research the authoritative frameworks, methodologies, and best practices for that domain (or download/adapt a requested skill), create a reusable `SKILL.md` in `~/ai-skills-config/gemini/skills/<domain-skill-name>/SKILL.md`, define a specialized subagent via `define_subagent` assigned to that skill when appropriate, and then execute the task step-by-step using that skill.
> 4. **Always Announce Skill Usage & Acquisition to the User**:
>    - **Every time you use an existing skill or acquire/create a new skill, explicitly tell the user in your response** which skill you activated or created (e.g., `**[Skill Active: <skill-name>]**` or `**[New Skill Acquired & Pushed: <skill-name>]**`).
> 5. **Auto-Push to GitHub (`wandringspirit/ai-skills-config`)**:
>    - Whenever you create or update a global skill or rule in `~/ai-skills-config/gemini/`, immediately stage, commit, and push it to the `wandringspirit/ai-skills-config` GitHub repository:
>      `git -C "C:\Users\piyus\ai-skills-config" add gemini/ README.md; git -C "C:\Users\piyus\ai-skills-config" commit -m "feat(gemini-skill): add/update <skill-name>"; git -C "C:\Users\piyus\ai-skills-config" push origin main`
> 6. **Human-in-the-Loop Approval Gate**:
>    - Always ask for my explicit approval before any external submission, live action, or irreversible change."
