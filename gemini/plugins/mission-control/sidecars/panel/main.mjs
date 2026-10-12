// Multi-Agent Mission Control Backend (Hybrid Antigravity Sidecar + Standalone http://localhost:4400)
// Zero external npm dependencies — runs on built-in Node.js modules + optional sidecar_sdk.

import {
  closeSync,
  existsSync,
  mkdirSync,
  openSync,
  readdirSync,
  readFileSync,
  readSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { createServer } from 'node:http';
import { homedir, platform, release } from 'node:os';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile, spawn } from 'node:child_process';

const HERE = dirname(fileURLToPath(import.meta.url));
const HOME = homedir();
const GEMINI_BRAIN_DIR = join(HOME, '.gemini', 'antigravity', 'brain');
const CLAUDE_SESSIONS_DIR = join(HOME, '.claude', 'sessions');
const CLAUDE_PROJECTS_DIR = join(HOME, '.claude', 'projects');

const DATA_DIR =
  process.env.ANTIGRAVITY_EXECUTABLE_DATA_DIR ||
  join(HOME, '.gemini', 'antigravity', 'mission-control-data');
const STATE_FILE = join(DATA_DIR, 'mission-control-state.json');
const STANDALONE_PORT = Number(process.env.MISSION_CONTROL_PORT || 4400);
const STARTED_AT = Date.now();

// ---------------------------------------------------------------------------
// Persistent State (Custom Roles, Planned Todos, Manual Start/Stop Overrides)
// ---------------------------------------------------------------------------

function loadState() {
  if (!existsSync(STATE_FILE)) {
    return { overrides: {}, customAgents: [] };
  }
  try {
    const raw = JSON.parse(readFileSync(STATE_FILE, 'utf8'));
    return {
      overrides: raw.overrides || {},
      customAgents: Array.isArray(raw.customAgents) ? raw.customAgents : [],
    };
  } catch {
    return { overrides: {}, customAgents: [] };
  }
}

function saveState(state) {
  mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf8');
}

function getOverride(state, id) {
  if (!state.overrides[id]) {
    state.overrides[id] = {};
  }
  return state.overrides[id];
}

// ---------------------------------------------------------------------------
// Fast File Head/Tail Reader for Large JSONL Transcripts
// ---------------------------------------------------------------------------

function readJsonlHeadAndTail(filePath, headBytes = 32768, tailBytes = 131072) {
  try {
    const st = statSync(filePath);
    const size = st.size;
    if (size === 0) return { headLines: [], tailLines: [], mtimeMs: st.mtimeMs, btimeMs: st.birthtimeMs || st.ctimeMs };

    const fd = openSync(filePath, 'r');
    try {
      if (size <= headBytes + tailBytes) {
        const buf = Buffer.alloc(size);
        readSync(fd, buf, 0, size, 0);
        const lines = buf
          .toString('utf8')
          .split(/\r?\n/)
          .filter((l) => l.trim().startsWith('{'));
        return { headLines: lines, tailLines: lines, mtimeMs: st.mtimeMs, btimeMs: st.birthtimeMs || st.ctimeMs };
      }

      const hBuf = Buffer.alloc(headBytes);
      readSync(fd, hBuf, 0, headBytes, 0);
      const hRaw = hBuf.toString('utf8').split(/\r?\n/);
      hRaw.pop(); // drop potentially truncated last line of head chunk

      const tBuf = Buffer.alloc(tailBytes);
      readSync(fd, tBuf, 0, tailBytes, size - tailBytes);
      const tRaw = tBuf.toString('utf8').split(/\r?\n/);
      tRaw.shift(); // drop potentially truncated first line of tail chunk

      return {
        headLines: hRaw.filter((l) => l.trim().startsWith('{')),
        tailLines: tRaw.filter((l) => l.trim().startsWith('{')),
        mtimeMs: st.mtimeMs,
        btimeMs: st.birthtimeMs || st.ctimeMs,
      };
    } finally {
      closeSync(fd);
    }
  } catch {
    return { headLines: [], tailLines: [], mtimeMs: 0, btimeMs: 0 };
  }
}

function safeJsonParse(line) {
  try {
    return JSON.parse(line);
  } catch {
    return null;
  }
}

function isPidAlive(pid) {
  if (!pid || typeof pid !== 'number') return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch (err) {
    return err && err.code === 'EPERM';
  }
}

function cleanUserPrompt(raw) {
  if (!raw || typeof raw !== 'string') return '';
  let text = raw;
  const reqMatch = text.match(/<USER_REQUEST>([\s\S]*?)<\/USER_REQUEST>/i);
  if (reqMatch) {
    text = reqMatch[1];
  } else {
    text = text.replace(/<CONTEXT_SUMMARY>[\s\S]*?<\/CONTEXT_SUMMARY>/gi, '');
    text = text.replace(/<ADDITIONAL_METADATA>[\s\S]*?<\/ADDITIONAL_METADATA>/gi, '');
  }
  return text.trim().replace(/\s+/g, ' ');
}

