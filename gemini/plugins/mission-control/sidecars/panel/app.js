// Standalone Frontend Controller for Gemini Agent Mission Control
// Only displays agents explicitly approved/enrolled by the user.

const $ = (id) => document.getElementById(id);

let fleetData = { summary: {}, agents: [], candidates: [] };
let selectedAgentId = null;
let activeFilter = 'all';
let searchQuery = '';
let toastTimer = null;

async function callApi(path, { method = 'GET', body } = {}) {
  const res = await fetch(path, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `${res.status} ${res.statusText}`);
  }
  return data;
}

function toast(msg, isError = false) {
  const el = $('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.toggle('error', isError);
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    el.hidden = true;
  }, 3200);
}

function formatDurationSince(isoStr) {
  if (!isoStr) return '—';
  const startMs = Date.parse(isoStr);
  if (Number.isNaN(startMs)) return '—';
  const diffSec = Math.max(0, Math.floor((Date.now() - startMs) / 1000));
  if (diffSec < 60) return `${diffSec}s`;
  const mins = Math.floor(diffSec / 60);
  if (mins < 60) return `${mins}m ${diffSec % 60}s`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ${mins % 60}m`;
  const days = Math.floor(hours / 24);
  return `${days}d ${hours % 24}h`;
}

function formatRelativeAgo(isoStr) {
  if (!isoStr) return '—';
  const ms = Date.parse(isoStr);
  if (Number.isNaN(ms)) return '—';
  const sec = Math.max(0, Math.floor((Date.now() - ms) / 1000));
  if (sec < 5) return 'just now';
  if (sec < 60) return `${sec}s ago`;
  const mins = Math.floor(sec / 60);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ${mins % 60}m ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function formatDateTime(isoStr) {
  if (!isoStr) return '—';
  const d = new Date(isoStr);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleString([], {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function statusLabel(status) {
  switch (status) {
    case 'running':
      return '🟢 RUNNING';
    case 'pending_approval':
      return '🟡 PENDING APPROVAL';
    case 'stopped':
      return '🛑 STOPPED';
    default:
      return '⚪ IDLE / READY';
  }
}

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getFilteredAgents() {
  return (fleetData.agents || []).filter((a) => {
    if (activeFilter === 'running' && a.status !== 'running') return false;
    if (activeFilter === 'pending_approval' && a.status !== 'pending_approval') return false;
    if (activeFilter === 'stopped' && a.status !== 'stopped') return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const hay = [
        a.title,
        a.role,
        a.workspace,
        a.currentAction,
        a.jobDescription,
        ...(a.activeSkills || []),
      ]
        .join(' ')
        .toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

function renderSummaryBar() {
  const s = fleetData.summary || {};
  $('stat-total').textContent = s.total ?? 0;
  $('stat-running').textContent = s.running ?? 0;
  $('stat-approval').textContent = s.pendingApproval ?? 0;
  $('candidate-count').textContent = s.candidateCount ?? 0;

  const approvalChip = $('stat-approval-chip');
  if (approvalChip) {
    approvalChip.classList.toggle('has-alerts', (s.pendingApproval || 0) > 0);
  }
}

function renderAgentList() {
  const container = $('agent-list');
  const filtered = getFilteredAgents();

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p style="margin-bottom:8px;">No approved agents match this view.</p>
        <button class="btn primary" onclick="document.getElementById('btn-enroll-drawer').click()">
          ✓ Approve a Chat to Panel
        </button>
      </div>`;
    return;
  }

  if (!selectedAgentId || !fleetData.agents.some((a) => a.id === selectedAgentId)) {
    selectedAgentId = filtered[0].id;
  }

  container.innerHTML = filtered
    .map((agent) => {
      const isSelected = agent.id === selectedAgentId;
      const todos = agent.plannedTodos || [];
      const doneCount = todos.filter((t) => t.status === 'completed').length;
      const isRunning = agent.status === 'running';

      return `
        <div class="agent-card ${isSelected ? 'selected' : ''} status-${escapeHtml(agent.status)}" data-agent-id="${escapeHtml(agent.id)}">
          <div class="agent-card-top">
            <span class="engine-badge gemini">GEMINI • ${escapeHtml(agent.rawId.slice(0, 8))}</span>
            <span class="status-badge ${escapeHtml(agent.status)}">${statusLabel(agent.status)}</span>
          </div>

          <div class="agent-card-title" title="${escapeHtml(agent.title)}">${escapeHtml(agent.title)}</div>
          <div class="agent-card-role">${escapeHtml(agent.role)} • <span class="mono">${escapeHtml(agent.workspace.split(/[\\/]/).pop() || agent.workspace)}</span></div>

          <div class="agent-card-action" title="${escapeHtml(agent.currentAction)}">
            ⚡ ${escapeHtml(agent.currentAction)}
          </div>

          <div class="agent-card-footer">
            <div>
              <div title="Started ${escapeHtml(formatDateTime(agent.startedAt))}">
                ⏱ Since ${escapeHtml(formatDateTime(agent.startedAt))} (${escapeHtml(formatDurationSince(agent.startedAt))})
              </div>
              <div>
                📋 ${doneCount}/${todos.length} todo • Active ${escapeHtml(formatRelativeAgo(agent.updatedAt))}
              </div>
            </div>

            <div class="card-quick-actions">
              ${
                isRunning
                  ? `<button class="btn-mini stop" data-quick-action="stop" data-agent-id="${escapeHtml(agent.id)}">■ Stop</button>`
                  : `<button class="btn-mini start" data-quick-action="start" data-agent-id="${escapeHtml(agent.id)}">▶ Start</button>`
              }
            </div>
          </div>
        </div>
      `;
    })
    .join('');

  container.querySelectorAll('.agent-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('[data-quick-action]')) return;
      selectedAgentId = card.dataset.agentId;
      renderAgentList();
      renderInspector();
    });
  });

  container.querySelectorAll('[data-quick-action]').forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      await triggerControl(btn.dataset.quickAction, { id: btn.dataset.agentId });
    });
  });
}

