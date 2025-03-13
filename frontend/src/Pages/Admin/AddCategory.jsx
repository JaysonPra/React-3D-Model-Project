import React, { useState } from "react";
import { addCategory } from "../../api/categoryApi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AddCategory = () => {
  const [category, setCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!category.trim()) {
      Swal.fire({
        title: "Error",
        text: "Category name cannot be empty",
        icon: "error",
        position: "center",
        showConfirmButton: false,
        timer: 2000,
        background: "#212529",
        color: "#f8f9fa",
      });
      return;
    }

    setIsSubmitting(true);

    addCategory(category)
      .then((data) => {
        if (data.error) {
          Swal.fire({
            title: "Error",
            text: data.error,
            icon: "error",
            position: "center",
            showConfirmButton: true,
            background: "#212529",
            color: "#f8f9fa",
          });
        } else {
          Swal.fire({
            title: "Success",
            text: "Category added successfully.",
            icon: "success",
            position: "top-right",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            background: "#212529",
            color: "#f8f9fa",
          });
          setCategory(""); // Reset the input field
        }
      })
      .catch(() => {
        Swal.fire({
          title: "Error",
          text: "Something went wrong. Please try again.",
          icon: "error",
          position: "center",
          showConfirmButton: true,
          background: "#212529",
          color: "#f8f9fa",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <form
        className="w-50 p-5 shadow-lg my-5 mx-auto"
        style={{
          backgroundColor: "rgba(var(--bs-dark-rgb), var(--bs-bg-opacity))",
        }}
        onSubmit={handleSubmit}
      >
        <h1 className="text-center h3 mb-4 text-info">Add Category</h1>
        <label htmlFor="category_name" className="text-light mb-2">
          Category Name
        </label>
        <input
          type="text"
          id="category_name"
          className="form-control bg-dark text-light border-secondary"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter category name"
        />
        <button
          className="btn btn-outline-info w-100 mt-3"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add Category"}
        </button>
        <Link
          to="/seller/category"
          className="btn btn-outline-secondary mt-2 w-100"
        >
          Go Back
        </Link>
      </form>
    </>
  );
};

export default AddCategory;
