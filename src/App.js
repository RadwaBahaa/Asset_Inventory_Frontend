// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePageLayout from './pages/HomePage/layout'; 
import './App.css';
import Dashboard from './pages/Dashboard'; // Adjust the import based on your actual file structure

function App() {
  return (
    <Router>
      <div className="App">
      <Routes>
          <Route path="/" element={<HomePageLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            {/* Add other nested routes as needed */}
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;