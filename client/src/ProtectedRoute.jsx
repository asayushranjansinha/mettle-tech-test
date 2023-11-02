import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import useAuth from "./hooks/useAuth";
import Navbar from "./components/Navbar/Navbar";

function ProtectedRoute() {
  const auth = useAuth();
  const location = useLocation();
  return auth ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default ProtectedRoute;
