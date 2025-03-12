import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../../api/userApi";

function Header() {
  const navigate = useNavigate();
  const auth = isAuthenticated();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-items-center">
        <div className="container">
          <Link className="navbar-brand text-info fw-bold" to="/products">
            3DMart
          </Link>

          <div className="d-flex align-items-center">
            <ul className="navbar-nav flex-row me-3">
              <li className="nav-item px-2">
                <Link className="nav-link" to="/gallery">
                  Gallery
                </Link>
              </li>
              <li className="nav-item px-2">
                <Link className="nav-link" to="/products">
                  Products
                </Link>
              </li>
              <li className="nav-item px-2">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>

            {auth ? (
              <div className="d-flex align-items-center">
                <Link to="/cart" className="btn btn-outline-light btn-sm me-2">
                  <i className="bi bi-cart"></i> Cart
                </Link>

                {/* Simple menu with state */}
                <div className="position-relative">
                  <button
                    className="btn btn-outline-info btn-sm"
                    onClick={toggleMenu}
                  >
                    {auth.user.username} <i className="bi bi-chevron-down"></i>
                  </button>

                  {showMenu && (
                    <div
                      className="position-absolute end-0 mt-1 bg-white shadow rounded py-1"
                      style={{ zIndex: 1000, minWidth: "150px" }}
                    >
                      {auth.user.isSeller && (
                        <Link
                          className="d-block px-3 py-1 text-decoration-none text-dark"
                          to="/seller/dashboard"
                        >
                          Seller Dashboard
                        </Link>
                      )}
                      <div className="dropdown-divider my-1"></div>
                      <button
                        className="d-block w-100 text-start border-0 bg-transparent px-3 py-1 text-decoration-none text-dark"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <Link to="/login" className="btn btn-info btn-sm">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
