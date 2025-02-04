import React, { useState, useEffect } from 'react';
import { updateTodo } from '../api';

const TodoItem = ({ todo, onUpdate }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [isCompleted, setIsCompleted] = useState(todo.completed);

  // Countdown for the deadline
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

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [todo.deadline]);

  // Toggle completion status
  const toggleCompletion = async () => {
    const updatedTodo = { ...todo, completed: !isCompleted };
    await updateTodo(todo.id, updatedTodo);
    setIsCompleted(!isCompleted); // Update local state
    onUpdate(todo.id, updatedTodo); // Notify parent component
  };

  return (
    <div className="todo-item">
      <h3>{todo.title}</h3>
      <p>{todo.description}</p>
      <p>Deadline: {new Date(todo.deadline).toLocaleString()}</p>
      <p>Time Left: {timeLeft}</p>
      <p>Priority: {todo.priority}</p>
      <p>Status: {isCompleted ? 'Completed' : 'Pending'}</p>
      <button onClick={toggleCompletion}>
        {isCompleted ? 'Undo' : 'Mark as Completed'}
      </button>
    </div>
  );
};

export default TodoItem;