const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const tokenschema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref : "User",
        require: true
    },
    token: {
        type: String,
        required: true
    },
    createAt: {
        type:Date,
        default: Date.now(),
        expires: 86400
    }

})
module.exports = mongoose.model("Token",tokenschema)