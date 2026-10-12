---
name: multi-agent-mission-control
description: >-
  Architecture and implementation guide for building a real-time Multi-Agent Mission
  Control Dashboard that monitors, inspects, starts, pauses, and stops multiple concurrent
  Claude Code and Gemini (Antigravity) agents across chats and workspaces.
---

# Multi-Agent Mission Control Operator — Claude Edition (`multi-agent-mission-control`)

Use this skill whenever the user asks to monitor, orchestrate, inspect, or control multiple AI agents (Claude Code / Desktop sessions and Gemini / Antigravity chats) from a unified dashboard.

## 1. Local Telemetry Sources
- **Claude Live Sessions**: `~/.claude/sessions/<pid>.json` (`pid`, `sessionId`, `cwd`, `startedAt`, `name`, `status`, `statusUpdatedAt`) and `~/.claude/projects/<encoded-cwd>/<sessionId>.jsonl` (recent actions and `TodoWrite` checklists).
- **Gemini / Antigravity Sessions**: `~/.gemini/antigravity/brain/<conversation-id>/.system_generated/logs/transcript.jsonl` and `task.md`.

## 2. Recommended Architecture
- Use a zero-dependency Node.js local dashboard server (`http://localhost:4400`) paired with an Antigravity Sidecar UI Extension so the user gets live filesystem polling, Pending Approval alerts, Planned Todo checklists, Work Completed logs, and working **Start / Stop (`PID`) / Resume** controls in both their browser and IDE side pane.
