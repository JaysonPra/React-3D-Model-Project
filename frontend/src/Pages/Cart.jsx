import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../consts";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Container,
  IconButton,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Cart = () => {
  let cart_items = useSelector((store) => store.cartStore.cart_items);
  const dispatch = useDispatch();

  const handleRemove = (id) => (e) => {
    e.preventDefault();
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
    Swal.fire("Success!", "Item removed from cart", "success");
  };

  // Calculate cart total
  const cartTotal = cart_items.reduce((total, item) => {
    return total + item.price;
  }, 0);

  if (cart_items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Your cart is empty
        </Typography>
        <Link to="/products" style={{ textDecoration: "none" }}>
          <Button variant="contained" startIcon={<ShoppingBagIcon />}>
            Continue Shopping
          </Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Your Shopping Cart
      </Typography>

      <TableContainer component={Paper} elevation={1}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "grey.100" }}>
              <TableCell>Item</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart_items.map((item, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={`${API}/${item.image}`}
                      alt={item.name}
                      style={{
                        width: 60,
                        height: 60,
                        objectFit: "contain",
                        marginRight: 12,
                      }}
                    />
                    <Typography variant="body1">{item.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  Rs. {item.price.toLocaleString()}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    color="error"
                    onClick={handleRemove(item.id)}
                    aria-label="remove item"
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            dispatch({ type: "EMPTY_CART" });
            Swal.fire(
              "Cart Emptied!",
              "Your cart has been emptied.",
              "success"
            );
          }}
        >
          Empty Cart
        </Button>

        <Box sx={{ textAlign: "right" }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Total: Rs. {cartTotal.toLocaleString()}
          </Typography>
          <Link to="/checkout" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary">
              Checkout
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Cart;