function renderCandidateModalList() {
  const container = $('candidate-list');
  const candidates = fleetData.candidates || [];
  if (candidates.length === 0) {
    container.innerHTML = `<div class="empty-state">All discovered Gemini chats are already approved on your panel!</div>`;
    return;
  }

  container.innerHTML = candidates
    .map(
      (c) => `
      <div class="work-item" style="display:flex;flex-direction:row;align-items:center;justify-content:space-between;gap:12px;">
        <div style="min-width:0;flex:1;">
          <div class="work-item-top" style="margin-bottom:4px;">
            <span class="work-tool-badge">Chat ${escapeHtml(c.rawId.slice(0, 8))}</span>
            <span class="work-time">Started ${escapeHtml(formatDateTime(c.startedAt))} • Active ${escapeHtml(formatRelativeAgo(c.updatedAt))}</span>
          </div>
          <div class="work-summary" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(c.title)}</div>
          <div class="work-detail">⚡ ${escapeHtml(c.currentAction)}</div>
        </div>
        <button class="btn primary" data-enroll-id="${escapeHtml(c.id)}">✓ Approve to Panel</button>
      </div>
    `
    )
    .join('');

  container.querySelectorAll('[data-enroll-id]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.enrollId;
      selectedAgentId = id;
      await triggerControl('enroll_agent', { id });
      renderCandidateModalList();
    });
  });
}

