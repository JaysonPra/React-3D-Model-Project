import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { getAllCategories } from "../../../api/categoryApi";
import { addProduct } from "../../../api/productApi";
import { isAuthenticated } from "../../../api/userApi";

const AddProduct = () => {
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = isAuthenticated();

  // Dark theme configuration for SweetAlert2
  const darkSwal = Swal.mixin({
    background: "#212529",
    color: "#fff",
    confirmButtonColor: "#0d6efd",
    cancelButtonColor: "#6c757d",
  });

  useEffect(() => {
    getAllCategories()
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setCategories(data);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    let formdata = new FormData();
    for (var key in product) {
      formdata.append(key, product[key]);
    }

    addProduct(formdata, token)
      .then((data) => {
        setLoading(false);
        if (data.error) {
          darkSwal.fire({
            title: "Error",
            text: data.error,
            icon: "error",
            timer: 3000,
            timerProgressBar: true,
          });
        } else {
          darkSwal.fire({
            title: "Success",
            text: "Product added successfully.",
            icon: "success",
            timer: 3000,
            timerProgressBar: true,
          });
          // Reset form
          setProduct({});
          document.getElementById("product-form").reset();
        }
      })
      .catch((err) => {
        setLoading(false);
        darkSwal.fire({
          title: "Error",
          text: "Something went wrong. Please try again.",
          icon: "error",
          timer: 3000,
          timerProgressBar: true,
        });
      });
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card bg-dark text-white border-secondary shadow">
            <div className="card-header bg-dark text-white border-secondary">
              <h3 className="text-center mb-0">Add New Product</h3>
            </div>
            <div className="card-body">
              <form id="product-form" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="product_name" className="form-label">
                    Product Name
                  </label>
                  <input
                    type="text"
                    className="form-control bg-dark text-light border-secondary"
                    id="product_name"
                    name="product_name"
                    placeholder="Enter product name"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="product_price" className="form-label">
                    Price
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-dark text-light border-secondary">
                      Rs.
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control bg-dark text-light border-secondary"
                      id="product_price"
                      name="product_price"
                      placeholder="0.00"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="product_description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control bg-dark text-light border-secondary"
                    id="product_description"
                    name="product_description"
                    rows="4"
                    placeholder="Enter product description"
                    required
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <select
                    className="form-select bg-dark text-light border-secondary"
                    id="category"
                    name="category"
                    required
                    onChange={handleChange}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    {categories.length > 0 &&
                      categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.category_name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="product_image" className="form-label">
                    Product Image
                  </label>
                  <input
                    type="file"
                    className="form-control bg-dark text-light border-secondary"
                    id="product_image"
                    name="product_image"
                    accept="image/*"
                    required
                    onChange={handleFileChange}
                  />
                </div>

                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Adding Product...
                      </>
                    ) : (
                      "Add Product"
                    )}
                  </button>
                  <Link
                    to="/seller/products"
                    className="btn btn-outline-secondary"
                  >
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
