import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login.jsx";
import Forgotpassword from "./pages/forgot-password.jsx";
import HomePage from "./pages/HomePage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/HomePage" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
