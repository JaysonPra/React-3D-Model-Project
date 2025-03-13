import React from "react";
import { API } from "../consts";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
  Box,
} from "@mui/material";

const MyCard = ({ product }) => {
  const { _id, product_name, product_price, product_image, rating, category } =
    product;

  return (
    <Card
      sx={{
        maxWidth: 345,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Product image */}
      <CardMedia
        component="img"
        height="180"
        image={`${API}/${product_image}`}
        alt={product_name}
      />

      {/* Content */}
      <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
        {/* Product name */}
        <Typography gutterBottom variant="h6" component="div">
          {product_name}
        </Typography>

        {/* Price */}
        <Typography variant="body1" color="primary" fontWeight="medium">
          Rs. {product_price.toLocaleString()}
        </Typography>

        {/* Rating */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
          <Rating value={rating} readOnly size="small" />
        </Box>

        {/* Category */}
        {category?.category_name && (
          <Typography variant="body2" color="text.secondary" mt={1}>
            {category.category_name}
          </Typography>
        )}
      </CardContent>

      {/* Actions */}
      <CardActions sx={{ justifyContent: "center" }}>
        <Button href={`/product/${_id}`} size="small" variant="contained">
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default MyCard;
