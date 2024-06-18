// src/Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/Dashboard">Dashboard</Link></li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  );
};

export default Navigation;