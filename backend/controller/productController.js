const ProductModel = require('../models/ProductModel')
const fs = require('fs')

exports.addProduct = async (req,res) => {
    let productToAdd = await ProductModel.create({
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        product_description: req.body.product_description,
        category: req.body.category,
        product_image: req.file?.path
    })
    if (!productToAdd){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(productToAdd)
}

exports.getAllProducts = async (req,res) => {
    let products = await ProductModel.find().populate('category')
    if (!products) {
        return exports.status(400).json({ error: "Something Went Wrong" })
    } 
    res.send(products)
}

exports.getProductDetails = async (req, res) => {
    let product = await ProductModel.findById(req.params.id).populate('category')
    if (!product) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(product)
}

exports.getAllProductsByCategory = async (req,res) => {
    let products = await ProductModel.find( { category: req.params.category_id } ).populate('category')
    if (!products) {
        return exports.status(400).json({ error: "Something went wrong" })
    } 
    res.send(products)
}

exports.updateProduct = async (req, res) => {
    let productToUpdate = await ProductModel.findById(req.params.id)

    let {product_name, product_price, product_description, rating} = req.body

    productToUpdate.product_name = product_name ? product_name : productToUpdate.product_name
    productToUpdate.product_price = product_price ? product_price : productToUpdate.product_price
    productToUpdate.product_description = product_description ? product_description : productToUpdate.product_description
    productToUpdate.rating = rating ? rating : productToUpdate.rating

    if (req.file){
        fs.unlink(productToUpdate.product_image)
        productToUpdate.product_image = req.file.path
    }

    productToUpdate = await productToUpdate.save()

    if (!productToUpdate){
        return res.status(400).json({error: "Something went wrong"})
    }
    res.send(productToUpdate)
}

exports.deleteProduct = (req, res) => {
    ProductModel.findByIdAndDelete(req.params.id)
    .then(deletedProduct => {
        if (!deletedProduct){
            return res.status(400).json(
                {error: "Product not found"})
        }
        res.send({message: "Product deleted successfully"})
    })
    .catch(error => res.status(500).json({error: "Something went wrong"}))
}