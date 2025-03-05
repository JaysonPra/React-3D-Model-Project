import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getAllCategories } from "../../../api/categoryApi";
import { getProductDetails, updateProduct } from "../../../api/productApi";
import { isAuthenticated } from "../../../api/userApi";
import { API } from "../../../consts";

const EditProduct = () => {
  let [product, setProduct] = useState({});
  let [categories, setCategories] = useState([]);
  const { token } = isAuthenticated();
  const { id } = useParams();

  let select_ref = useRef();

  useEffect(() => {
    getProductDetails(id).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProduct({ ...data, category: data.category?._id });
        select_ref.current.value = data.category._id;
      }
    });

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

  let {
    product_name,
    product_price,
    product_description,
    count_in_stock,
    product_image,
  } = product;

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let formdata = new FormData();
    for (var key in product) {
      formdata.append(key, product[key]);
      console.log(key, product[key]);
    }

    updateProduct(id, formdata, token).then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        Swal.fire({
          title: "Congrats",
          text: "Product updated successfully.",
          icon: "success",
          timer: 3000,
          timeProgressBar: true,
        });
      }
    });
  };
  return (
    <main className="form-signin w-11/12 sm:w-10/12  md:w-8/12 lg:w-1/2 m-auto p-5 shadow-xl bg-purple-900 my-5">
      <form style={{ maxWidth: "400px", margin: "auto" }}>
        <h2 className="text-2xl text-center font-bold underline my-2">
          Edit Product
        </h2>

        <label>Product Name:</label>
        <input
          type="text"
          className="w-full text-blue-700 px-5 py-2 border border-blue-900 focus:bg-gray-100"
          name="product_name"
          placeholder="Enter product name"
          required
          onChange={handleChange}
          value={product_name}
        />
        <br />

        <label>Price:</label>
        <input
          type="text"
          className="w-full text-blue-700 px-5 py-2 border border-blue-900 focus:bg-gray-100"
          name="product_price"
          placeholder="Enter price"
          required
          onChange={handleChange}
          value={product_price}
        />
        <br />

        <label>Description:</label>
        <textarea
          rows={5}
          className="w-full text-blue-700 px-5 py-2 border border-blue-900 focus:bg-gray-100 resize-none"
          name="product_description"
          placeholder="Enter description"
          required
          onChange={handleChange}
          value={product_description}
        />
        <br />

        <label>Category:</label>
        <select
          name="category"
          required
          className="w-full text-blue-700 px-5 py-2 border border-blue-900 focus:bg-gray-100"
          defaultValue={""}
          onChange={handleChange}
          ref={select_ref}
        >
          <option value="" disabled selected>
            Select Category
          </option>
          {categories.length > 0 &&
            categories.map((category) => {
              return (
                <option key={category._id} value={category._id}>
                  {category.category_name}
                </option>
              );
            })}
        </select>
        <br />

        <label>Count:</label>
        <input
          type="number"
          className="w-full text-blue-700 px-5 py-2 border border-blue-900 focus:bg-gray-100"
          name="count_in_stock"
          placeholder="Enter count"
          required
          onChange={handleChange}
          value={count_in_stock}
        />
        <br />

        <label>Image:</label>
        <img src={`${API}/${product_image}`} />
        <input
          type="file"
          className="w-full text-orange-300 px-5 py-2 border border-blue-900 focus:bg-gray-100"
          name="product_image"
          accept="image/*"
          required
          onChange={handleFileChange}
        />
        <br />

        <button className="btn btn-danger w-50 mt-2 p-2" onClick={handleSubmit}>
          Update Product
        </button>
        <Link
          to={"/admin/products"}
          className="btn btn-warning w-50 flex mt-2 p-2 text-black"
        >
          Go Back
        </Link>
      </form>
    </main>
  );
};

export default EditProduct;