function parseMarkdownChecklist(mdContent) {
  const items = [];
  if (!mdContent) return items;
  const lines = mdContent.split(/\r?\n/);
  for (const line of lines) {
    const m = line.match(/^\s*[-*]\s*\[([ xX/])\]\s+(.+)$/);
    if (m) {
      const mark = m[1].toLowerCase();
      const status = mark === 'x' ? 'completed' : mark === '/' ? 'in_progress' : 'pending';
      items.push({
        id: `md-${items.length + 1}`,
        text: m[2].replace(/`/g, '').trim(),
        status,
        source: 'artifact',
      });
    }
  }
  return items;
}

// ---------------------------------------------------------------------------
// 1. Discover Gemini / Antigravity Sessions
// ---------------------------------------------------------------------------

function scanGeminiAgents(state) {
  if (!existsSync(GEMINI_BRAIN_DIR)) return [];
  let dirs = [];
  try {
    dirs = readdirSync(GEMINI_BRAIN_DIR, { withFileTypes: true })
      .filter((d) => d.isDirectory() && !d.name.startsWith('.'))
      .map((d) => {
        const fullPath = join(GEMINI_BRAIN_DIR, d.name);
        const transcriptPath = join(fullPath, '.system_generated', 'logs', 'transcript.jsonl');
        let mtimeMs = 0;
        try {
          mtimeMs = existsSync(transcriptPath)
            ? statSync(transcriptPath).mtimeMs
            : statSync(fullPath).mtimeMs;
        } catch {}
        return { name: d.name, fullPath, transcriptPath, mtimeMs };
      })
      .filter((d) => d.mtimeMs > 0)
      .sort((a, b) => b.mtimeMs - a.mtimeMs)
      .slice(0, 20);
  } catch {
    return [];
  }

  const agents = [];

  for (const dir of dirs) {
    const conversationId = dir.name;
    const agentId = `gemini:${conversationId}`;
    const override = state.overrides[agentId] || {};

    const { headLines, tailLines, mtimeMs, btimeMs } = readJsonlHeadAndTail(dir.transcriptPath);
    if (headLines.length === 0 && tailLines.length === 0) continue;

    const headSteps = headLines.map(safeJsonParse).filter(Boolean);
    const tailSteps = tailLines.map(safeJsonParse).filter(Boolean);

    // Dedup combined steps by step_index
    const stepMap = new Map();
    for (const s of [...headSteps, ...tailSteps]) {
      if (s && s.step_index !== undefined) stepMap.set(s.step_index, s);
    }
    const allSampledSteps = Array.from(stepMap.values()).sort((a, b) => a.step_index - b.step_index);

    let startedAtIso = headSteps[0]?.created_at || new Date(btimeMs || mtimeMs).toISOString();
    let updatedAtIso =
      tailSteps[tailSteps.length - 1]?.created_at || new Date(mtimeMs).toISOString();

    let initialPrompt = '';
    let latestPrompt = '';
    const userPrompts = [];
    let workspace = override.workspace || '';
    let currentAction = 'Waiting for instructions';
    let currentThinking = '';
    const activeSkills = new Set();
    const workDone = [];
    let pendingApproval = null;
    let lastPlannerStep = null;

    for (const step of allSampledSteps) {
      if (step.type === 'USER_INPUT' && step.content) {
        const cleaned = cleanUserPrompt(step.content);
        if (cleaned) {
          if (!initialPrompt) initialPrompt = cleaned;
          latestPrompt = cleaned;
          userPrompts.push({
            stepIndex: step.step_index,
            text: cleaned,
            timestamp: step.created_at,
          });
        }
      }

      if (step.type === 'PLANNER_RESPONSE') {
        lastPlannerStep = step;
        if (step.thinking) {
          currentThinking = step.thinking.trim().slice(0, 360);
        }
        if (typeof step.content === 'string') {
          const skillMatches = step.content.matchAll(/\*\*\[(?:Skill Active|New Skill Acquired[^:]*):\s*([^\]]+)\]\*\*/gi);
          for (const m of skillMatches) {
            m[1]
              .replace(/`/g, '')
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean)
              .forEach((s) => activeSkills.add(s));
          }
        }

        if (Array.isArray(step.tool_calls)) {
          for (const tc of step.tool_calls) {
            const args = tc.args || {};
            const summary = args.toolSummary || args.Description || tc.name;
            const action = args.toolAction || summary;
            currentAction = action;

            // Detect workspace from tool paths
            const candidatePath = args.Cwd || args.TargetFile || args.AbsolutePath || '';
            if (!workspace && typeof candidatePath === 'string') {
              const projMatch = candidatePath.match(/^([a-zA-Z]:[\\/]+Projects[\\/]+[^\\/]+)/i);
              if (projMatch) {
                workspace = projMatch[1].replace(/\//g, '\\');
              }
            }

            // Detect skill reads
            if (tc.name === 'view_file' && typeof args.AbsolutePath === 'string' && args.AbsolutePath.includes('SKILL.md')) {
              const parts = args.AbsolutePath.replace(/\\/g, '/').split('/');
              const idx = parts.indexOf('skills');
              if (idx !== -1 && parts[idx + 1]) {
                activeSkills.add(parts[idx + 1]);
              }
            }

            // Record work completed item
            let detail = '';
            if (tc.name === 'write_to_file' || tc.name === 'replace_file_content') {
              detail = args.TargetFile ? basename(args.TargetFile) : '';
            } else if (tc.name === 'run_command') {
              detail = args.CommandLine ? String(args.CommandLine).slice(0, 90) : '';
            } else if (tc.name === 'search_web') {
              detail = args.query ? `Query: "${args.query}"` : '';
            } else if (tc.name === 'view_file') {
              detail = args.AbsolutePath ? basename(args.AbsolutePath) : '';
            }

            workDone.push({
              stepIndex: step.step_index,
              tool: tc.name,
              action: String(action).replace(/^"|"$/g, ''),
              summary: String(summary).replace(/^"|"$/g, ''),
              detail: String(detail).replace(/^"|"$/g, ''),
              timestamp: step.created_at || updatedAtIso,
            });
          }
        }
      }
    }

    // Check if the very last step in transcript is waiting for user approval (e.g., ask_question)
    const lastStep = tailSteps[tailSteps.length - 1];
    if (lastStep && lastStep.type === 'PLANNER_RESPONSE' && Array.isArray(lastStep.tool_calls)) {
      const askCall = lastStep.tool_calls.find((t) => t.name === 'ask_question');
      if (askCall) {
        const qList = askCall.args?.questions;
        const qText =
          Array.isArray(qList) && qList[0]?.question
            ? qList[0].question
            : askCall.args?.toolSummary || 'Agent is waiting for your selection in the modal.';
        pendingApproval = {
          type: 'question',
          title: 'Waiting for Your Decision / Selection',
          description: qText,
          options: Array.isArray(qList) && qList[0]?.options ? qList[0].options : [],
          since: lastStep.created_at || updatedAtIso,
        };
      }
    }

    // Also check if the last assistant response explicitly asked for approval
    if (
      !pendingApproval &&
      lastStep &&
      lastStep.type === 'PLANNER_RESPONSE' &&
      !lastStep.tool_calls &&
      typeof lastStep.content === 'string' &&
      /(?:approve|approval|confirm|shall i proceed|would you like me to|let me know if you want)/i.test(lastStep.content)
    ) {
      pendingApproval = {
        type: 'confirmation',
        title: 'Agent Requested Confirmation / Next Step',
        description: lastStep.content.replace(/\*\*\[[^\]]+\]\*\*/g, '').trim().slice(-240),
        options: ['Approve & Proceed', 'Pause'],
        since: lastStep.created_at || updatedAtIso,
      };
    }

    // Check background tasks in .system_generated/tasks
    const tasksDir = join(dir.fullPath, '.system_generated', 'tasks');
    const bgTasks = [];
    if (existsSync(tasksDir)) {
      try {
        const logFiles = readdirSync(tasksDir).filter((f) => f.endsWith('.log'));
        for (const lf of logFiles) {
          const lfStat = statSync(join(tasksDir, lf));
          const isRecentTask = Date.now() - lfStat.mtimeMs < 10 * 60 * 1000;
          bgTasks.push({
            id: lf.replace('.log', ''),
            active: isRecentTask,
            updatedAt: new Date(lfStat.mtimeMs).toISOString(),
          });
        }
      } catch {}
    }

    // Read task.md or implementation_plan.md if present in brain dir
    let artifactTodos = [];
    for (const candidateMd of ['task.md', 'implementation_plan.md', 'plan.md']) {
      const p = join(dir.fullPath, candidateMd);
      if (existsSync(p)) {
        try {
          artifactTodos = parseMarkdownChecklist(readFileSync(p, 'utf8'));
          if (artifactTodos.length > 0) break;
        } catch {}
      }
    }

    // If no task.md exists, derive milestone items from recent user requests + current step
    if (artifactTodos.length === 0 && userPrompts.length > 0) {
      const recentPrompts = userPrompts.slice(-5);
      artifactTodos = recentPrompts.map((up, idx) => {
        const isLast = idx === recentPrompts.length - 1;
        const isRecentlyActive = Date.now() - mtimeMs < 60000;
        return {
          id: `prompt-${up.stepIndex}`,
          text: up.text.length > 110 ? `${up.text.slice(0, 110)}...` : up.text,
          status: isLast && isRecentlyActive ? 'in_progress' : 'completed',
          source: 'prompt',
        };
      });
    }

    // Merge user-custom planned todos stored in Mission Control
    const customTodos = Array.isArray(override.todos) ? override.todos : [];
    const combinedTodos = [...customTodos, ...artifactTodos];

    // Determine live status
    const ageMs = Date.now() - mtimeMs;
    const lastStepIsToolCallInFlight =
      lastStep &&
      lastStep.type === 'PLANNER_RESPONSE' &&
      Array.isArray(lastStep.tool_calls) &&
      lastStep.tool_calls.length > 0 &&
      !pendingApproval &&
      ageMs < 120000;

    let status = 'idle';
    if (override.status === 'stopped') {
      status = 'stopped';
    } else if (override.status === 'pending_approval' || pendingApproval) {
      status = 'pending_approval';
    } else if (override.status === 'running' || ageMs < 45000 || lastStepIsToolCallInFlight) {
      status = 'running';
    }

    const defaultTitle =
      initialPrompt.slice(0, 68) || `Gemini Session ${conversationId.slice(0, 8)}`;
    const defaultRole = workspace
      ? `${basename(workspace)} Engineering Agent`
      : 'Full-Stack & Skill-First Autonomous Agent';

    agents.push({
      id: agentId,
      rawId: conversationId,
      engine: 'gemini',
      engineLabel: 'Gemini / Antigravity',
      title: override.title || defaultTitle,
      role: override.role || defaultRole,
      jobDescription:
        override.jobDescription ||
        latestPrompt ||
        initialPrompt ||
        'Autonomous pair-programming and domain skill execution.',
      initialGoal: initialPrompt || 'Interactive coding session',
      latestPrompt: latestPrompt || initialPrompt,
      workspace: workspace || 'c:\\Projects\\ring-size',
      status,
      pendingApproval: override.status === 'stopped' ? null : pendingApproval,
      startedAt: startedAtIso,
      updatedAt: updatedAtIso,
      ageSeconds: Math.max(0, Math.round(ageMs / 1000)),
      currentAction:
        status === 'stopped'
          ? 'Stopped by user from Mission Control'
          : status === 'pending_approval'
            ? pendingApproval?.title || 'Waiting for user approval'
            : currentAction,
      currentThinking,
      activeSkills: Array.from(activeSkills),
      plannedTodos: combinedTodos,
      workDone: workDone.slice(-25).reverse(),
      totalSteps: lastStep?.step_index || allSampledSteps.length,
      bgTasks,
      pid: null,
    });
  }

  return agents;
}

