import React, { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  CircularProgress,
} from "@mui/material";
import { getAllCategories } from "../api/categoryApi";

const CategoryCheckbox = ({ handleFilter }) => {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllCategories()
      .then((data) => {
        if (data.error) {
          console.error(data.error);
        } else {
          setCategories(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const categoryId = e.target.value;
    const updatedSelected = [...selected];

    const index = updatedSelected.indexOf(categoryId);
    if (index !== -1) {
      updatedSelected.splice(index, 1);
    } else {
      updatedSelected.push(categoryId);
    }

    setSelected(updatedSelected);
    handleFilter("category", updatedSelected);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" color="white" gutterBottom>
        Categories
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" my={2}>
          <CircularProgress size={24} color="secondary" />
        </Box>
      ) : (
        <FormGroup>
          {categories.map((category) => (
            <FormControlLabel
              key={category._id}
              control={
                <Checkbox
                  icon={<i className="bi bi-tag text-white"></i>}
                  checkedIcon={<i className="bi bi-tag-fill text-white"></i>}
                  value={category._id}
                  onChange={handleChange}
                  checked={selected.includes(category._id)}
                />
              }
              label={
                <span style={{ color: "white" }}>{category.category_name}</span>
              }
            />
          ))}
        </FormGroup>
      )}
    </Box>
  );
};

export default CategoryCheckbox;
