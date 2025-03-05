import {
  Box,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const PricesRadio = ({ handleFilter }) => {
  let [product_price, setProduct_price] = useState([]);

  const prices = [
    {
      id: 0,
      name: "ALL",
      value: [],
    },
    {
      id: 1,
      name: "Up to Rs. 1,000",
      value: [0, 999],
    },
    {
      id: 2,
      name: "Rs. 1,000 - Rs.10,000",
      value: [1000, 9999],
    },
    {
      id: 3,
      name: "Rs.10,000 - Rs.50,000",
      value: [10000, 50000],
    },
    {
      id: 4,
      name: "Rs.50,000 - Rs.100,000",
      value: [50000, 100000],
    },
    {
      id: 5,
      name: "Above Rs.100,000",
      value: [100000, 99999999],
    },
  ];

  const handleChange = (e) => {
    let price = prices.find((item) => item.id == e.target.value);
    setProduct_price(price.value);
    handleFilter("product_price", price.value);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" color="white">
        Prices
      </Typography>
      <RadioGroup>
        {prices.map((price) => {
          return (
            <FormControlLabel
              className="text-white"
              control={
                <Radio
                  icon={<i className="bi bi-bookmark text-white"></i>}
                  checkedIcon={
                    <i className="bi bi-bookmark-check-fill text-white"></i>
                  }
                  value={price.id}
                  onChange={handleChange}
                />
              }
              label={price.name}
            ></FormControlLabel>
          );
        })}
      </RadioGroup>
    </Box>
  );
};

export default PricesRadio;
