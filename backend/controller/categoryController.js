const Category = require('../models/CategoryModel')

//add category
exports.addCategory = async (req, res) => {
    let category_exists = await Category.findOne({
        category_name: req.body.category_name
    })

    if(category_exists){
        return res.status(400).json({error:"Category Already Exists"})
    }


    let categoryToAdd = await Category.create({
        category_name: req.body.category_name
    })


    if(!categoryToAdd){
        return res.status(400).json({error:"Something went wrong"})
    }

    res.send(categoryToAdd)
}

// get all categories
exports.getAllCategories = async (req, res) => {
    let categories = await Category.find()
    if(!categories){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(categories)
}

// get category details
exports.getCategoryDetails = async (req, res) => {
    let category = await Category.findById(req.params.id)
    if(!category){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(category)
}

//Update caetgory
exports.updateCategory = async (req, res) => {
    let categoryToUpdate = await Category.findByIdAndUpdate(req.params.id,{
        category_name: req.body.category_name
    },{new:true})
    if(!categoryToUpdate){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(categoryToUpdate)
}

//delete category
exports.deleteCategory = (req, res) => {
    Category.findByIdAndDelete(req.params.id)
    .then(deletedCategory=>{
        if(!deletedCategory){
            return res.status(400).json({error:"Category not found"})
        }
        res.send({message:"Category deleted successfully"})
    })
    .catch(error=>res.status(500).json({error:"Something went wrong"}))
}