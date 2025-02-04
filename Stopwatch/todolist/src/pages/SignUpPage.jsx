import React from 'react';
import { Link } from 'react-router-dom';
import SignUp from '../components/SignUp';
import '../styles/SignUp.css';

const SignUpPage = ({ onSignUp }) => {
  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Sign Up</h2>
        <SignUp onSignUp={onSignUp} />
        <p>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#007bff', textDecoration: 'none' }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;