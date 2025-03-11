const express = require("express");
const {
  addCategory,
  getAllCategories,
  getCategoryDetails,
  updateCategory,
  deleteCategory,
} = require("../controller/categoryController");
const {
  categoryRules,
  validationMethod,
} = require("../middleware/validationScript");
const { isLoggedIn } = require("../controller/authorization");
const router = express.Router();

router.post(
  "/addcategory",
  isLoggedIn,
  categoryRules,
  validationMethod,
  addCategory
);
router.get("/getAllCategories", getAllCategories);
router.get("/getCategoryDetails/:id", getCategoryDetails);
router.put("/updateCategory/:id", updateCategory);
router.delete("/deleteCategory/:id", deleteCategory);
module.exports = router;
