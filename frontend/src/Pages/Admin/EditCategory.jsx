import React, { useEffect, useState } from "react";
import { editCategory, getCategoryDetails } from "../../api/categoryApi";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditCategory = () => {
  const { id } = useParams();
  const [category, setCategory] = useState("");

  useEffect(() => {
    getCategoryDetails(id).then((data) => {
      if (data.error) {
        console.error(data.error);
      } else {
        setCategory(data.category_name);
      }
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    editCategory(id, category)
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          Swal.fire({
            title: "Success!",
            text: "Category updated successfully.",
            icon: "success",
            confirmButtonText: "OK",
            background: "#1e1e1e",
            color: "#ffffff",
          });
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <main className="flex justify-center my-5">
      <form className="w-3/4 max-w-md p-5 shadow-lg rounded-lg bg-gray-800 text-white">
        <h1 className="text-center uppercase underline mb-4 text-lg font-bold text-white">
          Edit Category
        </h1>
        <div className="mb-4">
          <label htmlFor="category_name" className="block mb-1">
            Category Name
          </label>
          <input
            type="text"
            id="category_name"
            className="w-full px-4 py-2 text-gray-900 border-0 rounded focus:ring-2 focus:ring-purple-400"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter category name"
            required
          />
        </div>
        <button
          className="bg-yellow-500 hover:bg-yellow-600 w-full py-2 text-black font-semibold rounded uppercase mt-3 text-white"
          onClick={handleSubmit}
        >
          Edit Category
        </button>
        <Link
          to="/seller/category"
          className="bg-red-500 hover:bg-red-600 w-full py-2 text-white font-semibold rounded uppercase mt-3 text-center block"
        >
          Go Back
        </Link>
      </form>
    </main>
  );
};

export default EditCategory;
