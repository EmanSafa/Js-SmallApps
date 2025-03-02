let theInput = document.querySelector(".add-task input");
let theAddButton = document.querySelector(".add-task .plus");
let tasksContainer = document.querySelector(".tasks-content");
let tasksCount = document.querySelector(".tasks-count span");
let tasksCompleted = document.querySelector(".tasks-completed span");

window.onload = function () {
  loadTasks();
  theInput.focus();
};

theAddButton.onclick = function () {
  let taskValue = theInput.value.trim();

  if (taskValue === "") {
    swal.fire("The input field is empty, please enter a task.");
    console.log("Empty");
    return;
  }

  //if existing
  let tasksWritten = document.querySelectorAll(".task-box");
  for (let task of tasksWritten) {
    if (task.firstChild.textContent === taskValue) {
      swal.fire("This task already exists!");
      return;
    }
  }
  let noTasksMessage = document.querySelector(
    ".tasks-content .no-tasks-message"
  );

  if (document.body.contains(document.querySelector(".no-tasks-message"))) {
    noTasksMessage.remove();
  }

  let mainSpan = document.createElement("span");
  let deleteElement = document.createElement("span");
  let spanText = document.createTextNode(taskValue);
  let deleteText = document.createTextNode("Delete");

  mainSpan.appendChild(spanText);
  mainSpan.className = "task-box";
  tasksContainer.appendChild(mainSpan);

  deleteElement.className = "delete";
  deleteElement.appendChild(deleteText);
  mainSpan.appendChild(deleteElement);

  theInput.value = "";
  theInput.focus();
  calculateTasks();
  saveTasks();
};
document.addEventListener("click", function (e) {
  if (e.target.className == "delete") {
    e.target.parentNode.remove();
    if (tasksContainer.childElementCount == 0) {
      createNoTasks();
    }
  }
  calculateTasks();
  saveTasks();
});
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("task-box")) {
    e.target.classList.toggle("finished");
  }
  saveTasks();
  calculateTasks();
});

let deleteAll = document.createElement("span");
let deleteAllText = document.createTextNode("Delete All");
deleteAll.appendChild(deleteAllText);
let allSection = document.querySelector(".all");
allSection.appendChild(deleteAll);
deleteAll.className = "deleteAll";

deleteAll.addEventListener("click", function (e) {
  let tasksWritten = document.querySelectorAll(".task-box");
  for (let e of tasksWritten) {
    e.remove();
  }
  saveTasks();
});

let finishAll = document.createElement("span");
let finishAllText = document.createTextNode("Finish All");
finishAll.appendChild(finishAllText);
allSection.appendChild(finishAll);
finishAll.className = "finishAll";
finishAll.addEventListener("click", function (e) {
  let tasksWritten = document.querySelectorAll(".task-box");
  for (let e of tasksWritten) {
    e.classList.add("finished");
  }
  saveTasks();
});

function createNoTasks() {
  let noTasksSpan = document.createElement("span");

  let noTasksMessage = document.createTextNode("No Tasks To Show !");
  noTasksSpan.appendChild(noTasksMessage);
  noTasksSpan.className = "no-tasks-message";
  tasksContainer.appendChild(noTasksSpan);
}

function calculateTasks() {
  tasksCount.innerHTML = document.querySelectorAll(
    ".tasks-content  .task-box"
  ).length;
  tasksCompleted.innerHTML = document.querySelectorAll(
    ".tasks-content  .finished"
  ).length;
}

function saveTasks() {
  let tasks = [];
  document.querySelectorAll(".task-box").forEach((task) => {
    tasks.push({
      text: task.firstChild.textContent,
      completed: task.classList.contains("finished"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    let mainSpan = document.createElement("span");
    let deleteElement = document.createElement("span");
    let spanText = document.createTextNode(task.text);
    let deleteText = document.createTextNode("Delete");

    mainSpan.appendChild(spanText);
    mainSpan.className = "task-box";
    if (task.completed) {
      mainSpan.classList.add("finished");
    }
    tasksContainer.appendChild(mainSpan);

    deleteElement.className = "delete";
    deleteElement.appendChild(deleteText);
    mainSpan.appendChild(deleteElement);
  });
  calculateTasks();
}
