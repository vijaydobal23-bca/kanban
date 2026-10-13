const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");

console.log(todo, progress, done);

const takss = document.querySelectorAll(".task");
takss.forEach((task) => {
  task.addEventListener("drag", () => {
    console.log("Dragging");
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
}

addDragEventOnColumn(todo);
addDragEventOnColumn(progress);
addDragEventOnColumn(done);
