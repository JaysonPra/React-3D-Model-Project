import React from "react";
import { Link } from "react-router-dom";

const sellerSidebar = () => {
  return (
    <>
      <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary">
        <Link
          to="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        >
          {/* <svg className="bi pe-none me-2" width="40" height="32"><use xlink:to="#bootstrap"/></svg> */}
          <i className="bi bi-home bi-house"></i>
          <span className="fs-4 ml-3">3DMart</span>
        </Link>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <Link
              to="/products"
              className="nav-link active"
              aria-current="page"
            >
              {/* <svg className="bi pe-none me-2" width="16" height="16"><use xlink:to="#home"/></svg> */}
              <i className="bi bi-house mr-3"></i>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/seller/dashboard"
              className="nav-link link-body-emphasis"
            >
              {/* <svg className="bi pe-none me-2" width="16" height="16"><use xlink:to="#speedometer2"/></svg> */}
              <i className="bi bi-speedometer2 mr-3"></i>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/seller/category" className="nav-link link-body-emphasis">
              {/* <svg className="bi pe-none me-2" width="16" height="16"><use xlink:to="#grid"/></svg> */}
              <i className="bi bi-grid mr-3"></i>
              Categories
            </Link>
          </li>
          <li>
            <Link to="/seller/products" className="nav-link link-body-emphasis">
              {/* <svg className="bi pe-none me-2" width="16" height="16"><use xlink:to="#grid"/></svg> */}
              <i className="bi bi-grid mr-3"></i>
              Products
            </Link>
          </li>
          <li>
            <Link to="/seller/orders" className="nav-link link-body-emphasis">
              {/* <svg className="bi pe-none me-2" width="16" height="16"><use xlink:to="#table"/></svg> */}
              <i className="bi bi-table mr-3"></i>
              Orders
            </Link>
          </li>
        </ul>
        <hr />
        <div className="dropdown">
          <Link
            to="#"
            className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="bi bi-person"></i>
            <strong className="ml-3">username</strong>
          </Link>
          <ul className="dropdown-menu text-small shadow">
            <li>
              <Link className="dropdown-item" to="#">
                Sign out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default sellerSidebar;
