import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import First from "./components/First";
import Second from "./components/Second";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login";
import Contact from "./Contact";
import HomePage from "./components/HomePage";
import Services from "./components/Services";
import Gallery from "./Gallery";
import Category from "./Pages/Admin/Category";
import Counter from "./Counter";
import AddCategory from "./Pages/Admin/AddCategory";
import RegisterUser from "./Pages/RegisterUser";
import VerifyAcc from "./Pages/VerifyAcc";
import ForgetPassword from "./Pages/ForgetPassword";
import ResetPassword from "./Pages/ResetPassword";
import AdminLayout from "./components/Layout/AdminLayout";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import EditCategory from "./Pages/Admin/EditCategory";
import AdminProducts from "./Pages/Admin/Products/AdminProducts";
import AddProducts from "./Pages/Admin/Products/AddProducts";
import EditProduct from "./Pages/Admin/Products/EditProduct";
import AdminRoutes from "./ProtectedRoutes/AdminRoutes";
import ClientRoutes from "./ProtectedRoutes/ClientRoutes";
import Products from "./Pages/Products";

const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/first" element={<First />} />
          <Route path="/second" element={<Second />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/" element={<ClientRoutes />}>
            <Route path="/gallery" element={<Gallery />} />
          </Route>

          <Route path="/registeruser" element={<RegisterUser />} />

          <Route path="/" element={<HomePage />} />

          <Route path="/products" element={<Products />} />

          {/* Admin Page */}
          <Route path="category" element={<Category />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />
        </Route>
        <Route path="/" element={<AdminRoutes />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="category" element={<Category />} />
            <Route path="category/new" element={<AddCategory />} />
            <Route path="category/:id" element={<EditCategory />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/new" element={<AddProducts />} />
            <Route path="products/:id" element={<EditProduct />} />
          </Route>
        </Route>

        <Route path="/counter" element={<Counter />} />
        <Route path="/verify/:token" element={<VerifyAcc />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
