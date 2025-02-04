import React, { useState, useEffect } from 'react';
import { updateTodo } from '../api';

const TodoItem = ({ todo, onUpdate }) => {
  const [timeLeft, setTimeLeft] = useState('');

  // Calculate time left for the deadline
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const deadline = new Date(todo.deadline);
      const difference = deadline - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
      } else {
        return 'Deadline passed';
      }
    };

    // Update the countdown every second
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, [todo.deadline]); // Re-run effect if the deadline changes

  const handleComplete = async () => {
    const updatedTodo = { ...todo, completed: true };
    await updateTodo(todo.id, updatedTodo);
    onUpdate(todo.id, updatedTodo); // Notify parent component to update the state
  };

  return (
    <div className="todo-item">
      <h3>{todo.title}</h3>
      <p>{todo.description}</p>
      <p>Deadline: {new Date(todo.deadline).toLocaleString()}</p>
      <p>Time Left: {timeLeft}</p>
      <p>Priority: {todo.priority}</p>
      <p>Status: {todo.completed ? 'Completed' : 'Pending'}</p>
      {!todo.completed && (
        <button onClick={handleComplete}>Mark as Completed</button>
      )}
    </div>
  );
};

export default TodoItem;