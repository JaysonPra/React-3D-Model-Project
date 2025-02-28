const { addProduct, getAllProducts, getProductDetails, getAllProductsByCategory, updateProduct, deleteProduct } = require('../controller/productController')
const upload = require('../middleware/fileUpload')

const router = require('express').Router()

router.post('/addproduct', upload.single('product_image') ,addProduct)
router.get('/getallproducts', getAllProducts)
router.get('/getproductdetails/:id', getProductDetails)
router.get('/getproductdetailsbycategory/:category_id', getAllProductsByCategory)
router.put('/updateproduct/:id', upload.single('updated_image'), updateProduct)
router.delete('/deleteproduct/:id', deleteProduct)

module.exports = router