function renderInspector() {
  const agent = (fleetData.agents || []).find((a) => a.id === selectedAgentId);
  if (!agent) {
    $('inspector-empty').hidden = false;
    $('inspector-content').hidden = true;
    return;
  }

  $('inspector-empty').hidden = true;
  $('inspector-content').hidden = false;

  const stBadge = $('insp-status-badge');
  stBadge.textContent = statusLabel(agent.status);
  stBadge.className = `status-badge ${agent.status}`;

  $('btn-insp-approve').hidden = agent.status !== 'pending_approval';

  $('insp-title').textContent = agent.title;
  $('insp-role').textContent = agent.role;

  $('insp-started-at').textContent = formatDateTime(agent.startedAt);
  $('insp-elapsed').textContent = `Running for ${formatDurationSince(agent.startedAt)}`;
  $('insp-updated-at').textContent = `${formatRelativeAgo(agent.updatedAt)} (${formatDateTime(agent.updatedAt)})`;
  $('insp-steps').textContent = `${agent.totalSteps || 0} steps / tool actions logged`;
  $('insp-workspace').textContent = agent.workspace || '—';
  $('insp-session-id').textContent = `Chat ID: ${agent.rawId}`;

  const skillsWrap = $('insp-skills');
  if (Array.isArray(agent.activeSkills) && agent.activeSkills.length > 0) {
    skillsWrap.innerHTML = agent.activeSkills
      .map((s) => `<span class="skill-tag">${escapeHtml(s)}</span>`)
      .join('');
  } else {
    skillsWrap.innerHTML = `<span class="skill-tag">skill-first-operator</span>`;
  }

  // Pending Approval Banner
  const approvalBanner = $('approval-banner');
  if (agent.status === 'pending_approval') {
    approvalBanner.hidden = false;
    const pa = agent.pendingApproval || {
      title: 'Waiting for Your Approval',
      description: 'This agent is paused waiting for your confirmation.',
      options: [],
    };
    $('approval-title').textContent = pa.title;
    $('approval-desc').textContent = pa.description;
    const optsContainer = $('approval-options');
    if (Array.isArray(pa.options) && pa.options.length > 0) {
      optsContainer.innerHTML = pa.options
        .map(
          (opt) =>
            `<button class="btn ghost approval-opt-btn" data-opt="${escapeHtml(opt)}">${escapeHtml(opt)}</button>`
        )
        .join('');
      optsContainer.querySelectorAll('.approval-opt-btn').forEach((b) => {
        b.addEventListener('click', () => triggerControl('approve', { id: agent.id }));
      });
    } else {
      optsContainer.innerHTML = '';
    }
  } else {
    approvalBanner.hidden = true;
  }

  $('insp-current-action').textContent = agent.currentAction || 'Idle';
  $('insp-thinking').textContent =
    agent.currentThinking ||
    (agent.status === 'running'
      ? 'Executing browser/tool steps and streaming telemetry...'
      : 'Agent is idle or waiting for your next instruction.');

  $('insp-job-desc').textContent = agent.jobDescription || agent.initialGoal || '—';
  $('insp-latest-prompt').textContent = agent.latestPrompt || agent.initialGoal || '—';

  // Planned Todo Checklist
  const todos = agent.plannedTodos || [];
  const doneCount = todos.filter((t) => t.status === 'completed').length;
  const pct = todos.length > 0 ? Math.round((doneCount / todos.length) * 100) : 0;
  $('todo-progress-pill').textContent = `${doneCount} / ${todos.length} Done (${pct}%)`;
  $('todo-progress-fill').style.width = `${pct}%`;

  const todoList = $('todo-list');
  if (todos.length === 0) {
    todoList.innerHTML = `<li class="empty-state">No planned tasks yet. Add a task above to track this agent's roadmap.</li>`;
  } else {
    todoList.innerHTML = todos
      .map((t) => {
        const icon =
          t.status === 'completed' ? '✅' : t.status === 'in_progress' ? '🔄' : '⬜';
        return `
          <li class="todo-item ${escapeHtml(t.status)}" data-todo-id="${escapeHtml(t.id)}" data-todo-text="${escapeHtml(t.text)}" data-todo-status="${escapeHtml(t.status)}">
            <div class="todo-left">
              <span class="todo-icon">${icon}</span>
              <span class="todo-text">${escapeHtml(t.text)}</span>
            </div>
            ${
              t.source === 'custom'
                ? `<button class="todo-delete" data-del-todo="${escapeHtml(t.id)}" title="Remove task">✕</button>`
                : ''
            }
          </li>
        `;
      })
      .join('');

    todoList.querySelectorAll('.todo-item').forEach((li) => {
      li.addEventListener('click', async (e) => {
        const delBtn = e.target.closest('[data-del-todo]');
        if (delBtn) {
          e.stopPropagation();
          await triggerControl('delete_todo', {
            id: agent.id,
            todoId: delBtn.dataset.delTodo,
          });
          return;
        }
        const nextMap = { pending: 'in_progress', in_progress: 'completed', completed: 'pending' };
        await triggerControl('toggle_todo', {
          id: agent.id,
          todoId: li.dataset.todoId,
          todoText: li.dataset.todoText,
          nextStatus: nextMap[li.dataset.todoStatus] || 'completed',
        });
      });
    });
  }

  // Work Completed Timeline
  const work = agent.workDone || [];
  $('work-count-pill').textContent = `${work.length} recent actions`;
  const workContainer = $('work-timeline');
  if (work.length === 0) {
    workContainer.innerHTML = `<div class="empty-state">No tool calls recorded yet.</div>`;
  } else {
    workContainer.innerHTML = work
      .map(
        (w) => `
        <div class="work-item">
          <div class="work-item-top">
            <span class="work-tool-badge">#${escapeHtml(w.stepIndex)} • ${escapeHtml(w.tool)}</span>
            <span class="work-time">${escapeHtml(formatRelativeAgo(w.timestamp))}</span>
          </div>
          <div class="work-summary">${escapeHtml(w.summary || w.action)}</div>
          ${w.detail ? `<div class="work-detail">${escapeHtml(w.detail)}</div>` : ''}
        </div>
      `
      )
      .join('');
  }
}

async function triggerControl(action, payload = {}) {
  try {
    const res = await callApi('/api/control', {
      method: 'POST',
      body: { action, ...payload },
    });
    if (res.message) toast(res.message);
    await refreshFleet();
  } catch (err) {
    toast(`Action failed: ${err.message}`, true);
  }
}

async function refreshFleet() {
  try {
    fleetData = await callApi('/api/fleet');
    renderSummaryBar();
    renderAgentList();
    renderInspector();
    if (!$('enroll-modal').hidden) {
      renderCandidateModalList();
    }
  } catch (err) {
    console.error('Failed to refresh fleet:', err);
  }
}

