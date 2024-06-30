import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/Javascript/HomePage";
import Login from "./pages/Login";
import TokenValidation from "./routes/TokenValidation";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <TokenValidation>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </TokenValidation>
    </BrowserRouter>
  );
}

export default App;
