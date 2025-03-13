import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import React, { useState } from "react";

const PricesRadio = ({ handleFilter }) => {
  const [selectedPrice, setSelectedPrice] = useState(0);

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
      name: "Rs. 1,000 - Rs. 10,000",
      value: [1000, 9999],
    },
    {
      id: 3,
      name: "Rs. 10,000 - Rs. 50,000",
      value: [10000, 50000],
    },
    {
      id: 4,
      name: "Rs. 50,000 - Rs. 100,000",
      value: [50000, 100000],
    },
    {
      id: 5,
      name: "Above Rs. 100,000",
      value: [100000, 99999999],
    },
  ];

  const handleChange = (e) => {
    const priceId = parseInt(e.target.value);
    setSelectedPrice(priceId);
    const price = prices.find((item) => item.id === priceId);
    handleFilter("product_price", price.value);
  };

  return (
    <Paper elevation={0} sx={{ bgcolor: "black", borderRadius: 2, mb: 2 }}>
      <Box p={2}>
        <Typography
          variant="h6"
          color="white"
          fontWeight="bold"
          gutterBottom
          sx={{ display: "flex", alignItems: "center" }}
        >
          <i className="bi bi-currency-rupee me-2"></i>
          Price Range
        </Typography>

        <RadioGroup value={selectedPrice} onChange={handleChange}>
          {prices.map((price) => (
            <FormControlLabel
              key={price.id}
              value={price.id}
              control={
                <Radio
                  icon={<i className="bi bi-circle text-white"></i>}
                  checkedIcon={
                    <i className="bi bi-check-circle-fill text-white"></i>
                  }
                  sx={{
                    "&.Mui-checked": {
                      color: "secondary.main",
                    },
                  }}
                />
              }
              label={
                <Typography
                  color="white"
                  variant="body2"
                  sx={{
                    transition: "all 0.2s",
                    fontWeight: selectedPrice === price.id ? "bold" : "normal",
                  }}
                >
                  {price.name}
                </Typography>
              }
              sx={{
                marginY: 0.5,
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.05)",
                  borderRadius: 1,
                },
              }}
            />
          ))}
        </RadioGroup>
      </Box>
    </Paper>
  );
};

export default PricesRadio;