// ---------------------------------------------------------------------------
// 2. Discover Claude Code / Desktop Sessions
// ---------------------------------------------------------------------------

function scanClaudeAgents(state) {
  const sessionById = new Map();

  // 1) Read live session files in ~/.claude/sessions/*.json
  if (existsSync(CLAUDE_SESSIONS_DIR)) {
    try {
      const files = readdirSync(CLAUDE_SESSIONS_DIR).filter((f) => f.endsWith('.json'));
      for (const file of files) {
        try {
          const data = JSON.parse(readFileSync(join(CLAUDE_SESSIONS_DIR, file), 'utf8'));
          if (data && data.sessionId) {
            sessionById.set(data.sessionId, {
              ...data,
              pidAlive: isPidAlive(data.pid),
            });
          }
        } catch {}
      }
    } catch {}
  }

  // 2) Scan project JSONL transcripts in ~/.claude/projects/<proj>/<sessionId>.jsonl
  const jsonlFiles = [];
  if (existsSync(CLAUDE_PROJECTS_DIR)) {
    try {
      const projDirs = readdirSync(CLAUDE_PROJECTS_DIR, { withFileTypes: true }).filter((d) =>
        d.isDirectory()
      );
      for (const pd of projDirs) {
        const pdPath = join(CLAUDE_PROJECTS_DIR, pd.name);
        const files = readdirSync(pdPath).filter((f) => f.endsWith('.jsonl'));
        for (const f of files) {
          const fp = join(pdPath, f);
          try {
            const st = statSync(fp);
            jsonlFiles.push({
              sessionId: f.replace('.jsonl', ''),
              projectDirName: pd.name,
              filePath: fp,
              mtimeMs: st.mtimeMs,
              btimeMs: st.birthtimeMs || st.ctimeMs,
            });
          } catch {}
        }
      }
    } catch {}
  }

  jsonlFiles.sort((a, b) => b.mtimeMs - a.mtimeMs);
  const topJsonl = jsonlFiles.slice(0, 15);
  const seenSessionIds = new Set();
  const agents = [];

  for (const item of topJsonl) {
    seenSessionIds.add(item.sessionId);
    const liveSession = sessionById.get(item.sessionId) || null;
    const agentId = `claude:${item.sessionId}`;
    const override = state.overrides[agentId] || {};

    const { headLines, tailLines, mtimeMs, btimeMs } = readJsonlHeadAndTail(item.filePath);
    const headObjs = headLines.map(safeJsonParse).filter(Boolean);
    const tailObjs = tailLines.map(safeJsonParse).filter(Boolean);
    const combined = [...headObjs, ...tailObjs];

    let cwd = liveSession?.cwd || override.workspace || '';
    let gitBranch = 'main';
    let initialPrompt = '';
    let latestPrompt = '';
    let startedAtMs = liveSession?.startedAt || btimeMs || mtimeMs;
    let updatedAtMs = liveSession?.updatedAt || mtimeMs;
    let totalCostUSD = 0;
    let claudeTodos = [];
    const workDone = [];
    let currentAction = 'Idle / Ready';
    let pendingApproval = null;

    for (const entry of combined) {
      if (entry.cwd && !cwd) cwd = entry.cwd;
      if (entry.gitBranch) gitBranch = entry.gitBranch;
      if (entry.timestamp) {
        const ts = Date.parse(entry.timestamp);
        if (!Number.isNaN(ts)) {
          if (!startedAtMs || ts < startedAtMs) startedAtMs = ts;
          if (ts > updatedAtMs) updatedAtMs = ts;
        }
      }
      if (entry.type === 'cost-state' && typeof entry.totalCostUSD === 'number') {
        totalCostUSD = entry.totalCostUSD;
      }

      if (entry.type === 'user' && entry.message?.content) {
        const content =
          typeof entry.message.content === 'string'
            ? entry.message.content
            : Array.isArray(entry.message.content)
              ? entry.message.content
                  .filter((b) => b.type === 'text')
                  .map((b) => b.text)
                  .join(' ')
              : '';
        const cleaned = content.trim();
        if (cleaned && !cleaned.startsWith('[Request interrupted')) {
          if (!initialPrompt) initialPrompt = cleaned;
          latestPrompt = cleaned;
        }
      }

      if (entry.type === 'assistant' && Array.isArray(entry.message?.content)) {
        for (const block of entry.message.content) {
          if (block.type === 'tool_use') {
            const toolName = block.name || 'Tool';
            const input = block.input || {};
            let detail = '';
            if (toolName === 'TodoWrite' && Array.isArray(input.todos)) {
              claudeTodos = input.todos.map((t, i) => ({
                id: t.id || `claude-todo-${i + 1}`,
                text: t.content || t.text || '',
                status: t.status || 'pending',
                source: 'claude',
              }));
              detail = `Updated ${claudeTodos.length} planned todo items`;
            } else if (toolName === 'Bash') {
              detail = input.command ? String(input.command).slice(0, 90) : '';
            } else if (toolName === 'Write' || toolName === 'Edit' || toolName === 'Read') {
              detail = input.file_path ? basename(input.file_path) : '';
            } else {
              detail = input.description || input.pattern || '';
            }

            currentAction = `${toolName}${detail ? `: ${detail}` : ''}`;
            workDone.push({
              stepIndex: workDone.length + 1,
              tool: toolName,
              action: toolName,
              summary: detail || toolName,
              detail,
              timestamp: entry.timestamp || new Date(updatedAtMs).toISOString(),
            });
          }
        }
      }
    }

    const pidAlive = Boolean(liveSession?.pidAlive);
    const ageMs = Date.now() - updatedAtMs;

    let status = 'idle';
    if (override.status === 'stopped') {
      status = 'stopped';
    } else if (override.status === 'pending_approval' || liveSession?.status === 'waiting') {
      status = 'pending_approval';
      pendingApproval = {
        type: 'permission',
        title: 'Claude Waiting for Tool Permission / Input',
        description: currentAction,
        options: ['Approve', 'Stop Agent'],
        since: new Date(updatedAtMs).toISOString(),
      };
    } else if (
      override.status === 'running' ||
      liveSession?.status === 'running' ||
      (pidAlive && ageMs < 45000)
    ) {
      status = 'running';
    }

    const customTodos = Array.isArray(override.todos) ? override.todos : [];
    const defaultTitle =
      liveSession?.name ||
      initialPrompt.slice(0, 68) ||
      `Claude Session ${item.sessionId.slice(0, 8)}`;

    agents.push({
      id: agentId,
      rawId: item.sessionId,
      engine: 'claude',
      engineLabel: liveSession?.entrypoint === 'claude-desktop' ? 'Claude Desktop' : 'Claude Code',
      title: override.title || defaultTitle,
      role:
        override.role ||
        (cwd ? `${basename(cwd)} Claude Specialist` : 'Claude Code Autonomous Agent'),
      jobDescription:
        override.jobDescription ||
        latestPrompt ||
        initialPrompt ||
        liveSession?.name ||
        'Claude autonomous coding & research session.',
      initialGoal: initialPrompt || liveSession?.name || 'Claude session',
      latestPrompt: latestPrompt || initialPrompt || liveSession?.name || '',
      workspace: cwd || item.projectDirName.replace(/--/g, '\\'),
      gitBranch,
      status,
      pendingApproval,
      startedAt: new Date(startedAtMs).toISOString(),
      updatedAt: new Date(updatedAtMs).toISOString(),
      ageSeconds: Math.max(0, Math.round(ageMs / 1000)),
      currentAction:
        status === 'stopped'
          ? 'Stopped by user from Mission Control'
          : pidAlive
            ? `${currentAction} (PID ${liveSession.pid} Live)`
            : currentAction,
      currentThinking: '',
      activeSkills: ['skill-first-operator'],
      plannedTodos: [...customTodos, ...claudeTodos],
      workDone: workDone.slice(-25).reverse(),
      totalSteps: workDone.length,
      costUSD: totalCostUSD ? `$${totalCostUSD.toFixed(2)}` : null,
      pid: pidAlive ? liveSession.pid : null,
    });
  }

  // Also include any live session in ~/.claude/sessions/*.json that didn't have a project jsonl yet
  for (const [sessionId, live] of sessionById.entries()) {
    if (seenSessionIds.has(sessionId)) continue;
    const agentId = `claude:${sessionId}`;
    const override = state.overrides[agentId] || {};
    agents.push({
      id: agentId,
      rawId: sessionId,
      engine: 'claude',
      engineLabel: 'Claude Desktop / CLI',
      title: override.title || live.name || `Claude Session ${sessionId.slice(0, 8)}`,
      role: override.role || `${basename(live.cwd || 'Workspace')} Claude Agent`,
      jobDescription: override.jobDescription || live.name || 'Interactive Claude session',
      initialGoal: live.name || 'Interactive Claude session',
      latestPrompt: live.name || '',
      workspace: live.cwd || HOME,
      status:
        override.status ||
        (live.status === 'running' ? 'running' : live.pidAlive ? 'idle' : 'stopped'),
      pendingApproval: null,
      startedAt: new Date(live.startedAt || Date.now()).toISOString(),
      updatedAt: new Date(live.updatedAt || Date.now()).toISOString(),
      ageSeconds: Math.max(0, Math.round((Date.now() - (live.updatedAt || Date.now())) / 1000)),
      currentAction: live.pidAlive ? `Connected (PID ${live.pid})` : 'Session idle',
      currentThinking: '',
      activeSkills: ['skill-first-operator'],
      plannedTodos: Array.isArray(override.todos) ? override.todos : [],
      workDone: [],
      totalSteps: 0,
      pid: live.pidAlive ? live.pid : null,
    });
  }

  return agents;
}

