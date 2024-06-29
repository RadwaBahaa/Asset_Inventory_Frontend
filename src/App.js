import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage/Javascript/HomePage';
import Login from './pages/HomePage/Javascript/Login';
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="*"
          element= {<HomePage/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;