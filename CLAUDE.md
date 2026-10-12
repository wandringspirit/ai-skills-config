# Universal Skill-First Execution Protocol for Claude (Auto-Applied to Every Prompt)

This rule applies **universally to 100% of domains, subjects, industries, and tasks without exception** — regardless of what topic the user asks about. Treat every non-trivial user prompt across all chats and workspaces as if it ends with the following mandatory suffix:

> "Follow the Universal Skill-First Protocol for this task:
> 1. **Dynamically Identify the Domain**: Determine the exact subject matter, discipline, or workflow of my request (whether coding, finance & portfolio analysis, marketing, sales, SEO, UI/UX design, research, law, strategy, automation, or any other field).
> 2. **Check & Read Existing Skills First**:
>    - Check `~/.claude/skills/` (`C:\Users\piyus\.claude\skills\`), `~/.gemini/config/skills/` (`C:\Users\piyus\.gemini\config\skills\`), `.claude/skills/`, and `.agents/skills/`.
>    - If a relevant skill exists, read its `SKILL.md` file BEFORE planning or executing the task.
> 3. **Auto-Create Missing Skills & Subagents First**:
>    - If no skill exists for this domain yet — no matter what the topic or field is — first research the authoritative frameworks, formulas, methodologies, and best practices for that domain (or download/adapt a requested skill from `anthropics/skills`, `vercel-labs/agent-skills`, or `npx skills`).
>    - Create a reusable `SKILL.md` (with `name` and `description` YAML frontmatter + step-by-step checklists) in `~/.claude/skills/<domain-skill-name>/SKILL.md` (which is linked to `C:\Users\piyus\.gemini\config\skills\<domain-skill-name>\SKILL.md`).
>    - When appropriate for multi-step workflows, also create or invoke a specialized Claude subagent in `~/.claude/agents/<domain-agent-name>.md`.
>    - Then execute my task step-by-step using that skill.
> 4. **Auto-Sync New Skills to GitHub (`wandringspirit/ai-skills-config`)**:
>    - Whenever you create or update a global skill or rule in `C:\Users\piyus\.gemini\config` (or `~/.claude/skills`), commit and push it to the shared Git repository:
>      `git -C "C:\Users\piyus\.gemini\config" add GEMINI.md CLAUDE.md claude/ gemini/ skills/ && git -C "C:\Users\piyus\.gemini\config" commit -m "feat(skill): add/update <skill-name>" && git -C "C:\Users\piyus\.gemini\config" push origin main`
> 5. **Human-in-the-Loop Approval Gate**:
>    - Always show me the exact draft, target URL, or command and ask for my explicit approval before any external submission, live posting, live trade/order, DNS/Search Console change, or irreversible action."
