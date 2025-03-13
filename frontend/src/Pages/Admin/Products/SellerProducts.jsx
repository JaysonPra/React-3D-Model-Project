import React, { useEffect, useState } from "react";
import { deleteProduct, getAllProducts } from "../../../api/productApi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { isAuthenticated } from "../../../api/userApi";
import { API } from "../../../consts";

const SellerProducts = () => {
  const [products, setProducts] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const { token } = isAuthenticated();

  useEffect(() => {
    setLoading(true);
    getAllProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
        Swal.fire("Error", "Failed to load products", "error");
      } else {
        setProducts(data);
        setSuccess(false);
      }
      setLoading(false);
    });
  }, [success]);

  const handleDelete = (id) => (e) => {
    e.preventDefault();
    Swal.fire({
      text: "Are you sure you want to delete this product?",
      title: "Confirm Deletion",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#17a2b8", // Bootstrap info color
      cancelButtonColor: "#6c757d", // Bootstrap secondary color
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    }).then((confirmDelete) => {
      if (confirmDelete.isConfirmed) {
        deleteProduct(id, token).then((data) => {
          if (data.error) {
            console.log(data.error);
            Swal.fire("Error", "Failed to delete product", "error");
          } else {
            Swal.fire("Success", data.message, "success");
            setSuccess(true);
          }
        });
      }
    });
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Products</h2>
        <Link to="/seller/products/new" className="btn btn-info">
          <i className="bi bi-plus-lg"></i> Add New Product
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading products...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="alert alert-info">
          <i className="bi bi-info-circle me-2"></i>
          No products found. Add your first product!
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Image</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Category</th>
                    <th scope="col" className="text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={`${API}/${product.product_image}`}
                          alt={product.product_name}
                          className="img-thumbnail"
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                          }}
                        />
                      </td>
                      <td className="fw-medium">{product.product_name}</td>
                      <td>Rs.{product.product_price.toFixed(2)}</td>

                      <td>{product.category?.category_name}</td>
                      <td>
                        <div className="d-flex justify-content-center gap-2">
                          <Link
                            to={`/seller/products/${product._id}`}
                            className="btn btn-sm btn-outline-info"
                          >
                            <i className="bi bi-pencil me-1"></i> Edit
                          </Link>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={handleDelete(product._id)}
                          >
                            <i className="bi bi-trash me-1"></i> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

export default SellerProducts;
