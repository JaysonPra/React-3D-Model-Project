import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import CategoryCheckbox from "../components/CategoryCheckbox";
import PricesRadio from "../components/PricesRadio";
import { getAllProducts } from "../api/productApi";
import MyCard from "../components/MyCard";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Products = () => {
  const [filters, setFilters] = useState({ category: [], product_price: [] });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getAllProducts(filters)
      .then((data) => {
        if (data.error) {
          setError(data.error);
          console.error(data.error);
        } else {
          setProducts(data);
          setError(null);
        }
      })
      .catch((err) => {
        setError("Failed to fetch products");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filters]);

  const handleFilter = (filterBy, filter) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterBy]: filter }));
  };

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", padding: 4 }}>
        <Typography color="error" variant="h6">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container>
      <Grid item xs={12} md={4} lg={3} sx={{ bgcolor: "black", p: 2 }}>
        <CategoryCheckbox handleFilter={handleFilter} />
        <PricesRadio handleFilter={handleFilter} />
      </Grid>

      <Grid item xs={12} md={8} lg={9} sx={{ bgcolor: "#111111" }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
            <CircularProgress />
          </Box>
        ) : products.length > 0 ? (
          <Grid container>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={6} lg={4} p={3} key={product._id}>
                <MyCard product={product} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
            <Typography color="text.secondary" variant="h6">
              No products found matching your filters.
            </Typography>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default Products;
