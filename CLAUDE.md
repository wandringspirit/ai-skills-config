# Universal Skill-First Execution Protocol for Claude (Auto-Applied to Every Prompt)

This rule applies **universally to 100% of domains, subjects, industries, and tasks without exception** — regardless of what topic the user asks about. Treat every non-trivial user prompt across all chats and workspaces as if it ends with the following mandatory suffix:

> "Follow the Universal Skill-First Protocol for this task:
> 1. **Dynamically Identify the Domain**: Determine the exact subject matter, discipline, or workflow of my request (whether coding, finance & portfolio analysis, marketing, sales, SEO, UI/UX design, research, law, strategy, automation, or any other field).
> 2. **Check Claude's Isolated Skills Folder First (`~/.claude/skills/`)**:
>    - Check `~/.claude/skills/` (`C:\Users\piyus\.gemini\config\claude\skills\`) and `<workspace>/.claude/skills/`.
>    - If a relevant skill exists there, read its `SKILL.md` file BEFORE planning or executing the task.
>    - **Zero-Collision Rule**: Claude's skills live strictly in `claude/skills/` (`~/.claude/skills/`), completely separate from Gemini's `skills/` (`gemini/skills/`). You may read a skill from Gemini's `C:\Users\piyus\.gemini\config\skills\` as a reference if needed, but ALWAYS write and save Claude's own version inside `~/.claude/skills/<domain-skill-name>/SKILL.md` so the two agents never overwrite or clash with each other.
> 3. **Auto-Create Missing Skills & Subagents First**:
>    - If no skill exists in `~/.claude/skills/` for this domain yet, first research the authoritative frameworks, formulas, methodologies, and best practices for that domain.
>    - Create a reusable Claude-native `SKILL.md` in `~/.claude/skills/<domain-skill-name>/SKILL.md` (and a subagent in `~/.claude/agents/<domain-agent-name>.md` when appropriate), then execute my task step-by-step using that skill.
> 4. **Always Announce Skill Usage & Acquisition to the User**:
>    - **Every time you use an existing skill or acquire/create a new skill, explicitly tell the user in your response** which skill you activated or created (e.g., `**[Skill Active: <skill-name>]**` or `**[New Skill Acquired & Saved: <skill-name>]**`).
> 5. **Auto-Push New Skills to GitHub (`wandringspirit/ai-skills-config`)**:
>    - Whenever you create or update a Claude skill or rule, immediately stage, commit, and push `claude/` and `CLAUDE.md` to the shared GitHub repository:
>      `git -C "C:\Users\piyus\.gemini\config" add CLAUDE.md claude/ && git -C "C:\Users\piyus\.gemini\config" commit -m "feat(claude-skill): add/update <skill-name>" && git -C "C:\Users\piyus\.gemini\config" push origin main`
> 6. **Human-in-the-Loop Approval Gate**:
>    - Always show me the exact draft, target URL, or command and ask for my explicit approval before any external submission, live posting, live trade/order, DNS/Search Console change, or irreversible action."
