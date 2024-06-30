import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/Javascript/HomePage";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      {/* <HomePage /> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ProtectedRoute element={<HomePage />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
