/* =============================================
   sortable-setup.js — drag & drop via SortableJS
   NOTE: SortableJS must be loaded in <head> via CDN
         before this file runs.
   ============================================= */

function initSortable() {
  // Guard: if SortableJS didn't load, warn and bail
  if (typeof Sortable === 'undefined') {
    console.error('SortableJS is not loaded. Add the CDN <script> tag to index.html <head>.');
    return;
  }

  const allCols = document.querySelectorAll('.column');

  document.querySelectorAll('.task-list').forEach((el) => {
    new Sortable(el, {
      group: 'board',         // same group = cross-column drag
      animation: 250,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
      fallbackOnBody: true,
      swapThreshold: 0.55,
      chosenClass: 'task--chosen',
      ghostClass:  'task--ghost',

      onStart() {
        document.body.classList.add('is-dragging');
      },

      onMove(evt) {
        // Highlight the column being dragged into
        allCols.forEach(c => c.classList.remove('drag-over'));
        evt.to.closest('.column')?.classList.add('drag-over');
      },

      onEnd(evt) {
        document.body.classList.remove('is-dragging');
        allCols.forEach(c => c.classList.remove('drag-over'));

        // Settle animation on dropped card
        evt.item.classList.add('task--settled');
        evt.item.addEventListener(
          'animationend',
          () => evt.item.classList.remove('task--settled'),
          { once: true }
        );

        // Mark as done/undone based on destination column
        const destCol = evt.to.dataset.col;
        if (destCol === 'done') {
          evt.item.classList.add('task--completed');
          // Swap priority badge for check badge if not already done
          const priority = evt.item.querySelector('[class*="task__priority"]');
          if (priority) {
            const check = document.createElement('div');
            check.className = 'task__check';
            check.innerHTML = `
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none"
                stroke="currentColor" stroke-width="2.5">
                <polyline points="2,6 5,9 10,3"/>
              </svg> Done`;
            priority.replaceWith(check);
          }
        } else {
          // Moving out of Done — restore
          evt.item.classList.remove('task--completed');
          const check = evt.item.querySelector('.task__check');
          if (check) {
            const badge = document.createElement('div');
            badge.className = 'task__priority task__priority--medium';
            badge.textContent = 'medium';
            check.replaceWith(badge);
          }
        }

        // Refresh counts
        if (typeof updateCounts === 'function') updateCounts();
      },
    });
  });
}