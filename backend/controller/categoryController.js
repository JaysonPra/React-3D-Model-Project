const Category = require('../models/categoryModel')

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

    // Alternative Way
    // let cat = new Category({
    //     category_name: req.body.category_name
    // })
    // await cat.save()

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

/* 
req.body -> data is passed using the form, body
req.params -> data is passed using the request url
req.query -> data is passed using URL, in a variable

res.send(object/string)
res.json(object)

Status Code:-
res.status(200).send(object/string)
res.status(400).json(object)

200 - ok (default)
300 - relay

error
400 - bad request
401 - unauthorized
403 - unauthorized/ permission denied
404 - not found
500 - server error

CRUD - 
    Create - Model.create(object)

    Read - Model.find() - returns all data
            Model.find(filterObj) - returns all data that matches filterObj
            Model.findOne(filterObj) - returns first data that matches filterObj
            Model.findById(id) - returns data that matches id
    
    Update - Model.findByIdAndUpdate(id, updatingObj, option)
            id - what to update
            updatingObje - which fields to update, updating data
            option - ...

    Delete - Model.findByIdAndDelete(id) - removes data with the given id
*/