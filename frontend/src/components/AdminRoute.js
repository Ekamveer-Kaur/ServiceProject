// src/ProtectedRoutes/AdminRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.isAdmin !== true) {
    // Agar user nahi hai ya admin nahi hai toh login page pe le jao
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminRoute;
