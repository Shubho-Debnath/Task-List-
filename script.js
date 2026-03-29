let taskData = {};

const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");

const columns = [todo, progress, done];
let draggedElement = null;

/* ===================== ADD TASK ===================== */
function addTask(title, desc, column) {
  const div = document.createElement("div");
  div.classList.add("task");
  div.setAttribute("draggable", "true");

  div.innerHTML = `
    <h2>${title}</h2>
    <p>${desc}</p>
    <button class="delete">Delete</button>
  `;

  column.appendChild(div);

  // drag
  div.addEventListener("dragstart", () => {
    draggedElement = div;
  });

  // delete
  div.querySelector(".delete").addEventListener("click", () => {
    div.remove();
    updateTaskCount();
  });

  return div;
}

/* ===================== SAVE + COUNT ===================== */
function updateTaskCount() {
  columns.forEach((col) => {
    const tasks = col.querySelectorAll(".task");
    const count = col.querySelector(".right");

    taskData[col.id] = Array.from(tasks).map((t) => ({
      title: t.querySelector("h2").innerText,
      desc: t.querySelector("p").innerText,
    }));

    count.textContent = tasks.length;
  });

  localStorage.setItem("tasks", JSON.stringify(taskData));
}

/* ===================== LOAD FROM STORAGE ===================== */
function loadTasks() {
  const data = JSON.parse(localStorage.getItem("tasks"));
  if (!data) return;

  for (const col in data) {
    const column = document.querySelector(`#${col}`);
    data[col].forEach((task) => {
      addTask(task.title, task.desc, column);
    });
  }

  updateTaskCount();
}

loadTasks();

/* ===================== DRAG & DROP ===================== */
function addDragEvents(column) {
  column.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  column.addEventListener("dragenter", (e) => {
    e.preventDefault();
    column.classList.add("hover-over");
  });

  column.addEventListener("dragleave", () => {
    column.classList.remove("hover-over");
  });

  column.addEventListener("drop", (e) => {
    e.preventDefault();
    if (draggedElement) {
      column.appendChild(draggedElement);
      updateTaskCount();
    }
    column.classList.remove("hover-over");
  });
}

columns.forEach(addDragEvents);

/* ===================== MODAL ===================== */
const toggleButton = document.querySelector("#toggleButton");
const modal = document.querySelector(".modal");
const bg = document.querySelector(".bg");
const addButton = document.querySelector("#add-new-task");

toggleButton.addEventListener("click", () => {
  modal.classList.toggle("active");
});

bg.addEventListener("click", () => {
  modal.classList.remove("active");
});

/* ===================== ADD BUTTON ===================== */
addButton.addEventListener("click", () => {
  const titleInput = document.querySelector("#titleInput").value.trim();
  const descInput = document.querySelector("#deskInput").value.trim();

  if (!titleInput && !descInput) return; // prevent empty task

  addTask(titleInput, descInput, todo);
  updateTaskCount();

  // clear inputs
  document.querySelector("#titleInput").value = "";
  document.querySelector("#deskInput").value = "";

  modal.classList.remove("active");
});