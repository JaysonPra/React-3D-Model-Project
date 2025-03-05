import React, { useEffect, useState } from "react";
import { deleteCategory, getAllCategories } from "../../api/categoryApi";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Category = () => {
  let [categories, setCategories] = useState([]);
  let [success, setSuccess] = useState(false);

  useEffect(() => {
    getAllCategories()
      .then((data) => {
        setCategories(data);
        setSuccess(false);
      })
      .catch((error) => console.log(error));
  }, [success]);

  const handleDelete = (id) => (e) => {
    e.preventDefault();
    Swal.fire({
      text: "Are you sure you want to delete this category?",
      title: "Confirm!!!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "orange",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "No !!!",
    }).then((confirmDelete) => {
      if (confirmDelete.isConfirmed) {
        deleteCategory(id).then((data) => {
          if (data.error) {
            console.log(data.error);
          } else {
            Swal.fire("Success", data.message, "success");
            setSuccess(true);
          }
        });
      }
    });
  };

  return (
    <div className="p-5">
      <h1 className="h3">Categories</h1>
      <ol>
        {categories.map((category, i) => {
          // return <Link to={`/admin/category/${category._id}`}><li>{i+1}. {category.category_name}</li></Link> //can be written as this as well
          return (
            <>
              <li className="text-2xl">
                {i + 1}. {category.category_name}
                <Link
                  className="edit-btn ms-3 text-black"
                  to={`/admin/category/${category._id}`}
                >
                  Edit
                </Link>
                <button
                  className="delete-btn ms-3"
                  onClick={handleDelete(category._id)}
                >
                  Delete
                </button>
              </li>
            </>
          );
        })}
      </ol>
      <Link to={"/admin/category/new"} className="add-btn text-black">
        Add New Category
      </Link>
    </div>
  );
};

export default Category;
