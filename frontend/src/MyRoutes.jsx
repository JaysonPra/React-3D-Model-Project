import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login";
import Contact from "./Contact";
import Gallery from "./Gallery";
import Category from "./Pages/Admin/Category";
import AddCategory from "./Pages/Admin/AddCategory";
import RegisterUser from "./Pages/RegisterUser";
import VerifyAcc from "./Pages/VerifyAcc";
import ForgetPassword from "./Pages/ForgetPassword";
import ResetPassword from "./Pages/ResetPassword";
import SellerDashboard from "./Pages/Admin/SellerDashboard";
import SellerLayout from "./components/Layout/SellerLayout";
import SellerProducts from "./Pages/Admin/Products/SellerProducts";
import EditCategory from "./Pages/Admin/EditCategory";

import AddProducts from "./Pages/Admin/Products/AddProducts";
import EditProduct from "./Pages/Admin/Products/EditProduct";
import SellerRoutes from "./ProtectedRoutes/SellerRoutes";
import ClientRoutes from "./ProtectedRoutes/ClientRoutes";
import Products from "./Pages/Products";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";

const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<ClientRoutes />}>
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          <Route path="/registeruser" element={<RegisterUser />} />

          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* Admin Page */}
          <Route path="category" element={<Category />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />
        </Route>
        <Route path="/" element={<SellerRoutes />}>
          <Route path="/seller" element={<SellerLayout />}>
            <Route path="dashboard" element={<SellerDashboard />} />
            <Route path="category" element={<Category />} />
            <Route path="category/new" element={<AddCategory />} />
            <Route path="category/:id" element={<EditCategory />} />
            <Route path="products" element={<SellerProducts />} />
            <Route path="products/new" element={<AddProducts />} />
            <Route path="products/:id" element={<EditProduct />} />
          </Route>
        </Route>
        <Route path="/verify/:token" element={<VerifyAcc />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
