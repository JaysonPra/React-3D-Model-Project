const express = require('express')
const { addCategory, getAllCategories, getCategoryDetails, updateCategory, deleteCategory } = require('../controller/categoryController')
const { categoryRules, validationMethod } = require('../middleware/validationScript')
const { isLoggedIn, isAdmin } = require('../controller/authorization')
const router = express.Router()

router.post('/addcategory', isAdmin ,isLoggedIn ,categoryRules, validationMethod ,addCategory)
router.get('/getAllCategories', getAllCategories)
router.get('/getCategoryDetails/:id', getCategoryDetails)
router.put('/updatecategory/:id', isAdmin, updateCategory)
router.delete('/deletecategory/:id', isAdmin, deleteCategory)

module.exports = router