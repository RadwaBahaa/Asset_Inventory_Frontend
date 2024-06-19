// src/App.js
import React from "react";
import { BrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage/Javascript/HomePage';
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );
}

export default App;