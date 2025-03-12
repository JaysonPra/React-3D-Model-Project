const productModel = require("../models/ProductModel");

const fs = require("fs");

// add product
exports.addProduct = async (req, res) => {
  let productToAdd = await productModel.create({
    product_name: req.body.product_name,
    product_price: req.body.product_price,
    product_description: req.body.product_description,
    category: req.body.category,
    product_image: req.file?.path,
  });
  if (!productToAdd) {
    return res.status(400).json({ error: "Something went Wrong" });
  }
  res.send(productToAdd);
};

//get all products
exports.getAllProducts = async (req, res) => {
  // req.body = {category : [a, b, c], product_price: [x, y]}
  let args = {};
  for (var key in req.body) {
    if (req.body[key].length > 0) {
      if (key == "category") {
        args[key] = req.body["category"];
      } else {
        args[key] = {
          $lte: req.body[key][1],
          $gte: req.body[key][0],
        };
      }
    }
  }
  let products = await productModel.find(args).populate("category");
  if (!products) {
    return res.status(400).json({ error: "Something went Wrong" });
  }
  res.send(products);
};

// get product details
exports.getProductDetails = async (req, res) => {
  let product = await productModel.findById(req.params.id).populate("category");
  if (!product) {
    return res.status(400).json({ error: "Something went Wrong" });
  }
  res.send(product);
};

//get all products by category
exports.getAllProductsByCategory = async (req, res) => {
  let products = await productModel
    .find({ category: req.params.category_id })
    .populate("category");
  if (!products) {
    return res.status(400).json({ error: "Something went Wrong" });
  }
  res.send(products);
};

// update products
exports.updateProduct = async (req, res) => {
  let productToUpdate = await productModel.findById(req.params.id);

  let {
    product_name,
    product_price,
    product_description,
    rating,
    category,
  } = req.body;

  productToUpdate.product_name = product_name
    ? product_name
    : productToUpdate.product_name;
  productToUpdate.product_price = product_price
    ? product_price
    : productToUpdate.product_price;
  productToUpdate.product_description = product_description
    ? product_description
    : productToUpdate.product_description;
  productToUpdate.rating = rating ? rating : productToUpdate.rating;
  productToUpdate.category = category ? category : productToUpdate.category;

  if (req.file) {
    if (productToUpdate.product_image) {
      fs.unlinkSync(productToUpdate.product_image);
    }
    productToUpdate.product_image = req.file.path;
  }

  productToUpdate = await productToUpdate.save();

  if (!productToUpdate) {
    return res.status(400).json({ error: "Something went Wrong" });
  }
  res.send(productToUpdate);
};

//delete product
exports.deleteProduct = (req, res) => {
  productModel
    .findByIdAndDelete(req.params.id)
    .then((deletedProduct) => {
      if (!deletedProduct) {
        return res.status(400).json({ error: "Product not found" });
      }
      res.send({ message: "Product deleted successfully" });
    })
    .catch((error) => res.status(500).json({ error: "Something went wrong" }));
};
