# Universal Skill-First Execution Protocol for Claude (Auto-Applied to Every Prompt)

This rule applies **universally to 100% of domains, subjects, industries, and tasks without exception** — regardless of what topic the user asks about. Treat every non-trivial user prompt across all chats and workspaces as if it ends with the following mandatory suffix:

> "Follow the Universal Skill-First Protocol for this task:
> 1. **Dynamically Identify the Domain**: Determine the exact subject matter or workflow of my request.
> 2. **Check & Read Existing Skills First (Single Shared Source)**:
>    - Check `.agents/skills/`, `.claude/skills/`, and `~/ai-skills-config/skills/` (`~/.claude/skills/`), and read the matching `SKILL.md` (plus `CLAUDE-SOP.md` if present) using your file-reading tool (`Read`) BEFORE planning or executing the task.
>    - **Single-Source + Zero-SOP-Conflict Rule**: Both Claude and Gemini share the unified `~/ai-skills-config/skills/<skill-name>/SKILL.md` directory so domain knowledge is never duplicated. When execution workflows differ between Claude and Gemini for the same skill name, follow `## Claude Execution SOP` (or `CLAUDE-SOP.md`), and **never overwrite or delete** `## Gemini (Antigravity) Execution SOP` (or `GEMINI-SOP.md`).
> 3. **Auto-Acquire / Create Missing Skills First**:
>    - If no skill exists in `~/ai-skills-config/skills/` (`~/.claude/skills/`) for this domain yet — no matter what the topic or field is — first research the authoritative frameworks, methodologies, and best practices for that domain, create a reusable `SKILL.md` in `~/ai-skills-config/skills/<domain-skill-name>/SKILL.md` (with shared domain knowledge + `## Claude Execution SOP` and `## Gemini (Antigravity) Execution SOP` sections when applicable), create or invoke a specialized subagent in `~/.claude/agents/<domain-agent-name>.md` (or via the `Task` tool) when appropriate, and then execute the task step-by-step using that skill.
> 4. **Always Announce Skill Usage & Acquisition to the User**:
>    - **Every time you use an existing skill or acquire/create a new skill, explicitly tell the user in your response** which skill you activated or created (e.g., `**[Skill Active: <skill-name>]**` or `**[New Skill Acquired & Pushed: <skill-name>]**`).
> 5. **Auto-Push to GitHub (`wandringspirit/ai-skills-config`)**:
>    - Whenever you create or update a skill or rule in `~/ai-skills-config/`, immediately stage, commit, and push it to the `wandringspirit/ai-skills-config` GitHub repository:
>      `git -C "C:\Users\piyus\ai-skills-config" add skills/ claude/ README.md && git -C "C:\Users\piyus\ai-skills-config" commit -m "feat(skill): add/update <skill-name>" && git -C "C:\Users\piyus\ai-skills-config" push origin main`
> 6. **Human-in-the-Loop Approval Gate**:
>    - Always ask for my explicit approval before any external submission, live action, or irreversible change."

# Universal Outbound-Link Check (all chats, all projects)

Before sending, scheduling, or handing over for sending any email, message, post, form text or draft that contains a link, made through any connector, API, MCP tool or automation (Gmail, Outlook, Slack, schedulers, CRMs and so on):
1. **Read it back as the recipient will get it.** Fetch the created draft or message in its raw or full format (for example Gmail `get_draft` with `RAW` or `FULL_CONTENT`) and compare every URL, in both the visible text and the `href`, with the URL I wrote.
2. **Any difference stops the send.** This includes redirect wrappers (`google.com/url?q=`, `safelinks.protection.outlook.com`, `urldefense`, `l.facebook.com`), added tracking parameters, shorteners, or missing links. Tell the user what changed and switch to a route that keeps links intact, such as the provider's own web compose window or the user sending it themselves.
3. **If unsure, ask.** If I can't read the message back, or I'm unsure whether a link will reach the recipient unchanged, I ask the user before sending.
4. **Recheck every new session.** A connector that rewrote links before (the Claude Gmail connector did in Nov 2026: every URL became a `google.com/url` "Redirect Notice" link) is assumed to still do so until a fresh self-addressed test shows clean links.
