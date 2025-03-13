import React, { useEffect, useState } from "react";
import { deleteCategory, getAllCategories } from "../../api/categoryApi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const SellerCategories = () => {
  const [categories, setCategories] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getAllCategories()
      .then((data) => {
        if (isMounted) {
          setCategories(data || []);
          setSuccess(false);
          setError(false);
          setLoading(false);
        }
      })
      .catch((error) => {
        if (isMounted) {
          console.log(error);
          setError(true);
          setLoading(false);
          Swal.fire({
            title: "Error",
            text: "Failed to load categories",
            icon: "error",
            background: "#212529",
            color: "#f8f9fa",
          });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [success]);

  const handleDelete = (id) => (e) => {
    e.preventDefault();
    Swal.fire({
      text: "Are you sure you want to delete this category?",
      title: "Confirm Deletion",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#17a2b8", // Bootstrap info color
      cancelButtonColor: "#6c757d", // Bootstrap secondary color
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      background: "#212529",
      color: "#f8f9fa",
    }).then((confirmDelete) => {
      if (confirmDelete.isConfirmed) {
        deleteCategory(id).then((data) => {
          if (data.error) {
            console.log(data.error);
            Swal.fire({
              title: "Error",
              text: "Failed to delete category",
              icon: "error",
              background: "#212529",
              color: "#f8f9fa",
            });
          } else {
            Swal.fire({
              title: "Success",
              text: data.message,
              icon: "success",
              background: "#212529",
              color: "#f8f9fa",
            });
            setSuccess(true);
          }
        });
      }
    });
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-light">Manage Categories</h2>
        <Link to="/seller/category/new" className="btn btn-info">
          <i className="bi bi-plus-lg"></i> Add New Category
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-light">Loading categories...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger">
          <i className="bi bi-exclamation-triangle me-2"></i>
          Error loading categories. Please try refreshing the page.
        </div>
      ) : categories.length === 0 ? (
        <div className="alert alert-info">
          <i className="bi bi-info-circle me-2"></i>
          No categories found. Add your first category!
        </div>
      ) : (
        <div className="card shadow-sm bg-dark text-light border-secondary">
          <div className="card-body">
            <div className="list-group">
              {categories.map((category, index) => (
                <div
                  key={category._id}
                  className="list-group-item list-group-item-action d-flex justify-content-between align-items-center bg-dark text-light border-secondary"
                >
                  <div className="d-flex align-items-center">
                    <span className="badge bg-info rounded-pill me-3">
                      {index + 1}
                    </span>
                    <h5 className="mb-0">{category.category_name}</h5>
                  </div>
                  <div className="d-flex gap-2">
                    <Link
                      to={`/seller/category/${category._id}`}
                      className="btn btn-sm btn-outline-info"
                    >
                      <i className="bi bi-pencil me-1"></i> Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={handleDelete(category._id)}
                    >
                      <i className="bi bi-trash me-1"></i> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mt-4">
        <Link to="/seller/dashboard" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-1"></i> Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default SellerCategories;
