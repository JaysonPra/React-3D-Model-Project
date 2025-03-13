import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../api/productApi";
import { API } from "../consts";
import {
  Button,
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  Rating,
  Divider,
  Chip,
  Skeleton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const ProductDetails = () => {
  let [product, setProduct] = useState({});
  let [loading, setLoading] = useState(true);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    getProductDetails(id).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProduct(data);
        setLoading(false);
      }
    });
  }, [id]);

  let cart_items = useSelector((store) => store.cartStore.cart_items);

  const handleAddToCart = (e) => {
    e.preventDefault();

    let itemExists = cart_items.find((item) => item.id == id);
    if (itemExists) {
      let cart_item = {
        ...itemExists,
        quantity: 1,
      };

      dispatch({ type: "UPDATE_CART", payload: cart_item });
      Swal.fire("Congrats!!", "Item updated in Cart", "success");
    } else {
      let cart_item = {
        id: product._id,
        name: product.product_name,
        price: product.product_price,
        image: product.product_image,
        quantity: 1,
      };
      dispatch({
        type: "ADD_TO_CART",
        payload: cart_item,
      });
      Swal.fire("Congrats!!!", "Item Added To Cart", "success");
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Skeleton variant="rectangular" height={400} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="text" height={60} sx={{ mb: 2 }} />
            <Skeleton variant="text" height={40} sx={{ mb: 2 }} />
            <Skeleton variant="text" height={120} sx={{ mb: 2 }} />
            <Skeleton variant="text" height={40} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" width={150} height={50} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ overflow: "hidden" }}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "grey.100",
                p: 2,
              }}
            >
              <img
                src={`${API}/${product.product_image}`}
                alt={product.product_name}
                style={{
                  maxWidth: "100%",
                  maxHeight: "400px",
                  objectFit: "contain",
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ p: 4 }}>
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                fontWeight="bold"
              >
                {product.product_name}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Rating value={product.rating || 0} readOnly precision={0.5} />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ ml: 1 }}
                >
                  {product.rating} rating
                </Typography>
              </Box>

              <Typography
                variant="h5"
                color="primary"
                fontWeight="medium"
                sx={{ mb: 2 }}
              >
                Rs. {product.product_price?.toLocaleString()}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom>
                Description
              </Typography>
              <Typography variant="body1" paragraph>
                {product.product_description}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <LocalShippingIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Free shipping on orders over Rs. 1000
                </Typography>
              </Box>

              {product.category && (
                <Chip
                  label={product.category.category_name}
                  variant="outlined"
                  size="small"
                  sx={{ mb: 3 }}
                />
              )}

              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleAddToCart}
                startIcon={<ShoppingCartIcon />}
                fullWidth
                sx={{
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                Add to Cart
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProductDetails;
