import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const AdminLayout = () => {
  return (
    <div className="w-full">
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
