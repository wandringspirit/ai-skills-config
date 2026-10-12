// Standalone Gemini Agent Mission Control Server (http://localhost:4400)
// - 100% standalone Node.js HTTP server (zero plugin/sidecar dependency)
// - Tracks ONLY Gemini agents (~/.gemini/antigravity/brain/<conversation-id>/)
// - Strict User Approval Gate: ONLY agents in `enrolledIds` (or custom registered tasks) appear on the main board

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
import { homedir, platform } from 'node:os';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';

const HERE = dirname(fileURLToPath(import.meta.url));
const HOME = homedir();
const GEMINI_BRAIN_DIR = join(HOME, '.gemini', 'antigravity', 'brain');
const DATA_DIR = join(HOME, '.gemini', 'antigravity', 'mission-control-data');
const STATE_FILE = join(DATA_DIR, 'mission-control-state.json');
const PORT = Number(process.env.MISSION_CONTROL_PORT || 4400);
const STARTED_AT = Date.now();

// ---------------------------------------------------------------------------
// Persistent State (Enrolled/Approved Agent IDs, Custom Roles, Todos, Status)
// ---------------------------------------------------------------------------

function loadState() {
  if (!existsSync(STATE_FILE)) {
    return { enrolledIds: [], overrides: {}, customAgents: [] };
  }
  try {
    const raw = JSON.parse(readFileSync(STATE_FILE, 'utf8'));
    return {
      enrolledIds: Array.isArray(raw.enrolledIds) ? raw.enrolledIds : [],
      overrides: raw.overrides || {},
      customAgents: Array.isArray(raw.customAgents) ? raw.customAgents : [],
    };
  } catch {
    return { enrolledIds: [], overrides: {}, customAgents: [] };
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
// Fast JSONL Head/Tail Reader
// ---------------------------------------------------------------------------

function readJsonlHeadAndTail(filePath, headBytes = 32768, tailBytes = 131072) {
  try {
    const st = statSync(filePath);
    const size = st.size;
    if (size === 0) {
      return {
        headLines: [],
        tailLines: [],
        mtimeMs: st.mtimeMs,
        btimeMs: st.birthtimeMs || st.ctimeMs,
      };
    }

    const fd = openSync(filePath, 'r');
    try {
      if (size <= headBytes + tailBytes) {
        const buf = Buffer.alloc(size);
        readSync(fd, buf, 0, size, 0);
        const lines = buf
          .toString('utf8')
          .split(/\r?\n/)
          .filter((l) => l.trim().startsWith('{'));
        return {
          headLines: lines,
          tailLines: lines,
          mtimeMs: st.mtimeMs,
          btimeMs: st.birthtimeMs || st.ctimeMs,
        };
      }

      const hBuf = Buffer.alloc(headBytes);
      readSync(fd, hBuf, 0, headBytes, 0);
      const hRaw = hBuf.toString('utf8').split(/\r?\n/);
      hRaw.pop();

      const tBuf = Buffer.alloc(tailBytes);
      readSync(fd, tBuf, 0, tailBytes, size - tailBytes);
      const tRaw = tBuf.toString('utf8').split(/\r?\n/);
      tRaw.shift();

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
// Scan Gemini Sessions & Separate Approved (`enrolledIds`) vs Candidates
// ---------------------------------------------------------------------------

function scanGeminiSessions(state) {
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
      .slice(0, 25);
  } catch {
    return [];
  }

  const enrolledSet = new Set(state.enrolledIds || []);
  const sessions = [];

  for (const dir of dirs) {
    const conversationId = dir.name;
    const agentId = `gemini:${conversationId}`;
    const isEnrolled = enrolledSet.has(agentId) || enrolledSet.has(conversationId);
    const override = state.overrides[agentId] || {};

    const { headLines, tailLines, mtimeMs, btimeMs } = readJsonlHeadAndTail(dir.transcriptPath);
    if (headLines.length === 0 && tailLines.length === 0) continue;

    const headSteps = headLines.map(safeJsonParse).filter(Boolean);
    const tailSteps = tailLines.map(safeJsonParse).filter(Boolean);

    const stepMap = new Map();
    for (const s of [...headSteps, ...tailSteps]) {
      if (s && s.step_index !== undefined) stepMap.set(s.step_index, s);
    }
    const allSampledSteps = Array.from(stepMap.values()).sort(
      (a, b) => a.step_index - b.step_index
    );

    const startedAtIso = headSteps[0]?.created_at || new Date(btimeMs || mtimeMs).toISOString();
    const updatedAtIso =
      tailSteps[tailSteps.length - 1]?.created_at || new Date(mtimeMs).toISOString();

    let initialPrompt = '';
    let latestPrompt = '';
    let bestSubstantivePrompt = '';
    const userPrompts = [];
    let workspace = override.workspace || '';
    let currentAction = 'Waiting for instructions';
    let currentThinking = '';
    const activeSkills = new Set();
    const workDone = [];
    let pendingApproval = null;

    for (const step of allSampledSteps) {
      if (step.type === 'USER_INPUT' && step.content) {
        const cleaned = cleanUserPrompt(step.content);
        if (cleaned) {
          if (!initialPrompt) initialPrompt = cleaned;
          latestPrompt = cleaned;
          if (cleaned.length >= 25 && !bestSubstantivePrompt) {
            bestSubstantivePrompt = cleaned;
          }
          userPrompts.push({
            stepIndex: step.step_index,
            text: cleaned,
            timestamp: step.created_at,
          });
        }
      }

      if (step.type === 'PLANNER_RESPONSE') {
        if (step.thinking) {
          currentThinking = step.thinking.trim().slice(0, 380);
        }
        if (typeof step.content === 'string') {
          const skillMatches = step.content.matchAll(
            /\*\*\[(?:Skill Active|New Skill Acquired[^:]*):\s*([^\]]+)\]\*\*/gi
          );
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
            currentAction = String(action).replace(/^"|"$/g, '');

            const candidatePath = args.Cwd || args.TargetFile || args.AbsolutePath || '';
            if (!workspace && typeof candidatePath === 'string') {
              const projMatch = candidatePath.match(/^([a-zA-Z]:[\\/]+Projects[\\/]+[^\\/"]+)/i);
              if (projMatch) {
                workspace = projMatch[1].replace(/\//g, '\\');
              }
            }

            if (
              tc.name === 'view_file' &&
              typeof args.AbsolutePath === 'string' &&
              args.AbsolutePath.includes('SKILL.md')
            ) {
              const parts = args.AbsolutePath.replace(/\\/g, '/').split('/');
              const idx = parts.indexOf('skills');
              if (idx !== -1 && parts[idx + 1]) {
                activeSkills.add(parts[idx + 1]);
              }
            }

            let detail = '';
            if (tc.name === 'write_to_file' || tc.name === 'replace_file_content') {
              detail = args.TargetFile ? basename(String(args.TargetFile).replace(/^"|"$/g, '')) : '';
            } else if (tc.name === 'run_command') {
              detail = args.CommandLine ? String(args.CommandLine).replace(/^"|"$/g, '').slice(0, 100) : '';
            } else if (tc.name === 'search_web' || tc.name === 'read_url_content') {
              detail = args.query || args.Url || '';
            } else if (tc.name === 'view_file') {
              detail = args.AbsolutePath ? basename(String(args.AbsolutePath).replace(/^"|"$/g, '')) : '';
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

    const lastStep = tailSteps[tailSteps.length - 1];
    if (lastStep && lastStep.type === 'PLANNER_RESPONSE' && Array.isArray(lastStep.tool_calls)) {
      const askCall = lastStep.tool_calls.find((t) => t.name === 'ask_question');
      if (askCall) {
        const qList = askCall.args?.questions;
        const qText =
          Array.isArray(qList) && qList[0]?.question
            ? qList[0].question
            : askCall.args?.toolSummary || 'Agent is waiting for your selection.';
        pendingApproval = {
          type: 'question',
          title: 'Waiting for Your Decision / Approval',
          description: qText,
          options: Array.isArray(qList) && qList[0]?.options ? qList[0].options : [],
          since: lastStep.created_at || updatedAtIso,
        };
      }
    }

    if (
      !pendingApproval &&
      lastStep &&
      lastStep.type === 'PLANNER_RESPONSE' &&
      !lastStep.tool_calls &&
      typeof lastStep.content === 'string' &&
      /(?:approve|approval|confirm|shall i proceed|would you like me to|explicit user approval)/i.test(
        lastStep.content
      )
    ) {
      pendingApproval = {
        type: 'confirmation',
        title: 'Agent Requested Your Approval',
        description: lastStep.content.replace(/\*\*\[[^\]]+\]\*\*/g, '').trim().slice(-240),
        options: ['Approve & Proceed', 'Pause Agent'],
        since: lastStep.created_at || updatedAtIso,
      };
    }

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

    const customTodos = Array.isArray(override.todos) ? override.todos : [];
    const combinedTodos = [...customTodos, ...artifactTodos];

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

    const smartTitleSource = bestSubstantivePrompt || latestPrompt || initialPrompt;
    const defaultTitle =
      smartTitleSource.slice(0, 72) || `Gemini Agent ${conversationId.slice(0, 8)}`;
    const defaultRole = workspace
      ? `${basename(workspace)} Autonomous Agent`
      : 'Browser & Task Automation Agent';

    sessions.push({
      id: agentId,
      rawId: conversationId,
      enrolled: isEnrolled,
      engine: 'gemini',
      engineLabel: 'Gemini Agent',
      title: override.title || defaultTitle,
      role: override.role || defaultRole,
      jobDescription:
        override.jobDescription ||
        latestPrompt ||
        initialPrompt ||
        'Autonomous browser & task execution agent.',
      initialGoal: initialPrompt || 'Interactive Gemini session',
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
            ? pendingApproval?.title || 'Waiting for your approval'
            : currentAction,
      currentThinking,
      activeSkills: Array.from(activeSkills),
      plannedTodos: combinedTodos,
      workDone: workDone.slice(-25).reverse(),
      totalSteps: lastStep?.step_index || allSampledSteps.length,
      pid: override.pid || null,
    });
  }

  return sessions;
}

// ---------------------------------------------------------------------------
// Fleet Snapshot (Strict User Approval Gate — No Unapproved Auto-Enrollment)
// ---------------------------------------------------------------------------

function getFleetSnapshot() {
  const state = loadState();
  const allGemini = scanGeminiSessions(state);

  const customAgents = (state.customAgents || []).map((ca) => {
    const override = state.overrides[ca.id] || {};
    return {
      ...ca,
      ...override,
      enrolled: true,
      plannedTodos: override.todos || ca.plannedTodos || [],
      workDone: ca.workDone || [],
    };
  });

  const enrolledAgents = [
    ...customAgents,
    ...allGemini.filter((a) => a.enrolled),
  ];

  const candidateAgents = allGemini.filter((a) => !a.enrolled);

  const priority = { pending_approval: 0, running: 1, idle: 2, stopped: 3 };
  enrolledAgents.sort((a, b) => {
    const pa = priority[a.status] ?? 2;
    const pb = priority[b.status] ?? 2;
    if (pa !== pb) return pa - pb;
    return Date.parse(b.updatedAt || 0) - Date.parse(a.updatedAt || 0);
  });

  const summary = {
    total: enrolledAgents.length,
    running: enrolledAgents.filter((a) => a.status === 'running').length,
    pendingApproval: enrolledAgents.filter((a) => a.status === 'pending_approval').length,
    idle: enrolledAgents.filter((a) => a.status === 'idle').length,
    stopped: enrolledAgents.filter((a) => a.status === 'stopped').length,
    candidateCount: candidateAgents.length,
    serverUptimeSeconds: Math.round((Date.now() - STARTED_AT) / 1000),
    standaloneUrl: `http://localhost:${PORT}`,
  };

  return { summary, agents: enrolledAgents, candidates: candidateAgents };
}

// ---------------------------------------------------------------------------
// Control Actions (Enroll/Approve to Panel, Remove, Start, Stop, Todos)
// ---------------------------------------------------------------------------

function killProcessByPid(pid) {
  return new Promise((resolve) => {
    if (!pid) {
      resolve({ killed: false });
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
      } catch {
        resolve({ killed: false });
      }
    }
  });
}

async function handleControlAction(data) {
  const state = loadState();
  const { action, id, pid } = data || {};

  if (action === 'enroll_agent') {
    if (!id) return { ok: false, error: 'Missing id' };
    const targetId = id.startsWith('gemini:') || id.startsWith('custom:') ? id : `gemini:${id}`;
    if (!state.enrolledIds.includes(targetId)) {
      state.enrolledIds.push(targetId);
    }
    const ov = getOverride(state, targetId);
    if (data.title) ov.title = String(data.title).trim();
    if (data.role) ov.role = String(data.role).trim();
    if (data.jobDescription) ov.jobDescription = String(data.jobDescription).trim();
    if (data.workspace) ov.workspace = String(data.workspace).trim();
    if (Array.isArray(data.todos) && data.todos.length > 0) {
      ov.todos = data.todos.map((t, i) => ({
        id: `todo-${Date.now()}-${i}`,
        text: typeof t === 'string' ? t : t.text || '',
        status: typeof t === 'object' && t.status ? t.status : i === 0 ? 'in_progress' : 'pending',
        source: 'custom',
      }));
    }
    saveState(state);
    return { ok: true, message: 'Agent approved and added to Mission Control panel.' };
  }

  if (action === 'unenroll_agent') {
    state.enrolledIds = (state.enrolledIds || []).filter(
      (eid) => eid !== id && `gemini:${eid}` !== id
    );
    state.customAgents = (state.customAgents || []).filter((ca) => ca.id !== id);
    saveState(state);
    return { ok: true, message: 'Agent removed from Mission Control panel.' };
  }

  if (action === 'launch_agent') {
    const newId = `custom:${Date.now()}`;
    const workspace = data.workspace || 'c:\\Projects\\ring-size';
    const prompt =
      data.prompt || data.jobDescription || 'Execute assigned browser & automation tasks';
    const todos = Array.isArray(data.todos)
      ? data.todos.map((t, i) => ({
          id: `todo-${Date.now()}-${i}`,
          text: String(t),
          status: i === 0 ? 'in_progress' : 'pending',
          source: 'custom',
        }))
      : [];

    const newAgent = {
      id: newId,
      rawId: newId,
      enrolled: true,
      engine: 'gemini',
      engineLabel: 'Gemini Agent',
      title: data.title || prompt.slice(0, 60),
      role: data.role || 'Browser & Task Automation Agent',
      jobDescription: prompt,
      initialGoal: prompt,
      latestPrompt: prompt,
      workspace,
      status: 'running',
      pendingApproval: null,
      startedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      currentAction: 'Approved & active on Mission Control panel',
      currentThinking: '',
      activeSkills: ['skill-first-operator', 'multi-agent-mission-control'],
      plannedTodos: todos,
      workDone: [
        {
          stepIndex: 1,
          tool: 'mission_enroll',
          action: 'Approved onto Mission Control panel',
          summary: `Mission assigned: ${prompt.slice(0, 80)}`,
          detail: workspace,
          timestamp: new Date().toISOString(),
        },
      ],
      totalSteps: 1,
      pid: null,
    };

    state.customAgents.unshift(newAgent);
    saveState(state);
    return { ok: true, message: `Approved & added "${newAgent.title}" to panel`, agent: newAgent };
  }

  if (!id) {
    return { ok: false, error: 'Missing agent id' };
  }

  const ov = getOverride(state, id);

  if (action === 'stop') {
    if (pid) await killProcessByPid(Number(pid));
    ov.status = 'stopped';
    ov.stoppedAt = new Date().toISOString();
    saveState(state);
    return { ok: true, status: 'stopped', message: 'Agent stopped.' };
  }

  if (action === 'start' || action === 'resume') {
    ov.status = 'running';
    ov.resumedAt = new Date().toISOString();
    saveState(state);
    return { ok: true, status: 'running', message: 'Agent started / resumed.' };
  }

  if (action === 'approve') {
    ov.status = 'running';
    ov.lastApprovedAt = new Date().toISOString();
    saveState(state);
    return {
      ok: true,
      status: 'running',
      message: 'Pending approval granted — agent set to Running.',
    };
  }

  if (action === 'flag_approval') {
    ov.status = 'pending_approval';
    saveState(state);
    return { ok: true, status: 'pending_approval', message: 'Agent flagged as Pending Approval.' };
  }

  if (action === 'update_meta') {
    if (data.title !== undefined) ov.title = String(data.title).trim();
    if (data.role !== undefined) ov.role = String(data.role).trim();
    if (data.jobDescription !== undefined) ov.jobDescription = String(data.jobDescription).trim();
    if (data.workspace !== undefined) ov.workspace = String(data.workspace).trim();
    saveState(state);
    return { ok: true, message: 'Updated agent details.' };
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
// Standalone HTTP Server (http://localhost:4400)
// ---------------------------------------------------------------------------

const readLocal = (name) => readFileSync(join(HERE, name), 'utf8');

const server = createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const urlObj = new URL(req.url || '/', `http://localhost:${PORT}`);
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
    console.log(`Mission Control server already running on http://localhost:${PORT}`);
    process.exit(0);
  }
  console.error('Server error:', err);
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Gemini Mission Control live at http://localhost:${PORT}`);
});
