import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/Javascript/HomePage";
import Login from "./pages/HomePage/Javascript/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import "./App.css";



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
    
      <Routes>
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="*"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<HomePage />}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
