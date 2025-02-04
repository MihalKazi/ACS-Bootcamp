import React, { useState } from 'react';
import { createTodo } from '../api';
import '../styles/CreateTodo.css'; // Import styles

const CreateTodo = ({ onTodoCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTodo = {
      title,
      description,
      deadline,
      priority,
      completed: false,
    };
    const createdTodo = await createTodo(newTodo);
    onTodoCreated(createdTodo); // Notify parent component
    setTitle('');
    setDescription('');
    setDeadline('');
    setPriority('medium');
  };

  return (
    <div className="create-todo">
      <h2>Create New Todo</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button type="submit">Create Todo</button>
      </form>
    </div>
  );
};

export default CreateTodo;