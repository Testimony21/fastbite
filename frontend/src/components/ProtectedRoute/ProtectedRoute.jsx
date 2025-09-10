// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, user, requiredRole }) => {
  if (!user) {
    // Not logged in
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Logged in but wrong role (e.g., customer trying to access partner page)
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
