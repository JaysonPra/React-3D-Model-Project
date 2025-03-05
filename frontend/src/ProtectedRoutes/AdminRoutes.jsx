import React from "react";
import { isAuthenticated } from "../api/userApi";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoutes = () => {
  return isAuthenticated() && isAuthenticated().user.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} />
  );
};

export default AdminRoutes;
