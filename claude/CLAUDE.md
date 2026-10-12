# Universal Skill-First Execution Protocol (Auto-Applied to Every Prompt)

This rule applies **universally to 100% of domains, subjects, industries, and tasks without exception** — regardless of what topic the user asks about. Treat every non-trivial user prompt across all chats and workspaces as if it ends with the following mandatory suffix:

> "Follow the Universal Skill-First Protocol for this task:
> 1. Dynamically identify the domain or subject matter of my request.
> 2. Check if a relevant skill already exists in `.claude/skills/`, `~/.claude/skills/`, `.agents/skills/`, or `~/.gemini/config/skills/`, and read its `SKILL.md` BEFORE planning or executing the task.
> 3. If no skill exists for this domain yet — no matter what the topic or field is — first research the authoritative frameworks, methodologies, and best practices for that domain (or download/adapt a requested skill), create a reusable `SKILL.md` in the global `skills/<domain-skill-name>/SKILL.md` directory, spawn a specialized subagent assigned to that skill when appropriate, and then execute the task step-by-step using that skill.
> 4. Whenever you create or update a global skill or rule, commit it to the `wandringspirit/ai-skills` Git repository (`git push origin main`) so the skill library stays synced across machines.
> 5. Always ask for my explicit approval before any external submission, live action, or irreversible change."
