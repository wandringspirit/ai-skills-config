---
name: multi-agent-mission-control
description: >-
  Architecture and implementation guide for building a 100% standalone Gemini Agent
  Mission Control Dashboard (http://localhost:4400 + Windows Desktop Shortcut) with a
  strict user approval gate deciding which agents appear on the panel, live status,
  pending approvals, elapsed runtime, planned todo checklists, work completed history,
  and 1-click Start/Stop controls.
---

# Gemini Agent Mission Control Operator (`multi-agent-mission-control`)

Use this skill whenever the user asks to monitor, orchestrate, inspect, approve, or control multiple autonomous Gemini agents (including browser-automation and background task agents) across multiple chats from a standalone control panel.

---

## 1. 100% Standalone Architecture (No Plugin/Sidecar Dependency, Gemini Only)

- **Location**: `$HOME\ai-skills-config\gemini\mission-control\` (`C:\Users\piyus\ai-skills-config\gemini\mission-control\`)
- **Zero Dependencies**: `main.mjs` uses only built-in Node.js modules (`node:fs`, `node:path`, `node:os`, `node:http`, `node:url`, `node:child_process`). Do NOT depend on `sidecar_sdk` or any IDE plugin/extension framework.
- **Port**: Serves the Mission Control web app at **`http://localhost:4400`**.
- **Desktop Shortcut (`Mission Control.lnk`)**: Created on `$([Environment]::GetFolderPath('Desktop'))\Mission Control.lnk` pointing to `start-mc.ps1`, which starts `main.mjs` hidden in the background and opens `http://localhost:4400` in the user's default browser.

---

## 2. Strict User Approval Gate for Panel Enrollment (`enrolledIds`)

- **Do NOT dump every historical chat onto the main panel**:
  - Maintain an explicit `enrolledIds` allowlist in `mission-control-state.json`.
  - **Only agents explicitly approved/enrolled by the user** appear on the main Mission Control board.
- **Two Ways to Approve an Agent onto the Panel**:
  1. **From the Dashboard (`✓ Approve / Add Chat to Panel` modal)**: Lists discovered Gemini chats (`candidates`) with their Chat ID, start time, title, and current activity, plus a **`✓ Approve to Panel`** button.
  2. **From Any New Chat (`enroll_agent` API)**: When the user assigns a browser or automation mission in a new chat and asks the agent to register on Mission Control, the agent sends:
     ```powershell
     Invoke-RestMethod -Uri "http://localhost:4400/api/control" -Method POST -ContentType "application/json" -Body (@{
       action = "enroll_agent"
       id = "<conversation-id>"
       title = "<Mission Title>"
       role = "<Agent Role>"
       jobDescription = "<Detailed Mission Summary>"
       todos = @("Step 1", "Step 2", "Step 3")
     } | ConvertTo-Json)
     ```
- **1-Click Removal**: Every enrolled agent has a **`✕ Remove from Panel`** button in the inspector header.

---

## 3. Real-Time Telemetry Per Approved Agent (`~/.gemini/antigravity/brain/<conversation-id>/`)

Every 3 seconds, read the head and tail of `.system_generated/logs/transcript.jsonl` and `task.md` / `implementation_plan.md` for each enrolled Gemini chat:
1. **Running Since & Elapsed Time**: Exact start date/time + live elapsed runtime + relative time since last action.
2. **Live Status Badge**:
   - `🟡 PENDING APPROVAL`: Triggered when the agent calls `ask_question`, pauses for human confirmation before an external browser/live action, or is manually flagged.
   - `🟢 RUNNING`: Actively executing browser actions, commands, or file edits (updated within the last 45s).
   - `⚪ IDLE / READY`: Waiting for next instruction.
   - `🛑 STOPPED`: Paused/stopped by the user from Mission Control.
3. **Click-to-Inspect Deep Dive**:
   - **⚠ Pending Approval Banner** with 1-click **`✓ Approve & Continue`**
   - **⚡ What's Happening Right Now** (`toolAction` / `toolSummary` + `thinking`)
   - **🎯 What Its Job Is** (Editable Title, Role, Mission Summary, Latest Prompt)
   - **📋 What's Planned** (Interactive Todo Checklist: `⬜ Pending` → `🔄 In Progress` → `✅ Completed`)
   - **✅ Work Completed Till Now** (Reverse-chronological timeline of browser actions, commands, file edits, and searches)
   - **▶ Start / ■ Stop Buttons** on every card and in the inspector header.
