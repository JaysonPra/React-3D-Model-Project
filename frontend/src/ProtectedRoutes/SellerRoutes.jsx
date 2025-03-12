import React from "react";
import { isAuthenticated } from "../api/userApi";
import { Navigate, Outlet } from "react-router-dom";

const SellerRoutes = () => {
  return isAuthenticated() && isAuthenticated().user.isSeller ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} />
  );
};

export default SellerRoutes;
