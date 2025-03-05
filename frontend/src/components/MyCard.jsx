import React from "react";
import { API } from "../consts";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Rating,
  Typography,
} from "@mui/material";

// const MyCard = ({product_name, product_price, product_image, rating, category}) => { ==> can be destructured like this as well
const MyCard = ({ product }) => {
  // product = {name: 'xyz', price: '123', image: 'URL}
  let { product_name, product_price, product_image, rating, category } =
    product; // destructuring the object
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <img
          style={({ height: 140 }, { width: 335 })}
          src={`${API}/${product_image}`}
          title={product_name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product_name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Rs. {product_price}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Rating: <Rating value={rating} readOnly />
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Category: {category?.category_name}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </>
  );
};

export default MyCard;
