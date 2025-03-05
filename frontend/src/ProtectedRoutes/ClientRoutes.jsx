import React from "react";
import { isAuthenticated } from "../api/userApi";
import { Navigate, Outlet } from "react-router-dom";

const ClientRoutes = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ClientRoutes;