// ---------------------------------------------------------------------------
// 3. Combine & Rank All Fleet Agents
// ---------------------------------------------------------------------------

function getFleetSnapshot() {
  const state = loadState();
  const geminiAgents = scanGeminiAgents(state);
  const claudeAgents = scanClaudeAgents(state);
  const customAgents = (state.customAgents || []).map((ca) => {
    const override = state.overrides[ca.id] || {};
    const pidAlive = isPidAlive(ca.pid);
    return {
      ...ca,
      ...override,
      pid: pidAlive ? ca.pid : null,
      plannedTodos: override.todos || ca.plannedTodos || [],
      workDone: ca.workDone || [],
    };
  });

  const all = [...customAgents, ...geminiAgents, ...claudeAgents];

  // Sort: Pending Approval first, then Running, then by most recently updated
  const priority = { pending_approval: 0, running: 1, idle: 2, stopped: 3 };
  all.sort((a, b) => {
    const pa = priority[a.status] ?? 2;
    const pb = priority[b.status] ?? 2;
    if (pa !== pb) return pa - pb;
    return Date.parse(b.updatedAt || 0) - Date.parse(a.updatedAt || 0);
  });

  const summary = {
    total: all.length,
    running: all.filter((a) => a.status === 'running').length,
    pendingApproval: all.filter((a) => a.status === 'pending_approval').length,
    idle: all.filter((a) => a.status === 'idle').length,
    stopped: all.filter((a) => a.status === 'stopped').length,
    geminiCount: all.filter((a) => a.engine === 'gemini').length,
    claudeCount: all.filter((a) => a.engine === 'claude').length,
    serverUptimeSeconds: Math.round((Date.now() - STARTED_AT) / 1000),
    standaloneUrl: `http://localhost:${STANDALONE_PORT}`,
  };

  return { summary, agents: all };
}

