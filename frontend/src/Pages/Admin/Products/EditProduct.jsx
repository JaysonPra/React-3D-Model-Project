import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getAllCategories } from "../../../api/categoryApi";
import { getProductDetails, updateProduct } from "../../../api/productApi";
import { isAuthenticated } from "../../../api/userApi";
import { API } from "../../../consts";

const EditProduct = () => {
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = isAuthenticated();
  const { id } = useParams();

  const darkSwal = Swal.mixin({
    background: "#212529",
    color: "#fff",
    confirmButtonColor: "#0d6efd",
    cancelButtonColor: "#6c757d",
  });

  useEffect(() => {
    getProductDetails(id)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setProduct({
            ...data,
            category: data.category?._id,
          });
        }
      })
      .catch((error) => console.log(error));

    getAllCategories()
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setCategories(data);
        }
      })
      .catch((error) => console.log(error));
  }, [id]);

  const {
    product_name,
    product_price,
    product_description,
    product_image,
    category,
  } = product;

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
      if (key !== "count_in_stock") {
        formdata.append(key, product[key]);
      }
    }

    updateProduct(id, formdata, token)
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
            text: "Product updated successfully.",
            icon: "success",
            timer: 3000,
            timerProgressBar: true,
          });
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
              <h3 className="text-center mb-0">Edit Product</h3>
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
                    value={product_name || ""}
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
                      value={product_price || ""}
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
                    value={product_description || ""}
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
                    value={category || ""}
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    {categories.length > 0 &&
                      categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.category_name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="product_image" className="form-label">
                    Product Image
                  </label>
                  {product_image && (
                    <div className="mb-2 text-center">
                      <img
                        src={`${API}/${product_image}`}
                        alt={product_name}
                        className="img-fluid rounded mb-2"
                        style={{ maxHeight: "150px" }}
                      />
                      <p className="small text-muted">Current image</p>
                    </div>
                  )}
                  <input
                    type="file"
                    className="form-control bg-dark text-light border-secondary"
                    id="product_image"
                    name="product_image"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <small className="form-text text-muted">
                    Leave empty to keep current image
                  </small>
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
                        Updating Product...
                      </>
                    ) : (
                      "Update Product"
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

export default EditProduct;
