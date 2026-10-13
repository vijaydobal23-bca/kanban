const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");

// NEW: tasks are stored in this object, grouped by column id
// Example: { todo: [{title, description}], progress: [], done: [] }
let taskData = {};

console.log(todo, progress, done);
let dragElement = null;

const takss = document.querySelectorAll(".task");
takss.forEach((task) => {
  task.addEventListener("drag", () => {
    dragElement = task;
  });
});

function addDragEventOnColumn(column) {
  column.addEventListener("dragenter", (e) => {
    e.target.classList.add("hover-over");
  });

  column.addEventListener("dragleave", (e) => {
    e.preventDefault();
    e.target.classList.remove("hover-over");
  });

  column.addEventListener("dragover", (e) => {
    console.log("Dragging over");
    e.preventDefault();
  });

  column.addEventListener("drop", (e) => {
    column.appendChild(dragElement);
    column.classList.remove("hover-over");

    // NEW: after dropping, refresh count + object + localStorage
    updateTaskCount();
    updateTaskData();
    saveToLocalStorage();
  });
}

function updateTaskCount() {
  [todo, progress, done].forEach((col) => {
    const task = col.querySelectorAll(".task");
    const count = col.querySelector(".task-count");
    count.innerText = task.length;
  });
}

// ---------------- NEW FUNCTIONS ----------------

// 1. Read all tasks from the screen and put them in the taskData object
function updateTaskData() {
  [todo, progress, done].forEach((col) => {
    const tasks = col.querySelectorAll(".task");
    taskData[col.id] = Array.from(tasks).map((task) => {
      return {
        title: task.querySelector("h2").innerText,
        description: task.querySelector("p").innerText,
      };
    });
  });
}

// 2. Save the taskData object into localStorage
function saveToLocalStorage() {
  localStorage.setItem("taskData", JSON.stringify(taskData));
}

// 3. Create one task element and put it inside a column
function createTask(title, description, column) {
  const div = document.createElement("div");
  div.classList.add("task");
  div.setAttribute("draggable", "true");
  div.innerHTML = `
    <h2>${title}</h2>
    <p>${description}</p>
    <button>Delete</button>
  `;

  div.addEventListener("drag", () => {
    dragElement = div;
  });

  addDeleteEvent(div);
  column.appendChild(div);
}

// 4. Delete button logic (works for every task)
function addDeleteEvent(task) {
  const deleteBtn = task.querySelector("button");
  deleteBtn.addEventListener("click", () => {
    task.remove();
    refreshAll();
  });
}

// 5. Load tasks from localStorage when the page opens
function loadFromLocalStorage() {
  const saved = localStorage.getItem("taskData");
  if (!saved) return; // nothing saved yet, keep the HTML tasks

  taskData = JSON.parse(saved);

  // remove the default HTML tasks so they don't get duplicated
  document.querySelectorAll(".task").forEach((task) => task.remove());

  [todo, progress, done].forEach((col) => {
    const tasks = taskData[col.id] || [];
    tasks.forEach((t) => createTask(t.title, t.description, col));
  });
}

// 6. One helper that does count + object + storage together
function refreshAll() {
  updateTaskCount();
  updateTaskData();
  saveToLocalStorage();
}

// ------------------------------------------------

// NEW: load saved tasks first, then count
loadFromLocalStorage();

// NEW: delete button for the tasks that already exist in HTML
document.querySelectorAll(".task").forEach((task) => addDeleteEvent(task));

updateTaskCount();

addDragEventOnColumn(todo);
addDragEventOnColumn(progress);
addDragEventOnColumn(done);

const toggleModalBtn = document.querySelector("#toggle-modal");
const modal = document.querySelector(".modal");

const modalBg = document.querySelector(".modal .bg");
const taskForm = document.querySelector("#task-form");

toggleModalBtn.addEventListener("click", () => {
  modal.classList.toggle("active");
});

modalBg.addEventListener("click", () => {
  modal.classList.remove("active");
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault(); // stop the page from reloading

  const taskTitle = document.querySelector("#task-title").value;
  const taskDescription = document.querySelector("#task-description").value;

  // NEW: using createTask() instead of building the div here
  createTask(taskTitle, taskDescription, todo);
  refreshAll();
  taskForm.reset(); // clear the inputs for the next task

  modal.classList.remove("active");
});