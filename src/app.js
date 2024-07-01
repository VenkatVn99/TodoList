let inputEl = document.querySelector("input");
let addBtn = document.querySelector(".add-btn");
let saveBtn = document.querySelector(".save-btn");
let tasksEl = document.querySelector("#tasks");

const getTodoListFromLocalStorage = () => {
  let stringifiedTodoList = localStorage.getItem("todoList");
  let parsedTodoList = JSON.parse(stringifiedTodoList);
  if (parsedTodoList === null) {
    return [];
  } else {
    return parsedTodoList;
  }
};
let todoList = getTodoListFromLocalStorage();
let tasksCount = todoList.length; // Initialize tasksCount

saveBtn.onclick = () => {
  localStorage.setItem("todoList", JSON.stringify(todoList));
};

const addTask = () => {
  let userInputVal = inputEl.value;
  if (userInputVal === "") {
    alert("Enter Valid Text");
    return;
  }
  tasksCount += 1;

  let newTask = {
    text: userInputVal,
    uniqueNo: tasksCount,
    isChecked: false,
  };
  todoList.push(newTask);
  createAndAppendTask(newTask);
  inputEl.value = ""; // Corrected variable name
};

addBtn.addEventListener("click", () => {
  addTask();
});

const createAndAppendTask = (task) => {
  let taskId = "task" + task.uniqueNo; // Add a prefix for clarity
  let checkboxId = "checkBox" + task.uniqueNo;
  let taskTextId = "taskText" + task.uniqueNo;

  // Create the list item (li) element for the task
  let taskEl = document.createElement("li");
  taskEl.classList.add("tasks-list-con");
  taskEl.id = taskId;

  // Create the checkbox input element
  let checkboxEl = document.createElement("input");
  checkboxEl.type = "checkbox";
  checkboxEl.id = checkboxId;
  checkboxEl.classList.add("check-box-input");
  taskEl.appendChild(checkboxEl);

  checkboxEl.onclick = () => {
    statusChange(taskId, checkboxId, taskTextId);
  };

  //Create a task-container
  let taskInfoContainer = document.createElement("div");
  taskInfoContainer.classList.add("taskInfoContainer");
  taskEl.appendChild(taskInfoContainer);

  // Create the text node for the task
  let taskTextEl = document.createElement("p");
  taskTextEl.innerText = task.text;
  taskTextEl.id = taskTextId;
  taskTextEl.classList.add("task-text");
  taskInfoContainer.appendChild(taskTextEl);

  //Create delete Icon

  let taskDeleteEl = document.createElement("i");
  taskDeleteEl.classList.add("far", "fa-trash-alt", "delete-icon");
  taskInfoContainer.appendChild(taskDeleteEl);

  taskDeleteEl.onclick = () => {
    onDeleteTask(taskId);
  };

  // Append the task element to the tasks list
  tasksEl.appendChild(taskEl);
};

const statusChange = (taskId, checkboxId, taskTextId) => {
  let checkBoxElement = document.querySelector("#" + checkboxId);
  let taskTextElement = document.querySelector("#" + taskTextId);
  let taskInfoContainer = taskTextElement.parentElement;

  // Update the background color of the task info container based on checkbox state
  if (checkBoxElement.checked) {
    taskInfoContainer.style.backgroundColor = "#0E8388"; // Change to desired color
  } else {
    taskInfoContainer.style.backgroundColor = ""; // Reset to default color
  }

  // Update the isChecked property of the task object
  let taskObjIndex = todoList.findIndex(
    (eachTask) => "task" + eachTask.uniqueNo === taskId
  );
  let taskObj = todoList[taskObjIndex];
  taskObj.isChecked = checkBoxElement.checked;
};

const onDeleteTask = (taskId) => {
  let taskElement = document.querySelector("#" + taskId);
  tasksEl.removeChild(taskElement);

  // Remove the task from the todoList array
  let taskIndex = todoList.findIndex(
    (task) => "task" + task.uniqueNo === taskId
  );
  if (taskIndex !== -1) {
    todoList.splice(taskIndex, 1);
  }
};
for (let todo of todoList) {
  createAndAppendTask(todo);
}
