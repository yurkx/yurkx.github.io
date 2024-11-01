document.addEventListener('DOMContentLoaded', loadTasks);

// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(addTaskToDOM);
}

// Save tasks to localStorage
function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add new task on Enter key press
document.getElementById('task-input').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    const taskText = this.value.trim();
    if (taskText) {
      const task = {
        id: Date.now(),
        text: taskText,
        completed: false,
        date: new Date().toLocaleString()
      };
      addTaskToDOM(task);
      saveTask(task);
      this.value = '';
    }
  }
});

// Save individual task to localStorage
function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  saveTasks(tasks);
}

// Add task element to DOM
function addTaskToDOM(task) {
  const taskItem = document.createElement('li');
  taskItem.className = 'task-item';
  if (task.completed) taskItem.classList.add('completed');

  const taskText = document.createElement('span');
  taskText.className = 'task-text';
  taskText.textContent = task.text;
  taskText.ondblclick = () => editTask(taskItem, task.id);
  taskItem.appendChild(taskText);

  const taskDate = document.createElement('span');
  taskDate.className = 'task-date';
  taskDate.textContent = task.date;
  taskItem.appendChild(taskDate);

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.onclick = () => toggleTaskCompletion(taskItem, task.id);
  if (!task.completed) taskItem.appendChild(checkbox);

  const deleteButton = document.createElement('button');
  deleteButton.className = 'task-delete';
  deleteButton.textContent = '✖';
  deleteButton.onclick = () => deleteTask(taskItem, task.id);
  taskItem.appendChild(deleteButton);

  document.getElementById('task-list').appendChild(taskItem);
}

// Toggle task completion
function toggleTaskCompletion(taskItem, taskId) {
  taskItem.classList.toggle('completed');
  taskItem.querySelector('input[type="checkbox"]').remove();
  updateTaskStatus(taskId, taskItem.classList.contains('completed'));
}

// Update task status in localStorage
function updateTaskStatus(taskId, completed) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const task = tasks.find(task => task.id === taskId);
  if (task) task.completed = completed;
  saveTasks(tasks);
}

// Delete task
function deleteTask(taskItem, taskId) {
  taskItem.remove();
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  saveTasks(tasks.filter(task => task.id !== taskId));
}

// Edit task
function editTask(taskItem, taskId) {
  const taskText = taskItem.querySelector('.task-text');
  const newText = prompt('Edit task:', taskText.textContent);
  if (newText && newText.trim() !== '') {
    taskText.textContent = newText.trim();
    updateTaskText(taskId, newText.trim());
  }
}

// Update task text in localStorage
function updateTaskText(taskId, newText) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const task = tasks.find(task => task.id === taskId);
  if (task) task.text = newText;
  saveTasks(tasks);
}

// Filter tasks
function filterTasks(filter) {
  const tasks = document.querySelectorAll('.task-item');
  tasks.forEach(task => {
    if (filter === 'all') {
      task.style.display = 'flex';
    } else if (filter === 'completed') {
      task.style.display = task.classList.contains('completed') ? 'flex' : 'none';
    } else if (filter === 'active') {
      task.style.display = !task.classList.contains('completed') ? 'flex' : 'none';
    }
  });
}
