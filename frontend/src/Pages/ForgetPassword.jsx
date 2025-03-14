  import React, { useState } from "react";
  import { forgetpassword } from "../api/userApi";

  const ForgetPassword = () => {
    let [email, setEmail] = useState("");
    let [error, setError] = useState("");
    let [success, setSuccess] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      forgetpassword(email).then((data) => {
        if (data.error) {
          setError(data.error);
          setSuccess("");
        } else {
          setError("");
          setSuccess(data.message);
        }
      });
    };

    const showError = () => {
      if (error) {
        return (
          <div className="bg-red-200 py-5 text-black text-center text-2xl">
            {error}
          </div>
        );
      }
    };

    const showSuccess = () => {
      if (success) {
        return (
          <div className="bg-green-200 py-5 text-black text-center text-2xl">
            {success}
          </div>
        );
      }
    };

    return (
      <>
        <form
          className="w-1/2 mx-auto my-5 p-5 rounded-lg"
          style={{ border: "2px groove black" }}
        >
          <h1 className="fw-bold text-center underline text-2xl">
            FORGET PASSWORD
          </h1>
          {showError()}
          {showSuccess()}
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            className="w-full mt-2 mb-3 outline outline-slate-300 outline-2 px-4
          py-2 rounded"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="bg-blue-900 hover:bg-blue-500 active:bg-blue-300 text-white
          active:text-blue-900 px-4 py-2 w-full rounded-md"
            onClick={handleSubmit}
          >
            Forget Password
          </button>
        </form>
      </>
    );
  };

  export default ForgetPassword;