function init() {
  $('filter-tabs').querySelectorAll('.filter-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      $('filter-tabs').querySelectorAll('.filter-tab').forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      activeFilter = tab.dataset.filter;
      renderAgentList();
    });
  });

  $('search-input').addEventListener('input', (e) => {
    searchQuery = e.target.value.trim();
    renderAgentList();
  });

  $('btn-refresh').addEventListener('click', () => {
    refreshFleet();
    toast('Panel refreshed');
  });

  // Enroll / Approve Chat Modal
  $('btn-enroll-drawer').addEventListener('click', () => {
    renderCandidateModalList();
    $('enroll-modal').hidden = false;
  });

  const closeEnroll = () => {
    $('enroll-modal').hidden = true;
  };
  $('btn-close-enroll').addEventListener('click', closeEnroll);
  $('btn-done-enroll').addEventListener('click', closeEnroll);

  // Inspector controls
  $('btn-insp-start').addEventListener('click', () => {
    if (!selectedAgentId) return;
    triggerControl('start', { id: selectedAgentId });
  });

  $('btn-insp-stop').addEventListener('click', () => {
    if (!selectedAgentId) return;
    triggerControl('stop', { id: selectedAgentId });
  });

  $('btn-insp-approve').addEventListener('click', () => {
    if (!selectedAgentId) return;
    triggerControl('approve', { id: selectedAgentId });
  });

  $('btn-banner-approve').addEventListener('click', () => {
    if (!selectedAgentId) return;
    triggerControl('approve', { id: selectedAgentId });
  });

  $('btn-insp-flag').addEventListener('click', () => {
    if (!selectedAgentId) return;
    triggerControl('flag_approval', { id: selectedAgentId });
  });

  $('btn-insp-remove').addEventListener('click', async () => {
    if (!selectedAgentId) return;
    const removedId = selectedAgentId;
    selectedAgentId = null;
    await triggerControl('unenroll_agent', { id: removedId });
  });

  // Role & Job Editor
  $('btn-edit-role').addEventListener('click', () => {
    const agent = (fleetData.agents || []).find((a) => a.id === selectedAgentId);
    if (!agent) return;
    $('edit-title-input').value = agent.title;
    $('edit-role-input').value = agent.role;
    $('edit-job-input').value = agent.jobDescription;
    $('role-editor').hidden = false;
  });

  $('btn-cancel-role').addEventListener('click', () => {
    $('role-editor').hidden = true;
  });

  $('btn-save-role').addEventListener('click', async () => {
    if (!selectedAgentId) return;
    await triggerControl('update_meta', {
      id: selectedAgentId,
      title: $('edit-title-input').value,
      role: $('edit-role-input').value,
      jobDescription: $('edit-job-input').value,
    });
    $('role-editor').hidden = true;
  });

  // Add Planned Todo
  const addTodoHandler = async () => {
    const input = $('new-todo-input');
    const text = input.value.trim();
    if (!text || !selectedAgentId) return;
    input.value = '';
    await triggerControl('add_todo', { id: selectedAgentId, text });
  };

  $('btn-add-todo').addEventListener('click', addTodoHandler);
  $('new-todo-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTodoHandler();
  });

  // Update Directive Bar
  const sendMessageHandler = async () => {
    const input = $('agent-message-input');
    const msg = input.value.trim();
    if (!msg || !selectedAgentId) return;
    input.value = '';
    await triggerControl('update_meta', {
      id: selectedAgentId,
      jobDescription: msg,
    });
    await triggerControl('start', { id: selectedAgentId });
  };

  $('btn-send-message').addEventListener('click', sendMessageHandler);
  $('agent-message-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessageHandler();
  });

  // New Agent Modal
  $('btn-new-agent').addEventListener('click', () => {
    $('new-agent-modal').hidden = false;
  });

  const closeModal = () => {
    $('new-agent-modal').hidden = true;
  };
  $('btn-close-modal').addEventListener('click', closeModal);
  $('btn-cancel-new-agent').addEventListener('click', closeModal);

  $('btn-confirm-new-agent').addEventListener('click', async () => {
    const title = $('new-agent-title').value.trim();
    const role = $('new-agent-role').value.trim();
    const workspace = $('new-agent-workspace').value.trim();
    const prompt = $('new-agent-prompt').value.trim();
    const todos = $('new-agent-todos')
      .value.split(/\r?\n/)
      .map((s) => s.trim())
      .filter(Boolean);

    if (!title && !prompt) {
      toast('Please provide a title or mission prompt', true);
      return;
    }

    await triggerControl('launch_agent', {
      title: title || prompt.slice(0, 55),
      role: role || 'Browser & Task Automation Agent',
      workspace,
      prompt: prompt || title,
      todos,
    });
    closeModal();
  });

  refreshFleet();
  setInterval(refreshFleet, 3000);
}

init();
