import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../../api/userApi";
import UserContext from "../UserContext";
import MyContext from "../MyContext";

const Header = () => {
  let { user } = isAuthenticated();
  const navigate = useNavigate();

  let msg = useContext(MyContext);
  let user1 = useContext(UserContext);

  const handleLogout = (e) => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <div className="container-fluid bg-dark" style={{ color: "white" }}>
        <div className="row">
          <div className="col-12 col-md-3 text-center fs-3 fw-bold py-1">
            My Page
          </div>
          <div className="col-12 col-md-6 text-center">
            <div className="d-flex btn-group py-2">
              <input type="search" className="form-control"></input>
              <input
                type="button"
                className="btn btn-success"
                value={"Search"}
              ></input>
            </div>
          </div>
          <div className="col-12 col-md-3 text-center d-flex justify-content-evenly fs-3 py-1">
            {!user ? (
              <>
                <Link to={"/registeruser"}>
                  <i class="bi bi-person-plus"></i>
                </Link>
                <Link to={"/login"}>
                  <i class="bi bi-box-arrow-in-left"></i>
                </Link>
              </>
            ) : user.isAdmin == 1 ? (
              <>
                <Link to={"/admin/dashboard"}>
                  <i className="bi bi-speedometer2"></i>
                </Link>
              </>
            ) : (
              <>
                <Link to={"/cart"}>
                  <i class="bi bi-cart"></i>
                </Link>
              </>
            )}

            {user && (
              <i
                className="bi bi-box-arrow-right"
                role="button"
                onClick={handleLogout}
              ></i>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex justify-evenly py-2 w-[80%]">
          <Link to={"/"}>Home</Link>
          <Link to={"/products"}>Products</Link>
          <Link to={"/about"}>About</Link>
          <Link to={"/gallery"}>Galley</Link>
          <Link to={"/services"}>Services</Link>
          <Link to={"/contact"}>Contact</Link>
        </div>
        <div className="pe-2">
          {msg}, {user1 ? user1.username : "Guest"}
        </div>
      </div>
    </>
  );
};

export default Header;
