import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import CreateTodo from './CreateTodo';
import { fetchTodos } from '../api';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'high', 'medium', 'low'
  const [sortBy, setSortBy] = useState('creation'); // 'creation', 'deadline', 'priority'

  // Fetch todos only once when the component mounts
  useEffect(() => {
    const getTodos = async () => {
      const data = await fetchTodos();
      setTodos(data);
    };
    getTodos();
  }, []);

  // Update todo state when marked as completed
  const handleUpdate = (id, updatedTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
    );
  };

  // Add a new todo to the list
  const handleTodoCreated = (newTodo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  // Filter todos by priority
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true;
    return todo.priority === filter;
  });

  // Sort todos
  const sortedTodos = filteredTodos.sort((a, b) => {
    if (sortBy === 'creation') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else if (sortBy === 'deadline') {
      return new Date(a.deadline) - new Date(b.deadline);
    } else if (sortBy === 'priority') {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return 0;
  });

  return (
    <div>
      <h1>Todo List</h1>
      <CreateTodo onTodoCreated={handleTodoCreated} />
      <div>
        <label>Filter by Priority: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      <div>
        <label>Sort by: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="creation">Creation Time</option>
          <option value="deadline">Deadline</option>
          <option value="priority">Priority</option>
        </select>
      </div>
      <div className="todo-list">
        {sortedTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onUpdate={handleUpdate} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;