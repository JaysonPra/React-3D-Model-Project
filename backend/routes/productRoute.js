const {
  addProduct,
  getAllProducts,
  getProductDetails,
  getAllProductsByCategory,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");
const upload = require("../middleware/fileUpload");
const {
  productRules,
  validationMethod,
} = require("../middleware/validationScript");

const router = require("express").Router();

router.post(
  "/addproduct",
  upload.single("product_image"),
  productRules,
  validationMethod,
  addProduct
);
router.post("/getallproducts", getAllProducts);
router.get("/getproductdetails/:id", getProductDetails);
router.get("/getproductsbycategory/:category_id", getAllProductsByCategory);
router.put(
  "/updateproduct/:id",
  upload.single("product_image"),
  productRules,
  validationMethod,
  updateProduct
);
router.delete("/deleteproduct/:id", deleteProduct);

module.exports = router;
