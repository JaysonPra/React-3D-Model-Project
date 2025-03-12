import React, { useEffect, useState } from "react";
import { deleteProduct, getAllProducts } from "../../../api/productApi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { isAuthenticated } from "../../../api/userApi";

const AdminProducts = () => {
  let [products, setProducts] = useState([]);
  let [success, setSuccess] = useState(false);
  const API = `http://localhost:5000`;
  const { token } = isAuthenticated();

  useEffect(() => {
    getAllProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
        setSuccess(false);
      }
    });
  }, [success]);

  const handleDelete = (id) => (e) => {
    e.preventDefault();
    Swal.fire({
      text: "Are you sure you want to delete this product?",
      title: "Confirm!!!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "orange",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "No !!!",
    }).then((confirmDelete) => {
      if (confirmDelete.isConfirmed) {
        deleteProduct(id, token).then((data) => {
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
      <h3 className="text-3xl underline">Products</h3>
      <table className="w-full mt-4 text-center">
        <thead>
          <tr>
            <td>S. No.</td>
            <td>Product Image</td>
            <td>Product Name</td>
            <td>Price</td>
            <td>Count in Stock</td>
            <td>Category</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 &&
            products.map((product, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={`${API}/${product.product_image}`}
                      alt={product.product_name}
                    />
                  </td>
                  <td>{product.product_name}</td>
                  <td>{product.product_price}</td>
                  <td>{product.count_in_stock}</td>
                  <td>{product.category?.category_name}</td>
                  <td>
                    <Link
                      to={`/admin/products/${product._id}`}
                      className="edit-btn text-black mr-1"
                    >
                      Update
                    </Link>
                    <button
                      className="delete-btn text-black"
                      onClick={handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
        <tfoot>
          <tr>
            <td>
              <Link to={"/admin/products/new"} className="add-btn text-black">
                Add New Product
              </Link>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default AdminProducts;
