import React, { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { getAllCategories } from "../api/categoryApi";

const CategoryCheckbox = ({ handleFilter }) => {
  let [categories, setCategories] = useState([]);
  let [selected, setSelected] = useState([]);

  useEffect(() => {
    getAllCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  }, []);

  const handleChange = (e) => {
    let newSelected = selected;
    let newCategory = e.target.value;

    let categoryExists = newSelected.findIndex((item) => item === newCategory);

    if (categoryExists != -1) {
      newSelected.splice(categoryExists, 1);
    } else {
      newSelected.push(newCategory);
    }
    setSelected(newSelected);
    handleFilter("category", newSelected);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" color="white">
        Departments
      </Typography>
      <FormGroup className="text-white">
        {categories.length > 0 &&
          categories.map((category) => {
            return (
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<i className="bi bi-bookmark text-white"></i>}
                    checkedIcon={
                      <i className="bi bi-bookmark-check-fill text-white"></i>
                    }
                    value={category._id}
                    onChange={handleChange}
                  />
                }
                label={category.category_name}
              ></FormControlLabel>
            );
          })}
      </FormGroup>
    </Box>
  );
};

export default CategoryCheckbox;
