import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./componens/Header";
import SidebarMenu from "./componens/sidebar-menu";
import HomePage from "./pages/HomePage";
import InternalManagement from "./pages/InternalManagement";
import SanctionForm from "./componens/SanctionForm";
import Login from "./pages/login";
import ForgotPassword from "./pages/forgot-password";

function App() {
  return (
    <Router>
      <Header />
      <SidebarMenu />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/InternalManagement" element={<InternalManagement />} />
          <Route path="/SanctionForm" element={<SanctionForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
