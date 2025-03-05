import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authenticate, login } from "../api/userApi";
import { MyThemeContext } from "../App";

const Login = () => {
  let [user, setUser] = useState({});
  let navigate = useNavigate();

  let theme = useContext(MyThemeContext);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(user).then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        authenticate(data);
        // alert("login successful");
        if (data.user.isAdmin) {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      }
    });
  };

  return (
    <>
      <main>
        <form
          className={`${
            theme == "dark" ? "dark-" : ""
          }mybg form-signin w-11/12 sm:w-10/12 lg:w-1/2 m-auto p-5 shadow-xl my-5`}
        >
          <img
            className="mb-4"
            src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg"
            alt=""
            width="72"
            height="57"
          />
          <h1 className="h3 mb-3 fw-normal  ">Please sign in</h1>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              name="email"
              onChange={handleChange}
            />
            <label for="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <label for="floatingPassword">Password</label>
          </div>

          <div className="form-check text-start my-3">
            <input
              className="form-check-input"
              type="checkbox"
              value="remember-me"
              id="flexCheckDefault"
            />
            <label className="form-check-label" for="flexCheckDefault">
              Remember me
            </label>
          </div>
          <button
            className="btn btn-primary w-100 py-2"
            type="submit"
            onClick={handleSubmit}
          >
            Sign in
          </button>
          <div className="flex py-3 justify-between fw-normal mb-3 underline">
            <Link to={"/register"}>
              <p>Register an Account?</p>
            </Link>
            <Link to={"/forgot"}>
              <p>Forgot Password</p>
            </Link>
          </div>

          <p className="mt-5 mb-3 text-body-secondary">&copy; 2017–2024</p>
        </form>
      </main>
    </>
  );
};

export default Login;
