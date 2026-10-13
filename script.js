const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");

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

  column.addEventListener("dragover",(e)=>{ 
    console.log("Dragging over");
    e.preventDefault();
  })

  column.addEventListener("drop",(e)=>{
    column.appendChild(dragElement);
    column.classList.remove("hover-over");
  })
}

addDragEventOnColumn(todo);
addDragEventOnColumn(progress);
addDragEventOnColumn(done);

const toggleModalBtn = document.querySelector("#toggle-modal");
console.log(toggleModalBtn)
toggleModalBtn.addEventListener("click" , ()=>{

})
