import React from "react"; // ✅ Import React
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // ✅ Get token from local storage

  if (!token) {
    alert("You must be logged in to view this page!");
    return <Navigate to="/Login" />; // ✅ Redirect to Login if no token
  }

  return children; // ✅ Show Profile if token exists
};

export default ProtectedRoute;
