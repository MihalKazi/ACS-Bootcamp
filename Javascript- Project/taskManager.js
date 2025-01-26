let tasks = [];

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTasks();
  }
});
const generateId = () => Date.now().toString();

const saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Function to add a new task
const addTask = (title, description, priority, dueDate) => {
  const newTask = {
    id: generateId(),
    title,
    description,
    priority,
    dueDate,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  saveTasks();
  renderTasks();
};

// Function to delete a task
const deleteTask = (taskId) => {
  tasks = tasks.filter((task) => task.id !== taskId);
  saveTasks();
  renderTasks();
};

// Function to update a task
const updateTask = (taskId, updates) => {
  tasks = tasks.map((task) =>
    task.id === taskId ? { ...task, ...updates } : task
  );
  saveTasks();
  renderTasks();
};

// Function to toggle task completion
const toggleTaskCompletion = (taskId) => {
  const task = tasks.find((task) => task.id === taskId);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
  }
};

// Function to filter tasks
const filterTasks = () => {
  const priorityFilter = document.getElementById('filterPriority').value;
  const completionFilter = document.getElementById('filterCompletion').value;

  return tasks.filter((task) => {
    const matchesPriority =
      priorityFilter === 'all' || task.priority === priorityFilter;
    const matchesCompletion =
      completionFilter === 'all' ||
      (completionFilter === 'completed' && task.completed) ||
      (completionFilter === 'incomplete' && !task.completed);
    return matchesPriority && matchesCompletion;
  });
};

// Function to sort tasks
const sortTasks = (filteredTasks) => {
  const sortBy = document.getElementById('sortBy').value;

  switch (sortBy) {
    case 'priority':
      return filteredTasks.sort((a, b) => {
        const priorityOrder = { low: 1, medium: 2, high: 3 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });
    case 'dueDate':
      return filteredTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    case 'creationDate':
      return filteredTasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    default:
      return filteredTasks;
  }
};

// Function to search tasks
const searchTasks = (filteredTasks) => {
  const searchQuery = document.getElementById('search').value.toLowerCase();
  return filteredTasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery) ||
      task.description.toLowerCase().includes(searchQuery)
  );
};

// Function to render tasks
const renderTasks = () => {
  const taskList = document.getElementById('taskList');
  let filteredTasks = filterTasks();
  filteredTasks = sortTasks(filteredTasks);
  filteredTasks = searchTasks(filteredTasks);

  taskList.innerHTML = filteredTasks
    .map(
      (task) => `
      <div class="task-item ${task.completed ? 'task-completed' : ''}">
        <div>
          <h3>${task.title}</h3>
          <p>${task.description}</p>
          <small>Priority: ${task.priority}</small>
          <small>Due Date: ${task.dueDate || 'Not set'}</small>
        </div>
        <div class="task-actions">
          <button class="complete-btn" onclick="toggleTaskCompletion('${task.id}')">
            ${task.completed ? 'Undo' : 'Complete'}
          </button>
          <button class="delete-btn" onclick="deleteTask('${task.id}')">Delete</button>
        </div>
      </div>
    `
    )
    .join('');
};
// Event listener for the task form
document.getElementById('taskForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('taskTitle').value;
  const description = document.getElementById('taskDescription').value;
  const priority = document.getElementById('taskPriority').value;
  const dueDate = document.getElementById('taskDueDate').value;

  if (title.trim() === '') {
    alert('Task title cannot be empty!');
    return;
  }

  addTask(title, description, priority, dueDate);
  document.getElementById('taskForm').reset();
});

// Event listeners for filtering, sorting, and searching

document.getElementById('filterPriority').addEventListener('change', renderTasks);
document.getElementById('filterCompletion').addEventListener('change', renderTasks);
document.getElementById('sortBy').addEventListener('change', renderTasks);
document.getElementById('search').addEventListener('input', renderTasks);