import React from "react";
import { Link } from "react-router-dom";

function SellerDashboard() {
  return (
    <div className="container py-5">
      <h2 className="mb-4">Seller Dashboard</h2>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <i className="bi bi-box-seam fs-1 text-info mb-3"></i>
              <h4>Products</h4>
              <p>Manage your 3D model products</p>
              <Link to="/seller/products" className="btn btn-info">
                View Products
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <i className="bi bi-tags fs-1 text-info mb-3"></i>
              <h4>Categories</h4>
              <p>Manage product categories</p>
              <Link to="/seller/categories" className="btn btn-info">
                View Categories
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerDashboard;
