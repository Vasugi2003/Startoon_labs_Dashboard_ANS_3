// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './components/SignUp';
import Login from './components/Login';
import Home from './components/Home';
import AdminDashboard from './components/AdminDashBoard';
import useAuth from './hooks/useAuth';

const App = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/admin" element={isAuthenticated && user?.email === 'admin@email.com' ? <AdminDashboard /> : <Navigate to="/home" />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
