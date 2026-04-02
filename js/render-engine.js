/* =============================================
   render-engine.js — DOM rendering functions
   ============================================= */

// FIX: columnsEl was missing — this caused renderBoard() to crash
const columnsEl = document.getElementById('columns');

/* ── Avatar ── */
function renderAvatar(avatar) {
  if (avatar.img) {
    return `<div class="avatar">
      <img src="${avatar.img}" alt="${avatar.initials}" loading="lazy">
    </div>`;
  }
  return `<div class="avatar avatar--fallback">${avatar.initials}</div>`;
}

/* ── Single task card ── */
function renderTask(task, isDoneColumn) {
  const done = isDoneColumn || task.done;

  const tags = task.tags
    .map(t => `<span class="tag tag--${t}">${TAG_LABELS[t] || t}</span>`)
    .join('');

  const badge = done
    ? `<div class="task__check">
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="2,6 5,9 10,3"/>
        </svg>
        Done
       </div>`
    : `<div class="task__priority task__priority--${task.priority}">${task.priority}</div>`;

  return `
    <article class="task ${done ? 'task--completed' : ''}" tabindex="0" data-id="${task.id}">
      ${badge}
      <h3>${task.title}</h3>
      <p class="task__desc">${task.desc}</p>
      <div class="tags">${tags}</div>
      <footer class="task__footer">
        ${renderAvatar(task.avatar)}
        <span class="task__date">${task.date}</span>
      </footer>
    </article>`;
}

/* ── Column ── */
function renderColumn(col) {
  const isDone = col.id === 'done';

  const taskItems = col.tasks
    .map(t => renderTask(t, isDone))
    .join('');

  // FIX: initDropdowns was called but never defined — moved inline here
  const menuItemsHTML = MENU_ITEMS
    .map(m => `<button class="column__dropdown-item" data-action="${m.action}" data-col="${col.id}">${m.title}</button>`)
    .join('');

  return `
    <div class="column" data-col="${col.id}">
      <div class="column__header">
        <div class="column__label">
          <span class="column__dot ${col.dotClass}"></span>
          ${col.title}
          <span class="column__count" data-count="${col.id}">${col.tasks.length}</span>
        </div>
        <div class="column__menu">
          <button class="column__menu-btn" data-menu="${col.id}" title="Column options">···</button>
          <div class="column__dropdown" id="menu-${col.id}">
            ${menuItemsHTML}
          </div>
        </div>
      </div>
      <div class="task-list" data-col="${col.id}">
        ${taskItems}
      </div>
    </div>`;
}

/* ── Footer ── */
function updateFooter() {
  const total = COLUMNS.reduce((sum, c) => sum + c.tasks.length, 0);
  const footerEl = document.getElementById('footerCount');
  if (footerEl) footerEl.textContent = `${total} tasks`;
}

/* ── Update column counts after drag ── */
function updateCounts() {
  document.querySelectorAll('.task-list').forEach(list => {
    const colId = list.dataset.col;
    const count = list.querySelectorAll('.task').length;
    const el = document.querySelector(`[data-count="${colId}"]`);
    if (el) el.textContent = count;
  });

  // Recalculate total
  let total = 0;
  document.querySelectorAll('.task-list').forEach(list => {
    total += list.querySelectorAll('.task').length;
  });
  const footerEl = document.getElementById('footerCount');
  if (footerEl) footerEl.textContent = `${total} tasks`;
}

/* ── Dropdown menus ── */
function bindDropdowns() {
  // Open/close menus
  document.querySelectorAll('.column__menu-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.menu;
      const dropdown = document.getElementById(`menu-${id}`);
      // Close all others first
      document.querySelectorAll('.column__dropdown.open').forEach(d => {
        if (d !== dropdown) d.classList.remove('open');
      });
      dropdown?.classList.toggle('open');
    });
  });

  // Close menus on outside click
  document.addEventListener('click', () => {
    document.querySelectorAll('.column__dropdown.open').forEach(d => d.classList.remove('open'));
  });

  // Handle menu actions
  document.querySelectorAll('.column__dropdown-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const { action, col } = btn.dataset;
      handleMenuAction(action, col);
      document.querySelectorAll('.column__dropdown.open').forEach(d => d.classList.remove('open'));
    });
  });
}

function handleMenuAction(action, colId) {
  const list = document.querySelector(`.task-list[data-col="${colId}"]`);
  if (!list) return;

  if (action === 'sort') {
    const tasks = [...list.querySelectorAll('.task')];
    const order = { high: 0, medium: 1, low: 2 };
    tasks.sort((a, b) => {
      const pa = a.querySelector('[class*="task__priority--"]')?.className.match(/--(\w+)/)?.[1] || 'low';
      const pb = b.querySelector('[class*="task__priority--"]')?.className.match(/--(\w+)/)?.[1] || 'low';
      return (order[pa] ?? 2) - (order[pb] ?? 2);
    });
    tasks.forEach(t => list.appendChild(t));
  }

  if (action === 'moveDone') {
    const doneList = document.querySelector('.task-list[data-col="done"]');
    if (doneList) {
      [...list.querySelectorAll('.task')].forEach(t => {
        t.classList.add('task--completed');
        doneList.appendChild(t);
      });
      updateCounts();
    }
  }

  if (action === 'highlight') {
    const col = list.closest('.column');
    col?.classList.toggle('drag-over');
  }
}

/* ── Dark mode toggle ── */
function bindThemeToggle() {
  const btn = document.getElementById('themeToggle');
  const card = document.getElementById('boardCard');
  if (!btn || !card) return;

  btn.addEventListener('click', () => {
    const isDark = card.classList.toggle('dark');
    btn.textContent = isDark ? '☀️' : '🌙';
    document.body.style.background = isDark ? '#111' : '#f1f1f1';
  });
}

/* ── Main render ── */
function renderBoard() {
  columnsEl.innerHTML = COLUMNS.map(renderColumn).join('');
  updateFooter();
  bindDropdowns();
  bindThemeToggle();
  // initSortable is called from sortable-setup.js (loaded after this file)
  if (typeof initSortable === 'function') initSortable();
}

// Run on DOM ready
document.addEventListener('DOMContentLoaded', renderBoard);