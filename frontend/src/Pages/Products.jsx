import { Grid2 } from "@mui/material";
import React, { useEffect, useState } from "react";
import CategoryCheckbox from "../components/CategoryCheckbox";
import PricesRadio from "../components/PricesRadio";
import { getAllProducts } from "../api/productApi";
import MyCard from "../components/MyCard";

const Products = () => {
  let [filters, setFilters] = useState({ category: [], product_price: [] });
  let [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts(filters).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  }, [filters]);

  const handleFilter = (filterBy, filter) => {
    setFilters({ ...filters, [filterBy]: filter });
    console.log(filters);
  };

  return (
    <>
      <Grid2 container>
        <Grid2 item size={{ xs: 12, md: 4, lg: 3 }} bgcolor={"primary.light"}>
          <CategoryCheckbox handleFilter={handleFilter} />

          <PricesRadio handleFilter={handleFilter} />
        </Grid2>
        <Grid2
          item
          size={{ xs: 12, md: 8, lg: 9 }}
          bgcolor={"#111111"}
          container
        >
          {products.map((product) => {
            return (
              <Grid2
                item
                size={{ xs: 12, md: 6, lg: 4 }}
                p={3}
                key={product._id}
              >
                <MyCard
                  product={product}
                  // product_name={product.product_name}
                  // product_price={product.product_price}
                  // product_image={product.product_image}
                />
              </Grid2>
            );
          })}
        </Grid2>
      </Grid2>
    </>
  );
};

export default Products;
