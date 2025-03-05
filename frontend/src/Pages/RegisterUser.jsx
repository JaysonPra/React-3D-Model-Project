import React, { useState } from "react";
import { register } from "../api/userApi";

const RegisterUser = () => {
  let [user, setUser] = useState({});

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(user)
    register(user).then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        alert(data.message);
      }
    });
  };

  return (
    <>
      <form className="w-1/2 p-5 my-5 border border-gray-500 rounded-3xl mx-auto">
        <h3 className="text-3xl text-center underline font-bold">Register</h3>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          className="w-full text-blue-700 px-5 py-2 border border-blue-900
                 focus:bg-gray-100"
          name="username"
          onChange={handleChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          className="w-full text-blue-700 px-5 py-2 border border-blue-900
                 focus:bg-gray-100"
          name="email"
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          className="w-full text-blue-700 px-5 py-2 border border-blue-900
                 focus:bg-gray-100"
          name="password"
          onChange={handleChange}
        />

        <button
          className="bg-blue-900 hover:bg-blue-500 active:bg-blue-300 text-white active:text-blue-900
                 px-4 py-2 w-full mt-2 rounded-md"
          onClick={handleSubmit}
        >
          Register
        </button>
      </form>
    </>
  );
};

export default RegisterUser;
