import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function ProtectedRoutesSingUp() {
  const isAuth = useAuth();
  return !isAuth ? <Outlet /> : <Navigate to="/" />;
}
