---
name: multi-agent-mission-control
description: >-
  Architecture and implementation guide for building a real-time Multi-Agent Mission
  Control Dashboard that monitors, inspects, starts, pauses, and stops multiple concurrent
  Gemini (Antigravity) and Claude Code agents across chats and workspaces.
---

# Multi-Agent Mission Control Operator (`multi-agent-mission-control`)

Use this skill whenever the user asks to monitor, orchestrate, inspect, or control multiple AI agents (Gemini / Antigravity chats, subagents, background tasks, and Claude Code / Desktop sessions) from a unified dashboard.

---

## 1. Why a Plain Static `.html` File Isn't Enough (and What Works Best)

A plain `file:///.../dashboard.html` opened in a browser **cannot**:
- Read local session files in `~/.gemini/antigravity/brain/` or `~/.claude/sessions/` due to browser CORS / `file://` sandbox restrictions.
- Kill/stop a running process (`PID`) or send a prompt/resume command to a running agent.

### The 3 Architecture Options (Ranked)

| Option | How It Works | Pros | Cons |
|---|---|---|---|
| **Option A (Recommended): Local Node.js Mission Control Server + Web Dashboard (`http://localhost:4400`) + Antigravity Sidecar Panel** | A lightweight zero-dependency Node.js server that reads `~/.gemini/antigravity/brain/*` + `~/.claude/sessions/*` in real time AND exposes REST/SSE APIs to Start, Resume, Approve, or Stop (`kill PID`) any agent. Can be opened in any browser tab **and** docked inside Antigravity as a UI Extension sidecar! | Works across **both** Gemini & Claude; real-time live logs; 1-click Start/Stop buttons actually work; zero external dependencies. | Needs the lightweight background Node process running (can be auto-started by Antigravity sidecar). |
| **Option B: Antigravity UI Extension Plugin Only (`~/.gemini/config/plugins/mission-control/`)** | Runs `SidecarApp` inside Antigravity's right-hand auxiliary pane and uses `window.sidecar.ui.toggleConversation(id)` and `window.sidecar.agent.sendMessage()`. | Auto-starts with Antigravity; native theme sync; 1-click jump to any Antigravity chat. | Docked inside Antigravity window rather than a full-screen standalone monitor unless opened via its localhost port. |
| **Option C: Agent-Written Status Registry + Static HTML** | Every agent writes its status to a shared `agents-status.json` file. | Simple file format. | Fragile if an agent crashes mid-step; static HTML still needs a local HTTP server to poll JSON and cannot stop/start OS processes. |

**Best Solution**: **Hybrid Option A + B** — Build a single **Antigravity UI Extension Plugin (`mission-control`)** whose Node.js backend (`main.mjs`) **also** binds a fixed convenience port (`http://localhost:4400`) so the user can view it either:
1. Full-screen in any browser tab at `http://localhost:4400`, **OR**
2. Docked right inside Antigravity's side pane!

---

## 2. Telemetry Sources Discovered on Disk

### A. Gemini / Antigravity (`~/.gemini/antigravity/brain/<conversation-id>/`)
- **Transcript Log**: `.system_generated/logs/transcript.jsonl`
  - First `USER_INPUT` step → Initial goal / mission title.
  - Latest step (`type`, `status`, `created_at`, `tool_calls`) → Current activity, active tool (`toolAction` / `toolSummary`), and whether it is waiting for approval (`ask_question` or blocked tool call).
  - Subagents spawned → `tool_calls` where `name === "invoke_subagent"`.
- **Planned Todo / Progress**:
  - `task.md` or `implementation_plan.md` in `<brain>/<conversation-id>/` (parses `- [x]` completed, `- [/]` in-progress, `- [ ]` planned todo items) OR shared `<workspace>/.agents/mission-status.json`.
- **Background Tasks**:
  - `.system_generated/tasks/*.log`

### B. Claude Code / Claude Desktop (`~/.claude/`)
- **Live Session Registry**: `~/.claude/sessions/<pid>.json`
  - Fields: `pid`, `sessionId`, `cwd` (workspace path), `startedAt` (epoch ms), `name` (task title), `status` (`running`, `idle`, `waiting`), `statusUpdatedAt`, `entrypoint` (`claude-desktop`, `cli`).
- **Project Transcripts**: `~/.claude/projects/<encoded-cwd>/<sessionId>.jsonl`
  - Contains recent messages, tool uses, and todo lists (`TodoWrite` tool calls).

---

## 3. Core Dashboard Features Checklist

1. **Fleet Overview Bar**:
   - Total Active Agents | Pending Your Approval (highlighted in amber/red) | Running | Idle/Completed.
2. **Agent Fleet List (Left Pane / Main Grid)**:
   - Engine badge (`Gemini / Antigravity` vs `Claude`), Chat/Session Title, Workspace path (`cwd`), **Running Since / Elapsed Time**, Live Status Pill (`🟢 Running`, `🟡 Needs Approval`, `⚪ Idle`, `🔴 Error/Stopped`), and current tool action.
3. **Deep-Dive Inspector Drawer (Click Any Agent)**:
   - **Role & Mission**: What its job is and initial user prompt.
   - **Pending Approval Banner**: Exact question or command waiting for user sign-off + 1-click Jump/Approve.
   - **Planned Todo Checklist**: Visual progress bar + Completed (`[x]`), In Progress (`[/]`), and Upcoming (`[ ]`) tasks.
   - **Work Completed So Far**: Timeline of recent tool calls, files edited, and commands executed.
4. **Process Controls (Start / Stop / Message)**:
   - **Stop Button**: Terminates running background task / Claude `PID` or cancels active turn.
   - **Start / Send Instruction Button**: Starts a new agent session (`window.sidecar.agent.startConversation` or `claude -p`) or sends a follow-up instruction to the selected agent.
   - **Jump to Chat Button**: Calls `window.sidecar.ui.toggleConversation(conversationId)` in Antigravity.
