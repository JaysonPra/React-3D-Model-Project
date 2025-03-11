import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../consts";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Cart = () => {
  let cart_items = useSelector((store) => store.cartStore.cart_items);
  const dispatch = useDispatch();

  const handleRemove = (id) => (e) => {
    e.preventDefault();
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
    Swal.fire("Congrats!!!", "Item removed from Cart", "success");
  };

  return cart_items.length > 0 ? (
    <table className="my-5 w-[75vw] mx-auto text-center">
      <thead>
        <tr>
          <th>S.No.</th>
          <th>Image</th>
          <th>Title</th>
          <th>Unit Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {cart_items.map((item, i) => {
          return (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>
                <img src={`${API}/${item.image}`} alt="" className="h-48" />
              </td>
              <td>{item.name}</td>
              <td>Rs. {item.price}</td>
              <td>{item.quantity}</td>
              <td>Rs. {item.price * item.quantity}</td>
              <td>
                <Button onClick={handleRemove(item.id)} variant="contained">
                  Remove
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>

      <tfoot>
        <tr>
          <td colSpan={4} className="flex justify-between">
            <Button
              variant="contained"
              onClick={() => dispatch({ type: "EMPTY_CART" })}
            >
              EMPTY CART
            </Button>
            <Link to="/checkout">
              <Button variant="contained">Proceed to Checkout</Button>
            </Link>
          </td>
        </tr>
      </tfoot>
    </table>
  ) : (
    <div className="flex h-[50vh] justify-center items-center">
      NO ITEMS IN CART
    </div>
  );
};

export default Cart;
