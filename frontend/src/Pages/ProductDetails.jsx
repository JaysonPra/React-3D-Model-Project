import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../api/productApi";
import { API } from "../consts";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const ProductDetails = () => {
  let [product, setProduct] = useState({});
  let [qty, setQty] = useState(1);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    getProductDetails(id).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProduct(data);
      }
    });
  }, []);

  let cart_items = useSelector((store) => store.cartStore.cart_items);
  const handleAddToCart = (e) => {
    e.preventDefault();

    let itemExists = cart_items.find((item) => item.id == id);
    if (itemExists) {
      let new_quantity = Number(itemExists.quantity) + Number(qty);
      if (new_quantity > itemExists.stock) {
        Swal.fire("Attention!!!", "Quantity is out of Stock", "warning");
      } else {
        let cart_item = {
          ...itemExists,
          quantity: new_quantity,
        };

        dispatch({ type: "UPDATE_CART", payload: cart_item });
        Swal.fire("Congrats!!", "Quantity updated in Cart", "success");
      }
    } else {
      let cart_item = {
        id: product._id,
        name: product.product_name,
        price: product.product_price,
        image: product.product_image,
        stock: product.count_in_stock,
        quantity: qty,
      };
      dispatch({
        type: "ADD_TO_CART",
        payload: cart_item,
      });
      Swal.fire("Congrats!!!", "Item Added To Cart", "success");
    }
  };

  return (
    <div className="bg-slate-600 p-10 flex">
      <div className="w-1/2">
        <img
          src={`${API}/${product.product_image}`}
          alt=""
          className="w-full"
        />
      </div>
      <div className="w-1/2 p-20">
        <h1 className="text-3xl">{product.product_name}</h1>
        <h1 className="text-2xl">Price: Rs. {product.product_price}</h1>
        <h1 className="text-2xl">Description: </h1>
        <p className="text-xl">{product.product_description}</p>
        <h1 className="text-2xl">In Stock: {product.count_in_stock}</h1>
        <h1 className="text-2xl">Rating: {product.rating}</h1>

        <h1 className="text-2xl">Quantity: </h1>
        <input
          type="number"
          min={1}
          max={product.count_in_stock}
          onChange={(e) => setQty(e.target.value)}
          defaultValue={1}
          className="text-xl text-center"
        />

        <br />

        <Button variant="contained" className="btn" onClick={handleAddToCart}>
          Add To Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductDetails;
