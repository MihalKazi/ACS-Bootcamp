import React from 'react';
import { Link } from 'react-router-dom';
import Login from '../components/Login';
import '../styles/Login.css';

const LoginPage = ({ onLogin }) => {
  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <Login onLogin={onLogin} />
        <p>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: '#007bff', textDecoration: 'none' }}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;