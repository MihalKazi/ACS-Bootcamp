import React from 'react';

const Header = ({ onLogout }) => {
  return (
    <div className="header">
      <h1>Dashboard</h1>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Header;