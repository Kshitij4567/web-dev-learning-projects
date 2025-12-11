const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage
document.addEventListener("DOMContentLoaded", loadTasks);

addBtn.addEventListener("click", () => {
  if (taskInput.value.trim() !== "") {
    addTask(taskInput.value);
    taskInput.value = "";
  }
});

function addTask(taskText) {
  const li = document.createElement("li");
  li.className = "task";
  li.innerHTML = `
    <span>${taskText}</span>
    <div>
      <button onclick="toggleTask(this)">✔</button>
      <button onclick="deleteTask(this)">❌</button>
    </div>
  `;
  taskList.appendChild(li);
  saveTasks();
}

function toggleTask(button) {
  const task = button.parentElement.parentElement;
  task.classList.toggle("completed");
  saveTasks();
}

function deleteTask(button) {
  const task = button.parentElement.parentElement;
  task.remove();
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.querySelector("span").innerText,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(t => {
    addTask(t.text);
    if (t.completed) {
      taskList.lastChild.classList.add("completed");
    }
  });
}