import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import TodoList from '../components/TodoList';
import '../styles/Dashboard.css';

const Dashboard = ({ onLogout }) => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header onLogout={onLogout} />
        <TodoList />
      </div>
    </div>
  );
};

export default Dashboard;