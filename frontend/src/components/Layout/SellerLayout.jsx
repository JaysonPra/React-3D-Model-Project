import React from "react";
import SellerSidebar from "./SellerSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="w-full md:flex">
      <div className="md:w-1/4 p-5">
        <SellerSidebar />
      </div>
      <div className="md:w-3/4 p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