// ---------------------------------------------------------------------------
// 4. Control Actions (Stop Process, Start/Resume, Approve, Edit Plan/Todos)
// ---------------------------------------------------------------------------

function killProcessByPid(pid) {
  return new Promise((resolve) => {
    if (!pid || !isPidAlive(pid)) {
      resolve({ killed: false, reason: 'Process not running' });
      return;
    }
    if (platform() === 'win32') {
      execFile('taskkill', ['/PID', String(pid), '/T', '/F'], (err) => {
        resolve({ killed: !err, pid });
      });
    } else {
      try {
        process.kill(pid, 'SIGTERM');
        resolve({ killed: true, pid });
      } catch (err) {
        resolve({ killed: false, error: err.message });
      }
    }
  });
}

async function handleControlAction(data) {
  const state = loadState();
  const { action, id, pid } = data || {};

  if (action === 'launch_agent') {
    const newId = `custom:${Date.now()}`;
    const engine = data.engine === 'claude' ? 'claude' : 'gemini';
    const workspace = data.workspace || 'c:\\Projects\\ring-size';
    const prompt = data.prompt || data.jobDescription || 'Execute assigned mission tasks';
    const todos = Array.isArray(data.todos)
      ? data.todos.map((t, i) => ({
          id: `todo-${Date.now()}-${i}`,
          text: String(t),
          status: i === 0 ? 'in_progress' : 'pending',
          source: 'custom',
        }))
      : [];

    let spawnedPid = null;
    if (engine === 'claude' && data.spawnProcess !== false) {
      try {
        const child = spawn('cmd.exe', ['/c', 'claude', '-p', prompt], {
          cwd: existsSync(workspace) ? workspace : HOME,
          detached: true,
          stdio: 'ignore',
        });
        child.unref();
        spawnedPid = child.pid || null;
      } catch {}
    }

    const newAgent = {
      id: newId,
      rawId: newId,
      engine,
      engineLabel: engine === 'claude' ? 'Claude Code' : 'Gemini / Antigravity',
      title: data.title || prompt.slice(0, 60),
      role: data.role || 'Autonomous Specialist Agent',
      jobDescription: prompt,
      initialGoal: prompt,
      latestPrompt: prompt,
      workspace,
      status: 'running',
      pendingApproval: null,
      startedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      currentAction: spawnedPid
        ? `Running autonomous mission (PID ${spawnedPid})`
        : 'Initialized & queued in Mission Control',
      currentThinking: '',
      activeSkills: ['skill-first-operator', 'multi-agent-mission-control'],
      plannedTodos: todos,
      workDone: [
        {
          stepIndex: 1,
          tool: 'mission_launch',
          action: 'Agent launched from Mission Control',
          summary: `Mission assigned: ${prompt.slice(0, 80)}`,
          detail: workspace,
          timestamp: new Date().toISOString(),
        },
      ],
      totalSteps: 1,
      pid: spawnedPid,
    };

    state.customAgents.unshift(newAgent);
    saveState(state);
    return { ok: true, message: `Launched ${newAgent.title}`, agent: newAgent };
  }

  if (!id) {
    return { ok: false, error: 'Missing agent id' };
  }

  const ov = getOverride(state, id);

  if (action === 'stop') {
    let killResult = { killed: false };
    if (pid) {
      killResult = await killProcessByPid(Number(pid));
    }
    ov.status = 'stopped';
    ov.stoppedAt = new Date().toISOString();
    saveState(state);
    return {
      ok: true,
      status: 'stopped',
      killedProcess: killResult.killed,
      message: killResult.killed
        ? `Stopped OS process PID ${pid} and paused agent.`
        : 'Agent marked as Stopped in Mission Control.',
    };
  }

  if (action === 'start' || action === 'resume') {
    ov.status = 'running';
    ov.resumedAt = new Date().toISOString();
    saveState(state);
    return {
      ok: true,
      status: 'running',
      message: 'Agent resumed and set to Running.',
    };
  }

  if (action === 'approve') {
    ov.status = 'running';
    ov.lastApprovedAt = new Date().toISOString();
    saveState(state);
    return {
      ok: true,
      status: 'running',
      message: 'Pending approval cleared and agent marked Running.',
    };
  }

  if (action === 'flag_approval') {
    ov.status = 'pending_approval';
    saveState(state);
    return {
      ok: true,
      status: 'pending_approval',
      message: 'Agent flagged as Pending Approval.',
    };
  }

  if (action === 'update_meta') {
    if (data.title !== undefined) ov.title = String(data.title).trim();
    if (data.role !== undefined) ov.role = String(data.role).trim();
    if (data.jobDescription !== undefined) ov.jobDescription = String(data.jobDescription).trim();
    if (data.workspace !== undefined) ov.workspace = String(data.workspace).trim();
    saveState(state);
    return { ok: true, message: 'Updated agent mission details.' };
  }

  if (action === 'add_todo') {
    if (!Array.isArray(ov.todos)) ov.todos = [];
    ov.todos.push({
      id: `custom-todo-${Date.now()}`,
      text: String(data.text || '').trim(),
      status: data.todoStatus || 'pending',
      source: 'custom',
    });
    saveState(state);
    return { ok: true, todos: ov.todos };
  }

  if (action === 'toggle_todo') {
    if (!Array.isArray(ov.todos)) ov.todos = [];
    const target = ov.todos.find((t) => t.id === data.todoId);
    if (target) {
      const nextMap = { pending: 'in_progress', in_progress: 'completed', completed: 'pending' };
      target.status = nextMap[target.status] || 'completed';
    } else if (data.todoText) {
      // Promote an auto-detected todo into custom override state
      ov.todos.push({
        id: data.todoId || `custom-todo-${Date.now()}`,
        text: data.todoText,
        status: data.nextStatus || 'completed',
        source: 'custom',
      });
    }
    saveState(state);
    return { ok: true, todos: ov.todos };
  }

  if (action === 'delete_todo') {
    if (Array.isArray(ov.todos)) {
      ov.todos = ov.todos.filter((t) => t.id !== data.todoId);
      saveState(state);
    }
    return { ok: true, todos: ov.todos || [] };
  }

  return { ok: false, error: `Unknown action: ${action}` };
}

