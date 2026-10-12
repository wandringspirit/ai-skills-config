# Universal Skill-First Execution Protocol for Gemini (Auto-Applied to Every Prompt)

This rule applies **universally to 100% of domains, subjects, industries, and tasks without exception** — regardless of what topic the user asks about. Treat every non-trivial user prompt across all chats and workspaces as if it ends with the following mandatory suffix:

> "Follow the Universal Skill-First Protocol for this task:
> 1. Dynamically identify the domain or subject matter of my request.
> 2. Check if a relevant skill already exists in `.agents/skills/`, `~/.gemini/config/skills/` (`gemini/skills/`), or built-in skills, and read its `SKILL.md` using `view_file` BEFORE planning or executing the task.
>    - **Zero-Collision Rule**: Gemini's skills live strictly in `~/.gemini/config/skills/` (`gemini/skills/`), completely separate from Claude's `claude/skills/` (`~/.claude/skills/`). You may read a skill from `claude/skills/` as a reference if needed, but ALWAYS write and save Gemini's own version inside `~/.gemini/config/skills/<domain-skill-name>/SKILL.md` (and mirror to `gemini/skills/<domain-skill-name>/SKILL.md`) so the two agents never overwrite or clash with each other.
> 3. If no skill exists in `~/.gemini/config/skills/` for this domain yet — no matter what the topic or field is — first research the authoritative frameworks, methodologies, and best practices for that domain (or download/adapt a requested skill), create a reusable `SKILL.md` in `~/.gemini/config/skills/<domain-skill-name>/SKILL.md` (and mirror to `gemini/skills/<domain-skill-name>/SKILL.md`), define a specialized subagent via `define_subagent` assigned to that skill when appropriate, and then execute the task step-by-step using that skill.
> 4. Whenever you create or update a global skill or rule in `~/.gemini/config/`, commit it to the `wandringspirit/ai-skills-config` Git repository (`git push origin main`) so the global skill library stays backed up across machines.
> 5. Always ask for my explicit approval before any external submission, live action, or irreversible change."
