import React, { useState } from "react";
import { addCategory } from "../../api/categoryApi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AddCategory = () => {
  let [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addCategory(category).then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        Swal.fire({
          title: "Congrats!!!",
          text: "Category added successfully.",
          icon: "success",
          position: "top-right",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
    });
  };

  return (
    <>
      <form className="w-50 p-5 shadow-lg my-5 mx-auto bg-blue-900">
        <h1 className="text-decoration-underline text-center h3 text-warning">
          Add Category
        </h1>
        <label htmlFor="category_name">Category Name</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        />
        <button className="btn btn-warning w-100 mt-2" onClick={handleSubmit}>
          Add Category
        </button>
        <Link to={"/admin/category"} className="btn btn-danger mt-2 w-full">
          Go Back
        </Link>
      </form>
    </>
  );
};

export default AddCategory;