// ---------------------------------------------------------------------------
// 5. Boot Both Antigravity SidecarApp (if inside AGY) AND Standalone HTTP Server
// ---------------------------------------------------------------------------

const readLocal = (name) => readFileSync(join(HERE, name), 'utf8');

function startStandaloneServer(port) {
  const server = createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-sidecar-token');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    const urlObj = new URL(req.url || '/', `http://localhost:${port}`);
    const pathname = urlObj.pathname;

    try {
      if (req.method === 'GET' && (pathname === '/' || pathname === '/index.html')) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(readLocal('index.html'));
        return;
      }
      if (req.method === 'GET' && pathname === '/app.js') {
        res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' });
        res.end(readLocal('app.js'));
        return;
      }
      if (req.method === 'GET' && pathname === '/preload.js') {
        // Fallback no-op preload when opened directly in Chrome/Edge at http://localhost:4400
        res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' });
        res.end('window.__STANDALONE_MISSION_CONTROL__ = true;');
        return;
      }
      if (req.method === 'GET' && pathname === '/styles.css') {
        res.writeHead(200, { 'Content-Type': 'text/css; charset=utf-8' });
        res.end(readLocal('styles.css'));
        return;
      }
      if (req.method === 'GET' && pathname === '/api/fleet') {
        const snapshot = getFleetSnapshot();
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(snapshot));
        return;
      }
      if (req.method === 'POST' && pathname === '/api/control') {
        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });
        req.on('end', async () => {
          const parsed = safeJsonParse(body) || {};
          const result = await handleControlAction(parsed);
          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify(result));
        });
        return;
      }

      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not found' }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Mission Control standalone server already active on port ${port}`);
    } else {
      console.error('Standalone server error:', err);
    }
  });

  server.listen(port, '127.0.0.1', () => {
    console.log(`Mission Control live at http://localhost:${port}`);
  });
}

async function boot() {
  // Always start the standalone localhost:4400 web server so browser tabs work anytime
  startStandaloneServer(STANDALONE_PORT);

  // If launched by Antigravity with sidecar_sdk available, also start SidecarApp for the Aux Pane
  try {
    const sdk = await import('sidecar_sdk');
    if (sdk && sdk.SidecarApp && process.env.ANTIGRAVITY_SIDECAR_WEB_PORT) {
      const { SidecarApp, Response } = sdk;
      const app = new SidecarApp();

      app.page('/', () => readLocal('index.html'));
      app.page('/app.js', () => readLocal('app.js'));
      app.api(
        '/styles.css',
        () => new Response(readLocal('styles.css'), { contentType: 'text/css' }),
        'GET'
      );
      app.api('/api/fleet', () => getFleetSnapshot(), 'GET');
      app.api('/api/control', async (data) => handleControlAction(data), 'POST');

      app.run();
      console.log(`Antigravity SidecarApp listening on ${process.env.ANTIGRAVITY_SIDECAR_WEB_PORT}`);
    }
  } catch {
    // Running standalone via `node main.mjs` outside Antigravity sidecar container
  }
}

boot();
